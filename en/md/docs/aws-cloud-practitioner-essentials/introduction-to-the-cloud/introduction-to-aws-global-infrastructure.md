# M01.03 - Introduction to AWS Global Infrastructure

> Nguồn: https://tiennhm.io.vn/en/docs/aws-cloud-practitioner-essentials/introduction-to-the-cloud/introduction-to-aws-global-infrastructure
> Tìm hiểu về AWS Global Infrastructure, bao gồm AWS Regions và Availability Zones. Khám phá các lợi ích của high availability và fault tolerance, và cách AWS thiết kế hạ tầng để đảm bảo ứng dụng luôn hoạt động.

Trong bài học này, bạn sẽ tìm hiểu về những điều cơ bản của **AWS Global Infrastructure**. Bạn sẽ học về thiết lập vật lý độc đáo của các tài nguyên AWS, và khám phá một số lợi ích của hạ tầng AWS, chẳng hạn như high availability (tính sẵn sàng cao) và fault tolerance (khả năng chịu lỗi).

## Mục tiêu học tập

Sau khi hoàn thành bài học này, bạn sẽ có thể:

- ✅ Định nghĩa AWS Regions và Availability Zones
- ✅ Giải thích các lợi ích của high availability và fault tolerance
- ✅ Hiểu cách AWS thiết kế hạ tầng để đảm bảo tính sẵn sàng cao

## Tại sao cần High Availability?

Hãy cùng quay lại với ví dụ về cửa hàng cà phê để hiểu rõ hơn về high availability. Giả sử bạn vừa thuê một nhân viên mới, và họ đang học cách pha latte. Họ làm rất tốt - có tỷ lệ sữa-expresso đúng, thậm chí còn tạo ra những thiết kế đẹp với latte art - cho đến khi họ làm đổ cốc và đổ latte lên máy tính tiền.

Điều đó không tốt chút nào! Máy tính tiền bị hỏng, và có vẻ như nó đã làm chập điện toàn bộ cửa hàng. Yikes! Điều đó có nghĩa là chúng ta không thể tính tiền đơn hàng hoặc pha đồ uống cho khách hàng. Chúng ta sẽ phải đóng cửa cho đến khi mọi thứ được xử lý.

Vậy điều này có nghĩa gì cho doanh nghiệp? Có phải toàn bộ doanh nghiệp không kiếm được tiền cho đến khi vấn đề được sửa?

May mắn thay, chúng ta đã chuẩn bị sẵn. Tin tốt cho doanh nghiệp - và cho khách hàng - là đây không phải là cửa hàng cà phê duy nhất của chúng ta. Cửa hàng thực ra là một chuỗi, và chúng ta có các cửa hàng ở khắp thành phố. Khách hàng vẫn có thể mua cà phê bằng cách ghé thăm một trong những cửa hàng của chúng ta chỉ cách vài dãy nhà, và doanh nghiệp vẫn có thể tiếp tục hoạt động ngay cả khi một địa điểm gặp vấn đề.

Vì vậy, dù là một nhân viên làm đổ latte, hay cửa hàng bên cạnh vô tình cắt đường internet của chúng ta, hay một thảm họa khác khiến cửa hàng không thể hoạt động hàng ngày... bất kể lý do là gì, chúng ta biết rằng sản phẩm của mình sẽ có tính sẵn sàng cao cho khách hàng. Họ vẫn nhận được cà phê, và doanh nghiệp vẫn tạo ra thu nhập. Mọi thứ đều ổn! ☕

## AWS Global Infrastructure: Tương tự như chuỗi cửa hàng cà phê

AWS có một thiết lập tương tự với hạ tầng toàn cầu của chúng ta. Rất rủi ro khi có một data center khổng lồ nơi tất cả các tài nguyên được đặt. Nếu có điều gì đó xảy ra với data center đó, như mất điện hoặc thiên tai, tất cả ứng dụng của mọi người sẽ ngừng hoạt động cùng một lúc.

Bạn cần **high availability** và **fault tolerance**. Hãy làm rõ các thuật ngữ này:

### High Availability (Tính sẵn sàng cao)

**High availability** là về việc đảm bảo ứng dụng của bạn luôn có thể truy cập được với thời gian downtime tối thiểu. Ngay cả khi một thành phần bị lỗi, một thành phần khác đã sẵn sàng để tiếp quản, để dịch vụ của bạn tiếp tục chạy.

**Đặc điểm:**
- ⚡ **Minimal downtime** - Thời gian downtime tối thiểu
- 🔄 **Automatic failover** - Tự động chuyển sang backup khi có lỗi
- 📈 **Continuous operation** - Hoạt động liên tục

### Fault Tolerance (Khả năng chịu lỗi)

**Fault tolerance** đi xa hơn một bước bằng cách thiết kế một hệ thống để tiếp tục hoạt động ngay cả khi nhiều thành phần bị lỗi. Về cơ bản, nó xây dựng khả năng phục hồi vào mọi lớp để không có một lỗi đơn lẻ nào có thể làm sập toàn bộ hệ thống.

**Đặc điểm:**
- 🛡️ **Resilience** - Khả năng phục hồi
- 🔀 **Multiple component failures** - Có thể chịu được nhiều lỗi thành phần
- 🏗️ **Built-in redundancy** - Dự phòng được tích hợp sẵn

## AWS Regions và Availability Zones

Thiết kế cho high availability và fault tolerance là một phần lý do tại sao AWS hoạt động trong **Regions**, được đặt ở các khu vực khác nhau trên thế giới.

![AWS Global Infrastructure - Regions and Availability Zones](https://tiennhm.io.vn/img/docs/AWS-Cloud-Practitioner-Essentials/M01_L4_Infrastructure.jpg)

### AWS Regions (Các khu vực AWS)

**AWS Regions** là các vị trí vật lý trên khắp thế giới chứa các nhóm data centers. Các nhóm data centers này được gọi là **Availability Zones**. Mỗi AWS Region bao gồm tối thiểu **ba Availability Zones** riêng biệt về mặt vật lý trong một khu vực địa lý.

**Đặc điểm của AWS Regions:**
- 🌍 **Geographic distribution** - Phân bổ địa lý trên toàn cầu
- 📍 **Close to customers** - Được xây dựng gần khách hàng AWS nhất có thể
- 🏙️ **Examples**: Paris, Tokyo, São Paulo, Dublin, Ohio, và nhiều nơi khác
- 🔒 **Isolation** - Mỗi Region hoạt động độc lập

**Lợi ích:**
- ⚡ **Low latency** - Độ trễ thấp cho người dùng trong khu vực
- 🌐 **Compliance** - Đáp ứng yêu cầu về data residency (dữ liệu phải ở trong nước)
- 💰 **Cost optimization** - Tối ưu chi phí bằng cách chọn region gần người dùng

### Availability Zones (AZs)

**Availability Zones** bao gồm một hoặc nhiều data centers với nguồn điện dự phòng, mạng và kết nối. Regions và Availability Zones được thiết kế để cung cấp quyền truy cập có độ trễ thấp, chịu lỗi cho các dịch vụ cho người dùng trong một khu vực nhất định.

**Đặc điểm của Availability Zones:**
- 🏢 **One or more data centers** - Một hoặc nhiều data centers
- ⚡ **Redundant power** - Nguồn điện dự phòng
- 🌐 **Redundant networking** - Mạng dự phòng
- 🔌 **Redundant connectivity** - Kết nối dự phòng
- 📍 **Physical separation** - Tách biệt về mặt vật lý (không xây dựng ngay cạnh nhau)

**Tại sao không xây AZs ngay cạnh nhau?**
Nếu có điều gì đó như thiên tai xảy ra, bạn có thể mất kết nối với mọi thứ trong AZ đó. Bằng cách tách biệt chúng, AWS đảm bảo rằng một thảm họa không thể ảnh hưởng đến nhiều AZs cùng một lúc.

**Cấu trúc:**
```
AWS Region
├── Availability Zone 1 (AZ-01)
│   ├── Data Center 1 (DC-01)
│   └── Data Center 2 (DC-02)
├── Availability Zone 2 (AZ-02)
│   ├── Data Center 3 (DC-03)
│   └── Data Center 4 (DC-04)
└── Availability Zone 3 (AZ-03)
    ├── Data Center 7 (DC-07)
    └── Data Center 8 (DC-08)
```

## Đạt được High Availability với AWS Global Infrastructure

Hạ tầng AWS được thiết kế với high availability và fault tolerance trong tâm trí. Availability Zones (AZs) được cấu hình như các tài nguyên cô lập, và mỗi AZ được trang bị nguồn điện, mạng và kết nối độc lập.

### Khuyến nghị: Phân bổ tài nguyên trên nhiều AZs

**Khuyến nghị quan trọng:** Phân bổ tài nguyên của bạn trên nhiều AZs. Bằng cách đó, nếu một AZ gặp sự cố, các ứng dụng kinh doanh của bạn sẽ tiếp tục hoạt động mà không bị gián đoạn.

**Ví dụ thực tế:**
- 🖥️ **Web servers**: Đặt 2 servers trong AZ-1, 2 servers trong AZ-2
- 🗄️ **Database**: Primary trong AZ-1, Replica trong AZ-2
- 📊 **Load balancer**: Phân phối traffic giữa các AZs

**Lợi ích của cách tiếp cận này:**
- ✅ **Redundancy** - Dự phòng: Nếu một AZ gặp sự cố, các AZ khác vẫn hoạt động
- ✅ **Resource isolation** - Cô lập tài nguyên: Mỗi AZ hoạt động độc lập
- ✅ **High availability** - Tính sẵn sàng cao: Ứng dụng luôn có thể truy cập được
- ✅ **Fault tolerance** - Khả năng chịu lỗi: Hệ thống tiếp tục hoạt động khi có lỗi

### Multi-Region Deployment (Triển khai đa Region)

Một số bạn có thể nghĩ: "Nếu một Region là nơi tất cả các phần của ứng dụng sống, thì chúng ta vẫn chưa thực sự giải quyết vấn đề mà chúng ta đã trình bày trước đó. Nếu doanh nghiệp của tôi cần chống chịu thảm họa, thì nó không thể chỉ chạy ở một vị trí."

Bạn hoàn toàn đúng! Đó là lý do tại sao việc các doanh nghiệp hoạt động trên nhiều Regions là phổ biến. Bằng cách đó, nếu một Region gặp sự cố vì bất kỳ lý do nào, các hoạt động có thể failover (chuyển đổi dự phòng) sang Region khác.

**Ví dụ:**
- 🇺🇸 **Primary Region**: US East (Virginia) - Xử lý 80% traffic
- 🇪🇺 **Secondary Region**: Europe (Frankfurt) - Xử lý 20% traffic và sẵn sàng failover
- 🔄 **Disaster Recovery**: Nếu US East gặp sự cố, tất cả traffic tự động chuyển sang Europe

*Lưu ý: Chúng ta sẽ tìm hiểu sâu hơn về multi-region deployment trong các bài học sau.*

## Tổng kết: Các thành phần cơ bản của AWS Infrastructure

### ✅ Những gì đã học:

1. **AWS Global Infrastructure**
   - Các vị trí vật lý trên khắp thế giới
   - Chứa các nhóm data centers

2. **AWS Regions**
   - Vị trí vật lý trên khắp thế giới
   - Mỗi Region có tối thiểu 3 Availability Zones
   - Được thiết kế để gần khách hàng nhất có thể

3. **Availability Zones (AZs)**
   - Một hoặc nhiều data centers
   - Có nguồn điện, mạng và kết nối dự phòng
   - Tách biệt về mặt vật lý để tránh single point of failure

4. **High Availability và Fault Tolerance**
   - High Availability: Đảm bảo ứng dụng luôn có thể truy cập với downtime tối thiểu
   - Fault Tolerance: Hệ thống tiếp tục hoạt động ngay cả khi nhiều thành phần bị lỗi

### 🎯 Điểm quan trọng cần nhớ:

- **Region** = Khu vực địa lý chứa nhiều Availability Zones
- **Availability Zone** = Một hoặc nhiều data centers với dự phòng
- **High Availability** = Ứng dụng luôn có thể truy cập được
- **Fault Tolerance** = Hệ thống chịu được nhiều lỗi
- **Best Practice** = Phân bổ tài nguyên trên nhiều AZs và Regions

### 🚀 Bước tiếp theo

Trong các bài học tiếp theo, chúng ta sẽ khám phá:
- Các dịch vụ compute trong AWS
- Networking và cách kết nối các tài nguyên
- Storage và databases
- Và nhiều hơn nữa!

---

## Kiểm tra kiến thức: Bài tập thực hành

Hãy thử giải quyết tình huống sau để kiểm tra hiểu biết của bạn:

### Tình huống

Bạn vừa tham gia một tech start-up, và doanh nghiệp đang phát triển nhanh chóng. Công ty mới của bạn quyết định rằng họ cần thiết kế một hạ tầng có khả năng phục hồi và có thể mở rộng trên AWS để xử lý traffic tăng lên và giúp đảm bảo high availability.

### Câu hỏi

**Câu nào MÔ TẢ TỐT NHẤT lợi ích high availability của AWS Global Infrastructure?**

- ❌ AWS lưu trữ tất cả dữ liệu website của bạn trong một AWS storage bucket duy nhất để tập trung quản lý dữ liệu.
- ❌ AWS có nhiều tùy chọn hỗ trợ khách hàng để đảm bảo câu trả lời cho câu hỏi của bạn có tính sẵn sàng cao trên website của họ.
- ✅ **AWS cung cấp nhiều data centers trên các khu vực địa lý khác nhau để website của bạn có thể tiếp tục hoạt động ngay cả khi một vị trí gặp vấn đề.** ← Đáp án đúng!
- ❌ AWS cung cấp một data center duy nhất, có tính bảo mật cao có thể xử lý tất cả traffic của bạn, điều này đảm bảo rằng website của bạn luôn có sẵn.

### Giải thích

AWS thực sự cung cấp nhiều data centers trên các khu vực địa lý khác nhau. Thiết lập này tăng cường high availability bằng cách đảm bảo rằng cửa hàng trực tuyến của bạn có thể xử lý traffic tăng lên ngay cả trong các sự kiện không lường trước được.

**Phân tích các lựa chọn:**

1. **❌ Single storage bucket**: Điều này tạo ra single point of failure - không phải high availability!
2. **❌ Customer support**: Đây là về hỗ trợ khách hàng, không phải về infrastructure availability
3. **✅ Multiple data centers across regions**: Đúng! Đây chính xác là cách AWS đảm bảo high availability
4. **❌ Single data center**: Một data center duy nhất = single point of failure - không phải high availability!

**Kịch bản thực tế:**
- 🌍 Website được host trên nhiều regions (US, Europe, Asia)
- 🏢 Mỗi region có nhiều AZs với data centers riêng
- ⚡ Nếu một data center gặp sự cố → Traffic tự động chuyển sang data center khác
- ✅ Website vẫn hoạt động bình thường → **High availability đạt được!**

---

## Tài liệu tham khảo

- 📚 [AWS Global Infrastructure](https://aws.amazon.com/about-aws/global-infrastructure/)
- 🌍 [AWS Regions and Availability Zones](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html)
- 🛡️ [AWS Well-Architected Framework - Reliability Pillar](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html)
- 📖 [AWS Cloud Practitioner Essentials Course](https://aws.amazon.com/training/learning-paths/aws-certified-cloud-practitioner/)

---

*Bài viết này là phần thứ ba trong Module 1 - Introduction to the Cloud của series AWS Cloud Practitioner Essentials. Bài viết được cập nhật vào tháng 11/2025 dựa trên nội dung khóa học AWS Cloud Practitioner Essentials.*

**Bạn có câu hỏi hay muốn thảo luận về AWS Global Infrastructure? Hãy chia sẻ ở phần comment bên dưới nhé! ☁️**
