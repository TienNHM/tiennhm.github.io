---
title: "Project 3 — Production CRM Platform"
slug: dotnet-project-03-production-crm-platform
description: CRM chạy production — multi-tenant, notification, approval engine, job nền, realtime, Docker.
sidebar_position: 5
tags: [dotnet, project, crm, docker, multi-tenant]
keywords: [multi-tenant, hangfire, signalr, docker]
enableComments: true
draft: false
---

## Mục tiêu

Nâng Project 2 lên **nền tảng** gần thực tế SaaS CRM — sẵn sàng tách service ở Final Project.

## Phạm vi

- Multi-tenant  
- Notification center  
- Approval engine  
- Background jobs  
- Realtime updates  
- Docker deployment  

## Liên hệ CRM

Tenant isolation (schema hoặc discriminator + filter), queue + SignalR cho trải nghiệm “enterprise”.

## Gợi ý kiến trúc

- Tenant resolver middleware + scoped `DbContext` factory.  
- Outbox hoặc ít nhất transactional email queue (chuẩn bị Module 17).  

## Tiêu chí xong

`docker compose up` chạy được API + DB + Redis + (tuỳ chọn) Hangfire; có ít nhất một luồng approval qua job + push realtime.
