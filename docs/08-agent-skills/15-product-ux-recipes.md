---
title: Phần 15 - Product UX Recipes
slug: agent-skills-13-product-ux-recipes
description: Bản đồ từ loại sản phẩm (SaaS, fintech, e-commerce, healthcare, education...) sang combo Style + Landing Pattern + Dashboard + Palette để Agent chọn nhanh.
image: https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/refs/heads/main/public/products-cover.png
sidebar_position: 15
tags:
  - agent-skills
  - product
  - ux
  - ui
keywords: [product ux, design recipes, saas, ecommerce, fintech, healthcare, mapping]
enableComments: true
draft: false
---

# Agent Skills - Phần 13: Product UX Recipes

Tài liệu này đóng vai trò **bản đồ tổng hợp**: từ **Product Type** → chọn sẵn:

- **UI Style chính + phụ** (từ `styles.csv`).
- **Landing pattern** (từ Phần 12 – Landing).
- **Dashboard style** (nếu có).
- **Color palette focus** (tổng hợp từ `colors.csv`).
- **Key considerations** quan trọng cho UX.

Nguồn: [`products.csv`](https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/refs/heads/main/src/ui-ux-pro-max/data/products.csv) từ [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill).

---

## 1. SaaS, B2B & Tools

### 1.1 SaaS (General)

- **Style chính:** Glassmorphism + Flat Design  
- **Style phụ:** Soft UI Evolution, Minimalism  
- **Landing:** Hero + Features + CTA  
- **Dashboard:** Data-Dense + Real-Time Monitoring  
- **Màu:** Trust blue + accent contrast  
- **Lưu ý:** Modern nhưng **clear**. Tập trung vào CTA, thông điệp value prop ngắn gọn.

---

### 1.2 Micro SaaS

- **Style chính:** Flat Design + Vibrant & Block-based  
- **Style phụ:** Motion-Driven, Micro-interactions  
- **Landing:** Minimal & Direct + Demo  
- **Dashboard:** Executive Dashboard (high-level)  
- **Màu:** Vibrant primary + nhiều white space  
- **Lưu ý:** Giải thích nhanh, **demo càng sớm càng tốt**, tốc độ là ưu tiên số 1.

---

### 1.3 B2B Service

- **Style chính:** Trust & Authority + Minimal  
- **Style phụ:** Feature-Rich, Conversion-Optimized  
- **Landing:** Feature-Rich Showcase  
- **Dashboard:** Sales Intelligence Dashboard  
- **Màu:** Professional blue + neutral grey  
- **Lưu ý:** Credibility & ROI. Case study, số liệu, chứng chỉ rất quan trọng.

---

### 1.4 Productivity Tool / Remote Collaboration

- **Style chính:** Flat Design + Micro-interactions / Soft UI Evolution  
- **Landing:** Interactive Product Demo hoặc Feature-Rich Showcase  
- **Dashboard:** Drill-Down Analytics  
- **Màu:** Clear hierarchy + functional colors / Calm blue + neutral grey  
- **Lưu ý:** Speed, keyboard shortcut, status indicator, notification control.

---

### 1.5 Design System / Component Library

- **Style chính:** Minimalism + Accessible & Ethical  
- **Landing:** Feature-Rich Showcase (component, docs, search)  
- **Dashboard:** Dev-focused (nếu có)  
- **Màu:** Clear hierarchy + doc-like structure  
- **Lưu ý:** Consistency, search-first, code examples, copy snippet nhanh.

---

## 2. E‑commerce, Subscription & Marketplace

### 2.1 E‑commerce (General)

- **Style chính:** Vibrant & Block-based  
- **Style phụ:** Aurora UI, Motion-Driven  
- **Landing:** Feature-Rich Showcase  
- **Dashboard:** Sales Intelligence Dashboard  
- **Màu:** Brand primary + success green  
- **Lưu ý:** Visual hierarchy mạnh, filter/search tốt, review & trust badge rõ.

---

### 2.2 E‑commerce Luxury / Luxury/Premium Brand

- **Style chính:** Liquid Glass + Glassmorphism  
- **Style phụ:** 3D & Hyperrealism, Minimalism  
- **Landing:** Storytelling-Driven + Feature-Rich Showcase  
- **Dashboard:** Sales Intelligence  
- **Màu:** Premium black + gold + white  
- **Lưu ý:** Ảnh/3D chất lượng cao, story thương hiệu, cảm giác exclusive.

---

### 2.3 Subscription Box Service

- **Style chính:** Vibrant & Block-based + Motion-Driven  
- **Landing:** Feature-Rich Showcase  
- **Dashboard:** E‑commerce Analytics  
- **Màu:** Brand + excitement colors  
- **Lưu ý:** Trải nghiệm unboxing, quiz cá nhân hoá, quản lý subscription đơn giản.

---

### 2.4 Marketplace (P2P)

- **Style chính:** Vibrant & Block-based + Flat Design  
- **Landing:** Feature-Rich Showcase + Social Proof  
- **Dashboard:** E‑commerce / Marketplace Analytics  
- **Màu:** Trust colors + category colors + success green  
- **Lưu ý:** Profile seller/buyer, rating, secure payment, messaging, trust signals.

---

## 3. Fintech, Banking, Insurance

### 3.1 Fintech / Crypto

- **Style chính:** Glassmorphism + Dark Mode (OLED)  
- **Style phụ:** Retro-Futurism, Motion-Driven  
- **Landing:** Conversion-Optimized  
- **Dashboard:** Real-Time Monitoring + Predictive Analytics  
- **Màu:** Dark tech + trust blue + vibrant accents  
- **Lưu ý:** Ấn tượng security (badge, lock, audit); status real-time; gas fees & transaction rõ.

---

### 3.2 Banking / Traditional Finance / Insurance

- **Banking:** Minimalism + Accessible & Ethical; Landing Trust & Authority; Dashboard Financial.  
- **Insurance:** Trust & Authority + Flat; Landing Conversion-Optimized + Trust.  
- **Màu:** Navy + trust blue + gold / trust blue + security green.  
- **Lưu ý:** Pricing minh bạch, policy/comparison rõ, security-first, accessibility bắt buộc.

---

## 4. Healthcare, Wellness & Social Impact

### 4.1 Healthcare / Medical Clinic / Pharmacy / Dental

- **Style chính:** Accessible & Ethical + Minimalism / Soft UI Evolution / Neumorphism nhẹ.  
- **Landing:** Trust & Authority + Social Proof / Conversion.  
- **Dashboard:** Healthcare Analytics.  
- **Màu:** Calm blue/medical teal + trust white + health green.  
- **Lưu ý:** Privacy, compliance, booking rõ ràng, doctor profile, insurance info.

---

### 4.2 Mental Health App

- **Style chính:** Neumorphism + Accessible & Ethical  
- **Style phụ:** Claymorphism, Soft UI Evolution  
- **Landing:** Social Proof-Focused  
- **Dashboard:** Healthcare Analytics  
- **Màu:** Calm pastels + trust colors  
- **Lưu ý:** Calm, không overload motion; crisis resources; privacy-first; progress tracking nhẹ nhàng.

---

### 4.3 Sustainability / ESG / Non-profit

- **Style chính:** Organic Biophilic + Minimalism / Accessible & Ethical  
- **Landing:** Storytelling-Driven + Trust  
- **Dashboard:** Energy/Utilities / Donation Analytics  
- **Màu:** Earth green + sky blue + warm tones  
- **Lưu ý:** Impact stories & transparency; data viz về impact; certification / report rõ ràng.

---

## 5. Education, Knowledge & Community

### 5.1 Educational / Online Course / Language Learning

- **Style chính:** Claymorphism + Vibrant & Block-based  
- **Style phụ:** Motion-Driven, Flat Design  
- **Landing:** Feature-Rich Showcase + Social Proof  
- **Dashboard:** Education / Learning Analytics  
- **Màu:** Playful học tập + progress green  
- **Lưu ý:** Progress tracking, video player, quizzes, certificate, gamification vừa đủ.

---

### 5.2 Knowledge Base / Documentation

- **Style chính:** Minimalism + Accessible & Ethical  
- **Landing:** FAQ / Documentation Landing  
- **Màu:** Neutral grey + link blue  
- **Lưu ý:** Search-first, version switching, feedback “bài viết hữu ích?”, code highlight.

---

### 5.3 Community / Membership / Newsletter Platform

- **Style chính:** Vibrant & Block-based + Soft UI Evolution / Minimalism  
- **Landing:** Social Proof-Focused + Conversion / Minimal & Direct  
- **Dashboard:** Community / Email Analytics  
- **Lưu ý:** Member benefits, pricing tiers, community activity, sample content.

---

## 6. Entertainment, Media & Gaming

### 6.1 Gaming / Esports / Sports Team

- **Style chính:** 3D & Hyperrealism + Retro-Futurism / Vibrant & Block + Motion  
- **Landing:** Feature-Rich Showcase / Hero-Centric  
- **Màu:** Neon + team/brand colors, high contrast  
- **Lưu ý:** Immersion & performance; stats, schedule, fan engagement, highlight plays.

---

### 6.2 Music / Podcast / Video Streaming / Theater

- **Style chính:** Dark Mode (OLED) + Motion-Driven  
- **Landing:** Feature-Rich / Storytelling-Driven + Hero-Centric  
- **Dashboard:** Media/Entertainment Analytics  
- **Lưu ý:** Player UX (seek, playlist, continue watching), discovery, recommendation, personalization.

---

## 7. Local Services & Real World

### 7.1 Restaurant / Food / Coffee / Bakery

- **Style chính:** Vibrant & Block-based + Soft UI Evolution / Minimalism + Organic  
- **Landing:** Hero-Centric + Conversion  
- **Màu:** Warm brown/red/orange + appetizing imagery  
- **Lưu ý:** Menu, hours, location/map, online ordering, reservation, high-quality photos.

---

### 7.2 Cleaning / Home Services / Hyperlocal

- **Style chính:** Flat Design + Trust & Authority / Soft UI Evolution  
- **Landing:** Conversion-Optimized + Trust  
- **Màu:** Fresh blue + clean white + trust orange/green  
- **Lưu ý:** Pricing transparency, booking form, certifications, local reviews.

---

### 7.3 Real Estate / Architecture / Hotel / Travel

- **Real Estate:** Glassmorphism + Minimalism; Hero + Feature-Rich; trust blue + gold.  
- **Hotel:** Liquid Glass + Minimalism; Hero + Social Proof; warm neutrals + gold.  
- **Travel:** Aurora + Motion; Storytelling + Hero; destination color + sky blue.  
- **Lưu ý:** Listing/room gallery chất lượng cao, map, virtual tour, booking rõ ràng.

---

## 8. AI, Dev, Cyber & Emerging Tech

### 8.1 AI / Chatbot Platform

- **Style chính:** AI-Native UI + Minimalism  
- **Landing:** Interactive Product Demo / AI-Driven Dynamic Landing  
- **Dashboard:** AI/ML Analytics  
- **Màu:** Neutral + AI Purple `#6366F1`  
- **Lưu ý:** Conversational UI, streaming text, typing indicator, context cards, minimal chrome.

---

### 8.2 Cybersecurity / Dev Tool / IDE

- **Cybersecurity:** Cyberpunk UI + Dark Mode; Trust & Authority + Real-Time dashboard.  
- **Dev Tool / IDE:** Dark Mode + Minimalism; Minimal & Direct + Documentation.  
- **Lưu ý:** Data viz rõ (threats, logs), keyboard-first, fast, clear status & alerts.

---

### 8.3 Biotech, Space Tech, Quantum, Climate Tech

- **Biotech / Life Sciences:** Glassmorphism + Clean Science; Storytelling + Data-Dense; sterile white + DNA blue + life green.  
- **Space / Quantum:** HUD/Holographic + Dark; Immersive; telemetry + 3D viz.  
- **Climate Tech:** Organic Biophilic + E‑Ink/Paper; data transparency, low-carbon design.

---

## 9. Cách Agent sử dụng recipe này

- **Bước 1:** Xác định `Product Type` gần nhất (vd: “Micro SaaS”, “Fintech/Crypto”, “Healthcare App”).  
- **Bước 2:** Lấy combo:
  - **Style chính/phụ** từ Phần 9.
  - **Landing pattern** từ Phần 12.
  - **Palette** từ Phần 8.
  - **Typography** từ Phần 10.
- **Bước 3:** Áp dụng thêm guideline:
  - React / Next.js: Phần 1 + 2 + 11.
  - UX / Accessibility: Phần 5 + 7.

Qua đó, Agent có thể sinh **đề xuất UX/UI trọn bộ** cho từng loại sản phẩm chỉ với 1–2 bước mapping thay vì nghĩ lại từ đầu.

Nguồn dữ liệu: [`products.csv`](https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/refs/heads/main/src/ui-ux-pro-max/data/products.csv) — [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill).

