import Translate, { translate } from "@docusaurus/Translate";
import { ProjectTagList, ProjectTags } from "@site/src/shared/constants/ProjectConsts";
import Heading from "@theme/Heading";
import clsx from "clsx";
import React from "react";
import ShowcaseFilterToggle from "../ShowcaseFilterToggle";
import ShowcaseTagSelect from "../ShowcaseTagSelect";
import ShowcaseTooltip from "../ShowcaseTooltip";
import { useFilteredUsers } from "../ShowcaseUserState";
import { usePluralForm } from "@docusaurus/theme-common";
import styles from './styles.module.css'

export function useSiteCountPlural() {
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

export default function ShowcaseFilters() {
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