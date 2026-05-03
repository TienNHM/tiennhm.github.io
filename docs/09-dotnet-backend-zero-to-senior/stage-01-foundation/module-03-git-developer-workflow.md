---
title: Module 3 — Git + Developer Workflow
slug: dotnet-module-03-git-developer-workflow
description: Git, GitHub, branch, merge, pull request và tư duy debug — quy trình làm việc như team production.
sidebar_position: 3
tags: [dotnet, foundation, git, devops]
keywords: [git, github, pull-request, debugging]
enableComments: true
draft: false
---

## Mục tiêu

Làm việc trên nhánh, review code và debug có hệ thống — chuẩn bị cho project Inventory và CRM sau.

## Nội dung trọng tâm

- Git  
- GitHub  
- Branch  
- Merge  
- Pull Request  
- Debugging mindset  

## Bổ sung (đối chiếu roadmap.sh)

- **GitLab / Bitbucket** như alternative trong doanh nghiệp.  
- Đọc thêm [Backend Roadmap](https://roadmap.sh/backend) để thấy kỹ năng chung ngoài .NET.

## Liên hệ CRM

Feature CRM (workflow, approval) thường phát triển theo nhánh, review kỹ vì ảnh hưởng compliance — thói quen PR và trace log lỗi là bắt buộc.

## Thực hành gợi ý

Tạo repo demo: nhánh `feature/add-readme`, mở PR, squash merge; thực hành `git bisect` hoặc debug một lỗi cố ý.
