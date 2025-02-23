import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import { SORTED_PROJECTS } from '@site/src/data/projects';
import { Project } from '@site/src/shared/dto/Project';
import ShowcaseHeader from './_components/ShowcaseHeader';
import ShowcaseCardList from './_components/ShowcaseCardList';
import ShowcaseFilters from './_components/ShowcaseFilters';
import { SHOWCASE } from '@site/src/data/contacts';

export default function Showcase(): JSX.Element {
  const favoriteUsers: Project[] = SORTED_PROJECTS.filter((user) =>
    user.tags.includes('favorite'),
  );
  const otherUsers: Project[] = SORTED_PROJECTS.filter(
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
