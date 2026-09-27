import type {QuizSet} from '@site/src/components/Quiz/types';

const SOURCE = 'Cuối kỳ HĐH – SPKT';

export const boNho: QuizSet = {
  id: 'os-bo-nho',
  title: 'Chương 8–9: Quản lý bộ nhớ',
  description: 'Dịch địa chỉ động, MMU, cấp phát phân vùng Best-fit, swap space và lỗi trang.',
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
  ],
};
