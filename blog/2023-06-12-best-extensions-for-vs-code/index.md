---
slug: best-extensions-for-vs-code
title: Những extensions tốt nhất cho Visual Studio Code
authors: [tiennhm]
tags: [vscode, extensions]
enableComments: true # for Gisqus comments, set to true
draft: false # set to true to hide this post from the site
image: https://v1.screenshot.11ty.dev/https%3A%2F%2Fmarketplace.visualstudio.com%2Fvscode/opengraph/
---

<p align="right">
    <img src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Ftiennhm.github.io%2Fblog%2Fbest-extensions-for-vs-code&label=⚪Views&labelColor=%2337d67a&countColor=%23555555&style=flat&labelStyle=upper" loading='lazy' decoding='async'/>
</p>

Visual Studio Code là một trình chỉnh sửa mã nguồn, nhẹ nhưng mạnh mẽ, hỗ trợ cho đa dạng các hệ điều hành: Windows, macOS và Linux. Nó hỗ trợ cho `JavaScript`, `TypeScript` và `Node.js` và có một hệ sinh thái phong phú các tiện ích mở rộng cho các ngôn ngữ khác (chẳng hạn như `C++`, `C#`, `Java`, `Python`, `PHP`, `Go`) và các runtimes (chẳng hạn như `.NET` và `Unity`).

Trong bài viết này, tôi sẽ liệt kê một số tiện ích mở rộng tốt nhất cho VS Code mà tôi sử dụng hàng ngày. Tôi hy vọng nó sẽ hữu ích cho bạn.

<!--truncate-->

## 1. GitLens

![Version](https://img.shields.io/visual-studio-marketplace/v/eamodio.gitlens?style=flat)
![Release Date](https://img.shields.io/visual-studio-marketplace/release-date/eamodio.gitlens?style=flat)
![Downloads](https://img.shields.io/visual-studio-marketplace/d/eamodio.gitlens?style=flat)
![Rating](https://img.shields.io/visual-studio-marketplace/r/eamodio.gitlens?style=flat)
![Installs](https://img.shields.io/visual-studio-marketplace/i/eamodio.gitlens?style=flat)

GitLens là một extension cho Visual Studio Code, cho phép bạn tăng cường khả năng làm việc với Git trong VS Code1. Extension này giúp bạn hiểu rõ hơn về code, biết ai, tại sao và khi nào một dòng hoặc một khối code được thay đổi.

<img src="https://v1.screenshot.11ty.dev/https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Deamodio.gitlens/opengraph/" loading='lazy' decoding='async'/>

- Link: [https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- Chức năng:
  + Hiển thị thông tin blame cho dòng code hiện tại hoặc cho các khối code bằng CodeLens.
  + Hiển thị thông tin chi tiết về commit và stash trong Side Bar.
  + Hiển thị lịch sử và sự phát triển của các repository, commit và file.
  + Hỗ trợ tìm kiếm, so sánh và quản lý các commit, branch, tag, stash, v.v...
  + Hỗ trợ giao tiếp với các dịch vụ Git như GitHub, GitLab, Bitbucket, v.v...
  + Hỗ trợ tích hợp với Live Share để cộng tác trực tuyến.
  + GitLens giúp bạn hiểu rõ hơn về mã nguồn trong các dự án sử dụng Git. Đây là một tiện ích mở rộng không thể thiếu đối với các lập trình viên sử dụng Git và Visual Studio Code.

## . Git Graph

![Version](https://img.shields.io/visual-studio-marketplace/v/mhutchie.git-graph?style=flat)
![Release Date](https://img.shields.io/visual-studio-marketplace/release-date/mhutchie.git-graph?style=flat)
![Downloads](https://img.shields.io/visual-studio-marketplace/d/mhutchie.git-graph?style=flat)
![Rating](https://img.shields.io/visual-studio-marketplace/r/mhutchie.git-graph?style=flat)
![Installs](https://img.shields.io/visual-studio-marketplace/i/mhutchie.git-graph?style=flat)

Git Graph là một extension cho Visual Studio Code, cho phép bạn xem một đồ thị Git của repository của bạn, và dễ dàng thực hiện các câu lệnh Git từ đồ thị. Extension này giúp bạn trực quan hóa và quản lý các commit, branch, tag, stash, v.v...

<img src="https://v1.screenshot.11ty.dev/https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Dmhutchie.git-graph/opengraph/" loading='lazy' decoding='async'/>

- Link: [https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph)
- Chức năng:
  + Hiển thị đồ thị Git với các commit, branch, tag, stash, remote, v.v...
  + Hỗ trợ thực hiện các câu lệnh Git bằng cách nhấn chuột phải lên một commit, branch, tag, v.v... Các câu lệnh Git bao gồm: Create, Checkout, Delete, Fetch, Merge, Pull, Push, Rebase, Rename & Reset; Add, Delete & Push Tags; Checkout, Cherry Pick, Drop, Merge & Revert Commits; Clean, Reset & Stash các thay đổi chưa commit; apply, tạo branch, drop và pop stash; v.v...
  + Hiển thị chi tiết commit và các thay đổi file bằng cách nhấn vào một commit. Trên giao diện chi tiết commit bạn có thể: xem sự khác biệt của bất kỳ file nào được thay đổi bằng cách nhấn vào nó; mở phiên bản hiện tại của bất kỳ file nào bị ảnh hưởng trong commit; sao chép đường dẫn của bất kỳ file nào bị ảnh hưởng trong commit vào clipboard; nhấn vào bất kỳ url HTTP/HTTPS nào trong phần nội dung của commit để mở nó trong trình duyệt web mặc định của bạn.
  + So sánh bất kỳ hai commit nào bằng cách nhấn vào một commit và sau đó nhấn CTRL/CMD + nhấn vào một commit khác. Trên giao diện so sánh commit bạn có thể: xem sự khác biệt của bất kỳ file nào được thay đổi giữa hai commit được chọn bằng cách nhấn vào nó; mở phiên bản hiện tại của bất kỳ file nào bị ảnh hưởng giữa hai commit được chọn; sao chép đường dẫn của bất kỳ file nào bị ảnh hưởng giữa hai commit được chọn vào clipboard.
  + Lọc các branch được hiển thị trong Git Graph sử dụng menu `Branches`. Các tùy chọn để lọc các branch là: hiển thị tất cả các branch; chọn một hoặc nhiều branch để xem; chọn từ một mảng tùy chỉnh của các mẫu glob (bằng cách thiết lập git-graph.customBranchGlobPatterns).
  + Và còn nhiều tính năng khác...

Đây là một extension tuyệt vời cho các lập trình viên sử dụng Git và Visual Studio Code, bởi vì với Git Graph, bạn không cần dùng thêm một ứng dụng nào khác để quản lý Git. Tất cả đều có thể thực hiện được trên VS Code, một cách vô cùng trực quan và dễ dàng.

## 3. Git History

![Version](https://img.shields.io/visual-studio-marketplace/v/donjayamanne.githistory?style=flat)
![Release Date](https://img.shields.io/visual-studio-marketplace/release-date/donjayamanne.githistory?style=flat)
![Downloads](https://img.shields.io/visual-studio-marketplace/d/donjayamanne.githistory?style=flat)
![Rating](https://img.shields.io/visual-studio-marketplace/r/donjayamanne.githistory?style=flat)
![Installs](https://img.shields.io/visual-studio-marketplace/i/donjayamanne.githistory?style=flat)

Git History là một extension cho Visual Studio Code, cho phép bạn xem và tìm kiếm lịch sử Git của repository, branch, file hoặc dòng code1. Extension này có thể giúp bạn khám phá và phân tích các commit, branch, tag, stash, v.v...

<img src="https://v1.screenshot.11ty.dev/https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Ddonjayamanne.githistory/opengraph/" loading='lazy' decoding='async'/>

- Link: [https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory](https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory)
- Chức năng:
  + Xem và tìm kiếm git log cùng với biểu đồ và thông tin chi tiết.
  + Xem bản sao trước đó của tập tin.
  + Xem và tìm kiếm lịch sử: Xem lịch sử của một hoặc tất cả các branch; Xem lịch sử của một tập tin; Xem lịch sử của một dòng trong tệp (Git Blame); Xem lịch sử của một tác giả.
  + So sánh: các branch, các commit, các file giữa các commit.
  + Hỗ trợ GitHub avatar, cherry-pick commit, tạo stash, branch, merge, rebase, reset, revert, v.v...
  
## 4. Prettier - Code formatter

![Version](https://img.shields.io/visual-studio-marketplace/v/esbenp.prettier-vscode?style=flat)
![Release Date](https://img.shields.io/visual-studio-marketplace/release-date/esbenp.prettier-vscode?style=flat)
![Downloads](https://img.shields.io/visual-studio-marketplace/d/esbenp.prettier-vscode?style=flat)
![Rating](https://img.shields.io/visual-studio-marketplace/r/esbenp.prettier-vscode?style=flat)
![Installs](https://img.shields.io/visual-studio-marketplace/i/esbenp.prettier-vscode?style=flat)

Prettier là một extension cho Visual Studio Code, giúp bạn định dạng code một cách tự động và nhất quán. Prettier hỗ trợ nhiều ngôn ngữ lập trình như `JavaScript`, `TypeScript`, `CSS`, `HTML`, `Markdown` và nhiều ngôn ngữ khác. Prettier là một công cụ hữu ích để tạo ra những đoạn code đẹp mắt và dễ đọc hơn.

<img src="https://v1.screenshot.11ty.dev/https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Desbenp.prettier-vscode/opengraph/" loading='lazy' decoding='async'/>

- Link: [https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- Chức năng:
  + Định dạng code một cách tự động và nhất quán theo các quy tắc được định nghĩa trước.
  + Hỗ trợ nhiều ngôn ngữ lập trình như JavaScript, TypeScript, CSS, HTML, Markdown và nhiều ngôn ngữ khác.
  + Tích hợp với hầu hết các trình biên dịch như VS Code, Webstorm, Atom, Sublime Text và nhiều trình biên dịch khác.
  + Dễ dàng sử dụng chỉ với một vài thiết lập hoặc có thể tùy biến theo ý muốn.
  + Giúp code dễ đọc và dễ bảo trì hơn.

## 5. ESLint

![Version](https://img.shields.io/visual-studio-marketplace/v/dbaeumer.vscode-eslint?style=flat)
![Release Date](https://img.shields.io/visual-studio-marketplace/release-date/dbaeumer.vscode-eslint?style=flat)
![Downloads](https://img.shields.io/visual-studio-marketplace/d/dbaeumer.vscode-eslint?style=flat)
![Rating](https://img.shields.io/visual-studio-marketplace/r/dbaeumer.vscode-eslint?style=flat)
![Installs](https://img.shields.io/visual-studio-marketplace/i/dbaeumer.vscode-eslint?style=flat)

ESlint là một linter dành cho ngôn ngữ lập trình JavaScript được viết bằng Node.js. ESlint thực sự rất hữu dụng bởi vì JavaScript là một ngôn ngữ thông dịch và được dịch trực tiếp thành mã máy, rất nhiều lỗi chỉ có thể phát hiện được trong thời gian chạy project. ESlint giúp bạn phân tích code, tìm những lỗi lặt vặt, không tuân thủ coding style, sai coding convention, và đưa ra những đề xuất cải tiến.

<img src="https://v1.screenshot.11ty.dev/https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Ddbaeumer.vscode-eslint/opengraph/" loading='lazy' decoding='async'/>

- Link: [https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- Chức năng:
  + Phân tích code JavaScript, tìm những lỗi lặt vặt, không tuân thủ coding style, sai coding convention, và đưa ra những đề xuất cải tiến.
  + Giúp bạn viết code JavaScript chất lượng hơn, dễ đọc và bảo trì hơn.
  + Hỗ trợ các plugin để mở rộng hoạt động của ESlint: eslint-plugin-react, eslint-plugin-vue, eslint-plugin-angular, v.v...
  + Hỗ trợ các parser khác nhau để phân tích cú pháp của JavaScript: esprima, babel-eslint, @typescript-eslint/parser, v.v...
  + Hỗ trợ các processor để xử lý các file có chứa nhiều ngôn ngữ khác nhau: markdown, html, vue, v.v...
  + Hỗ trợ các config có sẵn được sử dụng bởi các project nổi tiếng, ví dụ như eslint:recommended, airbnb, google, standard, v.v...

## 6. Auto Rename Tag

![Version](https://img.shields.io/visual-studio-marketplace/v/formulahendry.auto-rename-tag?style=flat)
![Release Date](https://img.shields.io/visual-studio-marketplace/release-date/formulahendry.auto-rename-tag?style=flat)
![Downloads](https://img.shields.io/visual-studio-marketplace/d/formulahendry.auto-rename-tag?style=flat)
![Rating](https://img.shields.io/visual-studio-marketplace/r/formulahendry.auto-rename-tag?style=flat)
![Installs](https://img.shields.io/visual-studio-marketplace/i/formulahendry.auto-rename-tag?style=flat)

Extension Auto Rename Tag là một extension rất hữu ích cho các nhà phát triển web sử dụng VS Code. Như tên gợi ý, Auto Rename Tag sẽ tự động đổi tên thẻ đóng khi bạn cập nhật thẻ mở và ngược lại. Bạn sẽ thấy extension này hữu ích không chỉ với HTML, mà còn với React với JSX.

<img src="https://v1.screenshot.11ty.dev/https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Dformulahendry.auto-rename-tag/opengraph/" loading='lazy' decoding='async'/>

- Link: [https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
- Chức năng: Tự động đổi tên thẻ đóng khi bạn cập nhật thẻ mở và ngược lại.

## 7. Live Server

![Version](https://img.shields.io/visual-studio-marketplace/v/ritwickdey.LiveServer?style=flat)
![Release Date](https://img.shields.io/visual-studio-marketplace/release-date/ritwickdey.LiveServer?style=flat)
![Downloads](https://img.shields.io/visual-studio-marketplace/d/ritwickdey.LiveServer?style=flat)
![Rating](https://img.shields.io/visual-studio-marketplace/r/ritwickdey.LiveServer?style=flat)
![Installs](https://img.shields.io/visual-studio-marketplace/i/ritwickdey.LiveServer?style=flat)

Extension Live Server là một plugin của Visual Studio Code, giúp bạn khởi chạy một máy chủ phát triển cục bộ với tính năng tải lại trình duyệt tự động cho các trang tĩnh và động.

<img src="https://v1.screenshot.11ty.dev/https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Dritwickdey.LiveServer/opengraph/" loading='lazy' decoding='async'/>

- Link: [https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- Chức năng:
  + Khởi chạy một máy chủ phát triển cục bộ với tính năng tải lại trình duyệt tự động cho các trang tĩnh và động.
  + Hỗ trợ nhiều ngôn ngữ lập trình như HTML, CSS, JavaScript, TypeScript, Markdown, v.v...
  + Hỗ trợ nhiều trình duyệt như Chrome, Firefox, Edge, v.v...
  + Hỗ trợ nhiều tính năng như Live Reload, Hot Reload, HTTPS, CORS, v.v...

## 8. Path Intellisense

![Version](https://img.shields.io/visual-studio-marketplace/v/christian-kohler.path-intellisense?style=flat)
![Release Date](https://img.shields.io/visual-studio-marketplace/release-date/christian-kohler.path-intellisense?style=flat)
![Downloads](https://img.shields.io/visual-studio-marketplace/d/christian-kohler.path-intellisense?style=flat)
![Rating](https://img.shields.io/visual-studio-marketplace/r/christian-kohler.path-intellisense?style=flat)
![Installs](https://img.shields.io/visual-studio-marketplace/i/christian-kohler.path-intellisense?style=flat)

Extension Path Intellisense là một plugin của Visual Studio Code, giúp bạn tự động hoàn thành tên tệp.

<img src="https://v1.screenshot.11ty.dev/https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Dchristian-kohler.path-intellisense/opengraph/" loading='lazy' decoding='async'/>

- Link: [https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
- Chức năng:
  + Tự động hoàn thành tên tệp.
  + Loại bỏ phần mở rộng tệp theo mặc định nếu câu lệnh là một câu lệnh import.
  + Hỗ trợ các thư viện Node.js.
  + Tự động thêm dấu gạch chéo khi điều hướng đến thư mục.
  + Tự động kích hoạt gợi ý tiếp theo khi chọn một gợi ý...

## 9. Material Icon Theme

![Version](https://img.shields.io/visual-studio-marketplace/v/PKief.material-icon-theme?style=flat)
![Release Date](https://img.shields.io/visual-studio-marketplace/release-date/PKief.material-icon-theme?style=flat)
![Downloads](https://img.shields.io/visual-studio-marketplace/d/PKief.material-icon-theme?style=flat)
![Rating](https://img.shields.io/visual-studio-marketplace/r/PKief.material-icon-theme?style=flat)
![Installs](https://img.shields.io/visual-studio-marketplace/i/PKief.material-icon-theme?style=flat)

Extension Material Icon Theme là một extension cho phép bạn thay đổi các biểu tượng của file và folder theo phong cách Material Design. Bạn có thể tùy chỉnh màu sắc, hình dạng và opacity của các biểu tượng, cũng như thêm các biểu tượng tùy chỉnh cho các file hoặc folder cụ thể.

<img src="https://v1.screenshot.11ty.dev/https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3DPKief.material-icon-theme/opengraph/" loading='lazy' decoding='async'/>

- Link: [https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)
- Chức năng:
  + Thay đổi các biểu tượng của file và folder theo phong cách Material Design, một hệ thống thiết kế đơn giản, hiện đại và thân thiện.
  + Tùy chỉnh màu sắc, hình dạng và opacity của các biểu tượng bằng cách sử dụng command palette hoặc user settings.
  + Thay đổi theme của các biểu tượng folder, có nhiều lựa chọn như classic, specific, blue, none….
  + Thêm các biểu tượng tùy chỉnh cho các file hoặc folder cụ thể bằng cách sử dụng user settings. Bạn có thể thêm các biểu tượng SVG của riêng bạn nếu muốn.
  + Thay đổi saturation của các biểu tượng, có thể làm chúng trông xám xịt hoặc hoàn toàn xám.

## 10. Live Share

![Version](https://img.shields.io/visual-studio-marketplace/v/MS-vsliveshare.vsliveshare?style=flat)
![Release Date](https://img.shields.io/visual-studio-marketplace/release-date/MS-vsliveshare.vsliveshare?style=flat)
![Downloads](https://img.shields.io/visual-studio-marketplace/d/MS-vsliveshare.vsliveshare?style=flat)
![Rating](https://img.shields.io/visual-studio-marketplace/r/MS-vsliveshare.vsliveshare?style=flat)
![Installs](https://img.shields.io/visual-studio-marketplace/i/MS-vsliveshare.vsliveshare?style=flat)

Extension Live Share là một extension cho phép bạn cộng tác với những người khác trên cùng một dự án một cách thời gian thực. Bạn có thể chia sẻ phiên làm việc của bạn với ai đó, cho phép họ chỉnh sửa code cũng như chia sẻ server và phiên gỡ lỗi.

<img src="https://v1.screenshot.11ty.dev/https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3DMS-vsliveshare.vsliveshare/opengraph/" loading='lazy' decoding='async'/>

- Link: [https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare)
- Chức năng:
  + Chỉnh sửa và gỡ lỗi cùng lúc, không cần phải đồng bộ code hoặc cấu hình các công cụ, thiết lập hoặc môi trường giống nhau.
  + Nhìn thấy con trỏ, vị trí và hành động của người khác trong file hiện tại.
  + Chuyển đổi giữa việc theo dõi hoặc khám phá các ý tưởng/nhiệm vụ một cách độc lập.
  + Sử dụng các tính năng gỡ lỗi của VS Code, như hovers, locals và watches, the stack trace hoặc the debug console.
  + Chia sẻ terminal và localhost web apps.
  + Chat với người khác trong phiên làm việc.

## 11. Settings Sync

![Version](https://img.shields.io/visual-studio-marketplace/v/Shan.code-settings-sync?style=flat)
![Release Date](https://img.shields.io/visual-studio-marketplace/release-date/Shan.code-settings-sync?style=flat)
![Downloads](https://img.shields.io/visual-studio-marketplace/d/Shan.code-settings-sync?style=flat)
![Rating](https://img.shields.io/visual-studio-marketplace/r/Shan.code-settings-sync?style=flat)
![Installs](https://img.shields.io/visual-studio-marketplace/i/Shan.code-settings-sync?style=flat)

Extension Setting Sync cho phép bạn đồng bộ các cấu hình như settings, keybindings, extensions, user snippets và UI state giữa các máy tính khác nhau. Bạn có thể sử dụng tài khoản Microsoft hoặc GitHub để đăng nhập và lưu trữ các cấu hình của bạn trên đám mây.

<img src="https://v1.screenshot.11ty.dev/https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3DShan.code-settings-sync/opengraph/" loading='lazy' decoding='async'/>

- Link: [https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync)
- Chức năng:
  + Đồng bộ tự động hoặc thủ công các cấu hình của bạn.
  + Tạo và quản lý nhiều profile cấu hình khác nhau.
  + Xem lịch sử và phiên bản của các cấu hình trên GitHub Gist.
  + Chỉnh sửa và tùy biến các cài đặt đồng bộ.
  + Đồng bộ các cài đặt theo từng nền tảng (Windows, Mac, Linux).

## 12. Quokka.js

![Version](https://img.shields.io/visual-studio-marketplace/v/WallabyJs.quokka-vscode?style=flat)
![Release Date](https://img.shields.io/visual-studio-marketplace/release-date/WallabyJs.quokka-vscode?style=flat)
![Downloads](https://img.shields.io/visual-studio-marketplace/d/WallabyJs.quokka-vscode?style=flat)
![Rating](https://img.shields.io/visual-studio-marketplace/r/WallabyJs.quokka-vscode?style=flat)
![Installs](https://img.shields.io/visual-studio-marketplace/i/WallabyJs.quokka-vscode?style=flat)

Extension Quokka.js là một extension cho Visual Studio Code, cho phép bạn viết và chạy `JavaScript` / `TypeScript` một cách nhanh chóng và dễ dàng. Giá trị của các biến và biểu thức được cập nhật và hiển thị ngay bên cạnh code của bạn, khi bạn đang gõ.

<img src="https://v1.screenshot.11ty.dev/https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3DWallabyJs.quokka-vscode/opengraph/" loading='lazy' decoding='async'/>

- Link: [https://marketplace.visualstudio.com/items?itemName=WallabyJs.quokka-vscode](https://marketplace.visualstudio.com/items?itemName=WallabyJs.quokka-vscode)
- Chức năng:
  + Chạy code ngay lập tức khi bạn gõ, không cần lưu file hoặc chuyển sang terminal.
  + Hiển thị các thông báo lỗi, console log và giá trị của các biểu thức ngay trong code.
  + Hiển thị chỉ số bao phủ code, cho biết code nào đã được chạy, code nào chưa hoặc chỉ chạy một phần.
  + Dùng Time Machine để di chuyển qua lại giữa các dòng code, xem giá trị của các biến, sửa code và bước vào, bước qua hoặc bước ra khỏi code.
  + Dùng Codeclip để chia sẻ code, kết quả và ghi âm Time Machine với mọi người.
  + Dùng Code Stories để xem code đang chạy trong một giao diện liên tục, chọn một biến hoặc biểu thức để xem giá trị của nó.
  + Dùng Value Explorer để xem và khám phá các giá trị không phải kiểu nguyên thủy trong một cây dễ dàng điều hướng.

## 13. Code Spell Checker

![Version](https://img.shields.io/visual-studio-marketplace/v/streetsidesoftware.code-spell-checker?style=flat)
![Release Date](https://img.shields.io/visual-studio-marketplace/release-date/streetsidesoftware.code-spell-checker?style=flat)
![Downloads](https://img.shields.io/visual-studio-marketplace/d/streetsidesoftware.code-spell-checker?style=flat)
![Rating](https://img.shields.io/visual-studio-marketplace/r/streetsidesoftware.code-spell-checker?style=flat)
![Installs](https://img.shields.io/visual-studio-marketplace/i/streetsidesoftware.code-spell-checker?style=flat)

Extension Code Spell Checker là một extension cho Visual Studio Code, cho phép bạn kiểm tra chính tả của code và tài liệu. Extension này có thể giúp bạn bắt được những lỗi chính tả thường gặp trong khi giảm thiểu số lượng các trường hợp báo lỗi sai

<img src="https://v1.screenshot.11ty.dev/https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Dstreetsidesoftware.code-spell-checker/opengraph/" loading='lazy' decoding='async'/>

- Link: [https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- Chức năng:
  + Hỗ trợ nhiều ngôn ngữ khác nhau, có thể cài đặt thêm các từ điển bổ sung.
  + Hỗ trợ các loại file khác nhau, như JavaScript, TypeScript, HTML, CSS, Markdown, LaTeX, v.v...
  + Cho phép tùy chỉnh danh sách các từ bỏ qua hoặc thêm vào từ điển.
  + Cho phép kiểm tra chính tả trong các comment, string hoặc cả file.
  + Cho phép sửa lỗi chính tả bằng cách gợi ý các từ đúng hoặc cho phép bạn nhập từ mới.

## 14. Better Comments

![Version](https://img.shields.io/visual-studio-marketplace/v/aaron-bond.better-comments?style=flat)
![Release Date](https://img.shields.io/visual-studio-marketplace/release-date/aaron-bond.better-comments?style=flat)
![Downloads](https://img.shields.io/visual-studio-marketplace/d/aaron-bond.better-comments?style=flat)
![Rating](https://img.shields.io/visual-studio-marketplace/r/aaron-bond.better-comments?style=flat)
![Installs](https://img.shields.io/visual-studio-marketplace/i/aaron-bond.better-comments?style=flat)

Extension Better Comments là một extension cho Visual Studio Code, cho phép bạn tùy chỉnh font chữ và độ trong suốt của các comment trong code. Extension này cũng thêm bốn loại comment khác nhau, mỗi loại có màu nền riêng biệt. Bạn có thể sử dụng các comment này để ghi chú, cảnh báo, lưu ý hoặc tạo các TODO list.

<img src="https://v1.screenshot.11ty.dev/https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Daaron-bond.better-comments/opengraph/" loading='lazy' decoding='async'/>

- Link: [https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)
- Chức năng:
  + Hỗ trợ nhiều ngôn ngữ lập trình, như C#, F#, VB.NET, C/C++, JavaScript, Python, HTML, và XAML.
  + Cho phép thay đổi font chữ, kích thước, in nghiêng và độ trong suốt của các comment.
  + Cho phép sử dụng các ký tự đặc biệt để đánh dấu các loại comment khác nhau, như `!` cho quan trọng, `?` cho câu hỏi, `todo` cho công việc cần làm, `x` hoặc `X` hoặc `//` cho gạch ngang.
  + Cho phép tùy chỉnh màu nền và font chữ cho mỗi loại comment.
  + Cho phép gạch chân hoặc chỉ tô màu từ khóa todo cho comment công việc.

## 15. Code Runner

![Version](https://img.shields.io/visual-studio-marketplace/v/formulahendry.code-runner?style=flat)
![Release Date](https://img.shields.io/visual-studio-marketplace/release-date/formulahendry.code-runner?style=flat)
![Downloads](https://img.shields.io/visual-studio-marketplace/d/formulahendry.code-runner?style=flat)
![Rating](https://img.shields.io/visual-studio-marketplace/r/formulahendry.code-runner?style=flat)
![Installs](https://img.shields.io/visual-studio-marketplace/i/formulahendry.code-runner?style=flat)

Extension Code Runner cho phép bạn chạy code của nhiều ngôn ngữ lập trình khác nhau một cách nhanh chóng và tiện lợi1. Extension này có thể giúp bạn kiểm tra và thử nghiệm code của bạn mà không cần phải chuyển sang terminal hoặc môi trường khác.

<img src="https://v1.screenshot.11ty.dev/https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Dformulahendry.code-runner/opengraph/" loading='lazy' decoding='async'/>

- Link: [https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner)
- Chức năng:
  + Hỗ trợ hơn 50 ngôn ngữ lập trình, như `C`, `C++`, `Java`, `JS`, `PHP`, `Python`, `Perl`, `Ruby`, `Go`, `Lua`, `Groovy`, `PowerShell`, `CMD`, `BASH`, `F#`, `C#`, `VBScript`, `TypeScript`, `CoffeeScript`, `Scala`, `Swift`, `Julia`, `Crystal`, `OCaml`, `R`, `AppleScript`, `Elixir`, `VB.NET`, `Clojure`, `Haxe`, `Obj-C`, `Rust`, `Racket`, `Scheme`, `AutoHotkey`, `AutoIt`, `Kotlin`, `Dart`, `Pascal`, `Haskell` và `Nim`.
  + Cho phép chạy code bằng cách nhấn nút Run Code hoặc sử dụng phím tắt `Ctrl+Alt+N`.
  + Cho phép dừng chạy code bằng cách nhấn nút Stop Code hoặc sử dụng phím tắt `Ctrl+Alt+M`.
  + Cho phép chạy code của file hiện tại hoặc của đoạn code được chọn.
  + Cho phép tùy chỉnh các cài đặt như thư mục làm việc hiện tại, lệnh chạy code cho từng ngôn ngữ hoặc cho toàn bộ extension.

## 16. REST Client

![Version](https://img.shields.io/visual-studio-marketplace/v/humao.rest-client?style=flat)
![Release Date](https://img.shields.io/visual-studio-marketplace/release-date/humao.rest-client?style=flat)
![Downloads](https://img.shields.io/visual-studio-marketplace/d/humao.rest-client?style=flat)
![Rating](https://img.shields.io/visual-studio-marketplace/r/humao.rest-client?style=flat)
![Installs](https://img.shields.io/visual-studio-marketplace/i/humao.rest-client?style=flat)

Extension REST Client là một extension cho Visual Studio Code, cho phép bạn gửi các yêu cầu HTTP và xem các phản hồi HTTP một cách dễ dàng và trực quan. Extension này có thể giúp bạn kiểm tra và phát triển các API RESTful mà không cần sử dụng các công cụ bên ngoài.

<img src="https://v1.screenshot.11ty.dev/https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Dhumao.rest-client/opengraph/" loading='lazy' decoding='async'/>

- Link: [https://marketplace.visualstudio.com/items?itemName=humao.rest-client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
- Chức năng:
  + Hỗ trợ gửi các yêu cầu HTTP với các phương thức khác nhau: GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS, v.v...
  + Hỗ trợ gửi các yêu cầu HTTP với các loại nội dung khác nhau: form-data, x-www-form-urlencoded, raw, binary, v.v...
  + Hỗ trợ gửi các yêu cầu HTTP với các tiêu đề (headers), tham số (parameters), biến (variables), chứng thực (authentication), v.v...
  + Hỗ trợ xem các phản hồi HTTP với các định dạng khác nhau: JSON, HTML, XML, v.v...
  + Hỗ trợ xem các thông tin chi tiết của phản hồi HTTP: mã trạng thái (status code), thời gian phản hồi (response time), kích thước phản hồi (response size), v.v...


**Disclaimer**: Nội dung bài viết này có tham khảo thêm từ [Bing AI](https://bing.com/chat), nếu có bất kỳ vấn đề nào liên quan đến bản quyền, vui lòng liên hệ với tôi để được gỡ bỏ.