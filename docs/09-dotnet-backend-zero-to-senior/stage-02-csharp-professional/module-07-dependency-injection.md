---
title: Module 7 — Dependency Injection
slug: dotnet-module-07-dependency-injection
description: IoC, container, lifetime Scoped/Singleton/Transient và anti-pattern.
sidebar_position: 4
tags: [dotnet, csharp, dependency-injection]
keywords: [ioc, di, scoped, singleton, transient]
enableComments: true
draft: false
---

## Mục tiêu

Thiết kế composition root rõ ràng — trùng với `Microsoft.Extensions.DependencyInjection` trong ASP.NET Core.

## Nội dung trọng tâm

- IoC  
- DI container  
- Lifetime  
- Scoped / Singleton / Transient  
- Anti-patterns  

## Liên hệ CRM

`DbContext`, repository, handler — scope theo HTTP request; singleton cho cache read-only; tránh captive dependency gây lỗi multi-tenant sau này.

## Thực hành gợi ý

Console host với `Host.CreateApplicationBuilder`, đăng ký 3 lifetime và quan sát behavior trong một “fake request”.
