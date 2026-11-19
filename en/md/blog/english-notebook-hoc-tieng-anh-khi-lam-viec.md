# English Notebook: vừa làm việc vừa học tiếng Anh, tối đi metro về mở điện thoại ôn lại

> Nguồn: https://tiennhm.io.vn/en/blog/english-notebook-hoc-tieng-anh-khi-lam-viec
> English Notebook là app mã nguồn mở để học tiếng Anh từ chính những câu bạn gõ lúc làm việc. Hỏi AI agent bằng tiếng Việt, nhận câu tiếng Anh tự nhiên, từ vựng được lưu thẳng vào sổ, rồi ôn bằng thẻ Leitner trên điện thoại, kể cả khi không có mạng. Bài này kể vì sao tôi làm nó, cách nó hoạt động, cách cài với Claude Code và những điều cần cẩn thận.

> **English Notebook** là một PWA nhỏ để học tiếng Anh từ những gì bạn thật sự viết ở chỗ làm. Mỗi khi bạn nhờ AI agent bằng tiếng Việt, skill **English Coach** đưa lại câu tiếng Anh tự nhiên kèm vài cụm từ đáng nhớ, rồi tự lưu vào sổ qua một MCP server. Tối đi metro về, bạn mở app trên điện thoại và ôn bằng thẻ **Leitner** (Quên / Nhớ / Dễ). App chạy được khi không có mạng, có streak, XP và huy hiệu để giữ thói quen, và mã nguồn mở ở [TienNHM/english-notebook](https://github.com/TienNHM/english-notebook).

Bài này kể lại vì sao tôi làm app, nó hoạt động thế nào, và cách cài nếu bạn muốn thử. Đây là dự án cá nhân đang dùng hằng ngày, **không phải** một nghiên cứu về hiệu quả học tập: tôi chưa có số liệu nào chứng minh tiếng Anh của mình tốt lên bao nhiêu nhờ nó, nên bài chỉ nói về cách làm, không hứa kết quả.

## Mục tiêu: học tiếng Anh mà không phải dành thêm một khoảng thời gian riêng

Cả ngày tôi làm việc với AI agent, phần lớn bằng tiếng Việt: "giúp tôi xem tại sao API trả lỗi 500 khi gọi", "check lại giúp tôi đoạn deploy này". Đó là những câu tôi **thật sự cần nói** ở chỗ làm, và cũng là những câu tôi muốn biết nói bằng tiếng Anh. Còn app từ vựng thông thường thì cho tôi danh sách từ không dính gì đến công việc, học xong vài hôm là quên.

Nên tôi đặt ra một mục tiêu đơn giản:

1. **Lúc làm việc**, mỗi lần nhắn bằng tiếng Việt thì nhận lại luôn câu tiếng Anh tương ứng, không phải mở thêm cửa sổ hay tra từ điển.
2. Câu đó và vài cụm từ trong đó **tự được lưu lại**, tôi không phải chép tay.
3. **Tối đi metro về**, mở điện thoại là ôn được những câu của mấy ngày trước, kể cả khi đoạn hầm mất sóng.

English Notebook là phần còn thiếu để nối ba bước này lại với nhau.

## Luồng dùng hằng ngày

![Màn hình ôn tập: mặt trước là câu tiếng Anh, mặt sau là nghĩa tiếng Việt và câu gốc, ba nút Quên, Nhớ, Dễ](./english-notebook-review.webp)

### Buổi làm việc: hỏi bằng tiếng Việt, nhận câu tiếng Anh

Sau khi cài skill (phần bên dưới), mỗi câu tôi nhắn bằng tiếng Việt được trả lời kèm một khối "English Coach". Ví dụ với câu `giúp tôi xem tại sao api trả lỗi 500 khi gọi`:

```text
🇬🇧 In English: "Can you help me find out why the API returns a 500 error when I call it?"

🔑 Key words:
• find out why = tìm ra lý do
• returns a 500 error = trả về lỗi 500
• when I call it = khi tôi gọi nó
```

Phần trả lời chính của agent sau đó cũng là tiếng Anh đơn giản kèm tiếng Việt, nên việc thật vẫn làm tiếp bình thường. Khối coach chỉ thêm vài giây đọc.

Nếu tôi viết bằng tiếng Anh, skill sửa lỗi ngữ pháp, từ dùng chưa tự nhiên hoặc giới từ, tối đa ba lỗi mỗi lần, và bỏ qua lỗi chính tả hay viết hoa để không làm tôi chán. Cần tắt thì gõ `skip coach` cho riêng tin nhắn đó.

### Tự lưu vào sổ

Sau khi xong việc chính, skill gọi MCP server để lưu **một câu** kèm 2–3 cụm từ rút ra từ nó. Trong app, câu gốc tiếng Việt vẫn nằm cạnh câu tiếng Anh, và mỗi cụm từ thành một thẻ riêng nhưng vẫn liên kết với câu chứa nó. Mỗi thẻ có nhãn `claude` để tôi biết thẻ nào do agent lưu. Từ kỹ thuật thuần như deploy, merge, PR thì skill được dặn là không lưu, vì tôi đã biết.

![Thư viện của app: các câu tiếng Anh kèm câu gốc tiếng Việt và các cụm từ đã tách ra, có tag work, api, review](./english-notebook-library.webp)

### Buổi tối: ôn trên điện thoại

Phần ôn dùng hộp **Leitner**: thẻ nằm trong sáu hộp (box 0 đến 5) và khoảng cách ôn lần lượt là 0, 1, 3, 7, 14 và 30 ngày. Mỗi thẻ hiện mặt trước, tôi tự nhớ, lật lên xem rồi chọn:

- **Quên**: thẻ về hộp 0 và gặp lại sau khoảng 10 phút.
- **Nhớ**: thẻ lên một hộp.
- **Dễ**: thẻ lên hai hộp.

Để giữ thói quen, app có **mục tiêu hằng ngày** (chọn 5, 10, 15, 20 hoặc 30 thẻ), **streak** đếm số ngày liền đạt mục tiêu, **XP** và cấp độ, và 35 huy hiệu. Có thêm **băng cứu streak** 🧊: cứ mỗi mốc streak là bội số của 7 ngày thì nhận một băng (tối đa hai), dùng để bù một ngày lỡ. Đây là phần "gamification" nhẹ, mục đích duy nhất là có lý do để mở app khi tàu đang chạy.

![App trên điện thoại: danh sách thẻ, thanh tìm kiếm, các tag và thanh menu dưới cùng](./english-notebook-mobile.webp)

## Chạy trên điện thoại, kể cả khi mất sóng

App là một **PWA**: thuần HTML, CSS và JavaScript, không có bước build, nên cài lên điện thoại như một app thật:

- **Android (Chrome, Edge):** mở **Profile**, bấm **📲 Cài app** hoặc dùng menu trình duyệt chọn *Install app*.
- **iPhone, iPad:** phải dùng Safari. Bấm nút Chia sẻ, chọn **Thêm vào Màn hình chính**.

Sau khi cài, app mở toàn màn hình, nhấn giữ biểu tượng ra các lối tắt (**Ôn tập hôm nay**, **Thêm từ mới**, **Thành tích và streak**) và **mở được khi không có mạng**. Thẻ bạn ôn hoặc thêm lúc offline được lưu trên máy rồi đồng bộ khi có mạng lại. Tạo token, chia sẻ kho từ và gọi agent thì cần có mạng.

Đồng bộ giữa máy tính và điện thoại dựa trên đăng nhập Google và Firestore. Nếu hai thiết bị có tiến độ khác nhau thì app **gộp** lại chứ không ghi đè: với mỗi ngày, số lớn hơn thắng, nên không mất dữ liệu.

## Cài để dùng với Claude Code

Có hai nửa: app (nơi lưu và ôn) và MCP server cùng skill (nơi agent lưu thẻ vào app).

**Bước 1: dùng app.** Mở [english-notebook.tiennhm.io.vn](https://english-notebook.tiennhm.io.vn), đăng nhập Google nếu muốn đồng bộ. Không đăng nhập thì dữ liệu chỉ nằm trong trình duyệt, và bạn sao lưu bằng nút **Xuất JSON** trong Thư viện.

**Bước 2: lấy token cho agent.** Vào **Profile → 🤖 Kết nối AI agent → Tạo token**. Token chỉ hiện **một lần**, hãy chép ngay. Mất hoặc lộ thì thu hồi ở cùng màn hình rồi tạo cái mới.

**Bước 3: cài MCP server và skill.** Cần Node.js 18 trở lên:

```bash
npx github:TienNHM/english-notebook-mcp --token enb_YOUR_TOKEN --always-on
```

Lệnh này thêm MCP server `english-notebook` vào Claude Code, cài skill `english-coach` vào `~/.claude/skills`, và với `--always-on` thì thêm một quy tắc ngắn vào `~/.claude/CLAUDE.md` để coach chạy trên mọi câu trả lời. Khởi động lại Claude Code sau đó. Muốn gỡ thì chạy `npx github:TienNHM/english-notebook-mcp uninstall --agent all`; lệnh này gỡ MCP server và quy tắc always-on, còn thư mục skill `~/.claude/skills/english-coach` được giữ lại, bạn tự xoá nếu muốn.

Dùng Cursor thì thêm `--agent cursor` (hoặc `all`). Dùng Claude Code dạng plugin cũng được: `claude plugin marketplace add TienNHM/english-notebook-mcp`, rồi `claude plugin install english-notebook@tiennhm`. Chi tiết nằm ở [README của MCP server](https://github.com/TienNHM/english-notebook-mcp).

Để thử: nhắn `lưu từ rollback (quay lại bản cũ)` và xem từ đó có hiện trong app không.

## Phía sau: ba mảnh ghép nhỏ

| Mảnh | Việc của nó |
|---|---|
| **PWA** | Giao diện, ôn Leitner, streak, chạy offline. Lưu cục bộ hoặc trên Firestore của bạn. |
| **Worker (Cloudflare)** | Cấp và quản lý token cá nhân, nhận câu từ agent và ghi vào tài khoản của bạn. |
| **MCP server và skill** | Cho agent ba công cụ `add_sentence`, `add_vocabulary`, `list_inbox`, và dặn agent khi nào coach, khi nào lưu. |

Thiết kế token qua Worker để bạn **không phải giữ khoá Firebase** trên máy: agent chỉ cầm một token `enb_...` có thể thu hồi bất cứ lúc nào. Mỗi người tối đa 5 token, nội dung trùng thì bị bỏ qua, và mỗi người có một giới hạn số thẻ mới mỗi ngày (mặc định 200).

## Những điều cần cẩn thận

- **Câu bạn lưu đi qua máy chủ.** Nếu dùng bản tôi đang chạy, những câu agent lưu đi qua Worker của tôi rồi vào Firestore gắn với tài khoản của bạn. Đừng để agent lưu thông tin nhạy cảm của công ty. Muốn tự chủ hoàn toàn, bạn có thể tự triển khai Worker và Firebase theo hướng dẫn trong repo.
- **Cùng một tài khoản trên mọi thiết bị.** Đồng bộ đi theo tài khoản đăng nhập. Nếu điện thoại không thấy dữ liệu của máy tính, hãy kiểm tra tên tài khoản ở góc trên bên phải trên cả hai máy, và xem điện thoại có đang ở chế độ chưa đăng nhập không.
- **`--always-on` sửa file cấu hình toàn cục.** Nó thêm quy tắc vào `~/.claude/CLAUDE.md`, nghĩa là coach chạy trong **mọi** dự án và mọi phiên. Nếu không muốn vậy, bỏ cờ này và gọi skill khi cần.
- **Leitner là thuật toán đơn giản.** Khoảng cách cố định theo hộp, không phải các thuật toán lập lịch tinh vi hơn. Đủ dùng cho tôi, nhưng tôi không nói nó tối ưu.
- **Tiếng Anh đơn giản trong câu trả lời là cố ý.** Nó dễ đọc, nhưng nếu bạn đã giỏi thì có thể thấy chậm.
- **Dự án cá nhân, còn trẻ.** Giao diện và cấu trúc dữ liệu có thể đổi. Footer app hiện số phiên bản và có nút **Kiểm tra cập nhật**: khi có bản mới, một thanh nhỏ hiện lên để bạn tải lại.

### English Notebook là gì?

Là một PWA mã nguồn mở viết bằng HTML, CSS và JavaScript thuần để lưu từ, cụm từ và câu tiếng Anh cùng nghĩa tiếng Việt, rồi ôn bằng thẻ Leitner. Nó có thể kết nối với AI agent như Claude Code để tự lưu câu bạn hỏi lúc làm việc.

### Có dùng được khi không có mạng không?

Có. Sau khi cài lên điện thoại, app mở được offline; thẻ bạn thêm hoặc ôn lúc offline được lưu trên máy và đồng bộ khi có mạng lại. Riêng việc tạo token, chia sẻ kho từ và agent lưu thẻ thì cần có mạng.

### Cần đăng nhập không?

Không bắt buộc. Không đăng nhập thì dữ liệu nằm trong trình duyệt của bạn và bạn sao lưu bằng nút Xuất JSON. Đăng nhập Google để đồng bộ giữa máy tính và điện thoại; khi đó thẻ và tiến độ nằm trong Firestore gắn với tài khoản của bạn.

### Skill English Coach làm gì với tin nhắn của tôi?

Với tin nhắn tiếng Anh, nó sửa tối đa ba lỗi và đưa câu tự nhiên hơn. Với tin nhắn tiếng Việt, nó đưa câu tiếng Anh tương ứng cùng vài cụm từ. Sau đó nó lưu một câu kèm 2 đến 3 cụm từ vào sổ. Gõ skip coach để bỏ qua cả việc sửa và việc lưu cho tin nhắn đó.

### Streak và băng cứu streak hoạt động ra sao?

Bạn đạt mục tiêu số thẻ mỗi ngày thì streak tăng một. Mỗi lần streak chạm một bội số của 7 ngày, bạn nhận một băng cứu streak, tối đa hai. Nếu lỡ một hoặc vài ngày và đủ băng, app dùng băng để nối streak lại. Thiếu băng thì streak về 0.

### Làm sao gỡ cài đặt phía Claude Code?

Chạy npx github:TienNHM/english-notebook-mcp uninstall --agent all. Lệnh này gỡ MCP server và quy tắc always-on trong CLAUDE.md, nhưng giữ lại thư mục skill ~/.claude/skills/english-coach nên bạn tự xoá nếu muốn. Token đã tạo thì thu hồi trong app ở Profile, mục Kết nối AI agent.

## Tham khảo

- [TienNHM/english-notebook](https://github.com/TienNHM/english-notebook) — mã nguồn app, README và hướng dẫn cài lên điện thoại
- [TienNHM/english-notebook-mcp](https://github.com/TienNHM/english-notebook-mcp) — MCP server và skill English Coach
- [Bản chạy thử](https://english-notebook.tiennhm.io.vn) — dùng thử không cần cài
