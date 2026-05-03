---
title: Module 14 — Caching + Background Jobs
slug: dotnet-module-14-caching-background-jobs
description: Redis, chiến lược cache, Hangfire, retry, queue; job nền cho CRM.
sidebar_position: 3
tags: [dotnet, redis, hangfire, background-jobs]
keywords: [redis, hangfire, polly, message-bus]
enableComments: true
draft: false
---

## Mục tiêu

Giảm tải DB và xử lý việc bất đồng bộ — notification, sync, báo cáo.

## Nội dung trọng tâm

- Redis  
- Caching strategy  
- Hangfire  
- Retry patterns  
- Queue basics  

## Bổ sung (đối chiếu roadmap.sh)

- Memory cache vs distributed cache.  
- **Native Background Service** (`IHostedService`).  
- **Quartz** / **Coravel** so với Hangfire.  
- **Polly** đồng bộ job và HTTP outbound.  
- Giới thiệu **message bus** (MassTransit / NServiceBus / EasyNetQ / Azure Service Bus) — cầu nối [Module 17](../stage-05-senior-engineering/module-17-distributed-systems.md).  

## Liên hệ CRM

Cache catalog sản phẩm, permission matrix; job gửi email digest, đồng bộ CRM → data warehouse nhẹ.

## Thực hành gợi ý

Hangfire dashboard bảo vệ auth; idempotent job “gửi reminder approval”.
