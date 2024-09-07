import Translate from "@docusaurus/Translate";
import { SORTED_PROJECTS } from "@site/src/data/projects";
import Heading from "@theme/Heading";
import clsx from "clsx";
import React from "react";
import ShowcaseCard from "../ShowcaseCard";
import SearchBar, { readSearchName } from "../ShowcaseSearchBar";
import styles from "./styles.module.css";
import { useFilteredUsers } from "../ShowcaseUserState";
import { Project } from "@site/src/shared/dto/Project";

export type CardList = {
    favoriteUsers: Project[],
    otherUsers: Project[],
}

export default function ShowcaseCardList(props : CardList) {
    const filteredUsers = useFilteredUsers();

    if (filteredUsers.length === 0) {
        return (
            <section className="margin-top--lg margin-bottom--xl">
                <div className="container padding-vert--md text--center">
                    <Heading as="h2">
                        <Translate id="showcase.usersList.noResult">No result</Translate>
                    </Heading>
                    <SearchBar />
                </div>
            </section>
        );
    }

    return (
        <section className="margin-top--lg margin-bottom--xl">
            {filteredUsers.length === SORTED_PROJECTS.length ? (
                <>
                    <div className={styles.showcaseFavorite}>
                        <div className="container">
                            <div
                                className={clsx(
                                    'margin-bottom--md',
                                    styles.showcaseFavoriteHeader,
                                )}>
                                <Heading as="h2" id='favorite-projects'>
                                    <span style={{ marginInline: '8px' }}>⭐</span>
                                    <Translate id="showcase.favoritesList.title">
                                        Hightlight projects
                                    </Translate>
                                    <span className={clsx(styles.countProjects,)}>
                                        {props.favoriteUsers.length}
                                    </span>
                                </Heading>
                                <SearchBar />
                            </div>
                            <ul
                                className={clsx(
                                    'container',
                                    'clean-list',
                                    styles.showcaseList,
                                )}>
                                {props.favoriteUsers.map((user) => (
                                    <ShowcaseCard key={user.title} user={user} />
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="container margin-top--lg">
                        <Heading as="h2" className={styles.showcaseHeader} id='all-projects'>
                            <Translate id="showcase.usersList.allUsers">All projects</Translate>
                            <span className={clsx(styles.countProjects,)}>
                                {props.otherUsers.length}
                            </span>
                        </Heading>
                        <ul className={clsx('clean-list', styles.showcaseList)}>
                            {props.otherUsers.map((user) => (
                                <ShowcaseCard key={user.title} user={user} />
                            ))}
                        </ul>
                    </div>
                </>
            ) : (
                <div className="container">
                    <div
                        className={clsx(
                            'margin-bottom--md',
                            styles.showcaseFavoriteHeader,
                        )}>
                        <SearchBar />
                    </div>
                    <ul className={clsx('clean-list', styles.showcaseList)}>
                        {filteredUsers.map((user) => (
                            <ShowcaseCard key={user.title} user={user} />
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
}