---
title: Module 16 — Clean Architecture
slug: dotnet-module-16-clean-architecture
description: Layered, vertical slice, Clean Architecture, DDD cơ bản, domain events.
sidebar_position: 1
tags: [dotnet, clean-architecture, ddd]
keywords: [vertical-slice, clean-architecture, domain-events]
enableComments: true
draft: false
---

## Mục tiêu

Tách domain khỏi framework — CRM lớn không “dính” vào controller.

## Nội dung trọng tâm

- Layered architecture  
- Vertical Slice  
- Clean Architecture  
- DDD basics  
- Domain Events  

## Bổ sung (đối chiếu roadmap.sh)

- **MediatR** + **FluentValidation**.  
- **Razor** cho template email/report server-side (không đẩy sang Blazor UI).  
- **Marten** (event store) *optional*.  

## Liên hệ CRM

Bounded context: Sales, Customer Service, Billing — boundary rõ giúp team song song và giảm regression.

## Thực hành gợi ý

Refactor một slice “CreateLead” theo vertical slice + tests ở application layer.
