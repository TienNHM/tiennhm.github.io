---
title: "Commit thứ ba của dự án là của tôi: 20 tháng xây một nền tảng CRM 18 microservice"
slug: founding-engineer-nen-tang-crm-abp-dotnet-angular
description: "Chuyện nghề từ vị trí founding engineer của một nền tảng CRM doanh nghiệp: 18 microservice ABP/.NET 9, 13 Angular library, ~8.500 commit (27% toàn repo, top 1 trên 25 dev), 228 EF Core migration. Bài viết kể lại những quyết định kỹ thuật đáng nhớ nhất — mô hình phân quyền theo bản ghi, một lần nâng Angular thất bại phải revert, và cách tách bounded context Messaging sang service khác bằng feature-toggle dual-read mà không downtime."
keywords: [founding engineer, abp framework, abp 9.3, dotnet 9, angular 20, primeng, clickhouse, microservices, bounded context, strangler fig, feature toggle, dual read, record level permission, ownership filter, ef core migration, signalr, omnichannel chat, gitops, helm, kubernetes, openiddict, yarp, architecture decision record, adr, fullstack developer, crm platform, devex, kinh nghiem lam san pham, kien truc microservice]
tags: [career, architecture, dotnet, abp, angular, microservices, clickhouse, devops, product]
authors: [tiennhm]
date: 2026-09-15
---

import { SummaryBox, FAQSection, Checklist } from '@site/src/components/SEO';

# Commit thứ ba của dự án là của tôi

<SummaryBox>
Tháng 01/2025, một repo CRM doanh nghiệp được khởi tạo. Commit thứ ba của cả dự án là của tôi: dựng schema database và project skeleton. 20 tháng sau, sản phẩm đó là **18 microservice** trên [ABP Framework](https://abp.io/) / [.NET 9](https://learn.microsoft.com/en-us/dotnet/core/whats-new/dotnet-9) và **13 Angular library**, còn tôi đứng ở **~8.500 commit** — chiếm **27% toàn bộ monorepo** và gấp hơn hai lần người đứng thứ hai, trên tổng 25 developer. Bài này không kể thành tích, kể **quyết định**: vì sao mô hình phân quyền theo bản ghi là thứ khó thay thế nhất, một lần nâng Angular thất bại phải revert rồi 4 tháng sau làm lại thành công, và cách tách một bounded context ra service khác bằng feature-toggle dual-read mà không ai phải tắt hệ thống.
</SummaryBox>

Có một chi tiết trong `git log` mà tôi thích hơn mọi dòng nào khác trong CV của mình.

```bash
git log --reverse --format="%h %ad %an %s" --date=short | head -5
```

Dòng thứ ba trả về tên tôi, ngày **14/01/2025**, với message gọn lỏn: `Init - Databases, projects`.

Không phải join giữa chừng để "maintain". Không phải nhận một codebase có sẵn rồi thêm màn hình. Mà là có mặt từ lúc repo còn trống, và ở lại đủ lâu để thấy thứ mình dựng trong ba ngày đầu vẫn đang được cả team dùng ở tháng thứ hai mươi.

Bài này là bản kể lại 20 tháng đó — và vì sản phẩm thuộc doanh nghiệp nên tôi ẩn mọi tên riêng: tên sản phẩm, tên repo, tên khách hàng, tên các library nội bộ. **Tech stack thì để nguyên**, vì đó mới là phần đáng nói với anh em làm nghề.

<!-- truncate -->

## Ba ngày đầu quyết định 20 tháng sau

Tuần đầu tiên của một dự án là tuần có đòn bẩy cao nhất. Không phải vì code nhiều, mà vì mọi thứ viết ra lúc đó sẽ được sao chép hàng nghìn lần sau này.

Ba việc tôi làm trong ba ngày đầu:

**1. Schema database + project skeleton.** Toàn bộ cấu trúc solution, quy ước đặt tên, ranh giới module.

**2. Nâng [ABP](https://abp.io/docs/latest) lên `9.0.3` để sửa Swagger.** Một bug nhỏ của bản cũ làm trang API doc không load. Ba ngày đầu là lúc rẻ nhất để nâng version — sau này mỗi lần nâng là một chiến dịch (xem phần dưới, tôi trả giá đủ rồi).

**3. Hạ tầng sinh Angular proxy tự động.** Đây mới là thứ có tuổi thọ dài nhất: một cặp file cấu hình `generate-proxy.json` cùng script Node chạy [ABP service proxy schematics](https://abp.io/docs/latest/framework/ui/angular/service-proxies), sinh toàn bộ service client TypeScript từ API .NET.

Việc thứ ba đáng nói riêng. Nó chỉ là một script. Nhưng nó có nghĩa là trong 20 tháng sau đó, **không một developer nào trong team phải viết tay một DTO hay một HTTP client nào**. Backend đổi contract, chạy lại một lệnh, frontend có type mới kèm lỗi compile chỉ đúng chỗ cần sửa.

> Bài học đầu tiên và cũng là cái tôi nhắc nhiều nhất khi mentor: **trong tuần đầu, hãy ưu tiên thứ nhân bản được hơn thứ chạy được.** Một màn hình chạy được phục vụ một nghiệp vụ. Một pipeline sinh code phục vụ mọi nghiệp vụ còn chưa ai nghĩ ra.

## Con số, để dễ hình dung quy mô

Tôi quét `git log` toàn bộ các repo của sản phẩm, lọc theo email của mình. Đây là kết quả:

| Chỉ số | Số liệu |
| --- | --- |
| Commit của tôi trong monorepo chính | **8.059** / 29.607 — **27%** |
| Xếp hạng trong team 25 dev | **Top 1** (người thứ hai: 3.696) |
| Commit thực, không tính merge | 2.851 |
| Lượt file thay đổi | 44.703 |
| [EF Core migration](https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations/) tự viết | **228** |
| File test ([xUnit](https://xunit.net/) + spec) | 187 |
| Angular library đã làm việc trên đó | **13 / 13** |
| Backend service đã làm việc trên đó | **18** |
| Commit [GitOps](https://opengitops.dev/) môi trường QA | 371 |
| Commit promote QA → UAT (17 service) | 95 |
| Work item [Azure DevOps](https://learn.microsoft.com/en-us/azure/devops/boards/) gắn trực tiếp vào commit | 35 |

Cộng cả các repo phụ: **~8.541 commit**.

Hai lưu ý để trung thực với số liệu, vì tôi tin một CV bị hỏi ngược mà trả lời được thì mạnh hơn một CV có số to:

- Con số dòng code (`+4.32M / −2.60M`) tôi **không dùng**, vì nó bị bơm bởi proxy sinh tự động và lockfile. Số commit, số migration, số service thì không bơm được.
- Có một quãng ba tháng giữa năm 2026 tôi gần như không commit vào repo này (làm việc khác). Nên tôi ghi "01/2025 – nay", không ghi "20 tháng liên tục".

## Phần khó thay thế nhất: phân quyền theo bản ghi

Nếu chỉ được giữ lại một đóng góp, tôi chọn cái này.

CRM doanh nghiệp có một yêu cầu nghe đơn giản mà làm thì rất dễ sai: **hai người cùng mở một danh sách Lead phải thấy hai tập dữ liệu khác nhau** — và sự khác nhau đó phụ thuộc vào ai sở hữu bản ghi, ai là quản lý của ai, bản ghi được chia sẻ cho ai, người dùng thuộc cơ sở nào.

Cách làm sai mà hầu hết dự án đều đi qua: thêm `if` vào từng service. Rồi mỗi entity mới lại copy đoạn `if` đó. Sáu tháng sau không ai dám sửa, và luôn có đúng một chỗ bị quên — thường là màn hình export.

Cách chúng tôi làm, tập trung vào một tầng duy nhất:

- **`EntityAccessPolicy`** — khai báo quyền trên từng loại entity, thay vì rải rác trong code nghiệp vụ.
- **`AttributePermission`** — phân quyền **tới từng field**. Sales thấy tên khách; chỉ quản lý thấy giá trị hợp đồng. Cùng một API, cùng một DTO.
- **`ApplyOwnershipFilterAsync`** — một hàm duy nhất áp filter sở hữu vào [IQueryable](https://learn.microsoft.com/en-us/dotnet/api/system.linq.iqueryable), dùng chung cho Lead, Account, Order, CrmTask và mọi entity thêm sau.
- **`GetUserIdsUnderManagerAsync` + cache** — giải cây phân cấp quản lý một lần rồi cache, chứ không truy vấn đệ quy mỗi request.

Điểm quan trọng không nằm ở tên hàm. Nó nằm ở chỗ: **quyền được áp ở tầng query, không phải tầng UI.** Ẩn cột trên giao diện là trang trí; lọc ở `IQueryable` mới là bảo mật. Mọi API mới sau đó tự động được bảo vệ mà lập trình viên không cần nhớ gì cả — đó là thứ duy nhất có thể sống nổi qua 25 developer và hàng trăm endpoint.

Cùng thời gian này là một **dynamic filter engine** (`GetFilterableFields`, `FilterOperatorType`) để người dùng cuối tự dựng điều kiện lọc, và các module nghiệp vụ: Lead, Account, Order, Quotation, Product Catalog, Pricebook, Ticket, Contract (sinh file Word/PDF), Call Log tích hợp tổng đài.

## Design system: khi bạn viết code mà 24 người khác dùng

Nửa sau 2025, tôi chuyển nhiều sức sang tầng frontend platform. Library dùng chung của sản phẩm trở thành **thư mục có nhiều lượt thay đổi nhất toàn repo — 11.987 lượt file**.

Trong đó có: bộ component nghiệp vụ dùng chung, [PrimeNG](https://primeng.org/) được tuỳ biến lại, theme token cho chế độ dark và dim, sidebar, pagination, table helper, shared-ui.

Việc này khác hẳn làm feature, ở một điểm đau: **bug của bạn không còn là bug của một màn hình.** Sửa sai một token màu, 40 màn hình lệch cùng lúc. Đổi signature một component, cả team compile lỗi.

Nhưng đổi lại, đây là vị trí đòn bẩy cao nhất trong một team frontend đông người. Một lần tối ưu table helper là mọi bảng trong sản phẩm nhanh hơn. Một lần chuẩn hoá theme token là mọi màn hình mới sinh ra đã đúng thiết kế, không cần ai review màu sắc nữa.

> Nếu bạn muốn nhảy từ mid lên senior: hãy tìm cách sở hữu **hạ tầng** mà team đứng trên, đừng đếm số màn hình đã làm.

## Lần nâng Angular thất bại — và 4 tháng sau làm lại

Phần này tôi đưa vào có chủ ý, vì một bài kể chuyện nghề mà chỉ có thành công thì không đáng đọc.

Tháng 11/2025, tôi nâng [Angular](https://angular.dev/) 19 lên 20 cho toàn bộ 13 library. **Thất bại. Phải revert.**

Lý do không phải Angular. Lý do là tôi làm cùng lúc quá nhiều thứ: nâng framework, đồng thời xử lý breaking change của PrimeNG với việc đổi `p-dropdown` sang [`p-select`](https://primeng.org/select) rải khắp hàng trăm template, trong khi các team feature vẫn đang merge vào cùng nhánh mỗi ngày. Diff phình tới mức không ai review nổi, và mỗi lần rebase lại sinh conflict mới. Revert là quyết định đúng.

Tháng 03/2026, làm lại và thành công. Khác biệt ở cách chia việc:

<Checklist
  title="Cách nâng major version trên monorepo nhiều team"
  items={[
    { text: "Tách breaking change của thư viện UI ra trước, thành PR riêng, merge độc lập với việc nâng framework", checked: true },
    { text: "Dùng đúng lộ trình chính thức của Angular Update Guide thay vì tự nâng package.json bằng tay", checked: true },
    { text: "Chốt một cửa sổ đóng băng merge ngắn, thay vì nâng song song với luồng feature", checked: true },
    { text: "Nâng library theo thứ tự phụ thuộc, build xanh từng bước, không gộp 13 library vào một commit", checked: true },
    { text: "Chấp nhận revert sớm khi diff vượt ngưỡng review được — revert rẻ hơn debug một nhánh chết", checked: true }
  ]}
/>

Lộ trình chính thức nằm ở [Angular Update Guide](https://angular.dev/update-guide) — công cụ này liệt kê đúng từng bước theo cặp version, và nó đáng tin hơn trực giác của bạn rất nhiều.

Toàn bộ chặng đường nâng cấp nền tảng, tính từ ngày đầu: **ABP 9.0 → 9.3.6**, **.NET SDK 9.0.101**, **Angular 16 → 20**, PrimeNG migration — và không có lần phát hành nào bị gián đoạn vì việc này. Hiện tôi đang khảo sát đường nâng tiếp lên ABP 10.x và .NET 10.

## Omnichannel: dựng một chat service gần như một mình

Quý 1/2026 là quãng vui nhất. Nhiệm vụ: thêm năng lực hội thoại đa kênh vào CRM.

Kết quả là một service riêng, gồm:

- **Chat Inbox** — thread hội thoại, gán tag, zen mode để tư vấn viên tập trung, copy link chia sẻ hội thoại nội bộ.
- **Tích hợp kênh Facebook/Messenger** qua nền tảng trung gian, chuẩn hoá webhook về một schema chung.
- **Realtime bằng [SignalR](https://learn.microsoft.com/en-us/aspnet/core/signalr/introduction)** — tin nhắn, trạng thái đang gõ, phân phối hội thoại.
- **Telephony**: Hotline, Queue, Agent, Extension, Queue Membership — mô hình tổng đài đầy đủ, cắm với [Stringee](https://stringee.com/) webphone để gọi ngay trên trình duyệt.
- **Tạo Lead trực tiếp từ hội thoại** — mắt nối quan trọng nhất, biến chat từ kênh hỗ trợ thành kênh bán hàng.

Điều tôi học được ở đây là về **realtime ở tầng hạ tầng**: SignalR chạy một instance thì đẹp như demo; chạy nhiều pod trên [Kubernetes](https://kubernetes.io/docs/concepts/) thì bạn phải trả lời câu hỏi "user này đang nối vào pod nào" trước khi viết dòng code nghiệp vụ đầu tiên.

## Đóng góp tôi tự hào nhất: tách bounded context mà không downtime

Quý 3/2026. Bài toán: module quản lý mẫu tin nhắn (`MessageTemplate`) đang nằm sai chỗ — nó sống trong hai service khác nhau, trong khi về mặt [bounded context](https://martinfowler.com/bliki/BoundedContext.html) nó thuộc về service thông báo. Ba service khác đang gọi vào nó mỗi ngày, trên hệ thống đang chạy thật.

Cách làm ngây thơ: một PR lớn, đổi hết, deploy đêm thứ Bảy, cầu nguyện.

Cách chúng tôi làm, theo tinh thần [Strangler Fig](https://martinfowler.com/bliki/StranglerFigApplication.html) và [branch by abstraction](https://martinfowler.com/bliki/BranchByAbstraction.html):

1. **Dựng nguồn mới song song** ở service thông báo, dữ liệu cũ vẫn nguyên tại chỗ.
2. **Feature toggle đọc hai nguồn (dual-read).** Bật cờ thì đọc nguồn mới, tắt cờ thì đọc nguồn cũ — đổi bằng cấu hình, không cần deploy.
3. **Cutover từng caller một**, theo slice: Ticket trước, rồi Campaign, rồi service còn lại. Mỗi slice là một PR nhỏ, review được, rollback được trong vài giây bằng cách tắt cờ.
4. **Verify trên QA sau từng slice** rồi mới sang slice tiếp theo.

Kết quả: **zero downtime, zero big-bang deploy**, và ở mỗi thời điểm luôn có đúng một nút để quay lại.

> Đây là thứ tôi sẽ mang đi kể ở mọi buổi phỏng vấn kiến trúc. Không phải vì nó phức tạp — mà vì nó **nhàm chán một cách có chủ ý**. Migration tốt thì người dùng không biết nó đã xảy ra.

Cùng quý, tôi dựng lại một service khác theo layout [ABP single-layer (nolayer)](https://abp.io/docs/latest/solution-templates/single-layer-web-application), đổi namespace toàn bộ và phục hồi pipeline build cho nó.

## ClickHouse, phân khúc khách hàng, và cái bẫy đệ quy tiếng Việt

Module phân khúc khách hàng (Segment) chạy trên [ClickHouse](https://clickhouse.com/docs), gồm:

- **Filter builder động** — toán tử ngày tương đối ("trong 30 ngày qua"), `NotBetween`, [`ILIKE`](https://clickhouse.com/docs/en/sql-reference/functions/string-search-functions) cho tìm kiếm không phân biệt hoa thường.
- **Đếm audience theo người, không theo số điện thoại.** Nghe nhỏ nhưng đây là lỗi kinh điển làm mọi báo cáo marketing sai: một người có ba số điện thoại bị đếm thành ba khách hàng.
- **Loại trừ lead đã convert hoặc đã merge** khỏi phép đếm.
- **Breakdown theo cơ sở** và **scope preview theo đúng quyền của người đang xem** — nối lại với mô hình phân quyền ở phần trên.

Và một cái bẫy đáng ghi thành [ADR](https://adr.github.io/) riêng: so khớp tiếng Việt không dấu. Khi bạn cài extension [`unaccent`](https://www.postgresql.org/docs/current/unaccent.html) của PostgreSQL rồi bọc nó trong một hàm **cùng tên** ở schema `public`, hàm đó **gọi lại chính nó** — đệ quy vô hạn, query treo. Chi tiết nằm trong ADR-005 của dự án, cùng với thứ tự deploy extension so với migration phụ thuộc vào nó.

Ngoài Segment, quý này còn có **send-log tin nhắn xuyên ba service** (`UNION` dữ liệu từ ba nguồn khác nhau) kèm export nền ra Excel/SharePoint.

## Phần không ai bắt làm, nhưng làm rồi thì khác hẳn

Đây là mảng tôi nghĩ tạo nên khác biệt giữa "dev làm feature" và "engineer làm sản phẩm".

**Một CLI quản lý service cục bộ.** Monorepo 18 service thì `dotnet run` bằng tay là bất khả thi. Tôi viết một CLI nội bộ dựa trên [PM2](https://pm2.keymetrics.io/docs/usage/quick-start/): chạy/dừng/xem log theo tên service, chế độ build tiết kiệm RAM cho máy yếu, cờ `--with-tests`. Cả team dùng hằng ngày.

**Bộ chuẩn code tự động kiểm tra.** Các rule về comment ngắn gọn, kiểm tra việc đang làm dở, chuẩn viết .NET service, chuẩn khai báo permission — kèm script check tự động thay vì trông vào review thủ công.

**ADR và lessons-learned sau mỗi sự cố.** Identity service `CrashLoopBackOff`; migration không đồng nhất giữa các service; thứ tự deploy extension database. Mỗi sự cố một tài liệu ngắn. Viết 20 phút, tiết kiệm cho người sau vài giờ.

**Sửa ở tầng hạ tầng, không sửa ở tầng triệu chứng.** Scope [OpenIddict](https://documentation.openiddict.com/) giữa các service; [ABP dynamic C# client](https://abp.io/docs/latest/framework/api-development/dynamic-csharp-clients) yêu cầu controller phải implement interface; routing của [YARP](https://microsoft.github.io/reverse-proxy/) ở gateway; [HealthChecksUI](https://github.com/Xabaril/AspNetCore.Diagnostics.HealthChecks) bind sai địa chỉ trên Kubernetes.

**Fix bug có bằng chứng.** Giai đoạn gần đây, 35 work item Azure DevOps được gắn thẳng vào commit message, mỗi bug một nhánh `fix/AB{id}`, và có unit test kèm theo — ví dụ bộ test cho resolver kiểm tra quyền chia sẻ khi tạo Booking/Task.

Song song là **371 commit GitOps** cho môi trường QA ([Helm](https://helm.sh/docs/) values, configmap, identity client, image tag) và **95 commit** promote 17 service lên UAT. Phần này ít ai đưa vào CV, nhưng nó là câu trả lời cho câu hỏi phỏng vấn kinh điển: "code của bạn ra production bằng đường nào?"

{/* TODO — ba con số này git không đo được, tra ADO/ops rồi điền vào đây để bài mạnh hơn:
     1. Số user / tenant / đơn vị đang chạy hệ thống thật.
     2. Tỉ lệ bug reopen trước vs sau khi áp quy trình fix-có-bằng-chứng.
     3. Thời gian build/deploy hoặc thời gian onboard dev mới trước vs sau khi có CLI + bộ rule.
     Điền xong thì xoá block comment này. */}

## Năm điều tôi muốn nói với chính mình 20 tháng trước

1. **Tuần đầu là tuần đắt giá nhất.** Ưu tiên pipeline và quy ước hơn màn hình đầu tiên. Cái script sinh proxy tôi viết ngày thứ ba vẫn đang chạy hôm nay.

2. **Quyền phải áp ở tầng query.** Nếu bảo mật của bạn nằm ở chỗ ẩn cột trên UI, bạn chưa có bảo mật — bạn có trang trí.

3. **Sở hữu hạ tầng, đừng đếm màn hình.** Một lần chuẩn hoá design system có đòn bẩy lớn hơn ba tháng làm feature, dù nhìn vào bảng task thì ngược lại.

4. **Migration hay là migration nhàm chán.** Slice nhỏ, feature toggle, dual-read, cutover từng caller, rollback bằng một lần tắt cờ. Đừng bao giờ đặt cược vào một đêm deploy.

5. **Revert không phải thất bại, để diff phình mới là thất bại.** Lần nâng Angular đầu tiên tôi sai không phải vì thiếu năng lực, mà vì gộp quá nhiều thay đổi vào một nhánh. Bốn tháng sau chia nhỏ ra thì xong.

<FAQSection
  title="Câu hỏi thường gặp"
  items={[
    {
      question: "Con số ~8.500 commit có ý nghĩa gì không, hay chỉ là commit nhỏ chia nhiều lần?",
      answer: "Bản thân số commit đơn lẻ thì dễ bơm, nên nó cần đọc kèm các số khó bơm hơn: 2.851 commit không tính merge, 228 EF Core migration tự viết, 187 file test, và làm việc trên cả 18 backend service cùng 13/13 Angular library. Ngược lại, con số dòng code (+4.32M) tôi chủ động không dùng, vì nó bị bơm bởi proxy sinh tự động và lockfile. Nguyên tắc của tôi khi đưa số vào CV: chỉ dùng số mà người phỏng vấn có thể hỏi ngược và mình trả lời được."
    },
    {
      question: "Tách bounded context sang service khác mà không downtime thì làm thế nào?",
      answer: "Bốn bước. Một, dựng nguồn dữ liệu mới ở service đích và để nguồn cũ nguyên vẹn. Hai, đặt feature toggle cho phép đọc từ cả hai nguồn (dual-read), đổi bằng cấu hình chứ không cần deploy. Ba, cutover từng caller một theo slice nhỏ, mỗi slice là một PR review được và rollback được bằng cách tắt cờ. Bốn, verify trên môi trường QA sau từng slice rồi mới sang slice kế tiếp. Điểm cốt lõi là ở mọi thời điểm luôn tồn tại đúng một nút để quay lại, nên không cần cửa sổ downtime nào."
    },
    {
      question: "Phân quyền theo bản ghi (record-level permission) trong CRM nên thiết kế ra sao?",
      answer: "Áp ở tầng query, không áp ở tầng UI. Cụ thể: một policy khai báo quyền theo loại entity thay vì rải if trong code nghiệp vụ; một lớp phân quyền tới từng thuộc tính để cùng một DTO trả về field khác nhau theo vai trò; một hàm duy nhất áp filter sở hữu vào IQueryable, dùng chung cho mọi entity; và cache kết quả giải cây phân cấp quản lý thay vì truy vấn đệ quy mỗi request. Lợi ích lớn nhất là mọi API viết sau đó được bảo vệ mặc định, lập trình viên không cần nhớ quy tắc nào."
    },
    {
      question: "Nâng major version Angular trên monorepo nhiều team thì tránh gì?",
      answer: "Tránh gộp việc nâng framework với breaking change của thư viện UI vào cùng một nhánh, và tránh nâng song song khi các team feature vẫn merge vào đó mỗi ngày. Lần đầu tôi làm cả hai điều đó và phải revert. Lần thứ hai thành công nhờ: tách breaking change UI ra PR riêng merge trước, dùng đúng Angular Update Guide, chốt một cửa sổ đóng băng merge ngắn, và nâng từng library theo thứ tự phụ thuộc với build xanh sau mỗi bước."
    },
    {
      question: "Vì sao đếm audience theo người quan trọng hơn đếm theo số điện thoại?",
      answer: "Vì một người có thể có nhiều số điện thoại, và một số điện thoại có thể xuất hiện ở nhiều bản ghi lead khác nhau. Nếu đếm theo số, một khách hàng có ba số bị tính thành ba người, làm phồng mọi chỉ số phân khúc và mọi báo cáo chiến dịch dựa trên nó. Đếm theo thực thể người, đồng thời loại trừ các lead đã convert hoặc đã merge, mới cho ra con số dùng được để ra quyết định marketing."
    },
    {
      question: "Extension unaccent của PostgreSQL gây đệ quy vô hạn là sao?",
      answer: "Khi cần so khớp tiếng Việt không dấu, nhiều người bọc hàm unaccent trong một hàm wrapper đặt ở schema public. Nếu wrapper đó cũng tên unaccent, lời gọi bên trong sẽ phân giải về chính nó thay vì về hàm của extension, tạo đệ quy vô hạn và làm query treo. Cách tránh: đặt tên wrapper khác, hoặc chỉ định rõ schema của extension khi gọi, và cố định thứ tự deploy extension trước các migration phụ thuộc vào nó."
    },
    {
      question: "Founding engineer khác senior engineer join sau ở điểm nào?",
      answer: "Khác ở loại quyết định được đưa ra. Người join sau tối ưu trong khuôn khổ đã có; founding engineer tạo ra khuôn khổ đó — schema, ranh giới module, quy ước đặt tên, pipeline sinh code, mô hình phân quyền. Đổi lại, mọi quyết định sai ở giai đoạn đầu cũng được nhân bản y hệt, nên phần việc thật sự khó không phải viết code nhanh mà là chọn thứ chịu được 25 người và hai năm thay đổi yêu cầu."
    }
  ]}
/>

## Kết

Hai mươi tháng, một repo từ trống tới 18 microservice, và một dòng `git log` ở vị trí thứ ba mà tôi sẽ còn kể lại nhiều lần.

Thứ tôi mang đi không phải con số commit. Là bốn phản xạ: **áp quy tắc ở tầng thấp nhất có thể**, **ưu tiên thứ nhân bản được**, **migration phải nhàm chán**, và **revert sớm hơn là gồng**.

Nếu bạn đang ở tuần đầu của một dự án mới — hãy dùng nó để dựng thứ mà 25 người sau bạn sẽ đứng lên. Đó là khoản đầu tư có lãi suất cao nhất trong nghề này.

---

**Cập nhật lần cuối**: Tháng 9, 2026
