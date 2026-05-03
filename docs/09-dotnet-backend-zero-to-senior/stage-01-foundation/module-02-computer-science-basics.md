---
title: Module 2 — Computer Science Basics
slug: dotnet-module-02-computer-science-basics
description: Internet, client/server, HTTP/S, API, JSON, database, authentication, hosting — nền cho backend.
sidebar_position: 2
tags: [dotnet, foundation, http, api]
keywords: [http, https, json, rest, hosting]
enableComments: true
draft: false
---

## Mục tiêu

Hiểu mô hình web và API để sau này đọc tài liệu ASP.NET Core và thiết kế CRM không “mù” giao thức.

## Nội dung trọng tâm

- Internet hoạt động như thế nào  
- Client / Server  
- HTTP / HTTPS  
- API  
- JSON  
- Database  
- Authentication  
- Hosting  

## Bổ sung (đối chiếu roadmap.sh)

- **.NET runtime** tổng quan (CLR, BCL).  
- **.NET CLI**: cài SDK, `dotnet new`, solution/project, `dotnet build` / `run`.  
- **Database fundamentals**, **SQL basics**, **database design basics** (khóa, quan hệ, chuẩn hóa nhẹ) — liên kết sâu tới [Module 12](../stage-04-database-production/module-12-sql-deep-dive.md) và [Learn SQL in 30 days](../../06-database/learn-sql-in-30-days/00.%2030-Day%20SQL%20Learning%20Roadmap.md).

## Liên hệ CRM

CRM là hệ client (web/mobile) gọi **API** qua **HTTPS**, dữ liệu **JSON**, phiên **authentication** — nắm các khái niệm này giúp thiết kế endpoint và phân quyền đúng từ đầu.

## Thực hành gợi ý

Dùng `curl` hoặc Postman gọi thử một public API; vẽ sơ đồ request/response cho một thao tác “tạo khách hàng”.
