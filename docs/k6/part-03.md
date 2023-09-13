---
slug: load-testing-restful-apis-with-k6-part-03
title: Load testing với Virtual Users
authors: [tiennhm]
tags: [load-testing, k6, restful-api, performance-testing, setup]
enableComments: true # for Gisqus comments, set to true
draft: false # set to true to hide this post from the site
image: https://v1.screenshot.11ty.dev/https%3A%2F%2Fk6.io/opengraph/
---

<p align="right">
    <img src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Ftiennhm.github.io%2Fblog%2Fload-testing-restful-apis-with-k6-part-03&label=⚪Views&labelColor=%2337d67a&countColor=%23555555&style=flat&labelStyle=upper" loading='lazy' decoding='async'/>
</p>

Trong [bài viết trước](./part-02.md), chúng ta đã tìm hiểu cách sử dụng k6 để kiểm tra tải cho RESTful API thông qua một kịch bản test đơn giản để tạo, đọc, cập nhật và xóa một người dùng. Trong bài viết này, chúng ta sẽ tìm hiểu cách sử dụng [k6](https://k6.io) để kiểm tra tải cho RESTful API thông qua một kịch bản test với nhiều [Virtual User](https://k6.io/docs/misc/glossary/#virtual-user).

<!--truncate-->

:::info Virtual User
Virtual User là một đại diện cho một người dùng thực sự. Một Virtual User có thể thực hiện một số hành động nhất định, ví dụ như tạo một người dùng mới, đọc thông tin của một người dùng, cập nhật thông tin của một người dùng, xóa một người dùng, v.v.

Một kịch bản test có thể có nhiều Virtual User. Các hành động này có thể được thực hiện tuần tự hoặc song song.

k6 chạy nhiều lần lặp song song với người dùng ảo (`VU`). Nói chung, nhiều người dùng ảo hơn có nghĩa là nhiều lưu lượng truy cập được mô phỏng hơn.

VU về cơ bản là các vòng lặp `while(true)` song song. Các tập lệnh được viết bằng JavaScript, dưới dạng module ES6, vì vậy bạn có thể chia các bài test lớn thành các phần nhỏ hơn hoặc tạo các module có thể sử dụng lại theo ý muốn.
:::

## Mục tiêu

Trong bài viết này, chúng ta sẽ tìm hiểu cách sử dụng k6 để kiểm tra tải cho RESTful API thông qua một kịch bản test với nhiều Virtual User. Cụ thể, chúng ta sẽ tìm hiểu cách:

- Viết một kịch bản test với nhiều Virtual User
- Tăng, giảm số lượng Virtual User theo từng giai đoạn

## Viết một kịch bản test với nhiều Virtual User

Trong [bài viết trước](./part-02.md), chúng ta đã làm quen với việc tạo một kịch bản test đơn giản. Trong đó, file `script.js` của chúng ta về cơ bản sẽ chỉ gọi API như thế này:

```js
import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  http.get('https://test.k6.io');
  sleep(1);
}
```

Để chạy kịch bản test này, chúng ta sẽ chạy lệnh sau:

```sh
k6 run script.js
```

Bây giờ, chúng ta sẽ tìm hiểu cách chạy kịch bản test này với nhiều Virtual User.

### Sử dụng cờ `--vus` và `--duration`

Cách đơn giản nhất để chạy kịch bản test với nhiều Virtual User là sử dụng cờ `--vus` và `--duration`. Cờ `--vus` sẽ chỉ định số lượng Virtual User cần chạy, còn cờ `--duration` sẽ chỉ định thời gian chạy của kịch bản test.

Ví dụ, để chạy kịch bản test với 10 Virtual User trong 30 giây, chúng ta sẽ chạy lệnh sau:

```sh
k6 run --vus 10 --duration 30s script.js
```

### Thông qua set `options`

Ngoài cách sử dụng cờ `--vus` và `--duration`, chúng ta cũng có thể sử dụng set `options` để chỉ định số lượng Virtual User cần chạy. Để làm điều này, chúng ta sẽ cần chỉnh sửa file `script.js` như sau:

```js
import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  http.get('https://test.k6.io');
  sleep(1);
}
```

Lưu ý rằng, chúng ta chỉ định từ khóa `export` cho `options` và `default` để k6 có thể nhận diện được các giá trị này. Sau đó, chúng ta sẽ chạy lệnh sau để chạy kịch bản test:

```sh
k6 run script.js
```

### Kết quả

Sau khi chạy kịch bản test, chúng ta sẽ nhận được kết quả như sau:

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

## Tăng, giảm số lượng Virtual User theo từng giai đoạn

Để tăng, giảm số lượng Virtual User theo từng giai đoạn, chúng ta sẽ sử dụng set `stages`. Để làm điều này, chúng ta sẽ cần chỉnh sửa file `script.js` như sau:

```js
import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m30s', target: 10 },
    { duration: '20s', target: 0 },
  ],
};

export default function () {
  http.get('https://test.k6.io');
  sleep(1);
}
```

Trong đó, `stages` là một mảng các đối tượng, mỗi đối tượng đại diện cho một giai đoạn. Mỗi giai đoạn sẽ có hai thuộc tính là `duration` và `target`. Thuộc tính `duration` sẽ chỉ định thời gian chạy của giai đoạn, còn thuộc tính `target` sẽ chỉ định số lượng Virtual User cần chạy trong giai đoạn đó.

Ta chạy lệnh sau để chạy kịch bản test:

```sh
k6 run script.js
```

### Kết quả

Sau khi chạy kịch bản test, chúng ta sẽ nhận được kết quả như sau:

```bash

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: d:\repos\tiennhm.github.io\docs\k6\scripts\script-stages.js
     output: -

  scenarios: (100.00%) 1 scenario, 20 max VUs, 2m50s max duration (incl. graceful stop):
           * default: Up to 20 looping VUs for 2m20s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


     data_received..................: 16 MB  115 kB/s
     data_sent......................: 145 kB 1.0 kB/s
     http_req_blocked...............: avg=8.67ms   min=0s       med=0s       max=558.01ms p(90)=0s       p(95)=0s
     http_req_connecting............: avg=4.27ms   min=0s       med=0s       max=268.3ms  p(90)=0s       p(95)=0s
     http_req_duration..............: avg=282.48ms min=238.45ms med=252.07ms max=2.42s    p(90)=263.6ms  p(95)=493.22ms       
       { expected_response:true }...: avg=282.48ms min=238.45ms med=252.07ms max=2.42s    p(90)=263.6ms  p(95)=493.22ms       
     http_req_failed................: 0.00%  ✓ 0        ✗ 1399
     http_req_receiving.............: avg=9.31ms   min=0s       med=0s       max=1.5s     p(90)=1ms      p(95)=1.17ms
     http_req_sending...............: avg=35.87µs  min=0s       med=0s       max=34.26ms  p(90)=0s       p(95)=0s
     http_req_tls_handshaking.......: avg=4.35ms   min=0s       med=0s       max=280.96ms p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=273.14ms min=238.21ms med=251.42ms max=2.42s    p(90)=260.29ms p(95)=268.94ms       
     http_reqs......................: 1399   9.918867/s
     iteration_duration.............: avg=1.29s    min=1.23s    med=1.26s    max=3.43s    p(90)=1.3s     p(95)=1.5s
     iterations.....................: 1399   9.918867/s
     vus............................: 1      min=1      max=20
     vus_max........................: 20     min=20     max=20


running (2m21.0s), 00/20 VUs, 1399 complete and 0 interrupted iterations
default ✓ [======================================] 00/20 VUs  2m20s
```

## Tổng kết

Trong bài viết này, chúng ta đã tìm hiểu cách sử dụng k6 để kiểm tra tải cho RESTful API thông qua một kịch bản test với nhiều Virtual User thông qua cờ `--vus` và `--duration` hoặc thông qua set `options` và `stages`. Hy vọng bài viết này sẽ giúp ích cho bạn trong việc tìm hiểu về k6.

Trong [bài viết tiếp theo](./part-04.md), chúng ta sẽ tìm hiểu ý nghĩa của các chỉ số trong kết quả của k6.