import { translate } from "@docusaurus/Translate";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faFacebook, faGithub, faLinkedin, faYoutube, faSkype } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'

export type Contact = {
  title: string;
  link: string;
  icon: React.ComponentType<React.ComponentProps<'svg'>>;
  faIcon: IconDefinition;
};

export type ContactDict = {
  [key: string]: Contact;
};

export const CONTACTS: ContactDict = {
  Facebook: {
    title: translate({ message: 'Facebook' }),
    link: 'https://www.facebook.com/tiennhm.it/',
    icon: require('@site/static/img/logo/facebook.svg').default,
    faIcon: faFacebook,
  } as Contact,
  Github: {
    title: translate({ message: 'Github' }),
    link: 'https://github.com/TienNHM',
    icon: require('@site/static/img/logo/github.svg').default,
    faIcon: faGithub,
  } as Contact,
  Linkedin: {
    title: translate({ message: 'Linkedin' }),
    link: 'https://www.linkedin.com/in/tien-nhm/',
    icon: require('@site/static/img/logo/linkedin.svg').default,
    faIcon: faLinkedin,
  } as Contact,
  Email: {
    title: translate({ message: 'Email' }),
    link: 'mailto:tiennhm.it@gmail.com',
    icon: require('@site/static/img/logo/email.svg').default,
    faIcon: faEnvelope,
  } as Contact,
  Phone: {
    title: translate({ message: 'Phone' }),
    link: 'tel:+84388963345',
    icon: require('@site/static/img/logo/phone.svg').default,
    faIcon: faPhone,
  } as Contact,
  Skype: {
    title: translate({ message: 'Skype' }),
    link: 'https://join.skype.com/invite/ybhXQOv30y5F',
    icon: require('@site/static/img/logo/skype.svg').default,
    faIcon: faSkype,
  } as Contact,
  Youtube: {
    title: translate({ message: 'Youtube' }),
    link: 'https://www.youtube.com/TienNguyen09',
    icon: require('@site/static/img/logo/youtube.svg').default,
    faIcon: faYoutube,
  } as Contact,
}

export const SHOWCASE = {
  TITLE: translate({ message: 'TienNHM Site Showcase' }),
  DESCRIPTION: translate({ message: 'List of sites and projects built by TienNHM' }),
  SUBMIT_URL: 'https://github.com/TienNHM?tab=repositories',
}