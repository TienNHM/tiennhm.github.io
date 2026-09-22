---
title: "Traefik + Cloudflare: Why Your Certificates All Expire on Day 60"
slug: traefik-cloudflare-https-tu-dong-vps
description: "One VPS, 14 containers, 13 hostnames, all behind Cloudflare and all needing automatic HTTPS. This post dissects a Traefik v3 + Cloudflare architecture running in production: why ACME HTTP-01 issues the first certificate fine but is guaranteed to fail at renewal, why DNS-01 solves that while creating a new constraint of its own, and why a missing catch-all router makes Cloudflare return a 526."
keywords: [traefik cloudflare, traefik v3, acme dns-01, cloudflare dns challenge, http-01 vs dns-01, lets encrypt wildcard certificate, traefik lets encrypt, cloudflare full strict, cloudflare flexible redirect loop, cloudflare 526 error, traefik docker labels, docker reverse proxy, forwardedheaders trustedips, cloudflare ip ranges, traefik catchall router, hostregexp traefik, cf_dns_api_token, traefik acme.json, wildcard certificate, docker network, exposedbydefault, traefik entrypoints https redirect, multi site vps, automatic https, certificate renewal failure, zone could not be found, traefik router priority]
tags: [traefik, cloudflare, docker, devops, https, tls, vps, architecture]
authors: [tiennhm]
date: 2026-09-22
---

import { SummaryBox, FAQSection, Checklist } from '@site/src/components/SEO';

# Traefik + Cloudflare: why your certificates all expire on day 60

<SummaryBox>
When a domain is proxied through Cloudflare (the orange cloud) with SSL mode **Full (strict)**, ACME **HTTP-01 cannot work**: Let's Encrypt requests `http://domain/.well-known/acme-challenge/...` on port 80, Cloudflare receives it and calls back to your origin over **HTTPS:443** — where Traefik's challenge handler does not live. You need a certificate to get through Cloudflare, and you need to get through Cloudflare to obtain a certificate. You can work around the first issuance by temporarily switching the cloud to grey, but **the automatic renewal around day 60 will fail silently and every site will expire at the same time**. The way out is **DNS-01**: validation through a TXT record via the Cloudflare API, with no request ever touching the origin. The price is that certificates can only be issued for zones your API token can see.
</SummaryBox>

This VPS runs 14 containers behind one shared reverse proxy: 10 WordPress sites, a .NET API, an Angular app, an event web app, and Traefik itself. Thirteen hostnames, all behind Cloudflare, all needing HTTPS, and nobody wanting to renew a certificate by hand.

The architecture is boring in the best way. What is interesting sits between Cloudflare and Let's Encrypt — two systems each doing exactly their job, which together produce a circular dependency you only discover on the day your certificates expire. That is, two months after everything appeared to be finished.

<!-- truncate -->

## TL;DR {#tldr}

- **Architecture**: Cloudflare (orange cloud) → Traefik v3 on a shared `edge` network → containers. SSL mode **Full (strict)**.
- **SSL mode Flexible is trap number one**: Cloudflare calls over HTTP, Traefik redirects to HTTPS → infinite loop.
- **HTTP-01 breaks at renewal, not at issuance.** That is precisely what makes it dangerous.
- **DNS-01 is the way out**, and the only way to obtain a wildcard certificate.
- **What DNS-01 costs you**: the Cloudflare token only sees the zones it was granted. A domain in another zone will fail — my own logs have been repeating exactly that error since 19 September.
- **Without a catch-all router**: wildcard DNS plus an unknown name → Traefik serves a self-signed certificate → Cloudflare returns **526**.
- **You need `forwardedheaders.trustedips`**, otherwise every app sees Cloudflare's IP instead of the visitor's.

---

## The architecture: one proxy, one network, labels on each container {#kien-truc}

The whole system is three layers:

```
Visitor → Cloudflare (orange cloud, Full strict) → Traefik :443 → container :80
                                                     └── "edge" network
```

Traefik runs **exactly once** on the VPS. The other stacks know nothing about each other; they simply join a shared Docker network called `edge` and declare a few labels. Right now `edge` holds 14 containers.

Traefik is configured **not** to route everything it can see:

```yaml
- --providers.docker=true
# Only route containers that declare traefik.enable=true
- --providers.docker.exposedbydefault=false
- --providers.docker.network=edge
- --entrypoints.web.address=:80
- --entrypoints.websecure.address=:443
# Force all HTTP to HTTPS
- --entrypoints.web.http.redirections.entrypoint.to=websecure
- --entrypoints.web.http.redirections.entrypoint.scheme=https
```

`exposedbydefault=false` belongs in every Traefik installation. Without it, each new container becomes an automatically generated router — including things that should never reach the internet, such as a database or an adminer instance.

On the site side, each container needs six labels. These are the real labels from a running WordPress site:

```yaml
traefik.enable: "true"
traefik.docker.network: edge
traefik.http.routers.bakery.rule: Host(`bakery.tiennhm.io.vn`)
traefik.http.routers.bakery.entrypoints: websecure
traefik.http.routers.bakery.tls.certresolver: letsencrypt
traefik.http.services.bakery.loadbalancer.server.port: "80"
```

Adding a site means adding a directory with those six lines, and changing nothing in Traefik. That is the entire value of the label-driven model: the routing configuration lives next to the thing being routed.

---

## Trap 1: SSL mode Flexible causes a redirect loop {#cloudflare-flexible}

Before we talk about certificates, the SSL mode at Cloudflare has to be settled, because getting it wrong means nothing works at all.

| SSL mode | Cloudflare calls the origin over | Result with the config above |
|---|---|---|
| Flexible | HTTP :80 | **Infinite loop** |
| Full | HTTPS :443, certificate not verified | Works, but accepts a forged certificate |
| **Full (strict)** | HTTPS :443, certificate verified | **Use this** |

With **Flexible**, the sequence is: visitor calls Cloudflare over HTTPS → Cloudflare calls the origin over **HTTP** → Traefik's `web` entrypoint returns a 301 to HTTPS → Cloudflare passes the redirect back to the browser → the browser calls HTTPS again → repeat forever.

The classic symptom is `wp-admin` spinning and never loading while the homepage appears fine, because the homepage is cached. In my own operations documentation this is item number one in the troubleshooting section, and it is there because I hit it.

**Full (strict)** is the right choice, but it comes with a requirement: the origin **must** present a valid, publicly trusted certificate. Hold on to that, because everything that follows is a direct consequence.

---

## Trap 2: HTTP-01 and the circular dependency {#http-01-vong-luan-quan}

ACME **HTTP-01** is the default validation method used by most Traefik tutorials. It works like this: Let's Encrypt requests `http://<domain>/.well-known/acme-challenge/<token>` on **port 80**, and your server must return the expected content.

On a bare VPS that is perfect. Behind Cloudflare with Full (strict) it breaks, in exactly this order:

1. Let's Encrypt requests `http://bakery.tiennhm.io.vn/.well-known/acme-challenge/abc`
2. The record is proxied, so the request reaches Cloudflare, not the VPS
3. Cloudflare calls back to the origin — but under Full (strict) it calls over **HTTPS, port 443**
4. Traefik's challenge handler lives only on the `web` entrypoint, which is port 80
5. Port 443 returns 404 for that path → the challenge fails

In short: **you need a certificate to get through Cloudflare, and you need to get through Cloudflare to obtain a certificate.**

You can break the cycle. Switch the record to **DNS only (grey cloud)**, let Let's Encrypt reach the VPS directly, obtain the certificate, then turn the orange cloud back on. I did exactly that, and it worked.

**And that is precisely where the danger lies.**

Because once the orange cloud is back on, everything looks perfect: the site serves HTTPS, the certificate is valid, Cloudflare Full (strict) is happy. No warning anywhere. But a Let's Encrypt certificate lives 90 days, and Traefik will attempt **automatic renewal around day 60** — at which point you are not sitting there to flip the cloud to grey. The challenge fails, Traefik writes one error line to the log and retries, silently, day after day.

By day 90 **every site expires at once**, because they were all issued on the same afternoon.

This is the worst class of bug: it does not appear while you are paying attention, and the gap between cause and consequence is two months.

---

## The way out: DNS-01 {#dns-01}

**DNS-01** validates by creating a TXT record at `_acme-challenge.<domain>` instead of serving a file over HTTP. The crucial part: **no request ever touches the origin**, so whether the cloud is orange or grey makes no difference.

The Traefik configuration:

```yaml
- --certificatesresolvers.letsencrypt.acme.email=${ACME_EMAIL}
- --certificatesresolvers.letsencrypt.acme.storage=/acme.json
- --certificatesresolvers.letsencrypt.acme.dnschallenge=true
- --certificatesresolvers.letsencrypt.acme.dnschallenge.provider=cloudflare
# Ask public resolvers directly while waiting for TXT propagation, rather than
# the host resolver, which may have cached a negative _acme-challenge answer
- --certificatesresolvers.letsencrypt.acme.dnschallenge.resolvers=1.1.1.1:53,8.8.8.8:53
```

Plus an API token:

```yaml
environment:
  - CF_DNS_API_TOKEN=${CF_DNS_API_TOKEN}
```

That `resolvers` line is small but worth having. Traefik has to wait for the TXT record to propagate before telling Let's Encrypt to check. If it asks the host's resolver and that resolver has just cached an NXDOMAIN for `_acme-challenge.<domain>`, the wait drags on pointlessly or fails outright. Asking `1.1.1.1` and `8.8.8.8` directly skips that cache layer.

### Token permissions: do not over-grant

This token can write your DNS, so its scope is a genuine security matter rather than a formality:

| Setting | Value |
|---|---|
| Permissions | `Zone → Zone → Read` and `Zone → DNS → Edit` |
| Zone Resources | Include → **Specific zone** → exactly one zone |
| Client IP Filtering | Restricted to the VPS's IP |

`Zone → Read` is for looking up the zone ID, `DNS → Edit` for creating and deleting the TXT record. Nothing more is needed. In particular, **do not use the Global API Key** — it has full control over the entire account and cannot be revoked selectively.

### The bonus: wildcard certificates

Wildcard certificates **can only be obtained through DNS-01**; HTTP-01 does not support them. One detail people forget: a wildcard covers **exactly one level**. `*.tiennhm.io.vn` covers `bakery.tiennhm.io.vn` but **not** `a.b.tiennhm.io.vn`.

---

## Trap 3: DNS-01 creates a new constraint {#rang-buoc-dns01}

This section is missing from the tutorials, because it only surfaces once you have been running long enough.

HTTP-01 proves ownership by *"I control the server at this address"*. DNS-01 proves it by *"I control the DNS for this zone"*. Changing how you prove it changes what can break.

On this VPS one container serves a domain in a **different zone** from the one the token was granted. Here is the real Traefik log:

```
ERR Unable to obtain ACME certificate for domains
error="unable to generate a certificate for the domains [club-day.hcmute-dsc.io.vn]:
  resolver: one or more domains had a problem:
  [club-day.hcmute-dsc.io.vn: dns01: error presenting token:
   cloudflare: failed to find zone hcmute-dsc.io.vn.: zone could not be found]"
routerName=club-day@docker
```

My token is scoped to the zone `tiennhm.io.vn`, so for `hcmute-dsc.io.vn` the Cloudflare API reports that it cannot find the zone. Traefik does not give up: it retries, and the same error repeats on **19 September**, then **21 September**, and it is still repeating.

What makes this notable is that **nothing crashes**. The router still exists, the container still runs, the other sites still have certificates. Only that one host lacks a valid certificate — which, under Cloudflare Full (strict), means visitors get a **526**.

The lesson: with HTTP-01, adding a new domain only requires pointing DNS at the IP. With DNS-01, **every new zone needs a token with permissions on that zone**, and forgetting it breaks the system quietly, in exactly the place you are not looking.

---

## Trap 4: without a catch-all router, Cloudflare returns 526 {#router-bat-tat}

Once you use wildcard DNS — `*.tiennhm.io.vn` pointed at the VPS — **every** name under that domain reaches Traefik: typos, bots probing for subdomains, stale links to sites you removed.

If no router matches, Traefik serves its default self-signed certificate. Cloudflare under Full (strict) verifies the certificate, finds it invalid, and returns **526 Invalid SSL certificate** — an error code that means nothing to a visitor while making you think the site is down.

What you want to return instead is "there is nothing here". The way to do it:

```yaml
- "traefik.http.routers.catchall.rule=HostRegexp(`^.+$`)"
- "traefik.http.routers.catchall.priority=1"
- "traefik.http.routers.catchall.entrypoints=websecure"
- "traefik.http.routers.catchall.tls.certresolver=letsencrypt"
- "traefik.http.routers.catchall.tls.domains[0].main=tiennhm.io.vn"
- "traefik.http.routers.catchall.tls.domains[0].sans=*.tiennhm.io.vn"
- "traefik.http.routers.catchall.middlewares=catchall-redirect"
- "traefik.http.routers.catchall.service=noop@internal"
- "traefik.http.middlewares.catchall-redirect.redirectregex.regex=.*"
- "traefik.http.middlewares.catchall-redirect.redirectregex.replacement=https://tiennhm.io.vn/"
- "traefik.http.middlewares.catchall-redirect.redirectregex.permanent=false"
```

Each of the four decisions in there has its own reason.

**`priority=1`** is the lowest level. Per-site `Host(...)` routers get a default priority derived from rule length, so they always win. The catch-all only receives what is left over.

**Declaring `tls.domains` explicitly** is the most important part and the easiest to miss. `HostRegexp` gives Traefik no way to infer which domain to request a certificate for, so without this declaration Traefik **will not request a certificate for unknown SNI** — and that is exactly what you want. Otherwise anyone pointing their own domain at your IP could trigger a certificate request and burn through your Let's Encrypt rate limit.

**`service=noop@internal`** because this router serves no content; it exists only to present the right certificate and then redirect.

**`permanent=false`**, meaning 302 rather than 301. A name that is unused today may become a real site tomorrow, and browsers remember a 301 indefinitely, which is very hard to undo.

---

## Trap 5: every app sees Cloudflare's IP {#ip-that-cua-khach}

With a proxy in front, the source IP your containers see belongs to Cloudflare, not the visitor. The consequences: wrong logs, useless per-IP rate limiting, WordPress brute-force plugins blocking the wrong people, skewed analytics.

The real IP is in the `X-Forwarded-For` header, but Traefik only trusts that header from sources you explicitly name:

```yaml
- --entrypoints.websecure.forwardedheaders.trustedips=173.245.48.0/20,103.21.244.0/22,...,131.0.72.0/22
```

That list is **Cloudflare's published IP ranges**. This is not a formality: if you trust every source, anyone can forge `X-Forwarded-For` and bypass everything built on IP. Cloudflare does update these ranges over time, so this belongs in the set of configuration you review periodically.

---

## Operations: what I observed over nine days {#van-hanh}

Traefik writes one line to the log each day:

```
INF Testing certificate renew... acmeCA=https://acme-v02.api.letsencrypt.org/directory
```

The renewal loop runs steadily. `acme.json` currently holds **12 certificates**, and there is a detail worth discussing: 11 individual certificates for each subdomain, **plus** one wildcard for `tiennhm.io.vn` + `*.tiennhm.io.vn`.

Technically those 11 are redundant — the wildcard already covers them. They exist because every `Host(...)` router that does not declare `tls.domains` triggers its own issuance. Nothing breaks because of it, but it consumes the Let's Encrypt rate limit (50 certificates per week per registered domain) and creates 11 renewal schedules to watch instead of one.

If I were starting over I would consider declaring the wildcard as Traefik's **default certificate** and dropping `certresolver` from the per-site routers. The trade-off is losing independence: every site shares one certificate, and one failed renewal affects all of them. With 11 sites in one zone I lean toward the wildcard; if the sites belonged to different customers, separate certificates would make more sense.

<Checklist
  title="Checklist for putting Traefik behind Cloudflare"
  items={[
    { text: "Set Cloudflare SSL/TLS to Full (strict) — never Flexible" },
    { text: "Use DNS-01, not HTTP-01, even if HTTP-01 currently works" },
    { text: "Cloudflare token: Zone Read + DNS Edit, scoped to the zone and the VPS IP" },
    { text: "Declare resolvers 1.1.1.1 and 8.8.8.8 for the DNS challenge" },
    { text: "Set exposedbydefault=false so databases and adminer are never routed by accident" },
    { text: "Add forwardedheaders.trustedips with Cloudflare's IP ranges" },
    { text: "Add a catch-all router with priority=1 and explicit tls.domains" },
    { text: "chmod 600 acme.json before the first start" },
    { text: "Every new zone needs a token that can see it — check the logs after adding a domain", checked: true }
  ]}
/>

That last item is the one that cost me the most, and it is still sitting in my logs.

---

## Things I deliberately have not done {#chua-lam}

**The Docker socket is still mounted.** Traefik reads the container list through `/var/run/docker.sock`, mounted `:ro`. This needs saying plainly: **read-only is not a security boundary** — anyone who can read that socket effectively has root on the host. The correct fix is a socket proxy in between, exposing only the endpoints Traefik needs. I have not done it, and I treat that as debt rather than a decision.

**No Traefik dashboard.** It is handy while debugging, but exposing it adds another surface needing authentication and authorization. I read the logs instead.

**The origin is not locked to Cloudflare traffic only.** Right now anyone who knows the VPS IP can reach port 443 directly, bypassing everything Cloudflare provides. The standard fix is a firewall allowing only Cloudflare's IP ranges, or Cloudflare Tunnel so no port is exposed at all.

---

<FAQSection
  title="Frequently asked questions"
  items={[
    {
      question: "Why does ACME HTTP-01 fail when a domain is proxied through Cloudflare?",
      answer: "Because Let's Encrypt requests http://domain/.well-known/acme-challenge/... on port 80, that request reaches Cloudflare rather than the VPS, and Cloudflare under Full or Full (strict) then calls back to the origin over HTTPS on port 443 — where Traefik's challenge handler is not present, since it lives only on the port 80 entrypoint. The result is a 404 and a failed challenge. You need a certificate to get through Cloudflare, and you need to get through Cloudflare to obtain one."
    },
    {
      question: "I already got a certificate by switching to the grey cloud — do I still need DNS-01?",
      answer: "Yes, and this is the most important point in the post. Turning off the proxy only solves the first issuance. A Let's Encrypt certificate lives 90 days and Traefik attempts automatic renewal around day 60, when nobody is there to switch the cloud to grey — so the challenge fails, and it fails silently, leaving only a line in the log. By day 90 every site expires at once, because they were all issued in the same session. DNS-01 validates through a TXT record with no request touching the origin, so the orange cloud makes no difference."
    },
    {
      question: "Which Cloudflare SSL mode should I use with Traefik?",
      answer: "Full (strict). With Flexible, Cloudflare calls the origin over HTTP while Traefik redirects HTTP to HTTPS, producing an infinite redirect loop whose classic symptom is wp-admin spinning forever. With Full, things work but Cloudflare does not verify the origin's certificate, so it would accept a forged one. Full (strict) requires the origin to hold a valid certificate, which is exactly why the ACME problem has to be solved properly."
    },
    {
      question: "What does Cloudflare's 526 Invalid SSL certificate error mean?",
      answer: "It means Cloudflare, under Full (strict), called your origin and the certificate it received was not valid. With Traefik the common cause is a hostname matching no router, so Traefik falls back to its default self-signed certificate. With wildcard DNS, every typo and every bot probe lands in that case. The fix is a catch-all router with priority=1, explicit tls.domains, and a 302 redirect to your homepage."
    },
    {
      question: "What permissions does the Cloudflare token for DNS-01 need?",
      answer: "Only two: Zone → Zone → Read to look up the zone ID, and Zone → DNS → Edit to create and delete the TXT record. Restrict Zone Resources to the specific zone in use and enable Client IP Filtering for the VPS's IP. Do not use the Global API Key, which has full control over the whole account and cannot be revoked selectively. Note that the token only sees the zones it was granted, so a domain in another zone will fail with 'zone could not be found'."
    },
    {
      question: "Why is forwardedheaders.trustedips needed behind Cloudflare?",
      answer: "Because with a proxy in front, the source IP your containers see belongs to Cloudflare rather than the visitor. That means wrong logs, useless per-IP rate limiting, and brute-force plugins blocking the wrong people. The real IP arrives in the X-Forwarded-For header, but Traefik only trusts that header from sources listed in trustedips. You must list Cloudflare's published ranges — trusting every source means anyone can forge the header and bypass everything built on IP."
    },
    {
      question: "Should I use a wildcard certificate or one per subdomain?",
      answer: "It depends on how many sites you have and where the ownership boundaries lie. Per-host certificates are what you get by default when each router declares a certresolver, but they consume the Let's Encrypt limit of 50 certificates per week per registered domain and create many renewal schedules to watch. A wildcard collapses that into one, at the cost that a single failed renewal affects every site, and a wildcard covers only one level of subdomain. If the sites share one zone and one owner, the wildcard is tidier; if they belong to different customers, separate certificates are worth more."
    }
  ]}
/>

## Conclusion {#ket-luan}

The Traefik half of this architecture has almost nothing to tell: one proxy, one shared network, six labels per site. All of the difficulty lives where Cloudflare and Let's Encrypt meet.

Three things I am taking away:

1. **Choose your ACME challenge type for the renewal, not the first issuance.** HTTP-01 behind an orange cloud works if you intervene by hand, and that is exactly what makes it dangerous — you believe you are done while a 60-day clock has started.
2. **Changing how you prove ownership changes what can break.** DNS-01 removes the dependency on port 80, but binds every domain to a zone your token can see. My logs repeat that lesson daily.
3. **Reverse proxy defaults were chosen for a bare VPS.** `exposedbydefault`, a self-signed certificate for unknown SNI, trusting forwarded headers — all three are reasonable with nothing in front, and all three are wrong once Cloudflare sits in the middle.

If you are running Traefik behind Cloudflare and HTTP-01 is working fine, open a calendar and count to day 60.

---

**Last updated**: September 2026
