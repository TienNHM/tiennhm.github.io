---
title: 2.06 | Insecure Direct Object References
slug: insecure-direct-object-references-06
description: Bài viết này sẽ hướng dẫn cách tấn công Insecure Direct Object References trên WebGoat 2023.8
image: https://tiennhm.github.io/img/docs/database.jpg
sidebar_position: 2
# sidebar_class_name: hidden
tags: 
    - web-security
    - webgoat
    - broken-access-control
    - insecure-direct-object-references
    - webgoat-2023.8
keywords: [web-security, webgoat, broken-access-control, insecure-direct-object-references, webgoat-2023.8]
enableComments: true # for Gisqus comments, set to true
draft: false # set to true to hide this post from the site
---

> **Bảo vệ Tham chiếu Đối tượng (Secure Object References)**

## **1️⃣ Kiểm soát truy cập là gì?**  
💡 **Câu hỏi quan trọng:** Bạn đã **tài liệu hóa** các quy tắc kiểm soát truy cập chưa?  
- Nếu chưa, làm sao bạn có thể thực thi nó?  

**Kiểm soát truy cập (Access Control)** là tập hợp các quy tắc giúp **xác định ai có quyền truy cập dữ liệu nào**. Nó có thể bị ảnh hưởng bởi:  
✅ **Logic liên quan đến business** của ứng dụng  
✅ **Luật bảo mật dữ liệu & quyền riêng tư**  


## **2️⃣ Kiểm soát truy cập ngang và dọc**  
🔹 **Kiểm soát truy cập ngang (Horizontal Access Control - HAC)**  
- Xảy ra giữa các người dùng có **cùng quyền hạn**  
- VD: **Người dùng A có thể xem dữ liệu của người dùng B**  

🔹 **Kiểm soát truy cập dọc (Vertical Access Control - VAC)**  
- Liên quan đến **sự khác biệt quyền hạn giữa các cấp**  
- VD: **Người dùng thông thường không thể truy cập vào trang admin**  

📌 **Cả hai loại kiểm soát này cần được thực thi!**  


## **3️⃣ Ví dụ về Ma trận Kiểm soát Truy cập**  

| **Endpoint**      | **Phương thức** | **Mô tả** | **Quyền hạn & Quy tắc** | **Lưu ý** |
|-------------------|-----------------|-----------|-------------------------|---------|
| `/profile`        | `GET`           | Xem hồ sơ của chính mình | Chỉ người dùng đã đăng nhập | Admin phải sử dụng URL khác để xem hồ sơ người khác |
| `/profile/{id}`   | `GET`           | Xem hồ sơ của user khác | Người dùng chỉ được xem hồ sơ của chính mình; Admin có thể xem hồ sơ khác | Không có |
| `/profile/{id}`   | `PUT`           | Sửa hồ sơ | Người dùng chỉ có thể chỉnh sửa hồ sơ của chính họ; Admin có thể chỉnh sửa | Hành động chỉnh sửa của admin phải được ghi log |


## **4️⃣ Ghi log & Giám sát truy cập**  
📌 **Tại sao cần ghi log?**  
- Ghi lại hoạt động của admin **khi chỉnh sửa dữ liệu người khác**  
- Theo dõi các **hành vi vi phạm quyền truy cập**  

🛑 **Ví dụ cần log:**  
✔️ Admin chỉnh sửa hồ sơ người khác  
✔️ Một user cố truy cập hồ sơ của người khác mà không có quyền  
✔️ Phát hiện hành vi cố gắng tấn công  


## **5️⃣ Tham chiếu Gián tiếp (Indirect References) để bảo mật**  
🔒 **Cách bảo vệ ID bằng tham chiếu gián tiếp:**  
- **Không** sử dụng ID thật trong URL (`/profile/1234`)  
- Dùng một **mã hash hoặc mã hóa** để thay thế (`/profile/A1B2C3D4`)  
- Trên server, ánh xạ giá trị mã hóa về ID thực  

📌 **Ví dụ:**  
🔹 **Tham chiếu trực tiếp (Dễ bị tấn công IDOR)**  
```
http://example.com/profile?id=1234
```
🔹 **Tham chiếu gián tiếp (Bảo mật hơn)**  
```
http://example.com/profile?id=8f3e9d72a1
```
🛑 **Lưu ý:** Phương pháp này **không thể bảo vệ hoàn toàn** vì attacker có thể brute-force hoặc giải mã. Nó chỉ là một **lớp bảo vệ bổ sung**.  


## **6️⃣ Kiểm soát truy cập trong API & RESTful Services**  
🔥 **Lỗ hổng thường gặp:**  
❌ API chỉ dựa vào **khóa tĩnh** để kiểm soát truy cập  
❌ API không xác thực quyền truy cập đủ mạnh  

✅ **Giải pháp:**  
- **Sử dụng JSON Web Tokens (JWT) có chữ ký số** ([jwt.io](https://jwt.io/))  
- **Ánh xạ quyền truy cập với các claims trong JWT**  
- **Secure Token Binding** để bảo mật request headers ([IETF draft](https://tools.ietf.org/html/draft-ietf-tokbind-protocol-10))  

## **7️⃣Ví dụ thực tế về lỗ hổng & giải pháp bảo mật (IDOR, Access Control)**

### 🚨 **7.1. Lỗ hổng IDOR (Insecure Direct Object References)**  
#### **📌 Tình huống:**  
Giả sử hệ thống có endpoint API cho phép người dùng xem hồ sơ cá nhân:  
```plaintext
GET /profile/1234
```
- Nếu người dùng **Alice** có `userId = 1234`, họ có thể truy cập hồ sơ của mình.  
- Tuy nhiên, nếu **Alice** thay đổi `1234` thành `5678` (ID của Bob), họ vẫn có thể xem hồ sơ của **Bob**, dù không có quyền!  

**📌 Đây là lỗi IDOR (Tham chiếu đối tượng không an toàn)**  
Attacker có thể thử nhiều `userId` khác nhau để đánh cắp dữ liệu người dùng.


#### ✅ **🔒 Giải pháp bảo mật**  
**🔹 1. Kiểm tra quyền trong Backend**  
- Trước khi trả về dữ liệu, server phải kiểm tra xem **user có quyền truy cập dữ liệu đó hay không**.  
- **Sai cách:**  
  ```csharp
  [HttpGet("/profile/{id}")]
  public IActionResult GetProfile(int id)
  {
      var profile = _dbContext.Users.Find(id);
      return Ok(profile); // ❌ Không kiểm tra quyền
  }
  ```
  - **Vấn đề:** Nếu user Alice nhập ID của Bob, hệ thống vẫn trả về thông tin của Bob!

- **Đúng cách:**  
  ```csharp
  [HttpGet("/profile/{id}")]
  public IActionResult GetProfile(int id)
  {
      var currentUserId = GetUserIdFromSession(); // Lấy ID của user đang đăng nhập
      if (currentUserId != id && !IsAdmin()) // Chỉ admin mới có thể xem người khác
      {
          return Forbid(); // 🔒 Từ chối truy cập
      }

      var profile = _dbContext.Users.Find(id);
      return Ok(profile);
  }
  ```
  **➡️ Kết quả:** Người dùng chỉ có thể xem hồ sơ của mình, trừ khi họ là admin.

**🔹 2. Sử dụng Indirect Object References (Tham chiếu gián tiếp)**  
- Không sử dụng ID thật (`/profile/1234`)  
- Thay vào đó, sử dụng **UUID hoặc mã hóa**  
  ```plaintext
  GET /profile/a1b2c3d4e5f6
  ```
  - Trên backend, ánh xạ `a1b2c3d4e5f6` → `userId = 1234`.  
  - Attacker sẽ khó đoán ID chính xác.  

---

### 🚨 **7.2. Lỗ hổng chỉnh sửa dữ liệu người khác (Unauthorized Modification)**  
#### **📌 Tình huống:**  
Giả sử hệ thống cho phép người dùng chỉnh sửa hồ sơ qua API:  
```plaintext
PUT /profile/1234  
Body: { "role": "admin", "color": "red" }
```
- Nếu attacker thay đổi ID **và quyền (role)**, họ có thể **nâng quyền admin trái phép**!

#### ✅ **🔒 Giải pháp bảo mật**  
**🔹 1. Kiểm tra quyền trên Backend**  
**Sai cách (Dễ bị tấn công)**  
```csharp
[HttpPut("/profile/{id}")]
public IActionResult UpdateProfile(int id, [FromBody] ProfileUpdateDto model)
{
    var user = _dbContext.Users.Find(id);
    user.Role = model.Role; // ❌ User có thể tự đổi quyền!
    user.Color = model.Color;
    _dbContext.SaveChanges();
    return Ok();
}
```

**Đúng cách (Bảo mật hơn)**  
```csharp
[HttpPut("/profile/{id}")]
public IActionResult UpdateProfile(int id, [FromBody] ProfileUpdateDto model)
{
    var currentUserId = GetUserIdFromSession();
    if (currentUserId != id && !IsAdmin())
    {
        return Forbid(); // 🔒 Không cho phép chỉnh sửa người khác
    }

    var user = _dbContext.Users.Find(id);
    
    // 🔥 Không cho phép user tự nâng quyền
    if (!IsAdmin()) 
    {
        model.Role = user.Role; // Giữ nguyên quyền cũ
    }

    user.Color = model.Color;
    _dbContext.SaveChanges();
    return Ok();
}
```
🚀 **Kết quả:** Người dùng không thể tự nâng quyền.


### 🚨 **7.3. Lỗ hổng API không có xác thực mạnh (Weak API Authentication)**  
#### **📌 Tình huống:**  
- Một số API chỉ kiểm soát bằng khóa API (`API_KEY=123456`).  
- Nếu attacker lấy được khóa này, họ có thể **gọi API tùy ý**!  

#### ✅ **🔒 Giải pháp bảo mật**  
🔹 **1. Dùng OAuth2 + JWT thay vì API Key**  
- Thay vì gửi khóa API, hệ thống sử dụng **JSON Web Token (JWT)**  
- Khi client gửi request, JWT sẽ chứa **role, quyền hạn, và thời gian hết hạn**  
- Trên backend, hệ thống kiểm tra JWT trước khi xử lý request.  

Ví dụ kiểm tra JWT trong ASP.NET Core:  
```csharp
[Authorize]
[HttpGet("/profile")]
public IActionResult GetProfile()
{
    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    var profile = _dbContext.Users.Find(int.Parse(userId));
    return Ok(profile);
}
```

📌 **Ưu điểm:**  
✅ Token không thể bị giả mạo (do có chữ ký số)  
✅ Mã hóa dữ liệu quan trọng (vd: quyền truy cập)  
✅ Có thể thiết lập thời gian hết hạn token  


### 🛑 **Tóm tắt lỗ hổng & cách khắc phục**
| 🔥 **Lỗ hổng** | ❌ **Ví dụ** | ✅ **Giải pháp** |
|-------------|------------------|------------------|
| **IDOR (Xem dữ liệu người khác)** | `GET /profile/5678` | Kiểm tra quyền trên backend, dùng UUID thay ID trực tiếp |
| **Chỉnh sửa dữ liệu trái phép** | `PUT /profile/5678` với `"role": "admin"` | Kiểm tra quyền, không cho phép user thay đổi quyền của mình |
| **API không bảo mật** | Dùng khóa API (`API_KEY=123456`) | Dùng OAuth2 + JWT |

---

## **📌 Kết luận**  
- **Kiểm soát truy cập cần được tài liệu hóa và thực thi nghiêm ngặt**  
- **Cả kiểm soát truy cập ngang & dọc đều cần được bảo vệ**  
- **Ghi log & giám sát là rất quan trọng** để phát hiện hành vi đáng ngờ  
- **Tham chiếu gián tiếp giúp bảo mật ID nhưng không thể thay thế xác thực chặt chẽ**  
- **API cần cơ chế xác thực mạnh mẽ, không chỉ dựa vào khóa tĩnh**  

