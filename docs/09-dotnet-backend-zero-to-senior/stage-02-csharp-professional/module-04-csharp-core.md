---
title: Module 4 — C# Core
slug: dotnet-module-04-csharp-core
description: OOP đầy đủ — class, interface, kế thừa, đa hình, đóng gói, trừu tượng, access modifiers.
sidebar_position: 1
tags: [dotnet, csharp, oop]
keywords: [csharp, oop, inheritance, polymorphism]
enableComments: true
draft: false
---

## Mục tiêu

Viết C# theo hướng đối tượng rõ ràng, chuẩn bị cho thư viện domain CRM sau này.

## Nội dung trọng tâm

- OOP toàn diện  
- Class / Interface  
- Inheritance  
- Polymorphism  
- Encapsulation  
- Abstraction  
- Access modifiers  

## Liên hệ CRM

Entity như `Customer`, `Lead`, `Contact` và policy phân quyền thường mô hình hóa bằng class/interface và composition — OOP vững giúm tránh “god class” và duplicate logic.

## Thực hành gợi ý

Mô hình hóa miền nhỏ: `Product`, `Warehouse`, `StockMovement` với interface `IInventoryService` (chưa cần ASP.NET).
