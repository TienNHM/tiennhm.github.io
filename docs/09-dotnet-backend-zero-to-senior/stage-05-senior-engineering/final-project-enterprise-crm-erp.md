---
title: "Final Project — Enterprise CRM / ERP Platform"
slug: dotnet-final-project-enterprise-crm-erp
description: CRM/ERP cấp doanh nghiệp — ticketing, membership, loyalty, payment, contact center, omnichannel, event-driven, microservices, production deploy.
sidebar_position: 5
tags: [dotnet, project, crm, erp, microservices]
keywords: [enterprise, erp, omnichannel, payment]
enableComments: true
draft: false
---

## Mục tiêu

Chứng minh khả năng **system owner**: từ domain tới triển khai phân tán — portfolio cấp senior/architect.

## Phạm vi

- CRM  
- Ticketing  
- Membership  
- Loyalty  
- Payment  
- Contact center  
- Omnichannel communication  
- Event-driven modules  
- Microservices  
- Deployment production  

## Liên hệ CRM

Đây là **siêu tập** kỹ năng đã học; ưu tiên chứng minh vài flow end-to-end sâu thay vì màn hình phụ rỗng.

## Gợi ý tiếp cận

- Chọn 2–3 bounded context làm “xương sống” (Sales + Support + Billing).  
- Payment: sandbox + webhook idempotent (ôn Module 17).  
- Omnichannel: ít nhất email + SMS hoặc chat adapter với interface chung.  

## Tiêu chí xong

Có kiến trúc diagram, repo (hoặc mono-repo) có CI, môi trường chạy được bằng script/README, và tài liệu trade-off rõ ràng.
