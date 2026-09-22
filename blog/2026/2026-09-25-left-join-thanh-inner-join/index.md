---
title: "LEFT JOIN của bạn đã thành INNER JOIN mà không ai báo"
slug: left-join-thanh-inner-join
description: "Thêm một điều kiện WHERE lên cột của bảng bên phải là LEFT JOIN âm thầm biến thành INNER JOIN, và những dòng bạn cố tình giữ lại biến mất. Bài viết chứng minh bằng ba con số chạy thật trên PostgreSQL 16, giải thích thứ tự xử lý mệnh đề trong SQL, và chỉ ra khi nào điều kiện thuộc về ON còn khi nào thuộc về WHERE."
keywords: [left join thanh inner join, left join where null, left join vs inner join, dieu kien on hay where, sql join order of operations, sql logical processing order, left join is null, anti join sql, outer join filter, left join count sai, sql join null, postgresql left join, mysql left join, hoc sql join, sql join nang cao]
tags: [sql, database, postgresql, backend, fundamentals]
authors: [tiennhm]
date: 2026-09-25
---

import { SummaryBox, FAQSection } from '@site/src/components/SEO';

# LEFT JOIN của bạn đã thành INNER JOIN

<SummaryBox>
`LEFT JOIN` giữ lại mọi dòng của bảng bên trái và điền `NULL` cho phần không khớp. Nhưng `WHERE` chạy **sau** phép join, nên bất kỳ điều kiện nào đặt lên cột của bảng bên phải sẽ loại luôn những dòng `NULL` ấy — và `LEFT JOIN` biến thành `INNER JOIN` mà không có cảnh báo nào. Chạy thật trên PostgreSQL 16: `LEFT JOIN` thuần cho **4 dòng**, thêm `WHERE` còn **2 dòng**, nhưng đưa đúng điều kiện đó vào `ON` thì được **3 dòng** — mới là con số đúng.
</SummaryBox>

Đây là lỗi tôi thấy nhiều nhất trong các câu truy vấn báo cáo. Nó không sai cú pháp, không chậm, không ném lỗi. Nó chỉ trả về **thiếu dòng**, và thường là thiếu đúng những dòng quan trọng nhất: khách chưa có đơn nào, sản phẩm chưa bán được cái nào, nhân viên chưa chốt được hợp đồng nào.

Bài này đào sâu [bài JOIN trong series học SQL 30 ngày](/docs/database/learn-sql-in-30-days/10-join). Mọi con số bên dưới là kết quả chạy thật trên PostgreSQL 16.11.

<!-- truncate -->

## Tóm tắt nhanh (TL;DR) {#tldr}

- `WHERE` chạy **sau** `JOIN`, nên nó lọc cả những dòng `NULL` mà `LEFT JOIN` vừa tạo ra.
- Điều kiện lên **bảng bên phải** đặt trong `WHERE` → `LEFT JOIN` thành `INNER JOIN`.
- Cùng điều kiện đó đặt trong `ON` → giữ nguyên ý nghĩa của `LEFT JOIN`.
- Ngoại lệ duy nhất: `WHERE cot_ben_phai IS NULL` — đó là chủ ý, gọi là **anti-join**.
- Triệu chứng nhận biết: báo cáo thiếu đúng nhóm "chưa có gì".

---

## Ba con số {#ba-con-so}

Ba khách hàng, bốn đơn hàng, trong đó khách `Chi` chưa mua gì:

```sql
CREATE TEMP TABLE kh(id int, ten text);
INSERT INTO kh VALUES (1,'An'), (2,'Binh'), (3,'Chi');

CREATE TEMP TABLE dh(id int, kh_id int, tong numeric);
INSERT INTO dh VALUES (10,1,500), (11,1,300), (12,2,700);
```

**Lần 1 — `LEFT JOIN` thuần:**

```sql
SELECT count(*) FROM kh k LEFT JOIN dh d ON d.kh_id = k.id;
```

```
 so_dong_left_join
-------------------
                 4
```

Bốn dòng: An có hai đơn, Binh một đơn, Chi một dòng với phần đơn hàng toàn `NULL`. Đúng như mong đợi.

**Lần 2 — thêm một điều kiện lọc bình thường:**

```sql
SELECT count(*) FROM kh k LEFT JOIN dh d ON d.kh_id = k.id
WHERE d.tong > 400;
```

```
 them_where
------------
          2
```

**Chi biến mất.** Câu truy vấn giờ chỉ trả về An (đơn 500) và Binh (đơn 700). Nếu ý định của bạn là *"liệt kê mọi khách, kèm các đơn lớn hơn 400 nếu có"* thì kết quả này **sai**.

**Lần 3 — đưa đúng điều kiện đó vào `ON`:**

```sql
SELECT count(*) FROM kh k LEFT JOIN dh d ON d.kh_id = k.id AND d.tong > 400;
```

```
 dieu_kien_trong_on
--------------------
                  3
```

**Ba dòng.** An (500), Binh (700), và Chi với phần đơn hàng là `NULL`. Đây mới là thứ bạn muốn.

Cùng một điều kiện `d.tong > 400`, đổi chỗ từ `WHERE` sang `ON`, kết quả đi từ 2 lên 3.

---

## Vì sao {#vi-sao}

### Thứ tự xử lý logic của một câu SELECT

SQL không chạy các mệnh đề theo thứ tự bạn viết chúng. Thứ tự xử lý logic là:

```
1. FROM  +  JOIN ... ON      ← ghép bảng, sinh ra NULL cho phần không khớp
2. WHERE                     ← lọc kết quả đã ghép
3. GROUP BY
4. HAVING
5. SELECT
6. ORDER BY
7. LIMIT
```

`ON` thuộc **bước 1**, `WHERE` thuộc **bước 2**. Đây là toàn bộ lời giải thích.

### Diễn lại từng bước

Sau bước 1 với `LEFT JOIN`, bảng trung gian trông như sau:

| k.ten | d.id | d.tong |
|---|---|---|
| An | 10 | 500 |
| An | 11 | 300 |
| Binh | 12 | 700 |
| **Chi** | **NULL** | **NULL** |

Bước 2 áp `WHERE d.tong > 400` lên chính bảng này. Với dòng của Chi, phép so sánh là:

```
NULL > 400   →   UNKNOWN
```

Không phải `TRUE`, không phải `FALSE`. Mà `WHERE` chỉ giữ lại dòng cho ra `TRUE`, nên dòng của Chi bị loại. Cơ chế `UNKNOWN` này chính là [logic ba trị mà tôi viết riêng một bài](/blog/sql-null-not-in-three-valued-logic) — cùng một nguyên nhân gốc, biểu hiện ở một chỗ khác.

Kết quả: mọi dòng do `LEFT JOIN` sinh ra đều bị xoá sạch, và bạn còn lại đúng những gì `INNER JOIN` sẽ cho.

### Khi điều kiện nằm trong `ON`

Đặt `d.tong > 400` vào `ON` thì nó tham gia vào **bước 1**, tức là nó quyết định dòng nào được coi là **khớp**. Đơn 300 của An không khớp, nên nó không xuất hiện. Nhưng `LEFT JOIN` vẫn làm đúng việc của nó: mọi khách bên trái đều được giữ, ai không có dòng khớp thì nhận `NULL`.

Chi không có đơn nào khớp → Chi vẫn ở đó với `NULL`. Đúng ý định.

---

## Quy tắc quyết định {#quy-tac}

| Điều kiện lọc lên | Đặt ở | Vì sao |
|---|---|---|
| Bảng bên **trái** | `WHERE` | Không sinh `NULL`, đặt đâu cũng được, `WHERE` rõ ý hơn |
| Bảng bên **phải** | `ON` | Đặt ở `WHERE` sẽ huỷ tính chất `LEFT` |
| Bảng bên phải, **chủ ý** tìm dòng không khớp | `WHERE ... IS NULL` | Đây là anti-join, xem mục dưới |

Nói ngắn gọn: **với `LEFT JOIN`, điều kiện lên bảng bên phải gần như luôn thuộc về `ON`.**

Với `INNER JOIN` thì đặt ở đâu cũng cho cùng kết quả, vì không có dòng `NULL` nào để mất. Đó là lý do thói quen "cứ ném hết vào `WHERE`" hình thành và tồn tại được rất lâu — cho tới ngày ai đó đổi `INNER` thành `LEFT` và không hiểu vì sao số liệu không đổi.

---

## Ngoại lệ: anti-join là chủ ý {#anti-join}

Có đúng một trường hợp bạn **cố tình** đặt điều kiện lên cột bên phải trong `WHERE`:

```sql
-- Tìm khách CHƯA từng mua gì
SELECT k.*
FROM kh k
LEFT JOIN dh d ON d.kh_id = k.id
WHERE d.id IS NULL;
```

Đây gọi là **anti-join**. Bạn cố ý dùng `LEFT JOIN` để sinh ra `NULL`, rồi lọc lấy đúng những dòng `NULL` đó.

Mẫu này hợp lệ và phổ biến, nhưng đáng biết rằng có cách viết rõ ý hơn:

```sql
SELECT k.* FROM kh k
WHERE NOT EXISTS (SELECT 1 FROM dh d WHERE d.kh_id = k.id);
```

`NOT EXISTS` nói thẳng ý định *"không tồn tại đơn nào"*, trong khi `LEFT JOIN ... IS NULL` bắt người đọc phải suy luận ngược. Và như đã nói trong [bài về NULL](/blog/sql-null-not-in-three-valued-logic), tuyệt đối đừng thay nó bằng `NOT IN`.

---

## Cách nhận ra bạn đang dính {#cach-nhan-ra}

Không cần đọc lại từng câu truy vấn. Có ba dấu hiệu khá đáng tin.

**Báo cáo thiếu đúng nhóm "chưa có gì".** Danh sách khách hàng không hiện khách mới, báo cáo doanh thu theo sản phẩm bỏ qua sản phẩm bán được 0 cái, thống kê theo nhân viên thiếu người chưa chốt hợp đồng. Nhóm bị mất luôn là nhóm có `NULL`.

**Tổng số dòng bằng đúng `INNER JOIN`.** Thử đổi `LEFT JOIN` thành `INNER JOIN` rồi so số dòng. Nếu hai con số giống hệt nhau thì chữ `LEFT` của bạn không có tác dụng gì.

**`COUNT` ra số nhỏ hơn dự kiến.** Đặc biệt khi đếm theo nhóm — nhóm đáng lẽ ra 0 thì lại biến mất khỏi kết quả thay vì hiện số 0. Xem thêm [bài GROUP BY và HAVING](/docs/database/learn-sql-in-30-days/09-group-by-having) về cách nhóm rỗng bị xử lý.

Một mẹo rà soát nhanh: tìm mọi câu có chữ `LEFT JOIN`, rồi kiểm xem trong `WHERE` có nhắc tới alias của bảng bên phải không. Nếu có mà không phải dạng `IS NULL` thì gần như chắc chắn là bug.

---

## Học tiếp {#hoc-tiep}

Bài này đào sâu một điểm trong [series học SQL trong 30 ngày](/docs/database/learn-sql-in-30-days):

| Bài trong series | Liên quan thế nào |
|---|---|
| [JOIN](/docs/database/learn-sql-in-30-days/10-join) | Các loại join và cú pháp `ON` |
| [SELECT và WHERE](/docs/database/learn-sql-in-30-days/03-select-where) | Vì sao `WHERE` chỉ giữ `TRUE` |
| [Subquery](/docs/database/learn-sql-in-30-days/11-subquery) | `NOT EXISTS` thay cho anti-join |
| [GROUP BY và HAVING](/docs/database/learn-sql-in-30-days/09-group-by-having) | Nhóm rỗng và thứ tự xử lý mệnh đề |
| [Hiệu năng truy vấn](/docs/database/learn-sql-in-30-days/20-query-performance) | Đọc execution plan để thấy join thật sự chạy ra sao |

---

<FAQSection
  title="Câu hỏi thường gặp"
  items={[
    {
      question: "Vì sao LEFT JOIN của tôi hoạt động như INNER JOIN?",
      answer: "Vì bạn đặt một điều kiện lọc lên cột của bảng bên phải trong mệnh đề WHERE. SQL xử lý JOIN trước rồi mới tới WHERE, nên những dòng NULL mà LEFT JOIN vừa tạo ra sẽ bị WHERE loại bỏ: phép so sánh NULL với một giá trị luôn cho ra UNKNOWN, và WHERE chỉ giữ lại dòng cho ra TRUE. Kết quả cuối cùng giống hệt INNER JOIN mà không có cảnh báo nào."
    },
    {
      question: "Khi nào đặt điều kiện vào ON, khi nào đặt vào WHERE?",
      answer: "Với LEFT JOIN, điều kiện lọc lên bảng bên phải gần như luôn thuộc về ON, vì đặt ở WHERE sẽ huỷ tính chất giữ lại mọi dòng bên trái. Điều kiện lên bảng bên trái thì đặt ở WHERE cho rõ ý, vì nó không sinh ra NULL nào. Với INNER JOIN thì đặt ở đâu cũng cho cùng kết quả, và chính điều đó tạo ra thói quen ném hết vào WHERE — thói quen chỉ bộc lộ vấn đề khi có người đổi INNER thành LEFT."
    },
    {
      question: "Có trường hợp nào cố tình lọc cột bên phải trong WHERE không?",
      answer: "Có, đó là anti-join: dùng LEFT JOIN rồi thêm WHERE cot_ben_phai IS NULL để tìm những dòng bên trái không có bản ghi khớp nào, ví dụ khách chưa từng mua hàng. Mẫu này hợp lệ và phổ biến, nhưng NOT EXISTS thường rõ ý hơn vì nó nói thẳng điều kiện không tồn tại, trong khi LEFT JOIN kết hợp IS NULL bắt người đọc phải suy luận ngược."
    },
    {
      question: "Thứ tự xử lý các mệnh đề trong một câu SELECT là gì?",
      answer: "Thứ tự xử lý logic là FROM và JOIN ON trước, rồi WHERE, GROUP BY, HAVING, SELECT, ORDER BY, cuối cùng là LIMIT. Thứ tự này khác với thứ tự bạn viết chúng ra, và nó giải thích nhiều hành vi gây bất ngờ: vì sao không dùng được alias của SELECT trong WHERE, vì sao HAVING lọc được kết quả tổng hợp còn WHERE thì không, và vì sao điều kiện trong WHERE có thể phá vỡ ý nghĩa của LEFT JOIN."
    },
    {
      question: "Làm sao rà soát nhanh xem truy vấn có dính lỗi này không?",
      answer: "Tìm mọi câu có LEFT JOIN rồi kiểm xem mệnh đề WHERE có nhắc tới alias của bảng bên phải hay không; nếu có mà không phải dạng IS NULL thì gần như chắc chắn là bug. Một cách kiểm tra khác là đổi LEFT JOIN thành INNER JOIN rồi so số dòng: nếu hai con số giống hệt nhau thì chữ LEFT trong câu truy vấn của bạn không có tác dụng gì cả."
    }
  ]}
/>

## Kết luận {#ket-luan}

Lỗi này sống dai vì nó **không trông giống lỗi**. Câu truy vấn đọc trôi chảy, chạy nhanh, trả về dữ liệu hợp lý. Chỉ là thiếu vài dòng, và những dòng thiếu ấy thường là nhóm ít ai để ý nhất.

Hai điều đáng nhớ:

1. **`ON` lọc lúc ghép, `WHERE` lọc sau khi ghép.** Với `LEFT JOIN`, khoảng cách giữa hai thời điểm đó chính là chỗ những dòng bạn muốn giữ bị mất.
2. **Nhóm biến mất luôn là nhóm `NULL`.** Khi một báo cáo thiếu đúng những đối tượng "chưa có gì", hãy đọc lại mệnh đề `WHERE` trước khi đi tìm nguyên nhân ở dữ liệu.

---

**Cập nhật lần cuối**: Tháng 9, 2026
