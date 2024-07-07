---
slug: load-testing-restful-apis-with-k6-part-02
title: Load testing API đơn giản
authors: [tiennhm]
tags: [load-testing, k6, restful-api, performance-testing, setup]
enableComments: true # for Gisqus comments, set to true
draft: false # set to true to hide this post from the site
image: https://v1.screenshot.11ty.dev/https%3A%2F%2Fk6.io/opengraph/
---

<p align="right">
    <img src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Ftiennhm.github.io%2Fblog%2Fload-testing-restful-apis-with-k6-part-02&label=⚪View&labelColor=%2337d67a&countColor=%23555555&style=flat&labelStyle=upper" loading='lazy' decoding='async'/>
</p>

[RESTful API](https://aws.amazon.com/what-is/restful-api/) là một trong những kiểu API phổ biến nhất hiện nay. Vì vậy, việc kiểm tra tải (load testing) là một phần quan trọng của việc kiểm tra hiệu suất. Trong bài viết này, chúng ta sẽ tìm hiểu cách **sử dụng** [k6](https://k6.io) để kiểm tra tải cho RESTful API.

<!--truncate-->

## Mục tiêu

Trong bài viết này, chúng ta sẽ tìm hiểu cách sử dụng k6 để kiểm tra tải cho RESTful API. Cụ thể, chúng ta sẽ tìm hiểu cách:

- Viết một kịch bản test đơn giản
- Chạy kịch bản test
- Xem kết quả

## Viết một kịch bản test đơn giản

Để viết một kịch bản test đơn giản, chúng ta sẽ sử dụng một mockup RESTful API. API này có thể được tìm thấy tại [https://reqres.in/](https://reqres.in/), cung cấp một số endpoints để tạo, đọc, cập nhật và xóa người dùng.

Trong trường hợp bạn muốn chạy load test cho các API của riêng bạn, hãy tạo một function tương tự như các ví dụ dưới đây.

### Tạo một kịch bản test

Đầu tiên, chúng ta sẽ tạo một thư mục mới để chứa kịch bản test. Trong thư mục này, chúng ta sẽ tạo một file có tên là `script.js`, chứa các hàm cần thiết phục vụ cho việc chạy load test.

### Viết kịch bản test

Đầu tiên, chúng ta sẽ import một số thư viện cần thiết:

```js
import http from 'k6/http';
import { sleep } from 'k6';
```

Trong đó:
- `http` là một thư viện chứa các hàm để gửi request đến API.
- `sleep` là một thư viện chứa các hàm để sleep một khoảng thời gian nhất định. Chúng ta sẽ sử dụng hàm này để đảm bảo rằng mỗi request được gửi cách nhau 1 giây.

Tiếp theo, chúng ta sẽ viết một hàm để tạo một người dùng mới:

```js
function createUser() {
  const url = 'https://reqres.in/api/users';
  const payload = JSON.stringify({
    name: 'morpheus',
    job: 'leader',
  });
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return http.post(url, payload, params);
}
```

Hàm này sẽ gửi một request POST đến endpoint `/api/users` với một payload là một đối tượng JSON chứa thông tin của người dùng mới cần tạo, như `name` và `job`.

Tiếp theo, chúng ta sẽ viết một hàm để đọc thông tin của một người dùng. Hàm này sẽ gửi một request GET đến endpoint `/api/users/{id}` với `id` là tham số truyền vào.

```js
function getUser(id) {
  const url = `https://reqres.in/api/users/${id}`;
  return http.get(url);
}
```

Chúng ta sẽ viết một hàm để cập nhật thông tin của một người dùng như sau:

```js
function updateUser(id) {
  const url = `https://reqres.in/api/users/${id}`;
  const payload = JSON.stringify({
    name: 'morpheus',
    job: 'zion resident',
  });
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return http.put(url, payload, params);
}
```

Hàm này sẽ gửi một request PUT đến endpoint `/api/users/{id}` với `id` là tham số truyền vào và payload là một đối tượng JSON chứa thông tin của người dùng cần cập nhật.

Và để xóa một người dùng, chúng ta sẽ viết một hàm như sau:

```js
function deleteUser(id) {
  const url = `https://reqres.in/api/users/${id}`;
  return http.del(url);
}
```

Hàm này sẽ gửi một request DELETE đến endpoint `/api/users/{id}` với `id` là tham số truyền vào.

Cuối cùng, chúng ta sẽ viết một hàm để thực hiện một kịch bản test:

```js
export default function () {
  const user = createUser();
  const id = user.json('id');
  sleep(1);
  getUser(id);
  sleep(1);
  updateUser(id);
  sleep(1);
  deleteUser(id);
  sleep(1);
}
```

Hàm này sẽ gọi lần lượt các hàm đã viết ở trên để tạo, đọc, cập nhật và xóa một người dùng. Để đảm bảo rằng mỗi request được gửi cách nhau 1 giây, chúng ta sẽ sử dụng hàm `sleep` để dừng chương trình trong 1 giây.

### Kịch bản test hoàn chỉnh

Sau khi viết xong kịch bản test, chúng ta sẽ có một file `script.js` như sau:

```js
import http from 'k6/http';
import { sleep } from 'k6';

function createUser() {
  const url = 'https://reqres.in/api/users';
  const payload = JSON.stringify({
    name: 'morpheus',
    job: 'leader',
  });
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return http.post(url, payload, params);
}

function getUser(id) {
  const url = `https://reqres.in/api/users/${id}`;
  return http.get(url);
}

function updateUser(id) {
  const url = `https://reqres.in/api/users/${id}`;
  const payload = JSON.stringify({
    name: 'morpheus',
    job: 'zion resident',
  });
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return http.put(url, payload, params);
}

function deleteUser(id) {
  const url = `https://reqres.in/api/users/${id}`;
  return http.del(url);
}

export default function () {
  const user = createUser();
  const id = user.json('id');
  sleep(1);
  getUser(id);
  sleep(1);
  updateUser(id);
  sleep(1);
  deleteUser(id);
  sleep(1);
}
```

## Chạy kịch bản test

Để chạy kịch bản test, chúng ta sẽ mở Command Prompt / Terminal và chạy lệnh sau:

```bash
k6 run script.js
```

## Xem kết quả

Nếu kịch bản test được chạy thành công, bạn sẽ nhận được kết quả như sau:

```bash
data_received..............: 1.1 kB  1.1 kB/s
data_sent..................: 1.1 kB  1.1 kB/s
http_req_blocked...........: avg=1.01ms   min=1.01ms   med=1.01ms   max=1.01ms   p(90)=1.01ms   p(95)=1.01ms
http_req_connecting........: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s
http_req_duration..........: avg=1.01ms   min=1.01ms   med=1.01ms   max=1.01ms   p(90)=1.01ms   p(95)=1.01ms
http_req_receiving.........: avg=1.1ms    min=1.1ms    med=1.1ms    max=1.1ms    p(90)=1.1ms    p(95)=1.1ms
http_req_sending...........: avg=1.01ms   min=1.01ms   med=1.01ms   max=1.01ms   p(90)=1.01ms   p(95)=1.01ms
http_req_tls_handshaking...: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s
http_req_waiting...........: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s
http_reqs..................: 4      4.0/s
iteration_duration.........: avg=4.04ms   min=4.04ms   med=4.04ms   max=4.04ms   p(90)=4.04ms   p(95)=4.04ms
iterations.................: 4      4.0/s
vus........................: 1      min=1 max=1
vus_max....................: 1      min=1 max=1
```

Như bạn có thể thấy, kết quả trả về có nhiều thông tin. Để hiểu rõ hơn về từng giá trị trong đó, bạn có thể xem thêm tại [phần 4](./part-04.md) trong loạt bài viết này.

## Tổng kết

Trong bài viết này, chúng ta đã tìm hiểu cách sử dụng k6 để kiểm tra tải cho RESTful API. Hy vọng bài viết này sẽ giúp ích cho bạn trong việc tìm hiểu về k6.

Trong [bài viết tiếp theo](./part-03.md), chúng ta sẽ tìm hiểu cách viết một kịch bản kiểm tra tải với Virtual Users.