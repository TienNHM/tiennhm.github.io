---
title: Module 8 — ASP.NET Core Fundamentals
slug: dotnet-module-08-aspnet-core-fundamentals
description: Pipeline, middleware, routing, controller, model binding, validation, config, logging, exception handling.
sidebar_position: 1
tags: [dotnet, aspnet-core, middleware]
keywords: [aspnet-core, middleware, routing, model-binding]
enableComments: true
draft: false
---

## Mục tiêu

Nắm request lifecycle và điểm mở rộng — nền cho mọi API CRM.

## Nội dung trọng tâm

- Request pipeline  
- Middleware  
- Routing  
- Controllers  
- Model Binding  
- Validation  
- Configuration  
- Logging  
- Exception handling  

## Bổ sung (đối chiếu roadmap.sh)

- ASP.NET Core Basics tổng thể.  
- **MVC** (routing, filters) — hữu ích kể cả khi tập trung Web API.  
- **Razor Pages** (tùy chọn, server HTML).  
- **Minimal APIs**.  
- **Filters và Attributes**.  
- **App Settings và Configuration** (`IConfiguration`, options pattern).  
- **StyleCop** / quy ước style.  
- Logging production: **Serilog** hoặc **NLog** (chọn một chuẩn khóa học).  

## Liên hệ CRM

Middleware cho correlation id, exception mapping, và logging mỗi request là “xương sống” observability cho CRM đông user.

## Thực hành gợi ý

Tạo API có middleware đo thời gian, global exception handler trả JSON chuẩn.
