import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import Image from '@theme/IdealImage';
import { Project } from '@site/src/shared/dto/Project';
import { sortBy } from '@site/src/utils/jsUtils';
import Heading from '@theme/Heading';
import Tooltip from '../ShowcaseTooltip';
import styles from './styles.module.css';
import { ProjectTagList, ProjectTagType, ProjectTags } from '@site/src/shared/constants/ProjectConsts';
import { Tag } from '@site/src/shared/dto/Tag';
import { GetWebsiteScreenshot } from '@site/src/utils/common';

const TienNHM = require('@site/static/img/TienNHM-project.webp');

const TagComp = React.forwardRef<HTMLLIElement, Tag>(
  ({ label, color, description }, ref) => (
    <li ref={ref} className={styles.tag} title={description}>
      <span className={styles.textLabel}>{label.toLowerCase()}</span>
      <span className={styles.colorLabel} style={{ backgroundColor: color }} />
    </li>
  ),
);

function ShowcaseCardTag({ tags }: { tags: ProjectTagType[] }) {
  const tagObjects = tags.map((tag) => ({ tag, ...ProjectTags[tag] }));

  // Keep same order for all tags
  const tagObjectsSorted = sortBy(tagObjects, (tagObject) =>
    ProjectTagList.indexOf(tagObject.tag),
  );

  return (
    <>
      {tagObjectsSorted.map((tagObject, index) => {
        const id = `showcase_card_tag_${tagObject.tag}`;
        return (
          <Tooltip key={index} id={id} text={tagObject.description} anchorEl="#__docusaurus">
            <TagComp key={index} {...tagObject} />
          </Tooltip>
        );
      })}
    </>
  );
}

/**
 * Returns the image url for the card, either the user-provided one or a screenshot of the website
 * Ref: https://api-explorer.11ty.dev/
 * @param project user object
 * @returns image url
 */
function getCardImage(project: Project): string {
  if (project.preview) {
    return project.preview;
  }
  if (project.website) {
    var img = project.website ?? 'https://github.com/TienNHM'
    return project.preview ?? GetWebsiteScreenshot(img)
  }
  return TienNHM;
}

function ShowcaseCard({ user }: { user: Project }) {
  const image = getCardImage(user);
  return (
    <li key={user.title} className="card shadow--md">
      <div className={clsx('card__image', styles.showcaseCardImage)}>
        <Image img={image} alt={user.title} loading='lazy' about={user.title} decoding='async' />
      </div>

      <div className="card__body">
        <div className={clsx(styles.showcaseCardHeader)}>
          <Heading as="h4" className={styles.showcaseCardTitle}>
            <Link href={user.website} className={styles.showcaseCardLink}>
              {user.title}
            </Link>
          </Heading>

          {user.tags.includes('favorite') && (<span style={{ marginLeft: '8px' }}>⭐</span>)}

          {user.source && (
            <Link href={user.source} className={clsx('button button--secondary button--sm', styles.showcaseCardSrcBtn)}>
              <Translate id="showcase.card.sourceLink">source</Translate>
            </Link>
          )}
        </div>

        <p className={styles.showcaseCardBody}>{user.description}</p>
      </div>

      <ul className={clsx('card__footer', styles.cardFooter)}>
        <ShowcaseCardTag tags={user.tags} />
      </ul>
    </li>
  );
}

export default React.memo(ShowcaseCard);
