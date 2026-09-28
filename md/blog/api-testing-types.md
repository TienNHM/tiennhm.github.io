# Các loại kiểm thử API: 9 loại, khác nhau ở đâu và chạy lúc nào

> Nguồn: https://tiennhm.io.vn/blog/api-testing-types
> Kiểm thử API là gì và vì sao nó rẻ hơn kiểm thử giao diện. Bảng so sánh 9 loại kiểm thử API — smoke, functional, integration, regression, load, stress, security, UI và fuzz — mỗi loại kèm câu hỏi nó trả lời, thời điểm nên chạy trong CI và công cụ thường dùng.

> Kiểm thử API là việc gửi request thẳng vào tầng API và kiểm tra response, thay vì thao tác qua giao diện. Nó nhanh hơn và ổn định hơn kiểm thử UI vì bỏ qua trình duyệt. Chín loại phổ biến trả lời chín câu hỏi khác nhau: **smoke** hỏi API có sống không, **functional** hỏi có đúng đặc tả không, **integration** hỏi các service ghép lại có đúng không, **regression** hỏi thay đổi mới có phá cái cũ không, **load** và **stress** hỏi chịu được bao nhiêu và sập thế nào, **security** hỏi có lỗ hổng không, **UI** hỏi dữ liệu hiển thị đúng không, **fuzz** hỏi đầu vào rác có làm sập không. Chúng không thay thế nhau.

Câu hỏi "nên dùng loại kiểm thử nào" hầu như luôn sai đề. Mỗi loại trả lời một câu hỏi riêng, và một hệ thống chạy thật thường cần nhiều loại cùng lúc ở những thời điểm khác nhau trong quy trình. Bài này xếp chín loại theo đúng câu hỏi mà chúng trả lời.

## Kiểm thử API là gì

Kiểm thử API (API testing) là việc gửi request trực tiếp vào tầng API của ứng dụng — thường qua HTTP — rồi kiểm tra response trả về: mã trạng thái, cấu trúc dữ liệu, giá trị, header, và cả thời gian phản hồi. Nó nằm ở **tầng giữa** của kim tự tháp kiểm thử: trên unit test, dưới test giao diện đầu-cuối.

Vị trí đó quyết định vì sao nó đáng đầu tư nhất:

| | Unit test | **Kiểm thử API** | Test giao diện (E2E) |
|---|---|---|---|
| Phạm vi | Một hàm, một lớp | Một hoặc nhiều endpoint | Cả luồng qua trình duyệt |
| Tốc độ | Mili giây | Chục tới trăm mili giây | Giây tới chục giây |
| Độ ổn định | Rất cao | Cao | Hay gãy vặt (flaky) |
| Bắt được lỗi tích hợp | Không | Có | Có |
| Số lượng nên có | Nhiều nhất | Vừa phải | Ít nhất |

Test giao diện gãy vì rất nhiều lý do không liên quan tới nghiệp vụ: animation chưa chạy xong, selector đổi tên, trình duyệt cập nhật. Kiểm thử API không có những lớp đó — nó chỉ có request và response, nên khi nó đỏ thì gần như chắc chắn là có lỗi thật.

## Bảng tra nhanh chín loại

| Loại | Trả lời câu hỏi | Chạy khi nào | Công cụ hay dùng |
|---|---|---|---|
| Smoke | API có sống không? | Ngay sau mỗi lần deploy | curl, Postman, health check |
| Functional | Có đúng đặc tả không? | Mỗi pull request | Postman, xUnit, REST Client |
| Integration | Ghép nhiều thành phần có đúng không? | Mỗi pull request | WebApplicationFactory, Testcontainers |
| Regression | Thay đổi mới có phá cái cũ không? | Mỗi pull request, mỗi release | Bộ test tự động sẵn có |
| Load | Chịu được bao nhiêu người dùng? | Trước release lớn, định kỳ | k6, JMeter, Gatling |
| Stress | Sập ở ngưỡng nào và sập ra sao? | Trước sự kiện tải cao | k6, JMeter |
| Security | Có lỗ hổng nào không? | Định kỳ, trước release | OWASP ZAP, Burp Suite |
| UI | Dữ liệu API hiển thị đúng không? | Trước release | Playwright, Cypress |
| Fuzz | Đầu vào rác có làm sập không? | Định kỳ, trong pipeline bảo mật | Schemathesis, RESTler |

## Chín loại, chi tiết từng loại

### 1. Smoke Testing

Kiểm tra nhanh xem API có hoạt động ở mức cơ bản nhất không. Tên gọi đến từ ngành điện tử: cắm điện lên xem có bốc khói không.

Phạm vi cố tình hẹp — vài request vào health endpoint và một hai endpoint quan trọng nhất. Mục tiêu không phải tìm bug mà là **quyết định có đáng chạy tiếp bộ test nặng hay không**. Chạy ngay sau mỗi lần deploy, và nếu smoke test đỏ thì rollback luôn, không cần chờ những test còn lại.

### 2. Functional Testing (Kiểm thử chức năng)

Dựng test case từ yêu cầu nghiệp vụ rồi so sánh response thực tế với kết quả mong đợi. Đây là loại chiếm số lượng lớn nhất.

Một test case chức năng đầy đủ không chỉ kiểm tra đường đi thuận lợi:

- **Trường hợp thuận** — dữ liệu hợp lệ, trả 200 và đúng payload.
- **Trường hợp biên** — chuỗi rỗng, số 0, ngày ở hai đầu khoảng, danh sách rỗng.
- **Trường hợp lỗi** — thiếu trường bắt buộc trả 400, không có token trả 401, không đủ quyền trả 403, id không tồn tại trả 404.

Bỏ qua nhóm thứ ba là lỗi hay gặp nhất: API trả 200 kèm body rỗng thay vì 404 là một bug, nhưng bộ test chỉ kiểm tra đường thuận sẽ không bao giờ thấy.

### 3. Integration Testing (Kiểm thử tích hợp)

Ghép nhiều lời gọi API hoặc nhiều thành phần lại với nhau để kiểm tra chúng phối hợp đúng: API gọi database, gọi cache, gọi service khác, và dữ liệu đi qua các ranh giới đó có còn nguyên không.

Đây là nơi lộ ra những lỗi mà unit test không bao giờ thấy, vì unit test đã mock hết mọi thứ xung quanh. Với ASP.NET Core, chi tiết cách dựng loại test này — `WebApplicationFactory`, vì sao `UseInMemoryDatabase` cho kết quả sai lệch, và cách chạy trên database thật bằng Testcontainers — tôi viết riêng trong bài [API Testing trong ASP.NET Core](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-03-aspnet-core-backend/module-09-web-api-professional/9.8-api-testing).

### 4. Regression Testing (Kiểm thử hồi quy)

Chạy lại những test đã có để đảm bảo thay đổi mới không phá vỡ hành vi cũ.

Regression không phải một loại test riêng biệt về mặt kỹ thuật — nó là **cách dùng** bộ test sẵn có. Mỗi lần sửa bug, cách làm đúng là viết thêm một test tái hiện đúng bug đó rồi mới sửa. Test ấy ở lại vĩnh viễn trong bộ regression và ngăn bug quay lại.

### 5. Load Testing (Kiểm thử tải)

Mô phỏng lượng người dùng dự kiến để đo hệ thống đáp ứng thế nào: thời gian phản hồi ở các phân vị, thông lượng, tỉ lệ lỗi.

Điểm hay bị bỏ qua: **đừng nhìn giá trị trung bình**. Trung bình 200ms nghe ổn, nhưng nếu p99 là 8 giây thì cứ một trăm người dùng có một người đợi tám giây. Luôn đọc p95 và p99.

Muốn làm thật thì xem loạt bài [kiểm thử tải RESTful API bằng k6](https://tiennhm.io.vn/docs/k6/load-testing-restful-apis-with-k6-part-01): cài đặt, viết kịch bản, chạy và đọc kết quả.

### 6. Stress Testing

Đẩy tải vượt xa mức bình thường để tìm ngưỡng gãy và quan sát **cách** hệ thống gãy.

Khác biệt với load testing nằm ở mục tiêu: load hỏi "chịu được mức dự kiến không", stress hỏi "sập ở đâu, và khi sập thì sập có kiểm soát hay đổ sụp toàn bộ". Một hệ thống tốt khi quá tải sẽ từ chối bớt request và trả 429, chứ không treo toàn bộ rồi kéo sập cả những service khác.

### 7. Security Testing (Kiểm thử bảo mật)

Kiểm tra API trước các mối đe dọa. Những thứ tối thiểu phải kiểm với mọi API:

- **Xác thực** — gọi không token, token hết hạn, token giả mạo.
- **Phân quyền** — người dùng A có đọc được dữ liệu của người dùng B không, chỉ bằng cách đổi id trên URL. Đây là lỗ hổng phổ biến nhất trong thực tế.
- **Injection** — SQL injection, command injection qua tham số truy vấn.
- **Rò rỉ dữ liệu** — response có trả thừa trường nhạy cảm như mật khẩu băm, email nội bộ, stack trace không.
- **Giới hạn tốc độ** — có chặn được việc gọi hàng nghìn lần một phút không.

### 8. UI Testing (Kiểm thử giao diện người dùng)

Kiểm tra dữ liệu do API trả về được hiển thị đúng trên giao diện. Nó bắt lớp lỗi mà kiểm thử API thuần không thấy: API trả đúng nhưng frontend định dạng sai ngày tháng, làm tròn sai tiền tệ, hoặc không xử lý trường hợp danh sách rỗng.

Loại này đắt và dễ gãy, nên chỉ nên phủ những luồng quan trọng nhất — đăng nhập, thanh toán, luồng nghiệp vụ chính — chứ không phủ mọi màn hình.

### 9. Fuzz Testing

Bắn dữ liệu không hợp lệ, ngẫu nhiên hoặc ngoài dự kiến vào API để xem nó có sập không: chuỗi cực dài, ký tự unicode lạ, số âm ở chỗ chờ số dương, JSON lồng sâu hàng nghìn tầng, kiểu dữ liệu sai hoàn toàn.

Kỳ vọng đúng không phải là API xử lý được mọi rác, mà là nó **từ chối một cách có trật tự** — trả 400 kèm thông báo rõ ràng, chứ không trả 500 kèm stack trace hay làm process chết.

## Một loại thứ mười đáng biết: Contract Testing

Khi hệ thống tách thành nhiều service, lớp lỗi tốn kém nhất là khi team backend đổi cấu trúc response mà team gọi tới không biết.

Contract testing giải quyết đúng chỗ đó: hai bên thống nhất một bản hợp đồng mô tả request và response, rồi mỗi bên tự kiểm tra mình còn tuân thủ hợp đồng không. Bên cung cấp phát hiện được mình đang phá vỡ người dùng của mình **trước khi** deploy, mà không cần dựng cả hệ thống lên để test chung. Công cụ phổ biến là Pact.

## Xếp chúng vào quy trình thế nào

Thứ tự thực dụng cho một pipeline CI/CD:

1. **Mỗi pull request** — unit test, functional test, integration test. Phải nhanh, dưới mười phút, vì lập trình viên đang chờ.
2. **Sau khi merge, trước khi deploy** — toàn bộ bộ regression.
3. **Ngay sau deploy** — smoke test trên môi trường thật. Đỏ thì rollback tự động.
4. **Định kỳ hàng đêm hoặc hàng tuần** — load test, fuzz test, security scan. Chậm và ồn, không nên chặn đường merge.
5. **Trước sự kiện tải cao** — stress test, với kịch bản mô phỏng đúng đợt cao điểm dự kiến.

### Kiểm thử API là gì?

Kiểm thử API là việc gửi request trực tiếp vào tầng API của ứng dụng, thường qua HTTP, rồi kiểm tra response trả về gồm mã trạng thái, cấu trúc dữ liệu, giá trị, header và thời gian phản hồi. Nó nằm giữa unit test và test giao diện đầu-cuối trong kim tự tháp kiểm thử, nhanh và ổn định hơn test giao diện vì không đi qua trình duyệt.

### Có bao nhiêu loại kiểm thử API?

Chín loại phổ biến là smoke testing, functional testing, integration testing, regression testing, load testing, stress testing, security testing, UI testing và fuzz testing. Ngoài ra contract testing ngày càng quan trọng với hệ thống nhiều service. Chúng không thay thế nhau mà trả lời những câu hỏi khác nhau.

### Kiểm thử API khác kiểm thử chức năng ở điểm nào?

Kiểm thử chức năng là một trong các loại kiểm thử API chứ không phải khái niệm ngang hàng. Kiểm thử API chỉ tầng được kiểm thử, còn kiểm thử chức năng chỉ mục tiêu kiểm thử là so sánh kết quả thực tế với đặc tả. Có thể kiểm thử chức năng ở tầng API, và cũng có thể kiểm thử phi chức năng ở tầng API như load testing hay security testing.

### Smoke test là gì và khác regression test thế nào?

Smoke test là bộ kiểm tra rất hẹp chạy ngay sau khi deploy để xác định hệ thống có sống ở mức cơ bản không, thường chỉ vài request vào health endpoint và các endpoint quan trọng nhất. Regression test thì ngược lại, chạy lại toàn bộ test đã có để đảm bảo thay đổi mới không phá hành vi cũ, nên phạm vi rộng và thời gian chạy dài hơn nhiều.

### Load testing khác stress testing ở đâu?

Load testing mô phỏng lượng tải dự kiến trong thực tế để đo hệ thống đáp ứng thế nào về thời gian phản hồi và thông lượng. Stress testing đẩy tải vượt xa mức bình thường để tìm ngưỡng gãy và quan sát cách hệ thống gãy, xem nó từ chối bớt request một cách có kiểm soát hay đổ sụp toàn bộ.

### Test case API cần kiểm tra những gì?

Tối thiểu ba nhóm: trường hợp thuận với dữ liệu hợp lệ trả về đúng mã 200 và đúng payload, trường hợp biên như chuỗi rỗng, số 0, danh sách rỗng, ngày ở hai đầu khoảng, và trường hợp lỗi gồm thiếu trường bắt buộc trả 400, không có token trả 401, không đủ quyền trả 403, id không tồn tại trả 404. Bỏ qua nhóm trường hợp lỗi là thiếu sót phổ biến nhất.

### Vì sao nên ưu tiên kiểm thử API hơn kiểm thử giao diện?

Vì kiểm thử API nhanh hơn hàng chục lần và ổn định hơn nhiều. Test giao diện gãy vì những lý do không liên quan tới nghiệp vụ như animation chưa chạy xong, selector đổi tên hay trình duyệt cập nhật. Kiểm thử API chỉ có request và response nên khi nó báo đỏ thì gần như chắc chắn có lỗi thật. Test giao diện vẫn cần nhưng chỉ nên phủ vài luồng quan trọng nhất.

### Nên chạy loại kiểm thử nào ở bước nào trong CI/CD?

Mỗi pull request chạy unit test, functional test và integration test, giữ tổng thời gian dưới mười phút. Sau khi merge chạy toàn bộ regression. Ngay sau deploy chạy smoke test trên môi trường thật và rollback tự động nếu đỏ. Load test, fuzz test và security scan để chạy định kỳ hàng đêm hoặc hàng tuần vì chúng chậm và không nên chặn đường merge.

## Tài liệu tham khảo

- [Bài viết gốc của Alex Xu trên LinkedIn](https://www.linkedin.com/posts/alexxubyte_systemdesign-coding-interviewtips-activity-7157050982437195776-s5hC) — hình minh hoạ chín loại kiểm thử API
