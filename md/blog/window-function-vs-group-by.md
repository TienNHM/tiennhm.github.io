# Luỹ kế của bạn sai ngay dòng đầu: window function, RANGE và cái mặc định ít ai đọc

> Nguồn: https://tiennhm.io.vn/blog/window-function-vs-group-by
> GROUP BY gom 200.000 dòng thành 200, window function giữ nguyên cả 200.000 mà vẫn có số tổng của nhóm. Nhưng mặc định của OVER (ORDER BY ...) là RANGE chứ không phải ROWS, nên các dòng đồng hạng đều nhận cùng một giá trị luỹ kế — và bảng của bạn sai ngay dòng đầu tiên. Đo trên PostgreSQL 16, kèm so sánh self-join với window.

> `GROUP BY` **gom dòng lại**, window function **giữ nguyên dòng** mà vẫn tính được số tổng của nhóm — đo thật: cùng một bảng 200.000 dòng, `GROUP BY` trả về **200 dòng**, window trả về **200.000 dòng**. Nó cũng nhanh hơn cách cũ: thay self-join bằng window đưa thời gian từ **79,2 ms xuống 22,7 ms**. Nhưng có một mặc định gây sai số liệu mà rất ít người đọc tới: `OVER (ORDER BY ...)` dùng khung **`RANGE`**, nên mọi dòng **đồng hạng** đều nhận cùng một giá trị luỹ kế. Muốn cộng dồn từng dòng một thì phải ghi rõ **`ROWS`**.

Window function là thứ biến những câu truy vấn báo cáo dài dòng thành vài dòng đọc được. Nhưng nó cũng có đúng một cái bẫy đủ tinh vi để lọt qua review: bảng luỹ kế trông hợp lý ở giữa và sai ở chỗ có giá trị trùng nhau.

Bài này đào sâu [bài Recursive Queries và Window Functions](https://tiennhm.io.vn/docs/database/learn-sql-in-30-days/29-recursive-queries-window-functions) trong series học SQL 30 ngày. Mọi con số là kết quả chạy thật trên PostgreSQL 16.11.

## Tóm tắt nhanh (TL;DR)
- `GROUP BY` **gom** dòng; window function **giữ** dòng và thêm giá trị tổng hợp bên cạnh.
- Thay self-join bằng window: **79,2 ms → 22,7 ms** trên 200.000 dòng.
- `OVER (ORDER BY x)` mặc định dùng khung **`RANGE`**, gom hết dòng có cùng `x`.
- Muốn luỹ kế từng dòng: ghi rõ **`ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`**.
- `rank`, `dense_rank`, `row_number` cho ba kết quả khác nhau khi có đồng hạng.

---

## Khác biệt cốt lõi: gom hay giữ
Bảng doanh số 200.000 dòng, 200 nhân viên.

**`GROUP BY` gom lại:**

```sql
SELECT nhan_vien, sum(doanh_so) FROM ds GROUP BY nhan_vien;
-- GROUP BY trả về 200 dòng
```

**Window function giữ nguyên:**

```sql
SELECT nhan_vien, doanh_so, sum(doanh_so) OVER (PARTITION BY nhan_vien) FROM ds;
-- WINDOW trả về 200000 dòng
```

Đó là toàn bộ khác biệt về bản chất. `GROUP BY` trả lời *"mỗi nhóm tổng bao nhiêu"*. Window function trả lời *"mỗi dòng là bao nhiêu, và nhóm của nó tổng bao nhiêu"* — giữ được chi tiết để bạn tính tiếp, ví dụ tỷ lệ đóng góp của từng dòng trong nhóm:

```sql
SELECT nhan_vien, thang, doanh_so,
       round(100.0 * doanh_so / sum(doanh_so) OVER (PARTITION BY nhan_vien), 2) AS ty_le_phan_tram
FROM ds;
```

Viết câu này bằng `GROUP BY` thuần thì phải gom rồi join ngược lại bảng gốc.

---

## Window nhanh hơn self-join
Trước khi window function phổ biến, cách làm là gom vào một bảng dẫn xuất rồi join ngược:

```sql
-- Cách cũ
SELECT count(*) FROM ds d
JOIN (SELECT nhan_vien, sum(doanh_so) s FROM ds GROUP BY nhan_vien) g
  ON g.nhan_vien = d.nhan_vien;
-- Time: 79.196 ms
```

```sql
-- Cách mới
SELECT count(*) FROM (
  SELECT sum(doanh_so) OVER (PARTITION BY nhan_vien) FROM ds
) q;
-- Time: 22.659 ms
```

**Nhanh hơn khoảng 3,5 lần**, và ngắn hơn hẳn. Lý do: bản self-join phải quét bảng **hai lần** rồi ghép kết quả, còn window function quét một lần, sắp xếp theo phân vùng, và tính trong lúc đi qua dữ liệu.

---

## Cái bẫy: `RANGE` là mặc định, không phải `ROWS`
Đây là phần đáng giá nhất của bài, và là chỗ tôi tự vấp khi dựng thí nghiệm.

Bảng ba dòng, hai dòng cùng ngày:

| ngay | tien |
|---|---|
| 2026-01-01 | 100 |
| 2026-01-01 | 200 |
| 2026-01-02 | 300 |

Viết luỹ kế theo cách ai cũng viết:

```sql
SELECT ngay, tien,
       sum(tien) OVER (ORDER BY ngay) AS mac_dinh,
       sum(tien) OVER (ORDER BY ngay ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS ro_rang
FROM b ORDER BY ngay, tien;
```

Kết quả thật:

| ngay | tien | mặc định (RANGE) | ghi rõ ROWS |
|---|---|---|---|
| 2026-01-01 | 100 | **300** | **100** |
| 2026-01-01 | 200 | 300 | 300 |
| 2026-01-02 | 300 | 600 | 600 |

Nhìn dòng đầu tiên: luỹ kế của một dòng có `tien = 100` lại là **300**.

Lý do nằm ở khung cửa sổ (frame). Khi bạn viết `OVER (ORDER BY ngay)` mà không khai frame, SQL ngầm hiểu là:

```sql
RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
```

Và `RANGE` xác định "dòng hiện tại" theo **giá trị của cột `ORDER BY`**, chứ không theo vị trí dòng. Hai dòng cùng ngày `2026-01-01` là **đồng hạng** (peer), nên cả hai đều được coi là "tới hết ngày 01/01" — và cùng nhận 300.

`ROWS` thì đếm theo **vị trí vật lý**: dòng thứ nhất chỉ gồm chính nó, nên ra 100.

### Khi nào chọn cái nào

| Bạn muốn | Dùng |
|---|---|
| Cộng dồn từng dòng một | `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` |
| Tổng tới hết mỗi mốc thời gian (gom đồng hạng) | `RANGE` (mặc định) |
| Trung bình trượt 7 dòng gần nhất | `ROWS BETWEEN 6 PRECEDING AND CURRENT ROW` |
| Tổng toàn phân vùng | bỏ `ORDER BY` đi |

Chi tiết cuối đáng nhớ riêng: **thêm `ORDER BY` vào `OVER()` sẽ tự động biến tổng toàn phân vùng thành luỹ kế.** Rất nhiều người thêm `ORDER BY` cho "kết quả gọn hơn" rồi không hiểu vì sao cột tổng đột nhiên đổi số.

```sql
sum(x) OVER (PARTITION BY g)              -- tổng cả nhóm, mọi dòng giống nhau
sum(x) OVER (PARTITION BY g ORDER BY t)   -- luỹ kế, mỗi dòng một số
```

Quy tắc thực dụng: **nếu câu lệnh của bạn có `ORDER BY` bên trong `OVER()`, hãy khai frame tường minh.** Viết dài hơn vài chữ, nhưng người đọc sau không phải nhớ mặc định là gì.

---

## Ba hàm xếp hạng, ba kết quả khác nhau
Đây là chỗ hay chọn nhầm. Cùng một tập dữ liệu có giá trị trùng:

```sql
SELECT tien,
       rank()       OVER (ORDER BY tien DESC) AS rank,
       dense_rank() OVER (ORDER BY tien DESC) AS dense_rank,
       row_number() OVER (ORDER BY tien DESC) AS row_number
FROM (VALUES (300),(200),(200),(100)) v(tien);
```

| tien | rank | dense_rank | row_number |
|---|---|---|---|
| 300 | 1 | 1 | 1 |
| 200 | 2 | 2 | 2 |
| 200 | 2 | 2 | 3 |
| 100 | **4** | **3** | 4 |

Ba hàm, ba hành vi:

- **`rank`** — đồng hạng nhận cùng số, rồi **nhảy cóc**. Hai người hạng 2 thì người kế tiếp là hạng 4. Đây là cách xếp hạng thể thao.
- **`dense_rank`** — đồng hạng nhận cùng số, nhưng **không nhảy**. Người kế tiếp là hạng 3. Dùng khi bạn cần "có bao nhiêu mức giá trị khác nhau".
- **`row_number`** — **không có đồng hạng**, mỗi dòng một số. Dùng để phân trang hoặc chọn đúng một dòng đại diện mỗi nhóm.

Chọn sai giữa `rank` và `dense_rank` là lỗi thầm lặng: bảng xếp hạng vẫn hiện ra hợp lý, chỉ là số hạng nhảy hoặc không nhảy trái với kỳ vọng nghiệp vụ.

Còn `row_number` có một ứng dụng rất hay dùng — lấy **bản ghi mới nhất của mỗi nhóm**:

```sql
SELECT * FROM (
  SELECT *, row_number() OVER (PARTITION BY khach_id ORDER BY tao_luc DESC) AS rn
  FROM don_hang
) q WHERE rn = 1;
```

Viết bằng `GROUP BY` thuần thì phải tìm `MAX(tao_luc)` rồi join ngược, và vẫn sai nếu hai đơn cùng thời điểm.

---

## Học tiếp
Bài này đào sâu một điểm trong [series học SQL trong 30 ngày](https://tiennhm.io.vn/docs/database/learn-sql-in-30-days):

| Bài trong series | Liên quan thế nào |
|---|---|
| [Recursive Queries và Window Functions](https://tiennhm.io.vn/docs/database/learn-sql-in-30-days/29-recursive-queries-window-functions) | Cú pháp `OVER`, `PARTITION BY` và recursive CTE |
| [GROUP BY và HAVING](https://tiennhm.io.vn/docs/database/learn-sql-in-30-days/09-group-by-having) | Cách gom nhóm truyền thống |
| [Hàm tổng hợp](https://tiennhm.io.vn/docs/database/learn-sql-in-30-days/08-aggregate-functions) | `SUM`, `AVG`, `COUNT` dùng chung cho cả hai cách |
| [Subquery](https://tiennhm.io.vn/docs/database/learn-sql-in-30-days/11-subquery) | Bảng dẫn xuất cần thiết khi lọc theo kết quả window |
| [Hiệu năng truy vấn](https://tiennhm.io.vn/docs/database/learn-sql-in-30-days/20-query-performance) | Đọc plan để so window với self-join |

Một lưu ý về thứ tự xử lý: window function chạy **sau** `WHERE` và `GROUP BY`, nên bạn **không lọc được** trực tiếp theo kết quả của nó trong `WHERE`. Phải bọc vào một bảng dẫn xuất rồi lọc ở ngoài, như ví dụ `rn = 1` ở trên. Thứ tự các mệnh đề này tôi có nói kỹ hơn trong [bài LEFT JOIN thành INNER JOIN](https://tiennhm.io.vn/blog/left-join-thanh-inner-join).

---

## Câu hỏi thường gặp

### Window function khác GROUP BY ở điểm nào?

GROUP BY gom nhiều dòng thành một dòng cho mỗi nhóm, còn window function giữ nguyên mọi dòng và thêm giá trị tổng hợp của nhóm vào bên cạnh. Đo trên cùng một bảng 200.000 dòng với 200 nhân viên, GROUP BY trả về 200 dòng còn window trả về 200.000 dòng. Nhờ giữ được chi tiết, window cho phép tính những thứ như tỷ lệ đóng góp của từng dòng trong nhóm mà không cần join ngược lại bảng gốc.

### Vì sao luỹ kế tính bằng OVER (ORDER BY ...) lại ra sai ở dòng đầu?

Vì khung cửa sổ mặc định khi có ORDER BY là RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW, và RANGE xác định dòng hiện tại theo giá trị của cột ORDER BY chứ không theo vị trí dòng. Mọi dòng có cùng giá trị sắp xếp đều là đồng hạng và nhận cùng một kết quả luỹ kế. Muốn cộng dồn từng dòng một thì phải ghi rõ ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW.

### RANGE và ROWS khác nhau thế nào trong window frame?

ROWS đếm theo vị trí vật lý của dòng, còn RANGE đếm theo giá trị của cột trong ORDER BY và gom tất cả các dòng đồng hạng lại. Với bảng có hai dòng cùng ngày 01/01 mang giá trị 100 và 200, luỹ kế theo RANGE cho cả hai dòng đều là 300, trong khi theo ROWS thì dòng đầu là 100 và dòng sau là 300. Quy tắc thực dụng là hễ có ORDER BY bên trong OVER thì nên khai frame tường minh.

### rank, dense_rank và row_number khác nhau ra sao?

Với tập giá trị 300, 200, 200, 100 thì rank cho 1, 2, 2, 4 vì đồng hạng nhận cùng số rồi nhảy cóc; dense_rank cho 1, 2, 2, 3 vì đồng hạng nhận cùng số nhưng không nhảy; còn row_number cho 1, 2, 3, 4 vì mỗi dòng một số duy nhất. Dùng rank cho xếp hạng kiểu thể thao, dense_rank khi cần đếm số mức giá trị khác nhau, và row_number để phân trang hoặc chọn đúng một dòng đại diện mỗi nhóm.

### Window function có nhanh hơn self-join không?

Có, trong trường hợp phổ biến là lấy giá trị tổng hợp của nhóm gắn vào từng dòng. Đo trên 200.000 dòng, cách cũ dùng bảng dẫn xuất GROUP BY rồi join ngược mất 79,2 ms, còn window function mất 22,7 ms, nhanh hơn khoảng 3,5 lần. Lý do là self-join phải quét bảng hai lần rồi ghép kết quả, trong khi window chỉ quét một lần và tính trong lúc đi qua dữ liệu đã sắp xếp theo phân vùng.

### Vì sao không lọc được theo kết quả của window function trong WHERE?

Vì window function được tính sau WHERE và GROUP BY trong thứ tự xử lý logic của câu SELECT, nên tại thời điểm WHERE chạy thì giá trị đó chưa tồn tại. Cách làm là bọc câu truy vấn vào một bảng dẫn xuất hoặc CTE rồi lọc ở lớp ngoài, ví dụ tính row_number ở lớp trong rồi thêm điều kiện rn = 1 ở lớp ngoài để lấy bản ghi mới nhất của mỗi nhóm.

## Kết luận
Window function làm được thứ mà `GROUP BY` về nguyên tắc không làm được: **giữ chi tiết và có tổng hợp cùng lúc**. Nó vừa ngắn hơn vừa nhanh hơn cách self-join truyền thống.

Ba điều đáng nhớ:

1. **`GROUP BY` gom, window giữ.** Nếu bạn đang gom rồi join ngược lại bảng gốc, gần như chắc chắn có một window function thay thế được.
2. **Mặc định là `RANGE`, không phải `ROWS`.** Đây là chỗ số liệu sai mà không ai báo, và nó chỉ lộ ra ở những dòng có giá trị sắp xếp trùng nhau.
3. **`ORDER BY` bên trong `OVER()` đổi ý nghĩa của phép tổng hợp.** Thêm nó vào là biến tổng toàn nhóm thành luỹ kế, dù bạn chỉ định thêm cho gọn.

---

**Cập nhật lần cuối**: Tháng 9, 2026
