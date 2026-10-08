import React, { useCallback, useEffect, useState, type ReactNode } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import BlogSidebar from '@theme/BlogSidebar';
import { translate } from '@docusaurus/Translate';
import type { Props } from '@theme/BlogLayout';

import styles from './styles.module.css';

/*
 * Bản swizzle của BlogLayout gốc (theme-classic 3.9): thêm hai nút ẩn/hiện cột
 * danh sách bài bên trái và mục lục bên phải, để bài dài có thêm chỗ.
 *
 * Trạng thái nằm ở data-attribute trên <html> chứ không ở React state, vì nó
 * phải có hiệu lực trước khi React hydrate: script trong config/head-tags.js
 * đọc localStorage và gắn sẵn attribute, CSS ẩn cột theo attribute đó. React
 * chỉ đọc lại để vẽ đúng nút, và ghi khi người đọc bấm.
 */
type Panel = 'sidebar' | 'toc';

const storageKey = (panel: Panel) => `blog-layout-${panel}`;
const attrName = (panel: Panel) => `data-blog-${panel}`;

function readHidden(panel: Panel): boolean {
  return document.documentElement.getAttribute(attrName(panel)) === 'hidden';
}

function writeHidden(panel: Panel, hidden: boolean) {
  const root = document.documentElement;
  if (hidden) root.setAttribute(attrName(panel), 'hidden');
  else root.removeAttribute(attrName(panel));
  try {
    if (hidden) localStorage.setItem(storageKey(panel), 'hidden');
    else localStorage.removeItem(storageKey(panel));
  } catch {
    // Chế độ ẩn danh hoặc chặn storage: vẫn ẩn/hiện được, chỉ không nhớ.
  }
}

function usePanelHidden(panel: Panel): [boolean, () => void] {
  // SSR luôn vẽ trạng thái "hiện"; sau hydrate mới đồng bộ theo <html>.
  const [hidden, setHidden] = useState(false);
  useEffect(() => setHidden(readHidden(panel)), [panel]);
  const toggle = useCallback(() => {
    const next = !readHidden(panel);
    writeHidden(panel, next);
    setHidden(next);
  }, [panel]);
  return [hidden, toggle];
}

function PanelIcon({ side }: { side: 'left' | 'right' }) {
  const x = side === 'left' ? 9 : 15;
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <rect x="3" y="4" width="18" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <line x1={x} y1="4" x2={x} y2="20" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function LayoutToolbar({ hasSidebar, hasToc }: { hasSidebar: boolean; hasToc: boolean }) {
  const [sidebarHidden, toggleSidebar] = usePanelHidden('sidebar');
  const [tocHidden, toggleToc] = usePanelHidden('toc');

  const sidebarLabel = sidebarHidden
    ? translate({
        id: 'theme.blog.layout.showSidebar',
        message: 'Hiện danh sách bài',
        description: 'Nút hiện lại cột danh sách bài viết bên trái',
      })
    : translate({
        id: 'theme.blog.layout.hideSidebar',
        message: 'Ẩn danh sách bài',
        description: 'Nút ẩn cột danh sách bài viết bên trái',
      });
  const tocLabel = tocHidden
    ? translate({
        id: 'theme.blog.layout.showToc',
        message: 'Hiện mục lục',
        description: 'Nút hiện lại cột mục lục bên phải',
      })
    : translate({
        id: 'theme.blog.layout.hideToc',
        message: 'Ẩn mục lục',
        description: 'Nút ẩn cột mục lục bên phải',
      });

  return (
    <div className={styles.toolbar}>
      {hasSidebar && (
        <button
          type="button"
          className={styles.toggle}
          onClick={toggleSidebar}
          aria-pressed={sidebarHidden}
          title={sidebarLabel}>
          <PanelIcon side="left" />
          <span>{sidebarLabel}</span>
        </button>
      )}
      {hasToc && (
        <button
          type="button"
          className={clsx(styles.toggle, styles.toggleRight)}
          onClick={toggleToc}
          aria-pressed={tocHidden}
          title={tocLabel}>
          <span>{tocLabel}</span>
          <PanelIcon side="right" />
        </button>
      )}
    </div>
  );
}

export default function BlogLayout(props: Props): ReactNode {
  const { sidebar, toc, children, ...layoutProps } = props;
  const hasSidebar = Boolean(sidebar && sidebar.items.length > 0);
  const hasToc = Boolean(toc);

  return (
    <Layout {...layoutProps}>
      <div className="container margin-vert--lg">
        <div className={clsx('row', styles.row)}>
          <BlogSidebar sidebar={sidebar} />
          <main
            className={clsx('col', styles.main, {
              [styles.withSidebar]: hasSidebar,
              [styles.withToc]: hasToc,
              'col--7': hasSidebar,
              'col--9 col--offset-1': !hasSidebar,
            })}>
            {(hasSidebar || hasToc) && <LayoutToolbar hasSidebar={hasSidebar} hasToc={hasToc} />}
            {children}
          </main>
          {toc && <div className={clsx('col col--2', styles.toc)}>{toc}</div>}
        </div>
      </div>
    </Layout>
  );
}
