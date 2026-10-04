import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import PdfExportActions from '@site/src/components/PdfExportActions';
import CopyMarkdownButton from '@site/src/components/CopyMarkdownButton';
import VisitorBadge from '@site/src/components/VisitorBadge';
import CopySkillButton from '@site/src/components/CopySkillButton';
import ShareButton from '@site/src/components/ShareButton';
import styles from './styles.module.css';

export interface PageActionsProps {
  /** `metadata.permalink` của trang. */
  permalink?: string;
  /** Tên skill; có giá trị thì hiện thêm nút copy dạng SKILL.md. */
  skillName?: string;
  /** Mô tả cho frontmatter của SKILL.md. */
  skillDescription?: string;
  /** Tiêu đề trang; thiếu thì nút chia sẻ tự ẩn. */
  title?: string;
  /** Mô tả trang, dùng làm phần tóm tắt trong bài đăng chia sẻ. */
  description?: string;
  /** Thẻ của bài, dùng sinh hashtag. */
  tags?: { label: string; permalink: string }[];
  className?: string;
}

/**
 * PageActions - hàng "Lưu PDF", "Copy markdown", "Chia sẻ" và badge lượt xem.
 *
 * Gom về một chỗ để trang blog và trang docs dùng chung, thay vì mỗi theme tự
 * dựng lại hàng này kèm CSS riêng.
 */
export default function PageActions({
  permalink,
  skillName,
  skillDescription,
  title,
  description,
  tags,
  className,
}: PageActionsProps): ReactNode {
  return (
    <div className={clsx('page-actions', styles.pageActions, className)}>
      <PdfExportActions permalink={permalink} />
      <CopyMarkdownButton />
      <CopySkillButton skillName={skillName} skillDescription={skillDescription} />
      <ShareButton permalink={permalink} title={title} description={description} tags={tags} />
      <VisitorBadge permalink={permalink} />
    </div>
  );
}
