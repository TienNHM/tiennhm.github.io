---
title: "Vì sao EF Core bắn 201 query cho 1 màn hình danh sách? Cách sửa N+1"
slug: ef-core-n-plus-1-query
description: "Một màn hình 200 dòng mà log SQL ghi 201 câu lệnh là dấu hiệu của N+1 query. Bài viết giải thích cơ chế sinh ra nó trong EF Core, cách bật log để nhìn thấy, và bốn cách sửa: projection bằng Select, Include/ThenInclude, AsSplitQuery và AsNoTracking. Kèm cái bẫy ít người để ý là Include chữa được N+1 nhưng lại tạo ra cartesian explosion."
keywords: [n+1 query, n plus 1 ef core, ef core n+1, entity framework core performance, loi n+1 trong ef core, include theninclude, eager loading, lazy loading ef core, explicit loading, assplitquery ef core, split query, cartesian explosion, projection select dto, asnotracking, identity resolution, navigation property, toquerystring, log sql ef core, microsoft entityframeworkcore database command, toi uu query ef core, api cham do query, dotnet backend, aspnet core, linq to entities, iqueryable, index foreign key, query optimization]
tags: [dotnet, csharp, database, performance, aspnetcore, efcore]
authors: [tiennhm]
date: 2026-09-21
---

import { SummaryBox, FAQSection } from '@site/src/components/SEO';

# Vì sao EF Core bắn 201 query cho 1 màn hình danh sách?

<SummaryBox>
Một danh sách 200 dòng mà log ghi 201 câu SQL chính là N+1: một truy vấn lấy danh sách, rồi mỗi dòng lại thêm một truy vấn để nạp dữ liệu liên quan. Gốc rễ là navigation property bị nạp rời rạc thay vì nạp chung. Cách sửa mặc định là projection bằng Select xuống DTO. Include chỉ hợp khi cần entity thật, và nếu Include từ hai collection trở lên thì phải thêm AsSplitQuery để khỏi nổ cartesian.
</SummaryBox>

Bạn mở trang danh sách khách hàng, API trả về sau bốn giây, nhưng CPU của database gần như không nhúc nhích và câu SQL nào nhìn riêng lẻ cũng chạy trong vài mili-giây. Bật log lên thì hoá ra vấn đề không nằm ở một câu chậm, mà ở 201 câu nhanh xếp hàng nối đuôi nhau.

Đó là N+1 query. Nó không làm code sai, không ném exception, không bị unit test bắt, và trên máy local với hai mươi dòng dữ liệu seed thì nó thậm chí còn nhanh hơn bản sửa đúng. Nó chỉ lộ ra khi bảng có dữ liệu thật và độ trễ mạng tới database khác không.

<!-- truncate -->

## Công thức 1 + N

Đoạn code dưới đây là dạng dễ nhận ra nhất, vì vòng lặp nằm ngay trước mắt:

```csharp
var customers = await _db.Customers
    .Where(c => c.Status == CustomerStatus.Active)
    .ToListAsync();                                  // 1 query

var rows = new List<CustomerRowDto>();
foreach (var c in customers)
{
    var contactCount = await _db.Contacts
        .CountAsync(ct => ct.CustomerId == c.Id);     // + N query

    rows.Add(new CustomerRowDto(c.Id, c.Name, contactCount));
}
```

Log SQL sẽ có dạng:

```sql
SELECT [c].[Id], [c].[Name], ... FROM [Customers] AS [c] WHERE [c].[Status] = 1;
SELECT COUNT(*) FROM [Contacts] AS [c] WHERE [c].[CustomerId] = 1;
SELECT COUNT(*) FROM [Contacts] AS [c] WHERE [c].[CustomerId] = 2;
-- ... lặp lại đúng N lần
```

Điểm chết người là chi phí không nằm ở việc database làm việc nặng, mà ở số lần đi lại. Mỗi câu lệnh là một round trip: gửi lệnh, chờ, nhận kết quả. Nếu mỗi round trip tốn 1 mili-giây thì 200 dòng đã là 200 mili-giây chỉ để đi lại; database nằm ở mạng khác với độ trễ 5 mili-giây thì con số đó thành một giây, trong khi mọi biểu đồ đo tải database vẫn xanh.

## Ba nơi N+1 hay trốn

**Vòng lặp lộ thiên** như ví dụ trên là dạng dễ nhất, code review bắt được.

**Lazy loading** khó hơn, vì không có dòng code nào trông giống một truy vấn cả. Cách phổ biến nhất để bật lazy loading là cài gói proxy và khai báo navigation property là `virtual` (ngoài ra còn cách tiêm `ILazyLoader` vào entity, không cần proxy):

```csharp
public class Customer
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public virtual ICollection<Contact> Contacts { get; set; } = new List<Contact>();
}

services.AddDbContext<CrmDbContext>(opt => opt
    .UseLazyLoadingProxies()
    .UseSqlServer(connectionString));
```

Từ lúc đó, `c.Contacts.Count` nằm trong một vòng `foreach` sẽ âm thầm bắn một truy vấn cho mỗi dòng. Tệ hơn, lazy loading là đồng bộ: nó chặn thread ngay giữa một action `async`. Cách khai báo quan hệ và navigation property được nói kỹ hơn ở [bài relationships](/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-13-entity-framework-core/13.4-relationships).

**Mapping sau khi đã materialize** là dạng thứ ba. Khi bạn `ToListAsync()` trước rồi mới map entity sang DTO bằng AutoMapper, mọi navigation property mà mapper chạm vào đều là một lần nạp rời. Dùng `ProjectTo` thay cho `Map` sẽ đẩy phép chiếu xuống thành SQL, thay vì chạy trên đối tượng đã nằm trong bộ nhớ.

## Nhìn thấy nó trước khi đoán

Đừng suy luận bằng mắt, hãy bật log câu lệnh. Trong `appsettings.Development.json`:

```json
{
  "Logging": {
    "LogLevel": {
      "Microsoft.EntityFrameworkCore.Database.Command": "Information"
    }
  }
}
```

Hoặc gắn thẳng vào `DbContext` khi chạy môi trường phát triển:

```csharp
optionsBuilder
    .LogTo(Console.WriteLine, LogLevel.Information)
    .EnableSensitiveDataLogging();   // chỉ bật ở Development
```

Với một truy vấn cụ thể, `ToQueryString()` cho bạn xem SQL mà không cần chạy:

```csharp
var query = _db.Customers
    .Where(c => c.Status == CustomerStatus.Active)
    .Include(c => c.Contacts);

Console.WriteLine(query.ToQueryString());
```

Cách đọc log thì đơn giản: gọi API một lần, đếm số câu lệnh, rồi gọi lại với tập dữ liệu lớn hơn. Nếu con số đó tăng theo số dòng trả về thì bạn đang có N+1, không cần đo thêm gì nữa. Cấu hình log có cấu trúc để đếm được trên môi trường thật thì xem [bài logging với Serilog](/docs/dotnet-backend-zero-to-senior/stage-03-aspnet-core-backend/module-08-aspnet-core-fundamentals/8.8-logging-with-serilog), còn các công cụ debug khác của EF Core nằm ở [bài performance](/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-13-entity-framework-core/13.8-performance).

## Bốn cách sửa, và khi nào dùng cái nào

### 1. Projection bằng Select, mặc định nên chọn

Với màn hình chỉ đọc, đây gần như luôn là câu trả lời đúng:

```csharp
var rows = await _db.Customers
    .AsNoTracking()
    .Where(c => c.Status == CustomerStatus.Active)
    .OrderBy(c => c.Name)
    .Select(c => new CustomerRowDto(
        c.Id,
        c.Name,
        c.Contacts.Count(),
        c.Leads.Where(l => l.Status == LeadStatus.Won).Sum(l => (decimal?)l.Value) ?? 0))
    .ToListAsync();
```

EF Core dịch cả khối này thành một câu lệnh duy nhất, với các phép đếm và tổng nằm ở dạng subquery. Bạn được ba thứ cùng lúc: một round trip, chỉ những cột thật sự cần thay vì đọc cả hàng, và không có gì phải đưa vào change tracker. Các dạng projection khác được liệt kê trong [bài query patterns](/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-13-entity-framework-core/13.6-query-patterns).

### 2. Include và ThenInclude, khi bạn cần entity thật

Khi phải sửa dữ liệu rồi `SaveChangesAsync`, hoặc khi domain logic cần entity đầy đủ, projection không dùng được. Lúc đó mới tới lượt eager loading:

```csharp
var customer = await _db.Customers
    .Include(c => c.Contacts)
    .Include(c => c.Leads)
        .ThenInclude(l => l.AssignedUser)
    .FirstOrDefaultAsync(c => c.Id == customerId);
```

Một chi tiết hay làm người ta mất thời gian: nếu truy vấn kết thúc bằng một phép chiếu sang DTO thì `Include` bị bỏ qua hoàn toàn, và EF Core chỉ ghi một dòng cảnh báo trong log chứ không báo lỗi. Include và Select là hai con đường khác nhau, đừng trộn.

### 3. AsSplitQuery, khi Include từ hai collection trở lên

```csharp
var customers = await _db.Customers
    .Include(c => c.Contacts)
    .Include(c => c.Leads)
    .AsSplitQuery()
    .AsNoTracking()
    .ToListAsync();
```

Lý do cần nó nằm ở mục ngay sau đây. Nếu muốn áp cho toàn bộ ứng dụng thì đặt mặc định lúc đăng ký `DbContext`. Lưu ý `UseQuerySplittingBehavior` là extension của `RelationalDbContextOptionsBuilder`, nên nó phải nằm **bên trong** lambda của provider chứ không nằm thẳng trên `DbContextOptionsBuilder`:

```csharp
builder.Services.AddDbContext<CrmDbContext>(options =>
    options.UseSqlServer(
        connectionString,
        sql => sql.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery)));
```

Sau đó dùng `AsSingleQuery()` cho những truy vấn muốn quay lại hành vi cũ.

### 4. AsNoTracking, giảm chi phí chứ không giảm số query

`AsNoTracking()` không sửa được N+1, nhưng nó bỏ bước chụp snapshot mỗi entity vào change tracker, nên với màn hình đọc thuần thì luôn nên bật. Lưu ý là ở chế độ no-tracking, hai dòng cùng khoá chính có thể thành hai đối tượng khác nhau trong bộ nhớ; cần giữ tính đồng nhất thì dùng `QueryTrackingBehavior.NoTrackingWithIdentityResolution`.

## Cái bẫy: Include chữa N+1 rồi tạo ra cartesian explosion

Đây là chỗ nhiều người sửa xong lại thấy chậm hơn lúc chưa sửa.

Giả sử một khách hàng có 10 contact và 20 lead. Khi bạn `Include` cả hai collection trong một câu lệnh, SQL sinh ra là một phép JOIN, và database phải trả về tích của hai bên: 10 nhân 20 bằng 200 dòng cho đúng một khách hàng. Mỗi dòng trong số đó lặp lại toàn bộ cột của Customer, toàn bộ cột của Contact và toàn bộ cột của Lead.

Nhân lên 100 khách hàng là 20.000 dòng chạy qua dây mạng, trong khi lượng dữ liệu thật chỉ là 100 + 1.000 + 2.000 = 3.100 dòng. Số truy vấn giảm từ 201 xuống 1, nhưng lượng byte truyền tăng gấp bội, và phần ghép lại trong bộ nhớ cũng không miễn phí.

`AsSplitQuery()` tách đúng chỗ đó: EF Core bắn ba câu lệnh riêng, một cho customers, một cho contacts, một cho leads, rồi tự ghép quan hệ ở phía client. Ba round trip thay vì một, đổi lại không dòng nào bị nhân bản.

Cái giá của split query thì cần nói rõ:

- Không còn là một câu lệnh, nên nếu có ai ghi dữ liệu xen vào giữa các lần đọc, kết quả có thể không nhất quán. Cần chắc chắn thì bọc trong một transaction với mức cô lập phù hợp.
- Khi có phân trang, thứ tự phải xác định, nếu không các phần tách ra sẽ ghép sai; EF Core cũng cảnh báo khi truy vấn tách không có `OrderBy` ổn định.
- Ba round trip không phải lúc nào cũng rẻ hơn một. Include đúng một collection thì cứ để nguyên single query.

Quy tắc dùng được ngay: Include một collection thì giữ single query, từ hai collection trở lên thì thêm `AsSplitQuery`. Cách đọc execution plan để kiểm chứng phần này nằm ở [bài query optimization](/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-12-sql-deep-dive/12.6-query-optimization).

## Chọn nhanh

| Tình huống | Nên dùng |
|---|---|
| Màn hình danh sách, chỉ đọc | `Select` xuống DTO kèm `AsNoTracking` |
| Chỉ cần đếm hoặc tổng của quan hệ | `Select` với `Count()`, `Sum()`, đừng Include |
| Cần sửa entity rồi `SaveChanges` | `Include`, giữ tracking |
| Include từ hai collection trở lên | thêm `AsSplitQuery` |
| Đã có entity, thỉnh thoảng mới cần quan hệ | `Entry(e).Collection(...).LoadAsync()` |

## Mấy lỗi hay gặp khi sửa

**Kéo cả bảng về rồi join trong C#.** Đổi N+1 lấy một truy vấn quét toàn bảng thì thường là lỗ. Giữ phép lọc và phép gộp trong `IQueryable` để chúng được dịch xuống SQL.

**Gọi `ToListAsync()` quá sớm.** Sau `ToListAsync()`, mọi `Where` hay `Select` phía sau chạy bằng LINQ to Objects trên dữ liệu đã tải về, chứ không còn dịch thành SQL nữa.

**Include rồi phân trang cả collection.** `Include` một collection kèm `Skip` và `Take` luôn khiến database trả về nhiều dòng hơn số dòng bạn hiển thị. Màn hình có phân trang thì nên đi đường projection, xem thêm [bài pagination, filtering và sorting](/docs/dotnet-backend-zero-to-senior/stage-03-aspnet-core-backend/module-09-web-api-professional/9.5-pagination-filtering-sorting).

**Repository trả về `IEnumerable` thay vì `IQueryable`.** Khi đó tầng gọi không còn cách nào Include hay Select, và N+1 mọc lại ở tầng trên. Đánh đổi của kiểu thiết kế này được bàn ở [bài repository và unit of work](/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-13-entity-framework-core/13.10-unit-of-work-and-repository-pattern).

**Quên global query filter.** Bộ lọc toàn cục kiểu soft delete hay multi-tenant cũng được áp vào cả phần Include, nên số dòng thực nhận có thể khác với những gì bạn nhẩm trong đầu; chi tiết ở [bài global query filters](/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-13-entity-framework-core/13.11-global-query-filters).

**Thiếu index trên khoá ngoại.** Gộp 201 truy vấn thành 1 mà cột `CustomerId` không có index thì bạn chỉ đổi từ nhiều lần quét nhỏ sang một lần quét lớn. Phần này thuộc về [bài indexing](/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-12-sql-deep-dive/12.5-indexing).

Ví dụ gốc của vấn đề này kèm ngữ cảnh CRM thì nằm ở [bài N+1 problem](/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-13-entity-framework-core/13.7-n-plus-1-problem).

<FAQSection
  title="Câu hỏi thường gặp"
  items={[
    {
      question: "Làm sao biết chắc API của mình đang bị N+1?",
      answer: "Bật log ở mức Information cho Microsoft.EntityFrameworkCore.Database.Command, gọi API đúng một lần rồi đếm số câu lệnh SQL trong log, sau đó gọi lại với tập dữ liệu lớn hơn. Nếu số câu lệnh tăng theo số dòng trả về thì đó là N+1, còn nếu nó đứng yên thì không phải. Cách này chắc chắn hơn đọc code bằng mắt, vì lazy loading không để lại dòng code nào trông giống một truy vấn."
    },
    {
      question: "Nên dùng Include hay Select để sửa N+1?",
      answer: "Chọn theo việc bạn cần gì ở kết quả. Nếu chỉ hiển thị thì dùng Select xuống DTO, vì nó sinh một câu lệnh, chỉ lấy đúng cột cần và không đưa gì vào change tracker. Nếu cần entity thật để sửa rồi gọi SaveChanges thì dùng Include. Đừng dùng cả hai trong một truy vấn: khi truy vấn kết thúc bằng phép chiếu sang DTO, EF Core bỏ qua Include và chỉ ghi một dòng cảnh báo trong log."
    },
    {
      question: "Cartesian explosion là gì và vì sao Include gây ra nó?",
      answer: "Khi Include nhiều collection trong cùng một câu lệnh, EF Core dịch thành JOIN, nên database trả về tích số dòng của các collection đó. Một khách hàng có 10 contact và 20 lead sẽ thành 200 dòng, mỗi dòng lặp lại đủ cột của cả ba bảng. Số truy vấn giảm nhưng lượng dữ liệu truyền tăng mạnh. AsSplitQuery tách thành các câu lệnh riêng cho từng collection rồi ghép ở phía client, nên không dòng nào bị nhân bản."
    },
    {
      question: "Có nên bật AsSplitQuery cho toàn bộ ứng dụng không?",
      answer: "Chỉ nên nếu phần lớn truy vấn của bạn Include từ hai collection trở lên. Split query đánh đổi bằng nhiều round trip hơn, bằng khả năng dữ liệu không nhất quán khi có ghi xen giữa các lần đọc, và bằng yêu cầu phải có thứ tự xác định khi phân trang. Với Include đúng một collection thì single query thường rẻ hơn. Có thể đặt mặc định bằng UseQuerySplittingBehavior — lưu ý nó nằm trong lambda của provider, ví dụ UseSqlServer(conn, sql => sql.UseQuerySplittingBehavior(...)) — rồi dùng AsSingleQuery cho những chỗ cần quay lại hành vi cũ."
    },
    {
      question: "AsNoTracking có làm giảm số lượng query không?",
      answer: "Không. AsNoTracking chỉ bỏ bước chụp snapshot entity vào change tracker, nên nó giảm chi phí bộ nhớ và chi phí materialize chứ không đổi số câu lệnh gửi xuống database. Nó vẫn đáng bật cho mọi màn hình chỉ đọc, và nên đi kèm projection. Nếu cần hai dòng cùng khoá chính trỏ về cùng một đối tượng trong bộ nhớ thì dùng NoTrackingWithIdentityResolution thay vì AsNoTracking thuần."
    }
  ]}
/>

## Bài liên quan

- [Module 13 — Entity Framework Core](/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-13-entity-framework-core) — EF Core: change tracking, migrations, raw SQL, performance patterns — ORM mapping an toàn cho domain CRM.
- [13.6 — 5. Query Patterns](/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-13-entity-framework-core/13.6-query-patterns) — Projection thay vì Include, split query và cartesian explosion, explicit loading, FindAsync, và compiled query cho đường chạy nóng.
- [Lộ trình .NET Backend: From Zero → Senior (Backend-first)](/docs/dotnet-backend-zero-to-senior/dotnet-backend-zero-to-senior-roadmap) — Curriculum hub: lộ trình .NET backend-first (C#, ASP.NET Core, SQL, EF Core, distributed systems, microservices) với trục nghiệp vụ CRM/ERP — tối ưu…
