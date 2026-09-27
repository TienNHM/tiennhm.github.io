import type {QuizSet} from '@site/src/components/Quiz/types';

const SOURCE = 'Cuối kỳ HĐH – SPKT';

export const dongBo: QuizSet = {
  id: 'os-dong-bo',
  title: 'Chương 6: Đồng bộ và miền găng',
  description: 'Ba yêu cầu của bài toán Critical Section: Mutual Exclusion, Progress, Bounded Waiting.',
  questions: [
    {
      id: 'os-db-01',
      topic: 'Critical Section',
      source: SOURCE,
      question:
        'Một tiến trình tạm dừng bên ngoài miền găng (Critical Section) không được ngăn cản các tiến trình khác vào miền găng, điều này liên quan tới yêu cầu nào trong bài toán Critical Section?',
      options: ['Bounded Waiting', 'Progress', 'Preemption', 'Mutual Exclusion'],
      answer: 1,
      explanation: `**Progress** (tiến triển): nếu không có tiến trình nào đang ở trong miền găng và có tiến trình muốn vào, thì việc chọn ai được vào **chỉ được quyết định bởi các tiến trình đang xin vào**, và quyết định không được trì hoãn vô hạn.

Tiến trình đang dừng ở **remainder section** (đoạn ngoài miền găng) không tham gia quyết định đó, nên nó không được phép chặn ai cả.

Ví dụ vi phạm Progress — thuật toán luân phiên nghiêm ngặt:
\`\`\`
// P0                  // P1
while (turn != 0);     while (turn != 1);
   critical section        critical section
turn = 1;              turn = 0;
\`\`\`
Nếu P0 xong rồi ngồi mãi ở remainder section, \`turn\` vẫn bằng 0 và P1 không bao giờ vào được dù miền găng trống.`,
    },
    {
      id: 'os-db-02',
      topic: 'Critical Section',
      source: SOURCE,
      question:
        'Không có tiến trình nào phải chờ vô hạn để được vào miền Critical-section liên quan tới yêu cầu nào trong bài toán Critical Section?',
      options: ['Mutual Exclusion', 'Bounded Waiting', 'Progress', 'Preemption'],
      answer: 1,
      explanation: `**Bounded Waiting** (chờ có giới hạn): phải tồn tại một **cận trên** cho số lần các tiến trình khác được vào miền găng sau khi một tiến trình đã đăng ký xin vào và trước khi nó được chấp nhận.

Đây chính là điều kiện chống **starvation**: đợi thì được, nhưng không được đợi vô hạn.

Phân biệt với **Progress**: Progress nói *hệ thống không bị kẹt* (luôn có người vào được), còn Bounded Waiting nói *từng tiến trình cụ thể không bị bỏ đói*. Một thuật toán có thể thoả Progress mà vẫn vi phạm Bounded Waiting nếu một tiến trình xui liên tục bị qua mặt.`,
    },
    {
      id: 'os-db-03',
      topic: 'Critical Section',
      source: SOURCE,
      question:
        'Không có hai tiến trình cùng ở trong miền Critical-section cùng lúc liên quan tới yêu cầu nào trong bài toán Critical Section?',
      options: ['Mutual Exclusion', 'Progress', 'Preemption', 'Bounded Waiting'],
      answer: 0,
      explanation: `**Mutual Exclusion** (loại trừ tương hỗ): tại mỗi thời điểm, nhiều nhất **một** tiến trình được ở trong miền găng.

Đây là yêu cầu cốt lõi, sinh ra từ vấn đề **race condition**: hai tiến trình cùng sửa \`counter++\` (thực chất là load – tăng – store) có thể đan xen lệnh và làm mất một lần cập nhật.

Ba yêu cầu của bài toán Critical Section:
- **Mutual Exclusion** — không hai tiến trình cùng trong miền găng.
- **Progress** — miền găng trống thì không được cản người muốn vào.
- **Bounded Waiting** — chờ có giới hạn, không bị bỏ đói.

*Preemption* là khái niệm của lập lịch CPU, không nằm trong ba yêu cầu này.`,
    },
  ],
};
