# Trắc nghiệm tiến trình và lập lịch CPU

> Nguồn: https://tiennhm.io.vn/en/docs/operating-system/quiz/cpu-scheduling
> Bài tập trắc nghiệm lập lịch CPU - FCFS, SJF, SRTF, Round Robin, Priority - kèm sơ đồ Gantt và cách tính thời gian chờ, turnaround từng bước.

Phần nặng bài tập nhất của đề thi. Mỗi câu tính toán đều có sơ đồ Gantt và các bước ra số trong phần *Chi tiết*.

Chưa vững lý thuyết thì đọc [Các thuật toán lập lịch tiến trình](../03.os-process-scheduling-algorithms.md) trước, trong đó có ví dụ tính tay cho FCFS, SJF và Round Robin.

> **Tip: Công thức phải thuộc**
>
> - **Turnaround time** = thời điểm hoàn thành − thời điểm đến
> - **Waiting time** = turnaround time − burst time
> - Hoà nhau trong SJF: ưu tiên tiến trình đến trước. Hoà trong SRTF: giữ tiến trình đang chạy.
