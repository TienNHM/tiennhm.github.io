---
title: Module 11 — SignalR
slug: dotnet-module-11-signalr
description: Realtime — notification center, chat, presence; so sánh WebSocket thuần.
sidebar_position: 4
tags: [dotnet, aspnet-core, signalr, realtime]
keywords: [signalr, websockets, notifications, presence]
enableComments: true
draft: false
---

## Mục tiêu

Đẩy thông báo và trạng thái realtime tới client CRM mà không polling nặng.

## Nội dung trọng tâm

- Realtime communication  
- Notification center  
- Chat system  
- Presence system  

## Bổ sung (đối chiếu roadmap.sh)

- **SignalR Core** chi tiết.  
- **WebSockets** thuần — khi nào không cần SignalR.  
- Scale-out, **backplane Redis** cho nhiều instance API.  

## Liên hệ CRM

“Lead mới được assign”, “approval đã duyệt”, presence “ai đang xem hồ sơ” — tất cả là use case SignalR điển hình.

## Thực hành gợi ý

Hub broadcast + group theo `tenantId` / `userId`; demo Redis backplane với 2 instance.
