---
title: "Một dấu tiếng Việt làm chết lời gọi API: cf-ipcity, HttpClient và giới hạn ASCII"
slug: cloudflare-header-broke-dotnet-httpclient
description: "Trên một nền tảng loyalty thương mại điện tử khoảng 3 triệu khách hàng, một lời gọi HTTP nội bộ hỏng trên production trong khi database, Kubernetes và downstream đều khoẻ. Thủ phạm là header cf-ipcity của Cloudflare mang giá trị Hồ Chí Minh. Bài viết truy vết sự cố và chỉ ra chỗ .NET thực sự ném exception — không phải chỗ bạn đoán."
keywords: [cloudflare header dotnet httpclient, cf-ipcity, non ascii http header, unicode http header, request headers must contain only ascii characters, httpclient exception, tryaddwithoutvalidation, aspnet core header forwarding, production debugging dotnet, kubernetes dotnet debugging, reverse proxy header, cloudflare geolocation header, header forwarding anti pattern, loyalty ecommerce dotnet, dau tieng viet loi api, loi httpclient production, debug su co production]
tags: [dotnet, csharp, cloudflare, http, production, debugging, architecture, aspnetcore]
authors: [tiennhm]
date: 2026-09-23
---

import { SummaryBox, FAQSection } from '@site/src/components/SEO';

# Một dấu tiếng Việt làm chết lời gọi API

<SummaryBox>
[Cloudflare](/blog/traefik-cloudflare-https-tu-dong-vps) tự chèn `cf-ipcity` vào request đi vào, và với khách ở Việt Nam thì giá trị là `Hồ Chí Minh` — có dấu, tức **non-ASCII**. Service .NET forward nguyên xi mọi header sang lời gọi đi ra, nên giá trị đó rơi vào `HttpClient`. Điều bất ngờ là `Headers.Add` **không** ném exception, `TryAddWithoutValidation` cũng trả về `true`; mọi thứ chỉ nổ ở `SendAsync` với `HttpRequestException: Request headers must contain only ASCII characters`, và **không byte nào rời khỏi tiến trình**. Lỗi không nằm ở Cloudflare cũng không nằm ở .NET, mà ở chỗ ứng dụng forward mọi header vô điều kiện.
</SummaryBox>

Bối cảnh là một nền tảng loyalty thương mại điện tử, quy mô khoảng ba triệu khách hàng. Tôi ẩn tên khách và mọi chi tiết định danh; phần kể được là phần kỹ thuật.

Mọi thứ nhìn đều bình thường. API đang chạy. Pod trên Kubernetes healthy. Database ổn. Request vào tới ứng dụng. Nhưng một lời gọi HTTP sang service nội bộ cứ hỏng trên production — và chỉ trên production.

Thứ làm nó hỏng, hoá ra, là **tên thành phố của chính người dùng**.

<!-- truncate -->

## Tóm tắt nhanh (TL;DR) {#tldr}

- **Triệu chứng**: một lời gọi `HttpClient` hỏng trên production, mọi thành phần hạ tầng đều khoẻ.
- **Nguyên nhân trực tiếp**: header `cf-ipcity: Hồ Chí Minh` do Cloudflare chèn, bị forward sang request đi ra.
- **Chỗ ném lỗi không phải chỗ bạn đoán**: `Add()` không ném, `TryAddWithoutValidation()` trả `true`, lỗi nổ ở `SendAsync`.
- **Thông báo lỗi thật**: `HttpRequestException: Request headers must contain only ASCII characters.`
- **Request chưa từng rời tiến trình** — không có byte nào lên dây.
- Vì sao header không mang được tiếng Việt: xem [bài 2 về ASCII và obs-text](/blog/http-header-unicode-ascii-dotnet).
- Cách sửa đúng: xem [bài 3 về forward header an toàn](/blog/forward-http-header-an-toan-aspnet-core).

---

## Phần 1 — Cuộc truy tìm {#cuoc-truy-tim}

Khi một lời gọi nội bộ hỏng trên production mà không hỏng ở đâu khác, danh sách nghi phạm thường đi theo thứ tự quen thuộc, và lần này tất cả đều sạch.

| Nghi phạm | Kết quả |
|---|---|
| Database | khoẻ |
| Redis | khoẻ |
| Pod / Kubernetes | healthy |
| Downstream service | khoẻ, gọi thẳng vẫn được |
| Authentication, token | hợp lệ |
| DNS, TLS | bình thường |

Điều làm chuyện này khó chịu là **request trông hoàn toàn vô hại**. Không payload lạ, không ký tự điều khiển, không gì to bất thường. Và nó chạy tốt ở local.

Chính chỗ "chạy tốt ở local" mới là manh mối, dù lúc đó chưa ai nhận ra. Vì local thì luồng là:

```
Trình duyệt → .NET API
```

Còn production thì:

```
Trình duyệt → Cloudflare → API Gateway → .NET Service → HttpClient → Downstream
```

Production có thêm hai tác nhân **chèn thêm dữ liệu vào request**, mà local không có.

---

## Phần 2 — Header gây ra tất cả {#header-gay-ra-tat-ca}

Cloudflare chèn một số header vào request đi vào để ứng dụng biết thông tin về client. Một trong số đó là [header vị trí địa lý](https://developers.cloudflare.com/fundamentals/reference/http-headers/):

```http
cf-ipcity: Hồ Chí Minh
```

Nhìn thì vô hại đến mức không ai dừng lại ở nó. Nhưng:

```
Hồ Chí Minh
 ^     ^
 ồ     í   ← non-ASCII
```

Và service của chúng tôi có một đoạn code trông rất hợp lý, kiểu này:

```csharp
// Forward mọi header từ request đi vào sang request đi ra
foreach (var header in incoming.Headers)
{
    outgoing.Headers.TryAddWithoutValidation(
        header.Key,
        header.Value.ToArray());
}
```

Đoạn code đó tồn tại vì một lý do chính đáng: giữ correlation ID, giữ token, giữ ngữ cảnh truy vết qua nhiều service. Vấn đề là nó không phân biệt header nào **của mình** với header nào **do hạ tầng chèn vào**. Phần sửa nằm ở [bài 3](/blog/forward-http-header-an-toan-aspnet-core).

---

## Phần 3 — Chỗ ném lỗi không phải chỗ bạn đoán {#cho-nem-loi}

Đây là phần tôi thấy đáng giá nhất, vì trực giác của gần như mọi người đều sai ở đây — kể cả trực giác của tôi trước khi ngồi đo.

Tôi dựng lại bằng một chương trình tối thiểu trên **.NET 9.0.4**, kèm một `TcpListener` thô để xem chính xác byte nào lên dây.

**Thử 1 — `Add()` có validation:**

```csharp
client.DefaultRequestHeaders.Add("cf-ipcity", "Hồ Chí Minh");
```

```
=> KHÔNG ném exception
```

Đây là điều bất ngờ đầu tiên. Rất nhiều câu trả lời trên mạng nói bạn sẽ nhận `FormatException` ngay ở bước này. Không hề. Bộ validation của `HttpHeaders` kiểm **cấu trúc** của giá trị — ký tự điều khiển, xuống dòng, định dạng theo từng header — chứ **không** kiểm việc giá trị có nằm trong bảng mã ASCII hay không.

**Thử 2 — `TryAddWithoutValidation()` rồi gửi thật:**

```csharp
var ok = request.Headers.TryAddWithoutValidation("cf-ipcity", "Hồ Chí Minh");
// ok == True
var response = await client.SendAsync(request);
```

```
TryAddWithoutValidation trả về: True
=> NÉM HttpRequestException: Request headers must contain only ASCII characters.
```

Đây là điểm mấu chốt. Header được thêm vào thành công. Đối tượng request hợp lệ. Lỗi chỉ xuất hiện khi `SendAsync` đi tới tầng serialize header ra byte.

**Và server thấy gì?**

```
header trên dây : (không có)
byte (hex)      : (không thấy header)
```

**Không một byte nào.** Kết nối TCP không hề mang request đó. Nó chết bên trong tiến trình, trước khi chạm socket.

Hệ quả thực tế của chi tiết này lớn hơn vẻ ngoài của nó: mọi công cụ bạn quen dùng để gỡ lỗi mạng đều **vô dụng**. Bắt gói tin không thấy gì. Access log của downstream trống trơn. Trace phía nhận không có span nào. Từ mọi góc nhìn bên ngoài tiến trình, request đó **chưa từng tồn tại**.

`Hồ` thậm chí không biểu diễn được bằng Latin-1, nên kể cả con đường khoan dung nhất mà đặc tả HTTP từng cho phép cũng không tải nổi giá trị này — phần đó tôi tách riêng sang [bài 2](/blog/http-header-unicode-ascii-dotnet).

---

## Phần 4 — Vì sao vào được mà ra không được {#vao-duoc-ra-khong-duoc}

Câu hỏi hợp lý tiếp theo: nếu header đó không hợp lệ, sao ASP.NET Core **nhận** được nó ngay từ đầu?

Vì nhận và gửi là hai thao tác khác nhau, với hai mức khoan dung khác nhau.

| | Request đi vào | Request đi ra |
|---|---|---|
| Vai trò | Server đọc byte từ dây | Client ghi byte lên dây |
| Nguyên tắc | Khoan dung với thứ nhận được | Nghiêm ngặt với thứ phát ra |
| Hành vi | Giải mã byte thành chuỗi, chấp nhận | Từ chối nếu không biểu diễn được |

Đây chính là [nguyên tắc robustness](https://en.wikipedia.org/wiki/Robustness_principle): khoan dung với thứ bạn nhận, chặt chẽ với thứ bạn gửi. Server HTTP nhận một byte non-ASCII trong header thì nó cứ giải mã và đưa lên cho ứng dụng, vì từ chối cả request chỉ vì một byte lạ sẽ làm hỏng nhiều thứ đang chạy được. Còn khi chính bạn đứng ở vai client, .NET chọn từ chối phát ra thứ mà nó không thể biểu diễn đúng.

**Sai lầm ngầm định trong đoạn code forward là: "cái gì vào được thì ra được".** Nó không đúng, và nó sẽ không đúng ở bất kỳ ngôn ngữ nào chứ không riêng .NET.

---

## Phần 5 — Vì sao local không bao giờ bắt được {#vi-sao-local-khong-bat-duoc}

Đây là phần đáng mang đi nhất, vì nó đúng cho cả những sự cố không liên quan gì tới header.

Ở local, request đi thẳng từ trình duyệt vào ứng dụng. Không có ai chèn thêm gì. Mọi header đều do bạn hoặc trình duyệt tạo ra, và chúng đều ASCII.

Trên production, giữa client và ứng dụng có **Cloudflare và một API Gateway**, cả hai đều **sửa đổi metadata của request**. Chúng không chỉ là đường ống. Chúng thêm dữ liệu, và dữ liệu ấy đến từ thế giới thật — nơi tên thành phố có dấu.

Cùng một họ với chuyện tôi viết trong bài về [Traefik và Cloudflare](/blog/traefik-cloudflare-https-tu-dong-vps): thứ đứng trước ứng dụng không phải tầng vận chuyển trung lập, nó là một tác nhân có hành vi riêng, và nó chỉ xuất hiện trong sơ đồ production. Cũng giống chuyện [mặc định Server GC của .NET](/blog/dotnet-workstation-gc-giam-ram-container) chỉ lộ vấn đề khi vào container: **mặc định nào cũng được chọn cho một hoàn cảnh, và hoàn cảnh đó hiếm khi là production của bạn.**

Điều đó dẫn tới một kết luận không dễ chịu: **"chạy tốt ở local" nói rất ít về production**, không phải vì code khác, mà vì số lượng tác nhân chạm vào request khác hẳn.

---

## Đọc tiếp trong cụm bài này {#doc-tiep}

Sự cố này mở ra hai câu hỏi lớn hơn bản thân nó, và tôi tách chúng thành hai bài riêng:

| Bài | Nội dung |
|---|---|
| [HTTP header có chứa được tiếng Việt không?](/blog/http-header-unicode-ascii-dotnet) | ASCII, obs-text, Latin-1 và cách mã hoá đúng khi cần mang dữ liệu có dấu |
| [Forward header an toàn trong ASP.NET Core](/blog/forward-http-header-an-toan-aspnet-core) | Allowlist, `DelegatingHandler`, lọc ở gateway, và test giữ kết quả |

---

<FAQSection
  title="Câu hỏi thường gặp"
  items={[
    {
      question: "Vì sao HttpClient ném lỗi 'Request headers must contain only ASCII characters'?",
      answer: "Vì tầng serialize header ra byte của HttpClient chỉ biểu diễn được ASCII. Điều đáng chú ý là lỗi này KHÔNG xuất hiện lúc bạn thêm header: kiểm chứng trên .NET 9.0.4 cho thấy DefaultRequestHeaders.Add với giá trị 'Hồ Chí Minh' không ném gì cả, và TryAddWithoutValidation cũng trả về true. Exception chỉ nổ khi gọi SendAsync, và khi đó không byte nào của request rời khỏi tiến trình."
    },
    {
      question: "Header cf-ipcity của Cloudflare là gì và vì sao nó gây lỗi?",
      answer: "cf-ipcity là một trong các header mà Cloudflare tự chèn vào request đi vào, chứa tên thành phố suy ra từ IP của client. Bản thân nó vô hại. Nó gây lỗi khi ứng dụng forward nguyên xi mọi header đi vào sang một lời gọi HttpClient đi ra, vì với khách ở Việt Nam thì giá trị là tên thành phố có dấu, tức non-ASCII, mà định dạng header trên dây không mang được."
    },
    {
      question: "Vì sao ASP.NET Core nhận được header non-ASCII mà HttpClient lại không gửi được?",
      answer: "Vì nhận và gửi là hai vai trò khác nhau với hai mức khoan dung khác nhau, theo đúng nguyên tắc khoan dung với thứ mình nhận và chặt chẽ với thứ mình gửi. Ở vai server, ASP.NET Core giải mã byte nhận được thành chuỗi và đưa lên cho ứng dụng, vì từ chối cả request chỉ vì một byte lạ sẽ làm hỏng nhiều thứ đang chạy được. Ở vai client, HttpClient từ chối phát ra thứ nó không biểu diễn đúng được. Giả định 'cái gì vào được thì ra được' là sai, và sai ở mọi ngôn ngữ chứ không riêng .NET."
    },
    {
      question: "Vì sao lỗi này không bao giờ xuất hiện khi chạy local?",
      answer: "Vì ở local request đi thẳng từ trình duyệt vào ứng dụng, không có ai chèn thêm header, và mọi header đều là ASCII. Trên production thì giữa client và ứng dụng còn có Cloudflare và API Gateway, cả hai đều sửa đổi metadata của request và thêm dữ liệu đến từ thế giới thật, nơi tên thành phố có dấu. Khác biệt không nằm ở code mà ở số lượng tác nhân chạm vào request."
    },
    {
      question: "Vì sao bắt gói tin và log của downstream không giúp tìm ra lỗi này?",
      answer: "Vì request chưa từng lên dây. Exception được ném trong tiến trình ở bước serialize header, trước khi có byte nào chạm socket. Kiểm chứng bằng một TcpListener thô cho thấy server không nhận được gì cả. Hệ quả là bắt gói tin trống, access log của downstream trống, và trace phía nhận không có span nào — mọi công cụ quan sát từ bên ngoài tiến trình đều vô dụng, nên phải log ở phía client trước khi gửi."
    }
  ]}
/>

## Kết luận {#ket-luan}

Rất dễ kể chuyện này thành "Cloudflare làm hỏng ứng dụng của tôi". Nhưng như vậy vừa không công bằng vừa không giúp được gì.

Cloudflare chèn một header hợp lệ chứa thông tin thật. .NET từ chối phát ra thứ nó không biểu diễn đúng được. Cả hai đều làm đúng việc của mình. **Lỗi nằm ở chỗ ứng dụng của tôi mặc định forward mọi thứ nó nhận được**, và giả định rằng thứ gì vào được thì cũng ra được.

Ba điều tôi mang đi:

1. **Header là dữ liệu, không phải metadata vô hại.** Chúng đến từ thế giới thật và mang theo tất cả sự lộn xộn của thế giới thật, kể cả dấu tiếng Việt.
2. **Chỗ ném exception không phải chỗ gây ra lỗi.** `Add()` im lặng, `TryAddWithoutValidation()` trả về `true`, và lỗi nổ cách đó vài tầng ở `SendAsync`. Đi tìm nguyên nhân ở chỗ nhìn thấy triệu chứng là đi sai hướng.
3. **Bug sống trong tương tác.** Không phải bug của Cloudflare, cũng không phải của .NET, mà là của Cloudflare cộng với ngữ nghĩa header HTTP cộng với `HttpClient` cộng với một vòng lặp forward — trên một kiến trúc production mà local không có.

---

**Cập nhật lần cuối**: Tháng 9, 2026

## Bài liên quan

- [Module 15 — Docker + Deployment](/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-15-docker-deployment) — Container hóa và triển khai: Dockerfile multi-stage, compose, health checks, reverse proxy — pipeline production-like cho .NET.
- [Module 18 — Microservices](/docs/dotnet-backend-zero-to-senior/stage-05-senior-engineering/module-18-microservices) — Microservices .NET: service boundaries, API gateway, resilience, observability — đánh đổi vận hành và tốc độ phát triển.
- [Module 5 — Advanced C#](/docs/dotnet-backend-zero-to-senior/stage-02-csharp-professional/module-05-advanced-csharp) — C# nâng cao: generics, LINQ, nullable reference types, spans, exception semantics — tối ưu an toàn kiểu và hiện diện bộ nhớ trong service layer.
