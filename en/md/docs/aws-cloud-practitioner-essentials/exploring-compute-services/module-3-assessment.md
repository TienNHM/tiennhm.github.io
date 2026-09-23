# M03.05 - Module 3 Assessment

> Nguồn: https://tiennhm.io.vn/en/docs/aws-cloud-practitioner-essentials/exploring-compute-services/module-3-assessment
> Bài kiểm tra Module 3 - Exploring Compute Services. Bạn phải đạt 80% trở lên để vượt qua module này. Bạn có thể làm lại không giới hạn số lần.

> **Info: 📝 Thông tin Bài kiểm tra**
>
> **Yêu cầu:** Bạn phải đạt **80% trở lên** (7/8 câu đúng) để vượt qua module này.
>
> **Số lần làm lại:** Không giới hạn
>
> **Chúc may mắn!** 🍀
---

## Question 01/08

### English 🇺🇸

What is the customer responsible for managing in a serverless service like AWS Lambda?

- ✅ **The application code** ← Correct
- ❌ The operating system, network configuration, and application stack
- ❌ Nothing—AWS manages everything
- ❌ The physical servers and networking hardware

**Explanation:** With serverless services like Lambda, customers are responsible for the application code. AWS manages the infrastructure, scaling, and availability.

---

### Tiếng Việt 🇻🇳

Khách hàng chịu trách nhiệm quản lý điều gì trong một serverless service như AWS Lambda?

- ✅ **Application code** ← Đúng
- ❌ Operating system, network configuration, và application stack
- ❌ Không có gì—AWS quản lý tất cả
- ❌ Physical servers và networking hardware

**Giải thích:** Với serverless services như Lambda, khách hàng chịu trách nhiệm cho application code. AWS quản lý infrastructure, scaling, và availability.

---

## Question 02/08

### English 🇺🇸

A company is launching a containerized photo application and has built the container image, which needs to be stored securely. They plan to use Kubernetes for orchestration and prefer not to manage any servers.

Which combination of AWS services BEST fits their needs?

- ❌ Amazon Elastic Container Registry (Amazon ECR), Amazon Elastic Container Service (Amazon ECS), and Amazon EC2
- ❌ Amazon Elastic Container Registry (Amazon ECR), AWS Lambda, and Amazon EC2
- ✅ **Amazon Elastic Container Registry (Amazon ECR), Amazon Elastic Kubernetes Service (Amazon EKS), and AWS Fargate** ← Correct
- ❌ Amazon S3, Amazon Elastic Container Service (Amazon ECS), and Amazon EC2

**Explanation:** Amazon ECR stores container images, Amazon EKS handles Kubernetes orchestration, and AWS Fargate runs containers without server management. This combination offers seamless orchestration with no infrastructure maintenance.

---

### Tiếng Việt 🇻🇳

Một công ty đang launch một containerized photo application và đã build container image, cần được lưu trữ securely. Họ có kế hoạch sử dụng Kubernetes cho orchestration và prefer không quản lý bất kỳ servers nào.

Sự kết hợp nào của AWS services PHÙ HỢP NHẤT với nhu cầu của họ?

- ❌ Amazon Elastic Container Registry (Amazon ECR), Amazon Elastic Container Service (Amazon ECS), và Amazon EC2
- ❌ Amazon Elastic Container Registry (Amazon ECR), AWS Lambda, và Amazon EC2
- ✅ **Amazon Elastic Container Registry (Amazon ECR), Amazon Elastic Kubernetes Service (Amazon EKS), và AWS Fargate** ← Đúng
- ❌ Amazon S3, Amazon Elastic Container Service (Amazon ECS), và Amazon EC2

**Giải thích:** Amazon ECR lưu trữ container images, Amazon EKS xử lý Kubernetes orchestration, và AWS Fargate chạy containers mà không cần server management. Sự kết hợp này cung cấp seamless orchestration mà không cần infrastructure maintenance.

---

## Question 03/08

### English 🇺🇸

A freelance developer is building a blog for a client with minimal traffic. They want a basic, cost-effective solution that includes storage and compute in one package, without having to deal with complex configurations or scaling concerns.

Which AWS service is the BEST fit?

- ✅ **Amazon Lightsail** ← Correct
- ❌ AWS Lambda
- ❌ AWS Fargate
- ❌ AWS Batch

**Explanation:** Lightsail is great for small projects like blogs and basic websites, and it offers predictable pricing and ease of use.

---

### Tiếng Việt 🇻🇳

Một freelance developer đang xây dựng một blog cho client với minimal traffic. Họ muốn một basic, cost-effective solution bao gồm storage và compute trong một package, mà không cần xử lý complex configurations hoặc scaling concerns.

AWS service nào PHÙ HỢP NHẤT?

- ✅ **Amazon Lightsail** ← Đúng
- ❌ AWS Lambda
- ❌ AWS Fargate
- ❌ AWS Batch

**Giải thích:** Lightsail tuyệt vời cho các projects nhỏ như blogs và basic websites, và nó cung cấp predictable pricing và ease of use.

---

## Question 04/08

### English 🇺🇸

Which scenario is the BEST fit for using AWS Lambda?

- ❌ Running a large, high-performance computing workload that takes several hours to complete
- ✅ **Automatically processing images as users upload them to an Amazon S3 bucket** ← Correct
- ❌ Running a relational database that needs complex queries and frequent connections
- ❌ Hosting a high-traffic web server that requires full control over the operating system (OS)

**Explanation:** Lambda is perfect for this event-driven use case. It can run code in response to uploads and scale automatically based on the number of events.

---

### Tiếng Việt 🇻🇳

Scenario nào PHÙ HỢP NHẤT cho việc sử dụng AWS Lambda?

- ❌ Chạy một large, high-performance computing workload mất vài giờ để hoàn thành
- ✅ **Tự động xử lý hình ảnh khi users upload chúng vào một Amazon S3 bucket** ← Đúng
- ❌ Chạy một relational database cần complex queries và frequent connections
- ❌ Hosting một high-traffic web server yêu cầu full control over operating system (OS)

**Giải thích:** Lambda hoàn hảo cho event-driven use case này. Nó có thể chạy code để phản ứng với uploads và scale tự động dựa trên số lượng events.

---

## Question 05/08

### English 🇺🇸

A development team at an e-commerce company is working on a new website. The application runs fine on their local machines, but when they attempt to deploy it to a staging environment, it does not work as expected. The team wants to make sure that the application runs consistently across all development, testing, and production environments going forward.

Which solution should the team use to make sure that the application runs the same across all environments?

- ❌ Use Amazon EC2 to manually recreate the development environment.
- ❌ Set up separate environments for each operating system.
- ❌ Use different versions of the applications for different environments.
- ✅ **Package the application in a container that includes all dependencies.** ← Correct

**Explanation:** Containers bundle the application, runtime, and dependencies together, providing consistency across all environments from development to production.

---

### Tiếng Việt 🇻🇳

Một development team tại một e-commerce company đang làm việc trên một website mới. Application chạy tốt trên local machines của họ, nhưng khi họ cố gắng deploy nó đến staging environment, nó không hoạt động như mong đợi. Team muốn đảm bảo rằng application chạy nhất quán trên tất cả development, testing, và production environments trong tương lai.

Giải pháp nào team nên sử dụng để đảm bảo rằng application chạy giống nhau trên tất cả environments?

- ❌ Sử dụng Amazon EC2 để manually recreate development environment.
- ❌ Thiết lập separate environments cho mỗi operating system.
- ❌ Sử dụng different versions của applications cho different environments.
- ✅ **Package application trong một container bao gồm tất cả dependencies.** ← Đúng

**Giải thích:** Containers bundle application, runtime, và dependencies cùng nhau, cung cấp consistency trên tất cả environments từ development đến production.

---

## Question 06/08

### English 🇺🇸

A development team at a travel company has stored their hotel booking system's container image in Amazon Elastic Container Registry (Amazon ECR) and is ready to deploy it. They need a service that can automatically start and stop containers based on traffic, scale up or down with demand, and monitor the health of the system.

Which service does the team need next?

- ✅ **An orchestration service like Amazon Elastic Container Service (Amazon ECS) or Amazon Elastic Kubernetes Service (Amazon EKS)** ← Correct
- ❌ A virtual machine to run the container manually
- ❌ Amazon EC2 with auto scaling
- ❌ AWS Lambda

**Explanation:** Amazon ECS or Amazon EKS can automatically scale containers, handle health checks, and manage their lifecycle based on traffic demand, which fits the team's requirements.

---

### Tiếng Việt 🇻🇳

Một development team tại một travel company đã lưu trữ container image của hotel booking system trong Amazon Elastic Container Registry (Amazon ECR) và sẵn sàng deploy nó. Họ cần một service có thể tự động start và stop containers dựa trên traffic, scale up hoặc down với demand, và monitor health của system.

Service nào team cần tiếp theo?

- ✅ **Một orchestration service như Amazon Elastic Container Service (Amazon ECS) hoặc Amazon Elastic Kubernetes Service (Amazon EKS)** ← Đúng
- ❌ Một virtual machine để chạy container manually
- ❌ Amazon EC2 với auto scaling
- ❌ AWS Lambda

**Giải thích:** Amazon ECS hoặc Amazon EKS có thể tự động scale containers, xử lý health checks, và quản lý lifecycle của chúng dựa trên traffic demand, phù hợp với requirements của team.

---

## Question 07/08

### English 🇺🇸

A pharmaceutical research company needs to run thousands of simulations to analyze protein folding. These compute-heavy tasks are run in parallel and do not require real-time interaction. The company wants the jobs to be automatically scheduled and scaled based on computing demand.

Which AWS service BEST fits this workload?

- ❌ AWS Elastic Beanstalk
- ❌ Amazon Lightsail
- ✅ **AWS Batch** ← Correct
- ❌ AWS Lambda

**Explanation:** AWS Batch is designed for large-scale batch workloads and can automatically manage and scale compute resources for job queues.

---

### Tiếng Việt 🇻🇳

Một pharmaceutical research company cần chạy hàng nghìn simulations để phân tích protein folding. Các compute-heavy tasks này được chạy song song và không yêu cầu real-time interaction. Company muốn các jobs được tự động schedule và scale dựa trên computing demand.

AWS service nào PHÙ HỢP NHẤT với workload này?

- ❌ AWS Elastic Beanstalk
- ❌ Amazon Lightsail
- ✅ **AWS Batch** ← Đúng
- ❌ AWS Lambda

**Giải thích:** AWS Batch được thiết kế cho large-scale batch workloads và có thể tự động quản lý và scale compute resources cho job queues.

---

## Question 08/08

### English 🇺🇸

A developer is launching a new microservice and wants to focus only on writing and deploying code. They do not want to manage servers, handle scaling, or worry about infrastructure availability.

Which AWS service model is BEST for this use case?

- ❌ Hybrid cloud
- ❌ Unmanaged
- ❌ On premises
- ✅ **Serverless** ← Correct

**Explanation:** With serverless services, customers can focus solely on writing and deploying code. AWS fully manages infrastructure, scaling, and availability, so customers do not have to worry about managing servers or capacity.

---

### Tiếng Việt 🇻🇳

Một developer đang launch một microservice mới và muốn chỉ focus vào việc viết và deploy code. Họ không muốn quản lý servers, xử lý scaling, hoặc lo lắng về infrastructure availability.

AWS service model nào TỐT NHẤT cho use case này?

- ❌ Hybrid cloud
- ❌ Unmanaged
- ❌ On premises
- ✅ **Serverless** ← Đúng

**Giải thích:** Với serverless services, khách hàng có thể chỉ focus vào việc viết và deploy code. AWS quản lý hoàn toàn infrastructure, scaling, và availability, vì vậy khách hàng không phải lo lắng về việc quản lý servers hoặc capacity.

---

## Kết quả

Sau khi hoàn thành bài kiểm tra, hãy đếm số câu trả lời đúng của bạn:

- **7-8 câu đúng (88-100%)**: ✅ **Xuất sắc!** Bạn đã vượt qua Module 3!
- **6 câu đúng (75%)**: ⚠️ Gần đạt! Hãy xem lại các bài học và thử lại.
- **Dưới 6 câu đúng (dưới 75%)**: 📚 Hãy xem lại các bài học trong Module 3 và thử lại.

**Lưu ý:** Bạn có thể làm lại bài kiểm tra không giới hạn số lần cho đến khi đạt yêu cầu.
