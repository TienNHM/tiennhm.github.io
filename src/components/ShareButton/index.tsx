import React, { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { translate } from '@docusaurus/Translate';
import { buildSharePost, type SharePlatform } from '@site/src/utils/sharePost';
import styles from './styles.module.css';

export interface ShareButtonProps {
  /** `metadata.permalink` của trang. */
  permalink?: string;
  title?: string;
  description?: string;
  tags?: { label: string; permalink: string }[];
  className?: string;
}

const PLATFORMS: { id: SharePlatform; name: string; icon: ReactNode }[] = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: (
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13M7.12 20.45H3.55V9h3.57zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0" />
    ),
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: (
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.5h-2.8V24C19.61 23.1 24 18.1 24 12.07" />
    ),
  },
  {
    id: 'x',
    name: 'X',
    icon: (
      <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.59l5.24 6.93zm-1.29 19.5h2.04L6.49 3.24H4.3z" />
    ),
  },
];

type CopyState = { platform: SharePlatform; ok: boolean } | null;

/**
 * Nút chia sẻ kèm nội dung dựng sẵn cho từng nền tảng.
 *
 * Khác nút chia sẻ thông thường ở chỗ: nó không chỉ mở hộp thoại rồi để người
 * dùng tự nghĩ caption. Nó chép sẵn một bài đăng hoàn chỉnh — tiêu đề, tóm
 * tắt, link kèm tham số theo dõi và hashtag — đúng khuôn của từng nền tảng.
 *
 * Logic dựng chữ nằm ở src/utils/sharePost.ts để kiểm được bằng
 * `npm run check -- share-post`, chạy trên bài viết thật trong repo.
 */
export default function ShareButton({
  permalink,
  title,
  description,
  tags,
  className,
}: ShareButtonProps): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<CopyState>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // Đóng khi bấm ra ngoài hoặc nhấn Escape. Thiếu phần này thì popover kẹt lại
  // trên màn hình khi người dùng cuộn đi chỗ khác.
  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const url = `${siteConfig.url.replace(/\/$/, '')}${permalink ?? ''}`;

  const handleCopy = useCallback(
    async (platform: SharePlatform) => {
      const { text } = buildSharePost(platform, { title: title ?? '', description, url, tags });
      try {
        await navigator.clipboard.writeText(text);
        setCopied({ platform, ok: true });
      } catch {
        setCopied({ platform, ok: false });
      }
      setTimeout(() => setCopied(null), 2200);
    },
    [title, description, url, tags],
  );

  if (!permalink || !title) {
    return null;
  }

  return (
    <div ref={rootRef} className={clsx(styles.root, className)}>
      <button
        type="button"
        className={clsx('button button--sm button--secondary', styles.trigger)}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        title={translate({
          id: 'share.title',
          message: 'Chia sẻ bài này — nội dung bài đăng được chép sẵn theo từng nền tảng',
          description: 'Tooltip của nút chia sẻ',
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
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
        {translate({ id: 'share.label', message: 'Chia sẻ', description: 'Nhãn nút chia sẻ' })}
      </button>

      {open && (
        <div className={styles.popover} role="menu">
          <p className={styles.hint}>
            {translate({
              id: 'share.hint',
              message: 'Copy là có sẵn bài đăng hoàn chỉnh, dán thẳng vào ô soạn.',
              description: 'Câu hướng dẫn trong hộp chia sẻ',
            })}
          </p>

          {PLATFORMS.map(({ id, name, icon }) => {
            const { shareUrl } = buildSharePost(id, {
              title: title ?? '',
              description,
              url,
              tags,
            });
            const state = copied?.platform === id ? copied : null;

            return (
              <div key={id} className={styles.row}>
                <span className={styles.platform}>
                  <svg
                    className={styles.brand}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    {icon}
                  </svg>
                  {name}
                </span>

                <button
                  type="button"
                  className={clsx('button button--sm', styles.copy)}
                  onClick={() => handleCopy(id)}
                >
                  {state
                    ? state.ok
                      ? translate({ id: 'share.copied', message: 'Đã copy!', description: 'Nhãn sau khi copy nội dung chia sẻ' })
                      : translate({ id: 'share.copyError', message: 'Không copy được', description: 'Nhãn khi copy lỗi' })
                    : translate({ id: 'share.copy', message: 'Copy bài đăng', description: 'Nhãn nút copy nội dung chia sẻ' })}
                </button>

                <a
                  className={clsx('button button--sm', styles.open)}
                  href={shareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {translate({ id: 'share.open', message: 'Mở', description: 'Nhãn nút mở hộp thoại chia sẻ' })}
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
