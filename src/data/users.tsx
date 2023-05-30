/* eslint-disable global-require */

import {translate} from '@docusaurus/Translate';
import {sortBy} from '@site/src/utils/jsUtils';

// LIST OF AVAILABLE TAGS
export type TagType =
  | 'favorite'
  // For open-source sites, a link to the source code is required.
  // The source should be the *website's* source, not the project's source!
  | 'opensource'
  | 'product'
  // Feel free to add the 'design' tag as long as there's _some_ level of
  // CSS/swizzling.
  | 'design'
  // Site must have more than one locale.
  | 'i18n'
  | 'versioning'
  // Large sites are defined as those with > 200 pages, excluding versions.
  | 'large'
  | 'meta'
  | 'personal'
  | 'courseproject'
  // Right-to-left direction.
  | 'rtl';


// prettier-ignore
const Users: User[] = [
  {
    title: 'Simple Paint',
    description: 'A simple paint app made with Windows Forms and C#.',
    // preview: require('./showcase/agilets.png'),
    preview: null,
    website: 'https://tiennhm.github.io/SimplePaint',
    source: 'https://github.com/TienNHM/SimplePaint',
    tags: ['favorite', 'courseproject'],
  },
  {
    title: 'TienNHM',
    description: 'My public template for GitHub profile page.',
    // preview: require('./showcase/aispeaker.png'),
    preview: null,
    website: 'https://github.com/TienNHM',
    source: 'https://github.com/TienNHM/TienNHM',
    tags: ['favorite', 'personal'],
  },
  {
    title: 'Game Oggy',
    description: 'A simple game made with Windows Forms and C#, inspired by Oggy and the Cockroaches.',
    // preview: require('./showcase/aide_jeune.png'),
    preview: null,
    website: 'https://tiennhm.github.io/OGGY/',
    source: 'https://github.com/TienNHM/OGGY',
    tags: ['favorite', 'courseproject'],
  },
  {
    title: "Artist Style Transfer CycleGAN",
    description: 'An implementation of artist style transfer using CycleGAN.',
    // preview: require('./showcase/akara-blog.png'),
    preview: null,
    website: 'https://tiennhm.github.io/Artist-Style-Transfer-CycleGAN',
    source: 'https://github.com/TienNHM/Artist-Style-Transfer-CycleGAN',
    tags: ['courseproject'],
  },
  {
    title: 'x2mint',
    description: 'A graduration project, which is a website for creating and taking tests online with MERN stack, inspired by kahoot.it.',
    // preview: require('./showcase/algolia.png'),
    preview: null,
    website: 'https://x2mint.vercel.app',
    source: 'https://github.com/TienNHM/x2mint',
    tags: ['favorite', 'courseproject'],
  },
  {
    title: 'Youth ITUTE',
    description: 'A website for Youth ITUTE, an organization for students of faculty of Information Technology, HCMUTE, made with MERN stack.',
    // preview: require('./showcase/apache-apisix.png'),
    preview: null,
    website: 'https://youth-itute.vercel.app',
    source: 'https://github.com/ITUTE/youth',
    tags: ['product'],
  },
  {
    title: 'ITUTE SV5T',
    description: 'A website to provide information about the prize for Students of Five Merits of faculty of Information Technology, HCMUTE',
    // preview: require('./showcase/apache-apisix.png'),
    preview: null,
    website: 'https://itute.github.io/SV5T/',
    source: 'https://github.com/ITUTE/SV5T',
    tags: ['product'],
  },
  {
    title: 'Youth Quiz',
    description: 'A quiz game website where questions are about information technology, information tranformation, and general knowledge about student organizations, made with MEAN stack.',
    // preview: require('./showcase/apexfp.png'),
    preview: null,
    website: 'https://youth-quiz.vercel.app/',
    source: 'https://github.com/TienNHM/youth-quiz',
    tags: ['product'],
  },
  {
    title: 'Portfolio',
    description: 'My portfolio website, made with ReactJS and Docuaurus.',
    // preview: require('./showcase/astronomer.png'),
    preview: null,
    website: 'https://tiennhm.github.io',
    source: 'https://github.com/TienNHM/tiennhm.github.io',
    tags: ['favorite', 'personal', 'opensource'],
  },
  {
    title: 'Overco Loyalty',
    description: 'A website for Overco Loyalty, a loyalty program for Overco shop, made with MEAN stack and Firebase.',
    // preview: require('./showcase/attobot.png'),
    preview: null,
    website: 'https://overcoloyalty.web.app/',
    source: 'https://github.com/TienNHM/OvercoLoyalty',
    tags: ['product'],
  },
  {
    title: 'Virtual Mouse',
    description: 'A virtual mouse application for Windows, made with Python and Mediapipe.',
    // preview: require('./showcase/avana-wallet.png'),
    preview: null,
    // website: 'https://docs.avanawallet.com/',
    website: null,
    source: 'https://github.com/TienNHM/VirtualMouse',
    tags: ['product'],
  },
  {
    title: 'Color Palettes',
    description: 'A website for sharing color palettes.',
    preview: null,
    website: 'https://tiennhm.github.io/Color-Palettes/',
    source: 'https://github.com/TienNHM/Color-Palettes',
    tags: ['opensource'],
  },
  {
    title: 'welcome-bot-discord',
    description: 'A Discord bot for welcoming new members to a server.',
    preview: null,
    website: null,
    source: 'https://github.com/TienNHM/welcome-bot-discord',
    tags: ['opensource'],
  },
  {
    title: 'root-me-ctf',
    description: 'My solutions for root-me.org challenges.',
    preview: null,
    website: 'https://tiennhm.github.io/root-me-ctf/',
    source: 'https://github.com/TienNHM/root-me-ctf',
    tags: ['opensource'],
  },
  {
    title: 'QuickDraw',
    description: 'A simple game made with Python, inspired by Google Quick Draw.',
    preview: null,
    website: null,
    source: 'https://github.com/TienNHM/QuickDraw',
    tags: ['opensource', 'courseproject'],
  },
  {
    title: 'Tetris',
    description: 'A simple game made with Python, inspired by Google Quick Draw.',
    preview: null,
    website: 'https://tiennhm.github.io/Game-Console/',
    source: 'https://github.com/TienNHM/Game-Console',
    tags: ['opensource', 'courseproject'],
  },
  {
    title: 'Gradient Descent',
    description: 'An implementation of gradient descent algorithm, visualized with Matplotlib.',
    preview: null,
    website: 'https://tiennhm.github.io/GradientDescent/',
    source: 'https://github.com/TienNHM/GradientDescent',
    tags: ['opensource', 'courseproject'],
  },
  {
    title: 'VietShop',
    description: 'An application for shopping online, made with Java and Android Studio.',
    preview: null,
    website: 'https://tiennhm.github.io/VietShop/',
    source: 'https://github.com/TienNHM/VietShop',
    tags: ['opensource', 'courseproject'],
  },
  {
    title: 'aemi - AEMI',
    description: 'A website for AEMI, a genuine cosmetics wholesale trading platform, made with PHP and Wordpress.',
    preview: null,
    website: 'https://www.aemi.beauty/',
    source: null,
    tags: ['product'],
  },
];

export type User = {
  title: string;
  description: string;
  preview: string | null; // null = use our serverless screenshot service
  website: string;
  source: string | null;
  tags: TagType[];
};

export type Tag = {
  label: string;
  description: string;
  color: string;
};

export const Tags: {[type in TagType]: Tag} = {
  favorite: {
    label: translate({message: 'Favorite'}),
    description: translate({
      message:
        'Our favorite Docusaurus sites that you must absolutely check out!',
      id: 'showcase.tag.favorite.description',
    }),
    color: '#e9669e',
  },

  opensource: {
    label: translate({message: 'Open-Source'}),
    description: translate({
      message: 'Open-Source Docusaurus sites can be useful for inspiration!',
      id: 'showcase.tag.opensource.description',
    }),
    color: '#39ca30',
  },

  product: {
    label: translate({message: 'Product'}),
    description: translate({
      message: 'Docusaurus sites associated to a commercial product!',
      id: 'showcase.tag.product.description',
    }),
    color: '#dfd545',
  },

  design: {
    label: translate({message: 'Design'}),
    description: translate({
      message:
        'Beautiful Docusaurus sites, polished and standing out from the initial template!',
      id: 'showcase.tag.design.description',
    }),
    color: '#a44fb7',
  },

  i18n: {
    label: translate({message: 'I18n'}),
    description: translate({
      message:
        'Translated Docusaurus sites using the internationalization support with more than 1 locale.',
      id: 'showcase.tag.i18n.description',
    }),
    color: '#127f82',
  },

  versioning: {
    label: translate({message: 'Versioning'}),
    description: translate({
      message:
        'Docusaurus sites using the versioning feature of the docs plugin to manage multiple versions.',
      id: 'showcase.tag.versioning.description',
    }),
    color: '#fe6829',
  },

  large: {
    label: translate({message: 'Large'}),
    description: translate({
      message:
        'Very large Docusaurus sites, including many more pages than the average!',
      id: 'showcase.tag.large.description',
    }),
    color: '#8c2f00',
  },

  meta: {
    label: translate({message: 'Meta'}),
    description: translate({
      message: 'Docusaurus sites of Meta (formerly Facebook) projects',
      id: 'showcase.tag.meta.description',
    }),
    color: '#4267b2', // Facebook blue
  },

  personal: {
    label: translate({message: 'Personal'}),
    description: translate({
      message:
        'Personal websites, blogs and digital gardens built with Docusaurus',
      id: 'showcase.tag.personal.description',
    }),
    color: '#14cfc3',
  },

  courseproject: {
    label: translate({message: 'Course Project'}),
    description: translate({
      message:
        'Course projects',
      id: 'showcase.tag.courseproject.description',
    }),
    color: '#e64a19',
  },

  rtl: {
    label: translate({message: 'RTL Direction'}),
    description: translate({
      message:
        'Docusaurus sites using the right-to-left reading direction support.',
      id: 'showcase.tag.rtl.description',
    }),
    color: '#ffcfc3',
  },
};

export const TagList = Object.keys(Tags) as TagType[];
function sortUsers() {
  let result = Users;
  // Sort by site name
  result = sortBy(result, (user) => user.title.toLowerCase());
  // Sort by favorite tag, favorites first
  result = sortBy(result, (user) => !user.tags.includes('favorite'));
  return result;
}

export const sortedUsers = sortUsers();
