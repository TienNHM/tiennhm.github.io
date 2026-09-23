---
title: 4.02 | Spoofing an Authentication Cookie
slug: spoofing-an-authentication-cookie-02
description: "Mô tả: Hacker cố gắng tìm ra cách hệ thống tạo authentication cookie, sau đó tạo một cookie giả mạo để đăng nhập vào tài khoản khác (Tom)."
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

> 🛑 **Phân tích & Phòng tránh tấn công giả mạo Authentication Cookie**  


### 🔥 **Tấn công: Spoofing Authentication Cookie**  
💡 **Mô tả:** Hacker cố gắng tìm ra cách hệ thống tạo authentication cookie, sau đó tạo một cookie giả mạo để đăng nhập vào tài khoản khác (Tom).  

🕵️ **Cách hacker thực hiện tấn công:**  
1. **Bắt gói tin bằng Burp Suite hoặc ZAP** → Xem authentication cookie sau khi đăng nhập.  
2. **Phát hiện cookie có cấu trúc Base64 hoặc HEX** → Giải mã để tìm quy luật tạo cookie.  
3. **Thay đổi giá trị username trong cookie** (ví dụ: "webgoat" ➝ "tom").  
4. **Mã hóa lại thành Base64 hoặc HEX** và gửi lại request.  
5. **Hệ thống không kiểm tra chữ ký của cookie** ➝ Cho phép hacker đăng nhập vào tài khoản Tom!  

💀 **Nguyên nhân lỗ hổng:**  
❌ Cookie không được ký hoặc mã hóa đúng cách.  
❌ Không có kiểm tra tính toàn vẹn của cookie.  
❌ Username được lưu trực tiếp trong cookie mà không có bảo vệ.  


## ✅ **Phòng tránh tấn công giả mạo Authentication Cookie**
### 🔹 **1. Ký và mã hóa authentication cookie**
🔐 **Giải pháp:**  
✔️ **Sử dụng JWT (JSON Web Token) có chữ ký số** để bảo đảm cookie không thể bị thay đổi.  
✔️ **Dùng thuật toán HMAC-SHA256 để ký cookie**, hacker không thể thay đổi mà không có secret key.  

🚀 **Ví dụ: Tạo cookie an toàn trong Node.js**
```javascript
const jwt = require('jsonwebtoken');

const user = { id: 123, username: "webgoat" };
const secretKey = "super-secret-key"; // 🔑 Không được lộ key này!

const token = jwt.sign(user, secretKey, { algorithm: "HS256", expiresIn: '1h' });

res.cookie('auth', token, { httpOnly: true, secure: true, sameSite: 'Strict' });
```
✅ **Lợi ích:**  
✔️ Hacker không thể sửa username trong cookie mà không có secret key.  
✔️ Ngăn chặn tấn công giả mạo authentication cookie.  


### 🔹 **2. Không lưu username trực tiếp trong cookie**
🔐 **Giải pháp:**  
✔️ **Chỉ lưu session ID, không lưu username trong cookie.**  
✔️ **Dữ liệu session phải được lưu trên server, không lưu toàn bộ thông tin trong cookie.**  

🚀 **Ví dụ: Chỉ lưu session ID thay vì username**
```http
Set-Cookie: sessionId=abc123; Secure; HttpOnly; SameSite=Strict;
```
✅ **Lợi ích:**  
✔️ Nếu hacker có được cookie, hắn cũng không biết username.  
✔️ Hạn chế rủi ro giả mạo tài khoản.  


### 🔹 **3. Kiểm tra tính toàn vẹn của cookie**
🔐 **Giải pháp:**  
✔️ **Sử dụng HMAC (Hash-based Message Authentication Code)** để bảo đảm tính toàn vẹn.  
✔️ **Kiểm tra chữ ký số trước khi chấp nhận cookie.**  

🚀 **Ví dụ: Tạo HMAC SHA256 trong Python**
```python
import hmac
import hashlib
import base64

secret_key = b'super-secret-key'
message = b"webgoat"

# Tạo chữ ký HMAC SHA256
signature = hmac.new(secret_key, message, hashlib.sha256).digest()
cookie_value = base64.b64encode(message + signature)

print(cookie_value)
```
✅ **Lợi ích:**  
✔️ Nếu hacker thay đổi `webgoat` thành `tom`, chữ ký số sẽ không hợp lệ!  
✔️ Hệ thống sẽ từ chối cookie giả mạo.  


### 🔹 **4. Giới hạn thời gian sống của cookie (Session Expiration)**
🔐 **Giải pháp:**  
✔️ **Hạn chế thời gian sống của cookie** → Nếu bị đánh cắp, nó cũng hết hạn sớm.  
✔️ **Xóa session trên server khi user đăng xuất.**  

🚀 **Ví dụ: Đặt thời gian hết hạn cho cookie**
```http
Set-Cookie: sessionId=abc123; Secure; HttpOnly; Expires=Wed, 21 Oct 2025 07:28:00 GMT;
```
✅ **Lợi ích:**  
✔️ Giảm nguy cơ hacker sử dụng cookie cũ để đăng nhập.  


### 🔹 **5. Kiểm tra thiết bị & địa chỉ IP khi xác thực**
🔐 **Giải pháp:**  
✔️ **Ghi lại thông tin thiết bị, địa chỉ IP** khi tạo session.  
✔️ **Nếu IP hoặc User-Agent thay đổi đột ngột, yêu cầu xác thực lại.**  

🚀 **Ví dụ: Kiểm tra IP & User-Agent**
```python
if request.cookies.get('sessionId') and (request.remote_addr != saved_ip or request.user_agent != saved_ua):
    logout_user()
```
✅ **Lợi ích:**  
✔️ Ngăn hacker sử dụng cookie từ một thiết bị khác.  


## **🔎 Kết luận: Cách bảo vệ hệ thống**
| ❌ **Lỗi phổ biến** | ✅ **Giải pháp bảo mật** |
|----------------|------------------|
| Lưu username trực tiếp trong cookie | Chỉ lưu session ID, không lưu thông tin nhạy cảm trong cookie |
| Không ký cookie | Dùng HMAC-SHA256 hoặc JWT để đảm bảo cookie không bị giả mạo |
| Không kiểm tra tính toàn vẹn của cookie | Kiểm tra chữ ký số trước khi chấp nhận cookie |
| Cookie không có thời gian hết hạn | Thiết lập `Expires` hoặc `Max-Age` để giới hạn thời gian sống của cookie |
| Không kiểm tra IP/User-Agent khi xác thực | Xác minh IP và thiết bị để phát hiện đăng nhập bất thường |

🚀 **Bảo mật authentication cookie rất quan trọng!**  
✔️ Nếu cookie không an toàn, hacker có thể đăng nhập vào hệ thống dễ dàng.  
✔️ Luôn mã hóa, ký và kiểm tra tính toàn vẹn của authentication cookie.  
✔️ Bảo vệ hệ thống ngay từ bây giờ để tránh bị hack! 🔐

Xem chi tiết tại [đây](https://docs.cycubix.com/application-security-series/web-application-security-essentials/solutions/a5-broken-access-control/a1-2021-or-spoofing-an-authentication-cookie-or-cycubix-docs/a1-2021-or-spoofing-an-authentication-cookie-2-or-cycubix-docs).