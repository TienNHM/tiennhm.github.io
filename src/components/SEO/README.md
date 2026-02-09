# SEO/GEO Components

Bộ component tối ưu SEO/GEO cho blog Docusaurus, giúp nội dung dễ dàng được AI Agents trích dẫn và tóm tắt.

## Cài đặt

Các component đã được tích hợp sẵn trong project. Import từ:

```tsx
import { SummaryBox, FAQSection, Checklist, ArticleStructuredData, HowToStructuredData } from '@site/src/components/SEO';
```

## Components

### 1. SummaryBox

Tạo khối tóm tắt (TL;DR) cho bài viết.

```mdx
<SummaryBox>
Nội dung tóm tắt ngắn gọn 2-4 dòng về bài viết.
</SummaryBox>
```

### 2. FAQSection

Tạo FAQ với structured data (FAQPage schema).

```mdx
<FAQSection 
  items={[
    {
      question: "Câu hỏi?",
      answer: "Câu trả lời..."
    }
  ]}
/>
```

### 3. Checklist

Tạo checklist có cấu trúc.

```mdx
<Checklist 
  items={[
    { text: "Item 1" },
    { text: "Item 2", checked: true }
  ]}
/>
```

### 4. ArticleStructuredData

Tạo JSON-LD cho bài viết (thường dùng trong theme customization).

### 5. HowToStructuredData

Tạo JSON-LD cho hướng dẫn step-by-step.

```mdx
<HowToStructuredData
  name="Tên hướng dẫn"
  description="Mô tả"
  steps={[
    { name: "Bước 1", text: "Mô tả bước 1" }
  ]}
/>
```

## Xem thêm

Xem file `docs/seo-geo-guide.mdx` để biết hướng dẫn chi tiết và best practices.
