---
title: "Project 2 — CRM Backend API"
slug: dotnet-project-02-crm-backend-api
description: API CRM — customer, lead, contact, permission, workflow, approval, notification, audit log.
sidebar_position: 5
tags: [dotnet, project, crm, api]
keywords: [crm, workflow, approval, audit]
enableComments: true
draft: false
---

## Mục tiêu

Một backend CRM **đủ chức năng để demo phỏng vấn senior** — trọng tâm tuyển dụng .NET backend.

## Phạm vi

- Customer  
- Lead  
- Contact  
- Permission  
- Workflow  
- Approval  
- Notification  
- Audit log  

## Liên hệ CRM

Đây là **trục giữa** của cả giáo trình: mọi module 8–11 hiện thực hóa tại đây; sau đó Project 3 bổ sung multi-tenant, job nền, Docker.

## Gợi ý kiến trúc

- Clean enough: application layer + EF (hoặc repository mỏng).  
- Audit: interceptor SaveChanges + bảng `AuditLog`.  
- Notification: queue + SignalR (hoặc chỉ SignalR giai đoạn đầu).  

## Tiêu chí xong

Có OpenAPI, auth JWT + refresh, ít nhất một workflow approval end-to-end và audit trail đọc được.
