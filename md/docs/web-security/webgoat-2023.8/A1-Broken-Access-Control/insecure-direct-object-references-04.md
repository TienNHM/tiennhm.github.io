# 2.04 | Insecure Direct Object References

> Nguồn: https://tiennhm.io.vn/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/insecure-direct-object-references-04
> Bài viết này sẽ hướng dẫn cách tấn công Insecure Direct Object References trên WebGoat 2023.8

> **Dự đoán & đoán mẫu URL**

#### **Xem hồ sơ của bạn theo một cách khác**
Ứng dụng này dường như tuân theo mô hình **RESTful**, trong đó mỗi tài nguyên có thể được truy cập thông qua một **đường dẫn cụ thể**.

Trong nhiều hệ thống, người dùng có thể có **vai trò cao hơn (admin, manager,...)** cho phép họ truy cập hồ sơ của người khác. Khi đó, chỉ `/profile` sẽ không đủ vì dữ liệu xác thực của phiên đăng nhập hiện tại không chỉ định rõ hồ sơ nào đang được truy vấn.

#### **Nhiệm vụ**
Dựa vào cách đặt URL của hệ thống, hãy suy nghĩ về một **mẫu đường dẫn hợp lý** để truy cập hồ sơ cá nhân theo cách trực tiếp bằng **Direct Object Reference (DOR)**.

#### **Gợi ý**
- Trong nhiều hệ thống, hồ sơ cá nhân có thể được truy cập bằng cách thêm **ID người dùng** vào URL, ví dụ:
  ```
  WebGoat/profile/12345
  ```
- Hoặc có thể sử dụng một từ khóa phổ biến như `"me"`:
  ```
  WebGoat/profile/me
  ```
- Nếu ứng dụng sử dụng truy vấn GET:
  ```
  WebGoat/profile?id=12345
  ```

### **Gợi ý**
🔹 **Kiểm tra yêu cầu trước đó cho hồ sơ cá nhân**
🔹 **Bạn cần dữ liệu từ yêu cầu trước đó để biết ID của mình**
🔹 **Thử nối ID của bạn vào yêu cầu trước đó** theo mẫu:
```plaintext
WebGoat/IDOR/profile/{yourId}
```

### **Giải pháp**
#### **1️⃣ Sử dụng Developer Tools (F12)**
- **Mở tab "Network"** trên Developer Tools
- **Quan sát các request** khi thực hiện hành động trên trang
- **Tìm request chứa user ID trong URL hoặc tham số trong request**

#### **2️⃣ Sử dụng ZAP**
- **Kiểm tra đường dẫn trong các request**
- **Xác định mẫu URL mà ứng dụng sử dụng để truy vấn hồ sơ**

---

### **Kết quả**
Từ bài trước, ta biết rằng **user ID là `2342384`**. Do đó, đường dẫn hợp lệ để truy cập hồ sơ cá nhân sẽ là:

```plaintext
WebGoat/IDOR/profile/2342384
```

🚀 **Thử nhập đường dẫn trên để kiểm tra!**

**Kết quả:**
```plaintext
Congratulations, you have used the alternate Url/route to view your own profile.
{role=3, color=yellow, size=small, name=Tom Cat, userId=2342384}
```

## Bài liên quan

- [Đổi id trên URL ra dữ liệu người khác? Chặn IDOR ở một tầng duy nhất](https://tiennhm.io.vn/blog/idor-broken-access-control-aspnet-core) — IDOR xảy ra khi API nhận id từ request rồi đọc thẳng bản ghi mà không hỏi xem người gọi có sở hữu bản ghi đó không.
