---
title: "Singleton, Scoped hay Transient? Chọn sai là DbContext sống mãi"
slug: singleton-scoped-transient-captive-dependency
description: "Ba lifetime trong DI container của ASP.NET Core khác nhau ở thời điểm tạo và thời điểm dispose instance. Bài này giải thích scope của một HTTP request là gì, vì sao inject service Scoped vào Singleton lại giữ DbContext sống suốt đời ứng dụng, vì sao scope validation bắt được lỗi ở Development mà không chắc bắt được ở Production, và cách sửa đúng bằng IServiceScopeFactory."
keywords: [singleton scoped transient, service lifetime aspnet core, captive dependency, dependency injection dotnet, di container aspnet core, addscoped addsingleton addtransient, iservicescopefactory, createasyncscope, dbcontext singleton, cannot access a disposed context, second operation started on this context, scope validation, validatescopes, validateonbuild, backgroundservice scope, hostedservice dbcontext, thread safe singleton, concurrentdictionary cache, service locator anti pattern, vong doi service, chon lifetime nao, loi captive dependency, dependency injection la gi, dotnet backend]
tags: [dotnet, aspnetcore, csharp, architecture, ef-core]
authors: [tiennhm]
date: 2026-09-21
---

import { SummaryBox, FAQSection } from '@site/src/components/SEO';

# Singleton, Scoped hay Transient? Chọn sai là DbContext sống mãi

<SummaryBox>
Chọn lifetime là chọn thời điểm container tạo instance và thời điểm nó dispose. `Transient` tạo mới mỗi lần resolve, `Scoped` một instance cho mỗi HTTP request, `Singleton` một instance cho cả vòng đời process. Quy tắc quan trọng nhất: service sống lâu không được nhận trực tiếp service sống ngắn. Inject một repository `Scoped` vào một `Singleton` là bạn vừa giữ `DbContext` đó sống tới lúc app tắt. Cách sửa là inject `IServiceScopeFactory` rồi tự mở scope khi cần.
</SummaryBox>

Dòng đăng ký gây ra lỗi này trông vô hại tới mức review không ai dừng lại:

```csharp
builder.Services.AddDbContext<CrmDbContext>(o => o.UseSqlServer(conn)); // Scoped
builder.Services.AddScoped<ICustomerRepository, EfCustomerRepository>();
builder.Services.AddSingleton<CustomerCacheRefresher>();               // ← thuốc nổ
```

App qua được CI và lên staging. Lên môi trường có tải, log bắt đầu xuất hiện `A second operation was started on this context instance before a previous operation completed`, hoặc `Cannot access a disposed context instance`, hoặc tệ hơn là không có exception nào cả mà chỉ có dữ liệu cũ trả về mãi không đổi. Bài này giải thích cơ chế đằng sau, và code của cả bản hỏng lẫn bản sửa.

<!-- truncate -->

## Ba lifetime thực sự khác nhau ở chỗ nào

Container không quản lý "kiểu" service, nó quản lý **instance** và **thời điểm dispose instance đó**. Ba lifetime chỉ là ba câu trả lời cho câu hỏi "lần resolve tiếp theo có được dùng lại instance cũ không".

| Lifetime | Tạo instance mới khi nào | Được dispose khi nào | Hợp với loại service nào |
|---|---|---|---|
| `Transient` | Mỗi lần resolve | Khi scope resolve nó bị dispose | Stateless, rẻ, không giữ tài nguyên |
| `Scoped` | Lần đầu resolve trong mỗi scope | Khi scope kết thúc | `DbContext`, Unit of Work, repository, ngữ cảnh người dùng |
| `Singleton` | Lần đầu resolve trong cả app | Khi host shutdown | Cache in-memory, cấu hình đã parse, factory |

Có một chi tiết hay bị bỏ qua: container **chịu trách nhiệm dispose** những instance nó tạo ra mà implement `IDisposable`. Mỗi scope giữ một danh sách các disposable đã tạo trong scope đó. Nghĩa là một service `Transient` implement `IDisposable` mà bạn resolve từ root provider sẽ nằm trong danh sách của root scope và chỉ được giải phóng lúc app tắt — `Transient` không hề đồng nghĩa với "được thu hồi ngay". Bảng so sánh chi tiết hơn nằm ở [7.5 — Service Lifetimes](/docs/dotnet-backend-zero-to-senior/stage-02-csharp-professional/module-07-dependency-injection/7.4-service-lifetimes).

## "Scope" trong một HTTP request là cái gì

Trong ASP.NET Core, scope không phải khái niệm trừu tượng mà là một object có thật. Với mỗi request đi vào, hạ tầng tạo một `IServiceScope`, gắn `ServiceProvider` của scope đó vào `HttpContext.RequestServices`, chạy toàn bộ [pipeline middleware](/docs/dotnet-backend-zero-to-senior/stage-03-aspnet-core-backend/module-08-aspnet-core-fundamentals/8.2-request-pipeline-and-middleware), rồi dispose scope khi response đã hoàn tất.

Hệ quả trực tiếp: trong cùng một request, controller, service nghiệp vụ và hai repository khác nhau đều nhận **cùng một** `CrmDbContext`. Đó chính là thứ làm cho unit of work hoạt động — bạn sửa entity ở repository A, thêm entity ở repository B, rồi gọi `SaveChangesAsync` một lần và cả hai nằm chung một transaction. Lý do `DbContext` được đăng ký `Scoped` mặc định nằm ở đây, chứ không phải vì nó "nặng" ([13.3 — DbContext và entity configuration](/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-13-entity-framework-core/13.2-dbcontext-and-entity-configuration)).

Hệ quả thứ hai quan trọng hơn: **ngoài request thì không có scope nào tự sinh ra**. Background job, hosted service, consumer message queue, code chạy lúc startup — tất cả đều sống ở root scope. Nếu ở đó bạn cần một service `Scoped`, bạn phải tự tạo scope.

## Captive dependency: vì sao Singleton nuốt luôn DbContext

Đây là bản hỏng, rất phổ biến vì nó biên dịch được và chạy được:

```csharp
// BUG: Singleton nhận thẳng một dependency Scoped
public sealed class CustomerCacheRefresher
{
    private readonly ICustomerRepository _repo;   // Scoped!
    private readonly ConcurrentDictionary<Guid, CustomerDto> _cache = new();

    public CustomerCacheRefresher(ICustomerRepository repo) => _repo = repo;

    public async Task RefreshAsync(Guid tenantId, CancellationToken ct)
    {
        foreach (var c in await _repo.GetActiveAsync(tenantId, ct))
            _cache[c.Id] = c;
    }
}
```

Container resolve `CustomerCacheRefresher` đúng một lần, vào lần đầu có ai đó cần tới nó. Tại đúng khoảnh khắc ấy nó dựng luôn một `EfCustomerRepository` kèm một `CrmDbContext` và nhét vào field. Instance `Singleton` sống tới lúc app tắt, nên cái `DbContext` bên trong cũng vậy. Nói cách khác, **lifetime hiệu dụng của một dependency bằng lifetime của consumer sống lâu nhất giữ nó**. Service `Scoped` đã bị "bắt giữ" — tên gọi captive dependency đến từ đó.

Bốn hậu quả xảy ra theo thứ tự này:

- **Change tracker phình vô hạn.** Mỗi entity từng được đọc lên vẫn nằm trong bộ nhớ của `DbContext` đó. Đây là rò rỉ bộ nhớ trông y hệt một memory leak bình thường và rất khó truy nguyên.
- **Dữ liệu cũ.** Query sau sẽ trả về instance đã tracked từ trước thay vì giá trị mới dưới database, nên cache "làm mới" bằng dữ liệu đứng yên.
- **Race condition.** `DbContext` không thread-safe và không được thiết kế cho nhiều thao tác song song. Singleton thì mặc định bị nhiều request gọi cùng lúc, nên `A second operation was started on this context instance` là chuyện sớm muộn.
- **Rò rỉ dữ liệu giữa tenant hoặc giữa user**, nếu `DbContext` mang theo filter theo tenant hay ngữ cảnh người dùng được gắn lúc khởi tạo.

Cùng một cơ chế, một biến thể khó thấy hơn là inject `IServiceProvider` vào constructor rồi `GetRequiredService` bên trong method. Nó vừa là captive dependency vừa là [Service Locator](/docs/dotnet-backend-zero-to-senior/stage-02-csharp-professional/module-07-dependency-injection/7.9-anti-patterns), vì dependency thật bị giấu khỏi constructor và không còn kiểm tra được từ bên ngoài.

## Vì sao Development bắt được lỗi mà Production thì không chắc

DI container của .NET có sẵn cơ chế phát hiện chuyện này: **scope validation**. Khi bật, provider sẽ ném exception lúc resolve nếu một service `Singleton` yêu cầu một service `Scoped`:

```
Cannot consume scoped service 'ICustomerRepository' from singleton 'CustomerCacheRefresher'.
```

Mặc định của host (`CreateDefaultServiceProviderOptions` trong `Microsoft.Extensions.Hosting`) đặt **cả** `ValidateScopes` **lẫn** `ValidateOnBuild` bằng `isDevelopment`. Nghĩa là với ví dụ ở trên, chạy local ở môi trường Development thì `ValidateOnBuild` duyệt các đăng ký ngay tại `builder.Build()` và app **chết ngay lúc khởi động** — bạn sẽ thấy lỗi trước khi kịp gửi request nào.

Vậy tại sao bug này vẫn ra được production? Vì cả hai cờ đó tắt khi môi trường không phải Development. Ba đường thoát thường gặp:

- **Staging và Production tắt cả hai.** Nếu đoạn code lỗi được thêm vào rồi deploy thẳng mà không ai chạy Development, không có gì chặn nó.
- **`ValidateOnBuild` không duyệt được mọi đăng ký.** Open generic và đăng ký bằng factory lambda bị bỏ qua, vì container không biết trước lambda sẽ dựng ra cái gì. Những trường hợp này chỉ lộ lúc resolve.
- **Resolve tay từ `IServiceProvider` thì container không có gì để kiểm tra.** `GetRequiredService` gọi trong thân method nằm ngoài tầm nhìn của cả hai cơ chế.

Cách khoá lại là bật kiểm tra ở mọi môi trường và bắt lỗi ngay lúc build container thay vì lúc phục vụ request:

```csharp
builder.Host.UseDefaultServiceProvider((context, options) =>
{
    options.ValidateScopes = true;   // chặn Scoped-in-Singleton ở mọi môi trường
    options.ValidateOnBuild = true;  // fail-fast lúc Build(), không đợi request đầu tiên
});
```

`ValidateOnBuild` duyệt toàn bộ đăng ký lúc `builder.Build()` và làm app chết ngay lúc khởi động nếu đồ thị phụ thuộc sai. Với một service được deploy tự động, app không khởi động nổi là tín hiệu tốt hơn nhiều so với một lỗi ngẫu nhiên lúc 2 giờ sáng. Cái giá là thêm một khoảng thời gian khởi động tỉ lệ với số lượng đăng ký — gần như luôn đáng đổi. Chỗ đặt đoạn cấu hình này là `Program.cs`, cùng nơi bạn gom các extension method đăng ký theo layer ([7.7 — Program.cs và WebApplicationBuilder](/docs/dotnet-backend-zero-to-senior/stage-02-csharp-professional/module-07-dependency-injection/7.6-program-cs-and-webapplicationbuilder)).

## Bản sửa: tự mở scope bằng IServiceScopeFactory

Nguyên tắc: `Singleton` không giữ service `Scoped`, nó giữ **quyền tạo scope**. `IServiceScopeFactory` bản thân là singleton nên inject vào đâu cũng an toàn.

```csharp
public sealed class CustomerCacheRefresher
{
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ConcurrentDictionary<Guid, CustomerDto> _cache = new();

    public CustomerCacheRefresher(IServiceScopeFactory scopeFactory)
        => _scopeFactory = scopeFactory;

    public async Task RefreshAsync(Guid tenantId, CancellationToken ct)
    {
        await using var scope = _scopeFactory.CreateAsyncScope();
        var repo = scope.ServiceProvider.GetRequiredService<ICustomerRepository>();

        // Vật chất hoá dữ liệu TRƯỚC khi scope đóng
        var customers = await repo.GetActiveAsync(tenantId, ct);
        foreach (var c in customers)
            _cache[c.Id] = c;
    }
    // scope dispose ở đây → DbContext dispose theo, change tracker được dọn
}
```

Ba chi tiết dễ làm sai trong đúng đoạn code ngắn này:

- **Ưu tiên `CreateAsyncScope` trong code async.** `DbContext` implement cả `IDisposable` lẫn `IAsyncDisposable` nên `CreateScope` với `using` thường vẫn dispose được, không ném exception. `InvalidOperationException` ("only implements IAsyncDisposable. Use DisposeAsync to dispose the container.") chỉ xảy ra với service implement **duy nhất** `IAsyncDisposable`. Dùng `CreateAsyncScope` để khỏi phải nhớ service nào thuộc loại nào.
- **Không cho object của scope thoát ra ngoài scope.** Trả về `IQueryable` hay entity còn lazy-loading từ trong đó là bạn đổi lỗi captive dependency lấy lỗi disposed context. Đọc xong, map sang DTO, rồi mới ra.
- **Một scope cho một đơn vị công việc**, không phải một scope cho cả vòng đời vòng lặp. Trong `BackgroundService`, scope phải nằm **bên trong** vòng lặp:

```csharp
public sealed class CacheWarmupWorker : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;

    public CacheWarmupWorker(IServiceScopeFactory scopeFactory)
        => _scopeFactory = scopeFactory;

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            await using var scope = _scopeFactory.CreateAsyncScope();   // mỗi vòng một scope
            var refresher = scope.ServiceProvider.GetRequiredService<ICacheRefresher>();
            await refresher.RefreshAsync(stoppingToken);

            await Task.Delay(TimeSpan.FromMinutes(5), stoppingToken);
        }
    }
}
```

`BackgroundService` được host đăng ký như singleton, nên đây không phải tuỳ chọn mà là cách duy nhất để chạm tới service `Scoped` từ trong đó ([9.10 — Hosted service và background job](/docs/dotnet-backend-zero-to-senior/stage-03-aspnet-core-backend/module-09-web-api-professional/9.9-hosted-service-background-jobs)). Đặt `CreateScope` ngoài vòng lặp là tái tạo lại đúng captive dependency vừa sửa, chỉ khác là lần này do chính bạn viết ra.

## Singleton thì phải thread-safe, không có ngoại lệ

Đăng ký `Singleton` là ngầm tuyên bố class đó chịu được nhiều thread gọi song song, vì trong một web app nó gần như chắc chắn sẽ bị như vậy. Vài hệ quả cụ thể:

- `Dictionary<K,V>` bị ghi từ nhiều request có thể hỏng cấu trúc nội bộ và treo vòng lặp đọc. Dùng `ConcurrentDictionary`, hoặc khoá tường minh, hoặc giữ state ở dạng bất biến và thay nguyên cụm.
- Cache in-memory dùng chung nên dựa vào `IMemoryCache` — nó vốn được đăng ký singleton và thread-safe, thay vì tự dựng cache bằng field tĩnh ([14.3 — IMemoryCache](/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-14-caching-background-jobs/14.2-imemorycache)).
- Cấu hình nên vào qua [Options pattern](/docs/dotnet-backend-zero-to-senior/stage-02-csharp-professional/module-07-dependency-injection/7.7-options-pattern) chứ không phải một singleton mutable mà chỗ nào cũng sửa được.
- Khi cần nhiều implementation cùng interface và muốn chọn theo tên thay vì theo lifetime, [Keyed Services](/docs/dotnet-backend-zero-to-senior/stage-02-csharp-professional/module-07-dependency-injection/7.8-keyed-services) là công cụ đúng — đừng biến một singleton thành bộ điều phối tự đi resolve.

## Chốt lại thành quy tắc chọn

1. Service chạm database, mang ngữ cảnh request, hoặc tham gia unit of work → `Scoped`.
2. Service stateless, rẻ, không giữ tài nguyên → `Transient`. Nếu nó `IDisposable`, kiểm tra xem nó được resolve từ scope nào.
3. Chỉ để `Singleton` khi class thực sự thread-safe **và** không phụ thuộc thứ gì ngắn hơn nó. Nếu cần, nhận `IServiceScopeFactory`.
4. Bật `ValidateScopes` và `ValidateOnBuild` cho mọi môi trường, không chỉ Development.
5. Constructor phình quá 4–5 dependency thì vấn đề không còn là lifetime mà là trách nhiệm của class — tách nhỏ trước, chọn lifetime sau. Danh sách các cách đăng ký còn lại, gồm factory và open generic, nằm ở [7.6 — Registering Services](/docs/dotnet-backend-zero-to-senior/stage-02-csharp-professional/module-07-dependency-injection/7.5-registering-services).

<FAQSection
  title="Câu hỏi thường gặp"
  items={[
    {
      question: "Vì sao inject DbContext vào một Singleton lại hỏng, trong khi code vẫn biên dịch và chạy được?",
      answer: "Vì container chỉ resolve Singleton đúng một lần và nhét dependency vào field, nên DbContext được tạo ra lúc đó sẽ sống tới khi app tắt. Change tracker của nó phình vô hạn vì giữ lại mọi entity từng đọc lên, query sau trả về dữ liệu đã tracked nên bị cũ, và vì DbContext không thread-safe trong khi Singleton bị nhiều request gọi song song nên sớm muộn sẽ xuất hiện lỗi 'A second operation was started on this context instance'. Đây là captive dependency: lifetime hiệu dụng của một service bằng lifetime của consumer sống lâu nhất giữ nó."
    },
    {
      question: "Scope validation bắt được lỗi này ở Development, sao vẫn lọt lên Production?",
      answer: "Host mặc định đặt cả ValidateScopes lẫn ValidateOnBuild bằng isDevelopment, nên ở Development app sẽ chết ngay lúc Build() — nhưng ở Staging và Production thì cả hai đều tắt. Ngoài ra ValidateOnBuild bỏ qua open generic và đăng ký bằng factory lambda, còn dependency bạn tự lấy qua IServiceProvider.GetRequiredService thì nằm ngoài tầm kiểm tra của container. Cách khoá lại là gọi UseDefaultServiceProvider và bật ValidateScopes cùng ValidateOnBuild cho mọi môi trường để app fail ngay lúc khởi động."
    },
    {
      question: "Trong BackgroundService thì nên tạo scope ở đâu?",
      answer: "Bên trong vòng lặp, một scope cho một chu kỳ công việc, rồi dispose trước khi chờ sang chu kỳ kế tiếp. BackgroundService được host đăng ký như singleton nên không có scope nào tự sinh ra cho nó. Nếu tạo scope một lần ngoài vòng lặp rồi dùng lại, bạn tái tạo đúng captive dependency vừa sửa: DbContext sống suốt vòng đời worker và tích luỹ toàn bộ entity đã đọc."
    },
    {
      question: "CreateScope và CreateAsyncScope khác nhau ra sao?",
      answer: "CreateAsyncScope trả về scope hỗ trợ await using. Nó bắt buộc khi trong scope có service implement duy nhất IAsyncDisposable — lúc đó CreateScope với using thường sẽ ném InvalidOperationException. DbContext không thuộc nhóm này vì nó implement cả hai interface, nên sync dispose vẫn chạy. Dù vậy trong code async vẫn nên mặc định dùng CreateAsyncScope để dispose đi đúng đường async."
    },
    {
      question: "Transient có nghĩa là instance được thu hồi ngay sau khi dùng xong không?",
      answer: "Không. Transient chỉ quy định mỗi lần resolve tạo một instance mới. Nếu instance đó implement IDisposable, container ghi nó vào danh sách disposable của scope đã resolve nó và chỉ dispose khi scope kết thúc. Resolve một Transient IDisposable từ root provider nghĩa là nó tích luỹ tới lúc app tắt, nên với service giữ tài nguyên thì phải chú ý resolve từ scope nào."
    }
  ]}
/>

## Bài liên quan

- [Module 7 — Dependency Injection](/docs/dotnet-backend-zero-to-senior/stage-02-csharp-professional/module-07-dependency-injection) — Dependency injection trong .NET: service lifetime, composition root, options pattern — khớp với container ASP.NET Core và kiểm thử đơn vị.
- [7.5 — 3. Service Lifetimes](/docs/dotnet-backend-zero-to-senior/stage-02-csharp-professional/module-07-dependency-injection/7.4-service-lifetimes) — Transient, Scoped, Singleton: khi nào tạo mới, khi nào Dispose, và vì sao captive dependency khiến DbContext sống mãi tới lúc ứng dụng tắt.
- [Module 16 — Clean Architecture](/docs/dotnet-backend-zero-to-senior/stage-05-senior-engineering/module-16-clean-architecture) — Clean Architecture & DDD tactical: layers, aggregates, application services — giảm coupling và tăng khả năng kiểm chứng cho CRM lớn.
