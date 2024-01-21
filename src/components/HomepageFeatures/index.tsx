import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Feature, { FeatureItem } from './_components/Feature';
import { Project } from '@site/src/shared/dto/Project';
import ShowcaseCard from '@site/src/pages/showcase/_components/ShowcaseCard';
import Link from '@docusaurus/Link';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running quickly.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory.
      </>
    ),
  },
  {
    title: 'Powered by React',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
];

const TopProjectList: Project[] = [
  {
    title: 'x2mint',
    description: 'A graduration project, which is a website for creating and taking tests online, made with MERN stack.',
    // preview: require('./showcase/algolia.png'),
    preview: null,
    website: 'https://x2mint.vercel.app',
    source: 'https://github.com/TienNHM/x2mint',
    tags: ['favorite', 'courseproject'],
  },
  {
    title: 'Portfolio',
    description: 'Showcasing my projects and skills. There is also a blog section, where I write about my projects.',
    // preview: require('./showcase/astronomer.png'),
    preview: null,
    website: 'https://tiennhm.github.io',
    source: 'https://github.com/TienNHM/tiennhm.github.io',
    tags: ['favorite', 'personal', 'opensource'],
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
]

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {
            // FeatureList.map((props, idx) => (
            //   <Feature key={idx} {...props} />
            // ))
          }
        </div>
        <h1 id='top-projects' className={clsx(styles.showcaseFeaturesTitle)}>Top Projects</h1>
        <div id='top-projects' className={clsx(styles.showcaseFeaturesLink)}>
          <Link href='/showcase'>
            <Button label='View more' icon='pi pi-angle-double-right' 
              iconPos='right' size='small' severity="success" rounded outlined/>
          </Link>
        </div>
        <div className='row'>
          {
            TopProjectList.map((project: Project) => (
              <div className={clsx('col col--4', styles.showcaseFeaturesList)}>
                <ShowcaseCard key={project.title} user={project} />
              </div>
            ))
          }
        </div>
      </div>
    </section>
  );
}
