import type {QuizSet} from '@site/src/components/Quiz/types';

const SOURCE = 'Cuối kỳ HĐH – SPKT';

export const boNho: QuizSet = {
  id: 'os-bo-nho',
  title: 'Chương 8: Quản lý bộ nhớ',
  description: 'Dịch địa chỉ động, MMU, cấp phát phân vùng, phân mảnh, phân đoạn, swap space và lỗi trang.',
  questions: [
    {
      id: 'os-bn-01',
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
      id: 'os-bn-02',
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
      id: 'os-bn-03',
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
      id: 'os-bn-04',
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
      id: 'os-bn-05',
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
      id: 'os-bn-06',
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
      id: 'os-bn-07',
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
      id: 'os-bn-08',
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
      id: 'os-bn-09',
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
      id: 'os-bn-10',
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
      id: 'os-bn-11',
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
  ],
};
