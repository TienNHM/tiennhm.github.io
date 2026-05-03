---
title: Module 15 — Docker + Deployment
slug: dotnet-module-15-docker-deployment
description: Docker, Compose, VPS Linux, Azure, CI/CD, logging production; Kubernetes và Aspire (orientation).
sidebar_position: 4
tags: [dotnet, docker, kubernetes, cicd]
keywords: [docker-compose, github-actions, azure, kubernetes]
enableComments: true
draft: false
---

## Mục tiêu

Đưa CRM chạy ổn định ngoài máy dev — mindset production.

## Nội dung trọng tâm

- Docker  
- Docker Compose  
- Linux VPS deploy  
- Azure deploy  
- CI/CD basics  
- Production logging  

## Bổ sung (đối chiếu roadmap.sh)

- Containerization best practices (multi-stage build, non-root).  
- **Kubernetes** triển khai & vận hành cơ bản.  
- CI/CD: GitHub Actions, Azure Pipelines, GitLab CI (chọn 1–2 chuẩn).  
- **.NET Aspire** — orientation local cloud-native.  
- Metrics/logging gắn observability ở [Module 18](../stage-05-senior-engineering/module-18-microservices.md).  

## Liên hệ CRM

Multi-instance API + Redis + DB — compose file là “hợp đồng” chạy demo CRM giống production nhỏ.

## Thực hành gợi ý

Pipeline build + test + push image; deploy lên một VM hoặc Azure Container Apps tối thiểu.
