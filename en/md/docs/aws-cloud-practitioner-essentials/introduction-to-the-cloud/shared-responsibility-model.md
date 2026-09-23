# M01.04 - The AWS Shared Responsibility Model

> Nguồn: https://tiennhm.io.vn/en/docs/aws-cloud-practitioner-essentials/introduction-to-the-cloud/shared-responsibility-model
> Tìm hiểu về AWS Shared Responsibility Model - mô hình trách nhiệm chia sẻ giữa AWS và khách hàng. Phân biệt rõ trách nhiệm của khách hàng, trách nhiệm của AWS, và trách nhiệm được chia sẻ trong AWS Cloud.

**AWS Shared Responsibility Model** là một khái niệm được thiết kế để giúp AWS và khách hàng làm việc cùng nhau để tạo ra một môi trường cloud an toàn và chức năng. Trong bài học này, bạn sẽ tìm hiểu về các thành phần của AWS Shared Responsibility Model. Với sự hiểu biết rõ ràng về trách nhiệm trong cloud computing, các tổ chức có thể điều hướng tốt hơn các phức tạp của bảo mật cloud.

## Mục tiêu học tập

Sau khi hoàn thành bài học này, bạn sẽ có thể:

- ✅ Mô tả và phân biệt giữa trách nhiệm của khách hàng, trách nhiệm của AWS, và trách nhiệm được chia sẻ trong AWS Cloud
- ✅ Mô tả các thành phần của AWS Shared Responsibility Model

## Ai chịu trách nhiệm về bảo mật?

Khi nói đến việc bảo mật doanh nghiệp của bạn trên AWS, điều quan trọng là đặt câu hỏi: **Ai cuối cùng chịu trách nhiệm về bảo mật?**

- **A: Bạn, khách hàng?**
- **B: AWS?**

Và câu trả lời đúng là: **Cả hai!** Cả hai đều chịu trách nhiệm cuối cùng để đảm bảo rằng workloads của bạn được bảo mật.

Đây được gọi là **AWS Shared Responsibility Model** (Mô hình Trách nhiệm Chia sẻ của AWS).

## Ví dụ dễ hiểu: Bảo mật ngôi nhà

Hãy nghĩ về việc bảo mật một ngôi nhà. Người xây dựng đã xây dựng ngôi nhà với bốn bức tường và một cánh cửa. Trách nhiệm của họ là đảm bảo các bức tường chắc chắn và cánh cửa vững chắc. Trách nhiệm của bạn với tư cách là chủ nhà là đóng và khóa những cánh cửa đó.

Và trên AWS cũng đơn giản như vậy!

## Security OF the Cloud vs Security IN the Cloud

Một cách hữu ích để nghĩ về nó là:

- 🏗️ **AWS chịu trách nhiệm về Security OF the Cloud** (Bảo mật CỦA cloud)
- 🔒 **Khách hàng chịu trách nhiệm về Security IN the Cloud** (Bảo mật TRONG cloud)

![AWS Shared Responsibility Model](https://tiennhm.io.vn/img/docs/AWS-Cloud-Practitioner-Essentials/M01_L5_SRM_Intro.png)

## AWS Responsibilities (Trách nhiệm của AWS)

AWS chịu trách nhiệm bảo vệ hạ tầng chạy tất cả các dịch vụ được cung cấp trong AWS Cloud. Hạ tầng này bao gồm phần cứng, phần mềm, mạng và các cơ sở vật chất chạy các dịch vụ AWS Cloud.

### Security OF the Cloud

AWS chịu trách nhiệm cho các lớp vật lý, mạng và hypervisor:

#### 1. Physical Layer (Lớp vật lý)

Lớp vật lý chính xác là những gì nó có vẻ: các thực tế vật lý của một máy tính. Truy cập vào phần cứng phải được bảo mật bằng:

- 🔐 **Locks on doors** - Khóa cửa
- 📋 **Access control lists** - Danh sách kiểm soát truy cập
- 👤 **Privilege separation** - Phân tách đặc quyền
- 🛡️ Và nhiều hơn nữa...

#### 2. Network Layer (Lớp mạng)

Lớp mạng có các biện pháp bảo vệ riêng để đảm bảo cách ly các workloads của khách hàng AWS khác nhau.

#### 3. Hypervisor Layer (Lớp ảo hóa)

Lớp hypervisor virtualization cũng có các biện pháp bảo vệ riêng để đảm bảo cách ly.

**Tóm lại, AWS chịu trách nhiệm cho:**
- 🖥️ **Software** cho compute, storage, database, và networking
- 🏢 **Hardware** và **AWS Global Infrastructure**

## Customer Responsibilities (Trách nhiệm của Khách hàng)

Khách hàng chịu trách nhiệm quản lý các yêu cầu bảo mật cho dữ liệu của họ, bao gồm dữ liệu nào họ lưu trữ trên AWS và ai có quyền truy cập vào dữ liệu đó. Khách hàng cũng kiểm soát cách quyền truy cập vào dữ liệu được cấp, quản lý và thu hồi.

### Security IN the Cloud

#### 1. Operating System (Hệ điều hành)

**Bạn chịu 100% trách nhiệm về hệ điều hành của bạn.**

- 🔑 **AWS không có back door** vào hệ thống của bạn
- 🔐 **Bạn và chỉ bạn** có encryption key duy nhất để đăng nhập vào OS này hoặc tạo bất kỳ tài khoản người dùng nào
- 🏠 Giống như một công ty xây dựng sẽ không giữ bản sao chìa khóa cửa trước của bạn, **AWS không thể vào hệ điều hành của bạn**

**Điều này có nghĩa là:**
- 👥 **Operations team của bạn** chịu trách nhiệm giữ OS được patch
- 📢 Nếu AWS phát hiện có một số lỗ hổng mới trong phiên bản hệ điều hành của bạn, chúng tôi chắc chắn có thể thông báo cho chủ tài khoản của bạn, **nhưng chúng tôi không thể triển khai patch**
- 🔒 Công ty xây dựng có thể cài đặt khóa chất lượng cao để bảo mật ngôi nhà của bạn, nhưng họ sẽ không đến khóa cửa cho bạn mỗi lần bạn rời đi

#### 2. Applications (Ứng dụng)

**Bạn sở hữu và bảo mật các ứng dụng bạn đang chạy.**

- 💻 Bạn chịu trách nhiệm về:
  - Cấu hình ứng dụng
  - Bảo mật ứng dụng
  - Cập nhật và patches cho ứng dụng

#### 3. Data (Dữ liệu)

**Đây là lĩnh vực của bạn để kiểm soát.**

Đôi khi bạn có thể muốn dữ liệu của mình mở cho mọi người xem, như hình ảnh trên website bán lẻ. Những lần khác, như ngân hàng hoặc chăm sóc sức khỏe, thì không như vậy.

**AWS cung cấp cho mọi người các điều khiển để:**
- 👥 Mở nó cho một số cá nhân được ủy quyền
- 🌐 Mở cho tất cả mọi người
- 🔒 Chỉ cho một người trong các điều kiện cụ thể
- 🚫 Hoặc khóa nó để không ai có thể truy cập

**Ngoài ra, bạn có khả năng:**
- 🔐 **Encrypt dữ liệu của bạn** - Bằng cách đó, ngay cả khi bạn vô tình để cửa trước mở, tất cả những gì mọi người sẽ thấy là nội dung được mã hóa không thể đọc được

#### 4. Client-side Encryption (Mã hóa phía khách hàng)

Khách hàng cũng chịu trách nhiệm về **client-side encryption** (mã hóa phía khách hàng).

## Shared Responsibilities (Trách nhiệm được chia sẻ)

Tùy thuộc vào dịch vụ được sử dụng, trách nhiệm có thể thay đổi giữa khách hàng và AWS. Các thành phần như:

- 🔐 **Server-side encryption** (Mã hóa phía server)
- 🌐 **Network traffic protection** (Bảo vệ lưu lượng mạng)
- 🖥️ **Platform and application management** (Quản lý platform và ứng dụng)
- ⚙️ **OS, network, and firewall configuration** (Cấu hình OS, mạng và firewall)

**Varies by service** - Thay đổi theo dịch vụ về việc ai chịu trách nhiệm cho các mục này.

**Ví dụ:**
- **EC2 (Elastic Compute Cloud)**: Bạn chịu trách nhiệm về OS, network, firewall
- **RDS (Relational Database Service)**: AWS quản lý OS, bạn quản lý database configuration
- **Lambda**: AWS quản lý OS và platform, bạn chỉ quản lý code

Khi bạn tìm hiểu thêm về các loại dịch vụ khác nhau, bạn sẽ thấy các ví dụ cụ thể về cách các yếu tố này được chia sẻ giữa khách hàng và AWS.

## Tóm tắt: AWS Shared Responsibility Model

### ✅ Security OF the Cloud (AWS chịu trách nhiệm)

- 🏢 **Hardware** - Phần cứng
- 🌐 **AWS Global Infrastructure** - Hạ tầng toàn cầu AWS
- 💻 **Software** cho compute, storage, database, networking
- 🔐 **Physical security** - Bảo mật vật lý
- 🌐 **Network infrastructure** - Hạ tầng mạng
- 🔄 **Hypervisor** - Lớp ảo hóa

### ✅ Security IN the Cloud (Khách hàng chịu trách nhiệm)

- 💾 **Customer data** - Dữ liệu khách hàng
- 🔐 **Client-side encryption** - Mã hóa phía khách hàng
- 🖥️ **Operating System** - Hệ điều hành
- 💻 **Applications** - Ứng dụng
- 🔑 **Access control** - Kiểm soát truy cập
- 📋 **Identity and Access Management** - Quản lý danh tính và truy cập

### ✅ Shared Responsibilities (Thay đổi theo dịch vụ)

- 🔐 **Server-side encryption** - Mã hóa phía server
- 🌐 **Network traffic protection** - Bảo vệ lưu lượng mạng
- 🖥️ **Platform and application management** - Quản lý platform và ứng dụng
- ⚙️ **OS, network, and firewall configuration** - Cấu hình OS, mạng và firewall

## Tại sao mô hình này quan trọng?

AWS Shared Responsibility Model là về việc đảm bảo cả hai bên hiểu rõ chính xác những tác vụ nào là của chúng tôi và những tác vụ nào là của khách hàng.

**Lợi ích:**
- ✅ **Clarity** - Rõ ràng về trách nhiệm
- ✅ **Security** - Bảo mật tốt hơn khi cả hai bên hiểu vai trò của mình
- ✅ **Compliance** - Dễ dàng đáp ứng các yêu cầu tuân thủ
- ✅ **Trust** - Cùng nhau, bạn có một môi trường mà bạn có thể tin cậy

**Lưu ý quan trọng:**
Tùy thuộc vào dịch vụ được sử dụng, trách nhiệm có thể thay đổi, và chúng ta sẽ nói thêm về chi tiết cụ thể khi chúng ta gặp các dịch vụ khác nhau.

## Điểm quan trọng cần nhớ

Ở mức cơ bản, điều quan trọng cần nhớ là:

- 🏗️ **AWS chịu trách nhiệm về Security OF the Cloud**
- 🔒 **Bạn chịu trách nhiệm về Security IN the Cloud**
- 🤝 **Cùng nhau, bạn có một môi trường mà bạn có thể tin cậy**

---

## Kiểm tra kiến thức: Bài tập thực hành

Hãy thử giải quyết tình huống sau để kiểm tra hiểu biết của bạn:

### Tình huống

Bạn làm việc cho một công ty start-up đang phát triển một ứng dụng trong cloud. Một bản cập nhật bảo mật mới có sẵn cho hệ điều hành (OS) của bạn, và bạn được giao nhiệm vụ xác minh rằng OS đã được patch tương ứng.

### Câu hỏi

**Câu nào MÔ TẢ TỐT NHẤT bên nào chịu trách nhiệm áp dụng các security patches cho OS đang chạy trong cloud?**

- ❌ AWS chịu trách nhiệm áp dụng các security patches cho OS.
- ✅ **Công ty của bạn chịu trách nhiệm áp dụng các security patches cho OS.** ← Đáp án đúng!
- ❌ Cả AWS và khách hàng áp dụng các patches riêng biệt.
- ❌ Nhà cung cấp OS áp dụng các patches.

### Giải thích

Khách hàng chịu trách nhiệm quản lý các cấu hình bảo mật và patches cho OS đang chạy trong cloud.

**Phân tích các lựa chọn:**

1. **❌ AWS chịu trách nhiệm**: Sai! AWS không có quyền truy cập vào OS của bạn. AWS chỉ chịu trách nhiệm về hạ tầng bên dưới (hardware, network, hypervisor).

2. **✅ Công ty của bạn chịu trách nhiệm**: Đúng! Bạn có 100% quyền kiểm soát và trách nhiệm đối với OS của bạn. Bạn phải tự cài đặt patches và cập nhật bảo mật.

3. **❌ Cả hai áp dụng patches riêng biệt**: Sai! Chỉ có bạn mới có thể áp dụng patches cho OS của bạn. AWS không thể làm điều đó.

4. **❌ Nhà cung cấp OS**: Sai! Mặc dù nhà cung cấp OS (như Microsoft, Red Hat) phát hành patches, nhưng bạn vẫn phải tự cài đặt chúng.

**Kịch bản thực tế:**
- 📢 AWS phát hiện lỗ hổng bảo mật trong OS của bạn
- 📧 AWS thông báo cho bạn qua email hoặc AWS Security Bulletins
- 🔧 **Bạn phải tự cài đặt patch** - AWS không thể làm điều này cho bạn
- ✅ Sau khi cài đặt, OS của bạn đã được bảo mật

**Lưu ý:** Đối với các dịch vụ được quản lý như RDS, AWS quản lý OS cho bạn, nhưng đối với EC2, bạn hoàn toàn chịu trách nhiệm!

---

## Tài liệu tham khảo

- 📚 [AWS Shared Responsibility Model](https://aws.amazon.com/compliance/shared-responsibility-model/)
- 🔒 [AWS Security Best Practices](https://aws.amazon.com/security/security-resources/)
- 📖 [AWS Well-Architected Framework - Security Pillar](https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/welcome.html)
- 🛡️ [AWS Security Documentation](https://docs.aws.amazon.com/security/)
- 📚 [AWS Cloud Practitioner Essentials Course](https://aws.amazon.com/training/learning-paths/aws-certified-cloud-practitioner/)

---

*Bài viết này là phần thứ tư trong Module 1 - Introduction to the Cloud của series AWS Cloud Practitioner Essentials. Bài viết được cập nhật vào tháng 11/2025 dựa trên nội dung khóa học AWS Cloud Practitioner Essentials.*

**Bạn có câu hỏi hay muốn thảo luận về AWS Shared Responsibility Model? Hãy chia sẻ ở phần comment bên dưới nhé! ☁️**
