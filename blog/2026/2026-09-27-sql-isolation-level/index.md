---
title: "Hai giao dịch cùng cộng 100, số dư chỉ tăng 100: isolation level qua thí nghiệm thật"
slug: sql-isolation-level-lost-update-phantom-read
description: "Hai phiên cùng đọc số dư 1000 rồi cùng ghi 1100. Kết quả cuối là 1100 chứ không phải 1200, và không có lỗi nào được ném ra. Bài viết chạy thí nghiệm hai session song song trên PostgreSQL 16 cho từng mức isolation, cho thấy lost update biến thành lỗi rõ ràng ở REPEATABLE READ, và vì sao PostgreSQL chặn phantom read ở mức mà chuẩn SQL cho phép nó xảy ra."
keywords: [isolation level, lost update, phantom read, non repeatable read, dirty read, read committed, repeatable read, serializable, could not serialize access due to concurrent update, acid, transaction sql, postgresql isolation, snapshot isolation, select for update, optimistic locking, pessimistic locking, retry transaction, muc co lap giao dich, transaction la gi, hoc sql transaction]
tags: [sql, database, postgresql, transaction, backend, concurrency]
authors: [tiennhm]
date: 2026-09-27
---

import { SummaryBox, FAQSection, Checklist } from '@site/src/components/SEO';

# Hai giao dịch cùng cộng 100, số dư chỉ tăng 100

<SummaryBox>
Isolation level quyết định **một giao dịch nhìn thấy gì khi có giao dịch khác chạy song song**. Ở mức mặc định của hầu hết database là `READ COMMITTED`, hai phiên cùng đọc số dư 1000 rồi cùng ghi 1100 sẽ cho kết quả cuối là **1100** — một lần cộng biến mất, **không có lỗi nào được ném**. Nâng lên `REPEATABLE READ` thì phiên thứ hai nhận `ERROR: could not serialize access due to concurrent update`: câu trả lời sai âm thầm biến thành một lỗi rõ ràng mà ứng dụng phải thử lại. Toàn bộ số liệu dưới đây đo bằng hai session psql song song trên PostgreSQL 16.11.
</SummaryBox>

Đây là loại lỗi gần như không thể tái hiện trên máy dev, vì ở đó bạn chỉ có một người dùng. Nó chỉ xuất hiện khi hai request thật chạm vào cùng một dòng trong cùng một khoảnh khắc — và lúc đó nó không sập, không log, chỉ làm sai số liệu.

Bài này đào sâu [bài Transactions và ACID](/docs/database/learn-sql-in-30-days/16-transactions-acid) trong series học SQL 30 ngày.

<!-- truncate -->

## Tóm tắt nhanh (TL;DR) {#tldr}

- `READ COMMITTED` (mặc định) **không** chống được lost update trong mẫu đọc-tính-ghi.
- `REPEATABLE READ` biến lỗi âm thầm thành **exception**, nên ứng dụng bắt buộc phải có cơ chế thử lại.
- PostgreSQL **chặn phantom read ngay ở `REPEATABLE READ`**, dù chuẩn SQL-92 cho phép nó xảy ra ở mức này.
- `READ UNCOMMITTED` trong PostgreSQL chạy y như `READ COMMITTED` — không có dirty read.
- Nếu không muốn đụng isolation level: dùng `SELECT ... FOR UPDATE`, hoặc ghi bằng một câu `UPDATE` duy nhất.

---

## Thí nghiệm 1: non-repeatable read {#non-repeatable-read}

Một bảng tài khoản, số dư 1000. Phiên **A** mở transaction và đọc, phiên **B** ghi 2000 rồi commit, sau đó **A đọc lại trong cùng transaction**.

```sql
CREATE TABLE tk(id int primary key, so_du int);
INSERT INTO tk VALUES (1, 1000);
```

Kết quả đo:

```
----- READ COMMITTED -----
A đọc lần 1: 1000
A đọc lần 2: 2000     ← đổi giữa chừng

----- REPEATABLE READ -----
A đọc lần 1: 1000
A đọc lần 2: 1000     ← ổn định
```

Ở `READ COMMITTED`, mỗi câu lệnh nhìn thấy trạng thái đã commit **tại thời điểm câu lệnh đó chạy**. Nên trong cùng một transaction, hai lần đọc cùng một dòng có thể ra hai giá trị khác nhau. Đó gọi là **non-repeatable read**.

Hậu quả thực tế: một báo cáo đọc bảng nhiều lần trong một transaction có thể tự mâu thuẫn với chính nó — tổng ở phần đầu không khớp chi tiết ở phần sau.

Ở `REPEATABLE READ`, transaction làm việc trên một **ảnh chụp** dữ liệu tại thời điểm nó bắt đầu, nên mọi lần đọc đều nhất quán.

---

## Thí nghiệm 2: lost update {#lost-update}

Đây là thí nghiệm quan trọng nhất, vì nó mô phỏng đúng thứ code ứng dụng vẫn làm hằng ngày:

```csharp
var tk = await db.TaiKhoan.FindAsync(id);   // đọc:   1000
tk.SoDu = tk.SoDu + 100;                     // tính:  1100
await db.SaveChangesAsync();                 // ghi:   1100
```

Hai phiên cùng chạy đoạn đó. Cả hai đọc 1000, cả hai ghi 1100.

```
----- LOST UPDATE @ READ COMMITTED -----
B đọc thấy: 1000
số dư cuối cùng: 1100        ← mất một lần cộng, KHÔNG có lỗi

----- LOST UPDATE @ REPEATABLE READ -----
B đọc thấy: 1000
ERROR: could not serialize access due to concurrent update
số dư cuối cùng: 1100        ← B bị huỷ, ứng dụng phải thử lại
```

Hai kết quả này **cùng một con số nhưng khác nhau hoàn toàn về bản chất**.

Ở `READ COMMITTED`, database làm đúng những gì được yêu cầu: B ghi đè giá trị của A. Không ai sai luật, và cũng không ai biết một giao dịch vừa bốc hơi. Nếu đây là số dư ví hay tồn kho thì bạn vừa mất tiền hoặc bán quá số lượng.

Ở `REPEATABLE READ`, PostgreSQL phát hiện B đang định ghi đè lên một dòng đã bị sửa sau khi ảnh chụp của B được tạo, và **từ chối**. Số dư vẫn là 1100 vì chỉ có A thành công — nhưng lần này hệ thống **biết** là có chuyện, và ứng dụng có cơ hội chạy lại.

> Điểm đáng nhớ: nâng isolation level không làm bug biến mất. Nó **đổi một câu trả lời sai âm thầm lấy một exception ồn ào**. Nếu code của bạn không bắt và thử lại exception đó, bạn chỉ vừa đổi kiểu hỏng.

---

## Thí nghiệm 3: phantom read, và chỗ PostgreSQL khác chuẩn {#phantom-read}

**Phantom read** là khi cùng một câu truy vấn theo điều kiện chạy hai lần trong một transaction lại trả về **số dòng khác nhau**, vì có transaction khác chèn thêm dòng khớp điều kiện.

```
----- PHANTOM READ @ READ COMMITTED -----
A đếm lần 1: 2
A đếm lần 2: 3     ← có bóng ma

----- PHANTOM READ @ REPEATABLE READ -----
A đếm lần 1: 2
A đếm lần 2: 2     ← không có
```

Kết quả thứ hai đáng chú ý, vì nó **không khớp với bảng lý thuyết** mà hầu hết tài liệu vẫn dạy:

| Hiện tượng | READ UNCOMMITTED | READ COMMITTED | REPEATABLE READ | SERIALIZABLE |
|---|:---:|:---:|:---:|:---:|
| Dirty read | chuẩn: có thể | không | không | không |
| Non-repeatable read | có thể | có thể | không | không |
| Phantom read | có thể | có thể | **chuẩn: có thể** | không |

Chuẩn SQL-92 nói `REPEATABLE READ` **được phép** có phantom read. Nhưng PostgreSQL hiện thực mức này bằng **snapshot isolation** — toàn bộ transaction làm việc trên một ảnh chụp cố định — nên phantom read không xảy ra được.

Điều đó nghĩa là bảng lý thuyết ở trên mô tả **giới hạn tối thiểu mà chuẩn đòi hỏi**, không phải hành vi thật của database bạn đang dùng. MySQL InnoDB ở `REPEATABLE READ` cũng chặn phantom cho câu đọc thuần nhờ MVCC, nhưng hành vi với câu đọc có khoá lại khác. **Đừng suy ra hành vi từ tên mức isolation — hãy thử trên chính database của bạn.**

Tương tự, `READ UNCOMMITTED` trong PostgreSQL chạy y hệt `READ COMMITTED`: kiến trúc MVCC của nó không có cách nào đọc dữ liệu chưa commit, nên dirty read đơn giản là không tồn tại.

---

## Bốn cách xử lý, theo thứ tự nên thử {#bon-cach-xu-ly}

### 1. Ghi bằng một câu `UPDATE` duy nhất

Cách rẻ nhất, và hay bị bỏ qua vì quá đơn giản:

```sql
UPDATE tk SET so_du = so_du + 100 WHERE id = 1;
```

Câu này **đọc và ghi trong cùng một thao tác nguyên tử**, nên không có khoảng hở giữa lúc đọc và lúc ghi. Hai phiên chạy đồng thời thì phiên sau chờ khoá, đọc lại giá trị mới, và cộng đúng. Kết quả là 1200.

Phần lớn lost update trong thực tế đến từ việc kéo entity lên bộ nhớ, sửa, rồi lưu lại — trong khi phép tính hoàn toàn có thể đẩy xuống database.

### 2. Khoá bi quan: `SELECT ... FOR UPDATE`

Khi bạn thật sự cần đọc, tính toán phức tạp ở tầng ứng dụng, rồi mới ghi:

```sql
BEGIN;
SELECT so_du FROM tk WHERE id = 1 FOR UPDATE;   -- khoá dòng
-- tính toán ở tầng ứng dụng
UPDATE tk SET so_du = ... WHERE id = 1;
COMMIT;
```

`FOR UPDATE` khoá dòng ngay lúc đọc, nên phiên thứ hai phải chờ. Đổi lại là giảm song song và có nguy cơ deadlock nếu nhiều dòng bị khoá theo thứ tự khác nhau.

### 3. Khoá lạc quan: cột phiên bản

```sql
UPDATE tk SET so_du = 1100, version = version + 1
WHERE id = 1 AND version = 7;
-- nếu số dòng bị ảnh hưởng = 0 → ai đó đã sửa trước, thử lại
```

Không khoá gì cả, chỉ kiểm tra lúc ghi. Hợp khi xung đột **hiếm**, vì lúc không xung đột thì không tốn gì. Đây cũng là cơ chế mà phần lớn ORM hiện đại dùng khi bạn khai một cột `[Timestamp]` hay `@Version`.

### 4. Nâng isolation level, kèm cơ chế thử lại

```csharp
// Bắt buộc phải có, nếu không thì nâng mức isolation là vô nghĩa
for (var lan = 0; lan < 3; lan++)
{
    try { await ThucHienGiaoDich(); break; }
    catch (PostgresException ex) when (ex.SqlState == "40001")  // serialization_failure
    {
        if (lan == 2) throw;
        await Task.Delay(TimeSpan.FromMilliseconds(50 * (lan + 1)));
    }
}
```

Mã lỗi `40001` là `serialization_failure` theo chuẩn SQL. **Không có vòng thử lại này thì việc nâng isolation level chỉ đổi lỗi im lặng thành lỗi 500 cho người dùng.**

<Checklist
  title="Rà soát chỗ dễ mất giao dịch"
  items={[
    { text: "Tìm mẫu đọc-tính-ghi trên cùng một dòng: Find, sửa property, SaveChanges" },
    { text: "Ưu tiên đẩy phép tính xuống một câu UPDATE duy nhất" },
    { text: "Nếu buộc phải tính ở tầng ứng dụng, dùng SELECT ... FOR UPDATE hoặc cột version" },
    { text: "Nếu nâng isolation level, bắt buộc viết vòng thử lại cho mã lỗi 40001" },
    { text: "Đừng suy hành vi từ tên mức isolation — thử trên chính database của bạn" },
    { text: "Giữ transaction ngắn: transaction mở lâu giữ khoá lâu và tăng xác suất xung đột", checked: true }
  ]}
/>

---

## Học tiếp {#hoc-tiep}

Bài này đào sâu một điểm trong [series học SQL trong 30 ngày](/docs/database/learn-sql-in-30-days):

| Bài trong series | Liên quan thế nào |
|---|---|
| [Transactions và ACID](/docs/database/learn-sql-in-30-days/16-transactions-acid) | Bốn tính chất ACID và cú pháp transaction |
| [Thiết kế database](/docs/database/learn-sql-in-30-days/27-database-design-best-practices) | Ràng buộc ở tầng schema để không phụ thuộc hoàn toàn vào transaction |
| [Bảo mật database](/docs/database/learn-sql-in-30-days/30-database-security) | Quyền hạn và ranh giới giao dịch |
| [Hiệu năng truy vấn](/docs/database/learn-sql-in-30-days/20-query-performance) | Transaction dài giữ khoá lâu và ảnh hưởng thông lượng |

Ở phía .NET, ranh giới transaction thường không nằm ở chỗ bạn nghĩ — [Unit of Work trong ABP](/blog/unit-of-work-dotnet-abp) là một ví dụ: `SaveChangesAsync` **không** commit, chỉ `CompleteAsync` mới commit. Hiểu sai chỗ đó thì mọi lập luận về isolation level ở trên đều áp sai chỗ.

---

<FAQSection
  title="Câu hỏi thường gặp"
  items={[
    {
      question: "Lost update là gì và vì sao READ COMMITTED không chặn được?",
      answer: "Lost update là khi hai giao dịch cùng đọc một giá trị, cùng tính toán dựa trên giá trị đó, rồi cùng ghi lại, khiến một trong hai lần ghi bị đè mất. READ COMMITTED chỉ đảm bảo bạn không đọc dữ liệu chưa commit, nó không ngăn ai đó sửa dòng trong khoảng thời gian giữa lúc bạn đọc và lúc bạn ghi. Thí nghiệm trên PostgreSQL 16 cho thấy hai phiên cùng đọc 1000 rồi cùng ghi 1100 sẽ cho số dư cuối là 1100 chứ không phải 1200, và không có lỗi nào được ném ra."
    },
    {
      question: "Nâng lên REPEATABLE READ có sửa được lost update không?",
      answer: "Nó không làm bug biến mất mà đổi một câu trả lời sai âm thầm lấy một exception rõ ràng. PostgreSQL phát hiện giao dịch thứ hai đang ghi đè lên dòng đã bị sửa sau khi ảnh chụp của nó được tạo, và ném ERROR: could not serialize access due to concurrent update với mã lỗi 40001. Nếu ứng dụng không bắt và thử lại lỗi đó thì bạn chỉ vừa đổi một số liệu sai thành một lỗi 500 cho người dùng."
    },
    {
      question: "Vì sao PostgreSQL không có phantom read ở REPEATABLE READ dù chuẩn cho phép?",
      answer: "Vì PostgreSQL hiện thực mức này bằng snapshot isolation: toàn bộ transaction làm việc trên một ảnh chụp dữ liệu cố định tại thời điểm nó bắt đầu, nên không nhìn thấy dòng mới do transaction khác chèn vào. Chuẩn SQL-92 chỉ quy định giới hạn tối thiểu mà mỗi mức phải đảm bảo, chứ không cấm hiện thực làm chặt hơn. Bài học là đừng suy ra hành vi từ tên mức isolation mà hãy thử trên chính database đang dùng."
    },
    {
      question: "READ UNCOMMITTED trong PostgreSQL hoạt động thế nào?",
      answer: "Nó chạy y hệt READ COMMITTED. Kiến trúc MVCC của PostgreSQL không có cách nào đọc được dữ liệu chưa commit, vì mỗi phiên bản dòng chỉ hiển thị sau khi giao dịch tạo ra nó đã commit. Vì vậy dirty read đơn giản là không tồn tại trong PostgreSQL, và việc khai READ UNCOMMITTED không mang lại khác biệt nào ngoài việc câu lệnh được chấp nhận."
    },
    {
      question: "Cách đơn giản nhất để tránh lost update là gì?",
      answer: "Đẩy phép tính xuống một câu UPDATE duy nhất, ví dụ UPDATE tk SET so_du = so_du + 100 WHERE id = 1 thay vì đọc lên, cộng ở tầng ứng dụng rồi ghi lại. Câu lệnh này đọc và ghi trong cùng một thao tác nguyên tử nên không có khoảng hở nào để giao dịch khác chen vào; phiên thứ hai sẽ chờ khoá, đọc lại giá trị mới và cộng đúng. Phần lớn lost update trong thực tế đến từ việc kéo entity lên bộ nhớ rồi lưu lại trong khi phép tính hoàn toàn có thể để database làm."
    },
    {
      question: "Khi nào dùng khoá bi quan, khi nào dùng khoá lạc quan?",
      answer: "Khoá bi quan với SELECT FOR UPDATE phù hợp khi xung đột xảy ra thường xuyên và việc thử lại tốn kém, đổi lại là giảm mức độ song song và có nguy cơ deadlock nếu nhiều dòng bị khoá theo thứ tự khác nhau. Khoá lạc quan bằng cột version phù hợp khi xung đột hiếm, vì lúc không có xung đột thì nó không tốn chi phí nào, nhưng bạn phải xử lý trường hợp số dòng bị ảnh hưởng bằng 0 và chạy lại nghiệp vụ."
    }
  ]}
/>

## Kết luận {#ket-luan}

Isolation level là một trong số ít chủ đề mà **đọc lý thuyết gần như không đủ**. Bảng bốn mức với ba hiện tượng xuất hiện trong mọi giáo trình, nhưng nó mô tả giới hạn tối thiểu của chuẩn chứ không mô tả database bạn đang chạy — và chính thí nghiệm ở trên cho thấy PostgreSQL chặt hơn chuẩn ở một ô.

Ba điều đáng nhớ:

1. **Mặc định không an toàn cho mẫu đọc-tính-ghi.** `READ COMMITTED` để lọt lost update, im lặng.
2. **Nâng isolation level là đổi kiểu hỏng, không phải hết hỏng.** Không có vòng thử lại thì đừng nâng.
3. **Cách rẻ nhất thường là cách đơn giản nhất.** Một câu `UPDATE` cộng thẳng trên cột giải quyết được phần lớn trường hợp mà không cần chạm tới isolation level.

---

**Cập nhật lần cuối**: Tháng 9, 2026

## Bài liên quan

- [12.7 — 6. Transactions và Locking](/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-12-sql-deep-dive/12.7-transactions-and-locking) — ACID, bốn isolation level và hiện tượng mỗi mức cho phép, RCSI, deadlock và thứ tự khoá, optimistic vs pessimistic concurrency, và retry.
- [Module 12 — SQL Deep Dive](/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-12-sql-deep-dive) — SQL chuyên sâu: indexing, execution plans, transaction isolation, locking — hiệu năng truy vấn cho workload CRM.
- [30. Database security](/docs/database/learn-sql-in-30-days/30-database-security) — Học cách quản trị & bảo mật database, phân quyền, ngăn chặn SQL Injection, sao lưu & khôi phục dữ liệu đúng cách.
