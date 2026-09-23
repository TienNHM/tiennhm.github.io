# M04.03 - Diving Deeper into AWS Global Infrastructure

> Nguồn: https://tiennhm.io.vn/en/docs/aws-cloud-practitioner-essentials/going-global/diving-deeper-into-aws-global-infrastructure
> Tìm hiểu sâu hơn về AWS Global Infrastructure, bao gồm multi-Region và multi-AZ deployments, edge locations, CloudFront, và AWS Outposts. Khám phá mối quan hệ giữa Regions, Availability Zones, và edge locations.

Trong training này, bạn đã khám phá rằng deploying cloud resources across various AWS Regions increases high availability. High availability và fault tolerance có nghĩa là resources của bạn vẫn accessible và operational, ngay cả khi một outage xảy ra ở một trong các locations hosting resources của bạn. Trong bài học này, bạn sẽ học thêm về việc tạo highly available systems. Bạn cũng sẽ học về edge locations, một component quan trọng khác của AWS Global Infrastructure landscape.

## Mục tiêu học tập

Sau khi hoàn thành bài học này, bạn sẽ có thể:

- ✅ Mô tả key benefits của việc sử dụng multiple Regions và Availability Zones
- ✅ Định nghĩa edge locations
- ✅ Mô tả và phân biệt giữa Regions, Availability Zones, và edge locations
- ✅ Hiểu về high availability, agility, và elasticity
- ✅ Nhận biết các services sử dụng edge locations như CloudFront

## Building Redundant Architectures

Tại thời điểm này, bạn đã thấy cách user proximity, regulatory compliance, service availability, và thậm chí pricing có thể đóng vai trò là factor trong việc selecting một AWS Region. Khi nói đến infrastructure, bạn cũng muốn lên kế hoạch cho long-term stability và ít hoặc hầu như không có down time cho users của mình.

**Vì vậy, nếu infrastructure của bạn có một interruption, bạn có thể switch sang redundant hoặc backup infrastructure một cách seamless. Đây được gọi là building redundant architectures.**

## Multi-Availability Zone (Multi-AZ) Architecture

Một method cho redundancy là một architecture sử dụng **multiple Availability Zones**, hoặc **AZs**. Trong một multi-AZ architecture, nếu một AZ có interruption, không sao. Application của bạn sẽ automatically switch over sang backup AZ mà bạn đã configure.

**Thậm chí tốt hơn, nếu bạn set it up correctly, customers của bạn sẽ không nhận thấy sự khác biệt.** Vì hãy thành thật, không ai muốn favorite meme site hoặc coffee shop app của họ bị down!

### Benefits của Multi-AZ Architecture

**Multi-AZ architectures có thể assist với:**
- ⚡ **Quicker disaster recovery** - Phục hồi thảm họa nhanh hơn
- 🔄 **Improved business continuity** - Cải thiện tính liên tục kinh doanh
- 📍 **Lower latency** - Độ trễ thấp hơn
- ✅ **Compliance** - Tuân thủ các yêu cầu về compliance

## Multi-Region Architecture

Nhưng như với bất cứ điều gì trên thế giới, có nhiều cách để peel an orange. Trong thực tế, bạn có thể đi một bước xa hơn và **deploy application của bạn trong multiple AWS Regions**. Vì vậy, nếu một whole Region experiences một interruption, bạn có thể failover sang một Region khác.

**Orange you glad you chose AWS as your cloud provider?** 🍊

### Multi-Region và Multi-AZ: Giống như Pinball Machine

Một số bạn có thể nói, "Wait, wait, wait, Rudy, multi-Region và multi-AZ deployments? Điều này nghe giống như một loại pinball machine."

Vâng, đúng vậy, nó chính xác giống như một pinball machine nhưng với multi-ball bonus. Ban đầu có thể khó để juggle multiple pinballs. Chúng đang di chuyển theo các hướng khác nhau, và bạn có thể stress về việc keep track of all of them. Tuy nhiên, một khi bạn đưa ra một strategy và bạn có một số experience, nó trở nên dễ dàng hơn nhiều.

**Vì vậy, đừng lo lắng quá nhiều về việc perfecting AWS global infrastructure của bạn ngay từ đầu.** Giống như pinball, planning và executing multi-AZ và multi-Region deployments trở nên dễ dàng hơn sau khi bạn đã practice một chút. Who knows, một ngày nào đó bạn thậm chí có thể đạt được AWS infrastructure high score! 🎮

## High Availability, Agility, và Elasticity

Ngoài high availability, AWS Global Infrastructure cũng giúp bạn đạt được **agility** và **elasticity** cho business của mình. Hãy thảo luận về sự khác biệt giữa các advantages này:

### High Availability (Tính sẵn sàng cao)

**High availability** đề cập đến khả năng của một system để operate continuously mà không fail. Trong context của AWS infrastructure, nó có nghĩa là applications của bạn có thể handle failure của individual components mà không có significant downtime.

**Đặc điểm:**
- ⚡ Continuous operation - Hoạt động liên tục
- 🔄 Automatic failover - Tự động chuyển sang backup
- 🛡️ Fault tolerance - Chịu lỗi

### Agility (Tính linh hoạt)

**Agility** đề cập đến khả năng quickly adapt to changing requirements hoặc market conditions. Với AWS infrastructure tại chỗ, bạn có thể modify và deploy services rapidly.

**Đặc điểm:**
- 🚀 Rapid deployment - Triển khai nhanh chóng
- 🔧 Quick modifications - Thay đổi nhanh chóng
- 📈 Adapt to changes - Thích ứng với thay đổi

### Elasticity (Tính đàn hồi)

**Elasticity** đề cập đến khả năng của một system để scale resources up hoặc down automatically để response to changes in demand. AWS infrastructure được set up để bạn scale resources up và down on demand.

**Đặc điểm:**
- 📊 Auto-scaling - Tự động mở rộng
- 💰 Pay for what you use - Trả cho những gì bạn sử dụng
- ⚖️ Balance resources - Cân bằng tài nguyên

## Deploying Multi-Region và Multi-AZ Resources

Bạn đã học cách deploying cloud resources của bạn đến multiple Regions có thể đạt được high availability. Ngoài việc deploying đến multiple Regions, bạn cũng muốn deploy resources đến multiple Availability Zones.

**Bằng cách building redundant architectures hoặc replicating resources của bạn across multiple levels của AWS infrastructure, bạn có thể improve application reliability** để users của bạn có access đến content của bạn khi họ cần.

## Edge Locations

Ngoài AWS Regions chứa Availability Zones, AWS có một **global edge network** cung cấp quicker content access cho users bên ngoài standard Regions. Các edge locations này được strategically placed ở các areas như Atlanta, Georgia, USA hoặc Shanghai, China để provide low-latency access đến AWS services và content delivery.

### Đặc điểm của Edge Locations

**Edge locations offer multiple services để run closer to end users**, bao gồm AWS networking services như Amazon CloudFront. CloudFront là một **content delivery network (CDN)** và **caching system** mà bạn sẽ học thêm về sau trong training này.

**Edge locations:**
- 📍 **Strategically placed** - Được đặt ở các vị trí chiến lược
- ⚡ **Low-latency access** - Truy cập độ trễ thấp
- 💾 **Cache content** - Cache nội dung
- 🌍 **Global distribution** - Phân bố toàn cầu

### Amazon CloudFront

**CloudFront là một content delivery network**, và nó được thiết kế để serve content càng gần users càng tốt. Content này có thể là images, data, videos, applications, APIs—và, trong trường hợp của chúng ta—memes.

**CloudFront sử dụng Edge locations**, là một phần của worldwide Amazon Global Edge Network của chúng ta. Các edge locations này thực sự separate từ Regions và được specifically designed để accelerate content delivery.

**Ví dụ thực tế:**
Rudy's Rhubarb Refresher, trademark, rất phổ biến đến nỗi mọi người đang tạo memes về nó! Tuy nhiên, images đang load slowly cho một số người trên app. Hãy fix điều đó bằng cách utilizing Amazon CloudFront. Edge locations cache things như images, videos, và other assets và resources, allowing users để get content họ cần quickly, mà không cần đợi nó được retrieve từ một central location.

### Services tại Edge Locations

**Edge locations host other AWS services**, như:
- 🌐 **AWS Global Accelerator** - Tăng tốc độ kết nối toàn cầu
- 🔗 **Amazon Route 53** - Domain Name System (DNS) routes end users đến internet applications
  - Route 53 essentially converts human-readable URLs thành machine-readable IP addresses
  - Vì trust me, bạn không muốn phải remember IP addresses by heart

## AWS Outposts

Và đừng quên về **AWS Outposts**. Giả sử bạn có một need. Và need đó là for speed. More speed than even một Region paired với CloudFront có thể achieve. Đây là nơi Outposts comes in handy.

**Như bạn có thể recall, Outposts essentially makes it possible để bạn run AWS services on-premises.** Look, keep these multi-deployment concepts và edge services trong brain của bạn khi bạn tiếp tục explore AWS global infrastructure.

**AWS Outposts:**
- 🏢 **On-premises AWS services** - Chạy AWS services tại chỗ
- ⚡ **Ultra-low latency** - Độ trễ cực thấp
- 🔒 **Data residency** - Dữ liệu ở tại chỗ
- 🔗 **Seamless integration** - Tích hợp liền mạch với AWS cloud

## Key Elements của AWS Global Infrastructure

Để review mối quan hệ giữa Regions, Availability Zones, và edge locations, hãy chọn từng numbered marker trong hình ảnh:

### 1. AWS Regions

**Regions là geographical areas** xung quanh thế giới được tạo thành từ multiple data centers. Các data centers này provide scalable và redundant infrastructure cho hosting cloud services.

**Đặc điểm:**
- 🌍 **Geographical areas** - Các khu vực địa lý
- 🏢 **Multiple data centers** - Nhiều trung tâm dữ liệu
- 📊 **Scalable infrastructure** - Hạ tầng có thể mở rộng
- 🔄 **Redundant infrastructure** - Hạ tầng dự phòng

**Mỗi Region bao gồm multiple, isolated locations được gọi là Availability Zones. Mỗi Region có ba hoặc nhiều Availability Zones.**

### 2. Availability Zones

**Availability Zones là distinct locations** within một Region, mỗi location được designed như một independent zone với power, networking, và connectivity riêng của nó. Availability Zones maintain high availability và fault tolerance cho applications.

**Đặc điểm:**
- 📍 **Distinct locations** - Các vị trí riêng biệt
- 🔌 **Independent power** - Nguồn điện độc lập
- 🌐 **Independent networking** - Mạng độc lập
- 🔗 **Independent connectivity** - Kết nối độc lập
- 🛡️ **High availability** - Tính sẵn sàng cao
- 🔄 **Fault tolerance** - Khả năng chịu lỗi

**Mỗi Availability Zone bao gồm một hoặc nhiều data centers.**

### 3. Edge Locations

**Edge locations là strategically placed sites** xung quanh thế giới cache content để deliver data, video, và applications với lower latency và higher transfer speeds.

**Đặc điểm:**
- 📍 **Strategically placed** - Được đặt ở vị trí chiến lược
- 💾 **Cache content** - Cache nội dung
- ⚡ **Lower latency** - Độ trễ thấp hơn
- 🚀 **Higher transfer speeds** - Tốc độ truyền cao hơn
- 🌐 **Part of CDN** - Một phần của CDN

**Edge locations được coi là vital part của AWS content delivery network (CDN)** và sử dụng services như CloudFront để efficiently distribute data đến end users.

## So sánh Regions, Availability Zones, và Edge Locations

| Đặc điểm | AWS Regions | Availability Zones | Edge Locations |
|---------|------------|-------------------|----------------|
| **Mục đích** | Geographical areas với multiple data centers | Distinct locations within Region | Strategically placed sites để cache content |
| **Số lượng** | ~30+ Regions trên toàn thế giới | 3+ AZs per Region | Hàng trăm edge locations |
| **Chứa gì** | Multiple Availability Zones | One or more data centers | Cache servers |
| **Isolation** | Hoàn toàn isolated | Isolated từ failures | Separate từ Regions |
| **Use case** | Deploy applications và services | High availability và fault tolerance | Content delivery với low latency |
| **Services** | Tất cả AWS services | Tất cả AWS services | CloudFront, Route 53, Global Accelerator |

## Test Your Skills

**Match the AWS Global Infrastructure element với correct definition** sử dụng dropdown list hoặc interactive drag handle.

**Nối element của AWS Global Infrastructure với định nghĩa đúng** sử dụng danh sách dropdown hoặc kéo thả tương tác.

📋 Câu hỏi

**Match các elements sau:**

1. **AWS Region**
   - A physical location around the world where AWS operates multiple data centers
   - Một vị trí vật lý trên thế giới nơi AWS vận hành nhiều trung tâm dữ liệu

2. **Availability Zone**
   - Separate, distinct locations with one or more data centers that are engineered to be isolated from failures in other areas
   - Các vị trí riêng biệt, khác biệt với một hoặc nhiều trung tâm dữ liệu được thiết kế để cách ly khỏi các lỗi ở các khu vực khác

3. **Edge location**
   - Locations that cache content to deliver data, video, and applications to users with lower latency
   - Các vị trí cache nội dung để cung cấp dữ liệu, video và ứng dụng cho người dùng với độ trễ thấp hơn

✅ Đáp án đúng

**Matching:**

- **3** → **AWS Region**: A physical location around the world where AWS operates multiple data centers
- **1** → **Availability Zone**: Separate, distinct locations with one or more data centers that are engineered to be isolated from failures in other areas
- **2** → **Edge location**: Locations that cache content to deliver data, video, and applications to users with lower latency

**Giải thích:**

✅ **Regions là physical locations** xung quanh thế giới chứa multiple data centers. Mỗi Region chứa ít nhất ba Availability Zones. Mỗi Availability Zone chứa một hoặc nhiều data centers.

✅ **Edge locations là devices** trong các areas bên ngoài Regions. Các devices này provide user access đến frequently accessed data với low latency.

✅ **Availability Zones là separate, distinct locations** với một hoặc nhiều data centers được engineered để be isolated from failures trong other areas. Chúng maintain high availability và fault tolerance cho applications.

## Tóm tắt

Trong bài học này, bạn đã học về:

- ✅ **Redundant Architectures**: Building redundant architectures với multi-AZ và multi-Region deployments
- ✅ **Multi-AZ Architecture**: Sử dụng multiple Availability Zones để achieve high availability và fault tolerance
- ✅ **Multi-Region Architecture**: Deploying applications trong multiple Regions để handle Region-level failures
- ✅ **High Availability, Agility, Elasticity**: Sự khác biệt giữa ba concepts này
- ✅ **Edge Locations**: Strategically placed sites để cache content và deliver với low latency
- ✅ **Amazon CloudFront**: Content delivery network sử dụng edge locations
- ✅ **AWS Outposts**: On-premises AWS services cho ultra-low latency
- ✅ **Key Elements**: Regions, Availability Zones, và edge locations - mối quan hệ và sự khác biệt

## Next Steps

Trong bài học tiếp theo, bạn sẽ:

- Khám phá Infrastructure và Automation
- Tìm hiểu về AWS CloudFormation
- Học cách sử dụng Infrastructure as Code (IaC) để automate deployments

Hãy tiếp tục với bài học tiếp theo để tìm hiểu về Infrastructure và Automation! 🚀
