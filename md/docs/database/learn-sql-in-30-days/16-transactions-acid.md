# 16. Transactions - ACID

> Nguồn: https://tiennhm.io.vn/docs/database/learn-sql-in-30-days/16-transactions-acid
> Giới thiệu về Transactions trong SQL, cách sử dụng và đảm bảo tính nhất quán dữ liệu với ACID.

> Mục tiêu bài học: Giới thiệu về Transactions trong SQL, cách sử dụng và đảm bảo tính nhất quán dữ liệu với ACID.

## **1️⃣ Transactions là gì?**
**Transaction (Giao dịch)** trong SQL là một tập hợp các lệnh SQL được thực hiện như **một đơn vị công việc**.
- **Nếu tất cả lệnh thành công**, thay đổi sẽ được lưu (**COMMIT**).
- **Nếu có lỗi xảy ra**, tất cả thay đổi sẽ bị hủy (**ROLLBACK**).

💡 **Ví dụ thực tế:**
- Chuyển tiền giữa 2 tài khoản (**rút tiền từ A, cộng tiền vào B**).
- Đặt vé máy bay (**trừ chỗ trống, tạo booking, cập nhật lịch trình**).
- Đặt hàng (**trừ kho, tạo đơn, ghi lịch sử giao dịch**).

---

## **2️⃣ Tính chất ACID của Transactions**
Transactions phải tuân thủ **ACID** để đảm bảo tính toàn vẹn dữ liệu.

| **Tính chất**                    | **Ý nghĩa**                                                   |
|----------------------------------|---------------------------------------------------------------|
| **Atomicity** (Tính nguyên tử)   | Toàn bộ transaction **thành công hoặc thất bại hoàn toàn**.   |
| **Consistency** (Tính nhất quán) | Database **không rơi vào trạng thái lỗi** dù có lỗi xảy ra.   |
| **Isolation** (Tính độc lập)     | Transactions chạy song song **không làm ảnh hưởng lẫn nhau**. |
| **Durability** (Tính bền vững)   | Sau khi `COMMIT`, dữ liệu sẽ **được lưu vĩnh viễn**.          |

💡 **Ví dụ minh họa:**
- Nếu bạn rút 500K từ ATM nhưng máy bị lỗi **sau khi trừ tiền tài khoản**, hệ thống phải `ROLLBACK` để bạn không mất tiền.

---

## **3️⃣ Cách sử dụng Transactions trong SQL**

### **🔹 Lệnh cơ bản**
```sql
BEGIN;  -- Bắt đầu transaction
UPDATE accounts SET balance = balance - 500 WHERE id = 1; -- Trừ tiền tài khoản A
UPDATE accounts SET balance = balance + 500 WHERE id = 2; -- Cộng tiền tài khoản B
COMMIT; -- Xác nhận giao dịch
```
👉 Nếu tất cả lệnh thành công, `COMMIT` sẽ lưu thay đổi vĩnh viễn.

### **🔹 Xử lý lỗi với ROLLBACK**
```sql
BEGIN;
UPDATE accounts SET balance = balance - 500 WHERE id = 1;

-- Giả sử có lỗi xảy ra khi cộng tiền vào tài khoản B
UPDATE accounts SET balance = balance + 500 WHERE id = 99999; -- ID không tồn tại!

ROLLBACK; -- Hủy toàn bộ giao dịch nếu có lỗi
```
👉 Nếu có lỗi, `ROLLBACK` sẽ **khôi phục dữ liệu về trạng thái ban đầu**.

---

## **4️⃣ Mô phỏng giao dịch ngân hàng** 🏦

### **📌 Bảng `accounts`**
```sql
CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    balance DECIMAL(10,2) NOT NULL
);
```
### **🔹 Thêm dữ liệu mẫu**
```sql
INSERT INTO accounts (name, balance) VALUES ('Alice', 1000), ('Bob', 500);
```

### **🔹 Mô phỏng chuyển 200 từ Alice → Bob**
```sql
BEGIN;

UPDATE accounts SET balance = balance - 200 WHERE name = 'Alice';

UPDATE accounts SET balance = balance + 200 WHERE name = 'Bob';

COMMIT;
```
👉 Nếu mọi thứ **đúng**, `COMMIT` sẽ lưu thay đổi.
👉 Nếu có lỗi (ví dụ: tài khoản không tồn tại), **chúng ta cần `ROLLBACK`**.

### **🔹 Kiểm tra kết quả**
```sql
SELECT * FROM accounts;
```

---

## **5️⃣ Kiểm soát mức độ Isolation trong Transactions**
SQL hỗ trợ nhiều mức độ **Isolation** để kiểm soát độ an toàn của Transactions.

| **Mức Isolation**    | **Nguy cơ lỗi** |
|----------------------|----------------|
| **READ UNCOMMITTED** | Có thể đọc dữ liệu chưa `COMMIT` (không an toàn). |
| **READ COMMITTED**   | Chỉ đọc dữ liệu đã `COMMIT` (mặc định trong nhiều hệ quản trị CSDL). |
| **REPEATABLE READ**  | Cùng một `SELECT` trong transaction **luôn trả về cùng một kết quả**. |
| **SERIALIZABLE**     | Cực kỳ chặt chẽ, ngăn mọi transaction khác can thiệp. |

**Ví dụ:**
```sql
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
BEGIN;
-- Các câu lệnh SQL ở mức Isolation cao nhất
COMMIT;
```

---

## **6️⃣ Bài tập thực hành 🎯**

### **✅ Bài 1: Chuyển tiền giữa hai tài khoản**
Viết transaction chuyển 300 từ **Bob → Alice**. Nếu tài khoản không đủ tiền, `ROLLBACK`.

💡 **Gợi ý lời giải:**
- Kiểm tra số dư trước khi trừ tiền.
- Nếu số dư **không đủ**, gọi `ROLLBACK`.
- Nếu hợp lệ, cập nhật số dư và `COMMIT`.

```sql
BEGIN;
-- Kiểm tra số dư
SELECT balance INTO @bob_balance FROM accounts WHERE name = 'Bob';

IF @bob_balance < 300 THEN
    ROLLBACK;
ELSE
    UPDATE accounts SET balance = balance - 300 WHERE name = 'Bob';
    UPDATE accounts SET balance = balance + 300 WHERE name = 'Alice';
    COMMIT;
END IF;
```

---

### **✅ Bài 2: Mô phỏng đặt hàng**
Giả sử chúng ta có bảng `products (id, name, stock)` và `orders (id, product_id, quantity)`.
Viết transaction để:
- Trừ `stock` của sản phẩm.
- Tạo bản ghi trong bảng `orders`.
- Nếu có lỗi, `ROLLBACK`.

💡 **Gợi ý lời giải:**
```sql
BEGIN;

-- Kiểm tra sản phẩm còn hàng không
SELECT stock INTO @stock FROM products WHERE id = 1;

IF @stock < 1 THEN
    ROLLBACK;
ELSE
    -- Trừ stock
    UPDATE products SET stock = stock - 1 WHERE id = 1;

    -- Tạo đơn hàng
    INSERT INTO orders (product_id, quantity) VALUES (1, 1);

    COMMIT;
END IF;
```

---

### **✅ Bài 3: Kiểm tra hiệu suất Transaction**
Dùng `EXPLAIN ANALYZE` để kiểm tra hiệu suất truy vấn khi dùng transaction.

💡 **Gợi ý lời giải:**
```sql
EXPLAIN ANALYZE
BEGIN;
UPDATE accounts SET balance = balance - 500 WHERE id = 1;
UPDATE accounts SET balance = balance + 500 WHERE id = 2;
COMMIT;
```
👉 Kết quả giúp xác định có cần thêm **INDEX** để tối ưu không.

---

## **🎯 Tóm tắt bài học Ngày 16**
✅ **Transactions** giúp đảm bảo tất cả các lệnh **thành công hoặc bị hủy toàn bộ**.
✅ **ACID** đảm bảo dữ liệu không bị lỗi khi có nhiều giao dịch đồng thời.
✅ Dùng `COMMIT` để lưu, `ROLLBACK` để hủy nếu có lỗi.
✅ **Thực hành:** Chuyển tiền, đặt hàng, kiểm soát mức độ Isolation.

---

🚀 **Tiếp theo:** [Stored Procedures & Functions](17.%20Stored%20Procedures%20-%20Functions.md).

📌 **Lộ trình:** [Học SQL trong 30 ngày](00.%2030-Day%20SQL%20Learning%20Roadmap.md).
