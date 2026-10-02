# Đóng góp

Đây là blog và trang tài liệu cá nhân, không phải thư viện mã nguồn mở. Vì vậy
loại đóng góp hữu ích nhất không phải tính năng mới, mà là **chỉ ra chỗ tôi
viết sai**.

## Loại đóng góp được hoan nghênh nhất

| Loại | Cách gửi |
|---|---|
| Nội dung sai về mặt kỹ thuật | Mở issue "Nội dung sai", nêu rõ sai ở đâu và vì sao |
| Lỗi chính tả, câu tối nghĩa | Pull request thẳng, không cần mở issue trước |
| Link hỏng | Issue hoặc PR đều được |
| Ví dụ mã không chạy | Issue, kèm thông báo lỗi và phiên bản bạn dùng |
| Lỗi hiển thị | Issue, kèm ảnh chụp màn hình và tên trình duyệt |

Nếu bạn thấy một bài khẳng định điều gì đó mà **số đo của bạn cho kết quả khác**,
đó là đóng góp quý nhất. Hãy gửi kèm cách bạn đo.

## Thứ tôi thường từ chối

- Bài viết mới do người khác soạn. Trang này viết ở ngôi thứ nhất về trải
  nghiệm của tôi; một bài tôi chưa từng tự trải qua sẽ phá vỡ điều đó.
- Thay đổi lớn về giao diện hoặc kiến trúc mà chưa bàn trước trong issue.
- Thêm phụ thuộc mới cho một việc nhỏ.

## Chạy thử tại máy

```bash
npm install
npm run start     # máy chủ phát triển
```

## Trước khi mở pull request

Chạy bộ kiểm tra tĩnh. Nó mất vài giây và **không cần build**:

```bash
npm run check
```

Năm mục được kiểm:

| Mục | Bắt lỗi gì |
|---|---|
| `config` | Đường dẫn trong cấu hình trỏ vào tệp không tồn tại |
| `tag-redirects` | Chuyển hướng tag trỏ tới trang không có |
| `mdx` | Cú pháp MDX hỏng — dấu ngoặc nhọn, thẻ chưa đóng, fence lồng nhau |
| `css-modules` | Dùng `styles.X` mà `.X` chưa được khai báo |
| `mermaid` | Sơ đồ Mermaid sai cú pháp |

Chạy riêng một mục: `npm run check -- mdx`

Ba mục cuối bắt đúng những lỗi **không làm đỏ build** nhưng vẫn hỏng trên trang
— phần tử mất sạch style, sơ đồ hiện hộp lỗi đỏ. Build xanh không có nghĩa là
trang đúng.

## Quy ước

**Nhánh**: luôn tách nhánh, đừng commit thẳng vào `master`. Nhánh `master` là
nhánh deploy — push vào đó là lên thẳng production.

**Commit**: theo Conventional Commits.

```
fix(blog): sửa số liệu sai trong bài về index
docs(dotnet): bổ sung ví dụ cho module 13
```

Phần thân commit nên giải thích **vì sao**, không phải **sửa gì** — phần sửa gì
đã nằm trong diff rồi.

**Nội dung**: viết tiếng Việt, câu ngắn. Mọi khẳng định về hiệu năng phải kèm
cách đo.

## Giấy phép của phần bạn đóng góp

Mã nguồn bạn gửi được phát hành theo [giấy phép MIT](../LICENSE).

Phần nội dung (bài viết, tài liệu) thuộc [giấy phép nội dung](../LICENSE-CONTENT)
và bản quyền vẫn thuộc chủ trang. Nếu bạn đóng góp một phần nội dung đáng kể,
tôi sẽ ghi công bạn trong bài.
