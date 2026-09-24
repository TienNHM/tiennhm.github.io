---
title: "Đổi id trên URL ra dữ liệu người khác? Chặn IDOR ở một tầng duy nhất"
slug: idor-broken-access-control-aspnet-core
description: "IDOR xảy ra khi API nhận id từ request rồi đọc thẳng bản ghi mà không hỏi xem người gọi có sở hữu bản ghi đó không. Bài viết giải thích cơ chế, cách tự dò trên chính API của bạn, vì sao đổi sang GUID hay mã hoá id không phải là cách sửa, và cách áp kiểm tra quyền sở hữu ở một tầng duy nhất trong ASP.NET Core bằng resource-based authorization cùng query filter theo người dùng."
keywords: [idor, insecure direct object reference, broken access control, owasp top 10, owasp a01, loi idor, kiem tra quyen so huu, ownership check, authorization vs authentication, phan quyen aspnet core, resource based authorization, policy based authorization, iauthorizationservice, authorizationhandler, global query filter ef core, query filter theo user, horizontal access control, vertical access control, mass assignment, bola, broken object level authorization, api security, bao mat api dotnet, webgoat idor, doi id tren url, guid khong bao mat, indirect object reference, forbid vs notfound, aspnet core security]
tags: [security, owasp, aspnetcore, dotnet, csharp, api]
authors: [tiennhm]
date: 2026-09-21
---

import { SummaryBox, FAQSection } from '@site/src/components/SEO';

# Đổi id trên URL ra dữ liệu người khác? Chặn IDOR ở một tầng duy nhất

<SummaryBox>
IDOR xảy ra khi endpoint nhận id từ request rồi nạp thẳng bản ghi, chỉ kiểm tra người gọi đã đăng nhập chứ không kiểm tra người gọi có quyền trên đúng bản ghi đó. Đổi id sang GUID hay mã hoá id không sửa được lỗi, vì id vẫn rò ra ở chỗ khác. Cách sửa là bắt buộc mọi truy vấn phải đi qua một tầng ràng buộc quyền sở hữu ở server, thay vì rải lệnh kiểm tra trong từng controller.
</SummaryBox>

Bạn có một endpoint rất đỗi bình thường: `GET /api/orders/1043` trả về chi tiết đơn hàng. Nó nằm sau `[Authorize]`, token hợp lệ mới gọi được, và trên giao diện thì người dùng chỉ bấm được vào đơn của chính họ.

Rồi một người đăng nhập bằng tài khoản thật của họ, sửa `1043` thành `1044` và bấm gửi. Nếu server trả về đơn hàng của người khác thì đó là Insecure Direct Object Reference, gọi tắt là IDOR. Không có payload, không có kỹ thuật gì, chỉ là một con số bị đổi.

<!-- truncate -->

## IDOR là gì và vì sao nó đứng đầu bảng OWASP

Direct Object Reference nghĩa là ứng dụng dùng dữ liệu người dùng gửi lên để trỏ trực tiếp tới một đối tượng ở phía sau: một dòng trong database, một file, một bản ghi. Bản thân chuyện đó không sai, gần như mọi REST API đều làm vậy. Nó trở thành *insecure* khi tham chiếu ấy được dùng mà không có bước kiểm tra xem người gọi có được phép chạm vào đối tượng đó hay không. Phần mô tả đầy đủ kèm các dạng biến thể nằm ở [bài giới thiệu IDOR](/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/insecure-direct-object-references-01).

Trong OWASP Top 10 bản 2021, Broken Access Control leo lên vị trí A01, và IDOR là dạng cụ thể hay gặp nhất của nhóm này. Lý do nó xếp cao không phải vì khó khai thác, mà vì ngược lại: chi phí khai thác gần bằng không, trong khi hậu quả là lộ dữ liệu của toàn bộ người dùng nếu id là số chạy tuần tự.

Có hai trục phân quyền cần phân biệt, và [bài về secure object references](/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/insecure-direct-object-references-06) trình bày rõ cả hai:

- **Ngang (horizontal)**: hai người cùng vai trò, A đọc được dữ liệu của B. Đây chính là IDOR kinh điển.
- **Dọc (vertical)**: người dùng thường gọi được chức năng của admin. Đây là Missing Function Level Access Control, một lỗi anh em nhưng khác cơ chế; [bản so sánh giữa hai loại](/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/missing-function-level-access-control-01) giúp bạn không nhầm hai thứ khi đi rà soát.

## Vì sao lỗi này phổ biến đến thế

Vì authentication và authorization là hai việc khác nhau, mà framework chỉ tự động lo giúp bạn việc thứ nhất.

`[Authorize]` trả lời câu hỏi "anh là ai". Nó xác minh chữ ký token, dựng `ClaimsPrincipal`, và đến đó là hết. Nó không biết gì về đơn hàng số 1044, cũng không có cách nào biết đơn đó thuộc về ai. Câu hỏi "anh có được phép động vào bản ghi này không" phải do code nghiệp vụ trả lời, và vì không có cái gì bắt buộc, nên khi deadline gấp thì đó đúng là dòng code bị bỏ quên. Ranh giới giữa hai khái niệm được tách bạch trong [bài authentication vs authorization](/docs/dotnet-backend-zero-to-senior/stage-03-aspnet-core-backend/module-10-authentication-authorization/10.1-authentication-vs-authorization).

Một nguồn gây lỗi nữa là niềm tin vào giao diện. Màn hình chỉ hiển thị đơn của người dùng hiện tại, nên developer ngầm cho rằng id gửi lên luôn hợp lệ. Nhưng HTTP client nào cũng gửi được request tuỳ ý, còn giao diện thì không phải là một lớp bảo vệ, nó chỉ là một gợi ý.

Thứ ba là dữ liệu thừa trong response. Một API trả về nguyên entity, giao diện chỉ hiển thị vài trường, và những trường còn lại vẫn nằm trong JSON: `userId`, `role`, `ownerId`. Chúng chính là nguyên liệu để người ta đoán ra id tiếp theo cần thử. Bài lab [so sánh response thô với dữ liệu hiển thị](/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/insecure-direct-object-references-03) cho bạn thấy đúng bước này trên một hệ thống thật.

## Cách tự dò IDOR trên chính API của bạn

Quy trình rất cơ học, và bạn nên chạy nó trước khi người khác chạy:

1. Tạo hai tài khoản cùng vai trò, gọi là A và B, mỗi tài khoản có một ít dữ liệu riêng.
2. Đăng nhập bằng A, mở tab Network, ghi lại mọi request có id trên path, trên query string hoặc trong body.
3. Giữ nguyên token của A, thay id bằng id của B rồi gửi lại.
4. So sánh: `200` kèm dữ liệu của B là lỗi. `403` hoặc `404` là đúng kỳ vọng.
5. Lặp lại cho mọi HTTP method chứ không chỉ `GET`. Nhiều hệ thống chặn đọc nhưng quên chặn `PUT` và `DELETE` trên cùng một route, đúng như tình huống trong [bài thực hành đổi id kèm đổi method](/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/insecure-direct-object-references-05).

Bước bổ sung là đoán route. Một API RESTful có quy luật đặt tên rất dễ suy ra, nên nếu `/api/orders/{id}` tồn tại thì `/api/orders/{id}/attachments` thường cũng tồn tại, kể cả khi không có màn hình nào gọi tới. Kiểu suy luận này được mô tả trong [bài về đoán mẫu URL](/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/insecure-direct-object-references-04).

Trong CI, cách rẻ nhất để giữ kết quả là viết integration test khẳng định điều ngược lại: đăng nhập bằng A, gọi tài nguyên của B, assert status code không phải `200`. Mỗi endpoint một test, chạy mãi về sau.

## Ba cách chữa không phải là chữa

**Ẩn id đi.** Chuyển id từ URL xuống body, hay không hiển thị nó trên giao diện, chỉ làm request trông sạch hơn. Nó vẫn nằm trong payload và vẫn sửa được.

**Đổi sang GUID.** Tăng chi phí đoán là thật, và vẫn nên làm để tránh việc ai đó quét hết id từ 1 tới 100000. Nhưng GUID rò rỉ ở rất nhiều chỗ: kết quả tìm kiếm, response của endpoint danh sách, webhook, link chia sẻ, log, báo cáo export. Chỉ cần một id lọt ra là bản ghi đó không còn được bảo vệ, bởi vì lớp phòng thủ duy nhất ở đây là "kẻ tấn công không biết chuỗi này".

**Mã hoá hoặc hash id thành indirect reference.** Bạn đổi `/profile/1234` thành `/profile/8f3e9d72a1` rồi ánh xạ ngược ở server. Đây là một lớp bổ sung có ích, nhưng chính [tài liệu về indirect reference](/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/insecure-direct-object-references-06) cũng nói thẳng là nó không thay thế được kiểm tra quyền.

Điểm chung của cả ba: chúng làm id khó đoán hơn, còn lỗi thật thì nằm ở chỗ server chấp nhận bất kỳ id nào nó nhận được. Cùng một logic đó áp dụng cho session id — nếu giá trị phiên đoán được thì không cần đoán id nữa, như [bài hijack a session](/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/hijack-a-session-01) minh hoạ.

## Cách sửa: ràng buộc quyền sở hữu, và đặt nó ở một chỗ

Nguyên tắc: **id đến từ request là dữ liệu chưa tin được, danh tính đến từ token mới là dữ liệu tin được.** Mọi truy vấn phải mang cả hai.

Cách trực tiếp nhất là đưa điều kiện sở hữu vào chính câu query, thay vì tải bản ghi lên rồi mới so sánh:

```csharp
[Authorize]
[HttpGet("api/orders/{id:guid}")]
public async Task<IActionResult> GetOrder(Guid id)
{
    var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

    var order = await _db.Orders
        .Where(o => o.Id == id && o.OwnerId == userId)
        .Select(o => new OrderDto(o.Id, o.Total, o.Status))
        .FirstOrDefaultAsync();

    return order is null ? NotFound() : Ok(order);
}
```

Hai chi tiết đáng chú ý. Một là `OwnerId` nằm trong `WHERE`, nên nếu bạn quên thì query không trả về gì chứ không trả về nhầm; đây là kiểu sai an toàn. Hai là trả `NotFound` thay vì `Forbid` cho người không sở hữu: `403` vô tình xác nhận bản ghi đó có tồn tại, và với dữ liệu nhạy cảm thì chỉ riêng thông tin tồn tại cũng đã đủ để suy ra điều gì đó.

Nhược điểm là nó phụ thuộc vào việc mọi developer đều nhớ viết thêm điều kiện. Với một team đông người và vài trăm endpoint, đó là một giả định yếu. Nên tầng thứ hai là kéo ràng buộc xuống dưới `DbContext` bằng global query filter, để mọi truy vấn đều bị lọc dù người viết có nhớ hay không:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Order>()
        .HasQueryFilter(o => o.TenantId == _currentUser.TenantId);
}
```

Cơ chế và các bẫy đi kèm — bắt buộc phải có index trên cột lọc, và `IgnoreQueryFilters()` sẽ vô hiệu hoá toàn bộ — được nói rõ trong [bài về global query filters](/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-13-entity-framework-core/13.10-global-query-filters). Query filter rất hợp cho ranh giới rộng như tenant hay soft delete. Với quyền sở hữu ở mức từng bản ghi, nơi admin và manager có luật riêng, thì đặt tất cả vào filter sẽ khiến điều kiện phình ra khó kiểm soát.

Cho những luật phụ thuộc vào chính dữ liệu của bản ghi, ASP.NET Core có sẵn resource-based authorization. Bạn tải resource lên trước, rồi hỏi hệ thống phân quyền:

```csharp
public class SameOwnerRequirement : IAuthorizationRequirement { }

public class OrderOwnerHandler
    : AuthorizationHandler<SameOwnerRequirement, Order>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        SameOwnerRequirement requirement,
        Order order)
    {
        var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (context.User.IsInRole("Admin") || order.OwnerId == userId)
            context.Succeed(requirement);

        return Task.CompletedTask;
    }
}
```

Gọi từ controller qua `IAuthorizationService`:

```csharp
var result = await _authService.AuthorizeAsync(
    User, order, new SameOwnerRequirement());

if (!result.Succeeded)
    return Forbid();
```

Cái được ở đây là luật "ai được động vào Order" nằm gọn trong một handler, sửa một lần là mọi nơi gọi nó đổi theo, thay vì phải đi tìm từng câu `if` rải rác. Cách khai báo requirement và handler được trình bày chi tiết ở [bài resource-based authorization](/docs/dotnet-backend-zero-to-senior/stage-03-aspnet-core-backend/module-10-authentication-authorization/10.6-resource-based-authorization), còn phần khai báo policy để gắn vào endpoint thì ở [bài policy-based authorization](/docs/dotnet-backend-zero-to-senior/stage-03-aspnet-core-backend/module-10-authentication-authorization/10.5-policy-based-authorization).

Ba tầng này không loại trừ nhau: query filter chặn ranh giới rộng, ràng buộc trong `WHERE` lo đường đọc thường ngày, resource-based authorization lo những luật phức tạp cần đọc dữ liệu mới quyết định được.

## Mấy chỗ hay hỏng còn lại

**Endpoint ghi nhận luôn cả trường không được phép sửa.** Nếu bạn `PUT` cả object và map thẳng vào entity, người dùng có thể gửi kèm `"role": "admin"` hay `"ownerId"` của người khác. Chỉ nhận đúng những trường được phép sửa, qua một DTO riêng, và đừng bao giờ bind trực tiếp vào entity.

**Endpoint danh sách và màn hình export.** Chỗ này hay bị bỏ sót vì không có id nào trên URL để mà đổi, nhưng một bộ lọc thiếu điều kiện sở hữu thì rò nhiều dữ liệu hơn hẳn một request lẻ.

**Lọc ở tầng hiển thị.** Trả nguyên danh sách rồi để frontend lọc bớt thì dữ liệu vẫn đã nằm trong response và ai mở tab Network cũng đọc được.

**Không ghi log truy cập bị từ chối.** Một người dùng liên tục nhận `404` trên những id không phải của họ là dấu hiệu rất rõ của việc dò tìm.

**Chưa viết ra ma trận quyền.** Liệt kê endpoint, method, ai được gọi, ai được đọc bản ghi của ai: nếu không viết được thành bảng thì cũng không kiểm tra được là mình đã làm đúng. Một mẫu ma trận như vậy có trong [bài về secure object references](/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/insecure-direct-object-references-06).

<FAQSection
  title="Câu hỏi thường gặp"
  items={[
    {
      question: "IDOR khác gì với Missing Function Level Access Control?",
      answer: "IDOR là phân quyền theo dữ liệu: bạn được phép gọi endpoint đó, nhưng không được phép chạm vào đúng bản ghi bạn đang trỏ tới, ví dụ đổi GET /profile/1234 thành GET /profile/5678. Missing Function Level Access Control là phân quyền theo chức năng: bạn không được phép gọi endpoint đó ngay từ đầu, ví dụ một user thường gọi thẳng POST /admin/deleteUser dù giao diện không hiện nút nào. Loại thứ nhất chặn bằng kiểm tra quyền sở hữu trên từng resource, loại thứ hai chặn bằng role hoặc policy gắn trên chính endpoint."
    },
    {
      question: "Dùng GUID thay cho id tuần tự có chặn được IDOR không?",
      answer: "Không. GUID chỉ làm việc đoán id trở nên bất khả thi, nên nó ngăn được kiểu quét hàng loạt từ 1 tới 100000, và vì vậy vẫn nên dùng. Nhưng GUID rò ra qua rất nhiều đường: response của endpoint danh sách, link chia sẻ, webhook, log, file export. Chỉ cần một id lọt ra ngoài là bản ghi đó mất hết lớp bảo vệ, vì lớp bảo vệ duy nhất ở đây là kẻ tấn công không biết chuỗi đó. Kiểm tra quyền sở hữu ở server mới là thứ không phụ thuộc vào việc id có bí mật hay không."
    },
    {
      question: "Nên trả 403 hay 404 khi người dùng truy cập bản ghi không thuộc về mình?",
      answer: "404 kín hơn, vì 403 vô tình xác nhận bản ghi đó có tồn tại và điều này đủ để suy ra thông tin trong nhiều bối cảnh nhạy cảm. Cách viết query đặt điều kiện sở hữu ngay trong WHERE cũng tự nhiên dẫn tới 404, vì không tìm thấy dòng nào cả. Nếu hệ thống của bạn cần phân biệt rõ giữa không tồn tại và không đủ quyền để hỗ trợ vận hành, hãy trả 403 nhưng luôn ghi log lại request đó."
    },
    {
      question: "Global query filter của EF Core có đủ để chặn IDOR không?",
      answer: "Đủ cho những ranh giới rộng và có thể diễn đạt bằng một điều kiện duy nhất như tenant hay soft delete, và ưu điểm lớn là mọi query đều bị áp dù người viết có nhớ hay không. Nhưng nó không bao được các luật phụ thuộc vào vai trò, chẳng hạn admin xem được tất cả còn manager chỉ xem được trong khu vực của mình, và nó bị vô hiệu hoàn toàn khi ai đó gọi IgnoreQueryFilters. Với những luật đó nên dùng resource-based authorization, và nhớ đánh index cho cột nằm trong filter."
    },
    {
      question: "Muốn tự tay thực hành tấn công IDOR thì bắt đầu từ đâu?",
      answer: "Dựng WebGoat rồi đi qua nhóm bài Broken Access Control theo thứ tự: đăng nhập hợp lệ trước, dùng Developer Tools so sánh response thô với dữ liệu hiển thị trên giao diện để tìm userId bị ẩn, suy ra mẫu URL truy cập hồ sơ theo id, rồi đổi id sang người khác và đổi method từ GET sang PUT để sửa dữ liệu của họ. Toàn bộ chuỗi đó chạy trên môi trường cố tình để lỗi, nên bạn thấy được cả cách tấn công lẫn chỗ thiếu kiểm tra quyền ở phía server."
    }
  ]}
/>

## Kết

IDOR không phải là một lỗi tinh vi. Nó là hệ quả trực tiếp của việc framework lo giúp bạn phần "anh là ai" và im lặng ở phần "anh được phép làm gì với cái này".

Nên thay vì nhớ viết một câu kiểm tra ở mỗi endpoint, hãy dựng một tầng khiến việc quên trở nên khó: điều kiện sở hữu nằm trong query, query filter ở `DbContext`, và một handler duy nhất cho mỗi loại resource. Rồi thêm vài integration test khẳng định A không đọc được dữ liệu của B — đó mới là thứ còn giữ được kết quả sau nhiều tháng và nhiều người cùng sửa code.

## Bài liên quan

- [Module 10 — Authentication + Authorization](/docs/dotnet-backend-zero-to-senior/stage-03-aspnet-core-backend/module-10-authentication-authorization) — Xác thực & phân quyền ASP.NET Core: JWT, OAuth2/OIDC, cookie, policy-based authorization — mô hình bảo mật đa tenant cho CRM.
- [2.03 | Insecure Direct Object References](/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/insecure-direct-object-references-03) — Một nguyên tắc quan trọng trong tấn công bảo mật ứng dụng (AppSec) là so sánh sự khác biệt giữa phản hồi thô từ server và dữ liệu hiển thị trên giao…
- [2.06 | Insecure Direct Object References](/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/insecure-direct-object-references-06) — Câu hỏi quan trọng: Bạn đã tài liệu hóa các quy tắc kiểm soát truy cập chưa?
