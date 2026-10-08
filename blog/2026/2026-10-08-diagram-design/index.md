---
title: "Diagram Design: skill dạy AI agent vẽ sơ đồ như người làm biên tập"
slug: diagram-design-skill-ve-so-do-cho-ai-agent
description: "Diagram Design là một agent skill mã nguồn mở (MIT) cho Claude Code, Codex, GitHub Copilot và các agent khác, giúp agent vẽ sơ đồ kiến trúc, flowchart, sequence, ER và hơn bốn chục loại khác ra file HTML + SVG theo một hệ thiết kế chặt: một màu nhấn, tối đa 9 node, đường nối vuông góc, không đổ bóng. Nó còn vẽ lại được sơ đồ draw.io, Mermaid, Excalidraw có sẵn. Bài này giới thiệu cách nó hoạt động, cách cài, và một điểm cần biết khi dùng tiếng Việt."
keywords: [diagram design, diagram-design skill, cathryn lavery, ve so do bang ai, ai ve so do kien truc, claude code plugin, claude code skill, codex plugin, github copilot plugin, agent skills, so do kien truc phan mem, architecture diagram, flowchart, sequence diagram, er diagram, mermaid sang svg, drawio sang svg, excalidraw, svg diagram, editorial diagram, ai slop, font tieng viet, instrument serif, geist font]
tags: [ai, ai-tools, tools]
authors: [tiennhm]
date: 2026-10-08
---

import { SummaryBox, FAQSection } from '@site/src/components/SEO';

# Diagram Design

<SummaryBox>
[Diagram Design](https://github.com/cathrynlavery/diagram-design) là một agent skill mã nguồn mở (giấy phép MIT) của Cathryn Lavery. Cài vào Claude Code, Codex, GitHub Copilot hay các agent hỗ trợ chuẩn Agent Skills, nó dạy agent vẽ sơ đồ kỹ thuật ra một file HTML chứa SVG inline, theo một hệ thiết kế rất kỷ luật: một màu nhấn dùng cho tối đa hai phần tử, tối đa 9 node mỗi sơ đồ, đường nối chỉ được bẻ góc vuông, không đổ bóng, mọi toạ độ chia hết cho 4. Bản 2.6.68 có 44 loại sơ đồ, từ kiến trúc, flowchart, sequence, ER tới Sankey, Wardley map, Gantt. Nó cũng vẽ lại được file draw.io, Mermaid và Excalidraw có sẵn theo cùng phong cách, kèm một bản kê những gì đã gộp hay bỏ đi. Với người viết tiếng Việt thì có một điểm cần sửa: font tiêu đề mặc định là Instrument Serif, không có đủ bộ ký tự tiếng Việt.
</SummaryBox>

Bài này giới thiệu công cụ chứ chưa phải đánh giá sau nhiều tháng dùng. Thông tin lấy từ [README trên GitHub](https://github.com/cathrynlavery/diagram-design) và từ chính file `SKILL.md` của bản 2.6.68 tôi đang cài, còn phần font tiếng Việt thì tôi tự kiểm tra bằng Google Fonts API.

<!-- truncate -->

## Vấn đề nó nhắm tới

Bảo một AI agent "vẽ giúp sơ đồ kiến trúc" thì kết quả thường rơi vào một trong hai kiểu. Kiểu thứ nhất là một khối Mermaid, đúng về nội dung nhưng bố cục do bộ render tự xếp, mũi tên chéo qua nhau, nhìn là biết máy làm. Kiểu thứ hai là một trang HTML nền tối với viền phát sáng màu cyan và tím, mười mấy cái hộp y hệt nhau, cái nào cũng được tô màu "quan trọng".

README của Diagram Design gọi kiểu thứ hai là **"AI slop"**, và phần lớn giá trị của skill nằm ở chỗ nó liệt kê cụ thể những gì làm nên thứ đó để agent tránh:

| Anti-pattern | Lý do bị loại |
|---|---|
| Nền tối + glow cyan/tím | Trông "kỹ thuật" nhưng không có quyết định thiết kế nào |
| JetBrains Mono cho mọi chữ | Font mono chỉ dành cho nội dung kỹ thuật như port, lệnh, URL |
| Mọi node là một cái hộp giống hệt nhau | Xoá mất thứ bậc |
| Đổ bóng | Bóng bị cấm, chỉ dùng viền |
| Bo góc kiểu `rounded-2xl` | Tối đa 6–10px hoặc không bo |
| Tô màu nhấn cho mọi node "quan trọng" | Màu nhấn chỉ cho 1–2 điểm, không phải hệ thống báo hiệu |
| Chép lại bố cục của Mermaid | Mang theo khoảng cách và đường đi tự động thay vì một bố cục có chủ đích |

## Triết lý: xoá trước, vẽ sau

Câu mở đầu phần triết lý trong `SKILL.md` là:

> The highest-quality move is usually deletion.

Tức là nước đi chất lượng nhất thường là xoá bớt. Cụ thể hoá ra mấy quy tắc:

- Mỗi node phải là một ý riêng. Hai node luôn đi cùng nhau thì gộp làm một.
- Mỗi đường nối phải mang thông tin. Nếu bố cục đã cho thấy quan hệ thì bỏ đường đó.
- Mật độ mục tiêu là 4/10, đủ đầy đủ về kỹ thuật nhưng không dày tới mức phải có người giải thích.
- Sơ đồ chưa xong khi đã thêm đủ mọi thứ, nó xong khi không còn gì bỏ được nữa.

Những câu này không chỉ để trang trí, vì skill biến chúng thành giới hạn cứng cho từng sơ đồ:

| Giới hạn | Giá trị |
|---|---|
| Số node tối đa | 9 |
| Số mũi tên tối đa | 12 |
| Số phần tử dùng màu nhấn | 2 |
| Số chú thích (callout) | 2 |

Vượt ngưỡng thì skill yêu cầu tách thành hai sơ đồ, một cái tổng quan và một cái chi tiết. Ai từng phải đọc một sơ đồ microservice có ba mươi cái hộp trong một slide sẽ thấy ngay quy tắc này đáng giá thế nào.

Trước khi vẽ, skill còn bắt agent tự hỏi một câu: *người đọc có học được nhiều hơn từ sơ đồ này so với một đoạn văn viết tốt không?* Nếu không thì đừng vẽ. Danh sách thứ đây không nên vẽ cũng rõ ràng: danh sách thì dùng bảng hoặc gạch đầu dòng, so sánh trước/sau chỉ khác thuộc tính thì dùng bảng, "sơ đồ" một hình thì viết thành câu là xong.

## Hệ thiết kế

Bảng màu mặc định gồm nền giấy `#f5f5f5`, mực `#2d3142`, chữ phụ `#4f5d75` và một màu nhấn cam `#eb6c36`. Trong file hướng dẫn, các màu này được gọi theo vai trò (`paper`, `ink`, `muted`, `accent`, `link`) chứ không theo mã hex, nên đổi skin chỉ cần sửa một file `style-guide.md`.

Chữ chia ba họ font, mỗi họ một việc:

| Vai trò | Font |
|---|---|
| Tiêu đề trang | Instrument Serif |
| Tên node | Geist, đậm 600 |
| Nhãn phụ kỹ thuật (port, URL, kiểu dữ liệu) | Geist Mono |
| Chú thích biên tập | Instrument Serif nghiêng |

Phần tôi thấy kỹ nhất là sáu quy tắc bắt buộc cho đường nối. Đường nối chỉ được bẻ góc vuông với bán kính bo 8px, không có đường chéo. Nhãn trên mũi tên tối đa 14 ký tự, viết hoa, nằm trên một lớp nền che và cách nét vẽ 6–10px. Hai đường song song phải cách nhau ít nhất 12px. Nhiều đường cùng bám vào một cạnh hộp thì mỗi đường có điểm bám riêng. Không đường nào được chạy ngầm sau một cái hộp không phải điểm đầu hay điểm cuối của nó. Vi phạm bất kỳ quy tắc nào trong sáu quy tắc này đều tính là trượt.

Mỗi sơ đồ có ba biến thể: sáng tối giản (mặc định), tối tối giản, và bản "full editorial" có thêm thẻ tóm tắt cho bài viết dài. Ngoài ra còn có biến thể nét vẽ tay cho bài tiểu luận và biến thể khung cửa sổ terminal cho bài về công cụ dòng lệnh.

## Bốn mươi bốn loại sơ đồ

README ghi 42 loại, còn `SKILL.md` của bản 2.6.68 ghi 44, có lẽ README chưa cập nhật kịp. Gom lại theo nhóm cho dễ nhìn:

| Nhóm | Các loại |
|---|---|
| Hệ thống | Architecture, Architecture delta (trước/sau), IT current-state, Deployment, Dependency graph, High-level |
| Luồng và hành vi | Flowchart, Sequence, State machine, Swimlane, Process, User journey |
| Dữ liệu | ER, Database schema, UML class, Data flow, Medallion, DP integration, DP security matrix |
| Cấu trúc | Tree, Org chart, Nested, Layer stack, Venn, Pyramid/funnel |
| Biểu đồ số liệu | Bar, Line, Scatter, Heatmap, Treemap, Waterfall, Sankey, Radar, Polar |
| Kế hoạch và chiến lược | Timeline, Gantt, Kanban, Story map, Quadrant, Wardley map, Fishbone, Loop |
| Không gian | Exploded axonometric, Axonometric plan |

Mỗi loại có một file hướng dẫn riêng kèm anti-pattern của riêng nó, và agent được yêu cầu đọc đúng file đó trước khi vẽ. Muốn xem trước tất cả thì có [trang gallery](https://cathrynlavery.github.io/diagram-design/) trên GitHub Pages.

Có một tầng nữa mà README gọi là semantic pattern, tạm hiểu là mẫu ngữ nghĩa. Khi điều cần thể hiện là *hành vi* chứ không chỉ là *hình dạng*, ví dụ một hàng đợi bị nghẽn, hai lần đánh giá policy rẽ nhánh khác nhau, hay một vòng đời có retry và huỷ, thì agent chọn mẫu ngữ nghĩa trước rồi mới chọn loại sơ đồ để dàn bố cục. Cách tách này hợp lý, vì cùng một sơ đồ data flow có thể đang kể chuyện nghẽn cổ chai hoặc chuyện biến dữ liệu thô thành dữ liệu có cấu trúc, và mỗi chuyện cần nhấn vào những chỗ khác nhau.

## Vẽ lại từ draw.io, Mermaid, Excalidraw

Đây là tính năng tôi thấy thực dụng nhất, vì hầu hết team đã có sẵn một đống sơ đồ cũ.

Skill nhận `.drawio`, `.drawio.svg`, `.drawio.png`, file `.mmd` hoặc khối code `mermaid` trong Markdown, và file `.excalidraw`. Quy trình có bốn bước:

1. **Trích xuất chứ không render.** Một script Python đọc file nguồn và in ra danh sách node, cạnh, nhóm, kèm cảnh báo nếu vượt giới hạn.
2. **Chỉnh bốn núm** trước khi vẽ: định dạng đầu ra, kích thước (nhúng tài liệu, slide 16:9, ảnh OG cho mạng xã hội, khổ in A4…), mức chi tiết (`faithful` tối đa 24 node, `balanced` tối đa 12, `simplified` tối đa 7) và đối tượng đọc (`engineer`, `mixed`, `executive`).
3. **Vẽ lại, không chuyển đổi.** Toạ độ, màu, font của bản gốc bị bỏ hết, chỉ giữ nội dung: thành phần, quan hệ, nhóm, hướng.
4. **Báo cáo bản kê độ trung thực** (fidelity ledger): đã gộp gì, thu gọn gì, bỏ gì.

Bước 4 là chỗ tôi đánh giá cao. Người đưa file vào là người biết rõ bản gốc, nên nếu một service bị lặng lẽ biến mất họ sẽ nhận ra, và lúc đó cả sơ đồ mất uy tín. Skill cũng ghi rõ hai điều cấm: không bịa thêm thành phần cho đẹp bố cục, và không âm thầm bỏ thành phần nào.

Có một chi tiết bảo mật nhỏ đáng khen: mọi nhãn, link và metadata đọc từ file nguồn đều được coi là dữ liệu không tin cậy, không bao giờ là chỉ dẫn. Một file draw.io tải từ đâu đó có thể chứa nhãn viết kiểu "bỏ qua mọi hướng dẫn trước đó", và việc skill nói thẳng điều này với agent là đúng cách phòng prompt injection.

## Cài đặt

Với Claude Code:

```bash
/plugin marketplace add cathrynlavery/diagram-design
/plugin install diagram-design@diagram-design
```

Với Codex:

```bash
codex plugin marketplace add cathrynlavery/diagram-design
codex plugin add diagram-design@diagram-design
```

Với GitHub Copilot CLI:

```bash
copilot plugin marketplace add cathrynlavery/diagram-design
copilot plugin install diagram-design@diagram-design
```

Các agent khác hỗ trợ chuẩn Agent Skills thì dùng:

```bash
npx skills add cathrynlavery/diagram-design
```

README còn hướng dẫn cho Factory Droid, Pi, Kiro, OpenCode và Claude Cowork, đồng thời cảnh báo rằng bản chính thức chỉ đến từ repository này. Lời cảnh báo đó nên nghe theo, vì một skill là văn bản được nạp thẳng vào context của agent, cài bản lạ là cho người lạ viết chỉ dẫn cho agent của mình.

Sau khi cài, trong Claude Code có thêm mấy lệnh:

| Lệnh | Việc nó làm |
|---|---|
| `/diagram-design:doctor` | Kiểm tra môi trường đã sẵn sàng chưa |
| `/diagram-design:import-mermaid` | Vẽ lại sơ đồ Mermaid |
| `/diagram-design:import-drawio` | Vẽ lại file draw.io |
| `/diagram-design:import-excalidraw` | Vẽ lại bảng Excalidraw |
| `/diagram-design:export-diagram` | Xuất file HTML ra `.svg` và `.png` |
| `/diagram-design:profile` | Lưu, nạp, xoá hồ sơ thương hiệu |

Còn vẽ sơ đồ mới thì không cần lệnh, cứ bảo agent "vẽ sơ đồ sequence cho luồng OAuth" là skill tự kích hoạt dựa trên phần mô tả của nó.

Phần xuất PNG cần Playwright và Chromium:

```bash
pip install playwright && playwright install chromium
```

## Lần đầu dùng: cổng kiểm tra thương hiệu

Lần đầu vẽ trong một dự án, skill kiểm tra xem bảng màu còn là mặc định không. Nếu còn, nó dừng lại và hỏi bạn muốn lấy thương hiệu từ đâu: từ URL website, từ một skill khác đã cài, từ thư mục design system trên máy, dán token trực tiếp, giữ mặc định, hay nạp một hồ sơ đã lưu.

Chọn URL website thì skill đọc trang chủ, rút bảng màu và font, kiểm tra độ tương phản theo WCAG AA, cho bạn xem phần khác biệt trước khi ghi vào `style-guide.md`. Kết quả lưu được thành hồ sơ có tên trong `~/.diagram-design/profiles/`, và mỗi dự án trỏ tới hồ sơ của nó bằng một file đánh dấu `.diagram-design`. Ai làm cho nhiều khách hàng sẽ thấy phần này tiện, vì sơ đồ của dự án nào mang màu của khách hàng đó.

## Một yêu cầu vẽ đi qua những bước nào

Ghép các phần trên lại thì luồng xử lý trông như sau. Sơ đồ này được vẽ bằng chính Diagram Design, dùng skin mặc định, nhãn node tiếng Việt và nhãn mũi tên tiếng Anh, lý do vì sao để nhãn mũi tên bằng tiếng Anh có ở mục sau.

![Luồng xử lý một yêu cầu vẽ của Diagram Design: yêu cầu, kiểm tra style guide, chọn loại sơ đồ, vẽ SVG, taste gate, file HTML, export tuỳ chọn](./diagram-design-flow.png)

Ảnh trên là bản PNG chụp lại. File gốc do skill tạo ra là [diagram-design-flow.html](./diagram-design-flow.html): một file HTML duy nhất, SVG inline, không JavaScript, chỉ có font tiêu đề đã được thay theo cách ở mục sau. Bạn có thể mở trực tiếp trong trình duyệt hoặc tải về để xem mã nguồn.

Có hai vòng lặp đáng để ý. Vòng thứ nhất ở cổng style guide: nếu bảng màu còn mặc định thì agent rẽ sang bước onboarding trước, rồi mới quay lại chọn loại sơ đồ. Vòng thứ hai ở **taste gate**, bản checklist ở cuối `SKILL.md` gồm bốn nhóm câu hỏi: chọn đúng loại sơ đồ chưa, còn bỏ được node hay mũi tên nào không, màu nhấn có vượt hai phần tử không, và các quy tắc kỹ thuật như đường nối, lưới 4px, thẻ `<title>`/`<desc>` đã đúng chưa. Trượt bất kỳ mục nào thì agent quay lại vẽ.

Đầu ra luôn là một file HTML. Export sang SVG hay PNG là bước thủ công, skill được dặn rõ là không tự sinh file export nếu không được yêu cầu. Lúc làm hình cho bài này, máy tôi chưa có Playwright nên tôi chụp PNG bằng Chrome headless (`--screenshot --force-device-scale-factor=2`), kết quả ra cùng kích thước 1920×1200.

## Điểm cần biết khi vẽ sơ đồ tiếng Việt

Tôi kiểm tra các font mặc định trên Google Fonts API để xem chúng phục vụ những dải ký tự nào:

| Font | Subset có trên Google Fonts |
|---|---|
| Geist | latin, latin-ext, cyrillic, cyrillic-ext, **vietnamese** |
| Geist Mono | latin, latin-ext, cyrillic, cyrillic-ext, **vietnamese** |
| Instrument Serif | latin, latin-ext |

Tên node và nhãn phụ dùng Geist và Geist Mono nên hiển thị tiếng Việt ổn. Vấn đề nằm ở **tiêu đề**: Instrument Serif không có subset `vietnamese`, nên các chữ thuộc dải Unicode `U+1EA0–U+1EF1`, tức những chữ có hai lớp dấu hoặc dấu nặng như *ạ, ấ, ế, ệ, ố, ộ, ữ, ự*, sẽ không có trong font. Trình duyệt phải lấy những chữ đó từ font khác, và một tiêu đề như "Kiến trúc hệ thống" sẽ có chữ *ế, ệ, ố* trông lệch hẳn so với phần còn lại.

Template của skill thật ra đã có sẵn một lớp dự phòng: `--font-serif` là `'Instrument Serif', 'Noto Serif', …`, và Noto Serif có subset `vietnamese`, nên chữ không bị mất hay hiện ô vuông. Nhưng dự phòng diễn ra theo *từng ký tự*, nên trong cùng một từ, chữ thường lấy từ Instrument Serif (hẹp, nét tương phản cao), còn chữ có dấu lấy từ Noto Serif (rộng, nét đều). Lúc làm sơ đồ cho bài này tôi gặp đúng chuyện đó: tiêu đề "Diagram Design xử lý một yêu cầu vẽ như thế nào" có các chữ *ử, ộ, ế* to và béo hơn hẳn phần còn lại, nhìn như lỗi in.

Cách sửa dứt điểm là **thay cả font tiêu đề**, không dựa vào dự phòng. Tôi dùng Noto Serif Display: font này có subset `vietnamese`, lại có trục độ rộng (`wdth`) nên ép về dạng hẹp sẽ ra dáng khá gần Instrument Serif:

```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+Display:wdth,wght@62.5..100,400&display=swap" rel="stylesheet">
```

```css
--font-serif: 'Noto Serif Display', serif;
h1 { font-family: var(--font-serif); font-stretch: 75%; }
```

Nếu dùng thường xuyên thì làm việc này một lần ở bước onboarding (chọn phương án dán token), rồi lưu thành hồ sơ để mọi sơ đồ tiếng Việt về sau tự dùng font này. Playfair Display, Fraunces hay Newsreader cũng có subset `vietnamese` nếu bạn muốn một dáng chữ khác.

Còn một điểm nữa, đây là nhận xét của tôi chứ skill không nói: nhãn trên mũi tên bị giới hạn 14 ký tự, viết hoa, cỡ 8px font mono. Tiếng Việt viết hoa ở cỡ đó thì dấu chồng lên chữ in hoa rất chật, và 14 ký tự thì chỉ đủ hai ba từ. Tôi sẽ giữ nhãn mũi tên bằng thuật ngữ kỹ thuật tiếng Anh như `HTTPS`, `PUBLISH`, `JWT`, còn tiếng Việt để cho tên node và tiêu đề.

## So với Mermaid

Hai thứ này không thay thế nhau, vì chúng giải quyết hai việc khác nhau.

| | Mermaid | Diagram Design |
|---|---|---|
| Nguồn | Văn bản nằm trong Markdown | Một file HTML do agent sinh ra |
| Bố cục | Bộ render tự xếp | Agent xếp theo quy tắc của skill |
| Review trong PR | Diff được từng dòng | Diff một khối SVG, khó đọc |
| Sửa nhỏ | Sửa một dòng | Nhờ agent vẽ lại hoặc sửa SVG |
| GitHub, Docusaurus | Hiển thị trực tiếp | Phải xuất ra SVG/PNG rồi nhúng |
| Thẩm mỹ | Đủ dùng | Là mục tiêu chính |
| Tính lặp lại | Cùng nguồn ra cùng hình | Mỗi lần vẽ có thể khác nhau |

Dòng cuối là điều phải nói rõ. Skill chỉ là văn bản hướng dẫn được nạp vào context, model đọc rồi tự quyết định có làm theo đến đâu, nên chất lượng phụ thuộc vào model và hai lần chạy cùng yêu cầu chưa chắc ra cùng hình. Phần này tôi đã viết kỹ hơn trong bài [cơ chế của agent skills](/blog/agent-skills-co-che-va-tri-thuc-bi-bo-qua). Bộ quy tắc của Diagram Design chặt tới mức thu hẹp khoảng dao động đó khá nhiều, và nó có script `self_check.py` để kiểm tra hợp đồng SVG, nhưng không biến được việc vẽ thành quy trình tất định.

Cách chia việc tôi thấy hợp lý là: sơ đồ sống cùng code, sửa thường xuyên và cần review trong PR thì để Mermaid. Sơ đồ cho slide, bài blog, tài liệu gửi khách hàng, nơi thẩm mỹ quan trọng và ít khi sửa, thì dùng Diagram Design, và có thể lấy chính file Mermaid kia làm nguồn để vẽ lại.

## Mấy điểm cộng nhỏ

- **Accessibility mặc định.** Mỗi SVG có `role="img"`, có `<title>` và `<desc>` được trỏ tới qua `aria-labelledby`, nên trình đọc màn hình đọc được sơ đồ nói về gì.
- **Một file duy nhất.** CSS nhúng sẵn, SVG inline, không ảnh ngoài, không JavaScript trừ khi bạn bật hiệu ứng chuyển động. Gửi file qua chat là người nhận mở được ngay.
- **Hiệu ứng là tuỳ chọn.** Có bốn chế độ `none`, `reveal`, `step`, `loop`, mặc định là `none`, và bản có hiệu ứng vẫn phải đọc hiểu được đầy đủ khi tắt JavaScript hoặc khi người dùng bật giảm chuyển động.
- **Bộ icon.** 87 icon đơn sắc cho hạ tầng và cloud, lấy từ Tabler Icons (MIT) và Simple Icons (CC0).

## Khi nào không nên dùng

Bản thân skill đã trả lời câu này, và tôi đồng ý: khi một cái bảng ba cột nói được điều tương tự, khi nội dung chỉ là một danh sách, khi cần một sơ đồ ASCII nhanh trong commit message hay comment code. Tôi thêm một trường hợp nữa: khi sơ đồ sẽ được nhiều người sửa đi sửa lại trong repo, vì khi đó khả năng diff quan trọng hơn vẻ đẹp.

<FAQSection
  items={[
    {
      question: "Diagram Design là gì?",
      answer: "Diagram Design là một agent skill mã nguồn mở theo giấy phép MIT của Cathryn Lavery, cài được vào Claude Code, Codex, GitHub Copilot và các agent hỗ trợ chuẩn Agent Skills. Nó hướng dẫn agent vẽ sơ đồ kỹ thuật ra một file HTML chứa SVG inline theo một hệ thiết kế chặt: một màu nhấn cho tối đa hai phần tử, tối đa 9 node, đường nối góc vuông, không đổ bóng."
    },
    {
      question: "Diagram Design hỗ trợ những loại sơ đồ nào?",
      answer: "Bản 2.6.68 liệt kê 44 loại, gồm sơ đồ kiến trúc, flowchart, sequence, state machine, ER, database schema, UML class, swimlane, timeline, Gantt, Sankey, Wardley map, fishbone, kanban, user journey, deployment, dependency graph cùng nhiều loại biểu đồ số liệu như bar, line, scatter, heatmap, treemap và waterfall. README trên GitHub ghi 42 loại."
    },
    {
      question: "Cài Diagram Design vào Claude Code như thế nào?",
      answer: "Chạy hai lệnh trong Claude Code: /plugin marketplace add cathrynlavery/diagram-design rồi /plugin install diagram-design@diagram-design. Muốn xuất PNG thì cài thêm Playwright và Chromium bằng pip install playwright và playwright install chromium."
    },
    {
      question: "Diagram Design có chuyển được sơ đồ Mermaid hay draw.io không?",
      answer: "Có, nhưng nó vẽ lại chứ không chuyển đổi. Một script trích xuất node, cạnh và nhóm từ file nguồn, toạ độ, màu và font gốc bị bỏ đi, rồi agent dựng bố cục mới theo hệ thiết kế của skill. Cuối cùng nó báo cáo một bản kê những gì đã gộp, thu gọn hoặc bỏ đi. Định dạng hỗ trợ gồm draw.io, Mermaid và Excalidraw."
    },
    {
      question: "Vẽ sơ đồ tiếng Việt bằng Diagram Design có bị lỗi font không?",
      answer: "Tên node và nhãn phụ dùng Geist và Geist Mono, hai font này có subset tiếng Việt nên hiển thị ổn. Tiêu đề dùng Instrument Serif, font này không có subset tiếng Việt nên các chữ như ạ, ế, ệ, ố, ự phải lấy từ font khác và trông lệch. Lớp dự phòng sang Noto Serif có sẵn trong template chỉ thay từng ký tự nên tiêu đề vẫn bị trộn hai font. Cách sửa dứt điểm là thay hẳn font tiêu đề bằng một serif hỗ trợ tiếng Việt, ví dụ Noto Serif Display ép hẹp bằng font-stretch 75%, và lưu thành hồ sơ ở bước onboarding."
    },
    {
      question: "Nên dùng Diagram Design hay Mermaid?",
      answer: "Tuỳ sơ đồ dùng vào việc gì. Sơ đồ sống cùng code, sửa thường xuyên và cần review trong pull request thì Mermaid hợp hơn vì diff được từng dòng và GitHub hiển thị trực tiếp. Sơ đồ cho slide, bài viết hoặc tài liệu gửi khách hàng, nơi thẩm mỹ quan trọng và ít sửa, thì Diagram Design hợp hơn, và có thể lấy chính file Mermaid làm nguồn để vẽ lại."
    },
    {
      question: "Sơ đồ do Diagram Design tạo ra có giống nhau giữa các lần chạy không?",
      answer: "Không đảm bảo. Skill là văn bản hướng dẫn mà model đọc và làm theo, nên kết quả phụ thuộc vào model và có thể khác nhau giữa các lần chạy. Bộ quy tắc chặt về giới hạn node, lưới 4px và quy tắc đường nối giúp thu hẹp độ dao động, nhưng không biến việc vẽ thành quy trình tất định như một bộ render."
    }
  ]}
/>

## Tham khảo

- [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) — repository chính thức, README và hướng dẫn cài
- [Gallery](https://cathrynlavery.github.io/diagram-design/) — xem trước toàn bộ loại sơ đồ
- [Google Fonts: Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif) và [Geist](https://fonts.google.com/specimen/Geist) — kiểm tra bộ ký tự hỗ trợ
- [Cài skill rồi code tiếp: cơ chế đằng sau và phần tri thức bị bỏ lại](/blog/agent-skills-co-che-va-tri-thuc-bi-bo-qua) — vì sao skill không cho kết quả tất định
- [MeiGen: thư viện prompt ảnh miễn phí, và cái MCP server ít người để ý](/blog/meigen-ai-prompt-gallery-mcp) — một công cụ khác cho phần hình ảnh
