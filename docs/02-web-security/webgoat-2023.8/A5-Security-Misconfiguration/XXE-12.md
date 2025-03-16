---
title: 1.12 | XXE
slug: XXE-12
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

> 🛡 **XXE Mitigation - Cách Phòng Chống XXE**  

## **1️⃣ Kiểm soát và xác thực đầu vào**
- Chỉ chấp nhận dữ liệu XML từ nguồn tin cậy.
- Kiểm tra nội dung XML trước khi xử lý.
- Không cho phép người dùng nhập trực tiếp XML.


## **2️⃣ Cấu hình XML Parser để vô hiệu hóa DTD và External Entities**
Trong **Java**, bạn có thể tắt DTD bằng cách:

```java
XMLInputFactory xif = XMLInputFactory.newFactory();
xif.setProperty(XMLInputFactory.SUPPORT_DTD, false); // Tắt hỗ trợ DTD
```

Nếu không thể vô hiệu hóa hoàn toàn DTD, hãy chặn external entities:

```java
XMLInputFactory xif = XMLInputFactory.newFactory();
xif.setProperty(XMLInputFactory.IS_SUPPORTING_EXTERNAL_ENTITIES, false); // Chặn external entities
xif.setProperty(XMLInputFactory.SUPPORT_DTD, true); // Chỉ cho phép DTD nội bộ
```

**Lưu ý:** Các thư viện XML khác nhau sẽ có cách cấu hình khác nhau. Hãy kiểm tra theo thư viện bạn đang dùng.


## **3️⃣ Kiểm tra Content-Type và Accept Header**
- Chỉ chấp nhận request có **Content-Type hợp lệ**.
- Nếu client gửi Accept Header không phù hợp, trả về HTTP `406 Not Acceptable`.

**Ví dụ trong Spring Boot (Java):**
```java
@RequestMapping(value = "/upload", method = RequestMethod.POST, consumes = "application/xml")
public ResponseEntity<String> uploadFile(@RequestBody String xmlData) {
    return new ResponseEntity<>("Received", HttpStatus.OK);
}
```
🔹 **Chặn nếu Content-Type không phải XML**.


## **4️⃣ Sử dụng thư viện chống XXE**
Một số thư viện hỗ trợ bảo vệ khỏi XXE:
- **OWASP Java XML Parser**
- **Jackson for XML (không dùng DOM hoặc SAX trực tiếp)**
- **DefusedXml (Python)**
- **SafeXmlParser (.NET)**


## **5️⃣ Dùng JSON thay vì XML nếu có thể**
Nếu ứng dụng không bắt buộc dùng XML, hãy cân nhắc **sử dụng JSON**, vì JSON không hỗ trợ các thực thể XML (`<!ENTITY>`), giảm thiểu rủi ro XXE.


## **🔒 Tổng kết**
✔ **Kiểm tra và xác thực dữ liệu đầu vào**  
✔ **Vô hiệu hóa DTD và External Entities trong parser**  
✔ **Kiểm tra Content-Type và Accept Header**  
✔ **Sử dụng thư viện XML an toàn**  
✔ **Ưu tiên JSON thay vì XML nếu có thể**  

Bằng cách áp dụng các biện pháp trên, bạn có thể giảm thiểu nguy cơ bị tấn công XXE! 🚀