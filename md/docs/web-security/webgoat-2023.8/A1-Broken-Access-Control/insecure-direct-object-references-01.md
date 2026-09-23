# 2.01 | Insecure Direct Object References

> Nguồn: https://tiennhm.io.vn/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/insecure-direct-object-references-01
> Bài viết này sẽ hướng dẫn cách tấn công Insecure Direct Object References trên WebGoat 2023.8

> **Lỗ hổng Insecure Direct Object References (IDOR) - Tham chiếu đối tượng trực tiếp không an toàn**

## 💡 **1. Giới thiệu về Direct Object References**
Direct Object References (Tham chiếu đối tượng trực tiếp) xảy ra khi một ứng dụng sử dụng dữ liệu đầu vào từ phía người dùng để truy cập trực tiếp vào các đối tượng như tệp tin, bản ghi cơ sở dữ liệu hoặc tài nguyên khác.

Lỗ hổng **Insecure Direct Object References (IDOR)** xuất hiện khi ứng dụng cho phép người dùng truy cập trực tiếp vào các đối tượng dựa trên dữ liệu cung cấp, nhưng **không kiểm tra quyền hạn của người dùng**. Điều này có thể dẫn đến:
- **Bỏ qua cơ chế xác thực** (Authorization Bypass)
- **Tiết lộ dữ liệu nhạy cảm**
- **Thực hiện các thao tác trái phép**

## 📌 **2. Ví dụ về IDOR**
Dưới đây là một số ví dụ minh họa cách IDOR có thể bị khai thác:

### **Ví dụ 1: Truy cập hồ sơ người dùng**
Một ứng dụng web cho phép người dùng xem hồ sơ cá nhân bằng cách chỉ định ID trong URL:
```plaintext
http://example.com/profile?id=12345
```
Nếu một kẻ tấn công thay đổi tham số `id` thành một giá trị khác (`id=12346`), và ứng dụng không kiểm tra quyền truy cập, kẻ tấn công có thể xem hồ sơ của người dùng khác:
```plaintext
http://example.com/profile?id=12346
```

### **Ví dụ 2: Tải xuống tài liệu**
Một ứng dụng cho phép tải tài liệu bằng cách cung cấp `documentId` trong URL:
```plaintext
http://example.com/download?documentId=789
```
Nếu ứng dụng không kiểm tra quyền, kẻ tấn công có thể thay đổi ID để tải xuống tài liệu không thuộc về họ:
```plaintext
http://example.com/download?documentId=790
```

### **Ví dụ 3: Xem đơn hàng**
Một trang thương mại điện tử cho phép người dùng xem chi tiết đơn hàng bằng cách truyền `orderId` trong URL:
```plaintext
http://example.com/order?orderId=456
```
Nếu hệ thống không kiểm tra quyền sở hữu đơn hàng, kẻ tấn công có thể xem đơn hàng của người khác bằng cách thay đổi `orderId`:
```plaintext
http://example.com/order?orderId=457
```

### **Ví dụ 4: Truy cập tệp tin**
Một ứng dụng web cho phép người dùng truy cập tệp tin bằng cách chỉ định tên tệp trong URL:
```plaintext
http://example.com/files?file=report.pdf
```
Nếu ứng dụng không kiểm tra quyền truy cập, kẻ tấn công có thể yêu cầu tệp tin nhạy cảm:
```plaintext
http://example.com/files?file=confidential.pdf
```

### **Ví dụ 5: Các phương thức khác cũng có thể bị ảnh hưởng**
Không chỉ giới hạn ở phương thức **GET**, các phương thức **POST, PUT, DELETE** cũng có thể bị khai thác.

Ví dụ, nếu ứng dụng cho phép xóa tài khoản bằng cách gửi yêu cầu **DELETE** như sau:
```http
DELETE /api/user/12345 HTTP/1.1
Host: example.com
Authorization: Bearer <token>
```
Nếu kẻ tấn công thay đổi `12345` thành `12346` và hệ thống không kiểm tra quyền, họ có thể xóa tài khoản người khác.

## 🛡️ **4. Cách phòng chống IDOR**
✅ **Xác thực & kiểm tra quyền hạn**
- Luôn kiểm tra xem người dùng có quyền truy cập đối tượng hay không trước khi hiển thị hoặc thực hiện thao tác.

✅ **Không sử dụng ID tuần tự dễ đoán**
- Sử dụng **UUID (Universally Unique Identifier)** thay vì số ID dễ đoán.
> Ví dụ: Thay vì dùng `id=12345`, hãy sử dụng UUID như `id=d4f6b8e9-5e2c-47bb-9d2f-123456789abc` để khó đoán hơn.

✅ **Kiểm tra quyền phía server**
- Không chỉ dựa vào kiểm tra phía client.
- Thực hiện kiểm tra quyền trên **backend** trước khi cho phép truy cập dữ liệu.

✅ **Áp dụng kiểm soát truy cập**
- Ví dụ: Chỉ chủ sở hữu đơn hàng mới có thể xem hoặc sửa đơn hàng.

✅ **Log lại các yêu cầu bất thường**
- Ghi lại các request truy cập bất thường để phát hiện hành vi tấn công.

## 📖 **5. Tài liệu tham khảo**

- [OWASP Testing for Insecure Direct Object References](https://www.owasp.org/index.php/Testing_for_Insecure_Direct_Object_References_(OTG-AUTHZ-004))
- [OWASP Top 10-2017 A5: Broken Access Control](https://www.owasp.org/index.php/Top_10-2017_A5-Broken_Access_Control)
- [OWASP IDOR Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Insecure_Direct_Object_Reference_Prevention_Cheat_Sheet.html)
- [CWE-639: Authorization Bypass](http://cwe.mitre.org/data/definitions/639.html)
- [OWASP cheatsheet on IDOR](https://cheatsheetseries.owasp.org/cheatsheets/Insecure_Direct_Object_Reference_Prevention_Cheat_Sheet.html)
