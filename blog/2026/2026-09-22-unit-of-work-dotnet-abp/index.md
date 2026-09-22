---
title: "Unit of Work trong .NET và ABP: SaveChangesAsync không phải commit"
slug: unit-of-work-dotnet-abp
description: "DbContext của EF Core bản thân nó đã là một Unit of Work, nên bọc thêm một interface IUnitOfWork gọi SaveChanges thường chỉ thêm lớp trung gian vô ích. ABP đi hướng khác: Unit of Work là ambient, tự mở theo request, và SaveChangesAsync bên trong nó không commit — chỉ CompleteAsync mới commit. Bài này giải thích cơ chế, những chỗ hay sập trong background job, và cách chạy side effect sau khi commit bằng OnCompleted."
keywords: [unit of work dotnet, unit of work abp, abp framework unit of work, iunitofworkmanager, completeasync savechangesasync, abp uow, dbcontext unit of work, ef core savechanges khong commit, unitofwork attribute abp, ambient unit of work, abp transaction, unitofworktransactionbehavior, abp background job unit of work, oncompleted abp, outbox pattern abp, distributed event abp, repository pattern dotnet, iunitofworkenabled, abp applicationservice, nested unit of work, requiresnew abp, abp isolation level, transaction scope dotnet, hangfire unit of work, abp 9, dotnet 9 backend]
tags: [dotnet, abp, aspnetcore, ef-core, architecture, backend]
authors: [tiennhm]
date: 2026-09-22
---

import { SummaryBox, FAQSection } from '@site/src/components/SEO';

# Unit of Work trong .NET và ABP

<SummaryBox>
`DbContext` của EF Core đã là một Unit of Work sẵn: nó gom thay đổi trong change tracker rồi đẩy xuống database trong một transaction khi gọi `SaveChanges`. Vì vậy tự viết thêm một `IUnitOfWork` chỉ để gọi `SaveChanges` thường là thừa. ABP thì khác hẳn: Unit of Work ở đây là **ambient**, tự mở theo mỗi request, và `SaveChangesAsync` bên trong một UoW **không commit transaction** — chỉ `CompleteAsync` mới commit. Hiểu sai chỗ này là nguồn gốc của phần lớn bug "dữ liệu lúc có lúc không".
</SummaryBox>

Unit of Work là một trong những pattern bị viết lại nhiều nhất trong thế giới .NET, và cũng là pattern bị viết lại một cách thừa thãi nhiều nhất. Bài này tách làm hai phần: EF Core thuần thì bạn cần gì, và ABP đã làm sẵn những gì mà bạn nên hiểu trước khi đụng vào.

<!-- truncate -->

## Phần 1 — `DbContext` đã là Unit of Work rồi

Định nghĩa gốc của pattern: gom một nhóm thao tác đọc/ghi thành một đơn vị công việc, theo dõi những gì đã đổi, rồi đẩy tất cả xuống database một lượt, thành công hết hoặc hỏng hết.

Đọc lại định nghĩa đó rồi nhìn `DbContext`:

- change tracker theo dõi mọi entity đã `Add`, `Update`, `Remove`
- `SaveChanges` sinh ra các câu lệnh và **bọc chúng trong một transaction** nếu chưa có transaction nào đang mở

Nói cách khác, `DbContext` chính là một implementation của Unit of Work. Nó được thiết kế để sống đúng một đơn vị công việc — thường là một HTTP request — và đó cũng là lý do nó được đăng ký `Scoped`. Phần vòng đời này tôi đã viết riêng trong bài [Singleton, Scoped hay Transient](/blog/singleton-scoped-transient-captive-dependency), vì giữ một `DbContext` sống lâu hơn một đơn vị công việc là một lớp bug riêng.

Cho nên đoạn code kiểu này:

```csharp
public interface IUnitOfWork
{
    Task<int> SaveChangesAsync(CancellationToken ct = default);
}

public class UnitOfWork : IUnitOfWork
{
    private readonly CrmDbContext _db;
    public UnitOfWork(CrmDbContext db) => _db = db;
    public Task<int> SaveChangesAsync(CancellationToken ct = default) => _db.SaveChangesAsync(ct);
}
```

chỉ là một lớp bọc quanh thứ vốn đã làm đúng việc đó. Nó không thêm khả năng nào, nhưng thêm một interface phải maintain và một lớp gián tiếp khiến người đọc code phải nhảy thêm một bước. Phần đánh đổi giữa dùng Repository/UoW và dùng thẳng `DbContext` được bàn kỹ hơn ở [13.10 — Unit of Work và Repository pattern](/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-13-entity-framework-core/13.10-unit-of-work-and-repository-pattern).

### Khi nào thì thật sự cần nhiều hơn `SaveChanges`

Có ba tình huống `DbContext` một mình không giải quyết được:

1. **Nhiều `DbContext` trong cùng một thao tác.** Mỗi `SaveChanges` là một transaction riêng. Muốn chúng cùng thành công hoặc cùng hỏng thì cần một transaction bao ngoài.
2. **Trộn database với resource khác.** Ghi database rồi bắn message lên broker. `SaveChanges` không biết gì về broker, nên nếu message bay đi trước khi transaction commit, bạn vừa tạo ra một sự kiện mô tả chuyện chưa từng xảy ra.
3. **Cần kiểm soát isolation level.** Hành vi mặc định không phải lúc nào cũng đúng cho báo cáo hay cho thao tác đọc rồi ghi. Chi tiết ở [12.7 — Transactions và locking](/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-12-sql-deep-dive/12.7-transactions-and-locking).

Đây chính là khoảng trống mà Unit of Work của ABP lấp vào.

## Phần 2 — Unit of Work trong ABP là ambient

Khác biệt lớn nhất: trong ABP bạn **không tự tạo** Unit of Work cho luồng thông thường. Nó đã ở sẵn đó.

`ApplicationService` của ABP implement interface đánh dấu `IUnitOfWorkEnabled`. Interceptor của framework nhìn thấy marker đó và tự mở một Unit of Work bao quanh lời gọi method. Nghĩa là mọi method trong application service của bạn đã chạy trong một UoW mà không cần khai báo gì thêm.

Truy cập UoW đang hiện hành qua `IUnitOfWorkManager`:

```csharp
public class LeadAppService : ApplicationService, ILeadAppService
{
    private readonly IRepository<Lead, Guid> _leadRepository;

    public LeadAppService(IRepository<Lead, Guid> leadRepository)
        => _leadRepository = leadRepository;

    public async Task<Guid> CreateAsync(CreateLeadDto input)
    {
        var lead = new Lead(GuidGenerator.Create(), input.Name);
        await _leadRepository.InsertAsync(lead);

        // Không cần gọi SaveChanges hay CompleteAsync ở đây.
        // UoW ambient do interceptor mở sẽ tự complete khi method trả về.
        return lead.Id;
    }
}
```

### `SaveChangesAsync` và `CompleteAsync` không phải là một

Đây là chỗ hay hiểu nhầm nhất, và cũng là lý do bài này có cái tiêu đề như vậy.

`IUnitOfWork` của ABP có cả hai method, và chúng làm hai việc khác nhau:

- **`SaveChangesAsync`** đẩy các thay đổi đang chờ xuống database để lấy ID sinh bởi database, để câu truy vấn kế tiếp nhìn thấy dữ liệu vừa ghi, hoặc để một constraint nổ sớm. Nó **không commit transaction**.
- **`CompleteAsync`** mới là thứ commit: nó save changes lần cuối rồi commit toàn bộ transaction của UoW đó.

Hệ quả thực tế: gọi `SaveChangesAsync` xong mà đâu đó phía sau ném exception thì toàn bộ, bao gồm cả phần vừa "save", đều bị rollback. Đúng như thiết kế — nhưng nếu bạn tưởng `SaveChangesAsync` là điểm không quay lại thì hành vi này trông y hệt một bug ma.

```csharp
public class ImportAppService : ApplicationService
{
    private readonly IUnitOfWorkManager _unitOfWorkManager;

    public ImportAppService(IUnitOfWorkManager unitOfWorkManager)
        => _unitOfWorkManager = unitOfWorkManager;

    public async Task ImportAsync(List<CreateLeadDto> rows)
    {
        // requiresNew: true => tách hẳn khỏi UoW đang có, không nhập vào nó
        using var uow = _unitOfWorkManager.Begin(requiresNew: true, isTransactional: true);

        foreach (var row in rows)
        {
            await _leadRepository.InsertAsync(new Lead(GuidGenerator.Create(), row.Name));
        }

        // Ép ghi xuống DB giữa chừng, nhưng CHƯA commit
        await uow.SaveChangesAsync();

        // Đây mới là commit
        await uow.CompleteAsync();
    }
}
```

Chữ ký thật của extension method này là `Begin(bool requiresNew = false, bool isTransactional = false, IsolationLevel? isolationLevel = null, TimeSpan? timeout = null)`.

### `requiresNew` và Unit of Work lồng nhau

Mặc định `requiresNew` là `false`. Khi đó `Begin` **không** tạo UoW mới mà nhập vào UoW đang hiện hành — ABP trả về một child UoW có tham chiếu `Outer` trỏ tới UoW cha, và `CompleteAsync` trên child đó không commit gì cả. Chỉ UoW ngoài cùng mới commit thật.

Đây là hành vi đúng cho phần lớn trường hợp, nhưng nó phá vỡ kỳ vọng khi bạn muốn một thao tác tồn tại độc lập — ví dụ ghi audit log phải còn lại kể cả khi nghiệp vụ chính rollback. Muốn vậy thì phải `requiresNew: true`.

### Điều khiển transaction

`UnitOfWorkAttribute` cho phép chỉnh trên từng method với các thuộc tính `IsTransactional`, `IsolationLevel`, `Timeout` và `IsDisabled`:

```csharp
[UnitOfWork(isTransactional: true, IsolationLevel = IsolationLevel.ReadCommitted)]
public async Task TransferOwnershipAsync(Guid leadId, Guid newOwnerId) { /* ... */ }

[UnitOfWork(IsDisabled = true)]
public async Task<List<LeadDto>> GetReportAsync() { /* ... */ }
```

Ở mức toàn ứng dụng, `AbpUnitOfWorkDefaultOptions.TransactionBehavior` nhận ba giá trị: `Auto`, `Enabled` và `Disabled`. `Auto` để framework tự quyết theo ngữ cảnh. Với những thao tác mà tính nguyên tử là yêu cầu nghiệp vụ, đừng dựa vào `Auto` — khai báo thẳng `isTransactional` để ý định nằm trong code chứ không nằm trong trí nhớ của người viết.

### `OnCompleted` — nơi đặt side effect

Đây là API đáng giá nhất của UoW trong ABP, và cũng là thứ bị bỏ qua nhiều nhất.

Gửi email, đẩy notification, gọi service ngoài — nếu làm thẳng trong method, chúng sẽ chạy **trước** khi transaction commit. Transaction rollback sau đó thì email đã gửi rồi, không lấy lại được. Bạn vừa thông báo cho khách hàng về một thứ không tồn tại trong database.

`OnCompleted` đăng ký một callback chỉ chạy **sau khi commit thành công**:

```csharp
public async Task AssignAsync(Guid leadId, Guid userId)
{
    var lead = await _leadRepository.GetAsync(leadId);
    lead.AssignTo(userId);

    _unitOfWorkManager.Current.OnCompleted(async () =>
    {
        // Chỉ chạy nếu transaction đã commit thành công
        await _notificationSender.NotifyAssignedAsync(leadId, userId);
    });
}
```

Cùng nguyên tắc đó, `AddOrReplaceDistributedEvent` gắn distributed event vào UoW để nó đi cùng nhịp với transaction thay vì bay đi sớm. Đây chính là bài toán mà [17.4 — Outbox pattern](/docs/dotnet-backend-zero-to-senior/stage-05-senior-engineering/module-17-distributed-systems/17.4-outbox-pattern-applied) giải quyết ở mức kiến trúc, và [17.3 — Lo lắng khi làm messaging](/docs/dotnet-backend-zero-to-senior/stage-05-senior-engineering/module-17-distributed-systems/17.3-messaging-fears-lost-duplicates) mô tả hậu quả khi làm sai.

## Phần 3 — Những chỗ hay sập

**Background job không có UoW ambient.** Interceptor gắn vào application service, không gắn vào `BackgroundService` hay job handler của Hangfire. Trong worker bạn phải tự mở scope DI rồi tự `Begin`. Đây đúng là vấn đề captive dependency đã nói ở [bài về service lifetime](/blog/singleton-scoped-transient-captive-dependency): `BackgroundService` là singleton, nên mỗi vòng lặp phải tạo scope riêng. Xem thêm [9.10 — Hosted service và background job](/docs/dotnet-backend-zero-to-senior/stage-03-aspnet-core-backend/module-09-web-api-professional/9.10-hosted-service-background-jobs) và [14.7 — Hangfire](/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-14-caching-background-jobs/14.7-hangfire-background-jobs).

**Quên rằng `using` mà không `CompleteAsync` nghĩa là rollback.** UoW nào bị dispose mà chưa complete thì coi như hỏng. Một nhánh `return` sớm giữa method là đủ để mất trắng thay đổi mà không có exception nào.

**Tưởng UoW lồng nhau là transaction riêng.** Nếu không truyền `requiresNew: true`, thao tác của bạn nằm chung số phận với UoW cha.

**Đặt truy vấn nặng trong UoW có transaction.** Transaction mở càng lâu thì giữ lock càng lâu. Báo cáo chỉ đọc thì nên tách ra, `[UnitOfWork(IsDisabled = true)]` là một lựa chọn. Vấn đề số lượng truy vấn thì lại là chuyện khác — xem [bài về N+1 trong EF Core](/blog/ef-core-n-plus-1-query).

## Vậy tóm lại nên làm gì

Với ứng dụng EF Core thuần: dùng thẳng `DbContext`, đừng bọc thêm `IUnitOfWork` nếu nó không thêm khả năng nào. Cần transaction bao nhiều `SaveChanges` thì dùng `IDbContextTransaction`.

Với ABP: đừng tự dựng lại thứ đã có. Hiểu rằng UoW là ambient, rằng `CompleteAsync` mới commit, và rằng `OnCompleted` là chỗ đúng để đặt mọi side effect ra thế giới bên ngoài.

<FAQSection
  items={[
    {
      question: "DbContext đã là Unit of Work thì còn cần pattern này làm gì?",
      answer: "Cần khi một đơn vị công việc vượt quá phạm vi một DbContext: nhiều DbContext phải cùng commit, hoặc phải phối hợp database với một resource khác như message broker, hoặc cần kiểm soát isolation level. Nếu chỉ có một DbContext và một SaveChanges thì thêm interface IUnitOfWork gọi SaveChanges là thêm lớp gián tiếp mà không thêm khả năng."
    },
    {
      question: "SaveChangesAsync khác CompleteAsync ở điểm nào trong ABP?",
      answer: "SaveChangesAsync đẩy thay đổi đang chờ xuống database nhưng không commit transaction, dùng khi cần lấy ID do database sinh hoặc cần truy vấn tiếp nhìn thấy dữ liệu vừa ghi. CompleteAsync mới save lần cuối rồi commit. Nếu có exception sau khi gọi SaveChangesAsync, phần đã save vẫn bị rollback vì transaction chưa hề được commit."
    },
    {
      question: "Gọi Begin mà không truyền requiresNew thì chuyện gì xảy ra?",
      answer: "Mặc định requiresNew là false, nên Begin không tạo Unit of Work mới mà nhập vào UoW đang hiện hành. ABP trả về một child UoW có Outer trỏ tới UoW cha, và CompleteAsync trên child không commit gì; chỉ UoW ngoài cùng mới commit. Muốn một thao tác commit độc lập, ví dụ audit log phải còn lại kể cả khi nghiệp vụ chính rollback, thì phải truyền requiresNew: true."
    },
    {
      question: "Vì sao không nên gửi email hay bắn event ngay trong application service?",
      answer: "Vì lúc đó transaction chưa commit. Nếu sau đó có exception và transaction rollback, email đã gửi đi rồi còn dữ liệu thì không tồn tại. Dùng OnCompleted của Unit of Work để đăng ký callback chỉ chạy sau khi commit thành công, hoặc AddOrReplaceDistributedEvent cho distributed event để nó đi cùng nhịp với transaction."
    },
    {
      question: "Trong BackgroundService hay Hangfire job thì Unit of Work hoạt động thế nào?",
      answer: "Không tự động. Interceptor của ABP gắn vào các type implement IUnitOfWorkEnabled như ApplicationService, còn BackgroundService và job handler nằm ngoài phạm vi đó. Trong worker bạn phải tự tạo DI scope cho mỗi lần chạy rồi tự gọi IUnitOfWorkManager.Begin, giống như cách xử lý captive dependency với service Scoped trong một singleton."
    }
  ]}
/>
