# M02.05 - Amazon EC2 Pricing

> Nguồn: https://tiennhm.io.vn/docs/aws-cloud-practitioner-essentials/compute-in-the-cloud/amazon-ec2-pricing
> Tìm hiểu về các tùy chọn pricing của Amazon EC2: On-Demand, Reserved Instances, Spot Instances, Savings Plans, Dedicated Hosts, và Capacity Reservations. Mô tả khi nào sử dụng mỗi tùy chọn pricing dựa trên use cases cụ thể.

Chúng ta đã nói về Amazon EC2 instance types, nhưng bạn có thể đang tự hỏi: **"Điều này sẽ tốn bao nhiêu tiền?"**

Đừng lo lắng! Đối với EC2, chúng ta có **nhiều tùy chọn billing** có sẵn. Trong bài học này, bạn sẽ tìm hiểu về các tùy chọn pricing cho Amazon EC2. Thông tin này sẽ giúp bạn tìm giải pháp hiệu quả nhất về chi phí cho workloads của mình—dù bạn mới bắt đầu hay đang nhắm đến việc tối đa hóa tiết kiệm trên việc sử dụng dài hạn.

## Mục tiêu học tập

Sau khi hoàn thành bài học này, bạn sẽ có thể:

- ✅ Giải thích các tùy chọn pricing có sẵn của Amazon EC2
- ✅ Mô tả khi nào sử dụng mỗi tùy chọn pricing dựa trên use cases cụ thể
- ✅ Mô tả Amazon EC2 Capacity Reservations và Reserved Instance (RI) flexibility

## Tổng quan về EC2 Pricing Options

Với nhiều tùy chọn pricing EC2 có sẵn, bạn có thể chọn giải pháp hiệu quả nhất về chi phí dựa trên usage patterns của mình. Điều này giúp bạn cân bằng tính linh hoạt, tiết kiệm chi phí và nhu cầu workload cụ thể.

## 1. On-Demand Instances

### Tổng quan

**On-Demand Instances** là tùy chọn được biết đến rộng rãi nhất. Điều này có nghĩa là bạn chỉ trả cho thời gian instance của bạn chạy.

### Đặc điểm

- ⏱️ **Pay per hour or per second** - Trả theo giờ hoặc theo giây, tùy thuộc vào instance type và OS bạn chọn
- 💰 **No long-term commitments** - Không có cam kết dài hạn
- 💵 **No upfront payments** - Không cần thanh toán trước
- 🚀 **Self-service** - Tự phục vụ

### Use Cases

**Hầu hết khách hàng thường sử dụng tùy chọn này khi:**
- 🎓 **Getting started** - Bắt đầu với AWS
- 🧪 **Testing workloads** - Test workloads
- 🔬 **Exploring services** - Khám phá dịch vụ
- 📊 **Unpredictable usage** - Sử dụng không thể dự đoán
- 🚀 **Short-term projects** - Dự án ngắn hạn

**Lợi ích:**
- ⚡ Spin up servers, play around, test out workloads
- 📈 Giúp bạn tìm ra baseline cho average usage của mình
- 💡 Sử dụng average đó, bạn có thể bắt đầu khám phá các tùy chọn pricing khác

### Pricing

- 💰 **Pay only for what you use** - Chỉ trả cho những gì bạn sử dụng
- ⏱️ **Per-second billing** (cho Linux instances) hoặc **per-hour billing** (cho Windows instances)
- 📊 **No discounts** - Không có giảm giá

## 2. Savings Plans

### Tổng quan

**Savings Plans** cung cấp giá EC2 thấp hơn cho cam kết sử dụng một lượng nhất quán. Điều này được đo bằng dollars per hour cho một kỳ hạn một năm hoặc ba năm.

### Đặc điểm

- 💰 **Save up to 72 percent** - Tiết kiệm lên đến 72%
- 🔄 **Flexible** - Áp dụng cho EC2 usage, bất kể instance family, size, OS, tenancy, hoặc AWS Region
- 🚀 **Also applies to** - Cũng áp dụng cho AWS Fargate và AWS Lambda usage
- 📅 **1-year or 3-year term** - Kỳ hạn 1 năm hoặc 3 năm

### Payment Options

Bạn có thể trả cho commitment của mình bằng:
- 💵 **All upfront** - Trả toàn bộ trước
- 💰 **Partial upfront** - Trả một phần trước
- 💳 **No upfront** - Không trả trước

### Use Cases

**Savings Plans phù hợp cho:**
- 📊 **Predictable workloads** - Workloads có thể dự đoán
- 🔄 **Consistent usage** - Sử dụng nhất quán
- 💰 **Want flexibility** - Muốn linh hoạt về instance types và regions
- 🚀 **Multiple services** - Sử dụng EC2, Fargate, Lambda

### Lợi ích

- 💰 **Significant savings** - Tiết kiệm đáng kể (lên đến 72%)
- 🔄 **Flexibility** - Linh hoạt về instance types, sizes, regions
- 📈 **Easy to manage** - Dễ quản lý với AWS Cost Explorer recommendations

**Tài liệu tham khảo:** [What are Savings Plans?](https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html)

## 3. Reserved Instances (RIs)

### Tổng quan

**Reserved Instances** phù hợp cho steady-state workloads hoặc những workloads có predictable usage. Chúng cung cấp cho bạn **lên đến 75% discount** so với On-Demand pricing.

### Đặc điểm

- 💰 **Save up to 75 percent** - Tiết kiệm lên đến 75%
- 📅 **1-year or 3-year term** - Kỳ hạn 1 năm hoặc 3 năm
- 🎯 **Specific instance families and AWS Regions** - Cho instance families và AWS Regions cụ thể
- 🔄 **Instance size flexibility** - Linh hoạt về kích thước instance

### Payment Options

Có ba tùy chọn thanh toán:
- 💵 **All upfront** - Trả toàn bộ trước khi cam kết
- 💰 **Partial upfront** - Trả một phần trước khi cam kết
- 💳 **No upfront** - Không trả gì ở đầu

### Reserved Instance Flexibility

**RIs cung cấp flexibility:**

1. **Instance Size Flexibility:**
   - Discount được áp dụng cho các instance sizes khác nhau trong cùng instance family
   - Dựa trên normalization factor
   - Ví dụ: `m5.large` RI có thể áp dụng cho `m5.xlarge` hoặc `m5.2xlarge`

2. **Availability Zone Flexibility (Regional RIs):**
   - Regional RIs: Discount áp dụng cho bất kỳ Availability Zone nào trong Region
   - Zonal RIs: Discount chỉ áp dụng cho một Availability Zone cụ thể

**Tài liệu tham khảo:** [How Reserved Instance discounts are applied](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/apply_ri.html)

### Use Cases

**Reserved Instances phù hợp cho:**
- 📊 **Steady-state workloads** - Workloads ổn định
- 📈 **Predictable usage** - Sử dụng có thể dự đoán
- 🎯 **Specific instance types** - Instance types cụ thể
- 💰 **Want maximum savings** - Muốn tiết kiệm tối đa

## 4. Spot Instances

### Tổng quan

**Spot Instances** giúp bạn có thể request spare EC2 capacity với giá **lên đến 90% off** so với On-Demand price.

### Đặc điểm

- 💰 **Save up to 90 percent** - Tiết kiệm lên đến 90%
- ⚠️ **Can be reclaimed** - AWS có thể thu hồi instance bất cứ lúc nào
- ⏰ **2-minute warning** - Bạn nhận được cảnh báo 2 phút
- 🔄 **Can resume later** - Bạn có thể tiếp tục sau nếu cần

### Cảnh báo quan trọng

**⚠️ Đảm bảo workloads của bạn có thể chịu được gián đoạn nếu bạn chọn Spot Instances.**

### Use Cases

**Spot Instances phù hợp cho:**
- 🔄 **Interruptible workloads** - Workloads có thể gián đoạn
- 💰 **Cost-sensitive** - Nhạy cảm về chi phí
- 🧮 **Batch processing** - Xử lý batch
- 🔬 **Scientific computing** - Tính toán khoa học
- 🧪 **Testing and development** - Testing và phát triển
- 📊 **Big data analytics** - Phân tích dữ liệu lớn

### Best Practices

- 💾 **Save progress frequently** - Lưu tiến trình thường xuyên
- 🔄 **Use fault-tolerant applications** - Sử dụng ứng dụng chịu lỗi
- 📊 **Monitor Spot prices** - Giám sát giá Spot
- 🎯 **Use Spot Fleet** - Sử dụng Spot Fleet để tự động quản lý

## 5. Dedicated Hosts

### Tổng quan

**Dedicated Hosts** là các physical servers thực tế mà khách hàng có thể reserve để sử dụng độc quyền. Không có workloads của khách hàng khác có thể chia sẻ server.

### Đặc điểm

- 🏢 **Physical server** - Physical server thực tế
- 🔒 **Exclusive use** - Sử dụng độc quyền
- 🎯 **Full control** - Kiểm soát hoàn toàn instance placement và resource allocation
- 🛡️ **Isolation** - Cách ly hoàn toàn

### Use Cases

**Dedicated Hosts phù hợp cho:**
- 🔒 **Security-sensitive workloads** - Workloads nhạy cảm về bảo mật
- 📋 **Licensing-specific workloads** - Workloads yêu cầu licensing cụ thể
  - Windows Server licenses
  - SQL Server licenses
- 📊 **Compliance requirements** - Yêu cầu tuân thủ
- 🏛️ **Regulatory needs** - Nhu cầu quy định

**Lý do:**
- Bạn có quyền kiểm soát instance placement và resource allocation
- Điều này giúp đáp ứng các nhu cầu compliance và regulatory nhất định

### Pricing

- 💰 **Pay for the host** - Trả cho host
- 🔄 **Can run multiple instances** - Có thể chạy nhiều instances trên host
- 📊 **Per-host billing** - Thanh toán theo host

## 6. Dedicated Instances

### Tổng quan

**Dedicated Instances** cung cấp physical isolation từ các tài khoản AWS khác trong khi vẫn hưởng lợi từ tính linh hoạt và tiết kiệm chi phí của shared infrastructure.

### Đặc điểm

- 🔒 **Physical isolation** - Cách ly vật lý từ các tài khoản AWS khác
- 💰 **Cost savings** - Vẫn có thể tiết kiệm chi phí so với Dedicated Hosts
- 🎯 **No server control** - Không chọn được physical server cụ thể
- 🔄 **Flexibility** - Vẫn có tính linh hoạt của shared infrastructure

### So sánh: Dedicated Hosts vs Dedicated Instances

| Đặc điểm | Dedicated Hosts | Dedicated Instances |
|----------|----------------|---------------------|
| **Control** | Full control over physical server | No control over server selection |
| **Isolation** | Complete isolation | Physical isolation from other accounts |
| **Licensing** | Full control for BYOL | Limited control |
| **Cost** | Higher cost | Lower cost than Dedicated Hosts |
| **Use Case** | Strict compliance/licensing | Need isolation but less control |

### Use Cases

**Dedicated Instances phù hợp cho:**
- 🔒 **Need isolation** - Cần cách ly nhưng không cần full control
- 💰 **Want cost savings** - Muốn tiết kiệm chi phí hơn Dedicated Hosts
- 🛡️ **Compliance requirements** - Yêu cầu tuân thủ (ít nghiêm ngặt hơn)

## 7. Capacity Reservations

### Tổng quan

Với **Amazon EC2 Capacity Reservations**, bạn reserve compute capacity trong một Availability Zone cụ thể cho critical workloads.

### Đặc điểm

- 🎯 **Reserve capacity** - Reserve capacity trong một Availability Zone cụ thể
- 💰 **Charged at On-Demand rate** - Được tính phí theo giá On-Demand
- ⚠️ **Pay whether used or not** - Trả dù có sử dụng hay không
- 💻 **Only pay for instances you run** - Chỉ trả cho instances bạn chạy

### Use Cases

**Capacity Reservations phù hợp cho:**
- 🚨 **Critical workloads** - Workloads quan trọng
- 🎯 **Strict capacity requirements** - Yêu cầu capacity nghiêm ngặt
- 📅 **Current or future workloads** - Workloads hiện tại hoặc tương lai
- 🏢 **Business-critical applications** - Ứng dụng quan trọng cho doanh nghiệp

### Types

1. **Immediate-use Capacity Reservations:**
   - Available ngay lập tức
   - Không có term commitment
   - Có thể modify hoặc cancel bất cứ lúc nào

2. **Future-dated Capacity Reservations:**
   - Chỉ định ngày tương lai
   - Có commitment duration
   - Không thể cancel trong commitment duration

**Tài liệu tham khảo:** [Reserve compute capacity with EC2 On-Demand Capacity Reservations](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-capacity-reservations.html)

## So sánh các Pricing Options

### Bảng so sánh nhanh

| Pricing Option | Savings | Commitment | Flexibility | Use Case |
|----------------|---------|------------|-------------|----------|
| **On-Demand** | 0% | None | Highest | Getting started, unpredictable |
| **Savings Plans** | Up to 72% | 1-3 years | High | Predictable, multiple services |
| **Reserved Instances** | Up to 75% | 1-3 years | Medium | Steady-state, predictable |
| **Spot Instances** | Up to 90% | None | Low (interruptible) | Interruptible, cost-sensitive |
| **Dedicated Hosts** | Varies | None | Low | Security, licensing, compliance |
| **Dedicated Instances** | Varies | None | Medium | Isolation without full control |
| **Capacity Reservations** | 0% (capacity guarantee) | Optional | Medium | Critical, strict capacity needs |

## Khi nào sử dụng mỗi Pricing Option?

### Decision Tree

```
Bắt đầu với On-Demand
    ↓
Có predictable usage?
    ├─ Yes → Savings Plans hoặc Reserved Instances
    └─ No → Tiếp tục On-Demand
         ↓
Có thể tolerate interruptions?
    ├─ Yes → Spot Instances
    └─ No → On-Demand hoặc Reserved Instances
         ↓
Cần strict compliance/licensing?
    ├─ Yes → Dedicated Hosts
    └─ No → Tiếp tục các options khác
         ↓
Cần capacity guarantee?
    ├─ Yes → Capacity Reservations
    └─ No → Các options khác
```

### Use Case Examples

**1. Startup mới bắt đầu:**
- ✅ **On-Demand** - Không biết usage patterns, không muốn commitment

**2. Production workload ổn định:**
- ✅ **Reserved Instances** hoặc **Savings Plans** - Predictable usage, muốn tiết kiệm

**3. Batch processing có thể gián đoạn:**
- ✅ **Spot Instances** - Có thể tolerate interruptions, muốn tiết kiệm tối đa

**4. Financial services với compliance:**
- ✅ **Dedicated Hosts** - Cần full control, compliance requirements

**5. Critical application cần capacity guarantee:**
- ✅ **Capacity Reservations** - Đảm bảo capacity khi cần

## Tổng kết

### ✅ Những gì đã học:

1. **7 Pricing Options:**
   - On-Demand Instances
   - Savings Plans
   - Reserved Instances
   - Spot Instances
   - Dedicated Hosts
   - Dedicated Instances
   - Capacity Reservations

2. **Đặc điểm của mỗi option:**
   - Savings potential
   - Commitment requirements
   - Flexibility
   - Use cases

3. **Khi nào sử dụng:**
   - Decision tree
   - Use case examples
   - Best practices

### 🎯 Điểm quan trọng cần nhớ:

- **On-Demand** = No commitment, pay-as-you-go
- **Savings Plans** = Flexible, up to 72% savings
- **Reserved Instances** = Up to 75% savings, specific instance types
- **Spot Instances** = Up to 90% savings, interruptible
- **Dedicated Hosts** = Full control, exclusive use
- **Dedicated Instances** = Isolation without full control
- **Capacity Reservations** = Capacity guarantee, On-Demand pricing

### 💡 Best Practices:

1. **Bắt đầu với On-Demand** để hiểu usage patterns
2. **Chuyển sang Savings Plans hoặc RIs** khi có predictable usage
3. **Sử dụng Spot Instances** cho interruptible workloads
4. **Sử dụng Dedicated Hosts** cho strict compliance/licensing
5. **Sử dụng Capacity Reservations** cho critical workloads

---

## Kiểm tra kiến thức: Bài tập thực hành

### Question 1

**Một công ty dịch vụ tài chính cần chạy các ứng dụng nhạy cảm xử lý dữ liệu khách hàng bảo mật và yêu cầu tuân thủ các quy định ngành. Họ cần kiểm soát hoàn toàn physical server, bao gồm instance placement và resource allocation.**

**Tùy chọn pricing nào họ nên chọn?**

- ✅ **Dedicated Hosts** ← Đúng
- ❌ Savings Plans
- ❌ On Demand
- ❌ Spot Instances

**Giải thích:** Dedicated Hosts cung cấp sử dụng độc quyền một physical server, cung cấp kiểm soát hoàn toàn về placement và resource allocation. Điều này lý tưởng cho workloads nhạy cảm về bảo mật và licensing cụ thể.

**Phân tích:**
- 🔒 **Security-sensitive** = Cần isolation hoàn toàn
- 📋 **Compliance requirements** = Cần full control
- 🎯 **Instance placement control** = Dedicated Hosts cung cấp
- 💼 **Licensing control** = Dedicated Hosts cho phép BYOL

---

### Question 2

**Một startup đang chạy một batch processing workload có thể chịu được gián đoạn thỉnh thoảng, và họ muốn giảm chi phí bằng cách tận dụng unused Amazon EC2 capacity.**

**Tùy chọn pricing nào sẽ cung cấp cho họ tiết kiệm nhiều nhất?**

- ❌ Reserved Instances
- ❌ Savings Plans
- ❌ On Demand
- ✅ **Spot Instances** ← Đúng

**Giải thích:** Spot Instances cung cấp tiết kiệm lên đến 90% so với On-Demand pricing và phù hợp cho workloads có thể tolerate interruptions.

**Phân tích:**
- 🔄 **Interruptible workload** = Spot Instances phù hợp
- 💰 **Maximum savings** = Spot Instances (up to 90% off)
- ⚠️ **Can tolerate interruptions** = Điều kiện cho Spot Instances
- ❌ **Reserved Instances** = Không cho phép interruptions, yêu cầu commitment

---

### Question 3

**Một khách hàng đang xây dựng một ứng dụng mới và không chắc chắn về usage patterns của họ nhưng mong đợi sẽ phát triển và ổn định usage theo thời gian. Họ muốn bắt đầu mà không có cam kết dài hạn.**

**Tùy chọn pricing nào họ nên sử dụng?**

- ❌ Reserved Instances
- ❌ Savings Plans
- ✅ **On Demand** ← Đúng
- ❌ Spot Instances

**Giải thích:** On-Demand Instances không yêu cầu commitment và phù hợp cho các ứng dụng mới với usage patterns không thể dự đoán.

**Phân tích:**
- 🚀 **New application** = Chưa biết usage patterns
- 📊 **Unpredictable usage** = On-Demand phù hợp
- 🚫 **No long-term commitment** = On-Demand không yêu cầu
- ❌ **Reserved Instances** = Yêu cầu 1-3 năm commitment, không phù hợp
- ❌ **Savings Plans** = Yêu cầu commitment, không phù hợp cho unpredictable usage

---

## Tài liệu tham khảo

- 💰 [Amazon EC2 Pricing](https://aws.amazon.com/ec2/pricing/)
- 📊 [Savings Plans](https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html)
- 🔒 [Capacity Reservations](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-capacity-reservations.html)
- 💳 [Reserved Instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-reserved-instances.html)
- ⚡ [Spot Instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html)
- 🏢 [Dedicated Hosts](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/dedicated-hosts-overview.html)
- 📈 [AWS Cost Explorer](https://aws.amazon.com/aws-cost-management/aws-cost-explorer/)

---

*Bài viết này là phần thứ năm trong Module 2 - Compute in the Cloud của series AWS Cloud Practitioner Essentials. Bài viết được cập nhật vào tháng 11/2025 dựa trên nội dung khóa học AWS Cloud Practitioner Essentials.*

**Bạn có câu hỏi hay muốn thảo luận về Amazon EC2 Pricing? Hãy chia sẻ ở phần comment bên dưới nhé! ☁️**
