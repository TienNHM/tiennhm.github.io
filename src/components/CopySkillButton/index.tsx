import React, { useCallback, useState, type ReactNode } from 'react';
import clsx from 'clsx';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';

type CopyState = 'idle' | 'loading' | 'copied' | 'error';

export interface CopySkillButtonProps {
  /** Tên skill, cũng là trường `name` trong frontmatter. Không có thì nút ẩn. */
  skillName?: string;
  /** Mô tả cho trường `description`. Nên viết theo hướng KHI NÀO dùng. */
  skillDescription?: string;
  className?: string;
}

/** Bọc chuỗi thành scalar YAML an toàn: mô tả hay chứa dấu hai chấm và dấu phẩy. */
function yamlString(value: string): string {
  return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

/**
 * Nút copy trang dưới dạng SKILL.md — dán thẳng vào thư mục skill là chạy.
 *
 * Khác nút "Copy markdown" ở chỗ nào: nút kia trả về đúng nội dung trang, hợp
 * để dán vào cửa sổ chat. Skill thì cần thêm frontmatter `name` và
 * `description`, vì `description` mới là thứ quyết định agent có kích hoạt
 * skill hay không — thân bài chỉ được đọc sau khi đã quyết định.
 *
 * Tái dùng file .md do plugin `page-markdown` sinh sẵn, chỉ thêm frontmatter ở
 * đầu, nên không phải dựng lại đường map route -> nguồn.
 */
export default function CopySkillButton({
  skillName,
  skillDescription,
  className,
}: CopySkillButtonProps): ReactNode {
  const { pathname } = useLocation();
  const {
    siteConfig: { baseUrl },
  } = useDocusaurusContext();
  const [state, setState] = useState<CopyState>('idle');
  const [hidden, setHidden] = useState(false);

  const handleClick = useCallback(async () => {
    if (!skillName) {
      return;
    }
    setState('loading');

    const routePath = pathname.startsWith(baseUrl)
      ? pathname.slice(baseUrl.length)
      : pathname.replace(/^\//, '');
    const markdownUrl = `${baseUrl}md/${routePath.replace(/\/$/, '')}.md`;

    try {
      const response = await fetch(markdownUrl);
      if (!response.ok) {
        setHidden(true);
        return;
      }
      const body = await response.text();
      const frontMatter = [
        '---',
        `name: ${skillName}`,
        `description: ${yamlString(skillDescription ?? skillName)}`,
        '---',
        '',
      ].join('\n');
      await navigator.clipboard.writeText(`${frontMatter}\n${body}`);
      setState('copied');
      setTimeout(() => setState('idle'), 2000);
    } catch {
      setState('error');
      setTimeout(() => setState('idle'), 2500);
    }
  }, [pathname, baseUrl, skillName, skillDescription]);

  if (!skillName || hidden) {
    return null;
  }

  const label = {
    idle: translate({
      id: 'copySkill.idle',
      message: 'Copy SKILL.md',
      description: 'Nhãn nút copy trang dưới dạng file SKILL.md',
    }),
    loading: translate({
      id: 'copySkill.loading',
      message: 'Đang lấy nội dung…',
      description: 'Nhãn nút copy SKILL.md khi đang tải',
    }),
    copied: translate({
      id: 'copySkill.done',
      message: 'Đã copy!',
      description: 'Nhãn nút copy SKILL.md khi đã copy xong',
    }),
    error: translate({
      id: 'copySkill.error',
      message: 'Không copy được',
      description: 'Nhãn nút copy SKILL.md khi lỗi',
    }),
  }[state];

  return (
    <button
      type="button"
      className={clsx('button button--sm button--secondary', 'copy-skill-button', styles.button, className)}
      onClick={handleClick}
      disabled={state === 'loading'}
      title={translate({
        id: 'copySkill.title',
        message:
          'Copy trang này dưới dạng SKILL.md kèm frontmatter, dán vào thư mục skill của agent là dùng được ngay',
        description: 'Tooltip của nút copy SKILL.md',
      })}
    >
      <svg
        className={styles.icon}
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {state === 'copied' ? (
          <polyline points="20 6 9 17 4 12" />
        ) : (
          <>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </>
        )}
      </svg>
      {label}
    </button>
  );
}
