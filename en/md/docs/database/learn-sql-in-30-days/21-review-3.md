# 21. Review 3

> Nguồn: https://tiennhm.io.vn/en/docs/database/learn-sql-in-30-days/21-review-3
> Kiểm tra kiến thức - Bài tập tổng hợp cho tuần 3

## 🔍 **1. Tổng kết kiến thức tuần 3**
Tuần này, bạn đã học về các kỹ thuật SQL nâng cao và tối ưu hóa truy vấn, bao gồm:
✅ **Chỉ mục (Indexes):** Tăng tốc độ truy vấn bằng cách tạo index phù hợp.
✅ **Transactions & ACID:** Đảm bảo tính nhất quán của dữ liệu khi thực hiện giao dịch.
✅ **Stored Procedures & Functions:** Viết mã SQL tái sử dụng, giúp tự động hóa truy vấn.
✅ **Triggers:** Tự động hóa xử lý dữ liệu khi có thay đổi trong bảng.
✅ **Views:** Tạo bảng ảo giúp đơn giản hóa các truy vấn phức tạp.
✅ **Phân tích hiệu suất:** Sử dụng `EXPLAIN ANALYZE` để kiểm tra và tối ưu truy vấn.

---

## 📝 **2. Bài tập thực hành tổng hợp**

### **🔹 Bài 1: Tạo Index và kiểm tra hiệu suất**
**Yêu cầu:**
- Tạo bảng `orders` với dữ liệu lớn (~100.000 dòng).
- Thêm chỉ mục (`INDEX`) vào cột `customer_id` và so sánh thời gian truy vấn trước và sau khi tạo index.

**Cấu trúc bảng:**
```sql
CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    order_date DATETIME,
    total_amount DECIMAL(10,2)
);
```
**Tạo dữ liệu mẫu:**
```sql
INSERT INTO orders (customer_id, order_date, total_amount)
SELECT FLOOR(RAND() * 1000), NOW() - INTERVAL FLOOR(RAND() * 365) DAY, RAND() * 500
FROM generate_series(1, 100000);
```
**Truy vấn kiểm tra hiệu suất:**
```sql
EXPLAIN ANALYZE
SELECT * FROM orders WHERE customer_id = 500;
```
**Thêm Index:**
```sql
CREATE INDEX idx_customer_id ON orders(customer_id);
```
**Chạy lại truy vấn và so sánh kết quả.**

---

### **🔹 Bài 2: Viết Transaction xử lý đặt hàng**
**Yêu cầu:**
- Đảm bảo rằng khi đặt hàng, nếu bất kỳ thao tác nào thất bại, toàn bộ giao dịch phải được hủy (`ROLLBACK`).
- Cập nhật số lượng tồn kho trong bảng `products`.

**Cấu trúc bảng:**
```sql
CREATE TABLE products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(255),
    stock_quantity INT
);

CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    order_date DATETIME
);

CREATE TABLE order_items (
    order_item_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    product_id INT,
    quantity INT,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
```
**Transaction xử lý đặt hàng:**
```sql
START TRANSACTION;

INSERT INTO orders (customer_id, order_date) VALUES (123, NOW());
SET @order_id = LAST_INSERT_ID();

INSERT INTO order_items (order_id, product_id, quantity) VALUES (@order_id, 5, 2);

UPDATE products SET stock_quantity = stock_quantity - 2 WHERE product_id = 5;

COMMIT;
```
Nếu xảy ra lỗi, có thể dùng:
```sql
ROLLBACK;
```

---

### **🔹 Bài 3: Tạo Stored Procedure báo cáo doanh thu**
**Yêu cầu:**
- Viết Stored Procedure nhận tham số tháng/năm và trả về tổng doanh thu.

**Stored Procedure:**
```sql
DELIMITER //

CREATE PROCEDURE GetMonthlyRevenue(IN p_month INT, IN p_year INT)
BEGIN
    SELECT SUM(total_amount) AS total_revenue
    FROM orders
    WHERE MONTH(order_date) = p_month AND YEAR(order_date) = p_year;
END //

DELIMITER ;
```
**Gọi Stored Procedure:**
```sql
CALL GetMonthlyRevenue(2, 2025);
```

---

### **🔹 Bài 4: Sử dụng Trigger cập nhật tồn kho tự động**
**Yêu cầu:**
- Khi có đơn hàng mới, tự động trừ số lượng hàng tồn kho.

**Trigger:**
```sql
DELIMITER //

CREATE TRIGGER update_stock_after_order
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
    UPDATE products
    SET stock_quantity = stock_quantity - NEW.quantity
    WHERE product_id = NEW.product_id;
END //

DELIMITER ;
```

---

### **🔹 Bài 5: Tạo View giúp đơn giản hóa truy vấn**
**Yêu cầu:**
- Tạo View `OrderSummary` để truy vấn nhanh đơn hàng, khách hàng, sản phẩm.

**View:**
```sql
CREATE VIEW OrderSummary AS
SELECT o.order_id, o.customer_id, c.customer_name, oi.product_id, p.product_name, oi.quantity, o.order_date
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id
JOIN customers c ON o.customer_id = c.customer_id;
```
**Truy vấn View:**
```sql
SELECT * FROM OrderSummary WHERE customer_id = 123;
```

---

### **🔹 Bài 6: Phân tích hiệu suất truy vấn**
**Yêu cầu:**
- Chạy `EXPLAIN ANALYZE` để kiểm tra hiệu suất.

**Truy vấn kiểm tra:**
```sql
EXPLAIN ANALYZE
SELECT * FROM orders WHERE order_date BETWEEN '2024-01-01' AND '2024-12-31';
```
Nếu truy vấn chậm, có thể thử thêm index:
```sql
CREATE INDEX idx_order_date ON orders(order_date);
```
Chạy lại truy vấn và so sánh kết quả.

---

## 🔥 **Tóm tắt bài học Ngày 21**
- Viết truy vấn SQL tối ưu.
- Đánh giá hiệu suất trước và sau khi tối ưu.
- Hiểu cách sử dụng Index, Transactions, Views, Stored Procedures và Triggers.

🚀 **Tiếp theo:** [Làm việc với dữ liệu JSON trong SQL.](22.%20SQL%20Json%20practice.md)

📌 **Lộ trình:** [Học SQL trong 30 ngày](00.%2030-Day%20SQL%20Learning%20Roadmap.md) 🚀
