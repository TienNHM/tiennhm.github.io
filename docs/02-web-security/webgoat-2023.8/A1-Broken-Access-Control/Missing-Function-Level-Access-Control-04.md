---
title: 3.04 | Missing Function Level Access Control
slug: missing-function-level-access-control-04
description: Bài viết này sẽ hướng dẫn cách tấn công Missing Function Level Access Control trên WebGoat 2023.8
image: https://tiennhm.github.io/img/docs/database.jpg
sidebar_position: 3
# sidebar_class_name: hidden
tags: 
    - web-security
    - webgoat
    - broken-access-control
    - missing-function-level-access-control
    - webgoat-2023.8
keywords: [web-security, webgoat, broken-access-control, missing-function-level-access-control, webgoat-2023.8]
enableComments: true # for Gisqus comments, set to true
draft: false # set to true to hide this post from the site
---

> 🔥 **Phân tích & Cách khai thác lỗ hổng "The company fixed the problem, right?" trong WebGoat**  


## ✅ **1️⃣ Ý nghĩa của bài tập này?**

Bài tập này kiểm tra cách ứng dụng xử lý **các lỗ hổng bảo mật sau khi vá lỗi**. 

Lỗi ban đầu của hệ thống là **bất kỳ ai cũng có thể truy cập danh sách người dùng** qua endpoint `/users`. Sau khi công ty vá lỗi, chỉ admin mới có thể xem danh sách này. Tuy nhiên, hacker vẫn có thể:  
✅ **Dự đoán & tạo lại hash** nếu biết cách hệ thống tạo hash.  
✅ **Bypass kiểm tra quyền hạn** nếu API backend không thực sự chặn request. 

📌 **Tình huống giả định:**  
- Trước đó, bất kỳ người dùng nào cũng có thể truy cập danh sách `/users`.  
- Công ty đã vá lỗi → **Chỉ admin mới có thể truy cập**.  
- Mục tiêu: **Tìm hash của Jerry mà không có quyền admin**  


## 🚀 **2️⃣ Cách khai thác lỗ hổng sau khi fix**
### **🔎 Cách 1: Khôi phục hash của Jerry bằng thuật toán SHA-256**
Vì ta không thể lấy danh sách `/users`, ta sẽ **dự đoán và tạo lại hash** của Jerry.

📌 **Chiến lược:**  
- Dự đoán cách ứng dụng **băm mật khẩu**  
- Dùng **cùng thuật toán SHA-256** để tạo hash  
- So sánh với hash cũ ta tìm thấy trước đó  

📌 **Thông tin từ bài trước:**  
- Salt được dùng: `"DeliberatelyInsecure1235"`
- Cấu trúc hash: `SHA-256(password + salt + username)`

📌 **🔹 Code Java để tính lại hash của Jerry**
```java
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

public class Main {
    public static void main(String[] args) {
        String password = "doesnotreallymatter";
        String username = "Jerry";
        String passwordSalt = "DeliberatelyInsecure1235"; // Strong Salt

        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            String combined = password + passwordSalt + username;
            byte[] hash = md.digest(combined.getBytes(StandardCharsets.UTF_8));
            System.out.println("Hash của Jerry: " + Base64.getEncoder().encodeToString(hash));
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }
}
```
💻 **Hướng dẫn chạy code**
1️⃣ **Lưu code thành `Main.java`**  
2️⃣ **Mở terminal và biên dịch:**  
```sh
javac Main.java
```
3️⃣ **Chạy chương trình:**  
```sh
java Main
```
4️⃣ **Copy hash và dán vào WebGoat**  


### **🔎 Cách 2: Sử dụng Burp Suite để thử lại quyền truy cập**
💡 **Có thể backend chỉ chặn giao diện UI nhưng không chặn API?**  

📌 **Các bước thử nghiệm:**  
1️⃣ **Mở Burp Suite → Bật Intercept**  
2️⃣ **Truy cập WebGoat → Thử gọi `/users` qua API**  
3️⃣ **Nếu bị chặn → Thử đổi User-Agent thành Admin**  
4️⃣ **Nếu vẫn bị chặn → Thử bypass bằng session hijacking**  


## 🔒 **3️⃣ Giải pháp phòng tránh**

### 🔹 **1. Sử dụng phương pháp băm an toàn (Password Hashing)**
📌 **Sai lầm trong hệ thống hiện tại:**  
- Sử dụng SHA-256 **một lần duy nhất** để băm mật khẩu.  
- Salt (`DeliberatelyInsecure1235`) bị cố định → dễ bị đoán.  

📌 **Cách làm đúng:**  
🔹 **Dùng thuật toán băm an toàn hơn như** `bcrypt`, `PBKDF2` hoặc `Argon2`.  
🔹 **Sử dụng salt ngẫu nhiên cho mỗi user** thay vì dùng chung một salt.  

### 🚀 **Ví dụ: Cách băm mật khẩu bằng bcrypt trong Java**
```java
import org.mindrot.jbcrypt.BCrypt;

public class SecureHashing {
    public static void main(String[] args) {
        String password = "JerrySecurePassword";
        
        // Tạo salt ngẫu nhiên và băm mật khẩu
        String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());
        
        System.out.println("Hashed Password: " + hashedPassword);
    }
}
```
💡 **Lợi ích:**  
✅ Bcrypt tự động **thêm salt ngẫu nhiên**.  
✅ Bcrypt có **cơ chế làm chậm (work factor)**, khiến việc bẻ khóa khó hơn.  


### 🔹 **2. Kiểm soát quyền hạn chặt chẽ trên Backend (API Authorization)**
📌 **Sai lầm trong hệ thống hiện tại:**  
- Chỉ **chặn truy cập trên giao diện** mà không kiểm tra quyền trong API backend.  
- Hacker có thể **gửi request trực tiếp đến API** để truy vấn dữ liệu.  

📌 **Cách làm đúng:**  
🔹 **Kiểm tra quyền của user trên API, không chỉ trên giao diện.**  
🔹 **Dùng OAuth2 / JWT để xác thực user và phân quyền chặt chẽ.**  
🔹 **Hạn chế thông tin trả về (Least Privilege)** → chỉ cho user thấy dữ liệu họ được phép xem.  


### 🚀 **Ví dụ: Kiểm tra quyền hạn trong API (ASP.NET Core)**
```csharp
[Authorize(Roles = "Admin")]
[HttpGet("users")]
public IActionResult GetUsers()
{
    var users = _userService.GetAllUsers();
    return Ok(users);
}
```
💡 **Lợi ích:**  
✅ Chỉ **admin** mới có thể gọi API `/users`.  
✅ Hacker không thể bypass chỉ bằng cách gửi request trực tiếp.  


### 🔹 **3. Bảo vệ API chống tấn công Brute Force và Enumeration**
📌 **Sai lầm trong hệ thống hiện tại:**  
- Hacker có thể **thử nhiều lần** để đoán hash của Jerry.  
- Không có **giới hạn số lần thử** → dễ bị brute-force.  

📌 **Cách làm đúng:**  
🔹 **Giới hạn số lần thử** (Rate Limiting).  
🔹 **Chống dò đoán thông tin bằng Captcha hoặc Delay Response.**  
🔹 **Ẩn lỗi trả về để hacker không đoán được user tồn tại hay không.**  


### 🚀 **Ví dụ: Chống brute force trong API (Node.js + Express + Rate Limiter)**
```javascript
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 phút
    max: 5, // Chỉ cho phép thử 5 lần
    message: "Quá nhiều lần thử đăng nhập. Vui lòng thử lại sau 15 phút."
});

app.post('/login', loginLimiter, (req, res) => {
    // Xử lý đăng nhập
});
```
💡 **Lợi ích:**  
✅ Ngăn chặn hacker **thử nhiều lần để dò mật khẩu**.  
✅ Bảo vệ user khỏi **tấn công brute-force**.  


## **🔎 3️⃣ Kết luận: Cách làm đúng**
| ❌ **Sai lầm** | ✅ **Cách sửa** |
|--------------|------------------|
| Dùng SHA-256 với salt cố định | Dùng `bcrypt` hoặc `Argon2` với salt ngẫu nhiên |
| Chỉ chặn UI nhưng không kiểm tra API | Kiểm tra quyền trên **backend** (API) |
| Không giới hạn số lần thử | Dùng **Rate Limiting** & **Captcha** để chống brute-force |
| API trả về lỗi rõ ràng | **Ẩn lỗi**, không tiết lộ thông tin user có tồn tại hay không |

📌 **Bài học quan trọng:**  
✅ **Không chỉ sửa lỗi trên UI** – **phải kiểm tra cả API backend**!  
✅ **Mật khẩu và hash cần được bảo vệ bằng thuật toán mạnh** như bcrypt.  
✅ **Phải chống brute-force để ngăn hacker dò mật khẩu.**  

🔥 **"Fix lỗi" không có nghĩa là an toàn – hacker luôn tìm cách mới để khai thác!"** 🚀

Xem chi tiết tại [đây](https://docs.cycubix.com/application-security-series/web-application-security-essentials/solutions/a5-broken-access-control/a1-2021-or-missing-function-level-access-control-or-cycubix-docs/a1-2021-or-missing-function-level-access-control-4-or-cycubix-docs).