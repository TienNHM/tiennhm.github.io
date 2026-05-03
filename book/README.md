# book/ — nguồn cho PDF tổng hợp

- **`chapters/`**: đặt các file `.md` theo thứ tự muốn xuất (sắp xếp theo tên file, ví dụ `01-intro.md`, `02-setup.md`).
- **`meta.json`**: `title` (tiêu đề sách) và `outputFile` (tên file PDF trong thư mục `pdf/`).

Tạo một PDF gộp:

```bash
npm run pdf:book
```

Nội dung website vẫn nằm trong `docs/`; thư mục này dành cho bản “sách” / giao khách hàng khi cần tách với Docusaurus.
