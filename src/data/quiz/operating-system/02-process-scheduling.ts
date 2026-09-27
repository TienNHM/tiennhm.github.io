import type {QuizSet} from '@site/src/components/Quiz/types';

const SOURCE = 'Cuối kỳ HĐH – SPKT';

export const processScheduling: QuizSet = {
  id: 'os-process-scheduling',
  title: 'Chương 3–5: Tiến trình, luồng và lập lịch CPU',
  description: 'fork(), PCB, trạng thái tiến trình, thread, IPC và các thuật toán lập lịch FCFS, SJF, SRTF, Round Robin, Priority.',
  questions: [
    {
      id: 'os-ps-01',
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
      id: 'os-ps-02',
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
      id: 'os-ps-03',
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
      id: 'os-ps-04',
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
      id: 'os-ps-05',
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
      id: 'os-ps-06',
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
      id: 'os-ps-07',
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
      id: 'os-ps-08',
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
      id: 'os-ps-09',
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
      id: 'os-ps-10',
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
      id: 'os-ps-11',
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
      id: 'os-ps-12',
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
      id: 'os-ps-13',
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
      id: 'os-ps-14',
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
      id: 'os-ps-15',
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
    {
      id: 'os-ps-16',
      topic: 'Starvation',
      source: SOURCE,
      question:
        'Thuật toán lập lịch nào sau đây **có thể** gây starvation? (chọn tất cả đáp án đúng)',
      options: [
        'First-come, first-served',
        'Shortest job first',
        'Priority',
        'Round robin',
      ],
      answer: [1, 2],
      explanation: `Hai thủ phạm là **SJF** và **Priority** — cùng chung một lỗi: **tham lam theo một tiêu chí cố định**.

- **SJF**: job ngắn liên tục đến thì job dài không bao giờ tới lượt.
- **Priority**: tiến trình ưu tiên thấp bị tiến trình ưu tiên cao chen mãi. Chuyện có thật: năm 1973, khi tắt máy IBM 7094 ở MIT, người ta phát hiện một job nộp từ **1967** vẫn chưa chạy.

Hai thuật toán an toàn:
- **FCFS** phục vụ đúng thứ tự đến, chờ lâu nhất thì được chạy trước — không ai bị bỏ đói (dù có hiệu ứng convoy).
- **Round robin** cho mọi tiến trình một lát quantum trong mỗi vòng, nên thời gian chờ có cận trên rõ ràng.

Thuốc chữa chung cho cả hai: **aging** — tăng dần độ ưu tiên theo thời gian chờ.`,
    },
    {
      id: 'os-ps-17',
      topic: 'Tiêu chí lập lịch',
      source: SOURCE,
      question: 'Khái niệm nào mô tả **tổng thời gian để thực hiện xong một tiến trình cụ thể**?',
      options: ['CPU utilization', 'Response time', 'Turnaround time', 'Throughput'],
      answer: 2,
      explanation: `**Turnaround time** = thời điểm hoàn thành − thời điểm nộp vào hệ thống. Nó bao trọn mọi thứ tiến trình trải qua: chờ trong ready queue, chạy trên CPU, chờ I/O.

Phân biệt bốn khái niệm rất hay bị lẫn:
\`\`\`
Turnaround time = hoàn thành - đến          (tổng thời gian lưu lại hệ thống)
Waiting time    = turnaround - burst         (chỉ phần nằm chờ trong ready queue)
Response time   = lần đầu được chạy - đến    (chờ bao lâu mới thấy phản hồi đầu tiên)
Throughput      = số tiến trình xong / đơn vị thời gian
\`\`\`

**Response time** mới là thứ quan trọng với hệ tương tác: người dùng quan tâm bao lâu thì thấy phản hồi, không quan tâm khi nào chạy xong hẳn.`,
    },
    {
      id: 'os-ps-18',
      topic: 'Tiêu chí lập lịch',
      source: SOURCE,
      question: 'Phát biểu nào **đúng** về tiêu chí tối ưu của thuật toán lập lịch?',
      options: [
        'Throughput: Min, CPU utilization: Max',
        'CPU utilization: Min, Waiting time: Min',
        'Response time: Min, Turnaround time: Max',
        'Turnaround time: Min, CPU utilization: Max',
      ],
      answer: 3,
      explanation: `Nhớ theo hai nhóm, không bao giờ lẫn:
\`\`\`
TỐI ĐA (càng lớn càng tốt):  CPU utilization, Throughput
TỐI THIỂU (càng nhỏ càng tốt): Turnaround time, Waiting time, Response time
\`\`\`

Phương án **d** khớp đúng: turnaround time tối thiểu, CPU utilization tối đa.

Vì sao các phương án khác sai:
- **a** — throughput càng cao càng tốt, không phải Min.
- **b** — CPU rảnh là lãng phí, phải Max.
- **c** — turnaround time phải Min, không phải Max.

Mẹo nhớ: hai đại lượng đo **công suất hệ thống** thì tối đa, ba đại lượng đo **thời gian chờ đợi** thì tối thiểu.`,
    },
    {
      id: 'os-ps-19',
      topic: 'Multilevel Queue',
      source: SOURCE,
      question:
        'Trong **Multilevel Queue Scheduling**, loại tiến trình nào có độ ưu tiên **cao nhất**?',
      options: [
        'Interactive processes',
        'System processes',
        'Batch processes',
        'Real time processes',
      ],
      answer: 3,
      explanation: `Thứ tự ưu tiên chuẩn của hàng đợi đa cấp, từ cao xuống thấp:
\`\`\`
1. Real time processes      ← cao nhất, có deadline cứng
2. System processes         ← tiến trình của kernel
3. Interactive processes    ← tương tác với người dùng, cần response time thấp
4. Interactive editing processes
5. Batch processes          ← thấp nhất, chạy nền, không ai chờ
\`\`\`

Lý do **real time** đứng đầu: trễ deadline với hệ thống thời gian thực đồng nghĩa với **sai kết quả**, thậm chí nguy hiểm (phanh ABS, thiết bị y tế). Các loại khác trễ thì chỉ khó chịu chứ không sai.

Đặc điểm của multilevel queue: mỗi hàng đợi có **thuật toán lập lịch riêng** (hàng tương tác dùng RR, hàng batch dùng FCFS), và tiến trình **không chuyển giữa các hàng** — muốn chuyển thì phải dùng biến thể **multilevel feedback queue**.`,
    },
    {
      id: 'os-ps-20',
      topic: 'Lập lịch CPU',
      source: SOURCE,
      question:
        'CPU **bắt buộc** phải lập lịch lại khi tiến trình rơi vào trường hợp nào? (chọn tất cả đáp án đúng)',
      options: [
        'Switches from waiting to ready state',
        'Switches from running to waiting state',
        'Terminates',
        'Switches from running to ready state',
      ],
      answer: [1, 2],
      explanation: `Có **bốn thời điểm** phát sinh quyết định lập lịch, nhưng chỉ hai trong đó là **bắt buộc**:

\`\`\`
1. running → waiting   (chờ I/O)        ← BẮT BUỘC, CPU không còn ai chạy
2. running → ready     (hết quantum)     ← tuỳ chọn, chỉ có ở preemptive
3. waiting → ready     (I/O xong)        ← tuỳ chọn, chỉ có ở preemptive
4. Terminates          (kết thúc)        ← BẮT BUỘC, CPU trống
\`\`\`

Trường hợp **1** và **4** bắt buộc vì tiến trình đang chạy đã rời CPU, hệ thống **buộc phải chọn** người kế tiếp, nếu không CPU nằm không.

Trường hợp **2** và **3** chỉ xảy ra khi hệ thống cho phép **trưng dụng**: tiến trình đang chạy vẫn chạy được nhưng bị tước CPU. Lập lịch **non-preemptive** chỉ dùng đúng hai trường hợp bắt buộc.`,
    },
    {
      id: 'os-ps-21',
      topic: 'Lập lịch CPU',
      source: SOURCE,
      question: 'Thuật toán lập lịch nào sau đây là **preemptive**?',
      options: ['Priority', 'Round robin', 'Shortest job first', 'First-come, first-served'],
      answer: 1,
      explanation: `**Round robin luôn luôn là preemptive** — đó là bản chất của nó: hết quantum thì bộ định thời ngắt và tước CPU, không có phiên bản RR nào không trưng dụng.

Ba thuật toán còn lại:
- **FCFS** — luôn **non-preemptive**, chạy tới khi xong hoặc chờ I/O.
- **SJF** và **Priority** — **có cả hai biến thể**. SJF preemptive có tên riêng là **SRTF**; Priority preemptive thì tiến trình ưu tiên cao đến sẽ chiếm CPU ngay.

Vì đề hỏi thuật toán nào *là* preemptive mà không nói thêm, chỉ **Round robin** là đúng trong mọi trường hợp.`,
    },
    {
      id: 'os-ps-22',
      topic: 'SJF',
      source: SOURCE,
      question: `Cho hai phát biểu về **Shortest-Job-First (SJF)**:

- S1: Nó cho thời gian chờ trung bình nhỏ nhất
- S2: Nó có thể gây starvation

Phát biểu nào sau đây là **sai**?`,
      options: ['Neither S1 nor S2', 'Both S1 and S2', 'S1', 'S2'],
      answer: 0,
      explanation: `Đọc kỹ đề: câu hỏi tìm phát biểu **SAI**, mà cả **S1 và S2 đều ĐÚNG**:

- **S1 đúng** — SJF được chứng minh là tối ưu về thời gian chờ trung bình.
- **S2 đúng** — job dài bị job ngắn chen mãi, đúng là có thể starvation.

Vì cả hai đều đúng, phát biểu sai chính là câu phủ nhận cả hai: **"Neither S1 nor S2"**.

Đây là dạng câu hỏi bẫy bằng **hai lớp phủ định**. Cách làm an toàn: xác định đúng/sai của từng mệnh đề S1, S2 trước, rồi mới đối chiếu với từng phương án — đừng đọc phương án trước.`,
    },
    {
      id: 'os-ps-23',
      topic: 'SRTF',
      source: SOURCE,
      question:
        'Dùng thuật toán lập lịch **SJF preemptive (SRTF)**, thời gian chờ trung bình của ba tiến trình trong bảng là bao nhiêu?',
      code: `Process   Arrival time   Burst Time
P0        0 ms           9 ms
P1        1 ms           4 ms
P2        2 ms           9 ms`,
      options: ['6.33 ms', '5 ms', '7.33 ms', '5.33 ms'],
      answer: 1,
      explanation: `\`\`\`
 P0 |   P1   |        P0        |        P2
0   1        5                 13                 22
\`\`\`

- t=1: P1 (4) < P0 còn 8 → trưng dụng.
- t=2: P2 (9) > P1 còn 3 → P1 chạy tiếp, xong tại t=5.
- t=5: P0 còn 8 < P2 còn 9 → P0 chạy tới 13, rồi P2 tới 22.

Thời gian chờ = *hoàn thành − đến − burst*:
- P0 = 13 − 0 − 9 = **4**
- P1 = 5 − 1 − 4 = **0**
- P2 = 22 − 2 − 9 = **11**

Trung bình = (4 + 0 + 11) / 3 = **5 ms**.

P2 chịu thiệt nặng nhất (chờ 11 ms) dù chỉ đến sau P0 hai đơn vị — đây chính là mặt trái của SJF: tiến trình dài luôn bị đẩy xuống cuối.`,
    },
    {
      id: 'os-ps-24',
      topic: 'Tiến trình',
      source: SOURCE,
      question: 'Mỗi tiến trình trong hệ điều hành đều có _____ của riêng nó.',
      options: [
        'all of the mentioned',
        'address space and global variables',
        'pending alarms, signals and signal handlers',
        'open files',
      ],
      answer: 0,
      explanation: `**Tất cả những thứ được liệt kê** đều thuộc riêng từng tiến trình, vì tiến trình là đơn vị **cô lập** của hệ điều hành:
- **Không gian địa chỉ và biến toàn cục** — tiến trình này không thấy bộ nhớ của tiến trình kia.
- **Báo thức đang chờ, tín hiệu và trình xử lý tín hiệu** — mỗi tiến trình đăng ký riêng.
- **File đang mở** — bảng mô tả file (file descriptor table) riêng cho từng tiến trình.

Đối chiếu với **thread**: các thread trong cùng tiến trình **dùng chung** đúng ba thứ trên, chỉ giữ riêng ngăn xếp, thanh ghi và program counter. Đó là lý do thread nhẹ hơn nhưng nguy hiểm hơn.`,
    },
    {
      id: 'os-ps-25',
      topic: 'Tiến trình',
      source: SOURCE,
      question: 'Một tiến trình có thể bị kết thúc vì lý do nào?',
      options: [
        'signals and signal handlers',
        'waiting another process',
        'killed by another process and normal exit',
        'pending alarm',
      ],
      answer: 2,
      explanation: `Bốn cách một tiến trình kết thúc, chia làm hai nhóm:

**Tự nguyện**
- *Normal exit* — chạy xong, gọi \`exit()\`.
- *Error exit* — tự phát hiện lỗi rồi thoát.

**Không tự nguyện**
- *Fatal error* — lỗi nghiêm trọng như chia cho 0, truy cập bộ nhớ trái phép.
- *Killed by another process* — bị tiến trình khác gọi \`kill()\`, tất nhiên phải đủ quyền.

Phương án **"waiting another process"** sai hoàn toàn: chờ là trạng thái **waiting**, tiến trình vẫn sống nguyên.`,
    },
    {
      id: 'os-ps-26',
      topic: 'Trạng thái tiến trình',
      source: SOURCE,
      question: 'Tiến trình ở trạng thái **ready** nghĩa là gì?',
      options: [
        'pending alarm',
        'when process is using the CPU',
        'when process is unable to run until some task has been completed',
        'when process is scheduled to run after some execution',
      ],
      answer: 3,
      explanation: `**Ready** = tiến trình **đã sẵn sàng chạy, chỉ còn chờ tới lượt CPU**. Nó không thiếu gì cả, không chờ I/O, chỉ chờ bộ lập lịch gọi tên.

Đối chiếu với hai phương án nhiễu:
- *"using the CPU"* là trạng thái **running**.
- *"unable to run until some task has been completed"* là trạng thái **waiting/blocked** — đang chờ I/O hoặc sự kiện.

Điểm mấu chốt để phân biệt: tiến trình **ready** thiếu **CPU**, tiến trình **waiting** thiếu **sự kiện hoặc tài nguyên**. Cho CPU cho tiến trình waiting cũng vô ích vì nó vẫn không chạy được.`,
    },
    {
      id: 'os-ps-27',
      topic: 'IPC',
      source: SOURCE,
      question: '**Interprocess communication** là gì?',
      options: [
        'communication between two threads of same process',
        'communication within the process',
        'communication between two process',
        'communication of many processes',
      ],
      answer: 2,
      explanation: `**IPC là giao tiếp giữa hai tiến trình** — hai thực thể có không gian địa chỉ **tách biệt**, nên bắt buộc phải nhờ hệ điều hành làm trung gian.

Vì sao không phải các phương án kia:
- Giao tiếp giữa **hai thread cùng tiến trình** không cần IPC, chúng dùng chung bộ nhớ nên chỉ cần biến chung và cơ chế đồng bộ.
- *"Communication within the process"* là trao đổi nội bộ, không phải IPC.

Cơ chế IPC thường gặp: **pipe**, **message queue**, **shared memory**, **socket**, **signal**.`,
    },
    {
      id: 'os-ps-28',
      topic: 'fork()',
      source: SOURCE,
      question: 'Tiến trình chạy đoạn mã dưới đây. **Tổng số tiến trình con** được tạo ra là bao nhiêu?',
      code: `for (i = 0; i < n; i++)
    fork();`,
      options: ['2^(n+1) − 1', '2^n', '2^n − 1', 'n'],
      answer: 2,
      explanation: `Mỗi lần gọi \`fork()\`, **mọi tiến trình đang tồn tại** đều nhân đôi:
\`\`\`
Sau vòng 1:  2 tiến trình
Sau vòng 2:  4 tiến trình
...
Sau vòng n:  2^n tiến trình
\`\`\`

Trong 2^n tiến trình đó có **1 tiến trình cha ban đầu**, nên số **tiến trình con** được tạo ra là **2^n − 1**.

Kiểm chứng với n = 2: tổng 4 tiến trình, trừ cha gốc còn **3 con**. Đếm tay cũng ra 3: cha tạo 2 con (một ở mỗi vòng), con đầu tiên tạo thêm 1 con ở vòng hai.

Đọc kỹ đề để khỏi sai: hỏi **số tiến trình con** thì trả lời 2^n − 1, hỏi **tổng số tiến trình** thì là 2^n.`,
    },
    {
      id: 'os-ps-29',
      topic: 'fork()',
      source: SOURCE,
      question: `Xét đoạn mã dưới đây. Gọi **u, v** là hai giá trị do tiến trình **cha** in ra, **x, y** là hai giá trị do tiến trình **con** in ra. Phát biểu nào **đúng**?`,
      code: `if (fork() == 0) {
    a = a + 5;
    printf("%d, %d\\n", a, &a);
} else {
    a = a - 5;
    printf("%d, %d\\n", a, &a);
}`,
      options: [
        'u = x + 10 và v != y',
        'u + 10 = x và v = y',
        'u + 10 = x và v != y',
        'u = x + 10 và v = y',
      ],
      answer: 1,
      explanation: `**Về giá trị a:** \`fork()\` trả 0 ở con nên con chạy nhánh \`a + 5\`, cha chạy nhánh \`a - 5\`.
\`\`\`
x = a + 5
u = a - 5
→ x - u = 10   →   u + 10 = x
\`\`\`

**Về địa chỉ &a:** hai tiến trình in ra **địa chỉ ảo**, mà con là bản sao y hệt cha nên biến \`a\` nằm ở **cùng một địa chỉ ảo** trong cả hai. Vậy **v = y**.

Điểm bẫy nằm ở đây: hai địa chỉ ảo bằng nhau nhưng **địa chỉ vật lý lại khác nhau** — cơ chế copy-on-write cấp cho con một khung trang riêng ngay khi nó ghi vào \`a\`. Chương trình chỉ nhìn thấy địa chỉ ảo nên in ra giá trị giống nhau.`,
    },
    {
      id: 'os-ps-30',
      topic: 'Tiến trình',
      source: SOURCE,
      question: 'Ngăn xếp (stack) của một tiến trình **không** chứa thứ nào sau đây?',
      options: ['Function parameters', 'PID of child process', 'Return addresses', 'Local variables'],
      answer: 1,
      explanation: `Ngăn xếp chứa các **stack frame** sinh ra khi gọi hàm, gồm: **tham số hàm**, **địa chỉ trả về**, **biến cục bộ** và giá trị thanh ghi cần lưu.

**PID của tiến trình con** không nằm trong stack — nó do kernel quản lý, lưu trong **PCB**. Chương trình chỉ nhận được PID như *giá trị trả về* của \`fork()\`; nếu lập trình viên gán nó vào một biến cục bộ thì biến đó mới nằm trên stack, còn bản thân thông tin quan hệ cha–con là của hệ điều hành.

Bố cục bộ nhớ của tiến trình, nhớ theo bốn tầng:
\`\`\`
Stack  - khung lời gọi hàm, lớn dần xuống dưới
Heap   - cấp phát động (malloc/new), lớn dần lên trên
Data   - biến toàn cục và static
Text   - mã lệnh chương trình
\`\`\``,
    },
    {
      id: 'os-ps-31',
      topic: 'System call',
      source: SOURCE,
      question:
        'System call nào được tiến trình **cha** dùng để biết tiến trình **con** đã kết thúc?',
      options: ['wait', 'fork', 'get', 'exit'],
      answer: 0,
      explanation: `\`wait()\` chặn tiến trình cha cho tới khi một tiến trình con kết thúc, rồi trả về **PID của con** cùng **mã thoát** của nó.

Bộ ba system call quản lý tiến trình trên UNIX:
\`\`\`
fork()  - tạo tiến trình con
exec()  - nạp chương trình mới đè lên tiến trình hiện tại
wait()  - cha chờ con kết thúc và thu dọn
exit()  - tiến trình tự kết thúc
\`\`\`

Vì sao \`wait()\` là bắt buộc chứ không phải tuỳ chọn: nếu cha không gọi \`wait()\`, mục PCB của con đã chết vẫn nằm lại trong bảng tiến trình để giữ mã thoát — đó là **tiến trình zombie**. Nhiều zombie sẽ làm đầy bảng tiến trình của hệ thống.`,
    },
    {
      id: 'os-ps-32',
      topic: 'PCB',
      source: SOURCE,
      question:
        'Địa chỉ của **lệnh kế tiếp** mà tiến trình hiện tại sẽ thực thi được cung cấp bởi thành phần nào?',
      options: ['CPU registers', 'Process stack', 'Program counter', 'Pipe'],
      answer: 2,
      explanation: `**Program counter (PC)** — còn gọi là instruction pointer — luôn giữ địa chỉ của **lệnh kế tiếp** sẽ được nạp và thực thi.

Khi chuyển ngữ cảnh, PC là giá trị **quan trọng nhất phải lưu** vào PCB: thiếu nó thì tiến trình không biết chạy tiếp từ đâu khi được cấp CPU trở lại.

Phân biệt với các phương án khác:
- **CPU registers** giữ dữ liệu đang tính toán, không phải địa chỉ lệnh kế tiếp. (PC về mặt kỹ thuật cũng là một thanh ghi, nhưng đề hỏi cụ thể thành phần nào nên phải chọn PC.)
- **Process stack** giữ **địa chỉ trả về** của các lời gọi hàm — là nơi *quay về sau khi hàm kết thúc*, khác với lệnh kế tiếp ngay bây giờ.`,
    },
    {
      id: 'os-ps-33',
      topic: 'Hàng đợi',
      source: SOURCE,
      question: 'Trong các hàng đợi của tiến trình, cái nào **không tồn tại**?',
      options: ['PCB queue', 'Job Queue', 'Ready Queue', 'Device Queue'],
      answer: 0,
      explanation: `Ba hàng đợi thật sự tồn tại trong hệ điều hành:
\`\`\`
Job queue     - TẤT CẢ tiến trình trong hệ thống
Ready queue   - tiến trình đang nằm trong bộ nhớ, sẵn sàng chạy, chờ CPU
Device queue  - tiến trình đang chờ một thiết bị I/O cụ thể (mỗi thiết bị một hàng)
\`\`\`

**PCB queue** không phải tên của hàng đợi nào. PCB là **cấu trúc dữ liệu mô tả một tiến trình**, và chính các PCB được móc nối với nhau để **tạo thành** những hàng đợi ở trên — nó là thành phần, không phải hàng đợi.

Tiến trình di chuyển giữa các hàng: ready → (được cấp CPU) running → xin I/O → device queue → I/O xong → quay lại ready.`,
    },
    {
      id: 'os-ps-34',
      topic: 'Hàng đợi',
      source: SOURCE,
      question: 'Khi tiến trình phát ra một **yêu cầu I/O** thì điều gì xảy ra?',
      options: [
        'It is placed in a waiting queue',
        'It is placed in an I/O queue',
        'It is placed in the ready queue',
        'It is placed in the Job queue',
      ],
      answer: 1,
      explanation: `Tiến trình được đưa vào **I/O queue (device queue)** của đúng thiết bị mà nó yêu cầu, và chuyển sang trạng thái **waiting**. Mỗi thiết bị có hàng đợi riêng vì mỗi thiết bị phục vụ với tốc độ khác nhau.

Vòng đời một yêu cầu I/O:
\`\`\`
running → phát yêu cầu I/O → vào device queue, trạng thái waiting
        → thiết bị phục vụ xong, phát ngắt
        → trở lại READY queue, chờ CPU
        → running
\`\`\`

Lưu ý tiến trình **không** quay thẳng về running sau khi I/O xong: nó phải xếp hàng lại ở ready queue như mọi tiến trình khác.`,
    },
    {
      id: 'os-ps-35',
      topic: 'PCB',
      source: SOURCE,
      question: 'Process Control Block (PCB) chứa thứ nào sau đây?',
      options: [
        'bootstrap program and Program Counter',
        'Code and bootstrap program',
        'Code and data',
        'Process State and debug',
      ],
      answer: 2,
      explanation: `Đáp án đề là **Code and data**.

**Lưu ý:** theo giáo trình, PCB **không chứa code và data** của tiến trình. PCB chỉ giữ **siêu dữ liệu** để hệ điều hành quản lý:
\`\`\`
- Process state (new/ready/running/waiting/terminated)
- Program counter, các thanh ghi CPU
- Thông tin lập lịch (độ ưu tiên, con trỏ hàng đợi)
- Thông tin quản lý bộ nhớ (thanh ghi base/limit, bảng trang)
- Thông tin kế toán, danh sách file đang mở
\`\`\`
Code và data nằm trong **không gian địa chỉ** của tiến trình (vùng text và data), PCB chỉ **trỏ tới** chúng qua thông tin quản lý bộ nhớ. Cách hiểu duy nhất cho đáp án của đề là xem PCB theo nghĩa rộng "process image" = PCB + code + data + stack.

Đi thi chọn theo đề, nhưng khi bị hỏi "PCB **không** chứa gì" thì nhớ rằng câu trả lời kinh điển là **bootstrap program**.`,
    },
    {
      id: 'os-ps-36',
      topic: 'Trạng thái tiến trình',
      source: SOURCE,
      question: 'Điều gì **định nghĩa trạng thái** của một tiến trình?',
      options: [
        'the current activity of the process',
        'the final activity of the process',
        'the activity just executed by the process',
        'the activity to next be executed by the process',
      ],
      answer: 0,
      explanation: `Định nghĩa trong giáo trình: *"The state of a process is defined in part by the **current activity** of that process."*

Trạng thái mô tả tiến trình **đang làm gì ngay lúc này** — đang chạy trên CPU, đang chờ CPU, hay đang chờ I/O. Nó là ảnh chụp hiện tại, không phải quá khứ (*activity just executed*) cũng không phải tương lai (*activity to next be executed*).

Năm trạng thái: **new → ready ⇄ running → terminated**, cộng nhánh **running → waiting → ready**.`,
    },
    {
      id: 'os-ps-37',
      topic: 'Trạng thái tiến trình',
      source: SOURCE,
      question: 'Cặp nào sau đây **đều là trạng thái** của một tiến trình?',
      options: ['running and exit', 'waiting and exit', 'new and running', 'new and exit'],
      answer: 2,
      explanation: `Năm trạng thái chuẩn: **new, ready, running, waiting, terminated**.

Chỉ cặp **new and running** có cả hai phần tử đều là trạng thái hợp lệ. Ba phương án còn lại đều chứa **exit**, mà *exit* là **hành động** (lời gọi \`exit()\` để kết thúc tiến trình), không phải tên trạng thái — trạng thái tương ứng gọi là **terminated**.

Đây là kiểu câu hỏi kiểm tra thuật ngữ: chỉ cần nhớ đúng năm cái tên là loại được ngay ba phương án.`,
    },
    {
      id: 'os-ps-38',
      topic: 'IPC',
      source: SOURCE,
      question: 'Hai mô hình giao tiếp giữa các tiến trình (IPC) là gì?',
      options: [
        'shared memory and message passing',
        'creation and shared memory',
        'shared memory and message termination',
        'shared memory and token passing',
      ],
      answer: 0,
      explanation: `Hai mô hình cơ bản, khác nhau ở chỗ ai làm việc nặng:

**Shared memory** — các tiến trình thoả thuận một vùng nhớ chung.
- Hệ điều hành chỉ can thiệp lúc **thiết lập** vùng nhớ; sau đó hai bên đọc ghi trực tiếp nên **rất nhanh**.
- Đổi lại, lập trình viên **tự lo đồng bộ** bằng semaphore/mutex, và đây là nơi bài toán producer–consumer sinh ra.

**Message passing** — trao đổi qua hai thao tác \`send()\` và \`receive()\`.
- Mọi thông điệp đi qua kernel nên **chậm hơn**, nhưng **không cần lo race condition**.
- Hoạt động được cả khi hai tiến trình nằm trên **hai máy khác nhau** — đây là nền của socket và hệ phân tán.`,
    },
    {
      id: 'os-ps-39',
      topic: 'Trạng thái tiến trình',
      source: SOURCE,
      question:
        'Hành động nào chuyển tiến trình từ trạng thái **waiting** sang trạng thái **ready**?',
      options: ['I/O or event wait', 'I/O or event complete', 'Scheduler', 'Interrupt'],
      answer: 1,
      explanation: `Tiến trình vào **waiting** vì đang chờ một việc gì đó; khi việc đó **hoàn tất** (I/O xong, sự kiện xảy ra) nó mới được đưa trở lại **ready queue**.

Cặp chuyển trạng thái đối xứng cần nhớ:
\`\`\`
running → waiting :  I/O or event WAIT      (bắt đầu chờ)
waiting → ready   :  I/O or event COMPLETE  (chờ xong)
ready   → running :  scheduler dispatch
running → ready   :  interrupt / hết quantum
\`\`\`

Hai phương án nhiễu đều là câu trả lời của **chuyển trạng thái khác**: *scheduler* đưa tiến trình từ ready sang running, còn *interrupt* đá tiến trình từ running về ready.

Lưu ý tiến trình **không** nhảy thẳng từ waiting sang running — I/O xong thì vẫn phải xếp hàng chờ CPU như mọi tiến trình khác.`,
    },
    {
      id: 'os-ps-40',
      topic: 'IPC',
      source: SOURCE,
      question:
        'Trong cài đặt **liên kết truyền thông (communication link)** giữa các tiến trình, đâu là **liên kết logic**?',
      options: ['Network', 'Hardware', 'Indirect or Direct', 'Shared memory'],
      answer: 2,
      explanation: `Liên kết truyền thông được cài đặt ở **hai tầng**:
\`\`\`
Vật lý (physical) : bộ nhớ chia sẻ, bus phần cứng, mạng
Logic (logical)   : direct hay indirect, đồng bộ hay bất đồng bộ,
                    dung lượng đệm tự động hay tường minh
\`\`\`

**Direct communication** — hai bên gọi tên nhau tường minh: \`send(P, message)\`, \`receive(Q, message)\`.

**Indirect communication** — trao đổi qua một **mailbox / port** trung gian: \`send(A, message)\`, \`receive(A, message)\`. Nhờ có trung gian mà nhiều tiến trình có thể cùng dùng một hộp thư và hai bên không cần biết nhau.

Đây chính là câu hỏi phân biệt *cách tổ chức giao tiếp* (logic) với *phương tiện truyền* (vật lý).`,
    },
    {
      id: 'os-ps-41',
      topic: 'fork()',
      source: SOURCE,
      question: 'Đầu ra tại **LINE A** của chương trình dưới đây là gì?',
      code: `int value = 5;

int main()
{
    pid_t pid;
    pid = fork();

    if (pid == 0) {          /* child process */
        value += 15;
        return 0;
    }
    else if (pid > 0) {      /* parent process */
        wait(NULL);
        printf("PARENT: value = %d", value);   /* LINE A */
        return 0;
    }
}`,
      options: ['0', '15', '20', '5'],
      answer: 3,
      explanation: `Kết quả là **5** — giá trị ban đầu, không hề thay đổi.

Lý do: \`fork()\` tạo cho con một **bản sao độc lập** của toàn bộ không gian địa chỉ. Khi con chạy \`value += 15\`, nó sửa **bản sao của riêng nó**, biến \`value\` trong tiến trình cha không bị ảnh hưởng.

\`wait(NULL)\` chỉ khiến cha **chờ con kết thúc** rồi mới in — nó đồng bộ thời điểm, **không đồng bộ dữ liệu**. Dù có chờ hay không, cha vẫn in ra 5.

Đây là khác biệt cốt lõi giữa **tiến trình** và **luồng**: nếu \`value += 15\` chạy trong một thread của cùng tiến trình thì kết quả in ra sẽ là **20**, vì thread dùng chung vùng dữ liệu.`,
    },
    {
      id: 'os-ps-42',
      topic: 'fork()',
      source: SOURCE,
      question:
        'Xác định giá trị của **pid** tại các dòng A, B, C, D. Giả sử pid thật của **cha là 2600** và của **con là 2603**.',
      code: `pid = fork();

if (pid < 0) {               /* error occurred */
    fprintf(stderr, "Fork Failed");
    return 1;
}
else if (pid == 0) {         /* child process */
    pid1 = getpid();
    printf("child: pid = %d", pid);     /* A */
    printf("child: pid1 = %d", pid1);   /* B */
}
else {                       /* parent process */
    pid1 = getpid();
    printf("parent: pid = %d", pid);    /* C */
    printf("parent: pid1 = %d", pid1);  /* D */
    wait(NULL);
}`,
      options: [
        'A=0, B=2600, C=2603, D=2600',
        'A=0, B=2600, C=2603, D=2603',
        'A=0, B=2603, C=2600, D=2600',
        'A=0, B=2603, C=2603, D=2600',
      ],
      answer: 3,
      explanation: `Chỉ cần nắm hai quy tắc:
- \`fork()\` trả **0 cho con**, trả **PID của con cho cha**.
- \`getpid()\` trả **PID của chính tiến trình đang gọi**.

Áp vào từng dòng:
\`\`\`
A (con):  pid  = giá trị fork() trả cho con  = 0
B (con):  pid1 = getpid() của con            = 2603
C (cha):  pid  = giá trị fork() trả cho cha  = 2603  (PID của con)
D (cha):  pid1 = getpid() của cha            = 2600
\`\`\`

Điểm dễ nhầm nhất là **C**: nhiều người tưởng cha in ra PID của chính mình (2600), nhưng \`pid\` ở đây là **giá trị trả về của fork()**, tức PID của đứa con. Đây cũng chính là cách cha biết con mình là ai để sau này gọi \`wait()\` hay \`kill()\`.`,
    },
    {
      id: 'os-ps-43',
      topic: 'Thread',
      source: SOURCE,
      question:
        'Thành phần nào của trạng thái chương trình được **chia sẻ giữa các thread** trong một tiến trình đa luồng? (chọn tất cả đáp án đúng)',
      options: [
        'Stack memory',
        'Local variables',
        'Register values',
        'Heap memory',
        'Global variables',
      ],
      answer: [3, 4],
      explanation: `**Heap memory** và **global variables** được chia sẻ, vì cả hai nằm trong **không gian địa chỉ chung** của tiến trình.

\`\`\`
DÙNG CHUNG (thuộc tiến trình)      RIÊNG (thuộc từng thread)
- Heap (malloc/new)                - Stack
- Biến toàn cục và static          - Biến cục bộ (nằm trên stack)
- Vùng code                        - Giá trị thanh ghi, program counter
- File đang mở, tín hiệu           - Thread ID
\`\`\`

Quy tắc suy luận nhanh: thứ gì cần cho **luồng thực thi độc lập** thì phải riêng (stack, thanh ghi, PC); thứ gì là **dữ liệu của chương trình** thì dùng chung.

Chính vì heap và biến toàn cục dùng chung mà đa luồng vừa mạnh vừa nguy hiểm: trao đổi dữ liệu miễn phí, nhưng phải tự bảo vệ bằng mutex nếu không muốn dính race condition.`,
    },
    {
      id: 'os-ps-44',
      topic: 'fork()',
      source: SOURCE,
      question:
        'Đoạn mã dưới đây tạo ra bao nhiêu **tiến trình** và bao nhiêu **luồng** (tính cả tiến trình ban đầu)?',
      code: `pid_t pid;
pid = fork();

if (pid == 0) {          /* child process */
    fork();
    thread_create( . . .);
}

fork();`,
      options: [
        '6 processes and 2 threads',
        '8 processes and 2 threads',
        '3 processes and 2 threads',
        '2 processes and 6 threads',
      ],
      answer: 0,
      explanation: `Lần theo từng bước:
\`\`\`
Ban đầu                : P0
fork() thứ nhất        : P0, P1            → 2 tiến trình
   (chỉ con P1 vào nhánh if)
fork() trong nhánh if  : P1 tách ra P2      → 3 tiến trình
thread_create()        : P1 và P2 mỗi bên tạo 1 luồng → 2 LUỒNG
fork() cuối cùng       : P0, P1, P2 mỗi bên tách 1 con
                         → thêm 3 tiến trình → 6 TIẾN TRÌNH
\`\`\`

Hai chỗ dễ sai:
- \`fork()\` **cuối cùng nằm ngoài khối if** nên **mọi tiến trình** đều chạy, kể cả P0.
- Ba tiến trình sinh ra ở bước cuối **không tạo thêm luồng**, vì \`thread_create()\` đã chạy xong trước đó.

Đáp án: **6 tiến trình và 2 luồng**.`,
    },
    {
      id: 'os-ps-45',
      topic: 'Trạng thái tiến trình',
      source: SOURCE,
      question: 'Tiến trình có bao nhiêu trạng thái?',
      options: ['6', '4', '5', '3'],
      answer: 2,
      explanation: `**5 trạng thái**: **New → Ready → Running → Waiting → Terminated**.

\`\`\`
New         - đang được tạo, chưa nạp vào bộ nhớ
Ready       - sẵn sàng chạy, chỉ chờ CPU
Running     - đang chiếm CPU
Waiting     - chờ I/O hoặc một sự kiện
Terminated  - đã kết thúc
\`\`\`

Một số tài liệu mở rộng thành 7 trạng thái khi tính thêm **suspended-ready** và **suspended-waiting** (tiến trình bị swap ra đĩa), nhưng mô hình chuẩn của môn học là **5**.`,
    },
    {
      id: 'os-ps-46',
      topic: 'Trạng thái tiến trình',
      source: SOURCE,
      question:
        'Khi tiến trình **được cấp CPU và tài nguyên** thì nó chuyển từ trạng thái nào sang trạng thái nào?',
      options: [
        'Running – Terminated',
        'Ready - Running',
        'New - Running',
        'Running - Waiting',
      ],
      answer: 1,
      explanation: `**Ready → Running**, và hành động thực hiện việc này gọi là **dispatch** do bộ lập lịch (scheduler) kích hoạt.

Tiến trình ở **ready** nghĩa là đã có đủ mọi thứ, chỉ thiếu CPU. Khi bộ lập lịch chọn nó và bộ điều phối (dispatcher) nạp ngữ cảnh vào CPU, nó bước sang **running**.

Chú ý **New → Running là không hợp lệ**: tiến trình mới tạo bắt buộc phải qua trạng thái **ready** và xếp hàng như mọi tiến trình khác, không có đường tắt.`,
    },
    {
      id: 'os-ps-47',
      topic: 'Trạng thái tiến trình',
      source: SOURCE,
      question:
        'Tiến trình đang ở trạng thái **Running** **không thể** chuyển sang trạng thái nào sau đây?',
      options: ['New', 'Terminated', 'Waiting', 'Ready'],
      answer: 0,
      explanation: `Không có đường nào quay về **New**, vì **New là trạng thái khởi điểm** — tiến trình chỉ đi qua nó đúng một lần lúc được tạo ra. Đã chạy rồi thì không thể "sinh ra lại".

Ba đường hợp lệ từ **Running**:
\`\`\`
Running → Terminated : chạy xong hoặc bị kill
Running → Waiting    : xin I/O, tự nguyện nhường CPU
Running → Ready      : bị trưng dụng (hết quantum, có tiến trình ưu tiên cao hơn)
\`\`\`

Nhìn tổng thể, đồ thị trạng thái chỉ có **một mũi tên đi ra từ New** (sang Ready) và **không mũi tên nào đi vào New**.`,
    },
    {
      id: 'os-ps-48',
      topic: 'Trạng thái tiến trình',
      source: SOURCE,
      question:
        'Tiến trình đang **Running** và **hết hạn thời gian được cấp (time slice expired)** thì chuyển sang trạng thái nào?',
      options: ['Terminated', 'Ready', 'Waiting', 'New'],
      answer: 1,
      explanation: `Chuyển sang **Ready** — tiến trình vẫn còn việc để làm và vẫn chạy được, nó chỉ **mất lượt CPU**, nên quay lại xếp hàng chờ lượt sau.

Đây chính là cung **Running → Ready**, dấu hiệu đặc trưng của lập lịch **preemptive** (Round Robin, SRTF, Priority preemptive).

Đừng nhầm với **Waiting**: tiến trình vào waiting khi **thiếu một thứ gì đó** (dữ liệu I/O, tín hiệu) nên cấp CPU cũng vô ích. Còn tiến trình hết quantum thì **không thiếu gì cả**, chỉ cần tới lượt là chạy ngay.`,
    },
    {
      id: 'os-ps-49',
      topic: 'FCFS',
      source: SOURCE,
      question:
        'Tính **thời gian chờ** của P1, P2, P3, P4 khi dùng thuật toán **FCFS** (các tiến trình cùng đến tại thời điểm 0).',
      code: `Tiến trình   Thời gian xử lý
P1           8
P2           4
P3           6
P4           2`,
      options: ['0; 8; 12; 18', '0; 8; 14; 20', '8; 12; 18; 28', '18; 8; 12; 18'],
      answer: 0,
      explanation: `FCFS chạy đúng thứ tự P1 → P2 → P3 → P4:
\`\`\`
    P1     |  P2  |   P3   | P4
0          8     12       18   20
\`\`\`

Vì tất cả cùng đến lúc 0, thời gian chờ của mỗi tiến trình **chính là thời điểm nó bắt đầu chạy**:
\`\`\`
P1 = 0
P2 = 8        (= 8)
P3 = 8 + 4    = 12
P4 = 8+4+6    = 18
\`\`\`

Trung bình = (0 + 8 + 12 + 18)/4 = **9.5**.

Để thấy FCFS dở thế nào: nếu xếp theo SJF (P4, P2, P3, P1) thì thời gian chờ trung bình chỉ còn (0+2+6+12)/4 = **5**.`,
    },
    {
      id: 'os-ps-50',
      topic: 'SJF',
      source: SOURCE,
      question:
        'Tính **thời gian chờ** của P1, P2, P3, P4 khi dùng **SJF non-preemptive**.',
      code: `Tiến trình   Thời gian xử lý   Thời gian đến
P1           8                 0
P2           4                 3
P3           6                 5
P4           2                 9`,
      options: ['0; 5; 9; 3', '5; 9; 3; 0', '0; 3; 5; 9', '0; 3; 9; 5'],
      answer: 0,
      explanation: `\`\`\`
    P1      |  P2  | P4 |   P3
0           8     12   14        20
\`\`\`

- t=0: chỉ có P1 → chạy trọn 8.
- t=8: hàng đợi có P2 (4) và P3 (6); P4 chưa đến kịp? P4 đến lúc 9 nên **chưa có mặt** → chọn P2 ngắn hơn, chạy 8→12.
- t=12: P3 (6) và P4 (2, đã đến lúc 9) → chọn **P4**, chạy 12→14.
- t=14: còn P3, chạy 14→20.

Thời gian chờ = *bắt đầu chạy − đến*:
\`\`\`
P1 = 0  - 0 = 0
P2 = 8  - 3 = 5
P3 = 14 - 5 = 9
P4 = 12 - 9 = 3
\`\`\`

Chỗ dễ sai nhất là bước t=8: phải kiểm tra **tiến trình nào đã thật sự đến**, không được chọn P4 chỉ vì nó ngắn nhất trong bảng.`,
    },
    {
      id: 'os-ps-51',
      topic: 'SRTF',
      source: SOURCE,
      question: 'Tính **thời gian chờ** của P1, P2, P3, P4 khi dùng **SJF preemptive (SRTF)**.',
      code: `Tiến trình   Thời gian xử lý   Thời gian đến
P1           8                 0
P2           4                 3
P3           6                 5
P4           2                 9`,
      options: ['6; 0; 9; 0', '0; 5; 9; 1', '4; 3; 6; 9', '0; 3; 5; 0'],
      answer: 0,
      explanation: `\`\`\`
  P1  |   P2   |  P1  | P4 |  P1  |    P3
0     3        7      9    11     14        20
\`\`\`

- t=3: P2 (4) < P1 còn 5 → trưng dụng. P2 chạy tới 7 (t=5 P3 đến với 6 > P2 còn 2, không trưng dụng).
- t=7: P1 còn 5 < P3 (6) → P1 chạy tiếp.
- t=9: P4 (2) < P1 còn 3 → trưng dụng, P4 chạy 9→11.
- t=11: P1 còn 3 < P3 (6) → P1 chạy 11→14, rồi P3 14→20.

Thời gian chờ = *hoàn thành − đến − burst*:
\`\`\`
P1 = 14 - 0 - 8 = 6
P2 = 7  - 3 - 4 = 0
P3 = 20 - 5 - 6 = 9
P4 = 11 - 9 - 2 = 0
\`\`\`

Trung bình 3.75, tốt hơn SJF không trưng dụng (4.25) ở câu trên — đúng như lý thuyết.`,
    },
    {
      id: 'os-ps-52',
      topic: 'Round Robin',
      source: SOURCE,
      question:
        'Tính **thời gian chờ** của P1, P2, P3, P4 khi dùng **Round Robin với quantum = 3** (các tiến trình cùng đến tại thời điểm 0).',
      code: `Tiến trình   Thời gian xử lý     quantum = 3
P1           8
P2           4
P3           6
P4           2`,
      options: ['12; 9; 11; 12', '12; 11; 12; 9', '12; 13; 14; 15', '9; 12; 12; 11'],
      answer: 1,
      explanation: `\`\`\`
 P1 | P2 | P3 | P4 | P1 |P2| P3 | P1
0   3    6    9   11   14 15   18   20
\`\`\`

Vòng 1: P1 (rem 5), P2 (rem 1), P3 (rem 3), P4 chỉ cần 2 nên **xong tại t=11**.
Vòng 2: P1 11→14 (rem 2), P2 14→15 **xong**, P3 15→18 **xong**.
Vòng 3: P1 18→20 **xong**.

Thời gian chờ = *hoàn thành − burst* (vì mọi tiến trình đều đến lúc 0):
\`\`\`
P1 = 20 - 8 = 12
P2 = 15 - 4 = 11
P3 = 18 - 6 = 12
P4 = 11 - 2 = 9
\`\`\`

Nhận xét: trung bình 11, **tệ hơn FCFS** (9.5) ở cùng bộ dữ liệu. Round Robin không nhằm tối ưu thời gian chờ mà nhằm **giảm response time** — mọi tiến trình đều được chạy trong 11 đơn vị đầu tiên thay vì phải xếp hàng chờ tới lượt.`,
    },
    {
      id: 'os-ps-53',
      topic: 'Multilevel Feedback Queue',
      source: SOURCE,
      question:
        'Tính **thời gian chờ** của P1, P2, P3, P4 với **Multilevel Feedback Queue**: hàng 1 quantum = 2, hàng 2 quantum = 4, hàng 3 FCFS (các tiến trình cùng đến tại thời điểm 0).',
      code: `Tiến trình   Thời gian xử lý      Hàng 1: quantum = 2
P1           8                    Hàng 2: quantum = 4
P2           4                    Hàng 3: FCFS
P3           7
P4           2`,
      options: ['14; 14; 12; 9', '14; 6; 14; 10', '6; 12; 14; 8', '6; 14; 14; 6'],
      answer: 3,
      explanation: `Cơ chế: tiến trình mới vào **hàng 1**; dùng hết quantum mà chưa xong thì bị **đẩy xuống hàng dưới**. Bộ lập lịch luôn phục vụ hàng cao trước, hàng thấp chỉ chạy khi hàng trên rỗng.

Diễn biến theo mô hình chuẩn:
\`\`\`
Hàng 1 (q=2):  P1 0→2 (còn 6)   P2 2→4 (còn 2)
               P3 4→6 (còn 5)   P4 6→8 XONG
Hàng 2 (q=4):  P1 8→12 (còn 2)  P2 12→14 XONG
               P3 14→18 (còn 1)
Hàng 3 (FCFS): P1 18→20 XONG    P3 20→21 XONG
\`\`\`
Thời gian chờ = *hoàn thành − burst*: P1 = 12, P2 = 10, P3 = 14, P4 = 6.

**Lưu ý:** bộ số này **không trùng phương án nào** của đề, trong khi đáp án đề là **6; 14; 14; 6**. Nhiều khả năng đề dùng quy ước khác (thứ tự nạp hàng đợi hoặc cách tính thời gian chờ khác). Đi thi cứ chọn theo đáp án đề, nhưng hãy nắm chắc **cách dựng sơ đồ ở trên** — đó mới là thứ áp dụng được cho mọi bài Multilevel Feedback Queue khác.`,
    },
    {
      id: 'os-ps-54',
      topic: 'fork()',
      source: SOURCE,
      question:
        'Khi dùng **fork()** để tạo tiến trình mới, thành phần nào thật sự được **chia sẻ** giữa tiến trình cha và tiến trình con?',
      options: ['heap', 'Shared memory segments', 'BSS segment', 'Data Segment', 'stack'],
      answer: 1,
      explanation: `Chỉ **shared memory segments** là dùng chung thật sự.

\`fork()\` tạo cho con một **bản sao toàn bộ không gian địa chỉ** của cha. Vì vậy **stack, heap, data segment và BSS segment** đều là **bản riêng** của từng tiến trình — sửa bên này không ảnh hưởng bên kia.

Vùng nhớ chia sẻ tạo bằng \`shmget()\`/\`mmap(MAP_SHARED)\` là ngoại lệ duy nhất: nó được **ánh xạ tới cùng một vùng nhớ vật lý** ở cả hai tiến trình, nên là kênh IPC thật sự.

Đừng để **copy-on-write** đánh lừa: ngay sau \`fork()\`, các trang nhớ *tạm thời* dùng chung khung vật lý để khỏi sao chép tốn kém, nhưng **chỉ cần một bên ghi** là kernel lập tức nhân bản khung đó ra. Về mặt ngữ nghĩa, chúng luôn là hai bản độc lập.

Bằng chứng ngay trong đề: ở câu chương trình in \`PARENT: value = %d\`, con cộng thêm 15 mà cha vẫn in ra **5** — data segment rõ ràng không hề chia sẻ.

*Ghi chú:* ảnh chụp đáp án của đề bị vỡ nên không đọc được rõ; câu này dùng **đáp án đúng theo lý thuyết**.`,
    },
  ],
};
