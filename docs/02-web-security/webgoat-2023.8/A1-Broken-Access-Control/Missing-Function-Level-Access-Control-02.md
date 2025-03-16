---
title: 3.02 | Missing Function Level Access Control
slug: missing-function-level-access-control-02
description: Bài viết này sẽ hướng dẫn cách tấn công Missing Function Level Access Control trên WebGoat 2023.8
image: https://tiennhm.github.io/img/docs/database.jpg
sidebar_position: 3
# sidebar_class_name: hidden
tags: 
    - web-security
    - webgoat
    - broken-access-control
    - missing-function-level-access-control
    - webgoat-2023.8
keywords: [web-security, webgoat, broken-access-control, missing-function-level-access-control, webgoat-2023.8]
enableComments: true # for Gisqus comments, set to true
draft: false # set to true to hide this post from the site
---

> 🔥 **Phân tích lỗ hổng "Relying on Obscurity" & Cách tìm Menu ẩn**  

## ✅ **1️⃣ Lỗ hổng "Relying on Obscurity" là gì?**
**📌 Định nghĩa:**  
Nhiều ứng dụng cố gắng bảo mật bằng cách **ẩn các tính năng quan trọng** thay vì kiểm soát truy cập thực sự. Điều này nguy hiểm vì **hacker có thể dễ dàng tìm ra** và khai thác.

📌 **Ví dụ thực tế:**  
- Ẩn nút bằng **CSS (`display: none`)**
- Ẩn phần tử bằng **JavaScript (`if (!isAdmin) hideMenu()`)**
- Ẩn đường dẫn **URL admin**
- **Comment** mã nguồn HTML chứa thông tin nhạy cảm

🚨 **Nguy hiểm**: Hacker có thể **bật lại, xem hoặc đoán được** các phần bị ẩn một cách dễ dàng.


## 🚀 **2️⃣ Cách tìm Menu ẩn trong WebGoat**
Giả sử **menu hiển thị trên UI** như sau:
```html
<ul id="menu">
    <li>WebGoat</li>
    <li>Account</li>
    <li>Messages</li>
    <!-- <li>Users</li> -->
    <li style="display: none;">Config</li>
</ul>
```
📌 **Các cách hacker có thể phát hiện menu ẩn:**  
✅ **Dùng "View Source" (Ctrl + U)** → Tìm các phần tử bị comment (`<!-- Users -->`)  
✅ **Dùng DevTools (F12 → Elements)** → Kiểm tra **`display: none;`** và chỉnh sửa  
✅ **Kiểm tra JavaScript** → Xem file `.js` có ẩn nội dung không  
✅ **Sử dụng API Scanner** → Kiểm tra `/users`, `/admin`, `/config` có tồn tại không  

🎯 **Kết quả tìm thấy hai mục menu ẩn:**  
🔍 **Hidden item 1:** `Users`  
🔍 **Hidden item 2:** `Config`


## 🔒 **3️⃣ Giải pháp bảo mật**
### ✅ **1. Không dựa vào UI để bảo mật**
❌ **Sai:** Ẩn bằng `display: none;` hoặc JavaScript  
✅ **Đúng:** Kiểm soát quyền truy cập trên Backend  
```csharp
[Authorize(Roles = "Admin")]
public IActionResult Users()
{
    return View();
}
```


### ✅ **2. Kiểm soát hiển thị trên Server (Không hiển thị nếu không có quyền)**
```csharp
@if (User.IsInRole("Admin"))
{
    <li><a href="/users">Users</a></li>
}
```
📌 **Kết quả:**  
- **Người dùng thường** không thấy menu **Users**  
- **Hacker không thể thấy dù dùng DevTools**  


### ✅ **3. Ghi log mọi truy cập đáng ngờ**
```csharp
_logger.LogWarning($"Unauthorized access attempt: {HttpContext.User.Identity.Name} tried to access /config");
```
📌 **Kết quả:**  
- Ghi lại **tất cả truy cập đáng ngờ**
- Giúp phát hiện hacker **sớm hơn**  


## 🔥 **4️⃣ Tóm tắt & Kết luận**
| ❌ **Sai lầm** | ✅ **Cách sửa** |
|----------------|------------------|
| Ẩn menu bằng CSS hoặc JS | Kiểm soát truy cập từ Backend |
| Chỉ chặn hiển thị trên Frontend | Ẩn nội dung từ Server |
| Không giám sát truy cập | Ghi log mọi request đáng ngờ |

**📌 Bài học rút ra:**  
**"Bảo mật thực sự không nằm ở việc ẩn giấu, mà ở việc kiểm soát quyền truy cập đúng cách!"** 🚀

Xem chi tiết tại [đây](https://docs.cycubix.com/application-security-series/web-application-security-essentials/solutions/a5-broken-access-control/a1-2021-or-missing-function-level-access-control-or-cycubix-docs/missing-function-level-access-control-2).