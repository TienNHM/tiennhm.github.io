# Phần 4 - HTML + Tailwind Best Practices

> Nguồn: https://tiennhm.io.vn/docs/agent-skills/agent-skills-03-html-tailwind-best-practices
> Tổng hợp guideline HTML + Tailwind CSS best practices cho Agent Skills – Animation, Layout, Images, Typography, Colors, Spacing, Forms, Responsive, Buttons, Cards, Accessibility, Performance, Plugins, Interactivity, Customization.

> Tài liệu tổng hợp HTML + Tailwind CSS Best Practices dùng làm nguồn tham chiếu cho Agent Skills (ví dụ trong Cursor), bao gồm các chủ đề: Animation, Layout, Images, Typography, Colors, Spacing, Forms, Responsive, Buttons, Cards, Accessibility, Performance, Plugins, Interactivity và Customization. Mỗi guideline được đánh giá mức độ quan trọng và có ví dụ code cụ thể. Nội dung dựa trên bộ guideline từ ui-ux-pro-max-skill, giúp developers và AI Agents xây dựng UI với Tailwind CSS hiệu quả và tuân thủ best practices.

Tài liệu này tổng hợp **HTML + Tailwind CSS Best Practices** dùng làm nguồn tham chiếu cho Agent Skills (ví dụ trong Cursor).
Nội dung dựa trên bộ guideline từ [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) — file [`html-tailwind.csv`](https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/refs/heads/main/src/ui-ux-pro-max/data/stacks/html-tailwind.csv).

**Cập nhật:** 08/02/2026.

**Mức độ:** 🔴 Cao · 🟡 Trung bình · 🟢 Thấp
**Ví dụ code:** `+` nên · `-` tránh

---

## 1. Animation

### 1.1 🟡 Use Tailwind animate utilities

Ưu tiên các utility animation built-in của Tailwind (tối ưu & tôn trọng `prefers-reduced-motion`).

- **Nên:** Dùng `animate-pulse`, `animate-spin`, `animate-ping` cho hiệu ứng đơn giản.

```diff
+ <div class="animate-pulse">...</div>
```

- **Không nên:** Tự khai báo `@keyframes` cho các hiệu ứng đơn giản Tailwind đã có sẵn.

```diff
- @keyframes pulse { ... }
```

📖 [Animation – Tailwind](https://tailwindcss.com/docs/animation)

---

### 1.2 🔴 Limit bounce animations

Hiệu ứng `bounce` liên tục dễ gây mệt mỏi/motion sickness.

- **Nên:** Chỉ dùng `animate-bounce` cho 1 CTA quan trọng.

```diff
+ <button class="animate-bounce">Get started</button>
```

- **Không nên:** Đặt `animate-bounce` cho nhiều phần tử cùng lúc.

```diff
- 5+ elements with animate-bounce
```

---

### 1.3 🟡 Choose appropriate transition duration

Transition UI nên nhanh nhưng vẫn mượt, khoảng 150–300ms.

- **Nên:** Dùng `duration-150`–`duration-300` cho feedback UI.

```diff
+ <button class="transition-all duration-200 hover:bg-blue-600">Save</button>
```

- **Không nên:** Transition quá chậm cho thao tác thường ngày.

```diff
- <button class="transition-all duration-1000 hover:bg-blue-600">Save</button>
```

📖 [Transition duration](https://tailwindcss.com/docs/transition-duration)

---

### 1.4 🟢 Smooth hover transitions

Hover nên có transition thay vì “giật” màu đột ngột.

- **Nên:** Thêm `transition-*` khi có `hover:*`.

```diff
+ <a class="hover:bg-gray-100 transition-colors">Link</a>
```

- **Không nên:** Đổi màu hover mà không có transition.

```diff
- <a class="hover:bg-gray-100">Link</a>
```

---

## 2. Z-Index

### 2.1 🟡 Use Tailwind z-* scale

Giữ `z-index` theo scale chuẩn của Tailwind để dễ kiểm soát stacking.

- **Nên:** Dùng `z-0`, `z-10`, `z-20`, `z-30`, `z-40`, `z-50`.

```diff
+ <div class="fixed z-50">Modal</div>
```

- **Không nên:** Dùng giá trị tuỳ ý như `z-[9999]` cho mọi thứ.

```diff
- <div class="fixed z-[9999]">Modal</div>
```

📖 [Z-Index](https://tailwindcss.com/docs/z-index)

---

### 2.2 🔴 Fixed elements need explicit z-index

Navbar, modal, dropdown cố định phải set `z-index` rõ ràng.

- **Nên:** Đặt `z-50` cho nav, `z-40` cho dropdown, v.v.

```diff
+ <header class="fixed top-0 inset-x-0 z-50">...</header>
```

- **Không nên:** Dựa vào DOM order, không set `z-index`.

```diff
- <header class="fixed top-0 inset-x-0">...</header>
```

---

### 2.3 🟢 Use negative z-index for backgrounds

Background trang trí nên nằm phía sau content bằng negative z-index.

- **Nên:** Dùng `-z-10` / `z-[-1]` cho layer nền.

```diff
+ <div class="absolute inset-0 -z-10">Background</div>
```

- **Không nên:** Dùng `z-10` cho background rồi phải “đè” mọi thứ khác lên.

```diff
- <div class="absolute inset-0 z-10">Background</div>
``>

---

## 3. Layout

### 3.1 🟡 Container max-width for readability

Nội dung chính nên giới hạn chiều rộng để dễ đọc.

- **Nên:** Dùng `max-w-7xl mx-auto` (kèm `px` responsive) cho vùng content.

```diff
+ <main class="max-w-7xl mx-auto px-4">...</main>
```

- **Không nên:** Để `w-full` full-width trên màn hình rất rộng.

```diff
- <main class="w-full">...</main>
```

📖 [Container](https://tailwindcss.com/docs/container)

---

### 3.2 🟡 Responsive padding

Padding nên thay đổi theo breakpoint để phù hợp từng màn hình.

- **Nên:** Kết hợp `px-4 sm:px-6 lg:px-8` (hoặc tương tự).

```diff
+ <div class="px-4 sm:px-6 lg:px-8">...</div>
```

- **Không nên:** Dùng một padding cố định cho mọi kích thước.

```diff
- <div class="px-8">...</div>
```

---

### 3.3 🟡 Use grid/flex gaps, not margins

Khoảng cách trong grid/flex nên dùng `gap-*` thay vì margin từng item.

- **Nên:** Dùng `gap-4`, `gap-6`, `gap-8`.

```diff
+ <div class="grid gap-6">...</div>
```

- **Không nên:** Set `mb-*` trên từng phần tử để tạo khoảng cách.

```diff
- <div class="grid">
-   <div class="mb-4">...</div>
-   <div class="mb-4">...</div>
- </div>
```

📖 [Gap](https://tailwindcss.com/docs/gap)

---

### 3.4 🟢 Flexbox for alignment

Canh hàng ngang/dọc nên dùng flex utility thay vì nhiều wrapper.

- **Nên:** Dùng `flex items-center justify-between`.

```diff
+ <div class="flex items-center justify-between">...</div>
```

- **Không nên:** Tạo nhiều `` lồng nhau chỉ để căn giữa.

```diff
- <div>
-   <div class="flex items-center">
-     <div class="justify-between">...</div>
-   </div>
- </div>
```

---

### 3.5 🟡 Container queries for component-based layout

Dùng container queries cho layout phụ thuộc container, không chỉ viewport.

- **Nên:** Sử dụng `@container` + utility `@lg:` cho component phức tạp.

```diff
+ <section class="@container">
+   <div class="grid gap-6 @lg:grid-cols-2">...</div>
+ </section>
```

- **Không nên:** Viết media query thủ công trong từng component.

```diff
- @media (min-width: 1024px) {
-   .card-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
- }
```

📖 [Container queries plugin](https://github.com/tailwindlabs/tailwindcss-container-queries)

---

## 4. Images

### 4.1 🟡 Maintain aspect ratio

Giữ tỉ lệ ảnh nhất quán để layout ổn định.

- **Nên:** Dùng `aspect-video`, `aspect-square` cho wrapper ảnh.

```diff
+ <div class="aspect-video rounded-lg overflow-hidden">
+   <img src="..." class="w-full h-full object-cover" />
+ </div>
```

- **Không nên:** Bỏ trống aspect ratio dẫn đến layout nhảy.

```diff
- <img src="..." class="w-full" />
```

📖 [Aspect ratio](https://tailwindcss.com/docs/aspect-ratio)

---

### 4.2 🟡 Use object-fit correctly

Tránh ảnh bị méo bằng `object-cover` hoặc `object-contain`.

- **Nên:** Cho ảnh full container mà không méo.

```diff
+ <img src="..." class="w-full h-full object-cover" />
```

- **Không nên:** Đặt `w-full h-full` mà không có `object-*`.

```diff
- <img src="..." class="w-full h-full" />
```

📖 [Object fit](https://tailwindcss.com/docs/object-fit)

---

### 4.3 🔴 Lazy load off-screen images

Ảnh ngoài viewport nên lazy load để tối ưu hiệu năng.

- **Nên:** Thêm `loading="lazy"` cho ảnh không ở trên fold.

```diff
+ <img src="..." alt="..." loading="lazy" />
```

- **Không nên:** Để toàn bộ ảnh eager load mặc định.

```diff
- <img src="..." alt="..." />
```

---

### 4.4 🔴 Use responsive images

Serve kích thước ảnh phù hợp từng thiết bị bằng `srcset`/`sizes`.

- **Nên:** Cung cấp nhiều kích thước trong `srcset`.

```diff
+ <img
+   src="image-800.jpg"
+   srcset="image-400.jpg 400w, image-800.jpg 800w, image-1600.jpg 1600w"
+   sizes="(min-width: 1024px) 800px, 100vw"
+   loading="lazy"
+ />
```

- **Không nên:** Dùng một ảnh 4000px cho mọi thiết bị.

```diff
- <img src="image-4000.jpg" />
```

---

### 4.5 🔴 SVG explicit dimensions

SVG nên có `width`/`height` rõ ràng để tránh layout shift khi CSS chưa load.

- **Nên:** Đặt `width`/`height` song song với utility `size-*`.

```diff
+ <svg class="size-6" width="24" height="24">...</svg>
```

- **Không nên:** Chỉ rely vào class mà không set attribute.

```diff
- <svg class="size-6">...</svg>
```

---

## 5. Typography

### 5.1 🟡 Use typography (prose) plugin for rich text

Nội dung dạng bài viết/markdown nên dùng plugin `@tailwindcss/typography`.

- **Nên:** Dùng `prose` + `prose-lg` cho content.

```diff
+ <article class="prose prose-lg max-w-none">...</article>
```

- **Không nên:** Tự style từng thẻ `p`, `h1`, `ul` thủ công.

```diff
- Custom text styling cho từng element
```

📖 [Typography plugin](https://tailwindcss.com/docs/typography-plugin)

---

### 5.2 🟡 Use comfortable line-height

Line-height hợp lý (~1.6) giúp text dễ đọc.

- **Nên:** Dùng `leading-relaxed` cho body text.

```diff
+ <p class="leading-relaxed">...</p>
```

- **Không nên:** Dùng line-height quá sát như `leading-none` hoặc `leading-tight`.

```diff
- <p class="leading-none">...</p>
```

📖 [Line height](https://tailwindcss.com/docs/line-height)

---

### 5.3 🟢 Use Tailwind font size scale

Giữ consistent bằng scale `text-sm`, `text-base`, `text-lg`, `text-xl`, ...

- **Nên:** Dùng lớp size chuẩn.

```diff
+ <p class="text-lg">...</p>
```

- **Không nên:** Dùng arbitrary size như `text-[17px]` nếu không thật cần.

```diff
- <p class="text-[17px]">...</p>
```

📖 [Font size](https://tailwindcss.com/docs/font-size)

---

### 5.4 🟡 Handle long text with truncation

Text dài phải có cơ chế truncate/line-clamp để không phá layout.

- **Nên:** Dùng `truncate` hoặc `line-clamp-*`.

```diff
+ <p class="line-clamp-2">Very long title...</p>
```

- **Không nên:** Để text overflow và đẩy vỡ layout.

```diff
- <p>Very very very very very long title...</p>
```

📖 [Text overflow](https://tailwindcss.com/docs/text-overflow)

---

## 6. Colors

### 6.1 🟢 Use opacity utilities

Ưu tiên `bg-black/50`, `text-white/80` thay vì class opacity riêng.

- **Nên:** Dùng slash opacity trên màu.

```diff
+ <div class="bg-black/50 text-white/80">...</div>
```

- **Không nên:** Dùng `opacity-50` chung cho cả element.

```diff
- <div class="bg-black opacity-50">...</div>
```

📖 [Background color](https://tailwindcss.com/docs/background-color)

---

### 6.2 🟡 Support dark mode

Dark mode nên được hỗ trợ bằng prefix `dark:`.

- **Nên:** Thêm các biến thể `dark:*` tương ứng.

```diff
+ <div class="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">...</div>
```

- **Không nên:** Chỉ làm theme sáng, bỏ qua dark mode.

```diff
- <div class="bg-white text-gray-900">...</div>
```

📖 [Dark mode](https://tailwindcss.com/docs/dark-mode)

---

### 6.3 🟡 Use semantic colors in config

Màu nên đặt tên theo semantics (`primary`, `danger`...) thay vì màu cụ thể.

- **Nên:** Dùng `bg-primary`, `text-success`.

```diff
+ <button class="bg-primary text-white">...</button>
```

- **Không nên:** Dùng `bg-blue-500` hard-code ở mọi nơi.

```diff
- <button class="bg-blue-500 text-white">...</button>
```

---

### 6.4 🟡 Theme color variables in Tailwind theme

Khai báo màu trong `theme.colors` và dùng trực tiếp, tránh trộn với CSS var.

- **Nên:** Dùng màu từ theme Tailwind.

```diff
+ <div class="bg-primary text-success">...</div>
```

- **Không nên:** Dùng `bg-[var(--color-primary)]` khắp nơi nếu màu đã có trong theme.

```diff
- <div class="bg-[var(--color-primary)]">...</div>
```

📖 [Customizing colors](https://tailwindcss.com/docs/customizing-colors)

---

### 6.5 🟡 Use bg-linear-to-* for gradients (Tailwind v4+)

Tailwind v4 đổi syntax gradient sang `bg-linear-to-*`.

- **Nên:** Dùng syntax mới `bg-linear-to-r`, `bg-linear-to-b`, ...

```diff
+ <div class="bg-linear-to-r from-blue-500 to-purple-500">...</div>
```

- **Không nên:** Dùng `bg-gradient-to-*` đã deprecated trong v4.

```diff
- <div class="bg-gradient-to-r from-blue-500 to-purple-500">...</div>
```

📖 [Background image](https://tailwindcss.com/docs/background-image)

---

## 7. Spacing

### 7.1 🟢 Use Tailwind spacing scale

Spacing nên dùng scale chuẩn (`1, 1.5, 2, 2.5, 3, 4, ...`).

- **Nên:** Dùng `p-4`, `m-6`, `gap-8`.

```diff
+ <div class="p-4 m-6 gap-8">...</div>
```

- **Không nên:** Dùng giá trị pixel arbitrary nếu không bắt buộc.

```diff
- <div class="p-[15px]">...</div>
```

📖 [Spacing](https://tailwindcss.com/docs/customizing-spacing)

---

### 7.2 🟡 Use negative margins sparingly

Negative margin chỉ nên dùng cho effect overlap có chủ đích.

- **Nên:** Dùng `-mt-4` cho card overlap nhẹ.

```diff
+ <div class="-mt-4">...</div>
```

- **Không nên:** Dùng negative margin để “chữa cháy” layout hỏng.

```diff
- <div class="-m-2">...</div>
```

---

### 7.3 🟢 Use space-y-* for vertical lists

Danh sách dọc nên dùng `space-y-*` thay vì margin từng item.

- **Nên:** Áp dụng `space-y-4` cho container.

```diff
+ <ul class="space-y-4">
+   <li>Item 1</li>
+   <li>Item 2</li>
+ </ul>
```

- **Không nên:** Thêm `mb-*` từng child.

```diff
- <ul>
-   <li class="mb-4">Item 1</li>
-   <li class="mb-4">Item 2</li>
- </ul>
```

📖 [Space between](https://tailwindcss.com/docs/space)

---

## 8. Forms

### 8.1 🔴 Always show focus states

Input, button phải có focus rõ ràng và accessible.

- **Nên:** Dùng `focus:ring-2` + `focus:ring-*`.

```diff
+ <input class="focus:ring-2 focus:ring-blue-500 focus:outline-none" />
```

- **Không nên:** Tắt focus outline mà không thay thế.

```diff
- <input class="focus:outline-none" />
```

📖 [Forms plugin / focus states](https://tailwindcss.com/docs/hover-focus-and-other-states)

---

### 8.2 🟡 Consistent input sizing

Các input trong form nên có chiều cao/padding đồng nhất.

- **Nên:** Dùng `h-10 px-3` và `w-full` khi cần.

```diff
+ <input class="h-10 w-full px-3" />
```

- **Không nên:** Mỗi input một kích thước.

```diff
- <input class="h-8 px-2" />
- <input class="h-12 px-4" />
```

---

### 8.3 🟡 Clear disabled states

Trạng thái disabled phải dễ nhận biết.

- **Nên:** Dùng `disabled:opacity-50 disabled:cursor-not-allowed`.

```diff
+ <button class="disabled:opacity-50 disabled:cursor-not-allowed" disabled>Submit</button>
```

- **Không nên:** Disabled nhưng nhìn như enabled.

```diff
- <button disabled>Submit</button>
```

---

### 8.4 🟢 Placeholder styling

Placeholder nên nhạt hơn text chính.

- **Nên:** Dùng `placeholder:text-gray-400`.

```diff
+ <input class="placeholder:text-gray-400" placeholder="Search..." />
```

- **Không nên:** Để placeholder đậm như text thường.

```diff
- <input placeholder="Search..." />
```

---

## 9. Responsive

### 9.1 🟡 Mobile-first approach

Tailwind là mobile-first – style base cho mobile, thêm breakpoint cho màn lớn.

- **Nên:** Định nghĩa base cho mobile, thêm `md:`, `lg:`, `xl:`.

```diff
+ <p class="text-sm md:text-base">...</p>
```

- **Không nên:** Thiết kế desktop trước rồi “gò” về mobile.

```diff
- <p class="text-base max-md:text-sm">...</p>
```

📖 [Responsive design](https://tailwindcss.com/docs/responsive-design)

---

### 9.2 🔴 Test at standard breakpoints

Phải test layout tại các breakpoint phổ biến.

- **Nên:** Test ở 320, 375, 768, 1024, 1280, 1536 (hoặc tương đương).

```diff
+ Test all breakpoints
```

- **Không nên:** Chỉ test trên 1 thiết bị dev.

```diff
- Single device testing
```

---

### 9.3 🟢 Control visibility with hidden/shown utilities

Dùng `hidden`, `block`, `flex` theo breakpoint thay vì 2 version component.

- **Nên:** Dùng `hidden md:block`, `md:hidden`...

```diff
+ <div class="hidden md:block">Desktop nav</div>
```

- **Không nên:** Tạo 2 component hoàn toàn khác nhau cho mobile/desktop nếu không cần.

```diff
- Separate mobile/desktop components với cùng nội dung
```

📖 [Display](https://tailwindcss.com/docs/display)

---

## 10. Buttons

### 10.1 🟡 Consistent button sizing

Button nên có padding/size nhất quán trong toàn hệ thống.

- **Nên:** Dùng patterns như `px-4 py-2` hoặc `px-6 py-3`.

```diff
+ <button class="px-4 py-2 text-sm">Primary</button>
```

- **Không nên:** Mỗi button mỗi size tuỳ hứng.

```diff
- <button class="px-2 py-1 text-xs">...</button>
- <button class="px-6 py-4 text-lg">...</button>
```

---

### 10.2 🔴 Touch targets >= 44px

Trên mobile, target bấm tối thiểu ~44px.

- **Nên:** Dùng `min-h-[44px] min-w-[44px]` cho touch targets.

```diff
+ <button class="min-h-[44px] min-w-[44px]">...</button>
```

- **Không nên:** Button quá nhỏ khó bấm.

```diff
- <button class="h-8 w-8">...</button>
```

---

### 10.3 🔴 Show loading states

Action async nên có trạng thái loading rõ ràng.

- **Nên:** Disable button + hiển thị spinner khi loading.

```diff
+ <button disabled class="disabled:opacity-50">
+   <Spinner class="mr-2" /> Saving...
+ </button>
```

- **Không nên:** Cho phép click nhiều lần khi đang loading.

```diff
- <button>Save</button>
```

---

### 10.4 🔴 Accessible icon buttons

Button chỉ có icon phải có `aria-label`.

- **Nên:** Thêm label ẩn cho screen reader.

```diff
+ <button aria-label="Close">
+   <XIcon />
+ </button>
```

- **Không nên:** Icon button không label.

```diff
- <button><XIcon /></button>
```

---

## 11. Cards

### 11.1 🟢 Consistent card structure

Cards nên share cùng style base (border, shadow, radius...).

- **Nên:** Dùng pattern như `rounded-lg shadow-md p-6`.

```diff
+ <div class="rounded-lg shadow-md p-6">...</div>
```

- **Không nên:** Mỗi card một style riêng khó maintain.

```diff
- <div class="rounded-2xl shadow-lg p-6">...</div>
```

---

### 11.2 🟡 Card hover states for interactivity

Card clickable nên có hover feedback rõ ràng.

- **Nên:** Dùng `hover:shadow-lg transition-shadow`.

```diff
+ <article class="rounded-lg shadow-md hover:shadow-lg transition-shadow">...</article>
```

- **Không nên:** Card có click mà không có hover state.

```diff
- <article class="rounded-lg shadow-md cursor-pointer">...</article>
```

---

### 11.3 🟢 Consistent internal card spacing

Spacing bên trong card nên đồng nhất (`space-y-*`).

- **Nên:** Dùng `space-y-4` cho nội dung card.

```diff
+ <div class="p-6 space-y-4">...</div>
```

- **Không nên:** Mỗi block trong card một `mb-*` khác nhau.

```diff
- <div class="p-6">
-   <h3 class="mb-2">...</h3>
-   <p class="mb-6">...</p>
-   <button class="mb-3">...</button>
- </div>
```

---

## 12. Accessibility

### 12.1 🔴 Screen reader text

Icon/element không text vẫn cần context cho screen reader.

- **Nên:** Dùng `sr-only` cho label ẩn.

```diff
+ <button>
+   <XIcon />
+   <span class="sr-only">Close menu</span>
+ </button>
```

- **Không nên:** Icon button không label.

```diff
- <button><XIcon /></button>
```

📖 [Screen readers](https://tailwindcss.com/docs/screen-readers)

---

### 12.2 🟡 Use focus-visible

Chỉ hiển thị focus ring cho keyboard user (`focus-visible`).

- **Nên:** Dùng `focus-visible:ring-2`.

```diff
+ <button class="focus-visible:ring-2 focus-visible:ring-blue-500">...</button>
```

- **Không nên:** Dùng `focus:ring-2` khiến click chuột cũng hiện ring.

```diff
- <button class="focus:ring-2 focus:ring-blue-500">...</button>
```

---

### 12.3 🔴 Respect reduced motion

Phải tôn trọng `prefers-reduced-motion` để giảm/loại bỏ animation.

- **Nên:** Dùng `motion-reduce:animate-none` cho element animated.

```diff
+ <div class="animate-spin motion-reduce:animate-none">...</div>
```

- **Không nên:** Bỏ qua hoàn toàn `prefers-reduced-motion`.

```diff
- No reduced motion support
```

📖 [Reduced motion](https://tailwindcss.com/docs/hover-focus-and-other-states#prefers-reduced-motion)

---

## 13. Performance

### 13.1 🔴 Configure Tailwind content paths

Tailwind cần `content` đúng để tree-shake class không dùng.

- **Nên:** Cấu hình `content` chuẩn trong `tailwind.config`.

```diff
+ content: ['./src/**/*.{js,ts,jsx,tsx}']
```

- **Không nên:** Dùng `purge` (v2) hoặc config sai khiến CSS phình to.

```diff
- purge: [...]
```

📖 [Content configuration](https://tailwindcss.com/docs/content-configuration)

---

### 13.2 🟡 Use JIT mode (Tailwind v3+)

Tailwind v3 đã dùng JIT mặc định – giữ version/cấu hình mới.

- **Nên:** Dùng Tailwind v3+ với JIT.

```diff
+ Tailwind v3 defaults
```

- **Không nên:** Dùng Tailwind v2 không bật JIT.

```diff
- Tailwind v2 without JIT
```

---

### 13.3 🟢 Avoid @apply bloat

`@apply` hữu ích nhưng lạm dụng sẽ khó tracking style.

- **Nên:** Dùng utility trực tiếp trong HTML cho case đơn giản.

```diff
+ <button class="px-4 py-2 rounded">...</button>
```

- **Không nên:** Tạo class với `@apply` cho mọi thứ nhỏ lẻ.

```diff
- .btn { @apply px-4 py-2 rounded; }
```

📖 [Reusing styles](https://tailwindcss.com/docs/reusing-styles)

---

## 14. Plugins & Customization

### 14.1 🟡 Prefer official Tailwind plugins

Forms/typography/aspect-ratio nên dùng plugin chính thức.

- **Nên:** Thêm plugin vào `tailwind.config.js`.

```diff
+ plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
```

- **Không nên:** Tự viết reset/style form/typography từ đầu nếu không cần.

```diff
- Custom form reset CSS toàn bộ
```

📖 [Plugins](https://tailwindcss.com/docs/plugins)

---

### 14.2 🟡 Create custom utilities for repeated patterns

Pattern lặp lại nhiều lần nên được trừu tượng hoá thành utility.

- **Nên:** Tạo utility trong config (vd shadow custom).

```diff
+ boxShadow: {
+   soft: '0 4px 20px rgba(0,0,0,0.1)',
+ }
```

- **Không nên:** Dùng arbitrary value giống nhau ở nhiều chỗ.

```diff
- class="shadow-[0_4px_20px_rgba(0,0,0,0.1)]" lặp lại khắp nơi
```

---

### 14.3 🟢 Use arbitrary values when needed

Arbitrary values (`[]`) phù hợp cho one-off đặc biệt.

- **Nên:** Dùng `w-[350px]` khi thực sự cần kích thước riêng.

```diff
+ <div class="w-[350px]">...</div>
```

- **Không nên:** Viết inline style cho mọi giá trị đặc biệt.

```diff
- <div style="top: 117px">...</div>
```

📖 [Arbitrary values](https://tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values)

---

## 15. Interactivity

### 15.1 🟢 Use group and peer utilities

Các state đơn giản nên dùng `group-*`, `peer-*` thay vì JS.

- **Nên:** Dùng `group-hover`, `peer-checked` để style theo parent/sibling.

```diff
+ <button class="group">
+   <span class="group-hover:text-blue-500">Hover me</span>
+ </button>
```

- **Không nên:** Dùng JS `onMouseEnter` chỉ để đổi màu text.

```diff
- onMouseEnter={() => setHover(true)}
```

📖 [Styling based on parent state](https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-parent-state)

---

## 16. Modern Layout Shorthands

### 16.1 🟢 Use shrink-0 shorthand

`shrink-0` là shorthand cho `flex-shrink-0`, gọn gàng hơn.

- **Nên:** Dùng `shrink-0` trong flex container.

```diff
+ <div class="shrink-0">...</div>
```

- **Không nên:** Dùng cả `flex-shrink-0` + `flex-shrink`.

```diff
- <div class="flex-shrink-0">...</div>
```

📖 [Flex shrink](https://tailwindcss.com/docs/flex-shrink)

---

### 16.2 🟢 Use size-* for square dimensions

`size-*` set cùng lúc `width` + `height` cho element vuông.

- **Nên:** Dùng `size-6`, `size-8` cho icon/avatar vuông.

```diff
+ <div class="size-6 rounded-full bg-blue-500"></div>
```

- **Không nên:** Lặp `h-*` + `w-*` cho cùng một giá trị.

```diff
- <div class="h-6 w-6 rounded-full bg-blue-500"></div>
```

📖 [Size](https://tailwindcss.com/docs/size)

---

## Tóm tắt

| Nhóm           | Số guideline | Mức độ ưu tiên   |
|---------------|-------------|------------------|
| Animation     | 4           | 🟡–🔴            |
| Z-Index       | 3           | 🟢–🔴            |
| Layout        | 5           | 🟢–🟡            |
| Images        | 5           | 🟡–🔴            |
| Typography    | 4           | 🟢–🟡            |
| Colors        | 5           | 🟡               |
| Spacing       | 3           | 🟢–🟡            |
| Forms         | 4           | 🟢–🔴            |
| Responsive    | 3           | 🟢–🔴            |
| Buttons       | 4           | 🟡–🔴            |
| Cards         | 3           | 🟢–🟡            |
| Accessibility | 3           | 🟡–🔴            |
| Performance   | 3           | 🟢–🔴            |
| Plugins       | 3           | 🟢–🟡            |
| Interactivity | 1           | 🟢               |
| Layout misc   | 2           | 🟢               |

Nguồn dữ liệu: [`html-tailwind.csv`](https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/refs/heads/main/src/ui-ux-pro-max/data/stacks/html-tailwind.csv) — [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill).
