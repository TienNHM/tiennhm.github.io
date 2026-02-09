---
title: Phần 11 - UI Color Palettes by Product Type
slug: agent-skills-08-ui-color-palettes
description: Bảng màu gợi ý cho từng loại sản phẩm (SaaS, E‑commerce, Healthcare, Fintech, Education, Dashboard, Landing page, Entertainment, v.v.) dùng cho Agent Skills.
image: https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/refs/heads/main/public/colors-cover.png
sidebar_position: 11
tags:
  - agent-skills
  - ui
  - colors
  - design
  - best-practices
keywords: [agent skills, ui colors, design tokens, palette, saas, ecommerce, fintech]
enableComments: true
draft: false
---

# Agent Skills - Phần 8: UI Color Palettes by Product Type

Tài liệu này tổng hợp **bảng màu gợi ý theo loại sản phẩm** để dùng làm tham chiếu nhanh khi thiết kế UI hoặc sinh design tokens (primary, secondary, CTA, background, text, border).  
Nội dung dựa trên file [`colors.csv`](https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/refs/heads/main/src/ui-ux-pro-max/data/colors.csv) từ [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill).

**Cập nhật:** 08/02/2026.

**Quy ước:**
- `Primary`: màu thương hiệu/chủ đạo.
- `Secondary`: màu phụ hỗ trợ, dùng cho secondary action hoặc accent.
- `CTA`: màu nút call-to-action chính.
- `Background`: màu nền chính.
- `Text`: màu text mặc định trên nền chính.
- `Border`: màu viền/divider, subtle.

---

## 1. SaaS, Service & Tools

### 1.1 SaaS (General)

- **Gợi ý:** Trust blue + orange CTA tương phản.

```diff
+ Primary:   #2563EB
+ Secondary: #3B82F6
+ CTA:       #F97316
+ Background:#F8FAFC
+ Text:      #1E293B
+ Border:    #E2E8F0
```

---

### 1.2 Micro SaaS

- **Gợi ý:** Indigo primary + emerald CTA, cảm giác nhanh gọn, hiện đại.

```diff
+ Primary:   #6366F1
+ Secondary: #818CF8
+ CTA:       #10B981
+ Background:#F5F3FF
+ Text:      #1E1B4B
+ Border:    #E0E7FF
```

---

### 1.3 B2B Service / Consulting

- **Gợi ý:** Navy + neutral grey, authority & trust.

```diff
+ Primary:   #0F172A
+ Secondary: #334155
+ CTA:       #0369A1
+ Background:#F8FAFC
+ Text:      #020617
+ Border:    #E2E8F0
```

---

### 1.4 Service Landing Page

- **Gợi ý:** Sky blue trust + warm orange CTA.

```diff
+ Primary:   #0EA5E9
+ Secondary: #38BDF8
+ CTA:       #F97316
+ Background:#F0F9FF
+ Text:      #0C4A6E
+ Border:    #BAE6FD
```

---

### 1.5 Productivity Tool

- **Gợi ý:** Teal tập trung + CTA cam.

```diff
+ Primary:   #0D9488
+ Secondary: #14B8A6
+ CTA:       #F97316
+ Background:#F0FDFA
+ Text:      #134E4A
+ Border:    #99F6E4
```

---

### 1.6 Remote Work / Collaboration

- **Gợi ý:** Indigo calm + success green cho trạng thái done.

```diff
+ Primary:   #6366F1
+ Secondary: #818CF8
+ CTA:       #10B981
+ Background:#F5F3FF
+ Text:      #312E81
+ Border:    #E0E7FF
```

---

### 1.7 Design System / Component Library

- **Gợi ý:** Indigo brand + hierarchy rõ trong docs.

```diff
+ Primary:   #4F46E5
+ Secondary: #6366F1
+ CTA:       #F97316
+ Background:#EEF2FF
+ Text:      #312E81
+ Border:    #C7D2FE
```

---

## 2. E‑commerce, Subscription & Marketplace

### 2.1 E‑commerce (General)

- **Gợi ý:** Success green + urgency orange cho CTA.

```diff
+ Primary:   #059669
+ Secondary: #10B981
+ CTA:       #F97316
+ Background:#ECFDF5
+ Text:      #064E3B
+ Border:    #A7F3D0
```

---

### 2.2 E‑commerce Luxury / Premium Brand

- **Gợi ý:** Premium dark + gold accent.

```diff
+ Primary:   #1C1917
+ Secondary: #44403C
+ CTA:       #CA8A04
+ Background:#FAFAF9
+ Text:      #0C0A09
+ Border:    #D6D3D1
```

---

### 2.3 Subscription Box Service

- **Gợi ý:** Excitement purple + urgency orange.

```diff
+ Primary:   #D946EF
+ Secondary: #E879F9
+ CTA:       #F97316
+ Background:#FDF4FF
+ Text:      #86198F
+ Border:    #F5D0FE
```

---

### 2.4 Marketplace (P2P)

- **Gợi ý:** Trust purple + transaction green.

```diff
+ Primary:   #7C3AED
+ Secondary: #A78BFA
+ CTA:       #22C55E
+ Background:#FAF5FF
+ Text:      #4C1D95
+ Border:    #DDD6FE
```

---

## 3. Dashboards & Data

### 3.1 Financial Dashboard

- **Gợi ý:** Dark bg + green positive indicators.

```diff
+ Primary:   #0F172A
+ Secondary: #1E293B
+ CTA:       #22C55E
+ Background:#020617
+ Text:      #F8FAFC
+ Border:    #334155
```

---

### 3.2 Analytics Dashboard

- **Gợi ý:** Blue data + amber highlight cho cảnh báo.

```diff
+ Primary:   #1E40AF
+ Secondary: #3B82F6
+ CTA:       #F59E0B
+ Background:#F8FAFC
+ Text:      #1E3A8A
+ Border:    #DBEAFE
```

---

### 3.3 Smart Home / IoT Dashboard

- **Gợi ý:** Dark tech + status green.

```diff
+ Primary:   #1E293B
+ Secondary: #334155
+ CTA:       #22C55E
+ Background:#0F172A
+ Text:      #F8FAFC
+ Border:    #475569
```

---

## 4. Healthcare, Mental Health & Sustainability

### 4.1 Healthcare App / Medical Clinic

- **Gợi ý:** Calm cyan/teal + health green, cảm giác an toàn, sạch.

```diff
+ Primary:   #0891B2
+ Secondary: #22D3EE
+ CTA:       #059669
+ Background:#ECFEFF
+ Text:      #164E63
+ Border:    #A5F3FC
```

```diff
+ Primary:   #0891B2
+ Secondary: #22D3EE
+ CTA:       #22C55E
+ Background:#F0FDFA
+ Text:      #134E4A
+ Border:    #CCFBF1
```

---

### 4.2 Mental Health App

- **Gợi ý:** Calming lavender + wellness green.

```diff
+ Primary:   #8B5CF6
+ Secondary: #C4B5FD
+ CTA:       #10B981
+ Background:#FAF5FF
+ Text:      #4C1D95
+ Border:    #EDE9FE
```

---

### 4.3 Sustainability / ESG / Climate Tech

- **Gợi ý:** Nature green + ocean blue + solar gold.

```diff
+ Primary:   #059669
+ Secondary: #10B981
+ CTA:       #0891B2
+ Background:#ECFDF5
+ Text:      #064E3B
+ Border:    #A7F3D0
```

```diff
+ Primary:   #059669
+ Secondary: #10B981
+ CTA:       #FBBF24
+ Background:#ECFDF5
+ Text:      #064E3B
+ Border:    #A7F3D0
```

---

## 5. Entertainment, Social & Media

### 5.1 Social Media App

- **Gợi ý:** Vibrant rose + engagement blue.

```diff
+ Primary:   #E11D48
+ Secondary: #FB7185
+ CTA:       #2563EB
+ Background:#FFF1F2
+ Text:      #881337
+ Border:    #FECDD3
```

---

### 5.2 Gaming

- **Gợi ý:** Neon purple + rose action – phù hợp theme game/stream.

```diff
+ Primary:   #7C3AED
+ Secondary: #A78BFA
+ CTA:       #F43F5E
+ Background:#0F0F23
+ Text:      #E2E8F0
+ Border:    #4C1D95
```

---

### 5.3 Music / Podcast Platform

- **Gợi ý:** Dark audio + warm accent.

```diff
+ Primary:   #1E1B4B
+ Secondary: #312E81
+ CTA:       #F97316
+ Background:#0F0F23
+ Text:      #F8FAFC
+ Border:    #4338CA
```

---

### 5.4 Video Streaming / OTT

- **Gợi ý:** Cinema dark + play red.

```diff
+ Primary:   #0F0F23
+ Secondary: #1E1B4B
+ CTA:       #E11D48
+ Background:#000000
+ Text:      #F8FAFC
+ Border:    #312E81
```

---

### 5.5 Dating App

- **Gợi ý:** Romantic rose + warm orange.

```diff
+ Primary:   #E11D48
+ Secondary: #FB7185
+ CTA:       #F97316
+ Background:#FFF1F2
+ Text:      #881337
+ Border:    #FECDD3
```

---

## 6. Content, Docs & Knowledge

### 6.1 Portfolio / Personal

- **Gợi ý:** Monochrome + blue accent.

```diff
+ Primary:   #18181B
+ Secondary: #3F3F46
+ CTA:       #2563EB
+ Background:#FAFAFA
+ Text:      #09090B
+ Border:    #E4E4E7
```

---

### 6.2 Knowledge Base / Documentation

- **Gợi ý:** Neutral grey + link blue.

```diff
+ Primary:   #475569
+ Secondary: #64748B
+ CTA:       #2563EB
+ Background:#F8FAFC
+ Text:      #1E293B
+ Border:    #E2E8F0
```

---

### 6.3 Magazine / Blog

- **Gợi ý:** Editorial black + accent pink.

```diff
+ Primary:   #18181B
+ Secondary: #3F3F46
+ CTA:       #EC4899
+ Background:#FAFAFA
+ Text:      #09090B
+ Border:    #E4E4E7
```

---

## 7. Local Services & Real World

### 7.1 Restaurant / Food Service

- **Gợi ý:** Appetizing red + warm gold.

```diff
+ Primary:   #DC2626
+ Secondary: #F87171
+ CTA:       #CA8A04
+ Background:#FEF2F2
+ Text:      #450A0A
+ Border:    #FECACA
```

---

### 7.2 Coffee Shop / Bakery / Cafe

- **Gợi ý:** Coffee brown + cream + warm gold.

```diff
+ Primary:   #78350F
+ Secondary: #92400E
+ CTA:       #FBBF24
+ Background:#FEF3C7
+ Text:      #451A03
+ Border:    #FDE68A
```

---

### 7.3 Cleaning Service / Home Services

- **Gợi ý:** Fresh cyan/blue + clean green, cảm giác sạch sẽ chuyên nghiệp.

```diff
+ Primary:   #0891B2
+ Secondary: #22D3EE
+ CTA:       #22C55E
+ Background:#ECFEFF
+ Text:      #164E63
+ Border:    #A5F3FC
```

```diff
+ Primary:   #1E40AF
+ Secondary: #3B82F6
+ CTA:       #F97316
+ Background:#EFF6FF
+ Text:      #1E3A8A
+ Border:    #BFDBFE
```

---

### 7.4 Real Estate / Property

- **Gợi ý:** Trust teal + professional blue.

```diff
+ Primary:   #0F766E
+ Secondary: #14B8A6
+ CTA:       #0369A1
+ Background:#F0FDFA
+ Text:      #134E4A
+ Border:    #99F6E4
```

---

## 8. AI, Dev & Emerging Tech

### 8.1 AI / Chatbot Platform

- **Gợi ý:** AI purple + cyan interactions.

```diff
+ Primary:   #7C3AED
+ Secondary: #A78BFA
+ CTA:       #06B6D4
+ Background:#FAF5FF
+ Text:      #1E1B4B
+ Border:    #DDD6FE
```

---

### 8.2 Developer Tool / IDE / Coding Bootcamp

- **Gợi ý:** Terminal dark + success green.

```diff
+ Primary:   #1E293B
+ Secondary: #334155
+ CTA:       #22C55E
+ Background:#0F172A
+ Text:      #F8FAFC
+ Border:    #475569
```

```diff
+ Primary:   #0F172A
+ Secondary: #1E293B
+ CTA:       #22C55E
+ Background:#020617
+ Text:      #F8FAFC
+ Border:    #334155
```

---

### 8.3 Cybersecurity / Autonomous Systems

- **Gợi ý:** Matrix green + alert red trên nền tối.

```diff
+ Primary:   #00FF41
+ Secondary: #0D0D0D
+ CTA:       #FF3333
+ Background:#000000
+ Text:      #E0E0E0
+ Border:    #1F1F1F
```

```diff
+ Primary:   #00FF41
+ Secondary: #008F11
+ CTA:       #FF3333
+ Background:#0D1117
+ Text:      #E6EDF3
+ Border:    #30363D
```

---

### 8.4 Quantum / Space / Biotech

- **Quantum Computing:** Cyan + interference purple.
- **Space Tech:** Star white + launch blue trên nền rất tối.
- **Biotech / Life Sciences:** DNA blue + life green, sạch, khoa học.

```diff
+ Quantum Primary:   #00FFFF
+ Secondary:         #7B61FF
+ CTA:               #FF00FF
+ Background:        #050510
+ Text:              #E0E0FF
+ Border:            #333344
```

```diff
+ Space Primary:     #F8FAFC
+ Secondary:         #94A3B8
+ CTA:               #3B82F6
+ Background:        #0B0B10
+ Text:              #F8FAFC
+ Border:            #1E293B
```

```diff
+ Biotech Primary:   #0EA5E9
+ Secondary:         #0284C7
+ CTA:               #10B981
+ Background:        #F0F9FF
+ Text:              #0C4A6E
+ Border:            #BAE6FD
```

---

## Tóm tắt & gợi ý dùng với design tokens

- **Mapping tokens:** Có thể map các cột vào design tokens:
  - `--color-primary`, `--color-primary-foreground`
  - `--color-secondary`, `--color-secondary-foreground`
  - `--color-accent` (CTA), `--color-accent-foreground`
  - `--color-bg`, `--color-border`, `--color-muted`
- **Cách dùng cho Agent Skills:**
  - Khi sinh UI cho domain cụ thể (ví dụ *Healthcare app*), chọn palette tương ứng rồi apply vào theme.
  - Kết hợp với guideline từ **Phần 6 - UI Reasoning** để đảm bảo màu sắc phù hợp với **tone & UX** (trust, playful, data-heavy, v.v.).

Nguồn dữ liệu: [`colors.csv`](https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/refs/heads/main/src/ui-ux-pro-max/data/colors.csv) — [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill).

