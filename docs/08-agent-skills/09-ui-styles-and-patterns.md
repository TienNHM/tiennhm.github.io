---
title: Phần 9 - UI Styles & Design Systems
slug: agent-skills-09-ui-styles
description: Bản đồ các style UI (Minimalism, Neumorphism, Glassmorphism, Brutalism, Dark Mode, Claymorphism, Aurora, Flat, Accessible & Ethical, Motion-Driven, Hero-Centric, Conversion-Optimized, Data-Dense...) để Agent chọn đúng phong cách cho từng bài toán.
image: https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/refs/heads/main/public/styles-cover.png
sidebar_position: 9
tags:
  - agent-skills
  - ui
  - design
  - styles
  - best-practices
keywords: [agent skills, ui styles, minimalism, glassmorphism, dark mode, motion, landing pages, dashboards]
enableComments: true
draft: false
---

# Agent Skills - Phần 9: UI Styles & Design Systems

Tài liệu này tổng hợp **UI style patterns** dùng để:

- Chọn phong cách UI phù hợp với **sản phẩm + audience + performance + accessibility**.
- Sinh prompt thiết kế, CSS token, checklist triển khai cho Agent.

Dữ liệu gốc: [`styles.csv`](https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/refs/heads/main/src/ui-ux-pro-max/data/styles.csv) từ [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill).

**Đọc nhanh:**

- 🔴 **Không dùng** cho domain cần accessibility/perf cao (nếu style quá nặng).
- 🟡 **Cẩn trọng** (kiểm tra lại contrast, motion, mobile).
- 🟢 **An toàn** cho đa số app / dễ áp dụng.

---

## 1. Core Foundation Styles

### 1.1 🟢 Minimalism & Swiss Style

- **Từ khoá:** Clean, grid-based, nhiều white space, sans-serif, high contrast.
- **Rất phù hợp cho:** Enterprise apps, dashboard, docs, SaaS B2B.
- **Nên dùng khi:**
  - Cần **rõ ràng, dễ đọc, ít phân tán**.
  - Ưu tiên performance + WCAG AAA.
- **Tránh dùng cho:** Brand quá playful/entertainment, portfolio nghệ thuật.

---

### 1.2 🟡 Neumorphism

- **Từ khoá:** Soft UI, embossed/debossed, pastel, shadow mềm, bo tròn lớn.
- **Dùng tốt cho:** Wellness, meditation, fitness, UI ít text/ít data.
- **Rủi ro:**
  - Contrast thấp → **khó đạt WCAG**, không phù hợp app quan trọng.
  - Không nên dùng cho data-heavy dashboard.

---

### 1.3 🟡 Glassmorphism

- **Từ khoá:** Frosted glass, blur, layer, depth, vibrant background.
- **Dùng tốt cho:** Card overlay, modal, navbar trên nền gradient/ảnh.
- **Cần chú ý:**
  - Check **contrast ≥ 4.5:1** trên glass.
  - Blur tốn tài nguyên trên mobile thấp.

---

### 1.4 🟢 Flat Design

- **Từ khoá:** 2D, không shadow/gradient, icon đơn giản, màu phẳng.
- **Dùng tốt cho:** Web/app đa nền tảng, SaaS, dashboard, MVP.
- **Ưu điểm:** Performance rất tốt, dễ theming, dễ responsive, friendly cho accessibility.

---

### 1.5 🔴 3D & Hyperrealism / Skeuomorphism

- **Từ khoá:** Texture, 3D models, realistic light/shadow, WebGL.
- **Dùng tốt cho:** Gaming, immersive marketing, luxury 3D showcase.
- **Không nên dùng cho:** App enterprise, table/forms, device yếu, màn hình nhỏ.

---

## 2. Dark Mode & Accessible Styles

### 2.1 🔴 Dark Mode (OLED)

- **Từ khoá:** Deep black, neon accent, eye-friendly, night mode.
- **Dùng tốt cho:** Dev tools, media, entertainment, dashboard real-time.
- **Cần:**
  - Contrast cao (7:1 cho text).
  - Không dùng white full-bleed trên nền quá tối (gây chói).

---

### 2.2 🔴 Accessible & Ethical / Inclusive Design

- **Từ khoá:** WCAG AAA, 7:1 contrast, 16px+, keyboard navigation, screen reader.
- **Dùng cho:** Government, healthcare, finance, public, mọi app “nghiêm túc”.
- **Checklist bắt buộc cho Agent:**
  - Focus ring 3–4px, reachable mọi element.
  - Label đầy đủ, không truyền thông tin chỉ bằng màu.
  - `prefers-reduced-motion` + touch target ≥ 44x44.

---

### 2.3 🟡 Soft UI Evolution

- **Từ khoá:** Soft shadow vừa phải, contrast > neumorphism, bo tròn 8–12px.
- **Là phiên bản “an toàn” hơn của Neumorphism**, thân thiện accessibility hơn.

---

## 3. Playful & Creative Styles

### 3.1 🟡 Claymorphism

- **Từ khoá:** Chunky, toy-like, border dày, double shadow, pastel.
- **Dùng tốt cho:** App giáo dục, app trẻ em, onboarding, website playful.

---

### 3.2 🟡 Vibrant & Block-based

- **Từ khoá:** Bold color, block layout, type lớn, năng lượng cao.
- **Dùng cho:** Startup, agency, social/gaming landing.
- **Tránh:** Fintech, healthcare, gov, audience lớn tuổi.

---

### 3.3 🔴 Brutalism / Neubrutalism

- **Từ khoá:** “Raw”, border đen dày, primary color thuần, không transition.
- **Dùng cho:** Portfolio, creative agency, tech blog.
- **Không dùng cho:** Corporate, trust-critical domain (banking, y tế).

---

### 3.4 🟡 Aurora / Gradient Mesh / Y2K / Vaporwave / Memphis

- **Nhóm style gradient / neon / retro:**
  - **Aurora / Gradient Mesh:** Background hero gradient phức tạp, smooth 8–12s.
  - **Y2K / Vaporwave / Memphis:** Neon, pattern, retro, glitch – cực kỳ cá tính.
- **Dùng cho:** Creative, music, gaming, Gen Z brand.
- **Cần kiểm tra:** Contrast + motion (giảm khi user motion-sensitive).

---

## 4. Landing Page Patterns

### 4.1 🔴 Hero-Centric Design

- **Từ khoá:** Full-viewport hero, headline rõ, screenshot/video, CTA nổi bật.
- **Dùng cho:** SaaS landing, product launch, service page.
- **Checklist:**
  - Headline & CTA **visible above the fold**.
  - Nội dung support (features/social proof) phía dưới.

---

### 4.2 🔴 Conversion-Optimized

- **Từ khoá:** Single CTA, form-focused, trust badge, social proof, urgency.
- **Dùng cho:** Signup, pricing, lead-gen, e‑commerce product page.
- **Nên:**
  - Tối đa 1 primary CTA.
  - Form < 5 field cho lần submit đầu.

---

### 4.3 🟡 Feature-Rich Showcase

- **Từ khoá:** Card grid, feature sections, comparison, interactive demo.
- **Dùng cho:** Enterprise SaaS, platform phức tạp.

---

### 4.4 🟡 Social Proof-Focused / Trust & Authority

- **Social Proof:** Testimonial, logo khách hàng, case study, rating.
- **Trust & Authority:** Badge/cert, security, credentials, ROI metrics.
- **Dùng cho:** B2B, consulting, healthcare/finance landing.

---

### 4.5 🟡 Storytelling-Driven / Parallax Storytelling

- **Từ khoá:** Narrative sections, timeline, scroll-driven reveal.
- **Dùng cho:** Brand/mission, portfolio, case study dài.
- **Cần:** Fallback/skip cho user không thích motion.

---

## 5. Dashboard & Analytics Styles

### 5.1 🔴 Data-Dense Dashboard & Executive Dashboard

- **Từ khoá:** Nhiều chart/widget, grid 12 cột, KPI card, table dense.
- **Dùng cho:** BI, CFO view, ops dashboard.
- **Checklist:**
  - Loading state rõ; filter hoạt động.
  - Export (CSV/Excel) cho data quan trọng.

---

### 5.2 🟡 Heat Map, Real-Time Monitoring, Drill-Down, Comparative

- **Heat Map:** Cool→Hot scale cho intensity (behavior, geo, correlation).
- **Real-Time:** Pulse, streaming chart, alert rõ ràng.
- **Drill-Down:** Breadcrumb, expand, context preserved.
- **Comparative:** Side-by-side, delta (+/-), benchmark lines.

---

### 5.3 🔴 Financial / Sales / User Behavior Analytics

- **Financial:** Profit/loss, cashflow, variance, currency formatting chính xác.
- **Sales:** Pipeline, quota, leaderboard, territory map.
- **User Behavior:** Funnel, flow (Sankey), cohort, retention, heatmap.

---

## 6. Motion & Interaction Patterns

### 6.1 🟡 Motion-Driven

- **Từ khoá:** Scroll-trigger, parallax, page transition, microinteraction dày.
- **Chỉ dùng khi:** Brand/storytelling quan trọng, audience trẻ, chấp nhận motion.
- **Luôn cần:** Respect `prefers-reduced-motion`.

---

### 6.2 🟢 Micro-interactions

- **Từ khoá:** Animation 50–100ms, feedback tactile nhỏ (hover/press).
- **Dùng tốt cho:** Tất cả app interactive, đặc biệt mobile/productivity.

---

### 6.3 🟡 Kinetic Typography, Kinetic Hero

- **Từ khoá:** Chữ động, typing effect, morphing, text là visual chính.
- **Dùng cho:** Hero & marketing; không dùng cho long-form content.

---

### 6.4 🟡 Interactive Cursor, Tactile Digital, 3D Product Preview

- **Interactive Cursor:** Chỉ cho desktop, portfolio/agency/gaming.
- **Tactile/Jelly UI:** Playful brand/app mobile.
- **3D Product Preview:** E‑commerce sản phẩm vật lý (furniture, auto, fashion...).

---

## 7. Themed / Domain-Specific Styles

### 7.1 🟢 Organic Biophilic / Nature Distilled / E‑Ink

- **Organic/Nature Distilled:** Wellness, organic food, sustainability, interior.
- **E‑Ink/Paper:** Reading app, nhật ký, distraction-free writing.

---

### 7.2 🟡 Cyberpunk / HUD / Retro / Pixel / Memphis / Y2K

- Nhắm tới **gaming, media, music, creative** – không dùng cho enterprise/gov/health.
- Thường yêu cầu:
  - Dark mode + neon.
  - Motion & effect nhiều → cần fallback giảm motion.

---

## 8. Cách Agent chọn style tự động

- **Nếu domain = gov/health/finance/public:**
  - Ưu tiên: **Accessible & Ethical, Minimalism, Swiss Modernism 2.0, Trust & Authority.**
- **Nếu domain = SaaS dashboard/data:**
  - **Minimalism, Data-Dense, Dimensional Layering, Dark Mode (nếu Dev/CFO).**
- **Nếu domain = creative/portfolio/agency:**
  - **Motion-Driven, Storytelling, Vibrant & Block-based, Memphis, Aurora, Brutalism/Neubrutalism.**
- **Nếu domain = consumer/mobile app fun:**
  - **Claymorphism, Soft UI Evolution, Micro-interactions, Tactile, Vibrant.**

---

## Tóm tắt

| Nhóm style                 | Dùng tốt cho                         | Tránh dùng cho                          |
|---------------------------|--------------------------------------|-----------------------------------------|
| Minimalism / Swiss       | Enterprise, SaaS, docs, dashboard   | Brand quá playful                       |
| Soft / Glass / Clay      | Wellness, lifestyle, onboarding     | Data-heavy, WCAG AAA nghiêm ngặt       |
| Dark / Cyber / Retro     | Dev tools, media, gaming            | Gov, healthcare, đối tượng lớn tuổi    |
| Hero / Conversion / Trust| Landing page, marketing, pricing    | App nội bộ thuần tác vụ                |
| Data-Dense / Real-Time   | BI, ops, finance, analytics         | Blog, marketing one-pager              |
| Storytelling / Motion    | Brand story, portfolio, case-study  | Form phức tạp, accessibility cao       |
| Organic / E‑Ink          | Wellness, reading, slow tech        | High-energy, youth entertainment        |

Nguồn dữ liệu: [`styles.csv`](https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/refs/heads/main/src/ui-ux-pro-max/data/styles.csv) — [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill).

