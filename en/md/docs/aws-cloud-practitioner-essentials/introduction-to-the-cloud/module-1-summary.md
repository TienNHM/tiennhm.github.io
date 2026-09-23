# M01.07 - Module 1 Summary

> Nguồn: https://tiennhm.io.vn/en/docs/aws-cloud-practitioner-essentials/introduction-to-the-cloud/module-1-summary
> Tổng kết Module 1 - Introduction to the Cloud. Ôn tập lại các khái niệm cơ bản về cloud computing, AWS Global Infrastructure, và AWS Shared Responsibility Model. Tìm hiểu các bước tiếp theo và tài nguyên học tập.

Chúc mừng bạn đã hoàn thành **Module 1 - Introduction to the Cloud**! 🎉

Trong module này, bạn đã học về các khái niệm cơ bản của cloud computing. Bạn đã khám phá định nghĩa và lợi ích của cloud, được giới thiệu về AWS Global Infrastructure, và tìm hiểu về AWS Shared Responsibility Model để làm rõ sự phân chia trách nhiệm giữa AWS và khách hàng.

## 📚 Tổng kết nội dung đã học

### 1. Introduction to the Cloud

**Định nghĩa Cloud Computing:**
> Cloud Computing là việc cung cấp theo nhu cầu (on-demand delivery) các tài nguyên IT qua internet với mô hình định giá trả theo sử dụng (pay-as-you-go pricing).

**Các thành phần chính:**
- ⚡ **On-demand delivery** - Cung cấp theo nhu cầu
- 💻 **IT resources** - Tài nguyên IT (servers, storage, databases, networking, AI/ML)
- 🌐 **Over the internet** - Qua internet
- 💰 **Pay-as-you-go pricing** - Định giá trả theo sử dụng

**Các loại Cloud Deployment:**
- ☁️ **Cloud** - Triển khai hoàn toàn trên cloud
- 🏢 **On-premises** - Triển khai tại chỗ
- 🔀 **Hybrid** - Kết hợp cloud và on-premises

### 2. Benefits of the AWS Cloud

**6 lợi ích chính:**
1. 💰 **Trade fixed expense for variable expense** - Chuyển đổi chi phí cố định sang chi phí biến đổi
2. 📈 **Benefit from massive economies of scale** - Hưởng lợi từ quy mô kinh tế lớn
3. 🎯 **Stop guessing capacity** - Không cần đoán trước dung lượng
4. ⚡ **Increase speed and agility** - Tăng tốc độ và tính linh hoạt
5. 🏢 **Stop spending money to run and maintain data centers** - Không cần chi tiền vận hành và bảo trì data centers
6. 🌍 **Go global in minutes** - Mở rộng toàn cầu trong vài phút

### 3. AWS Global Infrastructure

**Cấu trúc:**
- 🌍 **AWS Regions** - Vị trí địa lý trên khắp thế giới
  - Mỗi Region chứa tối thiểu 3 Availability Zones
  - Được thiết kế để gần khách hàng nhất có thể

- 🏢 **Availability Zones (AZs)** - Vị trí riêng biệt trong một Region
  - Một hoặc nhiều data centers
  - Có nguồn điện, mạng và kết nối dự phòng
  - Tách biệt về mặt vật lý để tránh single point of failure

**Lợi ích:**
- ⚡ **Low latency** - Độ trễ thấp
- 🛡️ **High availability** - Tính sẵn sàng cao
- 🔄 **Fault tolerance** - Khả năng chịu lỗi

### 4. AWS Shared Responsibility Model

**Security OF the Cloud (AWS chịu trách nhiệm):**
- 🏢 Physical infrastructure (Hạ tầng vật lý)
- 💻 Software cho compute, storage, database, networking
- 🌐 AWS Global Infrastructure
- 🔒 Physical security của data centers

**Security IN the Cloud (Khách hàng chịu trách nhiệm):**
- 💾 Customer data (Dữ liệu khách hàng)
- 🔐 Client-side encryption (Mã hóa phía khách hàng)
- 🖥️ Operating System (Hệ điều hành)
- 💻 Applications (Ứng dụng)
- 🔑 Access control (Kiểm soát truy cập)

**Shared Responsibilities (Thay đổi theo dịch vụ):**
- 🔐 Server-side encryption
- 🌐 Network traffic protection
- 🖥️ Platform and application management
- ⚙️ OS, network, and firewall configuration

### 5. Applying Cloud Concepts to Real Life

**Ví dụ: Công ty E-commerce mở rộng toàn cầu**
- 🇺🇸 Base: Seattle, Washington
- 🇮🇪 Expansion 1: Ireland (eu-west-1) - 2 AZs
- 🇸🇬 Expansion 2: Singapore (ap-southeast-1)

**Kết quả:**
- ⚡ Giảm latency cho khách hàng toàn cầu
- 🛡️ High availability với nhiều AZs
- 🔄 Fault tolerance với nhiều Regions
- 🔒 Security với Shared Responsibility Model

## 🎯 Điểm quan trọng cần nhớ

### Cloud Computing Definition
```
Cloud Computing = On-demand delivery of IT resources
                  over the internet
                  with pay-as-you-go pricing
```

### AWS Global Infrastructure Hierarchy
```
AWS Cloud
└── Regions (Geographic locations)
    └── Availability Zones (Isolated locations)
        └── Data Centers (Physical facilities)
```

### Shared Responsibility Model
```
Security OF the Cloud = AWS Responsibility
Security IN the Cloud = Customer Responsibility
```

## 🚀 Bước tiếp theo

Bây giờ bạn đã nắm vững các khái niệm cơ bản về cloud computing, đã đến lúc tiếp tục với các module tiếp theo:

### Module 2: Compute in the Cloud
- Tìm hiểu về các dịch vụ compute của AWS
- Amazon EC2 và các loại instances
- Container services
- Serverless computing

### Module 3: Exploring Compute Services
- Chi tiết về các dịch vụ compute
- Use cases và best practices

### Module 4: Going Global
- Content delivery networks (CDN)
- Edge locations
- Global distribution

### Module 5: Networking
- VPC (Virtual Private Cloud)
- Networking components
- Connectivity options

### Module 6: Storage
- Amazon S3
- EBS, EFS
- Storage classes và lifecycle policies

### Module 7: Databases
- Relational databases (RDS)
- NoSQL databases (DynamoDB)
- Database migration tools

### Module 8: AI/ML and Data Analytics
- AWS AI/ML services
- Data analytics services
- ETL pipelines

### Module 9: Security
- AWS security services
- Identity and Access Management (IAM)
- Security best practices

### Module 10: Monitoring, Compliance and Governance
- CloudWatch
- Compliance services
- Governance tools

### Module 11: Pricing and Support
- AWS pricing models
- Cost optimization
- AWS Support plans

### Module 12: Migrating to the AWS Cloud
- Migration strategies
- Migration tools
- Best practices

### Module 13: Well-Architected Solutions
- AWS Well-Architected Framework
- Six pillars
- Best practices

## 📖 Tài nguyên học tập

Để tìm hiểu thêm về nội dung được đề cập trong module này, hãy tham khảo các tài nguyên sau:

### 1. What is Cloud Computing?

**Link:** [https://aws.amazon.com/what-is-cloud-computing/](https://aws.amazon.com/what-is-cloud-computing/?nc1=f_cc)

**Mô tả:** Tìm hiểu thêm về những điều cơ bản của cloud computing, bao gồm:
- Định nghĩa cloud computing
- Các loại cloud computing (IaaS, PaaS, SaaS)
- Lợi ích của cloud computing
- Use cases và ví dụ thực tế

### 2. AWS Shared Responsibility Model

**Link:** [https://aws.amazon.com/compliance/shared-responsibility-model/](https://aws.amazon.com/compliance/shared-responsibility-model/)

**Mô tả:** Tìm hiểu thêm về AWS Shared Responsibility Model, bao gồm:
- Security OF the Cloud vs Security IN the Cloud
- Trách nhiệm của AWS và khách hàng
- Cách áp dụng trong thực tế
- Best practices

### 3. Regions and Availability Zones

**Link:** [https://aws.amazon.com/about-aws/global-infrastructure/regions_az/](https://aws.amazon.com/about-aws/global-infrastructure/regions_az/)

**Mô tả:** Xem danh sách đầy đủ các AWS Regions và Availability Zones, bao gồm:
- Danh sách tất cả AWS Regions
- Availability Zones trong mỗi Region
- Edge locations
- Cập nhật mới nhất về hạ tầng toàn cầu

## 💡 Mẹo học tập

### 1. Ôn tập thường xuyên
- Xem lại các khái niệm quan trọng mỗi tuần
- Làm lại bài assessment để kiểm tra kiến thức
- Thực hành với AWS Free Tier

### 2. Áp dụng vào thực tế
- Suy nghĩ về cách áp dụng các khái niệm vào công việc của bạn
- Tạo AWS account và thử nghiệm các dịch vụ
- Tham gia các cộng đồng AWS để học hỏi

### 3. Tài nguyên bổ sung
- **AWS Documentation**: [https://docs.aws.amazon.com/](https://docs.aws.amazon.com/)
- **AWS Training**: [https://aws.amazon.com/training/](https://aws.amazon.com/training/)
- **AWS Whitepapers**: [https://aws.amazon.com/whitepapers/](https://aws.amazon.com/whitepapers/)
- **AWS re:Post**: [https://repost.aws/](https://repost.aws/) - Cộng đồng hỏi đáp AWS

## ✅ Checklist hoàn thành Module 1

Trước khi chuyển sang Module 2, hãy đảm bảo bạn đã:

- [x] Hiểu định nghĩa Cloud Computing
- [x] Nắm được 6 lợi ích chính của AWS Cloud
- [x] Hiểu sự khác biệt giữa Regions và Availability Zones
- [x] Nắm được AWS Shared Responsibility Model
- [x] Hiểu cách các khái niệm hoạt động cùng nhau trong thực tế
- [x] Hoàn thành bài assessment với điểm số ≥ 80%
- [x] Đọc các tài nguyên tham khảo

## 🎓 Chúc mừng!

Bạn đã hoàn thành Module 1 - Introduction to the Cloud! Đây là nền tảng quan trọng cho tất cả các module tiếp theo. Hãy tiếp tục với Module 2 để tìm hiểu về Compute in the Cloud.

**Chúc bạn học tập vui vẻ và thành công!** 🚀☁️

---

## Tài liệu tham khảo

- 📚 [What is Cloud Computing?](https://aws.amazon.com/what-is-cloud-computing/?nc1=f_cc) - AWS Official Documentation
- 🤝 [AWS Shared Responsibility Model](https://aws.amazon.com/compliance/shared-responsibility-model/) - AWS Security Documentation
- 🌍 [Regions and Availability Zones](https://aws.amazon.com/about-aws/global-infrastructure/regions_az/) - AWS Global Infrastructure
- 📖 [AWS Cloud Practitioner Essentials Course](https://aws.amazon.com/training/learning-paths/aws-certified-cloud-practitioner/) - Official AWS Training

---

*Bài viết này là phần tổng kết Module 1 - Introduction to the Cloud của series AWS Cloud Practitioner Essentials. Bài viết được cập nhật vào tháng 11/2025 dựa trên nội dung khóa học AWS Cloud Practitioner Essentials.*

**Bạn có câu hỏi hay muốn thảo luận về Module 1? Hãy chia sẻ ở phần comment bên dưới nhé! ☁️**
