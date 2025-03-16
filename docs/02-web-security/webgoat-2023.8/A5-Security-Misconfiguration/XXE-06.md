---
title: 1.06 | XXE
slug: XXE-06
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

> 🔍 **Phát hiện XXE qua Code Review**

## 🎯 **Mục tiêu**
- **Tìm hiểu tại sao XXE xảy ra** trong các ứng dụng Java.
- **Phân tích mã nguồn để phát hiện lỗ hổng XXE**.
- **Xác định cách cấu hình XML parser sao cho an toàn**.


## 🛠 **1. Phân tích mã nguồn chứa lỗ hổng**
**📌 Đoạn mã cấu hình `XmlMapper`**
```java
public XmlMapper xmlMapper() {
  return new XmlMapper(XMLInputFactory.newInstance()); 
}
```
**❌ Vấn đề:**  
- Hàm này **khởi tạo trực tiếp `XMLInputFactory.newInstance()`** mà không tắt các thuộc tính nguy hiểm.
- Mặc định, trình phân tích **cho phép các thực thể bên ngoài (External Entities)**.

👉 **Câu hỏi:** **Parser này có an toàn không?**  
🔍 **Đi sâu vào mã nguồn của Jackson `XmlMapper`:**
```java
public XmlMapper(XMLInputFactory inputF) {   
  this(new XmlFactory(inputF));  
}
```
- **Hàm khởi tạo `XmlMapper`** gọi tiếp **`XmlFactory`**.
- **`XmlFactory` nhận `XMLInputFactory` từ bên ngoài`**.


## 🛠 **2. Phân tích sâu hơn - `XmlFactory`**
```java
public XmlFactory(XMLInputFactory xmlIn) {  
  this(xmlIn, null); 
}  

protected XmlFactory(XMLInputFactory xmlIn, XMLOutputFactory xmlOut, ...) { 
  if (xmlIn == null) {  
    xmlIn = XMLInputFactory.newInstance();

    // Tắt thực thể bên ngoài (chỉ khi xmlIn == null)
    xmlIn.setProperty(XMLInputFactory.IS_SUPPORTING_EXTERNAL_ENTITIES, Boolean.FALSE);  
    xmlIn.setProperty(XMLInputFactory.SUPPORT_DTD, Boolean.FALSE); 
  }
}
```
🚨 **Phát hiện lỗ hổng:**  
- **`xmlIn == null` sẽ không xảy ra**, vì `XMLInputFactory.newInstance()` đã được truyền vào.
- **Do đó, các thuộc tính an toàn không được thiết lập** → **XXE Injection vẫn có thể xảy ra**.


## ✅ **3. Cách phòng chống**
**💡 Spring Boot đã khắc phục lỗi như thế nào?**
```java
public ObjectMapper create() {
  return new XmlMapper(xmlInputFactory());  
}

private static XMLInputFactory xmlInputFactory() {
  XMLInputFactory inputFactory = XMLInputFactory.newInstance();
  inputFactory.setProperty(XMLInputFactory.SUPPORT_DTD, false);
  inputFactory.setProperty(XMLInputFactory.IS_SUPPORTING_EXTERNAL_ENTITIES, false);
  return inputFactory;
}
```
🔒 **Giải pháp an toàn:**  
- **Tạo `XMLInputFactory` trong một method riêng (`xmlInputFactory()`).**
- **Tắt `SUPPORT_DTD` và `IS_SUPPORTING_EXTERNAL_ENTITIES` ngay khi khởi tạo**.


## 🔥 **4. Cách kiểm tra parser có an toàn không?**
🔍 **Câu hỏi cần đặt ra khi review code**

✅ Parser có bị ảnh hưởng bởi XXE không?  
✅ Có sử dụng `XMLInputFactory.newInstance()` mà không vô hiệu hóa thực thể bên ngoài không?  
✅ Có thuộc tính `IS_SUPPORTING_EXTERNAL_ENTITIES = false` không?  
✅ Có thuộc tính `SUPPORT_DTD = false` không?  


## 🛡 **5. Tài liệu tham khảo**
📌 [OWASP XXE Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/XML_External_Entity_Prevention_Cheat_Sheet.html)  
📌 [Jackson XML Deserialization Security](https://github.com/FasterXML/jackson-dataformat-xml)  
