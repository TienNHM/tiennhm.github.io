# 1.02 | Hijack a session

> Nguồn: https://tiennhm.io.vn/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/hijack-a-session-02
> Bài này tập trung vào dự đoán giá trị của cookie hijackcookie, một kỹ thuật tấn công kiểu Session Prediction (Dự đoán phiên đăng nhập). Mục tiêu là xác định.

## 🚀 **1. Tóm tắt bài học**
- `hijack_cookie` có dạng **"số tuần tự"-"timestamp Unix"**.
- Số tuần tự tăng đều (thường +1 hoặc +2).
- Timestamp Unix tương ứng với thời gian tạo session.
- Bằng cách quan sát nhiều cookie, có thể dự đoán một giá trị hợp lệ.

Bài này tập trung vào dự đoán giá trị của cookie `hijack_cookie`, một kỹ thuật tấn công kiểu **Session Prediction** (Dự đoán phiên đăng nhập). Mục tiêu là xác định cách hệ thống tạo cookie này và dự đoán một giá trị hợp lệ để mạo danh người dùng hợp lệ.

## 💡 **2. Hints**

- Kiểm tra giá trị của cookie `hijack_cookie` và xem xét về định dạng của nó.
- Cookie `hijack_cookie` được chia thành hai phần và có định dạng như sau `"long number"-"another long number"`.
- Cookie `hijack_cookie` được chia thành hai phần và có định dạng như sau `"sequential number"-"unix epoch time"`.
- Thử gửi nhiều requests để buộc ứng dụng tạo ra các cookie mới và kiểm tra xem có theo 1 mẫu định dạng chung nào không.
- Đôi khi, người dùng được ủy quyền đăng nhập vào ứng dụng.

## 📌 **3. Các bước tấn công**

### **1️⃣ Thu thập dữ liệu về `hijack_cookie`**
- Bật **Burp Suite/ZAP** để theo dõi request.
- Gửi nhiều request đến `/WebGoat/HijackSession` để thu thập cookie.
- Ghi lại giá trị `hijack_cookie` nhận được.

Ví dụ các giá trị nhận được:
```
8538432081538402370-1717442040234
8538432081538402372-1717442064847
8538432081538402373-1717442084267
```
**Nhận xét:**
- Phần đầu tiên (`8538432081538402370`) tăng dần theo từng session.
- Phần sau (`1717442040234`) là timestamp theo Unix Epoch.

### **2️⃣ Dự đoán cookie hợp lệ**
Dựa trên các mẫu thu thập được, ta có thể dự đoán:
- Số tuần tự tiếp theo: Nếu có `8538432081538402372`, ta thử `8538432081538402371` (số xen giữa).
- Timestamp: Chọn giá trị gần nhất trong khoảng thời gian session hợp lệ.

Giả sử số tuần tự là **8538432081538402371**, timestamp hợp lệ có thể nằm giữa `1717442040234` và `1717442064847`

### **3️⃣ Tấn công Brute Force**
#### **Sử dụng Burp Suite:**
1. **Chọn `Intruder`**, chọn request chứa cookie.
2. **Clear vị trí fuzz**, chọn phần timestamp để brute-force.
3. **Payload:** Set khoảng giá trị cho timestamp.
4. **Chạy Attack**, kiểm tra response hợp lệ.

#### **Sử dụng ZAP Fuzzer:**
1. Chỉnh sửa `hijack_cookie` theo mẫu:
   ```
   hijack_cookie=8538432081538402371-1717442040234
   ```
2. Dùng **ZAP Fuzzer** để kiểm tra các giá trị timestamp gần đúng.
3. Nếu thành công, hệ thống sẽ xác nhận session hợp lệ.

## 🛡️ **4. Cách phòng tránh**
✅ **Sử dụng Session Token ngẫu nhiên**, không dựa trên quy tắc dễ đoán.
✅ **Mã hóa session ID thay vì để dưới dạng số dễ đoán.**
✅ **Hết hạn session sau thời gian ngắn** để giảm thiểu tấn công brute-force.
✅ **Ràng buộc session với IP hoặc User-Agent.**
✅ **Sử dụng `Secure`, `HttpOnly` và `SameSite` cho cookie.**

## 🎯 **Kết luận**
Bài này dạy cách phân tích và dự đoán session cookie để mạo danh người dùng. Đây là một dạng tấn công phổ biến trong bảo mật ứng dụng web và nhấn mạnh tầm quan trọng của việc sử dụng session an toàn. 🚀

Xem thêm tại [đây](https://docs.cycubix.com/application-security-series/web-application-security-essentials/solutions/a5-broken-access-control/a1-2021-or-hijack-a-session-or-cycubix-docs/a1-2021-or-hijack-a-session-2-or-cycubix-docs).
