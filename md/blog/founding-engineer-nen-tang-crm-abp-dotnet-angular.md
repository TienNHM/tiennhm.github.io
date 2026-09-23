# Dựng một nền tảng CRM multi-tenant từ con số không: chuyện nghề 20 tháng

> Nguồn: https://tiennhm.io.vn/blog/founding-engineer-nen-tang-crm-abp-dotnet-angular
> Sản phẩm đầu tiên mình được giao init và dựng từ đầu: một nền tảng CRM multi-tenant, đi demo cho nhiều ngành gần một năm rồi chuyển sang delivery thật cho khách ngành y tế, sau 20 tháng thành 18 microservice ABP/.NET 9 và 13 Angular library. Chuyện nghề kể theo mạch thời gian, có cái màn hình export bị quên phân quyền, có lần nâng Angular hỏng phải revert, có ba tháng bị điều sang dự án loyalty khác nên không commit dòng nào, và một lần migration nhàm chán tới mức chẳng ai để ý là nó đã xảy ra.

> Tháng 01/2025 mình được giao init một sản phẩm, lần đầu tiên trong nghề, là một nền tảng CRM multi-tenant mà lúc nhận thì repo còn trống trơn. Gần một năm đầu nó sống ở chế độ đi demo cho nhiều khách thuộc nhiều ngành, rồi tới gần cuối 2025 thì chốt được khách ngành y tế và chuyển sang delivery thật. Hai mươi tháng sau nó là 18 microservice trên [ABP Framework](https://abp.io/) / [.NET 9](https://learn.microsoft.com/en-us/dotnet/core/whats-new/dotnet-9) và 13 Angular library, của một team đã lớn lên tới 25 người. Bài này không phải bài kỹ thuật mà là chuyện nghề kể theo thứ tự thời gian, trong đó có cái màn hình export bị quên phân quyền, có hai tuần làm Angular xong phải revert, có ba tháng giữa năm mình được chuyển sang dự án loyalty khác nên không commit dòng nào, và có một lần migration nhàm chán tới mức chẳng ai để ý là nó đã xảy ra. Trong bài cũng có đoạn về kiến trúc EAV cho phép khách tự cấu hình trường dữ liệu trên portal, kèm mấy tháng mình vật lộn với performance của nó và của bộ dynamic filter nằm trên nó, đoạn kể quãng mình lần đầu làm mentor cho bốn bạn intern, và đoạn kể cách mình viết code đổi dần từ gõ tay sang dùng ChatGPT, rồi Cursor, rồi Claude.

Ngày 14 tháng 1 năm 2025, mình mở một cái repo trống trơn mà trong đầu chẳng có gì ngoài mấy câu hỏi rất tầm thường, kiểu đặt tên solution là gì, thư mục nào để đâu, database thì chia bảng thế nào.

Trước đó mình toàn nhận những codebase đã chạy sẵn rồi, công việc chỉ là đọc, sửa và thêm màn hình, nên lần này thấy khác hẳn: không có gì để bắt chước, mà cái gì mình gõ ra thì sau này người khác lại cứ thế làm theo. Nghe kể thì oai, chứ lúc ngồi trước cái repo trống ấy mình hơi ngợp thật.

Commit hôm đó của mình chỉ có một dòng, `Init - Databases, projects`, và cũng chẳng có gì long trọng cả.

Hai mươi tháng sau, cái repo ấy có 18 microservice với 29.607 commit của 25 người. Mình vẫn còn ở đó, và thỉnh thoảng vẫn mở `git log --reverse` ra xem lại mấy dòng đầu.

```bash
git log --reverse --format="%h %ad %an %s" --date=short | head -5
```

Bài này mình viết để vài năm nữa đọc lại. Vì sản phẩm là của công ty nên tên riêng mình ẩn hết, từ tên sản phẩm, tên repo, tên khách hàng cho tới tên mấy library nội bộ, còn tech stack thì để nguyên vì đó là phần kể được.

## Mấy ngày đầu

Tuần đầu của một dự án là tuần kỳ nhất, tại vì không ai giục mình, cũng chẳng có bug nào để sửa, mà đồng thời cũng không có gì để bám vào.

Chỉ có đúng một ràng buộc được nói rõ ngay từ đầu, là sản phẩm phải multi-tenant và phải demo được cho nhiều domain nghiệp vụ khác nhau. Nghe qua thì thấy bình thường, nhưng lúc làm mới thấy nó ăn vào từng lớp, bởi vì mình không được để cứng bất cứ thứ gì thuộc về một ngành cụ thể, từ tên trường dữ liệu, tới luồng nghiệp vụ, tới cả cái nhãn hiển thị trên giao diện. Riêng schema thì phải tách được dữ liệu theo tenant ngay từ cái bảng đầu tiên, chứ để chạy một thời gian rồi mới chắp vá thì trả giá rất đắt.

Phần khung thì [multi-tenancy của ABP](https://abp.io/docs/latest/framework/architecture/multi-tenancy) đỡ cho mình gần hết, còn mấy chỗ riêng của sản phẩm như cấu hình theo từng tenant, phân quyền theo cơ sở hay mấy trường tuỳ biến thì vẫn phải tự thiết kế. Và suốt hai mươi tháng sau đó, cứ có ai hỏi "cái này để cứng cho nhanh được không" là mình lại phải nói không, nhiều tới mức thành phản xạ.

Ba ngày đầu mình làm ba việc, mà hai việc đầu thì bình thường: dựng schema database với project skeleton, rồi nâng [ABP](https://abp.io/docs/latest) lên `9.0.3` vì bản cũ có bug làm trang Swagger không load được. Lúc đó mình chưa biết là mình vừa gặp may, tại ba ngày đầu là quãng nâng version rẻ nhất trong cả vòng đời dự án, còn về sau thì mỗi lần nâng là một chiến dịch, chuyện này mình trả giá đủ rồi và sẽ kể ở dưới.

Việc thứ ba mới là việc đáng nhớ, là mình viết một cái pipeline sinh Angular proxy tự động, gồm file `generate-proxy.json` với một script Node chạy [ABP service proxy schematics](https://abp.io/docs/latest/framework/ui/angular/service-proxies) để sinh hết service client TypeScript từ API .NET. Lý do làm thì cũng không cao siêu gì, chỉ là mình lười gõ tay DTO.

Nhưng rồi hai mươi tháng sau đó, cả team không một ai phải viết tay một cái DTO hay một cái HTTP client nào, vì backend đổi contract thì chỉ cần chạy một lệnh là frontend có type mới, và lỗi compile sẽ nổ đúng chỗ cần sửa. Cái script viết trong một buổi chiều mà tới giờ vẫn chạy, nghĩ lại thấy vui.

Cũng phải nói cho công bằng là có mấy chỗ mình đặt tên sai ngay tuần đó, và tới hôm nay cả team vẫn đang sống chung với nó, cho nên tuần đầu ảnh hưởng mạnh theo cả hai chiều chứ không riêng chiều tốt.

## EAV, và mấy tháng vật lộn với performance

Cái ràng buộc "không được để cứng thứ gì thuộc một ngành" ở trên thì phải có một cách làm cụ thể, và cách chúng mình chọn là [EAV, tức Entity Attribute Value](https://en.wikipedia.org/wiki/Entity%E2%80%93attribute%E2%80%93value_model).

Nói đơn giản thì thay vì mỗi trường dữ liệu là một cột cứng trong database, sẽ có một bảng định nghĩa attribute và một bảng lưu giá trị, nên mỗi attribute của mỗi bản ghi là một dòng riêng. Nhờ vậy khách tự thêm trường ngay trên portal, chọn kiểu dữ liệu, đặt nhãn, quyết định nó có bắt buộc hay không, mà không cần ai viết migration hay chờ một lần deploy. Với một sản phẩm phải demo cho nhiều ngành rồi sau đó đi vào nghiệp vụ y tế thì gần như không có đường nào khác, tại mỗi khách lại cần một bộ trường riêng mà mình thì không thể đoán trước được.

Chỉ là với mình lúc đó, EAV là kiến thức hoàn toàn mới. Trước đây mình chỉ làm với schema cố định, đặt cột, đặt index, xong. Nên cái giá phải trả tới rất nhanh, và mình vật lộn với nó khá lâu.

Chỗ đau nhất là lọc và sắp xếp theo attribute động. Với cột cứng thì `WHERE` với `ORDER BY` là chuyện bình thường, còn ở EAV thì giá trị nằm rải trong bảng value nên mỗi điều kiện lọc lại thêm một lần join. Người dùng chỉ cần lọc ba trường rồi sắp xếp theo một trường thứ tư là câu query phình ra thấy rõ, mà đây lại là thao tác họ làm nhiều nhất chứ không phải trường hợp hiếm.

Nằm ngay trên đó là bộ dynamic filter, tức chỗ cho người dùng cuối tự dựng điều kiện lọc mà không cần ai code thêm màn hình. Mình làm nó bằng `GetFilterableFields` để trả về danh sách trường lọc được, với `FilterOperatorType` cho các toán tử. Nghe thì gọn, nhưng nó gánh luôn cái chậm của EAV, tại mỗi điều kiện người dùng thêm vào đều dịch xuống thành một lần đụng bảng value nữa.

Phần rắc rối thêm là tập toán tử phải đổi theo kiểu dữ liệu của từng attribute. Trường chữ thì cần chứa, bắt đầu bằng, khác rỗng. Trường số với trường ngày thì cần lớn hơn, nhỏ hơn, trong khoảng, ngoài khoảng, kèm mấy mốc tương đối kiểu trong ba mươi ngày qua. Trường chọn một hoặc chọn nhiều thì lại cần thuộc danh sách hay không thuộc danh sách. Mà attribute thì do khách tự tạo trên portal, nên không thể viết cứng bảng ánh xạ ở một chỗ rồi xong, phải để backend tự suy ra bộ toán tử hợp lệ từ kiểu dữ liệu rồi trả cho frontend dựng UI theo. Đây là chỗ mình sửa lại nhiều lần nhất, vì hễ bỏ sót một kiểu là màn hình lọc của khách hiện ra toán tử vô nghĩa.

Chỗ thứ hai là màn hình danh sách với nhiều cột động. Nhìn trên giao diện thì chỉ là một trang 20 dòng, nhưng nếu mỗi dòng cần hiển thị vài chục attribute thì bên dưới là mấy trăm dòng value phải đọc lên rồi gom lại thành 20 dòng, và cái phần gom đó cũng tốn chứ không miễn phí.

Thứ giúp được nhiều nhất hoá ra không phải một câu query khôn hơn, mà là cache lại metadata định nghĩa attribute. Danh sách attribute với kiểu dữ liệu của chúng thì rất ít đổi, có khi cả tuần không ai sửa, nhưng trước đó mỗi request đều đi hỏi lại từ đầu để biết cần đọc những gì và ép về kiểu nào. Cache phần đó đi thì bớt được một lượng truy vấn đáng kể, mà lại là loại lặp lại nhiều nhất trong ngày.

Nói thật là mình không coi đây là bài toán đã xong hẳn. Nó vẫn là chỗ mình theo dõi kỹ nhất mỗi lần có màn hình danh sách mới, và bài học rút ra khá thẳng: EAV mua được sự linh hoạt trên portal bằng cách trả giá ở mọi câu query đọc, nên trước khi chọn nó thì phải biết mình đang đánh đổi cái gì.

## Cái màn hình export

Nửa đầu 2025 là giai đoạn dựng lõi CRM, và phần lớn thời gian mình đổ vào một chuyện nghe rất buồn ngủ, là phân quyền.

Yêu cầu thì dễ coi thường lắm: hai người cùng mở danh sách Lead phải thấy hai tập dữ liệu khác nhau, mà khác theo ai đang sở hữu bản ghi, ai là quản lý của ai, bản ghi được chia sẻ cho ai, rồi người dùng thuộc cơ sở nào. Cách làm thì ai cũng biết, là thêm `if` vào service, xong entity mới thì copy cái `if` đó sang, và mình đã đi đúng con đường ấy một quãng mà vẫn thấy bình thường.

Cho tới một hôm có người phát hiện màn hình export trả ra nhiều dữ liệu hơn màn hình danh sách.

Lý do thì tầm thường tới mức hơi buồn, là bên danh sách có đoạn lọc quyền còn bên export thì không, vì lúc viết export mình quên. Chẳng ai làm sai quy trình gì cả, chỉ là khi để một quy tắc quan trọng phụ thuộc vào chuyện lập trình viên có nhớ hay không thì sớm muộn cũng sẽ có người quên, và hôm đó người quên là mình.

Sau vụ đó thì chúng mình dồn hết về một tầng:

- `EntityAccessPolicy` để khai báo quyền theo từng loại entity, thay vì rải `if` khắp code nghiệp vụ.
- `AttributePermission` để phân quyền tới từng field, nhờ vậy sales chỉ thấy tên khách còn quản lý mới thấy giá trị hợp đồng, mà vẫn dùng chung một API và một DTO.
- `ApplyOwnershipFilterAsync`, một hàm duy nhất áp filter sở hữu vào [IQueryable](https://learn.microsoft.com/en-us/dotnet/api/system.linq.iqueryable), dùng chung cho Lead, Account, Order, CrmTask và mọi entity thêm sau này.
- `GetUserIdsUnderManagerAsync` kèm cache, giải cây phân cấp quản lý một lần rồi giữ lại, khỏi phải truy vấn đệ quy mỗi request.

Câu chốt của cả giai đoạn này thì mình đọc được ở đâu đó từ lâu rồi, là quyền phải áp ở tầng query chứ đừng áp ở tầng UI, nhưng biết vậy mà vẫn phải tự vấp mới tin. Ẩn một cái cột trên giao diện thì chỉ là trang trí, còn lọc ở `IQueryable` mới là bảo mật thật.

Cái được là từ đó về sau, mọi API viết mới đều được bảo vệ sẵn mà chẳng ai phải nhớ gì nữa, và với một codebase 25 người cùng sửa thì chuyện "không phải nhớ" hoá ra quan trọng hơn mình tưởng nhiều.

Cùng giai đoạn đó còn có các module Lead, Account, Order, Quotation, Product Catalog, Pricebook, Ticket, Contract sinh Word/PDF và Call Log nối tổng đài. Phần này thì đúng kiểu làm CRM, không có gì kịch tính để kể.

## Giữa 2025: lần đầu làm mentor

Giữa 2025 thì mình được giao mentor bốn bạn intern, và đây là việc mình không hình dung trước được là nó khó theo kiểu khác.

Phần khó đầu tiên không phải giảng kiến thức, mà là chia task. Mình quen tự làm cho nhanh, nên lúc đầu ngồi giải thích một việc mất cả tiếng trong khi tự gõ chỉ mất mười lăm phút, thấy sốt ruột thật. Nhưng rồi mình nhận ra phần lớn lúc các bạn làm ra một thứ khác hẳn cái mình tưởng thì không phải các bạn làm sai, mà là do mình mô tả task chưa đủ rõ. Viết được một cái task vừa sức, có ranh giới rõ ràng và nói được cả lý do vì sao cần làm, hoá ra là một kỹ năng riêng, chẳng liên quan gì tới việc code giỏi.

Phần khó thứ hai là review. Trước đó mình review kiểu chỉ ra chỗ sai rồi nói sửa lại, xong việc. Với các bạn intern thì cách đó không ăn, vì các bạn sẽ sửa đúng cái chỗ mình chỉ rồi lần sau lặp lại y hệt ở một file khác. Phải nói được vì sao chỗ đó sai và nếu làm đúng thì được gì thì mới hết, mà cái đó tốn thời gian gấp mấy lần.

Rồi còn phần quản lý con người nữa, là theo tiến độ của bốn người cùng lúc, biết bạn nào đang bị kẹt mà chưa dám nói, sắp việc sao cho các bạn vừa học được thứ mới vừa không nhận một task quá sức tới mức mất tự tin. Chỗ này mình làm bằng cảm tính nhiều hơn là bằng phương pháp, và chắc cũng có lúc sắp chưa hợp.

Nhìn lại thì quãng đó đổi cách mình làm việc nhiều hơn là đổi kỹ năng code. Cụ thể nhất là nó đẩy mình bắt đầu ghi mọi chuẩn ra thành tài liệu, tại tới lần thứ tư phải giải thích cùng một quy ước thì mình hiểu là nên viết xuống một lần cho xong, thay vì nói lại trong từng lần review.

## Lúc code của mình thành đồ dùng chung

Sang nửa sau 2025 thì mình chuyển nhiều sức sang tầng frontend platform, và bắt đầu hiểu một kiểu áp lực khác hẳn.

Library dùng chung của sản phẩm lúc đó thành thư mục có nhiều lượt thay đổi nhất repo với 11.987 lượt file, trong đó là bộ component nghiệp vụ, [PrimeNG](https://primeng.org/) tuỳ biến lại, theme token cho chế độ dark với dim, rồi sidebar, pagination, table helper, shared-ui.

Làm feature thì bug của mình chỉ là bug của một màn hình, còn làm đồ dùng chung thì khác, tại sửa sai một token màu là 40 màn hình lệch cùng lúc, mà đổi signature một component thì cả team compile lỗi rồi mọi người nhìn sang. Lần đầu bị như vậy mình khá xấu hổ, ngồi sửa tới tối mới xong.

Nhưng được cái là làm một lần thì ăn cả sản phẩm, kiểu tối ưu table helper một lần là mọi cái bảng trong hệ thống nhanh hơn, hay chuẩn hoá theme token một lần là màn hình mới sinh ra đã đúng thiết kế mà không cần ai review màu sắc nữa.

Thứ mình học được ở giai đoạn này hoá ra lại không phải kỹ thuật, mà là cái nhịp làm việc phải đổi, bởi code dùng chung thì cần review lâu hơn, cần nói trước khi định làm breaking change, và cần chịu chậm đi một nhịp để những người khác nhanh lên. Nghe thì hiển nhiên, nhưng lúc đang bị hối deadline thì làm được mới khó.

## Cuối 2025: từ đi demo sang làm thật

Suốt gần một năm đầu, sản phẩm sống ở chế độ đi demo. Cứ có khách quan tâm là mang đi trình bày, mà khách thì thuộc nhiều ngành khác nhau, nên cái ràng buộc "không được để cứng thứ gì thuộc một ngành cụ thể" từ tuần đầu hoá ra là lý do sản phẩm demo được cho ngành nào cũng được. Giai đoạn đó làm khá nhanh và cũng khá thoải mái, vì sai thì chỉ mất mặt trong một buổi demo chứ chưa ảnh hưởng tới ai.

Tới gần cuối 2025 thì chốt được khách ngành y tế, và từ đó tới giờ sản phẩm chuyển hẳn sang chế độ delivery thật. Với mình thì đây là quãng đổi nhiều nhất, mà đổi ở ba chỗ.

Thứ nhất là nghiệp vụ y tế đòi cấu hình sâu hơn mức mình tưởng là đã đủ. Mấy chỗ hồi trước nghĩ "cấu hình được rồi" thì tới lúc gặp nghiệp vụ thật lại thiếu thêm một lớp nữa, nên phần lớn thời gian là đi khoét sâu những chỗ mình từng cho là xong.

Thứ hai là team đông lên hẳn, không chỉ thêm dev mà thêm cả BA, QA và PM. Đây là lúc mấy thứ làm ở giai đoạn trước mới trả lại giá trị, kiểu như ownership filter áp một tầng, pipeline sinh proxy, hay bộ component dùng chung. Hồi ít người thì chúng chỉ tiện, còn lúc đông người thì cái chuyện "không ai phải nhớ quy tắc nào" mới thành sống còn thật.

Thứ ba là quy trình siết lại, vì giờ đã có commitment với khách hàng. Không còn deploy kiểu thấy ổn thì đẩy nữa, mọi thứ phải đi qua QA, phải có evidence, phải đúng hẹn. Nói thật là lúc đầu mình thấy hơi bó, nhưng về sau mới hiểu đó là cái giá tự nhiên của việc sản phẩm có người dùng thật, và cũng chính nó buộc mình phải làm mọi migration sau này theo kiểu có nút quay lại, chứ không còn dám đặt cược vào một đêm deploy nữa.

## Vụ Angular, tháng 11/2025

Phần này mình kể nhanh thôi, vì kể chậm thì đau.

Mình nhận việc nâng [Angular](https://angular.dev/) 19 lên 20 cho cả 13 library, làm hai tuần, và cuối cùng phải revert.

Lỗi không nằm ở Angular mà nằm ở chỗ mình tham, tại mình vừa nâng framework lại vừa xử luôn breaking change của PrimeNG với việc đổi `p-dropdown` sang [`p-select`](https://primeng.org/select) rải khắp hàng trăm template, trong khi các team feature vẫn merge vào cùng nhánh mỗi ngày. Đến lúc diff phình lên tới mức không ai review nổi thì mỗi lần rebase lại ra một mớ conflict mới, và mình ngồi sửa conflict còn nhiều hơn sửa code.

Cái cảm giác lúc chấp nhận là nó không về đích được thì mình vẫn nhớ, mà không phải kiểu tiếc công, chỉ là biết từ mấy hôm trước rồi mà vẫn cố thêm.

Bốn tháng sau, tới tháng 03/2026 thì mình làm lại và xong, cùng một khối lượng việc, khác đúng ở cách chia.

**Lần thứ hai mình làm thế này**

- [x] Tách breaking change của thư viện UI ra PR riêng, merge trước, không dính vào việc nâng framework
- [x] Đi theo Angular Update Guide chứ đừng tự sửa package.json bằng tay
- [x] Chốt một cửa sổ đóng băng merge ngắn, đừng nâng song song với luồng feature
- [x] Nâng từng library theo thứ tự phụ thuộc, build xanh rồi mới đi tiếp
- [x] Diff mà vượt ngưỡng review được thì revert luôn, đừng cố thêm một tuần

[Angular Update Guide](https://angular.dev/update-guide) liệt kê đúng từng bước theo cặp version, và nói thật là nó đáng tin hơn trực giác của mình nhiều.

Tính từ ngày đầu tới giờ thì chặng nâng cấp là ABP 9.0 lên 9.3.6, .NET SDK 9.0.101, Angular 16 lên 20, kèm cả PrimeNG, và không có lần phát hành nào bị gián đoạn vì mấy việc đó. Giờ mình đang nhìn sang ABP 10.x với .NET 10, lần này thì biết đường hơn rồi.

## Làm chat, và làm sai thứ tự

Quý 1/2026 là quãng mình thích nhất, đơn giản vì phần lớn là thứ chưa từng làm, đó là thêm năng lực hội thoại đa kênh vào CRM.

Kết quả ra được một service riêng, gồm Chat Inbox có thread hội thoại, gán tag và zen mode cho tư vấn viên tập trung; tích hợp kênh Facebook/Messenger qua một nền tảng trung gian rồi chuẩn hoá webhook về một schema chung; realtime bằng [SignalR](https://learn.microsoft.com/en-us/aspnet/core/signalr/introduction); mô hình tổng đài đầy đủ với Hotline, Queue, Agent, Extension, Queue Membership, cắm thêm [Stringee](https://stringee.com/) webphone để gọi ngay trên trình duyệt. Và cái mình thích nhất là mắt nối tạo Lead trực tiếp từ hội thoại, nhờ vậy chat không còn là kênh hỗ trợ đơn thuần nữa.

Chuyện đáng kể ở đây là mình làm sai thứ tự.

SignalR chạy một instance thì đẹp như demo, nên mình viết nghiệp vụ trước, chạy local thấy mượt, vui lắm. Rồi lên [Kubernetes](https://kubernetes.io/docs/concepts/) nhiều pod là gặp ngay câu hỏi mà đúng ra phải giải quyết từ dòng code đầu tiên, là user này đang nối vào pod nào. Mất thêm một quãng nữa mới sửa xong, và từ đó mình xếp realtime vào loại quyết định hạ tầng, dù nó nằm trong một cái ticket feature.

## Ba tháng mình không commit gì

Chỗ này mình để trong bài có chủ ý, tại nếu chỉ kể phần đẹp thì bài này thành tờ quảng cáo.

Khoảng tháng 5 tới tháng 7 năm 2026, mình gần như không commit vào repo này, cả quãng đó đúng một commit. Không phải vì hết việc hay ngồi chơi, mà là mình được chuyển sang một dự án khác về loyalty một thời gian, rồi sau đó mới quay lại. Cho nên trong CV mình ghi "01/2025 – nay" chứ không ghi "20 tháng liên tục", hai cách viết đó khác nhau và ai chịu mở `git log` ra xem thì cũng sẽ thấy khác nhau.

Mà nhìn lại thì quãng đi làm loyalty đó lại có ích cho việc quay về, vì sang một sản phẩm khác mới thấy rõ những quy ước nào của mình là hợp lý thật, còn những chỗ nào chỉ là do mình quen tay rồi tưởng là chuẩn.

Mình kể chuyện này vì nó dính tới một thói quen giữ khá chặt, là chỉ dùng những con số mà mình dám bị hỏi ngược.

Để có số liệu cho bài, mình quét `git log` toàn bộ các repo rồi lọc theo email của mình:

| Chỉ số | Số liệu |
| --- | --- |
| Commit trong monorepo chính | 8.059 / 29.607 |
| Commit thực, không tính merge | 2.851 |
| Lượt file thay đổi | 44.703 |
| [EF Core migration](https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations/) tự viết | 228 |
| File test ([xUnit](https://xunit.net/) + spec) | 187 |
| Angular library đã làm việc trên đó | 13 / 13 |
| Backend service đã làm việc trên đó | 18 |
| Commit [GitOps](https://opengitops.dev/) môi trường QA | 371 |
| Commit promote QA lên UAT (17 service) | 95 |
| Work item [Azure DevOps](https://learn.microsoft.com/en-us/azure/devops/boards/) gắn thẳng vào commit | 35 |

Giờ nói rõ về mấy con số này một chút.

Số commit thì gần như không đo được khối lượng việc, vì cùng một lượng việc mà người commit gộp với người commit nhỏ sẽ cho ra hai con số lệch nhau rất xa, còn mình thì thuộc nhóm commit nhỏ nên con số bị đẩy lên. Mấy chỉ số sát với phạm vi việc hơn là số migration, số service và số library.

Con số dòng code thì mình bỏ hẳn, vì `git log` báo `+4.32M / −2.60M` nghe rất oách nhưng phần lớn là proxy sinh tự động với lockfile, đưa vào CV thì chỉ để chờ người ta hỏi một câu là lộ.

Còn điều hiển nhiên nhất thì cũng là điều cần nói to nhất, là 18 service đó vốn là việc của 25 người, nên những gì mình kể trong bài chỉ là phần mình làm chứ không phải cả sản phẩm.

## Lần migration mình thích nhất

Nếu có ai hỏi hai mươi tháng đó mình làm được gì thì mình sẽ kể cái này, dù nó là việc ít kịch tính nhất trong cả bài.

Bài toán là module quản lý mẫu tin nhắn (`MessageTemplate`) đang nằm sai chỗ, nó sống trong hai service khác nhau trong khi xét theo [bounded context](https://martinfowler.com/bliki/BoundedContext.html) thì phải thuộc service thông báo, mà ba service khác thì vẫn đang gọi vào nó mỗi ngày trên hệ thống đã có người dùng thật.

Cách mà mình-năm-2024 chắc sẽ chọn là gom thành một PR to, đổi hết, deploy đêm thứ Bảy, mở sẵn tab log rồi cầu nguyện.

Lần này thì làm theo kiểu [Strangler Fig](https://martinfowler.com/bliki/StranglerFigApplication.html) với [branch by abstraction](https://martinfowler.com/bliki/BranchByAbstraction.html):

1. Dựng nguồn mới song song ở service thông báo, còn dữ liệu cũ vẫn để nguyên tại chỗ.
2. Đặt feature toggle đọc hai nguồn, bật cờ thì đọc nguồn mới còn tắt cờ thì về nguồn cũ, đổi bằng cấu hình chứ không cần deploy.
3. Cutover từng caller một theo slice, Ticket trước rồi tới Campaign rồi service còn lại, mỗi slice là một PR nhỏ review được và rollback được trong vài giây bằng cách tắt cờ.
4. Verify trên QA sau từng slice rồi mới đi slice kế tiếp.

Kết quả là không downtime, không big-bang deploy, và cũng không ai phải trực đêm.

Chẳng ai để ý là nó đã xảy ra, mà đó mới là chỗ mình thích. Sau vụ Angular tháng 11 thì mình hiểu ra thứ mình cần không phải làm nhanh hơn, mà là lúc nào cũng còn một nút để quay lại. Kiểu migration này khó khoe vì nhìn vào chẳng có gì ly kỳ, nhưng mình vẫn nghĩ nó là việc làm tử tế nhất trong hai mươi tháng.

Cùng quý đó mình cũng dựng lại một service khác theo layout [ABP single-layer](https://abp.io/docs/latest/solution-templates/single-layer-web-application), đổi namespace toàn bộ rồi phục hồi pipeline build cho nó, nhưng việc này thì buồn ngủ thật, không có gì kể.

## Cách mình viết code đổi hẳn trong hai mươi tháng đó

Có một thứ đổi âm thầm suốt cả quãng này mà nhìn vào `git log` thì không thấy, là cách mình viết ra code.

Đầu 2025 thì mình gõ tay hết. Có dùng [ChatGPT](https://chatgpt.com/) nhưng chỉ ở mức tra cứu, kiểu hỏi cú pháp hay nhờ giải thích một cái stack trace, xong tự gõ lại vào project. Nó tiện hơn Google một chút chứ chưa đổi được gì về cách làm việc, tại nó không biết codebase của mình trông ra sao.

Bước đổi thật là lúc chuyển sang [Cursor](https://cursor.com/), vì tự nhiên AI đọc được context của cả repo. Code nó gợi ý bắt đầu hợp với quy ước sẵn có thay vì ra một đoạn chung chung phải sửa lại từ đầu. Với một monorepo 18 service mà mỗi service có cách bố trí giống nhau thì cái này ăn tiền, nhất là mấy việc lặp đi lặp lại như thêm một entity kèm đủ bộ application service, DTO, permission và migration.

Sau đó mình chuyển sang [Claude](https://claude.ai/), lúc đầu là bản standard rồi lên bản premium khi thấy đụng trần giới hạn hơi nhiều. Điều mình đánh giá cao ở giai đoạn này không phải tốc độ gõ, mà là chất lượng đồng đều hơn. Trước đó thì code mình viết lúc tỉnh táo với lúc chạy deadline chênh nhau thấy rõ, còn giờ thì cái sàn chất lượng được giữ ổn định hơn, kể cả mấy hôm mệt.

Chỗ này nối thẳng với bộ rule engineering mà mình kể ở dưới. Mấy chuẩn kiểu comment ngắn gọn, cách viết .NET service, cách khai báo permission, ban đầu mình viết ra để nhắc người trong team, nhưng về sau chúng thành thứ để nói cho AI biết dự án này làm theo lối nào. Viết rule một lần rồi AI cứ thế áp, hoá ra hiệu quả hơn hẳn việc mình đi nhắc lại trong từng lần review. Và đúng lúc team đông lên với quy trình siết lại thì cái đó càng quan trọng, vì giữ cho code của nhiều người trông như của một người là việc rất khó làm bằng tay.

Tất nhiên là có chỗ mình không giao cho AI. Phân quyền, migration dữ liệu, mấy đoạn đụng tới tenant thì vẫn tự đọc kỹ từng dòng, vì đó là những chỗ sai một cái là ảnh hưởng người dùng thật chứ không phải chỉ đỏ cái build. Nói chung mình xem nó như một người mới vào team: làm được nhiều việc, nhanh, nhưng review vẫn là phần của mình.

Mình có viết kỹ hơn về chủ đề này trong [loạt bài AI-Driven Development](https://tiennhm.io.vn/blog/phat-trien-phan-mem-ai-driven-development), còn ở đây chỉ kể phần dính tới dự án.

## Những việc không ai giao

Có một mảng việc không nằm trong sprint nào cả, và với mình nó luôn bắt đầu từ chỗ rất tầm thường là tự thấy bất tiện.

**Cái CLI chạy service cục bộ.** Monorepo 18 service thì `dotnet run` bằng tay là bất khả thi, mình thử rồi, mở tám cửa sổ terminal xong không biết cái nào là cái nào. Nên mình viết một CLI nội bộ dựa trên [PM2](https://pm2.keymetrics.io/docs/usage/quick-start/) để chạy, dừng, xem log theo tên service, thêm chế độ build tiết kiệm RAM cho máy yếu và cờ `--with-tests`. Giờ cả team dùng hằng ngày, mà mỗi lần thấy ai gõ nó mình vẫn thấy vui vui.

**Bộ chuẩn code có script check tự động.** Gồm rule về comment ngắn gọn, kiểm tra việc đang làm dở, chuẩn viết .NET service và chuẩn khai báo permission. Lý do làm thì đơn giản là mình phát hiện đang nhắc lại cùng một góp ý trong review tới lần thứ tư.

**[ADR](https://adr.github.io/) và lessons-learned sau sự cố.** Identity service `CrashLoopBackOff`, migration không đồng nhất giữa các service, thứ tự deploy extension database, mỗi sự cố mình ghi một tài liệu ngắn tốn chừng 20 phút. Thú thật là mình vấp vài lần rồi mới bắt đầu ghi, nên cái danh sách ADR của dự án cũng chính là danh sách những chỗ mình từng mất thời gian.

**Sửa ở tầng hạ tầng chứ đừng sửa chỗ nó báo lỗi.** Scope [OpenIddict](https://documentation.openiddict.com/) giữa các service, [ABP dynamic C# client](https://abp.io/docs/latest/framework/api-development/dynamic-csharp-clients) đòi controller phải implement interface, routing của [YARP](https://microsoft.github.io/reverse-proxy/) ở gateway, [HealthChecksUI](https://github.com/Xabaril/AspNetCore.Diagnostics.HealthChecks) bind sai địa chỉ trên Kubernetes. Mấy lỗi này giống nhau ở chỗ nếu sửa ngay tại nơi nó báo lỗi thì hai tuần sau nó quay lại.

**Fix bug có bằng chứng.** Gần đây mình gắn thẳng 35 work item Azure DevOps vào commit message, mỗi bug một nhánh `fix/AB{id}` và kèm unit test, ví dụ bộ test cho resolver kiểm tra quyền chia sẻ khi tạo Booking/Task. Nghe khô khan nhưng nó dẹp được cái mệt nhất trong nghề, là tranh luận xem bug đã fix chưa.

Cuối cùng là 371 commit GitOps cho môi trường QA ([Helm](https://helm.sh/docs/) values, configmap, identity client, image tag) cùng 95 commit promote 17 service lên UAT, tức là phần đưa code từ máy mình ra tới tay người dùng. Chẳng ai để ý tới nó, cho tới hôm nó hỏng.

## Mấy thứ mình ghi lại

Tuần đầu là tuần ảnh hưởng mạnh nhất và ảnh hưởng theo cả hai chiều, vì cái script mình viết vì lười ở ngày thứ ba thì tới giờ vẫn chạy, còn mấy cái tên đặt sai ở tuần đó thì cả team vẫn đang sống chung.

Đừng để một quy tắc quan trọng phụ thuộc vào chuyện người ta có nhớ hay không, cái màn hình export dạy mình câu đó, và nó đúng cho cả phân quyền, cả coding convention lẫn quy trình fix bug.

Nhận code dùng chung thì phải nhận cả hai mặt của nó, làm một lần ăn cả sản phẩm nhưng sai một lần cũng lan cả sản phẩm, và không có cách nào lấy mặt này mà bỏ mặt kia.

Migration thì càng nhàm càng tốt, cứ slice nhỏ, feature toggle, dual-read và rollback bằng một lần tắt cờ, tuy lâu hơn nhưng mình nghĩ đó là chỗ đáng chậm.

Còn revert thì nên revert sớm, cái này mình trả học phí bằng đúng hai tuần của tháng 11.

## Mấy câu anh em hay hỏi lại mình

### Tách bounded context sang service khác mà không downtime thì làm thế nào?

Mình làm bốn bước. Một là dựng nguồn dữ liệu mới ở service đích và để nguồn cũ nguyên vẹn. Hai là đặt feature toggle cho phép đọc từ cả hai nguồn, gọi là dual-read, và đổi bằng cấu hình chứ không cần deploy. Ba là cutover từng caller một theo slice nhỏ, mỗi slice là một PR review được và rollback được bằng cách tắt cờ. Bốn là verify trên môi trường QA sau từng slice rồi mới sang slice kế tiếp. Cốt lõi là ở mọi thời điểm luôn còn đúng một nút để quay lại, nên không cần cửa sổ downtime nào.

### Phân quyền theo bản ghi trong CRM nên thiết kế ra sao?

Nên áp ở tầng query chứ đừng áp ở tầng UI, đây là bài học mình trả giá bằng một màn hình export bị quên lọc quyền. Cụ thể là một policy khai báo quyền theo loại entity thay vì rải if trong code nghiệp vụ, một lớp phân quyền tới từng thuộc tính để cùng một DTO trả về field khác nhau theo vai trò, một hàm duy nhất áp filter sở hữu vào IQueryable dùng chung cho mọi entity, và cache kết quả giải cây phân cấp quản lý thay vì truy vấn đệ quy mỗi request. Cái được lớn nhất là mọi API viết sau đều được bảo vệ sẵn mà không ai phải nhớ quy tắc nào.

### Nâng major version Angular trên monorepo nhiều team thì nên tránh gì?

Nên tránh gộp việc nâng framework với breaking change của thư viện UI vào cùng một nhánh, và tránh nâng song song khi các team feature vẫn merge vào đó mỗi ngày. Lần đầu mình làm cả hai điều đó nên hai tuần sau phải revert. Lần thứ hai thì xong, nhờ tách breaking change UI ra PR riêng merge trước, đi theo Angular Update Guide, chốt một cửa sổ đóng băng merge ngắn, và nâng từng library theo thứ tự phụ thuộc với build xanh sau mỗi bước.

### Làm sản phẩm multi-tenant thì quyết định nào phải chốt sớm nhất?

Là cách tách dữ liệu theo tenant, và phải chốt ngay từ cái bảng đầu tiên vì chắp vá sau thì rất đắt. Framework như ABP lo được phần khung multi-tenancy, còn những thứ riêng của sản phẩm thì vẫn phải tự thiết kế, gồm cấu hình theo từng tenant, phân quyền theo cơ sở và các trường dữ liệu tuỳ biến. Kèm theo đó là một ràng buộc phải giữ suốt dự án, là không để cứng bất cứ thứ gì thuộc về một ngành cụ thể, nên tên trường, luồng nghiệp vụ hay nhãn hiển thị đều phải cấu hình được.

### Dùng kiến trúc EAV cho dynamic attributes thì chậm ở đâu?

Hai chỗ đau nhất theo trải nghiệm của mình. Một là lọc và sắp xếp theo attribute động, vì giá trị nằm rải trong bảng value nên mỗi điều kiện lọc lại thêm một lần join, người dùng chỉ cần lọc ba trường rồi sắp xếp theo trường thứ tư là query phình ra thấy rõ. Hai là màn hình danh sách nhiều cột động, nhìn trên giao diện chỉ là một trang 20 dòng nhưng bên dưới là mấy trăm dòng value phải đọc lên rồi gom lại. Thứ giúp được nhiều nhất hoá ra không phải một câu query khôn hơn mà là cache lại metadata định nghĩa attribute, vì danh sách attribute với kiểu dữ liệu của chúng rất ít đổi nhưng trước đó mỗi request đều đi hỏi lại từ đầu.

### Sản phẩm chuyển từ giai đoạn đi demo sang delivery thật thì đổi những gì?

Theo trải nghiệm của mình thì đổi ba chỗ. Một là nghiệp vụ của khách đòi cấu hình sâu hơn mức mình tưởng đã đủ, nên phần lớn thời gian là đi khoét sâu những chỗ từng cho là xong. Hai là team đông lên, không chỉ thêm dev mà thêm cả BA, QA và PM, và đây mới là lúc những thứ như phân quyền áp một tầng hay pipeline sinh code trả lại giá trị, vì lúc đông người thì chuyện không ai phải nhớ quy tắc nào mới thành sống còn. Ba là quy trình siết lại vì đã có commitment với khách, mọi thứ phải qua QA và phải có evidence, không còn deploy kiểu thấy ổn thì đẩy nữa.

## Kết

Hai mươi tháng, một cái repo từ trống tới 18 microservice, và là sản phẩm đầu tiên mình được giao dựng từ đầu.

Nhưng nhớ lại thật thà thì phần lớn thời gian của mình chẳng nằm ở chỗ nào hào nhoáng cả, mà là đi sửa một chỗ phân quyền bị quên, chia một PR quá to thành sáu PR nhỏ, hay ngồi viết ADR để người sau khỏi vấp đúng chỗ mình đã vấp.

Bốn thứ còn lại với mình là áp quy tắc ở tầng thấp nhất có thể, ưu tiên thứ nhân bản được, giữ cho migration nhàm chán, và revert sớm, mà cả bốn thì đều học được bằng cách làm sai trước.

Ai đang ở tuần đầu của một dự án mới thì mình nghĩ tuần đó nên dành cho quy ước với pipeline hơn là cho màn hình đầu tiên. Còn nếu vài tháng sau có phải gõ `git revert` cho công sức hai tuần thì cũng không sao đâu, mình cũng vậy, và hoá ra đó lại là chỗ học được nhiều nhất.

---

**Cập nhật lần cuối**: Tháng 9, 2026
