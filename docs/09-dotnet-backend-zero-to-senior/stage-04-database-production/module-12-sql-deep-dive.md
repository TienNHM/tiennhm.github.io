---
title: Module 12 — SQL Deep Dive
slug: dotnet-module-12-sql-deep-dive
description: SQL Server, PostgreSQL, tối ưu truy vấn, index, execution plan, lock, deadlock, transaction.
sidebar_position: 1
tags: [dotnet, sql, postgresql, sql-server]
keywords: [sql-server, postgresql, indexing, transactions, locks]
enableComments: true
draft: false
---

## Mục tiêu

Đọc và tối ưu SQL ở mức production — CRM báo cáo và batch phụ thuộc trực tiếp.

## Nội dung trọng tâm

- SQL Server  
- PostgreSQL  
- Query optimization  
- Indexing  
- Execution plan  
- Locks  
- Deadlocks  
- Transactions  

## Bổ sung (đối chiếu roadmap.sh)

- Stored procedures, constraints, triggers (enterprise).  
- Relational vs giới thiệu **NoSQL** (MongoDB, …) *alternative*.  
- Tùy chọn **Elasticsearch** cho tìm kiếm CRM nâng cao.  

## Liên hệ CRM

Báo cáo pipeline, dashboard tổng lead — nếu query kém sẽ “đơ” toàn hệ; transaction đúng chỗ tránh double-spend approval.

## Tài liệu liên quan trong site

- [Learn SQL in 30 days](../../06-database/learn-sql-in-30-days/00.%2030-Day%20SQL%20Learning%20Roadmap.md) — học song song, tránh trùng lặp bài giảng dài.

## Thực hành gợi ý

Đọc plan thực tế cho 3 query chậm; thiết kế index covering; mô phỏng deadlock và cách retry.
