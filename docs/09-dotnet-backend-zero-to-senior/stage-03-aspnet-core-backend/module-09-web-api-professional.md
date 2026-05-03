---
title: Module 9 — Web API Professional
slug: dotnet-module-09-web-api-professional
description: REST, versioning, filter/sort/pagination, upload, background processing — và testing API.
sidebar_position: 2
tags: [dotnet, aspnet-core, web-api, testing]
keywords: [rest, openapi, grpc, xunit, testcontainers]
enableComments: true
draft: false
---

## Mục tiêu

Thiết kế API sạch, có hợp đồng, có test — chuẩn production cho CRM.

## Nội dung trọng tâm

- RESTful API  
- Swagger  
- API Versioning  
- Pagination  
- Filtering  
- Sorting  
- Dynamic Query  
- File upload  
- Background processing  

## Bổ sung (đối chiếu roadmap.sh)

- REST: resource modeling, status code, idempotency.  
- OpenAPI UI: **Scalar** hoặc Swagger UI.  
- **OData**, **gRPC**; **GraphQL / HotChocolate** (*alternative*, không trục chính).  
- **Gridify** (dynamic query thực dụng).  
- **Object mapping**: AutoMapper vs **Mapperly** vs manual (ưu tiên Mapperly/manual).  
- **Testing backend**: **xUnit** (hoặc NUnit), **WebApplicationFactory**, **Testcontainers**, integration test, **Moq** / NSubstitute, **Respawn**, tùy chọn **Playwright**; **Polly** (retry / circuit breaker) cho `HttpClient`.  

## Liên hệ CRM

Danh sách lead/customer với filter phức tạp và export file là use case điển hình; Polly bảo vệ gọi dịch vụ ngoài (SMS, email gateway).

## Thực hành gợi ý

Một resource versioned `v1`/`v2`; bộ test integration chạy trên Testcontainers SQL/Postgres.
