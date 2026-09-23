# M02.02 - Amazon EC2 Instance Types

> Nguồn: https://tiennhm.io.vn/en/docs/aws-cloud-practitioner-essentials/compute-in-the-cloud/amazon-ec2-instance-types
> Tìm hiểu về các loại EC2 instance types khác nhau và đặc điểm của chúng. Xác định các use cases phù hợp cho từng loại EC2 instance type - General Purpose, Compute Optimized, Memory Optimized, Accelerated Computing, và Storage Optimized.

Amazon EC2 cung cấp một loạt các instance types, mỗi loại được tùy chỉnh để đáp ứng các yêu cầu use case cụ thể. Các instances này đi kèm với các kết hợp khác nhau của CPU, memory, storage và networking capabilities, vì vậy bạn có thể chọn đúng mix tài nguyên để tối ưu hóa hiệu suất cho ứng dụng của mình.

## Mục tiêu học tập

Sau khi hoàn thành bài học này, bạn sẽ có thể:

- ✅ Giải thích các loại EC2 instance types khác nhau và đặc điểm của chúng
- ✅ Xác định các use cases phù hợp cho từng loại EC2 instance type

## Ví dụ dễ hiểu: Các loại máy pha cà phê

Hãy hình dung EC2 instances như các loại máy pha cà phê khác nhau trong cửa hàng cà phê của chúng ta. Khách hàng thích sự đa dạng. Không phải tất cả họ đều uống cùng một thứ, vì vậy chúng ta cần nhiều hơn chỉ một loại máy pha cà phê.

**Ví dụ:**
- ☕ **High-powered espresso machine** - Cho những người muốn espresso shots hoặc lattes
- 🫖 **Classic-drip coffee machine** - Cho khách hàng chỉ muốn cà phê đơn giản
- 🧊 **Cold-brew machine** - Cho những người muốn caffeine lạnh

**Điểm quan trọng:**
Nếu chúng ta muốn doanh nghiệp hoạt động hiệu quả nhất có thể, điều quan trọng là sử dụng đúng máy pha cà phê cho mỗi đơn hàng.

## EC2 Instance Types: Tương tự như máy pha cà phê

Điều này tương tự như triển khai EC2 instances. Có các loại instances khác nhau phục vụ các mục đích khác nhau trong môi trường AWS của bạn.

**Instance types được nhóm dưới instance families**, cung cấp các kết hợp khác nhau của:
- 💻 **CPU** - Sức mạnh xử lý
- 💾 **Memory** - Bộ nhớ
- 💿 **Storage** - Lưu trữ
- 🌐 **Networking capacity** - Khả năng mạng

Điều này cho bạn sự linh hoạt để tối ưu hóa cho các loại tác vụ nhất định bằng cách chọn instances cụ thể cho workload cụ thể của bạn.

![EC2 Instance Types](https://tiennhm.io.vn/img/docs/AWS-Cloud-Practitioner-Essentials/M02_L02_InstanceTypes.png)

## 5 Instance Families chính

Các instance families khác nhau là:
1. **General purpose** - Mục đích chung
2. **Compute optimized** - Tối ưu tính toán
3. **Memory optimized** - Tối ưu bộ nhớ
4. **Accelerated computing** - Tính toán tăng tốc
5. **Storage optimized** - Tối ưu lưu trữ

Hãy cùng khám phá từng loại!

### 1. General Purpose (Mục đích chung)

**Đặc điểm:**
- ⚖️ **Balanced mix** - Cung cấp sự cân bằng tốt của compute, memory và networking resources
- 🎯 **Versatile** - Có thể được sử dụng cho nhiều workloads đa dạng

**Use cases:**
- 🌐 **Web services** - Dịch vụ web
- 📦 **Code repositories** - Kho lưu trữ code
- 🚀 **Starting point** - Điểm khởi đầu tốt nếu bạn không biết workload của mình sẽ hoạt động như thế nào trước thời hạn

**Ví dụ:**
- Web servers
- Development environments
- Small to medium databases
- Application servers

**Ví dụ instance types:**
- `t3.micro`, `t3.small` - Burstable performance
- `m5.large`, `m5.xlarge` - General purpose

### 2. Compute Optimized (Tối ưu tính toán)

**Đặc điểm:**
- 💻 **High CPU performance** - Hiệu suất CPU cao
- ⚡ **Compute-intensive** - Tối ưu cho các tác vụ compute-intensive

**Use cases:**
- 🎮 **Gaming servers** - Máy chủ game
- 🔬 **High-performance computing (HPC)** - Tính toán hiệu suất cao
- 🤖 **Machine learning tasks** - Tác vụ machine learning
- 📊 **Scientific modeling** - Mô hình khoa học
- 🧮 **Batch processing** - Xử lý batch

**Ví dụ:**
- Video encoding
- Scientific simulations
- High-traffic web servers
- Distributed analytics

**Ví dụ instance types:**
- `c5.large`, `c5.xlarge` - Compute optimized
- `c6i.xlarge` - Latest generation compute optimized

### 3. Memory Optimized (Tối ưu bộ nhớ)

**Đặc điểm:**
- 💾 **High memory capacity** - Dung lượng bộ nhớ cao
- ⚡ **Fast performance** - Hiệu suất nhanh cho workloads xử lý large datasets trong memory

**Use cases:**
- 📊 **Processing large datasets** - Xử lý datasets lớn
- 📈 **Data analytics** - Phân tích dữ liệu
- 🗄️ **Databases** - Cơ sở dữ liệu
- 🔍 **Real-time analytics** - Phân tích thời gian thực
- 💼 **In-memory databases** - Cơ sở dữ liệu trong bộ nhớ

**Ví dụ:**
- Redis, Memcached
- SAP HANA
- Real-time big data analytics
- High-performance databases

**Ví dụ instance types:**
- `r5.large`, `r5.xlarge` - Memory optimized
- `r6i.xlarge` - Latest generation memory optimized
- `x1e.32xlarge` - Extreme memory

### 4. Accelerated Computing (Tính toán tăng tốc)

**Đặc điểm:**
- 🚀 **Hardware accelerators** - Sử dụng hardware accelerators
- 🔧 **Co-processors** - Các co-processors thực hiện các chức năng hiệu quả hơn so với phần mềm chạy trên CPUs

**Use cases:**
- 🧮 **Floating-point number calculations** - Tính toán số dấu phẩy động
- 🎨 **Graphics processing** - Xử lý đồ họa
- 🔍 **Data pattern matching** - Khớp mẫu dữ liệu
- 🤖 **Machine learning inference** - Suy luận machine learning
- 🎬 **Video processing** - Xử lý video

**Hardware accelerators bao gồm:**
- 🎮 **GPUs (Graphics Processing Units)** - Đơn vị xử lý đồ họa
- 🧠 **FPGAs (Field-Programmable Gate Arrays)** - Mảng cổng có thể lập trình
- ⚡ **AWS Inferentia** - Chip inference của AWS
- 🚂 **AWS Trainium** - Chip training của AWS

**Ví dụ:**
- Deep learning training
- Video transcoding
- 3D rendering
- Scientific computing

**Ví dụ instance types:**
- `p3.2xlarge` - GPU instances (NVIDIA)
- `g4dn.xlarge` - GPU instances (NVIDIA T4)
- `inf1.xlarge` - AWS Inferentia
- `trn1.2xlarge` - AWS Trainium

### 5. Storage Optimized (Tối ưu lưu trữ)

**Đặc điểm:**
- 💿 **High performance for locally stored data** - Hiệu suất cao cho dữ liệu được lưu trữ cục bộ
- 📊 **High disk throughput** - Thông lượng đĩa cao
- ⚡ **Low latency** - Độ trễ thấp

**Use cases:**
- 🗄️ **Large databases** - Cơ sở dữ liệu lớn
- 📦 **Data warehousing** - Kho dữ liệu
- 💾 **I/O-intensive applications** - Ứng dụng I/O-intensive
- 📊 **Data analytics on local storage** - Phân tích dữ liệu trên local storage
- 🔍 **OLTP (Online Transaction Processing)** - Xử lý giao dịch trực tuyến

**Ví dụ:**
- NoSQL databases (MongoDB, Cassandra)
- Data warehousing (Hadoop, Spark)
- OLTP databases
- Log processing

**Ví dụ instance types:**
- `i3.large`, `i3.xlarge` - Storage optimized (NVMe SSD)
- `i4i.xlarge` - Latest generation storage optimized
- `d2.xlarge` - Dense storage instances

## Instance Size (Kích thước Instance)

Sau khi bạn đã quyết định về instance type, phần tiếp theo là chọn **instance size phù hợp**.

### Cân nhắc quan trọng

**Tôi khuyến khích bạn không chỉ nghĩ về performance mà còn về cost:**

- ✅ **Bigger instances** = More CPU, memory, storage = **Cost more**
- 💰 **Smaller instances** = Less resources = **Cost less**

**Điều quan trọng:**
Tìm sự cân bằng phù hợp với nhu cầu và ngân sách của bạn. Điều này đảm bảo rằng bạn chọn instance size phù hợp để có hiệu suất tốt nhất, nhưng không trả cho các tài nguyên bạn không thực sự cần.

### Instance Size Naming

Instance sizes thường được đặt tên như sau:
- `nano` - Nhỏ nhất
- `micro` - Rất nhỏ
- `small` - Nhỏ
- `medium` - Trung bình
- `large` - Lớn
- `xlarge` - Rất lớn
- `2xlarge`, `4xlarge`, `8xlarge`, etc. - Cực lớn
- `metal` - Bare metal instances

**Ví dụ:**
- `t3.micro` - Burstable, rất nhỏ
- `m5.large` - General purpose, lớn
- `c5.4xlarge` - Compute optimized, rất lớn
- `r5.xlarge` - Memory optimized, rất lớn

## Instance Type Naming Conventions

Instance types được đặt tên dựa trên **instance family** và **instance size**.

**Cấu trúc tên:**
```
[Series][Generation][Options].[Size]
```

**Ví dụ:** `c7gn.xlarge`
- `c` = Series (Compute optimized)
- `7` = Generation (thế hệ thứ 7)
- `gn` = Options (Graviton processor + Network optimized)
- `xlarge` = Size

### Series (Vị trí đầu tiên)

| Series | Mô tả |
|--------|-------|
| **C** | Compute optimized |
| **D** | Dense storage |
| **F** | FPGA |
| **G** | Graphics intensive |
| **Hpc** | High performance computing |
| **I** | Storage optimized |
| **M** | General purpose |
| **Mac** | macOS |
| **P** | GPU accelerated |
| **R** | Memory optimized |
| **T** | Burstable performance |
| **U** | High memory |
| **X** | Memory intensive |
| **Z** | High memory |

### Options (Vị trí thứ ba)

| Option | Mô tả |
|--------|-------|
| **a** | AMD processors |
| **g** | AWS Graviton processors |
| **i** | Intel processors |
| **n** | Network and EBS optimized |
| **d** | Instance store volumes |
| **e** | Extra storage/memory/GPU memory |

**Tài liệu tham khảo:**
Để biết thêm thông tin chi tiết về naming conventions, xem [Amazon EC2 instance type naming conventions](https://docs.aws.amazon.com/ec2/latest/instancetypes/instance-type-names.html).

## Tính linh hoạt của Cloud

**Phần tốt nhất là bạn không phải sử dụng một instance type hoặc size cụ thể mãi mãi!**

**Tình huống:**
- 🔍 Bạn có thể thấy rằng một instance bạn chọn ban đầu không cung cấp hiệu suất bạn cần
- ✅ **Điều đó hoàn toàn ổn. Bạn có thể thay đổi nó!**

**Lợi ích của Cloud:**
- 🔄 Cloud cho bạn khả năng pivot (xoay chuyển) rất nhanh
- 💡 Hãy tận dụng nó!
- 📈 Bắt đầu nhỏ, scale lên khi cần
- 📉 Scale xuống khi không cần

**Ví dụ:**
- Bắt đầu với `t3.micro` để test
- Scale lên `m5.large` khi có traffic
- Scale lên `m5.4xlarge` trong giờ cao điểm
- Scale xuống khi traffic giảm

## Tổng kết: EC2 Instance Types

### ✅ 5 Instance Families chính:

1. **General Purpose** ⚖️
   - Cân bằng compute, memory, networking
   - Use cases: Web services, code repositories, starting point

2. **Compute Optimized** 💻
   - High CPU performance
   - Use cases: Gaming, HPC, ML, scientific modeling

3. **Memory Optimized** 💾
   - High memory capacity
   - Use cases: Large datasets, analytics, databases

4. **Accelerated Computing** 🚀
   - Hardware accelerators (GPUs, FPGAs)
   - Use cases: Graphics, ML inference, video processing

5. **Storage Optimized** 💿
   - High disk throughput
   - Use cases: Large databases, data warehousing, I/O-intensive

### 🎯 Điểm quan trọng cần nhớ:

- **Instance Family** = Loại tối ưu hóa (General Purpose, Compute, Memory, etc.)
- **Instance Size** = Kích thước (micro, small, large, xlarge, etc.)
- **Naming Convention** = [Series][Generation][Options].[Size]
- **Flexibility** = Bạn có thể thay đổi instance type/size khi cần
- **Cost vs Performance** = Tìm sự cân bằng phù hợp

### 💡 Best Practices:

1. **Bắt đầu nhỏ** - Bắt đầu với instance nhỏ và scale lên khi cần
2. **Monitor performance** - Theo dõi hiệu suất để xác định nhu cầu
3. **Right-sizing** - Chọn instance phù hợp với workload
4. **Cost optimization** - Không over-provision, chỉ trả cho những gì bạn cần
5. **Test và iterate** - Thử nghiệm và lặp lại để tìm cấu hình tối ưu

---

## Kiểm tra kiến thức: Bài tập thực hành

### Question 1

**Một tổ chức tài chính đang chạy một ứng dụng phân tích thời gian thực xử lý datasets lớn được lưu trữ trên nhiều servers để cung cấp kết quả truy vấn nhanh. Ứng dụng yêu cầu xử lý dữ liệu nhanh với trọng tâm là xử lý hiệu quả khối lượng lớn thông tin.**

**Loại Amazon EC2 instance type nào sẽ là LỰA CHỌN TỐT NHẤT cho tác vụ này?**

- ❌ General purpose
- ❌ Compute optimized
- ❌ Storage optimized
- ✅ **Memory optimized** ← Đúng

**Giải thích:** Memory optimized instances được thiết kế cho high-memory workloads và cung cấp hiệu suất cần thiết để xử lý hiệu quả khối lượng lớn dữ liệu, làm cho chúng trở thành lựa chọn tốt nhất cho phân tích thời gian thực.

**Phân tích:**
- 📊 **Real-time analytics** = Cần xử lý nhanh large datasets
- 💾 **Large datasets in memory** = Memory optimized phù hợp
- ⚡ **Fast processing** = Memory optimized cung cấp hiệu suất nhanh

---

### Question 2

**Một công ty bán lẻ đang thiết lập một giải pháp để phân tích dữ liệu bán hàng lịch sử được lưu trữ cục bộ. Giải pháp yêu cầu truy cập nhanh vào datasets lớn với thông lượng đĩa cao, nhất quán để truy xuất dữ liệu nhanh.**

**Loại Amazon EC2 instance type nào sẽ PHÙ HỢP NHẤT cho use case này?**

- ❌ General purpose
- ❌ Compute optimized
- ❌ Accelerated computing
- ✅ **Storage optimized** ← Đúng

**Giải thích:** Storage optimized instances được thiết kế cho workloads yêu cầu high-disk throughput và low-latency access đến datasets lớn. Điều này làm cho chúng trở thành lựa chọn tốt nhất cho các ứng dụng phân tích dữ liệu.

**Phân tích:**
- 💿 **Data stored locally** = Cần high disk performance
- 📊 **High disk throughput** = Storage optimized cung cấp
- ⚡ **Fast data retrieval** = Low latency access
- 📈 **Historical sales data analysis** = I/O-intensive workload

---

## Bảng so sánh nhanh

| Instance Family | Tối ưu cho | Use Cases | Ví dụ Types |
|-----------------|-----------|-----------|--------------|
| **General Purpose** | Cân bằng | Web servers, Development | `t3.micro`, `m5.large` |
| **Compute Optimized** | CPU | Gaming, HPC, ML | `c5.xlarge`, `c6i.2xlarge` |
| **Memory Optimized** | Memory | Databases, Analytics | `r5.xlarge`, `r6i.4xlarge` |
| **Accelerated Computing** | GPU/Accelerators | Graphics, ML inference | `p3.2xlarge`, `g4dn.xlarge` |
| **Storage Optimized** | Disk I/O | Large databases, Data warehousing | `i3.xlarge`, `i4i.2xlarge` |

---

## Tài liệu tham khảo

- 📚 [Amazon EC2 Instance Types](https://aws.amazon.com/ec2/instance-types/)
- 📖 [EC2 Instance Type Naming Conventions](https://docs.aws.amazon.com/ec2/latest/instancetypes/instance-type-names.html)
- 💰 [EC2 Pricing](https://aws.amazon.com/ec2/pricing/)
- 📊 [EC2 Instance Specifications](https://aws.amazon.com/ec2/instance-types/specs/)
- 🔍 [Choose the Right EC2 Instance Type](https://aws.amazon.com/ec2/instance-types/)

---

*Bài viết này là phần thứ hai trong Module 2 - Compute in the Cloud của series AWS Cloud Practitioner Essentials. Bài viết được cập nhật vào tháng 11/2025 dựa trên nội dung khóa học AWS Cloud Practitioner Essentials.*

**Bạn có câu hỏi hay muốn thảo luận về EC2 Instance Types? Hãy chia sẻ ở phần comment bên dưới nhé! ☁️**
