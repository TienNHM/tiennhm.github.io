# 14. Review 2

> Nguồn: https://tiennhm.io.vn/en/docs/database/learn-sql-in-30-days/14-review-2
> Kiểm tra kiến thức - Bài tập tổng hợp cho tuần 2 học SQL.

> Mục tiêu bài học: Kiểm tra kiến thức - Bài tập tổng hợp cho tuần 2 học SQL, từ đó củng cố kiến thức và chuẩn bị cho tuần tiếp theo.

Hôm nay, bạn sẽ **ôn lại tất cả kiến thức đã học trong tuần** và thực hành với **các bài tập tổng hợp** để rèn luyện kỹ năng SQL.

---

## **1️⃣ Tổng kết kiến thức đã học trong tuần 2**

| Chủ đề                  | Nội dung chính |
|-------------------------|--------------|
| **Aggregate Functions** | `COUNT()`, `SUM()`, `AVG()`, `MIN()`, `MAX()` |
| **GROUP BY & HAVING**   | Nhóm dữ liệu (`GROUP BY`) và lọc nhóm (`HAVING`) |
| **JOIN**                | Kết hợp dữ liệu từ nhiều bảng (`INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`, `FULL JOIN`) |
| **Subquery**            | Truy vấn con trong `SELECT`, `WHERE`, `FROM` |
| **UNION & INTERSECT**   | Hợp nhiều tập dữ liệu (`UNION`) và lấy phần chung (`INTERSECT`) |
| **CASE WHEN**           | Xử lý điều kiện và phân loại dữ liệu |

---

## **2️⃣ Cấu trúc database: `ECommerceDB`**

Dưới đây là thông tin chi tiết về các bảng trong database để bạn dễ dàng làm bài tập ôn tập SQL.

### **1️⃣ Bảng `Customers` - Thông tin khách hàng**
Chứa thông tin về khách hàng.

| Column         | Data Type       | Description                     |
|----------------|-----------------|---------------------------------|
| `CustomerID`   | `INT` (PK)      | Mã khách hàng (Primary Key).    |
| `CustomerName` | `VARCHAR(255)`  | Tên khách hàng.                 |
| `Email`        | `VARCHAR(255)`  | Email khách hàng.               |
| `Phone`        | `VARCHAR(50)`   | Số điện thoại.                  |
| `Address`      | `TEXT`          | Địa chỉ.                        |
| `CreatedAt`    | `DATETIME`      | Ngày tạo tài khoản.             |

---

### **2️⃣ Bảng `Products` - Thông tin sản phẩm**
Chứa thông tin về các sản phẩm được bán.

| Column        | Data Type       | Description                          |
|---------------|-----------------|--------------------------------------|
| `ProductID`   | `INT` (PK)      | Mã sản phẩm (Primary Key).           |
| `ProductName` | `VARCHAR(255)`  | Tên sản phẩm.                        |
| `CategoryID`  | `INT` (FK)      | Mã danh mục (Liên kết `Categories`). |
| `Price`       | `DECIMAL(10,2)` | Giá sản phẩm.                        |
| `Stock`       | `INT`           | Số lượng hàng tồn kho.               |

---

### **3️⃣ Bảng `Categories` - Danh mục sản phẩm**
Chứa thông tin về các danh mục sản phẩm.

| Column         | Data Type      | Description                     |
|----------------|----------------|---------------------------------|
| `CategoryID`   | `INT` (PK)     | Mã danh mục (Primary Key).      |
| `CategoryName` | `VARCHAR(255)` | Tên danh mục sản phẩm.          |

---

### **4️⃣ Bảng `Orders` - Thông tin đơn hàng**
Chứa thông tin về đơn hàng của khách hàng.

| Column        | Data Type       | Description                              |
|---------------|-----------------|------------------------------------------|
| `OrderID`     | `INT` (PK)      | Mã đơn hàng (Primary Key).               |
| `CustomerID`  | `INT` (FK)      | Mã khách hàng (Liên kết `Customers`).    |
| `OrderDate`   | `DATETIME`      | Ngày đặt hàng.                           |
| `TotalAmount` | `DECIMAL(10,2)` | Tổng tiền đơn hàng.                      |
| `OrderType`   | `VARCHAR(50)`   | Loại đơn hàng (`Online` hoặc `Offline`). |

---

### **5️⃣ Bảng `OrderDetails` - Chi tiết đơn hàng**
Lưu thông tin sản phẩm trong từng đơn hàng.

| Column          | Data Type       | Description                             |
|-----------------|-----------------|-----------------------------------------|
| `OrderDetailID` | `INT` (PK)      | Mã chi tiết đơn hàng (Primary Key).     |
| `OrderID`       | `INT` (FK)      | Mã đơn hàng (Liên kết `Orders`).        |
| `ProductID`     | `INT` (FK)      | Mã sản phẩm (Liên kết `Products`).      |
| `Quantity`      | `INT`           | Số lượng sản phẩm trong đơn hàng.       |
| `UnitPrice`     | `DECIMAL(10,2)` | Giá tại thời điểm đặt hàng.             |

---

### **📌 Các ràng buộc trong database**
1. **`Orders.CustomerID` → `Customers.CustomerID`** (Mỗi đơn hàng thuộc về 1 khách hàng).
2. **`Products.CategoryID` → `Categories.CategoryID`** (Mỗi sản phẩm thuộc về 1 danh mục).
3. **`OrderDetails.OrderID` → `Orders.OrderID`** (Mỗi chi tiết đơn hàng thuộc về 1 đơn hàng).
4. **`OrderDetails.ProductID` → `Products.ProductID`** (Mỗi chi tiết đơn hàng chứa một sản phẩm).

Dưới đây là script SQL để tạo database **ECommerceDB**, bao gồm các bảng và ràng buộc cần thiết:

---

### **📌 Tạo database và các bảng**
```sql
-- Tạo database
CREATE DATABASE ECommerceDB;
USE ECommerceDB;

-- Tạo bảng Customers (Khách hàng)
CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY AUTO_INCREMENT,
    CustomerName VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Phone VARCHAR(50) UNIQUE NOT NULL,
    Address TEXT,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng Categories (Danh mục sản phẩm)
CREATE TABLE Categories (
    CategoryID INT PRIMARY KEY AUTO_INCREMENT,
    CategoryName VARCHAR(255) NOT NULL
);

-- Tạo bảng Products (Sản phẩm)
CREATE TABLE Products (
    ProductID INT PRIMARY KEY AUTO_INCREMENT,
    ProductName VARCHAR(255) NOT NULL,
    CategoryID INT,
    Price DECIMAL(10,2) NOT NULL,
    Stock INT NOT NULL DEFAULT 0,
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID) ON DELETE SET NULL
);

-- Tạo bảng Orders (Đơn hàng)
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY AUTO_INCREMENT,
    CustomerID INT,
    OrderDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    TotalAmount DECIMAL(10,2) NOT NULL DEFAULT 0,
    OrderType VARCHAR(50) CHECK (OrderType IN ('Online', 'Offline')),
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID) ON DELETE CASCADE
);

-- Tạo bảng OrderDetails (Chi tiết đơn hàng)
CREATE TABLE OrderDetails (
    OrderDetailID INT PRIMARY KEY AUTO_INCREMENT,
    OrderID INT,
    ProductID INT,
    Quantity INT NOT NULL CHECK (Quantity > 0),
    UnitPrice DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID) ON DELETE CASCADE,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID) ON DELETE CASCADE
);
```

---

### **📌 Chèn dữ liệu mẫu**
```sql
-- Thêm dữ liệu vào bảng Customers
INSERT INTO Customers (CustomerName, Email, Phone, Address) VALUES
('Nguyễn Văn A', 'nguyenvana@example.com', '0901123456', 'Hà Nội'),
('Trần Thị B', 'tranthib@example.com', '0902234567', 'TP.HCM'),
('Lê Văn C', 'levanc@example.com', '0903345678', 'Đà Nẵng');

-- Thêm dữ liệu vào bảng Categories
INSERT INTO Categories (CategoryName) VALUES
('Điện thoại'),
('Laptop'),
('Phụ kiện');

-- Thêm dữ liệu vào bảng Products
INSERT INTO Products (ProductName, CategoryID, Price, Stock) VALUES
('iPhone 15 Pro', 1, 29990000, 10),
('Samsung Galaxy S23', 1, 24990000, 15),
('MacBook Air M2', 2, 32990000, 8),
('Dell XPS 13', 2, 27990000, 5),
('Tai nghe AirPods Pro', 3, 4990000, 20);

-- Thêm dữ liệu vào bảng Orders
INSERT INTO Orders (CustomerID, TotalAmount, OrderType) VALUES
(1, 29990000, 'Online'),
(2, 57980000, 'Offline'),
(3, 24990000, 'Online');

-- Thêm dữ liệu vào bảng OrderDetails
INSERT INTO OrderDetails (OrderID, ProductID, Quantity, UnitPrice) VALUES
(1, 1, 1, 29990000),
(2, 3, 1, 32990000),
(2, 4, 1, 27990000),
(3, 2, 1, 24990000);
```

## **3️⃣ Bài tập thực hành tổng hợp 🚀**

### **📌 Bài 1: Lấy danh sách khách hàng và tổng số đơn hàng họ đã đặt**
✅ **Yêu cầu:**
- Hiển thị `CustomerID`, `CustomerName`, số lượng đơn hàng (`TotalOrders`).
- Sắp xếp giảm dần theo số đơn hàng.
- Chỉ hiển thị những khách hàng có ít nhất 3 đơn hàng.

🔹 **Gợi ý:** Sử dụng `JOIN`, `GROUP BY`, `HAVING`, `ORDER BY`.

```sql
SELECT
    c.CustomerID,
    c.CustomerName,
    COUNT(o.OrderID) AS TotalOrders
FROM Customers c
JOIN Orders o ON c.CustomerID = o.CustomerID
GROUP BY c.CustomerID, c.CustomerName
HAVING COUNT(o.OrderID) >= 3
ORDER BY TotalOrders DESC;
```

---

### **📌 Bài 2: Tìm sản phẩm có giá cao hơn giá trung bình**
✅ **Yêu cầu:**
- Hiển thị `ProductID`, `ProductName`, `Price`.
- Chỉ lấy sản phẩm có giá **cao hơn giá trung bình** của tất cả sản phẩm.

🔹 **Gợi ý:** Dùng **Subquery trong WHERE** để lấy giá trung bình.

```sql
SELECT
    ProductID,
    ProductName,
    Price
FROM Products
WHERE Price > (SELECT AVG(Price) FROM Products);
```

---

### **📌 Bài 3: Lấy danh sách đơn hàng kèm trạng thái ưu tiên**
✅ **Yêu cầu:**
- Hiển thị `OrderID`, `CustomerName`, `TotalAmount`, `PriorityStatus`.
- `PriorityStatus` được xác định bằng `CASE WHEN`:
  - `>= 1000`: **"Cao"**
  - `500 - 999`: **"Trung bình"**
  - `< 500`: **"Thấp"**

🔹 **Gợi ý:** Dùng `CASE WHEN`.

```sql
SELECT
    o.OrderID,
    c.CustomerName,
    o.TotalAmount,
    CASE
        WHEN o.TotalAmount >= 1000 THEN 'Cao'
        WHEN o.TotalAmount >= 500 THEN 'Trung bình'
        ELSE 'Thấp'
    END AS PriorityStatus
FROM Orders o
JOIN Customers c ON o.CustomerID = c.CustomerID;
```

---

### **📌 Bài 4: Doanh thu theo tháng**
✅ **Yêu cầu:**
- Hiển thị tổng doanh thu (`TotalRevenue`) theo từng tháng (`OrderMonth`).
- Chỉ hiển thị những tháng có doanh thu **trên 10 triệu**.
- Sắp xếp theo thứ tự tháng.

🔹 **Gợi ý:** Dùng `GROUP BY`, `HAVING`, `SUM()`, `MONTH()`.

```sql
SELECT
    MONTH(OrderDate) AS OrderMonth,
    SUM(TotalAmount) AS TotalRevenue
FROM Orders
GROUP BY MONTH(OrderDate)
HAVING SUM(TotalAmount) > 10000000
ORDER BY OrderMonth;
```

---

### **📌 Bài 5: Danh sách khách hàng có cả đơn hàng Online và Offline**
✅ **Yêu cầu:**
- Hiển thị `CustomerID`, `CustomerName`.
- Chỉ lấy khách hàng có đơn hàng **ở cả hai hình thức** (**Online** và **Offline**).

🔹 **Gợi ý:** Dùng `INTERSECT`.

```sql
SELECT CustomerID, CustomerName
FROM Orders
WHERE OrderType = 'Online'

INTERSECT

SELECT CustomerID, CustomerName
FROM Orders
WHERE OrderType = 'Offline';
```

---

## **3️⃣ Thử thách nâng cao 🚀🔥**
💡 **Bài 6: Lấy sản phẩm có tổng số lượng bán cao nhất trong từng danh mục**
- Hiển thị `CategoryID`, `CategoryName`, `ProductID`, `ProductName`, `TotalSold`.
- `TotalSold` là tổng số lượng sản phẩm đã bán (`SUM(Quantity)`).
- Chỉ lấy **sản phẩm có tổng số lượng bán cao nhất trong mỗi danh mục**.

🔹 **Gợi ý:** Dùng `JOIN`, `GROUP BY`, `ORDER BY`, `RANK() OVER (PARTITION BY CategoryID)`.

---

✅ **Tóm tắt Ngày 14:**
✔️ **Ôn tập kiến thức Tuần 2.**
✔️ **Luyện tập với bài tập tổng hợp về JOIN, GROUP BY, HAVING, CASE WHEN, SUBQUERY.**
✔️ **Bài tập nâng cao giúp bạn áp dụng nhiều kỹ thuật SQL cùng lúc.**

🚀 **Tiếp theo:** Học về [Chỉ mục (Indexes)](15.%20Index.md)!

📌 **Lộ trình:** [Học SQL trong 30 ngày](00.%2030-Day%20SQL%20Learning%20Roadmap.md)
