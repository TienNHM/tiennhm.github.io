import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import Image from '@theme/IdealImage';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import styles from './index.module.css';
import { CONTACTS, Contact } from '@site/src/data/contacts';
import ContactItem from '@site/src/components/ContactItem';
import { AVATAR_URL, GITHUB_USER } from '@site/src/utils/constants';
import { getSiteDescription } from '@site/src/utils/siteDescription';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';

type GithubUser = {
  bio?: string;
  followers?: number;
  following?: number;
};

const GITHUB_USER_CACHE_KEY = `github-user:${GITHUB_USER}`;

function readCachedUser(): GithubUser | null {
  try {
    const raw = sessionStorage.getItem(GITHUB_USER_CACHE_KEY);
    return raw ? (JSON.parse(raw) as GithubUser) : null;
  } catch {
    return null;
  }
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  // Thông tin lấy từ GitHub API — hoàn toàn không bắt buộc: hỏng thì trang vẫn
  // đầy đủ, chỉ thiếu dòng bio và số follower.
  //
  // API này giới hạn 60 request/giờ cho mỗi IP khi gọi không kèm token, và cách
  // gọi cũ không kiểm tra response.ok cũng không bắt lỗi: khi bị chặn (trình
  // duyệt chặn tracker, mạng công ty, hoặc chính Googlebot) thì .json() nổ ra
  // một unhandled rejection, còn setUser nhận nguyên object lỗi của GitHub.
  // Cache lại trong sessionStorage để mỗi phiên chỉ gọi một lần.
  const [user, setUser] = useState<GithubUser | null>(null);
  useEffect(() => {
    const cached = readCachedUser();
    if (cached) {
      setUser(cached);
      return;
    }

    const controller = new AbortController();
    fetch(`https://api.github.com/users/${GITHUB_USER}`, { signal: controller.signal })
      .then(response => (response.ok ? response.json() : null))
      .then((data: GithubUser | null) => {
        if (!data) return;
        setUser(data);
        try {
          sessionStorage.setItem(GITHUB_USER_CACHE_KEY, JSON.stringify(data));
        } catch {
          // sessionStorage có thể bị chặn (chế độ riêng tư) — bỏ qua.
        }
      })
      .catch(() => {
        // Mất mạng, bị chặn, hoặc vượt rate limit: giữ nguyên giao diện rút gọn.
      });

    return () => controller.abort();
  }, []);

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
              id: 'home.role',
              message: 'Fullstack Developer',
              description: 'Dòng vai trò dưới tên ở trang chủ',
            })}
          </p>
          <p className={styles.heroPitch}>{getSiteDescription()}</p>

          {/*
            * Khối số liệu luôn có mặt và đã chừa sẵn chiều cao, nên lúc số nhảy
            * vào không có gì bị đẩy đi chỗ khác.
            */}
          <div className={clsx(styles.githubInfo)} aria-live="polite">
            {user && (
              <>
                <span className={styles.stat}>
                  <strong>{user.followers}</strong> followers
                </span>
                <span className={styles.statDot} aria-hidden="true" />
                <span className={styles.stat}>
                  <strong>{user.following}</strong> following
                </span>
              </>
            )}
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
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
