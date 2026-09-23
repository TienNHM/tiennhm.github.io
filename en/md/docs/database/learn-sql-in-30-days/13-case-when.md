# 13. CASE WHEN

> Nguồn: https://tiennhm.io.vn/en/docs/database/learn-sql-in-30-days/13-case-when
> Giới thiệu về điều kiện trong SQL, cách sử dụng CASE WHEN để xử lý điều kiện trong truy vấn SQL, cách sử dụng và ví dụ minh họa.

> Mục tiêu bài học: Giới thiệu về điều kiện trong SQL, cách sử dụng `CASE WHEN` để xử lý điều kiện trong truy vấn SQL.

Hôm nay, bạn sẽ học cách **xử lý điều kiện trong SQL** bằng cách sử dụng **`CASE WHEN`**, giúp bạn thực hiện các phép so sánh và tạo ra dữ liệu có điều kiện ngay trong truy vấn SQL.

---

## **1️⃣ CASE WHEN là gì?**
`CASE WHEN` trong SQL hoạt động giống như **câu lệnh if-else** trong lập trình, cho phép bạn **gán giá trị dựa trên điều kiện cụ thể**.

**📌 Cấu trúc:**
```sql
SELECT column1,
       CASE
           WHEN condition1 THEN result1
           WHEN condition2 THEN result2
           ELSE result_default
       END AS new_column
FROM table_name;
```
✔️ Điều kiện trong `CASE WHEN` có thể sử dụng các toán tử như `=, >, <, >=, <=, !=`.
✔️ Nếu điều kiện đầu tiên đúng, SQL sẽ **không kiểm tra tiếp điều kiện sau**.
✔️ `ELSE` là tùy chọn – nếu không có, SQL sẽ trả về `NULL` khi không có điều kiện nào đúng.

---

## **2️⃣ Ví dụ cơ bản về CASE WHEN**

### **📌 Ví dụ 1: Phân loại sản phẩm theo giá**
```sql
SELECT ProductName, Price,
       CASE
           WHEN Price < 100 THEN 'Rẻ'
           WHEN Price BETWEEN 100 AND 500 THEN 'Trung bình'
           ELSE 'Đắt'
       END AS PriceCategory
FROM Products;
```

✅ **Kết quả:**
| ProductName | Price | PriceCategory |
|-------------|-------|--------------|
| Áo thun    | 50    | Rẻ          |
| Giày Nike  | 300   | Trung bình  |
| Laptop Dell | 1500  | Đắt         |

---

## **3️⃣ CASE WHEN với nhiều điều kiện**

### **📌 Ví dụ 2: Phân loại khách hàng theo số lượng đơn hàng**
```sql
SELECT CustomerName, OrderCount,
       CASE
           WHEN OrderCount = 0 THEN 'Chưa mua hàng'
           WHEN OrderCount BETWEEN 1 AND 5 THEN 'Khách hàng mới'
           WHEN OrderCount BETWEEN 6 AND 20 THEN 'Khách hàng thân thiết'
           ELSE 'VIP'
       END AS CustomerCategory
FROM Customers;
```

✅ **Giải thích:**
- Nếu khách hàng chưa có đơn hàng (`OrderCount = 0`), họ sẽ thuộc nhóm **"Chưa mua hàng"**.
- Nếu có từ **1 đến 5 đơn**, họ là **"Khách hàng mới"**.
- Nếu có **6 - 20 đơn**, họ là **"Khách hàng thân thiết"**.
- Nếu nhiều hơn 20 đơn, họ là **"VIP"**.

---

## **4️⃣ CASE WHEN kết hợp với toán tử logic (AND, OR, LIKE)**

### **📌 Ví dụ 3: Xác định trạng thái đơn hàng**
```sql
SELECT OrderID, Status,
       CASE
           WHEN Status = 'Pending' THEN 'Chờ xử lý'
           WHEN Status = 'Shipped' THEN 'Đã giao hàng'
           WHEN Status = 'Cancelled' THEN 'Đã hủy'
           ELSE 'Không xác định'
       END AS Status_VN
FROM Orders;
```

✅ **Kết quả:**
| OrderID | Status    | Status_VN        |
|---------|-----------|------------------|
| 101     | Pending   | Chờ xử lý        |
| 102     | Shipped   | Đã giao hàng     |
| 103     | Cancelled | Đã hủy           |

---

## **5️⃣ CASE WHEN trong ORDER BY**

Bạn có thể sử dụng `CASE WHEN` để **sắp xếp dữ liệu theo điều kiện**.

### **📌 Ví dụ 4: Sắp xếp sản phẩm theo mức độ ưu tiên**
```sql
SELECT ProductName, Stock,
       CASE
           WHEN Stock = 0 THEN 'Hết hàng'
           WHEN Stock < 10 THEN 'Sắp hết'
           ELSE 'Còn hàng'
       END AS StockStatus
FROM Products
ORDER BY
       CASE
           WHEN Stock = 0 THEN 1
           WHEN Stock < 10 THEN 2
           ELSE 3
       END;
```

✅ **Giải thích:**
- `Hết hàng` sẽ xếp lên đầu.
- `Sắp hết` (còn dưới 10 sản phẩm) sẽ xếp sau.
- `Còn hàng` sẽ xếp cuối.

---

## **6️⃣ Bài tập thực hành 🚀**
👉 **Bài 1:** Viết truy vấn phân loại nhân viên theo số năm làm việc (`YearsWorked`).
👉 **Bài 2:** Tạo cột `SalaryLevel` để phân loại lương theo các mức: `Thấp`, `Trung bình`, `Cao`.
👉 **Bài 3:** Xác định trạng thái khách hàng dựa trên số tiền đã chi tiêu (`TotalSpent`).
👉 **Bài 4:** Sắp xếp đơn hàng theo mức độ ưu tiên (`High, Medium, Low`).

---

✅ **Tóm tắt Ngày 13:**
✔️ **CASE WHEN** giúp xử lý điều kiện trong SQL giống như `if-else`.
✔️ Có thể dùng `CASE WHEN` để phân loại dữ liệu, tạo cột mới, thay đổi giá trị hiển thị.
✔️ Có thể kết hợp với `ORDER BY` để sắp xếp theo điều kiện.

🚀 **Tiếp theo:** [Ôn tập và bài tập tổng hợp tuần 2!](14.%20Review%202.md)

📌 **Lộ trình:** [Học SQL trong 30 ngày](00.%2030-Day%20SQL%20Learning%20Roadmap.md)
