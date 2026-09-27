# Trắc nghiệm lập lịch đĩa và I/O

> Nguồn: https://tiennhm.io.vn/en/docs/operating-system/quiz/disk-scheduling
> Trắc nghiệm hệ thống I/O và lập lịch đĩa - seek time, rotational latency, FCFS, SSTF, SCAN, C-SCAN, kèm bài tập tính tổng quãng di chuyển đầu đĩa.

Toàn bộ các thuật toán lập lịch đĩa chỉ nhắm một mục tiêu: **giảm seek time**, vì đó là thành phần cơ học đắt nhất trong một lần truy cập đĩa. Dữ liệu nằm ở đâu trên đĩa là chuyện của [hệ thống file](./09.file-system.mdx).

> **Tip: Nhớ nhanh bốn thuật toán**
>
> - **FCFS** — công bằng, đầu đĩa quăng qua quăng lại, tệ nhất về quãng đường
> - **SSTF** — tham lam chọn yêu cầu gần nhất, **gây starvation**
> - **SCAN** — quét một mạch rồi đảo chiều, phục vụ cả hai chiều
> - **C-SCAN** — chỉ phục vụ một chiều, quay về không phục vụ ai, **thời gian chờ đồng đều hơn**
