import type {QuizSet} from '@site/src/components/Quiz/types';

const SOURCE = 'Cuối kỳ HĐH – SPKT';

export const paging: QuizSet = {
  id: 'os-paging',
  title: 'Chương 9: Phân trang, bảng trang và TLB',
  description: 'Bảng trang đa cấp, kích thước bảng trang, số bit địa chỉ, thời gian truy cập hiệu quả với TLB.',
  questions: [
    {
      id: 'os-pg-01',
      topic: 'Bảng trang',
      source: SOURCE,
      question:
        'Trong hệ thống có địa chỉ ảo **32 bit** và kích thước trang **1 KB**, việc sử dụng **bảng trang một cấp** để dịch địa chỉ là không thực tế vì …',
      options: [
        'Số lượng lớn phân mảnh nội bộ',
        'Số lượng lớn phân mảnh bên ngoài',
        'Chi phí bộ nhớ lớn trong việc duy trì các bảng trang',
        'Chi phí tính toán lớn trong quá trình dịch',
      ],
      answer: 2,
      explanation: `Tính thử kích thước bảng trang một cấp:
\`\`\`
Trang 1 KB = 2^10  →  offset 10 bit
Số hiệu trang       =  32 - 10 = 22 bit
Số mục bảng trang   =  2^22 ≈ 4 triệu mục
Mỗi mục 4 byte      →  bảng trang ≈ 16 MB
\`\`\`

**16 MB cho mỗi tiến trình**, và bảng này phải nằm liên tục trong bộ nhớ. Chạy 50 tiến trình là 800 MB chỉ để chứa bảng trang, trong khi phần lớn số mục không bao giờ được dùng vì tiến trình chẳng đụng tới toàn bộ không gian địa chỉ.

Phân mảnh không phải vấn đề ở đây: phân trang **triệt tiêu phân mảnh ngoài**, còn phân mảnh trong tối đa chỉ là một trang (dưới 1 KB) cho mỗi tiến trình.

Lời giải cho vấn đề này là **bảng trang đa cấp**, bảng trang băm hoặc bảng trang nghịch đảo.`,
    },
    {
      id: 'os-pg-02',
      topic: 'Bảng trang',
      source: SOURCE,
      question:
        'Giải pháp bảng trang nào sẽ tiết kiệm chi phí bộ nhớ trong việc duy trì bảng trang?',
      options: ['Không giải pháp nào', 'Bảng trang 2 cấp', 'Bảng trang lồng nhau', 'Bảng trang 1 cấp'],
      answer: 1,
      explanation: `**Bảng trang 2 cấp** tiết kiệm bộ nhớ nhờ một mẹo đơn giản: **chỉ tạo bảng cấp 2 cho những vùng địa chỉ thật sự được dùng**.

Một tiến trình điển hình chỉ đụng tới vài vùng nhỏ của không gian địa chỉ (code, heap ở dưới, stack ở trên), phần giữa mênh mông bỏ trống. Với bảng một cấp, toàn bộ mục vẫn phải tồn tại. Với hai cấp, mục nào của bảng ngoài trỏ vào vùng không dùng thì để **null**, khỏi cấp bảng cấp 2 nào cả.

Ví dụ cụ thể: thay vì 4 MB bảng trang một cấp, tiến trình nhỏ chỉ cần bảng ngoài 4 KB cộng vài bảng trong 4 KB — vài chục KB thay vì vài MB.

Cái giá phải trả: mỗi lần dịch địa chỉ phải tra **hai lần bộ nhớ** thay vì một. Đó chính là lý do TLB trở nên thiết yếu.`,
    },
    {
      id: 'os-pg-03',
      topic: 'Bảng trang đa cấp',
      source: SOURCE,
      question:
        'Hệ thống có địa chỉ ảo **32 bit**, kích thước trang **4 KB**, dùng bảng trang **2 cấp**. Bảng trang cấp 1 có **1024 mục**. Hỏi có bao nhiêu **bảng trang cấp 2**?',
      options: ['1', '1024', '2', '2048'],
      answer: 1,
      explanation: `Nguyên tắc: **mỗi mục của bảng cấp 1 trỏ tới đúng một bảng cấp 2**. Bảng cấp 1 có 1024 mục → tối đa **1024 bảng cấp 2**.

Kiểm tra lại bằng số bit:
\`\`\`
Trang 4 KB = 2^12      →  offset d = 12 bit
Số hiệu trang           =  32 - 12 = 20 bit
Bảng cấp 1 có 1024 mục →  p1 = 10 bit
Còn lại                 →  p2 = 20 - 10 = 10 bit

Cấu trúc địa chỉ:  p1 (10) | p2 (10) | d (12)
\`\`\`

Số bảng cấp 2 = 2^p1 = 2^10 = **1024**, mỗi bảng có 2^p2 = 1024 mục.

Phân biệt hai câu hỏi rất dễ lẫn: **"bao nhiêu bảng cấp 2"** tính theo p1, còn **"mỗi bảng cấp 2 có bao nhiêu mục"** tính theo p2.`,
    },
    {
      id: 'os-pg-04',
      topic: 'Bảng trang đa cấp',
      source: SOURCE,
      question:
        'Hệ thống có địa chỉ ảo **32 bit**, kích thước trang **2 KB**, dùng bảng trang **2 cấp**. Bảng trang cấp 1 có **1024 mục**. Hỏi **mỗi bảng trang cấp 2** có bao nhiêu mục?',
      options: ['1024', '1000', '4096', '2048'],
      answer: 3,
      explanation: `\`\`\`
Trang 2 KB = 2^11      →  offset d = 11 bit
Số hiệu trang           =  32 - 11 = 21 bit
Bảng cấp 1 có 1024 mục →  p1 = 10 bit
Còn lại                 →  p2 = 21 - 10 = 11 bit

Cấu trúc địa chỉ:  p1 (10) | p2 (11) | d (11)
\`\`\`

Mỗi bảng cấp 2 có **2^11 = 2048 mục**.

So với câu trang 4 KB ở trên: trang nhỏ đi một nửa thì offset bớt 1 bit, bit đó chuyển sang p2 nên số mục mỗi bảng cấp 2 **tăng gấp đôi**. Tổng số mục của cả hệ thống bảng trang cũng tăng gấp đôi — đây là đánh đổi kinh điển của việc chọn kích thước trang nhỏ.`,
    },
    {
      id: 'os-pg-05',
      topic: 'Bảng trang đa cấp',
      source: SOURCE,
      question:
        'Hệ thống có địa chỉ ảo **36 bit**, dùng bảng trang 2 cấp theo cấu trúc (12 bit | 11 bit | 13 bit) như hình. Hỏi có bao nhiêu **bảng trang cấp 1** (outer page)?',
      code: `outer page   inner page   offset
    p1           p2           d
    12           11           13`,
      options: ['2', '1', '3', '12'],
      answer: 1,
      explanation: `Câu này kiểm tra hiểu bản chất chứ không phải tính toán: **bảng trang cấp 1 luôn chỉ có duy nhất 1 bảng** cho mỗi tiến trình.

Nó là gốc của cây bảng trang, và thanh ghi **PTBR** (Page Table Base Register) của tiến trình trỏ thẳng vào bảng này. Có hai bảng gốc thì phần cứng biết đi theo bảng nào?

Đừng nhầm với ba con số dễ lẫn:
- **Số bảng cấp 1** = 1 (luôn luôn)
- **Số mục của bảng cấp 1** = 2^12 = 4096
- **Số bảng cấp 2** = cũng 4096, vì mỗi mục của bảng cấp 1 trỏ tới một bảng cấp 2`,
    },
    {
      id: 'os-pg-06',
      topic: 'Bảng trang đa cấp',
      source: SOURCE,
      question:
        'Hệ thống có địa chỉ ảo **36 bit**, dùng bảng trang 2 cấp theo cấu trúc (12 bit | 11 bit | 13 bit) như hình. Hỏi có bao nhiêu **bảng trang cấp 2** (inner page)?',
      code: `outer page   inner page   offset
    p1           p2           d
    12           11           13`,
      options: ['1024', '8192', '4096', '2048'],
      answer: 2,
      explanation: `Số bảng cấp 2 = số mục của bảng cấp 1 = **2^p1 = 2^12 = 4096**.

Đọc trọn cấu trúc địa chỉ để khỏi lẫn:
\`\`\`
p1 = 12 bit  →  4096 mục ở bảng cấp 1  →  4096 bảng cấp 2
p2 = 11 bit  →  mỗi bảng cấp 2 có 2048 mục
d  = 13 bit  →  kích thước trang = 2^13 = 8 KB
\`\`\`

Kiểm tra chéo: tổng số trang của không gian địa chỉ = 2^(12+11) = 2^23, nhân kích thước trang 2^13 = 2^36 byte, đúng bằng không gian địa chỉ 36 bit. Khớp.

Đáp án **8192** là bẫy: đó là kích thước trang tính bằng byte, không phải số bảng.`,
    },
    {
      id: 'os-pg-07',
      topic: 'Bảng trang',
      source: SOURCE,
      question:
        'Hệ thống có địa chỉ logic **32 bit**, kích thước trang **4 KB**, mỗi mục trong bảng trang có kích thước **4 byte**. Kích thước của bảng trang tính bằng **megabyte** là bao nhiêu?',
      options: ['10', '2', '8', '4'],
      answer: 3,
      explanation: `\`\`\`
Trang 4 KB = 2^12         →  offset 12 bit
Số hiệu trang              =  32 - 12 = 20 bit
Số mục bảng trang          =  2^20 mục
Kích thước = 2^20 × 4 byte =  2^22 byte = 4 MB
\`\`\`

Công thức chung đáng thuộc:
\`\`\`
Kích thước bảng trang = (không gian địa chỉ / kích thước trang) × kích thước một mục
\`\`\`

Con số 4 MB cho **mỗi tiến trình** chính là lý do người ta phải dùng bảng trang đa cấp — nối thẳng với hai câu ở trên.`,
    },
    {
      id: 'os-pg-08',
      topic: 'TLB',
      source: SOURCE,
      question:
        'Phần cứng phân trang có TLB, toàn bộ bảng trang và các trang đều nằm trong bộ nhớ vật lý. Mất **10 ms** để tìm kiếm TLB và **80 ms** để truy cập bộ nhớ vật lý. Nếu **tỷ lệ truy cập TLB (hit ratio) là 0,6** thì thời gian truy cập bộ nhớ hiệu quả là bao nhiêu?',
      options: ['122', '121', '120', '119'],
      answer: 0,
      explanation: `\`\`\`
TLB hit  (60%): tra TLB + đọc dữ liệu      = 10 + 80      = 90 ms
TLB miss (40%): tra TLB + đọc bảng trang
                + đọc dữ liệu              = 10 + 80 + 80 = 170 ms

EAT = 0.6 × 90 + 0.4 × 170 = 54 + 68 = 122 ms
\`\`\`

Điểm dễ sai nhất: khi **trượt TLB** vẫn phải cộng thời gian tra TLB (10 ms), vì phần cứng luôn tra TLB trước rồi mới biết là trượt.

Thấy ngay giá trị của TLB: hit ratio 0,6 đã cho 122 ms; nâng lên **0,98** thì EAT = 0,98 × 90 + 0,02 × 170 = **91,6 ms**, gần bằng trường hợp lý tưởng. Đó là lý do TLB thật luôn đạt tỷ lệ trúng trên 95%.

*Ghi chú:* đề gốc in nhầm, có hai phương án cùng ghi 122; ở đây phương án thừa được đổi thành 119.`,
    },
    {
      id: 'os-pg-09',
      topic: 'Địa chỉ',
      source: SOURCE,
      question:
        'Hệ thống quản lý bộ nhớ có **64 trang**, kích thước trang **512 byte**, bộ nhớ vật lý gồm **32 khung trang**. Số lượng bit cần trong **địa chỉ logic** và **địa chỉ vật lý** tương ứng là:',
      options: ['14 và 29', '14 và 15', '16 và 32', '15 và 14'],
      answer: 3,
      explanation: `Cả hai loại địa chỉ đều có chung phần **offset**, chỉ khác phần đầu:
\`\`\`
Kích thước trang 512 = 2^9   →  offset = 9 bit  (dùng chung)

Địa chỉ logic:  64 trang  = 2^6  →  6 + 9 = 15 bit
Địa chỉ vật lý: 32 khung  = 2^5  →  5 + 9 = 14 bit
\`\`\`

Vậy đáp án là **15 và 14**.

Chi tiết đáng chú ý: địa chỉ vật lý **ngắn hơn** địa chỉ logic, nghĩa là bộ nhớ vật lý (16 KB) nhỏ hơn không gian địa chỉ ảo (32 KB) — hoàn toàn bình thường, đó chính là lý do cần bộ nhớ ảo và swap.`,
    },
    {
      id: 'os-pg-10',
      topic: 'TLB',
      source: SOURCE,
      question: 'Bộ nhớ **TLB (Translation Look-aside Buffer)** là gì?',
      options: [
        'có tốc độ truy xuất trang chậm hơn bộ nhớ chính',
        'chứa các trang cần tìm kiếm sau khi đã tìm trong bảng trang',
        'là bộ nhớ thứ cấp',
        'được sử dụng để lưu trữ các trang được truy cập gần hiện tại nhất',
      ],
      answer: 3,
      explanation: `TLB là **bộ nhớ cache tốc độ cao nằm trong MMU**, lưu các cặp *(số hiệu trang → số khung trang)* vừa được dùng gần đây.

Sửa lại từng phương án sai:
- TLB **nhanh hơn** bộ nhớ chính rất nhiều, không chậm hơn — nó là associative memory, so sánh song song mọi mục cùng lúc.
- TLB được tra **trước** bảng trang, không phải sau.
- TLB nằm trong CPU, không phải bộ nhớ thứ cấp (thứ cấp là ổ đĩa).

Vì sao TLB nhỏ (thường 64–1024 mục) mà vẫn hiệu quả: chương trình có **tính cục bộ** — truy cập bộ nhớ dồn vào vài trang trong một khoảng thời gian ngắn.

Một chi tiết hay bị hỏi: khi **chuyển ngữ cảnh**, TLB phải bị **xả** (flush) vì ánh xạ của tiến trình cũ không còn đúng — trừ khi phần cứng có ASID để gắn mỗi mục với một tiến trình.`,
    },
    {
      id: 'os-pg-11',
      topic: 'Bảng trang băm',
      source: SOURCE,
      question: 'Trong **Hashed Page Table**, giá trị nào được băm (hash)?',
      options: ['Physical address', 'Page number', 'Logic address', 'Frame number'],
      answer: 1,
      explanation: `**Số hiệu trang ảo (page number)** là thứ được đưa vào hàm băm.

Cách hoạt động:
\`\`\`
hash(page number) → chỉ số trong bảng băm
                  → danh sách liên kết các phần tử
                  → so khớp page number, lấy frame number tương ứng
\`\`\`
Mỗi phần tử trong danh sách chứa ba trường: *số hiệu trang ảo, số khung trang, con trỏ tới phần tử kế tiếp* — cần lưu lại số hiệu trang vì nhiều trang có thể băm trùng ô (collision).

Vì sao dùng nó: với không gian địa chỉ **64 bit**, bảng trang đa cấp phải lên tới 5–6 cấp, tra địa chỉ quá tốn. Bảng băm chỉ cần **một lần băm** rồi duyệt chuỗi ngắn.

Đừng chọn *frame number* — đó là **kết quả** tra cứu, không phải khoá tra.`,
    },
    {
      id: 'os-pg-12',
      topic: 'TLB',
      source: SOURCE,
      question:
        'CPU tạo ra địa chỉ ảo **32 bit**, kích thước trang **4 KB**. TLB chứa tổng cộng **128 mục** và là bộ liên kết **4 chiều** (4-way set associative). Kích thước **tối thiểu của TLB tag** là bao nhiêu?',
      options: ['14 bits', '11 bits', '13 bits', '15 bits'],
      answer: 3,
      explanation: `\`\`\`
Trang 4 KB = 2^12          →  offset 12 bit
Số hiệu trang ảo (VPN)      =  32 - 12 = 20 bit

TLB 128 mục, 4-way         →  số set = 128 / 4 = 32 = 2^5
                           →  index 5 bit

TLB tag = VPN - index = 20 - 5 = 15 bit
\`\`\`

Cách hiểu: với bộ nhớ liên kết theo tập, **chỉ số set** được suy ra trực tiếp từ VPN nên không cần lưu lại; chỉ phần còn lại của VPN mới phải lưu làm **tag** để phân biệt các trang cùng rơi vào một set.

Hai thái cực để kiểm tra logic:
- **Fully associative** (1 set): index 0 bit → tag = trọn 20 bit.
- **Direct mapped** (128 set = 2^7): index 7 bit → tag = 13 bit.

Càng nhiều đường liên kết thì tag càng dài, đổi lại tỷ lệ trúng cao hơn.`,
    },
    {
      id: 'os-pg-13',
      topic: 'Bảng trang nghịch đảo',
      source: SOURCE,
      question: 'Trong **Inverted Page Table**, mỗi mục chứa giá trị nào?',
      options: [
        'process-id, page-number',
        'page-number, frame-number',
        'page-number, page-offset',
        'process-id, frame-number',
      ],
      answer: 0,
      explanation: `Bảng trang nghịch đảo lật ngược cách đánh chỉ mục: **chỉ số của mục chính là số khung trang**, nên khung trang không cần lưu trong mục. Thứ phải lưu là **ai đang dùng khung đó**:

\`\`\`
mục thứ i  ↔  khung trang i
nội dung   =  <process-id, page-number>
\`\`\`

Khi CPU sinh địa chỉ, phần cứng tìm trong bảng cặp *(pid, page number)* khớp; **vị trí tìm thấy chính là số khung trang**.

Ưu điểm: toàn hệ thống chỉ có **một bảng duy nhất**, kích thước tỷ lệ với **RAM thật** chứ không phải với số tiến trình — cực kỳ đáng giá trên hệ 64 bit.

Nhược điểm: phải **tìm kiếm** thay vì tra trực tiếp, nên chậm; thường phải kết hợp bảng băm và TLB để cứu vãn. Ngoài ra rất khó cài đặt bộ nhớ chia sẻ, vì mỗi khung chỉ ghi được một chủ.`,
    },
    {
      id: 'os-pg-14',
      topic: 'Dịch địa chỉ',
      source: SOURCE,
      question:
        'Tiến trình được nạp theo mô hình phân trang, kích thước trang **512 byte**, bảng trang như bên dưới. Địa chỉ logic **689** được dịch thành địa chỉ vật lý nào?',
      code: `Trang   Khung
  0       2
  1       6
  2       5
  3       3`,
      options: ['3248', '3064', '3249', '2048'],
      answer: 2,
      explanation: `\`\`\`
Số hiệu trang = 689 / 512 = 1
Offset        = 689 % 512 = 689 - 512 = 177

Bảng trang: trang 1 → khung 6

Địa chỉ vật lý = 6 × 512 + 177 = 3072 + 177 = 3249
\`\`\`

Quy trình ba bước luôn đúng: **chia lấy thương ra số trang → tra bảng lấy khung → nhân lại rồi cộng offset**.

Bẫy trong các phương án: **3248** là kết quả nếu tính nhầm offset thành 176, còn **3064** là 5 × 512 + 504, tức tra nhầm sang khung của trang 2.`,
    },
    {
      id: 'os-pg-15',
      topic: 'Dịch địa chỉ',
      source: SOURCE,
      question:
        'Cùng hệ thống phân trang với kích thước trang **512 byte** và bảng trang bên dưới. Địa chỉ logic **1613** được dịch thành địa chỉ vật lý nào?',
      code: `Trang   Khung
  0       2
  1       6
  2       5
  3       3`,
      options: ['2048', '2125', '1613', '3064'],
      answer: 2,
      explanation: `\`\`\`
Số hiệu trang = 1613 / 512 = 3   (vì 3 × 512 = 1536)
Offset        = 1613 - 1536 = 77

Bảng trang: trang 3 → khung 3

Địa chỉ vật lý = 3 × 512 + 77 = 1536 + 77 = 1613
\`\`\`

Địa chỉ vật lý **trùng đúng** địa chỉ logic — không phải trùng hợp ngẫu nhiên mà vì trang 3 tình cờ được ánh xạ vào khung 3. Bất cứ khi nào *số trang = số khung*, hai địa chỉ bằng nhau.

Đây chính là cái bẫy của câu: thấy đáp án y hệt đề bài, nhiều người nghĩ mình tính sai nên đổi sang phương án khác.`,
    },
    {
      id: 'os-pg-16',
      topic: 'Bảng trang',
      source: SOURCE,
      question: 'Nội dung cần thiết trong mỗi mục nhập của bảng trang là gì?',
      options: [
        'Cả virtual page number và page frame number',
        'Page frame number',
        'Truy cập thông tin phù hợp',
        'Virtual page number',
      ],
      answer: 1,
      explanation: `Chỉ cần **page frame number**. Lý do: bảng trang được **đánh chỉ mục bằng chính số hiệu trang ảo** — mục thứ i ứng với trang ảo i — nên lưu lại số hiệu trang là thừa.

\`\`\`
page_table[VPN]  →  frame number  (+ các bit điều khiển)
\`\`\`

Ngoài số khung, mỗi mục thực tế còn vài **bit cờ**: valid-invalid, protection (r/w/x), reference, dirty (modify). Nhưng thành phần *bắt buộc* để dịch địa chỉ vẫn là số khung trang.

Đối chiếu với **bảng trang nghịch đảo** ở câu trên để thấy sự đối xứng: bảng thường đánh chỉ mục bằng số trang nên lưu số khung; bảng nghịch đảo đánh chỉ mục bằng số khung nên phải lưu số trang cùng process-id.`,
    },
    {
      id: 'os-pg-17',
      topic: 'Dịch địa chỉ',
      source: SOURCE,
      question:
        'Phân trang với **kích thước trang = kích thước khung = 100K**, bộ nhớ bắt đầu từ 0K, bảng trang PMT như dưới đây. Địa chỉ vật lý ứng với địa chỉ logic **⟨3, 20K⟩** là bao nhiêu?',
      code: `p   f
0   7
1   2
2   5
3   4`,
      options: ['220K', '520K', '420K', '720K'],
      answer: 2,
      explanation: `\`\`\`
Trang p = 3  →  tra PMT  →  khung f = 4
Địa chỉ vật lý = f × kích thước khung + d
               = 4 × 100K + 20K = 420K
\`\`\`

Công thức tổng quát cho mọi bài dịch địa chỉ phân trang:
\`\`\`
Địa chỉ vật lý = (số khung × kích thước trang) + offset
\`\`\`

Khác với phân đoạn, phân trang **không cần kiểm tra giới hạn theo từng mục**: offset luôn nhỏ hơn kích thước trang theo thiết kế, vì nó chỉ chiếm đúng số bit dành cho offset.

Các đáp án nhiễu đều là kết quả của việc tra nhầm hàng: 220K ứng với khung 2 (trang 1), 520K với khung 5 (trang 2), 720K với khung 7 (trang 0).`,
    },
    {
      id: 'os-pg-18',
      topic: 'Dịch địa chỉ',
      source: SOURCE,
      question:
        'Cùng bảng PMT và kích thước trang 100K. Địa chỉ vật lý **730K** ứng với địa chỉ logic ⟨p, d⟩ nào?',
      code: `p   f
0   7
1   2
2   5
3   4`,
      options: ['p=3; d=30K', 'p=0; d=30K', 'p=2; d=30K', 'p=1; d=30K'],
      answer: 1,
      explanation: `Dịch ngược, chia cho kích thước khung:
\`\`\`
730K / 100K = 7 dư 30K
→ khung f = 7, offset d = 30K
\`\`\`

Bước quan trọng: **tra ngược bảng PMT** để tìm trang nào ánh xạ vào khung 7. Nhìn cột f thấy hàng **p = 0** có f = 7.

Vậy địa chỉ logic là **⟨0, 30K⟩**.

Sai lầm hay gặp: lấy luôn 7 làm số trang. Nhưng 7 là **số khung vật lý**, còn số trang phải tra ngược từ bảng — ở đây hai giá trị hoàn toàn khác nhau.`,
    },
    {
      id: 'os-pg-19',
      topic: 'Phân đoạn kết hợp phân trang',
      source: SOURCE,
      question:
        'Phân đoạn kết hợp phân trang, kích thước trang 100K. Bảng SMT và các bảng PMT như dưới đây. Địa chỉ vật lý ứng với địa chỉ logic **⟨1, 120K⟩** là bao nhiêu?',
      code: `SMT                    PMT của S0      PMT của S1      PMT của S2
S  Kích thước  PMT     p  f           p  f            p  f
0  300K        (0)     0  5           0  3            0  8
1  400K        (1)     1  4           1  7            1  2
2  500K        (2)     2  1           2  10           2  6
                                      3  9            3  15
                                                      4  12`,
      options: ['720K', '1020K', '920K', '320K'],
      answer: 0,
      explanation: `Ba bước, lần lượt qua hai bảng:
\`\`\`
1. s = 1  →  dùng PMT của S1
2. Tách offset 120K trong segment thành trang + offset:
   p = 120K / 100K = 1 ,  d = 20K
3. Tra PMT của S1: trang 1 → khung 7
   Địa chỉ vật lý = 7 × 100K + 20K = 720K
\`\`\`

Mô hình này lấy ưu điểm của cả hai: **segment** cho cấu trúc logic (code, data, stack riêng biệt với quyền truy cập riêng), **paging** bên trong mỗi segment để **triệt tiêu phân mảnh ngoài**.

Cái giá: mỗi lần truy cập bộ nhớ phải tra **hai bảng**, nên TLB càng quan trọng.`,
    },
    {
      id: 'os-pg-20',
      topic: 'Phân đoạn kết hợp phân trang',
      source: SOURCE,
      question:
        'Cùng hệ thống phân đoạn kết hợp phân trang. Địa chỉ vật lý **1520K** ứng với địa chỉ logic nào?',
      code: `SMT                    PMT của S0      PMT của S1      PMT của S2
S  Kích thước  PMT     p  f           p  f            p  f
0  300K        (0)     0  5           0  3            0  8
1  400K        (1)     1  4           1  7            1  2
2  500K        (2)     2  1           2  10           2  6
                                      3  9            3  15
                                                      4  12`,
      options: ['s=0; d=120K', 's=3; d=420K', 's=1; d=220K', 's=2; d=320K'],
      answer: 3,
      explanation: `\`\`\`
1. 1520K / 100K = 15 dư 20K   →  khung f = 15, offset = 20K
2. Tìm khung 15 trong các PMT:
   PMT của S0: 5, 4, 1        → không có
   PMT của S1: 3, 7, 10, 9    → không có
   PMT của S2: 8, 2, 6, 15, 12 → CÓ, ở trang p = 3
3. s = 2, p = 3
   d = p × 100K + offset = 3 × 100K + 20K = 320K
\`\`\`

Vậy địa chỉ logic là **⟨2, 320K⟩**.

Bước dễ quên nhất là bước 3: sau khi biết segment và trang, phải **ghép lại** thành offset trong segment bằng công thức *p × kích thước trang + offset*, chứ không phải chỉ trả về số trang.`,
    },
    {
      id: 'os-pg-21',
      topic: 'Cấu trúc địa chỉ',
      source: SOURCE,
      question:
        'Địa chỉ logic **n = 32 bit** có dạng ⟨n−m | m⟩, trong đó m bit thấp là offset trong trang. Nếu chọn **m = 12** thì kích thước trang là 4 KB và **số lượng trang** là bao nhiêu?',
      code: `|<--- n - m --->|<--------- m --------->|
| Số hiệu trang |    Offset trong trang    |
n-m-1          m  m-1                     0`,
      options: ['2097152', '262144', '1048576', '524288'],
      answer: 2,
      explanation: `\`\`\`
m = 12        →  kích thước trang = 2^12 = 4096 byte = 4 KB  ✔
Số hiệu trang = n - m = 32 - 12 = 20 bit
Số lượng trang = 2^20 = 1.048.576 trang
\`\`\`

Kiểm tra chéo: 1.048.576 trang × 4 KB = 4 GB, đúng bằng không gian địa chỉ 32 bit. Khớp.

Các đáp án nhiễu tương ứng với lựa chọn m khác:
\`\`\`
2^21 = 2.097.152  →  m = 11, trang 2 KB
2^19 =   524.288  →  m = 13, trang 8 KB
2^18 =   262.144  →  m = 14, trang 16 KB
\`\`\`

Quan hệ đánh đổi cần nhớ: **trang càng lớn thì số trang càng ít** (bảng trang nhỏ gọn) nhưng **phân mảnh trong càng nhiều**.`,
    },
    {
      id: 'os-pg-22',
      topic: 'Bảng trang đa cấp',
      source: SOURCE,
      question:
        'Windows x86 tổ chức bảng trang **2 cấp** với cấu trúc ⟨PDE | PTE | page offset⟩ trên địa chỉ 32 bit. **Số lần tìm kiếm tối đa** để tìm thấy một trang bất kỳ là bao nhiêu?',
      code: `31                                                    0
|<--- PDE (10) --->|<--- PTE (10) --->|<- offset (12) ->|`,
      diagram: `flowchart LR
    VA["Địa chỉ ảo 32 bit<br/>PDE 10 · PTE 10 · offset 12"] -->|"PDE (10 bit)"| PD["Page Directory<br/>1024 mục"]
    PD --> PT["Page Table<br/>1024 mục"]
    PT -->|"PTE (10 bit)"| FR["Khung trang 4 KB"]
    FR -->|"+ offset (12 bit)"| PA["Địa chỉ vật lý"]`,
      options: ['4096', '1024', '2048', '1000'],
      answer: 2,
      explanation: `Cấu trúc địa chỉ x86: **PDE 10 bit | PTE 10 bit | offset 12 bit**.
\`\`\`
Page Directory  : 2^10 = 1024 mục
Mỗi Page Table  : 2^10 = 1024 mục
Kích thước trang: 2^12 = 4096 byte = 4 KB
\`\`\`

Trường hợp xấu nhất khi **duyệt tuần tự**: quét tối đa 1024 mục của Page Directory, rồi quét tối đa 1024 mục của Page Table tương ứng.
\`\`\`
1024 + 1024 = 2048 lần tìm kiếm
\`\`\`

Đáp án **4096** là bẫy: đó là kích thước trang tính bằng byte, hoặc kết quả của phép nhân 1024 × 4 — không liên quan tới số lần tìm.

Trong thực tế, phần cứng **không duyệt tuần tự** mà dùng chỉ số trực tiếp: PDE và PTE là **chỉ số mảng**, nên chỉ mất đúng 2 lần truy cập bộ nhớ — và thường còn bằng 0 nhờ TLB.`,
    },
  ],
};
