import type {QuizSet} from '@site/src/components/Quiz/types';

const SOURCE = 'Cuối kỳ HĐH – SPKT';

export const deadlock: QuizSet = {
  id: 'os-deadlock',
  title: 'Chương 7: Deadlock',
  description: 'Deadlock và starvation, bốn điều kiện Coffman, điều kiện tài nguyên an toàn, giải thuật Banker và đồ thị cấp phát.',
  questions: [
    {
      id: 'os-dl-01',
      topic: 'Deadlock',
      source: SOURCE,
      question: 'Một tiến trình đang đợi một sự kiện sẽ không bao giờ xảy ra gọi là hiện tượng gì?',
      options: ['Hold and Wait', 'Mutual Exclusion', 'Deadlock', 'Starvation'],
      answer: 2,
      explanation: `**Deadlock**: tập tiến trình cùng kẹt, mỗi tiến trình chờ một sự kiện mà **chỉ tiến trình khác trong chính tập đó mới tạo ra được** — nên sự kiện ấy không bao giờ tới.

Ví dụ hai semaphore:
\`\`\`
P0: wait(S); wait(Q);
P1: wait(Q); wait(S);
\`\`\`
P0 giữ S chờ Q, P1 giữ Q chờ S → cả hai đứng im vĩnh viễn.

Phân biệt với **starvation**: tiến trình bị bỏ đói *vẫn có thể* chạy nếu bộ lập lịch đoái hoài tới nó, sự kiện nó chờ vẫn xảy ra đều — chỉ là nó không bao giờ tới lượt. Deadlock thì sự kiện không bao giờ xảy ra.

*Hold and Wait* và *Mutual Exclusion* là hai trong bốn **điều kiện cần** sinh ra deadlock, không phải tên gọi của hiện tượng.`,
    },
    {
      id: 'os-dl-02',
      topic: 'Starvation',
      source: SOURCE,
      question:
        'Một tiến trình bị trì hoãn một khoảng thời gian dài lặp đi lặp lại trong khi hệ thống đáp ứng cho những tiến trình khác gọi là hiện tượng gì?',
      options: ['Starvation', 'Mutual Exclusion', 'Deadlock', 'Hold and Wait'],
      answer: 0,
      explanation: `**Starvation** (indefinite blocking): tiến trình sẵn sàng chạy nhưng liên tục bị qua mặt, chờ vô hạn dù hệ thống vẫn hoạt động bình thường.

Nguồn gốc quen thuộc:
- **SJF / SRTF**: job dài bị job ngắn chen mãi.
- **Lập lịch ưu tiên**: tiến trình ưu tiên thấp không bao giờ tới lượt.
- **Semaphore cài bằng LIFO**: tiến trình vào hàng đợi sớm nhất lại ra sau cùng.

Cách chữa: **aging** — tăng dần độ ưu tiên theo thời gian chờ, chờ đủ lâu thì thành ưu tiên cao nhất.

Khác deadlock ở chỗ: starvation **có thể tự hết** nếu tải thay đổi, còn deadlock thì không, phải can thiệp.`,
    },
    {
      id: 'os-dl-03',
      topic: 'Ngăn deadlock',
      source: SOURCE,
      question:
        'Hệ điều hành thực hiện một chính sách yêu cầu một quá trình **giải phóng tất cả các tài nguyên trước khi đưa ra yêu cầu cho một tài nguyên khác**. Chọn câu đúng:',
      options: [
        'Cả Starvation và Deadlock đều có thể xảy ra',
        'Không thể xảy ra Starvation nhưng có thể xảy ra Deadlock',
        'Không thể xảy ra Starvation và Deadlock',
        'Starvation có thể xảy ra nhưng không thể xảy ra Deadlock',
      ],
      answer: 3,
      explanation: `Chính sách này **phá điều kiện Hold and Wait**: không tiến trình nào vừa giữ tài nguyên vừa xin thêm. Mất một trong bốn điều kiện Coffman thì **deadlock không thể xảy ra**.

Nhưng **starvation vẫn còn nguyên**: một tiến trình có thể nhả hết tài nguyên, xin lại, rồi liên tục thua các tiến trình khác trong cuộc tranh giành — nhả rồi xin, nhả rồi xin, mãi không đủ bộ tài nguyên cần.

Đây là bẫy kinh điển: **ngăn deadlock không đồng nghĩa với ngăn starvation**. Hai nhóm giải pháp cho hai vấn đề khác nhau.`,
    },
    {
      id: 'os-dl-04',
      topic: 'Ngăn deadlock',
      source: SOURCE,
      question:
        'Hệ thống có **m** tài nguyên cùng loại, chia sẻ bởi 3 tiến trình P1, P2, P3 với nhu cầu cao nhất lần lượt là **2, 5 và 7**. Đối với giá trị nào của m thì deadlock sẽ không xảy ra?',
      options: ['14', '70', '13', '7'],
      answer: 0,
      explanation: `Công thức chuẩn cho tài nguyên cùng loại: hệ **không thể deadlock** khi

\`\`\`
m >= tổng(nhu cầu tối đa) - n + 1
\`\`\`

Ở đây: m ≥ (2 + 5 + 7) − 3 + 1 = **12**.

Cách hiểu: trường hợp xấu nhất là mỗi tiến trình đang giữ *thiếu đúng một* tài nguyên so với nhu cầu, tức 1 + 4 + 6 = 11 tài nguyên bị giữ mà không ai chạy được. Chỉ cần thêm **1** tài nguyên nữa là có ít nhất một tiến trình đủ bộ, chạy xong rồi nhả ra cho người khác → dây chuyền được gỡ.

Với m = 7 thì quá ít (P3 một mình đã cần 7) → deadlock hoàn toàn có thể xảy ra.

**Lưu ý:** đáp án đề là **14** (đúng bằng tổng nhu cầu — chắc chắn an toàn vì cả ba cùng lấy đủ max một lúc). Nhưng theo công thức thì m = 13 và m = 70 cũng không thể deadlock, nên câu này có tới ba phương án đúng. Chính đề cũng công nhận công thức đó ở câu hỏi về điều kiện đủ **tổng (Si − 1) < m**. Đi thi chọn theo đáp án đề, còn khi làm tự luận thì trả lời m ≥ 12.`,
    },
    {
      id: 'os-dl-05',
      topic: 'Điều kiện an toàn',
      source: SOURCE,
      question: `n tiến trình P1…Pn chia sẻ **m** đơn vị tài nguyên giống hệt nhau, cấp phát và giải phóng từng đơn vị một. Nhu cầu tối đa của Pi là **Si** (Si > 0). Điều kiện nào là **điều kiện đủ** để đảm bảo deadlock không xảy ra?

- (a) với mọi i, Si < m
- (b) với mọi i, Si < n
- (c) tổng (Si − 1) < m
- (d) tổng Si < (m × n)`,
      options: ['(b)', '(d)', '(c)', '(a)'],
      answer: 2,
      explanation: `Đáp án là **(c): tổng (Si − 1) < m**.

Xét trường hợp xấu nhất: mỗi tiến trình Pi đã ôm **Si − 1** đơn vị — tức chỉ còn **thiếu đúng một** đơn vị nữa là xong — và cùng ngồi chờ. Tổng số đơn vị bị giam là tổng (Si − 1).

Nếu con số đó vẫn **nhỏ hơn m** thì hệ thống còn dư ít nhất một đơn vị rảnh. Đưa nó cho bất kỳ tiến trình nào, tiến trình đó đủ bộ, chạy xong và **nhả toàn bộ** tài nguyên → gỡ được cho những tiến trình còn lại. Dây chuyền cứ thế chạy hết, không deadlock.

Biến đổi tương đương, rất tiện khi tính nhanh:
\`\`\`
tổng(Si - 1) < m
⇔ tổng(Si) - n < m
⇔ m > tổng(Si) - n
⇔ m >= tổng(Si) - n + 1
\`\`\`

Vì sao các phương án khác sai:
- **(a)** mỗi Si < m nhưng cộng lại vẫn có thể vượt xa m → vẫn deadlock được.
- **(b)** so nhu cầu với **số tiến trình** là vô nghĩa, n chẳng liên quan tới lượng tài nguyên.
- **(d)** quá lỏng, không chặn được trường hợp xấu nhất.`,
    },
    {
      id: 'os-dl-06',
      topic: 'Banker',
      source: SOURCE,
      question:
        'Hệ thống chia sẻ **11 tape drives**. Phân bổ hiện tại và nhu cầu tối đa của 4 tiến trình như bảng dưới. Điều nào mô tả **đúng nhất** trạng thái hiện tại của hệ thống?',
      code: `Process   Maximum need   Current allocation
P1        9              3
P2        6              1
P3        5              3
P4        10             0`,
      options: [
        'Not Safe, Not Deadlocked',
        'Safe, Not Deadlocked',
        'Not Safe, Deadlocked',
        'Safe, Deadlocked',
      ],
      answer: 1,
      explanation: `Bước 1 — tính **Available** và **Need**:
\`\`\`
Đã cấp phát: 3 + 1 + 3 + 0 = 7   →   Available = 11 - 7 = 4

Need = Maximum - Allocation
P1: 9 - 3 = 6     P2: 6 - 1 = 5
P3: 5 - 3 = 2     P4: 10 - 0 = 10
\`\`\`

Bước 2 — tìm **chuỗi an toàn** (thuật toán Banker):
\`\`\`
Available = 4  → P3 cần 2 ≤ 4   ✔ chạy, nhả 5   → Available = 4 - 2 + 5 = 7
Available = 7  → P2 cần 5 ≤ 7   ✔ chạy, nhả 6   → Available = 7 - 5 + 6 = 8
Available = 8  → P1 cần 6 ≤ 8   ✔ chạy, nhả 9   → Available = 8 - 6 + 9 = 11
Available = 11 → P4 cần 10 ≤ 11 ✔ chạy xong
\`\`\`

Tồn tại chuỗi an toàn **P3 → P2 → P1 → P4** nên trạng thái là **Safe**. Mà đã safe thì đương nhiên **không deadlocked** — deadlock chỉ có thể xảy ra từ trạng thái không an toàn.

Nhớ: **not safe ≠ deadlocked**. Trạng thái không an toàn chỉ nghĩa là *có nguy cơ*, hệ thống vẫn có thể may mắn chạy thoát.`,
    },
    {
      id: 'os-dl-07',
      topic: 'Tránh deadlock',
      source: SOURCE,
      question:
        'Đối với loại tài nguyên có **nhiều instance**, thuật toán được sử dụng để tránh deadlock là …',
      options: [
        "banker's algorithm",
        'partition algorithm',
        'sorting algorithm',
        'a modified resource-allocation graph',
      ],
      answer: 0,
      explanation: `**Giải thuật Banker** (Dijkstra) dành cho tài nguyên có **nhiều instance** cùng loại.

Cách hoạt động: mỗi tiến trình khai báo trước nhu cầu tối đa; khi có yêu cầu, hệ thống thử cấp rồi chạy **safety algorithm** xem còn tồn tại chuỗi an toàn không. Còn thì cấp thật, không còn thì bắt chờ.

Tên gọi đến từ ví von ngân hàng: chỉ cho vay khi vẫn còn đủ tiền mặt để phục vụ mọi khách hàng theo một thứ tự nào đó.

Nhược điểm khiến nó hiếm dùng thực tế: phải biết trước nhu cầu tối đa, số tiến trình phải cố định, và độ phức tạp O(m × n²) cho mỗi lần xin tài nguyên.`,
    },
    {
      id: 'os-dl-08',
      topic: 'Tránh deadlock',
      source: SOURCE,
      question:
        'Đối với loại tài nguyên có **single instance**, thuật toán được sử dụng để tránh deadlock là _____',
      options: [
        'partition algorithm',
        'a modified resource-allocation graph',
        "banker's algorithm",
        'sorting algorithm',
      ],
      answer: 1,
      explanation: `Với mỗi loại tài nguyên chỉ có **một instance**, dùng **đồ thị cấp phát tài nguyên có bổ sung** (modified resource-allocation graph) với **claim edge**.

- **Claim edge** (Pi ⇢ Rj, vẽ nét đứt): Pi *có thể* sẽ xin Rj trong tương lai.
- Khi Pi xin thật, claim edge biến thành **request edge**; được cấp thì thành **assignment edge**.
- Hệ thống chỉ chấp nhận cấp phát nếu việc biến đổi đó **không tạo ra chu trình** trong đồ thị.

Với tài nguyên đơn instance: **có chu trình ⇔ có deadlock**. Chính vì vậy đồ thị là đủ, khỏi cần Banker.

Còn khi tài nguyên có nhiều instance thì chu trình chỉ là *điều kiện cần*, có chu trình vẫn có thể không deadlock — lúc đó mới phải dùng Banker.`,
    },
    {
      id: 'os-dl-09',
      topic: 'Điều kiện an toàn',
      source: SOURCE,
      question:
        'Một hệ thống có **3 tiến trình** chia sẻ **4 tài nguyên**. Nếu mỗi tiến trình cần tối đa **2 đơn vị** tài nguyên, thì _____',
      options: [
        'deadlock can never occur',
        'deadlock has to occur',
        'deadlock may occur',
        'none of these',
      ],
      answer: 0,
      explanation: `Áp thẳng điều kiện đủ: tổng (Si − 1) < m.

\`\`\`
tổng(Si - 1) = (2-1) + (2-1) + (2-1) = 3
m = 4  →  3 < 4  ✔
\`\`\`

Nên **deadlock không bao giờ xảy ra**.

Kiểm chứng bằng tay: trường hợp xấu nhất là cả ba tiến trình mỗi bên ôm 1 đơn vị (3 đơn vị bị giữ), vẫn còn **1 đơn vị rảnh**. Đơn vị đó đủ cho một tiến trình bất kỳ hoàn thành, nó nhả ra 2 đơn vị, dây chuyền tiếp tục.

Nếu đề đổi thành 3 tiến trình / 3 tài nguyên: tổng(Si − 1) = 3, không còn nhỏ hơn m = 3 → deadlock **có thể** xảy ra (mỗi tiến trình ôm 1 rồi cùng chờ).`,
    },
    {
      id: 'os-dl-10',
      topic: 'Điều kiện Coffman',
      source: SOURCE,
      question:
        'Điều gì là cần thiết để đảm bảo **tính nhất quán của kết quả** và **tính toàn vẹn của dữ liệu**?',
      options: ['Hold and Wait', 'Mutual Exclusion', 'No Preemption', 'Circular Wait'],
      answer: 1,
      explanation: `**Mutual Exclusion** — mỗi lúc chỉ một tiến trình được thao tác trên dữ liệu chia sẻ. Thiếu nó là có **race condition**: hai tiến trình cùng đọc–sửa–ghi \`counter\` sẽ mất một lần cập nhật, kết quả phụ thuộc vào may rủi của bộ lập lịch.

Éo le ở chỗ: mutual exclusion vừa là **điều kiện bắt buộc để dữ liệu đúng**, lại vừa là **một trong bốn điều kiện cần của deadlock**. Nên trong bốn điều kiện Coffman, đây là điều kiện **không thể phá bỏ** với tài nguyên không chia sẻ được — phá là hỏng dữ liệu.

Ba điều kiện còn lại (hold and wait, no preemption, circular wait) chỉ là cách quản lý tài nguyên, phá được và thường phá cái đó.`,
    },
    {
      id: 'os-dl-11',
      topic: 'Điều kiện Coffman',
      source: SOURCE,
      question:
        'Một tài nguyên **không thể bị lấy** khỏi một tiến trình trừ khi tiến trình đó tự giải phóng — điều này liên quan đến điều kiện nào trong việc ngăn deadlock?',
      options: ['No Preemption', 'Circular Wait', 'Mutual Exclusion', 'Hold and Wait'],
      answer: 0,
      explanation: `**No Preemption** (không trưng dụng): tài nguyên chỉ được nhả **tự nguyện** bởi chính tiến trình đang giữ, sau khi nó dùng xong.

Bốn điều kiện Coffman và cách phá tương ứng:
- **Mutual Exclusion** — không phá được với tài nguyên độc chiếm (máy in, biến chia sẻ).
- **Hold and Wait** — bắt xin hết một lượt từ đầu, hoặc phải nhả sạch trước khi xin thêm.
- **No Preemption** — cho phép **tịch thu** tài nguyên của tiến trình đang chờ, cấp cho người khác.
- **Circular Wait** — **đánh số thứ tự** tài nguyên, bắt mọi tiến trình xin theo thứ tự tăng dần.

Phá circular wait bằng đánh số là cách rẻ và phổ biến nhất trong thực tế.`,
    },
    {
      id: 'os-dl-12',
      topic: 'Chiến lược deadlock',
      source: SOURCE,
      question:
        'Thực hiện vô hiệu hoá (ngăn) 1 trong số các điều kiện Mutual exclusion, Hold and Wait, No Preemption và Circular Wait liên quan đến thuật toán gì về deadlock?',
      options: [
        'deadlock detection',
        'deadlock avoidance',
        'deadlock deletion',
        'deadlock prevention',
      ],
      answer: 3,
      explanation: `**Deadlock prevention** (ngăn chặn): đánh thẳng vào **bốn điều kiện cần**, chỉ cần một điều kiện không bao giờ đúng là deadlock không thể hình thành.

Bốn chiến lược của hệ thống, đừng lẫn:
- **Prevention** — phá một trong bốn điều kiện Coffman ngay từ thiết kế. Đơn giản nhưng **lãng phí tài nguyên** và giảm thông lượng.
- **Avoidance** — cho phép cả bốn điều kiện, nhưng mỗi lần cấp phát đều kiểm tra **trạng thái an toàn** (Banker, đồ thị cấp phát).
- **Detection & recovery** — cứ cấp thoải mái, chạy giải thuật phát hiện chu trình định kỳ, thấy deadlock thì **huỷ tiến trình hoặc tịch thu tài nguyên**.
- **Ostrich algorithm** — phớt lờ, coi như không xảy ra. Đây chính là cách UNIX/Windows làm trong thực tế.

*deadlock deletion* không phải thuật ngữ trong môn này.`,
    },
    {
      id: 'os-dl-13',
      topic: 'Ngăn deadlock',
      source: SOURCE,
      question:
        'Khi yêu cầu tài nguyên, tiến trình **không được giữ tài nguyên nào**, nếu đang có thì phải trả lại trước khi yêu cầu thêm. Điều này giải quyết được điều kiện nào trong việc ngăn deadlock?',
      options: ['Mutual Exclusion', 'No Preemption', 'Hold and Wait', 'Circular Wait'],
      answer: 2,
      explanation: `Phá **Hold and Wait** theo hướng "**nhả sạch rồi xin lại**": muốn xin thêm thì phải buông hết những gì đang giữ, nên không bao giờ tồn tại tình trạng *vừa giữ vừa chờ*.

Hai cách cài đặt để phá Hold and Wait:
- **Xin trọn gói một lần** trước khi chạy (xem câu kế tiếp).
- **Nhả hết trước khi xin thêm** — chính là câu này.

Cái giá phải trả: **starvation** (nhả rồi xin lại, mãi không gom đủ bộ) và chi phí khởi động lại công việc dở dang sau mỗi lần nhả tài nguyên.`,
    },
    {
      id: 'os-dl-14',
      topic: 'Ngăn deadlock',
      source: SOURCE,
      question:
        'Một tiến trình yêu cầu **toàn bộ tài nguyên cần thiết một lần**; đủ thì hệ thống cấp phát, không đủ thì tiến trình bị blocked. Điều này giải quyết được điều kiện nào trong việc ngăn deadlock?',
      options: ['Hold and Wait', 'Circular Wait', 'No Preemption', 'Mutual Exclusion'],
      answer: 0,
      explanation: `Cũng là phá **Hold and Wait**, nhưng theo hướng **cấp phát trọn gói** (all-or-nothing): tiến trình chỉ bắt đầu khi đã có đủ mọi tài nguyên, nên không bao giờ ở trạng thái vừa giữ vừa xin thêm.

So sánh với cách "nhả sạch rồi xin lại" ở câu trước — cùng phá một điều kiện, khác cách làm:

- **Xin trọn gói**: phải **biết trước** toàn bộ nhu cầu; tài nguyên bị giữ suốt vòng đời dù dùng rất ít, gây **lãng phí nặng**.
- **Nhả sạch rồi xin lại**: linh hoạt hơn nhưng công việc dở dang phải làm lại.

Cả hai đều dính **starvation**: tiến trình cần nhiều tài nguyên sẽ liên tục thua những tiến trình cần ít.`,
    },
    {
      id: 'os-dl-15',
      topic: 'Trạng thái hệ thống',
      source: SOURCE,
      question: 'Trạng thái phân bố tài nguyên **không** xác định bởi yếu tố nào sau đây?',
      options: [
        'Nhu cầu tài nguyên tối thiểu của các tiến trình',
        'Số lượng tài nguyên có sẵn',
        'Số lượng tài nguyên được phân bổ',
        'Nhu cầu tài nguyên tối đa của các tiến trình',
      ],
      answer: 0,
      explanation: `Trạng thái phân bố tài nguyên (resource-allocation state) gồm đúng **ba thành phần**, cũng là ba ma trận của giải thuật Banker:

\`\`\`
Available   - số tài nguyên còn rảnh
Allocation  - số tài nguyên mỗi tiến trình đang giữ
Max         - nhu cầu TỐI ĐA mỗi tiến trình có thể cần
\`\`\`
(Need = Max − Allocation, suy ra được nên không tính là thành phần riêng.)

**Nhu cầu tối thiểu** không nằm trong đó, và cũng vô dụng với bài toán deadlock: muốn biết hệ thống có an toàn hay không thì phải tính theo **tình huống xấu nhất**, tức là ai cũng đòi tới mức tối đa. Nhu cầu tối thiểu chẳng nói được gì về nguy cơ kẹt.`,
    },
    {
      id: 'os-dl-16',
      topic: 'Điều kiện an toàn',
      source: SOURCE,
      question:
        'Một hệ điều hành có **3 tiến trình** người dùng, mỗi tiến trình yêu cầu **4 đơn vị** tài nguyên R. Số lượng đơn vị R **tối thiểu** để không deadlock nào xảy ra là:',
      options: ['12', '5', '10', '9'],
      answer: 2,
      explanation: `Dùng điều kiện đủ: **tổng (Si − 1) < m**, tức m nhỏ nhất là **tổng (Si − 1) + 1**.

\`\`\`
tổng(Si - 1) = (4-1) × 3 = 9
m tối thiểu   = 9 + 1 = 10
\`\`\`

Kiểm chứng bằng tay: với m = 9, cả ba tiến trình mỗi bên ôm 3 đơn vị là hết sạch, ai cũng thiếu đúng 1 → **deadlock**. Thêm đúng một đơn vị nữa (m = 10) thì luôn có một tiến trình gom đủ 4, chạy xong nhả ra 4 đơn vị cho người khác.

**12** là tổng nhu cầu — thừa, vì không cần cả ba chạy cùng lúc. Đây chính là chỗ đáp án của câu "m tài nguyên cho 2/5/7" bị lệch: câu đó chọn tổng nhu cầu thay vì công thức.`,
    },
    {
      id: 'os-dl-17',
      topic: 'Điều kiện an toàn',
      source: SOURCE,
      question:
        'Một máy tính có **6 tape drives**, có **n** tiến trình cạnh tranh sử dụng. Mỗi tiến trình có thể cần **2 tape drives**. Giá trị **lớn nhất** của n để hệ thống không bị deadlock là bao nhiêu?',
      options: ['4', '3', '5', '6'],
      answer: 2,
      explanation: `Vẫn công thức đó, lần này giải ngược để tìm n:

\`\`\`
tổng(Si - 1) < m
n × (2 - 1) < 6
n < 6        →  n lớn nhất = 5
\`\`\`

Kiểm chứng: với **n = 5**, tình huống xấu nhất là mỗi tiến trình giữ 1 drive (hết 5), còn dư **1 drive**. Đưa nó cho bất kỳ ai, tiến trình đó đủ 2, chạy xong nhả ra 2 → dây chuyền được gỡ.

Với **n = 6**: sáu tiến trình mỗi bên ôm 1 drive là vừa đúng 6, không còn drive nào rảnh, tất cả cùng chờ → **deadlock**.

Ba câu 3 tiến trình/4 tài nguyên, 3 tiến trình/4 đơn vị R và câu này đều là một công thức, chỉ khác chỗ ẩn số nằm ở m hay n.`,
    },
    {
      id: 'os-dl-18',
      topic: 'Banker',
      source: SOURCE,
      question:
        'Hệ thống có ba loại tài nguyên **E, F, G** và bốn tiến trình P0–P3 chạy đồng thời. Tài nguyên còn rảnh là **E(3), F(3), G(0)**. Phát biểu nào đúng về trạng thái này?',
      code: `        Allocation            Max
        E   F   G           E   F   G
P0      1   0   1          4   3   1
P1      1   1   2          2   1   4
P2      1   0   3          1   3   3
P3      2   0   0          5   4   1`,
      options: [
        'Hệ thống không ở trạng thái an toàn, nhưng sẽ an toàn nếu có thêm 1 instance F',
        'Hệ thống không ở trạng thái an toàn, nhưng sẽ an toàn nếu có thêm 1 instance G',
        'Hệ thống ở trạng thái an toàn',
        'Hệ thống không ở trạng thái an toàn, nhưng sẽ an toàn nếu có thêm 1 instance E',
      ],
      answer: 2,
      explanation: `Bước 1 — tính **Need = Max − Allocation**:
\`\`\`
        E   F   G
P0      3   3   0
P1      1   0   2
P2      0   3   0
P3      3   4   1
\`\`\`

Bước 2 — chạy safety algorithm với Available = (3, 3, 0):
\`\`\`
P0: Need (3,3,0) <= (3,3,0) ✔ → nhả (1,0,1) → Available = (4,3,1)
P2: Need (0,3,0) <= (4,3,1) ✔ → nhả (1,0,3) → Available = (5,3,4)
P1: Need (1,0,2) <= (5,3,4) ✔ → nhả (1,1,2) → Available = (6,4,6)
P3: Need (3,4,1) <= (6,4,6) ✔ → xong
\`\`\`

Tồn tại chuỗi an toàn **P0 → P2 → P1 → P3** nên **hệ thống ở trạng thái an toàn**, không cần thêm instance nào.

Mẹo làm nhanh: G đang rảnh **0** nên ở bước đầu chỉ xét được tiến trình có Need G = 0 — chỉ P0 và P2. Bắt đầu từ đó là ra ngay.`,
    },
    {
      id: 'os-dl-19',
      topic: 'Chiến lược deadlock',
      source: SOURCE,
      question:
        'Điều nào sau đây **không đúng** đối với các kế hoạch ngăn chặn deadlock (prevention) và tránh deadlock (avoidance)?',
      options: [
        'Trong trường hợp tránh deadlock, yêu cầu tài nguyên luôn được cấp, nếu trạng thái kết quả là an toàn',
        'Trong ngăn chặn deadlock, yêu cầu tài nguyên luôn được cấp nếu trạng thái kết quả là an toàn',
        'Tránh deadlock cần có kiến thức ưu tiên về các yêu cầu tài nguyên',
        'Ngăn chặn deadlock hạn chế hơn tránh bế tắc',
      ],
      answer: 1,
      explanation: `Phương án **b sai** vì khái niệm **trạng thái an toàn** hoàn toàn không tồn tại trong **deadlock prevention**.

Prevention không hề nhìn vào trạng thái hệ thống. Nó áp **ràng buộc cấu trúc** lên cách tiến trình được phép xin tài nguyên — xin trọn gói, xin theo thứ tự đánh số, cho phép tịch thu — và cứ thế mà cấp, bất kể trạng thái ra sao. Việc kiểm tra "cấp xong có còn an toàn không" là đặc trưng của **avoidance** (giải thuật Banker).

Ba phương án còn lại đều đúng:
- **a** — đúng, đây chính là định nghĩa của avoidance.
- **c** — đúng, Banker bắt khai báo trước nhu cầu tối đa.
- **d** — đúng, prevention khắt khe hơn nên **tận dụng tài nguyên kém hơn** và thông lượng thấp hơn avoidance.`,
    },
    {
      id: 'os-dl-20',
      topic: 'Điều kiện an toàn',
      source: SOURCE,
      question:
        'Bốn tiến trình P1, P2, P3, P4 đang chạy, nhu cầu tối đa cho tài nguyên cùng loại tương ứng là **7, 6, 4 và 3**. Số lượng tài nguyên **tối thiểu** cần thiết để đảm bảo không bao giờ xảy ra deadlock là bao nhiêu?',
      options: ['13', '17', '19', '7'],
      answer: 1,
      explanation: `\`\`\`
tổng(Si - 1) = 6 + 5 + 3 + 2 = 16
m tối thiểu   = 16 + 1 = 17
\`\`\`

Với m = 16, cả bốn tiến trình có thể cùng ôm thiếu đúng một đơn vị (6 + 5 + 3 + 2 = 16 đơn vị bị giam), không còn gì rảnh → **deadlock**. Thêm đúng một đơn vị nữa là luôn có người hoàn thành.

Đừng chọn **19** (tổng nhu cầu 7+6+4+3 = 20 thì thừa, mà 19 cũng chẳng phải mốc nào cả) hay **13** (thiếu).

Công thức này dùng lại cho mọi câu dạng "m tối thiểu", "n lớn nhất" trong đề: **m ≥ tổng Si − n + 1**.`,
    },
    {
      id: 'os-dl-21',
      topic: 'Banker',
      source: SOURCE,
      question:
        'Có tổng cộng **9 đơn vị** của một loại tài nguyên, trạng thái hiện tại như bảng dưới. Trình tự nào sau đây là một **chuỗi an toàn**?',
      code: `Process   Used   Max
P1        2      7
P2        1      6
P3        2      5
P4        1      4`,
      options: ['(P3, P1, P2, P4)', '(P4, P2, P1, P3)', '(P4, P1, P3, P2)', '(P4, P2, P3, P1)'],
      answer: 0,
      explanation: `Available = 9 − (2 + 1 + 2 + 1) = **3**. Need = Max − Used: P1 = 5, P2 = 5, P3 = 3, P4 = 3.

Kiểm tra phương án **(P3, P1, P2, P4)**:
\`\`\`
Available = 3  → P3 cần 3 ≤ 3 ✔ nhả 5  → 3 - 3 + 5 = 5
Available = 5  → P1 cần 5 ≤ 5 ✔ nhả 7  → 5 - 5 + 7 = 7
Available = 7  → P2 cần 5 ≤ 7 ✔ nhả 6  → 7 - 5 + 6 = 8
Available = 8  → P4 cần 3 ≤ 8 ✔
\`\`\`
Chạy trọn vẹn cả bốn → **an toàn**.

Các phương án bắt đầu bằng P4 đều chết ở bước hai: P4 cần 3 ≤ 3 ✔ nhả 4 → Available = 4, nhưng bước sau P2 cần 5 > 4 (phương án b, d), còn P1 cần 5 > 4 (phương án c).

Mẹo: khi tài nguyên rảnh ít, **luôn ưu tiên tiến trình nhả ra được nhiều nhất** so với phần phải bù thêm. P3 chỉ cần 3 mà nhả tới 5 — lãi nhất.`,
    },
    {
      id: 'os-dl-22',
      topic: 'Banker',
      source: SOURCE,
      question:
        'Hệ thống có bốn tiến trình và **5 loại tài nguyên**. Phân bổ hiện tại, nhu cầu tối đa và tài nguyên rảnh như bảng dưới. Giá trị **nhỏ nhất của x** để hệ thống ở trạng thái an toàn là bao nhiêu?',
      code: `           Allocated     Maximum      Available
Process A  1 0 2 1 1     1 1 2 1 3    0 0 x 1 1
Process B  2 0 1 1 0     2 2 2 1 0
Process C  1 1 0 1 0     2 1 3 1 0
Process D  1 1 1 1 0     1 1 2 2 1`,
      options: ['1', '2', 'Không an toàn với x bất kỳ', '3'],
      answer: 2,
      explanation: `Đừng vội chạy safety algorithm — hãy kiểm tra **tổng tài nguyên** của từng loại trước.

Xét **loại tài nguyên thứ 5** (cột cuối):
\`\`\`
Đang cấp phát: A=1, B=0, C=0, D=0   → 1
Đang rảnh:                            1
Tổng toàn hệ thống:                   2
\`\`\`

Nhưng **Maximum của A ở loại này là 3**, lớn hơn tổng 2 đơn vị mà hệ thống có. Nghĩa là A **không bao giờ** hoàn thành được, dù x có bằng bao nhiêu — x chỉ ảnh hưởng tới loại tài nguyên thứ 3.

Theo định nghĩa, chuỗi an toàn phải cho **mọi** tiến trình chạy xong. A không thể xong → **không tồn tại chuỗi an toàn với bất kỳ x nào**.

Bài học rút ra: trước khi làm Banker, luôn kiểm tra ràng buộc cơ bản **Max ≤ Tổng tài nguyên**. Đề bẫy đúng chỗ này, ai lao vào tính Need ngay sẽ mất thời gian rồi vẫn chọn sai.`,
    },
    {
      id: 'os-dl-23',
      topic: 'Đồ thị cấp phát',
      source: SOURCE,
      question: `Cho đồ thị cấp phát tài nguyên của một hệ thống (đề gốc cho bằng hình, mô tả lại bằng cạnh):

- R1 có **2 instance**, cấp cho T2 và T3
- R2 có **2 instance**, cấp cho T1 và T4
- T1 **yêu cầu** R1
- T3 **yêu cầu** R2

Phát biểu nào đúng?`,
      options: [
        'Hệ thống có thể không có deadlock',
        'Hệ thống có deadlock nếu xoá cạnh R1 được gán cho T2',
        'Hệ thống có deadlock',
        'Hệ thống không có deadlock nếu xoá cạnh R1 được gán cho T2',
      ],
      answer: 0,
      explanation: `Đồ thị này **có chu trình**: T1 → R1 → T3 → R2 → T1. Nhưng chu trình chỉ là **điều kiện cần**, không phải điều kiện đủ, khi tài nguyên có **nhiều instance**.

Lý do hệ thống vẫn có thể thoát: **T2** đang giữ một instance của R1 và **T4** giữ một instance của R2, mà cả hai **không chờ gì cả**. Chúng chạy xong rồi nhả tài nguyên ra là chu trình tự gỡ.

Quy tắc phải thuộc:
- Tài nguyên **1 instance**: có chu trình ⇔ **chắc chắn deadlock**.
- Tài nguyên **nhiều instance**: có chu trình ⇒ **có thể** deadlock, phải xét thêm ai đang giữ instance ngoài chu trình.

Vì vậy phát biểu đúng nhất là "**có thể không có deadlock**" — dè dặt, không khẳng định chắc chắn.`,
    },
    {
      id: 'os-dl-24',
      topic: 'Đồ thị cấp phát',
      source: SOURCE,
      question: `Cho đồ thị cấp phát tài nguyên của một hệ thống (đề gốc cho bằng hình, mô tả lại bằng cạnh):

- R1 có **1 instance**, cấp cho T2
- R2 có **1 instance**, cấp cho T1
- R3 có **1 instance**, cấp cho T3
- T1 **yêu cầu** R1, T2 **yêu cầu** R2, T3 **yêu cầu** R2

Phát biểu nào đúng?`,
      options: [
        'Hệ thống có deadlock nếu nối cạnh T3 yêu cầu R1',
        'Hệ thống không có deadlock',
        'Hệ thống có thể có deadlock',
        'Hệ thống có 1 deadlock',
      ],
      answer: 3,
      explanation: `Chu trình: **T1 → R1 → T2 → R2 → T1**.

Khác với câu trước, ở đây **mỗi tài nguyên chỉ có 1 instance**. Instance duy nhất của R1 nằm trong tay T2 (đang chờ R2), instance duy nhất của R2 nằm trong tay T1 (đang chờ R1). Không ai ngoài chu trình có thể nhả ra thứ họ cần.

→ **Chắc chắn deadlock**, gồm đúng một chu trình nên đáp án là "hệ thống có 1 deadlock".

T3 cũng bị kẹt vì đang chờ R2, nhưng nó **không thuộc chu trình** — đây là trường hợp tiến trình bị vạ lây, không tính là deadlock thứ hai.

Với đồ thị đơn instance, việc phát hiện deadlock rút gọn thành **tìm chu trình trong đồ thị có hướng**, làm bằng DFS là xong.`,
    },
    {
      id: 'os-dl-25',
      topic: 'Điều kiện an toàn',
      source: SOURCE,
      question: `Hệ thống có **m** tài nguyên cùng loại chia sẻ bởi **n** thread, mỗi thread chỉ yêu cầu hoặc giải phóng một tài nguyên tại một thời điểm. Điều kiện nào là **điều kiện đủ** để deadlock không xảy ra?

- (1) Nhu cầu tối đa của mỗi luồng là d, với 1 < d < m
- (2) Tổng của tất cả các nhu cầu tối đa nhỏ hơn m + n
- (3) Tổng của tất cả các nhu cầu tối đa nhỏ hơn m + 1`,
      options: ['(1)', '(2)', '(3)', '(1) và (2)'],
      answer: 3,
      explanation: `Đáp án đề là **(1) và (2)**.

**(2) chắc chắn đúng** — đây chính là công thức quen thuộc viết dưới dạng khác:
\`\`\`
tổng(Si) < m + n
⇔ tổng(Si) - n < m
⇔ tổng(Si - 1) < m
\`\`\`

**Lưu ý — (1) không thật sự đủ.** Phản ví dụ: m = 4, n = 4, mỗi thread có d = 2 (thoả 1 < 2 < 4). Bốn thread mỗi bên ôm 1 tài nguyên là hết sạch 4, ai cũng thiếu đúng 1 → **deadlock**. Điều kiện (1) chỉ giới hạn nhu cầu từng thread mà bỏ qua **số lượng thread**, nên không chặn được trường hợp xấu nhất.

Ngược lại, **(3) lại là điều kiện đủ** dù đề không chọn: tổng nhu cầu < m + 1 nghĩa là tổng nhu cầu ≤ m, tức mọi thread có thể lấy đủ max cùng lúc — an toàn tuyệt đối, chỉ là chặt hơn mức cần thiết.

Đi thi chọn theo đáp án đề, nhưng nhớ rằng điều kiện đúng và đáng thuộc là **(2)**.`,
    },
    {
      id: 'os-dl-26',
      topic: 'Deadlock',
      source: SOURCE,
      question: 'P1, P2 thực hiện đồng thời đoạn code dưới đây dẫn đến hiện tượng gì?',
      code: `P1:              P2:
wait(s1);        wait(s2);
wait(s2);        wait(s1);`,
      options: ['Mutual Exclusion', 'Hold and Wait', 'Starvation', 'Deadlock'],
      answer: 3,
      explanation: `Xen kẽ tai hại: P1 chiếm được s1, P2 chiếm được s2. Giờ P1 chờ s2 (P2 đang giữ), P2 chờ s1 (P1 đang giữ) → **deadlock kinh điển**.

Kiểm đủ bốn điều kiện Coffman:
- **Mutual exclusion** — semaphore nhị phân, mỗi lúc một chủ ✔
- **Hold and wait** — mỗi bên giữ một cái và chờ cái kia ✔
- **No preemption** — không ai giật được semaphore từ tay người khác ✔
- **Circular wait** — P1 → P2 → P1 ✔

*Hold and Wait* chỉ là **một điều kiện**, không phải tên hiện tượng; *starvation* thì sai vì ở đây chẳng ai còn cơ hội chạy nữa.

Cách chữa rẻ nhất: **đánh số tài nguyên và luôn khoá theo thứ tự tăng dần** — bắt cả hai cùng viết \`wait(s1); wait(s2);\` là hết deadlock.`,
    },
    {
      id: 'os-dl-27',
      topic: 'Phát hiện deadlock',
      source: SOURCE,
      question: 'Đồ thị **Wait-for** là gì?',
      options: [
        'Có các đỉnh là các tiến trình và cạnh mô tả tiến trình Pi yêu cầu tài nguyên Rj',
        'Có các đỉnh là các tiến trình và cạnh mô tả tiến trình Pi đang chờ tiến trình Pj',
        'Có đỉnh là các tiến trình và các tài nguyên, cạnh là các yêu cầu/cấp phát tài nguyên',
        'Có các đỉnh là các tài nguyên và cạnh mô tả tiến trình Pi đang được cấp phát tài nguyên Rj',
      ],
      answer: 1,
      explanation: `**Wait-for graph** là bản rút gọn của đồ thị cấp phát tài nguyên: **bỏ hết các đỉnh tài nguyên**, chỉ giữ lại tiến trình.

Cách rút gọn: nếu \`Pi → Rq\` và \`Rq → Pj\` thì vẽ thẳng **Pi → Pj**, đọc là "Pi đang chờ Pj nhả tài nguyên".

- Dùng cho tài nguyên **đơn instance**.
- Hệ thống có deadlock **khi và chỉ khi** đồ thị wait-for có **chu trình**.
- Hệ điều hành duy trì đồ thị này và chạy giải thuật tìm chu trình định kỳ — đó là **deadlock detection**.

Phương án c mô tả **resource-allocation graph** (có cả hai loại đỉnh), chính là thứ mà wait-for graph được rút gọn từ đó.`,
    },
    {
      id: 'os-dl-28',
      topic: 'Banker',
      source: SOURCE,
      question:
        'Hệ điều hành có **13 tape drives** và ba tiến trình P1, P2, P3. Nhu cầu tối đa lần lượt là **11, 5, 8**; hiện đang được cấp **6, 3, 2**. Trình tự nào thể hiện trạng thái an toàn?',
      code: `Process   Max   Allocation   Need
P1        11    6            5
P2        5     3            2
P3        8     2            6`,
      options: ['P2, P1, P3', 'P2, P3, P1', 'P3, P2, P1', 'P1, P2, P3'],
      answer: 0,
      explanation: `Available = 13 − (6 + 3 + 2) = **2**.

Kiểm tra **P2, P1, P3**:
\`\`\`
Available = 2 → P2 cần 2 ≤ 2 ✔ nhả 5  → 2 - 2 + 5 = 5
Available = 5 → P1 cần 5 ≤ 5 ✔ nhả 11 → 5 - 5 + 11 = 11
Available = 11 → P3 cần 6 ≤ 11 ✔
\`\`\`
Cả ba chạy xong → **an toàn**.

Vì sao các phương án khác sai:
- **P2, P3, P1**: sau P2 còn 5, nhưng P3 cần 6 > 5 ✘
- **P3, P2, P1** và **P1, P2, P3**: ngay bước đầu đã hỏng, P3 cần 6 > 2 và P1 cần 5 > 2 ✘

Với tài nguyên rảnh chỉ 2 đơn vị, **chỉ P2 là khởi động được** — nhìn ra điều đó là loại ngay ba phương án.`,
    },
    {
      id: 'os-dl-29',
      topic: 'Deadlock',
      source: SOURCE,
      question: 'Một tập tiến trình bị **deadlock** nếu _____',
      options: [
        'each process is terminated',
        'each process is blocked and will remain so forever',
        'each process is exit',
        'all processes are trying to kill each other',
      ],
      answer: 1,
      explanation: `Định nghĩa chuẩn: **mọi tiến trình trong tập đều bị chặn và sẽ bị chặn mãi mãi**.

Hai vế đều quan trọng:
- **blocked** — đang chờ một sự kiện, không chạy được.
- **remain so forever** — sự kiện đó chỉ có thể do một tiến trình khác **trong chính tập này** tạo ra, mà tất cả bọn họ đều đang kẹt.

Chính vế thứ hai phân biệt deadlock với **starvation**: tiến trình bị bỏ đói *có khả năng* chạy nếu bộ lập lịch đổi ý, còn tiến trình trong deadlock thì không bao giờ.

Các phương án về *terminated* hay *exit* đều sai vì tiến trình đã kết thúc thì không còn giữ tài nguyên, cũng chẳng chờ ai.`,
    },
    {
      id: 'os-dl-30',
      topic: 'Deadlock',
      source: SOURCE,
      question:
        'Cấu trúc miền găng của P1 và P2 như dưới đây, semaphore **A và B đều khởi đầu bằng 1**. Có thể xảy ra Deadlock hay không?',
      code: `P1              P2
Wait(A);        Wait(B);
...             ...
Wait(B);        Wait(A);
...             ...`,
      options: ['Có', 'Không'],
      answer: 0,
      explanation: `**Có** — đây là mẫu deadlock kinh điển do **khoá theo thứ tự ngược nhau**.

Xen kẽ gây kẹt:
\`\`\`
P1: Wait(A) thành công  →  A = 0, P1 giữ A
P2: Wait(B) thành công  →  B = 0, P2 giữ B
P1: Wait(B) → B = 0 → CHỜ P2 nhả B
P2: Wait(A) → A = 0 → CHỜ P1 nhả A
\`\`\`
Circular wait hình thành, cả hai đứng im vĩnh viễn.

Lưu ý deadlock **không chắc chắn xảy ra mỗi lần chạy** — nếu P1 kịp lấy cả A và B trước khi P2 khởi động thì mọi thứ trôi bình thường. Đó chính là điều khiến loại lỗi này khó phát hiện: chương trình chạy đúng hàng nghìn lần rồi treo đúng lúc quan trọng nhất.

Cách chữa rẻ nhất: **đánh số tài nguyên và luôn khoá theo thứ tự tăng dần** — bắt cả hai cùng viết \`Wait(A); Wait(B);\`.`,
    },
    {
      id: 'os-dl-31',
      topic: 'Đồ thị cấp phát',
      source: SOURCE,
      question: `Đồ thị cấp phát tài nguyên (RAG) sau có thể có Deadlock hay không? (đề gốc cho bằng hình, mô tả lại bằng cạnh)

- R1 có **2 instance**, đang cấp cho P2 và P3
- R2 có **2 instance**, đang cấp cho P1 và P4
- P1 **yêu cầu** R1
- P3 **yêu cầu** R2`,
      options: ['Có', 'Không'],
      answer: 1,
      explanation: `Đồ thị **có chu trình** P1 → R1 → P3 → R2 → P1, nhưng **không deadlock**.

Lý do: cả hai tài nguyên đều có **nhiều instance**, và những instance còn lại nằm trong tay **P2 và P4** — hai tiến trình **không chờ gì cả**.
\`\`\`
P2 chạy xong → nhả instance của R1 → P1 nhận được R1
P4 chạy xong → nhả instance của R2 → P3 nhận được R2
\`\`\`
Chu trình tự tan.

Quy tắc phải thuộc:
- Tài nguyên **1 instance**: có chu trình ⇔ **chắc chắn** deadlock.
- Tài nguyên **nhiều instance**: chu trình chỉ là **điều kiện cần**, phải xét thêm ai giữ instance ngoài chu trình.`,
    },
    {
      id: 'os-dl-32',
      topic: 'Đồ thị cấp phát',
      source: SOURCE,
      question: `Đồ thị cấp phát tài nguyên (RAG) sau có thể có Deadlock hay không? (đề gốc cho bằng hình, mô tả lại bằng cạnh)

- R1, R2, R3 mỗi loại có **1 instance**; R4 có 3 instance và **không liên quan** tới ai
- R1 cấp cho P2, R3 cấp cho P3, R2 cấp cho P1
- P1 **yêu cầu** R1, P2 **yêu cầu** R3, P3 **yêu cầu** R2`,
      options: ['Có', 'Không'],
      answer: 0,
      explanation: `Chu trình khép kín qua ba tiến trình:
\`\`\`
P1 → R1 → P2 → R3 → P3 → R2 → P1
\`\`\`

Khác với câu trước, ở đây **mỗi tài nguyên trong chu trình chỉ có 1 instance**, và instance duy nhất đó nằm trong tay một tiến trình **cũng đang chờ**. Không ai ngoài chu trình có thể giải cứu → **chắc chắn deadlock**.

**R4** có 3 instance rảnh nhưng vô dụng: không tiến trình nào trong chu trình cần nó. Đây là bài học quan trọng — *còn tài nguyên rảnh không có nghĩa là không deadlock*, phải đúng loại tài nguyên mà tiến trình đang chờ.

Với đồ thị toàn tài nguyên đơn instance, phát hiện deadlock rút gọn thành **tìm chu trình**, chạy DFS là xong.`,
    },
    {
      id: 'os-dl-33',
      topic: 'Banker',
      source: SOURCE,
      question:
        'Cho bảng dữ liệu của giải thuật **Banker** (cột Request là nhu cầu tối đa). Chuỗi cấp phát tài nguyên an toàn cho các tiến trình là:',
      code: `        Allocation      Request(Max)    Available
        R1 R2 R3 R4     R1 R2 R3 R4     R1 R2 R3 R4
P1      1  1  1  1      3  2  2  3      1  1  2  1
P2      1  1  0  1      2  2  2  2
P3      0  0  0  1      2  1  1  3
P4      1  2  1  1      2  4  4  3`,
      options: [
        'P4, P1, P2, P3',
        'P2, P3, P1, P4',
        'P2, P3, P1, * (Unsafe allocation chain)',
        'P1, P2, P3, P4',
      ],
      answer: 1,
      explanation: `Bước 1 — tính **Need = Request − Allocation**:
\`\`\`
        R1 R2 R3 R4
P1       2  1  1  2
P2       1  1  2  1
P3       2  1  1  2
P4       1  2  3  2
\`\`\`

Bước 2 — chạy safety algorithm với Available = (1,1,2,1):
\`\`\`
Avail (1,1,2,1) → P1 cần (2,1,1,2): R1 thiếu ✘
                  P2 cần (1,1,2,1): vừa khít ✔
   P2 xong, nhả (1,1,0,1)  →  Avail = (2,2,2,2)
Avail (2,2,2,2) → P3 cần (2,1,1,2) ✔
   P3 xong, nhả (0,0,0,1)  →  Avail = (2,2,2,3)
Avail (2,2,2,3) → P1 cần (2,1,1,2) ✔
   P1 xong, nhả (1,1,1,1)  →  Avail = (3,3,3,4)
Avail (3,3,3,4) → P4 cần (1,2,3,2) ✔
\`\`\`

Chuỗi an toàn: **P2 → P3 → P1 → P4**.

Mẹo nhìn nhanh: Available rất eo hẹp (chỉ 1 đơn vị R1), nên chỉ tiến trình nào cần **đúng bằng hoặc ít hơn** mới khởi động được — P2 là ứng viên duy nhất, thế là xác định ngay bước đầu.`,
    },
    {
      id: 'os-dl-34',
      topic: 'Banker',
      source: SOURCE,
      question:
        'Với bảng dữ liệu Banker bên dưới, **tổng tài nguyên ban đầu** của hệ thống cho R1, R2, R3, R4 là bao nhiêu?',
      code: `        Allocation      Request(Max)    Available
        R1 R2 R3 R4     R1 R2 R3 R4     R1 R2 R3 R4
P1      1  1  1  1      3  2  2  3      1  1  2  1
P2      1  1  0  1      2  2  2  2
P3      0  0  0  1      2  1  1  3
P4      1  2  1  1      2  4  4  3`,
      options: ['3, 4, 5, 6', '4, 3, 5, 7', '4, 5, 4, 5', '5, 5, 4, 4'],
      answer: 2,
      explanation: `Công thức: **Total = tổng Allocation + Available**. Tài nguyên hoặc đang nằm trong tay ai đó, hoặc đang rảnh, không còn khả năng nào khác.

\`\`\`
Cộng cột Allocation:
R1: 1 + 1 + 0 + 1 = 3
R2: 1 + 1 + 0 + 2 = 4
R3: 1 + 0 + 0 + 1 = 2
R4: 1 + 1 + 1 + 1 = 4

Cộng Available (1, 1, 2, 1):
Total = (3+1, 4+1, 2+2, 4+1) = (4, 5, 4, 5)
\`\`\`

Cột **Request/Max hoàn toàn không tham gia** phép tính này — nó là *nhu cầu* chứ không phải tài nguyên đang tồn tại. Đây chính là bẫy: nhiều người cộng nhầm cột Max và ra số lớn hơn thực tế.

Kiểm tra chéo: Max của mỗi tiến trình phải ≤ Total. P4 cần nhiều nhất (2,4,4,3), đều ≤ (4,5,4,5) — hợp lệ.`,
    },
  ],
};
