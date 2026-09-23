import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Feature, { FeatureItem } from './_components/Feature';
import { Project } from '@site/src/shared/dto/Project';
import ShowcaseCard from '@site/src/pages/showcase/_components/ShowcaseCard';
import Link from '@docusaurus/Link';
import { SORTED_PROJECTS } from '@site/src/data/projects';

// const FeatureList: FeatureItem[] = [
//   {
//     title: 'Easy to Use',
//     Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
//     description: (
//       <>
//         Docusaurus was designed from the ground up to be easily installed and
//         used to get your website up and running quickly.
//       </>
//     ),
//   },
//   {
//     title: 'Focus on What Matters',
//     Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
//     description: (
//       <>
//         Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
//         ahead and move your docs into the <code>docs</code> directory.
//       </>
//     ),
//   },
//   {
//     title: 'Powered by React',
//     Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
//     description: (
//       <>
//         Extend or customize your website layout by reusing React. Docusaurus can
//         be extended while reusing the same header and footer.
//       </>
//     ),
//   },
// ];

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
        <h2 id='top-projects' className={clsx(styles.showcaseFeaturesTitle)}>Top Projects</h2>
 
        <ul className='row' style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {
            // ShowcaseCard tự render thẻ <li> gốc, nên class lưới truyền
            // thẳng vào nó thay vì bọc thêm một <li> nữa — xem ShowcaseCard.
            SORTED_PROJECTS.map((project: Project) => project.highlight && (
              <ShowcaseCard
                key={project.title}
                user={project}
                className={clsx('col col--4', styles.showcaseFeaturesList)}
              />
            ))
          }
        </ul>

        <div className={clsx(styles.showcaseFeaturesLink)}>
          {/*
            * Trước đây chỗ này là <Button> của PrimeReact. Một nút duy nhất,
            * nhưng nó kéo theo `primereact/resources/themes/fluent-light/theme.css`
            * (219 KB) vào stylesheet chặn hiển thị của TOÀN BỘ site. Icon
            * `pi pi-angle-double-right` thậm chí không hiện, vì CSS của
            * primeicons chưa bao giờ được import.
            */}
          <Link className='button button--primary button--lg' href='/showcase'>
            View more&nbsp;&raquo;
          </Link>
        </div>
      </div>
    </section>
  );
}
