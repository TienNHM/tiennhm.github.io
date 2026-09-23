# 24. Import - Export data

> Nguồn: https://tiennhm.io.vn/docs/database/learn-sql-in-30-days/24-import-export-data
> Hiểu cách nhập dữ liệu từ file CSV, Excel vào SQL, xuất dữ liệu từ SQL ra file CSV, Excel và sử dụng các lệnh LOAD DATA INFILE, COPY, SELECT INTO OUTFILE để xử lý dữ liệu.

#### 🎯 **Mục tiêu học tập**
- Hiểu cách nhập dữ liệu từ file CSV, Excel vào SQL.
- Xuất dữ liệu từ SQL ra file CSV, Excel.
- Sử dụng các lệnh **LOAD DATA INFILE**, **COPY**, **SELECT INTO OUTFILE** để xử lý dữ liệu.

---

## 📝 **1. Nhập dữ liệu từ CSV vào SQL**

### 🔹 **1.1. MySQL: LOAD DATA INFILE**
**Cú pháp:**
```sql
LOAD DATA INFILE 'C:/data/products.csv'
INTO TABLE products
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
```
📌 **Lưu ý:** Cần bật chế độ `LOCAL INFILE` nếu bị lỗi:
```sql
SET GLOBAL local_infile = 1;
```

---

### 🔹 **1.2. PostgreSQL: COPY**
```sql
COPY products(id, name, price)
FROM 'C:/data/products.csv'
DELIMITER ','
CSV HEADER;
```

---

### 🔹 **1.3. SQL Server: BULK INSERT**
```sql
BULK INSERT products
FROM 'C:\data\products.csv'
WITH (
    FORMAT = 'CSV',
    FIRSTROW = 2,
    FIELDTERMINATOR = ',',
    ROWTERMINATOR = '\n'
);
```

---

## 📝 **2. Xuất dữ liệu từ SQL ra CSV**

### 🔹 **2.1. MySQL: SELECT INTO OUTFILE**
```sql
SELECT * FROM products
INTO OUTFILE 'C:/data/products_export.csv'
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n';
```

---

### 🔹 **2.2. PostgreSQL: COPY**
```sql
COPY products TO 'C:/data/products_export.csv'
DELIMITER ','
CSV HEADER;
```

---

### 🔹 **2.3. SQL Server: EXPORT DATA**
```sql
SELECT *
INTO OPENROWSET('Microsoft.ACE.OLEDB.12.0',
                'Text;Database=C:\data;',
                'SELECT * FROM products_export.csv')
FROM products;
```

---

## 📝 **3. Xuất dữ liệu từ SQL ra Excel**

- **Cách 1:** Dùng công cụ SQL Server Management Studio (SSMS) hoặc MySQL Workbench để export dữ liệu ra Excel.
- **Cách 2:** Dùng Python:
  ```python
  import pandas as pd
  import sqlite3

  conn = sqlite3.connect('database.db')
  df = pd.read_sql_query("SELECT * FROM products", conn)
  df.to_excel("products_export.xlsx", index=False)
  ```
- **Cách 3:** PostgreSQL:
  ```sql
  COPY (SELECT * FROM products)
  TO 'C:/data/products.xlsx'
  WITH (FORMAT CSV, HEADER);
  ```

---

## 🎯 **Bài tập thực hành**

### **Bài 1: Tạo bảng `students` và nhập dữ liệu từ CSV**
#### **Yêu cầu:**
- Tạo bảng `students` gồm các cột: `id` (số nguyên, khóa chính), `name` (chuỗi ký tự), `dob` (ngày sinh).
- Nhập dữ liệu từ file `students.csv` (dạng: `id,name,dob`).

🔹 **Gợi ý đáp án (MySQL):**
```sql
CREATE TABLE students (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    dob DATE
);

LOAD DATA INFILE 'C:/data/students.csv'
INTO TABLE students
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
```

🔹 **Gợi ý đáp án (PostgreSQL):**
```sql
COPY students(id, name, dob)
FROM 'C:/data/students.csv'
DELIMITER ','
CSV HEADER;
```

---

### **Bài 2: Xuất danh sách sinh viên ra file CSV**
#### **Yêu cầu:**
- Xuất dữ liệu từ bảng `students` ra file `students_export.csv`.

🔹 **Gợi ý đáp án (MySQL):**
```sql
SELECT * FROM students
INTO OUTFILE 'C:/data/students_export.csv'
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n';
```

🔹 **Gợi ý đáp án (PostgreSQL):**
```sql
COPY students TO 'C:/data/students_export.csv'
DELIMITER ','
CSV HEADER;
```

---

### **Bài 3: Xuất dữ liệu từ `students` ra file Excel**
#### **Yêu cầu:**
- Xuất dữ liệu từ bảng `students` ra file Excel `students.xlsx` bằng Python.

🔹 **Gợi ý đáp án (Python + SQLite):**
```python
import pandas as pd
import sqlite3

conn = sqlite3.connect('database.db')
df = pd.read_sql_query("SELECT * FROM students", conn)
df.to_excel("students.xlsx", index=False)
conn.close()
```

---

#### 📌 **Tóm tắt bài học**
- **Nhập CSV:** `LOAD DATA INFILE` (MySQL), `COPY` (PostgreSQL), `BULK INSERT` (SQL Server).
- **Xuất CSV:** `SELECT INTO OUTFILE`, `COPY`, `BULK INSERT`.
- **Xuất Excel:** Dùng Python (`pandas`), SSMS, hoặc MySQL Workbench.

---

🚀 **Tiếp theo:** [Làm việc với dữ liệu lớn (Big Data)](25.%20Big%20Data.md).

📌 **Lộ trình:** [Học SQL trong 30 ngày](00.%2030-Day%20SQL%20Learning%20Roadmap.md).
