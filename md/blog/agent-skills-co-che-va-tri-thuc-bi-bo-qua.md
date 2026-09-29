# Cài skill rồi code tiếp: cơ chế đằng sau và phần tri thức bị bỏ lại

> Nguồn: https://tiennhm.io.vn/blog/agent-skills-co-che-va-tri-thuc-bi-bo-qua
> Một skill cho AI agent không phải plugin và cũng không phải code chạy được — nó là văn bản được nạp vào context theo ba tầng, và model đọc rồi tự quyết định có làm theo hay không. Hiểu ba tầng đó giải thích gần hết những câu hỏi thực dụng: vì sao description quan trọng hơn thân bài, vì sao skill dài phản tác dụng, vì sao skill không kích hoạt. Và nó cũng cho thấy cái giá của việc cài một bản nén phán đoán mà không đọc.

> Một skill không phải plugin, không phải thư viện, không phải đoạn code được thực thi. Nó là **văn bản** được nạp vào cửa sổ ngữ cảnh theo ba tầng: tên và mô tả luôn nằm sẵn (~100 token), thân bài chỉ nạp khi model thấy khớp, còn file đính kèm thì không tốn gì cho tới lúc thật sự mở ra. Model **đọc** skill rồi tự quyết định làm theo, chứ không "chạy" nó. Ba tầng đó giải thích gần hết những câu hỏi thực dụng — vì sao `description` quyết định việc kích hoạt chứ không phải nội dung, vì sao viết skill dài là phản tác dụng. Và vì skill là bản nén phán đoán của một người trong một bối cảnh cụ thể, cài nó vào mà không đọc nghĩa là nhận cả những giả định bạn chưa từng kiểm chứng.

Quy trình phổ biến hiện nay: vào một danh mục skill, chọn preset, chạy một lệnh cài, rồi code tiếp. Hỏi vì sao agent đột nhiên viết test theo kiểu đó, vì sao nó nhất quyết dùng pattern kia, thì câu trả lời thường là "tại skill nó thế".

Đó là chỗ tri thức rơi rụng. Không phải vì skill xấu — nhiều skill viết rất tốt — mà vì **bản chất của skill là nén phán đoán lại thành hướng dẫn**, và người nhận thường chỉ lấy phần hướng dẫn.

Bài này mổ hai lớp: cơ chế skill hoạt động thế nào, và chuyện gì bị bỏ lại khi ta chỉ cài mà không đọc.

## Skill thực chất là cái gì

Bỏ qua mọi lớp đóng gói, một skill là **một thư mục chứa file `SKILL.md`**. File đó có hai phần: YAML frontmatter với hai trường bắt buộc là `name` và `description`, rồi phần thân viết bằng Markdown.

```markdown
---
name: tdd-workflow
description: Quy trình phát triển hướng kiểm thử, dùng khi cần viết test trước khi viết code
---

# TDD Workflow

Khi được yêu cầu thêm một tính năng, hãy làm theo thứ tự sau...
```

Hết. Không có bước biên dịch, không có hàm đăng ký, không có API.

Điều này quan trọng hơn vẻ ngoài của nó. Một plugin thì chạy — nó nhận đầu vào, thực thi logic, trả đầu ra, và hành vi của nó xác định. Một skill thì **được đọc**. Model nạp đoạn văn bản đó vào ngữ cảnh rồi tự quyết định có làm theo hay không, làm theo tới đâu, và xử lý ra sao khi hướng dẫn trong skill mâu thuẫn với yêu cầu của bạn.

Nói cách khác: skill không phải cơ chế cưỡng chế, nó là cơ chế **thuyết phục**. Đây là điều cần nhớ trước mọi chuyện khác.

## Ba tầng nạp — thứ giải thích gần hết

Phần cơ chế mà hầu như không ai đọc, nhưng lại trả lời được phần lớn câu hỏi thực dụng, là cách skill được nạp vào ngữ cảnh. Nó đi theo ba tầng, gọi là **progressive disclosure**:

| Tầng | Nội dung | Chi phí | Khi nào nạp |
|---|---|---|---|
| 1 | `name` + `description` | ~100 token mỗi skill | **Luôn luôn**, ngay từ đầu phiên |
| 2 | Thân `SKILL.md` | dưới ~5.000 token | Khi model thấy ngữ cảnh khớp |
| 3 | File đính kèm bên cạnh | 0 token | Chỉ khi thật sự mở ra đọc |

Con số đáng suy nghĩ: một dự án cài 8 skill chỉ tốn khoảng 500 token lúc khởi động, thay vì 70.000 token nếu nạp hết. Đó là lý do kiến trúc này tồn tại — cửa sổ ngữ cảnh là tài nguyên khan hiếm, và mọi token tiêu cho thứ chưa cần là token không còn cho việc đang làm.

Từ ba tầng này rút ra bốn hệ quả rất thực dụng.

### `description` quan trọng hơn thân bài

Ở tầng 1, thứ duy nhất model nhìn thấy là tên và mô tả. **Quyết định có kích hoạt skill hay không được đưa ra hoàn toàn dựa trên mô tả**, trước khi một chữ nào trong thân bài được đọc.

Nghĩa là bạn có thể viết một thân skill xuất sắc, và nó sẽ không bao giờ chạy nếu mô tả không nói rõ *khi nào* dùng nó. So sánh hai mô tả:

```yaml
# Kém — nói skill là gì
description: Các pattern về kiểm thử

# Tốt — nói khi nào dùng
description: Quy trình viết test trước khi viết code. Dùng khi người dùng
  yêu cầu thêm tính năng mới, sửa bug, hoặc nhắc tới TDD, unit test,
  test-first.
```

Mô tả thứ hai chứa các **từ khoá kích hoạt** — những cụm sẽ xuất hiện trong câu người dùng gõ. Đó không phải mẹo SEO, đó là cách duy nhất model biết skill này liên quan.

### Skill không kích hoạt thì sửa mô tả, đừng sửa thân bài

Đây là lỗi chẩn đoán phổ biến nhất. Skill không chạy, người ta mở thân bài ra viết thêm cho rõ ràng hơn, rồi thất vọng vì vẫn không chạy.

Nhưng thân bài chưa bao giờ được đọc. Vấn đề nằm ở tầng 1. Sửa `description` mới đúng chỗ.

### Skill dài là phản tác dụng

Thân skill nạp vào tầng 2 sẽ chiếm chỗ trong ngữ cảnh suốt phần còn lại của phiên làm việc. Một skill 5.000 token là 5.000 token không còn cho mã nguồn của bạn, cho lịch sử hội thoại, cho kết quả công cụ.

Kỷ luật đúng: thân bài giữ ngắn, chỉ chứa phần *luôn* cần. Mọi thứ tra cứu — bảng tham chiếu, danh sách API, ví dụ dài — đẩy sang file riêng bên cạnh, để tầng 3 lo. Chúng không tốn gì cho tới lúc model thật sự mở.

### Nhiều skill không có nghĩa là agent giỏi hơn

Mỗi skill cài thêm tốn khoảng 100 token thường trực. Cài 157 mục thì riêng phần mô tả đã ngốn một khoản đáng kể, và quan trọng hơn: **danh sách càng dài thì lựa chọn càng nhiễu**. Model phải phân biệt giữa nhiều mô tả na ná nhau, và tỉ lệ chọn nhầm tăng lên.

Các danh mục skill thường có sẵn preset theo nhóm thay vì cài tất. Đó không phải để tiết kiệm dung lượng đĩa — dung lượng đĩa không phải vấn đề. Đó là để giữ tầng 1 gọn.

## Cái giá của việc chỉ cài mà không đọc

Phần cơ chế ở trên là chuyện kỹ thuật. Phần dưới đây mới là chuyện đáng lo hơn.

### Skill là bản nén của một phán đoán, trong một bối cảnh

Khi ai đó viết "luôn dùng pattern X cho tình huống Y", câu đó là kết luận. Phía sau nó là một chuỗi đánh đổi mà người viết đã cân: họ làm ở quy mô nào, đội ngũ bao nhiêu người, ràng buộc gì về hiệu năng, phiên bản framework nào, chịu được bao nhiêu độ phức tạp.

Bản nén giữ lại kết luận và ném đi bối cảnh. Mà kết luận chỉ đúng **trong** bối cảnh đó.

Một ví dụ rất cụ thể tôi đã viết riêng: gần như mọi tài liệu về tối ưu database đều kết bằng lời khuyên thêm index. Đóng gói thành skill thì nó thành "hãy đánh index cho các cột hay lọc". Nhưng [thêm 4 index làm INSERT chậm 6 lần](https://tiennhm.io.vn/blog/chi-phi-ghi-cua-index) — cái giá ở phía ghi thì không nằm trong câu khuyên đó. Agent làm theo skill sẽ đánh index, và bạn sẽ không biết vì sao hệ thống chậm dần.

Tương tự với [Unit of Work](https://tiennhm.io.vn/blog/unit-of-work-dotnet-abp): một skill "dùng Repository và Unit of Work" nghe rất chuẩn mực, trong khi với EF Core thuần thì `DbContext` đã là Unit of Work rồi, và bọc thêm chỉ là lớp trung gian vô ích.

Không skill nào sai. Chúng chỉ mất bối cảnh.

### Bạn không review được thứ bạn không hiểu

Đây là hệ quả nặng nhất. Agent sinh ra code theo skill, bạn đọc lướt, thấy trông hợp lý, rồi merge.

Nhưng "trông hợp lý" với một người chưa biết vì sao thì chỉ là "trông quen". Bạn không phân biệt được giữa một quyết định đúng và một quyết định đúng-trong-bối-cảnh-khác. Vòng phản hồi để học — thử, sai, hiểu vì sao sai — bị cắt, vì phần sai không hiện ra ngay mà hiện ra sau ba tháng dưới dạng một sự cố production.

### Model không cãi lại skill

Một đồng nghiệp đưa lời khuyên tồi thì bạn phản biện được, hoặc ít nhất thấy gợn. Model đọc skill và nghiêng về việc tuân theo — đó chính là mục đích của skill.

Nghĩa là một giả định sai trong skill sẽ được **nhân bản im lặng** ra mọi file agent đụng tới, với sự nhất quán tuyệt đối. Nhất quán là điểm mạnh của skill, và cũng là cách một sai lầm lan nhanh nhất.

## Ba câu hỏi trước khi cài

Không phải để ngăn bạn dùng skill — chúng hữu ích thật. Chỉ là ba câu nên trả lời trước:

**Ai viết, cho bối cảnh nào, cập nhật lần cuối khi nào?** Một skill về React viết cho React 18 sẽ đưa ra lời khuyên khác với React 19. Một skill về kiến trúc viết bởi người làm hệ thống phục vụ triệu người dùng sẽ thừa thãi với ứng dụng nội bộ hai chục người dùng.

**Nó khẳng định điều gì mà bạn không tự kiểm chứng được?** Mở `SKILL.md` ra, tìm những câu dạng "luôn luôn" và "không bao giờ". Mỗi câu như vậy là một phán đoán đã bị nén. Bạn có đủ hiểu để biết khi nào nó không còn đúng không?

**Gỡ skill ra thì bạn còn làm được việc đó không?** Nếu không, bạn không có công cụ — bạn có phụ thuộc.

## Đọc skill như đọc code của người khác

Điều thực dụng nhất tôi có thể khuyên: **mở file ra đọc**. Thân skill thường dưới 5.000 token, tức khoảng mười lăm phút đọc — rẻ hơn nhiều so với việc gỡ một quyết định kiến trúc sai sau sáu tháng.

Skill đã cài nằm ngay trong hệ thống file, thường dưới thư mục `skills` trong cấu hình agent. Xem những gì đang có:

```bash
ls ~/.claude/skills/
cat ~/.claude/skills/<ten-skill>/SKILL.md
```

Đọc với tâm thế review pull request của một đồng nghiệp bạn chưa từng làm việc cùng: câu nào là sự thật kỹ thuật, câu nào là sở thích cá nhân, câu nào đúng cho quy mô của họ mà không đúng cho quy mô của bạn.

## Khi nào nên tự viết thay vì cài

Skill có sẵn hợp với tri thức phổ quát — quy ước ngôn ngữ, chuẩn định dạng, quy trình chung. Chúng không thể biết những thứ chỉ tồn tại trong dự án của bạn: vì sao bảng kia không được xoá cứng, vì sao module nọ phải giữ tương thích ngược tới tận phiên bản cũ, vì sao đội đã bỏ pattern này sau một sự cố.

Đó mới là thứ đáng đóng gói thành skill, vì nó không có ở đâu khác. Và viết nó ra buộc bạn phải diễn đạt được lý do — chính là phần mà việc cài skill có sẵn đang bỏ qua.

Loạt [Agent Skills](https://tiennhm.io.vn/docs/agent-skills) trên trang này đi theo hướng đó: thay vì phát hành file skill để cài, tôi viết ra phần tri thức nền — React, Next.js, UX, typography, bảng màu — để đọc trước rồi mới đóng gói. Thứ tự đó quan trọng: **hiểu trước, nén sau**. Nén trước rồi mới hiểu là thứ tự tạo ra người biết cài mà không biết vì sao.

### Skill cho AI agent là gì?

Skill là một thư mục chứa file SKILL.md gồm phần YAML frontmatter với hai trường bắt buộc là name và description, cùng phần thân viết bằng Markdown. Nó không phải plugin hay code được thực thi mà là văn bản được nạp vào cửa sổ ngữ cảnh; model đọc rồi tự quyết định có làm theo hay không, nên đây là cơ chế thuyết phục chứ không phải cơ chế cưỡng chế.

### Progressive disclosure trong Agent Skills hoạt động thế nào?

Skill được nạp theo ba tầng. Tầng một gồm name và description, tốn khoảng 100 token mỗi skill và luôn nằm sẵn trong ngữ cảnh từ đầu phiên. Tầng hai là thân SKILL.md, thường dưới 5.000 token và chỉ nạp khi model thấy ngữ cảnh khớp. Tầng ba là các file đính kèm bên cạnh, không tốn token nào cho tới khi thật sự được mở ra đọc.

### Vì sao skill của tôi không được kích hoạt?

Gần như luôn là do trường description chứ không phải do nội dung thân bài. Quyết định kích hoạt được đưa ra ở tầng một, khi model mới chỉ nhìn thấy tên và mô tả, nên thân bài chưa hề được đọc. Hãy viết lại mô tả theo hướng nói rõ khi nào dùng skill và chứa các cụm từ sẽ xuất hiện trong câu người dùng gõ, thay vì chỉ mô tả skill là gì.

### Cài càng nhiều skill thì agent càng mạnh phải không?

Không. Mỗi skill tốn khoảng 100 token thường trực ở tầng một, nên danh mục lớn làm hao ngân sách ngữ cảnh. Quan trọng hơn là danh sách càng dài thì model càng phải phân biệt giữa nhiều mô tả na ná nhau, khiến tỉ lệ chọn nhầm tăng lên. Đó là lý do các danh mục skill thường cung cấp preset theo nhóm thay vì khuyến khích cài tất cả.

### Nên viết thân skill dài hay ngắn?

Ngắn. Thân skill khi được nạp sẽ chiếm chỗ trong ngữ cảnh suốt phần còn lại của phiên làm việc, nên mỗi token dành cho nó là token không còn cho mã nguồn và lịch sử hội thoại. Chỉ giữ trong thân bài phần luôn cần, còn bảng tra cứu, danh sách API và ví dụ dài thì tách sang file riêng bên cạnh để tầng ba nạp khi cần.

### Rủi ro của việc cài skill mà không đọc nội dung là gì?

Skill là bản nén của một phán đoán trong một bối cảnh cụ thể: nó giữ lại kết luận và bỏ đi các đánh đổi phía sau, trong khi kết luận chỉ đúng trong bối cảnh đó. Vì model nghiêng về việc tuân theo skill thay vì phản biện, một giả định sai sẽ được nhân bản nhất quán ra mọi file. Và bạn không review được thứ mình không hiểu, nên lỗi thường chỉ lộ ra rất muộn.

### Khi nào nên tự viết skill thay vì cài skill có sẵn?

Skill có sẵn phù hợp với tri thức phổ quát như quy ước ngôn ngữ, chuẩn định dạng hay quy trình chung. Những gì chỉ tồn tại trong dự án của bạn thì không có ở đâu khác, ví dụ vì sao một bảng không được xoá cứng hay vì sao đội đã bỏ một pattern sau sự cố. Viết chúng ra còn buộc bạn phải diễn đạt được lý do, chính là phần bị bỏ qua khi chỉ cài skill có sẵn.

## Tham khảo

- [ecc.tools/skills](https://ecc.tools/skills) — danh mục chọn skill, agent và command của ECC
- [affaan-m/ECC](https://github.com/affaan-m/ECC) — mã nguồn, xem cấu trúc thư mục `skills/`
- [Agent Skills — tài liệu chính thức](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) — định dạng và cơ chế nạp
- [Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) — hướng dẫn viết skill
