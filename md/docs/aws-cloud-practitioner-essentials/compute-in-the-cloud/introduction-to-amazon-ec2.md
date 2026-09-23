# M02.01 - Introduction to Amazon EC2

> Nguồn: https://tiennhm.io.vn/docs/aws-cloud-practitioner-essentials/compute-in-the-cloud/introduction-to-amazon-ec2
> Tìm hiểu về Amazon Elastic Compute Cloud (EC2) - dịch vụ compute mạnh mẽ của AWS. Khám phá cách provision và quản lý virtual servers, so sánh lợi ích của cloud với on-premises, và khái niệm multi-tenancy trong EC2.

**Compute** (Tính toán) đề cập đến sức mạnh xử lý cần thiết để chạy ứng dụng, quản lý dữ liệu và thực hiện các phép tính. Trong cloud, sức mạnh này có sẵn theo nhu cầu. Bạn có thể truy cập nó từ xa mà không cần sở hữu hoặc bảo trì phần cứng vật lý.

Về cơ bản, **compute in the cloud** có nghĩa là tạo các virtual machines (máy ảo) với một cloud provider để chạy ứng dụng và tác vụ qua internet. Trong các bài học tiếp theo, bạn sẽ có được sự hiểu biết sâu sắc về **Amazon Elastic Compute Cloud (Amazon EC2)**, một dịch vụ compute mạnh mẽ từ AWS, khi bạn khám phá tính linh hoạt, hiệu quả chi phí và khả năng mở rộng của nó.

## Mục tiêu học tập

Sau khi hoàn thành bài học này, bạn sẽ có thể:

- ✅ Mô tả cách các tài nguyên compute được provision và quản lý trong cloud
- ✅ So sánh lợi ích và thách thức của việc sử dụng virtual servers với việc quản lý physical servers on-premises
- ✅ Xác định khái niệm multi-tenancy trong Amazon EC2

## Amazon EC2 là gì?

**Amazon Elastic Compute Cloud (Amazon EC2)** linh hoạt, hiệu quả về chi phí và nhanh hơn so với việc quản lý servers on-premises. Nó cung cấp compute capacity theo nhu cầu có thể được launch nhanh chóng, scale và terminate, với chi phí chỉ dựa trên việc sử dụng tích cực.

**Tính linh hoạt của Amazon EC2** cho phép phát triển và triển khai ứng dụng nhanh hơn. Bạn có thể launch nhiều hoặc ít virtual servers tùy theo nhu cầu và cấu hình bảo mật, networking và storage. Bạn cũng có thể scale tài nguyên lên hoặc xuống dựa trên việc sử dụng, chẳng hạn như xử lý traffic cao hoặc các tác vụ compute-heavy.

### Đặc điểm chính của Amazon EC2

- ⚡ **On-demand compute capacity** - Compute capacity theo nhu cầu
- 🚀 **Quick launch** - Launch nhanh chóng trong vài phút
- 📈 **Scalable** - Có thể scale lên hoặc xuống
- 💰 **Cost-effective** - Chỉ trả cho những gì bạn sử dụng
- 🔧 **Flexible** - Hoàn toàn kiểm soát cấu hình

## So sánh: On-premises vs Cloud Resources

Khi thiết kế hạ tầng cho doanh nghiệp của bạn, việc chọn đúng tài nguyên có thể ảnh hưởng đáng kể đến hiệu quả, tính linh hoạt và tổng chi phí của bạn.

### Thách thức của On-premises Resources

Hãy tưởng tượng bạn chịu trách nhiệm thiết kế hạ tầng của công ty để hỗ trợ các website mới. Với tài nguyên on-premises truyền thống, bạn phải:

![Challenges of On-premises Resources](https://tiennhm.io.vn/img/docs/AWS-Cloud-Practitioner-Essentials/M02_L01_05_OnPremises.png)

1. 💰 **Spend money upfront to purchase hardware** - Chi tiền trước để mua phần cứng
2. 🚚 **Wait for the servers to be delivered to you** - Chờ servers được giao đến
3. 🔧 **Install the servers in your physical data center** - Cài đặt servers trong data center vật lý của bạn
4. ⚙️ **Make all the necessary configurations** - Thực hiện tất cả các cấu hình cần thiết

**Vấn đề:**
- ⏳ **Time-consuming** - Tốn thời gian (vài tuần đến vài tháng)
- 💸 **Costly** - Tốn kém (đầu tư lớn trước)
- 🔒 **Inflexible** - Không linh hoạt (bị khóa vào một dung lượng cụ thể có thể không phù hợp với nhu cầu thay đổi)

### Lợi ích của Cloud Resources

Ngược lại, với **Amazon EC2**, bạn có thể nhanh chóng launch, scale và stop instances dựa trên nhu cầu của mình mà không có sự chậm trễ và chi phí trước liên quan đến tài nguyên on-premises truyền thống.

![Benefits of Using Cloud Resources](https://tiennhm.io.vn/img/docs/AWS-Cloud-Practitioner-Essentials/M02_L01_05_CloudBenefits.png)

**Lợi ích:**
- ⚡ **Scale up or down based on demand** - Scale lên hoặc xuống dựa trên nhu cầu
- 🛑 **Stop using instances after a workload has completed** - Dừng sử dụng instances sau khi workload hoàn thành
- 🚀 **Provision and launch an Amazon EC2 instance within minutes** - Provision và launch một EC2 instance trong vài phút
- 💰 **Pay only for the compute time used when an instance is running** - Chỉ trả cho thời gian compute được sử dụng khi instance đang chạy

## Amazon EC2: Tổng quan

Nếu bạn nhớ từ ví dụ cửa hàng cà phê, các nhân viên là một phép ẩn dụ cho mô hình client/server nơi client gửi request đến server, server thực hiện một số công việc, và sau đó gửi response.

Ví dụ đó dành cho cửa hàng cà phê, nhưng ý tưởng tương tự áp dụng cho các doanh nghiệp khác. Các doanh nghiệp này, dù họ đang ở healthcare, manufacturing, insurance, hay delivering video content, cũng đang sử dụng mô hình này để cung cấp sản phẩm, tài nguyên hoặc dữ liệu cho end users.

### Bạn cần Compute Capacity

Bạn cần **raw compute capacity** (sức mạnh tính toán thô) để host ứng dụng của bạn và cung cấp sức mạnh tính toán mà doanh nghiệp của bạn cần. Khi bạn làm việc với AWS, những servers đó được gọi là **EC2 instances**.

### So sánh EC2 với On-premises

**Sử dụng EC2 cho compute:**
- ✅ **Highly flexible** - Rất linh hoạt
- ✅ **Cost effective** - Hiệu quả về chi phí
- ✅ **Quick** - Nhanh chóng

**So với chạy servers on-premises:**
- ⏳ Thời gian và tiền bạc để bắt đầu với on-premises resources khá cao
- ⚡ Với EC2, việc bắt đầu thuận tiện hơn nhiều

**AWS đã lo phần khó cho bạn:**
- 🏗️ AWS liên tục vận hành một lượng lớn compute capacity sẵn sàng để sử dụng
- 🎯 Bạn có thể sử dụng bất kỳ phần nào của capacity đó khi bạn cần
- 🚀 Tất cả những gì bạn phải làm là request các EC2 instances bạn muốn, và chúng sẽ launch và boot up, sẵn sàng để sử dụng trong vài phút

### Tính linh hoạt và Chi phí

**Sau khi bạn hoàn thành:**
- 🛑 Bạn có thể **stop** hoặc **terminate** các EC2 instances
- 🔓 Bạn không bị khóa hoặc mắc kẹt với các servers mà bạn không cần hoặc muốn

**Việc sử dụng EC2 instances của bạn có thể thay đổi rất nhiều theo thời gian:**
- 📈 Tăng lên trong giờ cao điểm
- 📉 Giảm xuống trong giờ thấp điểm
- 💰 **Bạn chỉ trả cho những gì bạn sử dụng**

**Với EC2, bạn chỉ trả cho các instances đang chạy, không phải các instances đã stop hoặc terminate.**

## Virtual Machines và Multi-tenancy

### EC2 Instances là Virtual Machines

**EC2 instances là virtual machines (VMs)** - máy ảo. VMs chia sẻ một physical host machine bên dưới với nhiều instances khác, đây là một khái niệm được gọi là **multi-tenancy**.

### Multi-tenancy là gì?

Trong môi trường **multi-tenant**, bạn cần đảm bảo rằng mỗi VM được cách ly với nhau nhưng vẫn có thể chia sẻ tài nguyên được cung cấp bởi host.

**Vai trò của Hypervisor:**
- 🔧 Công việc chia sẻ tài nguyên và cách ly này được thực hiện bởi một phần mềm gọi là **hypervisor**, đang chạy trên host machine
- 🛡️ Đối với EC2, AWS quản lý host bên dưới, hypervisor, và sự cách ly từ instance đến instance

**Điều quan trọng:**
Mặc dù bạn sẽ không quản lý phần này, nhưng điều quan trọng là có một sự hiểu biết cơ bản về khái niệm multi-tenancy.

### Tại sao Multi-tenancy quan trọng?

- 💰 **Cost efficiency** - Hiệu quả chi phí: Nhiều VMs chia sẻ cùng một physical host
- 🛡️ **Isolation** - Cách ly: Mỗi VM được cách ly an toàn
- 📈 **Scalability** - Khả năng mở rộng: Dễ dàng tạo và xóa VMs

## Cấu hình EC2 Instances

### Operating System (Hệ điều hành)

Khi bạn provision một EC2 instance, bạn có thể chọn **operating system (OS)** dựa trên:
- 🪟 **Windows** - Cho các ứng dụng Windows
- 🐧 **Linux** - Cho các ứng dụng Linux

**Tính linh hoạt:**
- 🚀 Bạn có thể provision hàng nghìn EC2 instances theo nhu cầu
- 🔀 Với sự kết hợp của operating systems và configurations
- 💪 Để cung cấp sức mạnh cho các ứng dụng khác nhau của doanh nghiệp

### Software Configuration

Bạn cũng có thể cấu hình phần mềm bạn muốn chạy trên instance:
- 💼 **Internal business applications** - Ứng dụng kinh doanh nội bộ
- 🌐 **Simple or complex web apps** - Ứng dụng web đơn giản hoặc phức tạp
- 🗄️ **Databases** - Cơ sở dữ liệu
- 📦 **Third-party software** - Phần mềm bên thứ ba như enterprise software packages

**Bạn có quyền kiểm soát hoàn toàn** về những gì xảy ra trên instance đó.

### Resizable Instances

**EC2 instances cũng có thể thay đổi kích thước (resizable):**

- 📊 Bạn có thể bắt đầu với một instance nhỏ
- 📈 Nhận ra ứng dụng bạn đang chạy bắt đầu max out server đó
- ⬆️ Bạn có thể cung cấp cho instance đó nhiều memory và CPU hơn

**Đây được gọi là vertically scaling một instance.** Về cơ bản, bạn có thể làm cho instances lớn hơn hoặc nhỏ hơn bất cứ khi nào bạn cần.

### Networking Control

Bạn cũng kiểm soát khía cạnh networking của EC2:
- 🔒 Bạn quyết định loại requests nào đến được server của bạn
- 🌐 Chúng có thể truy cập công khai (publicly) hay riêng tư (privately)

*Chúng ta sẽ nói thêm về điều này sau trong phần networking.*

## Cách Amazon EC2 hoạt động

Bạn đã học rằng AWS quản lý hạ tầng phức tạp, cung cấp compute capacity theo nhu cầu có sẵn bất cứ khi nào bạn cần. Bạn có thể request EC2 instances và có chúng sẵn sàng để sử dụng trong vài phút. Nhưng làm thế nào để bạn thực sự bắt đầu?

Với Amazon EC2, bạn có thể nhanh chóng launch, kết nối và sử dụng các virtual instances trong cloud. Đây là tổng quan về cách quy trình hoạt động.

### Step 1: Launch an Instance

Khi launch một EC2 instance, bạn bắt đầu bằng cách:

1. **Selecting an Amazon Machine Image (AMI)**
   - Định nghĩa operating system
   - Có thể bao gồm phần mềm bổ sung
   - Ví dụ: Amazon Linux, Ubuntu, Windows Server

2. **Choosing an instance type**
   - Xác định tài nguyên phần cứng bên dưới
   - Như CPU, memory, và network performance
   - Ví dụ: t2.micro, t3.medium, m5.large

**Kết quả:** Instance được launch và sẵn sàng trong vài phút!

### Step 2: Connect to the Instance

Bạn có thể kết nối với một EC2 instance theo nhiều cách:

**Cho Applications:**
- 🌐 Applications có thể tương tác với services đang chạy trên instance qua network

**Cho Users/Administrators:**
- 🔐 **SSH** cho Linux instances
- 🪟 **RDP (Remote Desktop Protocol)** cho Windows instances
- 🔒 **AWS Systems Manager** - Một phương pháp bảo mật và đơn giản hóa để truy cập instances

### Step 3: Use the Instance

Sau khi bạn đã kết nối với instance, bạn có thể bắt đầu sử dụng nó để:
- 💻 **Run commands** - Chạy lệnh
- 📦 **Install software** - Cài đặt phần mềm
- 💾 **Add storage** - Thêm storage
- 📁 **Organize files** - Tổ chức files
- ⚙️ **Perform other tasks** - Thực hiện các tác vụ khác

## Lưu ý quan trọng

**Khái niệm VMs không phải là điều mới:**
- 🕰️ Virtual machines đã tồn tại từ lâu
- ☁️ AWS chỉ làm cho nó thuận tiện và hiệu quả về chi phí hơn nhiều cho bạn
- 🚀 Để có được servers thông qua mô hình **Compute as a Service**

## Tổng kết

### ✅ Những gì đã học:

1. **Amazon EC2 là gì:**
   - Dịch vụ compute linh hoạt, hiệu quả về chi phí và nhanh chóng
   - Cung cấp virtual machines (VMs) trong cloud
   - On-demand compute capacity

2. **So sánh On-premises vs Cloud:**
   - On-premises: Tốn thời gian, tốn kém, không linh hoạt
   - Cloud (EC2): Nhanh chóng, hiệu quả về chi phí, linh hoạt

3. **Multi-tenancy:**
   - Nhiều VMs chia sẻ cùng một physical host
   - Hypervisor quản lý cách ly và chia sẻ tài nguyên
   - AWS quản lý host, hypervisor và cách ly

4. **Cấu hình EC2:**
   - Chọn OS (Windows hoặc Linux)
   - Cấu hình software
   - Resizable instances (vertical scaling)
   - Kiểm soát networking

5. **Cách EC2 hoạt động:**
   - Step 1: Launch (chọn AMI và instance type)
   - Step 2: Connect (SSH, RDP, hoặc AWS Systems Manager)
   - Step 3: Use (chạy commands, cài đặt software, etc.)

### 🎯 Điểm quan trọng cần nhớ:

- **EC2 instances** = Virtual machines trong cloud
- **Multi-tenancy** = Nhiều VMs chia sẻ physical host với cách ly
- **Pay only for running instances** - Chỉ trả cho instances đang chạy
- **Quick launch** - Launch trong vài phút
- **Resizable** - Có thể thay đổi kích thước khi cần

### 🚀 Bước tiếp theo

Trong các bài học tiếp theo, chúng ta sẽ khám phá:
- EC2 Instance Types - Các loại instances khác nhau
- Cách Provision AWS Resources
- EC2 Pricing - Các mô hình định giá
- Auto Scaling và Load Balancing
- Và nhiều hơn nữa!

---

## Kiểm tra kiến thức: Bài tập thực hành

### Question 1

**Amazon EC2 so sánh như thế nào với việc chạy servers on-premises?**

- ❌ Nó đắt hơn nhưng cung cấp nhiều quyền kiểm soát hơn.
- ✅ **Nó linh hoạt hơn, hiệu quả về chi phí hơn và nhanh hơn để bắt đầu.** ← Đúng
- ❌ Nó yêu cầu nhiều thời gian hơn để thiết lập và bảo trì.
- ❌ Nó chỉ hữu ích cho các doanh nghiệp lớn.

**Giải thích:** Amazon EC2 được thiết kế để linh hoạt, hiệu quả về chi phí và nhanh chóng thiết lập so với servers on-premises.

---

### Question 2

**Multi-tenancy trong ngữ cảnh của Amazon EC2 instances là gì?**

- ✅ **Mỗi virtual machine được cách ly nhưng chia sẻ tài nguyên từ một host machine.** ← Đúng
- ❌ Nhiều servers chạy trong cùng một data center.
- ❌ Chỉ một người dùng có thể sử dụng instance tại một thời điểm.
- ❌ Một server chỉ có thể chạy một loại ứng dụng.

**Giải thích:** Multi-tenancy cho phép nhiều virtual machines chia sẻ tài nguyên trên cùng một physical host, với sự cách ly giữa chúng.

---

### Question 3

**Một công ty sử dụng Amazon EC2 instances để triển khai ứng dụng của họ. Điều gì sẽ xảy ra nếu họ cần stop hoặc terminate các EC2 instances?**

- ❌ Bạn vẫn bị tính phí cho các instances.
- ❌ Các instances sẽ tự động khởi động lại sau một khoảng thời gian đã đặt.
- ✅ **Bạn chỉ trả cho các instances đang chạy, không phải cho các instances đã stop hoặc terminate.** ← Đúng
- ❌ Các instances của bạn bị xóa vĩnh viễn và không thể khôi phục.

**Giải thích:** Với Amazon EC2, bạn chỉ trả cho các instances đang chạy, không phải cho các instances đã stop hoặc terminate.

---

### Question 4

**Điều gì phải được chỉ định khi chuẩn bị launch một Amazon EC2 instance?**

- ✅ **Loại instance và operating system** ← Đúng
- ❌ Lượng storage và số lượng người dùng
- ❌ Vị trí của instance và kế hoạch backup
- ❌ Network bandwidth và giới hạn chuyển dữ liệu

**Giải thích:** Bạn cần chọn EC2 instance type (bạn muốn nó mạnh như thế nào) và Amazon Machine Image (AMI), điều này xác định operating system và phần mềm cho instance của bạn.

---

## Tài liệu tham khảo

- 📚 [Amazon EC2 Documentation](https://docs.aws.amazon.com/ec2/)
- 💰 [Amazon EC2 Pricing](https://aws.amazon.com/ec2/pricing/)
- 🖼️ [Amazon Machine Images (AMI)](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html)
- 📊 [EC2 Instance Types](https://aws.amazon.com/ec2/instance-types/)
- 🔒 [AWS Systems Manager](https://docs.aws.amazon.com/systems-manager/)

---

*Bài viết này là phần đầu tiên trong Module 2 - Compute in the Cloud của series AWS Cloud Practitioner Essentials. Bài viết được cập nhật vào tháng 11/2025 dựa trên nội dung khóa học AWS Cloud Practitioner Essentials.*

**Bạn có câu hỏi hay muốn thảo luận về Amazon EC2? Hãy chia sẻ ở phần comment bên dưới nhé! ☁️**
