import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { ProjectTagType } from "@site/src/shared/constants/ProjectConsts";
import { Project } from "@site/src/shared/dto/Project";
import { Operator, readOperator } from "../ShowcaseFilterToggle";
import { useLocation } from "@docusaurus/router";
import { sortedProjects } from "@site/src/data/projects";
import { useState, useEffect, useMemo } from "react";
import { readSearchName } from "../ShowcaseSearchBar";
import { readSearchTags } from "../ShowcaseTagSelect";

export type UserState = {
    scrollTopPosition: number;
    focusedElementId: string | undefined;
};

export function restoreUserState(userState: UserState | null) {
    const { scrollTopPosition, focusedElementId } = userState ?? {
        scrollTopPosition: 0,
        focusedElementId: undefined,
    };
    if (focusedElementId) {
        document.getElementById(focusedElementId)?.focus();
    }
    window.scrollTo({ top: scrollTopPosition });
}

export function prepareUserState(): UserState | undefined {
    if (ExecutionEnvironment.canUseDOM) {
        return {
            scrollTopPosition: window.scrollY,
            focusedElementId: document.activeElement?.id,
        };
    }

    return undefined;
}

export function filterUsers(
    users: Project[],
    selectedTags: ProjectTagType[],
    operator: Operator,
    searchName: string | null,
) {
    if (searchName) {
        // eslint-disable-next-line no-param-reassign
        users = users.filter((user) =>
            user.title.toLowerCase().includes(searchName.toLowerCase()),
        );
    }
    if (selectedTags.length === 0) {
        return users;
    }
    return users.filter((user) => {
        if (user.tags.length === 0) {
            return false;
        }
        if (operator === 'AND') {
            return selectedTags.every((tag) => user.tags.includes(tag));
        }
        return selectedTags.some((tag) => user.tags.includes(tag));
    });
}

export function useFilteredUsers() {
    const location = useLocation<UserState>();
    const [operator, setOperator] = useState<Operator>('OR');
    // On SSR / first mount (hydration) no tag is selected
    const [selectedTags, setSelectedTags] = useState<ProjectTagType[]>([]);
    const [searchName, setSearchName] = useState<string | null>(null);
    // Sync tags from QS to state (delayed on purpose to avoid SSR/Client
    // hydration mismatch)
    useEffect(() => {
        setSelectedTags(readSearchTags(location.search));
        setOperator(readOperator(location.search));
        setSearchName(readSearchName(location.search));
        restoreUserState(location.state);
    }, [location]);

    return useMemo(
        () => filterUsers(sortedProjects, selectedTags, operator, searchName),
        [selectedTags, operator, searchName],
    );
}