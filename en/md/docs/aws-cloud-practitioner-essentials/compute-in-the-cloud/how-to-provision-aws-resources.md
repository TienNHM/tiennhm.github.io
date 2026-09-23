# M02.03 - How to Provision AWS Resources

> Nguồn: https://tiennhm.io.vn/en/docs/aws-cloud-practitioner-essentials/compute-in-the-cloud/how-to-provision-aws-resources
> Tìm hiểu cách sử dụng AWS Management Console, AWS CLI và AWS SDK để tương tác với AWS services. Mô tả trách nhiệm của khách hàng và AWS đối với virtual machines, và giải thích sự khác biệt giữa managed và unmanaged services.

Trong AWS, các tác vụ như launch một EC2 instance, stop một instance, hoặc modify instance settings được thực hiện thông qua **API requests**. APIs cung cấp các phương thức được xác định trước để tương tác, quản lý và cấu hình tài nguyên AWS một cách hiệu quả.

Trong bài học này, bạn sẽ tìm hiểu về **ba cách chính để gọi AWS APIs**.

## Mục tiêu học tập

Sau khi hoàn thành bài học này, bạn sẽ có thể:

- ✅ Giải thích cách sử dụng AWS Management Console, AWS CLI và AWS SDK để tương tác với AWS services
- ✅ Mô tả trách nhiệm của khách hàng và AWS đối với virtual machines
- ✅ Giải thích sự khác biệt giữa managed và unmanaged services

## AWS APIs: Nền tảng của mọi tương tác

Chúng ta đã nói về một số dịch vụ AWS khác nhau, cũng như Global Infrastructure. Bạn có thể tự hỏi: **"Làm thế nào để tôi thực sự tương tác với các dịch vụ này?"**

**Câu trả lời là APIs.**

### APIs là gì?

- 🔌 **API** = Application Programming Interface
- 📋 **Định nghĩa** các cách được xác định trước để bạn tương tác với AWS services
- 🚀 Bạn có thể **invoke hoặc call** các APIs này để provision, configure và manage tài nguyên của bạn

**Trong AWS, mọi thứ đều là một API call:**
- Launch EC2 instance → API call
- Stop instance → API call
- Create S3 bucket → API call
- Configure security groups → API call

## Ba cách chính để gọi AWS APIs

Có **ba cách chính** bạn có thể gọi AWS APIs:

1. 🌐 **AWS Management Console** - Giao diện web
2. 💻 **AWS Command Line Interface (CLI)** - Dòng lệnh
3. 🔧 **AWS Software Development Kit (SDK)** - Lập trình

![Three Ways to Interact with AWS Services](https://tiennhm.io.vn/img/docs/AWS-Cloud-Practitioner-Essentials/M02_L03_InteractAWS.png)

Hãy cùng khám phá từng cách!

## 1. AWS Management Console

### Tổng quan

**AWS Management Console** là một giao diện web để quản lý các dịch vụ AWS, cung cấp:
- ⚡ **Quick access** - Truy cập nhanh đến các dịch vụ
- 🔍 **Search functionality** - Chức năng tìm kiếm
- 🔄 **Simplified workflows** - Quy trình làm việc đơn giản hóa

**Với mobile app:**
- 📱 Monitor resources - Giám sát tài nguyên
- 🔔 View alarms - Xem cảnh báo
- 💰 Check billing - Kiểm tra hóa đơn
- 👥 Support multiple logged-in identities - Hỗ trợ nhiều danh tính đăng nhập cùng lúc

### Đặc điểm

**Sử dụng Console, bạn có thể:**
- 👁️ **Manage resources visually** - Quản lý tài nguyên một cách trực quan
- 📊 **Easy to digest** - Dễ hiểu và dễ sử dụng
- 🎓 **Great for learning** - Tuyệt vời cho việc học tập

### Use Cases

**Console phù hợp cho:**
- 🚀 **Getting started** - Bắt đầu với AWS
- 📚 **Building knowledge** - Xây dựng kiến thức về các dịch vụ
- 🧪 **Setting up test environments** - Thiết lập môi trường test
- 💵 **Viewing AWS bills** - Xem hóa đơn AWS
- 📊 **Monitoring resources** - Giám sát tài nguyên
- ⚙️ **Managing non-technical tasks** - Quản lý các tác vụ không kỹ thuật

**Console có thể là nơi đầu tiên bạn sẽ đến khi học về AWS.**

### Hạn chế của Console

**Tuy nhiên, sau khi bạn đã hoạt động trong môi trường production:**
- ❌ Bạn không muốn dựa vào phong cách point-and-click của console
- ⏳ **Ví dụ:** Để tạo một EC2 instance, bạn cần:
  - Navigate qua nhiều màn hình khác nhau
  - Set tất cả các cấu hình bạn muốn
  - Sau đó launch instance của bạn
- 🔄 Nếu bạn muốn launch một EC2 instance khác sau đó, bạn sẽ cần quay lại console và navigate qua các màn hình đó một lần nữa

**Vấn đề với manual provisioning:**
- ⚠️ Bằng cách để con người làm loại manual provisioning này, bạn đang mở ra khả năng lỗi tiềm ẩn
- 😱 Rất có thể quên chọn một checkbox hoặc đánh vần sai điều gì đó khi bạn đang làm mọi thứ thủ công

## 2. AWS Command Line Interface (AWS CLI)

### Tổng quan

Với **AWS CLI**, bạn quản lý nhiều dịch vụ AWS trực tiếp từ command line trên Windows, macOS và Linux. Bạn có thể tự động hóa các tác vụ thông qua scripts, chẳng hạn như launch EC2 instances.

### Đặc điểm

**AWS CLI khác với phong cách điều hướng trực quan của console:**
- 💻 **Text-based input** - Cho phép bạn tương tác với AWS services thông qua input dựa trên văn bản gọi là commands
- 🤖 **Automation through scripting** - Tự động hóa thông qua scripting trở nên khả thi

### Use Cases

**AWS CLI phù hợp cho:**
- 👨‍💻 **Advanced users** - Người dùng nâng cao
- 👩‍💻 **Developers** - Developers
- 🤖 **Automation** - Tự động hóa tác vụ
- 📜 **Scripting actions** - Script các hành động
- ⚡ **Efficient resource management** - Quản lý tài nguyên hiệu quả từ command line

### Ví dụ sử dụng AWS CLI

**Ví dụ 1: Tạo EC2 Instance**

Chúng ta có thể chạy commands sử dụng **AWS CloudShell**, một cloud-based terminal đã có AWS CLI được cài đặt sẵn trong môi trường được quản lý.

```bash
aws ec2 run-instances \
  --image-id ami-0c55b159cbfafe1f0 \
  --instance-type t3.micro \
  --count 1
```

**Kết quả:** Instance hiện đang khởi tạo!

**Ví dụ 2: Liệt kê Availability Zones**

Nếu bạn muốn làm điều gì đó khác, như liệt kê tất cả các AZs trong Region hiện tại:

```bash
aws ec2 describe-availability-zones
```

**Kết quả:** Danh sách tất cả Availability Zones trong Region hiện tại.

### Automation với AWS CLI

**Điều quan trọng:**
- 📝 Các commands trong ví dụ này được chạy thủ công
- 🤖 Nhưng chúng cũng có thể được bao gồm trong **scripts và các quy trình tự động hóa khác**
- 🎯 **Automation là một khía cạnh quan trọng** để có một cloud deployment thành công và có thể dự đoán được theo thời gian

## 3. AWS Software Development Kit (AWS SDK)

### Tổng quan

**AWS SDK** giúp bạn có thể tương tác với tài nguyên AWS thông qua các ngôn ngữ lập trình khác nhau, như Python chẳng hạn.

### Đặc điểm

**AWS SDK:**
- 🔧 **Simplifies integration** - Đơn giản hóa việc tích hợp AWS services vào ứng dụng của bạn
- 📚 **Provides APIs** - Cung cấp APIs cho các ngôn ngữ lập trình khác nhau
- 📖 **Documentation and sample code** - AWS cung cấp tài liệu và mã mẫu cho các ngôn ngữ như:
  - C++
  - Java
  - .NET
  - Python
  - JavaScript
  - Và nhiều hơn nữa

### Use Cases

**AWS SDK phù hợp cho:**
- 👩‍💻 **Developers** - Developers
- 🔗 **Integrating AWS services** - Tích hợp dịch vụ AWS vào ứng dụng
- 💻 **Language-specific APIs** - Sử dụng APIs dành riêng cho ngôn ngữ

### Ví dụ sử dụng AWS SDK

**Ví dụ: Python Script sử dụng AWS SDK**

Hãy chạy một Python script sử dụng integrated development environment, Visual Studio Code, sử dụng SDK để liệt kê các EC2 instances trong Region hiện tại:

```python
import boto3

# Create EC2 client
ec2 = boto3.client('ec2')

# List all EC2 instances
response = ec2.describe_instances()

# Print instance information
for reservation in response['Reservations']:
    for instance in reservation['Instances']:
        print(f"Instance ID: {instance['InstanceId']}")
        print(f"Instance Type: {instance['InstanceType']}")
        print(f"State: {instance['State']['Name']}")
        print("---")
```

**Kết quả:** Script sẽ liệt kê tất cả EC2 instances trong Region hiện tại.

## Tổng kết: Ba cách tương tác với AWS

Khi bạn bắt đầu thấy nhiều ví dụ hơn về việc sử dụng tài nguyên AWS, hãy nhớ rằng **AWS hosts APIs** mà bạn sử dụng để tạo, tương tác và quản lý tài nguyên AWS.

**Dù bạn đang sử dụng:**
- 🌐 AWS Management Console
- 💻 AWS CLI
- 🔧 AWS SDK

**Các APIs này đang được gọi ở phía sau (behind the scenes).**

### So sánh nhanh

| Phương pháp | Đặc điểm | Phù hợp cho |
|------------|----------|-------------|
| **Console** | Visual, point-and-click | Học tập, test, monitoring |
| **CLI** | Text-based, scriptable | Automation, advanced users |
| **SDK** | Programmatic, language-specific | Developers, application integration |

## Compute và Shared Responsibility

**AWS Shared Responsibility Model** phác thảo sự phân chia nhiệm vụ giữa khách hàng và AWS. AWS xử lý bảo mật của cloud (hardware và infrastructure), trong khi khách hàng chịu trách nhiệm về bảo mật trong cloud (applications, data và access control).

### Unmanaged Services: Amazon EC2

Một **unmanaged service** như Amazon EC2 yêu cầu bạn thực hiện tất cả các tác vụ cấu hình và quản lý bảo mật cần thiết.

![Unmanaged Services - Shared Responsibility Model](https://tiennhm.io.vn/img/docs/AWS-Cloud-Practitioner-Essentials/M00_SRM_Unmanaged.png)

**Khi bạn deploy một EC2 instance, bạn chịu trách nhiệm cho:**
- 🔒 **Configuring security** - Cấu hình bảo mật
- 🖥️ **Managing the guest operating system (OS)** - Quản lý hệ điều hành khách
- 🔄 **Applying updates** - Áp dụng cập nhật
- 🛡️ **Setting up firewalls (security groups)** - Thiết lập tường lửa (security groups)

### Customer Responsibilities (Trách nhiệm của Khách hàng)

Đối với unmanaged services như EC2, khách hàng chịu trách nhiệm cho:

- 💾 **Customer data** - Dữ liệu khách hàng
- 🔐 **Client-side data encryption** - Mã hóa dữ liệu phía khách hàng
- 🔒 **Server-side encryption** - Mã hóa phía server
- 🌐 **Network traffic protection** - Bảo vệ lưu lượng mạng
- 🖥️ **Platform and application management** - Quản lý platform và ứng dụng
- ⚙️ **OS, network, firewall configuration** - Cấu hình OS, mạng, firewall

### AWS Responsibilities (Trách nhiệm của AWS)

AWS chịu trách nhiệm cho:

- 💻 **Software for compute, storage, database, and networking** - Phần mềm cho compute, storage, database và networking
- 🏢 **Hardware, AWS Global Infrastructure** - Phần cứng, AWS Global Infrastructure

## Managed vs Unmanaged Services

### Unmanaged Services (Dịch vụ không được quản lý)

**Đặc điểm:**
- 🔧 **Full control** - Bạn có toàn quyền kiểm soát
- ⚙️ **Manual configuration** - Bạn phải cấu hình thủ công
- 🛡️ **Self-managed security** - Bạn tự quản lý bảo mật
- 🔄 **Self-managed updates** - Bạn tự quản lý cập nhật

**Ví dụ:**
- **Amazon EC2** - Bạn quản lý OS, patches, security groups
- **Amazon EBS** - Bạn quản lý volumes và snapshots

### Managed Services (Dịch vụ được quản lý)

**Đặc điểm:**
- 🛡️ **AWS manages more** - AWS quản lý nhiều hơn
- ⚡ **Less configuration** - Ít cấu hình hơn
- 🔄 **Automated updates** - Cập nhật tự động
- 🎯 **Focus on application** - Tập trung vào ứng dụng

**Ví dụ:**
- **Amazon RDS** - AWS quản lý OS, patches, backups
- **Amazon S3** - AWS quản lý infrastructure hoàn toàn
- **AWS Lambda** - AWS quản lý toàn bộ runtime

**Lưu ý:** Chúng ta sẽ tìm hiểu thêm về managed và unmanaged services sau.

## Tổng kết

### ✅ Những gì đã học:

1. **AWS APIs:**
   - Mọi tương tác với AWS đều thông qua APIs
   - APIs cung cấp các phương thức được xác định trước

2. **Ba cách gọi AWS APIs:**
   - 🌐 **AWS Management Console** - Visual, dễ sử dụng, tốt cho học tập
   - 💻 **AWS CLI** - Text-based, scriptable, tốt cho automation
   - 🔧 **AWS SDK** - Programmatic, tốt cho developers

3. **Shared Responsibility với Compute:**
   - **AWS**: Hardware, infrastructure, hypervisor
   - **Customer**: OS, applications, data, security configuration

4. **Managed vs Unmanaged:**
   - **Unmanaged** (EC2): Bạn quản lý nhiều hơn
   - **Managed** (RDS, S3): AWS quản lý nhiều hơn

### 🎯 Điểm quan trọng cần nhớ:

- **Everything is an API call** - Mọi thứ đều là API call
- **Console** = Visual, good for learning
- **CLI** = Automation, scripting
- **SDK** = Application integration
- **EC2 is unmanaged** - Bạn chịu trách nhiệm cho OS, security, updates

### 🚀 Bước tiếp theo

Trong các bài học tiếp theo, chúng ta sẽ khám phá:
- Demo: Launching an Amazon EC2 Instance
- Amazon EC2 Pricing
- Auto Scaling và Load Balancing
- Và nhiều hơn nữa!

---

## Kiểm tra kiến thức: Bài tập thực hành

### Question 1

**Lợi ích chính của việc sử dụng AWS Command Line Interface (AWS CLI) so với AWS Management Console là gì?**

- ❌ Nó cung cấp giao diện trực quan, kéo và thả để quản lý tài nguyên AWS.
- ✅ **Nó sử dụng automation và scripting, giúp giảm các bước thủ công và lỗi.** ← Đúng
- ❌ Nó chỉ có sẵn cho người dùng Windows.
- ❌ Nó yêu cầu ít cấu hình hơn và lý tưởng cho việc provision thủ công một lần.

**Giải thích:** AWS CLI cho phép tự động hóa thông qua scripting, điều này hiệu quả hơn và giảm lỗi thủ công so với console.

**Phân tích:**
- 🤖 **Automation** = CLI cho phép tự động hóa qua scripts
- ⚡ **Efficiency** = Hiệu quả hơn so với point-and-click
- 🛡️ **Reduces errors** = Giảm lỗi do thủ công
- 📜 **Scriptable** = Có thể viết scripts để tái sử dụng

---

### Question 2

**Trách nhiệm của khách hàng khi sử dụng dịch vụ compute như Amazon EC2 theo AWS Shared Responsibility Model là gì?**

- ❌ AWS quản lý bảo mật của cloud, và khách hàng quản lý bảo mật của infrastructure.
- ❌ Khách hàng chịu trách nhiệm bảo mật phần cứng vật lý của các EC2 instances của họ.
- ❌ AWS chịu trách nhiệm quản lý operating system, networking và applications trên EC2 instances của khách hàng.
- ✅ **Khách hàng chịu trách nhiệm cấu hình, bảo mật và quản lý operating system, networking và applications trên EC2 instances của họ.** ← Đúng

**Giải thích:** Khách hàng xử lý operating system, networking và applications trên EC2 instances. AWS quản lý phần cứng.

**Phân tích:**
- 🖥️ **OS Management** = Khách hàng quản lý OS, patches, updates
- 🌐 **Networking** = Khách hàng cấu hình security groups, network settings
- 💻 **Applications** = Khách hàng quản lý applications chạy trên instances
- 🏢 **Hardware** = AWS quản lý phần cứng vật lý

**Nhớ lại:**
- **Security OF the Cloud** = AWS (hardware, infrastructure)
- **Security IN the Cloud** = Customer (OS, applications, data)

---

## Tài liệu tham khảo

- 📚 [AWS Management Console](https://aws.amazon.com/console/)
- 💻 [AWS CLI Documentation](https://docs.aws.amazon.com/cli/)
- 🔧 [AWS SDK Documentation](https://aws.amazon.com/tools/)
- 🐍 [AWS SDK for Python (Boto3)](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html)
- 🤝 [AWS Shared Responsibility Model](https://aws.amazon.com/compliance/shared-responsibility-model/)
- 📖 [AWS CloudShell](https://aws.amazon.com/cloudshell/)

---

*Bài viết này là phần thứ ba trong Module 2 - Compute in the Cloud của series AWS Cloud Practitioner Essentials. Bài viết được cập nhật vào tháng 11/2025 dựa trên nội dung khóa học AWS Cloud Practitioner Essentials.*

**Bạn có câu hỏi hay muốn thảo luận về cách Provision AWS Resources? Hãy chia sẻ ở phần comment bên dưới nhé! ☁️**
