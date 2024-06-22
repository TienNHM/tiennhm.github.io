---
slug: character-sets-and-collations-in-mysql
title: Character Sets - Collations và vấn đề so sánh chuỗi trong MySQL
description: Giới thiệu về các bảng mã và cách so sánh chuỗi trong MySQL, những vấn đề cần lưu ý khi làm việc với các bảng mã khác nhau.
image: https://labs.mysql.com/common/logos/mysql-logo.svg?v2
authors: [tiennhm]
tags: [mysql, character-sets, collations, tips-and-tricks, database]
keywords: [mysql, character-sets, collations, tips-and-tricks, database]
enableComments: true # for Gisqus comments, set to true
draft: false # set to true to hide this post from the site
---

<p align="right">
    <img src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Ftiennhm.github.io%2Fblog%2Fcharacter-sets-and-collations-in-mysql&label=⚪Views&labelColor=%2337d67a&countColor=%23555555&style=flat&labelStyle=upper" loading='lazy' decoding='async'/>
</p>

Bài viết này giới thiệu về các bảng mã và cách so sánh chuỗi trong MySQL, những vấn đề cần lưu ý khi làm việc với các bảng mã khác nhau.

<!--truncate-->

## 1. Bảng mã (Character Sets) trong MySQL {#character-sets}

Bảng mã (Character Sets) trong MySQL là bộ ký tự đại diện cho tập hợp các ký tự với mã hóa duy nhất, xác định những ký tự nào được phép trong một cột kiểu văn bản, bao gồm chữ cái, số, ký hiệu và ký tự đặc biệt.

Bộ ký tự quyết định phạm vi các ký tự có thể lưu trữ trong một cột. MySQL hỗ trợ nhiều bảng mã khác nhau, bao gồm cả một số bộ ký tự Unicode. Để liệt kê tất cả các bộ ký tự trên máy chủ MySQL hiện tại, bạn sử dụng câu lệnh sau:

```sql
SHOW CHARACTER SET;
```

Kết quả trả về sẽ bao gồm tên bảng mã, mô tả và mặc định. Ví dụ:

| Charset | Description | Default collation | Maxlen |
|---------|-------------|-------------------|:------:|
| ascii | US ASCII | ascii_general_ci | 1 |
| big5 | Big5 Traditional Chinese | big5_chinese_ci | 2 |
| binary | Binary pseudo charset | binary | 1 |
| cp1250 | Windows Central European | cp1250_general_ci | 1 |
| cp1251 | Windows Cyrillic | cp1251_general_ci | 1 |
| cp1256 | Windows Arabic | cp1256_general_ci | 1 |
| cp1257 | Windows Baltic | cp1257_general_ci | 1 |
| cp850 | DOS West European | cp850_general_ci | 1 |
| cp852 | DOS Central European | cp852_general_ci | 1 |
| cp866 | DOS Russian | cp866_general_ci | 1 |
| cp932 | SJIS for Windows Japanese | cp932_japanese_ci | 2 |
| dec8 | DEC West European | dec8_swedish_ci | 1 |
| eucjpms | UJIS for Windows Japanese | eucjpms_japanese_ci | 3 |
| euckr | EUC-KR Korean | euckr_korean_ci | 2 |
| gb18030 | China National Standard GB18030 | gb18030_chinese_ci | 4 |
| gb2312 | GB2312 Simplified Chinese | gb2312_chinese_ci | 2 |
| gbk | GBK Simplified Chinese | gbk_chinese_ci | 2 |
| geostd8 | GEOSTD8 Georgian | geostd8_general_ci | 1 |
| greek | ISO 8859-7 Greek | greek_general_ci | 1 |
| hebrew | ISO 8859-8 Hebrew | hebrew_general_ci | 1 |
| hp8 | HP West European | hp8_english_ci | 1 |
| keybcs2 | DOS Kamenicky Czech-Slovak | keybcs2_general_ci | 1 |
| koi8r | KOI8-R Relcom Russian | koi8r_general_ci | 1 |
| koi8u | KOI8-U Ukrainian | koi8u_general_ci | 1 |
| latin1 | cp1252 West European | latin1_swedish_ci | 1 |
| latin2 | ISO 8859-2 Central European | latin2_general_ci | 1 |
| latin5 | ISO 8859-9 Turkish | latin5_turkish_ci | 1 |
| latin7 | ISO 8859-13 Baltic | latin7_general_ci | 1 |
| macce | Mac Central European | macce_general_ci | 1 |
| macroman | Mac West European | macroman_general_ci | 1 |
| sjis | Shift-JIS Japanese | sjis_japanese_ci | 2 |
| swe7 | 7bit Swedish | swe7_swedish_ci | 1 |
| tis620 | TIS620 Thai | tis620_thai_ci | 1 |
| ucs2 | UCS-2 Unicode | ucs2_general_ci | 2 |
| ujis | EUC-JP Japanese | ujis_japanese_ci | 3 |
| utf16 | UTF-16 Unicode | utf16_general_ci | 4 |
| utf16le | UTF-16LE Unicode | utf16le_general_ci | 4 |
| utf32 | UTF-32 Unicode | utf32_general_ci | 4 |
| utf8mb3 | UTF-8 Unicode | utf8mb3_general_ci | 3 |
| utf8mb4 | UTF-8 Unicode | utf8mb4_0900_ai_ci | 4 |

Trong đó:
- `Charset`: tên bảng mã
- `Description`: mô tả
- `Default collation`: bảng mã mặc định
- `Maxlen`: độ dài tối đa của mỗi ký tự trong bảng mã. Một số bảng mã chứa ký tự **đa byte**, nên Maxlen có thể lớn hơn 1.

## 2. Thứ tự ký tự (Collations) trong MySQL {#collations}

Thứ tự ký tự (Collations) trong MySQL xác định cách so sánh và sắp xếp các ký tự trong một bảng mã. Mỗi bộ ký tự có ít nhất một collation mặc định, và hầu hết các bộ ký tự có nhiều collation.

Để liệt kê tất cả các collation của một bảng mã, bạn sử dụng câu lệnh sau:

```sql
SHOW COLLATION WHERE Charset = 'ascii';
```

Trong đó, `ascii` là tên bảng mã. Kết quả trả về sẽ bao gồm tên collation, mô tả và mặc định. Ví dụ:

| Collation | Charset | Id | Default | Compiled | Sortlen | Pad_attribute |
|-----------|---------|----|:-------:|:--------:|:-------:|---------------|
| ascii_bin | ascii | 65 | | Yes | 1 | PAD SPACE |
| ascii_general_ci | ascii | 11 | Yes | Yes | 1 | PAD SPACE |

Trong đó:
- `Collation`: tên collation
- `Charset`: tên bảng mã
- `Id`: ID của collation
- `Default`: collation mặc định
- `Compiled`: collation đã được biên dịch
- `Sortlen`: độ dài của chuỗi sắp xếp
- `Pad_attribute`: thuộc tính đệm.

Collation xác định cách so sánh chuỗi trong MySQL. Ví dụ, collation `ascii_general_ci` so sánh chuỗi không phân biệt chữ hoa và chữ thường, trong khi collation `ascii_bin` so sánh chính xác từng ký tự (phân biệt chữ hoa và chữ thường).

Collation có một số đặc điểm quan trọng:
- **Case sensitivity**: xác định collation có phân biệt chữ hoa và chữ thường hay không.
    + `ci` (case-insensitive): không phân biệt chữ hoa và chữ thường. Một số collation có `ci` ở cuối tên, ví dụ: `utf8_general_ci` sẽ xem `A` và `a` là giống nhau.
    + `cs` (case-sensitive): phân biệt chữ hoa và chữ thường. Ví dụ: `utf8_bin` sẽ xem `A` và `a` là khác nhau.
- **Accent sensitivity**: xác định collation có phân biệt dấu thanh hay không. Ví dụ: `utf8_general_ci` sẽ xem `á` và `a` là giống nhau, trong khi `utf8_bin` sẽ xem chúng là khác nhau.
- **Kana sensitivity**: xác định collation có phân biệt ký tự Kana (tiếng Nhật) hay không. Ví dụ: `utf8_general_ci` sẽ xem `あ` và `ア` là giống nhau, trong khi `utf8_bin` sẽ xem chúng là khác nhau.

## 3. So sánh chuỗi trong MySQL {#string-comparison}

Khi so sánh chuỗi trong MySQL, bạn cần lưu ý các collation của bảng mã. MySQL sử dụng collation để xác định cách so sánh chuỗi, và kết quả có thể khác nhau tùy thuộc vào collation.

Ví dụ, giả sử bạn có một bảng `users` với cột `name` có collation `utf8_general_ci`:

```sql
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(255) COLLATE utf8_general_ci
);
```

Nếu bạn thêm dữ liệu vào bảng `users`:

```sql
INSERT INTO users (id, name) VALUES (1, 'Alice');
INSERT INTO users (id, name) VALUES (2, 'alice');
```

Khi bạn so sánh chuỗi trong MySQL, kết quả sẽ phụ thuộc vào collation của cột. Ví dụ:

```sql
SELECT * FROM users WHERE name = 'Alice';
```

Nếu collation của cột `name` là `utf8_general_ci`, câu lệnh trên sẽ trả về cả hai dòng, vì collation `utf8_general_ci` không phân biệt chữ hoa và chữ thường.

Tuy nhiên, nếu collation của cột `name` là `utf8_bin`, câu lệnh trên sẽ không trả về dòng nào, vì collation `utf8_bin` phân biệt chữ hoa và chữ thường.

## 4. Kết luận {#conclusion}

Trong bài viết này, chúng ta đã tìm hiểu về các bảng mã và cách so sánh chuỗi trong MySQL, những vấn đề cần lưu ý khi làm việc với các bảng mã khác nhau. Hy vọng bài viết này giúp bạn hiểu rõ hơn về collation và cách so sánh chuỗi trong MySQL.

Nếu bạn có bất kỳ câu hỏi hoặc ý kiến đóng góp nào, hãy để lại bình luận bên dưới. Cảm ơn bạn đã đọc bài viết!

## Tham khảo {#references}

- [MySQL Character Sets and Collations](https://dev.mysql.com/doc/refman/8.0/en/charset.html)
- [MySQL String Comparison](https://dev.mysql.com/doc/refman/8.0/en/string-comparison-functions.html)
