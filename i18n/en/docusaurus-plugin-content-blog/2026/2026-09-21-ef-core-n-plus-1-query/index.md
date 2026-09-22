---
title: "Why Does EF Core Fire 201 Queries for One List Screen? Fixing N+1"
slug: ef-core-n-plus-1-query
description: "A 200-row screen whose SQL log shows 201 statements is the signature of an N+1 query. This post explains the mechanism that produces it in EF Core, how to turn on logging to see it, and four ways to fix it: projection with Select, Include/ThenInclude, AsSplitQuery and AsNoTracking — including the trap few people notice, where Include fixes N+1 but creates a cartesian explosion."
keywords: [n+1 query, n plus 1 ef core, ef core n+1, entity framework core performance, n+1 problem in ef core, include theninclude, eager loading, lazy loading ef core, explicit loading, assplitquery ef core, split query, cartesian explosion, projection select dto, asnotracking, identity resolution, navigation property, toquerystring, log sql ef core, microsoft entityframeworkcore database command, ef core query optimization, slow api caused by queries, dotnet backend, aspnet core, linq to entities, iqueryable, foreign key index, query optimization]
tags: [dotnet, csharp, database, performance, aspnetcore, efcore]
authors: [tiennhm]
date: 2026-09-21
---

import { SummaryBox, FAQSection } from '@site/src/components/SEO';

# Why does EF Core fire 201 queries for one list screen?

<SummaryBox>
A 200-row list whose log shows 201 SQL statements is textbook N+1: one query fetches the list, then each row triggers another query to load its related data. The root cause is navigation properties being loaded one at a time instead of together. The default fix is a projection with Select into a DTO. Include is only the right tool when you need real entities, and once you Include two or more collections you need AsSplitQuery to avoid a cartesian explosion.
</SummaryBox>

You open the customer list page, the API responds after four seconds, yet the database CPU barely moves and every individual SQL statement runs in a few milliseconds. Turn on logging and it turns out the problem is not one slow query, but 201 fast ones queued up nose to tail.

That is an N+1 query. It does not make the code wrong, it throws no exception, no unit test catches it, and on your local machine with twenty seeded rows it may even be faster than the correct fix. It only shows itself once the tables hold real data and the network latency to the database is non-zero.

<!-- truncate -->

## The 1 + N formula

The code below is the easiest form to spot, because the loop is right there in front of you:

```csharp
var customers = await _db.Customers
    .Where(c => c.Status == CustomerStatus.Active)
    .ToListAsync();                                  // 1 query

var rows = new List<CustomerRowDto>();
foreach (var c in customers)
{
    var contactCount = await _db.Contacts
        .CountAsync(ct => ct.CustomerId == c.Id);     // + N queries

    rows.Add(new CustomerRowDto(c.Id, c.Name, contactCount));
}
```

The SQL log looks like this:

```sql
SELECT [c].[Id], [c].[Name], ... FROM [Customers] AS [c] WHERE [c].[Status] = 1;
SELECT COUNT(*) FROM [Contacts] AS [c] WHERE [c].[CustomerId] = 1;
SELECT COUNT(*) FROM [Contacts] AS [c] WHERE [c].[CustomerId] = 2;
-- ... repeated exactly N times
```

What kills you is that the cost is not the database doing heavy work — it is the number of round trips. Every statement is a round trip: send the command, wait, receive the result. If each round trip costs 1 millisecond, 200 rows already means 200 milliseconds of pure travel; put the database on another network with 5 milliseconds of latency and that becomes a full second, while every database load chart stays green.

## Three places N+1 likes to hide

**A visible loop**, as above, is the easy case — code review catches it.

**Lazy loading** is harder, because no line of code looks like a query at all. The usual way to enable lazy loading is to install the proxies package and mark navigation properties `virtual` (the alternative is injecting `ILazyLoader` into the entity, which needs no proxies):

```csharp
public class Customer
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public virtual ICollection<Contact> Contacts { get; set; } = new List<Contact>();
}

services.AddDbContext<CrmDbContext>(opt => opt
    .UseLazyLoadingProxies()
    .UseSqlServer(connectionString));
```

From that point on, `c.Contacts.Count` inside a `foreach` silently fires one query per row. Worse, lazy loading is synchronous: it blocks the thread in the middle of an `async` action. Declaring relationships and navigation properties is covered in more depth in [the relationships article](/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-13-entity-framework-core/13.4-relationships).

**Mapping after materialisation** is the third form. When you `ToListAsync()` first and only then map entities to DTOs with AutoMapper, every navigation property the mapper touches is a separate load. Using `ProjectTo` instead of `Map` pushes the projection down into SQL rather than running it over objects already in memory.

## See it before you guess

Do not reason about it by eye — turn on command logging. In `appsettings.Development.json`:

```json
{
  "Logging": {
    "LogLevel": {
      "Microsoft.EntityFrameworkCore.Database.Command": "Information"
    }
  }
}
```

Or attach it straight to the `DbContext` when running in development:

```csharp
optionsBuilder
    .LogTo(Console.WriteLine, LogLevel.Information)
    .EnableSensitiveDataLogging();   // Development only
```

For one specific query, `ToQueryString()` shows you the SQL without running it:

```csharp
var query = _db.Customers
    .Where(c => c.Status == CustomerStatus.Active)
    .Include(c => c.Contacts);

Console.WriteLine(query.ToQueryString());
```

Reading the log is simple: call the API once, count the statements, then call it again against a larger data set. If that count grows with the number of rows returned, you have N+1 and there is nothing more to measure. For structured logging you can count in a real environment, see [logging with Serilog](/docs/dotnet-backend-zero-to-senior/stage-03-aspnet-core-backend/module-08-aspnet-core-fundamentals/8.8-logging-with-serilog); EF Core's other debugging tools are covered in [the performance article](/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-13-entity-framework-core/13.8-performance).

## Four fixes, and when to use each

### 1. Projection with Select — your default

For a read-only screen this is almost always the right answer:

```csharp
var rows = await _db.Customers
    .AsNoTracking()
    .Where(c => c.Status == CustomerStatus.Active)
    .OrderBy(c => c.Name)
    .Select(c => new CustomerRowDto(
        c.Id,
        c.Name,
        c.Contacts.Count(),
        c.Leads.Where(l => l.Status == LeadStatus.Won).Sum(l => (decimal?)l.Value) ?? 0))
    .ToListAsync();
```

EF Core translates the whole block into a single statement, with the counts and sums as subqueries. You get three things at once: one round trip, only the columns you actually need instead of whole rows, and nothing to put into the change tracker. Other projection shapes are listed in [the query patterns article](/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-13-entity-framework-core/13.6-query-patterns).

### 2. Include and ThenInclude — when you need real entities

When you have to modify data and call `SaveChangesAsync`, or when domain logic needs the full entity, projection is not an option. That is when eager loading earns its place:

```csharp
var customer = await _db.Customers
    .Include(c => c.Contacts)
    .Include(c => c.Leads)
        .ThenInclude(l => l.AssignedUser)
    .FirstOrDefaultAsync(c => c.Id == customerId);
```

One detail that costs people a lot of time: if the query ends in a projection to a DTO, `Include` is ignored entirely, and EF Core only writes a warning line to the log rather than raising an error. Include and Select are two different roads — do not mix them.

### 3. AsSplitQuery — once you Include two or more collections

```csharp
var customers = await _db.Customers
    .Include(c => c.Contacts)
    .Include(c => c.Leads)
    .AsSplitQuery()
    .AsNoTracking()
    .ToListAsync();
```

The reason you need it is in the next section. To apply it application-wide, set the default where you register the `DbContext`. Note that `UseQuerySplittingBehavior` is an extension on `RelationalDbContextOptionsBuilder`, so it has to sit **inside** the provider's lambda rather than directly on `DbContextOptionsBuilder`:

```csharp
builder.Services.AddDbContext<CrmDbContext>(options =>
    options.UseSqlServer(
        connectionString,
        sql => sql.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery)));
```

Then use `AsSingleQuery()` for the queries where you want the old behaviour back.

### 4. AsNoTracking — lowers cost, not query count

`AsNoTracking()` does not fix N+1, but it skips snapshotting each entity into the change tracker, so it is always worth enabling on a read-only screen. Be aware that in no-tracking mode two rows with the same primary key can become two separate objects in memory; if you need identity to hold, use `QueryTrackingBehavior.NoTrackingWithIdentityResolution`.

## The trap: Include fixes N+1 and then creates a cartesian explosion

This is where people fix the problem and end up slower than before.

Suppose a customer has 10 contacts and 20 leads. When you `Include` both collections in one statement, the generated SQL is a JOIN, and the database has to return the product of both sides: 10 times 20 equals 200 rows for a single customer. Each of those rows repeats every Customer column, every Contact column and every Lead column.

Multiply by 100 customers and that is 20,000 rows crossing the wire, while the real data is only 100 + 1,000 + 2,000 = 3,100 rows. The query count drops from 201 to 1, but the bytes transferred multiply, and stitching it all back together in memory is not free either.

`AsSplitQuery()` splits exactly there: EF Core issues three separate statements — one for customers, one for contacts, one for leads — and reassembles the relationships client-side. Three round trips instead of one, in exchange for no row being duplicated.

The price of split queries is worth spelling out:

- It is no longer a single statement, so if someone writes data between the reads, the result can be inconsistent. When that matters, wrap it in a transaction at an appropriate isolation level.
- With pagination, the ordering must be deterministic or the split parts will be stitched together wrongly; EF Core also warns when a split query lacks a stable `OrderBy`.
- Three round trips are not always cheaper than one. When you Include exactly one collection, leave it as a single query.

A rule you can apply immediately: Include one collection, keep the single query; Include two or more, add `AsSplitQuery`. Reading execution plans to verify this is covered in [the query optimization article](/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-12-sql-deep-dive/12.6-query-optimization).

## Quick decision table

| Situation | Use |
|---|---|
| A read-only list screen | `Select` into a DTO with `AsNoTracking` |
| You only need a count or sum of a relationship | `Select` with `Count()`, `Sum()` — not Include |
| You need to modify entities and `SaveChanges` | `Include`, keep tracking |
| Include of two or more collections | add `AsSplitQuery` |
| You already have the entity and need the relationship only occasionally | `Entry(e).Collection(...).LoadAsync()` |

## Mistakes people make while fixing it

**Pulling the whole table into memory and joining in C#.** Trading N+1 for a full table scan is usually a net loss. Keep filters and aggregates inside `IQueryable` so they get translated into SQL.

**Calling `ToListAsync()` too early.** After `ToListAsync()`, every subsequent `Where` or `Select` runs as LINQ to Objects over the data already fetched, and is no longer translated into SQL.

**Include plus pagination over a collection.** `Include` on a collection combined with `Skip` and `Take` always makes the database return more rows than you display. Paginated screens should go the projection route — see [pagination, filtering and sorting](/docs/dotnet-backend-zero-to-senior/stage-03-aspnet-core-backend/module-09-web-api-professional/9.5-pagination-filtering-sorting).

**A repository returning `IEnumerable` instead of `IQueryable`.** The calling layer then has no way to Include or Select, and N+1 grows back a level higher. The trade-offs of that design are discussed in [repository and unit of work](/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-13-entity-framework-core/13.10-unit-of-work-and-repository-pattern).

**Forgetting global query filters.** Global filters such as soft delete or multi-tenancy also apply inside Include, so the row count you actually receive may differ from the one in your head; details in [global query filters](/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-13-entity-framework-core/13.11-global-query-filters).

**Missing indexes on foreign keys.** Collapsing 201 queries into 1 when the `CustomerId` column has no index only trades many small scans for one large one. That belongs to [the indexing article](/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-12-sql-deep-dive/12.5-indexing).

The original version of this problem with full CRM context lives in [the N+1 problem article](/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-13-entity-framework-core/13.7-n-plus-1-problem).

<FAQSection
  title="Frequently asked questions"
  items={[
    {
      question: "How can I be certain my API has an N+1 problem?",
      answer: "Turn on Information-level logging for Microsoft.EntityFrameworkCore.Database.Command, call the API exactly once and count the SQL statements in the log, then call it again against a larger data set. If the statement count grows with the number of rows returned, that is N+1; if it stays put, it is not. This is more reliable than reading the code, because lazy loading leaves behind no line that looks like a query."
    },
    {
      question: "Should I use Include or Select to fix N+1?",
      answer: "Pick based on what you need from the result. If you are only displaying data, use Select into a DTO: it produces one statement, fetches only the columns you need, and puts nothing into the change tracker. If you need real entities to modify and then call SaveChanges, use Include. Do not use both in one query: when a query ends in a projection to a DTO, EF Core ignores Include and merely writes a warning line to the log."
    },
    {
      question: "What is a cartesian explosion, and why does Include cause it?",
      answer: "When you Include several collections in one statement, EF Core translates it into a JOIN, so the database returns the product of those collections' row counts. A customer with 10 contacts and 20 leads becomes 200 rows, each repeating every column of all three tables. The query count falls but the data transferred rises sharply. AsSplitQuery issues separate statements per collection and stitches them together client-side, so no row is duplicated."
    },
    {
      question: "Should I enable AsSplitQuery for the whole application?",
      answer: "Only if most of your queries Include two or more collections. Split queries trade more round trips, the possibility of inconsistent data when writes land between the reads, and a requirement for deterministic ordering when paginating. With a single Included collection, one query is usually cheaper. You can set the default with UseQuerySplittingBehavior — note it belongs inside the provider's lambda, e.g. UseSqlServer(conn, sql => sql.UseQuerySplittingBehavior(...)) — and then use AsSingleQuery where you want the old behaviour."
    },
    {
      question: "Does AsNoTracking reduce the number of queries?",
      answer: "No. AsNoTracking only skips snapshotting entities into the change tracker, so it lowers memory and materialisation cost without changing the number of statements sent to the database. It is still worth enabling on every read-only screen, and it pairs naturally with projection. If you need two rows with the same primary key to point at the same in-memory object, use NoTrackingWithIdentityResolution instead of plain AsNoTracking."
    }
  ]}
/>
