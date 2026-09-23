# 1.13 | XXE

> Nguồn: https://tiennhm.io.vn/docs/web-security/webgoat-2023.8/A5-Security-Misconfiguration/XXE-13
> Phân tích mã tĩnh (Static Code Analysis) giúp tìm kiếm lỗ hổng bảo mật trong code mà không cần chạy ứng dụng. Công cụ phổ biến nhất để phân tích mã tĩnh là.

> 🕵️ **Phát hiện lỗ hổng XXE bằng phân tích mã tĩnh (Static Code Analysis)**

## **🔍 1. Static Code Analysis là gì?**
Phân tích mã tĩnh (Static Code Analysis) giúp tìm kiếm lỗ hổng bảo mật trong code mà **không cần chạy ứng dụng**. Công cụ phổ biến nhất để phân tích mã tĩnh là **SonarQube**.

## **⚡ 2. Phát hiện XXE bằng SonarQube**
Khi quét mã nguồn **WebGoat**, SonarQube sẽ phát hiện các vấn đề bảo mật, bao gồm lỗ hổng **XXE (XML External Entity)**.

**👀 Cách thực hiện quét với SonarQube:**

1️⃣ **Cài đặt SonarQube** (nếu chưa có):
   - Chạy SonarQube Server (`docker run -d -p 9000:9000 sonarqube`)
   - Cài SonarScanner (`brew install sonar-scanner` hoặc tải từ [SonarQube Scanner](https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/))

2️⃣ **Chạy quét mã nguồn WebGoat:**
   ```sh
   sonar-scanner \
   -Dsonar.projectKey=WebGoat \
   -Dsonar.sources=./WebGoat \
   -Dsonar.host.url=http://localhost:9000 \
   -Dsonar.login=your_token
   ```
3️⃣ **Xem báo cáo trên giao diện SonarQube**

## **🎯 3. Xác định lỗ hổng XXE**
- **SonarQube báo lỗi XXE trong `Comments` class**
- **Xác minh lỗi**: Đây có phải **true positive** hay **false positive**?
- **Trong WebGoat, lỗi này cố tình được đưa vào để thực hành bảo mật**, nên đây là **true positive**.

## **🔧 4. Cách khắc phục lỗ hổng XXE**
SonarQube sẽ đề xuất cách sửa lỗi, thường là:
- **Tắt DTD và External Entities trong XML parser**
- **Sử dụng thư viện an toàn**

Ví dụ: Trong **Java**, sửa lỗi bằng cách:
```java
XMLInputFactory xif = XMLInputFactory.newFactory();
xif.setProperty(XMLInputFactory.SUPPORT_DTD, false);
xif.setProperty(XMLInputFactory.IS_SUPPORTING_EXTERNAL_ENTITIES, false);
```

## **✅ 5. Kiểm tra lại sau khi sửa lỗi**
Sau khi áp dụng bản vá, quét lại với SonarQube:
```sh
sonar-scanner
```
Nếu lỗi biến mất hoặc được đánh dấu **mitigated**, nghĩa là bạn đã sửa lỗi thành công! 🚀
