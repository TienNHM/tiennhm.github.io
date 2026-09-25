---
title: "HTTP header có chứa được tiếng Việt không? ASCII, obs-text và chỗ .NET vạch ranh giới"
slug: http-header-unicode-ascii-dotnet
description: "Câu trả lời ngắn là không, và lý do thú vị hơn vẻ ngoài của nó. Đặc tả HTTP cho phép byte 0x80-0xFF trong giá trị header dưới dạng obs-text, nhưng không quy định bảng mã nào để diễn giải chúng. Bài viết mổ ngữ pháp field-value trong RFC 9110, chỉ ra vì sao 'í' đi lọt được còn 'ồ' thì không, và trình bày ba cách mã hoá đúng khi bạn thật sự cần mang dữ liệu có dấu qua header."
keywords: [http header unicode, http header non ascii, http header tieng viet, obs-text, rfc 9110 field value, rfc 8187 ext-value, percent encoding header, base64 header, latin1 vs utf8 header, iso-8859-1 header, content-disposition filename*, dotnet httpclient ascii, request headers must contain only ascii characters, mojibake header, hpack http2 header encoding, ma hoa header, header encoding dotnet, asp net core header encoding]
tags: [http, dotnet, csharp]
authors: [tiennhm]
date: 2026-09-23
---

import { SummaryBox, FAQSection } from '@site/src/components/SEO';

# HTTP header có chứa được tiếng Việt không?

<SummaryBox>
Trả lời ngắn: **không, nếu bạn muốn nó đi qua mọi tầng an toàn**. Đặc tả HTTP định nghĩa giá trị header bằng ký tự ASCII in được, cộng thêm một nhánh lỗi thời tên là **obs-text** cho phép byte `0x80–0xFF` nhưng **không quy định bảng mã nào** để diễn giải chúng. Hệ quả là một chuỗi tiếng Việt có thể đi lọt một phần: `í` nằm trong Latin-1 nên biểu diễn được, còn `ồ` thì không, vì nó là `U+1ED3` — vượt ngoài `0xFF`. .NET chọn cách dứt khoát: `HttpClient` từ chối gửi mọi giá trị header non-ASCII. Muốn mang dữ liệu có dấu thì phải **mã hoá**, bằng percent-encoding, RFC 8187 hoặc Base64.
</SummaryBox>

Bài này tách ra từ [một sự cố production](/blog/cloudflare-header-broke-dotnet-httpclient), nơi header `cf-ipcity: Hồ Chí Minh` do Cloudflare chèn làm `HttpClient` ném exception. Ở đó tôi dừng lại ở hiện tượng. Ở đây tôi trả lời câu hỏi mà hiện tượng ấy đặt ra: **rốt cuộc HTTP header được phép chứa những gì?**

<!-- truncate -->

## Tóm tắt nhanh (TL;DR) {#tldr}

- Giá trị header HTTP về bản chất là **chuỗi byte**, không phải chuỗi Unicode.
- RFC 9110 cho phép `0x80–0xFF` qua nhánh **obs-text**, nhưng **không định nghĩa charset** — nên không bên nào biết chắc phải giải mã thế nào.
- Trong thực tế mỗi bên chọn một bảng mã khác nhau, và bạn nhận về **mojibake**.
- Tiếng Việt lọt **một phần** qua Latin-1: `í` được, `ồ` không.
- .NET không chơi trò may rủi: `HttpClient` ném lỗi thay vì gửi byte mà nó không đảm bảo được.
- Cách đúng: **percent-encoding**, **RFC 8187**, hoặc **Base64**.

---

## Ngữ pháp thật sự của một giá trị header {#ngu-phap-field-value}

Mở [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110#name-field-values) ra, phần định nghĩa giá trị của một trường header rút gọn lại còn:

```abnf
field-value    = *field-content
field-content  = field-vchar [ 1*( SP / HTAB / field-vchar ) field-vchar ]
field-vchar    = VCHAR / obs-text
VCHAR          = %x21-7E        ; ký tự ASCII in được
obs-text       = %x80-FF        ; byte ngoài ASCII, đã lỗi thời
```

Hai dòng cuối là toàn bộ câu chuyện.

`VCHAR` là ASCII in được, từ `0x21` tới `0x7E`. Đây là phần ai cũng đồng ý.

`obs-text` là byte từ `0x80` tới `0xFF`. Chữ `obs` là viết tắt của **obsolete** — lỗi thời. Nó tồn tại trong đặc tả không phải để bạn dùng, mà để mô tả những thứ đã trót tồn tại trên Internet và không thể xoá đi được.

Và đây là điểm quyết định: **đặc tả không nói những byte đó thuộc bảng mã nào.** Không phải "nó là UTF-8", cũng không phải "nó là Latin-1". Chỉ là byte, không kèm cách diễn giải.

Một định dạng cho phép bạn gửi byte nhưng không nói người nhận phải hiểu chúng ra sao thì không phải một kênh truyền dữ liệu, nó là một lời mời gọi hiểu nhầm.

---

## Vì sao `í` đi lọt mà `ồ` thì không {#i-lot-o-khong}

Đây là chi tiết tôi thấy thú vị nhất, và nó giải thích vì sao loại lỗi này hay xuất hiện **không đều** — có khách thì hỏng, có khách thì không.

Lấy đúng chuỗi trong sự cố và nhìn byte của nó ở hai bảng mã:

```
Chuỗi  : Hồ Chí Minh

UTF-8  : 48 E1 BB 93 20 43 68 C3 AD 20 4D 69 6E 68
Latin-1: 48 3F       20 43 68 ED    20 4D 69 6E 68
            ^^                ^^
            'ồ' → 0x3F        'í' → 0xED
```

Đọc bảng này theo từng ký tự:

| Ký tự | Điểm mã Unicode | UTF-8 | Latin-1 |
|---|---|---|---|
| `H` | U+0048 | `48` | `48` |
| `ồ` | **U+1ED3** | `E1 BB 93` | **không biểu diễn được** → `3F` (`?`) |
| `í` | U+00ED | `C3 AD` | `ED` |

`í` là `U+00ED`, nằm gọn trong `0x00–0xFF`, nên Latin-1 mang được nó bằng đúng một byte. `ồ` là `U+1ED3` — vượt xa `0xFF` — nên Latin-1 **không có chỗ cho nó** và phải thay bằng dấu `?`.

Tiếng Việt vì vậy nằm vắt ngang ranh giới: các nguyên âm có dấu sắc, huyền, hỏi ở dạng đơn giản như `á à í ò ú` thì rơi vào Latin-1, còn các tổ hợp như `ồ ậ ữ ợ ẩ` thì không. Một hệ thống chuyền tay nhau header bằng Latin-1 sẽ chạy có vẻ ổn với **Hải** và vỡ với **Hồ** — cùng một đoạn code, khác mỗi dữ liệu.

Đó là kiểu bug tệ nhất: nó phụ thuộc vào **nội dung**, nên nó vượt qua mọi bài test mà bạn không cố tình nghĩ tới nó.

---

## Chuyện gì xảy ra khi hai bên chọn khác bảng mã {#mojibake}

Giả sử một bên ghi header bằng UTF-8 còn bên kia đọc bằng Latin-1 — tình huống mặc định trong rất nhiều stack.

Bên gửi ghi `ồ` thành ba byte `E1 BB 93`. Bên nhận đọc từng byte theo Latin-1 và được ba ký tự: `á`, `»`, `“`. Chuỗi `Hồ` biến thành `Há»“`.

Đây chính là **mojibake**, và nó không phải lỗi của bên nào. Cả hai đều làm đúng theo bảng mã mình chọn. Vấn đề là đặc tả không bắt họ chọn giống nhau.

Đáng nói là mojibake **im lặng**. Không exception, không cảnh báo, chỉ là dữ liệu sai lặng lẽ chảy tiếp qua hệ thống, vào log, vào database, vào báo cáo. So với cách .NET ném thẳng một exception thì việc lặng lẽ hỏng dữ liệu tệ hơn nhiều.

---

## .NET vạch ranh giới ở đâu {#dotnet-vach-ranh-gioi}

Trong [bài về sự cố](/blog/cloudflare-header-broke-dotnet-httpclient) tôi đã đo cụ thể trên .NET 9.0.4, và kết quả đáng nhắc lại vì nó cho thấy .NET chọn một lập trường rõ ràng:

| Thao tác | Kết quả |
|---|---|
| `DefaultRequestHeaders.Add(name, "Hồ Chí Minh")` | **không ném exception** |
| `TryAddWithoutValidation(name, "Hồ Chí Minh")` | trả về `true` |
| `SendAsync(request)` | **ném** `HttpRequestException: Request headers must contain only ASCII characters.` |
| Byte lên dây | **không có byte nào** |

Điều này nói lên hai chuyện.

**Thứ nhất, validation của `HttpHeaders` không phải nơi kiểm bảng mã.** Nó kiểm cấu trúc: ký tự điều khiển, xuống dòng, định dạng riêng của từng header. Chuyện "giá trị này có nằm trong ASCII không" thuộc về tầng serialize, tận lúc gửi.

**Thứ hai, .NET từ chối tham gia canh bạc obs-text.** Nó có thể đã chọn ghi Latin-1 và để `ồ` thành `?`, hoặc ghi UTF-8 và để bên kia đoán. Cả hai đều dẫn tới hỏng dữ liệu âm thầm. Ném exception là lựa chọn ồn ào hơn nhưng trung thực hơn.

Nếu bạn đang bực vì .NET khó tính ở chỗ này, hãy nhớ phương án thay thế không phải "nó chạy đúng", mà là "nó chạy sai mà không báo".

---

## Ba cách mang dữ liệu có dấu qua header cho đúng {#cach-ma-hoa-dung}

Khi thật sự cần đặt dữ liệu có dấu vào header — tên file, tên thành phố, tên người dùng — giải pháp luôn là **mã hoá về ASCII rồi giải mã ở phía nhận**.

### 1. Percent-encoding

Cách phổ biến nhất và dễ đọc log nhất:

```csharp
// Bên gửi
var encoded = Uri.EscapeDataString("Hồ Chí Minh");
// => H%E1%BB%93%20Ch%C3%AD%20Minh
request.Headers.TryAddWithoutValidation("X-City", encoded);

// Bên nhận
var city = Uri.UnescapeDataString(raw);
```

Toàn bộ kết quả nằm trong ASCII nên qua được mọi tầng. `Uri.EscapeDataString` mã hoá theo UTF-8, và `Uri.UnescapeDataString` giải mã cũng theo UTF-8, nên hai đầu khớp nhau khi cùng dùng .NET.

### 2. RFC 8187 — cách chuẩn khi bạn định nghĩa header mới

[RFC 8187](https://www.rfc-editor.org/rfc/rfc8187) định nghĩa một cú pháp mang bảng mã **đi kèm trong chính giá trị**:

```http
X-City*=UTF-8''H%E1%BB%93%20Ch%C3%AD%20Minh
```

Ba phần: tên bảng mã, ngôn ngữ (có thể bỏ trống), rồi chuỗi đã percent-encode. Bạn gặp nó mỗi ngày mà có thể không để ý — đó chính là `filename*` trong `Content-Disposition` khi tải về một file có tên tiếng Việt.

Ưu điểm so với percent-encoding trần: người nhận **không phải đoán** bảng mã, vì nó được khai ngay tại chỗ.

### 3. Base64

Hợp khi dữ liệu không phải văn bản thuần, hoặc khi bạn muốn một quy tắc duy nhất cho mọi loại giá trị:

```csharp
var encoded = Convert.ToBase64String(Encoding.UTF8.GetBytes("Hồ Chí Minh"));
// => SOG7kyBDaMOtIE1pbmg=
```

Đánh đổi: đọc log không còn thấy được nội dung, và kích thước tăng khoảng một phần ba.

### So sánh

| Cách | Đọc log được | Tự khai bảng mã | Khi nào dùng |
|---|:---:|:---:|---|
| Percent-encoding | ✅ | ❌ | Mặc định, hai đầu cùng quy ước |
| RFC 8187 | ✅ | ✅ | Khi bạn định nghĩa header mới cho nhiều bên dùng |
| Base64 | ❌ | ❌ | Dữ liệu nhị phân, hoặc cần một quy tắc chung |

**Cách sai phổ biến nhất** là nhét thẳng chuỗi Unicode vào rồi hy vọng nó đi lọt. Nó sẽ đi lọt trong môi trường dev, đi lọt với `Hải`, và hỏng với `Hồ` trên production.

---

## HTTP/2 và HTTP/3 có đổi gì không? {#http2-http3}

Câu hỏi hợp lý, vì HTTP/2 không gửi header dạng văn bản nữa mà nén bằng HPACK, còn HTTP/3 dùng QPACK.

Chúng **không** thay đổi câu chuyện này. HPACK và QPACK nén **chuỗi byte**, chúng không định nghĩa lại giá trị header là văn bản Unicode. Ngữ nghĩa vẫn do RFC 9110 quy định, và ràng buộc obs-text vẫn nguyên như cũ.

Chuyển sang HTTP/2 vì thế không sửa được vấn đề, và cũng không nên kỳ vọng như vậy.

---

<FAQSection
  title="Câu hỏi thường gặp"
  items={[
    {
      question: "HTTP header có chứa được ký tự Unicode không?",
      answer: "Về thực tế thì không, nếu bạn muốn nó đi qua mọi tầng an toàn. RFC 9110 định nghĩa giá trị header bằng ký tự ASCII in được từ 0x21 đến 0x7E, cộng thêm nhánh obs-text cho byte 0x80 đến 0xFF. Nhưng obs-text đã bị đánh dấu lỗi thời và đặc tả KHÔNG quy định bảng mã nào để diễn giải những byte đó, nên hai bên có thể hiểu khác nhau. Cách đúng là mã hoá dữ liệu về ASCII bằng percent-encoding, RFC 8187 hoặc Base64."
    },
    {
      question: "obs-text trong RFC 9110 là gì?",
      answer: "obs-text là nhánh ngữ pháp cho phép byte từ 0x80 đến 0xFF xuất hiện trong giá trị header. Chữ obs là viết tắt của obsolete, tức lỗi thời: nó tồn tại trong đặc tả không phải để khuyến khích dùng mà để mô tả những thứ đã trót tồn tại trên Internet. Điểm quan trọng là đặc tả không nói những byte đó thuộc bảng mã nào, nên gửi được không có nghĩa là bên kia hiểu đúng."
    },
    {
      question: "Vì sao có chữ tiếng Việt đi lọt qua header còn chữ khác thì không?",
      answer: "Vì tiếng Việt nằm vắt ngang ranh giới của Latin-1. Chữ í là U+00ED, nằm trong khoảng 0x00 đến 0xFF nên Latin-1 mang được bằng một byte. Chữ ồ là U+1ED3, vượt xa 0xFF, nên Latin-1 không biểu diễn được và thường bị thay bằng dấu hỏi. Hệ quả là một hệ thống truyền header bằng Latin-1 sẽ chạy có vẻ ổn với tên Hải và vỡ với tên Hồ, cùng một đoạn code chỉ khác dữ liệu."
    },
    {
      question: "Nên dùng percent-encoding, RFC 8187 hay Base64 cho header?",
      answer: "Percent-encoding là mặc định hợp lý vì kết quả vẫn đọc được trong log và hai đầu chỉ cần thống nhất dùng UTF-8; trong .NET là Uri.EscapeDataString và Uri.UnescapeDataString. RFC 8187 tốt hơn khi bạn định nghĩa một header mới cho nhiều bên dùng, vì cú pháp dạng UTF-8''... khai luôn bảng mã nên người nhận không phải đoán, và đây chính là cách filename* trong Content-Disposition hoạt động. Base64 hợp với dữ liệu nhị phân hoặc khi cần một quy tắc chung, đổi lại log không đọc được và kích thước tăng khoảng một phần ba."
    },
    {
      question: "Chuyển sang HTTP/2 hoặc HTTP/3 có sửa được lỗi header non-ASCII không?",
      answer: "Không. HTTP/2 nén header bằng HPACK và HTTP/3 dùng QPACK, nhưng cả hai đều nén chuỗi byte chứ không định nghĩa lại giá trị header thành văn bản Unicode. Ngữ nghĩa vẫn do RFC 9110 quy định và ràng buộc obs-text vẫn nguyên như cũ, nên nâng phiên bản giao thức không giải quyết được vấn đề mã hoá."
    },
    {
      question: "Vì sao .NET ném exception thay vì cứ gửi byte non-ASCII đi?",
      answer: "Vì hai phương án thay thế đều dẫn tới hỏng dữ liệu âm thầm. Nếu .NET ghi bằng Latin-1 thì những chữ như ồ sẽ biến thành dấu hỏi mà không ai biết. Nếu ghi bằng UTF-8 thì bên nhận có thể giải mã bằng Latin-1 và nhận về mojibake. Ném HttpRequestException lúc gửi là lựa chọn ồn ào hơn nhưng trung thực hơn: bạn biết ngay có vấn đề, thay vì phát hiện dữ liệu sai vài tuần sau trong báo cáo."
    }
  ]}
/>

## Kết luận {#ket-luan}

Câu hỏi "HTTP header có chứa được tiếng Việt không" nghe như một câu hỏi về giới hạn kỹ thuật, nhưng thật ra nó là câu hỏi về **hợp đồng giữa hai bên**.

Byte thì gửi được. Cái thiếu là một thoả thuận về việc những byte ấy nghĩa là gì. Đặc tả cố tình không cung cấp thoả thuận đó, và mọi cách khắc phục — percent-encoding, RFC 8187, Base64 — đều là cách bạn tự dựng lấy thoả thuận ấy rồi đặt nó vào trong phần ASCII mà cả hai bên chắc chắn hiểu giống nhau.

Đọc tiếp: [sự cố production đã dẫn tới bài này](/blog/cloudflare-header-broke-dotnet-httpclient), và [cách forward header an toàn trong ASP.NET Core](/blog/forward-http-header-an-toan-aspnet-core).

---

**Cập nhật lần cuối**: Tháng 9, 2026

## Bài liên quan

- [Module 9 — Web API Professional](/docs/dotnet-backend-zero-to-senior/stage-03-aspnet-core-backend/module-09-web-api-professional) — Web API chuyên nghiệp: versioning, validation, Problem Details, OpenAPI, filtering/paging — hợp đồng HTTP ổn định cho client và tích hợp.
- [Lộ trình .NET Backend: From Zero → Senior (Backend-first)](/docs/dotnet-backend-zero-to-senior/dotnet-backend-zero-to-senior-roadmap) — Curriculum hub: lộ trình .NET backend-first (C#, ASP.NET Core, SQL, EF Core, distributed systems, microservices) với trục nghiệp vụ CRM/ERP — tối ưu…
- [8.3 — 2. Request Pipeline và Middleware](/docs/dotnet-backend-zero-to-senior/stage-03-aspnet-core-backend/module-08-aspnet-core-fundamentals/8.2-request-pipeline-and-middleware) — Pipeline là các lớp bọc nhau chứ không phải hàng đợi: Use/Run/Map, short-circuit, vì sao không ghi được header sau khi response đã bắt đầu, và…
