# 23. SQL connect apps

> Nguồn: https://tiennhm.io.vn/docs/database/learn-sql-in-30-days/23-sql-connect-apps
> Hướng dẫn kết nối SQL với ứng dụng và thực hành tạo API CRUD đơn giản.

> Mục tiêu bài học: Học cách kết nối SQL với ứng dụng và thực hành tạo API CRUD đơn giản.

## **1️⃣ Lý thuyết**:
### **🔹 Cách kết nối SQL với ứng dụng**
SQL có thể được kết nối với nhiều ngôn ngữ lập trình để truy vấn, cập nhật và quản lý dữ liệu. Một số thư viện phổ biến:

- **Python**: `sqlite3` (SQLite), `psycopg2` (PostgreSQL), `mysql-connector-python` (MySQL)
- **Node.js**: `mysql2`, `pg`, `sequelize` (ORM)
- **C#**: `System.Data.SqlClient`, `Dapper`, `Entity Framework Core`

Dưới đây là cách thiết lập kết nối cơ bản với SQL trong từng ngôn ngữ:

🔹 **Python (MySQL & PostgreSQL)**
```python
import mysql.connector

conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="password",
    database="shop"
)
cursor = conn.cursor()
cursor.execute("SELECT * FROM products")
rows = cursor.fetchall()
for row in rows:
    print(row)
conn.close()
```

🔹 **Node.js (MySQL & PostgreSQL)**
```javascript
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'shop'
});

connection.query('SELECT * FROM products', (error, results) => {
  if (error) throw error;
  console.log(results);
});

connection.end();
```

🔹 **C# (SQL Server với Dapper)**
```csharp
using System;
using System.Data.SqlClient;
using Dapper;

class Program
{
    static void Main()
    {
        using var connection = new SqlConnection("Server=localhost;Database=shop;User Id=sa;Password=yourpassword;");
        var products = connection.Query("SELECT * FROM Products");
        foreach (var product in products)
            Console.WriteLine(product);
    }
}
```

---

## **2️⃣ Thực hành: Viết API CRUD đơn giản**
### **🛠 Yêu cầu:**
Viết API RESTful để quản lý sản phẩm trong bảng `products` với 4 chức năng chính:
- **Create**: Thêm sản phẩm mới
- **Read**: Lấy danh sách sản phẩm
- **Update**: Cập nhật thông tin sản phẩm
- **Delete**: Xóa sản phẩm

📌 **Cấu trúc bảng `products`**:
```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL
);
```

---

## **3️⃣ Gợi ý lời giải**
### **🔹 Viết API CRUD với Node.js + Express + MySQL**
📌 **Cài đặt thư viện**
```sh
npm init -y
npm install express mysql2 body-parser
```

📌 **Tạo file `server.js` và viết API**
```javascript
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'shop'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to database');
});

// CREATE
app.post('/products', (req, res) => {
    const { name, price, stock } = req.body;
    db.query('INSERT INTO products (name, price, stock) VALUES (?, ?, ?)', [name, price, stock], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Product added', id: result.insertId });
    });
});

// READ
app.get('/products', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// UPDATE
app.put('/products/:id', (req, res) => {
    const { name, price, stock } = req.body;
    db.query('UPDATE products SET name=?, price=?, stock=? WHERE id=?', [name, price, stock, req.params.id], (err) => {
        if (err) throw err;
        res.send({ message: 'Product updated' });
    });
});

// DELETE
app.delete('/products/:id', (req, res) => {
    db.query('DELETE FROM products WHERE id=?', [req.params.id], (err) => {
        if (err) throw err;
        res.send({ message: 'Product deleted' });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

📌 **Chạy server**
```sh
node server.js
```
📌 **Gọi API kiểm tra**
```sh
// Thêm sản phẩm
curl -X POST http://localhost:3000/products -H "Content-Type: application/json" -d '{"name":"Laptop","price":1000,"stock":10}'

// Lấy danh sách sản phẩm
curl -X GET http://localhost:3000/products

// Cập nhật sản phẩm
curl -X PUT http://localhost:3000/products/1 -H "Content-Type: application/json" -d '{"name":"Laptop Pro","price":1200,"stock":8}'

// Xóa sản phẩm
curl -X DELETE http://localhost:3000/products/1
```

---

#### 📌 **Tóm tắt bài học**
- **Kết nối SQL với ứng dụng** giúp truy vấn và thao tác dữ liệu từ mã nguồn.
- **Sử dụng thư viện phù hợp** tùy vào ngôn ngữ lập trình (Python, Node.js, C#).
- **API CRUD giúp quản lý dữ liệu** thông qua HTTP requests (`POST`, `GET`, `PUT`, `DELETE`).
- **Thực hành tốt với database thật** giúp tăng tốc độ làm việc với SQL trong các ứng dụng thực tế.

---

🚀 **Tiếp theo:** [Nhập & Xuất dữ liệu CSV, Excel](24.%20Import%20-%20Export%20data.md)

📌 **Lộ trình:** [Học SQL trong 30 ngày](00.%2030-Day%20SQL%20Learning%20Roadmap.md).
