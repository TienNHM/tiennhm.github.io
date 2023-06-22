import { ProjectTagType } from "@site/src/shared/constants/ProjectConsts";

export type Certificate = {
    title: string;
    description: string;
    preview: string | null;
    website: string;
    source: string | null;
    tags: ProjectTagType[];
};