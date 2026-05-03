---
title: Module 10 — Authentication + Authorization
slug: dotnet-module-10-authentication-authorization
description: JWT, refresh token, claims, roles, policies và hệ permission.
sidebar_position: 3
tags: [dotnet, aspnet-core, jwt, authorization]
keywords: [jwt, refresh-token, claims, policies, rbac]
enableComments: true
draft: false
---

## Mục tiêu

Bảo vệ API CRM đa vai trò, chuẩn bị audit và compliance.

## Nội dung trọng tâm

- JWT  
- Refresh Token  
- Claims  
- Roles  
- Policies  
- Permission system  

## Bổ sung (đối chiếu roadmap.sh)

- Bảo mật secret/cấu hình (Key Vault, user-secrets dev).  
- Liên kết identity với **logging/audit** (who did what) cho CRM.  

## Liên hệ CRM

Phân quyền theo territory, chỉ được sửa lead của team, approval theo role — thường kết hợp policies + permission table.

## Thực hành gợi ý

Implement refresh rotation, revoke token, policy `CanApproveDeals` minh họa.
