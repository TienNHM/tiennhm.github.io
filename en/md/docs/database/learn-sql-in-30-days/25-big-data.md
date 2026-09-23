# 25. Big Data

> Nguồn: https://tiennhm.io.vn/en/docs/database/learn-sql-in-30-days/25-big-data
> Làm việc với dữ liệu lớn (Big Data) trong SQL - Partitioning, Sharding, Compression.

#### 🎯 **Mục tiêu học tập**
- Hiểu khái niệm dữ liệu lớn trong SQL.
- Tối ưu hóa hiệu suất truy vấn với **Partitioning (Phân vùng bảng)**.
- Sử dụng **Sharding (Chia nhỏ dữ liệu)** và **Compression (Nén dữ liệu)** để cải thiện hiệu suất.

---

## 📝 **1. Khái niệm dữ liệu lớn trong SQL**
Dữ liệu lớn (Big Data) đề cập đến tập dữ liệu có dung lượng quá lớn để xử lý bằng các phương pháp truyền thống. Trong SQL, làm việc với dữ liệu lớn cần chú ý đến:
- **Partitioning (Phân vùng bảng)**
- **Sharding (Chia nhỏ dữ liệu)**
- **Indexing (Chỉ mục)**
- **Compression (Nén dữ liệu)**

---

## 📝 **2. Partitioning (Phân vùng bảng)**
**Partitioning** giúp chia nhỏ bảng lớn thành nhiều phần nhỏ hơn, giúp tăng tốc truy vấn. Có 3 loại phân vùng phổ biến:

### **🔹 2.1. Range Partitioning (Phân vùng theo khoảng)**
Chia dữ liệu thành các vùng dựa trên giá trị của một cột, ví dụ: phân vùng dữ liệu theo năm.

🔹 **Ví dụ (PostgreSQL):**
```sql
CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    sale_date DATE NOT NULL,
    amount DECIMAL(10,2) NOT NULL
) PARTITION BY RANGE (sale_date);

CREATE TABLE sales_2023 PARTITION OF sales
FOR VALUES FROM ('2023-01-01') TO ('2023-12-31');

CREATE TABLE sales_2024 PARTITION OF sales
FOR VALUES FROM ('2024-01-01') TO ('2024-12-31');
```

---

### **🔹 2.2. List Partitioning (Phân vùng theo danh sách)**
Phân vùng dữ liệu theo danh sách giá trị cụ thể, ví dụ: chia dữ liệu theo khu vực.

🔹 **Ví dụ (PostgreSQL):**
```sql
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    region TEXT NOT NULL
) PARTITION BY LIST (region);

CREATE TABLE customers_vietnam PARTITION OF customers
FOR VALUES IN ('Vietnam');

CREATE TABLE customers_usa PARTITION OF customers
FOR VALUES IN ('USA');
```

---

### **🔹 2.3. Hash Partitioning (Phân vùng theo băm)**
Phân vùng dữ liệu bằng cách băm giá trị của một cột.

🔹 **Ví dụ (PostgreSQL):**
```sql
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL
) PARTITION BY HASH (customer_id);

CREATE TABLE orders_p0 PARTITION OF orders FOR VALUES WITH (MODULUS 4, REMAINDER 0);
CREATE TABLE orders_p1 PARTITION OF orders FOR VALUES WITH (MODULUS 4, REMAINDER 1);
```

---

## 📝 **3. Sharding (Chia nhỏ dữ liệu)**
**Sharding** là kỹ thuật chia nhỏ dữ liệu thành nhiều máy chủ khác nhau.
Ví dụ: Một hệ thống lưu trữ khách hàng trên 2 server:
- **Server 1:** Chứa khách hàng có `id` từ 1-500000.
- **Server 2:** Chứa khách hàng có `id` từ 500001 trở đi.

💡 **Lưu ý:** Sharding thường áp dụng cho các hệ thống có dữ liệu lớn và yêu cầu mở rộng theo chiều ngang (horizontal scaling).

---

## 📝 **4. Compression (Nén dữ liệu)**
Dữ liệu lớn có thể làm chậm truy vấn, vì vậy cần sử dụng **nén dữ liệu** để giảm kích thước lưu trữ.

🔹 **Ví dụ (PostgreSQL - Nén cột dữ liệu)**
```sql
ALTER TABLE sales
SET (storage = EXTERNAL);
```

🔹 **Ví dụ (MySQL - Sử dụng InnoDB compression)**
```sql
CREATE TABLE sales (
    id INT PRIMARY KEY,
    sale_date DATE NOT NULL,
    amount DECIMAL(10,2) NOT NULL
) ROW_FORMAT=COMPRESSED KEY_BLOCK_SIZE=8;
```

---

## 🎯 **Bài tập thực hành & Gợi ý đáp án**

### **Bài 1: Tạo bảng `orders` và phân vùng theo năm**
#### **Yêu cầu:**
- Tạo bảng `orders` gồm các cột `id`, `order_date`, `amount`.
- Phân vùng theo năm 2023 và 2024.

🔹 **Gợi ý đáp án (PostgreSQL)**
```sql
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_date DATE NOT NULL,
    amount DECIMAL(10,2) NOT NULL
) PARTITION BY RANGE (order_date);

CREATE TABLE orders_2023 PARTITION OF orders
FOR VALUES FROM ('2023-01-01') TO ('2023-12-31');

CREATE TABLE orders_2024 PARTITION OF orders
FOR VALUES FROM ('2024-01-01') TO ('2024-12-31');
```

---

### **Bài 2: Tạo bảng `customers` và phân vùng theo quốc gia**
#### **Yêu cầu:**
- Tạo bảng `customers` gồm các cột `id`, `name`, `region`.
- Phân vùng dữ liệu theo `Vietnam` và `USA`.

🔹 **Gợi ý đáp án (PostgreSQL)**
```sql
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    region TEXT NOT NULL
) PARTITION BY LIST (region);

CREATE TABLE customers_vietnam PARTITION OF customers
FOR VALUES IN ('Vietnam');

CREATE TABLE customers_usa PARTITION OF customers
FOR VALUES IN ('USA');
```

---

### **Bài 3: Phân vùng bảng `sales` theo băm**
#### **Yêu cầu:**
- Tạo bảng `sales` gồm các cột `id`, `customer_id`, `amount`.
- Phân vùng bảng theo `customer_id` thành 3 phần.

🔹 **Gợi ý đáp án (PostgreSQL)**
```sql
CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL
) PARTITION BY HASH (customer_id);

CREATE TABLE sales_p0 PARTITION OF sales FOR VALUES WITH (MODULUS 3, REMAINDER 0);
CREATE TABLE sales_p1 PARTITION OF sales FOR VALUES WITH (MODULUS 3, REMAINDER 1);
CREATE TABLE sales_p2 PARTITION OF sales FOR VALUES WITH (MODULUS 3, REMAINDER 2);
```

---

#### 📌 **Tóm tắt bài học**
- **Partitioning:** Giúp chia nhỏ bảng lớn thành nhiều phần để truy vấn nhanh hơn.
- **Sharding:** Chia dữ liệu thành nhiều máy chủ khác nhau để mở rộng hệ thống.
- **Compression:** Giảm kích thước lưu trữ và tăng tốc truy vấn.

---

🚀 **Tiếp theo:** So sánh SQL & NoSQL.

📌 **Lộ trình:** [Học SQL trong 30 ngày](00.%2030-Day%20SQL%20Learning%20Roadmap.md).
