import type {QuizSet} from '@site/src/components/Quiz/types';

const SOURCE = 'Cuối kỳ HĐH – SPKT';

export const dongBo: QuizSet = {
  id: 'os-dong-bo',
  title: 'Chương 6: Đồng bộ tiến trình',
  description: 'Miền găng, Peterson, mutex lock, semaphore, monitor và các bài toán đồng bộ kinh điển.',
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
    {
      id: 'os-db-04',
      topic: 'Peterson',
      source: SOURCE,
      question: 'Đoạn code sau giải quyết bài toán Critical-section thuộc giải pháp nào sau đây?',
      code: `while (true) {

    flag[i] = true;   /* Pi ready */
    turn = j;         /* preemptive Pj */
    while (flag[j] && turn == j)
        ;

    /* critical section */

    flag[i] = false;

    /* remainder section */
}`,
      options: [
        'Software Solution 1',
        "Peterson's Algorithm",
        'Special hardware instructions',
        'Memory barriers',
      ],
      answer: 1,
      explanation: `Dấu hiệu nhận ra **thuật toán Peterson**: dùng **đồng thời hai biến** \`flag[]\` và \`turn\`.

- \`flag[i] = true\` — Pi tuyên bố *muốn vào*.
- \`turn = j\` — Pi **nhường lượt** cho Pj. Chính cú nhường này làm nên điều kỳ diệu: nếu cả hai cùng muốn vào, cả hai cùng nhường, và \`turn\` chỉ giữ được *một* giá trị ghi sau cùng → đúng một tiến trình lọt qua.
- Điều kiện chờ \`flag[j] && turn == j\`: chỉ chờ khi Pj vừa muốn vào **vừa** đang tới lượt.

Peterson thoả cả ba yêu cầu: Mutual Exclusion, Progress và Bounded Waiting.

Phân biệt:
- **Software Solution 1** chỉ dùng mỗi biến \`turn\` (luân phiên nghiêm ngặt) — vi phạm Progress.
- **Special hardware instructions** là \`test_and_set\`, \`compare_and_swap\` — lệnh nguyên tử của phần cứng, không phải code thuần như trên.`,
    },
    {
      id: 'os-db-05',
      topic: 'Mutex lock',
      source: SOURCE,
      question:
        'Giải pháp cho bài toán Critical-section nào dùng 2 thao tác **acquire()** và **release()**?',
      options: ['Mutex lock', 'Liveness', 'Semaphores', 'Monitors'],
      answer: 0,
      explanation: `**Mutex lock** (mutual exclusion lock) là giải pháp đơn giản nhất ở mức phần mềm hệ thống:

\`\`\`
acquire();
    /* critical section */
release();
\`\`\`

- \`acquire()\` chờ tới khi khoá rảnh rồi chiếm nó (\`available = false\`).
- \`release()\` trả khoá (\`available = true\`).
- Cả hai phải là thao tác **nguyên tử**, thường cài bằng lệnh phần cứng \`compare_and_swap\`.

Mutex là khoá **nhị phân có chủ sở hữu**: ai khoá thì người đó mở. Nhớ theo cặp từ khoá: acquire/release → **mutex**, wait/signal → **semaphore**.

*Liveness* không phải cơ chế khoá — nó là nhóm tính chất "việc gì đó cuối cùng cũng xảy ra" (không deadlock, không starvation).`,
    },
    {
      id: 'os-db-06',
      topic: 'Semaphore',
      source: SOURCE,
      question:
        'Giải pháp cho bài toán Critical-section nào dùng 2 thao tác **wait()** và **signal()**?',
      options: ['Semaphores', 'Monitors', 'Mutex lock', 'Liveness'],
      answer: 0,
      explanation: `**Semaphore** là biến nguyên S với hai thao tác nguyên tử, ký hiệu gốc tiếng Hà Lan là P (proberen) và V (verhogen):

\`\`\`
wait(S):   while (S <= 0) ; S--;
signal(S): S++;
\`\`\`

- **Binary semaphore** (S chỉ 0/1) dùng như mutex.
- **Counting semaphore** đếm số tài nguyên còn rảnh — đây là điểm mạnh mà mutex không có, ví dụ quản lý 5 máy in thì khởi tạo S = 5.
- Semaphore **không có chủ sở hữu**: tiến trình A \`wait\` còn tiến trình B \`signal\` là chuyện bình thường, nhờ vậy dùng được để **đồng bộ thứ tự** (bắt P2 chạy sau P1).

**Monitor** là cấu trúc mức ngôn ngữ, cũng có \`wait()\`/\`signal()\` nhưng trên **biến điều kiện** bên trong monitor, khác với semaphore ở chỗ mọi thủ tục của monitor đã tự động loại trừ tương hỗ.`,
    },
    {
      id: 'os-db-09',
      topic: 'Critical Section',
      source: SOURCE,
      question:
        'Hai tiến trình P1 và P2 dùng hai biến boolean chung S1 và S2 (giá trị ban đầu gán ngẫu nhiên) để vào Critical section. Câu nào mô tả đúng các thuộc tính đạt được?',
      code: `Method Used by P1          Method Used by P2
while (S1 == S2) ;         while (S1 != S2) ;
    Critical Section           Critical Section
S1 = S2;                   S2 = not (S1);`,
      options: [
        'Có Mutual exclusion và Progress',
        'Không Mutual exclusion và Progress',
        'Progress nhưng không Mutual exclusion',
        'Mutual exclusion nhưng không Progress',
      ],
      answer: 3,
      explanation: `**Mutual Exclusion: có.** Điều kiện vào của hai bên loại trừ nhau tuyệt đối:
- P1 vào khi \`S1 != S2\`
- P2 vào khi \`S1 == S2\`

Hai mệnh đề này không bao giờ cùng đúng, nên không thể có hai tiến trình trong miền găng cùng lúc.

**Progress: không.** Đây là **luân phiên nghiêm ngặt** trá hình:
- P1 ra khỏi CS đặt \`S1 = S2\` → thành \`S1 == S2\` → chỉ **P2** vào được.
- P2 ra khỏi CS đặt \`S2 = not(S1)\` → thành \`S1 != S2\` → chỉ **P1** vào được.

Nghĩa là thứ tự bắt buộc là P1, P2, P1, P2… Nếu P2 xong việc và bỏ đi luôn (ở remainder section), P1 sẽ kẹt mãi dù miền găng đang trống — đúng định nghĩa vi phạm **Progress**.`,
    },
    {
      id: 'os-db-10',
      topic: 'Semaphore',
      source: SOURCE,
      question:
        'Chương trình sau gồm 3 tiến trình đồng thời và 3 binary semaphore, khởi tạo **S0 = 1, S1 = 0, S2 = 0**. Tiến trình P0 print "0" bao nhiêu lần?',
      code: `Process P0              Process P1       Process P2
while (true) {          wait(S1);        wait(S2);
    wait(S0);           release(S0);     release(S0);
    print '0';
    release(S1);
    release(S2);
}`,
      options: ['Ít nhất hai lần', 'Chính xác hai lần', 'Chính xác một lần', 'Nhiều nhất hai lần'],
      answer: 0,
      explanation: `Mấu chốt: P1 và P2 **không có vòng lặp**, mỗi tiến trình chỉ chạy đúng một lần; còn **binary semaphore bão hoà ở 1** — release khi giá trị đang là 1 thì không cộng dồn.

Lần in thứ nhất chắc chắn xảy ra: S0 = 1 nên P0 qua \`wait(S0)\`, in "0", rồi release S1 và S2.

Sau đó P1 và P2 mỗi bên release S0 một lần, nhưng kết quả phụ thuộc thứ tự:

**Trường hợp 2 lần in** — P1 và P2 release S0 sát nhau khi P0 chưa kịp tiêu thụ:
- P1: release(S0) → S0 = 1
- P2: release(S0) → S0 vẫn = 1 (**mất một tín hiệu** vì là binary)
- P0 in lần 2 rồi kẹt ở \`wait(S0)\` mãi.

**Trường hợp 3 lần in** — P0 tiêu thụ xen kẽ:
- P1: release(S0) → P0 in lần 2
- P2: release(S0) → P0 in lần 3

Vậy số lần in tối thiểu là 2 và có thể hơn → **ít nhất hai lần**. Các đáp án "chính xác hai lần" hay "nhiều nhất hai lần" đều sai vì bỏ sót trường hợp 3 lần.`,
    },
    {
      id: 'os-db-11',
      topic: 'Critical Section',
      source: SOURCE,
      question:
        'Hai tiến trình X và Y cần truy cập một critical section, dùng cấu trúc đồng bộ hoá sau (varP, varQ là biến chia sẻ, khởi tạo **false**). Phát biểu nào sau đây là đúng?',
      code: `Process X                       Process Y
while (true)                    while (true)
{                               {
    varP = true;                    varQ = true;
    while (varQ == true)            while (varP == true)
    {                               {
        /* Critical Section */          /* Critical Section */
        varP = false;                   varQ = false;
    }                               }
}                               }`,
      options: [
        'Ngăn chặn Deadlock nhưng không đảm bảo Mutual Exclusion',
        'Không ngăn chặn được Deadlock và không đảm bảo Mutual Exclusion',
        'Đảm bảo Mutual Exclusion nhưng không ngăn chặn được Deadlock',
        'Đảm bảo Mutual Exclusion và ngăn chặn Deadlock',
      ],
      answer: 3,
      explanation: `Đáp án theo đề là **d**, dựa trên lập luận: miền găng nằm *bên trong* vòng \`while\`, X chỉ vào được khi Y đã giơ tay (\`varQ == true\`) và ngược lại, nên hai bên "bắt tay" nhau chứ không cùng giành khoá; và không tồn tại thế cả hai cùng chờ vĩnh viễn nên không deadlock.

**Về deadlock thì chắc chắn đúng**: X chỉ kẹt khi \`varQ == false\`, mà lúc đó Y đang ở vòng ngoài và luôn đặt \`varQ = true\` — nên không có trạng thái cả hai cùng đứng im mãi.

**Cần nói rõ:** phần **Mutual Exclusion** của câu này gây tranh cãi ngay từ đề gốc (GATE 2015). Xen kẽ sau đây cho cả hai cùng vào miền găng:

- X: \`varP = true\`
- Y: \`varQ = true\`
- X: kiểm tra \`varQ == true\` → đúng → **vào CS**
- Y: kiểm tra \`varP == true\` → vẫn đúng (X chỉ đặt \`varP = false\` ở **cuối** thân CS) → **vào CS**

Theo phân tích sát mã nguồn thì Mutual Exclusion **không** được đảm bảo, tức phương án a mới đúng. Đi thi cứ chọn theo đáp án của đề, nhưng nên biết lỗ hổng này để không áp dụng sai vào bài khác.`,
    },
    {
      id: 'os-db-12',
      topic: 'Critical Section',
      source: SOURCE,
      question:
        'Xem xét giải pháp đồng bộ hoá hai tiến trình sau, biến chia sẻ **turn** khởi tạo bằng 0. Điều nào sau đây là ĐÚNG?',
      code: `Process 0                          Process 1
Entry: loop while (turn == 1);     Entry: loop while (turn == 0);
       (critical section)                 (critical section)
Exit:  turn = 1;                   Exit:  turn = 0;`,
      options: [
        'Đây là một giải pháp đồng bộ hoá hai tiến trình đúng',
        'Giải pháp này vi phạm yêu cầu Mutual Exclusion',
        'Giải pháp này vi phạm yêu cầu Bounded Waiting',
        'Giải pháp này vi phạm yêu cầu Progress',
      ],
      answer: 3,
      explanation: `Đây là **luân phiên nghiêm ngặt** (strict alternation) — giải pháp phần mềm số 1, chỉ dùng duy nhất biến \`turn\`.

**Mutual Exclusion: đạt.** \`turn\` chỉ mang một giá trị nên đúng một tiến trình qua được cổng.

**Progress: vi phạm.** Sau khi Process 0 ra khỏi miền găng, \`turn = 1\`. Nếu Process 1 đang ở remainder section và không có nhu cầu vào, \`turn\` đứng yên ở 1, còn Process 0 muốn vào lại thì kẹt ở \`loop while (turn == 1)\` — **miền găng trống mà không ai vào được**, và kẻ chặn lại là một tiến trình đang ở ngoài miền găng.

**Bounded Waiting: vẫn đạt**, vì nếu cả hai đều muốn vào thì chúng thay phiên đều đặn, không ai bị qua mặt quá một lần.

Nhớ mẹo: giải pháp chỉ có mỗi \`turn\` → hỏng **Progress**; thêm mảng \`flag[]\` nữa thành **Peterson** thì đủ cả ba.`,
    },
    {
      id: 'os-db-13',
      topic: 'Race condition',
      source: SOURCE,
      question:
        'Hai tiến trình P1 và P2 thực thi đồng thời trên các biến dùng chung a, b, c. Giá trị nào sau đây **không thể** là giá trị của c sau khi cả hai tiến trình hoàn tất?',
      code: `Khởi tạo: a = 4, b = 5, c = 0

P1                      P2
if (a < 0)              b = 10;
    c = b-a;            a = -3;
else
    c = b+a;`,
      options: ['9', '7', '11', '13'],
      answer: 2,
      explanation: `Liệt kê mọi giá trị c có thể nhận, nhớ rằng P1 đọc \`a\` **hai lần**: một lần ở điều kiện, một lần ở biểu thức — giữa hai lần đó P2 có thể chen vào.

**Nhánh else** (điều kiện đọc được a = 4), c = b + a với cặp (b, a) tại lúc tính:
- (5, 4) → **9** — P1 chạy trọn trước P2
- (10, 4) → 14 — P2 kịp gán b = 10
- (10, −3) → **7** — P2 chạy trọn cả hai lệnh
- (5, −3) → 2 — hiếm nhưng có: P1 đọc b = 5 trước, P2 gán a = −3 sau

**Nhánh if** (điều kiện đọc được a = −3): vì \`b = 10\` đứng **trước** \`a = -3\` trong P2 nên lúc này b chắc chắn đã là 10 → c = 10 − (−3) = **13**.

Tập giá trị khả dĩ: {2, 7, 9, 13, 14}. **11 không thuộc tập này** nên là đáp án.`,
    },
    {
      id: 'os-db-14',
      topic: 'Semaphore',
      source: SOURCE,
      question: 'Hai hoạt động nguyên tử được phép trên **Semaphores** là ____ và ____.',
      options: ['wait, signal', 'acquire(), release()', 'hold, signal', 'wait, hold'],
      answer: 0,
      explanation: `Semaphore chỉ có hai thao tác nguyên tử: **wait()** (còn gọi là P, giảm) và **signal()** (còn gọi là V, tăng).

\`\`\`
wait(S):   while (S <= 0) ; S--;
signal(S): S++;
\`\`\`

Nguyên tử ở đây nghĩa là không tiến trình nào chen vào giữa phép kiểm tra và phép giảm — nếu chen được thì chính semaphore lại sinh race condition.

*acquire()/release()* là của **mutex lock**; *hold* không phải thao tác của cơ chế nào cả.`,
    },
    {
      id: 'os-db-15',
      topic: 'Mutex lock',
      source: SOURCE,
      question: 'Hai hoạt động nguyên tử được phép trong **Mutex locks** là ____ và ____.',
      options: ['hold, signal', 'acquire(), release()', 'wait(), signal()', 'wait, hold'],
      answer: 1,
      explanation: `Mutex lock dùng **acquire()** để chiếm khoá và **release()** để trả khoá.

Nhớ theo cặp để khỏi lẫn:
- **mutex** → acquire / release
- **semaphore** → wait / signal
- **monitor** → wait / signal nhưng trên **biến điều kiện**, và việc loại trừ tương hỗ là tự động

Khác biệt bản chất: mutex có **chủ sở hữu** (ai khoá người đó mở) và chỉ mang hai giá trị; semaphore không có chủ và có thể đếm nhiều tài nguyên.`,
    },
    {
      id: 'os-db-16',
      topic: 'Bài toán kinh điển',
      source: SOURCE,
      question: 'Bài toán **Bounded buffer** còn được gọi là',
      options: [
        'Bài toán Dining Philosophers',
        'Bài toán Reader - Writer',
        'Bài toán Producer - Consumer',
        'Cả Reader – Writer và Dining Philosophers',
      ],
      answer: 2,
      explanation: `**Bounded buffer** = **Producer - Consumer** với vùng đệm hữu hạn n phần tử: producer bỏ dữ liệu vào, consumer lấy ra; producer phải chờ khi đầy, consumer phải chờ khi rỗng.

Lời giải chuẩn dùng ba semaphore:
\`\`\`
mutex = 1     // bảo vệ vùng đệm
empty = n     // số ô trống
full  = 0     // số ô có dữ liệu
\`\`\`

Ba bài toán đồng bộ kinh điển, đừng lẫn:
- **Producer - Consumer (bounded buffer)** — vùng đệm giới hạn.
- **Reader - Writer** — nhiều người đọc cùng lúc được, người ghi phải độc quyền.
- **Dining Philosophers** — năm triết gia tranh đũa, minh hoạ cho deadlock và starvation.`,
    },
    {
      id: 'os-db-17',
      topic: 'Critical Section',
      source: SOURCE,
      question: '**Mutual Exclusion** xảy ra khi nào?',
      options: [
        'Giữa hai tiến trình rời rạc không tương tác',
        'Giữa các tiến trình không sử dụng cùng một tài nguyên',
        'Giữa các tiến trình chia sẻ tài nguyên',
        'Giữa hai tiến trình sử dụng tài nguyên khác nhau của máy khác nhau',
      ],
      answer: 2,
      explanation: `Loại trừ tương hỗ chỉ có ý nghĩa khi **có cái để tranh nhau**: cùng một biến, cùng một file, cùng một máy in.

Tiến trình không dùng chung tài nguyên thì chạy song song thoải mái, không cần và cũng không nên khoá — khoá thừa chỉ làm chậm hệ thống.

Nói cách khác: chia sẻ tài nguyên sinh ra **race condition**, race condition đòi hỏi **miền găng**, miền găng đòi hỏi **mutual exclusion**.`,
    },
    {
      id: 'os-db-18',
      topic: 'Semaphore',
      source: SOURCE,
      question: `Tại thời điểm cụ thể, giá trị của một **counting semaphore** là 12. Nó sẽ trở thành 15 khi:

- (a) 3 hoạt động của signal()
- (b) 3 hoạt động của wait()
- (c) 5 hoạt động của signal() và 2 hoạt động của wait()
- (d) 2 hoạt động của signal() và 5 hoạt động của wait()

Phương án nào sau đây là đúng?`,
      options: ['(a) và (c)', '(a) và (d)', '(a) và (b)', '(b) và (d)'],
      answer: 0,
      explanation: `Quy tắc: \`signal()\` **tăng 1**, \`wait()\` **giảm 1**. Cần đi từ 12 lên 15, tức tăng ròng **+3**.

- (a) +3 → 12 + 3 = **15** ✔
- (b) −3 → 12 − 3 = 9 ✘
- (c) +5 − 2 = +3 → **15** ✔
- (d) +2 − 5 = −3 → 9 ✘

Vậy đáp án là **(a) và (c)**.

Lưu ý đây là **counting semaphore** nên giá trị cộng dồn tự do; nếu là **binary semaphore** thì giá trị chỉ quanh quẩn 0 và 1, thừa signal sẽ bị bỏ qua.`,
    },
    {
      id: 'os-db-19',
      topic: 'Semaphore',
      source: SOURCE,
      question:
        'Ba thread T1, T2, T3 chạy trên một bộ xử lý duy nhất, đồng bộ bằng 3 binary semaphore S1, S2, S3. Việc khởi tạo semaphore nào sẽ in ra chuỗi **BCABCABCA…**?',
      code: `T1                  T2                  T3
while (true) {      while (true) {      while (true) {
    wait(S3);           wait(S1);           wait(S2);
    print("C");         print("B");         print("A");
    signal(S2); }       signal(S3); }       signal(S1); }`,
      options: [
        'S1 = 1; S2 = 1; S3 = 1',
        'S1 = 1; S2 = 1; S3 = 0',
        'S1 = 0; S2 = 1; S3 = 1',
        'S1 = 1; S2 = 0; S3 = 0',
      ],
      answer: 3,
      explanation: `Chuỗi cần in là **B → C → A → B → C → A…**, mà mỗi thread in đúng một chữ:
- T2 in **B**, cần S1
- T1 in **C**, cần S3
- T3 in **A**, cần S2

Muốn **B chạy trước**: chỉ **S1 = 1**, hai semaphore còn lại phải bằng 0 để T1 và T3 nằm chờ.

Dây chuyền tự chạy đúng thứ tự:
\`\`\`
T2: wait(S1) ✔ → in "B" → signal(S3)
T1: wait(S3) ✔ → in "C" → signal(S2)
T3: wait(S2) ✔ → in "A" → signal(S1)
→ quay lại T2, lặp mãi: BCABCABCA...
\`\`\`

Các phương án khác sai vì mở khoá nhiều hơn một thread cùng lúc: ví dụ S1 = S2 = S3 = 1 thì cả ba chạy tự do, thứ tự in phụ thuộc bộ lập lịch, không còn là chuỗi cố định.`,
    },
    {
      id: 'os-db-20',
      topic: 'Semaphore',
      source: SOURCE,
      question: `**Semaphores** được sử dụng để giải quyết vấn đề của:

- I. Deadlock
- II. Process Synchronization
- III. Starvation
- IV. Không có cái nào`,
      options: ['IV', 'I và III', 'II', 'I'],
      answer: 2,
      explanation: `Semaphore sinh ra để làm **đồng bộ tiến trình** (process synchronization): bảo vệ miền găng và ép thứ tự thực thi giữa các tiến trình.

Nó **không** giải quyết hai vấn đề còn lại, thậm chí còn gây ra:
- **Deadlock**: dùng sai thứ tự \`wait()\` là kẹt ngay — \`P0: wait(S); wait(Q)\` trong khi \`P1: wait(Q); wait(S)\`.
- **Starvation**: nếu hàng đợi của semaphore hoạt động theo LIFO, tiến trình vào trước có thể chờ mãi.

Semaphore là **công cụ**, không phải lời giải cho mọi vấn đề đồng thời — lập trình viên vẫn phải tự lo thứ tự khoá và chính sách hàng đợi.`,
    },
    {
      id: 'os-db-21',
      topic: 'Semaphore',
      source: SOURCE,
      question:
        'Giá trị của một **counting semaphore** đang là 7. Sau đó **20 phép wait()** và **15 phép signal()** được hoàn thành trên semaphore này. Giá trị kết quả là bao nhiêu?',
      options: ['2', '12', '7', '42'],
      answer: 0,
      explanation: `Chỉ là phép cộng trừ: \`wait()\` giảm 1, \`signal()\` tăng 1.

\`\`\`
7 - 20 + 15 = 2
\`\`\`

Đề nói các phép toán đã **hoàn thành** nên không tiến trình nào bị chặn giữa chừng, cứ cộng trừ thẳng.

Ghi chú về cài đặt thật: trong bản semaphore có hàng đợi, giá trị **âm** mang ý nghĩa — trị tuyệt đối của nó là **số tiến trình đang nằm chờ**. Ví dụ S = −3 nghĩa là ba tiến trình đang bị chặn trên semaphore đó.`,
    },
    {
      id: 'os-db-22',
      topic: 'Semaphore',
      source: SOURCE,
      question:
        'Một **counting semaphore** được khởi tạo là 10. Sau đó **6 phép wait()** và **4 phép signal()** được hoàn thành trên semaphore này. Giá trị kết quả là bao nhiêu?',
      options: ['12', '10', '0', '8'],
      answer: 3,
      explanation: `\`\`\`
10 - 6 + 4 = 8
\`\`\`

Mỗi \`wait()\` trừ 1, mỗi \`signal()\` cộng 1. Giá trị khởi tạo 10 đủ lớn nên không phép \`wait()\` nào bị chặn, cứ tính thẳng.

Ý nghĩa thực tế: semaphore này đang giữ **8 tài nguyên rảnh** — ví dụ 10 kết nối trong connection pool, 6 lần mượn và 4 lần trả, còn lại 8.`,
    },
  ],
};
