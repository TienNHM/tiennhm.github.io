# Trắc nghiệm phân trang và TLB

> Nguồn: https://tiennhm.io.vn/docs/operating-system/quiz/paging-tlb
> Trắc nghiệm phân trang - bảng trang đa cấp, kích thước bảng trang, số bit địa chỉ logic và vật lý, thời gian truy cập hiệu quả với TLB, bảng trang băm.

Nhóm câu tính toán nhiều nhất của phần bộ nhớ. Hầu hết chỉ cần tách đúng địa chỉ thành các trường bit là ra đáp án.

Khi khung trang đã đầy thì phải chọn trang nạn nhân — xem [Các thuật toán thay trang](../02.page-replacement-algorithms.md) và [trắc nghiệm bộ nhớ ảo](./07.virtual-memory.mdx).

> **Tip: Bộ công thức dùng chung**
>
> - Trang `2^n` byte → **offset n bit**; số hiệu trang = *số bit địa chỉ* − n
> - **Số bảng cấp 2** = số mục của bảng cấp 1 = `2^p1`; **số mục mỗi bảng cấp 2** = `2^p2`
> - Kích thước bảng trang = *số mục* × *kích thước một mục*
> - `EAT = hit × (t_TLB + t_mem) + miss × (t_TLB + 2 × t_mem)` — trượt TLB **vẫn** tốn thời gian tra TLB
