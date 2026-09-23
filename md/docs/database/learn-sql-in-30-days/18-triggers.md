# 18. Triggers

> Nguồn: https://tiennhm.io.vn/docs/database/learn-sql-in-30-days/18-triggers
> Tìm hiểu cách sử dụng Triggers để tự động hóa kiểm soát dữ liệu trong SQL.

> Mục tiêu bài học: Hiểu cách sử dụng Triggers để tự động kiểm soát dữ liệu trước/sau khi thay đổi.

## 📌 **1. Trigger là gì?**
**Trigger** là một loại thủ tục tự động thực thi khi có **sự kiện xảy ra trên một bảng** (INSERT, UPDATE, DELETE).

💡 **Ứng dụng của Trigger:**
✔ Tự động cập nhật **tồn kho** khi có đơn hàng mới.
✔ Kiểm tra dữ liệu **trước khi chèn vào bảng**.
✔ Ghi log lịch sử thay đổi dữ liệu.
✔ Kiểm soát ràng buộc dữ liệu không thể thực hiện bằng `CONSTRAINT`.

---

## 🛠 **2. Các loại Trigger trong SQL**

| **Loại Trigger**    | **Mô tả** |
|---------------------|-----------|
| **BEFORE INSERT**   | Chạy trước khi chèn dữ liệu. |
| **AFTER INSERT**    | Chạy sau khi chèn dữ liệu. |
| **BEFORE UPDATE**   | Chạy trước khi cập nhật dữ liệu. |
| **AFTER UPDATE**    | Chạy sau khi cập nhật dữ liệu. |
| **BEFORE DELETE**   | Chạy trước khi xóa dữ liệu. |
| **AFTER DELETE**    | Chạy sau khi xóa dữ liệu. |

👉 **BEFORE** giúp kiểm tra dữ liệu **trước khi thay đổi**.
👉 **AFTER** giúp **cập nhật bảng khác** hoặc **ghi log** sau khi thay đổi.

---

## ⚙️ **3. Cách tạo Trigger trong SQL**

### **Cấu trúc cơ bản**
```sql
CREATE TRIGGER trigger_name
AFTER INSERT ON table_name
FOR EACH ROW
BEGIN
    -- Hành động sẽ được thực thi
END;
```
🔹 **FOR EACH ROW**: Thực thi trigger cho từng dòng bị ảnh hưởng.

---

## 🛒 **4. Ví dụ thực tế: Cập nhật tồn kho tự động**

### **1️⃣ Tạo bảng sản phẩm (`products`)**
```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    stock INT NOT NULL
);
```

### **2️⃣ Tạo bảng đơn hàng (`orders`)**
```sql
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id),
    quantity INT NOT NULL
);
```

### **3️⃣ Tạo Trigger cập nhật stock sau khi đặt hàng**
```sql
CREATE TRIGGER update_stock_after_order
AFTER INSERT ON orders
FOR EACH ROW
BEGIN
    UPDATE products
    SET stock = stock - NEW.quantity
    WHERE id = NEW.product_id;
END;
```
🔹 Khi có đơn hàng mới, trigger **tự động trừ stock** sản phẩm tương ứng.

### **4️⃣ Kiểm tra trigger hoạt động**
```sql
INSERT INTO products (name, stock) VALUES ('Laptop', 10);
INSERT INTO orders (product_id, quantity) VALUES (1, 2);
SELECT * FROM products;
```
👉 Stock của Laptop sẽ **giảm từ 10 → 8**.

---

## 🚨 **5. Kiểm soát dữ liệu với BEFORE Trigger**

### **Ngăn không cho khách đặt hàng nếu hết hàng**
```sql
CREATE TRIGGER check_stock_before_order
BEFORE INSERT ON orders
FOR EACH ROW
BEGIN
    DECLARE stock_available INT;

    SELECT stock INTO stock_available
    FROM products WHERE id = NEW.product_id;

    IF stock_available < NEW.quantity THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Không đủ hàng trong kho!';
    END IF;
END;
```
👉 Nếu số lượng đặt hàng lớn hơn `stock`, **Trigger sẽ báo lỗi** và không cho đặt hàng.

---

## 📜 **6. Ghi log thay đổi dữ liệu với AFTER UPDATE**

### **1️⃣ Tạo bảng log (`product_logs`)**
```sql
CREATE TABLE product_logs (
    id SERIAL PRIMARY KEY,
    product_id INT,
    old_stock INT,
    new_stock INT,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **2️⃣ Tạo Trigger ghi log khi `stock` thay đổi**
```sql
CREATE TRIGGER log_stock_changes
AFTER UPDATE ON products
FOR EACH ROW
BEGIN
    INSERT INTO product_logs (product_id, old_stock, new_stock)
    VALUES (OLD.id, OLD.stock, NEW.stock);
END;
```
🔹 **OLD.stock**: Giá trị `stock` trước khi cập nhật.
🔹 **NEW.stock**: Giá trị `stock` mới sau cập nhật.

👉 Khi thay đổi tồn kho sản phẩm, trigger sẽ **tự động ghi log** vào `product_logs`.

---

## 🎯 **7. Bài tập thực hành**

### ✅ **Bài 1: Tạo trigger cập nhật tổng số lượng hàng đã bán**
> Viết trigger cập nhật bảng `sales_summary (product_id, total_sold)` mỗi khi có đơn hàng mới.

💡 **Gợi ý lời giải:**
```sql
CREATE TABLE sales_summary (
    product_id INT PRIMARY KEY,
    total_sold INT DEFAULT 0
);

CREATE TRIGGER update_sales_summary
AFTER INSERT ON orders
FOR EACH ROW
BEGIN
    INSERT INTO sales_summary (product_id, total_sold)
    VALUES (NEW.product_id, NEW.quantity)
    ON DUPLICATE KEY UPDATE total_sold = total_sold + NEW.quantity;
END;
```
👉 Mỗi lần có đơn hàng mới, **trigger sẽ cập nhật tổng số lượng hàng đã bán**.

---

### ✅ **Bài 2: Ngăn không cho xóa sản phẩm nếu có đơn hàng**
> Viết trigger kiểm tra nếu `product_id` đã tồn tại trong `orders`, không cho phép xóa sản phẩm khỏi bảng `products`.

💡 **Gợi ý lời giải:**
```sql
CREATE TRIGGER prevent_product_deletion
BEFORE DELETE ON products
FOR EACH ROW
BEGIN
    DECLARE order_count INT;

    SELECT COUNT(*) INTO order_count FROM orders WHERE product_id = OLD.id;

    IF order_count > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Không thể xóa sản phẩm vì đã có đơn hàng!';
    END IF;
END;
```
👉 Nếu sản phẩm đã có đơn hàng, trigger sẽ báo lỗi và **không cho xóa**.

---

## 🔥 **Tóm tắt bài học Ngày 18**
✅ **Triggers** giúp tự động hóa kiểm soát dữ liệu trong SQL.
✅ **BEFORE Trigger** giúp kiểm tra dữ liệu **trước khi thay đổi**.
✅ **AFTER Trigger** giúp cập nhật bảng khác hoặc ghi log **sau khi thay đổi**.
✅ **Thực hành:** Tạo trigger cập nhật tồn kho, ghi log thay đổi, ngăn xóa dữ liệu quan trọng.

---

🚀 **Tiếp theo:** [Views (Bảng ảo).](19.%20Views.md)

📌 **Lộ trình:** [Học SQL trong 30 ngày](00.%2030-Day%20SQL%20Learning%20Roadmap.md).
