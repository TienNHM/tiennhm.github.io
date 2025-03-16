---
title: 1.01 | Hijack a session
slug: hijack-a-session-01
description: Bài viết này sẽ hướng dẫn cách tấn công Hijack a session trên WebGoat 2023.8
image: https://tiennhm.github.io/img/docs/database.jpg
sidebar_position: 1
# sidebar_class_name: hidden
tags: 
    - web-security
    - webgoat
    - broken-access-control
    - hijack-a-session
    - webgoat-2023.8
keywords: [web-security, webgoat, broken-access-control, hijack-a-session, webgoat-2023.8]
enableComments: true # for Gisqus comments, set to true
draft: false # set to true to hide this post from the site
---

## **1. Khái niệm**  
Khi một ứng dụng web tạo ra **Session ID** không đủ phức tạp hoặc ngẫu nhiên, hacker có thể đoán hoặc brute-force giá trị này để chiếm quyền truy cập vào phiên người dùng hợp lệ. Đây là một dạng tấn công **Session Hijacking** (Chiếm đoạt phiên).  

**Cách tấn công phổ biến:**  
- **Brute-force Session ID**: Nếu Session ID quá đơn giản hoặc dễ đoán (ví dụ: dạng số tuần tự `1001`, `1002`, `1003`...), hacker có thể thử từng giá trị đến khi trùng khớp.  
- **Session Fixation**: Kẻ tấn công gán một Session ID có sẵn cho nạn nhân trước khi họ đăng nhập, từ đó chiếm quyền điều khiển phiên.  
- **Session Theft**: Nếu ứng dụng không bảo vệ Session ID tốt (ví dụ: lưu trên URL thay vì Cookie, không có cơ chế bảo mật như `HttpOnly`, `Secure`...), hacker có thể đánh cắp Session ID bằng cách sử dụng XSS hoặc MITM.  

---

## **2. Mục tiêu bài tập**  
Mục tiêu của bạn trong bài tập này là **chiếm quyền truy cập vào một phiên đã xác thực của người dùng khác** bằng cách khai thác lỗ hổng về quản lý phiên.  
