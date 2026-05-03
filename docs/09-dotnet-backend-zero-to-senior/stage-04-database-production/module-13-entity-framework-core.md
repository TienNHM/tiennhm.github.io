---
title: Module 13 — Entity Framework Core
slug: dotnet-module-13-entity-framework-core
description: DbContext, mapping, migration, performance, N+1, compiled query, bulk, concurrency, unit of work.
sidebar_position: 2
tags: [dotnet, ef-core, orm]
keywords: [ef-core, dbcontext, migrations, n-plus-one]
enableComments: true
draft: false
---

## Mục tiêu

ORM hiệu quả cho domain CRM — tránh anti-pattern phổ biến.

## Nội dung trọng tâm

- DbContext  
- Entity Mapping  
- Migration  
- Performance optimization  
- N+1 problem  
- Compiled Query  
- Bulk operations  
- Concurrency  
- Unit of Work  

## Bổ sung (đối chiếu roadmap.sh)

- Code First + Migrations (chi tiết quy trình team).  
- Lazy / Eager / Explicit loading; **Change Tracker API**.  
- **Dapper** khi cần đọc/ghi tối đa hiệu năng.  
- RepoDB / NHibernate *alternative* (chỉ liệt kê).  

## Liên hệ CRM

Aggregate `Order` + `LineItems`, tracking approval state — concurrency token tránh ghi đè khi hai sales cùng sửa lead.

## Thực hành gợi ý

Fix một case N+1 bằng `Include`/`SplitQuery`; benchmark compiled query vs LINQ thường.
