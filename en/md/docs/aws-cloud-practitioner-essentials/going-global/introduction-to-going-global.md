# M04.01 - Introduction to Going Global

> Nguồn: https://tiennhm.io.vn/en/docs/aws-cloud-practitioner-essentials/going-global/introduction-to-going-global
> Giới thiệu về AWS Global Infrastructure và các khái niệm cơ bản về going global. Tìm hiểu cách chọn AWS Regions, giá trị của edge locations, và cách sử dụng AWS CloudFormation để streamline và automate deployment.

Bạn đã được giới thiệu về một số foundational elements của AWS Global Infrastructure, chẳng hạn như AWS Regions và Availability Zones (AZs). Trong các bài học tiếp theo, bạn sẽ học thêm về AWS infrastructure. Các concepts được cover trong các bài học này bao gồm cách chọn một Region, giá trị của edge locations, và cách sử dụng services như AWS CloudFormation để streamline và automate deployment. Ngoài việc đạt được high availability, các components này của AWS Global Infrastructure có thể giúp business của bạn đạt được benefits như elasticity và agility.

## Mục tiêu học tập

Sau khi hoàn thành bài học này, bạn sẽ có thể:

- ✅ Ôn tập lại các basic components của AWS Global Infrastructure
- ✅ Hiểu cách coffee shop analogy đại diện cho các elements của AWS Global Infrastructure
- ✅ Nhận biết các factors cần xem xét khi chọn AWS Regions
- ✅ Hiểu giá trị của edge locations
- ✅ Nhận biết cách infrastructure as code giúp automate deployments

## Coffee Shop Expansion - Going International

Coffee shop đang phát triển mạnh. Trong thực tế, shop đã có được một following khá lớn, và bây giờ chúng ta đang nghĩ đã đến lúc mở rộng. Đúng vậy. Tin tức nóng: coffee shop đang going international.

Khi shop lên kế hoạch mở rộng, có một số considerations cần ghi nhớ. Đầu tiên, chúng ta cần quyết định nơi mở các locations mới. Chúng ta muốn tiếp cận coffee lovers ở các phần khác nhau của thế giới, nhưng chúng ta cũng cần xem xét các factors như local demand, regulations, và costs. Điều này giống như trong AWS, khi bạn đang mở rộng globally, có một số factors cần xem xét khi selecting AWS Regions. Trong các bài học sắp tới, bạn sẽ học tất cả về những gì đi vào việc chọn một Region hoặc một bộ Regions.

## Going Global với AWS Infrastructure

Coffee shop đang mở rộng đến global locations. Hãy điều hướng qua nội dung sau để xem lại cách các elements của coffee shop expansion đại diện cho các phần khác nhau của AWS Global Infrastructure.

### How to Choose a Region or Set of Regions

Nếu chúng ta mở rộng coffee shop bằng cách mở các locations mới, sẽ có nhiều thứ cần xem xét, như customer demand và development cost. Tương tự, bạn có một số factors cần xem xét khi selecting một Region hoặc một bộ Regions cho real-life resources của mình.

**Các factors cần xem xét khi chọn AWS Regions:**
- 📍 **Proximity to customers**: Gần khách hàng để giảm latency
- 💰 **Cost**: Pricing khác nhau giữa các Regions
- 📋 **Compliance**: Yêu cầu về data residency và regulations
- 🎯 **Service availability**: Không phải tất cả services đều có sẵn ở mọi Region
- ⚡ **Performance**: Latency và throughput requirements

### AWS Edge Locations

Giống như coffee franchise của chúng ta có thể mở rộng với các phiên bản nhỏ hơn của shop như mobile coffee carts, AWS có các facilities nhỏ hơn được gọi là **edge locations**. Edge locations cache các items như images, videos, và các resources khác, để users có thể truy cập content họ cần với lower latency.

**Bước tiếp theo của coffee shop expansion plan** là chúng ta muốn mở một số phiên bản nhẹ, smaller footprint của shop được gọi là coffee carts. Chúng ta sẽ thiết lập chúng ở những nơi như farmers markets, airports, và event venues. Chúng sẽ không phục vụ mọi đồ uống hoặc item trên menu, nhưng chúng có thể cung cấp các items phổ biến nhất một cách nhanh chóng và hiệu quả. Những coffee carts này tương tự như cách AWS edge locations hoạt động.

**Edge locations cung cấp:**
- ⚡ Fast, localized delivery của content được truy cập thường xuyên nhất
- 💾 Cache images, videos, và các assets và resources khác
- 🌍 Cho phép users nhận content họ cần nhanh chóng, mà không cần đợi nó được retrieve từ một central location

Bạn sẽ học thêm về những điều này sớm.

### Infrastructure as Code và CloudFormation

Một consideration quan trọng khác của coffee shop expansion sẽ là duy trì một sản phẩm nhất quán từ location đến location. AWS có services, chẳng hạn như CloudFormation, mà bạn có thể sử dụng để giúp automate deployment của cloud resources. Các services này sử dụng **infrastructure as code**, hoặc **IaC**, giúp bạn đạt được một setup nhất quán, đáng tin cậy mỗi khi business của bạn phát triển.

**Cuối cùng, shop của chúng ta muốn standardize và automate processes** để chúng ta có thể giữ customer satisfaction nhất quán. Không quan trọng shop hoặc coffee cart nào customer đến thăm, chúng ta muốn họ có cùng trải nghiệm tuyệt vời. Chúng ta sẽ train staff trên cùng recipes và sử dụng smart coffee machines có thể được lập trình từ xa và replicate đến tất cả các locations khác nhau, đảm bảo rằng một cappuccino ở Stockholm có vị giống như một cái ở Seattle.

**Tương tự, AWS có infrastructure** để giúp businesses scale một cách có trách nhiệm và nhất quán. Trong phần này, bạn sẽ khám phá cách đạt được consistent deployments trên environments và global deployments sử dụng infrastructure as code, cụ thể tập trung vào AWS CloudFormation.

## Tổng quan về Module 4

Đến cuối phần này, bạn sẽ có hiểu biết sâu sắc về ins and outs của AWS Global Infrastructure, giúp bạn đạt được robust, scalable, và globally available applications. Vì vậy, hãy lấy tách cà phê của bạn, và hãy cùng đi sâu vào.

Trong Module 4, bạn sẽ học về:

1. **Choosing AWS Regions**: Các factors cần xem xét khi chọn Regions
2. **Diving Deeper into AWS Global Infrastructure**: Chi tiết về Regions, Availability Zones, và edge locations
3. **Infrastructure and Automation**: Sử dụng AWS CloudFormation cho infrastructure as code

## Key Concepts Preview

### AWS Regions và Availability Zones

Bạn đã được giới thiệu về AWS Regions và Availability Zones trong Module 1. Trong Module 4, bạn sẽ đi sâu hơn vào cách chọn và sử dụng chúng hiệu quả.

### Edge Locations

Edge locations là các facilities nhỏ hơn của AWS được thiết kế để cache content và giảm latency cho end users. Chúng là một phần quan trọng của AWS Global Infrastructure.

### Infrastructure as Code (IaC)

Infrastructure as Code cho phép bạn define và manage infrastructure bằng code, giúp automate deployments và đảm bảo consistency across environments.

## Tóm tắt

Trong bài học này, bạn đã được giới thiệu về:

- ✅ **Coffee Shop Expansion Analogy**: Cách coffee shop mở rộng đại diện cho AWS Global Infrastructure
- ✅ **Choosing Regions**: Các factors cần xem xét khi chọn AWS Regions
- ✅ **Edge Locations**: Các facilities nhỏ hơn để cache content và giảm latency
- ✅ **Infrastructure as Code**: Sử dụng CloudFormation để automate và standardize deployments
- ✅ **Module 4 Overview**: Tổng quan về những gì bạn sẽ học trong Module 4

## Next Steps

Trong các bài học tiếp theo, bạn sẽ:

- Khám phá chi tiết cách chọn AWS Regions
- Tìm hiểu sâu hơn về AWS Global Infrastructure
- Học cách sử dụng AWS CloudFormation cho infrastructure automation

Hãy tiếp tục với bài học tiếp theo để tìm hiểu chi tiết về cách chọn AWS Regions! 🌍
