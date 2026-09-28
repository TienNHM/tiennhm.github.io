# Markdown Cheat Sheet: file .md là gì, cách tạo và viết README trên GitHub

> Nguồn: https://tiennhm.io.vn/en/blog/markdown-cheat-sheet
> File .md là file gì, mở bằng gì và tạo như thế nào — rồi tới bảng tra cú pháp Markdown đầy đủ để viết README trên GitHub: heading, danh sách, liên kết, ảnh, khối mã, bảng và nhiều thành phần khác, mỗi loại kèm ví dụ chạy được.

> Bài viết là một Markdown Cheat Sheet đầy đủ hướng dẫn cách tạo file README trên GitHub với Markdown. Markdown là ngôn ngữ đánh dấu nhẹ, dễ đọc và dễ viết, được sử dụng rộng rãi trên GitHub để tạo documentation. Bài viết bao gồm tất cả các syntax cơ bản của Markdown như headings, lists, links, images, code blocks, tables, và nhiều tính năng khác, kèm ví dụ cụ thể cho từng loại.

Bạn có thể tạo một file README trên Github với Markdown. Nhưng markdown là gì và cách tạo một file README trên Github với Markdown như thế nào? Hãy cùng tìm hiểu ở bài viết này nhé!

## Markdown là gì?

Markdown là một ngôn ngữ mã nguồn mở, được sử dụng để viết các file README, với cú pháp dễ hiểu và dễ đọc. Có thể được đọc trên nhiều nền tảng khác nhau, bao gồm những nền tảng web, trên máy tính, và trên các thiết bị di động.

Các định dạng file markdown phổ biến: `.markdown`, `.md`, `.mkd`, `.mkdown`, `.text`, `.mdown`...

Markdown là một trong số những markup language được sử dụng phổ biến nhất. Bên cạnh Markdown, bạn có thể sử dụng các markup language khác như [HTML](https://www.w3schools.com/html/), [XML](https://www.w3schools.com/xml/)...

Đặc biệt, bạn hoàn toàn có thể sử dụng cú pháp của các thẻ HTML trong file file markdown.

## File `.md` là gì và mở bằng gì

`.md` là phần mở rộng của file Markdown — một **file văn bản thuần** (plain text), không phải định dạng nhị phân như `.docx` hay `.pdf`. Mở nó bằng Notepad vẫn đọc được toàn bộ nội dung, chỉ là không thấy phần định dạng được render ra.

Vì là văn bản thuần nên:

- **Mở được bằng bất kỳ trình soạn thảo nào** — Notepad, TextEdit, Vim, VS Code.
- **Git so sánh được từng dòng**, nên review thay đổi trong pull request rất dễ. Đây là lý do tài liệu kỹ thuật thường viết bằng Markdown thay vì Word.
- **Không phụ thuộc phần mềm nào cả.** File `.docx` mà thiếu Word thì chật vật, còn `.md` thì mười năm sau vẫn đọc được.

Muốn xem bản đã render thì dùng công cụ có chế độ xem trước:

| Công cụ | Cách xem trước |
|---|---|
| VS Code | `Ctrl` + `Shift` + `V`, hoặc biểu tượng chia đôi màn hình |
| GitHub / GitLab | Tự render khi mở file `.md` trong repo |
| Typora, Obsidian | Render trực tiếp ngay lúc gõ |
| Trình duyệt | Cần tiện ích mở rộng như Markdown Viewer |

Các phần mở rộng khác cũng là Markdown: `.markdown`, `.mkd`, `.mdown`, `.mkdown`. Dùng phổ biến nhất vẫn là `.md`.

## Cách tạo file `.md`

Không cần phần mềm chuyên dụng. Chọn cách nào tiện nhất:

**Cách 1 — VS Code (khuyên dùng)**

1. `File` → `New File`.
2. `Ctrl` + `S` để lưu, đặt tên kèm đuôi `.md`, ví dụ `README.md`.
3. Gõ nội dung, rồi `Ctrl` + `Shift` + `V` để xem bản render.

**Cách 2 — Ngay trên GitHub, không cần cài gì**

1. Vào repo → `Add file` → `Create new file`.
2. Đặt tên `README.md`.
3. Gõ nội dung, dùng tab `Preview` để xem trước, rồi `Commit changes`.

**Cách 3 — Dòng lệnh**

```bash
# Linux / macOS
touch README.md

# Windows PowerShell
New-Item README.md
```

**Cách 4 — Notepad trên Windows**

Mở Notepad, gõ nội dung, rồi `Save As`. Nhớ hai điều: chọn `All Files` ở mục `Save as type` (không thì Windows tự thêm `.txt` thành `README.md.txt`), và chọn encoding `UTF-8` để tiếng Việt không bị lỗi font.

Lưu ý về tên file: `README.md` viết hoa là quy ước, và GitHub nhận cả `readme.md` lẫn `Readme.md`. Nhưng trên Linux tên file phân biệt hoa thường, nên cứ viết hoa toàn bộ cho thống nhất.

## Cú pháp Markdown

### Định dạng text

Markdown hỗ trợ các kiểu định dạng text như sau:

```markdown
- *In nghiêng*
- _In nghiêng_
- **In đậm**
- __In đậm__
- ***In đậm và nghiêng***
- ___In đậm và nghiêng___
- ~~Gạch ngang~~
- *~~In nghiêng và gạch ngang~~*
- **~~In đậm và gạch ngang~~**
- Kiểu<sub>subscript</sub>: H<sub>2</sub>O
- Kiểu<sup>superscript</sup>: E = mc<sup>2</sup>
```

Kết quả:

- *In nghiêng*
- _In nghiêng_
- **In đậm**
- __In đậm__
- ***In đậm và nghiêng***
- ___In đậm và nghiêng___
- ~~Gạch ngang~~
- *~~In nghiêng và gạch ngang~~*
- **~~In đậm và gạch ngang~~**
- Kiểusubscript: H2O
- Kiểusuperscript: E = mc2

### Thanh kẻ ngang

Để tạo thanh kẻ ngang, hãy sử dụng cú pháp sau (dùng tối thiểu 4 dấu `-`):

```mardown
----
```

Kết quả:

----

### Header

Có tất cả 6 header trong Markdown, bạn có thể sử dụng 1-6 `#` để tạo header.

```markdown
# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6
```

Kết quả:

- # Header 1
- ## Header 2
- ### Header 3
- #### Header 4
- ##### Header 5
- ###### Header 6

Trong đó, Header 1 là header lớn nhất, Header 6 là header nhỏ nhất. Thông thường, Header 1 sẽ được sử dụng để tạo tiêu đề, các Header khác sẽ được sử dụng để tạo các section trong file README.

### Danh sách

Có 2 loại danh sách trong Markdown, danh sách đánh thứ tự và danh sách không đánh thứ tự.

#### Danh sách đánh thứ tự

Để tạo danh sách đánh thứ tự, bạn có thể sử dụng các số nguyên như sau:

```markdown
1. Item 1
2. Item 2
3. Item 3
```

Kết quả:

1. Item 1
2. Item 2
3. Item 3

Lưu ý: Markdown sẽ tự động đánh thứ tự các item trong danh sách. Ví dụ, khi bạn viết:

```markdown
1. Item 1
1. Item 2
1. Item 3
```

Kết quả:

1. Item 1
1. Item 2
1. Item 3

#### Danh sách không đánh thứ tự

Để tạo danh sách không đánh thứ tự, bạn có thể sử dụng các dấu `-` hoặc `+` như sau:

```markdown
- Item 1
- Item 2
- Item 3
```

Kết quả:

- Item 1
- Item 2
- Item 3

Bạn có thể sử dụng cả 2 loại danh sách trong 1 file README. Ví dụ:

```markdown
- Item 1
- Item 2
    + Item 2.1
    + Item 2.2
- Item 3
    - Item 3.1
    - Item 3.2
        + Item 3.2.1
        + Item 3.2.2
    - Item 3.3
```

Kết quả:

- Item 1
- Item 2
    + Item 2.1
    + Item 2.2
- Item 3
    - Item 3.1
    - Item 3.2
        + Item 3.2.1
        + Item 3.2.2
    - Item 3.3

### Blockquote

Blockquote là một cách để đánh dấu một đoạn văn bản. Bạn có thể sử dụng `>` như sau:

```markdown
> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
>> Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
>> Pellentesque ornare sem lacinia quam venenatis vestibulum.

> Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
```

Kết quả:

> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
>> Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
>> Pellentesque ornare sem lacinia quam venenatis vestibulum.

> Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.

### Code

Để đánh dấu một block code, bạn có thể sử dụng dấu `\`` như sau:

```markdown
`print('Hi')`: để viết code trong cùng 1 dòng
```

```
<br />
# Cách viết code trong 1 block
<br />
print("Hello World")
<br />
print("Nice to meet you!")
<br />
```

Bên cạnh đó, bạn có thể highlight một block code bằng cách thêm ngôn ngữ như sau:

```python
<br />
# Cách viết code trong 1 block
<br />
print("Hello World")
<br />
print("Nice to meet you!")
<br />
```

Kết quả:

```python
# Cách viết code trong 1 block
print("Hello World")
print("Nice to meet you!")
```

Danh sách các ngôn ngữ được hỗ trợ, bạn có thể xem tại [đây](https://github.com/github-linguist/linguist/blob/master/lib/linguist/languages.yml).

### Link

Để tạo link, bạn có thể sử dụng cú pháp như sau:

```markdown
[Link trang web của tôi.](https://tiennhm.github.io)
[Gửi mail cho tôi.](mailto:tiennhm.it@gmail.com)
```

Kết quả:

[Link trang web của tôi.](https://tiennhm.github.io)
[Gửi mail cho tôi.](mailto:tiennhm.it@gmail.com)

### Image

Để đính kèm 1 image, bạn có thể sử dụng cú pháp như sau:

```markdown
![Ảnh của TienNHM](https://github.com/TienNHM.png)
```

Kết quả:

![Ảnh của TienNHM](https://github.com/TienNHM.png)

### Image link

Để đính kèm 1 image vào link, bạn có thể sử dụng cú pháp như sau:

```markdown
[![Ảnh của TienNHM](https://github.com/TienNHM.png)](https://tiennhm.github.io)
```

Kết quả:

[![Ảnh của TienNHM](https://github.com/TienNHM.png)](https://tiennhm.github.io)

### Table

Table là một cách trình bày dữ liệu dạng bảng, trực quan. Bạn có thể sử dụng cú pháp như sau:

```markdown
| Column 1 | Column 2 | Column 3 |
| -------- | -------- | -------- |
| Item 1   | Item 2   | Item 3   |
| Item 4   | Item 5   | Item 6   |
```

Kết quả:

| Column 1 | Column 2 | Column 3 |
| -------- | -------- | -------- |
| Item 1   | Item 2   | Item 3   |
| Item 4   | Item 5   | Item 6   |

Bạn cũng có thể canh lề table bằng cách sử dụng dấu `:` như sau:

```markdown
| Column 1 | Column 2 | Column 3 |
| :------- | :------: | -------: |
| Canh trái Item 1 | Canh giữa Item 2 | Canh phải Item 3 |
| Lorem ipsum dolor sit amet, consectetur adipiscing elit.  | Lorem ipsum dolor sit amet, consectetur adipiscing elit. | Lorem ipsum dolor sit amet, consectetur adipiscing elit. |
```

Kết quả:

| Column 1 | Column 2 | Column 3 |
| :------- | :------: | -------: |
| Canh trái Item 1 | Canh giữa Item 2 | Canh phải Item 3 |
| Lorem ipsum dolor sit amet, consectetur adipiscing elit.  | Lorem ipsum dolor sit amet, consectetur adipiscing elit. | Lorem ipsum dolor sit amet, consectetur adipiscing elit. |

## README.md là gì và nên có những gì

`README.md` là file GitHub tự động hiển thị ngay dưới danh sách file khi ai đó mở repo. Nó là thứ đầu tiên người lạ nhìn thấy, nên đáng viết tử tế.

Một README dùng được thường có các phần sau, theo đúng thứ tự người đọc cần:

| Phần | Trả lời câu hỏi |
|---|---|
| Tên và mô tả một dòng | Dự án này là cái gì? |
| Ảnh chụp màn hình hoặc GIF | Nó trông như thế nào? |
| Cài đặt | Làm sao chạy được trên máy tôi? |
| Cách dùng | Dùng nó ra sao, kèm ví dụ cụ thể |
| Cấu hình | Có biến môi trường hay tham số nào cần đặt? |
| Đóng góp | Muốn gửi pull request thì làm thế nào? |
| Giấy phép | Tôi được phép dùng nó vào việc gì? |

Lỗi phổ biến nhất là viết dài dòng về động cơ và triết lý thiết kế ở đầu file, trong khi người đọc chỉ cần biết **chạy nó lên bằng cách nào**. Đặt phần cài đặt lên càng sớm càng tốt.

Ngoài `README.md`, GitHub còn nhận diện vài file Markdown đặc biệt khác: `CONTRIBUTING.md` hiện lên khi ai đó mở pull request, `LICENSE` được đọc để hiển thị nhãn giấy phép, và `.github/ISSUE_TEMPLATE/*.md` dùng làm mẫu cho issue mới.

## Kết luận

Trong bài viết này, mình đã giới thiệu các cú pháp cơ bản thường được sử dụng để tạo 1 file README bằng markdown. Hy vọng bạn thấy có ích và thích nó. Đừng ngại khi bạn có thể share bài viết này cho bạn bè nhé!

Trong phần tiếp theo, mình sẽ hướng dẫn các bạn sử dụng một số cú pháp nâng cao trong markdown.

### File .md là file gì?

File .md là file Markdown, một file văn bản thuần chứa nội dung kèm các ký hiệu định dạng đơn giản như dấu thăng cho tiêu đề và dấu sao cho in đậm. Vì là văn bản thuần nên mở được bằng bất kỳ trình soạn thảo nào và Git so sánh được từng dòng, đó là lý do tài liệu kỹ thuật thường viết bằng Markdown thay vì Word.

### Mở file .md bằng gì?

Mở bằng bất kỳ trình soạn thảo văn bản nào, kể cả Notepad. Muốn xem bản đã render thì dùng VS Code với phím tắt Ctrl Shift V, hoặc các ứng dụng chuyên dụng như Typora và Obsidian. GitHub và GitLab tự render file .md khi bạn mở nó trong repo.

### Cách tạo file .md như thế nào?

Cách nhanh nhất là mở VS Code, tạo file mới rồi lưu với tên kèm đuôi .md, ví dụ README.md. Cũng có thể tạo thẳng trên GitHub qua Add file rồi Create new file mà không cần cài gì, hoặc dùng lệnh touch README.md trên Linux và macOS, New-Item README.md trên PowerShell. Nếu dùng Notepad thì nhớ chọn All Files khi lưu để Windows không tự thêm đuôi .txt.

### README.md là gì?

README.md là file Markdown mà GitHub tự động hiển thị ngay dưới danh sách file khi ai đó mở repo. Nó là thứ đầu tiên người lạ nhìn thấy, thường gồm tên và mô tả dự án, ảnh minh hoạ, hướng dẫn cài đặt, cách dùng, cấu hình, cách đóng góp và giấy phép.

### Tên file README viết hoa hay viết thường?

Quy ước là viết hoa toàn bộ thành README.md. GitHub nhận cả readme.md lẫn Readme.md, nhưng hệ thống file trên Linux phân biệt chữ hoa chữ thường nên viết hoa toàn bộ là cách an toàn và thống nhất nhất.

### Có dùng được thẻ HTML trong file Markdown không?

Được. Markdown cho phép chèn thẳng thẻ HTML, nên những thứ cú pháp Markdown không làm được như căn giữa ảnh, gộp ô trong bảng hay tạo khối thu gọn bằng thẻ details đều xử lý được bằng HTML. Tuy nhiên một số nền tảng lọc bớt thẻ vì lý do bảo mật, ví dụ GitHub loại bỏ thẻ script và phần lớn thuộc tính style.

### Markdown khác HTML ở điểm nào?

Cả hai đều là ngôn ngữ đánh dấu nhưng Markdown ưu tiên việc đọc được ngay ở dạng thô, còn HTML ưu tiên khả năng mô tả cấu trúc đầy đủ. Markdown gọn hơn nhiều, chẳng hạn một dấu thăng thay cho cặp thẻ h1, đổi lại nó chỉ phủ những thành phần thông dụng. Khi cần thứ Markdown không có, chèn thẳng HTML vào là được.
