---
title: "Scalar là gì? Tại sao nên dùng Scalar thay Swagger UI trong ASP.NET Core 10"
slug: gioi-thieu-scalar-api-reference-thay-the-swagger-ui
description: "Scalar là open-source API Reference UI hiện đại thay thế Swagger UI. Tìm hiểu lý do Microsoft loại bỏ Swashbuckle khỏi .NET 9/10, so sánh Scalar vs Swagger UI, và hướng dẫn setup Scalar trên ASP.NET Core 10 từng bước."
keywords: [scalar, swagger ui, swashbuckle, openapi, dotnet 10, aspnetcore, api documentation, net10, csharp, scalar aspnetcore, swagger alternative, microsoft openapi]
tags: [scalar, swagger, openapi, dotnet, aspnetcore, api, net10, csharp]
authors: [tiennhm]
date: 2026-08-19
---

import { SummaryBox } from '@site/src/components/SEO';

# Scalar là gì? Tại sao nên dùng Scalar thay Swagger UI trong ASP.NET Core 10

<SummaryBox>
**Scalar** là open-source API Reference UI thay thế Swagger UI, được Microsoft khuyến nghị cho ASP.NET Core từ .NET 9 trở đi. Kể từ .NET 9, Microsoft loại bỏ Swashbuckle (Swagger UI) khỏi template mặc định của Web API và thay bằng `Microsoft.AspNetCore.OpenApi` kết hợp với Scalar. Bài viết này giải thích lý do thay đổi đó, so sánh tính năng Scalar vs Swagger UI, và hướng dẫn thiết lập Scalar trong ASP.NET Core 10 từng bước - từ project mới lẫn migration từ dự án cũ.
</SummaryBox>

Nếu bạn tạo một project ASP.NET Core Web API mới với .NET 9 hoặc .NET 10 và ngạc nhiên khi không thấy Swagger UI nữa - bạn không phải người duy nhất. Microsoft đã chủ động thay thế Swashbuckle bằng một pipeline OpenAPI native, và **Scalar** là UI được khuyến nghị đi kèm.

<!-- truncate -->

## Tóm tắt nhanh (TL;DR) {#tldr}

- **.NET 9+**: Microsoft loại bỏ Swashbuckle khỏi template `dotnet new webapi`
- **Thay thế**: `Microsoft.AspNetCore.OpenApi` (sinh document) + `Scalar.AspNetCore` (UI)
- **OpenAPI JSON** giờ ở `/openapi/v1.json` thay vì `/swagger/v1/swagger.json`
- **Scalar UI** truy cập tại `/scalar/v1`
- Migration từ Swashbuckle mất khoảng 15-30 phút

---

## Tại sao Microsoft bỏ Swagger UI (Swashbuckle)? {#ly-do-microsoft-bo-swagger}

### Swashbuckle là thư viện bên thứ ba, không còn được maintain tích cực

Swashbuckle.AspNetCore là package của cộng đồng, không phải của Microsoft. Từ .NET 9, Microsoft quyết định cần một giải pháp **first-party** tích hợp sâu vào pipeline ASP.NET Core thay vì phụ thuộc vào package ngoài với vòng đời bảo trì không đảm bảo.

### Microsoft.OpenApi v2 là breaking change khiến Swashbuckle không tương thích

`Microsoft.OpenApi` phiên bản 2.x đi kèm .NET 10 có breaking change hoàn toàn so với v1.x mà Swashbuckle 6.x - 9.x phụ thuộc. Swashbuckle không thể build sạch trên .NET 10 vì object model mới không tương thích ngược.

### Native OpenAPI pipeline sinh OpenAPI 3.1 chuẩn hơn

`Microsoft.AspNetCore.OpenApi` - package đi kèm từ .NET 9 - sinh ra OpenAPI 3.1 trực tiếp từ metadata của endpoint. Không cần reflection phức tạp, hỗ trợ Native AOT đầy đủ, tích hợp hoàn hảo với Minimal APIs và Controller-based APIs.

:::info Swashbuckle có bị xóa hoàn toàn không?
Không. Swashbuckle vẫn là community package và vẫn hoạt động trên .NET 10. Điều thay đổi là nó **không còn nằm trong template mặc định** nữa - bạn phải tự opt-in nếu muốn dùng.
:::

---

## Scalar là gì? {#scalar-la-gi}

**Scalar** là open-source API Reference UI, đọc OpenAPI 3.1 và render thành giao diện tài liệu API tương tác. Scalar được tích hợp vào ASP.NET Core qua NuGet package `Scalar.AspNetCore`.

Scalar không chỉ là "Swagger UI đẹp hơn" mà có thêm nhiều tính năng nổi bật:

- **Dark mode tích hợp sẵn** - không cần theme tùy chỉnh
- **11 built-in themes** (`moon`, `purple`, `solarized`, `deepSpace`, `laserwave`...)
- **API Client tích hợp**: lịch sử request, environment variables, code snippet 25+ ngôn ngữ
- **Sidebar navigation** cho API có nhiều endpoint
- **Full-text search** tích hợp sẵn (Swagger UI cần plugin riêng)
- **CORS Proxy** để tránh lỗi khi test cross-origin API

---

## So sánh Scalar vs Swagger UI {#so-sanh-scalar-vs-swagger-ui}

| Tính năng | Scalar | Swagger UI |
|---|:---:|:---:|
| OpenAPI 3.1 | ✅ | ✅ |
| OpenAPI 3.2 | 🔄 đang phát triển | ❌ không có kế hoạch |
| .NET 9/10 native pipeline | ✅ | ❌ |
| Dark mode | ✅ | ❌ |
| Built-in themes | 11 themes | ❌ |
| Sidebar navigation | ✅ | ❌ |
| Full-text search | ✅ tích hợp sẵn | ⚠️ cần plugin |
| Code snippet generation | 25+ ngôn ngữ | ⚠️ hạn chế |
| Vue component | ✅ | ❌ |
| CORS Proxy | ✅ | ❌ |
| Desktop API Client | ✅ | ❌ |
| PRs merged 2025 | **2.075** | 176 |

> Nguồn: [scalar.com/resources/migration/swagger-ui](https://scalar.com/resources/migration/swagger-ui)

**Kết luận**: Scalar có community hoạt động tích cực hơn (~12x số PR merged trong 2025), nhiều tính năng hơn, và được Microsoft chọn làm UI mặc định cho ASP.NET Core từ .NET 9.

---

## Cách thiết lập Scalar trên ASP.NET Core 10 (từ đầu) {#setup-scalar-aspnetcore-10}

### Bước 1: Tạo project Web API mới

```bash
dotnet new webapi -n MyApi
cd MyApi
```

Với .NET 10, template đã tích hợp sẵn `Microsoft.AspNetCore.OpenApi`. Chỉ cần thêm Scalar:

```bash
dotnet add package Scalar.AspNetCore
```

### Bước 2: Cấu hình `Program.cs`

```csharp
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Đăng ký OpenAPI document generation
builder.Services.AddOpenApi();

var app = builder.Build();

// Chỉ expose docs trong môi trường Development
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();              // sinh /openapi/v1.json
    app.MapScalarApiReference();   // render UI tại /scalar/v1
}

app.UseHttpsRedirection();

// Ví dụ Minimal API
app.MapGet("/products", () =>
    Results.Ok(new[]
    {
        new { Id = 1, Name = "Laptop", Price = 25_000_000 },
        new { Id = 2, Name = "Mouse",  Price = 350_000 }
    })
)
.WithName("GetProducts")
.WithSummary("Lấy danh sách sản phẩm")
.WithDescription("Trả về toàn bộ danh sách sản phẩm hiện có trong hệ thống.");

app.Run();
```

Sau khi chạy, truy cập:

| URL | Mô tả |
|---|---|
| `https://localhost:{port}/openapi/v1.json` | File OpenAPI JSON |
| `https://localhost:{port}/scalar/v1` | Scalar UI |

### Bước 3: Cập nhật `launchSettings.json`

Để F5 tự mở Scalar thay vì trang trống, sửa `Properties/launchSettings.json`:

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

### Bước 4: Tùy chỉnh giao diện Scalar (tùy chọn)

```csharp
app.MapScalarApiReference(options =>
{
    options.Title = "My API Reference";
    options.Theme = ScalarTheme.Moon;
    options.DefaultHttpClient = new(ScalarTarget.CSharp, ScalarClient.HttpClient);
    options.DarkMode = true;
});
```

**Các theme có sẵn**: `Default`, `Alternate`, `Moon`, `Purple`, `Solarized`, `BluePlanet`, `Saturn`, `Kepler`, `Mars`, `DeepSpace`, `Laserwave`.

---

## Migration từ Swashbuckle sang Scalar {#migration-swashbuckle-scalar}

Nếu bạn có project .NET 8 hoặc cũ hơn đang dùng Swashbuckle, đây là các bước migration đầy đủ:

### Bước 1: Xóa Swashbuckle

```bash
dotnet remove package Swashbuckle.AspNetCore
dotnet remove package Swashbuckle.AspNetCore.Annotations  # nếu có
dotnet remove package Swashbuckle.AspNetCore.Filters       # nếu có
```

### Bước 2: Thêm package mới

```bash
dotnet add package Microsoft.AspNetCore.OpenApi
dotnet add package Scalar.AspNetCore
```

### Bước 3: Cập nhật `Program.cs`

**Trước - Swashbuckle:**

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

**Sau - Microsoft.AspNetCore.OpenApi + Scalar:**

```csharp
builder.Services.AddOpenApi();

// ...

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}
```

### Bước 4: Cập nhật URL

| Trước (Swashbuckle) | Sau (Scalar) |
|---|---|
| `/swagger/v1/swagger.json` | `/openapi/v1.json` |
| `/swagger` | `/scalar/v1` |

Cập nhật tất cả nơi hardcode URL cũ: CI pipeline, API gateway import, client generator config.

:::tip Migration an toàn - chạy song song
Nếu cần zero-downtime migration, chạy song song cả hai trong một release: giữ Swashbuckle phục vụ `/swagger/...` đồng thời thêm Scalar phục vụ `/openapi/...`. Sau khi mọi consumer chuyển sang URL mới, xóa Swashbuckle.
:::

---

## Thêm metadata API với Document Transformer {#them-metadata-api}

Để Scalar hiển thị thông tin đầy đủ (title, version, contact), thêm document transformer:

```csharp
builder.Services.AddOpenApi(options =>
{
    options.AddDocumentTransformer((document, context, cancellationToken) =>
    {
        document.Info = new()
        {
            Title = "My API",
            Version = "v1",
            Description = "API documentation sinh tự động bởi ASP.NET Core 10",
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

## Bảo mật endpoint `/openapi` và `/scalar` trong Production {#bao-mat-scalar-endpoint}

Mặc định chỉ expose docs trong môi trường Development. Nếu cần dùng trong Production (ví dụ internal portal), thêm authorization:

```csharp
// Chỉ user có role "Admin" mới được truy cập docs
app.MapOpenApi().RequireAuthorization("AdminOnly");
app.MapScalarApiReference().RequireAuthorization("AdminOnly");
```

---

## Câu hỏi thường gặp (FAQ) {#faq}

### Scalar có miễn phí không?

Có. Scalar là open-source (MIT license) và hoàn toàn miễn phí. Package `Scalar.AspNetCore` trên NuGet cũng miễn phí.

### Swagger có bị xóa hoàn toàn trong .NET 10 không?

Không. Swashbuckle vẫn là community package và hoạt động trên .NET 10. Điều thay đổi là nó không còn nằm trong template mặc định `dotnet new webapi` từ .NET 9 trở đi.

### Scalar có hỗ trợ Controller-based API không, hay chỉ Minimal API?

Scalar hỗ trợ cả hai. `Microsoft.AspNetCore.OpenApi` sinh document từ cả Minimal APIs lẫn Controller-based APIs. Scalar chỉ đọc file OpenAPI JSON nên không phân biệt cách API được định nghĩa.

### Tôi có thể dùng Scalar với Swagger UI cùng lúc không?

Có. Hai UI này hoàn toàn độc lập, cùng đọc file OpenAPI JSON. Đây là cách migration an toàn: chạy cả hai song song, rồi tắt cái cũ sau khi chuyển xong.

### OpenAPI JSON bây giờ ở đường dẫn nào?

Từ .NET 9 với `Microsoft.AspNetCore.OpenApi`, document nằm tại `/openapi/v1.json` (thay vì `/swagger/v1/swagger.json` của Swashbuckle). Đây là điều hay bị bỏ qua khi migration, làm hỏng CI pipeline và API gateway import.

### Scalar có hỗ trợ xác thực OAuth2 không?

Có. Scalar hỗ trợ OAuth2 với PKCE flow, API Key, và Bearer token. Bạn có thể cấu hình pre-fill authentication credentials thông qua options `Authentication`.

---

## Kết luận {#ket-luan}

Việc Microsoft loại bỏ Swashbuckle khỏi template mặc định là dấu hiệu ecosystem .NET đang trưởng thành hơn với giải pháp first-party. Bộ đôi **`Microsoft.AspNetCore.OpenApi` + `Scalar.AspNetCore`** là lựa chọn tối ưu cho ASP.NET Core 10:

- Sinh OpenAPI 3.1 chuẩn, hỗ trợ Native AOT
- Giao diện hiện đại, dark mode, 11 theme phong phú
- API Client tích hợp với code snippet 25+ ngôn ngữ
- Ít dependency bên ngoài, first-party support từ Microsoft
- Community hoạt động tích cực (2.075 PR merged trong 2025)

Nếu bạn bắt đầu project mới với .NET 10, hãy dùng Scalar ngay từ đầu. Với dự án cũ đang dùng Swashbuckle, migration chỉ tốn khoảng 15-30 phút theo hướng dẫn trong bài.

---

## Tài liệu tham khảo {#tai-lieu-tham-khao}

- [Scalar - Official Website](https://scalar.com/)
- [Migrate from Swagger UI to Scalar](https://scalar.com/resources/migration/swagger-ui)
- [Microsoft Docs - Using OpenAPI documents in ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/openapi/using-openapi-documents)
- [Combining API versioning with OpenAPI in .NET 10 - .NET Blog](https://devblogs.microsoft.com/dotnet/api-versioning-in-dotnet-10-applications/)
- [Swashbuckle Is Dead. Here's How to Migrate to Scalar in .NET 10](https://dev.to/jfmeyers/swashbuckle-is-dead-heres-how-to-migrate-to-scalar-in-net-10-155d)
- [ASP.NET Core Dropped Swagger - Here's What Replaced It in .NET 10](https://codewithmukesh.com/blog/dotnet-swagger-alternatives-openapi/)
