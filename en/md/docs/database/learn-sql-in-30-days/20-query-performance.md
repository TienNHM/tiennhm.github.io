# 20. Query Performance

> Nguồn: https://tiennhm.io.vn/en/docs/database/learn-sql-in-30-days/20-query-performance
> Tìm hiểu cách phân tích và tối ưu hiệu suất truy vấn SQL bằng EXPLAIN ANALYZE.

> Mục tiêu bài học: Hiểu cách sử dụng **EXPLAIN ANALYZE** để kiểm tra hiệu suất truy vấn và so sánh hiệu suất khi có/không có index.

---

## 🔍 **1. Hiệu suất truy vấn là gì?**
**Hiệu suất truy vấn** là mức độ nhanh/chậm khi một truy vấn SQL được thực thi. Truy vấn tối ưu giúp giảm tải cho cơ sở dữ liệu, cải thiện trải nghiệm người dùng và tiết kiệm tài nguyên hệ thống.

💡 **Tại sao cần tối ưu hiệu suất truy vấn?**
✔ Giảm thời gian thực thi.
✔ Tối ưu tài nguyên CPU, RAM, I/O đĩa.
✔ Tránh tình trạng **chậm hệ thống** khi dữ liệu lớn.
✔ Cải thiện khả năng mở rộng của ứng dụng.

---

## ⚙️ **2. Kiểm tra hiệu suất bằng EXPLAIN ANALYZE**
SQL cung cấp lệnh **EXPLAIN ANALYZE** để phân tích cách truy vấn hoạt động và tìm điểm cần tối ưu.

### **Cấu trúc câu lệnh**
```sql
EXPLAIN ANALYZE <query>;
```
🔹 **EXPLAIN**: Hiển thị cách SQL lập kế hoạch thực thi truy vấn.
🔹 **ANALYZE**: Thực thi truy vấn thực tế và hiển thị thời gian thực thi.

### **Ví dụ kiểm tra hiệu suất**
Giả sử chúng ta có bảng `orders` chứa **1 triệu bản ghi**:
```sql
SELECT * FROM orders WHERE customer_id = 1001;
```
Sử dụng **EXPLAIN ANALYZE**:
```sql
EXPLAIN ANALYZE SELECT * FROM orders WHERE customer_id = 1001;
```
📌 **Kết quả phân tích:**
```plaintext
Seq Scan on orders (cost=0.00..14537.00 rows=100 width=50)
   Filter: (customer_id = 1001)
Execution Time: 120.35 ms
```
🚨 **Vấn đề:** SQL đang thực hiện **Sequential Scan** (quét toàn bộ bảng), làm chậm truy vấn!

---

## 🚀 **3. Cải thiện hiệu suất với Index**
### **3.1. Tạo Index để tăng tốc truy vấn**
Chúng ta tạo **chỉ mục (Index)** cho cột `customer_id`:
```sql
CREATE INDEX idx_customer_id ON orders(customer_id);
```

🔹 **Index** giúp tìm kiếm nhanh hơn thay vì quét toàn bộ bảng.

### **3.2. Kiểm tra lại hiệu suất**
Sau khi thêm index, chạy lại EXPLAIN ANALYZE:
```sql
EXPLAIN ANALYZE SELECT * FROM orders WHERE customer_id = 1001;
```

📌 **Kết quả mới:**
```plaintext
Index Scan using idx_customer_id on orders (cost=0.00..150.00 rows=100 width=50)
   Index Cond: (customer_id = 1001)
Execution Time: 2.35 ms
```
✅ **Cải thiện đáng kể**: Từ **120.35 ms** xuống **2.35 ms**! 🚀

---

## 📊 **4. So sánh hiệu suất: Có Index vs. Không Index**

| Truy vấn                                                  | Không có Index | Có Index |
|-----------------------------------------------------------|----------------|----------|
| `SELECT * FROM orders WHERE customer_id = 1001;`          | 120.35 ms      | 2.35 ms  |
| `SELECT COUNT(*) FROM orders WHERE status = 'Completed';` | 95.80 ms       | 1.80 ms  |
| `SELECT * FROM orders ORDER BY created_at DESC;`          | 150.60 ms      | 3.20 ms  |

📌 **Kết luận:** Index giúp giảm thời gian thực thi từ hàng trăm ms xuống vài ms!

---

## 🎯 **5. Bài tập thực hành**

### ✅ **Bài 1: Kiểm tra hiệu suất trên bảng khách hàng**
> Dùng `EXPLAIN ANALYZE` để kiểm tra truy vấn:
```sql
SELECT *
FROM customers
WHERE email = 'user@example.com';
```
✔ Tạo index nếu cần thiết.

### ✅ **Bài 2: Tối ưu hóa truy vấn với ORDER BY**
> Kiểm tra hiệu suất khi sắp xếp dữ liệu:
```sql
SELECT *
FROM products
ORDER BY price DESC;
```
✔ Thử tạo index cho `price` và kiểm tra hiệu suất.

### ✅ **Bài 3: So sánh hiệu suất khi JOIN**
> Kiểm tra hiệu suất khi JOIN hai bảng:
```sql
SELECT
    o.id,
    c.name,
    o.total
FROM orders o
JOIN customers c ON o.customer_id = c.id;
```
✔ Kiểm tra **EXPLAIN ANALYZE** và tối ưu hóa nếu cần.

---

## 🔥 **Tóm tắt bài học Ngày 20**
✅ **EXPLAIN ANALYZE** giúp kiểm tra hiệu suất truy vấn.
✅ **Index** giúp tăng tốc truy vấn đáng kể.
✅ **So sánh hiệu suất** giữa có Index và không có Index.
✅ **Thực hành:** Kiểm tra và tối ưu truy vấn với EXPLAIN ANALYZE.

---

🚀 **Tiếp theo:** [Ôn tập và bài tập tổng hợp tuần 3](21.%20Review%203.md).

📌 **Lộ trình:** [Học SQL trong 30 ngày](00.%2030-Day%20SQL%20Learning%20Roadmap.md).
