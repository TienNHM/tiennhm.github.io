---
title: 1.02 | Hijack a session
slug: hijack-a-session-02
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

## **1. Hints**

- Kiểm tra giá trị của cookie `hijack_cookie` và xem xét về định dạng của nó.
- Cookie `hijack_cookie` được chia thành hai phần và có định dạng như sau `"long number"-"another long number"`.
- Cookie `hijack_cookie` được chia thành hai phần và có định dạng như sau `"sequential number"-"unix epoch time"`.
- Thử gửi nhiều requests để buộc ứng dụng tạo ra các cookie mới và kiểm tra xem có theo 1 mẫu định dạng chung nào không.
- Đôi khi, người dùng được ủy quyền đăng nhập vào ứng dụng.

## **2. Các bước tấn công**

Xem thêm tại [đây](https://docs.cycubix.com/application-security-series/web-application-security-essentials/solutions/a5-broken-access-control/a1-2021-or-hijack-a-session-or-cycubix-docs/a1-2021-or-hijack-a-session-2-or-cycubix-docs).


## **3. Cách phòng tránh tấn công Session Hijacking**
✅ **Dùng UUID ngẫu nhiên thay vì số thứ tự.**  
✅ **Mã hóa session ID thay vì để dưới dạng số dễ đoán.**  
✅ **Hạn chế thời gian hiệu lực của session.**  
✅ **Ràng buộc session với IP hoặc User-Agent.**  
✅ **Sử dụng `Secure`, `HttpOnly` và `SameSite` cho cookie.**  
