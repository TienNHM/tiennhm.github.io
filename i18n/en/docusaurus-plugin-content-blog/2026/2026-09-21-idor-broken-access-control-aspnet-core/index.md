---
title: "Change the id in the URL and Get Someone Else's Data? Stop IDOR in a Single Layer"
slug: idor-broken-access-control-aspnet-core
description: "IDOR happens when an API takes an id from the request and reads the record straight out of the database without asking whether the caller owns it. This post explains the mechanism, how to probe your own API for it, why switching to GUIDs or encrypting ids is not a fix, and how to enforce ownership checks in a single layer in ASP.NET Core using resource-based authorization together with per-user query filters."
keywords: [idor, insecure direct object reference, broken access control, owasp top 10, owasp a01, idor vulnerability, ownership check, authorization vs authentication, aspnet core authorization, resource based authorization, policy based authorization, iauthorizationservice, authorizationhandler, global query filter ef core, per user query filter, horizontal access control, vertical access control, mass assignment, bola, broken object level authorization, api security, dotnet api security, webgoat idor, changing id in url, guid is not security, indirect object reference, forbid vs notfound, aspnet core security]
tags: [security, owasp, aspnetcore, dotnet, csharp, api]
authors: [tiennhm]
date: 2026-09-21
---

import { SummaryBox, FAQSection } from '@site/src/components/SEO';

# Change the id in the URL and get someone else's data? Stop IDOR in a single layer

<SummaryBox>
IDOR happens when an endpoint takes an id from the request and loads the record directly, checking only that the caller is logged in rather than that the caller has rights over that particular record. Switching ids to GUIDs or encrypting them does not fix the bug, because the id still leaks somewhere else. The fix is to force every query through a layer that binds it to ownership on the server, instead of scattering checks through individual controllers.
</SummaryBox>

You have a perfectly ordinary endpoint: `GET /api/orders/1043` returns order details. It sits behind `[Authorize]`, only a valid token gets through, and in the UI a user can only click into their own orders.

Then somebody logs in with their real account, changes `1043` to `1044`, and hits send. If the server returns someone else's order, that is an Insecure Direct Object Reference — IDOR for short. No payload, no technique, just one number changed.

<!-- truncate -->

## What IDOR is, and why it tops the OWASP list

A direct object reference means the application uses data the user sent to point straight at an object behind it: a database row, a file, a record. There is nothing wrong with that in itself — nearly every REST API works that way. It becomes *insecure* when that reference is used without any step that checks whether the caller is allowed to touch the object. A full description with its variants lives in [the IDOR introduction](/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/insecure-direct-object-references-01).

In the 2021 OWASP Top 10, Broken Access Control climbed to position A01, and IDOR is the most common concrete form of that category. It ranks high not because it is hard to exploit but for the opposite reason: the cost of exploiting it is nearly zero, while the consequence is exposing every user's data when ids are sequential integers.

There are two axes of authorization worth keeping apart, and [the secure object references article](/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/insecure-direct-object-references-06) covers both:

- **Horizontal**: two users in the same role, and A can read B's data. This is classic IDOR.
- **Vertical**: an ordinary user can invoke admin functionality. That is Missing Function Level Access Control — a sibling bug with a different mechanism; [the comparison between the two](/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/missing-function-level-access-control-01) keeps them from getting mixed up during an audit.

## Why this bug is so common

Because authentication and authorization are two different jobs, and the framework only handles the first one for you automatically.

`[Authorize]` answers "who are you". It verifies the token signature, builds a `ClaimsPrincipal`, and stops there. It knows nothing about order 1044 and has no way of knowing who it belongs to. The question "are you allowed to touch this record" has to be answered by business code, and since nothing forces you to write it, it is exactly the line that gets forgotten under deadline pressure. The boundary between the two concepts is drawn in [authentication vs authorization](/docs/dotnet-backend-zero-to-senior/stage-03-aspnet-core-backend/module-10-authentication-authorization/10.2-authentication-vs-authorization).

Another source of the bug is trusting the UI. The screen only shows the current user's orders, so a developer implicitly assumes the id that arrives is always valid. But any HTTP client can send any request it likes, and the UI is not a protection layer — it is only a suggestion.

The third is surplus data in responses. An API returns the whole entity, the UI displays a few fields, and the rest still sit in the JSON: `userId`, `role`, `ownerId`. Those are the raw material for working out which id to try next. The lab that [compares the raw response with the displayed data](/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/insecure-direct-object-references-03) shows exactly this step on a real system.

## How to probe your own API for IDOR

The procedure is mechanical, and you should run it before someone else does:

1. Create two accounts in the same role, A and B, each with a bit of their own data.
2. Log in as A, open the Network tab, and record every request carrying an id — in the path, in the query string, or in the body.
3. Keep A's token, replace the id with B's, and resend.
4. Compare: a `200` with B's data is the bug. `403` or `404` is what you want.
5. Repeat for every HTTP method, not just `GET`. Plenty of systems block reads but forget `PUT` and `DELETE` on the same route — exactly the situation in [the lab that changes both the id and the method](/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/insecure-direct-object-references-05).

One extra step is guessing routes. A RESTful API follows naming conventions that are easy to extrapolate, so if `/api/orders/{id}` exists then `/api/orders/{id}/attachments` usually exists too, even when no screen ever calls it. That kind of reasoning is described in [the article on guessing URL patterns](/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/insecure-direct-object-references-04).

In CI, the cheapest way to keep the result is an integration test asserting the opposite: log in as A, request B's resource, assert the status code is not `200`. One test per endpoint, running forever after.

## Three fixes that are not fixes

**Hiding the id.** Moving it from the URL into the body, or not showing it in the UI, only makes the request look cleaner. It is still in the payload and still editable.

**Switching to GUIDs.** The cost of guessing genuinely rises, and it is still worth doing so nobody can enumerate ids from 1 to 100000. But GUIDs leak in a great many places: search results, list endpoint responses, webhooks, share links, logs, exported reports. One id getting out is enough to leave that record unprotected, because the only defence here is "the attacker does not know this string".

**Encrypting or hashing ids into indirect references.** You turn `/profile/1234` into `/profile/8f3e9d72a1` and map it back on the server. It is a useful extra layer, but [the indirect reference documentation](/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/insecure-direct-object-references-06) says outright that it does not replace an authorization check.

What all three have in common: they make the id harder to guess, while the real bug is that the server accepts whatever id it receives. The same logic applies to session ids — if the session value is guessable, nobody needs to guess record ids at all, as [the hijack a session lab](/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/hijack-a-session-01) demonstrates.

## The fix: bind to ownership, and do it in one place

The principle: **the id from the request is untrusted data; the identity from the token is the trusted data.** Every query must carry both.

The most direct approach puts the ownership condition into the query itself rather than loading the record and comparing afterwards:

```csharp
[Authorize]
[HttpGet("api/orders/{id:guid}")]
public async Task<IActionResult> GetOrder(Guid id)
{
    var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

    var order = await _db.Orders
        .Where(o => o.Id == id && o.OwnerId == userId)
        .Select(o => new OrderDto(o.Id, o.Total, o.Status))
        .FirstOrDefaultAsync();

    return order is null ? NotFound() : Ok(order);
}
```

Two details are worth noting. First, `OwnerId` is in the `WHERE`, so forgetting it means the query returns nothing rather than returning the wrong thing — it fails safe. Second, returning `NotFound` rather than `Forbid` to a non-owner: a `403` inadvertently confirms that the record exists, and with sensitive data mere existence can be enough to infer something.

The drawback is that it depends on every developer remembering to add the condition. On a large team with a few hundred endpoints, that is a weak assumption. So the second layer pushes the constraint down into the `DbContext` as a global query filter, so every query is filtered whether the author remembered or not:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Order>()
        .HasQueryFilter(o => o.TenantId == _currentUser.TenantId);
}
```

The mechanism and its traps — you must have an index on the filtered column, and `IgnoreQueryFilters()` disables the lot — are spelled out in [the global query filters article](/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-13-entity-framework-core/13.11-global-query-filters). Query filters are a great fit for broad boundaries like tenancy or soft delete. For per-record ownership, where admins and managers have their own rules, cramming everything into the filter makes the condition sprawl out of control.

For rules that depend on the record's own data, ASP.NET Core ships resource-based authorization. You load the resource first, then ask the authorization system:

```csharp
public class SameOwnerRequirement : IAuthorizationRequirement { }

public class OrderOwnerHandler
    : AuthorizationHandler<SameOwnerRequirement, Order>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        SameOwnerRequirement requirement,
        Order order)
    {
        var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (context.User.IsInRole("Admin") || order.OwnerId == userId)
            context.Succeed(requirement);

        return Task.CompletedTask;
    }
}
```

Call it from the controller through `IAuthorizationService`:

```csharp
var result = await _authService.AuthorizeAsync(
    User, order, new SameOwnerRequirement());

if (!result.Succeeded)
    return Forbid();
```

What you gain is that the rule "who may touch an Order" lives in a single handler; change it once and every caller follows, instead of hunting down scattered `if` statements. Declaring requirements and handlers is covered in detail in [resource-based authorization](/docs/dotnet-backend-zero-to-senior/stage-03-aspnet-core-backend/module-10-authentication-authorization/10.7-resource-based-authorization), and declaring the policy that attaches to an endpoint in [policy-based authorization](/docs/dotnet-backend-zero-to-senior/stage-03-aspnet-core-backend/module-10-authentication-authorization/10.6-policy-based-authorization).

These three layers are not mutually exclusive: query filters guard broad boundaries, the `WHERE` constraint handles everyday reads, and resource-based authorization handles the complex rules that need the data itself before they can decide.

## Other places this still breaks

**Write endpoints that accept fields the user may not change.** If you `PUT` a whole object and map it straight onto the entity, a user can slip in `"role": "admin"` or somebody else's `"ownerId"`. Accept only the fields that may be edited, through a dedicated DTO, and never bind directly onto an entity.

**List endpoints and export screens.** These get missed because there is no id in the URL to change, but a filter missing its ownership condition leaks far more data than a single request ever would.

**Filtering in the presentation layer.** Returning the whole list and letting the frontend trim it means the data is already in the response, readable by anyone who opens the Network tab.

**Not logging denied access.** A user repeatedly receiving `404` on ids that are not theirs is a very clear sign of probing.

**Not having written down the permission matrix.** List the endpoints, methods, who may call them, and whose records they may read: if you cannot put it in a table, you cannot verify you got it right. There is a sample matrix in [the secure object references article](/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/insecure-direct-object-references-06).

<FAQSection
  title="Frequently asked questions"
  items={[
    {
      question: "How does IDOR differ from Missing Function Level Access Control?",
      answer: "IDOR is authorization over data: you are allowed to call the endpoint, but not allowed to touch the specific record you are pointing at — for example changing GET /profile/1234 to GET /profile/5678. Missing Function Level Access Control is authorization over functionality: you were never allowed to call that endpoint at all, for example an ordinary user calling POST /admin/deleteUser directly even though the UI shows no such button. The first is stopped by an ownership check per resource; the second by a role or policy attached to the endpoint itself."
    },
    {
      question: "Do GUIDs instead of sequential ids stop IDOR?",
      answer: "No. GUIDs only make ids practically impossible to guess, which does block mass enumeration from 1 to 100000, so they are still worth using. But GUIDs leak through many channels: list endpoint responses, share links, webhooks, logs, exported files. One id getting out strips that record of all protection, because the only defence in play is that the attacker does not know the string. A server-side ownership check is the thing that does not depend on the id staying secret."
    },
    {
      question: "Should I return 403 or 404 when a user requests a record that is not theirs?",
      answer: "404 gives less away, because 403 inadvertently confirms the record exists, which in many sensitive contexts is enough to infer something. Writing the query with the ownership condition in the WHERE clause also leads naturally to 404, since no row is found. If your system genuinely needs to distinguish 'does not exist' from 'not permitted' for operational support, return 403 — but always log the request."
    },
    {
      question: "Is an EF Core global query filter enough to stop IDOR?",
      answer: "It is enough for broad boundaries expressible as a single condition, such as tenancy or soft delete, and its big advantage is that every query gets it whether the author remembered or not. But it cannot cover role-dependent rules — an admin seeing everything while a manager only sees their own region — and it is disabled entirely the moment someone calls IgnoreQueryFilters. For those rules use resource-based authorization, and remember to index the column the filter uses."
    },
    {
      question: "Where do I start if I want to practise IDOR attacks myself?",
      answer: "Stand up WebGoat and work through the Broken Access Control group in order: log in legitimately first, use Developer Tools to compare the raw response with what the UI displays in order to find a hidden userId, infer the URL pattern for accessing a profile by id, then change the id to another user's and change the method from GET to PUT to modify their data. The whole chain runs on an environment that is deliberately vulnerable, so you see both the attack and the missing server-side authorization check."
    }
  ]}
/>

## Closing

IDOR is not a sophisticated bug. It is the direct consequence of the framework handling "who are you" for you and staying silent on "what are you allowed to do with this".

So instead of remembering to write a check at every endpoint, build a layer that makes forgetting hard: the ownership condition inside the query, a query filter on the `DbContext`, and one handler per resource type. Then add a few integration tests asserting that A cannot read B's data — that is what preserves the result after months of work by many hands.
