import type {QuizSet} from '@site/src/components/Quiz/types';

const SOURCE = 'Cuối kỳ HĐH – SPKT';

export const tongQuan: QuizSet = {
  id: 'os-tong-quan',
  title: 'Chương 1–2: Tổng quan hệ điều hành',
  description: 'Chức năng của HĐH, system call, ngắt, IPC và phân loại hệ thống.',
  questions: [
    {
      id: 'os-tq-01',
      topic: 'Chức năng HĐH',
      source: SOURCE,
      question: 'Hệ điều hành **không** quản lý điều nào sau đây?',
      options: ['memory', 'data', 'file system', 'process'],
      answer: 1,
      explanation: `Hệ điều hành quản lý **tài nguyên**: tiến trình (process), bộ nhớ (memory), hệ thống file (file system) và thiết bị I/O.

**data** — nội dung và ý nghĩa của dữ liệu — là việc của ứng dụng và người dùng. HĐH chỉ quản lý *vật chứa* dữ liệu (file, block trên đĩa), không hiểu bên trong file là bảng lương hay ảnh.`,
    },
    {
      id: 'os-tq-02',
      topic: 'Quản lý tiến trình',
      source: SOURCE,
      question: 'Hoạt động nào **không** được sử dụng trong việc quản lý tiến trình của OS?',
      options: ['synchronization', 'Suspending and resuming', 'input data', 'deadlock handling'],
      answer: 2,
      explanation: `Quản lý tiến trình gồm: tạo/huỷ tiến trình, **tạm dừng và tiếp tục** (suspend/resume), **đồng bộ** (synchronization), giao tiếp liên tiến trình (IPC) và **xử lý deadlock**.

**input data** — nhập xuất dữ liệu — thuộc phần *quản lý thiết bị I/O*, không phải quản lý tiến trình.`,
    },
    {
      id: 'os-tq-03',
      topic: 'System call',
      source: SOURCE,
      question: 'Người dùng tiếp cận những dịch vụ của hệ điều hành thông qua điều gì?',
      options: ['hardware', 'software', 'system call', 'program'],
      answer: 2,
      explanation: `**System call** là giao diện lập trình giữa chương trình người dùng và nhân (kernel). Khi gọi, CPU chuyển từ **user mode** sang **kernel mode** bằng một trap, kernel thực hiện dịch vụ rồi trả quyền về.

Ví dụ: \`fork()\`, \`read()\`, \`write()\`, \`exec()\` đều là system call. Thư viện như libc chỉ là lớp bọc gọi xuống chúng.`,
    },
    {
      id: 'os-tq-04',
      topic: 'Ngắt',
      source: SOURCE,
      question: 'Cơ chế phần cứng cho phép một thiết bị thông báo cho CPU được gọi là _____',
      options: ['system call', 'none of the above', 'interrupt', 'polling'],
      answer: 2,
      explanation: `**Interrupt** (ngắt): thiết bị chủ động phát tín hiệu lên đường ngắt, CPU đang làm gì cũng dừng lại, lưu ngữ cảnh và nhảy vào trình phục vụ ngắt (ISR) qua bảng vector ngắt.

Phân biệt:
- **polling**: CPU chủ động hỏi thiết bị theo vòng lặp — tốn CPU, thiết bị không "thông báo" gì cả.
- **system call**: phần mềm gọi dịch vụ kernel, xuất phát từ chương trình chứ không từ thiết bị.`,
    },
    {
      id: 'os-tq-05',
      topic: 'IPC',
      source: SOURCE,
      question: 'Giao tiếp giữa các quá trình có thể được thực hiện thông qua _____',
      options: ['messages', 'system calls', 'traps', 'mails'],
      answer: 0,
      explanation: `IPC có hai mô hình cơ bản: **shared memory** (bộ nhớ dùng chung) và **message passing** (truyền thông điệp) với hai thao tác \`send()\` và \`receive()\`.

- **system call** là cơ chế *gọi* dịch vụ kernel, bản thân nó không phải hình thức giao tiếp giữa tiến trình.
- **trap** là ngắt mềm do lỗi hoặc lệnh đặc biệt sinh ra.`,
    },
    {
      id: 'os-tq-06',
      topic: 'Phân loại hệ thống',
      source: SOURCE,
      question: 'Hệ điều hành thuộc dạng nào sẽ đọc và phản hồi ngay các yêu cầu?',
      options: ['Batch system', 'Real time system', 'Time sharing system', 'Quick response time'],
      answer: 1,
      explanation: `**Real time system** ràng buộc thời gian đáp ứng: kết quả phải có trong một deadline xác định, trễ là sai (hard real-time: điều khiển công nghiệp, ABS, thiết bị y tế).

- **Batch**: gom công việc thành lô, chạy xong mới trả kết quả, không tương tác.
- **Time sharing**: chia lát thời gian cho nhiều người dùng, đáp ứng *nhanh* nhưng **không cam kết deadline**.
- *Quick response time* chỉ là một đặc tính, không phải loại hệ điều hành.`,
    },
    {
      id: 'os-tq-07',
      topic: 'Chuyển ngữ cảnh',
      source: SOURCE,
      question:
        'Thời gian cần thiết để chuyển đổi việc thực thi giữa user mode và kernel mode là **t1**, trong khi thời gian cần thiết để chuyển đổi giữa hai tiến trình là **t2**. Điều nào sau đây là đúng?',
      options: ['t1 = t2', 't1 < t2', 't1 > t2', 'không thể nói gì về mối quan hệ giữa t1 và t2'],
      answer: 1,
      explanation: `**t1 < t2** — chuyển chế độ (mode switch) luôn rẻ hơn chuyển tiến trình (context switch).

**Mode switch** chỉ đổi mức đặc quyền của CPU trong *cùng một tiến trình*: lưu vài thanh ghi, nhảy vào kernel. Không gian địa chỉ giữ nguyên.

**Context switch** làm tất cả những việc trên, cộng thêm:
- lưu/khôi phục toàn bộ PCB (thanh ghi, con trỏ ngăn xếp, program counter)
- đổi bảng trang, nạp lại thanh ghi trỏ bảng trang
- **xả TLB** và làm nguội cache — phần đắt nhất, vì sau đó mọi truy cập bộ nhớ đều miss

Mỗi context switch đều chứa ít nhất một mode switch bên trong, nên t2 > t1 là hiển nhiên.`,
    },
    {
      id: 'os-tq-08',
      topic: 'Phân loại hệ thống',
      source: SOURCE,
      question: 'Hệ thống chỉ cho phép **một tiến trình thực thi tại một thời điểm** được gọi là gì?',
      options: [
        'uniprogramming systems',
        'unithread systems',
        'uniprocessing systems',
        'unitasking systems',
      ],
      answer: 2,
      explanation: `Đáp án đề là **uniprocessing systems**.

**Lưu ý:** theo thuật ngữ chuẩn, khái niệm "chỉ một tiến trình nằm trong bộ nhớ và thực thi tại một thời điểm" là **uniprogramming** — đối lập với *multiprogramming*. Còn **uniprocessing** thường được hiểu là hệ thống **chỉ có một bộ xử lý**, đối lập với *multiprocessing*; một máy uniprocessor vẫn chạy đa chương bình thường bằng cách luân phiên CPU.

Hai thuật ngữ này bị dùng lẫn lộn trong nhiều tài liệu. Đi thi chọn theo đáp án đề, nhưng khi phân tích hệ thống thì nhớ: **uni/multi-programming** nói về *số tiến trình*, **uni/multi-processing** nói về *số CPU*.`,
    },
    {
      id: 'os-tq-09',
      topic: 'Đa chương',
      source: SOURCE,
      question: '**Số lượng tiến trình trong bộ nhớ** phản ánh khái niệm nào?',
      options: ['MultiThreading', 'Multiprogramming', 'MultiTasking', 'MultiProcessing'],
      answer: 1,
      explanation: `**Degree of multiprogramming** chính là số tiến trình đang nằm trong bộ nhớ chính.

Phân biệt bốn thuật ngữ rất hay bị lẫn:
\`\`\`
Multiprogramming  - nhiều TIẾN TRÌNH cùng nằm trong bộ nhớ, CPU luân phiên chạy
MultiTasking      - multiprogramming có chia lát thời gian, đủ nhanh để tương tác
MultiProcessing   - nhiều BỘ XỬ LÝ vật lý cùng làm việc
MultiThreading    - nhiều LUỒNG bên trong một tiến trình
\`\`\`

Con số này quan trọng vì nó nằm ở tâm của bài toán thrashing: tăng độ đa chương thì CPU bận hơn, nhưng tăng quá thì mỗi tiến trình thiếu khung trang và hệ thống sập hiệu năng.`,
    },
    {
      id: 'os-tq-10',
      topic: 'Luồng',
      source: SOURCE,
      question:
        'Thành phần nào có thể chạy **đồng thời** và thực hiện **nhiều tác vụ cùng lúc** bên trong một chương trình?',
      options: ['Multiple jobs', 'Multiple threads', 'Multi processes', 'Multiple programs'],
      answer: 1,
      explanation: `**Multiple threads** — nhiều luồng trong cùng một tiến trình chia sẻ không gian địa chỉ nên có thể chạy song song và cùng thao tác trên dữ liệu chung.

Vì sao thread là câu trả lời chứ không phải process:
- Thread dùng chung bộ nhớ ⇒ trao đổi dữ liệu **gần như miễn phí**, không cần IPC.
- Tạo thread và chuyển ngữ cảnh giữa các thread **rẻ hơn nhiều** so với tiến trình.
- Trên máy nhiều lõi, các thread của cùng một chương trình chạy **song song thật** trên các lõi khác nhau.

Cái giá: vì dùng chung bộ nhớ nên sinh **race condition**, phải tự lo đồng bộ bằng mutex/semaphore.`,
    },
    {
      id: 'os-tq-11',
      topic: 'Đa chương',
      source: SOURCE,
      question: 'Khái niệm nào có mục tiêu là **tăng mức độ sử dụng CPU (CPU utilization)**?',
      options: ['MultiThreading', 'MultiTasking', 'MultiProcessing', 'Multiprogramming'],
      answer: 3,
      explanation: `**Multiprogramming** ra đời chính để giải quyết bài toán CPU ngồi không.

Vấn đề của hệ đơn chương: tiến trình xin I/O là CPU **rảnh hoàn toàn** suốt vài mili giây — bằng hàng triệu chu kỳ lệnh bị phí.

Cách giải: giữ **nhiều tiến trình trong bộ nhớ** cùng lúc; ai chờ I/O thì CPU quay sang chạy người khác. Nhờ vậy mức sử dụng CPU nhảy từ vài phần trăm lên gần như tối đa.

Phân biệt với **MultiTasking**: đó là multiprogramming cộng thêm chia lát thời gian, mục tiêu là **giảm response time** cho người dùng tương tác chứ không chỉ để CPU bận.`,
    },
    {
      id: 'os-tq-12',
      topic: 'Chức năng HĐH',
      source: SOURCE,
      question: 'Chọn phương án **sai** khi nói về chức năng của Hệ điều hành.',
      options: [
        'Thực thi chương trình (Program execution)',
        'Lập trình (Programming)',
        'Quản lý bộ nhớ (Main-memory management)',
        'Quản lý thiết bị xuất nhập (I/O management)',
      ],
      answer: 1,
      explanation: `**Lập trình** là việc của con người và các công cụ phát triển (trình soạn thảo, trình biên dịch, debugger), không phải chức năng của hệ điều hành.

Hệ điều hành **cung cấp môi trường** để chạy các công cụ đó, nhưng bản thân nó không viết ra chương trình. Ranh giới cần nhớ: mọi thứ liên quan tới **quản lý tài nguyên và thực thi** là của HĐH; mọi thứ liên quan tới **tạo ra phần mềm** là của người dùng và công cụ.

Các chức năng chính của HĐH: quản lý tiến trình, quản lý bộ nhớ chính, quản lý file, quản lý thiết bị I/O, quản lý bộ nhớ phụ, bảo vệ và bảo mật, thực thi chương trình.`,
    },
    {
      id: 'os-tq-13',
      topic: 'Thành phần HĐH',
      source: SOURCE,
      question: 'Thành phần nào sau đây **không thuộc** Hệ điều hành?',
      options: [
        'Quản lý tiến trình (Process management)',
        'Hệ thống dịch lệnh (Command-Interpreter System)',
        'Hệ thống bảo vệ (Protection System)',
        'Dịch vụ Rom Bios (Rom Bios device drivers)',
      ],
      answer: 3,
      explanation: `**ROM BIOS** là **firmware nằm trong chip ROM trên bo mạch chủ**, thuộc về phần cứng máy tính chứ không thuộc hệ điều hành.

Thứ tự khởi động cho thấy rõ ranh giới: BIOS chạy **trước**, kiểm tra phần cứng (POST) rồi mới nạp hệ điều hành từ đĩa. Một máy có thể đổi hệ điều hành mà BIOS vẫn nguyên — chứng tỏ hai thứ độc lập.

Ba phương án còn lại đều là thành phần chuẩn của HĐH, trong đó **command-interpreter** (shell, \`cmd\`, \`bash\`) là lớp vỏ nhận lệnh từ người dùng và chuyển cho kernel.`,
    },
    {
      id: 'os-tq-14',
      topic: 'Dịch vụ HĐH',
      source: SOURCE,
      question: '_____ là **dịch vụ** của Hệ điều hành.',
      options: [
        'Cài đặt chương trình (Program setting)',
        'Xác định và xử lý lỗi (Error detection)',
        'Sửa lỗi chương trình (Fix program errors)',
        'Dịch chương trình thành mã thực thi (Translate a program into executable code)',
      ],
      answer: 1,
      explanation: `**Error detection** là dịch vụ chuẩn của hệ điều hành: nó liên tục theo dõi lỗi ở mọi tầng và phản ứng phù hợp.
\`\`\`
CPU và bộ nhớ  - lỗi trang, truy cập bộ nhớ trái phép, chia cho 0
Thiết bị I/O    - đĩa hỏng, hết giấy, lỗi kết nối mạng
Chương trình    - tràn số, lệnh không hợp lệ
\`\`\`
Phản ứng thường thấy là sinh **trap**, kết thúc tiến trình và ghi lại vào log hệ thống.

Vì sao ba phương án kia sai: **dịch chương trình** là việc của trình biên dịch, **sửa lỗi chương trình** là việc của lập trình viên, **cài đặt chương trình** là việc của trình cài đặt — HĐH chỉ cung cấp môi trường cho chúng chạy.`,
    },
    {
      id: 'os-tq-15',
      topic: 'Giao diện',
      source: SOURCE,
      question: 'Thao tác của **Command Line Interface (CLI)** là gì?',
      options: [
        'Thao tác khác (Other operations)',
        'Double click trên Icon (Double click on Icon)',
        'Nhập lệnh + Tham số + ENTER (Commands + Command line parameters + ENTER)',
        'Nhập lệnh + Tham số (Commands + Command line parameters)',
      ],
      answer: 2,
      explanation: `CLI làm việc theo đúng ba bước: **gõ tên lệnh**, **thêm tham số**, rồi **nhấn ENTER** để shell thực thi.

Phím ENTER là phần không thể thiếu: chừng nào chưa nhấn, dòng lệnh mới chỉ nằm trong bộ đệm nhập, shell chưa hề phân tích hay chạy gì cả. Đó là lý do phương án thiếu ENTER bị loại.

**Double click trên Icon** thuộc về **GUI** — giao diện đồ hoạ, cách tương tác hoàn toàn khác.

Ví dụ quen thuộc: \`copy file1.txt file2.txt\` gồm lệnh \`copy\` và hai tham số.`,
    },
    {
      id: 'os-tq-16',
      topic: 'MS-DOS',
      source: SOURCE,
      question: 'Thành phần nào sau đây thuộc hệ điều hành **MS-DOS**?',
      options: [
        'PowerShell',
        'Resident system program',
        'Command-line Interpreters',
        'Dịch vụ Rom Bios (Rom Bios device drivers)',
      ],
      answer: 1,
      explanation: `Cấu trúc phân tầng của MS-DOS theo giáo trình, từ trên xuống:
\`\`\`
Application program
Resident system program     ← phần thường trú của MS-DOS
MS-DOS device drivers
ROM BIOS device drivers     ← firmware, KHÔNG thuộc MS-DOS
\`\`\`

**Resident system program** là phần lõi của MS-DOS nằm thường trú trong bộ nhớ (\`IO.SYS\`, \`MSDOS.SYS\`) — đây là đáp án.

Vì sao loại các phương án khác:
- **ROM BIOS device drivers** nằm trong firmware của bo mạch chủ, MS-DOS *dùng* chúng chứ không *sở hữu* chúng.
- **PowerShell** là shell hiện đại của Windows, ra đời năm 2006, không liên quan MS-DOS.`,
    },
    {
      id: 'os-tq-17',
      topic: 'Chế độ xử lý',
      source: SOURCE,
      question:
        'Các tiến trình hoạt động trong **User mode** sẽ có chế độ xử lý tiến trình là gì?',
      options: ['Không đặc quyền (Preemptive)', 'Đặc quyền (Nonpreemptive)'],
      answer: 0,
      explanation: `Tiến trình người dùng chạy ở **user mode**, **không có đặc quyền**, nên hệ điều hành **được phép tước CPU** của nó bất cứ lúc nào — đó là **preemptive**.

Cơ chế thực hiện: bộ định thời (timer) phát ngắt theo chu kỳ, CPU chuyển sang kernel mode, bộ lập lịch quyết định có đổi tiến trình hay không. Người dùng không thể tắt ngắt này vì lệnh tắt ngắt là **lệnh đặc quyền**.

Nếu tiến trình người dùng chạy **nonpreemptive**, một vòng lặp vô hạn trong chương trình bất kỳ sẽ treo cả hệ thống — chính vì vậy mọi hệ điều hành hiện đại đều bắt buộc preemptive ở user mode.`,
    },
  ],
};
