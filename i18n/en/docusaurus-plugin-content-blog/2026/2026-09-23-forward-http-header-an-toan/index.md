---
title: "Forwarding Headers in ASP.NET Core: Why 'Forward Everything' Is an Architectural Bug"
slug: forward-http-header-an-toan-aspnet-core
description: "A loop copying every incoming header onto an outgoing HttpClient call is the most harmless-looking code I have ever seen cause a production incident. This post breaks down its three categories of risk, presents the allowlist pattern implemented correctly with a DelegatingHandler, the captive dependency trap waiting inside that handler, and how to filter at the gateway with YARP."
keywords: [forward http header aspnet core, header forwarding dotnet, allowlist header, delegatinghandler, ihttpclientfactory, ihttpcontextaccessor, yarp transforms, api gateway header filter, header injection, x-forwarded-for spoofing, correlation id propagation, httpclient header, captive dependency delegatinghandler, aspnet core middleware header, safe header forwarding, dotnet 9 httpclient, header anti pattern]
tags: [dotnet, csharp, aspnetcore, http, architecture, security, backend]
authors: [tiennhm]
date: 2026-09-23
---

import { SummaryBox, FAQSection, Checklist } from '@site/src/components/SEO';

# Forwarding headers in ASP.NET Core

<SummaryBox>
Copying every incoming header onto an outgoing request is an **anti-pattern**, and it fails in three different directions: correctness (one non-ASCII value makes `HttpClient` throw), security (you trust and relay data the client set itself), and architecture (headers injected by infrastructure become part of your application's contract). The fix is an **allowlist** — an explicit list of headers permitted to pass — placed in a shared `DelegatingHandler`. When you write that handler, mind one trap: it does **not** live in the request's scope.
</SummaryBox>

This post closes a three-part series that began with [a production incident](/blog/cloudflare-header-broke-dotnet-httpclient) on an e-commerce loyalty platform of roughly three million customers, where Cloudflare's `cf-ipcity: Hồ Chí Minh` header broke an internal call. The first part told the story, [the second](/blog/http-header-unicode-ascii-dotnet) explained why headers cannot carry Vietnamese. This one answers what is left: **how do you rewrite that code correctly?**

<!-- truncate -->

## TL;DR {#tldr}

- Forwarding all headers is an anti-pattern that fails in **three directions**: correctness, security, architecture.
- Use an **allowlist**, not a blocklist — you do not control the list of headers infrastructure injects.
- Put the logic in **one** shared `DelegatingHandler`, not scattered across call sites.
- A `DelegatingHandler` does **not** live in the request scope: never inject `Scoped` services into it.
- Filtering at the gateway (YARP) is a second line of defence, not a replacement for the first.
- Write a test that sends a non-ASCII value so the fix survives.

---

## The problematic code {#doan-code-co-van-de}

It looks like this, and it appears in nearly every microservice codebase I have read:

```csharp
// Preserve tracing context when calling another service
foreach (var header in httpContext.Request.Headers)
{
    outgoing.Headers.TryAddWithoutValidation(
        header.Key,
        header.Value.ToArray());
}
```

The intent is entirely legitimate: keep correlation IDs and tokens so traces join up across services. The problem is the word **every**.

---

## Three directions of failure {#ba-huong-hong}

### 1. Correctness

This is the direction that caused the incident. Cloudflare injects `cf-ipcity` with the visitor's city name. For visitors in Vietnam that value carries diacritics, and `HttpClient` **refuses to send it** — throwing `HttpRequestException` right at `SendAsync`, before a single byte leaves the process. The mechanism is in [part two](/blog/http-header-unicode-ascii-dotnet).

What makes it painful: the failure depends on **user data**, so it never appears in dev, never appears in tests, and appears intermittently in production.

### 2. Security

This direction is more serious and less discussed.

When you forward every header, you are **relaying client-controlled data** into an internal service. Internal services tend to trust what arrives from inside the network more than what arrives from the internet — and you have just broken that assumption.

Concrete consequences:

- A client sets a forged `X-Forwarded-For`, you relay it, and the service behind you logs the wrong IP while per-IP rate limiting becomes useless. This is precisely the problem [`forwardedheaders.trustedips` in Traefik](/blog/traefik-cloudflare-https-tu-dong-vps) exists to prevent — and blind forwarding reopens it at the application layer.
- A client sets an internal-looking header such as `X-Internal-Admin` or `X-Tenant-Id`, you relay it, and the service behind you may trust it. This is the same family of thinking as [IDOR](/blog/idor-broken-access-control-aspnet-core): **data from the request is untrusted data**, even when it arrives in a header rather than a URL.
- The user's `Cookie` and `Authorization` headers get sent to a service that had no need to see them, widening the blast radius if that service logs verbosely.

### 3. Architecture

Blind forwarding turns **every header your infrastructure injects** into an implicit part of your application's contract.

Cloudflare injects dozens of headers and that list changes over time. Adding an ingress, swapping a gateway, enabling a CDN feature — each can add headers. With blind forwarding, every infrastructure change is a potential application change that nobody reviews.

---

## Allowlist, not blocklist {#allowlist}

The first instinct after an incident is usually to delete the offending header:

```csharp
// Not this: treats one symptom
context.Request.Headers.Remove("cf-ipcity");
```

That works today and breaks again next time, because you are enumerating **what to block** from a list you do not control.

Invert it:

```csharp
// This: enumerate what is permitted; everything else is dropped by default
private static readonly HashSet<string> ForwardedHeaders =
    new(StringComparer.OrdinalIgnoreCase)
    {
        "Authorization",
        "X-Correlation-ID",
        "X-Request-ID",
        "Accept-Language",
    };
```

The difference is not the line count but the **direction of the default**. With an allowlist, a new infrastructure header appearing in future goes nowhere, and nobody has to remember anything. It is the same principle as Traefik's `exposedbydefault=false`, or [applying permission filters at the query layer rather than the UI layer](/blog/idor-broken-access-control-aspnet-core): **make forgetting harmless.**

---

## Where to put it: `DelegatingHandler` {#delegatinghandler}

Scattering the forwarding loop across call sites means every new call site has to remember. Putting it in a `DelegatingHandler` places the rule in exactly one spot and applies it to every call automatically.

```csharp
public sealed class HeaderPropagationHandler : DelegatingHandler
{
    private static readonly HashSet<string> Allowed =
        new(StringComparer.OrdinalIgnoreCase)
        {
            "Authorization",
            "X-Correlation-ID",
            "X-Request-ID",
            "Accept-Language",
        };

    private readonly IHttpContextAccessor _accessor;

    public HeaderPropagationHandler(IHttpContextAccessor accessor)
        => _accessor = accessor;

    protected override Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request,
        CancellationToken cancellationToken)
    {
        var incoming = _accessor.HttpContext?.Request.Headers;

        if (incoming is not null)
        {
            foreach (var name in Allowed)
            {
                // Never overwrite what the call itself already set
                if (request.Headers.Contains(name))
                    continue;

                if (incoming.TryGetValue(name, out var value))
                    request.Headers.TryAddWithoutValidation(name, value.ToArray());
            }
        }

        return base.SendAsync(request, cancellationToken);
    }
}
```

Registration:

```csharp
builder.Services.AddHttpContextAccessor();
builder.Services.AddTransient<HeaderPropagationHandler>();

builder.Services
    .AddHttpClient<ILoyaltyClient, LoyaltyClient>(c =>
        c.BaseAddress = new Uri(builder.Configuration["Loyalty:BaseUrl"]!))
    .AddHttpMessageHandler<HeaderPropagationHandler>();
```

### The trap: the handler does not live in the request scope

This is the easiest thing to get wrong, and it is not obvious.

`IHttpClientFactory` **pools and reuses** message handler chains, by default for around two minutes, to avoid both socket exhaustion and stale DNS. That means your `DelegatingHandler` instance **outlives any single request by a long way** and is shared across many of them.

The direct consequence: **do not inject `Scoped` services into the handler.** Taking an `ICurrentUser` or a `DbContext` straight into the handler's constructor creates exactly the [captive dependency I wrote a whole post about](/blog/singleton-scoped-transient-captive-dependency) — a short-lived service held by a long-lived consumer, so every later request reuses the first request's context.

The correct approach is to take `IHttpContextAccessor`, which is a singleton and looks the context up **at call time** rather than holding it. That is why the code above is written the way it is instead of injecting what it needs directly.

---

## The second layer: filtering at the gateway {#loc-o-gateway}

If your system has a gateway in front, filtering there as well is sensible — not as a replacement for the application allowlist, but to shrink the surface before the request arrives.

With [YARP](https://microsoft.github.io/reverse-proxy/articles/transforms.html), transforms handle this cleanly:

```json
{
  "ReverseProxy": {
    "Routes": {
      "loyalty": {
        "ClusterId": "loyalty",
        "Match": { "Path": "/api/loyalty/{**catch-all}" },
        "Transforms": [
          { "RequestHeaderRemove": "cf-ipcity" },
          { "RequestHeaderRemove": "cf-ipcountry" },
          { "RequestHeadersCopy": "false" },
          { "RequestHeader": "X-Correlation-ID", "Append": "" }
        ]
      }
    }
  }
}
```

`RequestHeadersCopy: false` is the switch worth noticing: it disables default copying entirely, so you declare exactly what you want. Still an allowlist, just at a different layer.

The general principle: **gateway filtering is defence in depth, not the single place the rule lives.** A service can be called from places other than the gateway — a background job, another service, an integration test — and there the gateway layer is not present.

---

## Keep the fix with a test {#giu-ket-qua-bang-test}

Fix it without a test and in a few months someone will add the forward-everything loop back, because it still looks as reasonable as it did the first day.

The most valuable test uses the exact data that caused the incident:

```csharp
[Fact]
public async Task Does_not_forward_infrastructure_header_with_non_ascii_value()
{
    // The incoming request carries the exact header that broke production
    var context = new DefaultHttpContext();
    context.Request.Headers["cf-ipcity"] = "Hồ Chí Minh";
    context.Request.Headers["X-Correlation-ID"] = "abc-123";

    var handler = new HeaderPropagationHandler(Accessor(context))
    {
        InnerHandler = new CapturingHandler(out var captured)
    };

    await new HttpMessageInvoker(handler)
        .SendAsync(new HttpRequestMessage(HttpMethod.Get, "http://downstream/"), default);

    Assert.False(captured.Headers.Contains("cf-ipcity"));       // blocked
    Assert.True(captured.Headers.Contains("X-Correlation-ID")); // still passes
}
```

Two assertions, and both are necessary: one to be sure the dangerous thing is blocked, one to be sure you did not block something the system depends on.

<Checklist
  title="Auditing header forwarding in your services"
  items={[
    { text: "Find every loop copying all headers into HttpClient or a proxy" },
    { text: "Switch to an explicit allowlist; the default must be 'do not forward'" },
    { text: "Consolidate the rule into one DelegatingHandler instead of per call site" },
    { text: "Use IHttpContextAccessor in the handler; never inject Scoped services" },
    { text: "Do not overwrite headers the call itself already set" },
    { text: "Add gateway filtering as a second layer, not a replacement" },
    { text: "Write a test with a non-ASCII header value so the fix survives", checked: true }
  ]}
/>

---

<FAQSection
  title="Frequently asked questions"
  items={[
    {
      question: "Why shouldn't I forward all headers to an outgoing request?",
      answer: "Because it fails in three directions. On correctness, a header injected by infrastructure can carry a non-ASCII value and make HttpClient throw at send time. On security, you relay client-controlled data into an internal service that trusts what comes from inside the network, opening the door to forged X-Forwarded-For or internal headers. On architecture, every header your CDN or gateway injects becomes an implicit part of your application's contract, so each infrastructure change becomes a potential application change that nobody reviews."
    },
    {
      question: "Should I use an allowlist or a blocklist for header filtering?",
      answer: "An allowlist. A blocklist requires you to enumerate what to block, while the list of headers injected by Cloudflare or a gateway runs to dozens of entries and changes over time outside your control. With an allowlist, a new infrastructure header appearing in future goes nowhere and nobody has to remember anything. The difference is not the line count but the direction of the default."
    },
    {
      question: "Can I inject Scoped services into a DelegatingHandler?",
      answer: "No. IHttpClientFactory pools and reuses message handler chains for around two minutes by default, so a handler instance outlives a single request by a long way and is shared across many. Injecting a Scoped service creates a captive dependency: every later request reuses the first request's context. The correct approach is to take IHttpContextAccessor, which is a singleton and looks the context up at call time rather than holding it."
    },
    {
      question: "Is filtering headers at the API gateway enough?",
      answer: "No, it is a second line of defence. A service is usually called through several paths beyond the gateway: background jobs, other services in the same cluster, integration tests. On those paths the gateway filter is not present. Put the allowlist inside the application as the first layer, then add gateway filtering with YARP transforms to shrink the surface before requests arrive."
    },
    {
      question: "Which headers are usually worth forwarding?",
      answer: "Only those belonging to your own internal protocol and genuinely needed downstream: Authorization if the downstream service authenticates the user, X-Correlation-ID or X-Request-ID to join traces across services, and Accept-Language if the response depends on language. Everything else should default to not passing through, especially headers injected by a CDN or reverse proxy and headers set by the client."
    },
    {
      question: "How do I make sure the fix survives?",
      answer: "Write a test using the exact data that caused the incident. Build a DefaultHttpContext carrying a cf-ipcity header with a Vietnamese value alongside a valid X-Correlation-ID, send a request through the handler, then assert two things: the infrastructure header does not appear on the outgoing request, and the correlation header does. Both assertions matter, because one proves the dangerous thing is blocked and the other proves you did not block something the system depends on."
    }
  ]}
/>

## Conclusion {#ket-luan}

The forward-everything loop is the most harmless-looking code I have ever seen cause a production incident. It is short, well-intentioned, and reads like it is doing exactly the right thing.

Its flaw is not technical but a matter of **default direction**: it lets everything through unless you block it. Invert that to blocking everything unless you permit it, and the same incident simply cannot happen — not because someone remembered `cf-ipcity`, but because **nobody needs to remember anything.**

That is what I take from this series. [The incident](/blog/cloudflare-header-broke-dotnet-httpclient) taught me where the exception is really thrown. [The specification](/blog/http-header-unicode-ascii-dotnet) taught me that bytes and text are not the same thing. And the fix taught me that good design is design where forgetting carries no consequence.

---

**Last updated**: September 2026
