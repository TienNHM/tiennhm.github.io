---
title: Module 6 — Async Programming
slug: dotnet-module-06-async-programming
description: async/await, Task, thread, parallel, cancellation, deadlock và tư duy hiệu năng.
sidebar_position: 3
tags: [dotnet, csharp, async]
keywords: [async-await, task, cancellation-token, deadlock]
enableComments: true
draft: false
---

## Mục tiêu

Xử lý I/O và tải song song đúng cách — bắt buộc cho API CRM và job nền.

## Nội dung trọng tâm

- async / await  
- Task  
- Thread  
- Parallel programming  
- Cancellation Token  
- Deadlock  
- Performance thinking  

## Liên hệ CRM

Gọi DB, HTTP outbound, queue — nếu block thread hoặc deadlock sẽ “đứng” cả notification và approval; `CancellationToken` gắn với request offboard user.

## Thực hành gợi ý

Benchmark một vòng lặp sync vs `async` đọc file/HTTP; thực hành cancel `Task` dài.
