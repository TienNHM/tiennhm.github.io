---
title: 2.02 | Insecure Direct Object References
slug: insecure-direct-object-references-02
description: Bài viết này sẽ hướng dẫn cách tấn công Insecure Direct Object References trên WebGoat 2023.8
image: https://tiennhm.github.io/img/docs/database.jpg
sidebar_position: 2
# sidebar_class_name: hidden
tags: 
    - web-security
    - webgoat
    - broken-access-control
    - insecure-direct-object-references
    - webgoat-2023.8
keywords: [web-security, webgoat, broken-access-control, insecure-direct-object-references, webgoat-2023.8]
enableComments: true # for Gisqus comments, set to true
draft: false # set to true to hide this post from the site
---

> **Authenticate First, Abuse Authorization Later** (Xác thực trước, lạm dụng quyền sau).

Nhiều lỗ hổng kiểm soát truy cập có thể bị khai thác bởi một người dùng **đã xác thực nhưng không được cấp quyền hợp lệ**.  

Vì vậy, trước tiên chúng ta sẽ **xác thực hợp lệ** vào hệ thống. Sau đó, chúng ta sẽ tìm cách **bypass (vượt qua) hoặc lạm dụng cơ chế phân quyền** để truy cập vào tài nguyên mà chúng ta không được phép.  

#### **Thông tin đăng nhập**  
- **ID**: `tom`  
- **Mật khẩu**: `cat`  
(Hệ thống này vốn dĩ không an toàn, đúng không? 😃)  

Sau khi đăng nhập thành công, hãy tiếp tục khám phá màn hình tiếp theo để tìm cách khai thác lỗ hổng phân quyền! 🚀