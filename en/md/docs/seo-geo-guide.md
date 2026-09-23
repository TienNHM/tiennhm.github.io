# Hướng dẫn Tối ưu SEO/GEO cho Blog

> Nguồn: https://tiennhm.io.vn/en/docs/seo-geo-guide
> Hướng dẫn sử dụng các component SEO/GEO để tối ưu blog cho AI Agents và search engines

> Hướng dẫn này giải thích cách sử dụng các component SEO/GEO đã được tích hợp sẵn trong blog để tối ưu nội dung cho AI Agents (ChatGPT, Gemini, Perplexity, Copilot, Claude) và search engines. Các component này giúp nội dung của bạn dễ dàng được AI trích dẫn, tóm tắt và giới thiệu.

## Tổng quan về SEO → GEO

Trong **thời đại AI Agents**, SEO không còn chỉ là "lên top Google" mà đã chuyển dịch sang **tối ưu để được AI trích dẫn, tóm tắt và giới thiệu** (GEO - Generative Engine Optimization).

### Thay đổi cốt lõi

**Trước đây:**
- User → Google → Click link → Đọc bài

**Hiện nay:**
- User → AI Agent → **Câu trả lời tổng hợp**
- Website **không được click**, nhưng **được trích dẫn**

👉 **Mục tiêu SEO mới**: Trở thành nguồn dữ liệu đáng tin để AI sử dụng

## Các Component SEO/GEO có sẵn

### 1. SummaryBox - Khối Tóm tắt (TL;DR)

Component này tạo khối tóm tắt ngay đầu bài viết, giúp AI Agents dễ dàng trích xuất nội dung chính.

**Cách sử dụng:**

```mdx
import { SummaryBox } from '@site/src/components/SEO';

<SummaryBox>
Đây là nội dung tóm tắt ngắn gọn 2-4 dòng về bài viết.
AI Agents sẽ ưu tiên trích xuất nội dung này khi tổng hợp câu trả lời.
</SummaryBox>
```

**Ví dụ thực tế:**

> SummaryBox giúp bạn tạo khối tóm tắt đẹp mắt và có cấu trúc, giúp cả người đọc và AI Agents nhanh chóng nắm bắt nội dung chính của bài viết.

### 2. FAQSection - Câu hỏi Thường gặp

Component này tạo section FAQ với structured data (FAQPage schema), giúp AI Agents và search engines hiểu rõ cấu trúc Q&A.

**Cách sử dụng:**

```mdx
import { FAQSection } from '@site/src/components/SEO';

<FAQSection
  title="Câu hỏi thường gặp"
  items={[
    {
      question: "SEO và GEO khác nhau như thế nào?",
      answer: "SEO tập trung vào việc tối ưu để xuất hiện trên Google Search. GEO tập trung vào việc tối ưu để được AI Agents trích dẫn và tóm tắt trong câu trả lời."
    },
    {
      question: "Tại sao structured data quan trọng?",
      answer: "Structured data giúp AI Agents và search engines hiểu rõ cấu trúc nội dung, từ đó có thể trích xuất và tổng hợp thông tin chính xác hơn."
    }
  ]}
/>
```

**Ví dụ thực tế:**

## Câu hỏi về SEO/GEO

### Component FAQSection tự động tạo structured data không?

Có, FAQSection tự động tạo JSON-LD với schema FAQPage khi bạn sử dụng. Bạn không cần tự viết structured data thủ công.

### Có thể dùng FAQSection trong blog posts không?

Có, bạn có thể dùng FAQSection trong bất kỳ file MDX nào, bao gồm blog posts và docs pages.

### 3. Checklist - Danh sách Kiểm tra

Component này tạo checklist có cấu trúc, giúp AI Agents dễ dàng trích xuất các điểm chính dạng bullet points.

**Cách sử dụng:**

```mdx
import { Checklist } from '@site/src/components/SEO';

<Checklist
  title="Các bước tối ưu SEO/GEO"
  items={[
    { text: "Thêm SummaryBox vào đầu mỗi bài viết" },
    { text: "Sử dụng FAQSection cho các câu hỏi thường gặp", checked: true },
    { text: "Thêm Checklist cho các bước hướng dẫn" },
    { text: "Sử dụng ArticleStructuredData cho blog posts" }
  ]}
/>
```

**Ví dụ thực tế:**

**Checklist tối ưu SEO/GEO**

- [ ] Viết tiêu đề dạng câu hỏi khi phù hợp
- [x] Thêm đoạn trả lời ngắn 2-4 dòng ngay đầu bài
- [ ] Sử dụng headings mô tả (H2, H3)
- [x] Bao gồm case studies và kinh nghiệm thực tế
- [ ] Thêm structured data (JSON-LD)

### 4. ArticleStructuredData - Structured Data cho Bài viết

Component này tự động tạo JSON-LD structured data cho bài viết, giúp AI Agents hiểu rõ metadata.

**Cách sử dụng:**

```mdx
import { ArticleStructuredData } from '@site/src/components/SEO';

<ArticleStructuredData
  title="Tiêu đề bài viết"
  description="Mô tả bài viết"
  author={{
    name: "Nguyễn Huỳnh Minh Tiến",
    url: "https://github.com/TienNHM",
    image: "https://github.com/TienNHM.png"
  }}
  datePublished="2025-02-09"
  dateModified="2025-02-10"
  image="https://example.com/image.jpg"
  keywords={["SEO", "GEO", "AI"]}
  articleType="BlogPosting"
/>
```

**Lưu ý:** Component này thường được sử dụng trong blog post template hoặc theme customization, không phải trong từng bài viết riêng lẻ.

### 5. HowToStructuredData - Structured Data cho Hướng dẫn

Component này tạo JSON-LD cho hướng dẫn step-by-step, giúp AI Agents hiểu rõ cấu trúc hướng dẫn.

**Cách sử dụng:**

```mdx
import { HowToStructuredData } from '@site/src/components/SEO';

<HowToStructuredData
  name="Cách tối ưu SEO cho Docusaurus"
  description="Hướng dẫn chi tiết từng bước để tối ưu blog Docusaurus cho AI Agents"
  totalTime="PT45M"
  steps={[
    {
      name: "Bước 1: Cài đặt các component SEO",
      text: "Import các component từ @site/src/components/SEO"
    },
    {
      name: "Bước 2: Thêm SummaryBox vào bài viết",
      text: "Thêm component SummaryBox ngay sau tiêu đề để tóm tắt nội dung"
    },
    {
      name: "Bước 3: Sử dụng FAQSection cho Q&A",
      text: "Tạo FAQSection với các câu hỏi và câu trả lời liên quan"
    }
  ]}
/>
```

## Best Practices cho SEO/GEO

### 1. Viết để được trích dẫn, không chỉ để đọc

- **Tiêu đề dạng câu hỏi**: "AI Agents là gì?" thay vì "Giới thiệu về AI Agents"
- **Đoạn trả lời ngắn ngay đầu**: 2-4 dòng trả lời trực tiếp câu hỏi
- **Sau đó mới phân tích sâu**: Chi tiết và case studies

### 2. Nội dung "Expert-level" > Content SEO rỗng

AI phân biệt được bài viết chung chung và bài viết có kinh nghiệm thật. Ưu tiên:

- Case studies với số liệu cụ thể
- So sánh có lý do và trade-offs
- Anti-patterns và hạn chế
- Kinh nghiệm từ dự án thực tế

### 3. Structured Data là ngôn ngữ AI hiểu nhanh nhất

Luôn sử dụng structured data cho:
- FAQ → FAQPage schema
- Hướng dẫn → HowTo schema
- Bài viết → Article/BlogPosting schema
- Sản phẩm → Product/SoftwareApplication schema

### 4. Nội dung dạng "có thể trích nguyên đoạn"

AI thường trích:
- Bullet points
- Bảng so sánh
- Định nghĩa ngắn
- Checklist

**Nên có trong mỗi bài:**
- TL;DR (SummaryBox)
- Summary box
- Checklist

## Ví dụ Template cho Blog Post

```mdx
---
title: Tiêu đề bài viết (dạng câu hỏi nếu phù hợp)
description: Mô tả ngắn gọn 2-4 câu trả lời trực tiếp câu hỏi chính
tags: [tag1, tag2]
author: TienNHM
date: 2025-02-09
keywords: [keyword1, keyword2]
---

import { SummaryBox, FAQSection, Checklist } from '@site/src/components/SEO';

# Tiêu đề bài viết

<SummaryBox>
Đây là đoạn tóm tắt ngắn gọn 2-4 dòng trả lời trực tiếp câu hỏi chính của bài viết.
AI Agents sẽ ưu tiên trích xuất nội dung này.
</SummaryBox>

## Phần 1: Giới thiệu

Nội dung chi tiết...

## Phần 2: Hướng dẫn

<Checklist
  title="Các bước thực hiện"
  items={[
    { text: "Bước 1: ..." },
    { text: "Bước 2: ..." },
    { text: "Bước 3: ..." }
  ]}
/>

## Câu hỏi thường gặp

<FAQSection
  items={[
    {
      question: "Câu hỏi 1?",
      answer: "Câu trả lời chi tiết..."
    },
    {
      question: "Câu hỏi 2?",
      answer: "Câu trả lời chi tiết..."
    }
  ]}
/>

## Kết luận

Tóm tắt lại và nhấn mạnh điểm chính...
```

## Tài liệu tham khảo

- [Schema.org Documentation](https://schema.org/)
- [Google Search Central - Structured Data](https://developers.google.com/search/docs/appearance/structured-data)
- [Docusaurus SEO Best Practices](https://docusaurus.io/docs/seo)

---

**Cập nhật lần cuối**: Tháng 2, 2025
