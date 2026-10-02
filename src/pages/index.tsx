import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import Image from '@theme/IdealImage';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import CurrentlyBuilding from '@site/src/components/CurrentlyBuilding';
import HomepageWriting from '@site/src/components/HomepageWriting';
import HomepageTopics from '@site/src/components/HomepageTopics';
import TopRepos from '@site/src/components/TopRepos';
import githubData from '@site/src/data/github.json';
import styles from './index.module.css';
import { CONTACTS, Contact } from '@site/src/data/contacts';
import ContactItem from '@site/src/components/ContactItem';
import { AVATAR_URL, GITHUB_USER } from '@site/src/utils/constants';
import { getSiteDescription } from '@site/src/utils/siteDescription';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  const contacts = CONTACTS;
  return (
    <header className={clsx('hero', styles.heroBanner, styles.backgroundImage)}>
      <div className={clsx('container', styles.cardContainer)}>
        <div className={clsx(styles.cardInfo)}>
          <Image 
            img={AVATAR_URL} 
            className={clsx(styles.cardInfoImage)}
            alt={GITHUB_USER} 
            about={GITHUB_USER}
            width={150} 
            height={150} 
            loading='eager' 
            decoding='async' />

          <h1 className={styles.heroTitle}>{GITHUB_USER}</h1>

          {/*
            * Dòng vai trò để TĨNH, không lấy `bio` từ GitHub API nữa.
            *
            * Bản trước render mô tả site khi chưa có dữ liệu rồi thay bằng bio
            * ngay khi fetch xong. Hai chuỗi dài ngắn khác hẳn nhau nên cả khối
            * chữ nhảy một nhịp — đó chính là hiện tượng giật khi mở trang chủ.
            * Bio trên GitHub thực chất cũng chỉ là "Fullstack Developer", tức
            * đổi cả bố cục để lấy về đúng chuỗi đã biết trước.
            */}
          <p className={styles.heroRole}>
            {translate({
              id: 'home.tagline',
              message: 'Xây phần mềm, học công khai.',
              description: 'Câu định vị dưới tên ở trang chủ',
            })}
          </p>
          <p className={styles.heroPitch}>{getSiteDescription()}</p>

          {/*
            * Số liệu lấy lúc build (src/data/github.json, làm mới hằng tuần),
            * không gọi GitHub API từ trình duyệt nữa.
            *
            * Cách cũ hỏng theo hai kiểu: API giới hạn 60 request/giờ theo IP
            * nên khách cùng một mạng dùng chung hạn mức và người sau thấy trống,
            * và số chỉ nhảy vào sau khi trang đã vẽ xong.
            */}
          <div className={clsx(styles.githubInfo)}>
            <span className={styles.stat}>
              <strong>{githubData.user.followers}</strong> followers
            </span>
            <span className={styles.statDot} aria-hidden="true" />
            <span className={styles.stat}>
              <strong>{githubData.user.following}</strong> following
            </span>
          </div>

          <div className={styles.ctaGroup}>
            <Link className="button button--primary button--lg" to="/blog">
              {translate({
                id: 'home.cta.blog',
                message: 'Đọc blog',
                description: 'Nút chính ở trang chủ, dẫn tới trang blog',
              })}
            </Link>
            <Link className={clsx('button button--lg', styles.ctaGhost)} to="/docs">
              {translate({
                id: 'home.cta.docs',
                message: 'Xem tài liệu',
                description: 'Nút phụ ở trang chủ, dẫn tới trang docs',
              })}
            </Link>
          </div>

          {/* <div style={{margin: '1rem'}}>
            <Link className={clsx('button button--primary')} title='CV' to='/my-cv'>
                View my CV
            </Link>
          </div> */}

          <div className={clsx(styles.buttonsGroup)}>
            {
              Object.keys(contacts).map((key: string) => {
                const contact = contacts[key] as Contact;
                return (
                  <ContactItem key={key} icon={contact.faIcon} contact={contact} title={contact.title} />
                );
              })
            }
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const siteUrl = siteConfig.url?.replace(/\/$/, '') ?? 'https://TienNHM.github.io';
  const ogImage = `${siteUrl}/img/copyright-tiennhm.webp`;

  return (
    <Layout
      title={siteConfig.title}
      // Câu branding lấy qua translate() chứ không qua siteConfig.tagline —
      // xem src/utils/siteDescription.ts để biết vì sao config không dùng được.
      description={getSiteDescription()}
    >
      <Head>
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:image" content={ogImage} />
      </Head>
      <HomepageHeader />
      {/*
        * Thứ tự theo "người lạ cần gì trước", không theo "tôi muốn khoe gì
        * trước": đang làm gì -> viết gì -> đã làm gì -> chủ đề.
        */}
      <main>
        <CurrentlyBuilding />
        <HomepageWriting />
        <HomepageFeatures />
        <TopRepos />
        <HomepageTopics />
      </main>
    </Layout>
  );
}
