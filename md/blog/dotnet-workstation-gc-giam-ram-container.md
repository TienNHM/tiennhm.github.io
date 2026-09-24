# Vì sao .NET ngốn 96% RAM container dù app đang rảnh? Server GC và cách giảm 65% bộ nhớ

> Nguồn: https://tiennhm.io.vn/blog/dotnet-workstation-gc-giam-ram-container
> Một container .NET 9 chiếm 987 MiB trên trần 1 GiB dù suốt 2 giờ không có request nào. Thủ phạm không phải rò rỉ bộ nhớ mà là Server GC — mặc định của ASP.NET Core. Bài viết ghi lại toàn bộ quá trình chẩn đoán bằng cgroup v2, cách phân biệt retained heap với memory leak, và kết quả đo thật sau khi chuyển sang Workstation GC: bộ nhớ anon giảm từ 822 MB xuống 280 MB.

> Một container ASP.NET Core 9 chiếm 987 MiB trên trần 1 GiB (96%) dù suốt 2 giờ không nhận request nào. Đây **không phải rò rỉ bộ nhớ**: mức RAM đứng yên tuyệt đối qua nhiều lần đo, dấu hiệu của heap bị giữ lại chứ không phải rò rỉ. Nguyên nhân là **Server GC** — mặc định của ASP.NET Core, tạo một heap cho mỗi CPU core và rất ít trả bộ nhớ về hệ điều hành. Đặt `DOTNET_gcServer=0` và `DOTNET_GCConserveMemory=5` giảm bộ nhớ anon từ **822 MB xuống 280 MB (−65%)**, đo ổn định sau 30 phút. Đánh đổi: Workstation GC cho throughput thấp hơn khi tải cao và nhiều core.

Bài này ghi lại một buổi chẩn đoán thật trên VPS 4 core / 8 GB RAM đang chạy song song 9 site WordPress và một API .NET. Mọi con số bên dưới là số đo thật, không phải ví dụ minh hoạ.

## Triệu chứng

`docker stats` cho con số đáng báo động:

```bash
$ docker stats --no-stream --format '{{.Name}} {{.MemUsage}} {{.MemPerc}}' vievent-api
vievent-api 987.6MiB / 1GiB 96.45%
```

Container đã chạy 2 tuần, `RestartCount=2`, trạng thái `healthy`. Ứng dụng là ABP 9.2 trên .NET 9.0.17, database PostgreSQL, cache Redis.

Phản xạ đầu tiên của hầu hết chúng ta: *"rò rỉ bộ nhớ rồi"*. Phản xạ đó sai, và mất khá nhiều thời gian mới nhận ra.

## Bẫy thứ nhất: `docker stats` không nói cho bạn con số quan trọng

`MemUsage` trong `docker stats` **bao gồm cả page cache** — phần bộ nhớ kernel dùng đệm file, và kernel sẵn sàng thu hồi bất cứ lúc nào khi thiếu RAM. Nó không phải áp lực bộ nhớ thật.

Con số thật nằm trong cgroup v2:

```bash
$ docker exec vievent-api sh -lc 'grep -E "^(anon|file) " /sys/fs/cgroup/memory.stat'
anon 862392320    # 822 MB — bộ nhớ thật của tiến trình, KHÔNG thu hồi được
file 169017344    # 161 MB — page cache, kernel tự nhả khi cần
```

Vậy áp lực thật là **822 MB / 1024 MB = 80%**, không phải 96%. Vẫn cao, nhưng khoảng đệm trước khi bị OOM kill rộng hơn con số ban đầu gợi ý.

Bài học đầu tiên: khi điều tra bộ nhớ container, **luôn đọc `anon` trong `memory.stat`**, đừng dừng ở `docker stats`.

## Bẫy thứ hai: RAM cao không đồng nghĩa rò rỉ

Đây mới là chỗ quyết định. Hai dữ kiện lật ngược chẩn đoán ban đầu:

**Thứ nhất — ứng dụng đang hoàn toàn rảnh.**

```bash
$ docker logs --since 2h vievent-api 2>&1 | wc -l
0
```

Không một dòng log nào trong 2 giờ. Không có request, không có background job nào ghi log.

**Thứ hai — mức RAM đứng yên tuyệt đối.**

Ba lần đo cách nhau 5 giây cho **cùng một con số đến từng chữ số thập phân**: `987.6MiB`, `987.6MiB`, `987.6MiB`.

Rò rỉ bộ nhớ thì phải *tăng*. Một ứng dụng rảnh mà giữ 822 MB bất động không phải đang rò rỉ — nó đang **giữ lại heap đã cấp phát** và không trả về hệ điều hành.

Phân biệt được hai thứ này quyết định toàn bộ hướng xử lý. Nếu đi theo hướng "rò rỉ", bạn sẽ mất hàng giờ soi memory dump, tìm sự kiện chưa hủy đăng ký, tìm `IDisposable` chưa dispose — trong khi vấn đề nằm ở một dòng cấu hình.

## Nguyên nhân: Server GC là mặc định của ASP.NET Core

Kiểm tra biến môi trường trong container:

```bash
$ docker exec vievent-api sh -lc 'env | grep -i "^DOTNET_"'
DOTNET_RUNNING_IN_CONTAINER=true
DOTNET_VERSION=9.0.17
```

Không có một dòng cấu hình GC nào. Tức là runtime đang chạy với **toàn bộ mặc định**, và mặc định của ASP.NET Core là `ServerGarbageCollection=true`.

### Server GC khác Workstation GC ở đâu

**Server GC** được thiết kế cho máy chủ nhiều core, tải cao, ưu tiên **throughput**:

- Tạo **một heap riêng cho mỗi CPU core**, kèm một luồng GC riêng
- Cho phép heap phình to hơn để **giảm số lần GC**
- **Rất ít trả bộ nhớ về hệ điều hành** — giữ lại để lần cấp phát sau không phải xin lại kernel

**Workstation GC** ưu tiên **độ trễ thấp và tiết kiệm bộ nhớ**:

- Một heap dùng chung
- GC thường xuyên hơn, mỗi lần nhẹ hơn
- Trả bộ nhớ về hệ điều hành sớm hơn nhiều

Với một API lưu lượng thấp nằm trong container 1 GiB, Server GC là lãng phí thuần: bạn trả bằng RAM cho một throughput mà bạn không hề dùng tới.

### Vì sao con số dừng lại quanh 800 MB

Khi phát hiện đang chạy trong container có giới hạn bộ nhớ, .NET tự đặt **GC heap hard limit bằng 75% giới hạn cgroup**. Với trần 1 GiB, heap được phép dùng tới khoảng **768 MB**.

Server GC thoải mái phình tới sát ngưỡng đó rồi giữ nguyên. Con số 822 MB anon — gồm GC heap cộng bộ nhớ native, stack các luồng, JIT code — khớp chính xác với hành vi này. Runtime không hề sai; nó đang làm đúng thứ nó được thiết kế để làm.

## Cách sửa

**Các bước áp dụng**

- [ ] Đọc anon trong /sys/fs/cgroup/memory.stat để có con số thật, đừng tin docker stats
- [ ] Đo nhiều lần cách quãng — đứng yên là retained heap, tăng dần mới là rò rỉ
- [ ] Kiểm tra env trong container xem đã có cấu hình GC nào chưa
- [ ] Đặt DOTNET_gcServer=0 và DOTNET_GCConserveMemory=5
- [ ] Nâng trần RAM làm đệm — bổ sung chứ không thay thế việc đổi GC
- [x] Recreate container rồi đo lại ở nhiều mốc thời gian, không kết luận ngay lúc vừa khởi động

Trong `docker-compose.yml`:

```yaml
services:
  api:
    environment:
      - ASPNETCORE_URLS=http://+:80
      # Chuyển từ Server GC sang Workstation GC
      - DOTNET_gcServer=0
      # Thang 0-9, càng cao GC càng tích cực nén và nhả bộ nhớ
      - DOTNET_GCConserveMemory=5
    deploy:
      resources:
        limits:
          memory: 1.5G
```

Hoặc khai trong `.csproj` nếu muốn gắn vào chính ứng dụng:

```xml
<PropertyGroup>
  <ServerGarbageCollection>false</ServerGarbageCollection>
  <ConcurrentGarbageCollection>true</ConcurrentGarbageCollection>
</PropertyGroup>
```

Biến môi trường có lợi thế là đổi được mà **không cần build lại image** — hợp với việc dò tìm cấu hình tối ưu trên môi trường thật.

## Kết quả đo được

Recreate container rồi đo ở nhiều mốc, vì con số ngay sau khởi động luôn đẹp một cách vô nghĩa:

| Thời điểm | docker stats | anon (thật) | Ghi chú |
|---|---|---|---|
| **Trước khi sửa** | 987.6 MiB / 1 GiB — **96%** | **822 MB** | app rảnh, đứng yên |
| Vừa khởi động | 414.2 MiB / 1.5 GiB — 27% | — | chưa kết luận được |
| Sau 10 phút | 458.2 MiB — 30% | 285 MB | |
| Sau 20 phút | 452.2 MiB — 29% | 274 MB | |
| Sau 30 phút | 469.5 MiB — 31% | **288 MB** | ổn định |

**Bộ nhớ anon giảm từ 822 MB xuống khoảng 280 MB — giảm 65%.**

Quan trọng không kém con số: dãy `285 → 274 → 288 MB` là **dao động quanh một mức ổn định**, không phải đường đi lên. Điều đó xác nhận chẩn đoán ban đầu — không có rò rỉ nào cả.

Container giữ `healthy` suốt cả ba mốc đo. Khoảng đệm cho lúc có tải thật tăng từ 36 MiB lên hơn 1 GiB.

## Khi nào KHÔNG nên dùng Workstation GC

Phần này quan trọng hơn phần khoe kết quả, và hay bị bỏ qua trong các bài "mẹo tối ưu".

Server GC tồn tại vì nó **thật sự tốt hơn** trong đúng hoàn cảnh của nó. Đừng áp dụng bừa:

- **Dịch vụ throughput cao, nhiều core, tải liên tục** — Server GC giảm đáng kể thời gian tạm dừng tổng thể. Đổi sang Workstation ở đây là tự bắn vào chân.
- **Container được cấp nhiều RAM và nhiều core** — nếu đã cho 8 GB và 8 core thì Server GC đang dùng đúng thứ bạn trả tiền.
- **Workload nặng cấp phát** — API xử lý payload lớn, xử lý ảnh, batch job. Số lần GC tăng lên sẽ thấy rõ trong latency.

Workstation GC phù hợp khi: **container nhỏ (1-2 GB), ít core, lưu lượng thấp đến trung bình, và RAM là tài nguyên khan hiếm hơn CPU** — đúng mô tả của phần lớn API nội bộ, admin panel, side project, và mọi thứ chạy trên VPS giá rẻ.

Nguyên tắc chung: **đo trước khi đổi, đo lại sau khi đổi, và đo ở nhiều mốc thời gian.** Một con số duy nhất lấy ngay sau khởi động không chứng minh được gì.

## Các lệnh chẩn đoán nên thuộc

```bash
# Con số thật: anon = không thu hồi được, file = page cache
docker exec <container> sh -lc 'grep -E "^(anon|file) " /sys/fs/cgroup/memory.stat'

# Trần bộ nhớ và mức đang dùng theo cgroup v2
docker exec <container> sh -lc 'cat /sys/fs/cgroup/memory.max /sys/fs/cgroup/memory.current'

# Đã từng bị kernel giết vì hết RAM chưa
docker inspect <container> --format 'OOMKilled={{.State.OOMKilled}} Restarts={{.RestartCount}}'

# Runtime đang chạy với cấu hình GC nào
docker exec <container> sh -lc 'env | grep -i "^DOTNET_"'

# App có thật sự đang rảnh không
docker logs --since 2h <container> 2>&1 | wc -l
```

## Câu hỏi thường gặp

### DOTNET_gcServer=0 có làm chậm ứng dụng không?

Có thể, nhưng tuỳ tải. Workstation GC chạy GC thường xuyên hơn với mỗi lần nhẹ hơn, nên độ trễ từng request thường ổn định hơn, còn throughput tổng thể khi tải cao và nhiều core thì thấp hơn Server GC. Với API lưu lượng thấp trong container nhỏ, khác biệt gần như không đo được, trong khi RAM tiết kiệm là thấy ngay. Với dịch vụ tải cao, phải benchmark trước khi đổi.

### Làm sao phân biệt rò rỉ bộ nhớ với heap bị giữ lại?

Đo nhiều lần cách quãng và xem xu hướng. Rò rỉ thì bộ nhớ TĂNG DẦN theo thời gian và không giảm kể cả khi ứng dụng rảnh. Heap bị giữ lại thì ĐỨNG YÊN ở một mức. Trong ca này, ba lần đo cách nhau 5 giây cho cùng con số 987.6 MiB, và app không nhận request nào suốt 2 giờ — đó là heap bị giữ, không phải rò rỉ. Nếu nghi rò rỉ thật thì mới cần tới dotnet-counters, dotnet-dump và phân tích heap.

### GCConserveMemory=5 nghĩa là gì, đặt bao nhiêu là đúng?

Đây là thang từ 0 đến 9 điều chỉnh mức độ tích cực của GC trong việc nén heap và trả bộ nhớ về hệ điều hành. 0 là mặc định, 9 là tiết kiệm bộ nhớ tối đa nhưng tốn CPU nhất. Giá trị 5 là điểm cân bằng hợp lý để bắt đầu. Nên tăng dần và đo, đừng nhảy thẳng lên 9.

### Vì sao docker stats báo 96% mà anon chỉ 80%?

Vì MemUsage trong docker stats bao gồm cả page cache — bộ nhớ kernel dùng đệm file. Phần đó kernel thu hồi được bất cứ lúc nào khi thiếu RAM, nên nó không tạo áp lực thật và không gây OOM kill. Con số quyết định là anon trong /sys/fs/cgroup/memory.stat, phần bộ nhớ thật của tiến trình mà kernel không thu hồi được.

### Vì sao .NET dừng quanh 768 MB trong container 1 GiB?

Khi phát hiện đang chạy trong container có giới hạn bộ nhớ, .NET tự đặt GC heap hard limit bằng 75% giới hạn cgroup. Với trần 1 GiB thì heap được phép dùng tới khoảng 768 MB. Cộng thêm bộ nhớ native, stack các luồng và JIT code sẽ ra con số anon khoảng 820 MB quan sát được. Muốn đổi tỷ lệ này thì dùng DOTNET_GCHeapHardLimitPercent.

### Nâng trần RAM lên có phải là cách sửa không?

Không, đó chỉ là đệm. Nâng trần mà giữ Server GC thì GC heap hard limit cũng tăng theo 75%, và ứng dụng sẽ phình lên lấp đầy chỗ mới. Trong ca này trần được nâng từ 1G lên 1.5G nhưng đó là biện pháp bổ sung, thứ thật sự tạo ra mức giảm 65% là việc đổi sang Workstation GC.

## Kết luận

Ba điều rút ra từ ca này:

1. **`docker stats` không đủ.** `MemUsage` gồm page cache. Con số cần nhìn là `anon` trong `/sys/fs/cgroup/memory.stat`.
2. **RAM cao mà đứng yên không phải rò rỉ.** Đo nhiều lần cách quãng trước khi mở memory dump. Xu hướng quan trọng hơn giá trị tuyệt đối.
3. **Mặc định của framework được chọn cho hoàn cảnh khác hoàn cảnh của bạn.** ASP.NET Core mặc định Server GC vì nó nhắm tới máy chủ nhiều core tải cao. Trong container 1 GiB trên VPS giá rẻ, mặc định đó là lãng phí — và sửa chỉ tốn hai dòng biến môi trường.

Trường hợp cụ thể ở đây: **822 MB xuống 280 MB, giảm 65%, không đổi một dòng code nào.**

---

**Cập nhật lần cuối**: Tháng 9, 2026

## Bài liên quan

- [Module 19 — Performance Engineering](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-05-senior-engineering/module-19-performance-engineering) — Performance engineering: profiling, allocation, GC, benchmarking — định lượng cải tiến cho hot path CRM.
- [Module 2 — Computer Science Basics](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-01-foundation/module-02-computer-science-basics) — CS foundation cho backend: mô hình bộ nhớ, HTTP/TCP khái quát, JSON, REST semantics, phân tích độ phức tạp — liên hệ pipeline request trong ASP.NET…
- [2.10 — 8. .NET Runtime và Ecosystem](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-01-foundation/module-02-computer-science-basics/2.9-dotnet-runtime-and-ecosystem) — Từ mã C# tới mã máy: IL, JIT, AOT.
