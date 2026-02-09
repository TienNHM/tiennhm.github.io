---
title: Phần 7 - UX Best Practices
slug: agent-skills-05-ux-best-practices
description: Tổng hợp UX guidelines chung cho Agent Skills – Navigation, Animation, Layout, Touch, Interaction, Accessibility, Performance, Forms, Responsive, Typography, Feedback, Content, Onboarding, Search, Data Entry, AI Interaction, Spatial UI, Sustainability.
image: https://uxdesign.cc/favicon.ico
sidebar_position: 7
tags:
  - agent-skills
  - ux
  - usability
  - best-practices
  - cursor
keywords: [agent skills, ux, best practices, navigation, accessibility, forms, performance, ai interaction]
enableComments: true
draft: false
---

import { SummaryBox } from '@site/src/components/SEO';

# Agent Skills - Phần 7: UX Best Practices

<SummaryBox>
Tài liệu tổng hợp UX Best Practices dùng làm nguồn tham chiếu cho Agent Skills (ví dụ trong Cursor), bao gồm các chủ đề: Navigation, Animation, Layout, Touch interactions, Accessibility, Performance, Forms, Responsive design, Typography, Feedback, Content strategy, Onboarding, Search, Data Entry, AI Interaction, Spatial UI và Sustainability. Mỗi guideline được đánh giá mức độ quan trọng và có ví dụ cụ thể. Nội dung dựa trên ux-guidelines.csv từ ui-ux-pro-max-skill, giúp designers và developers tạo trải nghiệm người dùng tốt và tuân thủ UX best practices.
</SummaryBox>

Tài liệu này tổng hợp **UX Best Practices** dùng làm nguồn tham chiếu cho Agent Skills (ví dụ trong Cursor).  
Nội dung dựa trên bộ guideline từ [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) — file [`ux-guidelines.csv`](https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/refs/heads/main/src/ui-ux-pro-max/data/ux-guidelines.csv).

**Cập nhật:** 08/02/2026.

**Mức độ:** 🔴 Cao · 🟡 Trung bình · 🟢 Thấp  
**Ví dụ code:** `+` nên · `-` tránh

---

## 1. Navigation

### 1.1 🔴 Smooth scroll for anchor links (Web)

Scroll “nhảy” tức thời khi click anchor gây khó chịu và mất ngữ cảnh.

- **Nên:** Dùng `scroll-behavior: smooth` cho HTML.

```diff
+ html { scroll-behavior: smooth; }
```

- **Không nên:** Để anchor nhảy thẳng tới section mà không có smooth scroll.

```diff
- <a href="#section">Section</a> <!-- không có CSS smooth scroll -->
```

---

### 1.2 🟡 Sticky navigation không che nội dung (Web)

Nav cố định phải **chừa chỗ** cho content bên dưới.

- **Nên:** Thêm `padding-top` cho body (hoặc section đầu) bằng chiều cao nav.

```diff
+ <main class="pt-20">...</main> <!-- nav cao h-20 -->
```

- **Không nên:** Để nav overlap phần đầu content.

```diff
- <main>...</main> <!-- không bù padding -->
```

---

### 1.3 🟡 Active state rõ ràng (All)

User cần biết đang ở trang/section nào.

- **Nên:** Highlight nav item hiện tại bằng màu/underline/border.

```diff
+ <a class="text-primary border-b-2 border-primary">Home</a>
```

- **Không nên:** Tất cả link nhìn giống nhau, không có trạng thái active.

```diff
- <a class="text-gray-600">Home</a>
```

---

### 1.4 🔴 Back button predictable (Mobile/Web)

Back (trình duyệt/app) phải hoạt động đúng expectation của user.

- **Nên:** Bảo tồn history đúng thứ tự.

```diff
+ history.pushState(...)
```

- **Không nên:** Dùng `location.replace()` hoặc phá history khiến back không quay lại trang trước.

```diff
- location.replace('/dashboard')
```

---

### 1.5 🟡 Deep linking phản ánh state (All)

URL nên phản ánh state hiện tại để share/bookmark được.

- **Nên:** Cập nhật URL (query/hash) khi view/state thay đổi.

```diff
+ /products?category=shoes&page=2
```

- **Không nên:** Tất cả state động nhưng URL cố định.

```diff
- /products  <!-- một URL cho mọi bộ lọc -->
```

---

### 1.6 🟢 Dùng breadcrumbs cho cấu trúc sâu (Web)

Site nhiều tầng cần breadcrumbs để user biết mình đang ở đâu.

- **Nên:** Hiển thị đường dẫn hierarchy.

```diff
+ Home > Category > Product
```

- **Không nên:** Thêm breadcrumbs cho site phẳng 1–2 cấp (chỉ gây nhiễu).

```diff
- Home > Blog
```

---

## 2. Animation & Motion

### 2.1 🔴 Tránh excessive motion

Quá nhiều animation gây phân tâm và mệt/motion sickness.

- **Nên:** Chỉ animate 1–2 phần tử quan trọng mỗi view.

```diff
+ Single hero animation
```

- **Không nên:** Animate hàng loạt icon, text, background cùng lúc.

```diff
- animate-bounce on 5+ elements
```

---

### 2.2 🟡 Duration hợp lý cho micro-interactions

Animation UI nên nhanh nhưng không “giật”.

- **Nên:** 150–300ms cho hover/click/focus.

```diff
+ transition-all duration-200
```

- **Không nên:** > 500ms cho thao tác thường ngày.

```diff
- transition-all duration-1000
```

---

### 2.3 🔴 Tôn trọng prefers-reduced-motion (All)

User nhạy cảm motion cần có option giảm/bỏ animation.

- **Nên:** Dùng media query `prefers-reduced-motion`.

```diff
+ @media (prefers-reduced-motion: reduce) {
+   * { animation: none !important; scroll-behavior: auto; }
+ }
```

- **Không nên:** Bỏ qua hoàn toàn setting này.

```diff
- No motion query check
```

---

### 2.4 🔴 Loading states có feedback rõ (All)

Async > 300ms nên có skeleton/spinner, không để UI “chết đứng”.

- **Nên:** Dùng skeleton hoặc spinner.

```diff
+ <div class="animate-pulse bg-gray-200 h-6 w-full" />
```

- **Không nên:** Màn hình trắng im lặng trong khi chờ.

```diff
- Blank screen while loading
```

---

### 2.5 🔴 Hover vs tap (All)

Hover không tồn tại trên mobile – đừng rely hoàn toàn vào hover để tương tác chính.

- **Nên:** Dùng click/tap cho primary action.

```diff
+ onClick={handleClick}
```

- **Không nên:** Chỉ xử lý bằng hover.

```diff
- onMouseEnter={handleOpen}
```

---

### 2.6 🟡 Continuous animation chỉ cho loading

Animation infinite gây phân tâm nếu dùng cho trang trí.

- **Nên:** Dùng `animate-spin`/pulse cho loader.

```diff
+ <Spinner class="animate-spin" />
```

- **Không nên:** Icon/badge trang trí chạy bounce/spin mãi.

```diff
- <Icon class="animate-bounce" />
```

---

### 2.7 🟡 Animate bằng transform & opacity (Web)

Animate layout properties (`top/left/width/height`) rất tốn kém.

- **Nên:** Dùng `transform` + `opacity`.

```diff
+ transform: translateY(10px);
```

- **Không nên:** Animate `top`, `left`, `width`, `height`.

```diff
- top: 10px; /* trong animation */
```

---

### 2.8 🟢 Dùng easing phù hợp

Linear khiến chuyển động “robotic”.

- **Nên:** `ease-out` khi enter, `ease-in` khi exit.

```diff
+ transition-timing-function: ease-out;
```

- **Không nên:** Dùng `linear` cho mọi thứ.

```diff
- transition-timing-function: linear;
```

---

## 3. Layout

### 3.1 🔴 Quản lý z-index theo scale (Web)

Scale z-index rõ ràng tránh “chiến tranh 9999”.

- **Nên:** Định nghĩa scale 10/20/30/50... dùng nhất quán.

```diff
+ z-10 z-20 z-50
```

- **Không nên:** Dùng `z-[9999]` tuỳ tiện.

```diff
- z-[9999]
```

---

### 3.2 🟡 Cẩn thận với overflow-hidden (Web)

`overflow-hidden` có thể cắt mất component quan trọng.

- **Nên:** Dùng `overflow-auto` hoặc test kỹ khi cần hidden.

```diff
+ overflow-auto với scroll
```

- **Không nên:** Gắn `overflow-hidden` default để “chữa cháy”.

```diff
- overflow-hidden truncating content
```

---

### 3.3 🟡 Fixed elements không chồng chéo (Web)

Nhiều element fixed (nav, bottom bar...) cần tính toán khoảng trống/safe area.

- **Nên:** Tính khoảng cách giữa fixed top & bottom.

```diff
+ Fixed nav + fixed bottom with gap
```

- **Không nên:** Chồng nhiều fixed elements che content.

```diff
- Multiple overlapping fixed elements
```

---

### 3.4 🟡 Hiểu stacking context (Web)

New stacking context có thể làm `z-index` “không ăn”.

- **Nên:** Biết element nào tạo stacking context (position + z-index, transform...).

```diff
+ Parent with z-index isolates children
```

- **Không nên:** Cứ tăng `z-index` mà không hiểu vì sao không áp dụng.

```diff
- z-index: 9999 not working
```

---

### 3.5 🔴 Tránh content jumping (CLS) (Web)

Layout shift khi hình/async content load rất khó chịu.

- **Nên:** Reserve space (aspect-ratio hoặc fixed height).

```diff
+ aspect-ratio: 16 / 9;
```

- **Không nên:** Không set dimension cho ảnh/content dynamic.

```diff
- No dimensions on images
```

---

### 3.6 🟡 Cẩn thận 100vh trên mobile (Web)

`100vh` bị ảnh hưởng bởi browser chrome trên mobile.

- **Nên:** Dùng `min-h-dvh` (dynamic viewport) hoặc `min-h-screen`.

```diff
+ min-h-dvh
```

- **Không nên:** Dùng `h-screen/100vh` cho full-screen mobile mà không test.

```diff
- h-screen trên mobile
```

---

### 3.7 🟡 Giới hạn độ rộng content text (Web)

Line dài quá khó đọc – nên khoảng 65–75 ký tự.

- **Nên:** Dùng `max-w-prose` / `max-w-3xl`.

```diff
+ <article class="max-w-prose mx-auto">...</article>
```

- **Không nên:** Paragraph full-width 1440px.

```diff
- <p class="w-full">...</p>
```

---

## 4. Touch

### 4.1 🔴 Touch target ≥ 44x44 (Mobile/Web)

Button quá nhỏ dễ bấm nhầm.

- **Nên:** Đảm bảo tối thiểu ~44x44px.

```diff
+ class="min-h-[44px] min-w-[44px]"
```

- **Không nên:** Button `w-6 h-6` trên mobile.

```diff
- class="w-6 h-6"
```

---

### 4.2 🟡 Touch spacing tối thiểu 8px (Mobile)

Targets sát nhau tăng nguy cơ bấm nhầm.

- **Nên:** Giữ khoảng cách tối thiểu 8px.

```diff
+ class="gap-2"
```

- **Không nên:** `gap-0` hoặc `gap-1` giữa buttons.

```diff
- class="gap-0"
```

---

### 4.3 🟡 Tránh gesture xung đột (Mobile)

Gesture custom có thể xung đột với hệ thống (back, swipe…).

- **Nên:** Dùng vertical scroll cho nội dung chính, horizontal swipe chỉ cho carousel rõ ràng.

```diff
+ Vertical scroll primary
```

- **Không nên:** Swipe ngang trên toàn màn hình chính.

```diff
- Horizontal swipe on main content
```

---

### 4.4 🟡 Giảm tap delay (Mobile Web)

Tap delay ~300ms gây cảm giác lag.

- **Nên:** Dùng `touch-action: manipulation;` hoặc kỹ thuật tương đương.

```diff
+ button { touch-action: manipulation; }
```

- **Không nên:** Giữ default tap handling.

```diff
- No touch optimization
```

---

## 5. Interaction & Feedback

### 5.1 🔴 Focus states rõ ràng (All)

Keyboard user phải thấy được element đang focus.

- **Nên:** Dùng focus ring rõ ràng.

```diff
+ class="focus:ring-2 focus:ring-blue-500"
```

- **Không nên:** Xoá outline mà không thay thế.

```diff
- class="outline-none"
```

---

### 5.2 🟡 Hover states cho element clickable (Web)

Element click được nên có hover feedback.

- **Nên:** Cursor pointer + subtle hover.

```diff
+ class="cursor-pointer hover:bg-gray-100"
```

- **Không nên:** Button/link mà hover như text thường.

```diff
- class="text-gray-700"
```

---

### 5.3 🟡 Active/pressed state (All)

Feedback ngay khi nhấn giúp user yên tâm.

- **Nên:** Thêm `active:*` (scale, shadow...).

```diff
+ class="active:scale-95"
```

- **Không nên:** Không có pressed state nào.

```diff
- No active state
```

---

### 5.4 🟡 Disabled state dễ nhận biết (All)

Element disabled phải trông khác hẳn enabled.

- **Nên:** Giảm opacity + `cursor-not-allowed`.

```diff
+ class="opacity-50 cursor-not-allowed"
```

- **Không nên:** Disabled nhưng nhìn không khác gì bình thường.

```diff
- Same style as enabled
```

---

### 5.5 🔴 Loading button chặn double submit (All)

Trong async submit, button phải disabled và hiển thị loading.

- **Nên:** Disable khi loading + spinner.

```diff
+ <button disabled={loading}>
+   {loading ? 'Saving...' : 'Save'}
+ </button>
```

- **Không nên:** Cho click nhiều lần trong khi đang xử lý.

```diff
- <button onClick={submit}>Save</button>
```

---

### 5.6 🔴 Error feedback rõ ràng (All)

Khi lỗi, user phải hiểu chuyện gì xảy ra và ở đâu.

- **Nên:** Hiển thị thông báo lỗi gần chỗ xảy ra + màu/error icon.

```diff
+ <p class="text-sm text-red-600">Email không hợp lệ</p>
```

- **Không nên:** Lỗi im lặng, chỉ log console.

```diff
- console.error(error)
```

---

### 5.7 🔴 Confirmation trước hành động destructive (All)

Xoá/sửa không hoàn tác cần confirm.

- **Nên:** Dialog “Bạn có chắc không?” trước khi delete.

```diff
+ <ConfirmDialog onConfirm={handleDelete} />
```

- **Không nên:** Xoá ngay khi click mà không cảnh báo.

```diff
- onClick={deleteImmediately}
```

---

## 6. Accessibility

### 6.1 🔴 Color contrast đủ mạnh (All)

Text phải đạt tỉ lệ contrast tối thiểu ~4.5:1.

- **Nên:** Dùng text đậm hơn trên nền sáng.

```diff
+ color: #333; /* trên white */
```

- **Không nên:** Text xám nhạt trên nền xám/trắng.

```diff
- color: #999; /* trên white */
```

---

### 6.2 🔴 Không dùng màu đơn lẻ để truyền thông tin (All)

Color-blind user không phân biệt chỉ-bằng-màu.

- **Nên:** Thêm icon/text cùng màu.

```diff
+ <span class="text-red-600">Error</span>
+ <IconError />
```

- **Không nên:** Chỉ đổi màu border/text mà không có label/icon.

```diff
- <input class="border-red-500" />
```

---

### 6.3 🔴 Alt text cho ảnh (All)

Ảnh meaningful phải có alt mô tả.

- **Nên:** Alt rõ ràng, ngắn gọn.

```diff
+ <img src="dog.jpg" alt="Dog playing in park" />
```

- **Không nên:** Thiếu alt hoặc alt rỗng cho ảnh content.

```diff
- <img src="dog.jpg" alt="" />
```

---

### 6.4 🟡 Heading hierarchy tuần tự (Web)

Screen reader dùng heading để navigate.

- **Nên:** `h1` → `h2` → `h3` theo thứ tự.

```diff
+ <h1>Title</h1>
+ <h2>Section</h2>
```

- **Không nên:** Nhảy cấp (h1 → h4) chỉ vì mục đích style.

```diff
- <h4>Section</h4>
```

---

### 6.5 🔴 ARIA label cho icon-only button (All)

Button chỉ icon phải có accessible name.

- **Nên:** Dùng `aria-label`.

```diff
+ <button aria-label="Close menu"><Icon /></button>
```

- **Không nên:** Button chỉ có icon.

```diff
- <button><Icon /></button>
```

---

### 6.6 🔴 Keyboard navigation đầy đủ (Web)

Mọi chức năng phải accessible bằng keyboard; tab order logic.

- **Nên:** Dùng semantic element và tab order tự nhiên.

```diff
+ <button>...</button>
```

- **Không nên:** Element unreachable hoặc trap focus.

```diff
- div clickable không focus được
```

---

### 6.7 🟡 Skip links (Web)

Page có nhiều nav nên có link “Skip to main content”.

- **Nên:** Thêm skip link hiển thị khi focus.

```diff
+ <a href="#main" class="sr-only focus:not-sr-only">Skip to main content</a>
```

- **Không nên:** Buộc user tab qua hàng chục link để tới content.

```diff
- 100 tabs to reach content
```

---

## 7. Performance & Assets

### 7.1 🔴 Tối ưu ảnh (All)

Ảnh lớn không nén làm chậm page, tốn băng thông.

- **Nên:** Dùng WebP/AVIF + kích thước phù hợp, `srcset`.

```diff
+ srcset with multiple sizes
```

- **Không nên:** Dùng ảnh 4000px cho hiển thị 400px.

```diff
- 4000px image for 400px display
```

---

### 7.2 🟡 Lazy load nội dung off-screen (All)

Content bên dưới fold nên lazy load.

- **Nên:** `loading="lazy"` cho ảnh, lazy cho section phụ.

```diff
+ <img loading="lazy" ... />
```

- **Không nên:** Load mọi thứ ngay từ đầu.

```diff
- All images eager load
```

---

### 7.3 🟡 Code splitting (Web)

Bundle JS lớn làm chậm initial load.

- **Nên:** Split theo route/feature với dynamic import.

```diff
+ const Page = dynamic(() => import('./HeavyPage'));
```

- **Không nên:** Tất cả code trong main bundle.

```diff
- import HeavyPage from './HeavyPage';
```

---

### 7.4 🟡 Font loading thân thiện (Web)

Web font có thể block render.

- **Nên:** `font-display: swap` hoặc `optional`.

```diff
+ font-display: swap;
```

- **Không nên:** Để FOIT (text vô hình đến khi font load).

```diff
- font-display: auto;
```

---

### 7.5 🟡 Third-party scripts không block render (Web)

Script ngoài nên async/defer.

- **Nên:** Dùng `async` hoặc `defer`.

```diff
+ <script src="..." async></script>
```

- **Không nên:** Script sync trong `<head>` chặn render.

```diff
- <script src="..."></script>
```

---

## 8. Forms

### 8.1 🔴 Input luôn có label (All)

Không dùng placeholder làm label duy nhất.

- **Nên:** Label rõ ràng phía trên/bên cạnh input.

```diff
+ <label for="email">Email</label>
+ <input id="email" />
```

- **Không nên:** Chỉ placeholder.

```diff
- <input placeholder="Email" />
```

---

### 8.2 🟡 Error đặt gần field (All)

User nên thấy lỗi sát field bị lỗi.

- **Nên:** Error message ngay dưới input tương ứng.

```diff
+ <input id="email" />
+ <p class="text-sm text-red-600">Email không hợp lệ</p>
```

- **Không nên:** Tất cả lỗi gom trên đầu form.

```diff
- <div>3 errors found</div>
```

---

### 8.3 🟡 Inline validation (All)

Validate khi blur (hoặc khi user sửa), không chỉ khi submit.

- **Nên:** Trigger validation onBlur.

```diff
+ onBlur={validateEmail}
```

- **Không nên:** Chỉ validate khi submit.

```diff
- Validate only on submit
```

---

### 8.4 🟡 Input type phù hợp (All)

Type giúp browser chọn keyboard/autocomplete đúng.

- **Nên:** `type="email"`, `type="tel"`, `type="number"`...

```diff
+ <input type="email" />
```

- **Không nên:** Dùng `text` cho mọi loại input.

```diff
- <input type="text" />
```

---

### 8.5 🟡 Autofill support (Web)

`autocomplete` giúp autofill chính xác.

- **Nên:** Dùng giá trị `autocomplete` đúng (`email`, `name`, ...).

```diff
+ <input autocomplete="email" />
```

- **Không nên:** Tắt autofill cho mọi field.

```diff
- autocomplete="off"
```

---

### 8.6 🟡 Required indicator rõ ràng (All)

Field bắt buộc phải được đánh dấu.

- **Nên:** Thêm `*` hoặc `(bắt buộc)`.

```diff
+ <label>Email *</label>
```

- **Không nên:** Để user tự đoán field nào required.

```diff
- Label không có dấu hiệu required
```

---

### 8.7 🟡 Toggle hiển thị mật khẩu (All)

Cho phép user xem password đang nhập.

- **Nên:** Nút show/hide password.

```diff
+ <button type="button">Show</button>
```

- **Không nên:** Password luôn ẩn, dễ sai mà khó phát hiện.

```diff
- Không có show/hide
```

---

### 8.8 🔴 Submit feedback rõ ràng (All)

Sau submit, phải có trạng thái loading + success/error.

- **Nên:** Button loading và thông báo kết quả.

```diff
+ Loading -> Success message
```

- **Không nên:** Click xong không có bất kỳ phản hồi nào.

```diff
- Button click with no response
```

---

### 8.9 🟡 Input affordance (All)

Input phải nhìn giống input (border, background).

- **Nên:** Border + background nhẹ.

```diff
+ <input class="border rounded px-3 py-2" />
```

- **Không nên:** Input giống text bình thường (không border).

```diff
- Borderless inputs
```

---

## 9. Responsive & Typography

### 9.1 🟡 Mobile-first (Web)

Thiết kế cho mobile trước rồi mở rộng lên desktop.

- **Nên:** Base cho mobile, thêm `md:`/`lg:`/`xl:`.

```diff
+ text-sm md:text-base
```

- **Không nên:** Desktop-first rồi gò về mobile.

```diff
- Desktop default + max-width queries
```

---

### 9.2 🟡 Test nhiều breakpoint (Web)

Không chỉ test trên màn dev.

- **Nên:** Test 320, 375, 414, 768, 1024, 1440...

```diff
+ Multiple device testing
```

- **Không nên:** Chỉ test trên 1 kích thước.

```diff
- Single device development
```

---

### 9.3 🔴 Font size đọc được (All)

Body text trên mobile nên tối thiểu ~16px.

- **Nên:** `text-base` trở lên cho body.

```diff
+ text-base
```

- **Không nên:** `text-xs` cho nội dung chính.

```diff
- text-xs for body text
```

---

### 9.4 🔴 Viewport meta đúng (Web)

Thiếu meta viewport phá layout mobile.

- **Nên:** `width=device-width, initial-scale=1`.

```diff
+ <meta name="viewport" content="width=device-width, initial-scale=1" />
```

- **Không nên:** Không có hoặc cấu hình sai.

```diff
- No viewport meta tag
```

---

### 9.5 🔴 Tránh horizontal scroll (Web)

Content rộng hơn viewport trên mobile là dấu UX kém.

- **Nên:** `max-w-full`, `overflow-x-auto` chỉ khi thật cần.

```diff
+ max-w-full overflow-x-hidden
```

- **Không nên:** Để user phải scroll ngang để xem nội dung.

```diff
- Horizontal scrollbar on mobile
```

---

### 9.6 🟡 Image scaling (Web)

Ảnh nên scale theo container.

- **Nên:** `max-width: 100%; height: auto;`.

```diff
+ max-w-full h-auto
```

- **Không nên:** Fixed width không co theo viewport.

```diff
- width="800"
```

---

### 9.7 🟡 Table responsive (Web)

Table rộng nên có scroll ngang hoặc đổi sang card layout.

- **Nên:** Wrapper `overflow-x-auto`.

```diff
+ <div class="overflow-x-auto"><table>...</table></div>
```

- **Không nên:** Để table tràn viewport.

```diff
- Table overflows viewport
```

---

### 9.8 🟡 Line height & length (All/Web)

Đọc dễ hơn với line-height ~1.5–1.75 và line length ~65–75 ký tự.

- **Nên:** `leading-relaxed` + `max-w-prose`.

```diff
+ <p class="leading-relaxed max-w-prose">...</p>
```

- **Không nên:** `leading-none` và full-width.

```diff
- <p class="leading-none w-full">...</p>
```

---

## 10. Feedback & Content

### 10.1 🔴 Loading indicators (All)

Mọi thao tác chờ >300ms nên có loading indicator.

- **Nên:** Spinner/skeleton.

```diff
+ Skeleton or spinner
```

- **Không nên:** UI frozen.

```diff
- Frozen UI
```

---

### 10.2 🟡 Empty states hữu ích (All)

Empty state là cơ hội hướng dẫn user.

- **Nên:** Message + CTA/action.

```diff
+ No items yet. Create one!
```

- **Không nên:** Màn hình trắng.

```diff
- Empty white space
```

---

### 10.3 🟡 Error recovery (All)

User cần thấy **cách** để hồi phục sau lỗi.

- **Nên:** “Try again” + link help.

```diff
+ Try again button + help link
```

- **Không nên:** Chỉ báo lỗi rồi bỏ đó.

```diff
- Error message only
```

---

### 10.4 🟡 Progress indicator cho multi-step (All)

Flow nhiều bước nên có step indicator/progress bar.

- **Nên:** “Bước 2/4” hoặc progress bar.

```diff
+ Step 2 of 4 indicator
```

- **Không nên:** Flow nhiều bước mà user không biết còn bao nhiêu.

```diff
- No step information
```

---

### 10.5 🟡 Toast notifications (All)

Toast cho thông tin không critical nên auto-dismiss sau 3–5s.

- **Nên:** Auto-hide sau thời gian hợp lý.

```diff
+ Auto-dismiss toast
```

- **Không nên:** Toast không bao giờ biến mất.

```diff
- Persistent toast
```

---

### 10.6 🟡 Confirmation messages (All)

Hành động thành công nên được confirm nhẹ nhàng.

- **Nên:** Toast/inline message ngắn.

```diff
+ Saved successfully
```

- **Không nên:** Thành công mà không có dấu hiệu gì.

```diff
- No confirmation
```

---

### 10.7 🟡 Xử lý content dài (All)

Nội dung dài nên truncate + nút “Xem thêm”.

- **Nên:** `line-clamp` và expand.

```diff
+ line-clamp-2 with expand
```

- **Không nên:** Overflow hoặc cắt ngang xấu.

```diff
- Overflow or cut off
```

---

## 11. Onboarding, Search, Data Entry

### 11.1 🟡 Cho phép bỏ qua onboarding (All)

User nên có quyền skip tutorial.

- **Nên:** Nút **Skip** và **Back** rõ ràng.

```diff
+ Skip Tutorial button
```

- **Không nên:** Forced tour không thể bỏ qua.

```diff
- Locked overlay until finished
```

---

### 11.2 🟡 Search autocomplete (Web)

Autocomplete giúp tìm nhanh hơn.

- **Nên:** Debounced fetch + dropdown suggestion.

```diff
+ Debounced fetch + dropdown
```

- **Không nên:** Bắt user gõ full từ khóa và Enter.

```diff
- No suggestions
```

---

### 11.3 🟡 Safe “no results” (Web)

Trang no-results nên hướng dẫn user làm gì tiếp theo.

- **Nên:** Gợi ý từ khóa, link phổ biến.

```diff
+ Try searching for X instead
```

- **Không nên:** Chỉ hiển thị “0 results”.

```diff
- No results found.
```

---

### 11.4 🟢 Bulk actions (Web)

Operation lặp trên nhiều item nên có bulk edit.

- **Nên:** Checkbox + action bar.

```diff
+ Checkbox column + Action bar
```

- **Không nên:** Bắt user lặp hành động từng dòng.

```diff
- Repeated actions per row
```

---

## 12. AI Interaction

### 12.1 🔴 Rõ ràng đây là AI (All)

User cần biết đang tương tác với AI, không phải người thật.

- **Nên:** Label “AI Assistant”/“Generated by AI”.

```diff
+ AI Assistant label
```

- **Không nên:** Gắn tên người thật, không ghi rõ là AI.

```diff
- Fake human name without label
```

---

### 12.2 🟡 Streaming response (All)

Streaming text cho cảm giác phản hồi nhanh hơn.

- **Nên:** Stream từng token/đoạn text.

```diff
+ Typewriter effect
```

- **Không nên:** Spinner 10s rồi hiện nguyên khối.

```diff
- Spinner until 100% complete
```

---

### 12.3 🟢 Feedback loop (All)

AI cần feedback để cải thiện.

- **Nên:** Nút 👍/👎 hoặc “Regenerate”.

```diff
+ Feedback component
```

- **Không nên:** Chỉ output text, không cho user đánh giá.

```diff
- Read-only text
```

---

## 13. Spatial UI & Sustainability

### 13.1 🔴 Gaze hover trước khi pinch (VisionOS)

Element nên phản hồi khi user nhìn, trước khi pinch.

- **Nên:** Dùng `hoverEffect()` hoặc scale/highlight on gaze.

```diff
+ hoverEffect()
```

- **Không nên:** Chỉ phản hồi khi tap/pinch.

```diff
- onTap only
```

---

### 13.2 🟡 Depth layering (VisionOS)

UI cần chiều sâu (Z) để phân tách khỏi môi trường.

- **Nên:** Dùng glass material + z-offset.

```diff
+ .glassBackgroundEffect()
```

- **Không nên:** Panel phẳng, opaque, chặn hết view.

```diff
- bg-white full opacity panel
```

---

### 13.3 🟡 Auto-play video & sustainability (Web)

Video auto-play tốn data/điện năng.

- **Nên:** Click-to-play hoặc pause khi off-screen.

```diff
+ playsInline muted preload="none"
```

- **Không nên:** Auto-play looping video full HD.

```diff
- autoplay loop
```

---

### 13.4 🟡 Asset weight (Web/3D)

Asset 3D/ảnh nặng làm tăng footprint.

- **Nên:** Nén, lazy load, dùng Draco/GLTF, v.v.

```diff
+ Draco compression
```

- **Không nên:** Dùng raw `.obj`/texture nặng 50MB+.

```diff
- Raw .obj files
```

---

## Tóm tắt

| Nhóm           | Số guideline | Mức độ ưu tiên   |
|----------------|-------------|------------------|
| Navigation     | 6           | 🟡–🔴            |
| Animation      | 8           | 🟡–🔴            |
| Layout         | 7           | 🟡–🔴            |
| Touch          | 4           | 🟡–🔴            |
| Interaction    | 7           | 🟡–🔴            |
| Accessibility  | 7           | 🟡–🔴            |
| Performance    | 5           | 🟡–🔴            |
| Forms          | 9           | 🟡–🔴            |
| Responsive     | 8           | 🟡–🔴            |
| Feedback       | 7           | 🟡–🔴            |
| Content/Data   | 4           | 🟢–🟡            |
| Onboarding     | 1           | 🟡               |
| Search         | 2           | 🟡               |
| Data Entry     | 1           | 🟢               |
| AI Interaction | 3           | 🟢–🔴            |
| Spatial UI     | 2           | 🟡–🔴            |
| Sustainability | 2           | 🟡               |

Nguồn dữ liệu: [`ux-guidelines.csv`](https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/refs/heads/main/src/ui-ux-pro-max/data/ux-guidelines.csv) — [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill).

