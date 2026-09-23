# M02.09 - Module 2 Assessment

> Nguồn: https://tiennhm.io.vn/en/docs/aws-cloud-practitioner-essentials/compute-in-the-cloud/module-2-assessment
> Bài kiểm tra Module 2 - Compute in the Cloud. Bạn phải đạt 80% trở lên để vượt qua module này. Bạn có thể làm lại không giới hạn số lần.

> **Info: 📝 Thông tin Bài kiểm tra**
>
> **Yêu cầu:** Bạn phải đạt **80% trở lên** (12/14 câu đúng) để vượt qua module này.
>
> **Số lần làm lại:** Không giới hạn
>
> **Chúc may mắn!** 🍀
---

## Question 01/14

### English 🇺🇸

A company has critical steady-state workloads and batch jobs that are not time-sensitive.

How should they optimize costs using Amazon EC2 Savings Plans and Spot Instances?

- ❌ Use Savings Plans for all workloads and avoid Spot Instances because of interruption risks.
- ❌ Use Spot Instances for all workloads to maximize savings and avoid Savings Plans.
- ❌ Use Savings Plans for non-time-sensitive workloads and Spot Instances for critical jobs.
- ✅ **Use Savings Plans for critical workloads and Spot Instances for jobs that are not time-sensitive to maximize savings.** ← Correct

**Explanation:** This is the best approach. Savings Plans are ideal for critical workloads that need consistent capacity and predictable pricing. Spot Instances offer significant savings for jobs that are not time-sensitive and can tolerate interruptions.

---

### Tiếng Việt 🇻🇳

Một công ty có các workloads steady-state quan trọng và các batch jobs không nhạy cảm về thời gian.

Họ nên tối ưu hóa chi phí bằng cách sử dụng Amazon EC2 Savings Plans và Spot Instances như thế nào?

- ❌ Sử dụng Savings Plans cho tất cả workloads và tránh Spot Instances vì rủi ro gián đoạn.
- ❌ Sử dụng Spot Instances cho tất cả workloads để tối đa hóa tiết kiệm và tránh Savings Plans.
- ❌ Sử dụng Savings Plans cho các workloads không nhạy cảm về thời gian và Spot Instances cho các công việc quan trọng.
- ✅ **Sử dụng Savings Plans cho các workloads quan trọng và Spot Instances cho các công việc không nhạy cảm về thời gian để tối đa hóa tiết kiệm.** ← Đúng

**Giải thích:** Đây là cách tiếp cận tốt nhất. Savings Plans lý tưởng cho các workloads quan trọng cần capacity nhất quán và pricing có thể dự đoán được. Spot Instances cung cấp tiết kiệm đáng kể cho các công việc không nhạy cảm về thời gian và có thể chịu được gián đoạn.

---

## Question 02/14

### English 🇺🇸

What happens if one component fails in a loosely coupled architecture?

- ✅ **The system can continue to function as other components are independent.** ← Correct
- ❌ Other components must be manually restarted.
- ❌ The system automatically switches to backup components without any intervention.
- ❌ The failure causes the entire system to fail.

**Explanation:** Loosely coupled systems are designed so that components are independent. If one component fails, the rest of the system can continue to function normally, minimizing the impact of the failure.

---

### Tiếng Việt 🇻🇳

Điều gì xảy ra nếu một component thất bại trong một loosely coupled architecture?

- ✅ **Hệ thống có thể tiếp tục hoạt động vì các components khác độc lập.** ← Đúng
- ❌ Các components khác phải được khởi động lại thủ công.
- ❌ Hệ thống tự động chuyển sang các components dự phòng mà không cần can thiệp.
- ❌ Sự thất bại gây ra toàn bộ hệ thống thất bại.

**Giải thích:** Loosely coupled systems được thiết kế để các components độc lập. Nếu một component thất bại, phần còn lại của hệ thống có thể tiếp tục hoạt động bình thường, giảm thiểu tác động của sự thất bại.

---

## Question 03/14

### English 🇺🇸

Which tool can be used to interact with AWS services through a graphical user interface (GUI)?

- ❌ Amazon EC2
- ❌ AWS Software Development Kit (AWS SDK)
- ✅ **AWS Management Console** ← Correct
- ❌ AWS Command Line Interface (AWS CLI)

**Explanation:** The AWS Management Console is the web-based GUI that is used to interact with AWS services.

---

### Tiếng Việt 🇻🇳

Công cụ nào có thể được sử dụng để tương tác với AWS services thông qua giao diện người dùng đồ họa (GUI)?

- ❌ Amazon EC2
- ❌ AWS Software Development Kit (AWS SDK)
- ✅ **AWS Management Console** ← Đúng
- ❌ AWS Command Line Interface (AWS CLI)

**Giải thích:** AWS Management Console là GUI dựa trên web được sử dụng để tương tác với AWS services.

---

## Question 04/14

### English 🇺🇸

A software development company needs to notify the engineering team whenever a new bug is reported in their bug tracking system. Some team members need to be notified immediately, whereas others can process the bug reports later.

Which service should the software development company choose based on the requirements?

- ❌ Amazon Simple Queue Service (Amazon SQS)
- ❌ Amazon EC2
- ✅ **Amazon Simple Notification Service (Amazon SNS)** ← Correct
- ❌ Elastic Load Balancing (ELB)

**Explanation:** Amazon SNS is the better choice because it delivers notifications in real time to multiple recipients simultaneously. This suits the need for immediate notifications to engineers about new bugs.

---

### Tiếng Việt 🇻🇳

Một công ty phát triển phần mềm cần thông báo cho nhóm kỹ sư bất cứ khi nào một bug mới được báo cáo trong hệ thống theo dõi bug của họ. Một số thành viên nhóm cần được thông báo ngay lập tức, trong khi những người khác có thể xử lý các báo cáo bug sau.

Công ty phát triển phần mềm nên chọn service nào dựa trên các yêu cầu?

- ❌ Amazon Simple Queue Service (Amazon SQS)
- ❌ Amazon EC2
- ✅ **Amazon Simple Notification Service (Amazon SNS)** ← Đúng
- ❌ Elastic Load Balancing (ELB)

**Giải thích:** Amazon SNS là lựa chọn tốt hơn vì nó cung cấp notifications real-time cho nhiều người nhận đồng thời. Điều này phù hợp với nhu cầu thông báo ngay lập tức cho các kỹ sư về các bug mới.

---

## Question 05/14

### English 🇺🇸

What is the primary role of an Amazon Machine Image (AMI) when scaling applications?

- ✅ **It provides a consistent image to launch new instances.** ← Correct
- ❌ It stores backup copies of application data.
- ❌ It configures scaling policies for applications.
- ❌ It automatically manages network traffic.

**Explanation:** AMIs launch new Amazon EC2 instances with the same software configuration and settings, providing consistency.

---

### Tiếng Việt 🇻🇳

Vai trò chính của Amazon Machine Image (AMI) khi scaling applications là gì?

- ✅ **Nó cung cấp một image nhất quán để launch các instances mới.** ← Đúng
- ❌ Nó lưu trữ các bản sao lưu của dữ liệu ứng dụng.
- ❌ Nó cấu hình các chính sách scaling cho applications.
- ❌ Nó tự động quản lý network traffic.

**Giải thích:** AMIs launch các Amazon EC2 instances mới với cùng software configuration và settings, cung cấp tính nhất quán.

---

## Question 06/14

### English 🇺🇸

A startup company is building a new web application and chooses general purpose Amazon EC2 instances to host the application.

Why did they choose this instance type?

- ❌ It is designed for high storage capacity, which is needed to host large databases.
- ❌ It is specifically designed for memory-intensive applications, which is ideal for hosting a web application.
- ✅ **It provides a balanced mix of compute, memory, and networking resources while keeping costs efficient as they scale their user base.** ← Correct
- ❌ It provides the highest performance for compute-heavy tasks, such as video rendering or machine learning.

**Explanation:** General purpose instances offer a good balance of resources for various types of workloads, including web applications, making them a flexible and cost-effective choice.

---

### Tiếng Việt 🇻🇳

Một công ty khởi nghiệp đang xây dựng một web application mới và chọn general purpose Amazon EC2 instances để host application.

Tại sao họ chọn loại instance này?

- ❌ Nó được thiết kế cho high storage capacity, điều này cần thiết để host các databases lớn.
- ❌ Nó được thiết kế đặc biệt cho các applications memory-intensive, điều này lý tưởng cho việc host một web application.
- ✅ **Nó cung cấp sự kết hợp cân bằng của compute, memory và networking resources trong khi giữ chi phí hiệu quả khi họ scale user base.** ← Đúng
- ❌ Nó cung cấp hiệu suất cao nhất cho các tác vụ compute-heavy, chẳng hạn như video rendering hoặc machine learning.

**Giải thích:** General purpose instances cung cấp sự cân bằng tốt về resources cho các loại workloads khác nhau, bao gồm web applications, làm cho chúng trở thành một lựa chọn linh hoạt và hiệu quả về chi phí.

---

## Question 07/14

### English 🇺🇸

How do Amazon EC2 Auto Scaling and Elastic Load Balancing (ELB) work together in AWS?

- ✅ **Amazon EC2 Auto Scaling adjusts the number of instances, whereas ELB distributes traffic evenly across them.** ← Correct
- ❌ ELB automatically scales the EC2 instances, and Amazon EC2 Auto Scaling adjusts traffic.
- ❌ Amazon EC2 Auto Scaling handles traffic routing, whereas ELB manages instance scaling.
- ❌ They operate independently and are not connected.

**Explanation:** Amazon EC2 Auto Scaling automatically adjusts the number of EC2 instances in response to changes in demand. ELB distributes incoming traffic evenly across those instances, supporting high availability and reliability.

---

### Tiếng Việt 🇻🇳

Amazon EC2 Auto Scaling và Elastic Load Balancing (ELB) hoạt động cùng nhau trong AWS như thế nào?

- ✅ **Amazon EC2 Auto Scaling điều chỉnh số lượng instances, trong khi ELB phân phối traffic đều trên chúng.** ← Đúng
- ❌ ELB tự động scale các EC2 instances, và Amazon EC2 Auto Scaling điều chỉnh traffic.
- ❌ Amazon EC2 Auto Scaling xử lý traffic routing, trong khi ELB quản lý instance scaling.
- ❌ Chúng hoạt động độc lập và không được kết nối.

**Giải thích:** Amazon EC2 Auto Scaling tự động điều chỉnh số lượng EC2 instances để phản ứng với thay đổi trong demand. ELB phân phối incoming traffic đều trên các instances đó, hỗ trợ high availability và reliability.

---

## Question 08/14

### English 🇺🇸

Which option BEST describes how compute resources are provisioned and managed in the cloud?

- ✅ **Resources are provisioned based on demand, allowing for scaling and management.** ← Correct
- ❌ Resources must be pre-purchased and installed onsite.
- ❌ Compute resources are fixed and cannot be scaled.
- ❌ Compute resources require constant manual management.

**Explanation:** Cloud computing resources are dynamic and can be adjusted in real-time to meet changing demand, allowing for easier scaling and management.

---

### Tiếng Việt 🇻🇳

Tùy chọn nào MÔ TẢ TỐT NHẤT cách compute resources được provision và quản lý trong cloud?

- ✅ **Resources được provision dựa trên demand, cho phép scaling và quản lý.** ← Đúng
- ❌ Resources phải được mua trước và cài đặt tại chỗ.
- ❌ Compute resources là cố định và không thể scale.
- ❌ Compute resources yêu cầu quản lý thủ công liên tục.

**Giải thích:** Cloud computing resources là động và có thể được điều chỉnh real-time để đáp ứng demand thay đổi, cho phép scaling và quản lý dễ dàng hơn.

---

## Question 09/14

### English 🇺🇸

A marketing agency is developing a new web application and expects steady growth, but is unsure of traffic in the early months. They want flexibility without a long-term commitment.

Which pricing option should they use?

- ❌ Reserved Instances
- ❌ Savings Plans
- ❌ Spot Instances
- ✅ **On-Demand** ← Correct

**Explanation:** On-Demand pricing is ideal for starting without commitment. The customer can test and adjust based on actual usage before committing to longer-term options.

---

### Tiếng Việt 🇻🇳

Một agency marketing đang phát triển một web application mới và kỳ vọng tăng trưởng ổn định, nhưng không chắc chắn về traffic trong những tháng đầu. Họ muốn sự linh hoạt mà không có cam kết dài hạn.

Họ nên sử dụng tùy chọn pricing nào?

- ❌ Reserved Instances
- ❌ Savings Plans
- ❌ Spot Instances
- ✅ **On-Demand** ← Đúng

**Giải thích:** On-Demand pricing lý tưởng để bắt đầu mà không có cam kết. Khách hàng có thể test và điều chỉnh dựa trên usage thực tế trước khi cam kết với các tùy chọn dài hạn hơn.

---

## Question 10/14

### English 🇺🇸

A university research team is running climate modeling simulations that require substantial CPU power to process complex algorithms and analyze large datasets.

Why are compute optimized Amazon EC2 instances ideal for this task?

- ✅ **They are ideal for tasks that require significant CPU power to perform computations.** ← Correct
- ❌ They are designed for workloads that require a high amount of memory to process large datasets efficiently.
- ❌ They provide high storage throughput, making them ideal for tasks that require fast data retrieval and storage for large datasets.
- ❌ They are optimized for handling tasks that require hardware accelerators.

**Explanation:** Compute optimized instances are specifically designed for compute-heavy workloads like simulations, offering higher CPU performance to process complex algorithms and analyze large datasets.

---

### Tiếng Việt 🇻🇳

Một nhóm nghiên cứu đại học đang chạy các mô phỏng mô hình khí hậu yêu cầu CPU power đáng kể để xử lý các thuật toán phức tạp và phân tích các datasets lớn.

Tại sao compute optimized Amazon EC2 instances lý tưởng cho tác vụ này?

- ✅ **Chúng lý tưởng cho các tác vụ yêu cầu CPU power đáng kể để thực hiện computations.** ← Đúng
- ❌ Chúng được thiết kế cho các workloads yêu cầu một lượng memory cao để xử lý các datasets lớn hiệu quả.
- ❌ Chúng cung cấp high storage throughput, làm cho chúng lý tưởng cho các tác vụ yêu cầu truy xuất và lưu trữ dữ liệu nhanh cho các datasets lớn.
- ❌ Chúng được tối ưu hóa để xử lý các tác vụ yêu cầu hardware accelerators.

**Giải thích:** Compute optimized instances được thiết kế đặc biệt cho các workloads compute-heavy như simulations, cung cấp CPU performance cao hơn để xử lý các thuật toán phức tạp và phân tích các datasets lớn.

---

## Question 11/14

### English 🇺🇸

How does Amazon EC2 Auto Scaling work in AWS?

- ✅ **Amazon EC2 Auto Scaling automatically adds or removes instances based on performance data and application metrics.** ← Correct
- ❌ Amazon EC2 Auto Scaling adds instances when the workload is too high, but it does not scale down when demand decreases.
- ❌ Amazon EC2 Auto Scaling adjusts the instance type but does not change the number of instances.
- ❌ Amazon EC2 Auto Scaling requires manual intervention to add or remove instances based on traffic.

**Explanation:** For optimal resource usage, Amazon EC2 Auto Scaling automatically adjusts the number of instances based on performance metrics.

---

### Tiếng Việt 🇻🇳

Amazon EC2 Auto Scaling hoạt động trong AWS như thế nào?

- ✅ **Amazon EC2 Auto Scaling tự động thêm hoặc loại bỏ instances dựa trên performance data và application metrics.** ← Đúng
- ❌ Amazon EC2 Auto Scaling thêm instances khi workload quá cao, nhưng nó không scale down khi demand giảm.
- ❌ Amazon EC2 Auto Scaling điều chỉnh instance type nhưng không thay đổi số lượng instances.
- ❌ Amazon EC2 Auto Scaling yêu cầu can thiệp thủ công để thêm hoặc loại bỏ instances dựa trên traffic.

**Giải thích:** Để sử dụng resources tối ưu, Amazon EC2 Auto Scaling tự động điều chỉnh số lượng instances dựa trên performance metrics.

---

## Question 12/14

### English 🇺🇸

What does multi-tenancy refer to in the context of Amazon EC2?

- ❌ Instances that are restricted to one geographical region
- ✅ **Multiple users sharing the same EC2 instance while maintaining isolation** ← Correct
- ❌ Each EC2 instance running in its own private network
- ❌ EC2 instances dedicated to individual clients

**Explanation:** Multi-tenancy in Amazon EC2 refers to multiple tenants, or users, sharing the same instance but maintaining isolation for security and performance.

---

### Tiếng Việt 🇻🇳

Multi-tenancy đề cập đến điều gì trong ngữ cảnh của Amazon EC2?

- ❌ Các instances bị hạn chế ở một khu vực địa lý
- ✅ **Nhiều users chia sẻ cùng một EC2 instance trong khi duy trì isolation** ← Đúng
- ❌ Mỗi EC2 instance chạy trong network riêng của nó
- ❌ EC2 instances được dành riêng cho các clients cá nhân

**Giải thích:** Multi-tenancy trong Amazon EC2 đề cập đến nhiều tenants, hoặc users, chia sẻ cùng một instance nhưng duy trì isolation cho security và performance.

---

## Question 13/14

### English 🇺🇸

A manufacturing company is running a set of predictable workloads for the next 3 years and wants to optimize costs.

Which option should they choose?

- ❌ Spot Instances
- ✅ **Reserved Instances** ← Correct
- ❌ Dedicated Hosts
- ❌ On-Demand

**Explanation:** Reserved Instances offer up to a 75 percent discount for steady-state, predictable workloads when committing to a 1-year or 3-year term, making them the most cost-effective option.

---

### Tiếng Việt 🇻🇳

Một công ty sản xuất đang chạy một bộ workloads có thể dự đoán được trong 3 năm tới và muốn tối ưu hóa chi phí.

Họ nên chọn tùy chọn nào?

- ❌ Spot Instances
- ✅ **Reserved Instances** ← Đúng
- ❌ Dedicated Hosts
- ❌ On-Demand

**Giải thích:** Reserved Instances cung cấp giảm giá lên đến 75% cho các workloads steady-state, có thể dự đoán được khi cam kết với thời hạn 1 năm hoặc 3 năm, làm cho chúng trở thành tùy chọn hiệu quả nhất về chi phí.

---

## Question 14/14

### English 🇺🇸

A media company is working on a project that involves rendering complex visual effects and simulations. The rendering process requires significant computational power and hardware accelerators to handle the intense workload efficiently.

Which Amazon EC2 instance type would be the BEST choice for this task?

- ✅ **Accelerated computing** ← Correct
- ❌ Memory optimized
- ❌ General purpose
- ❌ Compute optimized

**Explanation:** Accelerated computing instances are equipped with GPUs and hardware accelerators, making them ideal for rendering tasks that require high computational power and efficiency.

---

### Tiếng Việt 🇻🇳

Một công ty truyền thông đang làm việc trên một dự án liên quan đến rendering các hiệu ứng hình ảnh và mô phỏng phức tạp. Quá trình rendering yêu cầu computational power đáng kể và hardware accelerators để xử lý workload cường độ cao một cách hiệu quả.

Loại Amazon EC2 instance nào sẽ là LỰA CHỌN TỐT NHẤT cho tác vụ này?

- ✅ **Accelerated computing** ← Đúng
- ❌ Memory optimized
- ❌ General purpose
- ❌ Compute optimized

**Giải thích:** Accelerated computing instances được trang bị GPUs và hardware accelerators, làm cho chúng lý tưởng cho các tác vụ rendering yêu cầu computational power cao và hiệu quả.

---

## Kết quả

Sau khi hoàn thành bài kiểm tra, hãy đếm số câu trả lời đúng của bạn:

- **12-14 câu đúng (80-100%)**: ✅ **Xuất sắc!** Bạn đã vượt qua Module 2!
- **10-11 câu đúng (71-79%)**: ⚠️ Gần đạt! Hãy xem lại các bài học và thử lại.
- **Dưới 10 câu đúng (dưới 71%)**: 📚 Hãy xem lại các bài học trong Module 2 và thử lại.

**Lưu ý:** Bạn có thể làm lại bài kiểm tra không giới hạn số lần cho đến khi đạt yêu cầu.
