---
title: "What Is Scalar? Why Use Scalar Instead of Swagger UI in ASP.NET Core 10"
slug: gioi-thieu-scalar-api-reference-thay-the-swagger-ui
description: "Scalar is a modern open-source API Reference UI that replaces Swagger UI. Learn why Microsoft dropped Swashbuckle from .NET 9/10, how Scalar compares to Swagger UI, and how to set Scalar up on ASP.NET Core 10 step by step."
keywords: [scalar, swagger ui, swashbuckle, openapi, dotnet 10, aspnetcore, api documentation, net10, csharp, scalar aspnetcore, swagger alternative, microsoft openapi, swashbuckle replacement, openapi 3.1 dotnet, minimal api documentation]
tags: [scalar, swagger, openapi, dotnet, aspnetcore, api, net10, csharp]
authors: [tiennhm]
image: https://scalar.com/brand/scalar-wordmark-light.png
date: 2026-08-19
---

import { SummaryBox, FAQSection } from '@site/src/components/SEO';

# What Is Scalar? Why Use Scalar Instead of Swagger UI in ASP.NET Core 10

<SummaryBox>
**Scalar** is an open-source API Reference UI that replaces Swagger UI, and it is what Microsoft recommends for ASP.NET Core from .NET 9 onward. Starting with .NET 9, Microsoft removed Swashbuckle (Swagger UI) from the default Web API template and replaced it with `Microsoft.AspNetCore.OpenApi` combined with Scalar. This post explains the reasoning behind that change, compares Scalar against Swagger UI feature by feature, and walks through setting Scalar up in ASP.NET Core 10 — both for a brand new project and as a migration from an existing one.
</SummaryBox>

If you created a new ASP.NET Core Web API project on .NET 9 or .NET 10 and were surprised to find Swagger UI missing, you are not alone. Microsoft deliberately replaced Swashbuckle with a native OpenAPI pipeline, and **Scalar** is the UI recommended alongside it.

![The Scalar API Reference interface on scalar.com](https://scalar.com/app-docs-animated.svg)

<!-- truncate -->

## TL;DR {#tldr}

- **.NET 9+**: Microsoft dropped Swashbuckle from the `dotnet new webapi` template
- **The replacement**: `Microsoft.AspNetCore.OpenApi` (document generation) + `Scalar.AspNetCore` (UI)
- **The OpenAPI JSON** now lives at `/openapi/v1.json` instead of `/swagger/v1/swagger.json`
- **The Scalar UI** is served at `/scalar/v1`
- Migrating away from Swashbuckle takes roughly 15–30 minutes

---

## Why did Microsoft drop Swagger UI (Swashbuckle)? {#ly-do-microsoft-bo-swagger}

### Swashbuckle is a third-party library that is no longer actively maintained

Swashbuckle.AspNetCore is a community package, not a Microsoft one. From .NET 9, Microsoft decided it needed a **first-party** solution integrated deeply into the ASP.NET Core pipeline rather than depending on an external package whose maintenance lifecycle offers no guarantees.

### Microsoft.OpenApi v2 is a breaking change that Swashbuckle cannot absorb

`Microsoft.OpenApi` 2.x, which ships with .NET 10, is a complete breaking change from the 1.x line that Swashbuckle 6.x–9.x depends on. Swashbuckle cannot build cleanly on .NET 10 because the new object model is not backward compatible.

### The native OpenAPI pipeline produces more standards-compliant OpenAPI 3.1

`Microsoft.AspNetCore.OpenApi` — the package that ships in-box from .NET 9 — generates OpenAPI 3.1 straight from endpoint metadata. No elaborate reflection, full Native AOT support, and clean integration with both Minimal APIs and controller-based APIs.

:::info Is Swashbuckle gone for good?
No. Swashbuckle is still a community package and still works on .NET 10. What changed is that it is **no longer part of the default template** — you have to opt in yourself if you want it.
:::

---

## What is Scalar? {#scalar-la-gi}

**Scalar** is an open-source API Reference UI that reads OpenAPI 3.1 and renders it as interactive API documentation. It plugs into ASP.NET Core through the `Scalar.AspNetCore` NuGet package.

Scalar is not merely "a prettier Swagger UI" — it brings a number of features of its own:

- **Dark mode out of the box** — no custom theme required
- **11 built-in themes** (`moon`, `purple`, `solarized`, `deepSpace`, `laserwave`, and more)
- **A built-in API client**: request history, environment variables, code snippets for 25+ languages
- **Sidebar navigation** for APIs with a large number of endpoints
- **Full-text search** built in (Swagger UI needs a separate plugin for this)
- **A CORS proxy** so cross-origin API testing does not fail

---

## Scalar vs Swagger UI {#so-sanh-scalar-vs-swagger-ui}

| Feature | Scalar | Swagger UI |
|---|:---:|:---:|
| OpenAPI 3.1 | ✅ | ✅ |
| OpenAPI 3.2 | 🔄 in progress | ❌ not planned |
| .NET 9/10 native pipeline | ✅ | ❌ |
| Dark mode | ✅ | ❌ |
| Built-in themes | 11 themes | ❌ |
| Sidebar navigation | ✅ | ❌ |
| Full-text search | ✅ built in | ⚠️ needs a plugin |
| Code snippet generation | 25+ languages | ⚠️ limited |
| Vue component | ✅ | ❌ |
| CORS proxy | ✅ | ❌ |
| Desktop API client | ✅ | ❌ |
| PRs merged in 2025 | **2,075** | 176 |

> Source: [scalar.com/resources/migration/swagger-ui](https://scalar.com/resources/migration/swagger-ui)

**The takeaway**: Scalar has a far more active community (~12× the merged PRs in 2025), ships more features, and is what Microsoft picked as the default UI for ASP.NET Core from .NET 9 on.

---

## Setting Scalar up on ASP.NET Core 10 (from scratch) {#setup-scalar-aspnetcore-10}

### Step 1: Create a new Web API project

```bash
dotnet new webapi -n MyApi
cd MyApi
```

On .NET 10 the template already includes `Microsoft.AspNetCore.OpenApi`. All you need to add is Scalar:

```bash
dotnet add package Scalar.AspNetCore
```

### Step 2: Configure `Program.cs`

```csharp
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Register OpenAPI document generation
builder.Services.AddOpenApi();

var app = builder.Build();

// Only expose the docs in the Development environment
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();              // generates /openapi/v1.json
    app.MapScalarApiReference();   // renders the UI at /scalar/v1
}

app.UseHttpsRedirection();

// A Minimal API example
app.MapGet("/products", () =>
    Results.Ok(new[]
    {
        new { Id = 1, Name = "Laptop", Price = 25_000_000 },
        new { Id = 2, Name = "Mouse",  Price = 350_000 }
    })
)
.WithName("GetProducts")
.WithSummary("Get the product list")
.WithDescription("Returns every product currently available in the system.");

app.Run();
```

Once it is running, these are the URLs you get:

| URL | Description |
|---|---|
| `https://localhost:{port}/openapi/v1.json` | The OpenAPI JSON document |
| `https://localhost:{port}/scalar/v1` | The Scalar UI |

### Step 3: Update `launchSettings.json`

So that F5 opens Scalar instead of a blank page, edit `Properties/launchSettings.json`:

```json
{
  "profiles": {
    "https": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "launchUrl": "scalar/v1",
      "applicationUrl": "https://localhost:7001;http://localhost:5001",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}
```

### Step 4: Customise the Scalar UI (optional)

```csharp
app.MapScalarApiReference(options =>
{
    options.Title = "My API Reference";
    options.Theme = ScalarTheme.Moon;
    options.DefaultHttpClient = new(ScalarTarget.CSharp, ScalarClient.HttpClient);
    options.DarkMode = true;
});
```

**Available themes**: `Default`, `Alternate`, `Moon`, `Purple`, `Solarized`, `BluePlanet`, `Saturn`, `Kepler`, `Mars`, `DeepSpace`, `Laserwave`.

---

## Migrating from Swashbuckle to Scalar {#migration-swashbuckle-scalar}

If you have a .NET 8 or older project still on Swashbuckle, here is the full migration path.

### Step 1: Remove Swashbuckle

```bash
dotnet remove package Swashbuckle.AspNetCore
dotnet remove package Swashbuckle.AspNetCore.Annotations  # if present
dotnet remove package Swashbuckle.AspNetCore.Filters       # if present
```

### Step 2: Add the new packages

```bash
dotnet add package Microsoft.AspNetCore.OpenApi
dotnet add package Scalar.AspNetCore
```

### Step 3: Update `Program.cs`

**Before — Swashbuckle:**

```csharp
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
});

// ...

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
```

**After — Microsoft.AspNetCore.OpenApi + Scalar:**

```csharp
builder.Services.AddOpenApi();

// ...

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}
```

### Step 4: Update your URLs

| Before (Swashbuckle) | After (Scalar) |
|---|---|
| `/swagger/v1/swagger.json` | `/openapi/v1.json` |
| `/swagger` | `/scalar/v1` |

Update everywhere the old URL is hardcoded: CI pipelines, API gateway imports, client generator configuration.

:::tip A safe migration — run both side by side
If you need a zero-downtime migration, ship both in one release: keep Swashbuckle serving `/swagger/...` while Scalar serves `/openapi/...`. Once every consumer has moved to the new URL, drop Swashbuckle.
:::

---

## Adding API metadata with a document transformer {#them-metadata-api}

To have Scalar display complete information (title, version, contact), add a document transformer:

```csharp
builder.Services.AddOpenApi(options =>
{
    options.AddDocumentTransformer((document, context, cancellationToken) =>
    {
        document.Info = new()
        {
            Title = "My API",
            Version = "v1",
            Description = "API documentation generated automatically by ASP.NET Core 10",
            Contact = new()
            {
                Name = "Tien NHM",
                Url = new Uri("https://tiennhm.github.io")
            },
            License = new()
            {
                Name = "MIT",
                Url = new Uri("https://opensource.org/licenses/MIT")
            }
        };
        return Task.CompletedTask;
    });
});
```

---

## Securing the `/openapi` and `/scalar` endpoints in production {#bao-mat-scalar-endpoint}

By default the docs are only exposed in the Development environment. If you do need them in production — an internal portal, say — add authorization:

```csharp
// Only users in the "Admin" role can reach the docs
app.MapOpenApi().RequireAuthorization("AdminOnly");
app.MapScalarApiReference().RequireAuthorization("AdminOnly");
```

---

<FAQSection
  title="Frequently asked questions (FAQ)"
  items={[
    {
      question: "Is Scalar free?",
      answer: "Yes. Scalar is open source (MIT license) and completely free. The Scalar.AspNetCore package on NuGet is free as well."
    },
    {
      question: "Has Swagger been removed entirely in .NET 10?",
      answer: "No. Swashbuckle is still a community package and it still works on .NET 10. What changed is that it is no longer part of the default dotnet new webapi template from .NET 9 onward."
    },
    {
      question: "Does Scalar support controller-based APIs, or only Minimal APIs?",
      answer: "It supports both. Microsoft.AspNetCore.OpenApi generates the document from Minimal APIs and controller-based APIs alike, and Scalar only reads the OpenAPI JSON file, so it does not care how the API was defined."
    },
    {
      question: "Can I run Scalar and Swagger UI at the same time?",
      answer: "Yes. The two UIs are entirely independent and both read the same OpenAPI JSON file. That is exactly what makes for a safe migration: run both in parallel, then turn the old one off once everything has moved across."
    },
    {
      question: "Where does the OpenAPI JSON live now?",
      answer: "From .NET 9 with Microsoft.AspNetCore.OpenApi, the document sits at /openapi/v1.json instead of Swashbuckle's /swagger/v1/swagger.json. This is the detail most often missed during a migration, and it breaks CI pipelines and API gateway imports."
    },
    {
      question: "Does Scalar support OAuth2 authentication?",
      answer: "Yes. Scalar supports OAuth2 with the PKCE flow, API keys, and bearer tokens. You can pre-fill authentication credentials through the Authentication options."
    }
  ]}
/>

---

## Conclusion {#ket-luan}

Microsoft dropping Swashbuckle from the default template is a sign of a maturing .NET ecosystem moving toward first-party solutions. The **`Microsoft.AspNetCore.OpenApi` + `Scalar.AspNetCore`** pairing is the sensible default for ASP.NET Core 10:

- Standards-compliant OpenAPI 3.1 generation with Native AOT support
- A modern interface with dark mode and 11 themes to pick from
- A built-in API client with code snippets for 25+ languages
- Fewer external dependencies, with first-party support from Microsoft
- An actively maintained community project (2,075 PRs merged in 2025)

If you are starting a new project on .NET 10, reach for Scalar from day one. For an existing project on Swashbuckle, the migration in this post takes about 15–30 minutes.

---

## References {#tai-lieu-tham-khao}

- [Scalar — Official Website](https://scalar.com/)
- [Migrate from Swagger UI to Scalar](https://scalar.com/resources/migration/swagger-ui)
- [Microsoft Docs — Using OpenAPI documents in ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/openapi/using-openapi-documents)
- [Combining API versioning with OpenAPI in .NET 10 — .NET Blog](https://devblogs.microsoft.com/dotnet/api-versioning-in-dotnet-10-applications/)
- [Swashbuckle Is Dead. Here's How to Migrate to Scalar in .NET 10](https://dev.to/jfmeyers/swashbuckle-is-dead-heres-how-to-migrate-to-scalar-in-net-10-155d)
- [ASP.NET Core Dropped Swagger — Here's What Replaced It in .NET 10](https://codewithmukesh.com/blog/dotnet-swagger-alternatives-openapi/)
