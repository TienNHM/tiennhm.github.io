import type {QuizSet} from '@site/src/components/Quiz/types';

const SOURCE = 'Cuối kỳ HĐH – SPKT';

export const heThongFile: QuizSet = {
  id: 'os-he-thong-file',
  title: 'Chương 12: Hệ thống file',
  description: 'FCB, các lớp chức năng của hệ thống file, volume control block, FAT32 và NTFS.',
  questions: [
    {
      id: 'os-fs-01',
      topic: 'FCB',
      source: SOURCE,
      question: 'Khối điều khiển file **FCB (File Control Block)** **không** chứa thứ nào sau đây?',
      options: [
        'Kích thước file',
        'Danh sách liên kết file',
        'Ngày tạo và truy xuất file',
        'Quyền truy xuất file',
        'Danh sách điều khiển truy cập file',
      ],
      answer: 1,
      explanation: `**FCB** (trên UNIX gọi là **inode**) chứa **siêu dữ liệu** của một file:
\`\`\`
- Quyền truy xuất file (permissions)
- Danh sách điều khiển truy cập (ACL), chủ sở hữu, nhóm
- Ngày tạo, ngày sửa, ngày truy xuất gần nhất
- Kích thước file
- Con trỏ tới các khối dữ liệu trên đĩa
\`\`\`

**Danh sách liên kết file** không phải thành phần của FCB. Nó thuộc về **cách cấp phát khối** (linked allocation) — mỗi khối dữ liệu chứa con trỏ tới khối kế tiếp, nằm rải rác trên đĩa chứ không nằm trong FCB.

Nhớ nguyên tắc: FCB chứa **thông tin mô tả file**, không chứa **dữ liệu file** cũng không chứa cấu trúc liên kết giữa các khối.`,
    },
    {
      id: 'os-fs-02',
      topic: 'Phân lớp',
      source: SOURCE,
      question:
        'Theo hệ thống phân lớp chức năng của hệ thống file, thành phần nào **quản lý không gian đĩa trống** và **chuyển đổi khối logic thành khối vật lý** (và ngược lại)?',
      options: [
        'Device drivers',
        'Logical file system',
        'Basic file system',
        'File organization module',
      ],
      answer: 3,
      explanation: `Năm lớp của hệ thống file, từ thấp lên cao:
\`\`\`
5. Logical file system      - quản lý siêu dữ liệu, thư mục, FCB, bảo vệ
4. File organization module - DỊCH khối logic ↔ khối vật lý, quản lý khối trống
3. Basic file system        - ra lệnh đọc/ghi khối vật lý, quản lý bộ đệm và cache
2. I/O control (drivers)    - dịch thành lệnh cụ thể cho bộ điều khiển đĩa
1. Devices                  - phần cứng
\`\`\`

**File organization module** là lớp biết file gồm những khối logic nào (khối 0, 1, 2… của file) và chúng nằm ở đâu trên đĩa (khối vật lý 1204, 3987…). Chính vì nắm bản đồ này mà nó cũng là nơi **quản lý danh sách khối trống**.

Đừng lẫn với **logical file system** — lớp đó làm việc với tên file và thư mục, không biết gì về số hiệu khối vật lý.`,
    },
    {
      id: 'os-fs-03',
      topic: 'Cấu trúc đĩa',
      source: SOURCE,
      question:
        'Khối nào lưu **số lượng block trong partition, kích thước block, số block trống hiện thời và con trỏ đến chúng**?',
      options: [
        'Boot Block',
        'Volume control block',
        'File Control Block',
        'Boot control block',
        'File Block',
      ],
      answer: 1,
      explanation: `**Volume control block** — trên UNIX gọi là **superblock**, trên NTFS là **Master File Table** — chứa thông tin mô tả **toàn bộ một phân vùng**:
\`\`\`
- Tổng số block trong partition
- Kích thước mỗi block
- Số block trống và con trỏ tới danh sách block trống
- Số FCB trống và con trỏ tới chúng
\`\`\`

Phân biệt ba loại khối siêu dữ liệu:
- **Boot control block** (boot block, sector đầu tiên) — chứa mã khởi động hệ điều hành. Phân vùng nào không dùng để boot thì khối này rỗng.
- **Volume control block** — mô tả **một phân vùng**. Đây là đáp án.
- **File control block** — mô tả **một file**.

Vì mất superblock là mất luôn cả phân vùng, hệ thống file luôn giữ **nhiều bản sao** của nó rải rác trên đĩa.`,
    },
    {
      id: 'os-fs-04',
      topic: 'FAT',
      source: SOURCE,
      question:
        'Thành phần nào chứa **các mục nhập cho mỗi cluster** trong toàn bộ phân vùng của đĩa?',
      options: ['Boot sector', 'Reserved area', 'Root Directory', 'FAT (File Allocation Table)'],
      answer: 3,
      explanation: `**FAT** là một bảng có **đúng một mục cho mỗi cluster** của phân vùng, đóng vai trò bản đồ toàn đĩa. Mỗi mục cho biết cluster đó đang ở trạng thái nào:
\`\`\`
0x00000000  - cluster trống
0x0000000?  - số hiệu cluster KẾ TIẾP của file
0xFFFFFFFF  - cluster cuối cùng của file (EOF)
0xFFFFFFF7  - cluster hỏng (bad cluster)
\`\`\`

Nhờ vậy, chuỗi cluster của một file được nối lại thành **danh sách liên kết nằm gọn trong bảng FAT**, thay vì rải con trỏ khắp các khối dữ liệu — đọc tuần tự nhanh hơn hẳn linked allocation thuần.

Cấu trúc một phân vùng FAT gồm: **Boot sector** (mã khởi động và tham số) → **FAT** (thường có 2 bản sao) → **Root Directory** → vùng dữ liệu.`,
    },
    {
      id: 'os-fs-05',
      topic: 'FAT32',
      source: SOURCE,
      question: 'Kích thước **file** lớn nhất của **FAT32** là bao nhiêu?',
      options: ['4 GB', '32 GB', '16 TB', '16 GB'],
      answer: 0,
      explanation: `**4 GB** — chính xác hơn là 4 GB trừ 1 byte (4.294.967.295 byte).

Nguyên nhân nằm ở thiết kế: FAT32 lưu kích thước file trong một trường **32 bit** duy nhất, nên giá trị lớn nhất biểu diễn được là 2^32 − 1.

Đây là giới hạn gây phiền toái nhất trong thực tế: không chép nổi một file phim 4K hay file ảnh đĩa vào USB định dạng FAT32. Muốn vượt qua phải chuyển sang **exFAT** hoặc **NTFS**.

Đừng nhầm với giới hạn **phân vùng** của FAT32 (32 GB theo công cụ format của Windows) — hai con số khác nhau, và đề hỏi cả hai ở hai câu riêng.`,
    },
    {
      id: 'os-fs-06',
      topic: 'NTFS',
      source: SOURCE,
      question: 'Kích thước **phân vùng** lớn nhất của **NTFS** là bao nhiêu?',
      options: ['64 GB', '2 TB', '32 GB', '4 TB'],
      answer: 1,
      explanation: `Đáp án đề là **2 TB**.

Con số này đến từ giới hạn của bảng phân vùng **MBR**: MBR dùng 32 bit để đánh số sector, với sector 512 byte thì 2^32 × 512 byte = **2 TB**. Đây là trần của *cách chia phân vùng*, không phải của bản thân NTFS.

Nếu dùng **GPT** thay cho MBR, NTFS hỗ trợ phân vùng lên tới **256 TB** (với cluster 64 KB), và giới hạn lý thuyết của định dạng còn cao hơn nhiều.

Đi thi cứ trả lời theo đề, nhưng biết rõ 2 TB là giới hạn của MBR để khỏi lúng túng khi gặp ổ cứng 4 TB ngoài đời.`,
    },
    {
      id: 'os-fs-07',
      topic: 'FAT32',
      source: SOURCE,
      question: 'Kích thước **phân vùng** lớn nhất của **FAT32** là bao nhiêu?',
      options: ['32 GB', '4 TB', '64 GB', '2 TB'],
      answer: 0,
      explanation: `Đáp án đề là **32 GB** — đây là giới hạn do **công cụ format của Windows** áp đặt từ thời Windows 2000, không phải giới hạn của định dạng.

Về lý thuyết FAT32 hỗ trợ tới **2 TB** với cluster 512 byte (và 16 TB với cluster 4 KB). Windows vẫn **đọc ghi bình thường** phân vùng FAT32 lớn hơn 32 GB nếu được format bằng công cụ khác — nó chỉ từ chối *tạo ra* phân vùng như vậy, vì bảng FAT khi đó phình quá to và hiệu năng tệ đi.

Ba con số của FAT32 cần thuộc riêng rẽ:
- **File** lớn nhất: **4 GB**
- **Phân vùng** lớn nhất (Windows format): **32 GB**
- **Phân vùng** lớn nhất (lý thuyết): 2 TB`,
    },
    {
      id: 'os-fs-08',
      topic: 'NTFS',
      source: SOURCE,
      question: 'Hệ thống file nào có khả năng **tự động sửa lỗi** khi có sự cố?',
      options: ['NFS', 'FAT32', 'NTFS', 'FAT16'],
      answer: 2,
      explanation: `**NTFS** là hệ thống file **có nhật ký (journaling)**. Trước khi thay đổi siêu dữ liệu, nó ghi ý định vào **log file (\$LogFile)**; nếu mất điện giữa chừng, lúc khởi động lại nó đọc nhật ký để **hoàn tất hoặc quay lui** giao dịch dở dang, đưa hệ thống file về trạng thái nhất quán.

Ngoài ra NTFS còn tự **đánh dấu cluster hỏng** và di dời dữ liệu sang cluster tốt.

**FAT16/FAT32 không có nhật ký**: mất điện lúc đang ghi là bảng FAT có thể hỏng, phải chạy \`chkdsk\` quét toàn đĩa để dò và sửa — chậm và không đảm bảo cứu được dữ liệu.

**NFS** không phải hệ thống file trên đĩa mà là **giao thức chia sẻ file qua mạng**, nên không nằm cùng nhóm so sánh.`,
    },
    {
      id: 'os-fs-09',
      topic: 'FAT',
      source: SOURCE,
      question:
        'Cho bảng FAT12 như dưới đây (chép lại từ hình của đề). Một tập tin có cluster bắt đầu là **7**. Chuỗi FAT của tập tin là gì?',
      code: `Chỉ số:   5    6    7    8    9     A    B    C    D
Giá trị:  C         A    9    FFF   5         D    8`,
      options: [
        '7 → 5 → C → D → 8 → 9 → A',
        '7 → A → 5 → C → D → 8 → 9',
        '7 → A → C → D → 5 → 8 → 9',
        '7 → C → A → 5 → D',
      ],
      answer: 1,
      explanation: `Cách đọc bảng FAT: **giá trị tại ô i chính là cluster kế tiếp** của tập tin, cứ thế đi cho tới khi gặp dấu kết thúc **FFF** (End Of File).

Lần theo từ cluster 7:
\`\`\`
FAT[7] = A    →  cluster kế tiếp là A (tức 10)
FAT[A] = 5    →  tiếp theo 5
FAT[5] = C    →  tiếp theo C (12)
FAT[C] = D    →  tiếp theo D (13)
FAT[D] = 8    →  tiếp theo 8
FAT[8] = 9    →  tiếp theo 9
FAT[9] = FFF  →  KẾT THÚC
\`\`\`

Chuỗi: **7 → A → 5 → C → D → 8 → 9**.

Điểm hay của FAT so với cấp phát liên kết thuần: toàn bộ con trỏ nằm gọn trong **một bảng** được cache sẵn trong RAM, nên duyệt chuỗi không phải đọc rải rác khắp đĩa. Nhược điểm là mất bảng FAT thì mất sạch cấu trúc file — vì vậy FAT luôn có **2 bản sao**.`,
    },
    {
      id: 'os-fs-10',
      topic: 'Phân vùng',
      source: SOURCE,
      question: 'Cấu trúc đĩa cứng dạng **MBR** có tối đa bao nhiêu **Primary partition**?',
      options: ['1', '2', '3', '4'],
      answer: 2,
      explanation: `Đáp án đề là **3**.

**Lưu ý:** bảng phân vùng MBR nằm trong 64 byte cuối của sector đầu tiên, mỗi mục 16 byte nên có **đúng 4 mục**. Vì vậy con số chuẩn thường gặp là:
\`\`\`
Tối đa 4 primary partition
HOẶC 3 primary + 1 extended (chứa nhiều logical partition bên trong)
\`\`\`
Con số **3** của đề ứng với trường hợp thứ hai — khi người dùng cần nhiều hơn 4 phân vùng nên phải hy sinh một mục cho extended partition.

Đi thi chọn theo đáp án đề, nhưng nhớ đủ cả hai vế: **4 primary**, hoặc **3 primary + 1 extended**.

Hạn chế khác của MBR: chỉ địa chỉ hoá được **2 TB**, đó là lý do GPT ra đời.`,
    },
    {
      id: 'os-fs-11',
      topic: 'Phân vùng',
      source: SOURCE,
      question: 'Cấu trúc đĩa cứng dạng **GPT** có tối đa bao nhiêu **Primary partition**?',
      options: ['1', '128', '4', '64'],
      answer: 1,
      explanation: `**128 phân vùng** — con số mặc định của chuẩn GPT trên Windows, đến từ việc GPT dành sẵn **32 sector** cho bảng phân vùng, mỗi mục 128 byte:
\`\`\`
32 sector × 512 byte / 128 byte mỗi mục = 128 mục
\`\`\`

GPT khắc phục toàn bộ hạn chế của MBR:
- **128 phân vùng** thay vì 4, và **không còn khái niệm extended/logical** — tất cả đều là primary.
- Địa chỉ hoá **64 bit** nên hỗ trợ ổ đĩa tới 9,4 ZB, thay vì trần 2 TB.
- Có **CRC32 kiểm tra lỗi** và **bản sao bảng phân vùng ở cuối đĩa** để phục hồi.

GPT đi kèm chuẩn khởi động **UEFI**, thay cho BIOS + MBR kiểu cũ.`,
    },
    {
      id: 'os-fs-12',
      topic: 'FAT32',
      source: SOURCE,
      question: 'Kích thước tập tin lớn nhất lưu trữ trong **FAT32** là bao nhiêu?',
      options: ['1 GB', '2 GB', '3 GB', '4 GB'],
      answer: 3,
      explanation: `**4 GB** (chính xác là 4 GB − 1 byte = 4.294.967.295 byte).

Nguyên nhân: FAT32 lưu kích thước tập tin trong một trường **32 bit**, nên giá trị lớn nhất là 2^32 − 1.

Đây là giới hạn gây khó chịu nhất khi dùng USB định dạng FAT32: không chép được file phim 4K, file ảnh đĩa hay file sao lưu lớn. Giải pháp là chuyển sang **exFAT** (giới hạn 16 EB) hoặc **NTFS**.

Ba con số của FAT32 cần nhớ tách bạch:
\`\`\`
File lớn nhất                    : 4 GB
Phân vùng lớn nhất (Windows tạo) : 32 GB
Phân vùng lớn nhất (lý thuyết)   : 2 TB
\`\`\``,
    },
    {
      id: 'os-fs-13',
      topic: 'FAT32',
      source: SOURCE,
      question: '**LFN (Long File Name)** có trong định dạng nào?',
      options: ['NTFS', 'EXT2/3', 'FAT16', 'FAT32'],
      answer: 3,
      explanation: `**LFN** là cơ chế được đưa vào từ **FAT32** (và bản mở rộng VFAT của FAT16 trên Windows 95) để vượt qua giới hạn tên file **8.3** cũ kỹ của DOS.

Cách hoạt động khá khéo: tên dài được chẻ thành nhiều **directory entry phụ** gắn thuộc tính đặc biệt, mỗi entry chứa 13 ký tự Unicode, kèm một entry 8.3 rút gọn để hệ điều hành cũ vẫn đọc được.
\`\`\`
Tên cũ (8.3)  :  BAOCAO~1.DOC   - 8 ký tự tên + 3 ký tự phần mở rộng
LFN           :  Báo cáo tài chính quý 4.docx   - tới 255 ký tự Unicode
\`\`\`

Vì sao không phải các phương án kia: **NTFS** và **EXT2/3** sinh ra đã hỗ trợ tên dài sẵn, không cần cơ chế LFN chắp vá; còn **FAT16** nguyên bản chỉ có 8.3.`,
    },
  ],
};
