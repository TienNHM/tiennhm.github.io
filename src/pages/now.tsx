import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import Translate, { translate } from '@docusaurus/Translate';
import { NOW_SECTIONS, NOW_UPDATED_AT } from '@site/src/data/now';
import { BUILDING, type BuildStatus } from '@site/src/data/building';
import styles from './now.module.css';

const STATUS_LABEL: Record<BuildStatus, string> = {
  building: 'đang dựng',
  live: 'đang chạy',
  maintaining: 'đang bảo trì',
  experimenting: 'đang thử nghiệm',
};

function daysSince(iso: string): number {
  return Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
}

/**
 * Trang /now — theo quy ước nownownow.com: một trang nói mình đang làm gì ở
 * giai đoạn này của đời, khác với /about vốn nói mình là ai.
 *
 * Ngày cập nhật hiển thị rõ và chuyển sang cảnh báo khi quá cũ. Đây là điểm
 * khác biệt duy nhất giữa một trang /now có ích và một trang /now phản tác
 * dụng.
 */
export default function Now(): JSX.Element {
  const title = translate({
    id: 'now.title',
    message: 'Đang làm gì',
    description: 'Tiêu đề trang /now',
  });

  const age = daysSince(NOW_UPDATED_AT);
  const stale = age > 90;

  return (
    <Layout
      title={title}
      description={translate({
        id: 'now.description',
        message:
          'TienNHM đang dựng gì, học gì và viết gì ở thời điểm này — cập nhật thủ công, có ghi ngày.',
        description: 'Mô tả SEO cho trang /now',
      })}
    >
      <main className="container margin-vert--lg">
        <header className={styles.header}>
          <Heading as="h1">{title}</Heading>
          <p className={styles.lead}>
            <Translate id="now.lead" description="Câu mở đầu trang /now">
              Trang này nói tôi đang bận với thứ gì ở giai đoạn hiện tại — khác với trang About
              vốn nói tôi là ai. Cập nhật tay, nên ngày bên dưới là ngày thật.
            </Translate>
          </p>
          <p className={clsx(styles.updated, stale && styles.stale)}>
            {translate(
              {
                id: 'now.updated',
                message: 'Cập nhật {date} · {days} ngày trước',
                description: 'Dòng ngày cập nhật trang /now',
              },
              { date: NOW_UPDATED_AT, days: age },
            )}
          </p>
        </header>

        <section className={styles.section}>
          <Heading as="h2" id="dang-dung" className={styles.sectionTitle}>
            <span aria-hidden="true">🚧</span>{' '}
            <Translate id="now.building" description="Tiêu đề mục đang dựng trên trang /now">
              Đang dựng
            </Translate>
          </Heading>
          <ul className={styles.buildList}>
            {BUILDING.map((item) => (
              <li key={item.name} className={styles.buildItem}>
                <div className={styles.buildHead}>
                  {item.href ? (
                    <Link href={item.href} className={styles.buildName}>
                      {item.name}
                    </Link>
                  ) : (
                    <span className={styles.buildName}>{item.name}</span>
                  )}
                  <span className={styles.status}>{STATUS_LABEL[item.status]}</span>
                </div>
                <p className={styles.buildSummary}>{item.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className={styles.grid}>
          {NOW_SECTIONS.map((section) => (
            <section key={section.title} className={styles.section}>
              <Heading as="h2" className={styles.sectionTitle}>
                <span aria-hidden="true">{section.icon}</span> {section.title}
              </Heading>
              <ul className={styles.list}>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <footer className={styles.footer}>
          <Translate id="now.more" description="Dòng điều hướng cuối trang /now">
            Xem thêm:
          </Translate>{' '}
          <Link to="/timeline">
            <Translate id="now.timeline" description="Link sang trang timeline">
              Hành trình
            </Translate>
          </Link>
          {' · '}
          <Link to="/showcase">
            <Translate id="now.showcase" description="Link sang trang showcase">
              Thứ đã dựng
            </Translate>
          </Link>
          {' · '}
          <Link to="/about">
            <Translate id="now.about" description="Link sang trang about">
              Tôi là ai
            </Translate>
          </Link>
        </footer>
      </main>
    </Layout>
  );
}
