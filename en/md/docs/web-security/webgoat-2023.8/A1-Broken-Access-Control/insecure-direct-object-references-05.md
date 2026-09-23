# 2.05 | Insecure Direct Object References

> Nguồn: https://tiennhm.io.vn/en/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/insecure-direct-object-references-05
> Bài viết này sẽ hướng dẫn cách tấn công Insecure Direct Object References trên WebGoat 2023.8

> **Playing with the Patterns**

#### **1️⃣ Xem hồ sơ của người khác**
Bạn đã tìm ra cách xem hồ sơ của mình bằng đường dẫn:

```plaintext
WebGoat/IDOR/profile/2342384
```
Tương tự, để xem **hồ sơ của người khác**, bạn có thể **thay đổi ID** trong URL.

#### **Cách thực hiện**
- **Cách 1:** Dùng **Developer Tools (F12)** → **Intercept request** và thay đổi ID
- **Cách 2:** Dùng **trình duyệt** và nhập URL theo mẫu:
  ```plaintext
  WebGoat/IDOR/profile/{otherUserId}
  ```
- **Cách 3:** Sử dụng **công cụ như Postman hoặc cURL** để gửi yêu cầu GET

---

#### **2️⃣ Chỉnh sửa hồ sơ người khác**
Các ứng dụng RESTful thường thay đổi **phương thức HTTP** để thực hiện các hành động khác nhau.

**Ví dụ:**
- `GET /profile/{id}` → **Xem hồ sơ**
- `PUT /profile/{id}` → **Chỉnh sửa hồ sơ**

💡 **Mục tiêu:**
- Chỉnh sửa hồ sơ của **Buffalo Bill**
- **Hạ cấp quyền của người dùng** (vì quyền cao hơn thường có ID thấp)
- **Thay đổi màu sắc** thành `"red"`

#### **Cách thực hiện**
1️⃣ **Intercept request** bằng Burp Suite/ZAP và thay đổi ID
2️⃣ **Thay đổi phương thức** từ `GET` → `PUT`
3️⃣ **Gửi payload mới**

---

#### **📌 Ví dụ Payload (`PUT` Request)**
```json
{
  "id": 123456,
  "username": "Buffalo Bill",
  "role": "user",
  "color": "red"
}
```
🛑 **Lưu ý:**
- Nếu ứng dụng không xác thực quyền đúng cách, bạn có thể sửa thông tin của người khác!
- Đây là một lỗ hổng **Insecure Direct Object References (IDOR)** phổ biến.

🚀 **Thử ngay và quan sát kết quả!**

Xem chi tiết tại [đây](https://docs.cycubix.com/application-security-series/web-application-security-essentials/solutions/a5-broken-access-control/a1-2021-or-insecure-direct-object-reference-or-cycubix-docs/insecure-direct-object-reference-5).
