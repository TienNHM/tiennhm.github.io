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
  ],
};
