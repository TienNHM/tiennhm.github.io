# Building a Multi-Tenant CRM Platform from Nothing: 20 Months on the Job

> Nguồn: https://tiennhm.io.vn/en/blog/founding-engineer-nen-tang-crm-abp-dotnet-angular
> The first product I was handed to initialise and build from scratch: a multi-tenant CRM platform that spent nearly a year being demoed across industries before moving into real delivery for a healthcare client, and after 20 months had become 18 ABP/.NET 9 microservices and 13 Angular libraries. A career story told chronologically, including the export screen that forgot its permission checks, the Angular upgrade I had to revert, the three months I was moved to a different loyalty project and committed nothing, and a migration so boring nobody noticed it had happened.

> In January 2025 I was handed a product to initialise — the first time in my career — a multi-tenant CRM platform whose repository was completely empty when I took it on. For nearly its first year it lived in demo mode, shown to customers across many different industries, until late 2025 when a healthcare client signed and it moved into real delivery. Twenty months later it is 18 microservices on [ABP Framework](https://abp.io/) / [.NET 9](https://learn.microsoft.com/en-us/dotnet/core/whats-new/dotnet-9) and 13 Angular libraries, built by a team that grew to 25 people. This is not a technical article but a career story told chronologically, and it includes the export screen that forgot its permission checks, the two weeks of Angular work I had to revert, the three months mid-year when I was moved to a different loyalty project and committed nothing, and a migration so boring that nobody noticed it had happened. It also covers the EAV architecture that lets customers configure their own data fields from the portal, along with the months I spent wrestling with its performance and that of the dynamic filter sitting on top of it, the stretch where I mentored four interns for the first time, and how the way I write code shifted from typing everything by hand to ChatGPT, then Cursor, then Claude.

On 14 January 2025 I opened a completely empty repository with nothing in my head but a handful of very ordinary questions: what to name the solution, which folder goes where, how to split the database tables.

Until then I had always inherited codebases that were already running, where the work was reading, fixing and adding screens. This felt entirely different: there was nothing to copy, and whatever I typed would become the thing everyone else followed. It sounds impressive in the telling, but sitting in front of that empty repo I was genuinely a bit overwhelmed.

My commit that day was a single line, `Init - Databases, projects`, and there was nothing ceremonial about it.

Twenty months later that repo holds 18 microservices with 29,607 commits from 25 people. I am still there, and every so often I still open `git log --reverse` to look at those first few lines.

```bash
git log --reverse --format="%h %ad %an %s" --date=short | head -5
```

I am writing this to read again in a few years. The product belongs to the company, so I have anonymised all the proper nouns — the product name, the repo name, the client, the internal libraries — while leaving the tech stack intact, since that is the part I can tell.

## The first few days

The first week of a project is the strangest one, because nobody is chasing you and there are no bugs to fix, but equally there is nothing to hold on to.

Exactly one constraint was stated clearly from the start: the product had to be multi-tenant and had to be demoable across many different business domains. That sounds unremarkable until you build it, at which point you find it reaches into every layer, because I was not allowed to hardcode anything belonging to a specific industry — not field names, not business flows, not even the labels shown in the UI. The schema in particular had to separate tenant data from the very first table; patching that in after a while of running costs a fortune.

The framework side of that was mostly handled by [ABP's multi-tenancy](https://abp.io/docs/latest/framework/architecture/multi-tenancy), while the product-specific parts — per-tenant configuration, per-branch permissions, custom fields — still had to be designed by us. And for the twenty months that followed, every time someone asked "can we just hardcode this for now?" I had to say no, often enough that it became a reflex.

I did three things in those first three days, two of them ordinary: set up the database schema and project skeleton, then upgrade [ABP](https://abp.io/docs/latest) to `9.0.3` because the older version had a bug that stopped the Swagger page loading. I did not realise at the time how lucky I had been: the first three days are the cheapest moment in a project's entire life to bump a version, whereas later every upgrade becomes a campaign. I have paid that bill in full, and it comes up below.

The third thing is the memorable one: I wrote a pipeline to generate Angular proxies automatically — a `generate-proxy.json` file plus a Node script running the [ABP service proxy schematics](https://abp.io/docs/latest/framework/ui/angular/service-proxies) to generate every TypeScript service client from the .NET APIs. The motivation was not lofty; I simply could not be bothered to type DTOs by hand.

But for the twenty months that followed, nobody on the team ever wrote a DTO or an HTTP client by hand, because when the backend changes a contract, one command gives the frontend new types and the compile errors land exactly where the fix is needed. A script written over one afternoon still runs today, which I find quietly pleasing.

In fairness I should add that I also named several things wrongly that same week, and the team is still living with those names today — so the first week is powerfully influential in both directions, not just the good one.

## EAV, and months of wrestling with performance

That "nothing industry-specific may be hardcoded" constraint needed a concrete implementation, and the one we chose was [EAV — Entity Attribute Value](https://en.wikipedia.org/wiki/Entity%E2%80%93attribute%E2%80%93value_model).

Put simply, instead of each data field being a fixed column in the database, there is a table defining attributes and a table storing values, so each attribute of each record is its own row. That lets customers add fields from the portal themselves, pick the data type, set the label and decide whether it is required — no migration written, no deploy waited for. For a product that had to demo across industries and then move into healthcare, there was essentially no other route, because every customer needs their own set of fields and I cannot predict them in advance.

The catch was that EAV was entirely new to me at the time. I had only ever worked with fixed schemas: define columns, define indexes, done. So the bill arrived quickly, and I wrestled with it for quite a while.

The most painful part was filtering and sorting on dynamic attributes. With fixed columns, `WHERE` and `ORDER BY` are unremarkable; in EAV the values are spread across the value table, so every filter condition adds another join. A user filtering on three fields and sorting by a fourth makes the query balloon visibly — and that is the thing they do most often, not some rare edge case.

Sitting directly on top of that was the dynamic filter: the place where end users build their own filter conditions without anyone coding another screen. I built it with `GetFilterableFields` returning the list of filterable fields, plus `FilterOperatorType` for the operators. It sounds tidy, but it inherits all of EAV's slowness, because every condition a user adds translates into one more trip to the value table.

The extra complication is that the operator set has to change with each attribute's data type. Text fields need contains, starts with, is not empty. Number and date fields need greater than, less than, between, outside a range, plus relative anchors like "in the last thirty days". Single-select and multi-select fields need in list and not in list. And since attributes are created by customers on the portal, you cannot hardcode a mapping table in one place and be done — the backend has to derive the valid operator set from the data type and hand it to the frontend to build the UI from. This is the piece I rewrote the most times, because missing a single type means the customer's filter screen shows nonsensical operators.

The second painful area was list screens with many dynamic columns. On screen it is just a page of 20 rows, but if each row displays a few dozen attributes, underneath that is several hundred value rows to read and then assemble into 20 rows — and the assembling is not free either.

What helped most turned out not to be a cleverer query but caching the attribute definition metadata. The list of attributes and their data types changes very rarely — sometimes nobody touches it for a week — yet every request had been asking from scratch just to learn what to read and what to coerce it to. Caching that part removed a substantial volume of queries, and the most frequently repeated kind at that.

Honestly I do not consider this problem finished. It is still the thing I watch most closely whenever a new list screen appears, and the lesson is blunt: EAV buys portal flexibility by charging you on every read query, so before you choose it you had better know what you are trading away.

## The export screen

The first half of 2025 was spent building the CRM core, and most of my time went into something that sounds thoroughly sleep-inducing: permissions.

The requirement is easy to underestimate: two people opening the Lead list must see two different sets of data, differing by who owns the record, who manages whom, who the record is shared with, and which branch the user belongs to. Everybody knows how that is done — add an `if` to the service, then copy that `if` across when a new entity arrives — and I went down that road for a while without thinking twice.

Until one day someone noticed the export screen returned more data than the list screen.

The reason was almost depressingly mundane: the list had the permission filter and the export did not, because I forgot when I wrote the export. Nobody broke any process. It is simply that when an important rule depends on a developer remembering it, someone will eventually forget — and that day the someone was me.

After that we consolidated everything into one layer:

- `EntityAccessPolicy` to declare permissions per entity type, instead of scattering `if` statements through business code.
- `AttributePermission` for field-level permissions, so a salesperson sees only the customer's name while a manager also sees the contract value — through the same API and the same DTO.
- `ApplyOwnershipFilterAsync`, a single function applying the ownership filter to an [IQueryable](https://learn.microsoft.com/en-us/dotnet/api/system.linq.iqueryable), shared by Lead, Account, Order, CrmTask and every entity added afterwards.
- `GetUserIdsUnderManagerAsync` with caching, resolving the management hierarchy once and keeping it, rather than running a recursive query per request.

The line that sums up this whole period is one I read somewhere long ago — apply permissions at the query layer, not the UI layer — but knowing it and believing it turned out to require tripping over it myself. Hiding a column in the UI is decoration; filtering the `IQueryable` is actual security.

The payoff is that from then on, every newly written API was protected by default without anyone needing to remember anything — and in a codebase 25 people are editing, "nobody has to remember" turned out to matter far more than I expected.

That same period also produced the Lead, Account, Order, Quotation, Product Catalog, Pricebook, Ticket, Contract (with Word/PDF generation) and Call Log (wired to the phone system) modules. That part is CRM work as you would expect it — nothing dramatic to tell.

## Mid-2025: mentoring for the first time

Mid-2025 I was asked to mentor four interns, and this was work I had not anticipated being difficult in the way it was.

The first difficulty was not explaining concepts but splitting up tasks. I was used to just doing things quickly myself, so spending an hour explaining something I could have typed in fifteen minutes made me genuinely impatient at first. Then I realised that most of the time when they produced something quite different from what I had pictured, they had not done it wrong — I had described the task badly. Writing a task that is appropriately sized, clearly bounded, and explains why it matters turns out to be a skill of its own, entirely unrelated to being good at code.

The second difficulty was reviewing. Before this, my reviews pointed out what was wrong and said to fix it, job done. That does not work with interns, because they will fix the exact spot you pointed at and then repeat the same thing in another file next time. You have to explain why it is wrong and what doing it properly buys you — and that takes several times as long.

Then there is the people-management part: tracking four people's progress at once, noticing who is stuck but not yet saying so, and assigning work so they learn something new without getting a task so far beyond them it destroys their confidence. I did that more by instinct than by method, and I am sure I got some of the assignments wrong.

Looking back, that stretch changed how I work far more than it changed my coding. Most concretely, it pushed me to start writing every convention down as documentation, because by the fourth time explaining the same rule I understood I should write it once instead of repeating it in every review.

## When my code became everyone's code

In the second half of 2025 I moved much of my effort to the frontend platform layer, and started to understand an entirely different kind of pressure.

The product's shared libraries became the most-changed directory in the repo at 11,987 file changes — the business component set, a customised [PrimeNG](https://primeng.org/), theme tokens for dark and dim modes, plus sidebar, pagination, table helpers and shared-ui.

Working on a feature, my bug is one screen's bug. Working on shared code is different: get a colour token wrong and 40 screens go off at once; change a component's signature and the whole team's build breaks while everyone looks over. The first time that happened I was fairly embarrassed and sat fixing it until evening.

The upside is that doing it once pays across the whole product: optimise the table helper once and every table in the system gets faster; standardise the theme tokens once and new screens are born matching the design without anyone reviewing colours.

What I learned in that period turned out not to be technical but rhythmic: shared code needs longer reviews, needs a heads-up before a breaking change, and needs you to accept being one beat slower so that everyone else can be faster. Obvious enough written down — much harder when a deadline is pressing.

## Late 2025: from demos to the real thing

For nearly its whole first year, the product lived in demo mode. Any interested customer got a presentation, and those customers spanned many industries — so that week-one constraint about hardcoding nothing industry-specific turned out to be the reason it could be demoed to any of them. That phase moved quickly and was fairly relaxed, since getting something wrong cost you face in one demo rather than affecting anybody.

Towards the end of 2025 a healthcare client signed, and from then on the product switched fully into delivery mode. For me that was the period of greatest change, in three places.

First, healthcare business processes demanded deeper configurability than I had assumed was already enough. Places I had thought were "configurable enough" turned out, against real workflows, to need another layer — so most of my time went into deepening things I had considered finished.

Second, the team grew substantially: not just more developers but BAs, QA and PMs. This is when the earlier work started paying back — ownership filtering in a single layer, the proxy generation pipeline, the shared component set. With few people those were merely convenient; with many people, "nobody has to remember any rule" became genuinely existential.

Third, the process tightened, because now there were commitments to a customer. No more deploying because it looked fine: everything goes through QA, everything needs evidence, everything has a date. I will admit it felt constraining at first, but I came to see it as the natural price of having real users — and it is also what forced every later migration to have an undo button, rather than betting on a single deploy night.

## The Angular episode, November 2025

I will tell this one quickly, because telling it slowly hurts.

I took on the Angular 19 → 20 upgrade across all 13 libraries, worked on it for two weeks, and ended up reverting.

The fault was not Angular's but my greed: I was upgrading the framework *and* handling PrimeNG's breaking changes at the same time, swapping `p-dropdown` for [`p-select`](https://primeng.org/select) across hundreds of templates, while the feature teams kept merging into the same branch every day. By the time the diff had grown past anything anyone could review, every rebase produced a fresh pile of conflicts, and I was spending more time resolving conflicts than writing code.

I still remember how it felt to accept it was not going to land — not so much regret at the wasted effort as knowing I had seen it coming days earlier and pushed on anyway.

Four months later, in March 2026, I did it again and finished. Same volume of work; the only difference was how it was sliced.

**How I did it the second time**

- [x] Split the UI library's breaking changes into their own PR, merged first, kept separate from the framework upgrade
- [x] Follow the Angular Update Guide rather than hand-editing package.json
- [x] Agree a short merge-freeze window; don't upgrade in parallel with feature work
- [x] Upgrade libraries one at a time in dependency order, green build before moving on
- [x] If the diff grows past what can be reviewed, revert immediately — don't push on for another week

The [Angular Update Guide](https://angular.dev/update-guide) lists every step for each version pair, and frankly it is a great deal more trustworthy than my intuition.

Counting from day one, the upgrade path has been ABP 9.0 to 9.3.6, .NET SDK 9.0.101, Angular 16 to 20, plus PrimeNG along the way, with no release ever disrupted by any of it. I am now eyeing ABP 10.x with .NET 10, and this time I know the road better.

## Building chat, in the wrong order

Q1 2026 was my favourite stretch, simply because most of it was work I had never done before: adding omnichannel conversation capability to the CRM.

What came out was a dedicated service: a Chat Inbox with conversation threads, tagging and a zen mode for agents to focus; Facebook/Messenger integration through an intermediate platform, normalising webhooks into one common schema; realtime via [SignalR](https://learn.microsoft.com/en-us/aspnet/core/signalr/introduction); a full call-centre model with Hotline, Queue, Agent, Extension and Queue Membership, plus a [Stringee](https://stringee.com/) webphone for calling straight from the browser. My favourite part is the link that creates a Lead directly from a conversation, which stops chat being merely a support channel.

The story worth telling here is that I did it in the wrong order.

SignalR on a single instance looks beautiful in a demo, so I wrote the business logic first, ran it locally, saw it glide along, and was delighted. Then it went onto [Kubernetes](https://kubernetes.io/docs/concepts/) across multiple pods and immediately raised the question that should have been answered on the first line of code: which pod is this user connected to? It took another stretch to fix, and since then I file realtime under infrastructure decisions, even when it arrives inside a feature ticket.

## The three months I committed nothing

I am including this deliberately, because a story that only covers the good parts is an advertisement.

From roughly May to July 2026 I barely committed to this repo at all — one commit in the whole period. Not because there was no work or I was idling, but because I was moved to a different loyalty project for a while before coming back. That is why my CV says "01/2025 – present" rather than "20 consecutive months"; the two phrasings are different, and anyone who cares to open `git log` will see the difference too.

Looking back, that loyalty stint was actually useful for the return, because working on a different product made it obvious which of my conventions were genuinely sound and which I had merely grown used to and mistaken for standards.

I mention this because it touches on a habit I hold to fairly strictly: only use numbers you are willing to be questioned about.

To get the figures for this post I scanned `git log` across all the repos and filtered by my email:

| Metric | Figure |
| --- | --- |
| Commits in the main monorepo | 8,059 / 29,607 |
| Real commits, excluding merges | 2,851 |
| File changes | 44,703 |
| Hand-written [EF Core migrations](https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations/) | 228 |
| Test files ([xUnit](https://xunit.net/) + spec) | 187 |
| Angular libraries worked on | 13 / 13 |
| Backend services worked on | 18 |
| [GitOps](https://opengitops.dev/) commits for the QA environment | 371 |
| Commits promoting QA to UAT (17 services) | 95 |
| [Azure DevOps](https://learn.microsoft.com/en-us/azure/devops/boards/) work items linked directly to commits | 35 |

Now let me be clear about those numbers.

Commit counts measure work volume barely at all, since the same amount of work produces wildly different totals depending on whether someone squashes or commits in small pieces — and I am in the small-commit camp, which inflates mine. The metrics closer to actual scope are the migration count, the service count and the library count.

I dropped lines of code entirely: `git log` reports `+4.32M / −2.60M`, which sounds magnificent but is mostly generated proxies and lockfiles. Put that on a CV and you are simply waiting for one question to expose it.

And the most obvious point is the one that needs saying loudest: those 18 services were the work of 25 people, so everything here is my part, not the product.

## My favourite migration

If anyone asked what I achieved in those twenty months, this is what I would tell them — even though it is the least dramatic thing in the post.

The problem was that the message template module (`MessageTemplate`) was in the wrong place. It lived in two different services when, by [bounded context](https://martinfowler.com/bliki/BoundedContext.html), it belonged to the notification service — while three other services called into it daily on a system that already had real users.

The approach 2024-me would have taken: one enormous PR, change everything, deploy on Saturday night, open the log tab and pray.

This time it was [Strangler Fig](https://martinfowler.com/bliki/StranglerFigApplication.html) with [branch by abstraction](https://martinfowler.com/bliki/BranchByAbstraction.html):

1. Stand up the new source in the notification service in parallel, leaving the old data exactly where it was.
2. Put a feature toggle in front of a dual read — flag on reads the new source, flag off falls back to the old one — switched by configuration, no deploy required.
3. Cut over one caller at a time in slices: Ticket first, then Campaign, then the remaining service, each slice a small PR that could be reviewed and rolled back within seconds by flipping the flag.
4. Verify on QA after each slice before starting the next one.

The result was no downtime, no big-bang deploy, and nobody on a night shift.

Nobody noticed it had happened, and that is the part I like. After the November Angular episode I understood that what I needed was not to go faster but to always have one button that takes me back. This kind of migration is hard to show off because there is nothing thrilling to look at, but I still think it is the most decent piece of work I did in those twenty months.

That same quarter I also rebuilt another service onto the [ABP single-layer](https://abp.io/docs/latest/solution-templates/single-layer-web-application) layout, renaming every namespace and restoring its build pipeline — but that one really was dull, and there is nothing to tell.

## How the way I write code changed completely

One thing shifted quietly across this whole period that `git log` cannot show: how I actually produce code.

At the start of 2025 I typed everything by hand. I used [ChatGPT](https://chatgpt.com/), but only as a reference — asking about syntax, getting a stack trace explained — then typing it into the project myself. Slightly more convenient than Google, but it changed nothing about how I worked, because it had no idea what my codebase looked like.

The real shift came with [Cursor](https://cursor.com/), because suddenly the AI could read the context of the whole repo. Its suggestions started matching existing conventions instead of producing something generic I would have to rewrite from scratch. In an 18-service monorepo where every service follows the same layout, that pays off — especially for repetitive work like adding an entity along with its full set of application service, DTOs, permissions and migration.

After that I moved to [Claude](https://claude.ai/), starting on the standard plan and moving to premium once I was hitting the limits too often. What I valued at this stage was not typing speed but more even quality. Previously, code I wrote while fresh and code I wrote against a deadline differed noticeably; now the quality floor stays steadier, even on tired days.

This connects directly to the engineering rule set I describe below. Standards like keeping comments short, how to write a .NET service, how to declare permissions — I originally wrote them to remind people on the team, but they later became the way to tell an AI how this project is built. Writing the rule once and letting the AI apply it turned out to be far more effective than repeating myself in each review. And exactly as the team grew and the process tightened, that mattered more, because making many people's code look like one person's is very hard to do by hand.

There are, of course, places I do not hand to an AI. Permissions, data migrations, anything touching tenancy — I still read those line by line, because getting them wrong affects real users rather than merely reddening a build. Broadly I treat it like a new team member: capable of a lot, fast, but the review is still mine.

I have written about this subject in more depth in the [AI-Driven Development series](https://tiennhm.io.vn/blog/phat-trien-phan-mem-ai-driven-development); here I am only telling the part that touches this project.

## The work nobody assigns you

There is a category of work that appears in no sprint, and for me it always starts somewhere very mundane: being personally annoyed by something.

**The CLI for running services locally.** With 18 services in a monorepo, `dotnet run` by hand is not viable — I tried, opened eight terminal windows and lost track of which was which. So I wrote an internal CLI on top of [PM2](https://pm2.keymetrics.io/docs/usage/quick-start/) to start, stop and tail logs by service name, with a low-memory build mode for weaker machines and a `--with-tests` flag. The whole team uses it daily now, and I still get a small kick out of watching someone type it.

**Coding standards with automated check scripts.** Rules about keeping comments short, checking for work left half-done, how to write a .NET service and how to declare permissions. The motivation was simple: I noticed I was giving the same review comment for the fourth time.

**[ADRs](https://adr.github.io/) and post-incident lessons learned.** The identity service in `CrashLoopBackOff`, migrations drifting out of sync between services, the ordering of database extension deploys — each incident got a short document costing about 20 minutes. I will admit I tripped several times before I started writing them down, which means the project's ADR list is also the list of places I once lost time.

**Fix things at the infrastructure layer, not where the error surfaces.** [OpenIddict](https://documentation.openiddict.com/) scopes across services, [ABP's dynamic C# client](https://abp.io/docs/latest/framework/api-development/dynamic-csharp-clients) requiring controllers to implement an interface, [YARP](https://microsoft.github.io/reverse-proxy/) routing at the gateway, [HealthChecksUI](https://github.com/Xabaril/AspNetCore.Diagnostics.HealthChecks) binding the wrong address on Kubernetes. What these have in common is that fixing them where the error appears means they come back two weeks later.

**Bug fixes with evidence.** Recently I have been linking 35 Azure DevOps work items straight into commit messages, one `fix/AB{id}` branch per bug with unit tests attached — for instance the resolver tests checking share permissions when creating a Booking or Task. It sounds dry, but it kills the most tiring argument in this job: whether a bug has actually been fixed.

Finally there are the 371 GitOps commits for the QA environment ([Helm](https://helm.sh/docs/) values, configmaps, identity clients, image tags) and 95 commits promoting 17 services to UAT — the part that carries code from my machine to a user's hands. Nobody notices it, until the day it breaks.

## What I wrote down

The first week has the strongest influence and it works in both directions: the script I wrote out of laziness on day three still runs, while the names I got wrong that week are something the team still lives with.

Never let an important rule depend on people remembering it — the export screen taught me that, and it holds equally for permissions, for coding conventions and for the bug-fixing process.

Taking on shared code means taking both of its faces: do it once and the whole product benefits, get it wrong once and the whole product suffers. There is no way to have one without the other.

Migrations should be as boring as possible: small slices, feature toggles, dual reads, and a rollback that is one flag away. It takes longer, but I think that is the right place to be slow.

And revert early. I paid for that lesson with exactly two weeks of November.

## Questions people ask me about this

### How do you move a bounded context into another service without downtime?

I did it in four steps. One, stand up the new data source in the destination service and leave the old one untouched. Two, put a feature toggle in front of reading from both sources — a dual read — switched by configuration rather than a deploy. Three, cut over one caller at a time in small slices, each slice a reviewable PR that can be rolled back by flipping the flag. Four, verify on QA after each slice before starting the next. The core of it is that at every moment there is exactly one button that takes you back, so no downtime window is needed.

### How should record-level permissions in a CRM be designed?

Apply them at the query layer, not the UI layer — a lesson I paid for with an export screen that forgot its permission filter. Concretely: a policy declaring permissions per entity type instead of if statements scattered through business code; an attribute-level permission layer so the same DTO returns different fields per role; a single function applying the ownership filter to IQueryable, shared by every entity; and caching the resolved management hierarchy instead of running a recursive query per request. The biggest gain is that every API written afterwards is protected by default, with nobody needing to remember a rule.

### What should you avoid when doing a major Angular upgrade on a multi-team monorepo?

Avoid combining the framework upgrade with a UI library's breaking changes on one branch, and avoid upgrading in parallel while feature teams merge into it daily. I did both the first time and had to revert after two weeks. The second attempt worked because the UI breaking changes went into their own PR and merged first, I followed the Angular Update Guide, I agreed a short merge-freeze window, and I upgraded libraries one at a time in dependency order with a green build after each step.

### For a multi-tenant product, which decision has to be made earliest?

How tenant data is separated, and it has to be settled at the very first table, because retrofitting it is extremely expensive. A framework like ABP covers the multi-tenancy scaffolding, but the product-specific parts still need designing yourself: per-tenant configuration, per-branch permissions and custom data fields. Alongside that comes a constraint to hold for the life of the project — hardcode nothing that belongs to a specific industry, so field names, business flows and display labels all have to be configurable.

### Where does an EAV architecture for dynamic attributes get slow?

Two places hurt most in my experience. First, filtering and sorting on dynamic attributes: the values are spread across the value table, so each filter condition adds another join, and a user filtering three fields and sorting by a fourth makes the query balloon visibly. Second, list screens with many dynamic columns: on screen it is a single page of 20 rows, but underneath are several hundred value rows to read and assemble. What helped most turned out not to be a cleverer query but caching the attribute definition metadata, because the attribute list and its data types change very rarely while every request had been asking for them from scratch.

### What changes when a product moves from demos to real delivery?

Three things, in my experience. First, the customer's processes demand deeper configurability than you thought was already enough, so most of your time goes into deepening things you considered finished. Second, the team grows — not just developers but BAs, QA and PMs — and this is when things like single-layer permission filtering or code generation pipelines pay back, because with many people the fact that nobody has to remember a rule becomes existential. Third, the process tightens because there are commitments to a customer: everything goes through QA and needs evidence, and you no longer deploy just because it looks fine.
