# Quy ước sơ đồ

Blog và docs dùng hai loại sơ đồ. Chọn theo **việc sơ đồ phải làm**, không theo sở thích.

| Loại | Dùng khi | Ví dụ |
|---|---|---|
| **Diagram Design** (HTML → PNG sáng/tối) | Sơ đồ chính của bài: cơ chế cốt lõi, kiến trúc, luồng mà cả bài xoay quanh. Tối đa 1–2 sơ đồ mỗi trang. | Kiến trúc Traefik + Cloudflare, vòng đời DI scope, luồng deadlock |
| **Mermaid** (khối ```` ```mermaid ````) | Sơ đồ phụ, nhỏ, đi kèm một đoạn: sequence ngắn, state, flowchart 3–6 node. | Thứ tự gọi `SaveChanges`, trạng thái transaction |

Trước khi vẽ, hỏi: *người đọc có hiểu nhanh hơn so với một đoạn văn hay một bảng không?* Không thì đừng vẽ. Danh sách link, cheat sheet, bài ý kiến: thường không cần sơ đồ.

Không bao giờ vẽ trùng với một sơ đồ Mermaid đã có. Không sửa nội dung chữ của bài, chỉ thêm sơ đồ và một câu dẫn ngắn nếu cần.

## Diagram Design

Skill: `diagram-design` (plugin của Cathryn Lavery). Bài giới thiệu: `blog/2026/2026-10-08-diagram-design`.

### Bộ màu blog

Lấy nguyên từ hai file mẫu, đừng tự chế màu:

- Nền sáng: `static/files/diagram-design/vi/diagram-design-flow-blog.html`
- Nền tối: `static/files/diagram-design/vi/diagram-design-flow-blog-dark.html`

| Vai trò | Sáng | Tối |
|---|---|---|
| paper | `#fafaf7` | `#1b1b1d` |
| paper-2 (nền node) | `rgba(28,30,33,0.03)` | `#242526` |
| ink | `#1c1e21` | `#e3e3e3` |
| muted | `#525860` | `#b4b9c0` |
| accent (1–2 phần tử) | `#18816a` | `#25c19f` |

Font: **Noto Serif Display** (`font-stretch: 75%`) cho tiêu đề h1 thay vì Instrument Serif, vì Instrument Serif thiếu chữ tiếng Việt có dấu. Geist cho tên node, Geist Mono cho nhãn kỹ thuật.

### Đặt file

```
static/files/diagrams/<slug>/vi/<ten-so-do>.html        # bản sáng, chữ tiếng Việt
static/files/diagrams/<slug>/vi/<ten-so-do>-dark.html
static/files/diagrams/<slug>/en/<ten-so-do>.html        # chỉ khi trang có bản EN
static/files/diagrams/<slug>/en/<ten-so-do>-dark.html
```

`<slug>` là tên thư mục bài blog (`2026-09-22-traefik-cloudflare-vps`) hoặc đường dẫn trang docs bỏ số thứ tự và dấu `/` thay bằng `-`. File HTML để trong `static/` chứ không để cạnh bài, vì Docusaurus báo link hỏng với file `.html` nằm trong thư mục blog.

PNG nằm **cạnh trang**:

- Blog: `blog/YYYY/<bai>/<ten-so-do>.png` và `<ten-so-do>-dark.png`. Bản EN để PNG chữ tiếng Anh trong `i18n/en/docusaurus-plugin-content-blog/YYYY/<bai>/` cùng tên file.
- Docs: thư mục `img/` cạnh file `.md`: `docs/.../img/<ten-so-do>.png`.

### Xuất PNG

```
pip install playwright && python -m playwright install chromium   # một lần
python scripts/export-diagram.py <file.html> <file.png> [<html2> <png2> ...]
```

Script chụp đúng thẻ `<svg>` ở 2x (viewBox 960×600 ra ảnh 1920×1200). Trước khi chụp, nó đóng dấu `© tiennhm` vào chính file HTML (nếu chưa có): nới viewBox thêm dải 24px ở đáy và đặt dấu ở góc phải, màu `muted`, nên không đè lên chú giải. Không cần tự vẽ dấu; chạy lại nhiều lần vẫn chỉ có một dấu. Xem ảnh xuất ra trước khi commit: chữ tiếng Việt đủ dấu, không có chữ tràn khỏi node.

### Nhúng vào trang

```md
![Mô tả đầy đủ nội dung sơ đồ, đủ để người không xem được ảnh vẫn hiểu](./ten-so-do.png#gh-light-mode-only)
![Mô tả đầy đủ nội dung sơ đồ, đủ để người không xem được ảnh vẫn hiểu](./ten-so-do-dark.png#gh-dark-mode-only)

<small>File gốc: [nền sáng](pathname:///files/diagrams/<slug>/vi/ten-so-do.html) · [nền tối](pathname:///files/diagrams/<slug>/vi/ten-so-do-dark.html)</small>
```

`#gh-light-mode-only` / `#gh-dark-mode-only` do `src/css/custom.css` ẩn hiện theo theme. Dòng `<small>` không bắt buộc. Trong file `.mdx`, `<small>` vẫn hợp lệ.

### Ảnh đại diện (frontmatter `image`)

Trang có sơ đồ Diagram Design thì dùng bản sáng của sơ đồ đó làm ảnh đại diện, thay cho ảnh chung chung:

```yaml
image: ./ten-so-do.png          # blog
image: ./img/ten-so-do.png      # docs
```

Đường dẫn tương đối được Docusaurus đưa qua webpack, theme đổi thành URL tuyệt đối khi render `og:image` (blog: `src/utils/useBlogPostImage.ts`, docs: `src/theme/DocItem/Metadata`). Ảnh trong `static/` ghi `/img/...`. **Không** ghi cứng `https://tiennhm.github.io/...`: bản `/en/` và môi trường preview sẽ trỏ sai, và đổi domain là phải sửa từng file.

Không có ảnh hợp chủ đề thì bỏ trống `image`, site tự dùng ảnh mặc định. Ảnh sai chủ đề (ảnh database cho bài bảo mật) còn tệ hơn không có ảnh.

## Mermaid

Theme đã cấu hình sẵn (`neutral` / `dark`), đừng thêm `%%{init}%%` đổi màu. Nhãn ngắn, có dấu thì bọc trong ngoặc kép: `A["Gửi yêu cầu"]`. Bản EN dùng nhãn tiếng Anh.

Mermaid render ở trình duyệt nên sai cú pháp **không làm đỏ build**. Luôn chạy:

```
npm run check -- mermaid
```

## Kiểm tra trước khi push

```
npm run check
```
