---
title: "ONNX Runtime chết trên Alpine: lỗi ld-linux-x86-64.so.2 và vì sao libc6-compat không cứu được"
slug: onnx-runtime-alpine-ld-linux-x86-64-so-2
description: "Container Node.js build xong, chạy lên, rồi chết ngay khi nạp model: Error loading shared library ld-linux-x86-64.so.2. Bài viết mổ nguyên nhân bằng readelf trên chính binary của onnxruntime-node, chứng minh vì sao libc6-compat và gcompat chỉ đẩy lỗi sang chỗ khác, và so sánh bốn hướng xử lý kèm cái giá thật của mỗi hướng."
keywords: [ld-linux-x86-64.so.2, onnxruntime alpine, onnxruntime-node alpine, error loading shared library, musl vs glibc, alpine musl libc, libc6-compat, gcompat alpine, __vsnprintf_chk symbol not found, error relocating, native module alpine, docker node alpine, node bookworm-slim, transformers.js docker, huggingface transformers node, dt_needed readelf, prebuilt binary glibc, docker image size tradeoff, alpine linux docker, onnx runtime docker, error relocating symbol not found, node native addon musl, lỗi docker alpine, chọn base image node]
tags: [docker, ai, javascript, devops, troubleshooting]
authors: [tiennhm]
date: 2026-09-22
---

import { SummaryBox, FAQSection, Checklist } from '@site/src/components/SEO';

# ONNX Runtime chết trên Alpine: lỗi `ld-linux-x86-64.so.2`

<SummaryBox>
`onnxruntime-node` phát hành binary dựng sẵn cho glibc, và `libonnxruntime.so.1` khai báo `DT_NEEDED` trỏ thẳng vào `ld-linux-x86-64.so.2` — chính là bộ nạp động của glibc. Alpine dùng musl, nơi file đó không tồn tại, nên `dlopen` hỏng ngay ở bước nạp thư viện. Cài `libc6-compat` hay `gcompat` **không sửa được**: chúng cấp file loader nên qua được lỗi thứ nhất, rồi chết ở lỗi thứ hai là `__vsnprintf_chk: symbol not found`. Cách xử lý thực tế là đổi base image sang `node:22-bookworm-slim`, trả thêm khoảng 89 MB image để đổi lấy một thứ chạy được.
</SummaryBox>

21 giờ 30, tôi thêm `Dockerfile` cho ClubDay — một web app sự kiện có trò vẽ hình được chấm điểm bằng model ONNX chạy ngay trên máy chủ. Base image chọn theo phản xạ: `node:22-alpine`, vì nhẹ.

Chọn base image là bước đầu tiên của [Docker và deployment](/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-15-docker-deployment), và cũng là bước dễ chọn sai nhất — như bên dưới.

Image build sạch. Container lên. `docker ps` xanh. Rồi đến lúc server nạp model thì mọi thứ đổ, với một dòng lỗi không nhắc gì tới ONNX:

```
Error loading shared library ld-linux-x86-64.so.2: No such file or directory
(needed by /app/node_modules/onnxruntime-node/bin/napi-v6/linux/x64/libonnxruntime.so.1)
```

21 giờ 44 tôi đổi một dòng trong `Dockerfile` và mọi thứ chạy. Nhưng mười bốn phút ở giữa đáng được viết ra, vì dòng lỗi đó nói về một file mà bạn chưa bao giờ cài, chưa bao giờ khai trong `package.json`, và trên máy dev thì nó vẫn luôn ở đó.

<!-- truncate -->

## Tóm tắt nhanh (TL;DR) {#tldr}

- **Triệu chứng**: build thành công, container chạy, chết lúc nạp native module.
- **Nguyên nhân**: `libonnxruntime.so.1` có `DT_NEEDED: ld-linux-x86-64.so.2` — loader của glibc. Alpine dùng musl (`ld-musl-x86_64.so.1`), không có file đó.
- **`libc6-compat` / `gcompat` không sửa được**: qua lỗi nạp, chết ở `Error relocating ...: __vsnprintf_chk: symbol not found`.
- **Cách sửa**: đổi `node:22-alpine` → `node:22-bookworm-slim`. Đúng một dòng.
- **Giá phải trả**: image 238 MB → 327 MB, tăng khoảng 89 MB.
- **Kiểm tra trước khi chọn base image**: `readelf -d <file>.so | grep NEEDED`.

---

## Lỗi thật trông như thế nào {#loi-that}

Bạn không cần dựng lại cả dự án để thấy nó. Chỉ cần mount thư mục `onnxruntime-node` có sẵn vào một container Alpine rồi `dlopen` thẳng file binding:

```bash
docker run --rm -v "$PWD/node_modules/onnxruntime-node:/ort:ro" node:22-alpine \
  node -e "process.dlopen({exports:{}}, '/ort/bin/napi-v6/linux/x64/onnxruntime_binding.node')"
```

Kết quả, chạy trên `onnxruntime-node` 1.24.3:

```
Error loading shared library ld-linux-x86-64.so.2: No such file or directory
(needed by /ort/bin/napi-v6/linux/x64/libonnxruntime.so.1)
```

Hai chi tiết trong dòng lỗi này đáng để ý.

Thứ nhất, **thứ bị thiếu không phải một thư viện bình thường mà là bộ nạp động**. `ld-linux-x86-64.so.2` là chương trình mà kernel gọi để nạp mọi thư viện khác của một binary glibc. Thiếu nó thì không có gì nạp được cả.

Thứ hai, **thủ phạm không phải file bạn gọi**. Bạn nạp `onnxruntime_binding.node` (376 KB), nhưng file hỏng là `libonnxruntime.so.1` (34 MB) — thứ mà binding kéo theo. Đây là lý do tìm theo tên package thường không ra gì: lỗi nằm ở một phụ thuộc bắc cầu, cách `package.json` của bạn hai lớp.

Trong ClubDay thì chuỗi đó là: `@huggingface/transformers` → `onnxruntime-node` → `libonnxruntime.so.1` → glibc. Không có dòng nào trong `package.json` nhắc tới ONNX, và cũng chẳng có dòng nào nhắc tới glibc.

---

## Vì sao Alpine không chạy được binary glibc {#musl-vs-glibc}

Alpine không dùng glibc mà dùng **musl** — một bản hiện thực libc khác, gọn hơn nhiều. Đây không phải chuyện phiên bản cũ mới, mà là hai thứ khác nhau, tên file cũng khác nhau:

| | glibc (Debian, Ubuntu, RHEL) | musl (Alpine) |
|---|---|---|
| Bộ nạp động | `/lib64/ld-linux-x86-64.so.2` | `/lib/ld-musl-x86_64.so.1` |
| Thư viện C | `libc.so.6` | `libc.musl-x86_64.so.1` |
| Binary glibc dựng sẵn chạy được? | Có | **Không** |

Kiểm chứng trong chính image `node:22-alpine`:

```
/lib/libc.musl-x86_64.so.1
/lib/ld-musl-x86_64.so.1
(không có ld-linux-x86-64.so.2)
```

Giờ nhìn sang phía binary. `readelf` cho thấy `libonnxruntime.so.1` cần những gì:

```bash
readelf -d node_modules/onnxruntime-node/bin/napi-v6/linux/x64/libonnxruntime.so.1 | grep NEEDED
```

```
(NEEDED) Shared library: [libdl.so.2]
(NEEDED) Shared library: [librt.so.1]
(NEEDED) Shared library: [libpthread.so.0]
(NEEDED) Shared library: [libstdc++.so.6]
(NEEDED) Shared library: [libm.so.6]
(NEEDED) Shared library: [libgcc_s.so.1]
(NEEDED) Shared library: [libc.so.6]
(NEEDED) Shared library: [ld-linux-x86-64.so.2]      ← đây
```

Dòng cuối là mấu chốt, và nó cũng giải thích tại sao thông báo lỗi lại nêu đúng tên file đó. `DT_NEEDED` là danh sách thư viện mà loader phải nạp. Ở đây bản thân loader của glibc bị liệt kê như một thư viện thông thường — nên khi musl đọc danh sách này, nó cố đi tìm một file tên `ld-linux-x86-64.so.2`, không thấy, và dừng.

Chưa hết. Binary còn đòi các symbol có version của glibc:

```bash
readelf -V libonnxruntime.so.1 | grep -o "GLIBC_[0-9.]*" | sort -uV | tail -3
```

```
GLIBC_2.17
GLIBC_2.27
```

Nghĩa là kể cả khi có loader, nó vẫn cần một libc cung cấp đúng những symbol đã được gắn version như vậy. musl không làm thế, vì musl không dùng cơ chế symbol versioning của glibc.

---

## Vì sao `libc6-compat` và `gcompat` không cứu được {#libc6-compat-khong-cuu-duoc}

Câu trả lời bạn gặp nhiều nhất khi tìm lỗi này là "cài `libc6-compat` là xong". Tôi đã thử, và đây là kết quả thật.

**Sau khi `apk add libc6-compat`**, file loader xuất hiện:

```
-rwxr-xr-x 1 root root 22728 /lib/ld-linux-x86-64.so.2
```

Lỗi cũ biến mất thật. Nhưng nó được thay bằng lỗi mới:

```
Error relocating /ort/bin/napi-v6/linux/x64/libonnxruntime.so.1:
__vsnprintf_chk: symbol not found
```

**Thử tiếp với `gcompat`**, shim đầy đủ hơn và thường được khuyên dùng thay `libc6-compat`, kết quả **giống hệt**: vẫn `__vsnprintf_chk: symbol not found`.

Sự khác nhau giữa hai thông báo lỗi nói lên toàn bộ vấn đề:

| Giai đoạn | Thông báo | Ý nghĩa |
|---|---|---|
| Nạp thư viện | `Error loading shared library` | Không tìm thấy file |
| Phân giải symbol | `Error relocating` | Tìm thấy file, nhưng thiếu symbol bên trong |

Chuyển từ lỗi thứ nhất sang lỗi thứ hai **là tiến triển, không phải khắc phục**. Shim cấp được cái vỏ — một file đúng tên — nhưng không cấp được toàn bộ bề mặt API của glibc.

`__vsnprintf_chk` cũng không phải một symbol tuỳ tiện. Nó thuộc nhóm hàm `_chk` mà GCC sinh ra khi biên dịch với `_FORTIFY_SOURCE`, một cơ chế chống tràn bộ đệm của glibc. musl không có `_FORTIFY_SOURCE` theo kiểu đó nên không có họ symbol này, và gcompat cũng không giả lập chúng.

Điểm quan trọng: **`__vsnprintf_chk` chỉ là symbol đầu tiên bị thiếu**. Giả sử bạn vá được nó, lỗi kế tiếp sẽ xuất hiện ở symbol kế tiếp. Đây là trò đập chuột, và cái bàn thì rất rộng — `libonnxruntime.so.1` nặng 34 MB.

---

## Bốn hướng xử lý và cái giá thật {#cac-huong-xu-ly}

| Hướng | Có chạy không | Giá phải trả |
|---|---|---|
| **Đổi base image sang glibc** | Có | Image to hơn ~89 MB |
| Cài `libc6-compat` / `gcompat` | **Không** | Mất thời gian, lỗi chỉ đổi chỗ |
| Tự build ONNX Runtime trên musl | Có, trên lý thuyết | Toolchain C++, hàng chục phút build, tự bảo trì mãi về sau |
| Đổi sang `onnxruntime-web` (WASM) | Có | Chậm hơn native, đổi cả code nạp model |

Với ClubDay thì lựa chọn không khó. Đây là app cho một sự kiện diễn ra trong một ngày, chạy trên đúng một máy, cần chấm điểm ảnh vẽ theo thời gian thực. Bỏ vài tiếng dựng toolchain build ONNX Runtime cho musl để tiết kiệm 89 MB image là một đánh đổi sai về mọi mặt.

### Bản sửa

**Trước:**

```dockerfile
FROM node:22-alpine
```

**Sau:**

```dockerfile
FROM node:22-bookworm-slim
```

`node:22-bookworm-slim` đi kèm glibc 2.36, thoải mái so với mức `GLIBC_2.27` mà binary đòi. Chạy lại đúng phép thử ban đầu:

```bash
docker run --rm -v "$PWD/node_modules/onnxruntime-node:/ort:ro" node:22-bookworm-slim \
  node -e "process.dlopen({exports:{}}, '/ort/bin/napi-v6/linux/x64/onnxruntime_binding.node')"
```

Không lỗi. Không cần cài thêm gói nào.

Về dung lượng, con số thật:

| Image | Kích thước |
|---|---|
| `node:22-alpine` | 238 MB |
| `node:22-bookworm-slim` | 327 MB |

Chênh 89 MB. Đáng lưu ý là khoảng cách này nhỏ hơn nhiều so với hình dung thường thấy về "Alpine nhẹ hơn hẳn", bởi phần lớn dung lượng nằm ở chính Node.js chứ không ở distro. Và trong dự án này thì riêng `node_modules` đã khoảng 350 MB, trong đó `onnxruntime-node` chiếm phần lớn — nên 89 MB kia không phải thứ quyết định gì.

---

## Cách tự kiểm tra trước khi chọn base image {#cach-tu-kiem-tra}

<Checklist
  title="Quy trình kiểm tra native module"
  items={[
    { text: "Tìm file nhị phân: find node_modules -name '*.node' -o -name '*.so*'" },
    { text: "Xem thư viện nó cần: readelf -d duong-dan-file.so | grep NEEDED" },
    { text: "Thấy ld-linux-x86-64.so.2 hoặc libc.so.6 nghĩa là binary glibc, Alpine sẽ không chạy" },
    { text: "Xem package có phát hành bản musl không: kiểm tra optionalDependencies" },
    { text: "Thử dlopen trong container trước khi viết cả Dockerfile", checked: true }
  ]}
/>

Bước cuối là bước tiết kiệm nhiều thời gian nhất. Mount thư mục package có sẵn vào container rồi `dlopen` mất vài giây, trong khi build cả image rồi mới phát hiện hỏng thì mất vài phút cho mỗi vòng thử.

Về bước kiểm tra bản musl, có một so sánh rất rõ ngay trong cùng một `package-lock.json` của dự án này:

```
node_modules/@img/sharp-libvips-linuxmusl-x64      ← sharp CÓ bản musl
node_modules/@img/sharp-linuxmusl-x64
```

`sharp` phát hành binary riêng cho musl nên nó chạy tốt trên Alpine. `onnxruntime-node` thì `optionalDependencies` rỗng và trong `bin/napi-v6/linux/` chỉ có `x64` với `arm64`, không có biến thể musl nào. **"Native module" không phải một nhóm đồng nhất** — cùng một image, package này chạy còn package kia thì không, và cách duy nhất để biết là đi kiểm tra từng cái.

---

## Vì sao lỗi này khó đoán {#vi-sao-kho-doan}

Ba đặc điểm khiến nó tốn thời gian hơn mức đáng ra phải tốn.

**Build vẫn thành công.** `npm ci` cài `onnxruntime-node` bình thường vì các file `.so` được tải về nguyên vẹn — chúng chỉ không chạy được. Không có bước nào trong quá trình build kiểm tra binary có nạp nổi trên libc hiện tại hay không.

**Container vẫn lên.** Lỗi chỉ nổ khi code chạm tới phần nạp model. Nếu việc đó xảy ra lười biếng, lúc request đầu tiên tới, thì `docker ps` cứ xanh trong khi tính năng đã chết. Đây cùng một họ với chuyện tôi viết trong [bài về Server GC ngốn RAM container](/blog/dotnet-workstation-gc-giam-ram-container): mặc định nào cũng có một hoàn cảnh mà nó đúng, và container hiếm khi là hoàn cảnh đó.

**Thông báo lỗi trỏ sai chỗ.** Nó nêu tên một file hệ thống, không nêu tên package, cũng không nêu tên dòng lệnh trong `Dockerfile` đã gây ra. Người đọc lần đầu rất dễ đi tìm cách cài `ld-linux-x86-64.so.2` — mà đó đúng là ngõ cụt dẫn thẳng tới `libc6-compat`.

---

<FAQSection
  title="Câu hỏi thường gặp"
  items={[
    {
      question: "Lỗi Error loading shared library ld-linux-x86-64.so.2 nghĩa là gì?",
      answer: "Nghĩa là một thư viện được biên dịch cho glibc đang chạy trên hệ thống dùng musl, thường là Alpine Linux. File ld-linux-x86-64.so.2 là bộ nạp động của glibc; musl dùng ld-musl-x86_64.so.1 nên file kia không tồn tại. Với onnxruntime-node, file khai báo phụ thuộc đó là libonnxruntime.so.1, kiểm chứng được bằng lệnh readelf -d libonnxruntime.so.1 | grep NEEDED."
    },
    {
      question: "Cài libc6-compat trên Alpine có sửa được lỗi ONNX Runtime không?",
      answer: "Không. Tôi đã thử cả libc6-compat lẫn gcompat trên onnxruntime-node 1.24.3 và cả hai đều thất bại theo cùng một cách. Chúng tạo ra file /lib/ld-linux-x86-64.so.2 nên lỗi nạp thư viện biến mất, nhưng ngay sau đó xuất hiện lỗi mới: Error relocating libonnxruntime.so.1: __vsnprintf_chk: symbol not found. Symbol này thuộc nhóm hàm _chk của _FORTIFY_SOURCE trong glibc mà musl không có, và nó chỉ là symbol thiếu đầu tiên trong một file 34 MB."
    },
    {
      question: "Nên dùng base image nào cho Node.js app có onnxruntime-node?",
      answer: "Dùng một image nền glibc, ví dụ node:22-bookworm-slim với glibc 2.36, thoải mái so với mức GLIBC_2.27 mà binary đòi hỏi. Không cần cài thêm gói nào. Khác biệt dung lượng so với node:22-alpine là khoảng 89 MB, 327 MB so với 238 MB, và con số này thường nhỏ hơn nhiều so với chính node_modules của một dự án dùng ONNX."
    },
    {
      question: "Vì sao sharp chạy được trên Alpine mà onnxruntime-node thì không?",
      answer: "Vì sharp phát hành binary riêng cho musl, thấy rõ qua các package @img/sharp-linuxmusl-x64 và @img/sharp-libvips-linuxmusl-x64 trong package-lock.json. onnxruntime-node không phát hành biến thể musl nào: optionalDependencies rỗng và thư mục bin/napi-v6/linux/ chỉ có x64 với arm64 dựng cho glibc. Nói cách khác, native module chạy được trên Alpine hay không phụ thuộc vào việc người phát hành có build cho musl hay không, chứ không phải một tính chất chung."
    },
    {
      question: "Làm sao kiểm tra một native module có chạy được trên Alpine trước khi build image?",
      answer: "Chạy readelf -d trên file .so hoặc .node rồi lọc dòng NEEDED. Nếu thấy ld-linux-x86-64.so.2 hoặc libc.so.6 thì đó là binary glibc và Alpine sẽ không chạy được. Cách thử nhanh hơn nữa là mount thư mục package đã cài vào một container Alpine rồi gọi process.dlopen thẳng vào file .node — mất vài giây, trong khi build cả image rồi mới phát hiện hỏng thì mất vài phút mỗi vòng."
    },
    {
      question: "Có cách nào chạy ONNX Runtime trên Alpine thật sự không?",
      answer: "Có hai đường, cả hai đều đắt hơn việc đổi base image. Một là tự build ONNX Runtime từ mã nguồn với toolchain musl, đổi lại bạn phải dựng môi trường build C++ và tự bảo trì bản build đó qua từng lần nâng phiên bản. Hai là chuyển sang onnxruntime-web chạy bằng WASM, vốn không phụ thuộc libc của hệ thống, đổi lại hiệu năng thấp hơn native và phải sửa phần code nạp model. Nếu lý do chọn Alpine chỉ là dung lượng image thì cả hai đều không đáng."
    }
  ]}
/>

## Kết luận {#ket-luan}

Alpine nhẹ vì nó thay glibc bằng musl, và đó là một đánh đổi thật chứ không phải quà tặng. Với code thuần JavaScript thì bạn không bao giờ nhìn thấy cái giá đó. Với một package kéo theo 34 MB binary C++ dựng sẵn cho glibc thì bạn trả nó ngay lập tức.

Ba điều tôi rút ra:

1. **Đọc `DT_NEEDED` trước khi chọn base image.** Một lệnh `readelf -d` mất một giây và trả lời dứt khoát câu hỏi mà mười bốn phút thử sai không trả lời được.
2. **`Error loading` và `Error relocating` là hai tầng khác nhau.** Chuyển được từ lỗi đầu sang lỗi sau nghĩa là shim đã làm đúng việc của nó, và cũng nghĩa là shim không đủ. Đừng nhầm tiến triển với khắc phục.
3. **Cân nhắc dung lượng bằng số thật.** 89 MB nghe như một cái giá, cho tới khi đặt cạnh `node_modules` 350 MB của cùng dự án đó.

Bản sửa cuối cùng là một dòng. Phần đáng giá không phải dòng đó, mà là biết vì sao nó đúng — nếu không thì lần sau gặp một native module khác, bạn lại mất đúng mười bốn phút ấy.

---

**Cập nhật lần cuối**: Tháng 9, 2026

## Bài liên quan

- [2.8 — 7. Hosting và Cloud cơ bản](/docs/dotnet-backend-zero-to-senior/stage-01-foundation/module-02-computer-science-basics/2.8-hosting-and-cloud-basics) — Từ máy chủ vật lý tới serverless: bạn đang đổi quyền kiểm soát lấy sự tiện lợi.
- [Module 15 — Docker + Deployment](/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-15-docker-deployment) — Container hóa và triển khai: Dockerfile multi-stage, compose, health checks, reverse proxy — pipeline production-like cho .NET.
