---
slug: api-testing-types
title: Các loại kiểm thử API
authors: [tiennhm]
tags: [api, testing, types]
enableComments: true # for Gisqus comments, set to true
draft: false # set to true to hide this post from the site
image: ./images/api-testing-types.gif
---

<p align="right">
    <img src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Ftiennhm.github.io%2Fblog%2Fapi-testing-types&label=⚪View&labelColor=%2337d67a&countColor=%23555555&style=flat&labelStyle=upper" loading='lazy' decoding='async'/>
</p>

Giới thiệu về các loại kiểm thử API.

<!--truncate-->

![API Testing Types](./images/api-testing-types.gif)

Giải thích 9 loại kiểm thử API.
 
### Smoke Testing

Kiểm thử này được thực hiện sau khi phát triển API hoàn tất. Đơn giản là kiểm tra xem API có hoạt động và không gây ra lỗi gì không.
 
### Functional Testing (Kiểm thử chức năng)

Loại kiểm thử này tạo ra một kế hoạch kiểm thử dựa trên các yêu cầu chức năng và so sánh kết quả nhận được với kết quả mong đợi.

### Integration Testing (Kiểm thử tích hợp)

Kiểm thử này kết hợp nhiều cuộc gọi API để thực hiện các kiểm thử end-to-end. Các giao tiếp trong dịch vụ (intra-service) và truyền dữ liệu được kiểm tra.
 
### Regression Testing (Kiểm thử hồi quy)

Kiểm thử này đảm bảo rằng các bản sửa lỗi hoặc tính năng mới không làm hỏng các hành vi hiện có của API.

### Load Testing (Kiểm thử tải)

Loại kiểm thử này kiểm tra hiệu suất của ứng dụng bằng cách mô phỏng các tải khác nhau. Sau đó, chúng ta có thể tính toán được khả năng đáp ứng của ứng dụng.
 
### Stress Testing

Chúng ta tạo ra các tình huống tải cao để kiểm tra xem API có thể hoạt động bình thường hay không.
 
### Security Testing (Kiểm thử bảo mật)

Loại kiểm thử này kiểm tra các API trước tất cả các mối đe dọa bên ngoài có thể xảy ra.
 
### UI Testing (Kiểm thử giao diện người dùng)

Kiểm thử này kiểm tra các tương tác UI với các API để đảm bảo dữ liệu có thể được hiển thị đúng cách.
 
### Fuzz Testing

Loại kiểm thử này chèn dữ liệu đầu vào không hợp lệ hoặc không mong đợi vào API và cố gắng làm cho API bị treo. Bằng cách này, nó xác định các lỗ hổng của API.
 

## Tài liệu tham khảo

- https://www.linkedin.com/posts/alexxubyte_systemdesign-coding-interviewtips-activity-7157050982437195776-s5hC