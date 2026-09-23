---
title: "Có index rồi mà truy vấn vẫn quét toàn bảng? Sargability và một hàm bọc quanh cột"
slug: sql-index-khong-duoc-dung-sargable
description: "Cột đã có index, câu WHERE lọc đúng cột đó, nhưng execution plan vẫn là Seq Scan. Nguyên nhân thường chỉ là một hàm bọc quanh cột. Bài viết đo trên PostgreSQL 16 với 200.000 dòng: bọc hàm mất 29,6 ms và quét toàn bảng, viết lại thành khoảng còn 5,4 ms và dùng index — kèm một chi tiết ít người để ý là planner ước lượng sai 37 lần."
keywords: [index khong duoc dung, sargable sql, sargability, seq scan thay vi index scan, explain analyze, postgresql explain, where date_part khong dung index, function tren cot index, index scan vs seq scan, toi uu truy van sql, composite index leftmost prefix, index selectivity, query planner estimate, bitmap index scan, sql query optimization, hoc sql index, mysql index khong hoat dong]
tags: [sql, database, postgresql, performance, backend]
authors: [tiennhm]
date: 2026-09-26
---

import { SummaryBox, FAQSection, Checklist } from '@site/src/components/SEO';

# Có index rồi mà vẫn quét toàn bảng?

<SummaryBox>
Index là một cấu trúc sắp xếp theo **giá trị của cột**. Khi bạn bọc một hàm quanh cột — `date_part('year', tao_luc)`, `LOWER(email)`, `CAST(...)` — thì thứ bạn đang so sánh không còn là giá trị đã được sắp xếp nữa, nên database **không dùng index được** và phải quét toàn bảng. Điều kiện dùng được index gọi là **sargable**. Đo trên PostgreSQL 16 với 200.000 dòng: bản bọc hàm chạy **29,6 ms** với `Seq Scan`, bản viết lại thành khoảng chạy **5,4 ms** với `Bitmap Index Scan` — nhanh hơn ~5,4 lần và trả về cùng 37.518 dòng.
</SummaryBox>

Tình huống quen thuộc: truy vấn chậm, bạn tạo index lên đúng cột đang lọc, chạy lại — vẫn chậm y như cũ. Index nằm đó, `\d` thấy rõ, nhưng execution plan không hề nhắc tới nó.

Bài này đào sâu [bài Index](/docs/database/learn-sql-in-30-days/15-index) và [bài tối ưu truy vấn](/docs/database/learn-sql-in-30-days/28-sql-query-optimization) trong series học SQL 30 ngày. Mọi con số là kết quả chạy thật trên PostgreSQL 16.11.

<!-- truncate -->

## Tóm tắt nhanh (TL;DR) {#tldr}

- Index sắp xếp theo **giá trị gốc của cột**, không theo kết quả của hàm áp lên cột.
- Bọc hàm quanh cột trong `WHERE` → index bị bỏ qua → quét toàn bảng.
- Điều kiện dùng được index gọi là **sargable**.
- Cách sửa: viết lại thành **khoảng giá trị**, hoặc tạo **index trên biểu thức**.
- Tác hại phụ ít người để ý: planner **ước lượng sai** số dòng, kéo theo chọn sai cả kế hoạch join.

---

## Phép đo {#phep-do}

Hai trăm nghìn đơn hàng, index trên cột thời gian:

```sql
CREATE TEMP TABLE don(id serial, tao_luc timestamp, tien numeric);
INSERT INTO don(tao_luc, tien)
SELECT timestamp '2024-01-01' + (i % 900) * interval '1 day', (i % 1000)
FROM generate_series(1, 200000) i;

CREATE INDEX idx_don_tao_luc ON don(tao_luc);
ANALYZE don;
```

**Cách viết tự nhiên nhất** — lọc theo năm:

```sql
EXPLAIN (ANALYZE) SELECT count(*) FROM don
WHERE date_part('year', tao_luc) = 2026;
```

```
Aggregate  (cost=4276.50..4276.51 rows=1)
  ->  Seq Scan on don  (cost=0.00..4274.00 rows=1000) (actual rows=37518)
        Filter: (date_part('year'::text, tao_luc) = '2026'::double precision)
        Rows Removed by Filter: 162482
Execution Time: 29.644 ms
```

`Seq Scan`. Index có tồn tại nhưng không được đụng tới. Database đọc cả 200.000 dòng rồi vứt đi 162.482 dòng.

**Viết lại thành khoảng:**

```sql
EXPLAIN (ANALYZE) SELECT count(*) FROM don
WHERE tao_luc >= '2026-01-01' AND tao_luc < '2027-01-01';
```

```
Aggregate  (cost=2475.04..2475.05 rows=1)
  ->  Bitmap Heap Scan on don  (cost=532.10..2379.48 rows=38225) (actual rows=37518)
        ->  Bitmap Index Scan on idx_don_tao_luc  (cost=0.00..522.54 rows=38225)
              Index Cond: (tao_luc >= '2026-01-01' AND tao_luc < '2027-01-01')
Execution Time: 5.453 ms
```

`Bitmap Index Scan`. **5,4 ms thay vì 29,6 ms**, cùng kết quả 37.518 dòng.

---

## Vì sao index bị bỏ qua {#vi-sao-bi-bo-qua}

Hãy hình dung index như mục lục của một cuốn sách, sắp xếp theo **tên**. Bạn tra "Nguyễn Văn An" thì nhảy thẳng tới chữ N. Nhưng nếu câu hỏi là *"tìm những người có tên chứa đúng 12 ký tự"* thì mục lục vô dụng — nó không được sắp theo độ dài tên.

Index B-tree trên `tao_luc` được sắp theo **giá trị timestamp**. Câu `date_part('year', tao_luc) = 2026` không hỏi về giá trị timestamp, nó hỏi về **kết quả của một hàm** áp lên timestamp. Database không có cấu trúc nào sắp theo thứ đó, nên chỉ còn cách tính hàm cho từng dòng và so sánh — tức là quét toàn bộ.

Thuật ngữ cho điều kiện dùng được index là **sargable**, viết tắt của *Search ARGument ABLE*. Quy tắc gọn: **để một bên của phép so sánh là cột trần, đừng bọc gì quanh nó.**

---

## Những dạng làm mất sargability {#cac-dang-mat-sargability}

| Viết thế này (không sargable) | Viết lại thành |
|---|---|
| `date_part('year', tao_luc) = 2026` | `tao_luc >= '2026-01-01' AND tao_luc < '2027-01-01'` |
| `DATE(tao_luc) = '2026-05-01'` | `tao_luc >= '2026-05-01' AND tao_luc < '2026-05-02'` |
| `LOWER(email) = 'a@b.com'` | index trên biểu thức, xem mục dưới |
| `tien * 1.1 > 1000` | `tien > 1000 / 1.1` |
| `CAST(ma_kh AS text) = '123'` | `ma_kh = 123` |
| `ten LIKE '%an'` | không cứu được bằng B-tree |
| `ma_so + 0 = 100` | `ma_so = 100` |

Ba dòng đáng nói thêm.

**`LIKE` với `%` ở đầu** không dùng được B-tree, vì index sắp theo thứ tự từ trái sang và bạn không cho nó biết ký tự đầu. `LIKE 'an%'` thì dùng được. Muốn tìm chuỗi con ở giữa thì cần công cụ khác — trigram index hoặc full-text search.

**`CAST` ngầm** là dạng khó thấy nhất, vì bạn không tự viết ra nó. So sánh một cột số với một chuỗi, hoặc so `varchar` với `nvarchar`, có thể khiến database tự chèn phép chuyển kiểu lên **cột** và giết index. Đây là nguồn lỗi kinh điển trong các hệ thống có cột kiểu không nhất quán — phần chọn kiểu dữ liệu nằm ở [bài cấu trúc bảng](/docs/database/learn-sql-in-30-days/02-table-structure-and-data-types).

**`OR` giữa hai cột khác nhau** cũng thường phá kế hoạch. `WHERE a = 1 OR b = 2` khó dùng index hơn hẳn `WHERE a = 1` rồi `UNION` với `WHERE b = 2`.

---

## Khi không viết lại được: index trên biểu thức {#index-tren-bieu-thuc}

Có những trường hợp phép biến đổi là bản chất của nghiệp vụ, ví dụ tra cứu email không phân biệt hoa thường. Lúc đó đừng bỏ hàm đi, mà hãy **đánh index cho chính biểu thức ấy**:

```sql
-- PostgreSQL
CREATE INDEX idx_kh_email_lower ON kh (LOWER(email));

-- Từ đây câu này dùng được index
SELECT * FROM kh WHERE LOWER(email) = 'a@b.com';
```

Điều kiện để nó hoạt động: biểu thức trong index phải **khớp chính xác** với biểu thức trong `WHERE`. `LOWER(email)` khác `LOWER(TRIM(email))`, và index cho cái này không phục vụ cái kia.

MySQL 8.0 có functional index tương đương, còn SQL Server dùng computed column có đánh index. Cùng một ý tưởng, khác cú pháp.

---

## Tác hại phụ ít người để ý: planner ước lượng sai {#planner-uoc-luong-sai}

Đây là phần tôi thấy thú vị nhất trong phép đo, và nó không nằm ở con số thời gian.

Nhìn lại kế hoạch của bản bọc hàm:

```
Seq Scan on don  (cost=0.00..4274.00 rows=1000) (actual rows=37518)
```

Planner **đoán 1.000 dòng**, thực tế là **37.518 dòng** — sai gần 37 lần.

So với bản sargable:

```
Bitmap Index Scan  (rows=38225)  (actual rows=37518)
```

Đoán 38.225, thực tế 37.518 — sai chưa tới 2%.

Lý do: database giữ **thống kê** về phân bố giá trị của từng cột. Khi bạn so sánh trực tiếp trên cột, nó tra thống kê và ước lượng khá chính xác. Khi bạn bọc hàm, nó **không biết hàm đó làm gì** với phân bố ấy, nên rơi về một con số phỏng đoán mặc định.

Hậu quả nghiêm trọng hơn nhiều so với việc quét thừa một bảng: trong một truy vấn có nhiều bảng, **ước lượng sai số dòng dẫn tới chọn sai thuật toán join và sai thứ tự join**. Một con số sai 37 lần ở bước đầu có thể biến thành kế hoạch chậm hàng trăm lần ở bước sau. Cách đọc execution plan để phát hiện chuyện này nằm ở [bài hiệu năng truy vấn](/docs/database/learn-sql-in-30-days/20-query-performance).

Nói cách khác: **mất sargability không chỉ làm chậm một phép quét, nó làm database đưa ra quyết định tồi trên toàn bộ câu truy vấn.**

---

## Index không phải miễn phí {#index-khong-mien-phi}

Vì bài này nói về việc làm index hoạt động, cũng cần nói rõ mặt còn lại: **mỗi index là một cái giá trả bằng ghi.**

Mỗi `INSERT`, `UPDATE`, `DELETE` phải cập nhật mọi index liên quan. Một bảng có tám index thì mỗi lần ghi là chín cấu trúc phải đổi. Với bảng ghi nhiều, thêm index có thể làm hệ thống chậm đi chứ không nhanh lên.

Vài nguyên tắc thực dụng:

- Index cột nằm trong `WHERE`, `JOIN`, `ORDER BY` — không index bừa mọi cột.
- **Index phức hợp có thứ tự cột quan trọng.** `(a, b)` phục vụ được `WHERE a = ?` và `WHERE a = ? AND b = ?`, nhưng **không** phục vụ `WHERE b = ?`. Đây gọi là quy tắc leftmost prefix.
- Cột có độ chọn lọc thấp (ví dụ `gioi_tinh` chỉ hai giá trị) thì index thường vô ích.
- Index trùng lặp — `(a)` khi đã có `(a, b)` — là chi phí ghi thuần tuý, nên xoá.

<Checklist
  title="Khi một truy vấn chậm dù đã có index"
  items={[
    { text: "Chạy EXPLAIN ANALYZE, xem có Seq Scan trên bảng lớn không" },
    { text: "Tìm hàm hoặc phép tính bọc quanh cột trong WHERE" },
    { text: "Kiểm tra CAST ngầm do so sánh khác kiểu dữ liệu" },
    { text: "So rows ước lượng với actual rows — lệch nhiều là dấu hiệu mất sargability" },
    { text: "Với index phức hợp, kiểm tra điều kiện có phủ cột trái nhất không" },
    { text: "Chạy ANALYZE nếu thống kê đã cũ" },
    { text: "Viết lại thành khoảng giá trị, hoặc tạo index trên biểu thức", checked: true }
  ]}
/>

---

## Học tiếp {#hoc-tiep}

Bài này đào sâu hai điểm trong [series học SQL trong 30 ngày](/docs/database/learn-sql-in-30-days):

| Bài trong series | Liên quan thế nào |
|---|---|
| [Index](/docs/database/learn-sql-in-30-days/15-index) | Cấu trúc index, cách tạo và khi nào nên tạo |
| [Hiệu năng truy vấn](/docs/database/learn-sql-in-30-days/20-query-performance) | Đọc execution plan, nhận biết điểm nghẽn |
| [Tối ưu truy vấn SQL](/docs/database/learn-sql-in-30-days/28-sql-query-optimization) | Các kỹ thuật viết lại truy vấn |
| [Cấu trúc bảng và kiểu dữ liệu](/docs/database/learn-sql-in-30-days/02-table-structure-and-data-types) | Kiểu dữ liệu nhất quán để tránh CAST ngầm |
| [Thiết kế database](/docs/database/learn-sql-in-30-days/27-database-design-best-practices) | Cân bằng giữa đọc và ghi khi đặt index |

Ở phía ứng dụng, một dạng chậm khác hẳn nhưng hay bị nhầm với chuyện này là [vấn đề N+1 query trong EF Core](/blog/ef-core-n-plus-1-query): ở đó mỗi câu lệnh đều nhanh, cái chậm nằm ở **số lần** đi lại chứ không ở kế hoạch thực thi.

---

<FAQSection
  title="Câu hỏi thường gặp"
  items={[
    {
      question: "Vì sao có index rồi mà truy vấn vẫn Seq Scan?",
      answer: "Nguyên nhân phổ biến nhất là có một hàm hoặc phép tính bọc quanh cột trong mệnh đề WHERE, ví dụ date_part, DATE, LOWER hay CAST. Index B-tree được sắp xếp theo giá trị gốc của cột, nên khi bạn so sánh kết quả của một hàm áp lên cột thì không có cấu trúc nào phù hợp để tra, và database buộc phải tính hàm cho từng dòng. Ngoài ra còn các lý do khác như bảng quá nhỏ, độ chọn lọc thấp, hoặc thống kê đã cũ."
    },
    {
      question: "Sargable nghĩa là gì?",
      answer: "Sargable là viết tắt của Search ARGument ABLE, chỉ những điều kiện lọc mà database có thể dùng index để phục vụ. Quy tắc thực dụng là để một bên của phép so sánh là cột trần, không bọc hàm hay phép tính nào quanh nó. Ví dụ tao_luc >= '2026-01-01' AND tao_luc < '2027-01-01' là sargable, còn date_part('year', tao_luc) = 2026 thì không, dù hai câu cho cùng kết quả."
    },
    {
      question: "Lọc theo năm hoặc theo ngày mà vẫn dùng được index thì viết thế nào?",
      answer: "Viết lại thành một khoảng giá trị trên chính cột đó. Thay vì date_part('year', tao_luc) = 2026, dùng tao_luc >= '2026-01-01' AND tao_luc < '2027-01-01'. Thay vì DATE(tao_luc) = '2026-05-01', dùng tao_luc >= '2026-05-01' AND tao_luc < '2026-05-02'. Lưu ý dùng cận dưới lớn hơn hoặc bằng và cận trên nhỏ hơn, tránh BETWEEN với timestamp vì nó bao gồm cả cận trên và dễ sai ở phần giây."
    },
    {
      question: "Khi buộc phải dùng hàm trong WHERE thì làm sao?",
      answer: "Tạo index trên chính biểu thức đó. Trong PostgreSQL là CREATE INDEX idx ON bang (LOWER(email)), MySQL 8.0 có functional index tương đương, còn SQL Server dùng computed column có đánh index. Điều kiện để nó hoạt động là biểu thức trong index phải khớp chính xác với biểu thức trong WHERE: index cho LOWER(email) không phục vụ được truy vấn dùng LOWER(TRIM(email))."
    },
    {
      question: "Vì sao mất sargability lại làm planner ước lượng sai số dòng?",
      answer: "Vì database giữ thống kê về phân bố giá trị của từng cột. Khi bạn so sánh trực tiếp trên cột, nó tra thống kê và ước lượng khá chính xác. Khi bạn bọc hàm, nó không biết hàm đó biến đổi phân bố ra sao nên rơi về một con số phỏng đoán mặc định. Trong phép đo trên PostgreSQL 16, bản bọc hàm đoán 1.000 dòng trong khi thực tế là 37.518, sai gần 37 lần, còn bản sargable đoán 38.225 so với thực tế 37.518. Ước lượng sai nguy hiểm vì nó dẫn tới chọn sai thuật toán và thứ tự join trong những truy vấn nhiều bảng."
    },
    {
      question: "Index phức hợp (a, b) có phục vụ được truy vấn lọc theo b không?",
      answer: "Không. Index phức hợp được sắp xếp theo cột trái nhất trước, nên (a, b) phục vụ được WHERE a = ? và WHERE a = ? AND b = ?, nhưng không phục vụ WHERE b = ? một mình. Đây gọi là quy tắc leftmost prefix. Vì vậy thứ tự cột trong index phức hợp là một quyết định thiết kế chứ không phải chuyện tuỳ tiện, và nên đặt cột xuất hiện thường xuyên nhất trong điều kiện lọc lên trước."
    },
    {
      question: "Tạo thêm index có tác dụng phụ gì không?",
      answer: "Có. Mỗi index là một cấu trúc phải được cập nhật ở mọi lần INSERT, UPDATE và DELETE, nên một bảng có tám index thì mỗi lần ghi là chín cấu trúc phải thay đổi. Với bảng ghi nhiều, thêm index có thể làm hệ thống chậm đi thay vì nhanh lên. Ngoài ra index chiếm dung lượng lưu trữ, và index trùng lặp như (a) khi đã có (a, b) là chi phí ghi thuần tuý nên xoá đi."
    }
  ]}
/>

## Kết luận {#ket-luan}

Index không phải một công tắc bật lên là nhanh. Nó là một **cấu trúc sắp xếp theo giá trị cụ thể**, và câu truy vấn của bạn phải hỏi đúng thứ nó được sắp theo thì mới dùng được.

Ba điều đáng nhớ:

1. **Để cột trần ở một bên phép so sánh.** Gần như mọi trường hợp index bị bỏ qua đều quy về việc có gì đó bọc quanh cột.
2. **Đọc cả phần ước lượng, đừng chỉ đọc thời gian.** Khoảng cách giữa `rows=` và `actual rows=` cho bạn biết planner đang hiểu sai dữ liệu tới mức nào, và đó mới là thứ gây ra kế hoạch tồi ở những truy vấn lớn.
3. **Mỗi index là một cái giá trả bằng ghi.** Câu hỏi đúng không phải "cột này có nên có index không" mà là "chi phí ghi thêm có đáng với phần đọc tiết kiệm được không".

---

**Cập nhật lần cuối**: Tháng 9, 2026

## Bài liên quan

- [28. SQL query optimization](/docs/database/learn-sql-in-30-days/28-sql-query-optimization) — Hướng dẫn tối ưu hóa truy vấn SQL, phân tích truy vấn với EXPLAIN ANALYZE, tránh lỗi phổ biến khi viết SQL, tận dụng Index, Partition, Caching để…
- [20. Query Performance](/docs/database/learn-sql-in-30-days/20-query-performance) — Tìm hiểu cách phân tích và tối ưu hiệu suất truy vấn SQL bằng EXPLAIN ANALYZE.
- [15. Index](/docs/database/learn-sql-in-30-days/15-index) — Giới thiệu về Index trong SQL, cách tạo và sử dụng Index, cách tối ưu truy vấn SQL với Index.
