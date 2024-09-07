---
slug: load-testing-restful-apis-with-k6-part-04
title: Ý nghĩa các chỉ số trong kết quả của k6
authors: [tiennhm]
tags: [load-testing, k6, restful-api, performance-testing, setup]
enableComments: true # for Gisqus comments, set to true
draft: false # set to true to hide this post from the site
image: https://slorber-api-screenshot.netlify.app/https%3A%2F%2Fk6.io/showcase/
---

<p align="right">
    <img src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Ftiennhm.github.io%2Fblog%2Fload-testing-restful-apis-with-k6-part-04&label=⚪View&labelColor=%2337d67a&countColor=%23555555&style=flat&labelStyle=upper" loading='lazy' decoding='async'/>
</p>

Trong các bài viết trước, chúng ta đã tìm hiểu cách **cài đặt** [k6](https://k6.io), **viết** một kịch bản test đơn giản, **chạy** kịch bản test và **xem** kết quả. Trong bài viết này, chúng ta sẽ tìm hiểu ý nghĩa của các chỉ số trong kết quả của k6.

## Kết quả của k6

Khi chạy kịch bản test, k6 sẽ hiển thị kết quả trên màn hình console. Kết quả này có thể khá dài, nhưng chúng ta sẽ tìm hiểu ý nghĩa của từng phần trong kết quả này.

Giả sử ta có một kết quả như sau:

```bash
          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: script.js
     output: -

  scenarios: (100.00%) 1 scenario, 10 max VUs, 1m0s max duration (incl. graceful stop):
           * default: 10 looping VUs for 30s (gracefulStop: 30s)


     data_received..................: 2.7 MB 88 kB/s
     data_sent......................: 26 kB  844 B/s
     http_req_blocked...............: avg=24.59ms  min=0s       med=0s       max=575.19ms p(90)=0s       p(95)=135.71µs       
     http_req_connecting............: avg=10.94ms  min=0s       med=0s       max=260.2ms  p(90)=0s       p(95)=0s
     http_req_duration..............: avg=276.78ms min=244.65ms med=261.01ms max=574.14ms p(90)=279.08ms p(95)=506.76ms       
       { expected_response:true }...: avg=276.78ms min=244.65ms med=261.01ms max=574.14ms p(90)=279.08ms p(95)=506.76ms       
     http_req_failed................: 0.00%  ✓ 0        ✗ 233
     http_req_receiving.............: avg=13.12ms  min=0s       med=0s       max=261.03ms p(90)=977.48µs p(95)=98.09ms        
     http_req_sending...............: avg=35.59µs  min=0s       med=0s       max=1.41ms   p(90)=0s       p(95)=0s
     http_req_tls_handshaking.......: avg=11.95ms  min=0s       med=0s       max=284.05ms p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=263.62ms min=243.91ms med=258.58ms max=573.54ms p(90)=267.65ms p(95)=277.49ms       
     http_reqs......................: 233    7.495798/s
     iteration_duration.............: avg=1.3s     min=1.24s    med=1.26s    max=1.87s    p(90)=1.5s     p(95)=1.53s
     iterations.....................: 233    7.495798/s
     vus............................: 1      min=1      max=10
     vus_max........................: 10     min=10     max=10


running (0m31.1s), 00/10 VUs, 233 complete and 0 interrupted iterations
default ✓ [======================================] 10 VUs  30s
```

## Ý nghĩa

Kết quả này được chia thành 3 phần:

### 1. Logo của k6

Phần đầu tiên là logo của k6. Phần này không có ý nghĩa gì đặc biệt.


### 2. Thông tin về kịch bản test

- `execution`: cách thức chạy kịch bản test. Trong trường hợp này, kịch bản test được chạy trên máy local.
- `script`: chứa tên của file chứa kịch bản test.
- `output`: cách xuất kết quả. Trong trường hợp này, kết quả được xuất trực tiếp trên màn hình console. 

### 3. Kết quả của kịch bản test

#### 3.1. Thông tin về kịch bản test

- `scenarios`: kịch bản test, bao gồm:

  - `default`: tên của kịch bản test.
  - `10 looping VUs for 30s`: 10 virtual users sẽ được tạo ra và chạy kịch bản test trong 30 giây.
  - `gracefulStop: 30s`: kịch bản test sẽ được chạy trong 30 giây.

- Các chỉ số:

Tên chỉ số | Đơn vị | Ý nghĩa
--- | :---: | ---
| `data_received` | `byte` | Lượng dữ liệu nhận được trong quá trình chạy kịch bản test.
| `data_sent` | `byte` | Lượng dữ liệu gửi đi trong quá trình chạy kịch bản test.
| `http_req_blocked` | `millisecond` | Thời gian chờ để gửi request HTTP.
| `http_req_connecting` | `millisecond` | Thời gian kết nối đến máy chủ.
| `http_req_duration` | `millisecond` | Thời gian thực thi request HTTP.
| `http_req_failed` | `%` | Số lượng request HTTP thất bại.
| `http_req_receiving` | `millisecond` | Thời gian nhận phản hồi từ máy chủ.
| `http_req_sending` | `millisecond` | Thời gian gửi request HTTP.
| `http_req_tls_handshaking` | `millisecond` | Thời gian bắt tay TLS.
| `http_req_waiting` | `millisecond` | Thời gian chờ phản hồi từ máy chủ.
| `http_reqs` | `request` | Số lượng request HTTP được gửi đi.
| `iteration_duration` | `millisecond` | Thời gian thực thi một vòng lặp.
| `iterations` | `iteration` | Số lượng vòng lặp được thực thi.
| `vus` | `VU` | Số lượng virtual users.
| `vus_max` | `VU` | Số lượng virtual users tối đa.

#### 3.2. Thông tin về quá trình chạy kịch bản test
  
- `running`: quá trình chạy kịch bản test, bao gồm:

  - `0m31.1s`: thời gian chạy kịch bản test.
  - `00/10 VUs`: số lượng virtual users hiện tại.
  - `233 complete and 0 interrupted iterations`: số lượng vòng lặp đã thực thi và số lượng vòng lặp bị gián đoạn.

- `default`: quá trình chạy kịch bản test, bao gồm:

  - `10 VUs`: số lượng virtual users.
  - `30s`: thời gian chạy kịch bản test.

## Lời kết

Trong bài viết này, chúng ta đã tìm hiểu ý nghĩa của các chỉ số trong kết quả của k6. Hy vọng bài viết này sẽ giúp ích cho bạn trong việc tìm hiểu về k6.

[Bài viết tiếp theo](./part-05.md), chúng ta sẽ tìm hiểu cách trực quan hóa kết quả của k6 bằng Grafana và InfluxDB.