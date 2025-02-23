import { ProjectTagType } from "@site/src/shared/constants/ProjectConsts";

export type Project = {
    title: string;
    description: string;
    preview: string | null; // null = use our serverless screenshot service
    website: string;
    source: string | null;
    tags: ProjectTagType[];
    highlight?: boolean;
};
