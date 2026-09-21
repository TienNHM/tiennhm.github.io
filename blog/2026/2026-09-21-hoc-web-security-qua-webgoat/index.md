---
title: "Học web security từ đâu? 30 bài lab WebGoat theo nhóm OWASP"
slug: hoc-web-security-qua-webgoat
description: "30 bài lab WebGoat trên WebGoat 7 và WebGoat 2023.8, sắp lại theo ba nhóm OWASP mà chúng thực sự chạm tới: Injection Flaws, Broken Access Control và Security Misconfiguration. Kèm thứ tự nên làm, bài nào là tiền đề của bài nào, và những hiểu lầm hay gặp ở từng nhóm."
keywords: [hoc web security, webgoat, webgoat 2023.8, webgoat 7, owasp top 10, broken access control, idor, insecure direct object references, missing function level access control, session hijacking, spoofing authentication cookie, xxe, xml external entity, security misconfiguration, injection flaws, command injection, numeric sql injection, log spoofing, burp suite, zap proxy, webwolf, blind xxe, billion laughs, lab bao mat web, tan cong ung dung web, an toan thong tin, appsec]
tags: [web-security, webgoat, owasp, broken-access-control, xxe, injection-flaws]
authors: [tiennhm]
date: 2026-09-21
---

import { SummaryBox, FAQSection } from '@site/src/components/SEO';

# Học web security từ đâu?

<SummaryBox>
[Bộ tài liệu WebGoat](/docs/web-security) trong docs gồm 30 bài lab trải trên hai phiên bản: WebGoat 7 với nhóm Injection Flaws, và WebGoat 2023.8 tổ chức theo OWASP với hai nhóm A1 - Broken Access Control và A5 - Security Misconfiguration. Bài viết này không thêm bài lab mới, mà vẽ lại bản đồ của series: nó thực sự phủ được những lớp lỗ hổng nào, đâu là chỗ nên bắt đầu, phần nào là tiền đề cho phần nào, và những hiểu lầm hay gặp ở từng chặng. Mục tiêu là để bạn biết mình đang học gì trước khi mở từng trang.
</SummaryBox>

Cách học bảo mật web nhanh nhất không phải đọc lý thuyết về lỗ hổng, mà là tự tay khai thác một ứng dụng được dựng ra để bị khai thác. WebGoat là một app do OWASP phát hành, cố tình nhồi lỗ hổng vào để người học tấn công trong môi trường hợp pháp. [Bộ tài liệu này](/docs/web-security) là lời giải từng bước cho các bài lab của nó.

Có một điều cần nói rõ ngay để tránh kỳ vọng sai: series này **không** phủ hết OWASP Top 10. Nó tập trung vào ba nhóm, và trong mỗi nhóm cũng chỉ giải những bài mà docs thực sự có. Bài viết này sẽ nói chính xác đó là những nhóm nào, rồi đề xuất thứ tự đọc.

<!-- truncate -->

## Bản đồ: series này thực sự phủ được gì

Bộ tài liệu chia làm hai nhánh theo phiên bản WebGoat, và đây cũng là ranh giới cần nắm trước tiên.

Nhánh thứ nhất là [WebGoat 7](/docs/web-security/webgoat-7), phiên bản kinh điển, hiện trong docs chỉ có đúng một nhóm là [Injection Flaws](/docs/web-security/webgoat-7/injection-flaws) với ba bài. Nhánh thứ hai là [WebGoat 2023.8](/docs/web-security/webgoat-2023.8), bản hiện đại được sắp theo OWASP, gồm hai nhóm: [A1 - Broken Access Control](/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control) với 14 bài, và [A5 - Security Misconfiguration](/docs/web-security/webgoat-2023.8/A5-Security-Misconfiguration) với chuỗi 13 bài XXE.

Ánh xạ sang OWASP thì như sau. Broken Access Control chính là hạng mục đứng đầu OWASP Top 10 2021 (A01), còn XXE trong bản 2021 được gộp vào Security Misconfiguration (A05) chứ không còn đứng riêng như bản 2017. Nhóm Injection Flaws của WebGoat 7 rơi vào họ Injection. Ngoài ba họ đó, series **chưa** có các lab độc lập cho XSS, CSRF hay SSRF - riêng SSRF chỉ được nhắc như một hệ quả có thể có của XXE, không phải một bài riêng. Biết giới hạn này giúp bạn không đi tìm thứ docs không hứa.

## Chặng khởi động: Injection Flaws trên WebGoat 7

Nên bắt đầu ở đây, không phải vì đây là lỗ hổng dễ nhất, mà vì ba bài này nhẹ nhất về thao tác và nặng nhất về khái niệm - đúng thứ cần cho người mới.

[Command Injection](/docs/web-security/webgoat-7/injection-flaws/command-injection) đặt nền: khi ứng dụng đưa input người dùng thẳng vào một lệnh hệ điều hành mà không kiểm tra, attacker chèn được lệnh của mình lên server. [Numeric SQL Injection](/docs/web-security/webgoat-7/injection-flaws/numeric-sql-injection) chuyển ý tưởng đó sang tầng cơ sở dữ liệu: thao túng một mệnh đề `WHERE` dạng số để câu truy vấn trả về nhiều hơn mức đáng ra được phép. [Log Spoofing](/docs/web-security/webgoat-7/injection-flaws/log-spoofing) là bài dễ bị hiểu nhầm nhất - nó nói về việc chèn dữ liệu giả vào dòng log để đánh lừa người quản trị, và phần phòng chống trong docs còn nối sang chuyện cập nhật Log4j để vá CVE-2021-44228.

Ba trang này ngắn, thiên về giới thiệu và có video kèm theo. Đừng kỳ vọng ở đây có payload chi tiết như các nhóm sau; vai trò của chúng là cho bạn cái khung "input không kiểm soát thì đi tới đâu" trước khi vào phần nặng.

## Chặng chính: Broken Access Control, đọc theo mạch tăng dần

[Nhóm A1](/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control) là phần lớn nhất và đáng đầu tư nhất của series, 14 bài chia thành bốn cụm. Thứ tự đọc nên bám theo độ khó tăng dần chứ không theo thứ tự bảng chữ cái của thư mục.

### Hijack a Session: làm quen với việc quan sát

Bắt đầu bằng [Hijack a Session bài 01](/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/hijack-a-session-01), nơi docs giải thích các kiểu chiếm phiên: brute-force session ID, session fixation và session theft. [Bài 02](/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/hijack-a-session-02) là bài thực chiến đầu tiên của cả series: docs chỉ ra cookie `hijack_cookie` có dạng "số tuần tự - timestamp Unix", nên chỉ cần thu thập vài cookie là đoán được một giá trị hợp lệ nằm xen giữa. Đây là chỗ Burp Suite hoặc ZAP xuất hiện lần đầu, và kỹ năng "gửi nhiều request rồi so sánh" học ở đây sẽ dùng lại suốt phần còn lại.

### IDOR: sáu bài đi từ khái niệm tới sửa dữ liệu người khác

Cụm IDOR là xương sống của nhóm A1, và sáu bài được thiết kế như một đường dốc liên tục - đọc nhảy cóc sẽ hụt.

[Bài 01](/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/insecure-direct-object-references-01) định nghĩa IDOR và cho hàng loạt ví dụ đổi `id` trên URL. [Bài 02](/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/insecure-direct-object-references-02) đặt ra nguyên tắc mấu chốt của cả nhóm - "authenticate first, abuse authorization later": trước tiên đăng nhập hợp lệ (docs dùng tài khoản `tom`/`cat`), rồi mới lạm dụng phân quyền. [Bài 03](/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/insecure-direct-object-references-03) dạy một thói quen nền tảng: so sánh response thô từ server với những gì hiển thị trên UI, để phát hiện các trường bị ẩn như `role` và `userId`. Chính hai trường lấy được ở bài 03 là dữ liệu đầu vào cho [bài 04](/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/insecure-direct-object-references-04), nơi bạn đoán mẫu URL để xem hồ sơ của chính mình qua một đường dẫn trực tiếp - đây là lý do không nên bỏ bài 03.

Có được mẫu URL rồi, [bài 05](/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/insecure-direct-object-references-05) mới là cú khai thác thật: đổi ID để xem hồ sơ người khác, rồi đổi luôn method từ `GET` sang `PUT` để sửa hồ sơ của họ. [Bài 06](/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/insecure-direct-object-references-06) khép cụm bằng phía phòng thủ: phân biệt kiểm soát truy cập ngang và dọc, ma trận phân quyền theo endpoint, và ý tưởng dùng tham chiếu gián tiếp thay cho ID thật. Hiểu lầm hay gặp ở đây là coi tham chiếu gián tiếp như một cách vá đủ - docs nói rõ nó chỉ là một lớp phụ, không thay được việc kiểm tra quyền ở backend.

### Missing Function Level Access Control: khi ẩn không phải là chặn

Cụm [MFLAC](/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/missing-function-level-access-control-01) mở đầu bằng một phân biệt quan trọng mà nhiều người gộp lẫn: IDOR là kiểm soát *nội dung dữ liệu* được truy cập, còn MFLAC là kiểm soát *quyền gọi một chức năng*. Nếu chưa nắm chắc IDOR thì phần này dễ bị mờ, nên MFLAC nên đọc sau cụm IDOR.

[Bài 02](/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/missing-function-level-access-control-02) tấn công lối "bảo mật bằng cách giấu": menu ẩn qua CSS `display:none` hoặc HTML comment vẫn lộ ra khi xem source, và docs tìm ra hai mục ẩn là `Users` với `Config`. [Bài 03](/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/missing-function-level-access-control-03) khai thác đúng endpoint `/users` vừa lộ để moi hash của một tài khoản, bằng cách chỉnh request qua proxy. [Bài 04](/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/missing-function-level-access-control-04) là bài tinh tế nhất: sau khi công ty "đã vá", docs cho thấy vẫn tính lại được hash vì thuật toán chỉ là `SHA-256(password + salt + username)` với salt cố định lộ sẵn - một bài học về việc vá UI không phải là vá lỗ hổng.

### Spoofing an Authentication Cookie: chốt lại tư duy toàn vẹn

Hai bài cuối cụm A1 nói về [giả mạo cookie xác thực](/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/spoofing-an-authentication-cookie-01): vì sao cookie dễ bị đoán, và các thuộc tính `Secure`, `HttpOnly`, `SameSite` để phòng. [Bài 02](/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/spoofing-an-authentication-cookie-02) mô tả kịch bản kinh điển: cookie chỉ là username mã hóa Base64, đổi `webgoat` thành `tom` rồi mã hóa lại là đăng nhập được sang tài khoản khác, vì hệ thống không kiểm tra chữ ký. Thông điệp gói lại cả nhóm A1: nếu tính toàn vẹn không được ký và kiểm ở server, mọi thứ phía client đều có thể bị chỉnh.

## Chặng khó nhất: XXE trong Security Misconfiguration

Để dành [nhóm A5](/docs/web-security/webgoat-2023.8/A5-Security-Misconfiguration) sau cùng là có lý do. Chuỗi 13 bài XXE đòi hỏi bạn đã quen chặn và chỉnh request - kỹ năng gây dựng suốt nhóm A1 - vì gần như bài nào cũng phải sửa request qua Burp/ZAP.

Bốn bài đầu xây khái niệm: [bài 01](/docs/web-security/webgoat-2023.8/A5-Security-Misconfiguration/XXE-01) giới thiệu XXE và ba hệ quả (đọc file, SSRF, DoS); [bài 02](/docs/web-security/webgoat-2023.8/A5-Security-Misconfiguration/XXE-02) phân loại entity nội bộ, ngoại vi và tham số; [bài 03](/docs/web-security/webgoat-2023.8/A5-Security-Misconfiguration/XXE-03) và [bài 04](/docs/web-security/webgoat-2023.8/A5-Security-Misconfiguration/XXE-04) dựng payload đọc `/etc/passwd` và liệt kê thư mục gốc. [Bài 05](/docs/web-security/webgoat-2023.8/A5-Security-Misconfiguration/XXE-05) chỉ ra một cái bẫy thực tế đáng nhớ: JavaScript của trang tự bọc input vào cặp thẻ, nên dán payload thẳng vào ô comment sẽ hỏng - phải chặn request rồi thay cả body.

Cụm giữa xoáy vào nguyên nhân gốc. [Bài 06](/docs/web-security/webgoat-2023.8/A5-Security-Misconfiguration/XXE-06) là bài code review đọc kỹ đáng giá: nó lần vào mã Jackson `XmlMapper` để cho thấy vì sao truyền sẵn một `XMLInputFactory` lại khiến nhánh tắt external entity không bao giờ chạy. [Bài 07](/docs/web-security/webgoat-2023.8/A5-Security-Misconfiguration/XXE-07) và [bài 08](/docs/web-security/webgoat-2023.8/A5-Security-Misconfiguration/XXE-08) khai thác cùng ý đó trên REST API hiện đại bằng cách đổi `Content-Type` từ JSON sang XML. [Bài 09](/docs/web-security/webgoat-2023.8/A5-Security-Misconfiguration/XXE-09) chuyển hướng sang DoS với Billion Laughs Attack - entity lồng nhau phình từ vài trăm byte thành hàng GB.

Hai bài Blind XXE là đỉnh khó của cả series. [Bài 10](/docs/web-security/webgoat-2023.8/A5-Security-Misconfiguration/XXE-10) giới thiệu WebWolf như máy chủ nhận dữ liệu out-of-band khi response không trả kết quả trực tiếp, còn [bài 11](/docs/web-security/webgoat-2023.8/A5-Security-Misconfiguration/XXE-11) ghép mọi thứ lại: host một file `attack.dtd` trên WebWolf, dùng parameter entity để đọc `secret.txt` trên WebGoat rồi tuồn nội dung ra ngoài qua HTTP. Nếu chưa hiểu parameter entity ở bài 02 thì bài 11 sẽ như ma thuật, nên đừng nhảy thẳng vào đây.

Series khép lại bằng phòng thủ: [bài 12](/docs/web-security/webgoat-2023.8/A5-Security-Misconfiguration/XXE-12) tổng hợp cách tắt DTD và external entity, kiểm soát `Content-Type`, và ưu tiên JSON khi có thể; [bài 13](/docs/web-security/webgoat-2023.8/A5-Security-Misconfiguration/XXE-13) chỉ cách để SonarQube phát hiện đúng lỗ hổng XXE trong mã nguồn - đóng vòng từ khai thác sang phát hiện tự động.

## Tóm lại nên đọc theo thứ tự nào

Gợi ý một mạch đọc dựa trên cách series được dựng: khởi động với ba bài Injection Flaws của WebGoat 7 để có khung khái niệm; sang nhóm A1 theo cụm Hijack Session, rồi IDOR sáu bài liền mạch, rồi MFLAC, rồi Spoofing Cookie; cuối cùng mới vào chuỗi XXE của A5, đọc tuần tự từ bài 01 vì các bài sau dựa hẳn vào khái niệm entity của bài trước. Sau chặng A1 bạn nên chặn và chỉnh được request bằng proxy; sau chặng A5 bạn nên đọc được vì sao một XML parser cấu hình sai lại nguy hiểm và cấu hình lại nó cho an toàn.

<FAQSection
  title="Mấy câu hay được hỏi về bộ lab này"
  items={[
    {
      question: "Nên bắt đầu từ WebGoat 7 hay WebGoat 2023.8?",
      answer: "Theo cách bộ tài liệu được dựng thì nên bắt đầu ở nhóm Injection Flaws của WebGoat 7, vì ba bài đó nhẹ về thao tác và thiên về giới thiệu khái niệm, hợp làm bước khởi động. Sau đó chuyển sang WebGoat 2023.8 để vào phần thực chiến sâu hơn ở A1 và A5. Docs tách hai phiên bản thành hai nhánh riêng nên bạn có thể theo dõi rõ ranh giới này."
    },
    {
      question: "IDOR và Missing Function Level Access Control khác nhau chỗ nào?",
      answer: "Bài Missing Function Level Access Control 01 trong docs nói rõ: IDOR là kiểm soát nội dung dữ liệu được truy cập, ví dụ đổi ID để xem hồ sơ người khác; còn MFLAC là kiểm soát quyền gọi một chức năng, ví dụ gọi thẳng một API quản trị mà lẽ ra chỉ admin dùng được. Vì hai lỗ hổng dễ bị gộp lẫn nên bộ tài liệu đặt cụm IDOR trước rồi mới tới MFLAC."
    },
    {
      question: "Cần công cụ gì để làm được các bài trong series?",
      answer: "Xuyên suốt phần WebGoat 2023.8, các bài đều dùng một proxy chặn và chỉnh request là Burp Suite hoặc ZAP, xuất hiện lần đầu ở bài Hijack a Session 02. Riêng chuỗi Blind XXE ở bài 10 và 11 còn cần WebWolf, công cụ đi kèm WebGoat, để làm máy chủ nhận dữ liệu out-of-band. Vì vậy nên làm A1 trước để quen proxy rồi mới sang XXE."
    },
    {
      question: "Blind XXE trong docs khác XXE thường ở điểm nào?",
      answer: "Theo bài XXE 10, Blind XXE là biến thể mà kết quả không hiện trực tiếp trong response, do output bị ẩn, nội dung chứa ký tự XML không hợp lệ, hoặc bị cơ chế bảo vệ chặn. Cách xác nhận là đẩy dữ liệu ra một server do người tấn công kiểm soát, ở đây là WebWolf. Bài 11 minh họa việc host file attack.dtd để đọc secret.txt rồi gửi nội dung ra ngoài qua HTTP."
    },
    {
      question: "Bộ tài liệu này có phủ hết OWASP Top 10 không?",
      answer: "Không. Series hiện tập trung vào Injection Flaws của WebGoat 7, cùng hai nhóm A1 - Broken Access Control và A5 - Security Misconfiguration của WebGoat 2023.8. Các lớp lỗ hổng như XSS hay CSRF chưa có lab riêng trong docs; SSRF chỉ được nhắc như một hệ quả có thể có của XXE chứ không phải một bài độc lập."
    }
  ]}
/>
