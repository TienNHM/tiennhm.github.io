# Forward header trong ASP.NET Core: vì sao 'forward hết' là một lỗi kiến trúc

> Nguồn: https://tiennhm.io.vn/blog/forward-http-header-an-toan-aspnet-core
> Vòng lặp copy mọi header từ request đi vào sang lời gọi HttpClient đi ra là đoạn code trông vô hại nhất mà tôi từng thấy gây sự cố production. Bài viết phân tích ba nhóm rủi ro của nó, trình bày pattern allowlist bằng DelegatingHandler đúng cách, cái bẫy captive dependency khi viết handler đó, và cách lọc ở gateway bằng YARP.

> Vòng lặp copy mọi header từ request đi vào sang request đi ra là một **anti-pattern**, và nó hỏng theo ba hướng khác nhau: sai về tính đúng đắn (một giá trị non-ASCII làm `HttpClient` ném exception), sai về bảo mật (bạn tin và chuyển tiếp dữ liệu do client tự đặt), và sai về kiến trúc (header do hạ tầng chèn trở thành một phần hợp đồng của ứng dụng). Cách sửa là **allowlist** — khai tường minh danh sách header được phép đi qua — đặt trong một `DelegatingHandler` dùng chung. Khi viết handler đó, cẩn thận một cái bẫy: nó **không** sống trong scope của request.

Bài này khép lại cụm ba bài bắt đầu từ [một sự cố production](https://tiennhm.io.vn/blog/cloudflare-header-broke-dotnet-httpclient) trên nền tảng loyalty khoảng ba triệu khách hàng, nơi header `cf-ipcity: Hồ Chí Minh` do Cloudflare chèn làm hỏng một lời gọi nội bộ. Bài đầu kể sự cố, [bài hai](https://tiennhm.io.vn/blog/http-header-unicode-ascii-dotnet) giải thích vì sao header không mang được tiếng Việt. Bài này trả lời câu hỏi còn lại: **viết lại chỗ đó thế nào cho đúng.**

## Tóm tắt nhanh (TL;DR)
- Forward toàn bộ header là anti-pattern, hỏng theo **ba hướng**: đúng đắn, bảo mật, kiến trúc.
- Dùng **allowlist**, không dùng blocklist — vì bạn không kiểm soát danh sách header mà hạ tầng chèn.
- Đặt logic ở **một** `DelegatingHandler` dùng chung, không rải ở từng call site.
- `DelegatingHandler` **không** nằm trong scope của request: đừng inject service `Scoped` vào nó.
- Lọc ở gateway (YARP) là lớp phòng thủ thứ hai, không thay thế lớp thứ nhất.
- Viết một test gửi giá trị non-ASCII để kết quả còn giữ được về sau.

---

## Đoạn code có vấn đề
Nó trông như thế này, và nó xuất hiện trong gần như mọi codebase microservice tôi từng đọc:

```csharp
// Giữ ngữ cảnh truy vết khi gọi sang service khác
foreach (var header in httpContext.Request.Headers)
{
    outgoing.Headers.TryAddWithoutValidation(
        header.Key,
        header.Value.ToArray());
}
```

Ý định hoàn toàn chính đáng: giữ correlation ID, giữ token, để trace nối được qua nhiều service. Vấn đề nằm ở chữ **mọi**.

---

## Ba hướng hỏng
### 1. Tính đúng đắn

Đây là hướng đã gây ra sự cố. Cloudflare chèn `cf-ipcity` với giá trị là tên thành phố của khách. Với khách Việt Nam thì giá trị đó có dấu, và `HttpClient` **từ chối gửi** — ném `HttpRequestException` ngay tại `SendAsync`, khi chưa byte nào rời khỏi tiến trình. Chi tiết cơ chế nằm ở [bài hai](https://tiennhm.io.vn/blog/http-header-unicode-ascii-dotnet).

Điều làm nó khó chịu: lỗi phụ thuộc vào **dữ liệu của người dùng**, nên nó không xuất hiện ở dev, không xuất hiện trong test, và xuất hiện không đều trên production.

### 2. Bảo mật

Hướng này nghiêm trọng hơn nhưng ít được nói tới.

Khi bạn forward mọi header, bạn đang **chuyển tiếp dữ liệu do client tự đặt** sang một service nội bộ. Service nội bộ thường tin tưởng thứ đến từ bên trong mạng nhiều hơn thứ đến từ Internet — và bạn vừa phá vỡ giả định đó.

Vài hệ quả cụ thể:

- Client đặt `X-Forwarded-For` giả, bạn chuyển tiếp, service phía sau ghi log sai IP và rate limit theo IP trở nên vô dụng. Đây đúng là vấn đề mà [`forwardedheaders.trustedips` trong Traefik](https://tiennhm.io.vn/blog/traefik-cloudflare-https-tu-dong-vps) sinh ra để chặn — và forward mù sẽ mở lại nó ở tầng ứng dụng.
- Client đặt một header nội bộ kiểu `X-Internal-Admin` hay `X-Tenant-Id`, bạn chuyển tiếp, và service phía sau có thể tin. Đây là cùng một họ tư duy với [IDOR](https://tiennhm.io.vn/blog/idor-broken-access-control-aspnet-core): **dữ liệu từ request là dữ liệu chưa tin được**, kể cả khi nó nằm ở header chứ không phải ở URL.
- Header `Cookie` và `Authorization` của người dùng bị gửi sang một service lẽ ra không cần thấy chúng, mở rộng phạm vi rò rỉ nếu service đó ghi log đầy đủ.

### 3. Kiến trúc

Forward mù biến **mọi header mà hạ tầng chèn vào** thành một phần hợp đồng ngầm của ứng dụng bạn.

Cloudflare chèn hàng chục header và danh sách đó thay đổi theo thời gian. Thêm một ingress mới, đổi một gateway, bật một tính năng mới ở CDN — mỗi việc đều có thể thêm header. Với forward mù, mỗi thay đổi ở tầng hạ tầng là một thay đổi tiềm tàng ở tầng ứng dụng, mà không ai review.

---

## Allowlist, không phải blocklist
Phản xạ đầu tiên sau sự cố thường là xoá đúng cái header gây lỗi:

```csharp
// Không nên: chữa đúng một triệu chứng
context.Request.Headers.Remove("cf-ipcity");
```

Cách này chữa được hôm nay và hỏng lại vào lần sau, vì bạn đang liệt kê **thứ cần chặn** trong khi không kiểm soát được danh sách ấy.

Đảo ngược lại:

```csharp
// Nên: liệt kê thứ được phép, mọi thứ khác bị bỏ qua theo mặc định
private static readonly HashSet<string> ForwardedHeaders =
    new(StringComparer.OrdinalIgnoreCase)
    {
        "Authorization",
        "X-Correlation-ID",
        "X-Request-ID",
        "Accept-Language",
    };
```

Khác biệt không nằm ở số dòng code mà ở **hướng của mặc định**. Với allowlist, một header hạ tầng mới xuất hiện trong tương lai sẽ không đi đâu cả, và không ai phải nhớ gì. Đây cùng một nguyên tắc với `exposedbydefault=false` của Traefik, hay với việc [áp filter quyền ở tầng query thay vì tầng UI](https://tiennhm.io.vn/blog/idor-broken-access-control-aspnet-core): **làm cho việc quên trở nên vô hại.**

---

## Đặt nó ở đâu: `DelegatingHandler`
Rải vòng lặp forward ở từng call site nghĩa là mỗi chỗ mới lại phải nhớ. Đặt nó vào một `DelegatingHandler` thì quy tắc nằm ở đúng một nơi và tự áp cho mọi lời gọi.

```csharp
public sealed class HeaderPropagationHandler : DelegatingHandler
{
    private static readonly HashSet<string> Allowed =
        new(StringComparer.OrdinalIgnoreCase)
        {
            "Authorization",
            "X-Correlation-ID",
            "X-Request-ID",
            "Accept-Language",
        };

    private readonly IHttpContextAccessor _accessor;

    public HeaderPropagationHandler(IHttpContextAccessor accessor)
        => _accessor = accessor;

    protected override Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request,
        CancellationToken cancellationToken)
    {
        var incoming = _accessor.HttpContext?.Request.Headers;

        if (incoming is not null)
        {
            foreach (var name in Allowed)
            {
                // Không ghi đè thứ mà chính lời gọi đã tự đặt
                if (request.Headers.Contains(name))
                    continue;

                if (incoming.TryGetValue(name, out var value))
                    request.Headers.TryAddWithoutValidation(name, value.ToArray());
            }
        }

        return base.SendAsync(request, cancellationToken);
    }
}
```

Đăng ký:

```csharp
builder.Services.AddHttpContextAccessor();
builder.Services.AddTransient<HeaderPropagationHandler>();

builder.Services
    .AddHttpClient<ILoyaltyClient, LoyaltyClient>(c =>
        c.BaseAddress = new Uri(builder.Configuration["Loyalty:BaseUrl"]!))
    .AddHttpMessageHandler<HeaderPropagationHandler>();
```

### Cái bẫy: handler không sống trong scope của request

Đây là chỗ dễ sai nhất, và nó không hiển nhiên.

`IHttpClientFactory` **gộp và tái dùng** chuỗi message handler, mặc định khoảng hai phút, để tránh vừa cạn cổng vừa mất khả năng cập nhật DNS. Nghĩa là instance `DelegatingHandler` của bạn **sống lâu hơn một request rất nhiều** và được nhiều request dùng chung.

Hệ quả trực tiếp: **đừng inject service `Scoped` vào handler.** Nếu bạn nhận thẳng một `ICurrentUser` hay một `DbContext` vào constructor của handler, bạn vừa tạo ra đúng [captive dependency mà tôi đã viết riêng một bài](https://tiennhm.io.vn/blog/singleton-scoped-transient-captive-dependency) — service ngắn hạn bị giữ lại bởi một consumer sống lâu, và mọi request sau sẽ dùng ngữ cảnh của request đầu tiên.

Cách đúng là nhận `IHttpContextAccessor`, vốn là singleton và tra cứu ngữ cảnh **tại thời điểm gọi** thay vì giữ nó. Đó là lý do đoạn code ở trên viết như vậy chứ không inject thẳng thứ nó cần.

---

## Lớp thứ hai: lọc ở gateway
Nếu hệ thống của bạn có một gateway đứng trước, lọc thêm ở đó là hợp lý — không phải để thay thế allowlist trong ứng dụng, mà để giảm bề mặt trước khi request tới nơi.

Với [YARP](https://microsoft.github.io/reverse-proxy/articles/transforms.html), transform làm việc này gọn gàng:

```json
{
  "ReverseProxy": {
    "Routes": {
      "loyalty": {
        "ClusterId": "loyalty",
        "Match": { "Path": "/api/loyalty/{**catch-all}" },
        "Transforms": [
          { "RequestHeaderRemove": "cf-ipcity" },
          { "RequestHeaderRemove": "cf-ipcountry" },
          { "RequestHeadersCopy": "false" },
          { "RequestHeader": "X-Correlation-ID", "Append": "" }
        ]
      }
    }
  }
}
```

`RequestHeadersCopy: false` là công tắc đáng chú ý nhất: nó tắt hẳn việc sao chép mặc định, để bạn khai lại đúng những gì cần. Cũng vẫn là allowlist, chỉ ở tầng khác.

Nguyên tắc chung: **lọc ở gateway là phòng thủ theo chiều sâu, không phải chỗ đặt quy tắc duy nhất.** Một service có thể được gọi từ nơi khác ngoài gateway — từ một job nền, từ một service khác, từ một test — và lúc đó lớp phòng thủ ở gateway không có mặt.

---

## Giữ kết quả bằng test
Sửa xong mà không có test thì vài tháng nữa sẽ có người thêm lại vòng lặp forward-tất-cả, vì nó vẫn trông hợp lý như ngày đầu.

Test đáng viết nhất là test dùng đúng dữ liệu đã gây ra sự cố:

```csharp
[Fact]
public async Task Khong_forward_header_ha_tang_co_ky_tu_non_ascii()
{
    // Request đi vào mang đúng header đã gây sự cố trên production
    var context = new DefaultHttpContext();
    context.Request.Headers["cf-ipcity"] = "Hồ Chí Minh";
    context.Request.Headers["X-Correlation-ID"] = "abc-123";

    var handler = new HeaderPropagationHandler(Accessor(context))
    {
        InnerHandler = new CapturingHandler(out var captured)
    };

    await new HttpMessageInvoker(handler)
        .SendAsync(new HttpRequestMessage(HttpMethod.Get, "http://downstream/"), default);

    Assert.False(captured.Headers.Contains("cf-ipcity"));       // bị chặn
    Assert.True(captured.Headers.Contains("X-Correlation-ID")); // vẫn đi qua
}
```

Hai khẳng định, và cả hai đều cần thiết: một để chắc rằng thứ nguy hiểm bị chặn, một để chắc rằng bạn không chặn nhầm thứ hệ thống đang phụ thuộc vào.

**Rà soát chỗ forward header trong service của bạn**

- [ ] Tìm mọi vòng lặp copy toàn bộ header sang HttpClient hoặc sang proxy
- [ ] Đổi sang allowlist tên header tường minh, mặc định là không forward
- [ ] Gom quy tắc vào một DelegatingHandler thay vì rải ở từng call site
- [ ] Trong handler dùng IHttpContextAccessor, tuyệt đối không inject service Scoped
- [ ] Đừng ghi đè header mà chính lời gọi đã tự đặt
- [ ] Thêm lớp lọc ở gateway như phòng thủ thứ hai, không phải thay thế
- [x] Viết test với một giá trị header non-ASCII để giữ kết quả về sau

---

## Câu hỏi thường gặp

### Vì sao không nên forward toàn bộ header sang request đi ra?

Vì nó hỏng theo ba hướng. Về tính đúng đắn, một header do hạ tầng chèn có thể mang giá trị non-ASCII và làm HttpClient ném exception ngay lúc gửi. Về bảo mật, bạn chuyển tiếp dữ liệu do client tự đặt vào một service nội bộ vốn tin tưởng thứ đến từ bên trong mạng, mở đường cho giả mạo X-Forwarded-For hay các header nội bộ. Về kiến trúc, mọi header mà CDN hay gateway chèn vào trở thành một phần hợp đồng ngầm của ứng dụng, nên mỗi thay đổi hạ tầng là một thay đổi tiềm tàng của ứng dụng mà không ai review.

### Nên dùng allowlist hay blocklist khi lọc header?

Allowlist. Blocklist đòi bạn liệt kê thứ cần chặn, trong khi danh sách header mà Cloudflare hay gateway chèn vào có hàng chục mục và thay đổi theo thời gian mà bạn không kiểm soát. Với allowlist, một header hạ tầng mới xuất hiện trong tương lai sẽ không đi đâu cả và không ai phải nhớ gì. Khác biệt không nằm ở số dòng code mà ở hướng của mặc định.

### Có được inject service Scoped vào DelegatingHandler không?

Không. IHttpClientFactory gộp và tái dùng chuỗi message handler trong khoảng hai phút theo mặc định, nên instance handler sống lâu hơn một request rất nhiều và được nhiều request dùng chung. Inject một service Scoped vào đó tạo ra captive dependency: mọi request sau sẽ dùng lại ngữ cảnh của request đầu tiên. Cách đúng là nhận IHttpContextAccessor, vốn là singleton và tra cứu ngữ cảnh tại thời điểm gọi thay vì giữ nó.

### Lọc header ở API gateway có đủ chưa?

Chưa, nó là lớp phòng thủ thứ hai. Một service thường được gọi từ nhiều đường ngoài gateway: từ background job, từ service khác trong cùng cụm, từ test tích hợp. Ở những đường đó lớp lọc tại gateway không có mặt. Nên đặt allowlist trong chính ứng dụng làm lớp thứ nhất, rồi lọc thêm ở gateway bằng YARP transforms để giảm bề mặt trước khi request đi tới.

### Những header nào thường đáng forward?

Chỉ những header thuộc giao thức nội bộ của bạn và thật sự cần ở phía sau: Authorization nếu service phía sau cần xác thực người dùng, X-Correlation-ID hoặc X-Request-ID để nối trace qua nhiều service, và Accept-Language nếu nội dung trả về phụ thuộc ngôn ngữ. Mọi thứ khác nên mặc định không đi qua, đặc biệt là header do CDN hay reverse proxy chèn và header do client tự đặt.

### Làm sao giữ được kết quả sau khi đã sửa?

Viết một test dùng đúng dữ liệu đã gây sự cố. Dựng một DefaultHttpContext có header cf-ipcity mang giá trị tiếng Việt có dấu cùng một X-Correlation-ID hợp lệ, cho request đi qua handler, rồi khẳng định hai điều: header hạ tầng không xuất hiện ở request đi ra, và header correlation thì có. Cần cả hai khẳng định, vì một cái chắc rằng thứ nguy hiểm bị chặn còn cái kia chắc rằng bạn không chặn nhầm thứ hệ thống đang phụ thuộc.

## Kết luận
Vòng lặp forward-tất-cả là đoạn code trông vô hại nhất mà tôi từng thấy gây ra sự cố production. Nó ngắn, ý định tốt, và đọc qua thì có vẻ như đang làm đúng thứ cần làm.

Cái sai của nó không nằm ở kỹ thuật mà ở **hướng mặc định**: nó cho mọi thứ đi qua trừ khi bạn chặn. Đảo lại thành chặn mọi thứ trừ khi bạn cho phép, thì cùng một sự cố ấy sẽ không bao giờ xảy ra — không phải vì ai đó nhớ ra `cf-ipcity`, mà vì **không ai cần nhớ gì cả.**

Đó là điều tôi mang đi từ cụm ba bài này. [Sự cố](https://tiennhm.io.vn/blog/cloudflare-header-broke-dotnet-httpclient) dạy tôi chỗ exception thật sự được ném ra. [Đặc tả](https://tiennhm.io.vn/blog/http-header-unicode-ascii-dotnet) dạy tôi vì sao byte và văn bản không phải một thứ. Còn bản sửa thì dạy tôi rằng thiết kế tốt là thiết kế mà việc quên không gây hậu quả.

---

**Cập nhật lần cuối**: Tháng 9, 2026

## Bài liên quan

- [Module 7 — Dependency Injection](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-02-csharp-professional/module-07-dependency-injection) — Dependency injection trong .NET: service lifetime, composition root, options pattern — khớp với container ASP.NET Core và kiểm thử đơn vị.
- [8.3 — 2. Request Pipeline và Middleware](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-03-aspnet-core-backend/module-08-aspnet-core-fundamentals/8.2-request-pipeline-and-middleware) — Pipeline là các lớp bọc nhau chứ không phải hàng đợi: Use/Run/Map, short-circuit, vì sao không ghi được header sau khi response đã bắt đầu, và…
- [Module 18 — Microservices](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-05-senior-engineering/module-18-microservices) — Microservices .NET: service boundaries, API gateway, resilience, observability — đánh đổi vận hành và tốc độ phát triển.
