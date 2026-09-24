---
title: "When Does Calling .Result Deadlock, and When Does It Not?"
slug: deadlock-result-wait-csharp
description: "Calling .Result or .Wait() on a Task freezes WPF and ASP.NET Framework applications solid, yet runs fine in a console app or on ASP.NET Core. The reason is the SynchronizationContext that await captures when it suspends. This post dissects that mechanism, explains why ConfigureAwait(false) only patches half the problem, and why code that does not deadlock on ASP.NET Core can still die of thread pool starvation."
keywords: [deadlock result wait csharp, async await deadlock, synchronizationcontext, configureawait false, what is configureawait, async all the way, async void, thread pool starvation, aspnet core no synchronizationcontext, getawaiter getresult, task run result, blocking async code, dotnet async, csharp async await, wpf deadlock, aspnet framework deadlock, why does result deadlock, how to fix async deadlock, valuetask, task whenall, cancellationtoken, dotnet backend]
tags: [dotnet, csharp, aspnetcore, async, performance, concurrency]
authors: [tiennhm]
date: 2026-09-21
---

import { SummaryBox, FAQSection } from '@site/src/components/SEO';

# When does calling .Result deadlock, and when does it not?

<SummaryBox>
`.Result` and `.Wait()` block the current thread. When `await` suspends, it captures the current `SynchronizationContext` so that the code after it runs back on that same context. If the context only allows one thread at a time — a WPF UI thread, an ASP.NET Framework request context — and that thread is the one `.Result` is blocking, the continuation can never get in: deadlock. Console apps and ASP.NET Core have no `SynchronizationContext`, so the continuation runs on the thread pool and nothing gets stuck. The real fix is async all the way.
</SummaryBox>

The code below runs perfectly in a console app, and freezes solid the moment you paste it verbatim into an ASP.NET Framework controller or a button handler in WPF:

```csharp
public string GetCustomerName(int id)
{
    return GetCustomerAsync(id).Result;   // hangs here
}

private async Task<string> GetCustomerAsync(int id)
{
    var response = await _http.GetStringAsync($"/customers/{id}");
    return Parse(response).Name;
}
```

No exception, no stack trace, no timeout. The thread simply stops forever. This is not `HttpClient`'s fault, and `async` is not "broken" — it is the direct consequence of a design decision in how `await` works.

<!-- truncate -->

## What `await` captures when it suspends

The compiler turns every `async` method into a state machine: each `await` is a checkpoint, and the code after that checkpoint is packaged into a **continuation** to be run once the Task completes ([the state machine in detail](/docs/dotnet-backend-zero-to-senior/stage-02-csharp-professional/module-06-async-programming/6.2-task-and-async-await)).

The important question is: **which thread** does that continuation run on?

By default, at the moment `await` suspends, the awaiter reads `SynchronizationContext.Current`. If it is not `null`, the awaiter remembers that context and later `Post`s the continuation back to it. If `SynchronizationContext.Current` is `null`, it falls back to `TaskScheduler.Current`; and if that too is the default scheduler, the continuation runs straight on the thread pool.

This is **desired behaviour**, not a bug. In WPF it is what lets you write `await` and then assign to a control on the very next line without `Dispatcher.Invoke`, because the continuation is guaranteed to come back to the UI thread.

## Why "return to the context" plus "block" equals deadlock

The crux: some `SynchronizationContext` implementations allow **only one thread to run at a time**.

- `DispatcherSynchronizationContext` (WPF) and `WindowsFormsSynchronizationContext` are bound to exactly one UI thread. `Post` means queueing work onto that thread's message queue.
- ASP.NET Framework's `AspNetSynchronizationContext` (`System.Web`) is not bound to a fixed thread, but it serialises: within one request, only one thread at a time may run inside that request's context.

Put the pieces together and the deadlock sequence looks like this:

1. The UI thread (or request thread) calls `GetCustomerAsync(id)`.
2. The method reaches the `await`, captures the current context, and returns an incomplete `Task`.
3. `.Result` **blocks** that very thread waiting on the `Task`.
4. The HTTP call finishes on a thread pool thread. The awaiter `Post`s the continuation to the captured context.
5. The context needs the thread that is blocked at step 3 — or needs it to leave the context. But that thread only leaves once the `Task` completes, and the `Task` only completes once the continuation has run.

Each side waits for the other. Nobody yields. This is a deadlock in the literal sense, not merely "slow".

Note that it **does not depend on how fast the I/O is**. If the Task happens to be already complete by the time the `await` is reached — a cache hit, say — then `await` runs synchronously, never suspends, has no continuation to post, and the code sails right through. That is what makes this bug so nasty: it appears intermittently, depends on timing, and usually only blows up in a real environment.

## How console apps and ASP.NET Core differ

This is the part that gets described wrongly most often, so it is worth separating two distinct issues.

**Issue one — why there is no deadlock.** In a console app, `SynchronizationContext.Current` on the `Main` thread is `null`. ASP.NET Core deliberately **installs no** `SynchronizationContext` at all; the entire request pipeline was designed async end to end ([the pipeline architecture](/docs/dotnet-backend-zero-to-senior/stage-03-aspnet-core-backend/module-08-aspnet-core-fundamentals/8.2-request-pipeline-and-middleware)). With no context to capture, the continuation drops straight onto the thread pool without needing permission from any blocked thread. The wait cycle is broken and `.Result` returns normally.

**Issue two — why you still should not block.** Not deadlocking does **not** make `.Result` safe on ASP.NET Core. Every time you block, you park a thread pool thread doing nothing but waiting on I/O. The thread pool grows very cautiously once it is past its minimum — on the order of a few hundred milliseconds per thread added. Under load, requests arrive faster than the pool expands, and you land in **thread pool starvation**: latency spikes, requests queue, health checks fail, and the system looks "hung".

The symptoms resemble a deadlock, which is why this so often gets misnamed as one. But the cause is entirely different, and so is the fix: a deadlock needs the context wait cycle broken, whereas starvation needs you to stop blocking so threads can go back to serving other requests ([why async raises throughput](/docs/dotnet-backend-zero-to-senior/stage-02-csharp-professional/module-06-async-programming/6.1-why-async-matters)).

In short:

| Environment | SynchronizationContext? | Does `.Result` deadlock? | Is `.Result` harmful? |
|---|---|---|---|
| Console / worker | No | No | Yes — pointlessly blocks a thread |
| ASP.NET Core | No | No | Yes — thread pool starvation under load |
| ASP.NET Framework | Yes, serialised per request | Yes | Very |
| WPF / WinForms | Yes, bound to the UI thread | Yes | Very |

## The real fix: async all the way

Fixing a deadlock is not about finding the right flag. It is about changing the signatures along the whole call chain so there is nowhere left to block:

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

Thread a [`CancellationToken`](/docs/dotnet-backend-zero-to-senior/stage-02-csharp-professional/module-06-async-programming/6.4-cancellationtoken) through while you are already changing the signatures — adding it layer by layer later is far more work.

When you hit a boundary that genuinely does not allow `async Task`, there is a proper escape hatch for each kind, and none of them is `.Result`:

- **Entry point**: `async Task Main` has been supported since C# 7.1.
- **Constructors**: a constructor cannot be `async`. Use a factory method, `static async Task<T> CreateAsync(...)`.
- **Background work**: do not call `.Result` in `Main` or during startup. Use `BackgroundService` / `IHostedService` ([hosted services](/docs/dotnet-backend-zero-to-senior/stage-03-aspnet-core-backend/module-09-web-api-professional/9.9-hosted-service-background-jobs)).
- **An interface you cannot change**: wrap it in an async adapter, or accept blocking in exactly one place and document why.

If you have several independent pieces of work, `Task.WhenAll` gives you real parallelism without blocking a single thread ([Task.WhenAll and WhenAny](/docs/dotnet-backend-zero-to-senior/stage-02-csharp-professional/module-06-async-programming/6.5-task-parallel-library)).

## What `ConfigureAwait(false)` does and does not solve

`ConfigureAwait(false)` tells the awaiter: *do not capture the context, run the continuation wherever you like*. It breaks exactly step 4 of the deadlock chain above.

```csharp
public async Task<Customer?> GetFromCacheAsync(int id)
{
    var cached = await _cache.GetAsync($"customer:{id}").ConfigureAwait(false);
    return cached is null ? null : JsonSerializer.Deserialize<Customer>(cached);
}
```

But be precise about its scope:

- It applies to **that one `await`** only. Not to the method, and certainly not to the assembly.
- Which means that to prevent deadlocks this way, **every `await` along the entire call chain** needs it. Miss one buried in a third-party library and the deadlock is back. That is why this is a fragile mitigation rather than a fix.
- It does **not** make `.Result` safe. The calling thread is still blocked, the thread pool thread is still held, starvation still happens.
- On ASP.NET Core it makes no correctness difference at all, since there is no context to skip. What remains is a very small saving.
- In UI code, putting it where you need to touch a control is **wrong**: you will lose the UI thread and get an `InvalidOperationException` when you assign the value.

The right way to see `ConfigureAwait(false)` is as advice for **library authors**: you do not know who calls you, you should not impose the cost of returning to their context, and you should not join their wait cycle. Application authors on ASP.NET Core almost never need it ([a comparison table by code type](/docs/dotnet-backend-zero-to-senior/stage-02-csharp-professional/module-06-async-programming/6.3-configureawait)).

Since .NET 8 there is also an overload taking `ConfigureAwaitOptions` for `Task`, with options such as `SuppressThrowing` and `ForceYielding` — useful, but part of the same story: controlling where and how the continuation resumes.

## `async void`: for event handlers only

`async void` is not "async that returns nothing" — that is `async Task`. `async void` is a separate mechanism that exists for exactly one reason: event handler delegates have `void` signatures.

Two consequences make it dangerous everywhere else:

1. **You cannot await it.** There is no `Task` to wait on, so the caller has no idea when the work finished, and `Task.WhenAll` cannot collect it.
2. **Exceptions do not land in a Task.** They are rethrown on whatever context was current when the method started, or on the thread pool if there was none. A `try/catch` around the call site will not catch them, and in many hosts they take the process down.

```csharp
// RIGHT: the signature is forced by the delegate, and exceptions are caught inside
private async void BtnSave_Click(object sender, EventArgs e)
{
    try { await _customerService.SaveAsync(_current); }
    catch (Exception ex) { ShowError(ex); }
}

// WRONG: a service method — exceptions vanish without a trace
public async void SendWelcomeEmail(Customer c) => await _email.SendAsync(c.Email);

// RIGHT
public Task SendWelcomeEmailAsync(Customer c) => _email.SendAsync(c.Email);
```

Fire-and-forget is much the same: `_ = DoAsync();` is barely safer than `async void` if there is no `try/catch` inside. To run work in the background properly, use background infrastructure rather than releasing a Task and forgetting about it ([other async patterns](/docs/dotnet-backend-zero-to-senior/stage-02-csharp-professional/module-06-async-programming/6.6-async-patterns)).

## Fixes that sound reasonable but are not fixes

- **`GetAwaiter().GetResult()` instead of `.Result`.** All this changes is how the exception is wrapped: you get the original exception rather than an `AggregateException`. As far as deadlocks go it is identical, because it still blocks.
- **`Task.Run(() => FooAsync()).Result`.** This one *does* break the deadlock, because the lambda starts on a thread pool thread where there is no context to capture. But you burn two threads for one piece of work, you still block one of them, and you have to remember to do it at every call site. It is a painkiller for legacy code, not a design.
- **Sprinkling `ConfigureAwait(false)` through your own code.** Not sufficient, because a single `await` in a dependency that lacks it closes the wait cycle again.
- **Raising the thread pool minimum.** It treats the starvation symptom on ASP.NET Core, does nothing for a context deadlock, and does not make the code block any less.
- **Wrapping sync I/O in `Task.Run` and calling it "async".** It saves no threads at all, it just moves where the blocking happens. Use real async APIs — `File.ReadAllTextAsync` rather than `Task.Run(() => File.ReadAllText(...))` ([common pitfalls](/docs/dotnet-backend-zero-to-senior/stage-02-csharp-professional/module-06-async-programming/6.7-common-pitfalls)).

The short rule to remember: `await` captures the context, blocking holds the thread. A deadlock needs both. Drop the blocking and both problems disappear; drop only the context and you have patched half of it.

<FAQSection
  title="Frequently asked questions"
  items={[
    {
      question: "Why does code calling .Result work on my dev machine but hang in production?",
      answer: "Because this kind of deadlock depends on timing. If the Task is already complete by the time the await is reached — a cache hit, small payloads, a fast local network — the await runs synchronously, produces no continuation to post back to the context, and there is nothing to get stuck. In production the I/O is slower, so the await genuinely suspends, the continuation is posted back to a SynchronizationContext that is currently blocked, and the wait cycle closes. Dev machines also usually serve one request at a time, so they never expose thread pool starvation either."
    },
    {
      question: "ASP.NET Core has no SynchronizationContext, so is .Result fine there?",
      answer: "No. You will not hit a context deadlock, but every block parks a thread pool thread waiting on I/O. The pool adds threads very slowly once past its minimum, so under load requests arrive faster than it grows and the system falls into thread pool starvation: latency climbs, requests queue, and it looks exactly like a hang. The symptoms resemble a deadlock but the cause is different, and the fix is still async all the way."
    },
    {
      question: "Does ConfigureAwait(false) make .Result safe?",
      answer: "No. All it does is tell the awaiter not to return to the captured context, for the single await where it is written. The calling thread is blocked exactly as before. And to prevent deadlocks this way, every await along the whole call chain — including inside third-party libraries — needs it; miss one and the deadlock returns. That is why it is advice for library authors rather than a fix for applications."
    },
    {
      question: "When is async void acceptable?",
      answer: "Only when the signature is forced on you by an event delegate, such as a Click handler in WinForms or WPF, and then you must wrap the body in try/catch yourself. The reason is that async void returns no Task, so it cannot be awaited or collected by Task.WhenAll, and its exceptions do not land in a Task but are rethrown on the current context or on the thread pool, so a try/catch at the call site cannot catch them and the process may die."
    },
    {
      question: "What if I'm stuck at a synchronous boundary whose signature I cannot change?",
      answer: "Pick the escape hatch that matches the kind of boundary instead of reaching for .Result. For an entry point, use async Task Main, available since C# 7.1. A constructor cannot be async, so use a static async Task CreateAsync factory method. For background work, use BackgroundService or IHostedService. For a third-party interface you cannot change, wrap it in an async adapter. If you truly must block, confine it to exactly one place, document why, and know that in WPF or ASP.NET Framework that spot can still deadlock."
    }
  ]}
/>
