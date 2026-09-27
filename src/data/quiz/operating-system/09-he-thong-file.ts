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
  ],
};
