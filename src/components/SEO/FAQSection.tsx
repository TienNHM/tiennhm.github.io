import React, { useMemo } from 'react';
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
  title = 'Câu hỏi thường gặp',
  generateStructuredData = true 
}: FAQSectionProps) {
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

  return (
    <>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      <section className={styles.faqSection} aria-labelledby="faq-title">
        <h2 id="faq-title" className={styles.faqSection__title}>
          {title}
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
