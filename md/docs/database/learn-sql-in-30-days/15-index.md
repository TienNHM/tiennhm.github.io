# 15. Index

> Nguồn: https://tiennhm.io.vn/docs/database/learn-sql-in-30-days/15-index
> Giới thiệu về Index trong SQL, cách tạo và sử dụng Index, cách tối ưu truy vấn SQL với Index.

> Mục tiêu bài học: Giới thiệu về Index trong SQL, cách tạo và sử dụng Index, cách tối ưu truy vấn SQL với Index.

---

## **1️⃣ Chỉ mục (Index) là gì?**
Chỉ mục là một cấu trúc dữ liệu giúp tối ưu hóa hiệu suất truy vấn trên bảng lớn.
- Khi không có **Index**, SQL phải duyệt **tất cả các hàng** trong bảng để tìm dữ liệu.
- Khi có **Index**, SQL sử dụng một **cấu trúc tối ưu** (B-Tree, Hash, v.v.) để truy vấn nhanh hơn.

**Ví dụ:**
🔹 **Không có index:** Bạn tìm tên của một người trong danh bạ 100.000 người, bạn phải kiểm tra từng dòng.
🔹 **Có index:** Bạn sử dụng mục lục theo chữ cái để tìm nhanh hơn.

---

## **2️⃣ Khi nào nên sử dụng Index?**
✅ **Nên dùng khi:**
- Truy vấn thường xuyên lọc dữ liệu bằng `WHERE`.
- Sắp xếp dữ liệu (`ORDER BY`, `GROUP BY`).
- Kết hợp bảng (`JOIN`).

❌ **Không nên dùng khi:**
- Bảng có **ít dữ liệu** (chỉ vài trăm dòng, index có thể làm chậm chèn/xóa).
- Cột có **nhiều giá trị trùng nhau** (ví dụ: cột `is_active` chỉ có `TRUE/FALSE`).

---

## **3️⃣ Các loại Index phổ biến**

| Loại Index                  | Mô tả | Khi nào dùng? |
|-----------------------------|--------|---------------|
| **B-Tree Index** (mặc định) | Tăng tốc truy vấn với `=`, `<`, `>`, `BETWEEN` | Cột có giá trị phân tán đều |
| **Unique Index**            | Đảm bảo giá trị duy nhất (ví dụ: email) | Cột có giá trị không trùng |
| **Composite Index**         | Chỉ mục trên **nhiều cột** cùng lúc | Truy vấn có điều kiện trên nhiều cột |
| **Full-Text Index**         | Dùng để tìm kiếm văn bản nhanh | Cột kiểu `TEXT` |

---

## **4️⃣ Thực hành: Tạo Index trong SQL**

### **📌 Bảng `orders` (đơn hàng)**
```sql
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **🔹 Tạo Index trên cột `order_date`**
```sql
CREATE INDEX idx_order_date ON orders(order_date);
```

👉 **Tối ưu hóa** truy vấn:
```sql
SELECT * FROM orders WHERE order_date > '2024-01-01';
```

### **🔹 Tạo Composite Index trên `customer_id` và `order_date`**
```sql
CREATE INDEX idx_customer_order ON orders(customer_id, order_date);
```

👉 **Tối ưu hóa** truy vấn:
```sql
SELECT * FROM orders WHERE customer_id = 10 ORDER BY order_date DESC;
```

### **🔹 Xem danh sách Index trong bảng**
```sql
SELECT indexname, indexdef FROM pg_indexes WHERE tablename = 'orders';
```

---

## **5️⃣ So sánh hiệu suất truy vấn trước & sau khi có Index**
📌 **Dùng `EXPLAIN ANALYZE` để kiểm tra tốc độ truy vấn:**
```sql
EXPLAIN ANALYZE SELECT * FROM orders WHERE order_date > '2024-01-01';
```

- **Trước khi có Index:** SQL phải quét toàn bộ bảng (**Sequential Scan**).
- **Sau khi có Index:** SQL sử dụng **Index Scan**, nhanh hơn nhiều.

---

## **6️⃣ Bài tập thực hành** 🎯
✅ **Bài 1:**
Tạo index trên bảng `customers` với cột `email`:
```sql
CREATE UNIQUE INDEX idx_customer_email ON customers(email);
```

✅ **Bài 2:**
Tạo Composite Index trên bảng `products` với `category_id` và `price`:
```sql
CREATE INDEX idx_category_price ON products(category_id, price);
```

✅ **Bài 3:**
So sánh hiệu suất truy vấn trước & sau khi có index bằng `EXPLAIN ANALYZE`:
```sql
EXPLAIN ANALYZE SELECT * FROM products WHERE category_id = 2 ORDER BY price DESC;
```

---

## **Tóm tắt bài học Ngày 15** 📌
- **Chỉ mục (Index)** giúp tăng tốc truy vấn nhưng không phải lúc nào cũng cần.
- **Các loại Index phổ biến:** B-Tree, Unique, Composite, Full-Text.
- **Dùng `EXPLAIN ANALYZE`** để kiểm tra tốc độ truy vấn.
- **Bài tập thực hành:** Tạo index trên bảng lớn và so sánh hiệu suất.

🚀 **Tiếp theo:** [Transactions & ACID](16.%20Transactions%20-%20ACID.md).

📌 **Lộ trình:** [Học SQL trong 30 ngày](00.%2030-Day%20SQL%20Learning%20Roadmap.md)

## Bài liên quan

- [Có index rồi mà truy vấn vẫn quét toàn bảng? Sargability và một hàm bọc quanh cột](https://tiennhm.io.vn/blog/sql-index-khong-duoc-dung-sargable) — Cột đã có index, câu WHERE lọc đúng cột đó, nhưng execution plan vẫn là Seq Scan.
- [Thêm 4 index làm INSERT chậm 6 lần: cái giá không ai nhắc khi bảo bạn đánh index](https://tiennhm.io.vn/blog/chi-phi-ghi-cua-index) — Mọi hướng dẫn tối ưu đều bảo thêm index, rất ít bài nói về hoá đơn.
