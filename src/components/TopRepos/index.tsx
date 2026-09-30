import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import data from '@site/src/data/github.json';
import styles from './styles.module.css';

type Repo = {
  name: string;
  description: string;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  forks: number;
  topics: string[];
};

// Màu chấm ngôn ngữ theo bảng của GitHub Linguist. Thiếu thì dùng màu trung tính.
const LANGUAGE_COLORS: Record<string, string> = {
  'C#': '#178600',
  CSS: '#563d7c',
  Dart: '#00B4AB',
  Go: '#00ADD8',
  HTML: '#e34c26',
  Java: '#b07219',
  JavaScript: '#f1e05a',
  Jupyter: '#DA5B0B',
  Kotlin: '#A97BFF',
  PHP: '#4F5D95',
  Python: '#3572A5',
  Rust: '#dea584',
  SCSS: '#c6538c',
  Shell: '#89e051',
  TypeScript: '#3178c6',
  Vue: '#41b883',
};

function formatCount(value: number): string {
  return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : String(value);
}

function RepoCard({ repo }: { repo: Repo }): JSX.Element {
  return (
    <li className={styles.card}>
      <Link className={styles.name} href={repo.url}>
        <svg className={styles.repoIcon} viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
          <path
            fill="currentColor"
            d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.25.25 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"
          />
        </svg>
        {repo.name}
      </Link>

      {repo.description && <p className={styles.description}>{repo.description}</p>}

      {repo.topics.length > 0 && (
        <ul className={styles.topics}>
          {repo.topics.map((topic) => (
            <li key={topic} className={styles.topic}>
              {topic}
            </li>
          ))}
        </ul>
      )}

      <div className={styles.meta}>
        {repo.language && (
          <span className={styles.metaItem}>
            <span
              className={styles.languageDot}
              style={{ backgroundColor: LANGUAGE_COLORS[repo.language] ?? 'var(--ifm-color-emphasis-500)' }}
              aria-hidden="true"
            />
            {repo.language}
          </span>
        )}
        <span
          className={styles.metaItem}
          title={translate({
            id: 'home.repos.stars',
            message: 'Số sao trên GitHub',
            description: 'Tooltip của số sao trong thẻ repo ở trang chủ',
          })}
        >
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <path
              fill="currentColor"
              d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"
            />
          </svg>
          {formatCount(repo.stars)}
        </span>
        <span
          className={styles.metaItem}
          title={translate({
            id: 'home.repos.forks',
            message: 'Số lượt fork',
            description: 'Tooltip của số fork trong thẻ repo ở trang chủ',
          })}
        >
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <path
              fill="currentColor"
              d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"
            />
          </svg>
          {formatCount(repo.forks)}
        </span>
        {repo.homepage && (
          <Link className={clsx(styles.metaItem, styles.demo)} href={repo.homepage}>
            <Translate id="home.repos.demo" description="Link tới trang demo của repo">
              Demo
            </Translate>
          </Link>
        )}
      </div>
    </li>
  );
}

/**
 * Khối "Top repositories" ở trang chủ.
 *
 * Dữ liệu sinh lúc build bởi scripts/generate-github-data.js, không gọi API
 * từ trình duyệt — xem phần chú thích đầu script đó để biết vì sao.
 */
export default function TopRepos(): JSX.Element | null {
  const repos = (data.repos ?? []) as Repo[];
  if (repos.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 id="top-repos" className={styles.title}>
          <Translate id="home.repos.title" description="Tiêu đề khối repo ở trang chủ">
            Top repositories
          </Translate>
        </h2>

        <ul className={styles.grid}>
          {repos.map((repo) => (
            <RepoCard key={repo.name} repo={repo} />
          ))}
        </ul>

        <div className={styles.more}>
          <Link className="button button--primary button--lg" href="https://github.com/TienNHM?tab=repositories">
            <Translate id="home.repos.more" description="Nút xem toàn bộ repo trên GitHub">
              Xem tất cả trên GitHub
            </Translate>
            &nbsp;&raquo;
          </Link>
        </div>
      </div>
    </section>
  );
}
