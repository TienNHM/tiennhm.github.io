import React from 'react';
import { translate } from '@docusaurus/Translate';
import styles from './SummaryBox.module.css';

export interface SummaryBoxProps {
  children: React.ReactNode;
  title?: string;
}

/**
 * SummaryBox component - Tạo khối tóm tắt (TL;DR) cho bài viết
 * Giúp AI Agents dễ dàng trích xuất và trích dẫn nội dung chính
 * 
 * Usage in MDX:
 * ```mdx
 * <SummaryBox>
 *   Đây là nội dung tóm tắt ngắn gọn 2-4 dòng về bài viết...
 * </SummaryBox>
 * ```
 */
export function SummaryBox({ children, title }: SummaryBoxProps) {
  // Mặc định phải đi qua translate() chứ không hardcode: component này được
  // dùng ở mọi bài, và không bài nào truyền `title`, nên chuỗi cứng sẽ hiện
  // tiếng Việt trên toàn bộ trang tiếng Anh.
  const heading =
    title ??
    translate({
      id: 'component.summaryBox.title',
      message: 'Tóm tắt',
      description: 'Tiêu đề khối tóm tắt TL;DR ở đầu bài viết',
    });
  const ariaLabel = translate({
    id: 'component.summaryBox.ariaLabel',
    message: 'Tóm tắt bài viết',
    description: 'Nhãn trợ năng cho khối tóm tắt',
  });

  return (
    <div className={styles.summaryBox} role="note" aria-label={ariaLabel}>
      <div className={styles.summaryBox__header}>
        <svg
          className={styles.summaryBox__icon}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
        <strong className={styles.summaryBox__title}>{heading}</strong>
      </div>
      <div className={styles.summaryBox__content}>
        {children}
      </div>
    </div>
  );
}
