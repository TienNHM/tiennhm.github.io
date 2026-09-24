# Unit of Work in .NET and ABP: SaveChangesAsync Is Not a Commit

> Nguồn: https://tiennhm.io.vn/en/blog/unit-of-work-dotnet-abp
> EF Core's DbContext is already a Unit of Work, so wrapping another IUnitOfWork interface around a SaveChanges call usually just adds a useless layer of indirection. ABP takes a different route: its Unit of Work is ambient, opens automatically per request, and SaveChangesAsync inside one does not commit — only CompleteAsync does. This post explains the mechanism, the places background jobs break, and how to run side effects after commit with OnCompleted.

> EF Core's `DbContext` is already a Unit of Work: it collects changes in the change tracker and pushes them to the database inside one transaction when you call `SaveChanges`. Writing your own `IUnitOfWork` purely to call `SaveChanges` is therefore usually redundant. ABP is a different matter entirely: there, the Unit of Work is **ambient**, opens automatically per request, and `SaveChangesAsync` inside a UoW **does not commit the transaction** — only `CompleteAsync` does. Misreading that one point is the source of most "the data is there sometimes" bugs.

Unit of Work is one of the most frequently reimplemented patterns in the .NET world, and also the one most frequently reimplemented for no reason. This post splits into two parts: what you actually need with plain EF Core, and what ABP has already done for you that you should understand before touching it.

## Part 1 — `DbContext` is already a Unit of Work

The original definition of the pattern: gather a group of read/write operations into one unit of work, track what changed, then push it all to the database at once — all succeeding or all failing.

Read that definition again and look at `DbContext`:

- the change tracker follows every entity you `Add`, `Update` or `Remove`
- `SaveChanges` generates the statements and **wraps them in a transaction** if none is already open

In other words, `DbContext` *is* an implementation of Unit of Work. It was designed to live for exactly one unit of work — typically one HTTP request — which is also why it is registered as `Scoped`. I wrote about that lifetime separately in [Singleton, Scoped or Transient](https://tiennhm.io.vn/blog/singleton-scoped-transient-captive-dependency), because keeping a `DbContext` alive longer than one unit of work is a class of bug all of its own.

So code like this:

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

is nothing but a wrapper around something that already does that job. It adds no capability, but it does add an interface to maintain and a layer of indirection that forces every reader of the code to take one more hop. The trade-off between using Repository/UoW and using `DbContext` directly is discussed in more depth in [13.10 — Unit of Work and the Repository pattern](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-13-entity-framework-core/13.9-unit-of-work-and-repository-pattern).

### When you genuinely need more than `SaveChanges`

There are three situations `DbContext` alone cannot handle:

1. **Several `DbContext` instances in one operation.** Each `SaveChanges` is its own transaction. To make them succeed or fail together you need a transaction wrapped around both.
2. **Mixing the database with another resource.** Write to the database, then publish a message to a broker. `SaveChanges` knows nothing about the broker, so if the message goes out before the transaction commits, you have just produced an event describing something that never happened.
3. **Needing control over the isolation level.** The default behaviour is not always right for reports or for read-then-write operations. Details in [12.7 — Transactions and locking](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-12-sql-deep-dive/12.6-transactions-and-locking).

That is exactly the gap ABP's Unit of Work fills.

## Part 2 — ABP's Unit of Work is ambient

The biggest difference: in ABP you **do not create** a Unit of Work yourself for the normal flow. It is already there.

ABP's `ApplicationService` implements the marker interface `IUnitOfWorkEnabled`. The framework's interceptor sees that marker and opens a Unit of Work around the method call automatically. Which means every method in your application service already runs inside a UoW with nothing declared.

You reach the current UoW through `IUnitOfWorkManager`:

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

        // No need to call SaveChanges or CompleteAsync here.
        // The ambient UoW opened by the interceptor completes when the method returns.
        return lead.Id;
    }
}
```

### `SaveChangesAsync` and `CompleteAsync` are not the same thing

This is the most commonly misunderstood point, and the reason this post carries the title it does.

ABP's `IUnitOfWork` has both methods, and they do two different jobs:

- **`SaveChangesAsync`** pushes pending changes to the database so you can get a database-generated ID, so the next query sees the data you just wrote, or so a constraint fails early. It **does not commit the transaction**.
- **`CompleteAsync`** is what commits: it saves changes one final time and then commits that UoW's whole transaction.

The practical consequence: call `SaveChangesAsync` and then have something later throw, and everything rolls back — including the part you just "saved". That is by design, but if you believed `SaveChangesAsync` was the point of no return, the behaviour looks exactly like a phantom bug.

```csharp
public class ImportAppService : ApplicationService
{
    private readonly IUnitOfWorkManager _unitOfWorkManager;

    public ImportAppService(IUnitOfWorkManager unitOfWorkManager)
        => _unitOfWorkManager = unitOfWorkManager;

    public async Task ImportAsync(List<CreateLeadDto> rows)
    {
        // requiresNew: true => stand apart from the ambient UoW instead of joining it
        using var uow = _unitOfWorkManager.Begin(requiresNew: true, isTransactional: true);

        foreach (var row in rows)
        {
            await _leadRepository.InsertAsync(new Lead(GuidGenerator.Create(), row.Name));
        }

        // Force a write to the DB mid-way, but WITHOUT committing
        await uow.SaveChangesAsync();

        // This is the commit
        await uow.CompleteAsync();
    }
}
```

The real signature of this extension method is `Begin(bool requiresNew = false, bool isTransactional = false, IsolationLevel? isolationLevel = null, TimeSpan? timeout = null)`.

### `requiresNew` and nested Units of Work

`requiresNew` defaults to `false`. In that case `Begin` does **not** create a new UoW but joins the ambient one — ABP returns a child UoW whose `Outer` reference points at the parent, and `CompleteAsync` on that child commits nothing. Only the outermost UoW really commits.

That is the right behaviour most of the time, but it breaks expectations when you want an operation to survive independently — writing an audit log that must remain even if the main business operation rolls back, for instance. For that you need `requiresNew: true`.

### Controlling the transaction

`UnitOfWorkAttribute` lets you tune things per method through `IsTransactional`, `IsolationLevel`, `Timeout` and `IsDisabled`:

```csharp
[UnitOfWork(isTransactional: true, IsolationLevel = IsolationLevel.ReadCommitted)]
public async Task TransferOwnershipAsync(Guid leadId, Guid newOwnerId) { /* ... */ }

[UnitOfWork(IsDisabled = true)]
public async Task<List<LeadDto>> GetReportAsync() { /* ... */ }
```

Application-wide, `AbpUnitOfWorkDefaultOptions.TransactionBehavior` takes three values: `Auto`, `Enabled` and `Disabled`. `Auto` leaves the decision to the framework based on context. For operations where atomicity is a business requirement, do not rely on `Auto` — declare `isTransactional` explicitly so the intent lives in the code rather than in the author's memory.

### `OnCompleted` — where side effects belong

This is the most valuable API the ABP UoW offers, and also the most overlooked.

Sending email, pushing a notification, calling an external service — do those inline in the method and they run **before** the transaction commits. If the transaction then rolls back, the email is already gone and cannot be recalled. You have just told a customer about something that does not exist in the database.

`OnCompleted` registers a callback that only runs **after a successful commit**:

```csharp
public async Task AssignAsync(Guid leadId, Guid userId)
{
    var lead = await _leadRepository.GetAsync(leadId);
    lead.AssignTo(userId);

    _unitOfWorkManager.Current.OnCompleted(async () =>
    {
        // Runs only if the transaction committed successfully
        await _notificationSender.NotifyAssignedAsync(leadId, userId);
    });
}
```

On the same principle, `AddOrReplaceDistributedEvent` attaches a distributed event to the UoW so it moves in step with the transaction instead of flying off early. That is exactly the problem [17.4 — The outbox pattern](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-05-senior-engineering/module-17-distributed-systems/17.3-outbox-pattern-applied) solves at the architectural level, and [17.3 — Messaging fears](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-05-senior-engineering/module-17-distributed-systems/17.2-messaging-fears-lost-duplicates) describes what happens when you get it wrong.

## Part 3 — Where this tends to break

**Background jobs have no ambient UoW.** The interceptor attaches to application services, not to a `BackgroundService` or a Hangfire job handler. Inside a worker you have to open a DI scope and call `Begin` yourself. This is precisely the captive dependency problem covered in [the service lifetime post](https://tiennhm.io.vn/blog/singleton-scoped-transient-captive-dependency): `BackgroundService` is a singleton, so each loop iteration needs its own scope. See also [9.10 — Hosted services and background jobs](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-03-aspnet-core-backend/module-09-web-api-professional/9.9-hosted-service-background-jobs) and [14.7 — Hangfire](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-14-caching-background-jobs/14.6-hangfire-background-jobs).

**Forgetting that a `using` without `CompleteAsync` means a rollback.** Any UoW disposed without completing is treated as failed. One early `return` in the middle of a method is enough to lose all your changes without a single exception.

**Assuming a nested UoW is its own transaction.** Without `requiresNew: true`, your operation shares the fate of the parent UoW.

**Putting heavy queries inside a transactional UoW.** The longer a transaction stays open, the longer it holds locks. Read-only reports should be separated out, and `[UnitOfWork(IsDisabled = true)]` is one way to do it. The number of queries is a different problem — see [the post on N+1 in EF Core](https://tiennhm.io.vn/blog/ef-core-n-plus-1-query).

## So what should you actually do?

For a plain EF Core application: use `DbContext` directly, and do not wrap another `IUnitOfWork` around it unless that adds a capability. When you need a transaction spanning several `SaveChanges` calls, use `IDbContextTransaction`.

For ABP: do not rebuild what is already there. Understand that the UoW is ambient, that `CompleteAsync` is what commits, and that `OnCompleted` is the right place for every side effect that reaches the outside world.

### If DbContext is already a Unit of Work, what is the pattern for?

You need it when a unit of work goes beyond the scope of a single DbContext: several DbContext instances that must commit together, coordinating the database with another resource such as a message broker, or needing control over the isolation level. With one DbContext and one SaveChanges, adding an IUnitOfWork interface that calls SaveChanges adds indirection without adding capability.

### How does SaveChangesAsync differ from CompleteAsync in ABP?

SaveChangesAsync pushes pending changes to the database without committing the transaction, which you want when you need a database-generated ID or when a following query must see what you just wrote. CompleteAsync performs a final save and then commits. If an exception occurs after SaveChangesAsync, the saved part still rolls back, because the transaction was never committed.

### What happens if I call Begin without passing requiresNew?

requiresNew defaults to false, so Begin does not create a new Unit of Work but joins the ambient one. ABP returns a child UoW whose Outer points at the parent, and CompleteAsync on that child commits nothing; only the outermost UoW commits. If you need an operation to commit independently — an audit log that must survive even when the main business operation rolls back — you have to pass requiresNew: true.

### Why shouldn't I send email or publish events directly inside an application service?

Because at that moment the transaction has not committed. If an exception follows and the transaction rolls back, the email has already gone out while the data does not exist. Use the Unit of Work's OnCompleted to register a callback that only runs after a successful commit, or AddOrReplaceDistributedEvent for distributed events so they move in step with the transaction.

### How does the Unit of Work work inside a BackgroundService or a Hangfire job?

It does not happen automatically. ABP's interceptor attaches to types implementing IUnitOfWorkEnabled, such as ApplicationService, while BackgroundService and job handlers fall outside that scope. Inside a worker you have to create a DI scope per run and call IUnitOfWorkManager.Begin yourself — the same handling required for a captive Scoped dependency inside a singleton.
