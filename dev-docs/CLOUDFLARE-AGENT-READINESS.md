# Cloudflare Agent Readiness

Ghi chú cấu hình cho trang **Cloudflare → tiennhm.io.vn → Agent Readiness → Diagnostics**.

## Trạng thái (2026-10-08)

| Hạng mục | Trạng thái | Làm ở đâu |
|---|---|---|
| robots.txt, Sitemap, AI Crawler Rules | Đạt | `static/robots.txt` |
| Content Signals | Đã thêm `search=yes, ai-input=yes, ai-train=no` vào từng nhóm | `static/robots.txt` |
| Markdown Negotiation | Chưa: cần quy tắc ở edge, xem bước 2 | Cloudflare dashboard |
| Link Headers | Chưa: cần quy tắc ở edge, xem bước 3 | Cloudflare dashboard |
| Level 2–3 còn lại, Commerce | Bỏ qua: dành cho site có API, đăng nhập, thanh toán | — |

Trong repo đã có sẵn những thứ các quy tắc bên dưới dựa vào:

- `plugins/page-markdown` sinh bản Markdown cho mọi trang blog/docs tại `/md/<route>.md`
  (bản en ở `/en/md/<route>.md`). GitHub Pages trả chúng với `Content-Type: text/markdown`.
- Mỗi trang có `<link rel="alternate" type="text/markdown" href="…">` trỏ tới bản đó
  (`src/utils/markdownUrl.ts`).

## Bước 1: bật proxy Cloudflare

Hiện domain chỉ dùng Cloudflare làm DNS (đám mây xám): request đi thẳng tới GitHub Pages,
response có `Server: GitHub.com` và không có `cf-ray`. Mọi quy tắc ở bước 2–3 chỉ chạy khi
traffic đi qua Cloudflare.

1. **SSL/TLS → Overview**: chọn **Full (strict)**. GitHub Pages đã có chứng chỉ hợp lệ cho
   `tiennhm.io.vn`, nên strict được. Đừng chọn *Flexible*: GitHub Pages ép HTTPS, Flexible sẽ
   gây vòng lặp chuyển hướng.
2. **DNS → Records**: bật đám mây cam cho các bản ghi A `185.199.108–111.153`, AAAA
   `2606:50c0:800x::153` và CNAME `www` (nếu có).
3. Kiểm tra: `curl -sI https://tiennhm.io.vn/` phải có dòng `cf-ray:`.

Lưu ý:

- GitHub Pages tự gia hạn chứng chỉ Let's Encrypt. Khi đã bật proxy, thỉnh thoảng vào
  **GitHub → Settings → Pages** xem chứng chỉ vẫn còn hạn. Nếu GitHub báo lỗi gia hạn, tạm tắt
  proxy cho đến khi gia hạn xong rồi bật lại.
- Không bật **Managed robots.txt** của Cloudflare (AI Crawl Control): nó chèn thêm nội dung vào
  `robots.txt`, trùng hoặc mâu thuẫn với bản tự viết trong repo.

## Bước 2: Markdown Negotiation

Mục tiêu: request tới `/blog/x` có header `Accept: text/markdown` thì nhận bản `/md/blog/x.md`.

**Rules → Transform Rules → Rewrite URL → Create rule**

Tên: `Markdown negotiation (vi)`

Expression (dùng *Edit expression*):

```
any(http.request.headers["accept"][*] contains "text/markdown")
and (starts_with(http.request.uri.path, "/blog/")
  or starts_with(http.request.uri.path, "/docs/")
  or starts_with(http.request.uri.path, "/notes/"))
and not ends_with(http.request.uri.path, ".md")
and not ends_with(http.request.uri.path, "/")
and not http.request.uri.path contains "/tags"
and not http.request.uri.path contains "/page/"
and not http.request.uri.path contains "/archive"
and not http.request.uri.path contains "/authors"
```

Các điều kiện `not` loại những trang danh sách (tag, phân trang, archive, tác giả) vốn không có
bản `.md`. Nếu không loại, agent xin Markdown cho các trang này sẽ nhận 404 thay vì HTML.

Path → *Rewrite to* → **Dynamic**:

```
concat("/md", http.request.uri.path, ".md")
```

Query → *Preserve*.

Bản tiếng Anh (`/en/blog/x` → `/en/md/blog/x.md`) cần một quy tắc thứ hai với điều kiện
`starts_with(http.request.uri.path, "/en/blog/")` (tương tự cho docs) và đường dẫn đích
`concat("/en/md", substring(http.request.uri.path, 3), ".md")`. Nếu dashboard báo một hàm
nào đó (`starts_with`, `ends_with`, `substring`) không có ở gói Free, đổi sang toán tử
`matches`/`wildcard` mà dashboard gợi ý, hoặc tạm chỉ làm bản tiếng Việt.

Kiểm tra:

```bash
curl -s -H "Accept: text/markdown" https://tiennhm.io.vn/blog/markdown-cheat-sheet | head -3
# Mong đợi: "# Markdown Cheat Sheet: ..." thay vì HTML
curl -s https://tiennhm.io.vn/blog/markdown-cheat-sheet | head -c 100
# Không có header Accept: vẫn là HTML
```

## Bước 3: Link Headers và Vary

**Rules → Transform Rules → Modify Response Header → Create rule**

Tên: `Agent discovery headers`

- Điều kiện: *All incoming requests*.
- **Set static** `Link` =
  ```
  </llms.txt>; rel="describedby"; type="text/plain", </sitemap.xml>; rel="sitemap"; type="application/xml"
  ```
- **Set static** `Vary` = `Accept, Accept-Encoding`.

`Vary: Accept` bắt buộc khi đã bật bước 2: cùng một URL giờ trả hai nội dung khác nhau tuỳ
header `Accept`, nên cache của trình duyệt và proxy trung gian phải tách hai bản. Thiếu nó, một
người dùng bình thường có thể nhận nhầm bản Markdown đã được cache.

Giá trị `rel` mà công cụ chấm điểm của Cloudflare mong đợi có thể khác ví dụ trên. Bấm mở mục
*Link Headers* trong Diagnostics để xem gợi ý cụ thể, rồi chỉnh giá trị cho khớp.

## Sau khi làm xong

Bấm **Rescan** ở trang Diagnostics. Content Signals sẽ được nhận ngay sau khi bản deploy chứa
`robots.txt` mới đã lên mạng. Hai mục còn lại chỉ đạt sau khi làm bước 1–3.
