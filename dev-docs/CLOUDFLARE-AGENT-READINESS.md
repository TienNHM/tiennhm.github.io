# Cloudflare Agent Readiness

Ghi chú cấu hình cho trang **Cloudflare → tiennhm.io.vn → Agent Readiness → Diagnostics**.

## Trạng thái (2026-10-08)

| Hạng mục | Trạng thái | Làm ở đâu |
|---|---|---|
| robots.txt, Sitemap, AI Crawler Rules | Đạt | `static/robots.txt` |
| Content Signals | Đã thêm `search=yes, ai-input=yes, ai-train=no` vào từng nhóm | `static/robots.txt` |
| Markdown Negotiation | Chưa: cần quy tắc ở edge, xem bước 2 | Cloudflare dashboard |
| Link Headers | Chưa: cần quy tắc ở edge, xem bước 3 | Cloudflare dashboard |
| MCP Server Card | Card ở `static/.well-known/mcp/server-card.json`, server ở `workers/mcp`. Đạt sau khi làm bước 1 và bước 4 | Repo + Cloudflare |
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

## Bước 4: MCP server và Server Card

Site tĩnh không chạy được MCP, nên `workers/mcp` là một Cloudflare Worker nằm ở route
`tiennhm.io.vn/mcp*`. Nó chỉ đọc những thứ site đã build sẵn — `md/index.json` (danh mục trang)
và `md/<route>.md` — rồi trả qua MCP Streamable HTTP, không trạng thái, không đăng nhập:

| Tool | Làm gì |
|---|---|
| `search_content` | Tìm trang theo từ khoá trong tiêu đề, tag, mô tả, URL; không phân biệt dấu |
| `get_page` | Trả bản Markdown của một trang (chỉ nhận URL trên tiennhm.io.vn) |
| `list_recent_posts` | Bài blog mới nhất |

Ngoài ra có resource `llms.txt`. Server Card (SEP-2127) nằm ở hai chỗ, cùng một file:
`/.well-known/mcp/server-card.json` do GitHub Pages phục vụ, và `/mcp/server-card` do worker
phục vụ. Card gồm cả các trường của schema v1 (`name`, `version`, `remotes`…) lẫn `serverInfo`,
`endpoint`, `capabilities` mà isitagentready.com kiểm tra.

**Thứ tự deploy quan trọng**: card lên mạng cùng lần deploy site, nên phải deploy worker và bật
proxy **trước** khi merge, kẻo card trỏ tới một endpoint 404.

1. Làm bước 1 (bật proxy). Route của worker chỉ chạy khi traffic đi qua Cloudflare.
2. Deploy worker:
   ```bash
   cd workers/mcp
   npm install
   npx wrangler login
   npm run deploy
   ```
3. Kiểm tra:
   ```bash
   curl -s https://tiennhm.io.vn/mcp/server-card | head -c 200
   curl -s https://tiennhm.io.vn/mcp -H 'Content-Type: application/json'      -H 'Accept: application/json, text/event-stream'      -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
   ```
   Hoặc mở MCP Inspector (`npx @modelcontextprotocol/inspector`) và kết nối tới
   `https://tiennhm.io.vn/mcp`.
4. Merge vào master để GitHub Pages phục vụ `/.well-known/mcp/server-card.json` và
   `md/index.json`, rồi quét lại:
   ```bash
   curl -s -X POST https://isitagentready.com/api/scan -H 'Content-Type: application/json'      -d '{"url":"https://tiennhm.io.vn"}' | jq '.checks.discovery.mcpServerCard'
   ```

Khi thêm hay đổi tool: tăng `version` (và `serverInfo.version`) trong `server-card.json` — worker
import chính file này nên tên và phiên bản luôn khớp nhau. Đổi `capabilities` nếu thêm prompt.

## Sau khi làm xong

Bấm **Rescan** ở trang Diagnostics. Content Signals sẽ được nhận ngay sau khi bản deploy chứa
`robots.txt` mới đã lên mạng. Hai mục còn lại chỉ đạt sau khi làm bước 1–3.
