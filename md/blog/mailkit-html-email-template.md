# MailKit trong .NET: gửi email SMTP và dựng HTML email template chạy đúng trên Outlook

> Nguồn: https://tiennhm.io.vn/blog/mailkit-html-email-template
> MailKit là thư viện mail mà chính tài liệu Microsoft khuyến nghị thay cho System.Net.Mail.SmtpClient. Bài này đi từ email đầu tiên tới HTML email template dùng được thật: vì sao phải quay về layout bằng table, vì sao CSS phải inline, vì sao thiếu bản plain-text là vào spam, cách nhúng ảnh bằng CID, và cách tích hợp vào ASP.NET Core mà không chặn request.

> MailKit là thư viện mail mã nguồn mở cho .NET (giấy phép MIT, tác giả Jeffrey Stedfast), nói được cả SMTP, IMAP và POP3. Tài liệu chính thức của Microsoft về `System.Net.Mail.SmtpClient` khuyến nghị thẳng việc dùng MailKit thay thế. Phần khó của việc gửi email không nằm ở chỗ gọi `SendAsync` — nó nằm ở cái HTML bên trong: Outlook classic render bằng engine của Word nên không có flex hay grid, Gmail cắt thư dài quá 102KB, và một thư chỉ có HTML mà thiếu bản plain-text thì điểm spam tăng ngay.

Gửi được email và gửi được email *hiển thị đúng* là hai bài toán khác nhau. Bài này giải quyết cả hai: phần đầu là cơ chế MailKit, phần sau là những ràng buộc rất cũ kỹ của HTML email mà không đọc trước thì sẽ mất buổi chiều ngồi hỏi vì sao cái template đẹp trên Chrome lại vỡ tan trên Outlook.

## MailKit là gì, và khác MimeKit chỗ nào

Hai thư viện này luôn đi cùng nhau nhưng làm hai việc tách bạch:

| | MimeKit | MailKit |
|---|---|---|
| Nhiệm vụ | Dựng và phân tích message theo chuẩn MIME | Nói chuyện với server qua giao thức |
| Phạm vi | `MimeMessage`, `BodyBuilder`, attachment, encoding, chữ ký S/MIME/PGP | `SmtpClient`, `ImapClient`, `Pop3Client`, xác thực, TLS |
| Quan hệ | Không phụ thuộc MailKit | Phụ thuộc MimeKit |

Nói ngắn: **MimeKit dựng lá thư, MailKit mang lá thư đi**. Cài `MailKit` thì NuGet tự kéo `MimeKit` theo, nên hầu như không bao giờ phải cài riêng.

```bash
dotnet add package MailKit
```

Cả hai đều là MIT, dùng cho dự án thương mại không phải trả phí và không phải công bố mã nguồn.

## Vì sao không dùng `System.Net.Mail.SmtpClient`

`SmtpClient` vẫn chạy, và với một script nội bộ gửi vài cái mail cảnh báo thì nó vẫn ổn. Vấn đề xuất hiện khi hệ thống lớn lên:

- **Chỉ có SMTP.** Không đọc được mail. Cần IMAP hay POP3 là phải tìm thư viện khác.
- **Async không thật.** `SendMailAsync` bọc mô hình bất đồng bộ cũ, không phải async I/O đúng nghĩa xuống socket.
- **OAuth2 rất chật vật.** Gmail và Microsoft 365 đã tắt xác thực bằng mật khẩu thường cho ứng dụng bên thứ ba; `SmtpClient` không có đường đi sạch cho OAuth2.
- **Kiểm soát TLS hạn chế.** Không chọn được rõ ràng giữa STARTTLS và TLS ngầm.

Trang tài liệu của Microsoft cho chính lớp này có ghi chú khuyến nghị chuyển sang MailKit — đây không phải ý kiến của cộng đồng mà là khuyến nghị từ phía Microsoft.

## Gửi email đầu tiên

```csharp
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

var message = new MimeMessage();
message.From.Add(new MailboxAddress("Utop Shop", "no-reply@utop.io"));
message.To.Add(new MailboxAddress("Minh Tiến", "tien@example.com"));
message.Subject = "Đơn hàng #12345 đã được xác nhận";

var body = new BodyBuilder
{
    HtmlBody = "<h1>Cảm ơn bạn</h1><p>Đơn hàng đang được chuẩn bị.</p>",
    TextBody = "Cảm ơn bạn. Đơn hàng đang được chuẩn bị."
};
message.Body = body.ToMessageBody();

using var client = new SmtpClient();
await client.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
await client.AuthenticateAsync("no-reply@utop.io", appPassword);
await client.SendAsync(message);
await client.DisconnectAsync(true);
```

Hai chỗ hay sai ngay ở đoạn ngắn này.

**Chọn đúng cổng và `SecureSocketOptions`.** Ghép sai cặp này là lỗi phổ biến nhất khi mới dùng MailKit:

| Cổng | `SecureSocketOptions` | Cơ chế |
|---|---|---|
| 587 | `StartTls` | Kết nối thường rồi nâng cấp lên TLS |
| 465 | `SslOnConnect` | TLS ngay từ byte đầu tiên |
| 25 | `None` / `StartTls` | Thường bị nhà mạng và cloud provider chặn |

Đừng dùng `SecureSocketOptions.Auto` khi đã biết chắc server — nó phải dò, và khi dò sai thì thông báo lỗi rất khó đọc.

**Gmail không nhận mật khẩu tài khoản.** Phải bật xác thực hai bước rồi tạo App Password riêng, hoặc đi đường OAuth2. Nhét mật khẩu đăng nhập thường vào đây sẽ luôn trả về lỗi xác thực.

## HTML email template

Đây là phần chiếm thời gian thật sự.

### HTML email không phải HTML web

Email client không phải trình duyệt. Vài ràng buộc phải chấp nhận:

- **Outlook classic trên Windows render bằng engine của Microsoft Word.** Không có `flex`, không có `grid`, `float` và `position` hành xử khó lường. Layout nhiều cột phải quay lại dùng `` — không phải vì cổ điển mà vì đó là thứ duy nhất render giống nhau ở mọi nơi.
- **CSS phải inline.** Nhiều client cắt hoặc bỏ qua khối `` trong ``. Style quan trọng phải nằm ở thuộc tính `style=""` của từng thẻ.
- **Gmail cắt thư dài quá 102KB.** Phần bị cắt nằm sau một liên kết "View entire message", và nếu nút CTA rơi vào phần đó thì coi như mất.
- **Ảnh bị chặn mặc định** ở nhiều client. Thư phải đọc được khi không có ảnh nào tải lên, nên `alt` không phải tùy chọn.
- **Không có JavaScript.** Mọi client đều tước bỏ.

### Một template tối thiểu nhưng đúng

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Xác nhận đơn hàng</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f7;">
  <!-- Bảng ngoài cùng: tô nền toàn chiều rộng -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
         style="background-color:#f4f4f7;">
    <tr>
      <td align="center" style="padding:24px 12px;">

        <!-- Bảng nội dung: khoá ở 600px, an toàn với mọi client -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"
               style="width:600px; max-width:100%; background-color:#ffffff;
                      border-radius:8px; font-family:Arial, Helvetica, sans-serif;">
          <tr>
            <td style="padding:32px 32px 16px 32px;">
              <h1 style="margin:0; font-size:22px; line-height:28px; color:#1a1a1a;">
                Đơn hàng đã được xác nhận
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 24px 32px; font-size:15px; line-height:24px; color:#444444;">
              Chào Minh Tiến, đơn hàng <strong>#12345</strong> đang được chuẩn bị.
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:0 32px 32px 32px;">
              <!-- Nút: dùng table, không dùng div bo góc -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" bgcolor="#2563eb" style="border-radius:6px;">
                    <a href="https://example.com/orders/12345"
                       style="display:inline-block; padding:12px 28px; font-size:15px;
                              color:#ffffff; text-decoration:none;">
                      Theo dõi đơn hàng
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>
```

Vài quyết định trong đoạn trên đều có lý do: `role="presentation"` để screen reader không đọc bảng như bảng dữ liệu; chiều rộng 600px vì đó là mức an toàn cho khung xem của Outlook; nút dựng bằng `` kèm `bgcolor` vì `div` bo góc không render ở Outlook.

### Điền dữ liệu vào template

Nối chuỗi bằng tay thì nhanh hỏng. Tách template ra file riêng rồi render, ví dụ bằng **Scriban**:

```bash
dotnet add package Scriban
```

```csharp
using Scriban;

var templateText = await File.ReadAllTextAsync("Templates/order-confirmed.html");
var template = Template.Parse(templateText);

var html = await template.RenderAsync(new
{
    customer_name = "Minh Tiến",
    order_id = "12345",
    track_url = "https://example.com/orders/12345"
});
```

Trong file HTML thì dùng cú pháp `{{ customer_name }}`. Scriban tự HTML-encode khi render, nên tên khách hàng có ký tự `<` hay `&` không phá vỡ layout.

Nếu đội đã quen Razor thì `RazorLight` cho phép dùng thẳng cú pháp `.cshtml`. Đổi lại là thêm một lớp biên dịch lúc chạy, khởi động chậm hơn.

### Inline CSS tự động

Viết `style=""` cho từng thẻ rất mệt. Cách thực dụng: viết CSS bình thường trong ``, rồi để thư viện đẩy nó vào inline trước khi gửi.

```bash
dotnet add package PreMailer.Net
```

```csharp
var result = PreMailer.Net.PreMailer.MoveCssInline(html, removeStyleElements: true);
var inlinedHtml = result.Html;
```

### Bản plain-text không phải tùy chọn

`BodyBuilder` khi có cả `TextBody` và `HtmlBody` sẽ tự dựng `multipart/alternative` — client nào đọc được HTML thì hiện HTML, còn lại rơi về text. Thư chỉ có HTML là một tín hiệu quen thuộc của thư rác, và nhiều bộ lọc cộng điểm spam vì nó.

```csharp
var body = new BodyBuilder
{
    HtmlBody = inlinedHtml,
    TextBody = "Đơn hàng #12345 đang được chuẩn bị.\nTheo dõi: https://example.com/orders/12345"
};
```

### Nhúng ảnh: CID hay hosted

```csharp
var builder = new BodyBuilder();
var logo = builder.LinkedResources.Add("Assets/logo.png");
logo.ContentId = MimeUtils.GenerateMessageId();
builder.HtmlBody = $"<img src=\"cid:{logo.ContentId}\" alt=\"Utop\" width=\"120\" />";
```

Ảnh nhúng theo kiểu CID đi kèm trong thư nên hiện được cả khi offline, nhưng làm thư nặng lên và một số client vẫn chặn. Ảnh đặt trên CDN thì thư nhẹ, sửa được sau khi gửi, đổi lại phụ thuộc việc người nhận cho phép tải ảnh. Với email giao dịch, logo nhúng CID còn ảnh sản phẩm để hosted là cách chia hợp lý.

## Tích hợp vào ASP.NET Core

```csharp
public sealed class SmtpOptions
{
    public string Host { get; init; } = "";
    public int Port { get; init; } = 587;
    public string User { get; init; } = "";
    public string Password { get; init; } = "";
    public string FromName { get; init; } = "";
    public string FromAddress { get; init; } = "";
}

public interface IEmailSender
{
    Task SendAsync(string toName, string toAddress, string subject,
                   string html, string text, CancellationToken ct = default);
}

public sealed class MailKitEmailSender : IEmailSender
{
    private readonly SmtpOptions _options;

    public MailKitEmailSender(IOptions<SmtpOptions> options) => _options = options.Value;

    public async Task SendAsync(string toName, string toAddress, string subject,
                                string html, string text, CancellationToken ct = default)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(_options.FromName, _options.FromAddress));
        message.To.Add(new MailboxAddress(toName, toAddress));
        message.Subject = subject;
        message.Body = new BodyBuilder { HtmlBody = html, TextBody = text }.ToMessageBody();

        // SmtpClient của MailKit KHÔNG thread-safe: tạo mới mỗi lần gửi,
        // đừng đăng ký Singleton rồi dùng chung giữa các request.
        using var client = new SmtpClient { Timeout = 15_000 };
        await client.ConnectAsync(_options.Host, _options.Port, SecureSocketOptions.StartTls, ct);
        await client.AuthenticateAsync(_options.User, _options.Password, ct);
        await client.SendAsync(message, ct);
        await client.DisconnectAsync(true, ct);
    }
}
```

```csharp
builder.Services.Configure<SmtpOptions>(builder.Configuration.GetSection("Smtp"));
builder.Services.AddScoped<IEmailSender, MailKitEmailSender>();
```

Ba điểm đáng nhớ:

**`SmtpClient` của MailKit không thread-safe.** Đăng ký `Singleton` rồi để nhiều request cùng gọi là cách tạo ra lỗi ngẫu nhiên rất khó tái hiện. Tạo mới mỗi lần gửi, hoặc dựng một pool có khoá rõ ràng.

**Đừng gửi email ngay trong luồng xử lý request.** Bắt tay TLS và xác thực SMTP mất vài trăm mili giây tới vài giây, và server mail ở ngoài tầm kiểm soát. Đẩy vào hàng đợi rồi để `BackgroundService` gửi:

```csharp
public sealed class EmailQueue
{
    private readonly Channel<EmailJob> _channel =
        Channel.CreateBounded<EmailJob>(new BoundedChannelOptions(1000)
        {
            FullMode = BoundedChannelFullMode.Wait
        });

    public ValueTask EnqueueAsync(EmailJob job, CancellationToken ct = default)
        => _channel.Writer.WriteAsync(job, ct);

    public IAsyncEnumerable<EmailJob> ReadAllAsync(CancellationToken ct)
        => _channel.Reader.ReadAllAsync(ct);
}
```

**Chỉ gửi sau khi transaction đã commit.** Email đã bay đi thì không thu hồi được, nên gửi trước khi commit mà sau đó rollback là người dùng nhận thư xác nhận cho một đơn hàng không tồn tại. Cơ chế đăng ký callback chạy sau commit tôi đã viết riêng trong bài [Unit of Work trong .NET và ABP](https://tiennhm.io.vn/blog/unit-of-work-dotnet-abp).

**Gửi hàng loạt thì giữ một kết nối.** Đừng `Connect`/`Disconnect` cho từng thư:

```csharp
using var client = new SmtpClient();
await client.ConnectAsync(host, 587, SecureSocketOptions.StartTls, ct);
await client.AuthenticateAsync(user, password, ct);

foreach (var message in messages)
{
    await client.SendAsync(message, ct);
}

await client.DisconnectAsync(true, ct);
```

## Đọc email bằng IMAP

Đây là phần `System.Net.Mail` không làm được.

```csharp
using MailKit;
using MailKit.Net.Imap;
using MailKit.Search;

using var client = new ImapClient();
await client.ConnectAsync("imap.gmail.com", 993, SecureSocketOptions.SslOnConnect);
await client.AuthenticateAsync(user, appPassword);

var inbox = client.Inbox;
await inbox.OpenAsync(FolderAccess.ReadOnly);

// Thư chưa đọc trong 7 ngày gần nhất
var query = SearchQuery.NotSeen.And(
    SearchQuery.DeliveredAfter(DateTime.UtcNow.AddDays(-7)));

foreach (var uid in await inbox.SearchAsync(query))
{
    var message = await inbox.GetMessageAsync(uid);
    Console.WriteLine($"{message.Date:yyyy-MM-dd} | {message.From} | {message.Subject}");
}

await client.DisconnectAsync(true);
```

POP3 dùng `Pop3Client` với API tương tự nhưng đơn giản hơn nhiều: không có thư mục, không có trạng thái đã đọc, chỉ tải về rồi xoá. Trừ khi buộc phải nói chuyện với một server cũ, IMAP luôn là lựa chọn đúng.

## OAuth2 cho Gmail và Microsoft 365

Cả Google lẫn Microsoft đều đã tắt dần xác thực bằng mật khẩu thường cho ứng dụng bên thứ ba. Với ứng dụng chạy thật, hướng đi là OAuth2:

```csharp
var oauth2 = new SaslMechanismOAuth2(userEmail, accessToken);
await client.AuthenticateAsync(oauth2, ct);
```

Phần lấy `accessToken` nằm ngoài MailKit — đó là việc của thư viện OAuth tương ứng (`Google.Apis.Auth` hoặc MSAL). MailKit chỉ nhận token đã có.

## Vì sao email vẫn vào spam dù code chạy đúng

Đây gần như luôn là vấn đề cấu hình tên miền chứ không phải lỗi lập trình:

- **SPF** — bản ghi TXT khai báo server nào được phép gửi thay mặt tên miền.
- **DKIM** — chữ ký số cho thư, chứng minh nội dung không bị sửa dọc đường.
- **DMARC** — chính sách cho biết phải làm gì khi SPF hoặc DKIM thất bại.

Thiếu ba thứ này thì dù thư dựng chuẩn tới đâu, Gmail vẫn có lý do để nghi ngờ. Ngoài ra khi lượng gửi lớn, tự vận hành SMTP là chuốc thêm việc: danh tiếng IP, giới hạn tốc độ, xử lý bounce. Lúc đó nên để MailKit nói chuyện với SMTP relay của một nhà cung cấp chuyên dụng thay vì gửi trực tiếp.

### MailKit là gì?

MailKit là thư viện mail mã nguồn mở cho .NET do Jeffrey Stedfast phát triển, hỗ trợ SMTP để gửi thư và IMAP, POP3 để đọc thư. Nó đi kèm MimeKit, thư viện chịu trách nhiệm dựng và phân tích message theo chuẩn MIME. Cả hai phát hành theo giấy phép MIT.

### MailKit có miễn phí cho dự án thương mại không?

Có. MailKit và MimeKit dùng giấy phép MIT, nên được dùng trong sản phẩm thương mại mà không phải trả phí bản quyền và không buộc phải mở mã nguồn dự án của bạn.

### MailKit khác MimeKit ở chỗ nào?

MimeKit lo phần nội dung lá thư: dựng MimeMessage, xử lý attachment, encoding, chữ ký. MailKit lo phần giao thức: kết nối tới server, xác thực, TLS, gửi qua SMTP hoặc đọc qua IMAP và POP3. MailKit phụ thuộc MimeKit, nên cài MailKit là có sẵn cả hai.

### System.Net.Mail.SmtpClient còn dùng được không?

Vẫn chạy được, nhưng tài liệu chính thức của Microsoft khuyến nghị chuyển sang MailKit. SmtpClient chỉ gửi được chứ không đọc được thư, không hỗ trợ OAuth2 một cách thuận tiện, và phần bất đồng bộ chỉ là lớp bọc quanh mô hình cũ chứ không phải async I/O thật.

### Vì sao template HTML đẹp trên trình duyệt lại vỡ trên Outlook?

Vì Outlook classic trên Windows render email bằng engine của Microsoft Word chứ không phải engine trình duyệt. Nó không hỗ trợ flexbox và grid, xử lý float thất thường. Giải pháp là dựng layout bằng thẻ table lồng nhau, đặt CSS trực tiếp vào thuộc tính style của từng thẻ, và làm nút bằng table kèm bgcolor thay vì div bo góc.

### Có bắt buộc phải kèm bản plain-text không?

Về kỹ thuật thì không, nhưng nên có. Khi BodyBuilder có cả HtmlBody và TextBody, MailKit dựng message dạng multipart/alternative để client không đọc được HTML vẫn hiển thị đúng. Thư chỉ chứa HTML là một đặc điểm quen thuộc của thư rác nên nhiều bộ lọc cộng thêm điểm spam.

### SmtpClient của MailKit có dùng chung giữa nhiều request được không?

Không. SmtpClient của MailKit không thread-safe. Đăng ký nó dưới dạng Singleton rồi để nhiều request cùng gọi sẽ sinh ra lỗi ngẫu nhiên khó tái hiện. Hãy tạo instance mới cho mỗi lần gửi, hoặc khi gửi hàng loạt thì giữ một kết nối và gửi tuần tự trong cùng một luồng.

### Dùng MailKit trong VB.NET hay PowerShell được không?

Được. MailKit là thư viện .NET tiêu chuẩn nên mọi ngôn ngữ chạy trên .NET đều gọi được, kể cả VB.NET. Với PowerShell thì nạp assembly bằng Add-Type rồi dùng trực tiếp các lớp MimeMessage và SmtpClient.

### Vì sao Gmail báo lỗi xác thực dù mật khẩu đúng?

Gmail không chấp nhận mật khẩu đăng nhập thường cho kết nối SMTP từ ứng dụng bên thứ ba. Phải bật xác thực hai bước rồi tạo App Password riêng cho ứng dụng, hoặc dùng OAuth2 với SaslMechanismOAuth2. Ngoài ra cần ghép đúng cổng 587 với StartTls hoặc cổng 465 với SslOnConnect.

## Tham khảo

- [MailKit trên GitHub](https://github.com/jstedfast/MailKit) — mã nguồn và tài liệu API
- [MimeKit trên GitHub](https://github.com/jstedfast/MimeKit) — phần dựng và phân tích MIME
- [Tài liệu SmtpClient của Microsoft](https://learn.microsoft.com/dotnet/api/system.net.mail.smtpclient) — ghi chú khuyến nghị dùng MailKit
