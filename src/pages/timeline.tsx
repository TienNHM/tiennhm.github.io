import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import Translate, { translate } from '@docusaurus/Translate';
import { TIMELINE, type TimelineEntry, type TimelineKind } from '@site/src/data/timeline';
import styles from './timeline.module.css';

const KIND_LABEL: Record<TimelineKind, string> = {
  work: 'Công việc',
  project: 'Dự án',
  site: 'Trang này',
};

function Entry({ entry }: { entry: TimelineEntry }): JSX.Element {
  return (
    <li className={styles.entry}>
      <span className={clsx(styles.dot, styles[entry.kind])} aria-hidden="true" />

      <div className={styles.entryBody}>
        <div className={styles.entryHead}>
          <h3 className={styles.entryTitle}>{entry.title}</h3>
          <span className={clsx(styles.kind, styles[`kind_${entry.kind}`])}>
            {KIND_LABEL[entry.kind]}
          </span>
        </div>

        <p className={styles.meta}>
          <span className={styles.period}>{entry.period}</span>
          {entry.org && <> · {entry.org}</>}
          {entry.role && <> · {entry.role}</>}
        </p>

        <p className={styles.description}>{entry.description}</p>

        {entry.tech && entry.tech.length > 0 && (
          <ul className={styles.tech}>
            {entry.tech.map((t) => (
              <li key={t} className={styles.techItem}>
                {t}
              </li>
            ))}
          </ul>
        )}

        {entry.links && entry.links.length > 0 && (
          <p className={styles.links}>
            {entry.links.map((l) => (
              <Link key={l.to} to={l.to} className={styles.link}>
                {l.label} →
              </Link>
            ))}
          </p>
        )}
      </div>
    </li>
  );
}

/**
 * Hành trình nghề, dựng từ src/data/timeline.ts.
 *
 * Trang chỉ trình bày, không chứa dữ kiện: mốc nào cũng phải sửa trong file dữ
 * liệu, để còn đối chiếu được với CV gốc.
 */
export default function Timeline(): JSX.Element {
  const title = translate({
    id: 'timeline.title',
    message: 'Hành trình',
    description: 'Tiêu đề trang timeline',
  });

  return (
    <Layout
      title={title}
      description={translate({
        id: 'timeline.description',
        message:
          'Các mốc nghề nghiệp và dự án của TienNHM từ 2020 tới nay: loyalty, CRM doanh nghiệp, GenAI và những thứ tự dựng.',
        description: 'Mô tả SEO cho trang timeline',
      })}
    >
      <main className="container margin-vert--lg">
        <header className={styles.header}>
          <Heading as="h1">{title}</Heading>
          <p className={styles.lead}>
            <Translate id="timeline.lead" description="Câu mở đầu trang timeline">
              Từ đồ án đầu tiên tới các hệ thống loyalty và CRM đang chạy production. Mốc lấy từ
              CV, bài viết và dự án liên quan nối ngay bên dưới.
            </Translate>
          </p>
          <p className={styles.source}>
            <Link to="/my-cv">
              <Translate id="timeline.cv" description="Link tới trang CV">
                Xem CV đầy đủ
              </Translate>
            </Link>
          </p>
        </header>

        <div>
          {TIMELINE.map((year) => (
            <section key={year.year} className={styles.year}>
              <div className={styles.yearHead}>
                <Heading as="h2" id={`nam-${year.year}`} className={styles.yearNumber}>
                  {year.year}
                </Heading>
                <p className={styles.yearSummary}>{year.summary}</p>
              </div>

              <ul className={styles.entries}>
                {year.entries.map((entry) => (
                  <Entry key={entry.period + entry.title} entry={entry} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
    </Layout>
  );
}
