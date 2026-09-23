import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import { Project } from '@site/src/shared/dto/Project';
import ShowcaseCard from '@site/src/pages/showcase/_components/ShowcaseCard';
import Link from '@docusaurus/Link';
import { SORTED_PROJECTS } from '@site/src/data/projects';

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <h2 id='top-projects' className={clsx(styles.showcaseFeaturesTitle)}>Top Projects</h2>

        {/*
          * Lưới CSS chứ không phải .row/.col của Infima — giống hệt trang
          * /showcase. Với row/col thì khoảng hở giữa các ô là padding của .col,
          * mà ở đây chính card là ô lưới, nên padding rơi vào bên trong nền
          * card: ảnh bị đẩy thụt vào còn các card thì dính sát nhau. `gap` tạo
          * khoảng hở thật giữa các ô và không đụng gì tới bên trong card.
          */}
        <ul className={styles.showcaseFeaturesGrid}>
          {
            SORTED_PROJECTS.map((project: Project) => project.highlight && (
              <ShowcaseCard key={project.title} user={project} />
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
