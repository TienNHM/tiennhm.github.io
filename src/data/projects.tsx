/* eslint-disable global-require */

import { sortBy } from '@site/src/utils/jsUtils';
import { Project } from '@site/src/shared/dto/Project';

// prettier-ignore
const PROJECTS: Project[] = [
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
    // source: 'https://github.com/ITUTE/youth',
    source: null,
    tags: ['product'],
  },
  {
    title: 'ITUTE SV5T',
    description: 'A website to provide information about the prize for Students of Five Merits of faculty of Information Technology, HCMUTE',
    // preview: require('./showcase/apache-apisix.png'),
    preview: null,
    website: 'https://itute.github.io/SV5T/',
    // source: 'https://github.com/ITUTE/SV5T',
    source: null,
    tags: ['product'],
  },
  {
    title: 'Youth Quiz',
    description: 'A quiz game website where questions are about information technology, information tranformation, and general knowledge about student organizations, made with MEAN stack.',
    // preview: require('./showcase/apexfp.png'),
    preview: null,
    website: 'https://youth-quiz.vercel.app/',
    // source: 'https://github.com/TienNHM/youth-quiz',
    source: null,
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
    // source: 'https://github.com/TienNHM/OvercoLoyalty',
    source: null,
    tags: ['product'],
  },
  {
    title: 'Virtual Mouse',
    description: 'A virtual mouse application for Windows, made with Python and Mediapipe.',
    // preview: require('./showcase/avana-wallet.png'),
    preview: null,
    website: 'https://tiennhm.github.io/VirtualMouse/',
    // source: 'https://github.com/TienNHM/VirtualMouse',
    source: null,
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
    website: 'https://tiennhm.github.io/QuickDraw/',
    source: 'https://github.com/TienNHM/QuickDraw',
    tags: ['opensource', 'courseproject'],
  },
  {
    title: 'Tetris',
    description: 'A simple Tetris game made with C++',
    preview: null,
    website: 'https://tiennhm.github.io/Tetris-Cpp/',
    source: 'https://github.com/TienNHM/Tetris-Cpp',
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

function sortProjects() {
  let result = PROJECTS;
  // Sort by site name
  result = sortBy(result, (project) => project.title.toLowerCase());
  
  // Sort by favorite tag, favorites first
  result = sortBy(result, (project) => !project.tags.includes('favorite'));
  return result;
}

export const sortedProjects = sortProjects();
