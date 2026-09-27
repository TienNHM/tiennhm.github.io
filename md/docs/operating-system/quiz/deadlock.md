# Trắc nghiệm deadlock và starvation

> Nguồn: https://tiennhm.io.vn/docs/operating-system/quiz/deadlock
> Trắc nghiệm về deadlock và starvation - phân biệt hai hiện tượng, phá điều kiện Hold and Wait, điều kiện số tài nguyên an toàn.

Hai hiện tượng rất hay bị nhầm lẫn: deadlock là chờ một sự kiện **không bao giờ xảy ra**, starvation là chờ một sự kiện **có xảy ra nhưng không bao giờ tới lượt mình**.

> **Tip: Nhớ nhanh**
>
> Ngăn deadlock = phá một trong bốn điều kiện Coffman (mutual exclusion, hold and wait, no preemption, circular wait). Nhưng phá xong vẫn có thể starvation — đó là hai bài toán khác nhau.
>
> Điều kiện đủ để chắc chắn không deadlock với tài nguyên cùng loại: **tổng (Si − 1) < m**, tương đương **m ≥ tổng Si − n + 1**.
