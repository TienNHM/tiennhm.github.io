import { translate } from "@docusaurus/Translate";

type Contact = {
  link: string;
  icon: React.ComponentType<React.ComponentProps<'svg'>>;
};

export const CONTACTS = {
  Facebook: {
    link: 'https://www.facebook.com/tiennhm.it/',
    icon: require('@site/static/img/logo/facebook.svg').default,
  } as Contact,
  Github: {
    link: 'https://github.com/TienNHM',
    icon: require('@site/static/img/logo/github.svg').default,
  } as Contact,
  Linkedin: {
    link: 'https://www.linkedin.com/in/tien-nhm/',
    icon: require('@site/static/img/logo/linkedin.svg').default,
  } as Contact,
  Email: {
    link: 'mailto:tiennhm.it@gmail.com',
    icon: require('@site/static/img/logo/email.svg').default,
  } as Contact,
  Phone: {
    link: 'tel:+84388963345',
    icon: require('@site/static/img/logo/phone.svg').default,
  } as Contact,
  Skype: {
    link: 'https://join.skype.com/invite/ybhXQOv30y5F',
    icon: require('@site/static/img/logo/skype.svg').default,
  } as Contact,
  Youtube: {
    link: 'https://www.youtube.com/TienNguyen09',
    icon: require('@site/static/img/logo/youtube.svg').default,
  } as Contact,
}

export const SHOWCASE = {
  TITLE: translate({message: 'TienNHM Site Showcase'}),
  DESCRIPTION: translate({message: 'List of sites and projects built by TienNHM'}),
  SUBMIT_URL: 'https://github.com/TienNHM?tab=repositories',
}