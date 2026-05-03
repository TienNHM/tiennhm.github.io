---
title: Module 18 — Microservices
slug: dotnet-module-18-microservices
description: Tách service, API Gateway, giao tiếp, observability, monitoring.
sidebar_position: 3
tags: [dotnet, microservices, yarp, observability]
keywords: [api-gateway, yarp, ocelot, tracing]
enableComments: true
draft: false
---

## Mục tiêu

Biết khi nào tách service và vận hành nhiều deployable — CRM/ERP lớn.

## Nội dung trọng tâm

- Service decomposition  
- API Gateway  
- Service communication  
- Observability  
- Monitoring  

## Bổ sung (đối chiếu roadmap.sh)

- **YARP** (ưu tiên) và **Ocelot**.  
- **Dapr** / **Steeltoe** / **Orleans** *optional*.  
- Health checks, distributed tracing, metrics — liên kết Docker/K8s [Module 15](../stage-04-database-production/module-15-docker-deployment.md).  

## Liên hệ CRM

Tách `Identity`, `Notification`, `Billing` — gateway route theo tenant và version API.

## Thực hành gợi ý

Hai service + YARP route `/api/sales` và `/api/billing`; trace OpenTelemetry end-to-end.
