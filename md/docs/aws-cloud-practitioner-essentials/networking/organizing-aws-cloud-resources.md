# M05.02 - Organizing AWS Cloud Resources

> Nguồn: https://tiennhm.io.vn/docs/aws-cloud-practitioner-essentials/networking/organizing-aws-cloud-resources
> Tìm hiểu cách tổ chức resources trong AWS Cloud với Amazon VPC, Internet Gateway, Virtual Private Gateway, và VPN connections. Khám phá benefits của VPC và cách thiết lập boundaries cho resources.

Trong bài học này, bạn sẽ khám phá thêm các components trong một VPC. Cụ thể, bạn sẽ học thêm về cách organize resources của bạn trong cloud bằng cách sử dụng boundaries và subnets. Bạn cũng sẽ học thêm về cách control access bằng cách sử dụng gateways.

## Mục tiêu học tập

Sau khi hoàn thành bài học này, bạn sẽ có thể:

- ✅ Định nghĩa virtual private gateway là gì và nó làm gì
- ✅ Xác định core components của một VPC
- ✅ Định nghĩa internet gateway là gì và nó làm gì
- ✅ Hiểu sự khác biệt giữa Internet Gateway và Virtual Private Gateway
- ✅ Hiểu về VPN connections và AWS Direct Connect

## Organizing Resources trong AWS Cloud

Hãy tưởng tượng hàng triệu customers sử dụng AWS services. Cũng hãy tưởng tượng hàng triệu resources mà các customers này đã tạo, chẳng hạn như Amazon EC2 instances. **Không có boundaries xung quanh tất cả các resources này, network traffic có thể flow giữa chúng một cách unrestricted.**

**Trong phần sau, bạn sẽ học về hai components của AWS Cloud:**
1. **Amazon Virtual Private Cloud (VPC)**
2. **Gateways để connect resources của bạn**

## Establishing Boundaries around AWS Resources

Khi organizing resources của bạn trong AWS Cloud, bạn cần có thể group certain functions together và isolate chúng từ public, hoặc make chúng available đến public. Bạn đã được giới thiệu về những gì Amazon VPCs làm. Tiếp theo, bạn sẽ review các benefits.

## Amazon Virtual Private Cloud (VPC)

**Để reiterate, một VPC, hoặc virtual private cloud, là essentially private network của bạn trong AWS.** Khi bạn sử dụng một VPC, bạn có thể define private IP range của bạn cho AWS resources của bạn và place things, như EC2 instances và elastic load balancers, bên trong VPC của bạn.

### Benefits của Amazon VPC

**Với Amazon VPC, bạn có thể provision một isolated section của AWS Cloud.** Trong isolated section này, bạn có thể launch resources trong một virtual network mà bạn define. Nó provides **three main benefits**:

#### 1. Increase Security (Tăng cường bảo mật)

**Amazon VPC helps increase security** vì bạn có thể:
- 🔒 **Secure và monitor connections** - Bảo mật và giám sát kết nối
- 🛡️ **Screen traffic** - Kiểm tra lưu lượng
- 🚫 **Restrict instance access** - Hạn chế quyền truy cập instance

**Amazon VPC gives bạn full control** over resource placement, connectivity, và security của bạn.

#### 2. Save Time (Tiết kiệm thời gian)

**Convenience của việc sử dụng Amazon VPC** có nghĩa là bạn sẽ spend less time:
- ⚙️ Setting up virtual network
- 🔧 Managing virtual network
- ✅ Validating virtual network

**Khi so sánh với on-premises network management**, Amazon VPC tiết kiệm đáng kể thời gian.

#### 3. Control Environment (Kiểm soát môi trường)

**Amazon VPC provides full control** over:
- 📍 **Resource placement** - Vị trí tài nguyên
- 🔗 **Connectivity** - Kết nối
- 🔒 **Security** - Bảo mật

## Subnets

**Bây giờ, bạn không chỉ throw resources của bạn vào một big VPC network space và sau đó move on.** Thay vào đó, bạn place chúng vào different specific subnets.

**Subnets là chunks của IP addresses trong VPC của bạn** mà bạn có thể sử dụng để group resources together. **Subnets, cùng với networking rules mà chúng ta sẽ cover sau, control whether resources là either publicly hoặc privately available.**

**Trong một Amazon VPC, bạn có thể organize resources của bạn thành subsections hoặc subnets.** A subnet là một section của Amazon VPC có thể contain resources, chẳng hạn như Amazon EC2 instances. Bạn sẽ học thêm về subnets trong bài học tiếp theo.

## Public vs Private Access

**Ý tưởng về public so với private access đến resources là super important.**

### Public-Facing Resources

**Đối với một số VPCs, bạn có thể có internet-facing resources** mà public nên có thể reach, như:
- 🌐 **Public website** - Trang web công cộng
- ⚖️ **Load balancer** - Cân bằng tải

### Private Resources

**Trong các scenarios khác, bạn có thể có resources** mà bạn chỉ muốn reachable nếu ai đó đã logged vào private network của bạn. Điều này có thể là:
- 🏢 **Internal services** - Các dịch vụ nội bộ, như HR application
- 💾 **Backend database** - Cơ sở dữ liệu backend

## Connecting Resources với Internet Gateway

**Để allow public traffic từ internet đến access VPC của bạn, bạn attach một internet gateway đến VPC.**

### Định nghĩa Internet Gateway

**An internet gateway là một connection giữa một VPC và internet.** Bạn có thể think of internet gateway như being similar đến một doorway mà customers sử dụng để enter coffee shop.

**Coffee Shop Analogy:**
- **Without a front door**, customers không thể get in và order coffee của họ
- **Vì vậy, bạn install một entrance**, và people có thể enter và exit khi coming và going từ shop
- **Front door trong example này là like một internet gateway**
- **Without it, no one có thể reach resources placed bên trong VPC của bạn**

### Đặc điểm của Internet Gateway

- 🌐 **Public access** - Cho phép public internet access
- 🚪 **Two-way traffic** - Traffic có thể flow vào và ra
- 🔓 **Open doorway** - Giống như một doorway mở đến public
- 📍 **Attached to VPC** - Được attach đến VPC

## Virtual Private Gateways

**Điều gì xảy ra nếu bạn có một VPC bao gồm chỉ private resources?** Ví dụ sau shows cách một virtual private gateway hoạt động.

### VPN Connection Concept

**Bạn có thể think of internet như road giữa home của bạn và coffee shop.** Nó là open và accessible đến anyone. Bạn muốn một way để protect traffic bạn send trên internet từ public, internet service providers, và others có thể đang trying để track hoặc intercept nó. **Đây là nơi một virtual private network (VPN) connection comes in.**

**VPN creates một connection** mà là more like một secure tunnel through internet. **Sử dụng encryption, nó hides và protects everything bạn send và receive từ outside eyes.**

### Định nghĩa Virtual Private Gateway

**A virtual private gateway là component trong AWS Cloud** mà makes it possible để bạn connect protected traffic này đến enter VPC. **Với một VPN connection, data của bạn travels privately và safely, hidden từ others sử dụng cùng route.**

**Với một virtual private gateway, bạn có thể establish một VPN connection** giữa VPC của bạn và một private network, chẳng hạn như:
- 🏢 **On-premises data center** - Trung tâm dữ liệu tại chỗ
- 🏛️ **Internal corporate network** - Mạng công ty nội bộ

**A virtual private gateway allows traffic vào VPC chỉ nếu nó đang coming từ một approved network.**

### Coffee Shop Analogy: Private Corporate Office

**Để relate điều này back đến coffee shop**, điều này sẽ là like nếu coffee shop được located bên trong một private corporate office building. **Nếu tôi muốn go get coffee, tôi phải badge in để verify identity của tôi.** Then tôi có thể access internal coffee shop mà chỉ people với access đến building có thể sử dụng.

**Vì vậy, nếu bạn muốn establish một encrypted VPN connection đến private internal AWS resources của bạn, bạn cần attach một virtual private gateway đến VPC của bạn.**

### Limitations của VPN

**Bây giờ, something để note về coffee shop trong private corporate office building** là office building này được shared bởi multiple companies, và có rất nhiều people làm việc ở đây. **Even though tôi có special access đến coffee shop, tôi vẫn có thể phải wait cho elevator, navigate crowded hallways, hoặc stand in line.**

**Đây là similar đến cách một VPN works.** While nó provides một secure connection, nó vẫn routes traffic của bạn through một shared network, có thể sometimes lead đến slowdowns, especially khi many people đang sử dụng nó tại cùng time. **It's not that VPN itself là slow hoặc một bad option, nhưng rather bạn có thể need higher bandwidth hoặc một dedicated line trong certain scenarios.**

## AWS Direct Connect

**Bây giờ, nếu tôi có một direct, super-secret magic doorway mà led từ studio straight vào coffee shop, tôi'd bypass any congestion và have một reliable, high throughput, coffee connection tại any time.** That sounds pretty nice. **Đây là similar idea behind wanting dedicated private connection đến AWS.**

**Với AWS, bạn có thể achieve điều đó bằng cách sử dụng một service được gọi là AWS Direct Connect.**

### Định nghĩa AWS Direct Connect

**Direct Connect lets bạn establish một completely private, dedicated fiber connection** từ data center của bạn đến AWS. **Nó ensures both security và consistent high performance.**

**Bạn work với một Direct Connect partner trong area của bạn để establish connection này** vì, like magic doorway của tôi, Direct Connect provides một physical line mà connects network của bạn đến Amazon VPC của bạn.

### Benefits của AWS Direct Connect

- 🔒 **Completely private** - Hoàn toàn riêng tư
- ⚡ **Dedicated fiber connection** - Kết nối cáp quang chuyên dụng
- 🛡️ **Security** - Bảo mật
- 📈 **Consistent high performance** - Hiệu suất cao nhất quán
- 📋 **Meet regulatory và compliance needs** - Đáp ứng nhu cầu quy định và tuân thủ
- 🚀 **Sidestep potential bandwidth issues** - Tránh các vấn đề về băng thông tiềm ẩn

## Understanding Key Acronyms

**Several của preceding networking components có similar abbreviations và are often confused.** Các components này là core building blocks mà bạn'll sử dụng trong many AWS Cloud solutions. **Để learn differences giữa các acronyms này, hãy chọn từng flashcards sau:**

### Virtual Private Cloud (VPC)

**Amazon Virtual Private Cloud**

**Amazon VPC được sử dụng để establish boundaries xung quanh AWS resources của bạn.**

- 📦 **Logically isolated section** của AWS Cloud
- 🏗️ **Virtual network** mà bạn define
- 🔒 **Control security và connectivity**

### Virtual Private Gateway (VPG)

**Virtual Private Gateway**

**A virtual private gateway allows protected internet traffic đến enter vào VPC.**

- 🔐 **Component trong AWS Cloud** cho VPN connections
- 🛡️ **Allows protected traffic** từ approved networks
- 🔒 **Only allows traffic từ approved networks**

### Virtual Private Network (VPN)

**Virtual Private Network**

**A VPN encrypts internet traffic của bạn, helping protect nó từ anyone có thể try để intercept hoặc monitor nó.**

- 🔐 **Encrypted connection** through internet
- 🛡️ **Secure tunnel** - Hides và protects traffic
- 🔒 **Protects từ interception**

## So sánh Internet Gateway và Virtual Private Gateway

| Đặc điểm | Internet Gateway | Virtual Private Gateway |
|---------|----------------|----------------------|
| **Purpose** | Public internet access | Private network access |
| **Access** | Open to public | Only from approved networks |
| **Use Case** | Public-facing resources | Private internal resources |
| **Connection** | Direct internet connection | VPN connection |
| **Analogy** | Front door của coffee shop | Badge access trong corporate building |
| **Security** | Public access | Encrypted, private access |

## Core Components của VPC

**Core components của một VPC bao gồm:**

1. **Amazon VPC** - Logically isolated section của AWS Cloud
2. **Subnets** - Sections của VPC để organize resources
3. **Internet Gateway** - Connection cho public internet access
4. **Virtual Private Gateway** - Connection cho private network access
5. **Route Tables** - Control traffic flow (sẽ học sau)
6. **Security Groups** - Firewall rules (sẽ học sau)
7. **Network ACLs** - Additional security layer (sẽ học sau)

## Test Your Skills

Một company đang setting up Amazon VPC của họ. Họ cần connect corporate data center của họ through internet với một secure connection. Họ cũng muốn đảm bảo resources được isolated từ public.

**Câu hỏi:**

**Which solution would BEST meet their needs?**

**Giải pháp nào sẽ ĐÁP ỨNG TỐT NHẤT nhu cầu của họ?**

📋 Xem các lựa chọn

- [ ] An internet gateway with a public subnet holding the resources in the Amazon VPC
  - [ ] Một internet gateway với một public subnet chứa các tài nguyên trong Amazon VPC
- [x] A virtual private gateway with a VPN connection and a private subnet in the Amazon VPC
  - [x] Một virtual private gateway với VPN connection và một private subnet trong Amazon VPC
- [ ] An internet gateway with an Amazon VPC and no subnets
  - [ ] Một internet gateway với Amazon VPC và không có subnets
- [ ] An internet gateway with an Amazon VPC and a public subnet
  - [ ] Một internet gateway với Amazon VPC và một public subnet

✅ Đáp án đúng

**Đáp án đúng:**
- ✅ **A virtual private gateway with a VPN connection and a private subnet in the Amazon VPC**

**Giải thích:**

✅ **A virtual private gateway với một VPN connection would work.** Và sử dụng một private subnet là exactly những gì họ cần!

**Requirements:**
- 🔐 **Secure connection** từ corporate data center through internet
- 🔒 **Resources isolated từ public**

**Solution:**
- ✅ **Virtual Private Gateway**: Cho phép secure, encrypted VPN connection từ corporate data center
- ✅ **VPN Connection**: Encrypts traffic và provides secure tunnel through internet
- ✅ **Private Subnet**: Isolates resources từ public internet, chỉ accessible từ approved network

**Các lựa chọn không đúng:**
- ❌ **Internet Gateway với Public Subnet**: Sẽ expose resources đến public internet, không đáp ứng requirement về isolation
- ❌ **Internet Gateway với no subnets**: Không có cách nào để organize resources
- ❌ **Internet Gateway với Public Subnet**: Tương tự, không đáp ứng requirement về private isolation

## Tóm tắt

Trong bài học này, bạn đã học về:

- ✅ **Amazon VPC**: Logically isolated section của AWS Cloud với 3 main benefits (Increase Security, Save Time, Control Environment)
- ✅ **Subnets**: Chunks của IP addresses để organize resources
- ✅ **Internet Gateway**: Connection cho public internet access (giống như front door)
- ✅ **Virtual Private Gateway**: Connection cho private network access với VPN
- ✅ **VPN Connection**: Encrypted secure tunnel through internet
- ✅ **AWS Direct Connect**: Dedicated private fiber connection cho high performance
- ✅ **Key Acronyms**: VPC, VPG, VPN - sự khác biệt và use cases

## Next Steps

Trong các bài học tiếp theo, bạn sẽ:

- Tìm hiểu chi tiết về Subnets
- Khám phá Security Groups và Network ACLs
- Học về Route Tables
- Tìm hiểu cách thiết kế network architecture cho high availability

Hãy tiếp tục với bài học tiếp theo để tìm hiểu sâu hơn về AWS Networking! 🌐
