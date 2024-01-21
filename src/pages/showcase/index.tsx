import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import { sortedProjects } from '@site/src/data/projects';
import { Project } from '@site/src/shared/dto/Project';
import ShowcaseHeader from './_components/ShowcaseHeader';
import { SHOWCASE } from './constants';
import ShowcaseCardList from './_components/ShowcaseCardList';
import ShowcaseFilters from './_components/ShowcaseFilters';

export default function Showcase(): JSX.Element {
  const favoriteUsers: Project[] = sortedProjects.filter((user) =>
    user.tags.includes('favorite'),
  );
  const otherUsers: Project[] = sortedProjects.filter(
    (user) => !user.tags.includes('favorite'),
  );

  return (
    <Layout title={SHOWCASE.TITLE} description={SHOWCASE.DESCRIPTION}>
      <main className="margin-vert--lg">
        <ShowcaseHeader key={'ShowcaseHeader'} />
        <ShowcaseFilters key={'ShowcaseFilters'} />
        <ShowcaseCardList favoriteUsers={favoriteUsers} otherUsers={otherUsers} key={'ShowcaseCardList'} />
      </main>
    </Layout>
  );
}
