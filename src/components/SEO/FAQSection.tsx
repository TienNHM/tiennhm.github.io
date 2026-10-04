import React, { useMemo } from 'react';
import Head from '@docusaurus/Head';
import { translate } from '@docusaurus/Translate';
import styles from './FAQSection.module.css';

export interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

export interface FAQSectionProps {
  items: FAQItem[];
  title?: string;
  generateStructuredData?: boolean;
}

/**
 * FAQSection component - Tạo section FAQ với structured data (FAQPage schema)
 * Giúp AI Agents và search engines hiểu rõ cấu trúc Q&A trong bài viết
 * 
 * Usage in MDX:
 * ```mdx
 * <FAQSection 
 *   items={[
 *     {
 *       question: "Câu hỏi 1?",
 *       answer: "Câu trả lời chi tiết..."
 *     },
 *     {
 *       question: "Câu hỏi 2?",
 *       answer: "Câu trả lời chi tiết..."
 *     }
 *   ]}
 * />
 * ```
 */
export function FAQSection({ 
  items, 
  title,
  generateStructuredData = true 
}: FAQSectionProps) {
  // Xem ghi chú ở SummaryBox: mặc định hardcode sẽ rò tiếng Việt sang locale en.
  const heading =
    title ??
    translate({
      id: 'component.faqSection.title',
      message: 'Câu hỏi thường gặp',
      description: 'Tiêu đề mặc định của khối FAQ trong bài viết',
    });
  const structuredData = useMemo(() => {
    if (!generateStructuredData || !items.length) return null;

    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items.map((item) => ({
        '@type': 'Question',
        name: typeof item.question === 'string' ? item.question : '',
        acceptedAnswer: {
          '@type': 'Answer',
          text: typeof item.answer === 'string' ? item.answer : '',
        },
      })),
    };
  }, [items, generateStructuredData]);

  /*
   * JSON-LD đặt trong <Head> chứ không render thẳng vào thân bài.
   *
   * Render inline thì khối JSON lọt vào content:encoded của RSS. dev.to (và mọi
   * nơi nhập bài từ feed) lọc bỏ thẻ <script> nhưng GIỮ phần chữ bên trong, nên
   * cuối bài hiện ra một mảng JSON thô. Đã gặp thật khi nhập bài sang dev.to.
   *
   * Đặt trong <Head> thì Google vẫn đọc được như thường — đây mới là chỗ quy ước
   * cho dữ liệu có cấu trúc — còn thân bài sạch.
   */
  return (
    <>
      {structuredData && (
        <Head>
          <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        </Head>
      )}
      <section className={styles.faqSection} aria-labelledby="faq-title">
        <h2 id="faq-title" className={styles.faqSection__title}>
          {heading}
        </h2>
        <div className={styles.faqSection__list}>
          {items.map((item, index) => (
            <div key={index} className={styles.faqItem} itemScope itemType="https://schema.org/Question">
              <h3 className={styles.faqItem__question} itemProp="name">
                {item.question}
              </h3>
              <div className={styles.faqItem__answer} itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                <div itemProp="text">
                  {typeof item.answer === 'string' ? <p>{item.answer}</p> : item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
