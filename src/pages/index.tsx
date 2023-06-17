import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Image from '@theme/IdealImage';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGithub, faLinkedin,faYoutube, faSkype } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import styles from './index.module.css';
import { CONTACTS } from '@site/src/data/contacts';

function ContactItem({icon, contact, title}) {
  const Svg = contact.icon;
  return (
    <div className={styles.buttons}>
      <Link className={clsx('button button--lg', styles.cardInfoButton)}
        title={title} to={contact.link}>
          {contact.icon && <Svg role="img" />}
          {!contact.icon && <FontAwesomeIcon icon={icon} size='xl'/>}
      </Link>
    </div>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner, styles.backgroundImage)}>
      <div className={clsx('container', styles.cardContainer)}>
        <div className={clsx(styles.cardInfo)}>
          <Image img='/img/TienNHM.webp' alt='TienNHM' about='TienNHM' className={clsx(styles.cardInfoImage)}
            width={150} height={150} loading='lazy' decoding='async'/>

          <h1 className="hero__title">{siteConfig.title}</h1>
          <h2 className="hero__subtitle">{siteConfig.tagline}</h2>

          <div style={{margin: '1rem'}}>
            <Link className={clsx('button button--primary')} title='CV' to='/cv'>
                🪪 Résumé 🧑‍💻
            </Link>
          </div>
          
          <div className={clsx(styles.buttonsGroup)}>
            <ContactItem icon={faEnvelope} contact={CONTACTS.Email} title={'Email'}/>
            <ContactItem icon={faPhone} contact={CONTACTS.Phone} title={'Phone'}/>
            <ContactItem icon={faFacebook} contact={CONTACTS.Facebook} title={'Facebook'}/>
            <ContactItem icon={faGithub} contact={CONTACTS.Github} title={'Github'}/>
            <ContactItem icon={faLinkedin} contact={CONTACTS.Linkedin} title={'Linkedin'}/>
            <ContactItem icon={faYoutube} contact={CONTACTS.Youtube} title={'Youtube'}/>
            <ContactItem icon={faSkype} contact={CONTACTS.Skype} title={'Skype'}/>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Middle Fullstack Web Developer from Viet Nam">
      <HomepageHeader />
      <main>
        {/* <HomepageFeatures /> */}
      </main>
    </Layout>
  );
}
