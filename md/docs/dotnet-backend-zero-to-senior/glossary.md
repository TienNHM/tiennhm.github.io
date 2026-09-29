# Bảng thuật ngữ

> Nguồn: https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/glossary
> Tra nhanh 28 thuật ngữ dùng xuyên suốt lộ trình .NET Backend Zero đến Senior — từ CancellationToken, middleware, N+1 tới idempotent, outbox và circuit breaker. Mỗi mục là một định nghĩa ngắn kèm đường dẫn tới bài đã giải thích đầy đủ.

> Trang này để **tra nhanh khi đang học dở**, không phải để đọc từ đầu tới cuối. Lộ trình trải qua 19 module, nên một thuật ngữ giới thiệu ở module 6 hoàn toàn có thể xuất hiện lại ở module 17 khi bạn đã quên nó là gì. Mỗi mục dưới đây chỉ có **định nghĩa vừa đủ để đọc tiếp**, kèm đường dẫn tới bài giải thích đầy đủ. Thuật ngữ được chọn theo tiêu chí xuất hiện ở nhiều module, không phải theo độ nổi tiếng.

Cách dùng: dùng mục lục bên phải, hoặc `Ctrl` + `F` ngay trên trang này.

## C# và bất đồng bộ

### LINQ

Cú pháp truy vấn tích hợp trong C#, cho phép lọc, sắp xếp và biến đổi tập dữ liệu bằng một cú pháp chung dù nguồn là list trong bộ nhớ hay bảng trong database. Với EF Core, truy vấn LINQ được dịch sang SQL — nên viết LINQ không cẩn thận là sinh ra SQL không cẩn thận.

→ [5.3 — LINQ](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-02-csharp-professional/module-05-advanced-csharp/5.3-linq)

### ConfigureAwait

Chỉ thị cho biết sau khi `await` xong thì có cần quay về synchronization context ban đầu hay không. Trong thư viện dùng chung, `ConfigureAwait(false)` tránh phụ thuộc vào context của nơi gọi; trong ứng dụng ASP.NET Core thì thường không cần vì không có context kiểu UI.

→ [6.3 — ConfigureAwait](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-02-csharp-professional/module-06-async-programming/6.3-configureawait)

### CancellationToken

Tín hiệu truyền xuống các lời gọi bất đồng bộ để báo "người gọi không cần kết quả nữa". Khi client ngắt kết nối hoặc hết thời gian chờ, token bị huỷ và các tầng phía dưới dừng sớm thay vì tiếp tục đốt tài nguyên cho một kết quả không ai nhận.

→ [6.4 — CancellationToken](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-02-csharp-professional/module-06-async-programming/6.4-cancellationtoken)

### Dependency Injection (DI)

Cách để một lớp nhận phụ thuộc từ bên ngoài thay vì tự khởi tạo. Đổi lại việc mất quyền kiểm soát vòng đời đối tượng, bạn được khả năng thay thế phụ thuộc khi test và khi đổi hạ tầng.

→ [7.1 — Vấn đề mà DI giải quyết](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-02-csharp-professional/module-07-dependency-injection/7.1-di-problem-scope)

## ASP.NET Core

### Middleware

Một mắt xích trong chuỗi xử lý request. Mỗi middleware nhận request, làm việc của mình, rồi quyết định gọi tiếp mắt xích sau hay trả về luôn — nên **thứ tự đăng ký quyết định hành vi**, không phải chỉ là chuyện sắp xếp cho gọn.

→ [8.2 — Request Pipeline và Middleware](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-03-aspnet-core-backend/module-08-aspnet-core-fundamentals/8.2-request-pipeline-and-middleware)

### ProblemDetails

Định dạng chuẩn hoá cho thân phản hồi lỗi của HTTP API, quy định bởi RFC 7807. Thay vì mỗi endpoint trả một hình dạng lỗi khác nhau, mọi lỗi dùng chung các trường như `type`, `title`, `status`, `detail` — client chỉ cần viết một chỗ xử lý.

→ [8.8 — Global Exception Handling](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-03-aspnet-core-backend/module-08-aspnet-core-fundamentals/8.8-global-exception-handling)

### Rate limiting

Giới hạn số request mà một client được phép gửi trong một khoảng thời gian. Mục đích không chỉ là chống lạm dụng mà còn là tự bảo vệ: khi quá tải, từ chối bớt một cách có kiểm soát vẫn tốt hơn là sập toàn bộ.

→ [9.6 — Rate Limiting](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-03-aspnet-core-backend/module-09-web-api-professional/9.6-rate-limiting)

### BackgroundService

Lớp cơ sở để chạy công việc nền suốt vòng đời ứng dụng, tách khỏi luồng xử lý request. Dùng khi việc cần làm không nên bắt người dùng đứng chờ — gửi email, xử lý hàng đợi, dọn dẹp định kỳ.

→ [9.9 — Hosted Service và Background Jobs](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-03-aspnet-core-backend/module-09-web-api-professional/9.9-hosted-service-background-jobs)

### WebApplicationFactory

Công cụ dựng toàn bộ ứng dụng trong bộ nhớ và trả về một `HttpClient` gọi vào nó, không mở cổng mạng. Request vẫn đi qua đủ pipeline — routing, model binding, validation, filter — nên nó là điểm giữa giữa unit test và test đầu-cuối.

→ [9.8 — API Testing](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-03-aspnet-core-backend/module-09-web-api-professional/9.8-api-testing)

### Testcontainers

Thư viện khởi động database hoặc dịch vụ phụ thuộc thật trong Docker ngay lúc chạy test, rồi dọn sạch sau đó. Giải pháp cho vấn đề provider in-memory không có ràng buộc, không có transaction thật và không dịch SQL — khiến test xanh trong khi production đỏ.

→ [9.8 — API Testing](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-03-aspnet-core-backend/module-09-web-api-professional/9.8-api-testing)

### JWT

Chuỗi token tự chứa thông tin, được ký để bên nhận xác minh tính toàn vẹn mà không cần hỏi lại máy chủ cấp phát. Đặc điểm quan trọng: **ký không phải mã hoá** — nội dung bên trong ai đọc cũng được, nên đừng đặt thông tin nhạy cảm vào.

→ [10.2 — JWT Authentication](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-03-aspnet-core-backend/module-10-authentication-authorization/10.2-jwt-authentication)

### Refresh token

Token có tuổi thọ dài, dùng để xin access token mới khi token cũ hết hạn, nhờ đó access token được để sống rất ngắn. Đây là cách cân bằng giữa trải nghiệm đăng nhập và thiệt hại khi token bị lộ.

→ [10.3 — Refresh Token](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-03-aspnet-core-backend/module-10-authentication-authorization/10.3-refresh-token)

## Dữ liệu và EF Core

### DbContext

Đại diện cho một phiên làm việc với database: theo dõi thay đổi của các entity rồi đẩy xuống một lượt khi gọi `SaveChanges`. Nó được đăng ký `Scoped` vì được thiết kế để sống đúng một đơn vị công việc, thường là một HTTP request.

→ [13.2 — DbContext và Entity Configuration](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-13-entity-framework-core/13.2-dbcontext-and-entity-configuration)

### Unit of Work / Repository

Hai pattern gom thao tác dữ liệu thành một đơn vị và che giấu chi tiết truy cập. Điểm cần nhớ của lộ trình này: **`DbContext` đã là một Unit of Work và `DbSet` đã là một Repository** — bọc thêm một lớp chỉ để gọi lại chúng là thêm code mà không thêm khả năng nào.

→ [13.9 — Unit of Work và Repository Pattern](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-13-entity-framework-core/13.9-unit-of-work-and-repository-pattern)

### N+1

Một truy vấn để lấy danh sách, rồi thêm một truy vấn nữa cho mỗi phần tử trong danh sách đó. Với 200 bản ghi là 201 lần đi về database, và phần lớn thời gian mất vào độ trễ mạng chứ không phải công việc thật.

→ [13.6 — N+1 Problem](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-13-entity-framework-core/13.6-n-plus-1-problem)

### Concurrency token

Một cột được đưa vào mệnh đề `WHERE` của lệnh `UPDATE` để phát hiện người khác đã sửa bản ghi trước bạn. Không có nó thì mặc định là *last write wins*: người lưu sau ghi đè thay đổi của người trước và không ai biết.

→ [13.8 — Concurrency Control](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-13-entity-framework-core/13.8-concurrency-control)

### Isolation level

Mức cô lập của transaction, quy định giao dịch này được phép nhìn thấy gì từ giao dịch đang chạy song song. Mỗi mức cho phép một nhóm hiện tượng bất thường khác nhau, nên chọn mức là chọn đánh đổi giữa tính đúng đắn và khả năng chịu tải.

→ [12.6 — Transactions và Locking](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-12-sql-deep-dive/12.6-transactions-and-locking)

### Deadlock

Hai giao dịch cùng chờ khoá mà bên kia đang giữ, nên không bên nào đi tiếp được. Cách phòng thực dụng nhất là luôn khoá các tài nguyên theo cùng một thứ tự ở mọi nơi trong code.

→ [12.6 — Transactions và Locking](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-12-sql-deep-dive/12.6-transactions-and-locking)

## Cache, việc nền và vận hành

### HybridCache

API cache của .NET 9 gộp cache trong tiến trình và cache phân tán thành một lớp, đồng thời xử lý sẵn bài toán nhiều request cùng dựng lại một khoá vừa hết hạn.

→ [14.5 — HybridCache](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-14-caching-background-jobs/14.5-hybridcache-dotnet-9)

### Cache invalidation

Việc quyết định khi nào dữ liệu trong cache không còn đúng nữa và phải bỏ đi. Phần khó không nằm ở kỹ thuật xoá mà ở chỗ biết được điều gì vừa thay đổi và những khoá nào bị ảnh hưởng.

→ [14.4 — Cache Invalidation Strategies](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-14-caching-background-jobs/14.4-cache-invalidation-strategies)

### Hangfire

Thư viện chạy job nền cho .NET, lưu trạng thái job xuống database nên job không mất khi tiến trình khởi động lại. Khác biệt chính so với `BackgroundService` thuần là khả năng bền bỉ và lịch chạy.

→ [14.6 — Hangfire Background Jobs](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-14-caching-background-jobs/14.6-hangfire-background-jobs)

### Idempotent

Tính chất của thao tác mà thực hiện nhiều lần cho kết quả giống hệt thực hiện một lần. Nó bắt buộc trong hệ phân tán vì **exactly-once không tồn tại**: bạn chỉ chọn được giữa có thể mất và có thể trùng, và hầu hết chọn có thể trùng.

→ [14.9 — Idempotency và Retry](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-14-caching-background-jobs/14.9-idempotency-and-retry)

### Circuit breaker

Cơ chế ngừng gọi một dịch vụ đang hỏng trong một khoảng thời gian, thay vì tiếp tục gọi và chờ timeout. Mục đích là không để sự cố của một dịch vụ kéo sập những dịch vụ gọi tới nó.

→ [14.9 — Idempotency và Retry](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-14-caching-background-jobs/14.9-idempotency-and-retry)

### OpenTelemetry

Bộ chuẩn và thư viện để sinh log, metric và trace theo một định dạng chung, không gắn với nhà cung cấp cụ thể. Nhờ đó đổi hệ thống giám sát không phải viết lại phần đo đạc trong code.

→ [15.8 — Production Monitoring](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-15-docker-deployment/15.8-production-monitoring)

## Kiến trúc và hệ phân tán

### FluentValidation

Thư viện tách luật kiểm tra dữ liệu ra khỏi model, viết thành lớp riêng. Hữu ích khi luật phức tạp hoặc phụ thuộc lẫn nhau, lúc mà attribute gắn trên thuộc tính trở nên chật chội.

→ [16.7 — FluentValidation](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-05-senior-engineering/module-16-clean-architecture/16.7-fluentvalidation)

### Outbox

Cách giải bài toán ghi hai nơi: thay vì vừa ghi database vừa bắn message ra ngoài, bạn ghi message vào chính database nghiệp vụ trong chính transaction đang chạy. Commit thì message chắc chắn có, rollback thì message biến mất cùng dữ liệu; một worker đọc bảng đó rồi publish sau.

→ [17.3 — Outbox Pattern](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-05-senior-engineering/module-17-distributed-systems/17.3-outbox-pattern-applied)

### Retry và backoff

Thử lại một thao tác đã thất bại, với khoảng chờ tăng dần giữa các lần. Hai điều kiện đi kèm: chỉ retry lỗi có thể tự khỏi, và thao tác phải idempotent — nếu không, retry biến một lỗi tạm thời thành dữ liệu trùng.

→ [17.6 — Retry và Backoff](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-05-senior-engineering/module-17-distributed-systems/17.6-retry-and-backoff)

### Distributed lock

Khoá dùng chung giữa nhiều tiến trình hoặc nhiều máy, để đảm bảo chỉ một nơi chạy một đoạn công việc tại một thời điểm. Cần khi ứng dụng chạy nhiều bản sao mà một job chỉ được phép chạy một lần.

→ [19.7 — Distributed Lock](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-05-senior-engineering/module-19-performance-engineering/19.7-distributed-lock)
