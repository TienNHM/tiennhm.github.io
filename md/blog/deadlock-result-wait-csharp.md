# Gọi .Result khi nào thì deadlock, khi nào thì không?

> Nguồn: https://tiennhm.io.vn/blog/deadlock-result-wait-csharp
> Gọi .Result hay .Wait() trên một Task treo cứng ứng dụng WPF và ASP.NET Framework, nhưng chạy bình thường trong console và ASP.NET Core. Nguyên nhân nằm ở SynchronizationContext mà await bắt lại khi tạm dừng. Bài viết mổ cơ chế đó, giải thích vì sao ConfigureAwait(false) chỉ vá được một nửa vấn đề, và vì sao code không deadlock trong ASP.NET Core vẫn có thể chết vì thread pool starvation.

> `.Result` và `.Wait()` block thread hiện tại. Khi `await` tạm dừng, nó bắt lại `SynchronizationContext` đang hiện hành để chạy phần code phía sau đúng trên context đó. Nếu context chỉ cho phép một thread tại một thời điểm — UI thread của WPF, request context của ASP.NET Framework — mà thread đó lại đang bị `.Result` block, thì continuation không bao giờ vào được: deadlock. Console và ASP.NET Core không có `SynchronizationContext`, nên continuation chạy trên thread pool và không kẹt. Cách sửa thật sự là async all the way.

Đoạn code dưới đây chạy hoàn hảo trong một console app, và treo cứng khi bạn copy nguyên xi vào một controller của ASP.NET Framework hoặc một nút bấm trong WPF:

```csharp
public string GetCustomerName(int id)
{
    return GetCustomerAsync(id).Result;   // treo ở đây
}

private async Task<string> GetCustomerAsync(int id)
{
    var response = await _http.GetStringAsync($"/customers/{id}");
    return Parse(response).Name;
}
```

Không có exception, không có stack trace, không có timeout. Thread đứng im vĩnh viễn. Chuyện này không phải do `HttpClient`, cũng không phải do `async` "bị lỗi" — nó là hệ quả trực tiếp của một quyết định thiết kế trong cách `await` hoạt động.

## `await` bắt lại cái gì khi nó tạm dừng

Compiler biến mỗi method `async` thành một state machine: mỗi `await` là một checkpoint, code phía sau checkpoint được đóng gói thành một **continuation** để chạy lại sau khi Task hoàn thành ([chi tiết state machine ở đây](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-02-csharp-professional/module-06-async-programming/6.3-task-and-async-await)).

Câu hỏi quan trọng là: continuation đó sẽ chạy **trên thread nào**?

Mặc định, tại thời điểm `await` tạm dừng, awaiter đọc `SynchronizationContext.Current`. Nếu khác `null`, nó ghi nhớ context này và sau đó `Post` continuation vào đúng context ấy. Nếu `SynchronizationContext.Current` là `null`, nó lùi sang `TaskScheduler.Current`; và nếu cái đó cũng là scheduler mặc định, continuation chạy thẳng trên thread pool.

Đây là hành vi **mong muốn** chứ không phải bug. Trong WPF, nó cho phép bạn viết `await` rồi gán thẳng vào control ở dòng sau mà không cần `Dispatcher.Invoke`, vì continuation được đảm bảo quay về UI thread.

## Vì sao "quay về context" cộng với "block" thành deadlock

Điểm mấu chốt: một số `SynchronizationContext` chỉ cho phép **một thread chạy tại một thời điểm**.

- `DispatcherSynchronizationContext` (WPF) và `WindowsFormsSynchronizationContext` gắn chặt vào đúng một UI thread. `Post` nghĩa là xếp công việc vào message queue của thread đó.
- `AspNetSynchronizationContext` của ASP.NET Framework (`System.Web`) không gắn vào một thread cố định, nhưng nó tuần tự hoá: trong một request, tại một thời điểm chỉ một thread được phép chạy trong context của request đó.

Ghép hai mảnh lại, trình tự deadlock như sau:

1. UI thread (hoặc request thread) gọi `GetCustomerAsync(id)`.
2. Method chạy tới `await`, bắt lại context hiện tại, trả về một `Task` chưa hoàn thành.
3. `.Result` **block** chính thread đó để chờ `Task`.
4. HTTP call xong trên một thread pool thread. Awaiter `Post` continuation vào context đã bắt.
5. Context cần thread đang bị block ở bước 3 — hoặc chờ nó rời khỏi context. Nhưng thread đó chỉ rời đi khi `Task` hoàn thành, mà `Task` chỉ hoàn thành khi continuation chạy xong.

Hai bên chờ nhau. Không ai nhường. Đây là deadlock theo đúng nghĩa đen, không phải "chậm".

Chú ý là nó **không phụ thuộc vào việc I/O có nhanh hay không**. Nếu Task tình cờ đã hoàn thành trước khi tới `await` — cache hit chẳng hạn — `await` chạy đồng bộ, không tạm dừng, không có continuation nào cần post, và code chạy trót lọt. Chính điều này làm bug trở nên ác: nó xuất hiện không đều, phụ thuộc vào timing, và thường chỉ nổ trên môi trường thật.

## Console và ASP.NET Core khác ở chỗ nào

Đây là đoạn hay bị nói sai nhất, nên cần tách bạch hai chuyện khác nhau.

**Chuyện thứ nhất — vì sao không deadlock.** Trong một console app, `SynchronizationContext.Current` trên thread `Main` là `null`. ASP.NET Core thì cố ý **không cài** `SynchronizationContext` nào cả; toàn bộ pipeline request được thiết kế async từ đầu tới cuối ([kiến trúc pipeline](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-03-aspnet-core-backend/module-08-aspnet-core-fundamentals/8.3-request-pipeline-and-middleware)). Không có context để bắt, nên continuation rơi thẳng xuống thread pool, không cần xin phép thread nào đang bị block. Vòng chờ bị phá, `.Result` trả về bình thường.

**Chuyện thứ hai — vì sao vẫn không nên block.** Việc không deadlock **không** có nghĩa là `.Result` an toàn trong ASP.NET Core. Mỗi lần bạn block, bạn giữ một thread pool thread đứng im để chờ I/O. Thread pool phát triển rất dè dặt sau khi chạm mức tối thiểu — thứ tự vài trăm mili-giây cho mỗi thread được thêm vào. Dưới tải, số request đến nhanh hơn tốc độ thread pool nở ra, và bạn rơi vào **thread pool starvation**: latency tăng vọt, request xếp hàng, health check trượt, hệ thống trông như "treo".

Triệu chứng giống deadlock nên rất hay bị gọi nhầm là deadlock. Nhưng nguyên nhân khác hẳn, và cách sửa cũng khác: deadlock cần phá vòng chờ context, còn starvation cần ngừng block để thread quay lại phục vụ request khác ([vì sao async nâng throughput](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-02-csharp-professional/module-06-async-programming/6.2-why-async-matters)).

Tóm lại:

| Môi trường | Có SynchronizationContext? | `.Result` gây deadlock? | `.Result` có hại? |
|---|---|---|---|
| Console / worker | Không | Không | Có — block thread vô ích |
| ASP.NET Core | Không | Không | Có — thread pool starvation dưới tải |
| ASP.NET Framework | Có, tuần tự hoá theo request | Có | Rất |
| WPF / WinForms | Có, gắn vào UI thread | Có | Rất |

## Cách sửa thật sự: async all the way

Sửa deadlock không phải là tìm một cái flag. Nó là đổi chữ ký của cả chuỗi gọi để không còn chỗ nào block:

```csharp
// Controller / handler
public async Task<IActionResult> Detail(int id, CancellationToken ct)
{
    var name = await GetCustomerNameAsync(id, ct);
    return View(name);
}

public async Task<string> GetCustomerNameAsync(int id, CancellationToken ct)
{
    var customer = await GetCustomerAsync(id, ct);
    return customer?.Name ?? string.Empty;
}
```

Truyền luôn [`CancellationToken`](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-02-csharp-professional/module-06-async-programming/6.5-cancellationtoken) khi bạn đã sửa chữ ký — sau này thêm vào từng tầng một sẽ tốn công hơn nhiều.

Khi đụng một biên giới thật sự không cho phép `async Task`, có đường thoát riêng cho từng loại, chứ không phải `.Result`:

- **Entry point**: `async Task Main` được hỗ trợ từ C# 7.1.
- **Constructor**: constructor không thể `async`. Dùng factory method `static async Task CreateAsync(...)`.
- **Việc chạy nền**: đừng gọi `.Result` trong `Main` hay trong startup. Dùng `BackgroundService` / `IHostedService` ([hosted service](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-03-aspnet-core-backend/module-09-web-api-professional/9.10-hosted-service-background-jobs)).
- **Interface bạn không sửa được**: bọc lại bằng adapter async, hoặc chấp nhận block ở đúng một chỗ duy nhất và ghi rõ lý do.

Nếu nhiều việc độc lập nhau, `Task.WhenAll` cho bạn song song thật sự mà vẫn không block thread nào ([Task.WhenAll và WhenAny](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-02-csharp-professional/module-06-async-programming/6.6-task-parallel-library)).

## `ConfigureAwait(false)` giải quyết được gì, và không giải quyết được gì

`ConfigureAwait(false)` nói với awaiter: *đừng bắt context, cứ chạy continuation ở đâu cũng được*. Nó phá đúng bước 4 trong chuỗi deadlock ở trên.

```csharp
public async Task<Customer?> GetFromCacheAsync(int id)
{
    var cached = await _cache.GetAsync($"customer:{id}").ConfigureAwait(false);
    return cached is null ? null : JsonSerializer.Deserialize<Customer>(cached);
}
```

Nhưng hãy chính xác về phạm vi của nó:

- Nó chỉ áp cho **đúng một `await`** đó. Không phải cho method, càng không phải cho cả assembly.
- Vì vậy để chống deadlock bằng cách này, **mọi `await` trên toàn bộ chuỗi gọi** đều phải có. Bỏ sót một cái nằm sâu trong thư viện bên thứ ba là deadlock quay lại. Đây là lý do nó là biện pháp mong manh, không phải cách sửa.
- Nó **không** làm cho `.Result` trở nên an toàn. Thread gọi vẫn bị block, thread pool vẫn bị giữ, starvation vẫn xảy ra.
- Trong ASP.NET Core nó không có tác dụng gì về mặt đúng/sai, vì không có context để bỏ qua. Cái còn lại chỉ là một khoản tiết kiệm rất nhỏ.
- Trong code UI, đặt nó ở chỗ cần chạm control là **sai**: bạn sẽ mất UI thread và nhận `InvalidOperationException` khi gán giá trị.

Nên nhìn `ConfigureAwait(false)` là lời khuyên cho **người viết thư viện**: bạn không biết ai gọi mình, không nên áp đặt chi phí quay về context của họ, và không nên tham gia vào vòng chờ của họ. Người viết ứng dụng trên ASP.NET Core gần như không cần nó ([bảng so sánh theo loại code](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-02-csharp-professional/module-06-async-programming/6.4-configureawait)).

Từ .NET 8 còn có overload nhận `ConfigureAwaitOptions` cho `Task`, với các lựa chọn như `SuppressThrowing` hay `ForceYielding` — hữu ích, nhưng vẫn thuộc cùng một câu chuyện: điều khiển chỗ và cách continuation tiếp tục.

## `async void`: chỉ dành cho event handler

`async void` không phải là "async mà không trả giá trị" — đó là `async Task`. `async void` là một cơ chế riêng tồn tại vì một lý do duy nhất: delegate của event handler có chữ ký `void`.

Hai hệ quả khiến nó nguy hiểm ở mọi chỗ khác:

1. **Không await được.** Không có `Task` nào để chờ, nên caller không biết việc đã xong chưa, và `Task.WhenAll` không gom được nó.
2. **Exception không đi vào Task.** Nó được ném lại trên context đang hiện hành lúc method bắt đầu, hoặc trên thread pool nếu không có context. `try/catch` quanh lời gọi bắt không được, và trong nhiều host thì nó giết luôn process.

```csharp
// ĐÚNG: chữ ký bị delegate ép, và tự bắt exception bên trong
private async void BtnSave_Click(object sender, EventArgs e)
{
    try { await _customerService.SaveAsync(_current); }
    catch (Exception ex) { ShowError(ex); }
}

// SAI: service method, exception biến mất không dấu vết
public async void SendWelcomeEmail(Customer c) => await _email.SendAsync(c.Email);

// ĐÚNG
public Task SendWelcomeEmailAsync(Customer c) => _email.SendAsync(c.Email);
```

Fire-and-forget cũng vậy: `_ = DoAsync();` không an toàn hơn `async void` là mấy nếu bên trong không có `try/catch`. Muốn chạy nền đúng cách thì dùng hạ tầng chạy nền, đừng thả Task ra rồi quên ([các pattern async khác](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-02-csharp-professional/module-06-async-programming/6.7-async-patterns)).

## Mấy cách sửa nghe hợp lý nhưng không phải cách sửa

- **`GetAwaiter().GetResult()` thay cho `.Result`.** Nó chỉ đổi cách exception được bọc: ném thẳng exception gốc thay vì `AggregateException`. Về deadlock thì y hệt, vì nó vẫn block.
- **`Task.Run(() => FooAsync()).Result`.** Cái này *có* phá được deadlock, vì lambda khởi chạy trên thread pool thread nơi không có context để bắt. Nhưng bạn tiêu hai thread cho một việc, vẫn block một thread, và phải nhớ áp dụng ở mọi call site. Nó là thuốc giảm đau cho code cũ, không phải thiết kế.
- **Rắc `ConfigureAwait(false)` khắp code của mình.** Không đủ, vì chỉ cần một `await` trong dependency thiếu nó là vòng chờ đóng lại.
- **Tăng số thread tối thiểu của thread pool.** Chữa được triệu chứng starvation trong ASP.NET Core, không chữa được deadlock do context, và cũng không làm code bớt block.
- **Bọc sync I/O bằng `Task.Run` rồi gọi là "async".** Không tiết kiệm được thread nào, chỉ chuyển chỗ block. Hãy dùng API async thật, ví dụ `File.ReadAllTextAsync` thay vì `Task.Run(() => File.ReadAllText(...))` ([các pitfall thường gặp](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-02-csharp-professional/module-06-async-programming/6.8-common-pitfalls)).

Quy tắc rút gọn để nhớ: `await` bắt context, block giữ thread. Deadlock cần cả hai. Bỏ chữ block đi thì cả hai vấn đề cùng biến mất, còn bỏ chữ context đi thì bạn chỉ vá được một nửa.

## Câu hỏi thường gặp

### Vì sao code gọi .Result chạy được trên máy dev nhưng treo trên production?

Vì deadlock loại này phụ thuộc timing. Nếu Task đã hoàn thành trước khi tới await — cache hit, dữ liệu nhỏ, mạng local nhanh — thì await chạy đồng bộ, không tạo continuation nào cần post về context, nên không có gì để kẹt. Trên production, I/O chậm hơn nên await thực sự tạm dừng, continuation được post về SynchronizationContext đang bị block, và vòng chờ đóng lại. Ngoài ra máy dev thường chỉ có một request tại một thời điểm nên cũng không lộ thread pool starvation.

### ASP.NET Core không có SynchronizationContext, vậy dùng .Result có sao không?

Có. Bạn không gặp deadlock do context, nhưng mỗi lần block là giữ một thread pool thread đứng chờ I/O. Thread pool nở thêm thread rất chậm sau khi chạm mức tối thiểu, nên dưới tải request đến nhanh hơn tốc độ đó và hệ thống rơi vào thread pool starvation: latency tăng, request xếp hàng, nhìn y như treo. Triệu chứng giống deadlock nhưng nguyên nhân khác, và cách sửa vẫn là async all the way.

### ConfigureAwait(false) có làm .Result an toàn không?

Không. Nó chỉ bảo awaiter đừng quay về context đã bắt, cho đúng một await nơi nó được viết. Thread gọi vẫn bị block y như cũ. Và để chống deadlock bằng cách này thì mọi await trên toàn chuỗi gọi, kể cả trong thư viện bên thứ ba, đều phải có — sót một chỗ là deadlock quay lại. Vì vậy nó là lời khuyên cho người viết library, không phải cách sửa cho ứng dụng.

### Khi nào được phép dùng async void?

Chỉ khi chữ ký bị delegate của event ép buộc, ví dụ handler Click trong WinForms hoặc WPF, và khi đó phải tự bọc try/catch bên trong. Lý do là async void không trả Task nên không await được và không gom vào Task.WhenAll được, còn exception thì không đi vào Task mà bị ném lại trên context hiện hành hoặc trên thread pool, nên try/catch ở phía caller bắt không được và process có thể chết.

### Bị kẹt ở một biên giới đồng bộ không sửa chữ ký được thì làm sao?

Chọn đường thoát theo đúng loại biên giới thay vì gọi .Result. Entry point thì dùng async Task Main từ C# 7.1. Constructor không async được thì dùng factory method static async Task CreateAsync. Việc chạy nền thì dùng BackgroundService hoặc IHostedService. Interface bên thứ ba không sửa được thì bọc adapter async. Nếu bắt buộc phải block, hãy giới hạn ở đúng một chỗ, ghi rõ lý do, và biết là trong WPF hay ASP.NET Framework chỗ đó vẫn deadlock được.
