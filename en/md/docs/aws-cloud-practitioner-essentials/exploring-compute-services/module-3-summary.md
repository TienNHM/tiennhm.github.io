# M03.06 - Module 3 Summary

> Nguồn: https://tiennhm.io.vn/en/docs/aws-cloud-practitioner-essentials/exploring-compute-services/module-3-summary
> Tổng kết Module 3 - Exploring Compute Services. Ôn tập lại các khái niệm về serverless computing, AWS Lambda, containers, orchestration services, và các additional compute services. Tìm hiểu các bước tiếp theo và tài nguyên học tập.

Chúc mừng bạn đã hoàn thành **Module 3 - Exploring Compute Services**! 🎉

Module này đã cung cấp cho bạn hiểu biết thực tế về AWS compute services, để bạn có thể chọn đúng tools cho applications của mình. Bạn đã học khi nào sử dụng fully managed options như Lambda hoặc Fargate, và khi nào full control với Amazon EC2 có ý nghĩa. Bạn đã khám phá cách containers giải quyết vấn đề deployment consistency và cách AWS services, như Amazon ECS và Amazon EKS, đơn giản hóa việc quản lý và scaling containerized applications. Bạn cũng đã khám phá các services như Elastic Beanstalk, AWS Batch, Lightsail, và Outposts, và cách mỗi service hỗ trợ specific use cases, từ basic web hosting đến large-scale batch processing hoặc hybrid cloud environments.

## 📚 Tổng kết nội dung đã học

### 1. Introduction to Serverless Computing

**Serverless Computing:**
> Serverless computing cho phép bạn chạy applications mà không cần quản lý underlying infrastructure. AWS quản lý tất cả provisioning, scaling, và maintenance.

**Các mức độ Service Management:**
- **Unmanaged Services** (ví dụ: Amazon EC2): Full control, bạn quản lý OS, patches, scaling
- **Managed Services** (ví dụ: ELB, SNS, SQS): AWS quản lý infrastructure, bạn cấu hình service
- **Fully-Managed/Serverless Services** (ví dụ: AWS Lambda): AWS quản lý tất cả, bạn chỉ focus vào code

**Shared Responsibility Model:**
- Với serverless, bạn chỉ chịu trách nhiệm cho application code
- AWS quản lý infrastructure, scaling, availability, và security

### 2. AWS Lambda

**AWS Lambda:**
> Lambda là một serverless compute service chạy code để phản ứng với events mà không cần provision hoặc quản lý servers.

**Key Components:**
- **Lambda Functions**: Code được đóng gói và deploy
- **Triggers**: Events khởi động functions (S3, SQS, API Gateway, v.v.)
- **Runtimes**: Language-specific environments (Java, Python, Node.js, v.v.)
- **Automatic Scaling**: Tự động scale dựa trên số lượng requests

**Use Cases:**
- Real-time image processing
- Event-driven applications
- Automated workflows
- Microservices architectures

**Benefits:**
- ✅ Pay only for compute time used (millisecond billing)
- ✅ Automatic scaling
- ✅ No server management
- ✅ High availability

### 3. Containers and Orchestration on AWS

**Containers:**
> Containers package application và tất cả dependencies thành một single, portable unit, đảm bảo consistency across environments.

**Containers vs VMs:**
- **Containers**: Chia sẻ host OS, nhẹ hơn, khởi động nhanh hơn
- **VMs**: Mỗi VM có Guest OS riêng, resource-intensive hơn

**AWS Container Services:**

1. **Amazon ECS** (Elastic Container Service)
   - Container orchestration service của AWS
   - Launch types: EC2 hoặc Fargate
   - Streamlined và integrated với AWS

2. **Amazon EKS** (Elastic Kubernetes Service)
   - Fully managed Kubernetes service
   - Launch types: EC2 hoặc Fargate
   - Kubernetes flexibility và control

3. **Amazon ECR** (Elastic Container Registry)
   - Container registry để lưu trữ và quản lý images
   - OCI-compliant images
   - Integration với ECS và EKS

4. **AWS Fargate**
   - Serverless compute engine cho containers
   - Không cần quản lý servers
   - Works với ECS và EKS

**Benefits của Containers:**
- ✅ Deployment consistency
- ✅ Portability
- ✅ Resource efficiency
- ✅ Faster start times

### 4. Additional Compute Services

**AWS Elastic Beanstalk:**
- Fully managed service để deploy và scale web applications
- Automatic infrastructure provisioning
- Multi-language support
- Full control over underlying resources

**AWS Batch:**
- Fully managed service cho large-scale batch computing
- Automatic resource management và scaling
- Use cases: Scientific computing, financial analysis, ML training

**Amazon Lightsail:**
- Simplified VPS service với predictable pricing
- All-in-one solution (VPS, storage, databases, networking)
- Ideal cho small businesses và developers

**AWS Outposts:**
- Hybrid cloud solution
- Extends AWS services đến on-premises
- Consistent experience across environments
- Low latency và data residency

## 🎯 Key Takeaways

1. **Serverless Computing** cho phép focus vào code, không phải infrastructure
2. **AWS Lambda** lý tưởng cho event-driven, short-duration tasks
3. **Containers** giải quyết deployment consistency issues
4. **Container Orchestration** (ECS/EKS) đơn giản hóa việc quản lý containers ở scale
5. **Fargate** cung cấp serverless compute cho containers
6. **Purpose-built Services** (Beanstalk, Batch, Lightsail, Outposts) hỗ trợ specific use cases

## 🚀 Next Steps

Bây giờ bạn đã hiểu về các compute services của AWS, bạn có thể:

1. **Thực hành với AWS Console**
   - Tạo Lambda functions
   - Deploy containers với ECS hoặc EKS
   - Sử dụng Elastic Beanstalk để deploy web applications

2. **Khám phá các services khác**
   - Module 4: Going Global
   - Networking services
   - Storage services

3. **Xây dựng applications**
   - Kết hợp Lambda với các AWS services
   - Deploy containerized applications
   - Sử dụng serverless architectures

4. **Tối ưu hóa costs**
   - Chọn đúng service cho use case
   - Sử dụng serverless cho event-driven workloads
   - Leverage containers cho consistency

## 📖 Resources

Để tìm hiểu thêm về các tài liệu được đề cập trong module này, hãy chọn các resource links trong bảng sau:

| Resource Link | Description |
|--------------|-------------|
| [Containers on AWS](https://aws.amazon.com/containers/services/) | Trang AWS Containers Services cung cấp tổng quan về AWS container offerings, bao gồm services cho container image storage, orchestration, và compute. Các offerings này được thiết kế để streamline deployment và management của containerized applications. |
| [Amazon Elastic Container Registry](https://aws.amazon.com/ecr/) | Amazon ECR là một fully managed service để lưu trữ, quản lý, và deploy container images securely ở scale. |
| [Amazon Elastic Container Service](https://aws.amazon.com/ecs/) | Amazon ECS là một fully managed service streamlines deployment, management, và scaling của containerized applications trên AWS. |
| [Amazon Elastic Kubernetes Service](https://aws.amazon.com/eks/) | Amazon EKS là một fully managed Kubernetes service streamlines running Kubernetes clusters trên AWS và on premises. Nó tự động hóa infrastructure management và tích hợp với AWS networking, security, và storage services. |
| [AWS Fargate](https://aws.amazon.com/fargate/) | Fargate là một serverless compute engine để chạy containers mà không cần quản lý servers. Nó được tích hợp với Amazon ECS và Amazon EKS. |
| [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/) | Elastic Beanstalk là một fully managed service để deploy và scale web applications mà không cần quản lý infrastructure. |
| [AWS Batch](https://aws.amazon.com/batch/) | AWS Batch là một fully managed service để efficiently chạy large-scale batch computing jobs trên AWS. |
| [What is Amazon Lightsail?](https://docs.aws.amazon.com/lightsail/latest/userguide/what-is-amazon-lightsail.html) | Lightsail là một simplified cloud platform offering VPS, containers, và databases với predictable pricing. |
| [What is AWS Outposts?](https://docs.aws.amazon.com/outposts/latest/server-userguide/what-is-outposts.html) | AWS Outposts mở rộng AWS infrastructure và services đến on-premises locations cho low-latency, local data processing. |
| [Choosing a modern application strategy](https://docs.aws.amazon.com/decision-guides/latest/modern-apps-strategy-on-aws-how-to-choose/modern-apps-strategy-on-aws-how-to-choose.html) | AWS Decision Guide cho Modern Application Strategy giúp organizations xác định development approach phù hợp nhất—serverless hoặc Kubernetes—dựa trên operational model, team structure, và workload requirements của họ. |

## 🎓 Kết luận

Module 3 đã cung cấp cho bạn nền tảng vững chắc về các compute services của AWS. Bạn đã học cách:

- Phân biệt giữa unmanaged, managed, và serverless services
- Sử dụng AWS Lambda cho event-driven applications
- Deploy và quản lý containers với ECS và EKS
- Chọn purpose-built services phù hợp cho specific use cases

Những kiến thức này sẽ giúp bạn đưa ra quyết định đúng đắn khi chọn compute services cho applications của mình, tối ưu hóa costs, và tăng tốc độ innovation.

**Chúc bạn thành công với Module 4!** 🚀
