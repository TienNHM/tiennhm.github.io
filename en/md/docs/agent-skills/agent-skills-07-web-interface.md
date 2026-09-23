# Phần 6 - Web Interface Best Practices

> Nguồn: https://tiennhm.io.vn/en/docs/agent-skills/agent-skills-07-web-interface
> Tổng hợp web interface best practices cho Agent Skills – Accessibility, Focus, Forms, State & URL, Performance, Typography, Anti-patterns.

> Tài liệu tổng hợp Web Interface Best Practices dùng làm nguồn tham chiếu cho Agent Skills (ví dụ trong Cursor), bao gồm các chủ đề: Accessibility, Focus management, Forms, State & URL management, Performance optimization, Typography và Anti-patterns. Mỗi guideline được đánh giá mức độ quan trọng (Critical/High/Medium/Low) và có ví dụ code cụ thể. Nội dung dựa trên web-interface.csv từ ui-ux-pro-max-skill, giúp developers và AI Agents xây dựng web interface hiệu quả, accessible và performant.

Tài liệu này tổng hợp **Web Interface Best Practices** dùng làm nguồn tham chiếu cho Agent Skills (ví dụ trong Cursor).
Nội dung dựa trên bộ dữ liệu [`web-interface.csv`](https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/refs/heads/main/src/ui-ux-pro-max/data/web-interface.csv) từ [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill).

**Cập nhật:** 08/02/2026.

**Mức độ:** 🔴 Critical/High · 🟡 Medium · 🟢 Low
**Ví dụ code:** `+` nên · `-` tránh

---

## 1. Accessibility

### 1.1 🔴 Icon buttons phải có accessible name

Button chỉ có icon nếu không có label sẽ **không đọc được với screen reader**.

- **Nên:** Dùng `aria-label` mô tả hành động.

```diff
+ <button aria-label="Close">
+   <XIcon />
+ </button>
```

- **Không nên:** Icon button không có label.

```diff
- <button>
-   <XIcon />
- </button>
```

---

### 1.2 🔴 Form control luôn có label

Input không label chỉ rely vào placeholder là **không accessible**.

- **Nên:** Dùng `` với `for`/`id` hoặc `aria-label`.

```diff
+ <label for="email">Email</label>
+ <input id="email" type="email" />
```

- **Không nên:** Input chỉ có placeholder.

```diff
- <input type="email" placeholder="Email" />
```

---

### 1.3 🔴 Interactive element hỗ trợ keyboard

Div click-only không thể focus/trigger bằng keyboard.

- **Nên:** Thêm `onKeyDown` + `tabIndex={0}` hoặc dùng semantic element.

```diff
+ <div onClick={fn} onKeyDown={fn} tabIndex={0}>
+   Clickable
+ </div>
```

- **Không nên:** Chỉ handle click chuột.

```diff
- <div onClick={fn}>Clickable</div>
```

---

### 1.4 🔴 Ưu tiên semantic HTML hơn ARIA

`button`, `a`, `label`... có behavior + accessibility built-in.

- **Nên:** Dùng semantic element trước khi thêm ARIA.

```diff
+ <button onClick={fn}>Submit</button>
```

- **Không nên:** Dùng `div` + `role` thay vì button thực sự.

```diff
- <div role="button" onClick={fn}>Submit</div>
```

---

### 1.5 🟡 Dùng aria-live cho async status

Status async (tải xong, lỗi, saved...) cần được **announce** cho screen reader.

- **Nên:** Bọc status trong container `aria-live`.

```diff
+ <div aria-live="polite">{status}</div>
```

- **Không nên:** Chỉ update UI visual, không aria-live.

```diff
- <div>{status}</div>
```

---

### 1.6 🟡 Ẩn icon trang trí khỏi screen reader

Icon purely decorative không nên được đọc là “image”.

- **Nên:** Thêm `aria-hidden="true"` hoặc `role="presentation"`.

```diff
+ <Icon aria-hidden="true" />
```

- **Không nên:** Để icon không có aria, bị đọc vô nghĩa.

```diff
- <Icon />
```

---

## 2. Focus & Keyboard

### 2.1 🔴 Focus state luôn hiển thị rõ

Interactive elements phải có focus state dễ thấy, nhất là cho keyboard user.

- **Nên:** Dùng `:focus-visible` với ring/outline rõ.

```diff
+ class="focus-visible:ring-2 focus-visible:ring-blue-500"
```

- **Không nên:** Không có bất kỳ focus style nào.

```diff
- outline: none; /* không thay thế */
```

---

### 2.2 🔴 Không xoá outline nếu không thay thế

`outline: none` mà không thêm ring/box-shadow là **anti-pattern**.

- **Nên:** Kết hợp `outline-none` với ring/box-shadow visible.

```diff
+ class="focus:outline-none focus:ring-2 focus:ring-blue-500"
```

- **Không nên:** Dùng `outline-none` một mình.

```diff
- class="focus:outline-none"
```

---

### 2.3 🟡 Checkbox/radio có vùng hit lớn

Checkbox nhỏ khó click nếu không gắn label tương ứng.

- **Nên:** Wrap input + label trong cùng `` tăng vùng click.

```diff
+ <label class="flex gap-2 cursor-pointer">
+   <input type="checkbox" />
+   <span>Option</span>
+ </label>
```

- **Không nên:** Input và label tách rời, hit target chỉ là ô nhỏ.

```diff
- <input type="checkbox" id="opt" />
- <label for="opt">Option</label>
```

---

## 3. Forms

### 3.1 🔴 Autocomplete cho input quan trọng

Autofill giúp user nhập nhanh, giảm lỗi.

- **Nên:** Gán `autocomplete` đúng (`email`, `name`, `new-password`, ...).

```diff
+ <input autocomplete="email" type="email" />
```

- **Không nên:** Bỏ trống `autocomplete` cho field thường dùng.

```diff
- <input type="email" />
```

---

### 3.2 🟡 Dùng input type semantic

Type đúng giúp browser chọn keyboard, validation, autofill phù hợp.

- **Nên:** `type="email"`, `tel`, `url`, `number`...

```diff
+ <input type="email" />
```

- **Không nên:** Dùng `text` cho mọi loại input.

```diff
- <input type="text" /> <!-- email -->
```

---

### 3.3 🔴 Không block paste (password/code)

Chặn paste làm hại UX, nhất là password manager / mã OTP.

- **Nên:** Cho phép paste bình thường.

```diff
+ <input type="password" />
```

- **Không nên:** Ngăn `onPaste` trên input.

```diff
- <input onPaste={e => e.preventDefault()} />
```

---

### 3.4 🟢 Tắt spellcheck cho email/code

Spellcheck gạch đỏ email, code, ID làm user bối rối.

- **Nên:** `spellCheck="false"` cho field kỹ thuật.

```diff
+ <input spellCheck="false" type="email" />
```

- **Không nên:** Để spellcheck default cho email/code.

```diff
- <input type="email" />
```

---

### 3.5 🟡 Submit feedback đúng cách

Khi submit, UX tốt là hiển thị loading nhưng vẫn cho phép resubmit nếu lỗi.

- **Nên:** Show spinner trong button, không nhất thiết disable cứng.

```diff
+ <button>
+   {loading ? <Spinner /> : 'Submit'}
+ </button>
```

- **Không nên:** Disable hoàn toàn button và không có feedback rõ.

```diff
- <button disabled={loading}>Submit</button>
```

---

### 3.6 🔴 Inline error gần field

Error ở top form khó liên kết với field nào bị lỗi.

- **Nên:** Hiển thị lỗi ngay dưới input, focus vào error đầu tiên.

```diff
+ <input />
+ <span class="text-red-500 text-sm">{error}</span>
```

- **Không nên:** Gom tất cả lỗi ở đầu form.

```diff
- <div class="error">{allErrors}</div>
```

---

## 4. Performance

### 4.1 🔴 Virtualize list lớn (>50 items)

Render hàng trăm/thousands DOM nodes gây lag.

- **Nên:** Dùng virtual list cho dataset lớn.

```diff
+ <VirtualList items={items} />
```

- **Không nên:** `items.map()` render toàn bộ.

```diff
- items.map(item => <Item key={item.id} />)
```

---

### 4.2 🟡 Tránh layout read trong render

`getBoundingClientRect` trong render gây layout thrash.

- **Nên:** Đọc layout trong `useEffect` hoặc event handlers.

```diff
+ useEffect(() => {
+   const rect = el.getBoundingClientRect();
+ }, []);
```

- **Không nên:** Gọi layout read ngay trong render.

```diff
- const rect = el.getBoundingClientRect(); // trong render
```

---

### 4.3 🟡 Batch DOM read/write

Xen kẽ đọc/ghi DOM liên tục gây reflow nhiều lần.

- **Nên:** Gom writes rồi mới reads (hoặc ngược lại).

```diff
+ writes.forEach(w => w());
+ reads.forEach(r => r());
```

- **Không nên:** Viết/đọc xen kẽ.

```diff
- write(); read(); write(); read();
```

---

### 4.4 🟢 Preconnect tới CDN

Preconnect giảm latency kết nối tới CDN.

- **Nên:** Thêm `` với domain quan trọng.

```diff
+ <link rel="preconnect" href="https://cdn.example.com" />
```

- **Không nên:** Không dùng bất kỳ resource hint nào.

```diff
- // no preconnect hint
```

---

### 4.5 🟡 Lazy load ảnh dưới fold

Ảnh ngoài viewport nên lazy để tiết kiệm bandwidth.

- **Nên:** `loading="lazy"` cho ảnh không ở trên fold.

```diff
+ <img loading="lazy" src="..." alt="..." />
```

- **Không nên:** Tất cả ảnh load eager.

```diff
- <img src="..." alt="..." />
```

---

## 5. State & URL

### 5.1 🔴 URL phản ánh state UI quan trọng

Filter, tab, pagination... nên sync với URL để share/refresh không mất state.

- **Nên:** Encode state vào query/hash.

```diff
+ ?tab=settings&page=2
```

- **Không nên:** Chỉ giữ state trong `useState`/memory.

```diff
- useState only // lost on refresh
```

---

### 5.2 🟡 Hỗ trợ deep linking

User nên có thể share direct link tới view hiện tại.

- **Nên:** `router.push` với query tương ứng.

```diff
+ router.push({ query: { ...filters } })
```

- **Không nên:** Cập nhật state mà không đụng URL.

```diff
- setFilters(f) // not in URL
```

---

### 5.3 🔴 Confirm trước hành động destructive

Delete/irreversible actions luôn cần xác nhận.

- **Nên:** Modal/confirm trước khi delete.

```diff
+ if (confirm('Delete?')) delete();
```

- **Không nên:** Xoá ngay khi click.

```diff
- onClick={delete}
```

---

## 6. Typography & Text

### 6.1 🟢 Dùng Unicode đúng (ellipsis, quotes, dashes)

`...` không phải ellipsis chuẩn; quote/dash cũng vậy.

- **Nên:** Dùng kí tự Unicode đúng (`…`, “ ”, —).

```diff
+ 'Hello…'
```

- **Không nên:** ASCII approximation cho UI text.

```diff
- 'Hello...'
```

---

### 6.2 🟡 Xử lý text overflow

Text dài không nên phá vỡ layout.

- **Nên:** `truncate`, `line-clamp`, `break-words`.

```diff
+ <p class="truncate">Long text...</p>
```

- **Không nên:** Để text overflow container.

```diff
- <p>Long text...</p>
```

---

### 6.3 🟢 Non-breaking spaces cho unit/brand

Không nên để số và đơn vị/brand xuống dòng khác nhau.

- **Nên:** Dùng `&nbsp;` hoặc `\u00A0`.

```diff
+ 10&nbsp;kg
+ Next.js&nbsp;14
```

- **Không nên:** Để browser tự wrap.

```diff
- 10 kg
```

---

## 7. Anti-patterns quan trọng

### 7.1 🔴 Không disable zoom trong viewport meta

Cấm zoom là vi phạm accessibility.

- **Nên:** Cho phép user zoom (không đặt `maximum-scale=1`).

```diff
+ <meta name="viewport" content="width=device-width" />
```

- **Không nên:** Chặn hoàn toàn zoom/pinch.

```diff
- <meta name="viewport" content="maximum-scale=1" />
```

---

### 7.2 🟡 Tránh `transition: all`

`transition: all` dễ gây bug và tốn hiệu năng.

- **Nên:** Transition property cụ thể (`colors`, `opacity`, `transform`...).

```diff
+ transition-colors duration-200
```

- **Không nên:** Transition mọi thứ.

```diff
- transition-all duration-200
```

---

### 7.3 🔴 Outline replacement (lặp lại)

Đừng dùng `outline-none` một mình – luôn kèm focus ring thay thế.

- **Nên:** `focus:outline-none` + `focus:ring-*`.

```diff
+ focus:outline-none focus:ring-2 focus:ring-blue-500
```

- **Không nên:** Tắt outline mà không có gì khác.

```diff
- focus:outline-none
```

---

### 7.4 🟡 Không hard-code date format

Ngày/tháng nên dùng `Intl` và locale-aware.

- **Nên:** `Intl.DateTimeFormat` hoặc library chuẩn.

```diff
+ new Intl.DateTimeFormat('en-US').format(date)
```

- **Không nên:** Format tay dễ sai hoặc locale-dependent.

```diff
- date.toLocaleDateString()
```

---

## Tóm tắt

| Nhóm           | Số guideline | Mức độ ưu tiên   |
|----------------|-------------|------------------|
| Accessibility  | 6           | 🟡–🔴            |
| Focus & Keyboard | 3         | 🟡–🔴            |
| Forms          | 6           | 🟢–🔴            |
| Performance    | 5           | 🟡–🔴            |
| State & URL    | 3           | 🟡–🔴            |
| Typography     | 3           | 🟢–🟡            |
| Anti-patterns  | 4           | 🟡–🔴            |

Nguồn dữ liệu: [`web-interface.csv`](https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/refs/heads/main/src/ui-ux-pro-max/data/web-interface.csv) — [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill).
