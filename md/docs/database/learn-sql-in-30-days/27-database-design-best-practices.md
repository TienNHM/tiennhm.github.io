# 27. Database design best practices

> Nguồn: https://tiennhm.io.vn/docs/database/learn-sql-in-30-days/27-database-design-best-practices
> Thiết kế cơ sở dữ liệu (Database Design) - Nguyên tắc chuẩn hóa CSDL, khi nào nên phi chuẩn hóa, best practices thiết kế CSDL hiệu quả.

## **1️⃣ Giới thiệu về Thiết Kế CSDL**
Thiết kế cơ sở dữ liệu (Database Design) là một bước quan trọng để đảm bảo hệ thống **hoạt động hiệu quả, dễ bảo trì, và có thể mở rộng**. Nếu thiết kế không tốt, có thể dẫn đến:
- **Dữ liệu dư thừa (Redundancy)** → Lãng phí bộ nhớ.
- **Tính toàn vẹn kém (Data Integrity Issues)** → Dữ liệu không nhất quán.
- **Hiệu suất truy vấn chậm** → Gây ảnh hưởng đến trải nghiệm người dùng.

---

## **2️⃣ Nguyên Tắc Chuẩn Hóa CSDL (Normalization)**
### ✅ **2.1. Các mức chuẩn hóa (NF - Normal Form)**
**Chuẩn hóa dữ liệu (Normalization)** giúp giảm thiểu dư thừa và cải thiện tính toàn vẹn dữ liệu.

| Cấp độ | Ý nghĩa | Ví dụ |
|--------|--------|-------|
| **1NF (First Normal Form)** | Mỗi cột chỉ chứa một giá trị đơn lẻ, không có bảng lồng nhau. | Không có danh sách ID sản phẩm trong một ô. |
| **2NF (Second Normal Form)** | Thỏa 1NF + Mỗi bảng có khóa chính duy nhất. | Tách bảng `Orders` và `OrderDetails`. |
| **3NF (Third Normal Form)** | Thỏa 2NF + Không có phụ thuộc bắc cầu. | Tách bảng `Customers` và `Cities`. |
| **BCNF (Boyce-Codd Normal Form)** | Phiên bản mạnh hơn của 3NF. | Áp dụng trong các hệ thống lớn. |

💡 **Ví dụ về dữ liệu chưa chuẩn hóa:**
```sql
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    CustomerName VARCHAR(100),
    ProductList TEXT,   -- ❌ Chứa nhiều giá trị trong 1 cột
    TotalAmount DECIMAL(10,2)
);
```
💡 **Dữ liệu sau khi chuẩn hóa (1NF, 2NF, 3NF):**
```sql
CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY,
    CustomerName VARCHAR(100)
);

CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    CustomerID INT,
    TotalAmount DECIMAL(10,2),
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

CREATE TABLE OrderDetails (
    OrderDetailID INT PRIMARY KEY,
    OrderID INT,
    ProductID INT,
    Quantity INT,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
);
```
🚀 **Lợi ích:** Dữ liệu có **tính toàn vẹn cao hơn**, dễ mở rộng và quản lý hơn.

---

## **3️⃣ Khi Nào Nên Phi Chuẩn Hóa? (Denormalization)**
Chuẩn hóa giúp giảm dư thừa dữ liệu nhưng có thể làm chậm truy vấn vì cần **JOIN nhiều bảng**.
🔹 **Denormalization** (phi chuẩn hóa) giúp **tăng tốc truy vấn nhưng tốn bộ nhớ hơn**.

💡 **Ví dụ:**
- Trong hệ thống báo cáo, thay vì **JOIN nhiều bảng**, ta có thể tạo một bảng chứa sẵn dữ liệu tổng hợp.
- Khi cần truy vấn nhanh danh sách khách hàng và tổng số đơn hàng của họ, ta có thể lưu sẵn số đơn hàng trong bảng `Customers`.

```sql
ALTER TABLE Customers ADD TotalOrders INT DEFAULT 0;
```
🎯 **Giải pháp:**
- **OLTP (Online Transaction Processing)** → Dùng chuẩn hóa.
- **OLAP (Online Analytical Processing)** → Có thể phi chuẩn hóa để tăng hiệu suất.

---

## **4️⃣ Thiết Kế CSDL Hiệu Quả & Best Practices**
### ✅ **4.1. Chọn Kiểu Dữ Liệu Tối Ưu**
- **Sử dụng kiểu dữ liệu nhỏ nhất có thể** (tránh dùng `TEXT` nếu `VARCHAR(255)` đủ).
- **Không lưu trữ dữ liệu dư thừa** (tránh lưu `Age`, chỉ lưu `BirthDate` rồi tính toán).

💡 **Ví dụ sai** (Lưu trữ `Age`, gây lỗi khi dữ liệu cũ đi):
```sql
CREATE TABLE Users (
    UserID INT PRIMARY KEY,
    Name VARCHAR(100),
    Age INT   -- ❌ Sai, nên lưu BirthDate
);
```
💡 **Cách đúng**:
```sql
CREATE TABLE Users (
    UserID INT PRIMARY KEY,
    Name VARCHAR(100),
    BirthDate DATE   -- ✅ Đúng, có thể tính Age khi cần
);
```

### ✅ **4.2. Sử Dụng Index Hợp Lý**
- **INDEX** giúp tăng tốc truy vấn nhưng tốn bộ nhớ.
- Chỉ nên index những cột thường xuyên lọc (`WHERE`), `JOIN`, hoặc `ORDER BY`.
- Không nên index cột có dữ liệu thay đổi liên tục (`UPDATE` thường xuyên).

💡 **Ví dụ:**
```sql
CREATE INDEX idx_orders_customerid ON Orders(CustomerID);
```

### ✅ **4.3. Tạo Khoá Chính & Khoá Ngoại Hợp Lý**
- Luôn có **Primary Key (PK)** trên mỗi bảng.
- Dùng **Foreign Key (FK)** để duy trì quan hệ giữa các bảng.

💡 **Ví dụ:**
```sql
ALTER TABLE Orders ADD CONSTRAINT fk_orders_customers FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID);
```

### ✅ **4.4. Tránh Lạm Dụng NULL**
- **NULL làm chậm truy vấn** vì cần kiểm tra giá trị không xác định.
- Nếu có thể, nên đặt **DEFAULT VALUE** thay vì NULL.

💡 **Ví dụ:**
```sql
ALTER TABLE Users MODIFY COLUMN Status VARCHAR(20) NOT NULL DEFAULT 'Active';
```

### ✅ **4.5. Chia Nhỏ Dữ Liệu Lớn (Partitioning & Sharding)**
- **Partitioning:** Chia bảng lớn thành nhiều phần nhỏ theo **ngày, tháng, năm**.
- **Sharding:** Chia dữ liệu theo **user ID**, **khu vực địa lý**, v.v.

💡 **Ví dụ Partitioning theo năm:**
```sql
CREATE TABLE Orders_2023 PARTITION OF Orders FOR VALUES IN (2023);
CREATE TABLE Orders_2024 PARTITION OF Orders FOR VALUES IN (2024);
```

---

## **5️⃣ Bài Tập Thực Hành & Gợi Ý Đáp Án**
### 🔹 **Bài 1: Xác định lỗi thiết kế**
Cho bảng sau, hãy xác định lỗi và đề xuất cách cải thiện.
```sql
CREATE TABLE Employees (
    ID INT PRIMARY KEY,
    Name VARCHAR(255),
    Department VARCHAR(255),
    ManagerName VARCHAR(255)
);
```
📝 **Gợi ý đáp án:**
- `Department` nên tạo bảng riêng (`Departments`).
- `ManagerName` nên thay bằng `ManagerID` để tránh lỗi trùng lặp.

💡 **Thiết kế đúng:**
```sql
CREATE TABLE Departments (
    DepartmentID INT PRIMARY KEY,
    DepartmentName VARCHAR(255)
);

CREATE TABLE Employees (
    ID INT PRIMARY KEY,
    Name VARCHAR(255),
    DepartmentID INT,
    ManagerID INT,
    FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID),
    FOREIGN KEY (ManagerID) REFERENCES Employees(ID)
);
```

### 🔹 **Bài 2: Chuẩn hóa bảng sau về 3NF**
```sql
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    CustomerName VARCHAR(255),
    CustomerPhone VARCHAR(20),
    ProductName VARCHAR(255),
    ProductPrice DECIMAL(10,2),
    Quantity INT
);
```
📝 **Gợi ý đáp án:**
- Tách **Customers** (`CustomerID, Name, Phone`).
- Tách **Products** (`ProductID, Name, Price`).
- Tạo bảng **OrderDetails** (`OrderID, ProductID, Quantity`).

---

#### 📌 **Tóm tắt bài học**
✅ **Chuẩn hóa giúp đảm bảo tính toàn vẹn dữ liệu** nhưng có thể làm chậm truy vấn.
✅ **Phi chuẩn hóa giúp tăng tốc nhưng tốn bộ nhớ hơn.**
✅ **Index, Partitioning, Sharding giúp tối ưu CSDL lớn.**
✅ **Thiết kế tốt giúp hệ thống dễ mở rộng & bảo trì hơn.**

---

🚀 **Tiếp theo:** [Tối ưu hóa truy vấn & Debug SQL nâng cao](28.%20SQL%20query%20optimization.md).

📌 **Lộ trình:** [Học SQL trong 30 ngày](00.%2030-Day%20SQL%20Learning%20Roadmap.md).
