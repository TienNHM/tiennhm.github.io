import { translate } from "@docusaurus/Translate";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faFacebook, faGithub, faLinkedin, faYoutube, faSkype } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'

export type Contact = {
  title: string;
  link: string;
  /** Icon Font Awesome; ContactItem vẽ thẳng path ra <svg>. */
  faIcon: IconDefinition;
};

export type ContactDict = {
  [key: string]: Contact;
};

export const CONTACTS: ContactDict = {
  // Facebook: {
  //   title: translate({ message: 'Facebook' }),
  //   link: 'https://www.facebook.com/tiennhm.vn/',
  //   faIcon: faFacebook,
  // } as Contact,
  Github: {
    title: translate({ message: 'Github' }),
    link: 'https://github.com/TienNHM',
    faIcon: faGithub,
  } as Contact,
  Linkedin: {
    title: translate({ message: 'Linkedin' }),
    link: 'https://www.linkedin.com/in/tien-nhm/',
    faIcon: faLinkedin,
  } as Contact,
  Email: {
    title: translate({ message: 'Email' }),
    link: 'mailto:tiennhm.it@gmail.com',
    faIcon: faEnvelope,
  } as Contact,
  Phone: {
    title: translate({ message: 'Phone' }),
    link: 'tel:+84388963345',
    faIcon: faPhone,
  } as Contact,
  // Skype: {
  //   title: translate({ message: 'Skype' }),
  //   link: 'https://join.skype.com/invite/ybhXQOv30y5F',
  //   faIcon: faSkype,
  // } as Contact,
  // Youtube: {
  //   title: translate({ message: 'Youtube' }),
  //   link: 'https://www.youtube.com/TienNguyen09',
  //   faIcon: faYoutube,
  // } as Contact,
}

export const SHOWCASE = {
  TITLE: translate({ message: 'Showcase' }),
  DESCRIPTION: translate({ message: 'List of sites and projects built by TienNHM' }),
  SUBMIT_URL: 'https://github.com/TienNHM?tab=repositories',
}