# 2.03 | Insecure Direct Object References

> Nguồn: https://tiennhm.io.vn/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/insecure-direct-object-references-03
> Bài viết này sẽ hướng dẫn cách tấn công Insecure Direct Object References trên WebGoat 2023.8

> **Quan sát sự khác biệt & hành vi**

Một nguyên tắc quan trọng trong tấn công bảo mật ứng dụng (AppSec) là **so sánh sự khác biệt giữa phản hồi thô từ server và dữ liệu hiển thị trên giao diện người dùng**.

Nói cách khác (như bạn có thể đã nhận thấy trong bài học về lọc dữ liệu phía client), **server có thể trả về nhiều dữ liệu hơn so với những gì thực tế được hiển thị trên trang web**. Điều này có thể tiết lộ thông tin nhạy cảm mà attacker có thể khai thác.

#### **Nhiệm vụ**
- Xem xét trang hồ sơ bên dưới.
```plaintext
name:Tom Cat
color:yellow
size:small
```
- Kiểm tra phản hồi từ server và so sánh với dữ liệu hiển thị trên giao diện.
- **Nhập vào ô bên dưới hai thuộc tính** có trong phản hồi từ server nhưng **không xuất hiện trên giao diện**.

🚀 **Gợi ý**:
- Sử dụng **Developer Tools** (`F12` trên trình duyệt) để xem phản hồi từ server trong tab **Network**.
- Kiểm tra JSON hoặc HTML response từ server để phát hiện các thuộc tính bị ẩn.
```json
{
  "role" : 3,
  "color" : "yellow",
  "size" : "small",
  "name" : "Tom Cat",
  "userId" : "2342384"
}
```

Vậy 2 thuộc tính không xuất hiện trên giao diện là `role` và `userId`.
