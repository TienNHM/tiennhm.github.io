import React from 'react';
import clsx from 'clsx';
import Translate, { translate } from '@docusaurus/Translate';
import { usePluralForm } from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
import { sortedProjects } from '@site/src/data/projects';
import { Project } from '@site/src/shared/dto/Project';
import { ProjectTags, ProjectTagList } from '@site/src/shared/constants/ProjectConsts';
import Heading from '@theme/Heading';
import ShowcaseTagSelect from './_components/ShowcaseTagSelect';
import ShowcaseFilterToggle from './_components/ShowcaseFilterToggle';
import ShowcaseTooltip from './_components/ShowcaseTooltip';
import styles from './styles.module.css';
import ShowcaseHeader from './_components/ShowcaseHeader';
import { SHOWCASE } from './constants';
import { useFilteredUsers } from './_components/ShowcaseUserState';
import ShowcaseCardList from './_components/ShowcaseCardList';

function useSiteCountPlural() {
  const { selectMessage } = usePluralForm();
  return (sitesCount: number) =>
    selectMessage(
      sitesCount,
      translate(
        {
          id: 'showcase.filters.resultCount',
          description: 'The number of sites found',
          message: '{sitesCount} sites',
        },
        { sitesCount },
      ),
    );
}

function ShowcaseFilters() {
  const filteredUsers = useFilteredUsers();
  const siteCountPlural = useSiteCountPlural();
  return (
    <section className="container margin-top--l margin-bottom--lg">
      <div className={clsx('margin-bottom--sm', styles.filterCheckbox)}>
        <div>
          <Heading as="h2">
            <Translate id="showcase.filters.title">Filters</Translate>
          </Heading>
          <span>{siteCountPlural(filteredUsers.length)}</span>
        </div>
        <ShowcaseFilterToggle />
      </div>
      <ul className={clsx('clean-list', styles.checkboxList)}>
        {ProjectTagList.map((tag, i) => {
          const { label, description, color } = ProjectTags[tag];
          const id = `showcase_checkbox_id_${tag}`;

          return (
            <li key={i} className={styles.checkboxListItem}>
              <ShowcaseTooltip id={id} text={description} anchorEl="#__docusaurus">
                <ShowcaseTagSelect tag={tag} id={id} label={label}
                  icon={
                    tag === 'favorite' ? (
                      <span style={{ marginLeft: '8px' }}>⭐</span>
                    ) : (
                      <span className={clsx(styles.dotColor)} style={{ backgroundColor: color }} />
                    )
                  }
                />
              </ShowcaseTooltip>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

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
