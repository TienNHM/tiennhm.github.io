import React, { type ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

export interface VisitorBadgeProps {
  /** `metadata.permalink` của trang, đã bao gồm baseUrl của locale. */
  permalink?: string;
}

/**
 * VisitorBadge - badge đếm lượt xem cho trang blog và docs.
 *
 * Trước đây badge được dán tay vào từng file Markdown nên chỉ phủ 29 trang và
 * dễ quên khi viết bài mới. Component này gắn ở tầng theme để phủ toàn bộ.
 */
export default function VisitorBadge({ permalink }: VisitorBadgeProps): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  if (!permalink) {
    return null;
  }

  // visitorbadge.io đếm theo đúng chuỗi `path`. Domain khác nhau hay thừa dấu
  // `/` cuối đều bị tính thành hai bộ đếm riêng, nên phải chuẩn hoá về một dạng.
  const siteUrl = siteConfig.url.replace(/\/$/, '');
  const path = permalink.length > 1 ? permalink.replace(/\/$/, '') : permalink;

  // URLSearchParams tự mã hoá `#` của mã màu và ký tự ngoài ASCII của nhãn.
  const params = new URLSearchParams({
    path: `${siteUrl}${path}`,
    label: '⚪View',
    labelColor: '#37d67a',
    countColor: '#555555',
    style: 'flat',
    labelStyle: 'upper',
  });

  return (
    <img
      className={styles.badge}
      src={`https://api.visitorbadge.io/api/visitors?${params.toString()}`}
      alt="Số lượt xem trang"
      loading="lazy"
      decoding="async"
    />
  );
}
