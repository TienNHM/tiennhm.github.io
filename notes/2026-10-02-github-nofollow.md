---
title: "GitHub gắn nofollow vào mọi link ra ngoài"
description: "Kể cả trường website ở sidebar repo. Backlink từ GitHub không truyền thẩm quyền tên miền."
authors: [tiennhm]
tags: [git, seo]
---

Hôm nay soi Google Search Console thấy đúng **3 backlink** trỏ về site, cả ba từ `github.com` và `github.io`. Mở HTML trang repo ra xem thì:

```html
<a href="http://tiennhm.io.vn/" rel="noopener noreferrer nofollow">
```

GitHub gắn `rel="nofollow"` vào **mọi** link ra ngoài, kể cả trường *Website* ở sidebar repo — chỗ ai cũng tưởng là backlink ngon nhất mình có.

Nghĩa là ba backlink đó **không truyền thẩm quyền** gì hết. Về mặt xếp hạng, site đang ở vạch xuất phát.

Điều này đổi hẳn cách đọc một vụ tụt hiển thị: nếu nghi do "mất backlink khi đổi tên miền" thì nên kiểm `rel` trước, vì rất có thể chẳng có gì để mà mất.

Giá trị thật của link GitHub là **người thật bấm vào**, không phải PageRank.
