# Phần 13 - UI Reasoning & Patterns

> Nguồn: https://tiennhm.io.vn/docs/agent-skills/agent-skills-06-ui-reasoning
> Tổng hợp UI reasoning patterns theo ngữ cảnh sản phẩm (SaaS, E‑commerce, Healthcare, Fintech, Education, Dashboard...) để chọn layout, màu sắc, typography, hiệu ứng và ưu tiên thiết kế phù hợp.

> Tài liệu tổng hợp UI Reasoning Patterns giúp chọn layout, phong cách, màu sắc, typography và hiệu ứng phù hợp cho từng loại sản phẩm (SaaS, E-commerce, Healthcare, Fintech, Dashboard, Landing page). Mỗi pattern được đánh giá mức độ quan trọng và có guidelines chiến lược về nên làm và không nên làm. Nội dung dựa trên ui-reasoning.csv từ ui-ux-pro-max-skill, giúp designers và developers đưa ra quyết định thiết kế dựa trên ngữ cảnh sản phẩm cụ thể.

Tài liệu này tổng hợp **UI Reasoning Patterns** – giúp chọn **layout, phong cách, màu sắc, typography và hiệu ứng** phù hợp cho từng loại sản phẩm (SaaS, E‑commerce, Healthcare, Fintech, Dashboard, Landing page, v.v.).
Nội dung dựa trên bộ dữ liệu [`ui-reasoning.csv`](https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/refs/heads/main/src/ui-ux-pro-max/data/ui-reasoning.csv) từ [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill).

**Cập nhật:** 08/02/2026.

**Mức độ:** 🔴 Cao · 🟡 Trung bình · 🟢 Thấp
**Ghi chú:** Đây là guideline **UI chiến lược**, nên ở dạng **“Nên / Không nên”** thay vì code cụ thể.

---

## 1. SaaS & Startup

### 1.1 🔴 SaaS (General)

- **Mẫu khuyến nghị:** Hero + Features + CTA · Glassmorphism + Flat · Trust blue + Accent contrast.
- **Typography & hiệu ứng:** Professional, phân cấp rõ; hover subtle 200–250ms, transition mượt.
- **Nên:** Nếu UX-focused → ưu tiên minimalism; nếu data-heavy → thêm glassmorphism cho card/overlay.
- **Không nên:** Lạm dụng animation; bật dark mode làm default khi đối tượng chưa quen.

---

### 1.2 🔴 Micro SaaS

- **Mẫu khuyến nghị:** Minimal & Direct + Demo · Flat + Vibrant blocks.
- **Màu & type:** Primary rực + nhiều white space; typography bold & clean.
- **Nên:** Onboarding siêu ngắn; nếu có demo → ưu tiên interactive demo (sandbox, playground).
- **Không nên:** Flow onboarding phức tạp, nhiều step; layout bừa bộn mất sự “nhanh gọn”.

---

### 1.3 🔴 Startup Landing

- **Mẫu khuyến nghị:** Hero-centric + Trust · Motion-driven + Vibrant blocks.
- **Hiệu ứng:** Scroll-triggered animation + parallax nhẹ, ưu tiên mobile.
- **Nên:** Pre-launch → dùng waitlist pattern; nếu có video → thêm hero video giới thiệu.
- **Không nên:** Landing tĩnh, không video, mobile kém; thiếu bằng chứng trust (logo, testimonial).

---

### 1.4 🔴 B2B SaaS Enterprise

- **Mẫu khuyến nghị:** Feature-rich showcase · Trust & Authority + Minimal.
- **Màu & type:** Professional blue + neutral grey; typography formal, rõ ràng.
- **Nên:** Case studies nổi bật; messaging về ROI, business value, security/compliance.
- **Không nên:** Thiết kế playful; tính năng quan trọng “chôn” sâu; gradient “AI purple/pink” lạc tông.

---

### 1.5 🔴 Service Landing Page

- **Mẫu khuyến nghị:** Hero-centric + Trust & Authority · Minimal + Social proof.
- **Nên:** CTA rõ (primary) + social proof (review, logo khách hàng, case study).
- **Không nên:** Navigation rối; contact/CTA bị giấu kỹ, phải scroll nhiều mới thấy.

---

### 1.6 🔴 B2B Service

- **Mẫu khuyến nghị:** Feature-rich + Trust · Trust & Authority + Minimalism.
- **Nên:** Case studies, chứng chỉ, ROI messaging (tiết kiệm bao nhiêu, tăng bao nhiêu).
- **Không nên:** Thiết kế quá playful; credentials/case study bị ẩn hoặc quá mơ hồ.

---

## 2. E‑commerce, Marketplace & Consumer

### 2.1 🔴 E‑commerce (General)

- **Mẫu khuyến nghị:** Feature-rich showcase · Vibrant & block-based.
- **Màu & type:** Brand primary + success green; typography rõ hierarchy.
- **Hiệu ứng:** Card hover lift + scale nhẹ 200ms.
- **Nên:** Nếu luxury → chuyển sang liquid glass; nếu conversion-focused → thêm màu sắc tạo urgency (badge giảm giá, low stock).
- **Không nên:** Flat design phẳng lì, thiếu depth; trang toàn chữ ít hình.

---

### 2.2 🔴 E‑commerce Luxury

- **Mẫu khuyến nghị:** Feature-rich showcase · Liquid glass + Glassmorphism.
- **Màu:** Premium (đen, gold, trắng) + accent tối giản.
- **Hiệu ứng:** Chromatic aberration / fluid animation 400–600ms.
- **Nên:** Emphasize trust ở checkout (badge bảo mật, brand, support); hero có 3D/hyperrealistic.
- **Không nên:** Palette playful/vibrant bình dân; block-based vui nhộn.

---

### 2.3 🔴 Marketplace (P2P)

- **Mẫu khuyến nghị:** Feature-rich + Social proof · Vibrant blocks + Flat.
- **Nên:** Seller profile rõ; review, rating, badge “Verified”; flow thanh toán secure.
- **Không nên:** Thiếu trust signals; layout rối, filter khó dùng.

---

### 2.4 🔴 Subscription Box Service

- **Mẫu khuyến nghị:** Feature-rich + Conversion · Vibrant blocks + Motion.
- **Nên:** Quiz cá nhân hoá (onboarding) + quản lý subscription rõ ràng.
- **Không nên:** Giá mơ hồ; không có preview experience (unboxing, inside-the-box).

---

### 2.5 🔴 Digital Products / Downloads

- **Mẫu khuyến nghị:** Feature-rich + Conversion · Vibrant blocks + Motion.
- **Nên:** Preview sản phẩm rõ (demo, screenshot, sample); UX “instant delivery”.
- **Không nên:** Không có preview; giao file chậm hoặc flow mơ hồ.

---

### 2.6 🔴 Beauty / Spa / Wellness Service

- **Mẫu khuyến nghị:** Hero-centric + Social proof · Soft UI / Neumorphism.
- **Màu:** Soft pastel (pink, sage, cream) + gold accent.
- **Nên:** Booking system mượt; gallery before/after; testimonial/ratings.
- **Không nên:** Neon harsh; animation gắt; dark mode default.

---

### 2.7 🔴 Restaurant / Food

- **Mẫu khuyến nghị:** Hero-centric + Conversion · Vibrant blocks + Motion.
- **Màu:** Warm (orange, red, brown); ảnh đồ ăn chất lượng cao.
- **Nên:** Hero food, menu rõ, CTA đặt bàn/đặt món; nếu delivery → nhấn mạnh tốc độ.
- **Không nên:** Ảnh kém chất lượng; giờ mở cửa lạc chỗ/khó tìm.

---

### 2.8 🔴 Hotel / Hospitality

- **Mẫu khuyến nghị:** Hero-centric + Social proof · Liquid glass + Minimalism.
- **Nên:** Booking flow rõ; virtual tour phòng, amenity reveal; review nổi bật.
- **Không nên:** Ảnh xấu; flow booking phức tạp; thiếu thông tin giá/điều kiện.

---

### 2.9 🔴 Travel / Tourism

- **Mẫu khuyến nghị:** Storytelling + Hero · Aurora UI + Motion-driven.
- **Nên:** Storytelling hành trình, ảnh đích đến đẹp; booking mobile-first.
- **Không nên:** Ảnh generic, stock; quy trình booking phức tạp.

---

### 2.10 🔴 Job Board / Recruitment

- **Mẫu khuyến nghị:** Conversion + Feature-rich · Flat + Minimalism.
- **Nên:** Search/filter mạnh; highlight lương/benefit; apply flow rõ.
- **Không nên:** Form lỗi thời; filter ẩn; salary bị giấu.

---

### 2.11 🔴 Marketplace Logistics / Delivery

- **Mẫu khuyến nghị:** Feature-rich + Real-time · Minimal flat.
- **Nên:** Map tracking real-time; status pulse; updates rõ ràng.
- **Không nên:** Tracking tĩnh; không map; thiếu trạng thái cập nhật.

---

## 3. Healthcare, Fintech & Trust‑Critical

### 3.1 🔴 Healthcare App

- **Mẫu khuyến nghị:** Social proof-focused · Neumorphism + Accessible & Ethical.
- **Màu:** Calm blue + health green; chống neon/gradient “AI purple/pink”.
- **Nên:** WCAG AAA, font ≥16px, alert màu đỏ rõ cho medication.
- **Không nên:** Neon bright; animation nhiều; style “AI gradient” thiếu nghiêm túc.

---

### 3.2 🔴 Wellness / Mental Health

- **Mẫu khuyến nghị:** Social proof-focused · Neumorphism + Accessible & Ethical.
- **Nên:** Privacy-first messaging; animation “breathing” nhẹ; typography calming.
- **Không nên:** Neon, motion overload; UI gây căng thẳng.

---

### 3.3 🔴 Medical Clinic / Pharmacy / Dental / Veterinary

- **Mẫu khuyến nghị:** Trust & Conversion · Accessible & Ethical / Soft UI.
- **Nên:** Booking online rõ; profile bác sĩ; insurance/prescription transparent; emergency contacts.
- **Không nên:** Interface lỗi thời; privacy mơ hồ; thiếu testimonial, before/after, service clarity.

---

### 3.4 🔴 Fintech / Crypto

- **Mẫu khuyến nghị:** Conversion-optimized · Glassmorphism + Dark (OLED).
- **Màu:** Dark tech + vibrant accent; typography modern & confident.
- **Nên:** Security badges; real-time data streaming; alert pulse cho rủi ro.
- **Không nên:** Light background generic; thiếu indicator security; gradient “AI” không liên quan.

---

### 3.5 🔴 Banking / Insurance / Traditional Finance

- **Mẫu khuyến nghị:** Trust & Authority · Minimal + Accessible & Ethical.
- **Màu:** Navy / trust blue + gold; copy nhấn mạnh security, fees rõ ràng.
- **Nên:** Number animation subtle; chỉ rõ phí, lãi suất, bảo hiểm; accessibility tốt.
- **Không nên:** Playful design; fee mập mờ; UX security yếu.

---

### 3.6 🔴 Government / Public

- **Mẫu khuyến nghị:** Minimal & Direct · Accessible & Ethical.
- **Nên:** WCAG AAA, keyboard navigation đầy đủ; focus ring 3–4px; skip link.
- **Không nên:** Ornate/motion heavy; contrast thấp; gradient “AI purple/pink”.

---

### 3.7 🔴 Legal Services / Consulting / Enterprise B2B

- **Mẫu khuyến nghị:** Trust & Authority + Minimal.
- **Nên:** Case results, credentials, thought leadership (blog, whitepaper).
- **Không nên:** Hidden credentials; template generic; gradient tím “AI”.

---

## 4. Education, Content & Community

### 4.1 🟡 Education / E‑learning

- **Mẫu khuyến nghị:** Feature-rich + Social proof · Claymorphism + Vibrant blocks.
- **Nên:** Progress tracking; video player tốt; gamification nhẹ (badge, level).
- **Không nên:** Dark mode nặng nề; jargon phức tạp; onboarding khô khan.

---

### 4.2 🟡 Portfolio / Personal / Creative Agency / Marketing Agency

- **Mẫu khuyến nghị:** Storytelling + Motion-driven (parallax, reveal).
- **Nên:** Case studies rõ; highlight kết quả; motion có chủ ý theo story.
- **Không nên:** Corporate template generic; ẩn portfolio; thiếu ví dụ công việc.

---

### 4.3 🔴 Knowledge Base / Documentation

- **Mẫu khuyến nghị:** FAQ + Minimal · Accessible & Ethical.
- **Nên:** “Search-first”; version switching; smooth scroll trong doc.
- **Không nên:** Navigation tệ; không có search; typography khó đọc.

---

### 4.4 🔴 News / Magazine / Blog

- **Mẫu khuyến nghị:** Storytelling + Hero · Minimalism + Motion.
- **Nên:** Mobile-first reading; category navigation rõ; breaking news badge.
- **Không nên:** Layout lộn xộn; loading chậm; typography rối.

---

### 4.5 🟡 Newsletter Platform

- **Mẫu khuyến nghị:** Minimal + Conversion.
- **Nên:** Subscribe form đơn giản; sample content/preview.
- **Không nên:** Signup flow phức tạp; không cho xem trước nội dung.

---

## 5. Dashboards, Data & Tools

### 5.1 🔴 SaaS / Financial / Analytics Dashboards

- **Mẫu khuyến nghị:** Data-dense · Dark mode (OLED) / Heat map.
- **Nên:** Real-time updates; hover tooltip; zoom/filter; high contrast.
- **Không nên:** Ornate decoration; render chậm; thiếu filter/export.

---

### 5.2 🔴 Developer Tools / IDE / Design System

- **Mẫu khuyến nghị:** Minimal + Documentation · Dark minimal.
- **Nên:** Keyboard shortcuts; command palette; search; live component preview.
- **Không nên:** Light mode default cho dev tool; không có documentation tốt.

---

### 5.3 🔴 Productivity / Collaboration / Remote Work

- **Mẫu khuyến nghị:** Feature-rich + Real-time · Soft UI minimal.
- **Nên:** Presence/status indicators; notification badges; real-time cursors nếu collaboration.
- **Không nên:** UI cluttered; không hiển thị trạng thái online/offline.

---

## 6. Social, Media & Entertainment

### 6.1 🟡 Social Media App / Membership / Community

- **Mẫu khuyến nghị:** Feature-rich + Social proof · Vibrant blocks + Motion.
- **Nên:** Member/creator profile; engagement metrics; activity feed rõ.
- **Không nên:** Skeuomorphism nặng; accessibility bị bỏ quên; community proof yếu.

---

### 6.2 🔴 Music / Podcast / Video Streaming / Theater

- **Mẫu khuyến nghị:** Dark mode OLED + Motion.
- **Nên:** Audio/video player UX xuất sắc (seek, queue, download); “continue watching/listening”; recommendation.
- **Không nên:** Player kém; layout cluttered; không có trailer/preview.

---

### 6.3 🔴 Gaming & Esports

- **Mẫu khuyến nghị:** Feature-rich showcase · 3D & Hyperrealism / Retro-futurism.
- **Nên:** Real-time stats; 3D asset; animation mạnh mẽ.
- **Không nên:** Design minimalist trống trải; asset static.

---

### 6.4 🔴 Dating App

- **Mẫu khuyến nghị:** Social proof + Feature-rich · Vibrant blocks + Motion.
- **Nên:** Profile card swipe; safety features; onboarding rõ ràng.
- **Không nên:** Profile generic; thiếu safety; flow match/báo cáo mơ hồ.

---

## 7. Niche Domains (Real Estate, Logistics, Smart Home, etc.)

*(Các mục dưới đây tóm lược nhanh – dùng khi Agent cần chọn pattern theo domain cụ thể.)*

- **Real Estate / Architecture / Interior / Hotel:** Hero + gallery chất lượng cao, 3D/virtual tour, map integration; tránh ảnh xấu, thiếu tour.
- **Logistics / EV / Smart Home / IoT:** Real-time map/telemetry, status pulse, control nhanh; tránh update chậm, thiếu cảnh báo.
- **Sustainability / ESG / Climate:** Data transparency, impact viz, certification badges; tránh “greenwashing” chỉ hình ảnh không dữ liệu.
- **Childcare / Senior Care / Non-profit / Church:** Trust + social proof, thông tin an toàn, hoạt động cộng đồng; tránh giấu safety/impact info.
- **Hyperlocal / Home Services / Cleaning / Insurance:** Map integration, booking/quote rõ; trust badges, emergency contact nơi cần; tránh contact/giá bị ẩn.

---

## Tóm tắt

| Nhóm                      | Ví dụ domain chính                        | Ưu tiên chính                          |
|---------------------------|-------------------------------------------|----------------------------------------|
| SaaS & Startup            | General SaaS, Micro SaaS, B2B, Landing   | Trust, clarity, conversion             |
| E‑commerce & Marketplace  | Shop, Luxury, Subscription, P2P          | Imagery, depth, social proof           |
| Healthcare & Fintech      | Clinic, Pharmacy, Banking, Insurance     | Accessibility, trust, clarity          |
| Education & Content       | E‑learning, Portfolios, Docs, News       | Readability, storytelling, search      |
| Dashboards & Tools        | Analytics, IDE, Productivity, DevTools   | Data density, performance, shortcuts   |
| Social & Entertainment    | Social apps, Media, Gaming, Dating       | Engagement, motion, player UX          |
| Logistics & Smart Systems | Delivery, EV, Smart Home, Telemetry      | Real-time, safety, spatial awareness   |
| Sustainability & Impact   | ESG, Climate, Non-profit, Community      | Transparency, impact visualization     |

Nguồn dữ liệu: [`ui-reasoning.csv`](https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/refs/heads/main/src/ui-ux-pro-max/data/ui-reasoning.csv) — [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill).
