---
title: 3.01 | Missing Function Level Access Control
slug: missing-function-level-access-control-01
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

> 🔥 **Missing Function Level Access Control (MFAC) - Lỗ hổng Kiểm soát Truy cập Cấp Hàm**

## ✅ **1️⃣ MFAC là gì?**
**📌 Định nghĩa:**  
Lỗ hổng **Missing Function Level Access Control (MFAC)** xảy ra khi ứng dụng không kiểm soát quyền truy cập vào một số chức năng **ở cấp độ API hoặc backend**, dẫn đến việc người dùng trái phép có thể gọi trực tiếp các API ẩn để thực hiện hành động mà họ không được phép.

📌 **So sánh IDOR vs MFAC**
| 🔥 **Lỗ hổng** | ❌ **Nguy cơ bảo mật** |
|--------------|------------------|
| **IDOR** *(Insecure Direct Object Reference)* | Truy cập dữ liệu của người khác bằng cách thay đổi ID (`GET /profile/5678`) |
| **MFAC** *(Missing Function Level Access Control)* | Truy cập **chức năng cấm** bằng cách gọi trực tiếp API (`POST /admin/deleteUser`) |

📌 **IDOR** → Kiểm soát **nội dung dữ liệu**  
📌 **MFAC** → Kiểm soát **quyền thực thi chức năng**  


## 🚨 **2️⃣ Ví dụ thực tế về MFAC**
### **Tình huống nguy hiểm**
Một ứng dụng có giao diện quản trị viên để xóa người dùng:  
- Chỉ admin mới thấy nút "Xóa người dùng"  
- Tuy nhiên, API vẫn mở cho bất kỳ ai gọi trực tiếp:  
  ```plaintext
  POST /admin/deleteUser
  Body: { "userId": 5678 }
  ```
- Nếu attacker biết API này, họ có thể gửi request xóa tài khoản **mà không cần quyền admin**.


## ✅ **3️⃣ Giải pháp bảo mật**
### 🔒 **1. Kiểm tra quyền trên Backend**
**❌ Sai cách (Dễ bị tấn công)**
```csharp
[HttpPost("/admin/deleteUser")]
public IActionResult DeleteUser([FromBody] DeleteUserDto request)
{
    var user = _dbContext.Users.Find(request.UserId);
    if (user == null) return NotFound();

    _dbContext.Users.Remove(user);
    _dbContext.SaveChanges();
    return Ok();
}
```
- **Vấn đề:** Không kiểm tra **người gọi API có phải là admin hay không**.


**✅ Đúng cách (Bảo mật hơn)**
```csharp
[Authorize(Roles = "Admin")] // 🔒 Chỉ admin mới được gọi API
[HttpPost("/admin/deleteUser")]
public IActionResult DeleteUser([FromBody] DeleteUserDto request)
{
    var user = _dbContext.Users.Find(request.UserId);
    if (user == null) return NotFound();

    _dbContext.Users.Remove(user);
    _dbContext.SaveChanges();
    return Ok();
}
```
📌 **Kết quả:**  
✅ Người dùng thường KHÔNG thể truy cập chức năng này, kể cả khi gọi API trực tiếp.


### 🔒 **2. Ẩn Endpoint quan trọng (Security by Design)**
- Không để lộ API **`/admin/deleteUser`**, thay vào đó:
  ```plaintext
  POST /user/action
  Body: { "action": "delete", "userId": 5678 }
  ```
- Chỉ admin mới được phép thực hiện `"action": "delete"`.



### 🔒 **3. Ghi log các hành động quan trọng**
- Nếu API bị tấn công, cần có log để điều tra.
- Ví dụ ghi log khi xóa tài khoản:
  ```csharp
  _logger.LogWarning($"Admin {currentUser.Id} deleted user {user.Id}");
  ```


## 🔥 **4️⃣ Tóm tắt: Cách ngăn chặn MFAC**
| ❌ **Lỗ hổng** | ✅ **Giải pháp** |
|----------------|------------------|
| **API không kiểm tra quyền** | Luôn dùng `[Authorize(Roles = "...")]` để giới hạn quyền truy cập |
| **Lộ API quan trọng** | Đặt tên API chung chung để tránh bị lộ |
| **Không có log giám sát** | Ghi log mọi hành động quan trọng để dễ điều tra |
