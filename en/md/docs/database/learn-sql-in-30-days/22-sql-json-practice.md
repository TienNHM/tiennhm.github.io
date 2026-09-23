# 22. SQL Json practice

> Nguồn: https://tiennhm.io.vn/en/docs/database/learn-sql-in-30-days/22-sql-json-practice
> Giới thiệu về kiểu dữ liệu JSON trong SQL và cách truy vấn dữ liệu JSON trong SQL.

> Mục tiêu bài học: Tìm hiểu về kiểu dữ liệu JSON trong SQL và cách truy vấn dữ liệu JSON trong SQL.

## 1. Giới thiệu
Dữ liệu JSON ("JavaScript Object Notation") là định dạng phổ biến trong các hệ thống hiện đại, giúp truyền dữ liệu giữa client và server, làm việc với API, v.v. SQL cung cấp các công cụ xử lý JSON ngay trong cơ sở dữ liệu.

### 1.1. JSON trong PostgreSQL/MySQL
- **PostgreSQL**: Cung cấp kiểu dữ liệu `JSON` và `JSONB` (dạng nhị phân tích tốt hơn).
- **MySQL**: Hỗ trợ kiểu `JSON` từ phiên bản 5.7 trở lên, cho phép truy vấn, lọc và chỉnh sửa JSON như các trường dây ký tự.

## 2. Cách lưu trữ và truy vấn JSON trong SQL

### 2.1. Tạo bảng chứa dữ liệu JSON
- Trong PostgreSQL, sử dụng kiểu dữ liệu `JSONB`:
```sql
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    details JSONB -- PostgreSQL
);
```

- Trong MySQL, sử dụng kiểu dữ liệu `JSON`:
```sql
CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    details JSON -- MySQL
);
```

### 2.2. Chèn dữ liệu JSON
```sql
INSERT INTO customers (name, details) VALUES
('John Doe', '{"age": 30, "city": "New York", "email": "john@example.com"}'),
('Jane Smith', '{"age": 25, "city": "Los Angeles", "email": "jane@example.com"}');
```

### 2.3. Truy vấn dữ liệu JSON
- Lấy giá trị cụ thể từ JSON:
```sql
-- PostgreSQL
SELECT name, details->>'city' AS city FROM customers;

-- MySQL
SELECT name, JSON_UNQUOTE(details->'$.city') AS city FROM customers;
```

- Tìm khách hàng trong một thành phố nhất định:
```sql
-- PostgreSQL
SELECT * FROM customers WHERE details->>'city' = 'New York';

-- MySQL
SELECT * FROM customers WHERE JSON_UNQUOTE(details->'$.city') = 'New York';
```

## 3. Bài tập thực hành

### Bài 1: Thêm trường "phone" vào JSON
> **Yêu cầu**: Cập nhật bảng `customers` thêm trường `phone` vào JSON cho mỗi khách hàng.

**Gợi ý đáp án:**
```sql
 -- PostgreSQL
UPDATE customers
SET details = jsonb_set(details, '{phone}', '"123-456-7890"')
WHERE name = 'John Doe';

-- MySQL
UPDATE customers
SET details = JSON_SET(details, '$.phone', '"123-456-7890"')
WHERE name = 'John Doe';
```

### Bài 2: Tính tuổi trung bình của khách hàng
> **Yêu cầu**: Tính tuổi trung bình từ trường `age` trong JSON.

**Gợi ý đáp án:**
```sql
 -- PostgreSQL
SELECT AVG((details->>'age')::INT) AS avg_age FROM customers;

-- MySQL
SELECT AVG(CAST(JSON_UNQUOTE(details->'$.age') AS UNSIGNED)) AS avg_age FROM customers;
```

### Bài 3: Lọc danh sách khách hàng có email kết thúc bằng "@example.com"
> **Yêu cầu**: Lọc danh sách khách hàng có email thuộc dãy `@example.com`.

**Gợi ý đáp án:**
```sql
-- PostgreSQL
SELECT * FROM customers WHERE details->>'email' LIKE '%@example.com';

-- MySQL
SELECT * FROM customers WHERE JSON_UNQUOTE(details->'$.email') LIKE '%@example.com';
```

## 4. Tổng kết bài học
- JSON trong SQL giúp lưu trữ dữ liệu linh hoạt hơn, nhưng cần biết khi nào nên dùng JSON thay vì các bảng quan hệ.
- PostgreSQL và MySQL hỗ trợ truy vấn JSON với các hàm như `jsonb_set`, `JSON_UNQUOTE`, v.v.
- Thực hành với JSON giúp quản lý dữ liệu linh hoạt hơn, đặc biệt trong các hệ thống API.

---

🚀 **Tiếp theo:** [Kết nối SQL với ứng dụng.](23.%20SQL%20connect%20apps.md)

📌 **Lộ trình:** [Học SQL trong 30 ngày](00.%2030-Day%20SQL%20Learning%20Roadmap.md).
