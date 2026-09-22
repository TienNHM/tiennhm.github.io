---
title: "One Vietnamese Diacritic Killed an API Call: cf-ipcity, HttpClient and the ASCII Limit"
slug: cloudflare-header-broke-dotnet-httpclient
description: "On an e-commerce loyalty platform with roughly 3 million customers, an internal HTTP call started failing in production while the database, Kubernetes and the downstream service were all healthy. The culprit was Cloudflare's cf-ipcity header carrying the value Hồ Chí Minh. This post traces the investigation and shows where .NET actually throws — which is not where you would guess."
keywords: [cloudflare header dotnet httpclient, cf-ipcity, non ascii http header, unicode http header, request headers must contain only ascii characters, httpclient exception, tryaddwithoutvalidation, aspnet core header forwarding, production debugging dotnet, kubernetes dotnet debugging, reverse proxy header, cloudflare geolocation header, header forwarding anti pattern, loyalty ecommerce dotnet, httpclient fails in production, debugging production incident]
tags: [dotnet, csharp, cloudflare, http, production, debugging, architecture, aspnetcore]
authors: [tiennhm]
date: 2026-09-23
---

import { SummaryBox, FAQSection } from '@site/src/components/SEO';

# One Vietnamese diacritic killed an API call

<SummaryBox>
[Cloudflare](/blog/traefik-cloudflare-https-tu-dong-vps) injects `cf-ipcity` into incoming requests, and for visitors in Vietnam the value is `Hồ Chí Minh` — with diacritics, which means **non-ASCII**. Our .NET service forwarded every incoming header verbatim onto its outgoing calls, so that value landed in `HttpClient`. The surprise is that `Headers.Add` does **not** throw, and `TryAddWithoutValidation` returns `true`; everything only blows up at `SendAsync` with `HttpRequestException: Request headers must contain only ASCII characters`, and **not a single byte leaves the process**. The bug is neither Cloudflare's nor .NET's — it is in an application that forwards every header unconditionally.
</SummaryBox>

The setting is an e-commerce loyalty platform serving roughly three million customers. I have removed the client's name and every identifying detail; what remains is the technical part.

Everything looked normal. The API was running. The Kubernetes pods were healthy. The database was fine. Requests were reaching the application. But one HTTP call to an internal service kept failing in production — and only in production.

What broke it, it turned out, was **the name of the user's own city**.

<!-- truncate -->

## TL;DR {#tldr}

- **Symptom**: an `HttpClient` call failing in production while every piece of infrastructure is healthy.
- **Direct cause**: the header `cf-ipcity: Hồ Chí Minh`, injected by Cloudflare and forwarded onto the outgoing request.
- **The throw site is not where you would guess**: `Add()` does not throw, `TryAddWithoutValidation()` returns `true`, the failure happens at `SendAsync`.
- **The actual error**: `HttpRequestException: Request headers must contain only ASCII characters.`
- **The request never left the process** — not a byte reached the wire.
- Why headers cannot carry Vietnamese: see [part 2 on ASCII and obs-text](/blog/http-header-unicode-ascii-dotnet).
- How to fix it properly: see [part 3 on safe header forwarding](/blog/forward-http-header-an-toan-aspnet-core).

---

## Part 1 — The hunt {#cuoc-truy-tim}

When an internal call fails in production and nowhere else, the list of suspects follows a familiar order, and this time every one of them came back clean.

| Suspect | Result |
|---|---|
| Database | healthy |
| Redis | healthy |
| Pods / Kubernetes | healthy |
| Downstream service | healthy, direct calls worked |
| Authentication, tokens | valid |
| DNS, TLS | normal |

What made it maddening is that **the request looked entirely harmless**. No odd payload, no control characters, nothing unusually large. And it worked fine locally.

That last point was the clue, though nobody recognised it at the time. Locally the flow is:

```
Browser → .NET API
```

In production it is:

```
Browser → Cloudflare → API Gateway → .NET Service → HttpClient → Downstream
```

Production has two extra actors that **inject data into the request**, and local has neither.

---

## Part 2 — The header that caused it all {#header-gay-ra-tat-ca}

Cloudflare injects a number of headers into incoming requests so the application can learn about the client. One of them is the [geolocation header](https://developers.cloudflare.com/fundamentals/reference/http-headers/):

```http
cf-ipcity: Hồ Chí Minh
```

It looks so harmless that nobody stops on it. But:

```
Hồ Chí Minh
 ^     ^
 ồ     í   ← non-ASCII
```

And our service contained a piece of code that looks perfectly reasonable:

```csharp
// Forward every header from the incoming request to the outgoing one
foreach (var header in incoming.Headers)
{
    outgoing.Headers.TryAddWithoutValidation(
        header.Key,
        header.Value.ToArray());
}
```

That code exists for a legitimate reason: preserving correlation IDs, tokens, and tracing context across services. The problem is that it does not distinguish headers that are **ours** from headers **injected by infrastructure**. The fix is in [part 3](/blog/forward-http-header-an-toan-aspnet-core).

---

## Part 3 — The throw site is not where you would guess {#cho-nem-loi}

This is the part I find most valuable, because almost everyone's intuition is wrong here — mine included, before I sat down and measured.

I reproduced it with a minimal program on **.NET 9.0.4**, plus a raw `TcpListener` to see exactly which bytes reach the wire.

**Test 1 — `Add()`, with validation:**

```csharp
client.DefaultRequestHeaders.Add("cf-ipcity", "Hồ Chí Minh");
```

```
=> NO exception thrown
```

That is the first surprise. Plenty of answers online claim you get a `FormatException` right here. You do not. `HttpHeaders` validation checks the **structure** of the value — control characters, line breaks, per-header format — but **not** whether the value fits in ASCII.

**Test 2 — `TryAddWithoutValidation()`, then actually send:**

```csharp
var ok = request.Headers.TryAddWithoutValidation("cf-ipcity", "Hồ Chí Minh");
// ok == True
var response = await client.SendAsync(request);
```

```
TryAddWithoutValidation returned: True
=> THROWS HttpRequestException: Request headers must contain only ASCII characters.
```

This is the crux. The header was added successfully. The request object is valid. The failure only appears once `SendAsync` reaches the layer that serialises headers into bytes.

**And what did the server see?**

```
header on the wire : (none)
bytes (hex)        : (header not found)
```

**Not one byte.** The TCP connection never carried that request. It died inside the process, before touching the socket.

The practical consequence of that detail is larger than it looks: every tool you normally reach for to debug network problems is **useless**. A packet capture shows nothing. The downstream access log is empty. There is no span on the receiving side. From every vantage point outside the process, that request **never existed**.

`Hồ` cannot even be represented in Latin-1, so not even the most permissive path the HTTP specification ever allowed could carry this value intact — I split that discussion into [part 2](/blog/http-header-unicode-ascii-dotnet).

---

## Part 4 — Why it gets in but cannot get out {#vao-duoc-ra-khong-duoc}

The reasonable next question: if that header is invalid, how did ASP.NET Core **accept** it in the first place?

Because receiving and sending are two different operations with two different levels of tolerance.

| | Incoming request | Outgoing request |
|---|---|---|
| Role | Server reading bytes off the wire | Client writing bytes to the wire |
| Principle | Liberal in what it accepts | Strict in what it emits |
| Behaviour | Decodes bytes into a string, accepts | Refuses what it cannot represent |

This is the [robustness principle](https://en.wikipedia.org/wiki/Robustness_principle): be liberal in what you accept, conservative in what you send. As a server, ASP.NET Core takes a non-ASCII byte in a header, decodes it and hands it to the application, because rejecting an entire request over one unusual byte would break plenty of things that currently work. As a client, .NET refuses to emit something it cannot represent correctly.

**The unspoken assumption in the forwarding loop is "whatever came in can go out".** That is not true, and it will not be true in any language — not just .NET.

---

## Part 5 — Why local would never have caught it {#vi-sao-local-khong-bat-duoc}

This is the part most worth taking away, because it applies to incidents that have nothing to do with headers.

Locally, requests go straight from the browser into the application. Nobody injects anything. Every header is produced by you or your browser, and they are all ASCII.

In production, **Cloudflare and an API gateway** sit between the client and the application, and both **modify request metadata**. They are not pipes. They add data, and that data comes from the real world — where city names carry diacritics.

This is the same family as what I wrote about in the [Traefik and Cloudflare post](/blog/traefik-cloudflare-https-tu-dong-vps): whatever sits in front of your application is not a neutral transport layer, it is an actor with behaviour of its own, and it only appears in the production diagram. It is also the same shape as [.NET's Server GC default](/blog/dotnet-workstation-gc-giam-ram-container) only revealing itself inside a container: **every default was chosen for some situation, and that situation is rarely your production.**

Which leads to an uncomfortable conclusion: **"it works locally" tells you very little about production** — not because the code differs, but because the number of actors touching the request does.

---

## Continue in this series {#doc-tiep}

This incident opens two questions larger than itself, and I split them into their own posts:

| Post | Content |
|---|---|
| [Can an HTTP header carry Vietnamese?](/blog/http-header-unicode-ascii-dotnet) | ASCII, obs-text, Latin-1, and how to encode properly when you need diacritics |
| [Forwarding headers safely in ASP.NET Core](/blog/forward-http-header-an-toan-aspnet-core) | Allowlists, `DelegatingHandler`, gateway filtering, and a test that keeps the fix |

---

<FAQSection
  title="Frequently asked questions"
  items={[
    {
      question: "Why does HttpClient throw 'Request headers must contain only ASCII characters'?",
      answer: "Because the layer that serialises headers into bytes can only represent ASCII. What is notable is that this error does NOT appear when you add the header: measured on .NET 9.0.4, DefaultRequestHeaders.Add with the value 'Hồ Chí Minh' throws nothing at all, and TryAddWithoutValidation returns true. The exception only fires on SendAsync, and at that point not a single byte of the request has left the process."
    },
    {
      question: "What is Cloudflare's cf-ipcity header and why does it cause errors?",
      answer: "cf-ipcity is one of the headers Cloudflare injects into incoming requests, containing the city name inferred from the client's IP. It is harmless in itself. It causes errors when an application forwards every incoming header verbatim onto an outgoing HttpClient call, because for visitors in Vietnam the value is a city name with diacritics — that is, non-ASCII — which the on-the-wire header format cannot carry."
    },
    {
      question: "Why can ASP.NET Core receive a non-ASCII header when HttpClient cannot send one?",
      answer: "Because receiving and sending are different roles with different tolerances, following the robustness principle of being liberal in what you accept and conservative in what you send. As a server, ASP.NET Core decodes the bytes it receives into a string and hands them to the application, because rejecting a whole request over one unusual byte would break plenty of working systems. As a client, HttpClient refuses to emit what it cannot represent correctly. The assumption that 'whatever came in can go out' is wrong, and wrong in every language, not just .NET."
    },
    {
      question: "Why does this bug never appear when running locally?",
      answer: "Because locally the request goes straight from the browser into the application, nobody injects extra headers, and every header is ASCII. In production, Cloudflare and an API gateway sit in between, both modifying request metadata and adding data that comes from the real world, where city names carry diacritics. The difference is not in the code but in the number of actors touching the request."
    },
    {
      question: "Why do packet captures and downstream logs not help find this bug?",
      answer: "Because the request never reached the wire. The exception is thrown inside the process while serialising headers, before any byte touches the socket. A raw TcpListener confirms the server receives nothing at all. As a result the packet capture is empty, the downstream access log is empty, and there is no span on the receiving side — every observability tool outside the process is useless, so you have to log on the client side before sending."
    }
  ]}
/>

## Conclusion {#ket-luan}

It would be easy to tell this story as "Cloudflare broke my application". That would be both unfair and useless.

Cloudflare injected a valid header containing real information. .NET refused to emit something it could not represent correctly. Both did exactly their job. **The bug is that my application forwarded everything it received by default**, assuming that whatever came in could go out.

Three things I am taking away:

1. **Headers are data, not harmless metadata.** They come from the real world and carry all of the real world's messiness, diacritics included.
2. **The throw site is not the fault site.** `Add()` stays silent, `TryAddWithoutValidation()` returns `true`, and the failure surfaces several layers later at `SendAsync`. Looking for the cause where you see the symptom sends you the wrong way.
3. **The bug lives in the interaction.** Not a Cloudflare bug, not a .NET bug, but Cloudflare plus HTTP header semantics plus `HttpClient` plus a forwarding loop — on a production architecture that local does not have.

---

**Last updated**: September 2026
