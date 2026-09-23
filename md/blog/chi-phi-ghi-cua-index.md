# Thêm 4 index làm INSERT chậm 6 lần: cái giá không ai nhắc khi bảo bạn đánh index

> Nguồn: https://tiennhm.io.vn/blog/chi-phi-ghi-cua-index
> Mọi hướng dẫn tối ưu đều bảo thêm index, rất ít bài nói về hoá đơn. Đo trên PostgreSQL 16 với cùng 200.000 dòng: bảng không index chèn hết 287,8 ms và nặng 10,2 MB, bảng bốn index mất 1.722,3 ms và nặng 27 MB. Bài viết phân tích chi phí ghi, quy tắc leftmost prefix, index trùng lặp, và cách quyết định index nào đáng giữ.

> Index tăng tốc đọc bằng cách **trả giá ở mỗi lần ghi**, và cái giá đó lớn hơn hầu hết người ta hình dung. Đo trên PostgreSQL 16 với cùng 200.000 dòng: bảng **không index** chèn xong trong **287,8 ms** và chiếm **10,2 MB**; bảng có **bốn index** mất **1.722,3 ms** và chiếm **27 MB**. Tức là chậm gấp **6 lần** và tốn gấp **2,6 lần** dung lượng — chỉ để thêm bốn cấu trúc mà có thể chẳng câu truy vấn nào dùng tới. Câu hỏi đúng không phải "cột này có nên có index không" mà là "phần đọc tiết kiệm được có bù nổi phần ghi phải trả không".

Mọi bài viết về tối ưu database đều kết thúc bằng lời khuyên thêm index. Rất ít bài nói về hoá đơn đi kèm, và càng ít bài đưa con số.

Bài này đào sâu [bài Thiết kế database](https://tiennhm.io.vn/docs/database/learn-sql-in-30-days/27-database-design-best-practices) và [bài Index](https://tiennhm.io.vn/docs/database/learn-sql-in-30-days/15-index) trong series học SQL 30 ngày. Mọi số liệu đo thật trên PostgreSQL 16.11.

## Tóm tắt nhanh (TL;DR)
- 4 index làm cùng một lệnh `INSERT` 200.000 dòng đi từ **287,8 ms → 1.722,3 ms** (chậm 6 lần).
- Dung lượng bảng đi từ **10,2 MB → 27 MB** (gấp 2,6 lần).
- Index phức hợp `(a, b)` **không** phục vụ `WHERE b = ?` — quy tắc **leftmost prefix**.
- Index `(a)` khi đã có `(a, b)` là **chi phí ghi thuần tuý**, nên xoá.
- Cột độ chọn lọc thấp (vài giá trị lặp lại) gần như không đáng đánh index.
- Dùng `pg_stat_user_indexes` để tìm index **chưa bao giờ được dùng**.

---

## Hoá đơn
Hai bảng giống hệt nhau, khác mỗi số index:

```sql
CREATE TABLE w0(id int, a int, b int, c int, d int);
CREATE TABLE w4(id int, a int, b int, c int, d int);
CREATE INDEX ON w4(a); CREATE INDEX ON w4(b);
CREATE INDEX ON w4(c); CREATE INDEX ON w4(d);
```

Chèn cùng 200.000 dòng vào mỗi bảng:

| | Thời gian `INSERT` | Dung lượng |
|---|---|---|
| Không index | **287,8 ms** | **10,2 MB** |
| 4 index | **1.722,3 ms** | **27 MB** |
| Chênh lệch | **chậm 6,0 lần** | **gấp 2,6 lần** |

Lý do thì đơn giản: mỗi `INSERT` không chỉ ghi một dòng vào bảng, nó còn phải chèn một mục vào **từng** cấu trúc B-tree, giữ cho mỗi cây vẫn cân bằng, và ghi thêm vào write-ahead log cho từng thay đổi ấy. Bốn index nghĩa là **năm cấu trúc phải đổi thay vì một**.

Điều đáng nói: con số này là chi phí bạn trả **kể cả khi không câu truy vấn nào dùng tới bốn index đó**. Index không dùng vẫn được cập nhật đầy đủ ở mọi lần ghi.

`UPDATE` còn tệ hơn `INSERT` ở một điểm: nếu bạn sửa một cột có index, database phải xoá mục cũ và chèn mục mới trong cây. Sửa một cột không có index thì rẻ hơn nhiều — đó là lý do đánh index lên cột hay bị cập nhật (trạng thái, thời điểm sửa cuối) đắt hơn đánh lên cột tĩnh.

---

## Leftmost prefix: thứ tự cột là một quyết định thiết kế
Đây là quy tắc quyết định bạn cần **mấy** index, nên nó ảnh hưởng trực tiếp tới hoá đơn ở trên.

Index phức hợp được sắp xếp theo cột trái nhất trước, rồi mới tới cột sau — giống danh bạ sắp theo họ rồi mới tới tên. Với `CREATE INDEX ON t(a, b)`:

| Truy vấn | Dùng được index? |
|---|---|
| `WHERE a = 1` | ✅ |
| `WHERE a = 1 AND b = 2` | ✅ |
| `WHERE b = 2` | ❌ |
| `WHERE a = 1 ORDER BY b` | ✅ (cả sắp xếp) |

Ô thứ ba là chỗ hay gây bất ngờ. Danh bạ sắp theo họ không giúp gì khi bạn chỉ biết tên — bạn vẫn phải đọc hết.

Hệ quả thực tế: **một index `(a, b)` đặt đúng thứ tự thay thế được hai index riêng lẻ**, còn đặt sai thứ tự thì bạn phải tạo thêm index thứ hai và trả thêm chi phí ghi. Nguyên tắc chọn thứ tự:

1. Cột xuất hiện trong điều kiện **bằng** (`=`) đặt trước.
2. Cột dùng cho **khoảng** (`>`, `<`, `BETWEEN`) đặt sau, vì sau một điều kiện khoảng thì các cột phía sau không còn dùng để thu hẹp được nữa.
3. Cột dùng cho `ORDER BY` đặt cuối.

---

## Ba loại index nên xoá
### 1. Index trùng lặp

Nếu đã có `(a, b)` thì `(a)` là **thừa hoàn toàn** — mọi truy vấn dùng được `(a)` đều dùng được `(a, b)` theo quy tắc leftmost prefix. Giữ nó lại chỉ để trả thêm chi phí ghi và thêm dung lượng.

Tìm chúng trong PostgreSQL:

```sql
SELECT indrelid::regclass AS bang, array_agg(indexrelid::regclass) AS index_trung
FROM pg_index
GROUP BY indrelid, (indkey::int2[])[0:1]
HAVING count(*) > 1;
```

### 2. Index chưa bao giờ được dùng

PostgreSQL đếm sẵn số lần mỗi index được quét:

```sql
SELECT relname AS bang, indexrelname AS index, idx_scan AS so_lan_dung,
       pg_size_pretty(pg_relation_size(indexrelid)) AS dung_luong
FROM pg_stat_user_indexes
WHERE idx_scan = 0
ORDER BY pg_relation_size(indexrelid) DESC;
```

`idx_scan = 0` sau vài tuần chạy production là bằng chứng khá chắc. Hai lưu ý trước khi xoá: bộ đếm này reset khi restart hoặc khi gọi `pg_stat_reset()`, và một index phục vụ ràng buộc `UNIQUE` hay khoá chính thì **không xoá được** dù `idx_scan` bằng 0 — nó tồn tại để đảm bảo tính đúng đắn chứ không phải để tăng tốc đọc.

### 3. Index trên cột độ chọn lọc thấp

Cột `gioi_tinh` chỉ có hai giá trị, `trang_thai` có bốn. Index trên chúng gần như vô ích: mỗi giá trị khớp với một phần lớn bảng, nên database thường kết luận quét tuần tự còn rẻ hơn đi qua index rồi nhảy về bảng.

Ngoại lệ đáng biết: khi phân bố **lệch nặng**. Nếu 99,9% đơn ở trạng thái `hoan_thanh` và 0,1% ở trạng thái `loi`, thì index **một phần** chỉ chứa phần hiếm lại rất hiệu quả:

```sql
CREATE INDEX idx_don_loi ON don_hang(tao_luc) WHERE trang_thai = 'loi';
```

Index này nhỏ, rẻ để duy trì, và phục vụ đúng câu truy vấn mà bạn thật sự chạy nhiều.

---

## Khi nào chi phí ghi đáng trả
Không có con số vàng, nhưng có vài câu hỏi cho ra quyết định khá nhanh.

**Tỷ lệ đọc trên ghi của bảng này là bao nhiêu?** Bảng danh mục sản phẩm đọc hàng nghìn lần và ghi vài lần mỗi ngày — index thoải mái. Bảng log sự kiện ghi liên tục và hiếm khi đọc — mỗi index là một cái thuế nặng.

**Câu truy vấn cần nó chạy bao nhiêu lần một ngày?** Một báo cáo chạy mỗi tháng một lần không đáng để một index phải cập nhật ở mọi lần ghi suốt ba mươi ngày. Chấp nhận báo cáo đó chậm hai phút thường là lựa chọn đúng.

**Có index nào đang có phục vụ được không?** Trước khi thêm mới, kiểm xem một index phức hợp sẵn có có phủ được truy vấn theo leftmost prefix hay không. Mở rộng một index đã có thường rẻ hơn tạo thêm một cái.

**Cột này có bị `UPDATE` thường xuyên không?** Index trên cột hay đổi đắt gấp nhiều lần index trên cột tĩnh, vì mỗi lần sửa là một lần xoá và chèn lại trong cây.

**Rà soát index trước khi thêm cái mới**

- [ ] Kiểm tra tỷ lệ đọc/ghi của bảng — bảng ghi nhiều thì mỗi index là thuế nặng
- [ ] Xem index sẵn có đã phủ được truy vấn theo leftmost prefix chưa
- [ ] Xoá index trùng lặp: (a) khi đã có (a, b)
- [ ] Dùng pg_stat_user_indexes tìm index có idx_scan = 0
- [ ] Với cột lệch nặng, cân nhắc index một phần thay vì index đầy đủ
- [x] Đo lại thời gian ghi sau khi thêm index, đừng chỉ đo thời gian đọc

---

## Học tiếp
Bài này đào sâu hai điểm trong [series học SQL trong 30 ngày](https://tiennhm.io.vn/docs/database/learn-sql-in-30-days):

| Bài trong series | Liên quan thế nào |
|---|---|
| [Thiết kế database](https://tiennhm.io.vn/docs/database/learn-sql-in-30-days/27-database-design-best-practices) | Cân bằng đọc và ghi khi thiết kế schema |
| [Index](https://tiennhm.io.vn/docs/database/learn-sql-in-30-days/15-index) | Cấu trúc B-tree và cú pháp tạo index |
| [Tối ưu truy vấn SQL](https://tiennhm.io.vn/docs/database/learn-sql-in-30-days/28-sql-query-optimization) | Viết lại truy vấn trước khi nghĩ tới index mới |
| [Hiệu năng truy vấn](https://tiennhm.io.vn/docs/database/learn-sql-in-30-days/20-query-performance) | Đọc execution plan để biết index có được dùng không |
| [Transactions và ACID](https://tiennhm.io.vn/docs/database/learn-sql-in-30-days/16-transactions-acid) | Index làm transaction ghi dài hơn và giữ khoá lâu hơn |

Mặt kia của câu chuyện — index **có** nhưng **không được dùng** — nằm ở [bài về sargability](https://tiennhm.io.vn/blog/sql-index-khong-duoc-dung-sargable). Hai bài đó là hai nửa của cùng một câu hỏi: bạn đang trả chi phí ghi cho những index nào, và trong số đó cái nào thật sự phục vụ được truy vấn của bạn.

---

## Câu hỏi thường gặp

### Thêm index làm chậm ghi bao nhiêu?

Đo trên PostgreSQL 16 với cùng 200.000 dòng, bảng không có index chèn xong trong 287,8 ms còn bảng có bốn index mất 1.722,3 ms, tức là chậm khoảng 6 lần. Dung lượng cũng tăng từ 10,2 MB lên 27 MB. Lý do là mỗi INSERT phải chèn thêm một mục vào từng cây B-tree, giữ cho các cây cân bằng, và ghi thêm vào write-ahead log cho từng thay đổi. Chi phí này phải trả kể cả khi không câu truy vấn nào dùng tới các index đó.

### Index phức hợp (a, b) có phục vụ được truy vấn lọc theo b không?

Không. Index phức hợp được sắp xếp theo cột trái nhất trước, giống danh bạ sắp theo họ rồi mới tới tên, nên nó phục vụ WHERE a = ? và WHERE a = ? AND b = ? nhưng không phục vụ WHERE b = ? một mình. Đây gọi là quy tắc leftmost prefix. Hệ quả là thứ tự cột trong index phức hợp là một quyết định thiết kế: đặt đúng thì một index thay được hai, đặt sai thì phải tạo thêm index và trả thêm chi phí ghi.

### Làm sao tìm index không bao giờ được dùng?

Trong PostgreSQL, truy vấn pg_stat_user_indexes và lọc những dòng có idx_scan bằng 0, kèm pg_relation_size để biết chúng chiếm bao nhiêu dung lượng. Sau vài tuần chạy production thì đó là bằng chứng khá chắc. Hai lưu ý trước khi xoá: bộ đếm này reset khi restart hoặc khi gọi pg_stat_reset, và index phục vụ ràng buộc UNIQUE hay khoá chính thì không xoá được dù idx_scan bằng 0 vì nó tồn tại để đảm bảo tính đúng đắn.

### Có nên đánh index cho cột trạng thái hay giới tính không?

Thường là không, vì độ chọn lọc thấp: mỗi giá trị khớp với một phần lớn bảng nên database thường kết luận quét tuần tự còn rẻ hơn đi qua index rồi nhảy về bảng. Ngoại lệ đáng biết là khi phân bố lệch nặng, ví dụ 99,9% đơn ở trạng thái hoàn thành và 0,1% ở trạng thái lỗi; lúc đó một index một phần chỉ chứa phần hiếm sẽ nhỏ, rẻ để duy trì và phục vụ đúng truy vấn bạn chạy nhiều.

### UPDATE có tốn kém hơn INSERT khi bảng có nhiều index không?

Có, ở một điểm quan trọng. Nếu bạn sửa một cột có index thì database phải xoá mục cũ và chèn mục mới trong cây, tức là hai thao tác thay vì một. Sửa một cột không có index thì rẻ hơn nhiều. Vì vậy đánh index lên cột hay bị cập nhật như trạng thái hoặc thời điểm sửa cuối sẽ đắt hơn hẳn so với đánh index lên cột gần như không đổi.

### Khi nào chi phí ghi của một index là đáng trả?

Cân nhắc bốn câu hỏi. Tỷ lệ đọc trên ghi của bảng là bao nhiêu, vì bảng danh mục đọc nhiều ghi ít thì thoải mái còn bảng log thì mỗi index là thuế nặng. Truy vấn cần nó chạy bao nhiêu lần một ngày, vì một báo cáo tháng không đáng để index phải cập nhật suốt ba mươi ngày. Index sẵn có đã phủ được chưa theo leftmost prefix. Và cột đó có bị UPDATE thường xuyên không.

## Kết luận
Index không phải thứ miễn phí mà bạn rắc lên bảng cho chắc. Nó là một **đánh đổi có hoá đơn cụ thể**, và trong phép đo ở trên hoá đơn đó là chậm gấp 6 lần khi ghi cộng với gấp 2,6 lần dung lượng.

Ba điều đáng nhớ:

1. **Đo cả phần ghi, đừng chỉ đo phần đọc.** Thêm index rồi thấy truy vấn nhanh lên là nửa bức tranh; nửa còn lại nằm ở thời gian `INSERT` và `UPDATE` mà không ai mở ra xem.
2. **Thứ tự cột trong index phức hợp quyết định bạn cần mấy index.** Đặt đúng thì một cái thay được hai, đặt sai thì trả tiền hai lần.
3. **Index không dùng vẫn thu phí đầy đủ.** `idx_scan = 0` là một trong những truy vấn cho ra giá trị nhanh nhất mà bạn có thể chạy trên một database đang sống.

---

**Cập nhật lần cuối**: Tháng 9, 2026

## Bài liên quan

- [27. Database design best practices](https://tiennhm.io.vn/docs/database/learn-sql-in-30-days/27-database-design-best-practices) — Thiết kế cơ sở dữ liệu (Database Design) - Nguyên tắc chuẩn hóa CSDL, khi nào nên phi chuẩn hóa, best practices thiết kế CSDL hiệu quả.
- [28. SQL query optimization](https://tiennhm.io.vn/docs/database/learn-sql-in-30-days/28-sql-query-optimization) — Hướng dẫn tối ưu hóa truy vấn SQL, phân tích truy vấn với EXPLAIN ANALYZE, tránh lỗi phổ biến khi viết SQL, tận dụng Index, Partition, Caching để…
- [15. Index](https://tiennhm.io.vn/docs/database/learn-sql-in-30-days/15-index) — Giới thiệu về Index trong SQL, cách tạo và sử dụng Index, cách tối ưu truy vấn SQL với Index.
