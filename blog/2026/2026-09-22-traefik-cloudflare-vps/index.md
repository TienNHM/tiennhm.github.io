---
title: "Traefik + Cloudflare: vì sao cert hết hạn đồng loạt sau 60 ngày?"
slug: traefik-cloudflare-https-tu-dong-vps
description: "Một VPS, 14 container, 13 hostname, tất cả nằm sau Cloudflare và đều cần HTTPS tự động. Bài viết mổ kiến trúc Traefik v3 + Cloudflare đang chạy thật: vì sao ACME HTTP-01 cấp được cert lần đầu nhưng chắc chắn trượt lúc gia hạn, vì sao DNS-01 giải quyết được nhưng lại đẻ ra một ràng buộc mới, và vì sao thiếu router bắt-tất thì Cloudflare trả lỗi 526."
keywords: [traefik cloudflare, traefik v3, acme dns-01, dns challenge cloudflare, http-01 vs dns-01, lets encrypt wildcard, traefik lets encrypt, cloudflare full strict, cloudflare flexible redirect loop, loi 526 cloudflare, traefik docker labels, reverse proxy docker, forwardedheaders trustedips, cloudflare ip ranges, traefik catchall router, hostregexp traefik, cf_dns_api_token, traefik acme.json, wildcard certificate, docker network edge, exposedbydefault, traefik entrypoints redirect https, multi site vps, https tu dong, cau hinh traefik, gia han cert that bai, zone could not be found, traefik priority router]
tags: [traefik, cloudflare, docker, devops, https, tls, vps, architecture]
authors: [tiennhm]
date: 2026-09-22
---

import { SummaryBox, FAQSection, Checklist } from '@site/src/components/SEO';

# Traefik + Cloudflare: vì sao cert hết hạn đồng loạt sau 60 ngày?

<SummaryBox>
Khi domain bật proxy Cloudflare (mây cam) với SSL mode **Full (strict)**, ACME **HTTP-01 không dùng được**: Let's Encrypt gọi `http://domain/.well-known/acme-challenge/...` ở cổng 80, Cloudflare nhận rồi gọi ngược về origin bằng **HTTPS:443** — nơi bộ xử lý challenge của Traefik không có mặt. Bạn cần cert để qua được Cloudflare, mà cần qua Cloudflare mới lấy được cert. Lách lần đầu bằng cách tạm tắt mây cam thì được, nhưng **lần gia hạn tự động sau ~60 ngày sẽ trượt âm thầm và mọi site hết hạn cùng lúc**. Lối ra là **DNS-01**: xác thực bằng bản ghi TXT qua API Cloudflare, không request nào chạm origin. Đổi lại, cert chỉ cấp được cho những zone mà API token nhìn thấy.
</SummaryBox>

Trên VPS này đang có 14 container chung một reverse proxy: 10 site WordPress, một API .NET, một app Angular, một web app sự kiện, và Traefik. Mười ba hostname, tất cả nằm sau Cloudflare, tất cả cần HTTPS và không ai muốn gia hạn cert bằng tay.

Phần kiến trúc thì đơn giản đến mức nhàm. Phần thú vị nằm ở chỗ Cloudflare và Let's Encrypt, mỗi bên làm đúng việc của mình, nhưng ghép lại thì tạo ra một vòng luẩn quẩn mà bạn chỉ phát hiện vào ngày cert hết hạn — tức là hai tháng sau khi mọi thứ trông có vẻ đã xong.

<!-- truncate -->

## Tóm tắt nhanh (TL;DR) {#tldr}

- **Kiến trúc**: Cloudflare (mây cam) → Traefik v3 trên network `edge` → container. SSL mode **Full (strict)**.
- **SSL mode Flexible là bẫy số một**: Cloudflare gọi HTTP, Traefik redirect sang HTTPS → vòng lặp vô tận ở `wp-admin`.
- **HTTP-01 hỏng ở bước gia hạn**, không phải bước cấp. Đây là lý do nó nguy hiểm.
- **DNS-01 là lối ra**, và cũng là cách duy nhất lấy được cert wildcard.
- **Cái giá của DNS-01**: token Cloudflare chỉ thấy zone được cấp quyền. Domain ở zone khác sẽ trượt — log thật của tôi đang lặp lại lỗi này từ 19/09.
- **Thiếu router bắt-tất**: wildcard DNS + tên lạ → Traefik chìa cert tự ký → Cloudflare trả **526**.
- **Cần `forwardedheaders.trustedips`**, không thì mọi app thấy IP của Cloudflare thay vì IP khách.

---

## Kiến trúc: một proxy, một network, label trên từng container {#kien-truc}

Toàn bộ hệ thống chỉ có ba tầng:

```
Khách → Cloudflare (mây cam, Full strict) → Traefik :443 → container :80
                                              └── network "edge"
```

Traefik chạy **một lần duy nhất** trên VPS. Các stack khác không biết gì về nhau, chúng chỉ cần tham gia vào một network Docker dùng chung tên `edge` và khai vài label. Hiện `edge` có 14 container.

Traefik được cấu hình để **không** tự động route mọi thứ nó nhìn thấy:

```yaml
- --providers.docker=true
# Chỉ route container nào khai báo traefik.enable=true
- --providers.docker.exposedbydefault=false
- --providers.docker.network=edge
- --entrypoints.web.address=:80
- --entrypoints.websecure.address=:443
# Ép toàn bộ HTTP sang HTTPS
- --entrypoints.web.http.redirections.entrypoint.to=websecure
- --entrypoints.web.http.redirections.entrypoint.scheme=https
```

`exposedbydefault=false` là mặc định nên bật cho mọi cài đặt Traefik. Không có nó, mỗi container mới lên là một router mới được sinh tự động, gồm cả những thứ không bao giờ nên ra Internet như database hay adminer.

Phía site thì mỗi container chỉ cần sáu dòng label. Đây là label thật của một site WordPress đang chạy:

```yaml
traefik.enable: "true"
traefik.docker.network: edge
traefik.http.routers.bakery.rule: Host(`bakery.tiennhm.io.vn`)
traefik.http.routers.bakery.entrypoints: websecure
traefik.http.routers.bakery.tls.certresolver: letsencrypt
traefik.http.services.bakery.loadbalancer.server.port: "80"
```

Thêm một site là thêm một thư mục với sáu dòng này, không sửa gì ở Traefik. Đó là toàn bộ giá trị của mô hình label-driven: cấu hình routing sống cùng chỗ với thứ được route.

---

## Bẫy 1: SSL mode Flexible gây vòng lặp chuyển hướng {#cloudflare-flexible}

Trước khi nói tới cert, phải chốt SSL mode ở Cloudflare, vì chọn sai thì không có gì chạy được cả.

| SSL mode | Cloudflare gọi origin bằng | Kết quả với cấu hình trên |
|---|---|---|
| Flexible | HTTP :80 | **Vòng lặp vô tận** |
| Full | HTTPS :443, không kiểm cert | Chạy, nhưng chấp nhận cả cert giả mạo |
| **Full (strict)** | HTTPS :443, kiểm cert hợp lệ | **Nên dùng** |

Với **Flexible**, chuỗi sự kiện là: khách gọi HTTPS tới Cloudflare → Cloudflare gọi origin bằng **HTTP** → entrypoint `web` của Traefik redirect 301 sang HTTPS → Cloudflare thấy redirect, trả về cho trình duyệt → trình duyệt gọi lại HTTPS → lặp lại từ đầu.

Triệu chứng kinh điển là `wp-admin` quay vòng không vào được, còn trang chủ thì có vẻ vẫn ổn vì đã bị cache. Trong tài liệu vận hành của tôi, đây là mục số một của phần khắc phục sự cố, và nó ở đó vì tôi đã dính.

**Full (strict)** là lựa chọn đúng, nhưng nó kéo theo một yêu cầu: origin **phải** có cert hợp lệ, công nhận được. Giữ ý đó trong đầu, vì phần tiếp theo là hệ quả trực tiếp.

---

## Bẫy 2: HTTP-01 và cái vòng luẩn quẩn {#http-01-vong-luan-quan}

ACME **HTTP-01** là kiểu xác thực mặc định mà hầu hết hướng dẫn Traefik dùng. Cách nó hoạt động: Let's Encrypt gọi `http://<domain>/.well-known/acme-challenge/<token>` ở **cổng 80**, và server phải trả về đúng nội dung.

Trên một VPS trần thì hoàn hảo. Sau Cloudflare với Full (strict) thì hỏng, theo đúng chuỗi này:

1. Let's Encrypt gọi `http://bakery.tiennhm.io.vn/.well-known/acme-challenge/abc`
2. Record đang bật mây cam nên request đi vào Cloudflare, không vào VPS
3. Cloudflare gọi ngược về origin — nhưng ở chế độ Full (strict) thì nó gọi bằng **HTTPS cổng 443**
4. Bộ xử lý challenge của Traefik chỉ nằm trên entrypoint `web`, tức cổng 80
5. Cổng 443 trả 404 cho đường dẫn đó → challenge trượt

Nói gọn: **cần cert để qua được Cloudflare, cần qua Cloudflare mới lấy được cert.**

Vòng này lách được. Tắt mây cam cho record về **DNS only (mây xám)**, để Let's Encrypt gọi thẳng VPS, lấy cert xong rồi bật mây cam lại. Tôi từng làm đúng vậy và nó chạy.

**Và đó chính là chỗ nguy hiểm.**

Vì sau khi bật lại mây cam, mọi thứ trông hoàn hảo: site chạy HTTPS, cert hợp lệ, Cloudflare Full (strict) vui vẻ. Không có cảnh báo nào. Nhưng cert Let's Encrypt sống 90 ngày và Traefik sẽ thử **gia hạn tự động ở khoảng ngày thứ 60** — lúc đó bạn không ngồi cạnh để tắt mây cam nữa. Challenge trượt, Traefik ghi một dòng lỗi vào log rồi thử lại, im lặng, ngày này qua ngày khác.

Đến ngày thứ 90 thì **mọi site hết hạn cùng một lúc**, vì chúng được cấp cert trong cùng một buổi chiều.

Đây là loại lỗi tệ nhất: nó không xuất hiện lúc bạn đang chú ý, và khoảng cách giữa nguyên nhân với hậu quả là hai tháng.

---

## Lối ra: DNS-01 {#dns-01}

**DNS-01** xác thực bằng cách tạo một bản ghi TXT tại `_acme-challenge.<domain>` thay vì phục vụ một file qua HTTP. Điểm mấu chốt: **không request nào chạm tới origin**, nên mây cam bật hay tắt đều không ảnh hưởng.

Cấu hình trong Traefik:

```yaml
- --certificatesresolvers.letsencrypt.acme.email=${ACME_EMAIL}
- --certificatesresolvers.letsencrypt.acme.storage=/acme.json
- --certificatesresolvers.letsencrypt.acme.dnschallenge=true
- --certificatesresolvers.letsencrypt.acme.dnschallenge.provider=cloudflare
# Hỏi thẳng resolver công cộng khi chờ TXT lan truyền, không dùng resolver
# của host (có thể đã cache âm bản ghi _acme-challenge)
- --certificatesresolvers.letsencrypt.acme.dnschallenge.resolvers=1.1.1.1:53,8.8.8.8:53
```

Cộng với một token API:

```yaml
environment:
  - CF_DNS_API_TOKEN=${CF_DNS_API_TOKEN}
```

Dòng `resolvers` nhỏ nhưng đáng có. Traefik phải đợi bản ghi TXT lan truyền trước khi báo Let's Encrypt kiểm tra. Nếu nó hỏi resolver của host mà resolver đó vừa cache một câu trả lời NXDOMAIN cho `_acme-challenge.<domain>`, việc chờ sẽ kéo dài vô ích hoặc trượt hẳn. Hỏi thẳng `1.1.1.1` và `8.8.8.8` thì bỏ qua được lớp cache đó.

### Quyền của token: đừng cấp thừa

Token này ghi được DNS của bạn, nên phạm vi quyền là chuyện an toàn thật sự, không phải hình thức:

| Mục | Giá trị |
|---|---|
| Permissions | `Zone → Zone → Read` và `Zone → DNS → Edit` |
| Zone Resources | Include → **Specific zone** → đúng một zone |
| Client IP Filtering | Giới hạn đúng IP của VPS |

`Zone → Read` là để tra zone ID, `DNS → Edit` là để tạo và xoá bản ghi TXT. Không cần gì hơn. Đặc biệt **không dùng Global API Key** — khoá đó toàn quyền trên toàn bộ tài khoản và không thu hồi lẻ được.

### Phần thưởng kèm theo: cert wildcard

Cert wildcard **chỉ cấp được bằng DNS-01**, HTTP-01 không hỗ trợ. Một lưu ý hay bị quên: wildcard phủ **đúng một cấp**. `*.tiennhm.io.vn` bao `bakery.tiennhm.io.vn` nhưng **không** bao `a.b.tiennhm.io.vn`.

---

## Bẫy 3: DNS-01 đẻ ra một ràng buộc mới {#rang-buoc-dns01}

Phần này không có trong các bài hướng dẫn, vì nó chỉ lộ ra khi bạn chạy thật đủ lâu.

HTTP-01 chứng minh quyền sở hữu bằng *"tôi điều khiển được server ở địa chỉ này"*. DNS-01 chứng minh bằng *"tôi điều khiển được DNS của zone này"*. Đổi cách chứng minh nghĩa là đổi luôn thứ có thể hỏng.

Trên VPS này có một container phục vụ domain thuộc **zone khác** với zone mà token được cấp quyền. Đây là log thật của Traefik:

```
ERR Unable to obtain ACME certificate for domains
error="unable to generate a certificate for the domains [club-day.hcmute-dsc.io.vn]:
  resolver: one or more domains had a problem:
  [club-day.hcmute-dsc.io.vn: dns01: error presenting token:
   cloudflare: failed to find zone hcmute-dsc.io.vn.: zone could not be found]"
routerName=club-day@docker
```

Token của tôi giới hạn ở zone `tiennhm.io.vn`, nên với `hcmute-dsc.io.vn` thì API Cloudflare trả về "không thấy zone nào". Traefik không bỏ cuộc: nó thử lại, và cùng một lỗi lặp lại ở **19/09**, rồi **21/09**, và vẫn còn đang lặp.

Điều đáng nói là nó **không làm sập cái gì cả**. Router vẫn tồn tại, container vẫn chạy, các site khác vẫn có cert. Chỉ riêng host đó không có cert hợp lệ — mà với Cloudflare Full (strict) thì nghĩa là khách sẽ gặp **526**.

Rút ra: với HTTP-01, thêm một domain mới chỉ cần trỏ DNS về IP. Với DNS-01, **mỗi zone mới cần một token có quyền trên zone đó**, và nếu quên thì hệ thống hỏng một cách yên lặng đúng ở chỗ bạn không nhìn.

---

## Bẫy 4: thiếu router bắt-tất thì Cloudflare trả 526 {#router-bat-tat}

Khi bạn dùng wildcard DNS `*.tiennhm.io.vn` trỏ về VPS, **mọi** tên dưới domain đó đều tới Traefik: gõ nhầm, bot dò subdomain, link cũ của site đã gỡ.

Không có router nào khớp thì Traefik chìa cert tự ký mặc định. Cloudflare ở chế độ Full (strict) kiểm cert, thấy không hợp lệ, và trả **526 Invalid SSL certificate** — một mã lỗi mà người dùng không hiểu, còn bạn thì tưởng site hỏng.

Thứ nên trả về là "không có gì ở đây". Cách làm:

```yaml
- "traefik.http.routers.catchall.rule=HostRegexp(`^.+$`)"
- "traefik.http.routers.catchall.priority=1"
- "traefik.http.routers.catchall.entrypoints=websecure"
- "traefik.http.routers.catchall.tls.certresolver=letsencrypt"
- "traefik.http.routers.catchall.tls.domains[0].main=tiennhm.io.vn"
- "traefik.http.routers.catchall.tls.domains[0].sans=*.tiennhm.io.vn"
- "traefik.http.routers.catchall.middlewares=catchall-redirect"
- "traefik.http.routers.catchall.service=noop@internal"
- "traefik.http.middlewares.catchall-redirect.redirectregex.regex=.*"
- "traefik.http.middlewares.catchall-redirect.redirectregex.replacement=https://tiennhm.io.vn/"
- "traefik.http.middlewares.catchall-redirect.redirectregex.permanent=false"
```

Bốn quyết định trong đoạn này đều có lý do riêng.

**`priority=1`** là mức thấp nhất. Router `Host(...)` của từng site có priority mặc định tính theo độ dài rule nên luôn thắng. Router bắt-tất chỉ nhận phần thừa.

**`tls.domains` khai tường minh** là phần quan trọng nhất và dễ bỏ sót nhất. `HostRegexp` không cho Traefik suy ra tên miền cần xin cert, nên nếu không khai thì Traefik **không tự đi xin cert cho SNI lạ** — và đó đúng là điều mong muốn. Bằng không, bất kỳ ai trỏ domain của họ vào IP này cũng kích hoạt được một lượt xin cert, đốt hạn mức Let's Encrypt của bạn.

**`service=noop@internal`** vì router này không phục vụ nội dung nào, nó chỉ tồn tại để chìa đúng cert rồi chuyển hướng.

**`permanent=false`** tức 302 chứ không 301. Một tên hôm nay chưa dùng thì mai có thể thành site thật; 301 bị trình duyệt nhớ vĩnh viễn và lúc đó rất khó gỡ.

---

## Bẫy 5: mọi app đều thấy IP của Cloudflare {#ip-that-cua-khach}

Khi có proxy đứng trước, IP nguồn mà container nhìn thấy là IP của Cloudflare. Hệ quả: log sai, rate limit theo IP vô dụng, plugin chống brute force của WordPress chặn nhầm, thống kê lệch.

IP thật nằm trong header `X-Forwarded-For`, nhưng Traefik chỉ tin header đó khi bạn nói rõ nguồn nào đáng tin:

```yaml
- --entrypoints.websecure.forwardedheaders.trustedips=173.245.48.0/20,103.21.244.0/22,...,131.0.72.0/22
```

Danh sách này là **dải IP công bố của Cloudflare**. Đây không phải thủ tục hình thức: nếu tin mọi nguồn, bất kỳ ai cũng giả được `X-Forwarded-For` và vượt qua mọi thứ dựa trên IP. Cloudflare có cập nhật dải này theo thời gian, nên nó thuộc nhóm cấu hình cần soát lại định kỳ.

---

## Vận hành: những gì tôi quan sát được sau 9 ngày {#van-hanh}

Traefik ghi một dòng vào log mỗi ngày:

```
INF Testing certificate renew... acmeCA=https://acme-v02.api.letsencrypt.org/directory
```

Vòng gia hạn chạy đều. Trong `acme.json` hiện có **12 cert**, và ở đây có một chi tiết đáng bàn: 11 cert lẻ cho từng subdomain, **cộng thêm** một cert wildcard `tiennhm.io.vn` + `*.tiennhm.io.vn`.

Nghĩa là 11 cert kia về mặt kỹ thuật là thừa — cert wildcard đã phủ hết chúng. Chúng tồn tại vì mỗi router `Host(...)` không khai `tls.domains` sẽ tự kích hoạt một lượt xin cert riêng. Chuyện này không gây hỏng gì, nhưng nó tiêu hạn mức Let's Encrypt (50 cert mỗi tuần cho mỗi domain đã đăng ký) và tạo ra 11 lịch gia hạn phải theo dõi thay vì một.

Nếu làm lại, tôi sẽ cân nhắc khai cert wildcard làm **default certificate** của Traefik và bỏ `certresolver` khỏi router của từng site. Đổi lại thì mất đi tính độc lập: mọi site chung một cert, và một lần gia hạn trượt là ảnh hưởng tất cả. Với 11 site thuộc cùng một zone thì tôi nghiêng về wildcard; nếu các site thuộc nhiều khách hàng khác nhau thì cert riêng lại hợp lý hơn.

<Checklist
  title="Danh sách kiểm khi đặt Traefik phía sau Cloudflare"
  items={[
    { text: "Cloudflare SSL/TLS đặt Full (strict), tuyệt đối không Flexible" },
    { text: "Dùng DNS-01, không dùng HTTP-01, kể cả khi HTTP-01 đang chạy được" },
    { text: "Token Cloudflare: Zone Read + DNS Edit, giới hạn đúng zone và đúng IP VPS" },
    { text: "Khai resolvers 1.1.1.1 và 8.8.8.8 cho DNS challenge" },
    { text: "Đặt exposedbydefault=false để không route nhầm database hay adminer" },
    { text: "Thêm forwardedheaders.trustedips bằng dải IP Cloudflare" },
    { text: "Thêm router bắt-tất có priority=1 và tls.domains tường minh" },
    { text: "acme.json chmod 600 trước khi khởi động lần đầu" },
    { text: "Mỗi zone mới cần token thấy được zone đó — kiểm tra log sau khi thêm domain", checked: true }
  ]}
/>

Mục cuối là mục tôi học được đắt nhất, và nó vẫn đang nằm trong log của tôi.

---

## Vài điều tôi cố tình chưa làm {#chua-lam}

**Docker socket vẫn được mount.** Traefik đọc danh sách container qua `/var/run/docker.sock`, mount ở chế độ `:ro`. Cần nói thẳng: **read-only không phải một ranh giới bảo mật** — ai đọc được socket thì về cơ bản có quyền tương đương root trên host. Giải pháp đúng là đặt một proxy socket ở giữa để chỉ mở đúng các endpoint cần thiết. Tôi chưa làm, và biết đó là món nợ chứ không phải một lựa chọn.

**Chưa có dashboard Traefik.** Nó tiện lúc gỡ lỗi, nhưng mở ra là thêm một bề mặt cần xác thực và phân quyền. Tôi đọc log thay thế.

**Chưa khoá origin chỉ nhận traffic từ Cloudflare.** Hiện tại ai biết IP VPS vẫn gọi thẳng được cổng 443, bỏ qua mọi thứ Cloudflare cung cấp. Cách chuẩn là firewall chỉ cho các dải IP Cloudflare vào, hoặc dùng Cloudflare Tunnel để không mở cổng nào ra Internet.

---

<FAQSection
  title="Câu hỏi thường gặp"
  items={[
    {
      question: "Vì sao ACME HTTP-01 không dùng được khi domain bật proxy Cloudflare?",
      answer: "Vì Let's Encrypt gọi http://domain/.well-known/acme-challenge/... ở cổng 80, request đó đi vào Cloudflare chứ không vào VPS, rồi Cloudflare ở chế độ Full hoặc Full (strict) gọi ngược về origin bằng HTTPS cổng 443 — nơi bộ xử lý challenge của Traefik không có mặt vì nó chỉ nằm trên entrypoint cổng 80. Kết quả là 404 và challenge trượt. Bạn cần cert để qua được Cloudflare, mà cần qua Cloudflare mới lấy được cert."
    },
    {
      question: "Tôi đã lấy được cert bằng cách tắt mây cam, vậy có cần đổi sang DNS-01 không?",
      answer: "Có, và đây là điểm quan trọng nhất của bài. Tắt mây cam chỉ giải quyết lần cấp đầu tiên. Cert Let's Encrypt sống 90 ngày và Traefik thử gia hạn tự động vào khoảng ngày thứ 60, lúc đó không ai ngồi tắt mây cam nữa nên challenge trượt, và nó trượt âm thầm — chỉ có một dòng trong log. Đến ngày thứ 90 thì mọi site hết hạn cùng lúc vì chúng được cấp trong cùng một buổi. DNS-01 xác thực bằng bản ghi TXT, không request nào chạm origin, nên mây cam bật hay tắt đều không ảnh hưởng."
    },
    {
      question: "Cloudflare SSL mode nên đặt là gì khi dùng Traefik?",
      answer: "Full (strict). Đặt Flexible thì Cloudflare gọi origin bằng HTTP trong khi Traefik lại redirect HTTP sang HTTPS, tạo vòng lặp chuyển hướng vô tận, triệu chứng điển hình là wp-admin quay vòng không vào được. Đặt Full thì chạy nhưng Cloudflare không kiểm cert của origin nên chấp nhận cả cert giả mạo. Full (strict) yêu cầu origin có cert hợp lệ, và đó chính là lý do phải giải quyết bài toán ACME cho tử tế."
    },
    {
      question: "Lỗi 526 Invalid SSL certificate từ Cloudflare nghĩa là gì?",
      answer: "Nghĩa là Cloudflare ở chế độ Full (strict) đã gọi origin nhưng cert mà origin chìa ra không hợp lệ. Với Traefik, nguyên nhân phổ biến là một hostname không khớp router nào, nên Traefik trả về cert tự ký mặc định. Khi dùng wildcard DNS thì mọi tên gõ nhầm hay bị bot dò đều rơi vào trường hợp này. Cách xử lý là thêm một router bắt-tất với priority=1, khai tls.domains tường minh, và chuyển hướng về trang chủ bằng 302."
    },
    {
      question: "Token Cloudflare cho DNS-01 cần quyền gì?",
      answer: "Chỉ hai quyền: Zone → Zone → Read để tra zone ID, và Zone → DNS → Edit để tạo rồi xoá bản ghi TXT. Giới hạn Zone Resources vào đúng zone đang dùng và bật Client IP Filtering cho đúng IP của VPS. Không dùng Global API Key vì khoá đó toàn quyền trên toàn bộ tài khoản và không thu hồi lẻ được. Lưu ý token chỉ thấy zone được cấp quyền, nên domain thuộc zone khác sẽ trượt với lỗi zone could not be found."
    },
    {
      question: "Vì sao cần forwardedheaders.trustedips khi Traefik nằm phía sau Cloudflare?",
      answer: "Vì khi có proxy đứng trước, IP nguồn mà container nhìn thấy là IP của Cloudflare chứ không phải của khách. Hệ quả là log sai, rate limit theo IP vô dụng, và plugin chống brute force chặn nhầm. IP thật nằm trong header X-Forwarded-For, nhưng Traefik chỉ tin header đó từ những nguồn bạn khai trong trustedips. Phải khai đúng dải IP công bố của Cloudflare — nếu tin mọi nguồn thì ai cũng giả được header này và vượt qua mọi cơ chế dựa trên IP."
    },
    {
      question: "Nên dùng cert wildcard hay cert riêng cho từng subdomain?",
      answer: "Tuỳ số lượng site và ranh giới sở hữu. Cert riêng cho từng host là mặc định khi mỗi router khai certresolver, nhưng nó tiêu hạn mức Let's Encrypt là 50 cert mỗi tuần cho mỗi domain đã đăng ký, và tạo ra nhiều lịch gia hạn phải theo dõi. Cert wildcard gom tất cả về một, đổi lại một lần gia hạn trượt là ảnh hưởng mọi site, và wildcard chỉ phủ đúng một cấp subdomain. Nếu các site cùng thuộc một zone và một chủ thì wildcard gọn hơn; nếu thuộc nhiều khách hàng khác nhau thì cert riêng đáng giá hơn."
    }
  ]}
/>

## Kết luận {#ket-luan}

Phần Traefik của kiến trúc này gần như không có gì để kể: một proxy, một network dùng chung, sáu dòng label cho mỗi site. Toàn bộ độ khó nằm ở chỗ Cloudflare và Let's Encrypt gặp nhau.

Ba điều tôi mang đi:

1. **Chọn kiểu ACME challenge theo lần gia hạn, đừng theo lần cấp.** HTTP-01 khi đã bật mây cam vẫn cấp được nếu bạn can thiệp tay, và chính điều đó làm nó nguy hiểm — bạn tưởng đã xong, trong khi đồng hồ 60 ngày đã bắt đầu chạy.
2. **Đổi cách xác thực là đổi thứ có thể hỏng.** DNS-01 gỡ được sự phụ thuộc vào cổng 80, nhưng buộc mọi domain phải nằm trong zone mà token nhìn thấy. Log của tôi đang lặp lại đúng bài học đó mỗi ngày.
3. **Mặc định của reverse proxy được chọn cho một VPS trần.** `exposedbydefault`, cert tự ký cho SNI lạ, tin cậy header chuyển tiếp — cả ba đều hợp lý khi không có ai đứng trước, và đều sai khi có Cloudflare ở giữa.

Nếu bạn đang đặt Traefik phía sau Cloudflare và HTTP-01 vẫn đang chạy tốt, hãy mở lịch ra đếm tới ngày thứ 60.

---

**Cập nhật lần cuối**: Tháng 9, 2026

## Bài liên quan

- [Module 15 — Docker + Deployment](/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-15-docker-deployment) — Container hóa và triển khai: Dockerfile multi-stage, compose, health checks, reverse proxy — pipeline production-like cho .NET.
- [Module 2 — Computer Science Basics](/docs/dotnet-backend-zero-to-senior/stage-01-foundation/module-02-computer-science-basics) — CS foundation cho backend: mô hình bộ nhớ, HTTP/TCP khái quát, JSON, REST semantics, phân tích độ phức tạp — liên hệ pipeline request trong ASP.NET…
- [2.3 — 1. Internet hoạt động như thế nào](/docs/dotnet-backend-zero-to-senior/stage-01-foundation/module-02-computer-science-basics/2.3-how-the-internet-works) — Theo chân một request từ lúc gõ URL tới lúc pixel hiện lên: DNS, TCP, TLS, HTTP.
