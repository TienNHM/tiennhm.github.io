# MeiGen: thư viện prompt ảnh miễn phí, và cái MCP server ít người để ý

> Nguồn: https://tiennhm.io.vn/en/blog/meigen-ai-prompt-gallery-mcp
> MeiGen là thư viện prompt cho các mô hình sinh ảnh như GPT Image 2.5, Nano Banana và Seedance 2.5, duyệt không cần đăng ký và mỗi prompt đi kèm ảnh kết quả. Phần đáng chú ý hơn với người viết code là MCP server: gắn vào Claude Code hay Codex để gọi thẳng các tác vụ xoá nền, upscale, dựng ảnh sản phẩm từ trong phiên làm việc.

> MeiGen là một thư viện prompt cho các mô hình sinh ảnh và video — duyệt được ngay, không cần tạo tài khoản, và mỗi prompt đều đi kèm ảnh kết quả của chính nó nên bạn biết trước sẽ nhận được gì. Nhưng thứ đáng chú ý với người viết code lại nằm ở mục ít ai bấm vào: MeiGen có **MCP server**, nghĩa là bạn gắn nó vào Claude Code hay Codex rồi gọi thẳng các tác vụ xoá nền, upscale, dựng ảnh sản phẩm ngay trong phiên làm việc, không cần mở trình duyệt. Duyệt prompt thì miễn phí, còn sinh ảnh qua MCP thì trang tài liệu ghi rõ là tiêu credit đã mua.

Bài này là giới thiệu công cụ, không phải đánh giá từ trải nghiệm dài ngày. Mọi thông tin dưới đây tôi lấy trực tiếp từ [meigen.ai](https://www.meigen.ai/) và [trang MCP](https://www.meigen.ai/mcp) của họ; chỗ nào tôi không kiểm chứng được thì tôi nói rõ là không kiểm chứng được.

## Vấn đề mà nó nhắm tới

Ai từng ngồi trước ô nhập prompt của một mô hình sinh ảnh đều biết cảm giác này: bạn biết mình muốn gì, nhưng không biết diễn đạt thế nào để mô hình hiểu. Rồi bạn gõ một câu, ra thứ không dùng được, sửa, lại ra thứ khác cũng không dùng được. Mỗi lần thử là một lần tốn thời gian và tốn credit.

Thư viện prompt sinh ra để cắt vòng lặp đó. Thay vì viết từ số không, bạn tìm một prompt đã có người kiểm chứng rồi sửa lại theo ý mình.

Điểm khác biệt của MeiGen so với việc gõ "prompt đẹp" vào Google là **mỗi prompt được trưng bày kèm đúng ảnh mà nó tạo ra**. Bạn nhìn ảnh trước, thấy hợp thì mới lấy prompt — ngược hẳn với việc đọc một đoạn mô tả rồi đoán xem nó cho ra cái gì.

## Phần thư viện prompt

Trang chủ chia nội dung thành tám nhóm:

| Nhóm | Dùng cho |
|---|---|
| Ads & Product | Ảnh quảng cáo, ảnh sản phẩm |
| Brand & Logo | Nhận diện thương hiệu |
| Videos | Prompt sinh video |
| Illustration & 3D | Minh hoạ, dựng hình 3D |
| Posters & Visuals | Poster, ảnh trình bày |
| Portraits | Chân dung |
| Storyboard & Characters | Phân cảnh, nhân vật |
| Wallpaper | Ảnh nền |

Các mô hình được nhắc tới trên trang chủ là **GPT Image 2.5**, **Nano Banana** và **Seedance 2.5**.

Hai tính năng đáng nói hơn phần duyệt thuần tuý:

**Image to Prompt** — đi ngược chiều thông thường. Bạn đưa vào một tấm ảnh bạn thích, nó trả về prompt để tạo ra thứ tương tự. Hữu ích khi bạn thấy một phong cách trên mạng nhưng không đủ vốn từ để mô tả nó.

**Characters** — tạo và tái sử dụng nhân vật. Đây là phần giải quyết bài toán khó nhất của việc sinh ảnh hàng loạt: giữ cho cùng một nhân vật trông giống nhau qua nhiều tấm. Ai từng thử làm một bộ truyện tranh hay một chuỗi ảnh quảng cáo bằng AI đều đã gặp cảnh nhân vật đổi mặt sau mỗi lần sinh.

Trang chủ tự mô tả là **"Free AI Prompts Gallery"** và không đòi đăng ký để duyệt.

## Phần MCP server

Đây là phần tôi nghĩ độc giả của blog này quan tâm hơn.

MCP (Model Context Protocol) là giao thức để agent như Claude Code hay Codex gọi công cụ bên ngoài. Có MCP server nghĩa là MeiGen không còn là một website bạn phải mở ra, mà thành một bộ công cụ agent của bạn tự gọi được.

### Cài đặt

Trang MCP đưa ra hai đường. Cách được khuyến nghị là **remote** — thêm URL server vào AI client rồi đăng nhập qua OAuth:

```
https://www.meigen.ai/api/mcp
```

Với Codex, lệnh họ ghi là:

```bash
codex mcp add meigen --url https://www.meigen.ai/api/mcp
```

Với Claude Code, cú pháp tương đương là:

```bash
claude mcp add --transport http meigen https://www.meigen.ai/api/mcp
```

Chạy local thì cần Node.js 22 trở lên.

### Xác thực

Hai lựa chọn: **OAuth** là đường ưu tiên, bấm vào sẽ mở trình duyệt để đăng nhập và cấp quyền. Client nào không hỗ trợ OAuth thì dùng **API key**, chuỗi bắt đầu bằng `meigen_sk_`.

Như mọi khoá bí mật khác, đừng commit nó vào repo. Để trong biến môi trường hoặc trong file cấu hình MCP nằm ngoài git.

### Những gì gọi được

Ngoài việc sinh ảnh từ mô tả hoặc từ ảnh tham chiếu và sinh video từ mô tả, trang MCP liệt kê năm kỹ năng đóng gói sẵn:

| Kỹ năng | Việc nó làm |
|---|---|
| Remove Background | Xoá nền |
| Product Detail Images | Dựng ảnh chi tiết sản phẩm |
| Marketing Poster | Dựng poster quảng cáo |
| AI Backgrounds | Sinh nền |
| Upscale | Nâng độ phân giải |

Nhìn danh sách này thì rõ đối tượng họ nhắm: người làm thương mại điện tử và marketing, chứ không phải người vẽ nghệ thuật. Xoá nền rồi dựng ảnh sản phẩm rồi upscale là đúng quy trình của một người phải đưa hàng trăm SKU lên sàn.

### Hai ràng buộc phải biết trước

**Credit.** Trang MCP ghi rõ việc sinh nội dung qua MCP dùng **credit đã mua**, không dùng credit miễn phí, và cần tài khoản đã được cấp quyền. Nói cách khác: duyệt prompt trên web thì miễn phí, nhưng cắm vào agent để chạy tự động thì phải trả tiền. Hợp lý, nhưng nên biết trước khi viết một script gọi nó trong vòng lặp.

**Ảnh đầu vào.** Ảnh phải có URL công khai theo HTTPS, hoặc gửi kèm dưới dạng attachment. Ảnh nằm trên máy bạn thì agent không tự với tới được — phải đẩy lên đâu đó trước. Chi tiết nhỏ nhưng đủ làm hỏng một pipeline nếu tới lúc chạy mới phát hiện.

## Nên dùng khi nào

Hợp lý khi bạn cần ảnh *đủ dùng* nhanh: ảnh minh hoạ cho bài viết, ảnh nền cho slide, ảnh sản phẩm cho một shop nhỏ, ảnh thử nghiệm để chốt hướng thiết kế trước khi thuê người làm thật. Phần MCP đặc biệt hợp nếu bạn đã sống trong Claude Code hay Codex và không muốn đổi cửa sổ.

Không hợp lý khi bạn cần thứ mang bản sắc riêng. Thư viện prompt về bản chất là tập hợp những gì đã có người làm, nên kết quả sẽ mang phong cách phổ biến. Một bộ nhận diện thương hiệu nghiêm túc vẫn cần người thiết kế.

Và như mọi công cụ sinh ảnh, phần bạn phải tự lo là bản quyền cùng điều khoản sử dụng cho mục đích thương mại. Trước khi đưa ảnh sinh ra vào sản phẩm bán tiền, hãy đọc điều khoản của chính MeiGen lẫn của mô hình phía dưới.

## Một cảnh báo về tên miền

Khi tra cứu để viết bài này, tôi gặp vài tên miền tên gần giống nhau: `meigenai.io`, `meigenai.online`, `meigen.art`. Chúng mô tả sản phẩm na ná nhau.

**Tôi không xác minh được chúng có phải cùng một đơn vị hay không.** Trang chủ `meigen.ai` không dẫn sang chúng, và ở footer của một trong số đó có dòng tự nhận là "independent service" — mà tôi không đọc được trọn vẹn nên không dám diễn giải.

Nên nếu bạn định nạp API key hay thanh toán, hãy làm trên đúng tên miền bạn chủ động gõ vào, đừng đi theo link từ kết quả tìm kiếm. Đây là lời khuyên chung cho mọi công cụ AI đang nổi, không riêng gì MeiGen: tên miền na ná là mảnh đất màu mỡ cho lừa đảo.

### MeiGen là gì?

MeiGen là một thư viện prompt cho các mô hình AI sinh ảnh và video, trong đó mỗi prompt được trưng bày kèm đúng ảnh kết quả mà nó tạo ra. Trang chủ nhắc tới các mô hình GPT Image 2.5, Nano Banana và Seedance 2.5, chia nội dung thành tám nhóm từ ảnh quảng cáo, thương hiệu, video cho tới chân dung và ảnh nền.

### Duyệt prompt trên MeiGen có mất phí hay phải đăng ký không?

Trang chủ tự mô tả là Free AI Prompts Gallery và không đòi đăng ký để duyệt. Tuy nhiên việc sinh nội dung thì khác: trang tài liệu MCP ghi rõ rằng sinh ảnh hoặc video qua MCP dùng credit đã mua chứ không dùng credit miễn phí, và cần tài khoản đã được cấp quyền.

### MCP server của MeiGen dùng để làm gì?

Nó cho phép các agent như Claude Code hoặc Codex gọi thẳng công cụ của MeiGen mà không cần mở trình duyệt. Ngoài sinh ảnh từ mô tả hoặc ảnh tham chiếu và sinh video từ mô tả, trang MCP liệt kê năm kỹ năng đóng gói sẵn là xoá nền, dựng ảnh chi tiết sản phẩm, dựng poster quảng cáo, sinh nền và nâng độ phân giải.

### Cài MCP server của MeiGen vào Claude Code như thế nào?

Cách được khuyến nghị là dùng server từ xa tại địa chỉ https://www.meigen.ai/api/mcp rồi xác thực bằng OAuth, lệnh có dạng claude mcp add với transport http. Client nào không hỗ trợ OAuth thì dùng API key bắt đầu bằng meigen_sk_. Nếu chạy bản local thì cần Node.js phiên bản 22 trở lên.

### Image to Prompt của MeiGen hoạt động ra sao?

Nó đi ngược chiều so với cách dùng thông thường: bạn đưa vào một tấm ảnh, nó trả về prompt để tạo ra thứ tương tự. Tính năng này hữu ích khi bạn nhìn thấy một phong cách mình thích nhưng chưa đủ vốn từ để mô tả nó thành câu lệnh.

### Vì sao ảnh đầu vào cho MCP phải có URL công khai?

Vì server MCP chạy ở phía MeiGen chứ không phải trên máy bạn, nên nó không đọc được file nằm trong ổ đĩa cục bộ. Tài liệu yêu cầu ảnh phải có URL công khai theo HTTPS hoặc được gửi kèm dưới dạng attachment, nên nếu dựng pipeline tự động thì phải tính bước đẩy ảnh lên một nơi có thể truy cập được trước.

### Ảnh sinh ra từ MeiGen có dùng cho mục đích thương mại được không?

Đây là phần bạn phải tự kiểm tra chứ không nên suy đoán. Quyền sử dụng phụ thuộc vào cả điều khoản của MeiGen lẫn điều khoản của mô hình sinh ảnh nằm phía dưới, và hai bên có thể quy định khác nhau. Trước khi đưa ảnh vào sản phẩm bán tiền, hãy đọc điều khoản hiện hành của cả hai.

## Tham khảo

- [meigen.ai](https://www.meigen.ai/) — trang chủ, thư viện prompt
- [meigen.ai/mcp](https://www.meigen.ai/mcp) — tài liệu cài đặt MCP server
- [Model Context Protocol](https://modelcontextprotocol.io/) — chuẩn phía sau phần MCP
- [Agent Skills](https://tiennhm.io.vn/docs/agent-skills) — loạt tài liệu về cách viết skill cho agent trên blog này
