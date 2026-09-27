import type {QuizSet} from '@site/src/components/Quiz/types';

const SOURCE = 'Cuối kỳ HĐH – SPKT';

export const diskIO: QuizSet = {
  id: 'os-disk-io',
  title: 'Chương 11: Hệ thống I/O và lập lịch đĩa',
  description: 'Seek time, rotational latency và các thuật toán lập lịch đĩa FCFS, SSTF, SCAN, C-SCAN.',
  questions: [
    {
      id: 'os-io-01',
      topic: 'Thời gian truy cập đĩa',
      source: SOURCE,
      question:
        'Thành phần nào là phần **chính** (chiếm nhiều thời gian nhất) khi truy cập dữ liệu trên đĩa?',
      options: ['Waiting time', 'Settle time', 'Rotational latency', 'Seek time'],
      answer: 3,
      explanation: `**Seek time** — thời gian di chuyển cần từ (arm) tới đúng rãnh (track) — là thành phần **đắt nhất** vì nó là chuyển động cơ học có quán tính, phải tăng tốc rồi hãm lại.

Các thành phần của một lần truy cập đĩa:
\`\`\`
Seek time          5 - 10 ms   ← lớn nhất, mục tiêu tối ưu của mọi thuật toán lập lịch đĩa
Rotational latency 2 - 4 ms    ← nửa vòng quay trung bình
Transfer time      < 1 ms      ← đọc/ghi dữ liệu thật
Settle time        ~ 0.1 ms    ← thời gian đầu từ ổn định sau khi dừng
\`\`\`

Chính vì seek time áp đảo mà **toàn bộ FCFS, SSTF, SCAN, C-SCAN** đều chỉ nhắm tới một việc: giảm quãng đường di chuyển của đầu đĩa.

Lưu ý: trên **SSD** không có bộ phận cơ học nên seek time gần như bằng 0, và các thuật toán lập lịch đĩa cổ điển mất ý nghĩa.`,
    },
    {
      id: 'os-io-02',
      topic: 'Thời gian truy cập đĩa',
      source: SOURCE,
      question: 'Thời gian để sector mong muốn **xoay tới dưới đầu đĩa** gọi là gì?',
      options: ['Settle time', 'Rotational latency', 'Waiting time', 'Seek time'],
      answer: 1,
      explanation: `**Rotational latency** (độ trễ quay): sau khi đầu từ đã tới đúng rãnh, vẫn phải **chờ đĩa quay** cho đúng sector cần đọc đi tới dưới đầu từ.

Giá trị trung bình bằng **nửa vòng quay**:
\`\`\`
7200 vòng/phút → 1 vòng = 60 / 7200 = 8.33 ms
Độ trễ quay trung bình = 8.33 / 2 ≈ 4.17 ms
\`\`\`

Phân biệt gọn:
- **Seek time** — di chuyển đầu từ **ngang** qua các rãnh.
- **Rotational latency** — chờ đĩa **quay** tới đúng sector.
- **Settle time** — thời gian đầu từ hết rung, ổn định sau khi dừng lại ở rãnh mới.`,
    },
    {
      id: 'os-io-03',
      topic: 'Lập lịch đĩa',
      source: SOURCE,
      question:
        'Thuật toán lập lịch đĩa nào dẫn đến khoảng cách di chuyển đầu đĩa ở mức **tối thiểu**?',
      options: ['SSTF', 'FCFS', 'SCAN', 'C-SCAN'],
      answer: 2,
      explanation: `Đáp án đề là **SCAN** (thuật toán thang máy): đầu đĩa quét một mạch từ đầu này sang đầu kia, phục vụ mọi yêu cầu gặp trên đường, rồi đảo chiều quét ngược lại. Vì đi theo một hướng cho tới cùng, nó **không bao giờ đi tới đi lui**, và tổng quãng đường bị chặn bởi hai lần chiều dài đĩa cho mỗi vòng quét.

**Lưu ý phân biệt:** **SSTF** chọn yêu cầu **gần đầu đĩa nhất ở mỗi bước**, nên từng bước thì ngắn nhất — nhiều tài liệu vì thế gọi SSTF là thuật toán tối thiểu quãng di chuyển. Nhưng SSTF **tham lam theo từng bước**, có thể nhảy qua nhảy lại quanh vị trí hiện tại và **không tối ưu toàn cục**, lại gây starvation. Đi thi nên bám theo đáp án đề, còn khi làm bài tính toán cụ thể thì cứ tính tổng quãng đường của từng thuật toán rồi so.

**FCFS** rõ ràng tệ nhất: phục vụ theo thứ tự đến nên đầu đĩa có thể quăng qua quăng lại suốt mặt đĩa.`,
    },
    {
      id: 'os-io-04',
      topic: 'Lập lịch đĩa',
      source: SOURCE,
      question: 'Thuật toán lập lịch đĩa nào dẫn đến tình trạng **starvation**?',
      options: ['C-SCAN', 'SCAN', 'SSTF', 'FCFS'],
      answer: 2,
      explanation: `**SSTF** (Shortest Seek Time First) gây starvation vì nó luôn chọn yêu cầu **gần đầu đĩa nhất**. Nếu các yêu cầu mới liên tục rơi vào vùng gần vị trí hiện tại, những yêu cầu ở rìa đĩa **không bao giờ tới lượt**.

Đây chính là bản sao của **SJF** trong lập lịch CPU: cùng kiểu tham lam, cùng kiểu bỏ đói.

Vì sao ba thuật toán kia an toàn:
- **SCAN** và **C-SCAN** quét hết mặt đĩa theo chu kỳ nên mọi yêu cầu chắc chắn được phục vụ trong một vòng quét — đây chính là **bounded waiting**.
- **FCFS** phục vụ đúng thứ tự đến, công bằng tuyệt đối dù hiệu năng kém.`,
    },
    {
      id: 'os-io-05',
      topic: 'Lập lịch đĩa',
      source: SOURCE,
      question:
        'Thuật toán lập lịch đĩa nào mà khi đầu đĩa di chuyển tới đầu kia thì **lập tức quay trở lại điểm bắt đầu mà không phục vụ yêu cầu nào** trên đường về?',
      options: ['SSTF', 'FCFS', 'C-SCAN', 'SCAN'],
      answer: 2,
      explanation: `**C-SCAN** (Circular SCAN): chỉ phục vụ theo **một chiều duy nhất**. Đi hết một đầu thì **nhảy thẳng về đầu kia** mà không phục vụ gì trên đường về, rồi lại quét theo chiều cũ.

\`\`\`
SCAN   :  0 →→→→→ 199  rồi  199 →→→→→ 0   (phục vụ cả hai chiều)
C-SCAN :  0 →→→→→ 199  rồi  nhảy về 0     (chỉ phục vụ chiều đi)
\`\`\`

Nghe có vẻ phí một chuyến, nhưng C-SCAN cho **thời gian chờ đồng đều hơn** SCAN. Lý do: với SCAN, vùng vừa được quét qua sẽ được phục vụ lại rất nhanh khi đầu đĩa đảo chiều, còn vùng ở rìa xa phải chờ lâu gấp đôi. C-SCAN biến mặt đĩa thành **danh sách vòng**, mọi rãnh đều chờ xấp xỉ một chu kỳ như nhau.

Biến thể thường gặp: **LOOK** và **C-LOOK** — giống SCAN/C-SCAN nhưng chỉ đi tới yêu cầu xa nhất rồi quay đầu, không chạm tới mép đĩa nếu không cần.`,
    },
    {
      id: 'os-io-06',
      topic: 'Thiết bị',
      source: SOURCE,
      question: 'Điều nào sau đây yêu cầu **trình điều khiển thiết bị** (device driver)?',
      options: ['Disk', 'Main memory', 'Register', 'Cache'],
      answer: 0,
      explanation: `**Đĩa** là thiết bị ngoại vi, giao tiếp qua bộ điều khiển (controller) với tập lệnh riêng của từng hãng, nên cần **device driver** — lớp phần mềm dịch các lời gọi chuẩn của kernel thành lệnh cụ thể cho thiết bị đó.

Ba thứ còn lại **nằm trong đường dữ liệu trực tiếp của CPU**, truy cập bằng lệnh máy chứ không qua driver:
- **Register** — CPU đọc/ghi thẳng bằng tên thanh ghi trong lệnh.
- **Cache** — phần cứng tự quản lý hoàn toàn, phần mềm không nhìn thấy.
- **Main memory** — truy cập bằng lệnh \`load\`/\`store\` qua MMU, không có driver nào ở giữa.

Quy tắc chung: cứ thiết bị nào **ngoài CPU và bộ nhớ chính** thì cần driver — đĩa, bàn phím, card mạng, GPU, máy in.`,
    },
    {
      id: 'os-io-07',
      topic: 'Lập lịch đĩa',
      source: SOURCE,
      question:
        'Các yêu cầu đĩa đến theo thứ tự **10, 22, 20, 2, 40, 6, 38** khi đầu đĩa đang ở **cylinder 20**. Thời gian tìm kiếm là **6 ms/cylinder**. Dùng **FCFS**, tổng thời gian tìm kiếm là bao nhiêu?',
      options: ['900 ms', '876 ms', '850 ms', '360 ms'],
      answer: 1,
      explanation: `FCFS phục vụ đúng thứ tự đến, cộng dồn quãng đường từng chặng:
\`\`\`
20 → 10 :  10
10 → 22 :  12
22 → 20 :   2
20 →  2 :  18
 2 → 40 :  38
40 →  6 :  34
 6 → 38 :  32
-----------------
Tổng    : 146 cylinder
\`\`\`

Thời gian = 146 × 6 = **876 ms**.

Nhìn vào bảng là thấy ngay nhược điểm của FCFS: đầu đĩa **quăng qua quăng lại** (20 → 2 → 40 → 6 → 38) mà không hề gom nhóm các yêu cầu gần nhau.

So sánh: dùng **SSTF** cho cùng bộ yêu cầu thì quãng đường chỉ còn 20 → 22 → 20 ... khoảng 60 cylinder, tức chưa tới một nửa.`,
    },
    {
      id: 'os-io-08',
      topic: 'Cấu trúc đĩa',
      source: SOURCE,
      question:
        'Một đĩa có **8 bề mặt**, **64 track** mỗi bề mặt, **256 sector** mỗi track, mỗi sector chứa **512 byte**. Dung lượng đĩa và số bit cần để chỉ định một sector cụ thể lần lượt là:',
      options: ['256 MB, 17 bits', '64 GB, 28 bits', '64 MB, 17 bits', '256 MB, 19 bits'],
      answer: 2,
      explanation: `**Dung lượng** = số bề mặt × số track × số sector × kích thước sector:
\`\`\`
8 × 64 × 256 × 512 byte
= 2^3 × 2^6 × 2^8 × 2^9
= 2^26 byte = 64 MB
\`\`\`

**Số bit địa chỉ sector** = log2(tổng số sector):
\`\`\`
Tổng số sector = 8 × 64 × 256 = 2^3 × 2^6 × 2^8 = 2^17
→ cần 17 bit
\`\`\`

Cách chia nhỏ 17 bit đó cũng chính là địa chỉ CHS vật lý: **3 bit** chọn bề mặt (đầu từ), **6 bit** chọn track, **8 bit** chọn sector.

Mẹo tính nhanh: đổi hết sang luỹ thừa của 2 rồi cộng số mũ, khỏi nhân số lớn.`,
    },
  ],
};
