import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Image from '@theme/IdealImage';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import styles from './index.module.css';
import { CONTACTS, Contact } from '@site/src/data/contacts';
import ContactItem from '../components/ContactItem';

const avatar = 'https://github.com/TienNHM.png';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const contacts = CONTACTS;
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner, styles.backgroundImage)}>
      <div className={clsx('container', styles.cardContainer)}>
        <div className={clsx(styles.cardInfo)}>
          <Image img={avatar} alt='TienNHM' about='TienNHM' className={clsx(styles.cardInfoImage)}
            width={150} height={150} loading='lazy' decoding='async' />

          <h1 className="hero__title">{siteConfig.title}</h1>
          <h2 className="hero__subtitle">{siteConfig.tagline}</h2>

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
    <Layout title={`${siteConfig.title}`} description="Fullstack Web Developer from Viet Nam">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
