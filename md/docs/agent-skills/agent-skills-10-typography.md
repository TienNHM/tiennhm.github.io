# Phần 10 - Typography & Font Pairings

> Nguồn: https://tiennhm.io.vn/docs/agent-skills/agent-skills-10-typography
> Gợi ý font pairing theo loại sản phẩm (SaaS, fintech, editorial, devtools, e-commerce, VN/i18n...) + snippet Google Fonts / Tailwind để Agent chọn nhanh.

> Tài liệu tổng hợp font pairing khuyến nghị cho từng loại sản phẩm (SaaS, fintech, editorial, devtools, e-commerce, VN/i18n, entertainment...), bao gồm Heading/Body fonts, mood keywords, best use cases và snippets Google Fonts/Tailwind để implement nhanh. Mỗi font pairing được đánh giá về readability, performance và phù hợp với từng loại sản phẩm. Nội dung dựa trên typography.csv từ ui-ux-pro-max-skill, giúp designers và developers chọn typography phù hợp cho dự án.

Tài liệu này tổng hợp **font pairing khuyến nghị** cho từng loại sản phẩm (SaaS, fintech, editorial, devtools, e‑commerce, VN/i18n, entertainment...).
Nguồn: [`typography.csv`](https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/refs/heads/main/src/ui-ux-pro-max/data/typography.csv) từ [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill).

**Cấu trúc mỗi mục:**

- **Heading / Body:** Tên font đề xuất (Google Fonts).
- **Mood:** Từ khoá cảm xúc/phong cách.
- **Best for:** Loại sản phẩm nên dùng.
- **Snippets:** Link Google Fonts + `@import` + gợi ý Tailwind `fontFamily`.

---

## 1. SaaS, Product & Dashboard

### 1.1 🟢 Minimal Swiss – `Inter`

- **Heading / Body:** `Inter` / `Inter`
- **Mood:** Minimal, functional, neutral, swiss.
- **Best for:** Dashboard, admin, docs, enterprise app, design system.
- **Google Fonts:**
  `https://fonts.google.com/share?selection.family=Inter:wght@300;400;500;600;700`

```diff
+ @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
```

- **Tailwind gợi ý:**

```diff
+ fontFamily: { sans: ['Inter', 'sans-serif'] }
```

---

### 1.2 🟢 Modern Professional – `Poppins` + `Open Sans`

- **Heading / Body:** `Poppins` / `Open Sans`
- **Mood:** Modern, professional, thân thiện.
- **Best for:** SaaS, corporate, startup landing, business app.

```diff
+ @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap');
```

```diff
+ fontFamily: {
+   heading: ['Poppins', 'sans-serif'],
+   body: ['Open Sans', 'sans-serif'],
+ }
```

---

### 1.3 🟢 Tech Startup – `Space Grotesk` + `DM Sans`

- **Heading / Body:** `Space Grotesk` / `DM Sans`
- **Mood:** Tech, futuristic, hơi “weird” đủ để nhớ.
- **Best for:** AI/tech startup, dev tools, product landing.

```diff
+ @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
```

```diff
+ fontFamily: {
+   heading: ['Space Grotesk', 'sans-serif'],
+   body: ['DM Sans', 'sans-serif'],
+ }
```

---

### 1.4 🟢 Friendly SaaS – `Plus Jakarta Sans`

- **Heading / Body:** `Plus Jakarta Sans` / `Plus Jakarta Sans`
- **Mood:** Friendly, clean, modern alternative cho Inter.
- **Best for:** Web apps, dashboard, B2B/B2C SaaS.

```diff
+ @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
```

```diff
+ fontFamily: { sans: ['Plus Jakarta Sans', 'sans-serif'] }
```

---

### 1.5 🟢 Corporate Trust – `Lexend` + `Source Sans 3`

- **Heading / Body:** `Lexend` / `Source Sans 3`
- **Mood:** Corporate, trustworthy, rất readable.
- **Best for:** Enterprise, gov, healthcare, accessibility-focused.

```diff
+ @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&family=Source+Sans+3:wght@300;400;500;600;700&display=swap');
```

```diff
+ fontFamily: {
+   heading: ['Lexend', 'sans-serif'],
+   body: ['Source Sans 3', 'sans-serif'],
+ }
```

---

### 1.6 🟢 Dashboard Data – `Fira Sans` + `Fira Code`

- **Heading / Body/Code:** `Fira Sans` / `Fira Sans` + `Fira Code`
- **Mood:** Data, kỹ thuật, thống nhất giữa UI & code.
- **Best for:** Analytics dashboard, admin panel, dev-oriented UI.

```diff
+ @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&family=Fira+Sans:wght@300;400;500;600;700&display=swap');
```

```diff
+ fontFamily: {
+   mono: ['Fira Code', 'monospace'],
+   sans: ['Fira Sans', 'sans-serif'],
+ }
```

---

## 2. Fintech, Legal, Medical, Trust‑Critical

### 2.1 🟢 Financial Trust – `IBM Plex Sans`

- **Heading / Body:** `IBM Plex Sans` / `IBM Plex Sans`
- **Mood:** Finance, serious, corporate.
- **Best for:** Bank, fintech, insurance, enterprise.

```diff
+ @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap');
```

```diff
+ fontFamily: { sans: ['IBM Plex Sans', 'sans-serif'] }
```

---

### 2.2 🟢 Medical Clean – `Figtree` + `Noto Sans`

- **Heading / Body:** `Figtree` / `Noto Sans`
- **Mood:** Clean, human, healthcare-friendly.
- **Best for:** Clinic, health app, pharma, medical dashboard.

```diff
+ @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700&family=Noto+Sans:wght@300;400;500;700&display=swap');
```

```diff
+ fontFamily: {
+   heading: ['Figtree', 'sans-serif'],
+   body: ['Noto Sans', 'sans-serif'],
+ }
```

---

### 2.3 🟢 Legal Professional – `EB Garamond` + `Lato`

- **Heading / Body:** `EB Garamond` / `Lato`
- **Mood:** Formal, authoritative, legal.
- **Best for:** Law firm, policy, gov/contract pages.

```diff
+ @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&family=Lato:wght@300;400;700&display=swap');
```

```diff
+ fontFamily: {
+   serif: ['EB Garamond', 'serif'],
+   sans: ['Lato', 'sans-serif'],
+ }
```

---

### 2.4 🟢 Accessibility First – `Atkinson Hyperlegible`

- **Heading / Body:** `Atkinson Hyperlegible` / `Atkinson Hyperlegible`
- **Mood:** Inclusive, rõ nét, thân thiện cho người có thị lực kém/dyslexia.
- **Best for:** Gov, healthcare, public service, mọi chỗ accessibility-critical.

```diff
+ @import url('https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap');
```

```diff
+ fontFamily: { sans: ['Atkinson Hyperlegible', 'sans-serif'] }
```

---

## 3. Editorial, Content & Blogs

### 3.1 🟢 Classic Elegant – `Playfair Display` + `Inter`

- **Heading / Body:** `Playfair Display` / `Inter`
- **Mood:** Luxury, editorial, premium.
- **Best for:** Luxury brand, fashion, spa/beauty, premium e‑commerce.

```diff
+ @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');
```

```diff
+ fontFamily: {
+   serif: ['Playfair Display', 'serif'],
+   sans: ['Inter', 'sans-serif'],
+ }
```

---

### 3.2 🟢 Editorial Classic – `Cormorant Garamond` + `Libre Baskerville`

- **Heading / Body:** `Cormorant Garamond` / `Libre Baskerville`
- **Mood:** Literary, classic, bookish.
- **Best for:** Magazine, long-form blog, literary site.

```diff
+ @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Libre+Baskerville:wght@400;700&display=swap');
```

---

### 3.3 🟢 News Editorial – `Newsreader` + `Roboto`

- **Heading / Body:** `Newsreader` / `Roboto`
- **Mood:** News, journalistic, informative.
- **Best for:** News site, content-heavy blog, docs với kiểu editorial.

```diff
+ @import url('https://fonts.googleapis.com/css2?family=Newsreader:wght@400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap');
```

---

### 3.4 🟢 Academic / Research – `Crimson Pro` + `Atkinson Hyperlegible`

- **Heading / Body:** `Crimson Pro` / `Atkinson Hyperlegible`
- **Mood:** Scholarly, accessible.
- **Best for:** University, research portal, knowledge base chuyên sâu.

```diff
+ @import url('https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Crimson+Pro:wght@400;500;600;700&display=swap');
```

---

## 4. DevTools, Tech & Code‑heavy

### 4.1 🟢 Developer Mono – `JetBrains Mono` + `IBM Plex Sans`

- **Heading / Body/Code:** `IBM Plex Sans` / `IBM Plex Sans` + `JetBrains Mono`
- **Mood:** Dev, technical, IDE-like.
- **Best for:** Docs, playground, code samples, CLI-like UI.

```diff
+ @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
```

---

### 4.2 🟢 Dashboard Data – `Fira Sans` + `Fira Code`

*(đã liệt kê ở 1.6, nhắc lại cho dashboard/data).*

---

### 4.3 🟡 Tech/HUD Mono – `Share Tech Mono` + `Fira Code`

- **Heading / Code:** `Share Tech Mono` + `Fira Code`
- **Mood:** Sci‑fi HUD, cyberpunk dashboard.
- **Best for:** HUD, cybersecurity UI, sci‑fi, experiment.

```diff
+ @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap');
```

---

## 5. E‑commerce, Marketing & Entertainment

### 5.1 🟢 E‑commerce Clean – `Rubik` + `Nunito Sans`

- **Heading / Body:** `Rubik` / `Nunito Sans`
- **Mood:** Clean, friendly, retail-ready.
- **Best for:** Storefront, product page, marketplace.

```diff
+ @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;500;600;700&family=Rubik:wght@300;400;500;600;700&display=swap');
```

---

### 5.2 🟡 Bold Statement – `Bebas Neue` + `Source Sans 3`

- **Heading / Body:** `Bebas Neue` / `Source Sans 3`
- **Mood:** Rất mạnh, headline to, all‑caps.
- **Best for:** Hero text marketing, event, sports, landing “đập vào mắt”.
- **Lưu ý:** Dùng `Bebas Neue` cho heading lớn; body vẫn dùng sans thường.

---

### 5.3 🟡 Music / Entertainment – `Righteous` + `Poppins`

- **Heading / Body:** `Righteous` / `Poppins`
- **Mood:** Fun, energetic.
- **Best for:** Music app, event page, entertainment.

---

### 5.4 🟡 Gaming Bold – `Russo One` + `Chakra Petch`

- **Heading / Body:** `Russo One` / `Chakra Petch`
- **Mood:** Esports, action, high energy.

---

### 5.5 🟡 Crypto/Web3 – `Orbitron` + `Exo 2`

- **Heading / Body:** `Orbitron` / `Exo 2`
- **Mood:** Futuristic, polygonal, “blockchain”.

---

## 6. Playful, Kids, Indie & Lifestyle

### 6.1 🟡 Playful Creative – `Fredoka` + `Nunito`

- **Heading / Body:** `Fredoka` / `Nunito`
- **Mood:** Rounded, friendly, dễ thương.
- **Best for:** Kids app nhẹ, creative tool, onboarding, gamified UI.

---

### 6.2 🟡 Kids / Education – `Baloo 2` + `Comic Neue`

- **Heading / Body:** `Baloo 2` / `Comic Neue`
- **Mood:** Trẻ em, vui tươi, chữ to.

---

### 6.3 🟡 Handwritten Charm – `Caveat` + `Quicksand`

- **Heading / Accent / Body:** `Caveat` (accent) / `Quicksand` (body).
- **Best for:** Personal blog, lifestyle, card/invitation.
- **Lưu ý:** Script chỉ dùng cho tiêu đề/ngắn, tránh cho body dài.

---

### 6.4 🟡 Indie / Craft – `Amatic SC` + `Cabin`

- **Mood:** Handmade, organic, phù hợp craft/indie brand.

---

### 6.5 🟡 Wedding / Romance – `Great Vibes` + `Cormorant Infant`

- **Mood:** Script elegant + serif mềm mại.
- **Best for:** Wedding site, wedding planner, romantic brand.

---

## 7. Multilingual & Localized (i18n)

### 7.1 🔴 Vietnamese Friendly – `Be Vietnam Pro` + `Noto Sans`

- **Heading / Body:** `Be Vietnam Pro` / `Noto Sans` fallback.
- **Mood:** Native VN, đa ngôn ngữ, rất readable.
- **Best for:** Mọi site/app tiếng Việt hoặc đa ngôn ngữ có tiếng Việt.

```diff
+ @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&family=Noto+Sans:wght@300;400;500;600;700&display=swap');
```

```diff
+ fontFamily: {
+   sans: ['Be Vietnam Pro', 'Noto Sans', 'sans-serif'],
+ }
```

---

### 7.2 🟢 Japanese Elegant – `Noto Serif JP` + `Noto Sans JP`

### 7.3 🟢 Korean Modern – `Noto Sans KR`

### 7.4 🟢 Chinese Traditional/Simplified – `Noto Serif/Sans TC/SC`

### 7.5 🟢 Arabic, Thai, Hebrew – `Noto *` families

- **Nguyên tắc:** Với CJK/RTL, ưu tiên họ `Noto` tương ứng, dùng 1–2 font cho cả heading + body để tránh flash/lag.

---

## 8. Gợi ý chọn nhanh cho Agent

- **SaaS dashboard / admin:** `Inter` hoặc `Plus Jakarta Sans` (**Minimal Swiss**, **Friendly SaaS**).
- **Fintech / bank / insurance:** `IBM Plex Sans` (**Financial Trust**) hoặc `Lexend + Source Sans 3`.
- **Healthcare / gov / public:** `Figtree + Noto Sans` hoặc `Atkinson Hyperlegible` (**Accessibility First**).
- **VN-first product:** `Be Vietnam Pro` (bắt buộc) + `Noto Sans` fallback.
- **Devtools / docs:** `JetBrains Mono + IBM Plex Sans` hoặc `Fira Code + Fira Sans`.
- **Magazine / blog:** `Newsreader + Roboto` hoặc `Cormorant Garamond + Libre Baskerville`.
- **Creative / portfolio:** `Space Grotesk + Archivo` hoặc `Syne + Manrope`.

---

## Tóm tắt

| Nhóm sản phẩm          | Font pair khuyến nghị chính                      |
|------------------------|--------------------------------------------------|
| SaaS / Dashboard       | Inter · Plus Jakarta Sans · Space Grotesk + DM  |
| Fintech / Legal / Med  | IBM Plex Sans · Lexend + Source Sans 3 · Figtree+Noto |
| News / Editorial       | Playfair + Inter · Newsreader + Roboto          |
| Devtools / Data        | JetBrains Mono + IBM Plex · Fira Code + Fira Sans |
| E‑commerce / Marketing | Rubik + Nunito Sans · Bebas Neue + Source Sans 3 |
| Kids / Playful         | Fredoka + Nunito · Baloo 2 + Comic Neue         |
| VN & i18n              | Be Vietnam Pro (+ Noto), các họ Noto cho CJK/RTL |

Nguồn dữ liệu: [`typography.csv`](https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/refs/heads/main/src/ui-ux-pro-max/data/typography.csv) — [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill).
