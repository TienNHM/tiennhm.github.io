# 29. Recursive Queries & Window Functions

> Nguồn: https://tiennhm.io.vn/en/docs/database/learn-sql-in-30-days/29-recursive-queries-window-functions
> Giới thiệu về Recursive Queries và Window Functions trong SQL, cách viết truy vấn đệ quy, ứng dụng thực tế, cách sử dụng Window Functions để phân tích dữ liệu, xếp hạng, lọc dữ liệu theo thời gian.

## **1️⃣ Giới Thiệu**
🔹 **Recursive Queries** (`WITH RECURSIVE`) giúp xử lý dữ liệu đệ quy, thường dùng để **xử lý cây thư mục, cấu trúc tổ chức, chuỗi truy xuất dữ liệu**.
🔹 **Window Functions** (`RANK()`, `DENSE_RANK()`, `ROW_NUMBER()`) hỗ trợ phân tích dữ liệu **mà không làm thay đổi số lượng dòng**, thường dùng để **tạo xếp hạng, nhóm theo thời gian, tìm giá trị trước/sau**.

💡 **Mục tiêu:**
✔ Hiểu cách **viết truy vấn đệ quy** trong SQL.
✔ Biết cách **dùng Window Functions** để làm báo cáo, phân tích dữ liệu.
✔ Ứng dụng vào **thực tế với báo cáo doanh số, phân tích người dùng**.

---

## **2️⃣ Recursive Queries (`WITH RECURSIVE`)**
### ✅ **2.1. Recursive Queries là gì?**
🔹 Recursive Queries là truy vấn **tự gọi lại chính nó**, giúp xử lý dữ liệu có cấu trúc cây hoặc chuỗi đệ quy.
🔹 Ứng dụng phổ biến:
- **Cây thư mục (File System)**.
- **Cấu trúc tổ chức (Org Chart)**.
- **Chuỗi Markov, phân tích truy xuất dữ liệu**.

---

### ✅ **2.2. Cách Viết Recursive Queries**
Cú pháp cơ bản:
```sql
WITH RECURSIVE RecursiveCTE AS (
    -- Truy vấn gốc (Initial Query)
    SELECT ...
    UNION ALL
    -- Truy vấn đệ quy (Recursive Query)
    SELECT ... FROM RecursiveCTE WHERE ...
)
SELECT * FROM RecursiveCTE;
```

💡 **Ví dụ:** Tìm cấp bậc nhân viên trong công ty
```sql
WITH RECURSIVE EmployeeHierarchy AS (
    -- Nhân viên cấp cao nhất (CEO)
    SELECT EmployeeID, ManagerID, FullName, 1 AS Level
    FROM Employees
    WHERE ManagerID IS NULL

    UNION ALL

    -- Nhân viên cấp dưới
    SELECT e.EmployeeID, e.ManagerID, e.FullName, eh.Level + 1
    FROM Employees e
    JOIN EmployeeHierarchy eh ON e.ManagerID = eh.EmployeeID
)
SELECT * FROM EmployeeHierarchy ORDER BY Level;
```
🔹 **Giải thích:**
✔ Bước 1: Chọn CEO (ManagerID = NULL).
✔ Bước 2: Tìm các nhân viên báo cáo cho CEO.
✔ Bước 3: Tiếp tục tìm nhân viên cấp dưới.
✔ Kết quả hiển thị thứ bậc nhân viên.

---

### ✅ **2.3. Bài Toán Đường Đi Ngắn Nhất (Shortest Path Problem)**
Recursive Queries cũng có thể dùng để tìm **đường đi ngắn nhất** trong đồ thị.

💡 **Ví dụ:** Tìm đường từ điểm A đến B trong bảng `Routes`
```sql
WITH RECURSIVE ShortestPath AS (
    SELECT StartPoint, EndPoint, Distance FROM Routes WHERE StartPoint = 'A'

    UNION ALL

    SELECT r.StartPoint, r.EndPoint, sp.Distance + r.Distance
    FROM Routes r
    JOIN ShortestPath sp ON r.StartPoint = sp.EndPoint
)
SELECT * FROM ShortestPath WHERE EndPoint = 'B' ORDER BY Distance LIMIT 1;
```
🔹 **Ứng dụng thực tế:**
✔ Tìm đường đi trong **bản đồ GPS**.
✔ Xử lý **đồ thị quan hệ người dùng**.

---

## **3️⃣ Window Functions (`RANK()`, `DENSE_RANK()`, `ROW_NUMBER()`)**
### ✅ **3.1. Window Functions Là Gì?**
🔹 Window Functions giúp **tạo chỉ mục, xếp hạng, phân tích dữ liệu theo nhóm** mà không làm thay đổi số lượng dòng.
🔹 Ứng dụng phổ biến:
✔ **Xếp hạng học sinh, doanh số bán hàng**.
✔ **Phân tích hành vi khách hàng**.
✔ **Lọc dữ liệu theo thời gian (giá trị trước/sau)**.

---

### ✅ **3.2. Phân Biệt `RANK()`, `DENSE_RANK()`, `ROW_NUMBER()`**
💡 **Ví dụ:** Xếp hạng doanh số nhân viên
```sql
SELECT EmployeeID, FullName, Department, SalesAmount,
       RANK() OVER (PARTITION BY Department ORDER BY SalesAmount DESC) AS Rank,
       DENSE_RANK() OVER (PARTITION BY Department ORDER BY SalesAmount DESC) AS DenseRank,
       ROW_NUMBER() OVER (PARTITION BY Department ORDER BY SalesAmount DESC) AS RowNum
FROM Employees;
```
🔹 **So sánh kết quả:**
| Employee | Sales | RANK() | DENSE_RANK() | ROW_NUMBER() |
|----------|------|--------|-------------|-------------|
| A        | 1000 | 1      | 1           | 1           |
| B        | 1000 | 1      | 1           | 2           |
| C        | 900  | 3      | 2           | 3           |

✔ `RANK()`: Nếu có giá trị trùng, sẽ bỏ qua số thứ tự tiếp theo.
✔ `DENSE_RANK()`: Không bỏ qua số thứ tự, giá trị trùng sẽ cùng hạng.
✔ `ROW_NUMBER()`: Không trùng lặp số thứ tự.

---

### ✅ **3.3. Ứng Dụng `LEAD()`, `LAG()` Để Lấy Giá Trị Trước/Sau**
💡 **Ví dụ:** So sánh doanh số tháng hiện tại với tháng trước
```sql
SELECT EmployeeID, FullName, SalesMonth, SalesAmount,
       LAG(SalesAmount, 1) OVER (PARTITION BY EmployeeID ORDER BY SalesMonth) AS PreviousMonth,
       LEAD(SalesAmount, 1) OVER (PARTITION BY EmployeeID ORDER BY SalesMonth) AS NextMonth
FROM Sales;
```
🔹 **Ứng dụng thực tế:**
✔ So sánh **giá chứng khoán theo ngày**.
✔ Xem **khách hàng có tăng/giảm chi tiêu**.

---

## **4️⃣ Bài Tập Thực Hành & Gợi Ý Đáp Án**
### 🔹 **Bài 1: Truy vấn đệ quy tìm cấp bậc nhân viên**
📌 **Yêu cầu:**
✔ Viết truy vấn lấy danh sách nhân viên theo cấp bậc trong công ty.
✔ CEO (cấp 1) → Trưởng phòng (cấp 2) → Nhân viên (cấp 3).

📝 **Gợi ý đáp án:**
```sql
WITH RECURSIVE EmployeeHierarchy AS (
    SELECT EmployeeID, FullName, ManagerID, 1 AS Level FROM Employees WHERE ManagerID IS NULL
    UNION ALL
    SELECT e.EmployeeID, e.FullName, e.ManagerID, eh.Level + 1
    FROM Employees e
    JOIN EmployeeHierarchy eh ON e.ManagerID = eh.EmployeeID
)
SELECT * FROM EmployeeHierarchy ORDER BY Level;
```

---

### 🔹 **Bài 2: Xếp hạng doanh số nhân viên theo bộ phận**
📌 **Yêu cầu:**
✔ Viết truy vấn xếp hạng doanh số nhân viên theo phòng ban bằng `RANK()`, `DENSE_RANK()`.

📝 **Gợi ý đáp án:**
```sql
SELECT EmployeeID, FullName, Department, SalesAmount,
       RANK() OVER (PARTITION BY Department ORDER BY SalesAmount DESC) AS Rank
FROM Employees;
```

---

#### 📌 **Tóm tắt bài học**
🔹 **Recursive Queries (`WITH RECURSIVE`)** giúp xử lý cây thư mục, tổ chức nhân sự.
🔹 **Window Functions (`RANK()`, `ROW_NUMBER()`, `LEAD()`)** hỗ trợ phân tích dữ liệu mạnh mẽ.
🔹 **Ứng dụng vào thực tế: báo cáo doanh số, phân tích khách hàng, truy vấn đệ quy.**

---

🚀 **Tiếp theo:** [Database security](30.%20Database%20security.md).

📌 **Lộ trình:** [Học SQL trong 30 ngày](00.%2030-Day%20SQL%20Learning%20Roadmap.md).

## Bài liên quan

- [Luỹ kế của bạn sai ngay dòng đầu: window function, RANGE và cái mặc định ít ai đọc](https://tiennhm.io.vn/blog/window-function-vs-group-by) — GROUP BY gom 200.000 dòng thành 200, window function giữ nguyên cả 200.000 mà vẫn có số tổng của nhóm.
