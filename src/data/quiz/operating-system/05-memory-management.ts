import type {QuizSet} from '@site/src/components/Quiz/types';

const SOURCE = 'Cuối kỳ HĐH – SPKT';

export const memoryManagement: QuizSet = {
  id: 'os-memory-management',
  title: 'Chương 8: Quản lý bộ nhớ',
  description: 'Dịch địa chỉ động, MMU, cấp phát phân vùng, phân mảnh, phân đoạn, swap space và lỗi trang.',
  questions: [
    {
      id: 'os-mm-01',
      topic: 'Dịch địa chỉ',
      source: SOURCE,
      question: '**Dịch địa chỉ động** (dynamic address translation)',
      options: [
        'là phần cứng cần thiết để thực hiện phân trang',
        'là vô ích khi hoán đổi (swapping) được sử dụng',
        'là một phần của thuật toán phân trang hệ điều hành',
        'các trang lưu trữ tại một vị trí cụ thể trên đĩa',
      ],
      answer: 0,
      explanation: `Dịch địa chỉ động là việc chuyển **địa chỉ logic → địa chỉ vật lý ngay lúc chạy**, và nó phải do **phần cứng** làm.

Lý do bắt buộc là phần cứng: mỗi lần CPU truy cập bộ nhớ đều cần dịch địa chỉ một lần. Nếu để phần mềm làm thì mỗi lệnh sẽ chậm đi hàng chục lần. Vì vậy MMU dịch song song với chu kỳ truy cập, có TLB đỡ phần tra bảng trang.

Các phương án sai:
- **"vô ích khi swapping"** — ngược lại, nhờ dịch động mà tiến trình bị swap ra rồi nạp lại ở vùng nhớ khác vẫn chạy bình thường.
- **"một phần của thuật toán phân trang của HĐH"** — HĐH chỉ *thiết lập* bảng trang; việc dịch là của phần cứng.`,
    },
    {
      id: 'os-mm-02',
      topic: 'MMU',
      source: SOURCE,
      question: 'Chức năng thích hợp nhất của **Bộ quản lý bộ nhớ (MMU)** là gì?',
      options: [
        'Nó là một thuật toán để cấp phát và phân bổ bộ nhớ chính cho một tiến trình',
        'Nó là một kỹ thuật hỗ trợ đa chương trình bằng cách tạo các phân vùng động',
        'Nó là một bộ nhớ liên kết để lưu trữ TLB (translation lookaside buffer)',
        'Nó là một con chip (thiết bị phần cứng) để ánh xạ địa chỉ ảo sang địa chỉ thực',
      ],
      answer: 3,
      explanation: `**MMU là phần cứng** — một khối mạch nằm trong CPU hiện đại — làm đúng một việc: **ánh xạ địa chỉ ảo sang địa chỉ vật lý** ở mỗi lần truy cập bộ nhớ.

Việc MMU làm trong một lần truy cập:
- Tách địa chỉ ảo thành **số hiệu trang + offset**
- Tra **TLB**, trượt thì tra tiếp bảng trang trong bộ nhớ
- Kiểm tra quyền (đọc/ghi/thực thi) và bit hợp lệ; vi phạm thì sinh **trap** cho HĐH xử lý

Các phương án sai vì mô tả **phần mềm**: thuật toán cấp phát bộ nhớ và kỹ thuật phân vùng đều là việc của hệ điều hành. Còn **TLB** chỉ là một bộ đệm *bên trong* MMU, không phải định nghĩa của MMU.`,
    },
    {
      id: 'os-mm-03',
      topic: 'Cấp phát bộ nhớ',
      source: SOURCE,
      question:
        'Sáu phân vùng bộ nhớ kích thước **200 KB, 400 KB, 600 KB, 500 KB, 300 KB và 250 KB** cần được phân bổ cho bốn tiến trình **357 KB, 210 KB, 468 KB và 491 KB** theo thứ tự. Dùng thuật toán **Best-fit**, phân vùng nào **KHÔNG** được cấp cho tiến trình nào?',
      options: [
        '200 KB and 300 KB',
        '250 KB and 300 KB',
        '200 KB and 250 KB',
        '300 KB and 400 KB',
      ],
      answer: 0,
      explanation: `**Best-fit**: chọn phân vùng **nhỏ nhất trong số những phân vùng đủ chứa**.

\`\`\`
Còn trống: 200, 400, 600, 500, 300, 250

357 KB → đủ chỗ: 400, 600, 500  → nhỏ nhất = 400   ✔ chiếm 400
210 KB → đủ chỗ: 600, 500, 300, 250 → nhỏ nhất = 250 ✔ chiếm 250
468 KB → đủ chỗ: 600, 500          → nhỏ nhất = 500  ✔ chiếm 500
491 KB → đủ chỗ: 600               → chiếm 600
\`\`\`

Còn lại **200 KB và 300 KB** không dùng được: 200 KB nhỏ hơn mọi tiến trình, còn 300 KB thì chỉ có tiến trình 210 KB vừa, nhưng 210 KB đã bị Best-fit đẩy vào ô 250 KB khít hơn.

So sánh nhanh nếu dùng **First-fit**: 357 → 400, 210 → 600, 468 → 500, 491 → không còn chỗ nào đủ. Best-fit ở bài này xếp được cả bốn.`,
    },
    {
      id: 'os-mm-04',
      topic: 'Bộ nhớ ảo',
      source: SOURCE,
      question: 'Vùng **swap space** trên đĩa được dùng để làm gì?',
      options: [
        'Storing the super-block',
        'Saving temporary html pages',
        'Storing device drivers',
        'Saving process data',
      ],
      answer: 3,
      explanation: `**Swap space** là phần đĩa dành riêng để chứa **dữ liệu của tiến trình** khi bộ nhớ vật lý không đủ: các trang bị đẩy ra (page out) nằm ở đó, khi cần lại nạp về (page in).

Nhờ vậy tổng bộ nhớ mà các tiến trình dùng được **lớn hơn RAM thật** — đó chính là cơ chế bộ nhớ ảo.

Các phương án sai:
- **super-block** là siêu dữ liệu của hệ thống file, nằm trong phân vùng file system.
- **html tạm** là cache của trình duyệt, chuyện của ứng dụng.
- **device driver** nằm trong kernel image trên phân vùng hệ thống.

Cảnh báo kinh điển: nếu hệ thống swap quá nhiều, thời gian chạy bị nuốt hết bởi việc nạp/đẩy trang — hiện tượng **thrashing**.`,
    },
    {
      id: 'os-mm-05',
      topic: 'Bộ nhớ ảo',
      source: SOURCE,
      question: 'Tăng RAM của máy tính thường cải thiện hiệu năng vì:',
      options: [
        'Larger RAMs are faster',
        'Fewer page faults occur',
        'Virtual memory increases',
        'Fewer segmentation faults occur',
      ],
      answer: 1,
      explanation: `RAM lớn hơn ⇒ chứa được nhiều khung trang hơn ⇒ **ít lỗi trang (page fault) hơn**.

Con số cho thấy vì sao điều này quan trọng: truy cập RAM mất khoảng **100 nanosecond**, còn một lỗi trang phải đọc đĩa mất **vài mili giây** — chậm hơn cỡ **10.000 lần**. Giảm được vài phần trăm lỗi trang là hiệu năng đổi khác hẳn.

Các phương án sai:
- **"RAM lớn thì nhanh hơn"** — dung lượng không quyết định tốc độ, tốc độ do công nghệ (DDR4/DDR5) và bus quyết định.
- **"bộ nhớ ảo tăng"** — kích thước không gian địa chỉ ảo do **số bit địa chỉ** quy định, không liên quan RAM thật.
- **"ít segmentation fault"** — đó là lỗi lập trình truy cập vùng nhớ trái phép, thêm RAM không chữa được.`,
    },
    {
      id: 'os-mm-06',
      topic: 'Bộ nhớ ảo',
      source: SOURCE,
      question:
        'Hệ thống hỗ trợ địa chỉ ảo 32 bit và địa chỉ vật lý cũng 32 bit. Vì không gian địa chỉ ảo có **cùng kích thước** với không gian địa chỉ vật lý, nhà thiết kế quyết định **loại bỏ hoàn toàn bộ nhớ ảo**. Điều nào sau đây là đúng?',
      options: [
        'Tổ chức bộ nhớ cache của bộ xử lý có thể được thực hiện hiệu quả hơn bây giờ',
        'Lập lịch CPU có thể được thực hiện hiệu quả hơn bây giờ',
        'Không còn khả năng triển khai hiệu quả hỗ trợ nhiều người dùng',
        'Hỗ trợ phần cứng để quản lý bộ nhớ không còn cần thiết',
      ],
      answer: 3,
      explanation: `Bỏ bộ nhớ ảo nghĩa là **địa chỉ logic chính là địa chỉ vật lý**, không còn việc dịch địa chỉ nữa — mà dịch địa chỉ chính là lý do tồn tại của MMU, bảng trang và TLB. Vậy **phần cứng quản lý bộ nhớ không còn cần thiết**.

Vì sao các phương án khác sai:
- **Cache** đánh chỉ mục theo địa chỉ vật lý, hoạt động độc lập với bộ nhớ ảo → không nhanh hơn.
- **Lập lịch CPU** là chuyện của tiến trình, chẳng liên quan tới cách dịch địa chỉ.
- **Nhiều người dùng** vẫn triển khai được, chỉ là quay về mô hình phân vùng kiểu cũ.

Lưu ý thực tế: cái giá phải trả rất đắt — mất bảo vệ bộ nhớ giữa các tiến trình, mất khả năng chạy chương trình lớn hơn RAM, và tái sinh bài toán phân mảnh ngoài.`,
    },
    {
      id: 'os-mm-07',
      topic: 'Phân mảnh',
      source: SOURCE,
      question: `Khẳng định nào sau đây là đúng?

- (a) External Fragmentation tồn tại khi có đủ tổng dung lượng bộ nhớ để đáp ứng yêu cầu nhưng không gian khả dụng lại không liền kề
- (b) Phân mảnh bộ nhớ có thể bên trong cũng như bên ngoài
- (c) Một giải pháp cho External Fragmentation là nén (compaction)`,
      options: ['(a)', '(a) và (b)', '(a), (b) và (c)', '(b) và (c)'],
      answer: 3,
      explanation: `Đáp án đề là **(b) và (c)**.

**Lưu ý — cả ba mệnh đề đều đúng theo sách giáo khoa**, nên câu này đúng ra phải chọn "(a), (b) và (c)":
- **(a)** chính là *định nghĩa* của phân mảnh ngoài: tổng bộ nhớ trống đủ, nhưng bị chia vụn thành nhiều mảnh rời rạc, không mảnh nào đủ lớn.
- **(b)** đúng: **phân mảnh trong** là phần thừa bên trong khối đã cấp (cấp 4 KB mà tiến trình dùng 3 KB), **phân mảnh ngoài** là khoảng trống rời rạc giữa các khối.
- **(c)** đúng: **nén (compaction)** dồn các vùng đang dùng lại với nhau để gom các lỗ trống thành một khối liền kề. Điều kiện là hệ thống phải dùng **tái định vị động** lúc chạy.

Đi thi chọn theo đáp án đề, nhưng đừng học thuộc rằng (a) sai — nó là định nghĩa chuẩn.`,
    },
    {
      id: 'os-mm-08',
      topic: 'Phân đoạn',
      source: SOURCE,
      question:
        'Cho bảng phân đoạn dưới đây. Điều gì sẽ xảy ra nếu địa chỉ logic được yêu cầu là **Segment ID 2, offset 1000**?',
      code: `SegmentID   Base   Limit
0           200    200
1           500    12510
2           1527   498
3           2500   50`,
      options: [
        'Deadlock',
        'Tìm nạp mục nhập tại địa chỉ vật lý 2527 cho segment Id2',
        'Tìm nạp mục nhập tại địa chỉ vật lý 1498 cho segment Id2',
        'Một trap được tạo ra',
      ],
      answer: 3,
      explanation: `Quy tắc dịch địa chỉ của phân đoạn, kiểm tra **trước**, cộng **sau**:
\`\`\`
nếu offset >= Limit  →  trap "segmentation fault"
ngược lại            →  địa chỉ vật lý = Base + offset
\`\`\`

Ở đây segment 2 có **Limit = 498** trong khi offset yêu cầu là **1000**. Vì 1000 ≥ 498 nên phần cứng sinh **trap** báo truy cập ngoài giới hạn đoạn, HĐH nhận trap và thường kết thúc tiến trình.

Đáp án 2527 chính là cái bẫy: đó là 1527 + 1000, tức kết quả nếu ai đó cộng trước mà quên kiểm tra Limit.

Chính cơ chế kiểm tra Limit này mang lại **bảo vệ bộ nhớ**: tiến trình không thể đọc lem sang vùng nhớ của đoạn khác.`,
    },
    {
      id: 'os-mm-09',
      topic: 'Cấp phát bộ nhớ',
      source: SOURCE,
      question:
        'Chiến lược cấp phát vùng nhớ động nào phân bổ **vùng nhớ nhỏ nhất đủ lớn** để đáp ứng nhu cầu của tiến trình đến?',
      options: ['Worst-fit', 'Best-fit', 'Next-fit', 'First-fit'],
      answer: 1,
      explanation: `Bốn chiến lược cấp phát vùng nhớ động:

- **First-fit** — lấy vùng trống **đầu tiên** đủ lớn. Nhanh nhất vì dừng ngay khi tìm thấy.
- **Best-fit** — duyệt toàn bộ, lấy vùng **nhỏ nhất** mà vẫn đủ. Đây là đáp án.
- **Worst-fit** — lấy vùng **lớn nhất**, với ý định phần dư còn đủ dùng cho tiến trình khác.
- **Next-fit** — như first-fit nhưng bắt đầu tìm từ vị trí dừng lần trước.

Nghịch lý đáng nhớ: **best-fit không phải chiến lược tốt nhất**. Nó phải duyệt hết danh sách và để lại những mẩu thừa rất nhỏ, vụn tới mức không tiến trình nào dùng được — phân mảnh ngoài nặng hơn. Trong thực nghiệm, **first-fit thường nhanh hơn và tận dụng bộ nhớ tương đương**.`,
    },
    {
      id: 'os-mm-10',
      topic: 'Cache',
      source: SOURCE,
      question:
        'Khi thiết kế bộ nhớ đệm cache, kích thước khối (cache line) là tham số quan trọng. Câu nào sau đây **đúng**?',
      options: [
        'Kích thước khối nhỏ hơn phải chịu hình phạt bỏ lỡ (miss penalty) thấp hơn',
        'Kích thước khối nhỏ hơn ngụ ý vị trí không gian (spatial locality) tốt hơn',
        'Kích thước khối nhỏ hơn có nghĩa là thời gian truy cập cache thấp hơn',
        'Kích thước khối nhỏ hơn có nghĩa là thẻ (tag) bộ nhớ cache nhỏ hơn',
      ],
      answer: 0,
      explanation: `**Miss penalty** là thời gian nạp một khối từ bộ nhớ chính về cache. Khối càng nhỏ thì càng ít byte phải chuyển, nên **hình phạt bỏ lỡ càng thấp** — phương án a đúng.

Ba phương án kia đều ngược:
- **Spatial locality**: khối **lớn hơn** mới khai thác tốt tính cục bộ không gian, vì nạp sẵn các byte lân cận sắp được dùng.
- **Thời gian truy cập cache** phụ thuộc kích thước tổng và mức độ liên kết, không phải kích thước khối.
- **Tag**: khối nhỏ hơn ⇒ nhiều khối hơn ⇒ ít bit offset trong khối ⇒ **tag dài hơn**, và tổng bộ nhớ dành cho tag cũng lớn hơn.

Đánh đổi kinh điển khi chọn kích thước khối: khối lớn khai thác cục bộ tốt và giảm số tag, nhưng tốn thời gian nạp và dễ kéo về dữ liệu thừa.`,
    },
    {
      id: 'os-mm-11',
      topic: 'Kết buộc địa chỉ',
      source: SOURCE,
      question:
        'File MAP dưới đây cho thấy địa chỉ các phân đoạn khi dịch một chương trình. Sự ràng buộc này thuộc loại kết buộc địa chỉ nào?',
      code: `Start     Stop      Length    Name      Class
00000H    00010H    00011H    _TEXT     CODE
00020H    00030H    00011H    _DATA     DATA
00040H    0013FH    00100H    STACK     STACK

Program entry point at 0000:0000`,
      options: [
        'Địa chỉ động (Relocatable address)',
        'Địa chỉ tương đối (Relative address)',
        'Địa chỉ không xác định (Undefined address)',
        'Địa chỉ tuyệt đối (Absolute address)',
      ],
      answer: 3,
      explanation: `File MAP ghi ra những con số **cố định, xác định ngay từ lúc biên dịch** (\`00000H\`, \`00020H\`, \`00040H\`) — đó là đặc trưng của **kết buộc địa chỉ tuyệt đối**, xảy ra ở **compile time**.

Ba thời điểm kết buộc địa chỉ:
\`\`\`
Compile time  - biết trước vị trí nạp → sinh ra ĐỊA CHỈ TUYỆT ĐỐI
                (chương trình .COM của MS-DOS là ví dụ kinh điển)
Load  time    - chưa biết vị trí → sinh mã KHẢ TÁI ĐỊNH VỊ (relocatable),
                địa chỉ thật được tính lúc nạp
Execution time- tiến trình có thể bị dời trong lúc chạy → cần phần cứng
                MMU với thanh ghi base/limit
\`\`\`

Hệ quả của kết buộc tuyệt đối: muốn nạp chương trình vào **vị trí khác** trong bộ nhớ thì phải **biên dịch lại**. Đó là lý do hệ điều hành hiện đại dùng kết buộc lúc thực thi.`,
    },
    {
      id: 'os-mm-12',
      topic: 'Phân vùng động',
      source: SOURCE,
      question:
        'Bộ nhớ **15 đơn vị**, cấp phát theo **phân vùng động** với thuật toán **First-Fit**, chuỗi thao tác A → B → C → thu hồi B → D → thu hồi A → E. Tại thời điểm **thu hồi vùng nhớ của A**, có bao nhiêu **vùng trống (Hole)**?',
      code: `Tiến trình   Số đơn vị bộ nhớ yêu cầu
A            3
B            5
C            2
D            2
E            3`,
      options: ['3', '4', '5', '2'],
      answer: 0,
      explanation: `Lần theo từng bước, ghi rõ vùng trống sau mỗi thao tác:
\`\`\`
Cấp A (3)   : A[0-3)                     Hole: [3,15) = 12
Cấp B (5)   : A[0-3) B[3-8)              Hole: [8,15) = 7
Cấp C (2)   : A B C[8-10)                Hole: [10,15) = 5
Thu hồi B   : A[0-3) _[3-8) C[8-10)      Hole: [3,8)=5 và [10,15)=5   → 2 hole
Cấp D (2)   : First-Fit lấy hole đầu tiên đủ lớn → D[3-5)
              A[0-3) D[3-5) _[5-8) C[8-10)   Hole: [5,8)=3 và [10,15)=5
Thu hồi A   : _[0-3) D[3-5) _[5-8) C[8-10)   Hole: [0,3)=3, [5,8)=3, [10,15)=5
\`\`\`

Kết quả: **3 vùng trống**.

Chú ý hai điểm dễ sai:
- Khi thu hồi A, vùng [0,3) **không gộp** được với [5,8) vì D đang nằm chắn ở giữa — chỉ hai vùng trống **liền kề** mới gộp lại được.
- First-Fit chọn hole [3,8) chứ không phải hole nhỏ vừa vặn, vì nó lấy **hole đầu tiên đủ lớn**, không quan tâm lãng phí.`,
    },
    {
      id: 'os-mm-13',
      topic: 'Phân vùng động',
      source: SOURCE,
      question:
        'Cùng bài toán trên (bộ nhớ 15 đơn vị, **First-Fit**, chuỗi A → B → C → thu hồi B → D → thu hồi A → E). **Danh sách vùng trống** sau khi cấp phát cho E là gì? Record có dạng H(x, y) với x là ô bắt đầu, y là kích thước.',
      code: `Tiến trình   Số đơn vị bộ nhớ yêu cầu
A            3
B            5
C            2
D            2
E            3`,
      options: ['H(5,5); H(5,5)', 'H(3,3); H(8,5)', 'H(5,3); H(10,5)', 'H(4,3); H(9,5)'],
      answer: 2,
      explanation: `Nối tiếp câu trước, ngay trước khi cấp cho E ta có ba vùng trống:
\`\`\`
_[0-3)=3   D[3-5)   _[5-8)=3   C[8-10)   _[10,15)=5
\`\`\`

E cần **3 đơn vị**. First-Fit duyệt từ đầu, gặp hole **[0,3) kích thước 3** — vừa khít → cấp luôn cho E.
\`\`\`
E[0-3) D[3-5) _[5-8) C[8-10) _[10,15)
\`\`\`

Còn lại đúng hai vùng trống: **H(5,3)** và **H(10,5)**.

Lưu ý cách đọc record: H(5,3) nghĩa là *bắt đầu ở ô 5, dài 3 đơn vị*, tức chiếm các ô 5, 6, 7 — không phải "từ ô 5 đến ô 3".`,
    },
    {
      id: 'os-mm-14',
      topic: 'Phân vùng động',
      source: SOURCE,
      question:
        'Hiện trạng bộ nhớ như hình (mỗi ô là 1 đơn vị). Dùng **Next-Fit**, hãy cho biết record quản lý bộ nhớ của tiến trình **E** sau khi cấp 3 đơn vị cho D và 2 đơn vị cho E.',
      code: `  A     |   |    B    |   |    C    |
  0     3   5         9    12        15   ...
  A: [0-3)    trống: [3-5)    B: [5-9)
  trống: [9-12)    C: [12-15)    trống: từ 15 trở đi`,
      options: ['E(15,2)', 'E(3,2)', 'E(9,2)', 'E(12,2)'],
      answer: 0,
      explanation: `**Next-Fit** giống First-Fit nhưng **không quay về đầu mỗi lần**: nó tiếp tục tìm từ **vị trí dừng của lần cấp phát trước**.

\`\`\`
Cấp D (3 đơn vị):
  duyệt tới hole [3,5) = 2 → không đủ
  duyệt tiếp hole [9,12) = 3 → vừa khít → D[9-12)
  con trỏ dừng tại ô 12

Cấp E (2 đơn vị):
  bắt đầu tìm TỪ ô 12, không quay lại đầu
  [12,15) là C đang chiếm → bỏ qua
  gặp vùng trống từ ô 15 → E[15-17)
\`\`\`

Vậy record là **E(15, 2)**.

Đáp án **E(3,2)** chính là cái bẫy: hole [3,5) đủ chỗ cho E thật, nhưng Next-Fit **không quay đầu lại** để nhìn nó. Đây vừa là ưu điểm (tìm nhanh hơn, phân bố đều hơn) vừa là nhược điểm (bỏ sót các hole nhỏ ở đầu bộ nhớ) của thuật toán này.`,
    },
    {
      id: 'os-mm-15',
      topic: 'Phân vùng động',
      source: SOURCE,
      question:
        'Cùng hiện trạng bộ nhớ như trên. Dùng **Best-Fit**, record quản lý bộ nhớ của tiến trình **D** sau khi cấp 3 đơn vị là gì?',
      code: `  A     |   |    B    |   |    C    |
  0     3   5         9    12        15   ...
  A: [0-3)    trống: [3-5)    B: [5-9)
  trống: [9-12)    C: [12-15)    trống: từ 15 trở đi`,
      options: ['D(3,3)', 'D(9,3)', 'D(12,3)', 'D(15,3)'],
      answer: 1,
      explanation: `**Best-Fit** duyệt **toàn bộ** danh sách rồi chọn hole **nhỏ nhất mà vẫn đủ chứa**.

\`\`\`
Các vùng trống:
  [3,5)   = 2 đơn vị  → không đủ cho D (cần 3)
  [9,12)  = 3 đơn vị  → vừa khít  ✔ nhỏ nhất trong số đủ chỗ
  [15,..) = lớn       → đủ nhưng phí
\`\`\`

Chọn **[9,12)** → record **D(9, 3)**, và hole này biến mất hoàn toàn, không để lại mẩu thừa nào.

So sánh ba thuật toán trên cùng dữ liệu để thấy khác biệt:
- **First-Fit** → cũng chọn [9,12) vì đó là hole đầu tiên đủ lớn.
- **Next-Fit** → tuỳ vị trí con trỏ, có thể nhảy xuống vùng sau ô 15.
- **Worst-Fit** → chọn vùng lớn nhất từ ô 15, để lại mẩu thừa to.

Đáp án **D(3,3)** sai vì hole [3,5) chỉ có 2 đơn vị, không chứa nổi 3.`,
    },
    {
      id: 'os-mm-16',
      topic: 'Phân vùng động',
      source: SOURCE,
      question:
        'Cùng hiện trạng bộ nhớ như trên. Dùng **Worst-Fit**, record quản lý bộ nhớ của tiến trình **D** sau khi cấp 2 đơn vị là gì?',
      code: `  A     |   |    B    |   |    C    |
  0     3   5         9    12        15   ...
  A: [0-3)    trống: [3-5)    B: [5-9)
  trống: [9-12)    C: [12-15)    trống: từ 15 trở đi`,
      options: ['D(3,2)', 'D(12,2)', 'D(15,2)', 'D(9,2)'],
      answer: 2,
      explanation: `**Worst-Fit** chọn **vùng trống lớn nhất**, ngược hẳn với Best-Fit.

\`\`\`
Các vùng trống:
  [3,5)   = 2      đủ cho D nhưng nhỏ
  [9,12)  = 3      đủ
  [15,..) = lớn nhất  ✔ Worst-Fit chọn cái này
\`\`\`
→ record **D(15, 2)**.

Ý tưởng đằng sau Worst-Fit: cắt từ vùng lớn thì **phần dư còn lại vẫn đủ to** để dùng cho tiến trình khác, thay vì để lại mẩu vụn vô dụng như Best-Fit.

Thực tế thì Worst-Fit hoạt động kém nhất trong bốn thuật toán: nó **phá vỡ các vùng trống lớn** nên khi có tiến trình cần nhiều bộ nhớ thì không còn chỗ nào chứa nổi.

So sánh trên cùng dữ liệu: First-Fit → [9,12), Best-Fit → [3,5), Worst-Fit → [15,..).`,
    },
    {
      id: 'os-mm-17',
      topic: 'Phân đoạn',
      source: SOURCE,
      question:
        'Phân đoạn (Segmentation), bộ nhớ bắt đầu từ 0K, bảng phân đoạn SMT như dưới đây. Địa chỉ vật lý tương ứng với địa chỉ logic **⟨2, 120K⟩** là bao nhiêu?',
      code: `S   Kích thước   Địa chỉ (base)
0   300K         200K
1   200K         1300K
2   500K         700K
3   400K         1500K`,
      options: ['820K', '1420K', '320K', '1620K'],
      answer: 0,
      explanation: `Hai bước, **kiểm tra trước, cộng sau**:
\`\`\`
1. Kiểm tra: offset 120K < Kích thước segment 2 (500K)  ✔ hợp lệ
2. Địa chỉ vật lý = base + offset = 700K + 120K = 820K
\`\`\`

Khác biệt cốt lõi so với phân trang: các segment có **kích thước khác nhau** và **không cần nằm liền kề** trong bộ nhớ vật lý — nhìn bảng sẽ thấy S0 ở 200K, S2 ở 700K, S1 lại tận 1300K.

Nếu offset ≥ kích thước, phần cứng sinh **trap** báo truy cập ngoài giới hạn. Chính phép kiểm tra này tạo ra bảo vệ bộ nhớ ở mức từng đoạn logic (code, data, stack có quyền khác nhau).`,
    },
    {
      id: 'os-mm-18',
      topic: 'Phân đoạn',
      source: SOURCE,
      question:
        'Với cùng bảng SMT, địa chỉ vật lý **1600K** ứng với địa chỉ logic ⟨s, d⟩ nào?',
      code: `S   Kích thước   Địa chỉ (base)
0   300K         200K
1   200K         1300K
2   500K         700K
3   400K         1500K`,
      options: ['s=3; d=420K', 's=0; d=120K', 's=2; d=320K', 's=1; d=220K'],
      answer: 0,
      explanation: `Cách làm: tìm segment có **khoảng [base, base + size)** chứa địa chỉ vật lý, rồi lấy hiệu.
\`\`\`
S0: [200K, 500K)     S1: [1300K, 1500K)
S2: [700K, 1200K)    S3: [1500K, 1900K)   ← chứa 1600K
\`\`\`
Vậy **s = 3**, và **d = 1600K − 1500K = 100K**.

**Lưu ý:** con số 100K **không có trong phương án nào**; đáp án đề là *s=3; d=420K*, vốn ứng với địa chỉ vật lý 1920K chứ không phải 1600K. Nhiều khả năng đề in nhầm số.

Phần **s = 3** thì chắc chắn đúng, nên đi thi vẫn chọn phương án a. Điều cần nắm là **phương pháp**: xác định khoảng địa chỉ của từng segment rồi trừ base.`,
    },
  ],
};
