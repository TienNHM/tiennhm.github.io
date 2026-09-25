---
title: "Singleton, Scoped or Transient? Get It Wrong and Your DbContext Lives Forever"
slug: singleton-scoped-transient-captive-dependency
description: "The three lifetimes in the ASP.NET Core DI container differ in when an instance is created and when it is disposed. This post explains what the scope of an HTTP request actually is, why injecting a Scoped service into a Singleton keeps a DbContext alive for the life of the application, why scope validation catches the bug in Development but not necessarily in Production, and how to fix it properly with IServiceScopeFactory."
keywords: [singleton scoped transient, service lifetime aspnet core, captive dependency, dependency injection dotnet, di container aspnet core, addscoped addsingleton addtransient, iservicescopefactory, createasyncscope, dbcontext singleton, cannot access a disposed context, second operation started on this context, scope validation, validatescopes, validateonbuild, backgroundservice scope, hostedservice dbcontext, thread safe singleton, concurrentdictionary cache, service locator anti pattern, service lifetimes, which lifetime to choose, captive dependency bug, what is dependency injection, dotnet backend]
tags: [dotnet, aspnetcore, csharp, architecture, ef-core]
authors: [tiennhm]
date: 2026-09-21
---

import { SummaryBox, FAQSection } from '@site/src/components/SEO';

# Singleton, Scoped or Transient? Get it wrong and your DbContext lives forever

<SummaryBox>
Choosing a lifetime means choosing when the container creates an instance and when it disposes it. `Transient` creates a new one on every resolve, `Scoped` gives one instance per HTTP request, `Singleton` one instance for the whole process. The single most important rule: a long-lived service must not take a short-lived one directly. Inject a `Scoped` repository into a `Singleton` and you have just kept that `DbContext` alive until the app shuts down. The fix is to inject `IServiceScopeFactory` and open a scope yourself when you need one.
</SummaryBox>

The registration line that causes this looks so harmless that nobody pauses on it in review:

```csharp
builder.Services.AddDbContext<CrmDbContext>(o => o.UseSqlServer(conn)); // Scoped
builder.Services.AddScoped<ICustomerRepository, EfCustomerRepository>();
builder.Services.AddSingleton<CustomerCacheRefresher>();               // ← the explosive
```

The app passes CI and reaches staging. Once it is under real load, the logs start showing `A second operation was started on this context instance before a previous operation completed`, or `Cannot access a disposed context instance` — or, worse, no exception at all and merely stale data that never changes. This post explains the mechanism behind it, with the code for both the broken and the fixed version.

<!-- truncate -->

## What actually differs between the three lifetimes

The container does not manage service "kinds" — it manages **instances** and **when those instances get disposed**. The three lifetimes are simply three answers to "will the next resolve reuse the previous instance?".

| Lifetime | New instance when | Disposed when | Suits which services |
|---|---|---|---|
| `Transient` | Every resolve | When the resolving scope is disposed | Stateless, cheap, holds no resources |
| `Scoped` | First resolve within each scope | When the scope ends | `DbContext`, unit of work, repositories, user context |
| `Singleton` | First resolve in the whole app | At host shutdown | In-memory caches, parsed configuration, factories |

One detail gets overlooked: the container **is responsible for disposing** the instances it creates that implement `IDisposable`. Each scope keeps a list of the disposables created within it. That means a `Transient` service implementing `IDisposable` that you resolve from the root provider lands on the root scope's list and is only released when the app shuts down — `Transient` is by no means a synonym for "reclaimed immediately". A more detailed comparison table lives in [7.5 — Service Lifetimes](/docs/dotnet-backend-zero-to-senior/stage-02-csharp-professional/module-07-dependency-injection/7.4-service-lifetimes).

## What a "scope" is during an HTTP request

In ASP.NET Core a scope is not an abstract notion but a real object. For every incoming request, the infrastructure creates an `IServiceScope`, attaches that scope's `ServiceProvider` to `HttpContext.RequestServices`, runs the entire [middleware pipeline](/docs/dotnet-backend-zero-to-senior/stage-03-aspnet-core-backend/module-08-aspnet-core-fundamentals/8.2-request-pipeline-and-middleware), and disposes the scope once the response is complete.

The immediate consequence: within one request, the controller, the business service and two different repositories all receive **the same** `CrmDbContext`. That is exactly what makes unit of work work — you modify an entity in repository A, add one in repository B, then call `SaveChangesAsync` once and both land in the same transaction. That, rather than any notion of `DbContext` being "heavy", is why it is registered `Scoped` by default ([13.3 — DbContext and entity configuration](/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-13-entity-framework-core/13.2-dbcontext-and-entity-configuration)).

The second consequence matters more: **outside a request, no scope appears on its own**. Background jobs, hosted services, message queue consumers, startup code — all of them live in the root scope. If you need a `Scoped` service there, you have to create the scope yourself.

## Captive dependency: how a Singleton swallows your DbContext

Here is the broken version, and it is common precisely because it compiles and runs:

```csharp
// BUG: a Singleton taking a Scoped dependency directly
public sealed class CustomerCacheRefresher
{
    private readonly ICustomerRepository _repo;   // Scoped!
    private readonly ConcurrentDictionary<Guid, CustomerDto> _cache = new();

    public CustomerCacheRefresher(ICustomerRepository repo) => _repo = repo;

    public async Task RefreshAsync(Guid tenantId, CancellationToken ct)
    {
        foreach (var c in await _repo.GetActiveAsync(tenantId, ct))
            _cache[c.Id] = c;
    }
}
```

The container resolves `CustomerCacheRefresher` exactly once, the first time anything needs it. At that very moment it also builds an `EfCustomerRepository` along with a `CrmDbContext` and stuffs it into the field. The `Singleton` instance lives until the app shuts down, and so does the `DbContext` inside it. In other words, **a dependency's effective lifetime equals that of the longest-lived consumer holding it**. The `Scoped` service has been taken captive — hence the name captive dependency.

Four consequences follow, in this order:

- **The change tracker grows without bound.** Every entity ever read stays in that `DbContext`'s memory. This is a leak that looks exactly like an ordinary memory leak and is very hard to trace.
- **Stale data.** Later queries return the already-tracked instance rather than the current value in the database, so the "refreshing" cache refreshes itself with frozen data.
- **Race conditions.** `DbContext` is not thread-safe and was never designed for concurrent operations. A singleton is called by many requests at once by definition, so `A second operation was started on this context instance` is only a matter of time.
- **Data leaking between tenants or users**, if the `DbContext` carries a tenant filter or user context bound at construction time.

The same mechanism has a harder-to-spot variant: injecting `IServiceProvider` into the constructor and calling `GetRequiredService` inside a method. That is both a captive dependency and a [Service Locator](/docs/dotnet-backend-zero-to-senior/stage-02-csharp-professional/module-07-dependency-injection/7.9-anti-patterns), because the real dependency is hidden from the constructor and can no longer be inspected from outside.

## Why Development catches the bug and Production may not

The .NET DI container has a built-in mechanism for exactly this: **scope validation**. When it is on, the provider throws at resolve time if a `Singleton` asks for a `Scoped` service:

```
Cannot consume scoped service 'ICustomerRepository' from singleton 'CustomerCacheRefresher'.
```

The host default (`CreateDefaultServiceProviderOptions` in `Microsoft.Extensions.Hosting`) sets **both** `ValidateScopes` **and** `ValidateOnBuild` to `isDevelopment`. Which means that with the example above, running locally in the Development environment, `ValidateOnBuild` walks the registrations right at `builder.Build()` and the app **dies at startup** — you see the error before you can send a single request.

So why does this bug still reach production? Because both flags are off when the environment is not Development. Three common escape routes:

- **Staging and Production have both turned off.** If the faulty code is added and deployed straight through without anyone running Development, nothing stops it.
- **`ValidateOnBuild` cannot walk every registration.** Open generics and factory-lambda registrations are skipped, because the container cannot know in advance what the lambda will build. Those only surface at resolve time.
- **Manual resolution from `IServiceProvider` gives the container nothing to check.** A `GetRequiredService` inside a method body is invisible to both mechanisms.

The way to lock this down is to enable validation in every environment and fail while building the container rather than while serving requests:

```csharp
builder.Host.UseDefaultServiceProvider((context, options) =>
{
    options.ValidateScopes = true;   // block Scoped-in-Singleton in every environment
    options.ValidateOnBuild = true;  // fail fast at Build(), not on the first request
});
```

`ValidateOnBuild` walks every registration at `builder.Build()` and makes the app die at startup if the dependency graph is wrong. For an automatically deployed service, an app that refuses to start is a far better signal than a random failure at 2am. The cost is extra startup time proportional to the number of registrations — nearly always worth it. This configuration belongs in `Program.cs`, alongside the per-layer registration extension methods ([7.7 — Program.cs and WebApplicationBuilder](/docs/dotnet-backend-zero-to-senior/stage-02-csharp-professional/module-07-dependency-injection/7.6-program-cs-and-webapplicationbuilder)).

## The fix: open a scope yourself with IServiceScopeFactory

The principle: a `Singleton` does not hold `Scoped` services, it holds **the right to create scopes**. `IServiceScopeFactory` is itself a singleton, so injecting it anywhere is safe.

```csharp
public sealed class CustomerCacheRefresher
{
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ConcurrentDictionary<Guid, CustomerDto> _cache = new();

    public CustomerCacheRefresher(IServiceScopeFactory scopeFactory)
        => _scopeFactory = scopeFactory;

    public async Task RefreshAsync(Guid tenantId, CancellationToken ct)
    {
        await using var scope = _scopeFactory.CreateAsyncScope();
        var repo = scope.ServiceProvider.GetRequiredService<ICustomerRepository>();

        // Materialise the data BEFORE the scope closes
        var customers = await repo.GetActiveAsync(tenantId, ct);
        foreach (var c in customers)
            _cache[c.Id] = c;
    }
    // the scope is disposed here → the DbContext goes with it, change tracker cleared
}
```

Three details in this short piece of code are easy to get wrong:

- **Prefer `CreateAsyncScope` in async code.** `DbContext` implements both `IDisposable` and `IAsyncDisposable`, so `CreateScope` with a plain `using` still disposes it without throwing. The `InvalidOperationException` ("only implements IAsyncDisposable. Use DisposeAsync to dispose the container.") only happens with services implementing `IAsyncDisposable` **alone**. Use `CreateAsyncScope` so you never have to remember which services are which.
- **Do not let objects from the scope escape it.** Returning an `IQueryable`, or an entity still doing lazy loading, trades a captive dependency bug for a disposed-context bug. Read the data, map it to a DTO, then leave.
- **One scope per unit of work**, not one scope for the lifetime of a loop. In a `BackgroundService`, the scope has to be **inside** the loop:

```csharp
public sealed class CacheWarmupWorker : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;

    public CacheWarmupWorker(IServiceScopeFactory scopeFactory)
        => _scopeFactory = scopeFactory;

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            await using var scope = _scopeFactory.CreateAsyncScope();   // one scope per iteration
            var refresher = scope.ServiceProvider.GetRequiredService<ICacheRefresher>();
            await refresher.RefreshAsync(stoppingToken);

            await Task.Delay(TimeSpan.FromMinutes(5), stoppingToken);
        }
    }
}
```

The host registers `BackgroundService` as a singleton, so this is not an option but the only way to reach a `Scoped` service from inside one ([9.10 — Hosted services and background jobs](/docs/dotnet-backend-zero-to-senior/stage-03-aspnet-core-backend/module-09-web-api-professional/9.9-hosted-service-background-jobs)). Putting `CreateScope` outside the loop recreates the very captive dependency you just fixed — the only difference being that this time you wrote it yourself.

## A Singleton must be thread-safe, no exceptions

Registering something as `Singleton` is an implicit claim that the class tolerates concurrent calls from many threads, because in a web app it will almost certainly get them. A few concrete consequences:

- A `Dictionary<K,V>` written from several requests can corrupt its internal structure and hang a read loop. Use `ConcurrentDictionary`, or explicit locking, or hold the state immutably and swap the whole thing.
- For a shared in-memory cache, rely on `IMemoryCache` — it is registered as a singleton and is thread-safe — rather than rolling your own cache out of static fields ([14.3 — IMemoryCache](/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-14-caching-background-jobs/14.2-imemorycache)).
- Configuration should arrive through the [Options pattern](/docs/dotnet-backend-zero-to-senior/stage-02-csharp-professional/module-07-dependency-injection/7.7-options-pattern), not a mutable singleton that anything can modify.
- When you need several implementations of one interface and want to pick by name rather than by lifetime, [Keyed Services](/docs/dotnet-backend-zero-to-senior/stage-02-csharp-professional/module-07-dependency-injection/7.8-keyed-services) is the right tool — do not turn a singleton into a dispatcher that resolves things itself.

## The rules, condensed

1. A service that touches the database, carries request context, or takes part in a unit of work → `Scoped`.
2. A stateless, cheap service that holds no resources → `Transient`. If it is `IDisposable`, check which scope resolves it.
3. Reserve `Singleton` for classes that are genuinely thread-safe **and** depend on nothing shorter-lived than themselves. If you need something shorter, take `IServiceScopeFactory`.
4. Enable `ValidateScopes` and `ValidateOnBuild` in every environment, not just Development.
5. Once a constructor grows past 4–5 dependencies, the problem is no longer the lifetime but the class's responsibilities — split it first, choose lifetimes afterwards. The remaining registration styles, including factories and open generics, are in [7.6 — Registering Services](/docs/dotnet-backend-zero-to-senior/stage-02-csharp-professional/module-07-dependency-injection/7.5-registering-services).

<FAQSection
  title="Frequently asked questions"
  items={[
    {
      question: "Why does injecting a DbContext into a Singleton break things when the code compiles and runs?",
      answer: "Because the container resolves the Singleton exactly once and stores the dependency in a field, so the DbContext created at that moment survives until the app shuts down. Its change tracker grows without bound as it retains every entity ever read, later queries return already-tracked data and therefore go stale, and since DbContext is not thread-safe while a Singleton is called concurrently by many requests, 'A second operation was started on this context instance' shows up sooner or later. This is a captive dependency: a service's effective lifetime equals that of the longest-lived consumer holding it."
    },
    {
      question: "If scope validation catches this in Development, how does it reach Production?",
      answer: "The host defaults set both ValidateScopes and ValidateOnBuild to isDevelopment, so in Development the app dies at Build() — but in Staging and Production both are off. On top of that, ValidateOnBuild skips open generics and factory-lambda registrations, and a dependency you fetch yourself through IServiceProvider.GetRequiredService is outside the container's view entirely. The way to lock it down is to call UseDefaultServiceProvider and enable ValidateScopes and ValidateOnBuild in every environment so the app fails at startup."
    },
    {
      question: "Where should I create the scope inside a BackgroundService?",
      answer: "Inside the loop, one scope per work cycle, disposed before waiting for the next one. The host registers BackgroundService as a singleton, so no scope is ever created for it automatically. Creating one scope outside the loop and reusing it recreates the very captive dependency you were fixing: the DbContext then lives for the worker's whole lifetime and accumulates every entity it has read."
    },
    {
      question: "What is the difference between CreateScope and CreateAsyncScope?",
      answer: "CreateAsyncScope returns a scope that supports await using. It is mandatory when the scope contains a service implementing IAsyncDisposable only — plain CreateScope with using then throws InvalidOperationException. DbContext is not in that group, since it implements both interfaces, so synchronous disposal still works. Even so, in async code you should default to CreateAsyncScope so disposal takes the async path."
    },
    {
      question: "Does Transient mean the instance is reclaimed as soon as I'm done with it?",
      answer: "No. Transient only means a new instance is created on every resolve. If that instance implements IDisposable, the container records it on the disposables list of the scope that resolved it and only disposes it when the scope ends. Resolving a Transient IDisposable from the root provider means it accumulates until the app shuts down, so for resource-holding services you need to mind which scope resolves them."
    }
  ]}
/>
