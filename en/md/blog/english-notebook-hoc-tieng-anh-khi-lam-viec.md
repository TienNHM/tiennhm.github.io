# English Notebook, app học từ vựng tiếng Anh khi đi làm

> Nguồn: https://tiennhm.io.vn/en/blog/english-notebook-hoc-tieng-anh-khi-lam-viec
> English Notebook là app học từ vựng tiếng Anh từ chính câu bạn gõ lúc đi làm: AI tự lưu vào sổ, tối ôn trên điện thoại, mất sóng vẫn dùng được.

> Mình hay nhờ AI giúp việc bằng tiếng Việt, và nhận ra những câu đó chính là thứ mình cần nói bằng tiếng Anh ở công ty. Nên mình làm **English Notebook**: mỗi khi mình nhắn tiếng Việt cho Claude Code, nó đưa lại câu tiếng Anh tự nhiên và **tự lưu vào sổ**. Tối đi metro về, mình mở điện thoại ôn lại bằng thẻ **Quên / Nhớ / Dễ**. App chạy được cả khi mất sóng, mã nguồn mở, ai cũng cài thử được.

Bài này kể lại chuyện mình làm app, cách nó chạy, và cách bạn cài nếu muốn thử. Nói trước cho khỏi hiểu lầm: đây là đồ chơi cá nhân mình dùng hằng ngày, chưa phải nghiên cứu khoa học. Mình chưa có con số nào chứng minh tiếng Anh của mình lên trình bao nhiêu, nên sẽ không hứa "giỏi tiếng Anh sau 30 ngày" đâu.

## Chuyện là thế này

Ai từng học từ vựng cũng biết cảm giác này: hôm nay thuộc 20 từ, tuần sau gặp lại, cả 20 đều quay lưng với mình. Mà những từ đó thường chẳng liên quan gì đến chuyện mình làm mỗi ngày.

Trong khi đó, cả ngày mình nói chuyện với AI. Toàn kiểu: "giúp tôi xem tại sao API trả lỗi 500", "check lại đoạn deploy này giùm". Đó đều là những câu **mình thật sự sẽ cần nói** trong họp, trong Slack, trong code review. Và mình cứ gõ chúng bằng tiếng Việt rồi... để chúng trôi đi.

Phí quá. Thế là mình đặt ra ba yêu cầu cho một cái app lý tưởng:

1. Đang làm việc thì **không phải dừng lại** mở từ điển hay một app khác.
2. Câu nào đáng học thì **tự nằm vào sổ**, mình lười chép tay lắm.
3. Tối đi metro về, mở điện thoại ra là **ôn được ngay**, kể cả đoạn hầm mất sóng.

Không có app nào có sẵn cả ba, nên mình tự viết. Đó là English Notebook.

## Một ngày của mình với nó

![Màn hình ôn tập: mặt trước là câu tiếng Anh, mặt sau là nghĩa tiếng Việt và câu gốc, ba nút Quên, Nhớ, Dễ](./english-notebook-review.webp)

### Buổi làm: cứ nhắn tiếng Việt như bình thường

Mình nhắn: `giúp tôi xem tại sao api trả lỗi 500 khi gọi`. Claude Code vẫn đi xem log giúp mình, nhưng phía trên câu trả lời có thêm một khối nhỏ:

```text
🇬🇧 In English: "Can you help me find out why the API returns a 500 error when I call it?"

🔑 Key words:
• find out why = tìm ra lý do
• returns a 500 error = trả về lỗi 500
• when I call it = khi tôi gọi nó
```

Vậy là mình vừa biết cách nói câu đó bằng tiếng Anh, mất thêm đúng vài giây đọc. Phần còn lại của câu trả lời cũng viết bằng tiếng Anh đơn giản kèm tiếng Việt, nên mình đọc luôn cả tiếng Anh lẫn nghĩa.

Còn nếu mình gõ tiếng Anh thì nó sửa lỗi giúp (tối đa ba lỗi một lần, để mình không bị ngợp), và lờ đi lỗi chính tả hay quên viết hoa. Hôm nào cần yên tĩnh thì gõ `skip coach`, nó tắt coach cho đúng tin nhắn đó.

### Câu hay thì tự vào sổ

Xong việc chính, nó lưu **một câu** kèm 2–3 cụm từ rút ra từ câu đó. Câu tiếng Việt gốc của mình nằm ngay cạnh, và mỗi cụm từ thành một thẻ riêng nhưng vẫn dính với câu mẹ. Thẻ nào do agent lưu thì có nhãn `claude` cho dễ nhận. Mấy từ kỹ thuật như deploy, merge, PR thì nó được dặn là khỏi lưu, vì dân dev ai chẳng biết.

![Thư viện của app: các câu tiếng Anh kèm câu gốc tiếng Việt và các cụm từ đã tách ra, có tag work, api, review](./english-notebook-library.webp)

### Buổi tối: ôn trên metro

Đây là lúc mình lấy điện thoại ra thay vì lướt mạng xã hội (ít nhất là cố gắng như thế). Thẻ hiện mặt trước, mình tự nhớ thử, lật lên xem rồi bấm:

- **Quên**: không sao, app không phán xét. Thẻ về hộp 0 và gặp lại sau khoảng 10 phút.
- **Nhớ**: thẻ lên một hộp.
- **Dễ**: những lúc bạn thấy mình là thiên tài. Thẻ nhảy lên hai hộp.

Đằng sau là cách ôn **Leitner** kinh điển: sáu hộp (từ 0 đến 5), thẻ càng lên cao càng lâu mới gặp lại, theo các mốc 0, 1, 3, 7, 14 và 30 ngày. Thẻ nào dễ thì thưa dần, thẻ nào hay quên thì về gặp bạn thường xuyên.

Để có động lực mở app, mình thêm vài thứ vui vui:

- **Mục tiêu mỗi ngày**: chọn 5, 10, 15, 20 hoặc 30 thẻ.
- **Streak** 🔥: số ngày liền bạn đạt mục tiêu.
- **XP, cấp độ** và 35 huy hiệu để sưu tầm.
- **Băng cứu streak** 🧊: cứ mỗi lần streak chạm bội số của 7 ngày thì nhận một băng (tối đa hai). Lỡ quên một hôm, băng sẽ đỡ cho bạn. Coi như bảo hiểm streak.

![App trên điện thoại: danh sách thẻ, thanh tìm kiếm, các tag và thanh menu dưới cùng](./english-notebook-mobile.webp)

## Hầm metro mất sóng? Không sao

English Notebook là một **PWA**, tức là một trang web biết cư xử như app thật. Cài lên điện thoại xong, nó có biểu tượng riêng, mở toàn màn hình, nhấn giữ biểu tượng ra các lối tắt như **Ôn tập hôm nay**, và quan trọng nhất là **mở được khi không có mạng**. Cách cài mình hướng dẫn từng bước ở [phần Cài đặt](#cai-dat-tung-buoc) bên dưới.

Thẻ bạn ôn hay thêm lúc offline được lưu trên máy, có mạng lại thì tự đồng bộ. (Chỉ có tạo token, chia sẻ kho từ và việc agent lưu thẻ là cần mạng.)

Nếu bạn đăng nhập Google, dữ liệu đồng bộ giữa máy tính và điện thoại. Lỡ hai máy có tiến độ khác nhau thì app **gộp** lại chứ không ghi đè: mỗi ngày lấy số lớn hơn, nên không bị mất gì.

## Cài đặt từng bước
Có hai nửa: **app** (nơi lưu và ôn) và **MCP server cùng skill** (nơi Claude Code lưu thẻ vào app). Làm lần lượt từ trên xuống. Chỉ muốn dùng app thôi, không cần agent, thì làm Phần A bước 1 và Phần C là đủ.

### Cần chuẩn bị

- Một tài khoản **Google** (để đăng nhập và đồng bộ).
- **Node.js 18 trở lên** và **Claude Code** đã cài (chỉ cần cho Phần B). Kiểm tra Node bằng cách mở terminal và gõ:

```bash
node -v
```

Ra `v18.x.x` hoặc cao hơn là ổn. Báo lỗi "not found" thì cài Node.js từ [nodejs.org](https://nodejs.org) rồi thử lại.

### Phần A: Mở app và lấy token

Token giống như một chiếc chìa khoá nhỏ: Claude Code cầm nó để bỏ thẻ vào sổ **của bạn**, ngoài ra không đọc được gì khác.

**Bước 1. Mở app và đăng nhập Google.** Vào [english-notebook.tiennhm.io.vn](https://english-notebook.tiennhm.io.vn), chọn tab **Profile**, bấm nút **Google** ở khung Tài khoản.

![Bước 1: tab Profile, khung Tài khoản, bấm nút Google để đăng nhập](./install-1-dang-nhap.webp)

**Bước 2. Mở màn hình kết nối AI agent.** Vẫn ở tab Profile, kéo xuống khung **AI agent** và bấm **Kết nối AI agent**. (Chưa đăng nhập thì bấm vào chỉ thấy nút đăng nhập, nên nhớ làm bước 1 trước.)

![Bước 2: khung AI agent trong Profile, bấm Kết nối AI agent](./install-2-ket-noi-agent.webp)

**Bước 3. Đặt tên rồi bấm Tạo token.** Tên nào cũng được, miễn bạn nhớ nó là của máy nào, ví dụ `laptop công ty`.

![Bước 3: gõ tên token rồi bấm Tạo token](./install-3-tao-token.webp)

**Bước 4. Sao chép lệnh cài.** Token mới hiện ra kèm một dòng lệnh đã **điền sẵn token** cho bạn. Bấm **Sao chép lệnh cài**. Nhớ làm ngay lúc này: token chỉ hiện **một lần**, đóng hộp thoại là không xem lại được (mất thì thu hồi rồi tạo cái mới, không sao cả).

![Bước 4: bấm Sao chép lệnh cài. Token trong ảnh là giá trị giả, chỉ để minh họa](./install-4-sao-chep-lenh.webp)

### Phần B: Cài cho Claude Code

**Bước 5. Dán lệnh vào terminal.** Mở terminal, dán lệnh vừa sao chép rồi nhấn Enter. Lệnh có dạng này (token của bạn nằm ở chỗ `enb_YOUR_TOKEN`):

```bash
npx github:TienNHM/english-notebook-mcp --token enb_YOUR_TOKEN --always-on
```

Chạy thành công, bạn sẽ thấy ba dấu ✓ như ảnh dưới. Lần đầu npm có thể nhắn "package not found and will be installed", cứ để nó cài.

![Bước 5: kết quả khi chạy lệnh cài thành công](./install-5-terminal.webp)

Lệnh vừa làm ba việc: thêm MCP server `english-notebook` vào Claude Code, cài skill `english-coach` vào `~/.claude/skills`, và (nhờ `--always-on`) ghi một quy tắc ngắn vào `~/.claude/CLAUDE.md` để coach chạy trên mọi câu trả lời.

**Bước 6. Khởi động lại Claude Code và thử.** Thoát hẳn Claude Code rồi mở lại (MCP server chỉ được nạp lúc khởi động). Sau đó nhắn thử:

```text
lưu từ rollback (quay lại bản cũ)
```

Mở app, vào tab **Thư viện**: nếu thấy từ `rollback` với nhãn `claude` thì đã nối thành công. 🎉

Một vài lựa chọn khác:

- **Dùng Cursor:** thêm `--agent cursor` (hoặc `--agent all` để cài cả hai) vào cuối lệnh.
- **Không muốn sửa `CLAUDE.md`:** bỏ cờ `--always-on`, rồi gọi skill khi cần.
- **Thích cài kiểu plugin:** chạy `claude plugin marketplace add TienNHM/english-notebook-mcp`, rồi `claude plugin install english-notebook@tiennhm`. Khi Claude Code hỏi token thì dán token vào. Chi tiết ở [README của MCP server](https://github.com/TienNHM/english-notebook-mcp).
- **Muốn gỡ:** chạy `npx github:TienNHM/english-notebook-mcp uninstall --agent all`. Lệnh này gỡ MCP server và quy tắc always-on; thư mục skill `~/.claude/skills/english-coach` được giữ lại, bạn tự xoá nếu muốn.

### Phần C: Cài app lên điện thoại

Làm trên chính điện thoại của bạn. Mở [english-notebook.tiennhm.io.vn](https://english-notebook.tiennhm.io.vn), và **đăng nhập đúng tài khoản Google** ở Phần A để thấy cùng dữ liệu với máy tính.

**Android (Chrome, Edge):**

1. Vào tab **Profile**.
2. Tìm khung **Cài app** và bấm nút **📲 Cài app**, rồi xác nhận.
3. Không thấy nút? Mở menu trình duyệt (dấu ⋮) và chọn **Install app** (hoặc **Add to Home screen**).

![Android: khung Cài app trong Profile, bấm nút Cài app](./install-android.webp)

**iPhone, iPad (bắt buộc dùng Safari):** Safari không có hộp thoại cài tự động nên phải làm tay ba bước. App có sẵn hướng dẫn: vào **Profile** và bấm **📲 Cài app** là hiện ra đúng hộp thoại dưới đây.

![iPhone: ba bước Mở bằng Safari, bấm nút Chia sẻ, chọn Thêm vào Màn hình chính](./install-iphone.webp)

Cài xong, mở app từ biểu tượng trên màn hình chính. Từ giờ nó chạy toàn màn hình và mở được cả khi mất sóng.

### Gặp lỗi? Thử mấy cách này

- **Gõ `npx` báo không tìm thấy lệnh:** máy chưa cài Node.js (hoặc chưa mở lại terminal sau khi cài). Cài Node.js rồi mở terminal mới.
- **Làm Phần B xong mà Claude Code không coach:** chắc chắn bạn đã thoát hẳn rồi mở lại Claude Code. Muốn kiểm tra thì chạy `claude mcp list`, trong danh sách phải có `english-notebook`.
- **Lỡ đóng hộp thoại mà chưa sao chép token:** vào lại **Kết nối AI agent**, bấm **Thu hồi** ở token cũ rồi tạo token mới. Mỗi người tối đa 5 token.
- **Điện thoại không thấy dữ liệu của máy tính:** nhìn tên tài khoản ở khung Tài khoản trong Profile trên cả hai máy, phải là cùng một tài khoản. Điện thoại còn hiện nút Google (chưa đăng nhập) thì cũng sẽ không đồng bộ.

## Hậu trường cho dân kỹ thuật

Nghe thì có vẻ nhiều thứ, nhưng thật ra chỉ có ba mảnh ghép:

| Mảnh | Việc của nó |
|---|---|
| **PWA** | Giao diện, ôn Leitner, streak, chạy offline. Lưu cục bộ hoặc trên Firestore của bạn. |
| **Worker (Cloudflare)** | Cấp và quản lý token cá nhân, nhận câu từ agent rồi ghi vào tài khoản của bạn. |
| **MCP server và skill** | Cho agent ba công cụ `add_sentence`, `add_vocabulary`, `list_inbox`, và dặn agent khi nào nên coach, khi nào nên lưu. |

Mình cho token đi qua Worker để bạn **không phải giữ khoá Firebase** trên máy: agent chỉ cầm một token `enb_...`, thu hồi lúc nào cũng được. Mỗi người tối đa 5 token, nội dung trùng thì bị bỏ qua, và có giới hạn số thẻ mới mỗi ngày (mặc định 200).

## Nói trước cho đỡ buồn

- **Câu bạn lưu đi qua máy chủ.** Nếu dùng bản mình đang chạy, câu agent lưu đi qua Worker của mình rồi vào Firestore gắn với tài khoản của bạn. Đừng bảo agent lưu thông tin nhạy cảm của công ty. Muốn tự chủ hoàn toàn thì tự dựng Worker và Firebase theo hướng dẫn trong repo.
- **Dùng cùng một tài khoản trên mọi thiết bị.** Đồng bộ đi theo tài khoản đăng nhập. Nếu điện thoại không thấy dữ liệu của máy tính, hãy nhìn tên tài khoản ở góc trên bên phải trên cả hai máy, và kiểm tra xem điện thoại có đang ở chế độ chưa đăng nhập không.
- **`--always-on` sửa file cấu hình toàn cục.** Nó thêm quy tắc vào `~/.claude/CLAUDE.md`, nghĩa là coach chạy trong **mọi** dự án và mọi phiên. Không thích vậy thì bỏ cờ này và gọi skill khi cần.
- **Leitner là cách ôn đơn giản.** Khoảng cách cố định theo hộp, không phải thuật toán lập lịch cao siêu. Đủ dùng cho mình, nhưng mình không dám nói nó tối ưu.
- **Còn trẻ.** Dự án cá nhân nên giao diện và cấu trúc dữ liệu có thể đổi. Cuối trang app có số phiên bản và nút **Kiểm tra cập nhật**: có bản mới thì một thanh nhỏ hiện lên để bạn tải lại.

### Học tiếng Anh khi đi làm bằng cách nào mà không tốn thêm thời gian?

Một cách là học từ chính những câu bạn đã phải gõ lúc làm việc. Với English Notebook, mỗi câu bạn nhờ AI bằng tiếng Việt được đổi thành câu tiếng Anh kèm vài cụm từ và tự lưu vào sổ. Lúc rảnh, như trên đường về, bạn mở điện thoại ôn lại bằng thẻ Leitner.

### English Notebook là gì?

Là một PWA mã nguồn mở viết bằng HTML, CSS và JavaScript thuần để lưu từ, cụm từ và câu tiếng Anh cùng nghĩa tiếng Việt, rồi ôn bằng thẻ Leitner. Nó có thể kết nối với AI agent như Claude Code để tự lưu câu bạn hỏi lúc làm việc.

### Mình không dùng Claude Code thì có xài được không?

Được. Bạn có thể thêm từ, cụm từ và câu bằng tay trong app (nút Thêm từ hoặc câu mới trong Thư viện) rồi ôn bình thường. Phần agent chỉ là để tiết kiệm công chép. Ngoài Claude Code, repo MCP cũng có hướng dẫn cho Cursor và một số agent khác.

### Có dùng được khi không có mạng không?

Có. Sau khi cài lên điện thoại, app mở được offline; thẻ bạn thêm hoặc ôn lúc offline được lưu trên máy và đồng bộ khi có mạng lại. Riêng việc tạo token, chia sẻ kho từ và agent lưu thẻ thì cần có mạng.

### Có cần đăng nhập không?

Không bắt buộc. Không đăng nhập thì dữ liệu nằm trong trình duyệt của bạn và bạn sao lưu bằng nút Xuất JSON. Đăng nhập Google để đồng bộ giữa máy tính và điện thoại; khi đó thẻ và tiến độ nằm trong Firestore gắn với tài khoản của bạn.

### Skill English Coach làm gì với tin nhắn của tôi?

Với tin nhắn tiếng Anh, nó sửa tối đa ba lỗi và đưa câu tự nhiên hơn. Với tin nhắn tiếng Việt, nó đưa câu tiếng Anh tương ứng cùng vài cụm từ. Sau đó nó lưu một câu kèm 2 đến 3 cụm từ vào sổ. Gõ skip coach để bỏ qua cả việc sửa và việc lưu cho tin nhắn đó.

### Streak và băng cứu streak hoạt động ra sao?

Bạn đạt mục tiêu số thẻ mỗi ngày thì streak tăng một. Mỗi lần streak chạm một bội số của 7 ngày, bạn nhận một băng cứu streak, tối đa hai. Nếu lỡ một hoặc vài ngày và đủ băng, app dùng băng để nối streak lại. Thiếu băng thì streak về 0.

### Làm sao gỡ cài đặt phía Claude Code?

Chạy npx github:TienNHM/english-notebook-mcp uninstall --agent all. Lệnh này gỡ MCP server và quy tắc always-on trong CLAUDE.md, nhưng giữ lại thư mục skill ~/.claude/skills/english-coach nên bạn tự xoá nếu muốn. Token đã tạo thì thu hồi trong app ở Profile, mục Kết nối AI agent.

## Tham khảo

- [TienNHM/english-notebook](https://github.com/TienNHM/english-notebook): mã nguồn app, README và hướng dẫn cài lên điện thoại
- [TienNHM/english-notebook-mcp](https://github.com/TienNHM/english-notebook-mcp): MCP server và skill English Coach
- [Bản chạy thử](https://english-notebook.tiennhm.io.vn): dùng thử không cần cài
