# M02.10 - Module 2 Summary

> Nguồn: https://tiennhm.io.vn/en/docs/aws-cloud-practitioner-essentials/compute-in-the-cloud/module-2-summary
> Tổng kết Module 2 - Compute in the Cloud. Ôn tập lại các khái niệm về Amazon EC2, EC2 instance types, pricing, Auto Scaling, Load Balancing, và messaging services. Tìm hiểu các bước tiếp theo và tài nguyên học tập.

Chúc mừng bạn đã hoàn thành **Module 2 - Compute in the Cloud**! 🎉

Trong module này, bạn đã học về Amazon EC2 và cách các cloud resources giúp scale applications. Bạn đã có kiến thức về EC2 instance types, pricing options, và cách chọn instance types tốt nhất cho nhu cầu kinh doanh độc đáo của mình. Bạn cũng đã làm quen với việc sử dụng các công cụ và dịch vụ AWS như Elastic Load Balancing, Amazon EC2 Auto Scaling, Amazon SQS, và Amazon SNS để quản lý traffic và communication.

## 📚 Tổng kết nội dung đã học

### 1. Introduction to Amazon EC2

**Amazon Elastic Compute Cloud (EC2):**
> Amazon EC2 là dịch vụ compute mạnh mẽ của AWS, cung cấp virtual servers (instances) trong cloud với flexible computing capacity.

**Các khái niệm chính:**
- 💻 **Virtual Machines (VMs)** - Máy ảo
- 🔄 **Multi-tenancy** - Nhiều tenants chia sẻ cùng một instance
- 🖥️ **Hypervisor** - Phần mềm quản lý virtualization
- 📦 **EC2 Instances** - Virtual servers trong cloud

**Lợi ích của EC2 so với on-premises:**
- ⚡ Khởi động nhanh chóng
- 💰 Chỉ trả cho những gì bạn sử dụng
- 📈 Scale dễ dàng
- 🌍 Truy cập từ bất kỳ đâu

### 2. Amazon EC2 Instance Types

**5 loại instance types chính:**

1. **General Purpose** - Cân bằng compute, memory và networking
   - Use cases: Web servers, small databases, development environments

2. **Compute Optimized** - Tối ưu cho compute-intensive workloads
   - Use cases: High-performance computing, scientific modeling, video encoding

3. **Memory Optimized** - Tối ưu cho memory-intensive applications
   - Use cases: In-memory databases, real-time big data analytics

4. **Accelerated Computing** - Tối ưu cho workloads cần hardware accelerators
   - Use cases: Machine learning, graphics rendering, game streaming

5. **Storage Optimized** - Tối ưu cho workloads cần high storage throughput
   - Use cases: Data warehousing, distributed file systems

**Instance Size:**
- Từ `nano` (nhỏ nhất) đến `metal` (lớn nhất)
- Mỗi size tăng gấp đôi resources so với size trước đó

### 3. How to Provision AWS Resources

**Các cách tương tác với AWS:**

1. **AWS Management Console** - Web-based GUI
   - Dễ sử dụng, phù hợp cho beginners
   - Truy cập qua trình duyệt web

2. **AWS Command Line Interface (CLI)** - Command-line tool
   - Tự động hóa tasks
   - Phù hợp cho scripting và automation

3. **AWS Software Development Kit (SDK)** - Code libraries
   - Tích hợp vào applications
   - Hỗ trợ nhiều ngôn ngữ lập trình

4. **APIs** - Application Programming Interfaces
   - HTTP requests để tương tác với AWS services

**Managed vs Unmanaged Services:**
- **Managed Services**: AWS quản lý infrastructure (ví dụ: Amazon RDS)
- **Unmanaged Services**: Khách hàng quản lý infrastructure (ví dụ: Amazon EC2)

### 4. Demo: Launching an Amazon EC2 Instance

**Các cấu hình chính khi launch EC2 instance:**

1. **Amazon Machine Image (AMI)** - Template chứa:
   - Operating system
   - Application server
   - Applications

2. **Instance Type** - Kích thước và khả năng của instance

3. **Key Pairs** - SSH keys để truy cập instance

4. **Network Settings** - VPC, Subnet, Security Groups

5. **Storage Options** - EBS volumes, instance store

6. **User Data** - Scripts chạy khi instance khởi động

**Lợi ích của AMI:**
- ✅ Consistency khi scale applications
- ✅ Efficiency trong việc launch instances mới
- ✅ Standardization của configurations

### 5. Amazon EC2 Pricing

**Các tùy chọn pricing:**

1. **On-Demand Instances**
   - Pay per second/hour
   - Không có commitment
   - Phù hợp cho: Short-term, unpredictable workloads

2. **Savings Plans**
   - Tiết kiệm lên đến 72%
   - Flexible pricing model
   - Phù hợp cho: Steady-state workloads

3. **Reserved Instances**
   - Tiết kiệm lên đến 75%
   - 1-year hoặc 3-year commitment
   - Phù hợp cho: Predictable workloads

4. **Spot Instances**
   - Tiết kiệm lên đến 90%
   - Có thể bị interrupt
   - Phù hợp cho: Flexible, fault-tolerant workloads

5. **Dedicated Hosts**
   - Physical server dành riêng
   - Phù hợp cho: Compliance requirements

6. **Dedicated Instances**
   - Instances trên dedicated hardware
   - Phù hợp cho: Licensing requirements

### 6. Scaling Amazon EC2

**Scalability vs Elasticity:**

- **Scalability**: Khả năng của hệ thống xử lý tải tăng lên bằng cách thêm resources
  - **Scaling Up (Vertical)**: Thêm sức mạnh cho máy hiện có
  - **Scaling Out (Horizontal)**: Thêm nhiều máy hơn

- **Elasticity**: Khả năng tự động scale resources lên hoặc xuống để phản ứng với real-time demand

**Amazon EC2 Auto Scaling:**

- Tự động điều chỉnh số lượng EC2 instances dựa trên demand
- **Auto Scaling Groups** với 3 settings:
  - **Minimum Capacity**: Số lượng instances tối thiểu
  - **Desired Capacity**: Số lượng instances mong muốn
  - **Maximum Capacity**: Số lượng instances tối đa

**Best Practices:**
- Deploy instances trên nhiều Availability Zones
- Sử dụng CloudWatch để monitor metrics
- Scale từng component độc lập

### 7. Directing Traffic with Elastic Load Balancing

**Elastic Load Balancing (ELB):**

- Tự động phân phối incoming application traffic trên nhiều EC2 instances
- Single point of contact cho tất cả incoming traffic
- Đảm bảo high availability và fault tolerance

**4 Routing Methods:**

1. **Round Robin** - Phân phối đều theo thứ tự tuần tự
2. **Least Connections** - Route đến server có ít connections nhất
3. **IP Hash** - Route dựa trên client IP address
4. **Least Response Time** - Route đến server có response time nhanh nhất

**ELB Benefits:**
- ✅ Efficient traffic distribution
- ✅ Automatic scaling
- ✅ Simplified management

**ELB và Auto Scaling:**
- Auto Scaling điều chỉnh số lượng instances
- ELB phân phối traffic đều trên các instances
- Hoạt động cùng nhau để đảm bảo high availability

### 8. Messaging and Queuing

**Tightly Coupled vs Loosely Coupled:**

- **Tightly Coupled**: Components phụ thuộc chặt chẽ vào nhau
  - Failure của một component có thể ảnh hưởng toàn bộ hệ thống

- **Loosely Coupled**: Components hoạt động độc lập
  - Failure của một component không ảnh hưởng các components khác

**Amazon SQS (Simple Queue Service):**
- Message queuing service
- Lưu trữ messages cho đến khi được xử lý
- Decouples application components
- Phù hợp cho: Asynchronous processing

**Amazon SNS (Simple Notification Service):**
- Publish-subscribe service
- Gửi notifications real-time
- Fan-out messaging
- Phù hợp cho: Real-time notifications

**Amazon EventBridge:**
- Serverless event routing service
- Route events từ nhiều sources đến targets
- Phù hợp cho: Event-driven architectures

## 🎯 Key Takeaways

1. **Amazon EC2** cung cấp flexible compute capacity trong cloud
2. **Instance Types** được tối ưu cho các workloads khác nhau
3. **Pricing Options** cho phép tối ưu hóa chi phí dựa trên usage patterns
4. **Auto Scaling** tự động điều chỉnh capacity dựa trên demand
5. **Load Balancing** phân phối traffic đều và đảm bảo high availability
6. **Messaging Services** (SQS, SNS, EventBridge) giúp decouple components và cải thiện reliability

## 🚀 Next Steps

Bây giờ bạn đã hiểu về compute trong cloud, bạn có thể:

1. **Thực hành với AWS Console**
   - Launch EC2 instances
   - Cấu hình Auto Scaling groups
   - Thiết lập Load Balancers

2. **Khám phá các services khác**
   - Module 3: Exploring Compute Services
   - Containers (ECS, EKS)
   - Serverless (Lambda)

3. **Tối ưu hóa costs**
   - Sử dụng AWS Cost Explorer
   - Áp dụng Savings Plans hoặc Reserved Instances
   - Monitor usage với CloudWatch

4. **Xây dựng applications**
   - Kết hợp EC2, Auto Scaling, và ELB
   - Implement messaging patterns với SQS/SNS
   - Design loosely coupled architectures

## 📖 Resources

Để tìm hiểu thêm về các tài liệu được đề cập trong module này, hãy chọn các resource links trong bảng sau:

| Resource Link | Description |
|--------------|-------------|
| [Compute on AWS](https://aws.amazon.com/products/compute) | Tài nguyên này cung cấp tổng quan về các dịch vụ cloud computing khác nhau được cung cấp bởi AWS. |
| [AWS Compute Blog](https://aws.amazon.com/blogs/compute/) | Blog này cung cấp các cập nhật, tutorials, và best practices cho việc sử dụng AWS compute services, chẳng hạn như Amazon EC2, AWS Lambda, Amazon ECS, và nhiều hơn nữa. |
| [AWS Compute Services](https://docs.aws.amazon.com/whitepapers/latest/aws-overview/compute-services.html) | Tài liệu tham khảo này cung cấp giới thiệu chi tiết về các compute services có sẵn trong AWS Cloud. |
| [Hands-On Tutorials: Compute](https://aws.amazon.com/getting-started/hands-on/?awsf.getting-started-category=category%23compute&awsf.getting-started-content-type=content-type%23hands-on) | Tài nguyên này cung cấp các tutorials thực hành, từng bước được thiết kế để giúp users có kinh nghiệm thực tế với AWS compute services. Lý tưởng cho beginners và những người mới bắt đầu với cloud computing. |
| [Amazon EC2](https://aws.amazon.com/ec2/) | Amazon EC2 chạy virtual servers trong cloud với flexible computing capacity. |
| [Amazon EC2 Instance Types](https://aws.amazon.com/ec2/instance-types/) | Hướng dẫn này cung cấp thông tin chi tiết về các loại EC2 instances khác nhau, bao gồm specifications, capabilities, và use cases. Giúp bạn chọn instance type phù hợp dựa trên nhu cầu workload của mình, chẳng hạn như compute, memory, và storage requirements. |
| [Amazon EC2 Pricing](https://aws.amazon.com/ec2/pricing/) | Hướng dẫn này giải thích các pricing models khác nhau cho EC2 instances, bao gồm On-Demand, Reserved Instances, và Spot Instances, để bạn có thể chọn tùy chọn tốt nhất dựa trên usage của mình. |
| [Amazon EC2 Auto Scaling](https://aws.amazon.com/ec2/autoscaling/) | Amazon EC2 Auto Scaling tự động điều chỉnh instance count dựa trên demand cho high availability và cost-efficiency. |
| [Elastic Load Balancing](https://aws.amazon.com/elasticloadbalancing/) | Elastic Load Balancing tự động phân phối incoming application traffic trên nhiều EC2 instances cho high availability và fault tolerance. |
| [Amazon Simple Notification Service](https://aws.amazon.com/sns/) | Amazon SNS là một messaging service để gửi notifications đến users hoặc các applications khác thông qua SMS, email, hoặc mobile push notifications. |
| [Amazon Simple Queue Service](https://aws.amazon.com/sqs/) | Amazon SQS decouples application components thông qua message queuing, lưu trữ và xử lý messages một cách reliable. |

## 🎓 Kết luận

Module 2 đã cung cấp cho bạn nền tảng vững chắc về compute trong cloud với Amazon EC2. Bạn đã học cách:

- Chọn instance types phù hợp
- Tối ưu hóa costs với các pricing options
- Scale applications với Auto Scaling
- Phân phối traffic với Load Balancing
- Decouple components với messaging services

Những kiến thức này sẽ giúp bạn xây dựng và quản lý applications scalable, reliable, và cost-effective trên AWS.

**Chúc bạn thành công với Module 3!** 🚀
