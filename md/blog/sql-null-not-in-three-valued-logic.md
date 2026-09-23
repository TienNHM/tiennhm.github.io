# Vì sao NOT IN của bạn trả về 0 dòng? Logic ba trị của SQL và cái bẫy NULL

> Nguồn: https://tiennhm.io.vn/blog/sql-null-not-in-three-valued-logic
> Một câu NOT IN trả về đúng 0 dòng trong khi bảng có dữ liệu, còn NOT EXISTS cùng ý định lại trả về đủ. Khác biệt nằm ở chỗ SQL không dùng logic đúng-sai mà dùng logic ba trị, và NULL không phải một giá trị mà là sự vắng mặt của giá trị. Bài viết chứng minh bằng kết quả chạy thật trên PostgreSQL 16 và chỉ ra bốn chỗ khác mà NULL âm thầm đổi kết quả.

> `NULL` trong SQL **không phải một giá trị** mà là ký hiệu cho *"không biết"*. Mọi phép so sánh với nó đều cho ra `UNKNOWN`, và `WHERE` chỉ giữ lại dòng nào cho ra `TRUE` — nên `UNKNOWN` bị loại y như `FALSE`. Hệ quả nghiêm trọng nhất nằm ở `NOT IN`: chỉ cần subquery chứa **một** `NULL` là **toàn bộ** câu truy vấn trả về 0 dòng, kể cả khi dữ liệu rõ ràng có. Tôi chạy thử trên PostgreSQL 16: cùng một ý định, `NOT IN` cho **0 dòng** còn `NOT EXISTS` cho **3 dòng**. Câu lệnh không báo lỗi, không cảnh báo, chỉ lặng lẽ trả về sai.

Đây là loại lỗi không làm ứng dụng sập. Nó chỉ làm báo cáo thiếu số, làm màn hình danh sách trống, làm một chiến dịch gửi thiếu khách hàng — và không để lại dấu vết nào trong log.

Bài này đào sâu một chi tiết trong [series học SQL 30 ngày](https://tiennhm.io.vn/docs/database/learn-sql-in-30-days), cụ thể là phần [toán tử và biểu thức](https://tiennhm.io.vn/docs/database/learn-sql-in-30-days/05-operators-and-expressions) cùng [subquery](https://tiennhm.io.vn/docs/database/learn-sql-in-30-days/11-subquery). Mọi con số dưới đây là kết quả chạy thật trên PostgreSQL 16.11.

## Tóm tắt nhanh (TL;DR)
- `NULL` không phải giá trị, nó là **sự vắng mặt của giá trị**.
- So sánh bất kỳ thứ gì với `NULL` cho ra **`UNKNOWN`**, không phải `TRUE` hay `FALSE`.
- `WHERE` chỉ giữ dòng cho ra `TRUE`, nên `UNKNOWN` bị loại giống hệt `FALSE`.
- `NOT IN` với subquery chứa `NULL` → **luôn trả về 0 dòng**.
- `NOT EXISTS` không dính bẫy này. Dùng nó thay thế.
- `NULL` còn âm thầm đổi kết quả ở `COUNT`, `GROUP BY`, `UNIQUE` và `LEFT JOIN`.

---

## Thí nghiệm
Ba khách hàng, một người chưa khai thành phố:

```sql
CREATE TEMP TABLE kh(id int, ten text, thanh_pho text);
INSERT INTO kh VALUES (1,'An','HCM'), (2,'Binh','HN'), (3,'Chi', NULL);
```

Bây giờ hỏi một câu hoàn toàn bình thường: *"đếm những khách không ở cùng thành phố với khách số 3"*.

```sql
SELECT count(*) FROM kh
WHERE thanh_pho NOT IN (SELECT thanh_pho FROM kh WHERE id = 3);
```

```
 ket_qua_not_in
----------------
              0
```

**Không một dòng nào.** Trong khi bảng có ba khách và hai người trong số đó rõ ràng ở HCM với HN.

Viết lại cùng ý định bằng `NOT EXISTS`:

```sql
SELECT count(*) FROM kh k
WHERE NOT EXISTS (
    SELECT 1 FROM kh x WHERE x.id = 3 AND x.thanh_pho = k.thanh_pho
);
```

```
 ket_qua_not_exists
--------------------
                  3
```

**Ba dòng.** Cùng một câu hỏi bằng tiếng Việt, hai câu SQL, hai kết quả khác nhau hoàn toàn. Không có lỗi cú pháp, không có cảnh báo.

---

## Vì sao lại thế
### `NULL` không phải một giá trị

Đây là chỗ trực giác đánh lừa gần như tất cả mọi người. Chúng ta đọc `NULL` như "rỗng", "trống", hay "chưa có" — tức là vẫn hình dung nó như **một giá trị nào đó**. SQL thì không.

`NULL` nghĩa là **không biết**. Và một khi bạn chấp nhận cách đọc đó thì mọi hành vi kỳ quặc của nó trở nên hợp lý:

```sql
SELECT NULL = NULL;    -- không phải true, mà là NULL
SELECT NULL <> NULL;   -- cũng NULL
SELECT NULL + 1;       -- NULL
```

"Một số tôi không biết" có bằng "một số khác tôi cũng không biết" không? Câu trả lời trung thực là **không biết**. Đó chính xác là thứ SQL trả về.

Vì vậy để kiểm tra `NULL`, bạn không dùng `=` mà phải dùng toán tử riêng:

```sql
WHERE thanh_pho IS NULL       -- đúng
WHERE thanh_pho = NULL        -- luôn UNKNOWN, không bao giờ khớp
```

### Logic ba trị

Hệ quả là SQL không chạy trên logic hai trị `TRUE`/`FALSE` như hầu hết ngôn ngữ lập trình, mà trên **logic ba trị**: `TRUE`, `FALSE`, `UNKNOWN`.

Bảng chân trị của `AND` và `OR` mở rộng như sau:

| A | B | A AND B | A OR B |
|---|---|---|---|
| TRUE | UNKNOWN | UNKNOWN | **TRUE** |
| FALSE | UNKNOWN | **FALSE** | UNKNOWN |
| UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN |

Hai ô in đậm đáng chú ý: `FALSE AND UNKNOWN` vẫn ra `FALSE` (vì sai một vế là đủ sai), và `TRUE OR UNKNOWN` vẫn ra `TRUE` (vì đúng một vế là đủ đúng). Ở những chỗ khác, cái không biết lan ra và nuốt kết quả.

Và đây là quy tắc quyết định: **`WHERE` chỉ giữ lại dòng cho ra `TRUE`.** `FALSE` bị loại, `UNKNOWN` cũng bị loại. Hai thứ rất khác nhau về mặt ý nghĩa nhưng nhận cùng một số phận.

### Ráp lại: vì sao `NOT IN` chết

`x NOT IN (a, b, c)` được SQL khai triển thành:

```
x <> a AND x <> b AND x <> c
```

Trong thí nghiệm, subquery trả về đúng một giá trị là `NULL`, nên điều kiện thành:

```
'HCM' <> NULL   →   UNKNOWN
```

Không phải `TRUE`. Không phải `FALSE`. `UNKNOWN`. Và `WHERE` loại nó đi.

Chuyện tương tự xảy ra với mọi dòng, kể cả dòng có `thanh_pho` là `NULL`. Kết quả: 0 dòng.

Đáng chú ý là `IN` (không có `NOT`) **không** dính bẫy này theo cùng cách. `x IN (a, b, NULL)` vẫn trả về `TRUE` nếu `x` khớp `a` hoặc `b`, vì `TRUE OR UNKNOWN` vẫn là `TRUE`. Chỉ khi không khớp gì thì nó mới ra `UNKNOWN` thay vì `FALSE`. Sự bất đối xứng giữa `IN` và `NOT IN` chính là lý do bẫy này khó nhớ.

### Vì sao `NOT EXISTS` an toàn

`EXISTS` không so sánh giá trị. Nó chỉ hỏi: *subquery có trả về dòng nào không?* Câu hỏi đó luôn có câu trả lời dứt khoát — có hoặc không — nên không bao giờ sinh ra `UNKNOWN`.

Bên trong subquery, phép `x.thanh_pho = k.thanh_pho` vẫn cho `UNKNOWN` khi gặp `NULL`, nên dòng đó không được chọn, nên subquery rỗng, nên `NOT EXISTS` là `TRUE`. Cái không biết dừng lại ở ranh giới subquery thay vì lan ra ngoài.

---

## Bốn chỗ khác NULL âm thầm đổi kết quả
Bẫy `NOT IN` nổi tiếng nhất, nhưng không phải duy nhất.

### 1. `COUNT(*)` khác `COUNT(cột)`

```sql
SELECT count(*), count(thanh_pho) FROM kh;
-- 3, 2
```

`COUNT(*)` đếm **dòng**. `COUNT(cột)` đếm **giá trị không NULL**. Chênh lệch giữa hai con số chính là số dòng thiếu dữ liệu — đôi khi đó là thứ bạn cần, đôi khi đó là bug trong báo cáo. Chi tiết về các hàm tổng hợp nằm ở [bài hàm tổng hợp](https://tiennhm.io.vn/docs/database/learn-sql-in-30-days/08-aggregate-functions).

Cùng logic ấy, `AVG(cột)` bỏ qua `NULL` chứ không coi chúng là 0. Trung bình của `(10, NULL, 20)` là `15`, không phải `10`.

### 2. `GROUP BY` gom mọi `NULL` vào một nhóm

```sql
SELECT thanh_pho, count(*) FROM kh GROUP BY thanh_pho;
```

Tất cả dòng có `thanh_pho` là `NULL` rơi vào **cùng một nhóm**, dù về mặt logic chúng là "không biết" chứ không phải "giống nhau". Đây là một ngoại lệ có chủ ý của chuẩn SQL, và nó mâu thuẫn với chính quy tắc `NULL <> NULL` ở trên. Xem thêm [bài GROUP BY và HAVING](https://tiennhm.io.vn/docs/database/learn-sql-in-30-days/09-group-by-having).

### 3. `UNIQUE` không chặn nhiều `NULL`

Một ràng buộc `UNIQUE` trên cột cho phép `NULL` sẽ chấp nhận **nhiều dòng cùng NULL**, vì hai cái "không biết" không được coi là trùng nhau. Rất nhiều người dựa vào `UNIQUE` để đảm bảo "mỗi khách một mã số thuế" rồi ngạc nhiên khi có hàng trăm dòng `NULL`. Nếu cột đó thật sự bắt buộc, hãy khai `NOT NULL` — phần thiết kế bảng nằm ở [bài cấu trúc bảng và kiểu dữ liệu](https://tiennhm.io.vn/docs/database/learn-sql-in-30-days/02-table-structure-and-data-types).

### 4. `LEFT JOIN` sinh ra `NULL` rồi bạn lọc mất chúng

`LEFT JOIN` cố tình tạo ra `NULL` cho những dòng không khớp. Thêm một điều kiện `WHERE` lên cột bên phải là bạn loại sạch chúng, và `LEFT JOIN` âm thầm biến thành `INNER JOIN`. Đây là một cái bẫy đủ lớn để tôi tách riêng thành [một bài khác](https://tiennhm.io.vn/blog/left-join-thanh-inner-join).

---

## Viết sao cho an toàn
| Tình huống | Tránh | Dùng |
|---|---|---|
| Loại trừ theo subquery | `NOT IN (SELECT ...)` | `NOT EXISTS (SELECT 1 ...)` |
| So sánh có thể gặp NULL | `a = b` | `a IS NOT DISTINCT FROM b` |
| Thay NULL bằng mặc định | (không xử lý) | `COALESCE(cot, 'mac_dinh')` |
| Kiểm tra rỗng | `= NULL` | `IS NULL` |
| Cột bắt buộc | để mặc định | khai `NOT NULL` ngay từ đầu |

Hai dòng đáng nói thêm.

`IS NOT DISTINCT FROM` là toán tử so sánh coi `NULL` bằng `NULL`, tức là đúng thứ trực giác của bạn muốn ngay từ đầu. Nó dài dòng nhưng dứt khoát.

Còn dòng cuối là cách chữa gốc rễ: **phần lớn bẫy NULL biến mất nếu cột đó không được phép NULL.** Trước khi đi tìm mẹo xử lý `NULL`, hãy hỏi xem cột đó có lý do chính đáng nào để rỗng không. Rất nhiều cột `NULL`-able tồn tại chỉ vì lúc tạo bảng không ai nghĩ tới, chứ không phải vì nghiệp vụ cho phép.

---

## Học tiếp
Bài này đào sâu một điểm trong [series học SQL trong 30 ngày](https://tiennhm.io.vn/docs/database/learn-sql-in-30-days). Những bài liên quan trực tiếp:

| Bài trong series | Liên quan thế nào |
|---|---|
| [Toán tử và biểu thức](https://tiennhm.io.vn/docs/database/learn-sql-in-30-days/05-operators-and-expressions) | Nơi `IS NULL`, `IN`, `NOT IN` được giới thiệu |
| [Subquery](https://tiennhm.io.vn/docs/database/learn-sql-in-30-days/11-subquery) | `EXISTS`, `NOT EXISTS` và subquery tương quan |
| [Hàm tổng hợp](https://tiennhm.io.vn/docs/database/learn-sql-in-30-days/08-aggregate-functions) | `COUNT`, `AVG` và cách chúng bỏ qua `NULL` |
| [GROUP BY và HAVING](https://tiennhm.io.vn/docs/database/learn-sql-in-30-days/09-group-by-having) | Cách `NULL` được gom nhóm |
| [SELECT và WHERE](https://tiennhm.io.vn/docs/database/learn-sql-in-30-days/03-select-where) | Vì sao `WHERE` chỉ giữ `TRUE` |

---

## Câu hỏi thường gặp

### Vì sao câu NOT IN trả về 0 dòng dù bảng có dữ liệu?

Vì subquery bên trong NOT IN có chứa giá trị NULL. SQL khai triển x NOT IN (a, b, c) thành x <> a AND x <> b AND x <> c, và bất kỳ phép so sánh nào với NULL đều cho ra UNKNOWN chứ không phải TRUE hay FALSE. Mệnh đề WHERE chỉ giữ lại dòng cho ra TRUE, nên UNKNOWN bị loại giống hệt FALSE, và kết quả là không dòng nào sống sót. Chỉ cần một NULL duy nhất trong subquery là đủ để làm hỏng toàn bộ câu truy vấn.

### NOT EXISTS khác NOT IN ở điểm nào khi gặp NULL?

NOT EXISTS không so sánh giá trị mà chỉ hỏi subquery có trả về dòng nào không, và câu hỏi đó luôn có câu trả lời dứt khoát là có hoặc không, nên không bao giờ sinh ra UNKNOWN. Phép so sánh với NULL bên trong subquery vẫn cho UNKNOWN nên dòng đó không được chọn, subquery rỗng, và NOT EXISTS trả về TRUE. Cái không biết dừng lại ở ranh giới subquery thay vì lan ra ngoài. Thử nghiệm trên PostgreSQL 16 cho thấy cùng một ý định, NOT IN trả về 0 dòng còn NOT EXISTS trả về 3 dòng.

### Logic ba trị trong SQL là gì?

SQL không chạy trên logic hai trị TRUE và FALSE như hầu hết ngôn ngữ lập trình, mà trên logic ba trị gồm TRUE, FALSE và UNKNOWN. Giá trị UNKNOWN xuất hiện mỗi khi có phép so sánh với NULL, vì NULL nghĩa là không biết chứ không phải một giá trị cụ thể. Điều quan trọng là WHERE chỉ giữ lại dòng cho kết quả TRUE, nên UNKNOWN bị loại bỏ giống hệt FALSE dù hai thứ này rất khác nhau về mặt ý nghĩa.

### Vì sao IN không bị lỗi với NULL mà NOT IN thì có?

Vì bảng chân trị của OR và AND đối xử với UNKNOWN khác nhau. IN được khai triển thành chuỗi OR, và TRUE OR UNKNOWN vẫn cho TRUE, nên nếu giá trị khớp với một phần tử bất kỳ thì câu lệnh vẫn đúng. NOT IN được khai triển thành chuỗi AND với phép khác, và UNKNOWN AND bất cứ thứ gì khác FALSE đều cho UNKNOWN, nên không dòng nào qua được. Chính sự bất đối xứng này làm cái bẫy khó nhớ.

### COUNT(*) và COUNT(cột) khác nhau thế nào?

COUNT(*) đếm số dòng, còn COUNT(cột) chỉ đếm những dòng mà cột đó không NULL. Chênh lệch giữa hai con số chính là số dòng thiếu dữ liệu ở cột ấy. Cùng logic đó, AVG bỏ qua NULL chứ không coi chúng là 0, nên trung bình của 10, NULL và 20 là 15 chứ không phải 10. Đây là nguồn sai lệch rất phổ biến trong báo cáo.

### Ràng buộc UNIQUE có chặn được nhiều dòng NULL không?

Không. Ràng buộc UNIQUE trên một cột cho phép NULL sẽ chấp nhận nhiều dòng cùng mang giá trị NULL, vì theo logic của SQL hai cái không biết không được coi là trùng nhau. Nhiều người dựa vào UNIQUE để đảm bảo mỗi bản ghi một mã định danh rồi ngạc nhiên khi thấy hàng trăm dòng NULL cùng tồn tại. Nếu cột đó thực sự bắt buộc thì phải khai NOT NULL ngay từ khi thiết kế bảng.

## Kết luận
`NULL` là một trong số ít chỗ mà SQL đòi bạn **bỏ trực giác lập trình thông thường đi**. Ở hầu hết ngôn ngữ, so sánh hai thứ luôn cho ra đúng hoặc sai. Trong SQL thì có một khả năng thứ ba, và nó bị đối xử y như "sai" ở mệnh đề `WHERE`.

Ba điều đáng nhớ:

1. **Đọc `NULL` là "không biết", đừng đọc là "rỗng".** Mọi hành vi kỳ quặc của nó lập tức trở nên hợp lý.
2. **Đừng dùng `NOT IN` với subquery.** Chi phí đổi sang `NOT EXISTS` gần như bằng không, còn rủi ro thì rất thật.
3. **Cách chữa tốt nhất là ngăn từ đầu.** Một cột `NOT NULL` không bao giờ gây ra bất kỳ vấn đề nào trong bài viết này.

---

**Cập nhật lần cuối**: Tháng 9, 2026
