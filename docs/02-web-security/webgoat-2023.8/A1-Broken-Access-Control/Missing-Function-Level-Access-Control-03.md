---
title: 3.03 | Missing Function Level Access Control
slug: missing-function-level-access-control-03
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

> 🔥 **Phân tích & Cách khai thác lỗ hổng "Try It" trong WebGoat**  

## ✅ **1️⃣ Ý nghĩa của bài tập này?**
Bài tập này nhấn mạnh vào việc **kiểm tra quyền truy cập bị bỏ sót**. Nhiều ứng dụng chỉ **ẩn chức năng trên giao diện người dùng (UI)** mà **không thực sự kiểm tra quyền trên backend**, dẫn đến việc hacker có thể **truy cập trái phép** bằng cách **thử trực tiếp các endpoint**.

📌 **Bài toán thực tế:**  
- Bạn đã tìm thấy **2 menu ẩn**: `/users` và `/config`
- Mục tiêu: **Khai thác endpoint `/users` để lấy danh sách người dùng**
- Cần tìm **hash của tài khoản Jerry** và nhập vào WebGoat


## 🚀 **2️⃣ Cách khai thác lỗ hổng "Try It"**
### **🔎 Cách 1: Sử dụng Burp Suite/ZAP để chặn & thay đổi request**
**Bước 1️⃣: Bật Intercept (chặn request)**
- Mở **Burp Suite** → **Bật Intercept**
- Truy cập WebGoat → Click Submit dưới mục "User Hash"
- Chặn request để kiểm tra **endpoint nào bị gọi**  

**Bước 2️⃣: Tìm & sửa request**
- Xem **request bị chặn**, đổi endpoint từ `/user-hash` thành `/users`
- **Nếu lỗi "Unsupported Media Type"**, thêm header:
  ```http
  Content-Type: application/json; charset=UTF-8
  ```
- **Nếu lỗi "Expected JSON object"**, chuyển từ `POST` sang `GET`
- **Nếu lỗi quyền truy cập**, thử **chèn role admin** (`WEBGOAT_ADMIN`)

**Bước 3️⃣: Gửi request & trích xuất dữ liệu**
- Nếu request thành công, dữ liệu user sẽ trả về.
- **Tìm hash của Jerry** và nhập vào WebGoat.


### **🔎 Cách 2: Dùng Developer Tools (DevTools)**
**Bước 1️⃣: Mở DevTools (F12) → Chuyển sang tab Network**  
- Truy cập `http://localhost:8080/WebGoat/users`
- Xem các request gửi đi, tìm endpoint `/users`

**Bước 2️⃣: Chỉnh sửa request**
- Click vào request `/users` → **Edit & Resend**
- Thêm header:
  ```http
  Content-Type: application/json
  ```
- **Gửi request** và kiểm tra phản hồi.


## 🔒 **3️⃣ Giải pháp phòng tránh**
### ✅ **1. Kiểm soát quyền truy cập trên Backend**
Không chỉ kiểm tra **role trên UI**, mà phải kiểm tra trên API:
```csharp
[Authorize(Roles = "Admin")]
public IActionResult GetUsers()
{
    return Json(userService.GetAllUsers());
}
```

### ✅ **2. Tránh để lộ thông tin trong response**
- Không trả về danh sách user nếu không cần thiết.
- Hash toàn bộ dữ liệu nhạy cảm.

### ✅ **3. Ghi log & chặn hành vi đáng ngờ**
- Nếu có **nhiều request bất thường** đến `/users`, có thể là hacker đang tấn công.
- Ghi lại các request bị từ chối.


## 🔥 **4️⃣ Kết luận**
| ❌ **Sai lầm** | ✅ **Cách sửa** |
|--------------|------------------|
| Chỉ ẩn menu bằng UI | Kiểm soát quyền từ backend |
| Không kiểm tra quyền trên API | Dùng `[Authorize]` để chặn API |
| Lộ thông tin user trong response | Chỉ trả về thông tin cần thiết |

📌 **Bài học rút ra:**  
🔹 **Chỉ vì bạn không thấy không có nghĩa là nó không tồn tại!** 🚀

Xem chi tiết tại [đây](https://docs.cycubix.com/application-security-series/web-application-security-essentials/solutions/a5-broken-access-control/a1-2021-or-missing-function-level-access-control-or-cycubix-docs/missing-function-level-access-control-3).