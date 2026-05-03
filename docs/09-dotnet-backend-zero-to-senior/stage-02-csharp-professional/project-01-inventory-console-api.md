---
title: "Project 1 — Inventory System (Console + API)"
slug: dotnet-project-01-inventory-console-api
description: Hệ kho — Product, Stock, Warehouse, nhập xuất, log — ôn C# và API tối thiểu trước CRM.
sidebar_position: 5
tags: [dotnet, project, inventory, api]
keywords: [inventory, warehouse, stock, crm-prep]
enableComments: true
draft: false
---

## Mục tiêu

Gắn kiến thức C#, async, DI vào một bounded context đơn giản — **bản nháp** cho mô hình kho trong CRM/ERP.

## Phạm vi

- Product  
- Stock  
- Warehouse  
- Import / Export  
- Logs  

## Liên hệ CRM

Inventory là pattern phổ biến trong ERP; log nhập xuất là tiền đề **audit log** và **approval** ở Project 2–3.

## Gợi ý triển khai

- Console: thao tác CLI hoặc menu.  
- API: Minimal API hoặc controller mỏng, swagger tối thiểu.  
- Log: structured log (chuẩn bị Serilog ở giai đoạn 3).  

## Tiêu chí xong

Có thể demo end-to-end: tạo kho → thêm hàng → nhập/xuất → xem log và số tồn.
