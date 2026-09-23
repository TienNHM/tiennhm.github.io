# M02.04 - Demo Launching an Amazon EC2 Instance

> Nguồn: https://tiennhm.io.vn/docs/aws-cloud-practitioner-essentials/compute-in-the-cloud/demo-launching-an-amazon-ec2-instance
> Tìm hiểu các cấu hình chính cần thiết khi thiết lập EC2 instance. Giải thích cách AMI duy trì tính nhất quán và hiệu quả khi scale applications. Demo thực tế về cách launch một EC2 instance.

Nếu bạn háo hức hiểu cách Amazon EC2 hoạt động, đây là cơ hội để xem nó trong hành động! Trong demo này, bạn sẽ tìm hiểu về các bước cơ bản của việc launch một EC2 instance. Đến cuối demo này, bạn sẽ có một EC2 instance hoàn toàn chức năng.

## Mục tiêu học tập

Sau khi hoàn thành bài học này, bạn sẽ có thể:

- ✅ Xác định các cấu hình chính cần thiết khi thiết lập EC2 instance
- ✅ Giải thích cách AMI duy trì tính nhất quán và hiệu quả khi scale applications

## Demo: Tạo EC2 Instance cho Web Server

Bạn đã học rất nhiều về EC2, và bây giờ, bạn có thể đang nghĩ: **"Làm thế nào để tôi tự tạo một EC2 instance?"**

Trong video này, chúng ta sẽ đi qua quy trình tạo một EC2 instance cho một web server sử dụng **AWS Management Console**. Chúng ta sẽ xem qua một số cấu hình chính trên đường đi, vì vậy hãy bắt đầu!

### Bước 1: Truy cập EC2 Console

**Đầu tiên, chúng ta muốn làm là đi đến EC2 console.**

- 🔍 Bạn có thể tìm kiếm "EC2" trong AWS Console
- 📌 Hoặc truy cập từ "Recently visited" hoặc shortcuts bar
- 🎯 Có rất nhiều tùy chọn ở đây, nhưng chúng ta sẽ tập trung vào tùy chọn **"Launch instance"**

### Bước 2: Chọn Instance Name

**Điều đầu tiên chúng ta phải chọn là tên.**

- 📝 Chọn **instance name** để có thể tìm thấy nó sau này
- 🏷️ Ví dụ: "my-web-server" hoặc "production-app-server"

### Bước 3: Chọn Amazon Machine Image (AMI)

**Điều tiếp theo chúng ta sẽ làm là chọn Amazon Machine Image, hoặc AMI.**

**AMI là gì?**
- 📦 **AMI là một template** của operating system và các ứng dụng tích hợp sẵn mà nó sẽ đi kèm
- 🔧 Chúng ta có thể tùy chỉnh điều này, nhưng ngay bây giờ, chúng ta sẽ sử dụng mặc định: **Amazon Linux AMI**
- ✅ **Amazon Linux AMI** hoàn hảo cho một web server mục đích chung

### Bước 4: Chọn Instance Type

**Điều tiếp theo chúng ta phải quyết định là instance type.**

- 💻 Điều này đề cập đến **sức mạnh tính toán** mà web server của chúng ta sẽ có
- 🎯 Trong trường hợp này, chúng ta sẽ chọn chỉ cơ bản: **t2.micro**

**t2.micro specifications:**
- 🖥️ **1 virtual CPU** - Một CPU ảo
- 💾 **1 gigabyte of memory** - Một gigabyte bộ nhớ
- 🆓 **Free Tier** - Trong Free Tier (miễn phí)

### Bước 5: Chọn Key Pair

**Điều tiếp theo chúng ta chọn là key pair.**

- 🔑 Điều này liên quan đến cách chúng ta **đăng nhập vào EC2 instance này**
- 🔐 **Key pair** đề cập đến một cặp keys:
  - 🔓 **Public key** - Sẽ được inject vào EC2 instance
  - 🔒 **Private key** - Chúng ta sẽ giữ lại

**Tùy chọn:**
- ➕ Chúng ta có thể tạo key pair ngay tại đây
- ✅ Hoặc chọn một key đã được thiết lập trước đó

### Bước 6: Chọn Network Settings

**Phần tiếp theo là chọn network settings.**

- 🌐 Chúng ta sẽ có rất nhiều niềm vui khi đi qua tất cả các chi tiết này sau
- 🔓 Nhưng ngay bây giờ, đủ để nói rằng chúng ta sẽ **allow HTTP traffic from the internet**
- 🌍 Nó sẽ là một web server, sau tất cả, vì vậy đó là tất cả những gì chúng ta phải làm

### Bước 7: Chọn Storage Options

**Tùy chọn tiếp theo chúng ta phải chọn là storage options cho EC2 instance của chúng ta.**

- 💿 Trong trường hợp này, chúng ta sẽ cung cấp cho nó **8 gigabytes** của disk space
- 📦 Sử dụng **gp3 EBS volume**, hoặc elastic block store volume
- ✅ Điều này có nghĩa là nó sẽ có nhiều không gian cho web serving

*Chúng ta sẽ tìm hiểu thêm về EBS sau, nhưng đây là storage được gắn vào EC2 instance của bạn.*

### Bước 8: Cấu hình User Data (Optional)

**Và nói về web serving, chúng ta phải thực hiện một thay đổi nữa để nó thực sự là một web server.**

- 📦 Khi chúng ta chọn AMI, chúng ta đã chọn một AMI rất generic
- ❌ AMI này không có web server được kích hoạt khi launch
- ⚙️ Để làm điều đó, chúng ta sẽ đi vào **Advanced Details**, cụ thể là phần **User Data**

**User Data cho phép chúng ta:**
- 📝 Paste một script, chẳng hạn như script này, sẽ cài đặt và kích hoạt **Nginx web server**
- 🌐 Đây là những gì chúng ta sẽ sử dụng để serve content lên internet

**Ví dụ User Data script:**
```bash
#!/bin/bash
yum update -y
yum install -y nginx
systemctl start nginx
systemctl enable nginx
```

### Bước 9: Launch Instance

**Tất cả điều này trông ổn, vì vậy chúng ta sẽ nhấn "Launch instance" và xem những gì chúng ta nhận được.**

- ✅ Ngay khi instance launch, chúng ta có thể đi đến console của nó và xem một số chi tiết về EC2 instance đó
- 🌐 Bây giờ EC2 instance của chúng ta đang chạy, chúng ta sẽ copy **public IP address** của nó
- 🌍 Mở một browser mới và truy cập vào nó
- 🎉 **Và đó là nó! EC2 instance của riêng bạn đang chạy một web server cơ bản!**

## Các cấu hình chính khi Launch EC2 Instance

Tóm tắt các cấu hình chính bạn cần khi launch một EC2 instance:

### ✅ Required Configurations (Bắt buộc)

1. **Instance Name** 📝
   - Tên để nhận dạng instance

2. **Amazon Machine Image (AMI)** 📦
   - Template cho OS và software

3. **Instance Type** 💻
   - CPU, memory, và network performance

4. **Key Pair** 🔑
   - Để đăng nhập vào instance

5. **Network Settings** 🌐
   - VPC, subnet, security groups

6. **Storage** 💿
   - EBS volume type và size

### ⚙️ Optional Configurations (Tùy chọn)

- **User Data** - Script để chạy khi instance khởi động
- **Tags** - Metadata để tổ chức instances
- **IAM Role** - Permissions cho instance
- **Monitoring** - CloudWatch monitoring

## Amazon Machine Images (AMIs)

Trong demo, bạn đã có giới thiệu nhanh về AMIs. **AMIs là pre-built virtual machine images** có các thành phần cơ bản cho những gì cần thiết để bắt đầu một instance. Bây giờ, hãy khám phá AMIs chi tiết hơn.

![AMI Components](https://tiennhm.io.vn/img/docs/AWS-Cloud-Practitioner-Essentials/M02_L04_AMIComponents.png)

### AMI Components (Thành phần AMI)

**Một AMI bao gồm:**

1. **Operating System** 🖥️
   - Linux (Amazon Linux, Ubuntu, Red Hat, etc.)
   - Windows (Windows Server)

2. **Storage Setup** 💿
   - Root volume configuration
   - EBS volume mappings

3. **Architecture Type** 🏗️
   - x86_64 (Intel/AMD)
   - arm64 (AWS Graviton)

4. **Permissions for Launching** 🔐
   - Public AMIs (anyone can use)
   - Private AMIs (only your account)
   - Shared AMIs (specific accounts)

5. **Extra Software** 📦
   - Pre-installed applications
   - Configuration scripts
   - Development tools

**Bạn có thể sử dụng một AMI để launch nhiều EC2 instances** có cùng setup.

## Ba cách sử dụng AMIs

AMIs có thể được sử dụng theo ba cách:

![Three Ways to Use AMIs](https://tiennhm.io.vn/img/docs/AWS-Cloud-Practitioner-Essentials/M02_L04_AMIHowToUse.png)

### 1. Create Your Own (Tạo của riêng bạn)

**Tạo AMI tùy chỉnh:**
- 🔧 Build một custom AMI với cấu hình và phần mềm cụ thể
- 🎯 Tùy chỉnh theo nhu cầu của bạn
- 💾 Lưu trữ trong tài khoản AWS của bạn

**Use cases:**
- Ứng dụng với dependencies cụ thể
- Cấu hình bảo mật tùy chỉnh
- Software licenses
- Compliance requirements

**Cách tạo:**
1. Launch EC2 instance từ AMI cơ bản
2. Cài đặt và cấu hình software
3. Tạo AMI từ instance đó
4. Sử dụng AMI mới để launch instances khác

### 2. Use Available AWS AMIs (Sử dụng AMIs có sẵn của AWS)

**Sử dụng AMIs được cấu hình sẵn của AWS:**
- ✅ Pre-configured cho common operating systems và software
- 🆓 Miễn phí (chỉ trả cho EC2 instance)
- 🔄 Được AWS maintain và update

**Ví dụ:**
- Amazon Linux 2023
- Ubuntu Server
- Windows Server
- Red Hat Enterprise Linux

**Lợi ích:**
- ⚡ Nhanh chóng để bắt đầu
- 🔒 Được AWS maintain
- 📚 Tài liệu đầy đủ

### 3. Purchase from AWS Marketplace (Mua từ AWS Marketplace)

**Mua AMIs từ AWS Marketplace:**
- 🛒 Third-party vendors cung cấp specialized software
- 💰 Có thể có chi phí bổ sung (ngoài EC2)
- 🎯 Designed cho specific use cases

**Ví dụ:**
- WordPress AMIs
- Database AMIs (MySQL, PostgreSQL)
- Security tools
- Development environments

**Lợi ích:**
- 🎯 Specialized solutions
- 🔧 Pre-configured software
- 📖 Documentation và support từ vendor

## AMI Repeatability (Tính lặp lại của AMI)

AMIs cung cấp tính lặp lại thông qua một môi trường nhất quán cho mỗi instance mới. Vì cấu hình giống hệt nhau và triển khai được tự động hóa, môi trường phát triển và testing nhất quán. Điều này giúp khi scaling, giảm lỗi và hợp lý hóa việc quản lý môi trường quy mô lớn.

![AMI Benefits - Repeatability](https://tiennhm.io.vn/img/docs/AWS-Cloud-Practitioner-Essentials/M02_L04_AMIBenefits.png)

### Lợi ích của AMI Repeatability

#### 1. Same Configuration (Cấu hình giống nhau)

- ✅ **Identical setup** - Tất cả instances có cùng cấu hình
- 🎯 **Standardized starting point** - Điểm khởi đầu được chuẩn hóa
- 🔒 **Consistent security** - Bảo mật nhất quán

**Ví dụ:**
- Launch 10 instances từ cùng một AMI
- Tất cả đều có cùng OS, software, và cấu hình
- Không có sự khác biệt giữa các instances

#### 2. Automated Deployments (Triển khai tự động)

- 🤖 **Script-based** - Dựa trên scripts
- ⚡ **Fast deployment** - Triển khai nhanh chóng
- 🔄 **Repeatable process** - Quy trình có thể lặp lại

**Ví dụ:**
```bash
# Launch 5 instances từ cùng AMI
aws ec2 run-instances \
  --image-id ami-0c55b159cbfafe1f0 \
  --instance-type t3.micro \
  --count 5
```

#### 3. Consistent Environments (Môi trường nhất quán)

- 🧪 **Development** - Môi trường phát triển
- 🧪 **Testing** - Môi trường testing
- 🚀 **Production** - Môi trường production

**Lợi ích:**
- ✅ Giảm discrepancies giữa các môi trường
- ✅ Dễ dàng reproduce bugs
- ✅ Testing chính xác hơn

#### 4. Scaling with Confidence (Scale với tự tin)

- 📈 **Confident scaling** - Scale với tự tin
- 🛡️ **Reduced errors** - Giảm lỗi
- ⚡ **Streamlined management** - Quản lý hợp lý hóa

**Ví dụ:**
- Cần scale từ 5 instances lên 50 instances?
- Launch từ cùng AMI → Tất cả đều giống nhau
- Không lo về configuration drift

## Tổng kết

### ✅ Những gì đã học:

1. **Các bước Launch EC2 Instance:**
   - Chọn name, AMI, instance type
   - Cấu hình key pair, network, storage
   - Optional: User Data script

2. **Amazon Machine Images (AMIs):**
   - Template cho OS và software
   - Bao gồm: OS, storage, architecture, permissions, software
   - Có thể launch nhiều instances từ một AMI

3. **Ba cách sử dụng AMIs:**
   - Create your own
   - Use AWS AMIs
   - Purchase from Marketplace

4. **AMI Repeatability:**
   - Same configuration
   - Automated deployments
   - Consistent environments
   - Scaling with confidence

### 🎯 Điểm quan trọng cần nhớ:

- **AMI** = Template để launch EC2 instances
- **Required configurations** = Name, AMI, Instance Type, Key Pair, Network, Storage
- **AMI Repeatability** = Consistency, automation, confidence
- **Three ways to use AMIs** = Create, Use AWS, Purchase

### 🚀 Bước tiếp theo

Trong các bài học tiếp theo, chúng ta sẽ khám phá:
- Amazon EC2 Pricing
- Auto Scaling và Load Balancing
- Và nhiều hơn nữa!

---

## Kiểm tra kiến thức: Bài tập thực hành

### Question 1

**Các cấu hình BẮT BUỘC khi launch một Amazon EC2 instance cho web server là gì? (Chọn BA.)**

- ✅ **Amazon Machine Image (AMI)** ← Đúng
- ❌ Load balancing
- ✅ **Instance type** ← Đúng
- ❌ Permissions
- ✅ **Storage** ← Đúng
- ❌ Instance termination behavior

**Giải thích:** Để launch một EC2 instance cho web server, cấu hình AMI để định nghĩa operating system và software; chọn instance type để phân bổ CPU, memory và storage; và thiết lập storage options, bao gồm loại và kích thước của volume.

**Phân tích:**
- ✅ **AMI** - Bắt buộc để định nghĩa OS và software
- ✅ **Instance type** - Bắt buộc để chọn CPU, memory, network
- ✅ **Storage** - Bắt buộc để chọn EBS volume type và size
- ❌ **Load balancing** - Không bắt buộc khi launch instance cơ bản
- ❌ **Permissions** - Có thể cấu hình sau
- ❌ **Instance termination behavior** - Tùy chọn

---

### Question 2

**Amazon Machine Image (AMI) được sử dụng để làm gì khi launch một Amazon EC2 instance?**

- ❌ Để chọn instance size
- ❌ Để cấu hình network settings
- ✅ **Để pre-configure operating system và software** ← Đúng
- ❌ Để lưu trữ instance data

**Giải thích:** AMI là một pre-configured virtual machine image chứa operating system, application server và applications. Điều này giúp launch EC2 instances nhanh chóng với software và settings mong muốn.

**Phân tích:**
- ✅ **Pre-configure OS và software** - Đúng! AMI là template chứa OS và software
- ❌ **Instance size** - Được chọn trong instance type, không phải AMI
- ❌ **Network settings** - Được cấu hình riêng, không phải trong AMI
- ❌ **Store instance data** - Dữ liệu được lưu trong EBS volumes, không phải AMI

---

## Tài liệu tham khảo

- 📚 [Amazon EC2 User Guide](https://docs.aws.amazon.com/ec2/)
- 🖼️ [Amazon Machine Images (AMI)](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html)
- 🛒 [AWS Marketplace](https://aws.amazon.com/marketplace/)
- 🔑 [EC2 Key Pairs](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html)
- 💾 [Amazon EBS](https://docs.aws.amazon.com/ebs/)
- 📝 [EC2 User Data](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html)

---

*Bài viết này là phần thứ tư trong Module 2 - Compute in the Cloud của series AWS Cloud Practitioner Essentials. Bài viết được cập nhật vào tháng 11/2025 dựa trên nội dung khóa học AWS Cloud Practitioner Essentials.*

**Bạn có câu hỏi hay muốn thảo luận về cách Launch EC2 Instance? Hãy chia sẻ ở phần comment bên dưới nhé! ☁️**
