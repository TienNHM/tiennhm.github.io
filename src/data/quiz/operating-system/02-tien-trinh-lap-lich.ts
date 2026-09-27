import type {QuizSet} from '@site/src/components/Quiz/types';

const SOURCE = 'Cuối kỳ HĐH – SPKT';

export const tienTrinhLapLich: QuizSet = {
  id: 'os-tien-trinh-lap-lich',
  title: 'Chương 3–5: Tiến trình và lập lịch CPU',
  description: 'fork(), tiêu chí lập lịch, FCFS, SJF, SRTF, Round Robin và Priority.',
  questions: [
    {
      id: 'os-ll-01',
      topic: 'fork()',
      source: SOURCE,
      question: 'Kết quả của chương trình sau là gì?',
      code: `main( )
{
    int a = 10;
    if ((fork( ) == 0))
        a++;
    printf ("%d\\n", a );
}`,
      options: ['11', '10', '11 và 10', '10 và 11'],
      answer: 3,
      explanation: `\`fork()\` nhân đôi tiến trình. Giá trị trả về khác nhau ở hai bên:
- tiến trình **con** nhận **0**
- tiến trình **cha** nhận **PID của con** (> 0)

Nên điều kiện \`fork() == 0\` chỉ đúng ở con: con tăng \`a\` thành **11**, cha giữ nguyên **10**. Hai tiến trình có không gian nhớ riêng (copy-on-write), sửa \`a\` bên này không ảnh hưởng bên kia.

Cả hai đều chạy tiếp \`printf\` nên màn hình in ra **cả 10 và 11**. Thứ tự do bộ lập lịch quyết định, không đảm bảo trước — đáp án của đề ghi theo thứ tự "10 và 11".`,
    },
    {
      id: 'os-ll-02',
      topic: 'Tiêu chí lập lịch',
      source: SOURCE,
      question:
        'Một thuật toán lập lịch tối ưu để giảm thiểu thời gian chờ trung bình của một tập hợp tiến trình là _____',
      options: ['Priority', 'Round robin', 'FCFS', 'Shortest job first'],
      answer: 3,
      explanation: `**SJF là tối ưu** về thời gian chờ trung bình — đây là kết quả chứng minh được, không phải kinh nghiệm.

Ý tưởng chứng minh (đổi chỗ): nếu xếp một tiến trình dài trước một tiến trình ngắn, đổi chỗ hai tiến trình đó luôn làm tổng thời gian chờ giảm. Lặp lại phép đổi cho tới khi dãy được sắp tăng dần theo burst — đó chính là SJF.

Lưu ý:
- Trong lớp không trưng dụng, **SJF** tối ưu; nếu cho phép trưng dụng thì **SRTF** (SJF preemptive) mới là tối ưu.
- Nhược điểm: không biết trước burst kế tiếp (phải dự đoán bằng trung bình mũ) và gây **starvation** cho tiến trình dài.`,
    },
    {
      id: 'os-ll-03',
      topic: 'SRTF',
      source: SOURCE,
      question:
        'Sử dụng thuật toán lập lịch **SJF – preemptive** cho các tiến trình theo thông tin dưới bảng. Thời gian chờ trung bình là bao nhiêu?',
      code: `Process   Arrival Time   Burst Time
P1        0              7
P2        2              4
P3        4              1
P4        5              4`,
      options: ['6', '3', '4', '7'],
      answer: 1,
      explanation: `SJF preemptive (SRTF): mỗi khi có tiến trình mới đến, so **thời gian còn lại** để quyết định có trưng dụng hay không.

\`\`\`
 P1  | P2  | P3 | P2 |   P4   |      P1
0    2     4    5    7        11            16
\`\`\`

- t=2: P2 (4) < P1 còn 5 → trưng dụng.
- t=4: P3 (1) < P2 còn 2 → trưng dụng.
- t=5: P4 (4) > P2 còn 2 → P2 chạy tiếp tới 7.
- Sau đó P4 (4) < P1 còn 5 → P4 trước, cuối cùng P1.

Thời gian chờ = *hoàn thành − đến − burst*:
- P1 = 16 − 0 − 7 = **9**
- P2 = 7 − 2 − 4 = **1**
- P3 = 5 − 4 − 1 = **0**
- P4 = 11 − 5 − 4 = **2**

Trung bình = (9 + 1 + 0 + 2) / 4 = **3**.`,
    },
    {
      id: 'os-ll-04',
      topic: 'SJF',
      source: SOURCE,
      question:
        'Sử dụng thuật toán lập lịch **SJF – non-preemptive** cho các tiến trình theo thông tin dưới bảng. Thời gian chờ trung bình là bao nhiêu?',
      code: `Process   Arrival Time   Burst Time
P1        0              7
P2        2              4
P3        4              1
P4        5              4`,
      options: ['4', '6', '3', '7'],
      answer: 0,
      explanation: `Không trưng dụng: tiến trình đã chiếm CPU thì chạy hết burst, chỉ chọn lại khi CPU rảnh.

\`\`\`
        P1        | P3 |    P2    |    P4
0                 7    8         12        16
\`\`\`

- t=0: chỉ có P1 → chạy trọn 7.
- t=7: hàng đợi có P2 (4), P3 (1), P4 (4) → chọn **P3** ngắn nhất.
- t=8: P2 và P4 cùng burst 4 → **hoà thì ưu tiên tiến trình đến trước**, P2 (đến lúc 2) chạy trước P4 (đến lúc 5).

Thời gian chờ = *bắt đầu chạy − đến*:
- P1 = 0 − 0 = **0**
- P2 = 8 − 2 = **6**
- P3 = 7 − 4 = **3**
- P4 = 12 − 5 = **7**

Trung bình = 16 / 4 = **4**. So với SRTF ở câu trên (3), bản không trưng dụng luôn tệ hơn hoặc bằng.`,
    },
    {
      id: 'os-ll-05',
      topic: 'Round Robin',
      source: SOURCE,
      question:
        'Nếu khoảng thời gian quantum (time-slice) được sử dụng trong thuật toán lập lịch Round-robin nhiều hơn thời gian tối đa cần thiết để thực hiện bất kỳ tiến trình nào, thì thuật toán sẽ',
      options: [
        'Trở thành Shortest job first',
        'Không có cái nào ở trên',
        'Trở thành First come first serve',
        'Trở thành lập lịch Priority',
      ],
      answer: 2,
      explanation: `Quantum lớn hơn mọi CPU burst nghĩa là **không tiến trình nào bị hết lượt giữa chừng**: mỗi tiến trình vào CPU là chạy tới khi kết thúc.

Hàng đợi Round Robin là FIFO, nên thứ tự phục vụ chính là thứ tự vào hàng đợi — đúng bằng **FCFS**.

Hai thái cực của quantum:
- quantum **rất lớn** → FCFS.
- quantum **rất nhỏ** → giống chia sẻ CPU đều (processor sharing), nhưng chi phí **context switch** nuốt hết hiệu năng.`,
    },
    {
      id: 'os-ll-06',
      topic: 'Priority',
      source: SOURCE,
      question:
        'Xem xét tập các tiến trình với thời gian đến, thời gian nổ CPU và mức độ ưu tiên (0 là mức ưu tiên cao nhất). Không có quy trình nào có thời gian bùng nổ I/O. Thời gian chờ của tiến trình **P1** khi dùng lập lịch **ưu tiên có trưng dụng** là bao nhiêu?',
      code: `Process   Arrival Time   Burst Time   Priority
P1        0              11           2
P2        5              28           0
P3        12             2            3
P4        2              10           1
P5        9              16           4`,
      options: ['29', '26', '49', '38'],
      answer: 3,
      explanation: `Ưu tiên có trưng dụng: tiến trình mới đến có số ưu tiên nhỏ hơn sẽ đá tiến trình đang chạy ra.

\`\`\`
 P1 | P4 |           P2           |   P4   |    P1
0   2    5                        33       40         49
\`\`\`

- t=0: chỉ có P1 (ưu tiên 2) → chạy, được 2 đơn vị (còn 9).
- t=2: P4 đến, ưu tiên **1** < 2 → trưng dụng P1. P4 chạy 3 đơn vị (còn 7).
- t=5: P2 đến, ưu tiên **0** cao nhất → trưng dụng P4, chạy trọn 28 đơn vị tới **t=33** (P5 đến lúc 9 và P3 đến lúc 12 đều ưu tiên thấp hơn).
- t=33: hàng đợi P4 (ưu tiên 1), P1 (2), P3 (3), P5 (4) → **P4** chạy nốt 7 đơn vị tới t=40.
- t=40: tới lượt **P1** chạy nốt 9 đơn vị → hoàn thành tại **t=49**.

Thời gian chờ của P1 = *hoàn thành − đến − burst* = 49 − 0 − 11 = **38**.

Mẹo kiểm tra nhanh: P1 bị chen 2 lần, tổng thời gian bị chiếm chỗ là (5−2) + (33−5) + (40−33) = 38.`,
    },
    {
      id: 'os-ll-07',
      topic: 'SRTF',
      source: SOURCE,
      question:
        'Xem xét các tiến trình CPU sau với thời gian đến và Burst Time, ngoại trừ tiến trình P4. Nếu thời gian chờ trung bình trên tất cả các tiến trình là **2 mili giây** và thuật toán **Shortest Remaining Time First** được sử dụng, hãy tìm giá trị của **x**.',
      code: `Process   Arrival Time   Burst Time
P1        0              5
P2        1              1
P3        3              3
P4        4              x`,
      options: ['4', '1', '2', '5'],
      answer: 2,
      explanation: `Tổng thời gian chờ phải bằng 2 × 4 = **8**. Thử **x = 2**:

\`\`\`
 P1 | P2 |      P1      | P4 |    P3
0   1    2              6    8          11
\`\`\`

- t=1: P2 còn 1 < P1 còn 4 → trưng dụng, P2 xong tại t=2.
- t=3: P3 (3) bằng P1 còn 3 → **hoà thì giữ tiến trình đang chạy**, P1 chạy tiếp.
- t=4: P4 (2) bằng P1 còn 2 → vẫn giữ P1, P1 xong tại t=6.
- t=6: P4 (2) < P3 (3) → P4 chạy tới 8, rồi P3 tới 11.

Thời gian chờ:
- P1 = 6 − 0 − 5 = **1**
- P2 = 2 − 1 − 1 = **0**
- P3 = 11 − 3 − 3 = **5**
- P4 = 8 − 4 − 2 = **2**

Tổng = 8 → trung bình = **2 ms**, khớp đề. Vậy **x = 2**.

Thử nhanh các đáp án khác: x càng lớn thì P3 càng bị đẩy lùi, trung bình vượt 2; x = 1 cho tổng nhỏ hơn 8.`,
    },
    {
      id: 'os-ll-08',
      topic: 'Tiêu chí lập lịch',
      source: SOURCE,
      question:
        'Tiêu chí nào sau đây **không phải** là tiêu chí tối ưu hóa trong thiết kế thuật toán lập lịch tiến trình CPU?',
      options: [
        'Minimum turnaround time',
        'Minimum CPU utilization',
        'Minimum waiting time',
        'Maximum throughput',
      ],
      answer: 1,
      explanation: `Năm tiêu chí chuẩn, nhớ theo hướng **tối đa hoá hai cái đầu, tối thiểu hoá ba cái sau**:
- **Tối đa**: CPU utilization (mức độ bận của CPU), throughput (số tiến trình hoàn thành / đơn vị thời gian).
- **Tối thiểu**: turnaround time, waiting time, response time.

CPU nhàn rỗi là tài nguyên bị phí, nên *minimum CPU utilization* đi ngược mục tiêu — đây là đáp án.`,
    },
    {
      id: 'os-ll-09',
      topic: 'SRTF',
      source: SOURCE,
      question:
        'Hệ điều hành sử dụng thuật toán lập lịch **Shortest Remaining Time First (SRTF)**. Tổng thời gian chờ đợi cho tiến trình **P2** là bao nhiêu?',
      code: `Process   Execution time   Arrival time
P1        20               0
P2        25               15
P3        10               30
P4        15               45`,
      options: ['5', '15', '55', '40'],
      answer: 1,
      explanation: `\`\`\`
       P1        |   P2   |   P3   |     P2     |    P4
0                20       30       40           55          70
\`\`\`

- t=15: P2 đến với 25, P1 **chỉ còn 5** → không trưng dụng, P1 chạy hết tới t=20.
- t=20: P2 chạy, tới t=30 còn lại 25 − 10 = 15.
- t=30: P3 (10) < 15 → trưng dụng, P3 chạy tới t=40.
- t=40: P2 chạy tiếp 15 đơn vị. Tại t=45 P4 đến với 15 > P2 còn 10 → không trưng dụng.
- P2 hoàn thành tại **t=55**.

Thời gian chờ P2 = 55 − 15 − 25 = **15**.

Cách nhìn khác: P2 nằm trong hệ thống 40 ms (15 → 55) nhưng chỉ chiếm CPU 25 ms, phần còn lại là chờ.`,
    },
    {
      id: 'os-ll-10',
      topic: 'SRTF',
      source: SOURCE,
      question:
        'Hệ điều hành sử dụng thuật toán lập lịch **Shortest Remaining Time First (SRTF)**. **Turnaround time** trung bình cho các tiến trình này là bao nhiêu?',
      code: `Process   Arrival Time   Burst Time
P1        0              5
P2        1              3
P3        2              3
P4        4              1`,
      options: ['5.5', '5.75', '6.00', '6.25'],
      answer: 0,
      explanation: `\`\`\`
 P1 |   P2   | P4 |   P3   |      P1
0   1        4    5        8             12
\`\`\`

- t=1: P2 (3) < P1 còn 4 → trưng dụng.
- t=2: P3 (3) > P2 còn 2 → P2 chạy tiếp, xong tại t=4.
- t=4: P4 (1) là ngắn nhất → chạy tới t=5.
- t=5: P3 (3) < P1 còn 4 → P3 chạy tới t=8, cuối cùng P1 xong tại t=12.

Turnaround = *hoàn thành − đến*:
- P1 = 12 − 0 = **12**
- P2 = 4 − 1 = **3**
- P3 = 8 − 2 = **6**
- P4 = 5 − 4 = **1**

Trung bình = 22 / 4 = **5.5**.

Đừng nhầm với thời gian chờ: waiting = turnaround − burst, ở đây trung bình là (7 + 0 + 3 + 0)/4 = 2.5.`,
    },
    {
      id: 'os-ll-11',
      topic: 'Throughput',
      source: SOURCE,
      question:
        'Xét một tập hợp n nhiệm vụ với thời gian chạy đã biết r1, r2, …, rn sẽ được chạy trên máy đơn xử lý. Thuật toán lập lịch CPU nào sau đây sẽ dẫn đến **throughput (thông lượng) tối đa**?',
      options: ['Round robin', 'Shortest job first', 'Priority', 'FCFS'],
      answer: 1,
      explanation: `Throughput = số tiến trình hoàn thành trên một đơn vị thời gian. Chạy job ngắn trước giúp nhiều job **về đích sớm hơn** trong cùng khoảng thời gian, nên **SJF** cho throughput lớn nhất.

Lý do sâu hơn: SJF tối thiểu hoá tổng turnaround time, mà tổng turnaround nhỏ đồng nghĩa với số job đã xong tại mọi thời điểm là lớn nhất.

- **Round robin** thêm chi phí context switch, làm mọi job xong muộn hơn.
- **FCFS** gặp hiệu ứng convoy: một job dài ở đầu chặn cả hàng.`,
    },
    {
      id: 'os-ll-12',
      topic: 'Trạng thái tiến trình',
      source: SOURCE,
      question:
        'Biểu đồ chuyển đổi trạng thái tiến trình có các cung: NEW → READY, READY → RUNNING, **RUNNING → READY**, RUNNING → BLOCKED, BLOCKED → READY, RUNNING → TERMINATED. Biểu đồ này là đại diện của ….',
      options: [
        'một hệ điều hành xử lý lô (batch)',
        'một hệ điều hành đơn lập trình',
        'một hệ điều hành với lịch trình non-preemptive',
        'một hệ điều hành với lịch trình preemptive',
      ],
      answer: 3,
      explanation: `Chìa khoá là cung **RUNNING → READY**.

Một tiến trình đang chạy chỉ rời CPU theo ba đường:
- **RUNNING → TERMINATED**: chạy xong.
- **RUNNING → BLOCKED**: tự nguyện nhường vì phải chờ I/O.
- **RUNNING → READY**: bị **tước CPU** khi vẫn còn chạy được — hết quantum hoặc có tiến trình ưu tiên cao hơn tới.

Đường thứ ba chỉ tồn tại trong lập lịch **preemptive**. Hệ non-preemptive (và batch cổ điển) không có cung này: đã vào RUNNING là chạy tới khi kết thúc hoặc chờ I/O.

Hệ **đơn lập trình** thì càng không, vì chỉ có một tiến trình trong bộ nhớ nên không cần trạng thái READY.`,
    },
    {
      id: 'os-ll-13',
      topic: 'Thread',
      source: SOURCE,
      question: `Điều nào sau đây **không** được chia sẻ bởi tất cả các thread trong một tiến trình?

- I. Program Counter
- II. Stack
- III. Registers
- IV. Address space`,
      options: ['I và II', 'II và III', 'IV', 'I, II và III'],
      answer: 3,
      explanation: `Mỗi thread cần chạy độc lập nên phải có **ngữ cảnh thực thi riêng**:
- **Program Counter** — mỗi thread đang ở một dòng lệnh khác nhau.
- **Stack** — mỗi thread có chuỗi lời gọi hàm và biến cục bộ riêng.
- **Registers** — trạng thái tính toán riêng, lưu/khôi phục khi chuyển thread.
- Thêm: **thread ID** và trạng thái thread.

Phần **dùng chung** của cả tiến trình:
- **Address space** (đoạn code, dữ liệu toàn cục, heap)
- File đang mở, tín hiệu, thông tin kế toán

Chính vì address space dùng chung mà thread giao tiếp rẻ hơn tiến trình — và cũng chính vì thế mà sinh ra race condition, phải đồng bộ.`,
    },
    {
      id: 'os-ll-14',
      topic: 'SJF',
      source: SOURCE,
      question:
        'Trên hệ thống sử dụng lập lịch **SJF non-preemptive**, các tiến trình có thời gian chạy dự kiến là 5, 18, 9 và 12 đang nằm trong hàng đợi sẵn sàng. Chúng nên được chạy theo thứ tự nào để giảm thiểu thời gian chờ đợi?',
      options: ['5, 9, 12, 18', '12, 18, 9, 5', '5, 12, 9, 18', '9, 12, 18, 5'],
      answer: 0,
      explanation: `Cả bốn tiến trình **đã có sẵn** trong hàng đợi nên SJF chỉ đơn giản là **sắp xếp tăng dần theo burst**: 5, 9, 12, 18.

Thời gian chờ của thứ tự này:
\`\`\`
5 → 9 → 12 → 18
chờ: 0   5   14   26      trung bình = 45/4 = 11.25
\`\`\`

Thử thứ tự giảm dần 18, 12, 9, 5 để thấy khác biệt: chờ 0, 18, 30, 39 → trung bình **21.75**, gần gấp đôi.

Lý do toán học: tiến trình chạy **thứ k** đóng góp thời gian của nó vào phần chờ của (n − k) tiến trình phía sau. Muốn tổng nhỏ nhất thì số lớn phải nhân với hệ số nhỏ nhất, tức là xếp sau cùng.`,
    },
    {
      id: 'os-ll-15',
      topic: 'Thread',
      source: SOURCE,
      question: 'Điều nào sau đây **không** được chia sẻ bởi các thread của cùng một tiến trình?',
      options: ['Stack', 'Address Space', 'Message Queue', 'File Descriptor Table'],
      answer: 0,
      explanation: `**Stack** là của riêng từng thread. Mỗi thread có chuỗi lời gọi hàm và biến cục bộ riêng, nên bắt buộc phải có ngăn xếp riêng — nếu dùng chung thì lời gọi hàm của thread này sẽ đè lên thread kia.

Ba thứ còn lại đều thuộc về **tiến trình**, mọi thread dùng chung:
- **Address Space** — code, dữ liệu toàn cục, heap.
- **File Descriptor Table** — thread này mở file, thread kia đọc được ngay bằng cùng fd.
- **Message Queue** và các tài nguyên IPC khác.

Nhớ gọn: **riêng** = ngăn xếp + thanh ghi + PC + thread ID; **chung** = mọi thứ còn lại.`,
    },
  ],
};
