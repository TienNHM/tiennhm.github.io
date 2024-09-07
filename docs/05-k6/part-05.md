---
slug: load-testing-restful-apis-with-k6-part-05
title: Trực quan hóa kết quả load test với Grafana và InfluxDB
authors: [tiennhm]
tags: [load-testing, k6, restful-api, performance-testing, setup, visualization, grafana, influxdb]
enableComments: true # for Gisqus comments, set to true
draft: false # set to true to hide this post from the site
image: https://slorber-api-screenshot.netlify.app/https%3A%2F%2Fk6.io/showcase/
---

<p align="right">
    <img src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Ftiennhm.github.io%2Fblog%2Fload-testing-restful-apis-with-k6-part-05&label=⚪View&labelColor=%2337d67a&countColor=%23555555&style=flat&labelStyle=upper" loading='lazy' decoding='async'/>
</p>

Trong các bài viết trước, chúng ta đã biết cách viết kịch bản test và xem kết quả trên màn hình console khi chạy kịch bản với k6. Tuy nhiên, để có thể quan sát và phân tích kết quả một cách trực quan hơn, chúng ta có thể kết hợp k6 với Grafana và InfluxDB.

Bài viết này sẽ hướng dẫn các bạn cài đặt và sử dụng Grafana cùng InfluxDB để trực quan hóa kết quả load test từ k6.

<!--truncate-->

## Cài đặt InfluxDB và Grafana

### InfluxDB là gì?

<p align="right">
    <img src="https://www.influxdata.com/images/influxdata_full_navy-a7ca2ff4.svg" loading='lazy' decoding='async'/>
</p>

[InfluxDB](https://www.influxdata.com/) là một cơ sở dữ liệu time-series mã nguồn mở được thiết kế để lưu trữ và truy xuất dữ liệu theo thời gian một cách hiệu quả. InfluxDB có thể được sử dụng để lưu trữ các chỉ số đo lường từ các công cụ kiểm tra hiệu suất như k6, [JMeter](https://jmeter.apache.org/), [Gatling](https://gatling.io/)... và trực quan hóa kết quả từ các công cụ này.

Các đặc điểm chính của InfluxDB bao gồm:
- Lưu trữ dữ liệu theo thời gian với tốc độ cao.
- Có khả năng mở rộng tốt cho lượng dữ liệu lớn.
- Có thể truy vấn và lọc dữ liệu theo thời gian hiệu quả.

### Grafana là gì?

<p align="right">
    <img src="https://grafana.com/media/grafana/images/grafana-dashboard-english.png" loading='lazy' decoding='async'/>
</p>

[Grafana](https://grafana.com/) là một công cụ trực quan hóa và quản lý bảng điều khiển mã nguồn mở. Nó cho phép truy vấn, trực quan hóa và giám sát nhiều loại nguồn dữ liệu bao gồm [InfluxDB](https://www.influxdata.com/), [Prometheus](https://prometheus.io/), [Elasticsearch](https://www.elastic.co/) và nhiều nguồn khác.

Với Grafana, chúng ta có thể xây dựng các bảng điều khiển với nhiều loại biểu đồ khác nhau như biểu đồ đường, biểu đồ tròn, biểu đồ cột...để trực quan hóa dữ liệu từ nguồn dữ liệu lưu trữ như InfluxDB. Ngoài ra, Grafana còn hỗ trợ nhiều tính năng như [alerting](https://grafana.com/products/cloud/alerting/), [logging](https://grafana.com/products/cloud/logs/), dashboard sharing... giúp quản lý và theo dõi hiệu suất ứng dụng một cách tổng quan và trực quan hơn.

### Cài đặt InfluxDB và Grafana

Trong bài viết này, chúng ta sẽ cài đặt InfluxDB và Grafana bằng Docker Comopose. Lưu ý đảm bảo Docker và Docker Compose đã được cài đặt trên máy. Nếu chưa, bạn có thể tham khảo [cách cài đặt Docker](https://docs.docker.com/get-docker/) và [các cài đặt Docker Compose](https://docs.docker.com/compose/install/) cho máy tính của mình.

#### 1. Tạo file grafana-dashboard.yaml

Đầu tiên, chúng ta sẽ tạo file `grafana-dashboard.yaml` với nội dung sau:

```bash
apiVersion: 1
providers:
  - name: 'default'       
    org_id: 1             
    folder: ''            
    type: 'file'          
    options:
      path: /var/lib/grafana/dashboards
```

Đoạn script này đặt đường dẫn lưu trữ các bảng điều khiển trong Grafana là thư mục `/var/lib/grafana/dashboards`. Khi chúng ta import hoặc tạo mới dashboard, nó sẽ lưu trữ tại vị trí này. Điều này giúp chúng ta có thể chia sẻ và quản lý dashboard dễ dàng hơn.

Tiếp đến, hãy tạo thư mục `dashboards` trong thư mục hiện tại để lưu trữ các dashboard mà sau này chúng ta sẽ tạo và import vào Grafana.

#### 2. Tạo file grafana-datasource.yaml

Sau đó, tạo thêm file `grafana-datasource.yaml` với nội dung sau để định nghĩa nguồn dữ liệu cho Grafana:

```yaml
apiVersion: 1

datasources:
  - name: k6influxdb
    type: influxdb
    access: proxy
    database: k6
    url: http://influxdb:8086
    isDefault: true
```

Đoạn script này định nghĩa nguồn dữ liệu cho Grafana là InfluxDB với tên là `k6influxdb`. Nó sẽ kết nối tới InfluxDB chạy trên cổng 8086 và sử dụng cơ sở dữ liệu `k6` làm mặc định.

#### 3. Tạo file docker-compose.yml

Cuối cùng, hãy tạo file `docker-compose.yml` với nội dung sau:

```yaml
version: '3.4'

networks:
  k6:
  grafana:

services:
  influxdb:
    image: influxdb:1.8
  #  entrypoint: /bin/sh
  #  user: root
    networks:
      - k6
      - grafana
    ports:
      - "8086:8086"
    environment:
      - INFLUXDB_DB=k6

  grafana:
    image: grafana/grafana:8.5.21
  #  entrypoint: /bin/sh
  #  user: root
    networks:
      - grafana
    ports:
      - "3000:3000"
    environment:
      - GF_AUTH_ANONYMOUS_ORG_ROLE=Admin
      - GF_AUTH_ANONYMOUS_ENABLED=true
      - GF_AUTH_BASIC_ENABLED=false
      - GF_SERVER_SERVE_FROM_SUB_PATH=true
    volumes:
      - ./dashboards:/var/lib/grafana/dashboards
      - ./grafana-dashboard.yaml:/etc/grafana/provisioning/dashboards/dashboard.yaml
      - ./grafana-datasource.yaml:/etc/grafana/provisioning/datasources/datasource.yaml

  k6:
    image: grafana/k6:latest
#    entrypoint: /bin/sh
#    user: root
    networks:
      - k6
    ports:
      - "6565:6565"
    environment:
      - K6_OUT=influxdb=http://influxdb:8086/k6
    volumes:
      - ./scripts:/scripts
```

Chúng ta mount thư mục `scripts` trong container k6 vào thư mục `/scripts` để k6 có thể truy cập và chạy các kịch bản test được lưu trong thư mục này. Ngoài ra, cấu hình cho k6 ghi kết quả load test sang InfluxDB thông qua địa chỉ `http://influxdb:8086/k6`. Địa chỉ này bao gồm:
- `influxdb: Tên container InfluxDB được khai báo trong `docker-compose.yml`.
- `8086`: Cổng InfluxDB mặc định.
- `k6`: Tên bucket được tạo trong InfluxDB để lưu trữ dữ liệu từ k6.

Cấu trúc thư mục sẽ như sau:
```bash
├── dashboards
│   └── k6-load-testing-results.json
├── docker-compose.yml
├── grafana-dashboard.yaml
├── grafana-datasource.yaml
└── scripts
    └── script.js
```

#### 4. Tạo file k6-load-testing-results.json

Trong thư mục `dashboards`, hãy tải file [k6-load-testing-results.json](https://grafana.com/grafana/dashboards/2587) về và đổi tên thành `k6-load-testing-results.json`. Đây là file mẫu dashboard được cung cấp sẵn bởi Grafana để trực quan hóa kết quả load test từ k6.

#### 5. Khởi chạy Docker Compose

Để khởi chạy docker compose, hãy chạy lệnh sau:

```bash
docker-compose up -d influxdb grafana
```

Đây là lệnh khởi chạy Docker Compose để chạy các container InfluxDB và Grafana trong nền. Nếu khởi chạy thành công, màn hình console sẽ hiển thị tương tự như sau:

```bash
docker-compose up -d influxdb grafana
[+] Running 4/4
 ✔ Network perfomance_grafana       Created                                                0.1s 
 ✔ Network perfomance_k6            Created                                                0.1s 
 ✔ Container perfomance-influxdb-1  Started                                                2.4s 
 ✔ Container perfomance-grafana-1   Started                                                2.4s 
```

Sau khi chạy lệnh này, bạn có thể truy cập vào InfluxDB trên địa chỉ [http://localhost:8086](http://localhost:8086) và Grafana trên địa chỉ [http://localhost:3000](http://localhost:3000). Lưu ý rằng, các porrt 8086 và 3000 đã được map từ Docker container ra ngoài máy chủ để truy cập.

<p align="center">
    <img src="/img/docs/k6/grafana.webp" loading='lazy' decoding='async'/>
</p>

## Tạo kịch bản test

Ở bước này, chúng ta sẽ tạo một kịch bản test API đơn giản. Trong thư mục `scripts`, hãy tạo file `script.js` với nội dung sau:

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

Nếu để ý, bạn sẽ thấy đoạn script này chúng ta đã tìm hiểu trong [part 3](./part-03.md) của loạt bài hướng dẫn này.

## Chạy kịch bản test và trực quan hóa kết quả

### Chạy kịch bản test

Để chạy kịch bản test, hãy chạy lệnh sau:

```bash
docker-compose run k6 run /scripts/script.js
```

Trong lần chạy đầu tiên, k6 sẽ tải image `grafana/k6:latest` về máy nếu chưa có và chạy kịch bản test.

### Trực quan hóa kết quả

Để trực quan hóa kết quả, hãy truy cập vào Grafana Dashboard theo link sau: [http://localhost:3000/d/k6/k6-load-testing-results](http://localhost:3000/d/k6/k6-load-testing-results).

Kết quả sẽ hiển thị tương tự như sau:

<p align="center">
    <img src="/img/docs/k6/grafana-dashboard.webp" loading='lazy' decoding='async'/>
</p>

Như vậy, chúng ta đã có thể trực quan hóa kết quả load test từ k6 trên Grafana. Từ đây, chúng ta có thể phân tích kết quả và tối ưu hóa hiệu năng ứng dụng một cách trực quan hơn.

:::tip
Toàn bộ **source code** của bài viết này có thể tìm thấy tại [đây](https://github.com/TienNHM/k6-load-testing-results-visualization-with-grafana). Bạn có thể clone về và thực hành theo hướng dẫn trong bài viết.

Hãy gắn cho mình một ngôi sao trên Github repo nếu bạn thấy bài viết này hữu ích nhé!
:::

## Lời kết

Bài viết này đã hướng dẫn các bước cài đặt và cấu hình Grafana cùng InfluxDB để trực quan hóa kết quả load test từ k6. Việc kết hợp các công cụ này giúp người dùng có thể theo dõi và phân tích kết quả test một cách trực quan hơn, dễ dàng nhận ra các vấn đề về hiệu năng của ứng dụng khi chịu tải cao.

Trong các bài tiếp theo, tôi sẽ hướng dẫn các bạn viết các kịch bản load test phức tạp hơn và phân tích kết quả từ Grafana để tối ưu hóa hiệu năng ứng dụng.