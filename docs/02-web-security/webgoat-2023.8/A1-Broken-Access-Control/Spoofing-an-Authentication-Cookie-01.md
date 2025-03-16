---
title: 4.01 | Spoofing an Authentication Cookie
slug: spoofing-an-authentication-cookie-01
description: Bài viết này sẽ hướng dẫn cách tấn công Spoofing an Authentication Cookie trên WebGoat 2023.8
image: https://tiennhm.github.io/img/docs/database.jpg
sidebar_position: 4
# sidebar_class_name: hidden
tags: 
    - web-security
    - webgoat
    - broken-access-control
    - spoofing-an-authentication-cookie
    - webgoat-2023.8
keywords: [web-security, webgoat, broken-access-control, spoofing-an-authentication-cookie, webgoat-2023.8]
enableComments: true # for Gisqus comments, set to true
draft: false # set to true to hide this post from the site
---

> 🔐 **Phòng tránh lỗ hổng bảo mật liên quan đến Authentication Cookies**  


## **📌 1️⃣ Tại sao authentication cookies dễ bị tấn công?**  
1. **Dự đoán thuật toán sinh cookie** → Hacker có thể tạo cookie giả mạo.  
2. **Đánh cắp cookie qua XSS** → Nếu trang web có lỗ hổng XSS, hacker có thể lấy cookie của user.  
3. **Tấn công Man-in-the-Middle (MitM)** → Nếu cookie không được bảo vệ bằng HTTPS, hacker có thể chặn cookie trong quá trình truyền.  
4. **Cookie không có thời hạn hết hạn (Session Fixation)** → Hacker có thể dùng lại cookie cũ để truy cập vào tài khoản.  

💡 **Mục tiêu của chúng ta:**  
✔️ Bảo vệ cookie khỏi bị đánh cắp.  
✔️ Ngăn hacker giả mạo cookie.  
✔️ Giảm thiểu thời gian hacker có thể khai thác cookie.  


## **✅ 2️⃣ Giải pháp phòng tránh**

### 🔹 **1. Sử dụng cookie bảo mật (Secure, HttpOnly, SameSite, Domain, Path)**
📌 **Sai lầm phổ biến:**  
- Không đặt thuộc tính `HttpOnly`, cho phép hacker lấy cookie bằng JavaScript (XSS).  
- Không đặt `Secure`, khiến cookie bị gửi qua HTTP thay vì HTTPS.  
- Không có `SameSite`, làm cho cookie bị gửi đến trang web khác (CSRF).  

📌 **Cách làm đúng:**  
🔹 **Kích hoạt các thuộc tính bảo mật trong cookie**:  
```http
Set-Cookie: sessionId=abc123; Secure; HttpOnly; SameSite=Strict; Path=/; Domain=example.com;
```
🔹 **Ý nghĩa các thuộc tính:**  
| Thuộc tính          | Ý nghĩa |
|---------------------|---------|
| **Secure**          | Chỉ gửi cookie qua HTTPS, ngăn chặn tấn công MitM. |
| **HttpOnly**        | Ngăn JavaScript truy cập cookie, giảm rủi ro XSS. |
| **SameSite=Strict** | Ngăn CSRF bằng cách chỉ gửi cookie trong cùng một site. |
| **Domain & Path**   | Giới hạn cookie chỉ được sử dụng trong phạm vi nhất định. |


### 🔹 **2. Mã hóa & ký cookie để chống giả mạo**
📌 **Sai lầm phổ biến:**  
- Lưu thông tin session trực tiếp trong cookie dưới dạng plaintext.  
- Không có cơ chế xác thực tính hợp lệ của cookie.  

📌 **Cách làm đúng:**  
🔹 **Sử dụng JWT (JSON Web Token) để ký và mã hóa cookie**  
🔹 **Dùng thuật toán băm mạnh như HMAC-SHA256 để đảm bảo tính toàn vẹn của cookie**  

🚀 **Ví dụ: Tạo cookie an toàn với JWT trong Node.js**
```javascript
const jwt = require('jsonwebtoken');

const user = { id: 123, username: "admin" };
const secretKey = "supersecretkey";
const token = jwt.sign(user, secretKey, { expiresIn: '1h' });

// Lưu vào cookie với các thuộc tính bảo mật
res.cookie('auth', token, { httpOnly: true, secure: true, sameSite: 'Strict' });
```
💡 **Lợi ích:**  
✅ Hacker không thể sửa nội dung cookie do có chữ ký số.  
✅ Token có thời hạn hết hạn, giảm nguy cơ bị lợi dụng lâu dài.  


### 🔹 **3. Hạn chế thời gian sống của cookie (Session Expiration)**
📌 **Sai lầm phổ biến:**  
- Cookie không có thời gian hết hạn → Nếu bị đánh cắp, hacker có thể dùng mãi mãi.  

📌 **Cách làm đúng:**  
🔹 **Đặt thời gian hết hạn ngắn cho cookie.**  
🔹 **Bắt buộc đăng xuất người dùng sau một khoảng thời gian không hoạt động.**  

🚀 **Ví dụ: Đặt thời gian hết hạn cho cookie**
```http
Set-Cookie: sessionId=abc123; Secure; HttpOnly; Expires=Wed, 21 Oct 2025 07:28:00 GMT;
```
💡 **Lợi ích:**  
✅ Nếu hacker có cookie, nó cũng sẽ hết hạn nhanh chóng.  
✅ Giảm thời gian hacker có thể khai thác phiên người dùng.  


### 🔹 **4. Chống tấn công Cross-Site Scripting (XSS)**
📌 **Sai lầm phổ biến:**  
- Website có lỗ hổng XSS → Hacker có thể lấy cookie qua `document.cookie`.  

📌 **Cách làm đúng:**  
🔹 **Đặt thuộc tính `HttpOnly` để ngăn JavaScript đọc cookie.**  
🔹 **Lọc & mã hóa đầu vào để tránh XSS.**  
🔹 **Dùng Content Security Policy (CSP) để ngăn chặn JavaScript độc hại.**  

🚀 **Ví dụ: Kích hoạt CSP trong header**
```http
Content-Security-Policy: default-src 'self'; script-src 'self';
```
💡 **Lợi ích:**  
✅ Ngăn hacker chèn mã JavaScript để lấy cookie.  
✅ Tăng cường bảo mật cho toàn bộ ứng dụng web.  


### 🔹 **5. Chống tấn công Session Fixation**
📌 **Sai lầm phổ biến:**  
- Hệ thống giữ nguyên `sessionId` sau khi user đăng nhập → Hacker có thể ép user sử dụng session của mình.  

📌 **Cách làm đúng:**  
🔹 **Tạo session mới sau khi đăng nhập thành công.**  
🔹 **Không cho phép người dùng tự đặt sessionId.**  

🚀 **Ví dụ: Reset session sau khi đăng nhập**
```javascript
req.session.regenerate(function(err) {
    req.session.user = user;
    res.redirect('/dashboard');
});
```
💡 **Lợi ích:**  
✅ Hacker không thể ép user dùng session cũ của hắn.  
✅ Đảm bảo mỗi lần đăng nhập có session riêng.  


## **🔎 3️⃣ Kết luận**
| ❌ **Sai lầm** | ✅ **Cách sửa** |
|----------------|------------------|
| Không đặt `HttpOnly`, cho phép hacker lấy cookie qua XSS | Đặt `HttpOnly` để ngăn JavaScript truy cập cookie |
| Không đặt `Secure`, cho phép gửi cookie qua HTTP | Đặt `Secure` để chỉ gửi cookie qua HTTPS |
| Không đặt thời gian hết hạn cho cookie | Thiết lập thời gian hết hạn (`Expires` hoặc `Max-Age`) |
| Lưu thông tin session trong cookie không mã hóa | Sử dụng JWT hoặc HMAC-SHA256 để bảo vệ dữ liệu trong cookie |
| Không đổi sessionId sau khi đăng nhập | **Regenerate session** sau khi đăng nhập thành công |

📌 **Bài học quan trọng:**  
✅ **Cookie phải được bảo vệ bằng nhiều lớp**: mã hóa, ký, hạn chế truy cập.  
✅ **Chỉ sửa lỗi trên UI không đủ – phải kiểm tra backend**!  
✅ **Bảo mật authentication cookies là cốt lõi của mọi hệ thống đăng nhập.**  

🔥 **"Một cookie không được bảo vệ có thể phá hủy toàn bộ hệ thống!"** 🚀