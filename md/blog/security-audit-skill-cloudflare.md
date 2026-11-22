# security-audit-skill của Cloudflare: cho coding agent đi săn lỗ hổng mà không tự lừa mình

> Nguồn: https://tiennhm.io.vn/blog/security-audit-skill-cloudflare
> security-audit-skill là skill mã nguồn mở của Cloudflare biến coding agent thành người kiểm tra bảo mật: sáu giai đoạn, agent kiểm chứng độc lập, kết quả dạng JSON có schema. Bài này kể lại một lần tôi dùng nó trên một dự án WinForms cũ, những gì nó tìm ra, cách sửa, rồi giới thiệu cách skill hoạt động và cách cài.

> **security-audit-skill** là một skill mã nguồn mở (MIT) của Cloudflare dành cho coding agent như Claude Code. Skill chia việc kiểm tra bảo mật thành sáu giai đoạn: dựng bản đồ hệ thống, săn lỗi theo một sổ theo dõi độ phủ (coverage ledger), rồi giao từng nghi vấn cho một agent khác cố bác bỏ nó. Kết quả cuối cùng là file `findings.json` có schema, chia làm ba loại `confirmed`, `needs_validation` và `rejected`. Điều tôi thích nhất là nó **không cho agent khẳng định khi chưa đủ bằng chứng**: lỗi chỉ được coi là thật khi chỉ ra được ai vượt qua ranh giới tin cậy nào và gây ra hậu quả cụ thể gì.

Bài bắt đầu bằng một lần dùng thật: tôi chạy skill trên một đồ án WinForms cũ của mình, nó tìm ra lỗi gì, rồi tôi sửa ra sao. Sau đó mới đến phần giới thiệu skill, dựa trên [README của repo](https://github.com/cloudflare/security-audit-skill) và nội dung file `SKILL.md`. Tôi mới dùng **chế độ hướng dẫn** (guidance mode) một lần, chưa chạy **full audit** đủ sáu giai đoạn, nên phần nói về full audit là theo tài liệu chứ chưa phải trải nghiệm của tôi.

## Câu chuyện: soi lại đồ án quản lý ký túc xá

[QLKTX](https://github.com/tiennhm-edu/QLKTX-ADO.NET) là đồ án môn học của tôi: một ứng dụng WinForms C# dùng ADO.NET, có đăng nhập, quản lý sinh viên, nhân viên, phòng, hóa đơn và báo cáo. Code nhỏ, khoảng 200 file, viết từ thời sinh viên. Tôi muốn xem một agent có skill bảo mật sẽ nhìn nó thế nào.

### Agent hỏi trước khi làm

Tôi chỉ gõ `/security-audit`, không nói thêm gì. Agent không lao vào chạy ngay. Nó lướt qua cấu trúc repo rồi hỏi tôi muốn kiểu nào:

- **Focused review**: đọc những phần quan trọng nhất (câu SQL, đăng nhập, mật khẩu, chuỗi kết nối, phân quyền) rồi báo kết quả ngay trong chat. Không tạo file.
- **Full audit**: chạy đủ sáu giai đoạn với nhiều agent, ghi báo cáo ra một thư mục **bên ngoài** repo. Chậm hơn và tốn nhiều token hơn hẳn.

Câu hỏi này đến từ chính `SKILL.md`: skill mặc định ở chế độ hướng dẫn, và chỉ chạy full audit khi người dùng yêu cầu rõ. Với một app cỡ này, agent đề xuất focused review và tôi đồng ý.

### Kết quả: không có SQL injection, nhưng phân quyền thì thủng

Điều đầu tiên agent ghi nhận lại là một tin tốt: **mọi câu SQL đều dùng tham số**. Những chỗ ghép chuỗi kiểu `$"SELECT * FROM {strTableName}"` chỉ lấy tên bảng từ `enum` chứ không lấy từ ô nhập liệu, nên không phải SQL injection. Nếu chỉ grep theo mẫu, rất dễ báo nhầm chỗ này.

Rồi đến những lỗi thật:

**1. Nhân viên tự nâng mình lên admin (High).** Ứng dụng coi một người là admin khi cột `MaNQL` (mã người quản lý) của họ để trống. Quyền chỉ được chặn ở giao diện: form chính tắt hai ô "DS Nhân viên" và "Báo cáo" với nhân viên. Nhưng ô **Tìm kiếm** vẫn mở. Từ đó chọn Nhân viên, nhấp đúp vào một dòng, bấm Sửa rồi Lưu là sửa được lương và `MaNQL` của bất kỳ ai. Xóa trống `MaNQL` của chính mình thì lần đăng nhập sau thành admin.

Agent trình bày lỗi này đúng theo khung mà skill yêu cầu: **ai** (nhân viên đã đăng nhập), **làm gì** (sửa bản ghi nhân viên qua form tìm kiếm), **vượt qua kiểm soát nào** (ranh giới admin/nhân viên), **hậu quả** (đổi lương người khác, chiếm quyền admin). Kèm theo là đường dẫn file và số dòng cụ thể cho từng bước.

**2. Mật khẩu lưu dạng chữ thường (Medium).** Câu đăng nhập là `WHERE TenDN = @TenDN AND MatKhau = @MatKhau`. Ai đọc được CSDL hay bản sao lưu là đọc được mọi mật khẩu.

**3. File backup CSDL bị commit lên Git (Medium nếu dữ liệu là thật).** Repo có file `QUANLYKTX.bak`, trong đó có bảng đăng nhập. Agent xác nhận bảng có trong file nhưng không in giá trị nào ra.

**Cần kiểm chứng thêm:** ứng dụng kết nối bằng `Integrated Security=True`, tức mỗi người dùng Windows nói chuyện thẳng với SQL Server bằng danh tính của họ. Nếu tài khoản nhân viên có quyền đọc/ghi trên CSDL thì họ có thể bỏ qua ứng dụng hoàn toàn (ví dụ dùng SSMS). Nhưng quyền đó nằm ở cấu hình SQL Server chứ không nằm trong mã nguồn. Vì vậy agent **không gán mức độ nghiêm trọng**, chỉ ghi là "cần kiểm tra" kèm đúng sự thật còn thiếu. Đây chính là loại `needs_validation` của skill.

### Sửa lỗi

Skill chỉ mô tả cách sửa chứ không tự sửa code. Phần sửa tôi làm tiếp trong cùng phiên, cũng với agent:

- **Phân quyền:** thêm một lớp `Session` chỉ được gán khi đăng nhập. Tầng nghiệp vụ (`BS_layer`) tự kiểm tra lại quyền: chỉ admin được thêm, xóa hay sửa hồ sơ người khác; nhân viên chỉ được sửa thông tin liên hệ của chính mình, đổi lương hay `MaNQL` là bị từ chối. Form chỉ khóa nút cho tiện, quyết định nằm ở tầng dưới.
- **Một lỗi phụ lòi ra khi sửa:** cả form lẫn phần đăng nhập đều tìm nhân viên bằng `LIKE '%NV1%'`. Câu này có thể trả về `NV10` trước `NV1`, tức có thể lấy nhầm `MaNQL` và tính sai quyền. Tôi đổi sang so khớp chính xác.
- **Mật khẩu:** băm bằng PBKDF2-HMAC-SHA256, salt ngẫu nhiên 16 byte, 600.000 vòng, so sánh thời gian hằng. Có một chi tiết thú vị: trên .NET Framework 4.6.1, `Rfc2898DeriveBytes` chỉ hỗ trợ SHA-1 và mất **5,8 giây** cho 600.000 vòng. Gọi thẳng PBKDF2 của Windows CNG (`bcrypt.dll`) qua P/Invoke thì chỉ khoảng **125 ms**, lại dùng được SHA-256. Mã băm được kiểm tra với hai bộ test vector chuẩn trong RFC 7914.
- **Không bắt mọi người đổi mật khẩu:** mật khẩu cũ dạng chữ thường vẫn đăng nhập được. Sau lần đăng nhập thành công đầu tiên, mật khẩu đó được tự đổi sang dạng băm. Cột `MatKhau` cũ chỉ có `VARCHAR(50)`, trong khi chuỗi băm dài 91 ký tự, nên cần một script migration để nới cột.

Hai lỗi được ghi thành issue, sửa trong [một PR](https://github.com/tiennhm-edu/QLKTX-ADO.NET/pull/4), và README có thêm mục hướng dẫn chạy migration trước khi triển khai.

> **Ghi chú của tác giả:** phần băm mật khẩu đã được test riêng, nhưng toàn bộ luồng đăng nhập và phân quyền **chưa** được chạy với một CSDL thật lúc viết bài. Agent cũng nói rõ điều này thay vì báo "xong".

## security-audit-skill là gì

Theo README, đây là skill "biến agent của bạn thành người kiểm tra bảo mật". Nó cũng là điểm khởi đầu của hệ thống săn lỗ hổng nội bộ mà Cloudflare kể trong bài [Build your own vulnerability harness](https://blog.cloudflare.com/build-your-own-vulnerability-harness). Hệ thống đó sau này chạy trên toàn bộ các repo của họ; skill này là phiên bản cho một repo.

Một skill thực chất là một bộ file Markdown hướng dẫn mà agent nạp vào khi gặp đúng loại việc. Bộ này gồm:

- `SKILL.md` chứa nguyên tắc chung và quy trình tổng quát.
- Mỗi giai đoạn có file riêng: `RECONNAISSANCE.md`, `HUNTING.md`, `VALIDATION-AND-REPORTING.md`.
- Hơn chục file "companion" theo từng lĩnh vực: web và xác thực, phía client, chuỗi cung ứng và CI, cloud, giao thức RPC và hàng đợi, cô lập dữ liệu giữa tenant, ứng dụng desktop/mobile, AI và LLM, an toàn bộ nhớ…
- `report-schema.json` cùng hai script Node.js không phụ thuộc thư viện ngoài để kiểm tra `findings.json` và `coverage-ledger.json`.

## Sáu giai đoạn của full audit

```text
1. Reconnaissance        → architecture.md, coverage-ledger.json
2. Coverage-led hunting  → các hunter độc lập, mỗi người một phần của ledger
3. Candidate validation  → mỗi nghi vấn giao cho một verifier mới, cố bác bỏ nó
4. Structured output     → findings.json, kiểm tra bằng schema + validator
5. Record verification   → agent mới kiểm lại từng kết luận cuối cùng
6. Reporting             → REPORT.md, FINDINGS-DETAIL.md, NEEDS-VALIDATION.md
```

Vài điểm đáng chú ý trong cách thiết kế:

- **Coverage ledger.** Trước khi săn lỗi, agent chia hệ thống thành các "đơn vị phủ" (bề mặt tấn công × ranh giới tin cậy × loại tấn công) và ghi trạng thái từng đơn vị. Nhờ vậy "đã kiểm tra hết" trở thành thứ đếm được, chứ không phải cảm giác. Một lần chạy giới hạn phạm vi hay chạy nhanh (`quick`) phải tự nhận là **phủ một phần**.
- **Người tìm không được tự kiểm.** Agent kiểm chứng một nghi vấn không bao giờ là agent đã tìm ra nó. Verifier được giao nhiệm vụ cố **bác bỏ** chứ không phải xác nhận.
- **Chạy nhiều lần thì cộng dồn.** Lần sau đọc ledger và findings của lần trước, nhắm vào chỗ còn trống, và kiểm lại phần code đã thay đổi. README ghi rằng trong các lần chạy thử của họ, một lần chạy chỉ tìm được khoảng **một nửa** số lỗ hổng mà nhiều lần chạy cộng lại tìm ra.
- **Có hồ sơ chi phí.** Ba mức `quick`, `standard`, `deep` thay đổi độ rộng và độ lặp lại. Bạn cũng có thể đặt ngân sách bằng số lần gọi agent. Mức nào thì ngưỡng bằng chứng cũng giữ nguyên.

## Ba loại kết luận

Đây là phần làm skill khác với kiểu "hỏi AI xem code có lỗi gì không":

| Kết luận | Ý nghĩa | Có mức độ nghiêm trọng? |
|---|---|---|
| `confirmed` | Có dấu vết đầy đủ trong mã nguồn và một kết quả quan sát được, có giới hạn | Có |
| `needs_validation` | Giả thuyết có căn cứ trong code nhưng còn thiếu **một sự thật cụ thể** nằm ngoài code (cấu hình proxy, quyền IAM, thiết lập SQL Server…) | **Không** |
| `rejected` | Nghi vấn đã bị bác bỏ, được ghi lại để lần sau không báo lại | Không |

Mức độ nghiêm trọng cũng có thang neo rõ ràng. Ví dụ, `high` là khi kẻ tấn công **vô hiệu hoàn toàn** một kiểm soát bảo mật và gây hậu quả thật: vượt xác thực, đọc/ghi chéo tenant, thực thi mã sau khi đăng nhập… Nếu chỉ **làm yếu** kiểm soát đó thì là `medium`. Có một câu trong `SKILL.md` tôi thấy rất đáng nhớ: nếu không nói được thiệt hại cụ thể là gì, thì mức độ thật thấp hơn bạn đang cảm thấy.

Skill cũng liệt kê các "anti-pattern" phải tránh: báo lệch checklist như thể là lỗ hổng, coi việc thiếu một lớp phòng thủ dự phòng là lỗi khi lớp chính đã chặn được, đoán cấu hình triển khai không có trong repo, gán severity cho `needs_validation`, viết báo cáo trước khi kiểm chứng độc lập…

## An toàn khi chạy

Skill rất chặt về chuyện chạy code của chính dự án đang bị kiểm tra. Build, test, chạy tiến trình hay fuzz chỉ được phép trong một sandbox do hệ điều hành cưỡng chế, có đủ các điều kiện sau:

- không có mạng ra ngoài,
- biến môi trường rỗng rồi chỉ thêm những gì cho phép,
- target và toolchain ở chế độ chỉ đọc, chỉ được ghi vào thư mục `scratch/`,
- giới hạn CPU, bộ nhớ, số tiến trình, dung lượng và thời gian.

Thiếu bất kỳ điều kiện nào thì **không chạy**, và nghi vấn giữ ở trạng thái `needs_validation` kèm kế hoạch kiểm chứng an toàn. Skill cũng cấm thăm dò endpoint đang chạy thật, dịch vụ bên ngoài hay dữ liệu của người dùng khác.

Trong lần dùng của tôi, agent chỉ đọc mã nguồn. Nó không chạy ứng dụng hay động vào SQL Server, vì những việc đó không đáp ứng được điều kiện trên.

## Cài đặt và cách dùng

Cài bằng [Skills CLI](https://skills.sh):

```bash
npx skills add https://github.com/cloudflare/security-audit-skill --skill security-audit
```

Thêm `--global` để cài ở cấp người dùng (dùng cho mọi dự án). Sau đó mở agent trong repo cần kiểm tra và yêu cầu bằng lời bình thường:

```text
security audit this codebase
find security vulnerabilities in ./src
do a security review, output to ~/audits/my-project
```

Yêu cầu kiểu "audit cả codebase" hay "pen-test" sẽ chạy full audit. Câu hỏi bảo mật hay review tập trung thì dùng chế độ hướng dẫn, trừ khi bạn yêu cầu báo cáo dạng file. Nếu không chỉ định, thư mục đầu ra mặc định là `~/security-audit-skill/<tên-repo>/run-`, nằm ngoài repo. Skill chỉ ghi vào trong repo khi bạn chọn một thư mục đã được Git bỏ qua.

**Yêu cầu:** model hỗ trợ tool use và chạy sub-agent song song, có Node.js cho hai validator, và một sandbox như mô tả ở trên nếu muốn chạy code của target.

## Nhận xét

**Điều tôi thích:**

- **Hỏi trước khi làm việc tốn kém.** Một câu hỏi ngắn đã tiết kiệm cả đống token cho một đồ án nhỏ.
- **Không báo nhầm cho có.** Tìm ra "không có SQL injection" và giải thích tại sao các chỗ ghép chuỗi là an toàn cũng có giá trị ngang việc tìm ra lỗi.
- **Biết mình không biết gì.** Mục Integrated Security được để là `needs_validation` thay vì bị thổi thành lỗi nghiêm trọng hay bị bỏ qua.
- **Khung báo lỗi buộc phải cụ thể.** Ai, làm gì, vượt ranh giới nào, hậu quả ra sao. Lỗi phân quyền trong QLKTX đọc lên là hiểu ngay và tái hiện được.

**Cần lưu ý:**

- **Focused review không phải là audit đầy đủ.** Tôi chỉ dùng chế độ hướng dẫn, nên không có ledger, không có verifier độc lập, và không có lời khẳng định nào về độ phủ. Đừng coi kết quả kiểu này là "đã kiểm tra xong".
- **Full audit tốn kém.** Nhiều agent chạy song song qua sáu giai đoạn đồng nghĩa với rất nhiều token. Nên bắt đầu với `quick` hoặc giới hạn phạm vi, rồi chạy lại nhiều lần thay vì kỳ vọng một lần là đủ.
- **Sandbox là việc của bạn.** Không có sandbox đạt yêu cầu thì skill chỉ dừng ở phân tích mã nguồn. Với những lỗi cần chạy mới thấy, bạn sẽ nhận về `needs_validation` khá nhiều.
- **Skill không sửa code.** Nó mô tả cách sửa nhỏ nhất ở đúng chỗ ra quyết định cuối cùng, còn việc sửa và kiểm thử vẫn là của bạn (hoặc của agent trong một bước khác, như tôi đã làm).

### security-audit-skill là gì?

Là một skill mã nguồn mở (giấy phép MIT) của Cloudflare cho coding agent như Claude Code. Nó hướng dẫn agent kiểm tra bảo mật một codebase qua sáu giai đoạn: dựng bản đồ hệ thống, săn lỗi theo sổ theo dõi độ phủ, kiểm chứng từng nghi vấn bằng agent độc lập, xuất findings.json có schema, kiểm lại kết luận và viết báo cáo.

### Cài security-audit-skill như thế nào?

Dùng Skills CLI: npx skills add https://github.com/cloudflare/security-audit-skill --skill security-audit. Thêm --global để cài cho mọi dự án. Sau đó mở agent trong repo và yêu cầu, ví dụ: security audit this codebase.

### Chế độ hướng dẫn và full audit khác nhau thế nào?

Chế độ hướng dẫn là mặc định, dùng cho câu hỏi bảo mật hoặc review tập trung: agent chỉ dùng phần liên quan của skill và trả lời trong chat, không tạo file. Full audit chỉ chạy khi bạn yêu cầu rõ (audit cả codebase, pen-test, cần báo cáo dạng file): agent chạy đủ sáu giai đoạn với nhiều sub-agent và ghi báo cáo ra một thư mục ngoài repo.

### needs_validation nghĩa là gì?

Là một nghi vấn có căn cứ trong mã nguồn nhưng còn thiếu một sự thật cụ thể nằm ngoài code, ví dụ cấu hình proxy, quyền IAM hay quyền trên SQL Server. Loại này không được gán mức độ nghiêm trọng, và đi kèm kế hoạch kiểm chứng an toàn.

### Một lần chạy có đủ không?

Không. Theo README, trong các lần chạy thử của Cloudflare, một lần chạy chỉ tìm được khoảng một nửa số lỗ hổng mà nhiều lần chạy cộng lại tìm ra. Skill được thiết kế để các lần chạy cộng dồn, dùng ledger và findings của lần trước để nhắm vào chỗ còn trống.

## Tham khảo

- [cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill): mã nguồn, README và các file của skill
- [Build your own vulnerability harness](https://blog.cloudflare.com/build-your-own-vulnerability-harness): bài của Cloudflare về hệ thống phát triển từ skill này
- [Skills CLI](https://skills.sh): công cụ cài skill cho coding agent
- [QLKTX-ADO.NET PR #4](https://github.com/tiennhm-edu/QLKTX-ADO.NET/pull/4): bản sửa hai lỗi được kể trong bài
