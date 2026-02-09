---
slug: markdown-cheat-sheet
title: Markdown Cheat Sheet - Cách tạo một file README trên Github với Markdown
authors: [tiennhm]
tags: [markdown, github, cheatsheet, readme]
enableComments: true # for Gisqus comments, set to true
draft: false # set to true to hide this post from the site
image: https://www.freecodecamp.org/news/content/images/size/w2000/2022/08/Markdown-cheatsheet.png
---

import { SummaryBox } from '@site/src/components/SEO';

<p align="right">
    <img src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Ftiennhm.github.io%2Fblog%2Fmarkdown-cheat-sheet&label=⚪View&labelColor=%2337d67a&countColor=%23555555&style=flat&labelStyle=upper" loading='lazy' decoding='async'/>
</p>

<SummaryBox>
Bài viết là một Markdown Cheat Sheet đầy đủ hướng dẫn cách tạo file README trên GitHub với Markdown. Markdown là ngôn ngữ đánh dấu nhẹ, dễ đọc và dễ viết, được sử dụng rộng rãi trên GitHub để tạo documentation. Bài viết bao gồm tất cả các syntax cơ bản của Markdown như headings, lists, links, images, code blocks, tables, và nhiều tính năng khác, kèm ví dụ cụ thể cho từng loại.
</SummaryBox>

Bạn có thể tạo một file README trên Github với Markdown. Nhưng markdown là gì và cách tạo một file README trên Github với Markdown như thế nào? Hãy cùng tìm hiểu ở bài viết này nhé!

<!--truncate-->

## Markdown là gì?

Markdown là một ngôn ngữ mã nguồn mở, được sử dụng để viết các file README, với cú pháp dễ hiểu và dễ đọc. Có thể được đọc trên nhiều nền tảng khác nhau, bao gồm những nền tảng web, trên máy tính, và trên các thiết bị di động.

Các định dạng file markdown phổ biến: `.markdown`, `.md`, `.mkd`, `.mkdown`, `.text`, `.mdown`...

Markdown là một trong số những markup language được sử dụng phổ biến nhất. Bên cạnh Markdown, bạn có thể sử dụng các markup language khác như [HTML](https://www.w3schools.com/html/), [XML](https://www.w3schools.com/xml/)...

Đặc biệt, bạn hoàn toàn có thể sử dụng cú pháp của các thẻ HTML trong file file markdown. 

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
- Kiểu<sub>subscript</sub>: H<sub>2</sub>O
- Kiểu<sup>superscript</sup>: E = mc<sup>2</sup>

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

<pre>
```
<br />
# Cách viết code trong 1 block
<br />
print("Hello World")
<br />
print("Nice to meet you!")
<br />
```
</pre>

Bên cạnh đó, bạn có thể highlight một block code bằng cách thêm ngôn ngữ như sau:

<pre>
```python
<br />
# Cách viết code trong 1 block
<br />
print("Hello World")
<br />
print("Nice to meet you!")
<br />
```
</pre>

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

## Kết luận

Trong bài viết này, mình đã giới thiệu các cú pháp cơ bản thường được sử dụng để tạo 1 file README bằng markdown. Hy vọng bạn thấy có ích và thích nó. Đừng ngại khi bạn có thể share bài viết này cho bạn bè nhé!

Trong phần tiếp theo, mình sẽ hướng dẫn các bạn sử dụng một số cú pháp nâng cao trong markdown.