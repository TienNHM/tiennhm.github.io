import type {QuizSet} from '@site/src/components/Quiz/types';

const SOURCE = 'Cuối kỳ HĐH – SPKT';

export const boNhoAo: QuizSet = {
  id: 'os-bo-nho-ao',
  title: 'Chương 10: Bộ nhớ ảo và thay trang',
  description: 'Demand paging, bit valid-invalid, lỗi trang, thrashing, nghịch lý Belady và thời gian truy cập hiệu quả.',
  questions: [
    {
      id: 'os-va-01',
      topic: 'Demand paging',
      source: SOURCE,
      question:
        'Trong **Demand Paging**, mỗi mục bảng trang có một **bit valid-invalid**. Bit này mang giá trị **invalid** trong trường hợp nào?',
      options: [
        'trang đó bị tham chiếu sai',
        'trang đó không nằm trong bộ nhớ chính',
        'trang đó không nằm trong bảng trang',
        'trang đó không nằm trong bộ nhớ lôgic',
      ],
      answer: 1,
      explanation: `Bit valid-invalid trong demand paging mang **hai tầng ý nghĩa**:
- **valid (v)** — trang hợp lệ **và** đang nằm trong bộ nhớ chính, dịch địa chỉ bình thường.
- **invalid (i)** — trang **không nằm trong RAM**: hoặc đang ở trên đĩa (swap), hoặc không thuộc không gian địa chỉ của tiến trình.

Khi CPU chạm vào mục có bit invalid, phần cứng sinh **trap gọi là page fault**, hệ điều hành mới xem xét: nếu trang chỉ đang nằm trên đĩa thì nạp vào rồi bật bit lên v và chạy lại lệnh; nếu truy cập trái phép thì kết thúc tiến trình.

Chính cơ chế này cho phép **nạp lười** (lazy loading): chỉ trang nào được dùng mới nạp, nhờ vậy chương trình lớn hơn RAM vẫn khởi động nhanh.`,
    },
    {
      id: 'os-va-02',
      topic: 'Lỗi trang',
      source: SOURCE,
      question: 'Lỗi trang (page fault) xảy ra khi nào?',
      options: [
        'Khi một trang được yêu cầu không có trong bộ nhớ',
        'Khi một trang được yêu cầu nằm trong bộ nhớ',
        'Khi một ngoại lệ được phát ra',
        'Khi một trang bị gián đoạn',
      ],
      answer: 0,
      explanation: `**Page fault** = trang cần truy cập **không có trong bộ nhớ chính**, phát hiện qua bit valid-invalid.

Trình tự xử lý của hệ điều hành:
\`\`\`
1. Phần cứng sinh trap, lưu ngữ cảnh tiến trình
2. Kiểm tra tham chiếu có hợp lệ không
3. Tìm một khung trang trống (không có thì chạy thuật toán thay trang)
4. Nạp trang từ đĩa vào khung - tiến trình chuyển sang trạng thái waiting
5. Cập nhật bảng trang, bật bit valid
6. Chạy LẠI đúng lệnh đã gây lỗi
\`\`\`

Lưu ý bước cuối: lệnh được **thực thi lại từ đầu**, không phải chạy tiếp — đó là lý do phần cứng phải hỗ trợ khởi động lại lệnh.

Lỗi trang **không phải lỗi của chương trình**, nó là hoạt động bình thường của bộ nhớ ảo, chỉ là đắt về thời gian.`,
    },
    {
      id: 'os-va-03',
      topic: 'Thrashing',
      source: SOURCE,
      question: 'Khi xảy ra lỗi trang liên tục thì điều gì đang diễn ra trong hệ thống?',
      options: [
        'Các tiến trình trên hệ thống đang ở trạng thái running',
        'Các tiến trình trên hệ thống đang ở trạng thái waiting',
        'Tiến trình truy xuất đến trang đang có trong bộ nhớ',
        'Các tiến trình trên hệ thống thường xuyên truy cập các trang không có trong bộ nhớ',
      ],
      answer: 3,
      explanation: `Đây là mô tả của **thrashing** (trì trệ): các tiến trình liên tục chạm vào những trang không có trong RAM, nên hệ thống dành phần lớn thời gian để nạp/đẩy trang thay vì chạy lệnh.

Vòng xoáy chết người:
\`\`\`
Thiếu khung trang → nhiều lỗi trang → CPU rảnh vì ai cũng chờ I/O
   → HĐH tưởng còn dư sức, nạp thêm tiến trình
   → khung trang càng ít đi cho mỗi tiến trình → lỗi trang còn nhiều hơn
\`\`\`
Dấu hiệu nhận ra: **CPU utilization tụt** trong khi **độ đa chương tăng** và đĩa quay liên tục.

Cách chữa: cấp khung trang theo **working set** của tiến trình, dùng **page-fault frequency** để điều chỉnh, hoặc giảm độ đa chương bằng cách swap hẳn vài tiến trình ra ngoài.`,
    },
    {
      id: 'os-va-04',
      topic: 'Thay trang',
      source: SOURCE,
      question: 'Thuật toán thay thế trang nào có thể xuất hiện **nghịch lý Belady**?',
      options: ['FIFO', 'Optimal', 'Both LRU and Optimal', 'LRU'],
      answer: 0,
      explanation: `**FIFO** có thể gặp nghịch lý Belady: **tăng số khung trang mà số lỗi trang lại tăng**.

Chuỗi kinh điển \`1 2 3 4 1 2 5 1 2 3 4 5\`:
\`\`\`
3 khung  →  9 lỗi trang
4 khung  → 10 lỗi trang
\`\`\`

Nguyên nhân: FIFO **không phải thuật toán ngăn xếp**. Thuật toán ngăn xếp thoả tính bao hàm — tập trang nằm trong n khung luôn là tập con của tập trang nằm trong n+1 khung — nên thêm khung không bao giờ làm tệ đi.

**LRU** và **Optimal** đều là thuật toán ngăn xếp nên miễn nhiễm với nghịch lý này.

Nguồn gốc lỗi của FIFO: nó đuổi trang **vào sớm nhất** chứ không phải trang **ít dùng nhất**, nên hoàn toàn có thể đuổi đúng trang đang được dùng liên tục.`,
    },
    {
      id: 'os-va-05',
      topic: 'Hiệu năng',
      source: SOURCE,
      question:
        'Thời gian sửa một lỗi trang trung bình là **10 mili giây**, truy cập bộ nhớ mất **1 micro giây**. Với **hit ratio 99,99%**, thời gian truy cập bộ nhớ trung bình là bao nhiêu?',
      options: ['9.999 microseconds', '1.9999 microseconds', '1.9999 milliseconds', '1 milliseconds'],
      answer: 1,
      explanation: `\`\`\`
Tỷ lệ lỗi trang = 1 - 0.9999 = 0.0001
10 ms = 10.000 µs

EAT = 0.9999 × 1 µs  +  0.0001 × 10.000 µs
    = 0.9999 µs      +  1 µs
    = 1.9999 µs
\`\`\`

Con số này nói lên điều đáng sợ: chỉ **1 lỗi trang trên 10.000 lần truy cập** đã làm bộ nhớ chậm đi **gấp đôi**, vì một lần sửa lỗi trang đắt bằng **10.000 lần** truy cập RAM.

Muốn hiệu năng giảm dưới 10%, tỷ lệ lỗi trang phải nhỏ hơn khoảng **1 trên 100.000**. Đó là lý do hệ điều hành phải chăm chút thuật toán thay trang và tránh thrashing bằng mọi giá.`,
    },
    {
      id: 'os-va-06',
      topic: 'Thay trang',
      source: SOURCE,
      question:
        'Thuật toán thay thế trang nào có thể cho **tỷ lệ lỗi trang tăng** ngay cả khi số lượng khung được phân bổ **tăng lên**?',
      options: ['FIFO', 'MRU', 'Optimal', 'LRU'],
      answer: 0,
      explanation: `Vẫn là **nghịch lý Belady** của **FIFO**, chỉ hỏi theo lối khác.

Ghi nhớ ngắn gọn: **chỉ FIFO dính Belady**. Mọi thuật toán ngăn xếp (stack algorithm) — **LRU**, **Optimal**, **LFU** — đều miễn nhiễm, vì tập trang trong n khung luôn là tập con của tập trang trong n+1 khung.

**MRU** (Most Recently Used) đuổi trang vừa dùng gần nhất, là ý tưởng ngược với LRU và hiếm khi dùng thực tế; nó không phải đáp án của câu này.`,
    },
    {
      id: 'os-va-07',
      topic: 'Thay trang',
      source: SOURCE,
      question: 'Sự bất thường (nghịch lý) của **Belady** có nghĩa là gì?',
      options: [
        'Tỷ lệ lỗi trang không đổi ngay cả khi tăng số lượng khung được phân bổ',
        'Tỷ lệ lỗi trang có thể **tăng** khi **tăng** số lượng khung được phân bổ',
        'Tỷ lệ lỗi trang có thể giảm khi tăng số lượng khung được phân bổ',
        'Tỷ lệ lỗi trang có thể tăng khi giảm số lượng khung được phân bổ',
      ],
      answer: 1,
      explanation: `Định nghĩa chính xác: **thêm khung trang mà số lỗi trang lại tăng** — đi ngược trực giác "cho nhiều bộ nhớ hơn thì chạy tốt hơn".

Chú ý phương án nhiễu **c** và **d**: cả hai đều mô tả hành vi **bình thường, đúng như mong đợi** (thêm khung thì ít lỗi hơn, bớt khung thì nhiều lỗi hơn) nên không thể là "bất thường".

Ví dụ kiểm chứng với FIFO, chuỗi \`1 2 3 4 1 2 5 1 2 3 4 5\`: 3 khung cho 9 lỗi, 4 khung cho 10 lỗi.`,
    },
    {
      id: 'os-va-08',
      topic: 'Thrashing',
      source: SOURCE,
      question: '**Thrashing** trong phân trang theo yêu cầu là gì?',
      options: [
        'vượt quá I/O trang',
        'giảm I/O trang',
        'cải thiện hiệu suất hệ thống',
        'giảm mức độ đa chương trình',
      ],
      answer: 0,
      explanation: `Thrashing là tình trạng hệ thống **dành nhiều thời gian nạp/đẩy trang hơn là chạy lệnh** — tức **I/O trang vượt mức**.

Biểu hiện: CPU gần như rảnh, đĩa chạy hết công suất, thông lượng tụt thảm hại.

Hai phương án còn lại thực ra là **cách chữa**, không phải định nghĩa:
- **Giảm mức độ đa chương** là một biện pháp xử lý thrashing (swap hẳn vài tiến trình ra).
- **Giảm I/O trang** là kết quả mong muốn sau khi chữa.

Cách phòng: cấp khung theo **working set** của từng tiến trình, và theo dõi **page-fault frequency** để điều chỉnh kịp thời.`,
    },
    {
      id: 'os-va-09',
      topic: 'Bảng trang',
      source: SOURCE,
      question: '**Dirty bit** của một trang trong bảng trang dùng để làm gì?',
      options: [
        'Chỉ cho phép đọc trên một trang',
        'Giúp duy trì thông tin LRU',
        'không có cái nào đúng',
        'Giúp tránh ghi không cần thiết trên thiết bị phân trang',
      ],
      answer: 3,
      explanation: `**Dirty bit** (còn gọi là modify bit) được phần cứng bật lên khi trang **bị ghi**. Khi thay trang, hệ điều hành xem bit này:

\`\`\`
dirty = 0  →  trang trong RAM giống hệt bản trên đĩa
           →  ghi đè thẳng, KHỎI ghi ra đĩa
dirty = 1  →  đã bị sửa, phải ghi ngược ra đĩa trước khi đuổi
\`\`\`

Tiết kiệm được cả một lần ghi đĩa cho mỗi trang sạch — với trang code (chỉ đọc, không bao giờ dirty) thì tiết kiệm gần như toàn bộ.

Phân biệt với hai bit khác trên cùng mục bảng trang:
- **Reference bit** — được bật khi trang *được truy cập*, dùng cho xấp xỉ LRU và thuật toán Clock.
- **Protection bits** — quy định quyền đọc/ghi/thực thi, mới là thứ "chỉ cho phép đọc".`,
    },
    {
      id: 'os-va-10',
      topic: 'Thay trang',
      source: SOURCE,
      question:
        'Chuỗi tham chiếu trang có độ dài **p**, trong đó có **n** số trang riêng biệt; tiến trình được cấp **m** khung (ban đầu đều trống). **Giới hạn dưới** về số lỗi trang, đúng với **mọi** thuật toán thay trang, là bao nhiêu?',
      options: ['p − n', 'p', 'm', 'n'],
      answer: 3,
      explanation: `Đáp án là **n** — đúng bằng số trang riêng biệt.

Lý do: ban đầu mọi khung đều trống, nên **lần đầu tiên chạm vào mỗi trang riêng biệt chắc chắn gây một lỗi trang**. Không thuật toán nào tránh được những lỗi này, chúng có tên riêng là **compulsory miss** (lỗi bắt buộc, hay cold-start miss).

Vậy số lỗi trang luôn nằm trong khoảng:
\`\`\`
n  ≤  số lỗi trang  ≤  p
\`\`\`
- Cận dưới **n** đạt được khi m ≥ n (đủ khung để chứa hết, nạp xong là không lỗi nữa).
- Cận trên **p** xảy ra ở trường hợp tệ nhất, mỗi lần tham chiếu là một lỗi.

Đáp án **m** sai vì số khung không quyết định cận dưới; **p − n** cũng sai, đó chỉ là số lần tham chiếu lặp lại.`,
    },
    {
      id: 'os-va-11',
      topic: 'Thrashing',
      source: SOURCE,
      question: 'Thuật toán **tần suất lỗi trang (Page-Fault Frequency)** dùng để làm gì?',
      options: [
        'ngăn chặn tình trạng trì trệ (thrashing) xảy ra',
        'Đếm số lỗi trang',
        'giảm số frame',
        'tăng số frame',
      ],
      answer: 0,
      explanation: `**Page-Fault Frequency (PFF)** là chiến lược **chống thrashing trực tiếp**: thay vì đo working set (tốn kém), nó nhìn thẳng vào triệu chứng — tần suất lỗi trang — rồi điều chỉnh.

Cách hoạt động với hai ngưỡng:
\`\`\`
tần suất lỗi trang > ngưỡng trên  →  tiến trình thiếu khung → CẤP THÊM khung
tần suất lỗi trang < ngưỡng dưới  →  tiến trình thừa khung  → THU BỚT khung
\`\`\`
Nếu cần cấp thêm mà không còn khung rảnh, hệ điều hành **swap hẳn một tiến trình ra ngoài** để giải phóng.

Vì vậy "tăng số frame" và "giảm số frame" chỉ là **hành động cụ thể** trong từng tình huống, còn **mục đích** của thuật toán là giữ hệ thống khỏi rơi vào thrashing.`,
    },
    {
      id: 'os-va-12',
      topic: 'FIFO',
      source: SOURCE,
      question:
        'Dùng thuật toán thay trang **FIFO** trên chuỗi tham chiếu **1, 2, 3, 4, 1, 2, 4, 1, 4, 3, 2, 4** với **3 khung trang** trống. Số lỗi trang là bao nhiêu?',
      options: ['12', '10', '8', '7'],
      answer: 2,
      explanation: `FIFO đuổi trang **vào sớm nhất**, bất kể nó có đang được dùng nhiều hay không.
\`\`\`
Tham chiếu:  1   2   3   4   1   2   4   1   4   3   2   4
Khung 1:     1   1   1   4   4   4   4   4   4   3   3   3
Khung 2:         2   2   2   1   1   1   1   1   1   1   4
Khung 3:             3   3   3   2   2   2   2   2   2   2
Lỗi trang:   F   F   F   F   F   F   .   .   .   F   .   F
\`\`\`

Tổng cộng **8 lỗi trang**.

Chỗ thấy rõ điểm yếu của FIFO: ở bước thứ 10, trang **4** đang được dùng liên tục (ba lần liền trước đó) nhưng vẫn bị đuổi chỉ vì nó vào hàng đợi sớm nhất — và ngay bước cuối lại phải nạp về.

So sánh với hai thuật toán còn lại trên cùng chuỗi: **OPT 5 lỗi**, **LRU 8 lỗi**.`,
    },
    {
      id: 'os-va-13',
      topic: 'Optimal',
      source: SOURCE,
      question:
        'Dùng thuật toán **Optimal (OPT)** trên chuỗi **1, 2, 3, 4, 1, 2, 4, 1, 4, 3, 2, 4** với **3 khung trang**. Số lỗi trang là bao nhiêu?',
      options: ['10', '5', '6', '7'],
      answer: 1,
      explanation: `OPT đuổi trang **sẽ được dùng lại muộn nhất trong tương lai** — nhìn trước được nên luôn tối ưu.
\`\`\`
Tham chiếu:  1   2   3   4   1   2   4   1   4   3   2   4
Khung 1:     1   1   1   1   1   1   1   1   1   3   3   3
Khung 2:         2   2   2   2   2   2   2   2   2   2   2
Khung 3:             3   4   4   4   4   4   4   4   4   4
Lỗi trang:   F   F   F   F   .   .   .   .   .   F   .   .
\`\`\`

Tổng cộng **5 lỗi trang** — ít nhất có thể đạt được.

Hai quyết định then chốt:
- Bước 4 (nạp trang 4): đuổi **3** vì 3 mãi tới vị trí thứ 10 mới dùng lại, còn 1 và 2 dùng ngay sau đó.
- Bước 10 (nạp trang 3): đuổi **1** vì 1 **không bao giờ xuất hiện nữa**.

OPT không cài đặt được trong thực tế (phải biết trước tương lai) nhưng là **thước đo chuẩn** để đánh giá các thuật toán khác.`,
    },
    {
      id: 'os-va-14',
      topic: 'LRU',
      source: SOURCE,
      question:
        'Dùng thuật toán **LRU** trên chuỗi **1, 2, 3, 4, 1, 2, 4, 1, 4, 3, 2, 4** với **3 khung trang**. Số lỗi trang là bao nhiêu?',
      options: ['9', '8', '11', '7'],
      answer: 1,
      explanation: `LRU đuổi trang **lâu nhất chưa được dùng** — lấy quá khứ gần để đoán tương lai.
\`\`\`
Tham chiếu:  1   2   3   4   1   2   4   1   4   3   2   4
Khung 1:     1   1   1   4   4   4   4   4   4   4   4   4
Khung 2:         2   2   2   1   1   1   1   1   1   2   2
Khung 3:             3   3   3   2   2   2   2   3   3   3
Lỗi trang:   F   F   F   F   F   F   .   .   .   F   F   .
\`\`\`

Tổng cộng **8 lỗi trang**, bằng FIFO ở chuỗi này nhưng **không phải lúc nào cũng vậy** — LRU thường tốt hơn và không bao giờ dính nghịch lý Belady.

Cách cài đặt trong thực tế:
- **Counter**: mỗi mục bảng trang lưu thời điểm truy cập gần nhất, khi thay trang thì tìm giá trị nhỏ nhất.
- **Stack**: dùng danh sách liên kết đôi, trang vừa dùng được đẩy lên đỉnh.

Cả hai đều cần **hỗ trợ phần cứng đáng kể**, nên hệ thống thật thường dùng bản xấp xỉ bằng reference bit (thuật toán Clock).`,
    },
    {
      id: 'os-va-15',
      topic: 'Clock',
      source: SOURCE,
      question:
        'Dùng thuật toán **CLOCK** trên chuỗi **1, 2, 3, 4, 1, 2, 4, 1, 4, 3, 2, 4** với **3 khung trang**, **bit trạng thái = 1 cho mọi trường hợp**, con trỏ không di chuyển khi truy xuất trang. Số lỗi trang là bao nhiêu?',
      options: ['9', '8', '10', '7'],
      answer: 1,
      explanation: `CLOCK (second-chance) là **FIFO có thêm cơ hội thứ hai**: kim quét vòng tròn, gặp trang có reference bit = 1 thì **xoá bit về 0 và đi tiếp**, gặp bit = 0 thì đuổi trang đó.

Với giả thiết của đề — **mọi trang đều có bit = 1** — kim buộc phải quét một vòng xoá hết bit rồi quay lại vị trí ban đầu, và đuổi đúng trang mà FIFO sẽ đuổi. Vì vậy kết quả **trùng FIFO: 8 lỗi trang**.

Đây chính là tính chất cần nhớ:
\`\`\`
Mọi reference bit = 1  →  CLOCK suy biến thành FIFO
Mọi reference bit = 0  →  CLOCK đuổi ngay trang đầu tiên gặp, cũng là FIFO
Bit lẫn lộn 0 và 1     →  CLOCK xấp xỉ LRU, tốt hơn FIFO
\`\`\`

Ưu điểm khiến CLOCK được dùng thật (Linux, BSD): chỉ cần **1 bit phần cứng** cho mỗi trang, rẻ hơn LRU rất nhiều mà hiệu quả xấp xỉ.`,
    },
  ],
};
