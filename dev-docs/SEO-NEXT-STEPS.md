# SEO / GEO — những việc còn lại phải làm bằng tay

Tài liệu nội bộ của repo (không phải trang xuất bản). Ghi lại phần **không thể
tự động hoá được từ code** vì cần đăng nhập tài khoản của chủ site.

Domain chính thức: **https://tiennhm.io.vn** (không phải `tiennhm.github.io`).
Trong `docusaurus.config.js`, hằng `siteUrl` giữ giá trị này — luôn tham chiếu
hằng đó, đừng hardcode domain lần nữa.

---

## 1. Trạng thái hiện tại

| Hạng mục | Trạng thái | Ghi chú |
|---|---|---|
| Google Search Console | ✅ Đã verify | Qua meta `google-site-verification` trong `docusaurus.config.js` (`headTags`) |
| `sitemap.xml` | ✅ Có | Sinh bởi `@docusaurus/plugin-sitemap` |
| `robots.txt` | ✅ Có | `static/robots.txt` — đã khai báo tường minh các AI crawler |
| `llms.txt` | ✅ Có | `static/llms.txt` (chuẩn llmstxt.org) |
| `llms-full.txt` | ✅ Có | `static/llms-full.txt`, sinh tự động ở bước `prebuild` |
| IndexNow key | ✅ Có trong repo | Xem mục 3 — **nhưng chỉ có tác dụng sau khi deploy** |
| Bing Webmaster Tools | ❌ **CHƯA** | Cần tài khoản Bing của chủ site — xem mục 2 |

---

## 2. Bing Webmaster Tools — verify site (phải làm tay)

Việc này **không thể làm từ code**: token verify chỉ Bing cấp sau khi đăng nhập
bằng tài khoản Microsoft của chủ site. Repo cố ý **không** chứa token giả.

### Cách nhanh nhất: import từ Google Search Console

GSC của site đã verify sẵn, nên Bing cho phép import thẳng, không cần thêm
token nào vào code:

1. Vào https://www.bing.com/webmasters → đăng nhập bằng tài khoản Microsoft.
2. Ở màn hình thêm site, chọn **Import from Google Search Console**.
3. Đăng nhập Google (tài khoản đang sở hữu property `tiennhm.io.vn` trong GSC)
   và cấp quyền đọc cho Bing.
4. Chọn property `https://tiennhm.io.vn` → **Import**.
5. Bing kéo sang cả danh sách sitemap đã submit. Site được verify ngay, **không
   phải sửa gì trong repo**.

### Cách thủ công (nếu không muốn nối GSC)

Nếu chọn cách này, Bing sẽ đưa một trong ba phương án. Với repo Docusaurus này:

- **Thẻ meta (khuyến nghị)** — Bing cho một chuỗi dạng
  `<meta name="msvalidate.01" content="XXXXXXXX..." />`.
  Thêm vào `headTags` trong `docusaurus.config.js`, ngay cạnh meta
  `google-site-verification` đã có:

  ```js
  {
      tagName: 'meta',
      attributes: {
          name: 'msvalidate.01',
          content: process.env.BING_SITE_VERIFICATION || '<TOKEN_BING_CẤP>',
      }
  },
  ```

  Rồi `npm run build` và deploy trước khi bấm Verify.

- **File XML** — Bing cho file `BingSiteAuth.xml`; đặt nó vào `static/`,
  Docusaurus sẽ copy ra web root. Deploy rồi mới bấm Verify.

- **Bản ghi DNS CNAME** — làm ở nhà cung cấp domain `tiennhm.io.vn`, không
  liên quan tới repo.

### Sau khi verify xong

1. Submit sitemap: **Sitemaps** → `https://tiennhm.io.vn/sitemap.xml`.
2. Bật **IndexNow** trong Bing Webmaster Tools (mục *Configure My Site →
   IndexNow*). Dán key ở mục 3 bên dưới nếu Bing hỏi.
3. Xem mục **URL Inspection** và **Crawl information** sau 3-7 ngày để biết
   Bing đã index tới đâu.

---

## 3. IndexNow — key và cách dùng

IndexNow cho phép đẩy URL mới/thay đổi thẳng tới Bing, Yandex, Seznam, Naver…
mà không phải chờ crawler tự ghé.

### Key

```
6810e7b46e786b0e4438b9128e751f4e63e6d3741678ee4bde334df67176d45e
```

- Sinh bằng `openssl rand -hex 32`.
- File key: `static/6810e7b46e786b0e4438b9128e751f4e63e6d3741678ee4bde334df67176d45e.txt`
- Nội dung file **đúng bằng** key, không newline thừa.
- Sau khi deploy, file phải truy cập được tại:
  `https://tiennhm.io.vn/6810e7b46e786b0e4438b9128e751f4e63e6d3741678ee4bde334df67176d45e.txt`

> Key này **không phải bí mật** — theo thiết kế của IndexNow nó là public, vì
> search engine phải fetch được nó để xác thực quyền sở hữu host. Nhưng cũng
> **đừng đổi key tuỳ tiện**: mỗi lần đổi là một vòng xác thực lại. Nếu buộc phải
> đổi, sinh key mới, đổi tên file trong `static/`, sửa lại tài liệu này, rồi
> deploy **trước khi** ping.

### Cách chạy

Script: `scripts/indexnow-ping.js` — **cố ý chạy tay, không gắn vào build.**
Một lần build không đồng nghĩa một lần deploy, và tự động ping mỗi lần build là
cách nhanh nhất để bị đánh dấu spam.

```bash
# Xem trước, không gửi gì
npm run seo:indexnow -- --dry-run

# Gửi toàn bộ URL trong build/sitemap.xml (chạy sau `npm run build`)
npm run seo:indexnow

# Chỉ đẩy một URL vừa xuất bản — đây là cách dùng thường ngày
npm run seo:indexnow -- --url https://tiennhm.io.vn/blog/ten-bai-viet-moi

# Dùng sitemap ở đường dẫn khác
npm run seo:indexnow -- --sitemap build/sitemap.xml
```

Script tự đọc key từ `static/<key>.txt` và kiểm tra tên file khớp với nội dung,
nên không có chuyện key gửi đi lệch với key mà IndexNow fetch về.

### Đọc kết quả

| HTTP | Nghĩa |
|---|---|
| 200 | Đã nhận |
| 202 | Đã nhận, key đang chờ xác thực — kiểm tra file key đã live chưa |
| 400 | Payload sai định dạng |
| 403 | Key không hợp lệ, hoặc không fetch được file key trên host |
| 422 | URL không thuộc host đã khai, hoặc key không khớp |
| 429 | Gửi quá nhiều, chờ rồi thử lại |

### Quy trình đề nghị khi đăng bài mới

1. Viết bài → commit → merge → CI deploy.
2. Đợi site live (kiểm tra URL mới mở được).
3. `npm run seo:indexnow -- --url <URL bài mới>`.

Đừng chạy full-sitemap ping thường xuyên. Chỉ nên dùng khi vừa đổi cấu trúc URL
diện rộng hoặc lần đầu sau khi bật IndexNow.

---

## 4. `llms-full.txt` — bản toàn văn cho AI crawler

- Script: `scripts/generate-llms-full.js`
- Đầu ra: `static/llms-full.txt`
- Chạy tự động ở lifecycle `prebuild` của npm (`npm run build` sẽ kéo theo),
  hoặc chạy tay bằng `npm run seo:llms-full`.
- **File đầu ra được commit vào repo**, để deploy không phụ thuộc thứ tự chạy
  script và để thấy được diff nội dung qua từng lần thay đổi.

### Ngân sách dung lượng

Toàn bộ `docs/` + `blog/` ở dạng thô là hơn 5 MB — quá lớn cho một lần fetch.
Script giới hạn đầu ra ở **2 MB**, bằng cách cắt phần thân mỗi tài liệu ở
**6 KB** (và cắt các khối code dài ở 2.5 KB).

Với lượng nội dung hiện tại (**458 trang**), cách này cho phép **toàn bộ 458
trang đều có mặt** trong file, không trang nào bị loại; khoảng 98 trang dài bị
rút gọn phần thân. Mọi chỗ cắt đều được ghi nhận:

- Trong **header** của `llms-full.txt`: danh sách đầy đủ trang bị rút gọn và
  (nếu có) trang bị loại, kèm canonical URL.
- Ngay **tại chỗ cắt** trong thân bài: `[… phần còn lại đã lược bớt]`.

Không có chỗ nào bị cắt âm thầm.

### Khi nội dung nhiều lên

Còn khoảng 200 KB dư trong ngân sách. Khi vượt, script sẽ bắt đầu **loại hẳn**
trang (ưu tiên giữ `docs/` và bài blog mới nhất — blog được dành riêng 30%
ngân sách) và liệt kê những trang bị loại trong header. Lúc đó hãy chỉnh:

```bash
# Giảm độ sâu mỗi trang để tăng độ phủ
LLMS_FULL_DOC_KB=5 npm run seo:llms-full

# Hoặc nới trần tổng (cân nhắc: crawler phải tải cả file)
LLMS_FULL_BUDGET_KB=3072 npm run seo:llms-full
```

Nếu đổi lâu dài thì sửa hằng mặc định trong `scripts/generate-llms-full.js`.

### Kiểm tra URL có đúng không

Script tự suy ra canonical URL từ frontmatter + đường dẫn file, theo đúng quy
tắc routing của Docusaurus (kể cả `DefaultNumberPrefixParser`). Sau khi có một
bản build, đối chiếu lại với sitemap thật:

```bash
npm run build
node scripts/generate-llms-full.js --check-sitemap build/sitemap.xml
```

Kỳ vọng: `458/458 URL khớp`. Nếu có dòng `MISMATCH`, logic suy ra URL đã lệch
khỏi routing thật — sửa `resolveDocUrl` / `resolveBlogUrl` trước khi deploy.

---

## 5. Checklist ngắn cho chủ site

- [ ] Verify Bing Webmaster Tools (mục 2) — ưu tiên import từ GSC.
- [ ] Submit `https://tiennhm.io.vn/sitemap.xml` trong Bing.
- [ ] Bật IndexNow trong Bing, dán key ở mục 3.
- [ ] Sau khi deploy, mở thử `https://tiennhm.io.vn/llms-full.txt` và file key
      để chắc chắn cả hai trả về 200.
- [ ] Chạy `npm run seo:indexnow` một lần cho toàn sitemap, sau đó chỉ ping
      từng URL mới.
