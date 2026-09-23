# 19. Views

> Nguồn: https://tiennhm.io.vn/docs/database/learn-sql-in-30-days/19-views
> Tìm hiểu cách sử dụng Views để đơn giản hóa truy vấn trong SQL.

> Mục tiêu bài học: Hiểu cách tạo và sử dụng **Views** để đơn giản hóa truy vấn SQL.

---

## 📌 **1. View là gì?**
**View** là một bảng ảo được tạo từ kết quả của một truy vấn SQL. Nó giúp:

✔ Giảm độ phức tạp của truy vấn.
✔ Bảo mật dữ liệu bằng cách ẩn đi các cột nhạy cảm.
✔ Giúp tái sử dụng truy vấn phức tạp một cách dễ dàng.

💡 **Ví dụ:** Tạo một View hiển thị danh sách đơn hàng kèm thông tin khách hàng thay vì phải JOIN nhiều bảng.

---

## 🛠 **2. Cách tạo View trong SQL**

### **Cấu trúc cơ bản**
```sql
CREATE VIEW view_name AS
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```

🔹 Sau khi tạo, có thể sử dụng View như một bảng thông thường:
```sql
SELECT * FROM view_name;
```

---

## ⚙️ **3. Ví dụ thực tế: Đơn giản hóa truy vấn**

### **1️⃣ Tạo bảng khách hàng (`customers`)**
```sql
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20)
);
```

### **2️⃣ Tạo bảng đơn hàng (`orders`)**
```sql
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(id),
    total_amount DECIMAL(10,2),
    order_date DATE
);
```

### **3️⃣ Tạo View hiển thị danh sách đơn hàng kèm thông tin khách hàng**
```sql
CREATE VIEW customer_orders AS
    SELECT
        o.id AS order_id,
        c.name AS customer_name,
        o.total_amount,
        o.order_date
    FROM orders o
    JOIN customers c ON o.customer_id = c.id;
```
🔹 **Sử dụng View thay vì JOIN thủ công:**
```sql
SELECT * FROM customer_orders;
```
👉 View giúp đơn giản hóa truy vấn và dễ đọc hơn.

---

## 🔄 **4. Cập nhật View**

### **Sửa đổi View**
```sql
CREATE OR REPLACE VIEW customer_orders AS
    SELECT
        o.id AS order_id,
        c.name AS customer_name,
        c.email,
        o.total_amount,
        o.order_date
    FROM orders o
    JOIN customers c ON o.customer_id = c.id;
```
🔹 **`CREATE OR REPLACE VIEW`** giúp cập nhật View mà không cần xóa.

### **Xóa View**
```sql
DROP VIEW customer_orders;
```

---

## 🚨 **5. View có cập nhật được không?**
✅ Có thể UPDATE/DELETE/INSERT nếu View liên kết với một bảng duy nhất và không chứa:
- `GROUP BY`, `HAVING`, `DISTINCT`
- `JOIN` nhiều bảng
- Hàm tổng hợp (`SUM`, `AVG`, `COUNT`,...)

💡 **Ví dụ: Cập nhật dữ liệu qua View**
```sql
UPDATE customer_orders
SET total_amount = 500
WHERE order_id = 1;
```
👉 Nếu View không hỗ trợ cập nhật, cần sử dụng **`INSTEAD OF TRIGGER`**.

---

## 🎯 **6. Bài tập thực hành**

### ✅ **Bài 1: Tạo View hiển thị tổng doanh thu theo khách hàng**
> Viết View hiển thị `customer_id`, `customer_name`, và `total_spent` (tổng tiền đã chi tiêu).

💡 **Gợi ý lời giải:**
```sql
CREATE VIEW customer_spending AS
    SELECT
        c.id AS customer_id,
        c.name AS customer_name,
        SUM(o.total_amount) AS total_spent
    FROM customers c
    JOIN orders o ON c.id = o.customer_id
    GROUP BY c.id, c.name;
```

---

### ✅ **Bài 2: Tạo View chỉ hiển thị khách hàng VIP (tổng chi tiêu > 1000$)**
> Viết View chỉ lấy khách hàng có tổng chi tiêu lớn hơn 1000$ từ View `customer_spending`.

💡 **Gợi ý lời giải:**
```sql
CREATE VIEW vip_customers AS
    SELECT *
    FROM customer_spending
    WHERE total_spent > 1000;
```
👉 Giờ chỉ cần `SELECT * FROM vip_customers;` là lấy được danh sách khách hàng VIP.

---

## 🔥 **Tóm tắt bài học Ngày 19**
✅ **Views** giúp đơn giản hóa truy vấn SQL.
✅ **Cú pháp:** `CREATE VIEW view_name AS SELECT ...`.
✅ **Có thể UPDATE/DELETE/INSERT trên View** nếu nó liên kết với một bảng duy nhất.
✅ **Thực hành:** Tạo View tổng doanh thu khách hàng, lọc khách hàng VIP.

---

🚀 **Tiếp theo:** [Phân tích hiệu suất truy vấn.](20.%20Query%20performance.md)

📌 **Lộ trình:** [Học SQL trong 30 ngày](00.%2030-Day%20SQL%20Learning%20Roadmap.md).
