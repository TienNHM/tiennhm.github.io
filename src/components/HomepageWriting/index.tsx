import React from 'react';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import data from '@site/src/data/recent-posts.json';
import styles from './styles.module.css';

type Post = {
  title: string;
  permalink: string;
  date: string;
  description: string;
  tags: string[];
};

/**
 * Khối "Viết gần đây" + lối vào khoá .NET.
 *
 * Danh sách bài sinh lúc build bởi scripts/generate-recent-posts.js — Docusaurus
 * không đưa dữ liệu blog sang cho trang React thường.
 */
export default function HomepageWriting(): JSX.Element | null {
  const posts = (data.posts ?? []) as Post[];
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 id="viet-gan-day" className={styles.title}>
            <Translate id="home.writing.title" description="Tiêu đề khối bài viết gần đây">
              Viết gần đây
            </Translate>
          </h2>
          <Link to="/blog" className={styles.allLink}>
            {translate(
              {
                id: 'home.writing.all',
                message: 'Tất cả {count} bài',
                description: 'Link sang trang blog kèm tổng số bài',
              },
              { count: data.total ?? posts.length },
            )}
            &nbsp;→
          </Link>
        </div>

        <ul className={styles.posts}>
          {posts.map((post) => (
            <li key={post.permalink} className={styles.post}>
              <time className={styles.date} dateTime={post.date}>
                {post.date}
              </time>
              <div className={styles.postBody}>
                <Link to={post.permalink} className={styles.postTitle}>
                  {post.title}
                </Link>
                {post.description && <p className={styles.excerpt}>{post.description}</p>}
              </div>
            </li>
          ))}
        </ul>

        <div className={styles.course}>
          <div>
            <h3 className={styles.courseTitle}>
              <Translate id="home.course.title" description="Tiêu đề thẻ khoá .NET ở trang chủ">
                Khoá .NET Backend: Zero → Senior
              </Translate>
            </h3>
            <p className={styles.courseSummary}>
              <Translate
                id="home.course.summary"
                description="Mô tả thẻ khoá .NET ở trang chủ"
              >
                19 module, 5 giai đoạn, 4 dự án — xoay quanh một bài toán CRM lớn dần. Miễn phí.
              </Translate>
            </p>
          </div>
          <Link
            className="button button--primary"
            to="/docs/dotnet-backend-zero-to-senior"
          >
            <Translate id="home.course.cta" description="Nút vào khoá .NET">
              Vào khoá học
            </Translate>
          </Link>
        </div>
      </div>
    </section>
  );
}
