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

function ContactItem({icon, link, title}) {
  return (
    <div className={styles.buttons}>
      <Link
        title={title}
        className={clsx('button button--outline button--secondary button--lg', styles.cardInfoButton)}
        to={link}>
        <FontAwesomeIcon icon={icon} size='xl'/>
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
          
          <div className={clsx(styles.buttonsGroup)}>
            <ContactItem icon={faEnvelope} link={CONTACTS.Email} title={'Email'}/>
            <ContactItem icon={faPhone} link={CONTACTS.Phone} title={'Phone'}/>
            <ContactItem icon={faFacebook} link={CONTACTS.Facebook} title={'Facebook'}/>
            <ContactItem icon={faGithub} link={CONTACTS.Github} title={'Github'}/>
            <ContactItem icon={faLinkedin} link={CONTACTS.Linkedin} title={'Linkedin'}/>
            <ContactItem icon={faYoutube} link={CONTACTS.Youtube} title={'Youtube'}/>
            <ContactItem icon={faSkype} link={CONTACTS.Skype} title={'Skype'}/>
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
