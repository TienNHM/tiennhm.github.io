import React, { useCallback, useState } from 'react';
import clsx from 'clsx';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';

type CopyState = 'idle' | 'loading' | 'copied' | 'error';

/**
 * Nút copy toàn bộ nội dung trang dưới dạng Markdown, để dán cho AI agent.
 *
 * Không đọc ngược từ DOM: sau khi Docusaurus biên dịch MDX thành React thì
 * markdown gốc không còn ở phía trình duyệt nữa, và đọc DOM chỉ ra HTML đã
 * render — mất heading, bảng, code fence, tức mất đúng thứ agent cần.
 *
 * Thay vào đó plugin `page-markdown` sinh sẵn một file .md cho mỗi route lúc
 * build, đặt ở `/md<route>.md`. Nút chỉ fetch file đó khi người dùng bấm, nên
 * không cộng byte nào vào lượt tải trang của người không dùng tới.
 *
 * Trang nào không có file .md tương ứng — ví dụ trang category do Docusaurus
 * tự sinh từ _category_.json, vốn không có file nguồn — thì nút tự ẩn sau lần
 * fetch hỏng đầu tiên thay vì hiện lỗi.
 */
export default function CopyMarkdownButton({
    className,
}: {
    className?: string;
}): React.ReactElement | null {
    const { pathname } = useLocation();
    const {
        siteConfig: { baseUrl },
    } = useDocusaurusContext();
    const [state, setState] = useState<CopyState>('idle');
    const [hidden, setHidden] = useState(false);

    const handleClick = useCallback(async () => {
        setState('loading');

        // pathname đã gồm baseUrl; bỏ ra rồi ghép lại để đúng ở mọi locale.
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
            await navigator.clipboard.writeText(await response.text());
            setState('copied');
            setTimeout(() => setState('idle'), 2000);
        } catch {
            setState('error');
            setTimeout(() => setState('idle'), 2500);
        }
    }, [pathname, baseUrl]);

    if (hidden) {
        return null;
    }

    const label = {
        idle: translate({
            id: 'copyMarkdown.idle',
            message: 'Copy Markdown cho AI',
            description: 'Nhãn nút copy nội dung trang dạng Markdown',
        }),
        loading: translate({
            id: 'copyMarkdown.loading',
            message: 'Đang lấy nội dung…',
            description: 'Nhãn nút copy Markdown khi đang tải',
        }),
        copied: translate({
            id: 'copyMarkdown.done',
            message: 'Đã copy!',
            description: 'Nhãn nút copy Markdown khi đã copy xong',
        }),
        error: translate({
            id: 'copyMarkdown.error',
            message: 'Không copy được',
            description: 'Nhãn nút copy Markdown khi lỗi',
        }),
    }[state];

    return (
        <button
            type="button"
            className={clsx(
                'button button--sm button--secondary',
                'copy-markdown-button',
                styles.button,
                className,
            )}
            onClick={handleClick}
            disabled={state === 'loading'}
            title={translate({
                id: 'copyMarkdown.title',
                message:
                    'Copy toàn bộ nội dung trang dưới dạng Markdown để dán vào ChatGPT, Claude hoặc AI agent khác',
                description: 'Tooltip của nút copy Markdown',
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
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </>
                )}
            </svg>
            {label}
        </button>
    );
}
