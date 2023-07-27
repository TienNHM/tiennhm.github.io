---
slug: tutorial-deploy-express-js-to-render
title: Deploy ExpressJS lên Render.com
description: Render.com - một lựa chọn tuyệt vời cho việc deploy ứng dụng ExpressJS thay thế cho Heroku
authors: [tiennhm]
enableComments: true # for Gisqus comments, set to true
draft: false # set to true to hide this post from the site
image: https://v1.screenshot.11ty.dev/https%3A%2F%2Frender.com/opengraph/
tags:
    - ExpressJS
    - Deploy
    - Render.com
    - Heroku
keywords: [javascript, expressjs, nodejs, deploy, render.com, heroku]
---

<p align="right">
    <img src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Ftiennhm.github.io%2Fblog%2Ftutorial-deploy-express-js-to-render&label=⚪Views&labelColor=%2337d67a&countColor=%23555555&style=flat&labelStyle=upper" loading='lazy' decoding='async'/>
</p>

Chắc hẳn các bạn đã biết đến Heroku, một nền tảng cloud hosting rất phổ biến hiện nay. Trước đây, mỗi khi bạn cần deploy một ứng dụng ExpressJS đơn giản, phục vụ cho quá trình học tập và nghiên cứu, thì Heroku là một lựa chọn tuyệt vời. 

Tuy nhiên, gần đây Heroku đã thay đổi chính sách, không còn hỗ trợ các gói miễn phí nữa. Vì vậy, trong bài viết này, mình sẽ giới thiệu với các bạn một nền tảng cloud hosting khác, cũng rất tốt, đó là Render.com.

## Render.com là gì?

[Render.com](https://render.com) là một nền tảng cloud hosting mới, được thiết kế để giúp các nhà phát triển xây dựng và triển khai các ứng dụng web nhanh hơn. Render cung cấp một nền tảng đơn giản để triển khai các ứng dụng web, các API và các công việc định kỳ. Render cũng cung cấp các công cụ để giúp bạn quản lý các ứng dụng của mình, bao gồm các bảng điều khiển, các báo cáo lỗi, các bản ghi lịch sử và nhiều hơn nữa...

## Chuẩn bị

Trước khi bắt đầu, các bạn cần chuẩn bị một số thứ sau:
- Một tài khoản Github
- Một tài khoản Render.com
- Một ứng dụng ExpressJS đơn giản, đã cấu hình và chạy được trên máy tính của bạn
- Một số kiến thức cơ bản về Git và Github

## Bắt đầu

