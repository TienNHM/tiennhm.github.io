# 28. SQL query optimization

> Nguồn: https://tiennhm.io.vn/docs/database/learn-sql-in-30-days/28-sql-query-optimization
> Hướng dẫn tối ưu hóa truy vấn SQL, phân tích truy vấn với EXPLAIN ANALYZE, tránh lỗi phổ biến khi viết SQL, tận dụng Index, Partition, Caching để tăng hiệu suất.

## **1️⃣ Giới Thiệu**
Viết truy vấn SQL hiệu quả không chỉ giúp tăng tốc độ xử lý dữ liệu mà còn giảm tải hệ thống. Để tối ưu hóa truy vấn, chúng ta cần:
✅ **Phân tích truy vấn bằng `EXPLAIN ANALYZE`** để hiểu SQL Engine xử lý dữ liệu như thế nào.
✅ **Tránh các lỗi phổ biến khi viết SQL** (dùng sai `JOIN`, lạm dụng `ORDER BY`).
✅ **Tận dụng Index, Partition, Caching** để tăng hiệu suất.

💡 **Mục tiêu:** Học cách **debug SQL**, hiểu **cách tối ưu hóa từng câu lệnh** và so sánh các chiến lược viết SQL tối ưu.

---

## **2️⃣ Phân Tích Truy Vấn SQL Với `EXPLAIN ANALYZE`**
### ✅ **2.1. `EXPLAIN ANALYZE` Là Gì?**
🔹 `EXPLAIN` giúp kiểm tra **kế hoạch thực thi truy vấn (Query Execution Plan)**.
🔹 `EXPLAIN ANALYZE` chạy truy vấn **thật** và hiển thị thời gian thực thi.

💡 **Ví dụ:**
```sql
EXPLAIN ANALYZE SELECT * FROM Orders WHERE OrderDate > '2024-01-01';
```
🔎 **Kết quả mẫu:**
```
Seq Scan on Orders  (cost=0.00..431.00 rows=1000 width=48) (actual time=0.045..2.343 rows=120 loops=1)
```
🔹 **Giải thích:**
- `Seq Scan on Orders` → SQL **quét toàn bộ bảng** (chậm nếu bảng lớn).
- `cost=0.00..431.00` → Chi phí xử lý (càng nhỏ càng tốt).
- `actual time=0.045..2.343` → Thời gian thực tế (ms).

💡 **Cách tối ưu:** Dùng Index để tránh quét toàn bộ bảng
```sql
CREATE INDEX idx_orders_orderdate ON Orders(OrderDate);
```

---

## **3️⃣ Tránh Các Lỗi Thường Gặp Khi Viết Truy Vấn SQL**
### ✅ **3.1. Tránh `SELECT *` Khi Không Cần Thiết**
🔹 `SELECT *` **gây lãng phí tài nguyên**, nhất là khi bảng có nhiều cột.

💡 **Ví dụ sai:**
```sql
SELECT * FROM Orders WHERE OrderDate > '2024-01-01';
```
💡 **Cách đúng:** Chỉ lấy cột cần thiết
```sql
SELECT OrderID, CustomerID FROM Orders WHERE OrderDate > '2024-01-01';
```
🔹 **Lợi ích:** Giảm lượng dữ liệu truyền tải, tăng tốc truy vấn.

---

### ✅ **3.2. Dùng `JOIN` Hiệu Quả**
🔹 `JOIN` sai cách có thể gây **Cartesian Join (Nhân đề)**, khiến SQL chạy cực chậm.

💡 **Ví dụ sai:**
```sql
SELECT Customers.Name, Orders.TotalAmount
FROM Customers, Orders
WHERE Customers.CustomerID = Orders.CustomerID; -- ❌ Lỗi: Dùng dấu phẩy thay vì JOIN
```
💡 **Cách đúng:**
```sql
SELECT Customers.Name, Orders.TotalAmount
FROM Customers
INNER JOIN Orders ON Customers.CustomerID = Orders.CustomerID; -- ✅ Tối ưu hơn
```
🔹 **Lợi ích:**
- **Tránh nhân đề** (Cartesian Product).
- **Dễ bảo trì & dễ đọc hơn**.

---

### ✅ **3.3. Hạn Chế Dùng `ORDER BY` Không Cần Thiết**
🔹 `ORDER BY` làm SQL **tốn CPU**, nhất là trên bảng lớn.

💡 **Ví dụ sai:**
```sql
SELECT * FROM Orders ORDER BY OrderDate;
```
💡 **Cách đúng:** Chỉ dùng khi thực sự cần thiết
```sql
SELECT OrderID, CustomerID FROM Orders WHERE OrderDate > '2024-01-01' ORDER BY OrderDate DESC;
```

---

## **4️⃣ Tối Ưu Hiệu Suất Với `INDEX`, `PARTITION`, `CACHING`**
### ✅ **4.1. Index – Tăng Tốc Tìm Kiếm**
🔹 Index giúp truy vấn nhanh hơn, đặc biệt với `WHERE`, `JOIN`.

💡 **Ví dụ:**
```sql
CREATE INDEX idx_orders_orderdate ON Orders(OrderDate);
```
🔹 **Lợi ích:**
- Giảm thời gian tìm kiếm từ **O(n) → O(log n)**.
- Tăng tốc truy vấn với `WHERE OrderDate > ...`.

---

### ✅ **4.2. Partition – Xử Lý Dữ Liệu Lớn**
🔹 Nếu bảng có hàng **triệu dòng**, **Partitioning** giúp SQL chỉ đọc dữ liệu cần thiết.

💡 **Ví dụ:** Chia bảng `Orders` theo năm
```sql
CREATE TABLE Orders_2024 PARTITION OF Orders FOR VALUES FROM ('2024-01-01') TO ('2024-12-31');
```
🔹 **Lợi ích:**
- Giảm số dòng phải quét.
- Nhanh hơn so với quét toàn bộ bảng.

---

### ✅ **4.3. Caching – Lưu Kết Quả Để Tránh Chạy Lại**
🔹 Nếu truy vấn chạy nhiều lần với dữ liệu ít thay đổi, **dùng Materialized View hoặc Redis Cache**.

💡 **Ví dụ:**
```sql
CREATE MATERIALIZED VIEW OrderSummary AS
SELECT CustomerID, SUM(TotalAmount) AS TotalSpent
FROM Orders GROUP BY CustomerID;
```
🔹 **Lợi ích:**
- **Giảm tải** cho hệ thống.
- **Truy vấn nhanh hơn** so với tính toán lại mỗi lần.

---

## **5️⃣ Bài Tập Thực Hành & Gợi Ý Đáp Án**
### 🔹 **Bài 1: Phân tích hiệu suất truy vấn**
Cho bảng `Orders` có hơn **1 triệu dòng**, chạy lệnh sau:
```sql
EXPLAIN ANALYZE SELECT * FROM Orders WHERE OrderDate > '2024-01-01';
```
📌 **Câu hỏi:**
1️⃣ Truy vấn này có quét toàn bộ bảng không?
2️⃣ Làm sao để tối ưu nó?

📝 **Gợi ý đáp án:**
- Nếu thấy `Seq Scan`, nghĩa là đang quét toàn bộ bảng → **Cần tạo Index**
```sql
CREATE INDEX idx_orders_orderdate ON Orders(OrderDate);
```

---

### 🔹 **Bài 2: Viết truy vấn tối ưu hóa**
Bảng `Products` có hơn **5 triệu dòng**, cần tìm sản phẩm bán chạy nhất theo danh mục.

💡 **Viết truy vấn tối ưu:**
```sql
SELECT CategoryID, ProductID, SUM(Quantity) AS TotalSold
FROM OrderDetails
GROUP BY CategoryID, ProductID
ORDER BY TotalSold DESC
LIMIT 10;
```
📌 **Câu hỏi:**
1️⃣ Cần Index gì để tối ưu?
2️⃣ Nếu bảng quá lớn, dùng Partition như thế nào?

📝 **Gợi ý đáp án:**
- Dùng Index:
```sql
CREATE INDEX idx_orderdetails_category_product ON OrderDetails(CategoryID, ProductID);
```
- Nếu dữ liệu lớn → **Dùng Partition theo CategoryID**.

---

#### 📌 **Tóm tắt bài học**
✅ **Dùng `EXPLAIN ANALYZE` để kiểm tra hiệu suất truy vấn.**
✅ **Tránh lỗi thường gặp: `SELECT *`, `ORDER BY` không cần thiết, sai `JOIN`**.
✅ **Tận dụng Index, Partition, Caching để tối ưu hóa.**

---

🚀 **Tiếp theo:** [Recursive Queries & Window Functions](29.%20Recursive%20Queries%20-%20Window%20Functions.md).

📌 **Lộ trình:** [Học SQL trong 30 ngày](00.%2030-Day%20SQL%20Learning%20Roadmap.md).
