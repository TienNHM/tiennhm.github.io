import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Image from '@theme/IdealImage';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import styles from './index.module.css';
import { CONTACTS, Contact } from '@site/src/data/contacts';
import ContactItem from '@site/src/components/ContactItem';
import { AVATAR_URL, GITHUB_USER } from '@site/src/utils/constants';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  // Call Github API to get user information
  const [user, setUser] = useState<any>({});
  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USER}`)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        setUser(data);
      });
  }, []);

  const contacts = CONTACTS;
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner, styles.backgroundImage)}>
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

          <h1 className="hero__title">{GITHUB_USER}</h1>
          <h2 className="hero__subtitle">{user?.bio}</h2>

          <div className={clsx(styles.githubInfo)}>
            <pre>
            ⊕ <span>{user?.followers} followers</span> - ⊛ <span>{user?.following} followings</span>
            </pre>
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
                const Svg = contact.icon;
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
  return (
    <Layout 
      title="TienNHM - Fullstack Developer Blog" 
      description="Fullstack Developer từ Việt Nam. Chia sẻ kiến thức về lập trình, công nghệ, phát triển phần mềm, tutorials và best practices cho developers."
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
