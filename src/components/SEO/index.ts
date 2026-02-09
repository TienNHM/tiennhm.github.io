/**
 * SEO Components for GEO (Generative Engine Optimization)
 * 
 * Các component này giúp tối ưu blog để được AI Agents trích dẫn và tóm tắt:
 * - SummaryBox: Tạo khối tóm tắt (TL;DR) dễ được AI trích xuất
 * - FAQSection: Tạo FAQ với structured data (FAQPage schema)
 * - Checklist: Tạo checklist có cấu trúc để AI dễ đọc
 * - ArticleStructuredData: Tự động tạo JSON-LD cho bài viết
 * - HowToStructuredData: Tạo JSON-LD cho hướng dẫn step-by-step
 */

export { SummaryBox } from './SummaryBox';
export type { SummaryBoxProps } from './SummaryBox';

export { FAQSection } from './FAQSection';
export type { FAQItem, FAQSectionProps } from './FAQSection';

export { Checklist } from './Checklist';
export type { ChecklistItem, ChecklistProps } from './Checklist';

export { ArticleStructuredData } from './ArticleStructuredData';
export type { ArticleStructuredDataProps } from './ArticleStructuredData';

export { HowToStructuredData } from './HowToStructuredData';
export type { HowToStep, HowToStructuredDataProps } from './HowToStructuredData';
