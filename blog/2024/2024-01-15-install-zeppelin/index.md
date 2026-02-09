---
slug: install-zeppelin-on-windows
title: Hướng dẫn cài đặt Apache Zeppelin trên Windows
authors: [tiennhm]
tags: [apache, zeppelin, installation, tutorial, windows]
enableComments: true # for Gisqus comments, set to true
draft: false # set to true to hide this post from the site
image: ./images/zeppelin-spark.png
---

import { SummaryBox } from '@site/src/components/SEO';

<p align="right">
    <img src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Ftiennhm.github.io%2Fblog%2Finstall-zeppelin-on-windows&label=⚪View&labelColor=%2337d67a&countColor=%23555555&style=flat&labelStyle=upper" loading='lazy' decoding='async'/>
</p>

<SummaryBox>
Bài viết hướng dẫn chi tiết cách cài đặt Apache Zeppelin trên Windows. Apache Zeppelin là công cụ phân tích dữ liệu mã nguồn mở với giao diện web, hỗ trợ nhiều ngôn ngữ như Scala, Python, SQL, SparkSQL, Hive. Bài viết bao gồm các bước cài đặt Java, tải và cấu hình Zeppelin, và cách khởi chạy ứng dụng. Zeppelin giúp data scientists và analysts thực hiện data analysis tương tác và trực quan với notebooks tương tự Jupyter.
</SummaryBox>

Apache Zeppelin là một công cụ phân tích dữ liệu mã nguồn mở, được thiết kế để thực hiện các nhiệm vụ phân tích dữ liệu tương tác và trực quan. Nó cung cấp một giao diện người dùng web để phân tích dữ liệu bằng nhiều ngôn ngữ lập trình khác nhau như Scala, Python, SQL, SparkSQL, Hive, Markdown, Shell, v.v. Trong bài viết này, chúng ta sẽ cùng nhau tìm hiểu cách cài đặt Apache Zeppelin trên Windows.

<!--truncate-->

## 1. Cài đặt Java

Để cài đặt Apache Zeppelin, chúng ta cần cài đặt Java trước. Có thể tải Java từ trang chủ của Oracle tại địa chỉ https://www.oracle.com/java/technologies/javase-downloads.html. Trong bài viết này, chúng ta sẽ sử dụng Java 8.

:::tip Link tải trực tiếp
https://javadl.oracle.com/webapps/download/GetFile/1.8.0_331-b09/165374ff4ea84ef0bbd821706e29b123/windows-i586/jre-8u331-windows-x64.exe
:::

Sau khi tải về, chúng ta tiến hành cài đặt Java bình thường.

## 2. Cài đặt Apache Zeppelin - Version 0.8.2

Sau khi cài đặt Java xong, chúng ta tiến hành tải Apache Zeppelin về từ trang chủ của Apache Zeppelin tại địa chỉ https://zeppelin.apache.org/download.html. Trong bài viết này, chúng ta sẽ sử dụng Apache Zeppelin phiên bản 0.8.2.

:::tip Link tải trực tiếp
https://dlcdn.apache.org/zeppelin/zeppelin-0.8.2/zeppelin-0.8.2-bin-all.tgz
:::

Bạn hãy tải file `zeppelin-0.8.2-bin-all.tgz` về và giải nén ra một thư mục bất kỳ. Trong bài viết này, chúng ta sẽ giải nén vào thư mục `D:\Programs\zeppelin-0.8.2-bin-all`.

Bạn có thể sử dụng phần mềm [7-Zip](https://www.7-zip.org/) hoặc [WinRAR](https://www.win-rar.com/) để giải nén file `zeppelin-0.8.2-bin-all.tgz`.

## 3. Cài đặt Python3 - Version 3.12.1

Apache Zeppelin hỗ trợ nhiều ngôn ngữ lập trình khác nhau. Trong bài viết này, chúng ta sẽ sử dụng Python3. Bạn có thể tải Python3 từ trang chủ của Python tại địa chỉ https://www.python.org/downloads/. Trong bài viết này, chúng ta sẽ sử dụng Python3 phiên bản 3.12.1.

:::tip Link tải trực tiếp
https://www.python.org/ftp/python/3.12.1/python-3.12.1-amd64.exe
:::

Lưu ý khi cài đặt Python3, bạn chọn chế độ cài đặt `Customize installation` và chọn `Add Python 3.12 to PATH` như hình dưới đây:

<p align="center">
    <img src="https://res.cloudinary.com/tiennhm/image/upload/v1725683997/blog/images/install-python-01_geyq8d.webp" loading='lazy' decoding='async' alt="Install Python - 01" />
</p>

<p align="center">
    <img src="https://res.cloudinary.com/tiennhm/image/upload/v1725684076/blog/images/install-python-02_iyv4ib.webp" loading='lazy' decoding='async' alt="Install Python - 02" />
</p>

<p align="center">
    <img src="https://res.cloudinary.com/tiennhm/image/upload/v1725684069/blog/images/install-python-03_fxtqgs.webp" loading='lazy' decoding='async' alt="Install Python - 02" />
</p>

## 4. Tạo môi trường ảo Python3 cho Apache Zeppelin

Sau khi cài đặt Python3 xong, chúng ta tiến hành tạo một môi trường ảo Python3 cho Apache Zeppelin. Để tạo môi trường ảo Python3, chúng ta sử dụng công cụ `venv` của Python3.

Đầu tiên, chúng ta mở Command Prompt (hoặc Windows PowerShell) lên và chạy lần lượt các lệnh sau:

```bash
cd D:\Programs\zeppelin-0.8.2-bin-all
mkdir python\venv
python -m venv python\venv
python\venv\Scripts\activate.bat
```

Sau đó, chuyển tới thư mục `D:\Programs\zeppelin-0.8.2-bin-all\python\venv\Scripts` và chạy lệnh sau để active môi trường ảo Python3:

```bash
activate.bat
```

<p align="center">
    <img src="https://res.cloudinary.com/tiennhm/image/upload/v1725683844/blog/images/create-python-virtual-environment_g5vufa.webp" loading='lazy' decoding='async' alt="Create Python Virtual Environment" />
</p>

## 5. Cài đặt các thư viện Python3 cần thiết

Sau khi active môi trường ảo Python3, chúng ta tiến hành cài đặt các thư viện Python3 cần thiết cho Apache Zeppelin. Để cài đặt các thư viện Python3 cần thiết, chúng ta sử dụng công cụ `pip` của Python3.

Các bạn tiếp tục chạy lần lượt các lệnh sau:

```bash
pip install py4j==0.10.4
pip install pypandoc==1.5
pip install pyspark==2.2.1
```

## 6. Sửa một số tập tin liên quan

Sau khi cài đặt các thư viện Python3 cần thiết, chúng ta tiến hành sửa file `zeppelin-env.cmd` và `common.cmd` để Apache Zeppelin có thể sử dụng được Python3.

Chuyển tới thư mục `D:\Programs\zeppelin-0.8.2-bin-all\bin`, lần lượt mở file `zeppelin-env.cmd` và `common.cmd` lên và thêm vào ngay sau dòng bắt đầu bằng `REM` cuối cùng:

```bash

set PATH=C:\Program Files (x86)\Common Files\Oracle\Java\javapath;D:\Programs\zeppelin-0.8.2-bin-all\python\venv\Scripts;

```

Lưu ý: Đường dẫn `D:\Programs\zeppelin-0.8.2-bin-all\python\venv\Scripts` là đường dẫn tới thư mục `Scripts` của môi trường ảo Python3 mà chúng ta đã tạo ở bước 4. Nếu bạn tạo môi trường ảo Python3 ở một thư mục khác, bạn hãy thay đổi đường dẫn tương ứng.

<p align="center">
    <img src="https://res.cloudinary.com/tiennhm/image/upload/v1725683939/blog/images/edit-zeppelin-env-cmd_z2exjv.webp" loading='lazy' decoding='async' alt="Edit zeppelin-env.cmd" />
</p>

## 7. Thay thế một số tập tin

Tải các file patches tại https://cloud.cntt.io/s/G69GLQ9MKwWpAZy. Lần lượt thay thế như sau:

- spark-interpreter-0.8.2.jar
> D:\Programs\zeppelin-0.8.2-bin-all\interpreter\spark\spark-interpreter-0.8.2.jar
- py4j-0.10.4-src.zip
> D:\Programs\zeppelin-0.8.2-bin-all\interpreter\spark\pyspark\py4j-0.10.4-src.zip
- spark.zip 
> D:\Programs\zeppelin-0.8.2-bin-all\interpreter\spark\pyspark\spark.zip
- resultiterable.py 
> D:\Programs\zeppelin-0.8.2-bin-all\python\venv\Lib\site-packages\pyspark\resultiterable.py

## 8. Chạy Apache Zeppelin

Sau khi thực hiện xong các bước trên, chúng ta tiến hành chạy Apache Zeppelin. Để chạy Apache Zeppelin, chúng ta chuyển tới thư mục `D:\Programs\zeppelin-0.8.2-bin-all\bin`, mở Command Prompt (hoặc Windows PowerShell) lên và chạy lệnh sau:

```bash
zeppelin.cmd
```

Kết quả trên Command Prompt (hoặc Windows PowerShell) sẽ như sau:

<p align="center">
    <img src="https://res.cloudinary.com/tiennhm/image/upload/v1725684170/blog/images/run-apache-zeppelin_xzj3vw.webp" loading='lazy' decoding='async' alt="Run Apache Zeppelin" />
</p>

Sau khi chạy và thấy logs báo `Done, zeppelin server started`, chúng ta mở trình duyệt web lên và truy cập vào địa chỉ http://localhost:8080 để sử dụng Apache Zeppelin.

Màn hình trang chủ của Apache Zeppelin sẽ như sau:

<p align="center">
    <img src="https://res.cloudinary.com/tiennhm/image/upload/v1725684163/blog/images/welcome-apache-zeppelin_icrah5.webp" loading='lazy' decoding='async' alt="Apache Zeppelin Home Page" />
</p>

Như vậy, chúng ta đã cài đặt thành công Apache Zeppelin trên Windows.

## Tổng kết

Trong bài viết này, chúng ta đã cùng nhau tìm hiểu cách cài đặt Apache Zeppelin trên Windows. Hy vọng bài viết này sẽ giúp ích cho các bạn trong quá trình học tập và làm việc.