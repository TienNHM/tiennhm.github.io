import React from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import data from '@site/src/data/topics.json';
import styles from './styles.module.css';

type Topic = { label: string; permalink: string; count: number };

/**
 * Khối chủ đề ở cuối trang chủ.
 *
 * Số bài mỗi chủ đề sinh lúc build từ frontmatter, đường dẫn lấy từ `permalink`
 * trong blog/tags.yml — route tag sinh từ permalink chứ không phải key.
 */
export default function HomepageTopics(): JSX.Element | null {
  const topics = (data.topics ?? []) as Topic[];
  if (topics.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 id="chu-de" className={styles.title}>
            <Translate id="home.topics.title" description="Tiêu đề khối chủ đề ở trang chủ">
              Chủ đề
            </Translate>
          </h2>
          <Link to="/blog/tags" className={styles.allLink}>
            <Translate id="home.topics.all" description="Link sang trang tất cả thẻ">
              Tất cả thẻ
            </Translate>
            &nbsp;→
          </Link>
        </div>

        <ul className={styles.list}>
          {topics.map((topic) => (
            <li key={topic.permalink}>
              <Link to={topic.permalink} className={styles.chip}>
                {topic.label}
                <span className={styles.count}>{topic.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
