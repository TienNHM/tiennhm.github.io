---
title: Module 17 — Distributed Systems
slug: dotnet-module-17-distributed-systems
description: Event-driven, Kafka, RabbitMQ, CDC, outbox, idempotency, retry.
sidebar_position: 2
tags: [dotnet, kafka, rabbitmq, outbox]
keywords: [event-driven, cdc, idempotency, message-broker]
enableComments: true
draft: false
---

## Mục tiêu

Thiết kế luồng event an toàn khi có network và trùng gửi — chuẩn bị tách service CRM.

## Nội dung trọng tâm

- Event-driven architecture  
- Kafka  
- RabbitMQ  
- CDC  
- Outbox pattern  
- Idempotency  
- Retry strategy  

## Bổ sung (đối chiếu roadmap.sh)

- Message brokers: ActiveMQ, Kafka, RabbitMQ, Azure Service Bus.  
- **MassTransit** / **NServiceBus** / **EasyNetQ** — chọn một cho demo.  
- **NetMQ** *optional*.  

## Liên hệ CRM

“Lead converted” phát event cho Billing và Support; outbox đảm bảo không mất event khi commit DB.

## Thực hành gợi ý

Outbox table + background dispatcher; consumer idempotent key = `eventId`.
