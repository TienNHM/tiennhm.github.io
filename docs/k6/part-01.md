---
slug: load-testing-restful-apis-with-k6-part-01
title: Hướng dẫn cài đặt k6
authors: [tiennhm]
tags: [load-testing, k6, restful-api, performance-testing, setup]
enableComments: true # for Gisqus comments, set to true
draft: false # set to true to hide this post from the site
image: https://v1.screenshot.11ty.dev/https%3A%2F%2Fk6.io/opengraph/
---

<p align="right">
    <img src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Ftiennhm.github.io%2Fblog%2Fload-testing-restful-apis-with-k6-part-01&label=⚪Views&labelColor=%2337d67a&countColor=%23555555&style=flat&labelStyle=upper" loading='lazy' decoding='async'/>
</p>

[RESTful API](https://aws.amazon.com/what-is/restful-api/) là một trong những kiểu API phổ biến nhất hiện nay. Vì vậy, việc kiểm tra tải (load testing) là một phần quan trọng của việc kiểm tra hiệu suất. Trong bài viết này, chúng ta sẽ tìm hiểu cách **cài đặt** [k6](https://k6.io) để kiểm tra tải cho RESTful API.

<!--truncate-->

## Giới thiệu về k6

[Grafana k6](https://k6.io) là một công cụ kiểm tra tải (load testing) mã nguồn mở, giúp việc kiểm tra hiệu suất (performance testing) trở nên dễ dàng và hiệu quả.

Đây là một công cụ miễn phí, lấy nhà phát triển làm trung tâm và có thể dễ dàng mở rộng, được phát triển bởi [Grafana Labs](https://grafana.com/) và cộng đồng.

<img src="https://v1.screenshot.11ty.dev/https%3A%2F%2Fk6.io/opengraph/" loading='lazy' decoding='async'/>

### Những tính năng chính

**k6** có rất nhiều tính năng, mà bạn có thể dễ dàng tìm hiểu tất cả chúng trong tài liệu [tại đây](https://k6.io/docs/). Các tính năng chính bao gồm:

- [CLI tool](https://k6.io/docs/using-k6/k6-options/how-to/) với API thân thiện với nhà phát triển.
- Kịch bản test dễ dàng viết bằng JavaScript ES2015/ES6 - có hỗ trợ cho các [module local và remote](https://k6.io/docs/using-k6/modules/).
- [Check](https://k6.io/docs/using-k6/checks/) và [Thresholds](https://k6.io/docs/using-k6/thresholds/) - để kiểm tra tải theo định hướng mục tiêu, thân thiện với tự động hóa.

### Trường hợp thường dùng

Người dùng k6 thường là Developer, QA, SDET và SRE. Họ sử dụng k6 để kiểm tra hiệu suất và độ tin cậy của API, [microservices](https://microservices.io/) và trang web. Các trường hợp sử dụng k6 phổ biến là:

- Load testing: k6 được tối ưu hóa để tiêu thụ tài nguyên tối thiểu và được thiết kế để chạy các test tải cao ([spike](https://k6.io/docs/test-types/spike-testing/), [stress](https://k6.io/docs/test-types/stress-testing/), [soak](https://k6.io/docs/test-types/soak-testing/) tests).
- Browser testing: Thông qua [k6 browser](https://k6.io/docs/using-k6-browser/overview/), bạn có thể chạy test hiệu suất dựa trên trình duyệt và phát hiện các sự cố chỉ liên quan đến trình duyệt mà có thể bỏ qua hoàn toàn ở cấp giao thức.
- Chaos và resilience testing: k6 có thể được sử dụng để mô phỏng lưu lượng truy cập như một phần của việc test hỗn loạn (chaos testing), trigger chúng từ các thử nghiệm k6 hoặc đưa các loại lỗi khác nhau vào Kubernetes bằng [xk6-disruptor](https://k6.io/docs/javascript-api/xk6-disruptor/).
- Performance và synthetic monitoring: Với k6, bạn có thể tự động hóa và lên lịch trigger các thử nghiệm rất thường xuyên với tải nhỏ để liên tục xác thực hiệu suất và tính khả dụng của môi trường production của bạn.

<p align="center">
    <img src="https://k6.io/blog/static/d63ce8932598c91bbc2f4b5f77d25cab/4be29/api-collaboration.webp" loading='lazy' decoding='async'/>
</p>

### Một vài lưu ý

k6 là một công cụ kiểm tra tải hiệu suất cao, có thể viết bằng JavaScript. Thiết kế kiến trúc để có được những khả năng này, mang lại một số sự đánh đổi:

- **Không thể chạy trực tiếp trên trình duyệt**

Theo mặc định, k6 không hiển thị các trang web giống như cách trình duyệt thực hiện. Trình duyệt có thể tiêu tốn tài nguyên hệ thống đáng kể. Bỏ qua trình duyệt cho phép chạy nhiều tải hơn trong một máy.

Tuy nhiên, với [k6 browser](https://k6.io/docs/using-k6-browser/overview/), bạn có thể tương tác với các trình duyệt thực và thu thập số liệu giao diện người dùng như một phần của testing.

<p align="center">
    <img src="https://k6.io/blog/static/bf37122311fee7096e292f1d2f050b5e/f3baa/hybrid-testing.png" loading='lazy' decoding='async'/>
</p>

- **Không thể chạy trên Node.js**

JavaScript thường không phù hợp để sử dụng trong các trường hợp cần hiệu suất cao. Để đạt được hiệu suất tối đa, bản thân công cụ này được viết bằng [Go](https://go.dev), embed JavaScript runtime cho phép viết kịch bản kiểm tra dễ dàng.

Nếu bạn muốn import npm modules hoặc thư viện sử dụng NodeJS APIs, bạn có thể [bundle npm modules với webpack](https://k6.io/docs/using-k6/modules/#bundling-node-modules) và import chúng vào script load test.

:::info
Nếu muốn biết thêm thông tin về k6, bạn có thể xem thêm tại [đây](https://k6.io/docs).
:::
## Hướng dẫn cài đặt

k6 có các gói cài đặt dành cho Linux, Mac và Windows. Ngoài ra, bạn có thể sử dụng Docker container hoặc file cài đặt phần mềm.

Trong bài viết này, chúng ta sẽ tìm hiểu cách cài đặt k6 trên **Windows** thông qua file cài đặt phần mềm.

Để cài đặt k6, bạn có thể tải file cài đặt phần mềm tại [đây](https://dl.k6.io/msi/k6-latest-amd64.msi) và tiến hành cài đặt theo hướng dẫn.

<p align="center">
    <img src="/img/docs/k6/k6-install.webp" loading='lazy' decoding='async'/>
</p>

Sau khi cài đặt thành công, bạn có thể mở Command Prompt và kiểm tra phiên bản k6 đã cài đặt bằng lệnh:

```bash
k6
```
Nếu k6 đã được cài đặt thành công, bạn sẽ nhận được thông báo như sau:

<p align="center">
    <img src="/img/docs/k6/k6-install-verify.webp" loading='lazy' decoding='async'/>
</p>

Trong trường hợp bạn muốn cài một phiên bản cụ thể, bạn có thể tìm thấy tất cả các phiên bản tại [đây](https://dl.k6.io/msi/).

:::info 
Chi tiết hướng dẫn của các phương thức cài đặt k6, bạn có thể xem thêm tại [đây](https://k6.io/docs/getting-started/installation/).
:::

:::tip
Trong một vài tình huống, bạn có thể gặp lỗi khi cài đặt k6. Để khắc phục lỗi này, bạn có thể tham khảo thêm tại [đây](https://k6.io/docs/getting-started/installation/#troubleshooting).

Trên Windows, bạn có thể gặp lỗi sau khi cài đặt k6:

<p align="center">
    <img src="/img/docs/k6/k6-install-error.webp" loading='lazy' decoding='async'/>
</p>

Khi đó, hãy đảm bảo rằng bạn đã thêm đường dẫn đến thư mục chứa k6 vào biến môi trường PATH. Trong trường hợp mặc định, thư mục này sẽ nằm tại `C:\Program Files\k6`.
:::

## Lời kết

Trong bài viết này, chúng ta đã tìm hiểu về k6, một công cụ kiểm tra tải hiệu suất cao, có thể viết bằng JavaScript. Chúng ta cũng đã tìm hiểu cách cài đặt k6 trên Windows thông qua file cài đặt phần mềm.

Trong [bài viết tiếp theo](./part-02.md), chúng ta sẽ tìm hiểu cách viết một kịch bản kiểm tra tải đơn giản bằng k6.
