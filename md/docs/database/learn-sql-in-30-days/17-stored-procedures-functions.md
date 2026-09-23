# 17. Stored Procedures & Functions

> Nguồn: https://tiennhm.io.vn/docs/database/learn-sql-in-30-days/17-stored-procedures-functions
> Giới thiệu về Stored Procedures và User Defined Functions (UDF) trong SQL.

> Mục tiêu bài học: Hiểu cách sử dụng **Stored Procedures** và **User Defined Functions (UDF)** để tự động hóa truy vấn SQL.

---

## **1️⃣ Stored Procedures là gì?**
**Stored Procedure (Thủ tục lưu trữ)** là một tập hợp các câu lệnh SQL được lưu trong cơ sở dữ liệu và có thể tái sử dụng.

🔹 **Ưu điểm:**
- Giảm lặp lại mã SQL.
- Tăng hiệu suất vì đã được biên dịch trước.
- Bảo mật tốt hơn, hạn chế SQL Injection.
- Cho phép thực hiện nhiều truy vấn cùng lúc.

💡 **Ví dụ thực tế:**
- Tạo báo cáo doanh thu hàng tháng.
- Xử lý đặt hàng trong hệ thống e-commerce.
- Cập nhật trạng thái đơn hàng tự động.

---

## **2️⃣ Cách tạo Stored Procedure trong SQL**

### **🔹 Cú pháp cơ bản**
```sql
CREATE PROCEDURE Ten_Thu_Tuc
AS
BEGIN
    -- Câu lệnh SQL
END;
```

### **🔹 Ví dụ: Tạo Stored Procedure trả về danh sách khách hàng**
```sql
CREATE PROCEDURE GetCustomers
AS
BEGIN
    SELECT * FROM Customers;
END;
```
👉 **Gọi thủ tục:**
```sql
EXEC GetCustomers;
```

### **🔹 Thủ tục có tham số**
```sql
CREATE PROCEDURE GetCustomerById (@CustomerId INT)
AS
BEGIN
    SELECT * FROM Customers WHERE Id = @CustomerId;
END;
```
👉 **Gọi thủ tục với tham số:**
```sql
EXEC GetCustomerById 1;
```

---

## **3️⃣ User Defined Functions (UDF) là gì?**
**User Defined Functions (Hàm do người dùng định nghĩa)** là các hàm SQL có thể tái sử dụng trong truy vấn.

🔹 **Ưu điểm:**
- Dùng trong `SELECT`, `WHERE`, `GROUP BY`, v.v.
- Giúp truy vấn gọn hơn, dễ đọc hơn.
- Tối ưu hóa hiệu suất khi tái sử dụng nhiều lần.

### **🔹 Cú pháp cơ bản**
```sql
CREATE FUNCTION Ten_Ham (@ThamSo Kieu_Du_Lieu)
RETURNS Kieu_Tra_Ve
AS
BEGIN
    RETURN (Câu lệnh SQL);
END;
```

### **🔹 Ví dụ: Hàm tính tổng doanh thu tháng**
```sql
CREATE FUNCTION GetMonthlyRevenue(@Year INT, @Month INT)
RETURNS DECIMAL(10,2)
AS
BEGIN
    DECLARE @TotalRevenue DECIMAL(10,2);
    SELECT @TotalRevenue = SUM(Amount)
    FROM Orders
    WHERE YEAR(OrderDate) = @Year AND MONTH(OrderDate) = @Month;
    RETURN @TotalRevenue;
END;
```
👉 **Gọi hàm trong truy vấn:**
```sql
SELECT dbo.GetMonthlyRevenue(2025, 2) AS TotalRevenue;
```

---

## **4️⃣ Bài tập thực hành 🎯**

### **✅ Bài 1: Viết Stored Procedure lấy danh sách sản phẩm theo loại**
Viết một `Stored Procedure` nhận tham số `CategoryId`, trả về danh sách sản phẩm thuộc loại đó.

💡 **Gợi ý lời giải:**
```sql
CREATE PROCEDURE GetProductsByCategory (@CategoryId INT)
AS
BEGIN
    SELECT * FROM Products WHERE CategoryId = @CategoryId;
END;
```
👉 **Gọi thủ tục:**
```sql
EXEC GetProductsByCategory 1;
```

---

### **✅ Bài 2: Viết hàm kiểm tra số lượng hàng tồn kho**
Viết một `User Defined Function` nhận `ProductId`, trả về số lượng tồn kho.

💡 **Gợi ý lời giải:**
```sql
CREATE FUNCTION GetStock(@ProductId INT)
RETURNS INT
AS
BEGIN
    DECLARE @Stock INT;
    SELECT @Stock = Stock FROM Products WHERE Id = @ProductId;
    RETURN @Stock;
END;
```
👉 **Gọi hàm trong truy vấn:**
```sql
SELECT dbo.GetStock(1) AS StockQuantity;
```

---

### **✅ Bài 3: Viết Stored Procedure cập nhật giá sản phẩm**
Viết một `Stored Procedure` nhận `ProductId` và `NewPrice`, cập nhật giá sản phẩm.

💡 **Gợi ý lời giải:**
```sql
CREATE PROCEDURE UpdateProductPrice (@ProductId INT, @NewPrice DECIMAL(10,2))
AS
BEGIN
    UPDATE Products SET Price = @NewPrice WHERE Id = @ProductId;
END;
```
👉 **Gọi thủ tục:**
```sql
EXEC UpdateProductPrice 1, 199.99;
```

---

## **🎯 Tóm tắt bài học Ngày 17**
✅ **Stored Procedures** giúp tự động hóa truy vấn SQL và tăng hiệu suất.
✅ **User Defined Functions (UDF)** giúp viết truy vấn ngắn gọn, có thể tái sử dụng.
✅ **Thực hành:** Viết `Stored Procedure` và `UDF` cho các bài toán thực tế.

---

🚀 **Tiếp theo:** [Triggers (Tự động hóa trong SQL).](18.%20Triggers.md)

📌 **Lộ trình:** [Học SQL trong 30 ngày](00.%2030-Day%20SQL%20Learning%20Roadmap.md).
