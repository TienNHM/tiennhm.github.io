# 26. SQL - NoSQL

> Nguồn: https://tiennhm.io.vn/en/docs/database/learn-sql-in-30-days/26-sql-nosql
> So sánh SQL (Quan hệ) và NoSQL (Phi quan hệ) - Khi nào nên dùng SQL và NoSQL, so sánh MySQL, PostgreSQL vs. MongoDB, Firebase.

#### 🎯 **Mục tiêu học tập**
- Hiểu sự khác biệt giữa cơ sở dữ liệu quan hệ (SQL) và phi quan hệ (NoSQL).
- Khi nào nên sử dụng SQL và khi nào nên dùng NoSQL?
- So sánh các hệ quản trị CSDL phổ biến: MySQL, PostgreSQL (SQL) vs. MongoDB, Firebase (NoSQL).

---

## 📝 **1. SQL vs. NoSQL - Điểm khác biệt chính**

| Tiêu chí        | SQL (Quan hệ) | NoSQL (Phi quan hệ) |
|----------------|--------------|-------------------|
| **Cấu trúc dữ liệu** | Bảng (Tables) với hàng & cột | Dạng JSON, tài liệu, đồ thị, key-value |
| **Schema** | Cố định (Schema ràng buộc) | Linh hoạt, không cần schema cố định |
| **Ngôn ngữ truy vấn** | SQL (Structured Query Language) | Không có ngôn ngữ cố định (Mongo Query, Firebase API, v.v.) |
| **Tính mở rộng** | Scale lên (Vertical Scaling) | Scale ngang (Horizontal Scaling) |
| **Hỗ trợ ACID** | Có hỗ trợ mạnh | Hỗ trợ hạn chế hoặc chỉ CAP (Consistency - Availability - Partition Tolerance) |
| **Truy vấn phức tạp** | Hỗ trợ JOIN, Subquery, Transactions | Không hỗ trợ JOIN, chỉ truy vấn tài liệu riêng lẻ |
| **Ứng dụng thực tế** | Hệ thống tài chính, ngân hàng, ERP | Ứng dụng thời gian thực, Big Data, IoT, mạng xã hội |

---

## 📝 **2. Khi nào nên dùng SQL và NoSQL?**

🔹 **Nên dùng SQL khi:**
✔️ Dữ liệu có cấu trúc rõ ràng và ít thay đổi.
✔️ Cần đảm bảo tính toàn vẹn dữ liệu (ACID).
✔️ Hệ thống yêu cầu truy vấn phức tạp, nhiều mối quan hệ giữa dữ liệu.
📌 **Ví dụ:** Hệ thống ngân hàng, quản lý doanh nghiệp, phần mềm kế toán.

🔹 **Nên dùng NoSQL khi:**
✔️ Dữ liệu thay đổi linh hoạt, không có cấu trúc cố định.
✔️ Cần mở rộng hệ thống nhanh (scalability).
✔️ Xử lý dữ liệu lớn hoặc dữ liệu thời gian thực.
📌 **Ví dụ:** Ứng dụng mạng xã hội, game online, IoT, phân tích log.

---

## 📝 **3. Các hệ quản trị CSDL phổ biến**

### **🔹 SQL Databases**
1️⃣ **MySQL** - Nhanh, phổ biến, miễn phí, hỗ trợ tốt trong web development.
2️⃣ **PostgreSQL** - Hỗ trợ JSON tốt, có nhiều tính năng nâng cao.
3️⃣ **SQL Server** - Microsoft SQL, hỗ trợ tốt cho ứng dụng doanh nghiệp.

### **🔹 NoSQL Databases**
1️⃣ **MongoDB** - Lưu trữ tài liệu JSON, mở rộng dễ dàng.
2️⃣ **Firebase** - Dữ liệu real-time, phù hợp cho mobile apps.
3️⃣ **Cassandra** - Xử lý dữ liệu lớn, được dùng bởi Facebook.

---

## 🎯 **Bài tập thực hành & Gợi ý đáp án**

### **Tạo và truy vấn SQL & NoSQL**
#### **Yêu cầu:**
- Tạo bảng SQL lưu thông tin người dùng (`users`).
- Lưu trữ thông tin người dùng trong MongoDB.
- So sánh cách truy vấn dữ liệu.

🔹 **Gợi ý đáp án (MySQL)**
```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100),
    age INT
);

INSERT INTO users (name, email, age) VALUES
('Alice', 'alice@email.com', 25),
('Bob', 'bob@email.com', 30);

SELECT * FROM users WHERE age > 26;
```

🔹 **Gợi ý đáp án (MongoDB)**
```js
db.users.insertMany([
    { name: "Alice", email: "alice@email.com", age: 25 },
    { name: "Bob", email: "bob@email.com", age: 30 }
]);

db.users.find({ age: { $gt: 26 } });
```

---

#### 📌 **Tóm tắt bài học**
✅ SQL phù hợp với dữ liệu có cấu trúc, cần ACID và truy vấn phức tạp.
✅ NoSQL phù hợp với dữ liệu linh hoạt, thời gian thực và Big Data.
✅ Lựa chọn SQL hay NoSQL tùy thuộc vào nhu cầu của dự án.

---

🚀 **Tiếp theo:** [Thiết kế CSDL & Best Practices](27.%20Database%20design%20best%20practices.md).

📌 **Lộ trình:** [Học SQL trong 30 ngày](00.%2030-Day%20SQL%20Learning%20Roadmap.md).
