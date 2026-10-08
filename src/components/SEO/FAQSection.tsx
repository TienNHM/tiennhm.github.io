import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
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
  /** Mở sẵn mọi câu trả lời khi tải trang. Mặc định chỉ mở câu đầu tiên. */
  defaultOpen?: boolean;
}

/**
 * FAQSection component - Tạo section FAQ với structured data (FAQPage schema)
 * Giúp AI Agents và search engines hiểu rõ cấu trúc Q&A trong bài viết
 *
 * Mỗi câu hỏi là một <details>/<summary> nên thu gọn được mà không cần JS:
 * bàn phím, trình đọc màn hình và Ctrl+F (tự mở câu chứa từ khoá) đều chạy sẵn,
 * còn câu trả lời vẫn nằm trong HTML cho Google đọc.
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
  generateStructuredData = true,
  defaultOpen = false,
}: FAQSectionProps) {
  // Xem ghi chú ở SummaryBox: mặc định hardcode sẽ rò tiếng Việt sang locale en.
  const heading =
    title ??
    translate({
      id: 'component.faqSection.title',
      message: 'Câu hỏi thường gặp',
      description: 'Tiêu đề mặc định của khối FAQ trong bài viết',
    });
  const expandAllLabel = translate({
    id: 'component.faqSection.expandAll',
    message: 'Mở tất cả',
    description: 'Nút mở mọi câu trả lời trong khối FAQ',
  });
  const collapseAllLabel = translate({
    id: 'component.faqSection.collapseAll',
    message: 'Thu gọn tất cả',
    description: 'Nút thu gọn mọi câu trả lời trong khối FAQ',
  });

  const headingId = useId();
  const detailsRefs = useRef<(HTMLDetailsElement | null)[]>([]);
  const [openCount, setOpenCount] = useState(() =>
    defaultOpen ? items.length : Math.min(items.length, 1),
  );
  const allOpen = items.length > 0 && openCount === items.length;

  // <details> tự giữ trạng thái; ở đây chỉ đếm lại để nút toàn cục biết nên hiện chữ nào.
  const syncOpenCount = useCallback(() => {
    setOpenCount(detailsRefs.current.filter((el) => el?.open).length);
  }, []);

  const toggleAll = () => {
    const next = !allOpen;
    detailsRefs.current.forEach((el) => {
      if (el) el.open = next;
    });
    syncOpenCount();
  };

  // Khối đang thu gọn sẽ mất chữ khi in, nên mở hết trước khi in.
  useEffect(() => {
    const openForPrint = () => {
      detailsRefs.current.forEach((el) => {
        if (el) el.open = true;
      });
      syncOpenCount();
    };
    window.addEventListener('beforeprint', openForPrint);
    return () => window.removeEventListener('beforeprint', openForPrint);
  }, [syncOpenCount]);

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
      <section className={styles.faqSection} aria-labelledby={headingId}>
        <div className={styles.faqSection__header}>
          <h2 id={headingId} className={styles.faqSection__title}>
            {heading}
          </h2>
          {items.length > 1 && (
            <button type="button" className={styles.faqSection__toggleAll} onClick={toggleAll}>
              {allOpen ? collapseAllLabel : expandAllLabel}
            </button>
          )}
        </div>
        <div className={styles.faqSection__list}>
          {items.map((item, index) => (
            <details
              key={index}
              ref={(el) => {
                detailsRefs.current[index] = el;
              }}
              className={styles.faqItem}
              open={defaultOpen || index === 0}
              onToggle={syncOpenCount}
              itemScope
              itemType="https://schema.org/Question"
            >
              <summary className={styles.faqItem__summary}>
                <h3 className={styles.faqItem__question} itemProp="name">
                  {item.question}
                </h3>
                <svg
                  className={styles.faqItem__chevron}
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </summary>
              <div
                className={styles.faqItem__answer}
                itemScope
                itemType="https://schema.org/Answer"
                itemProp="acceptedAnswer"
              >
                <div itemProp="text">
                  {typeof item.answer === 'string' ? <p>{item.answer}</p> : item.answer}
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
