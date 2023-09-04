import { translate } from '@docusaurus/Translate';
import { Tag } from '@site/src/shared/dto/Tag';

export type ProjectTagType =
    | 'favorite'
    // For open-source sites, a link to the source code is required.
    // The source should be the *website's* source, not the project's source!
    | 'opensource'
    | 'product'
    | 'personal'
    | 'courseproject';

export const ProjectTags: { [type in ProjectTagType]: Tag } = {

    favorite: {
        label: translate({ message: 'Favorite' }),
        description: translate({
            message:
                'Our favorite projects',
            id: 'showcase.tag.favorite.description',
        }),
        color: '#e9669e',
    },

    opensource: {
        label: translate({ message: 'Open-Source' }),
        description: translate({
            message: 'Open-Source projects',
            id: 'showcase.tag.opensource.description',
        }),
        color: '#39ca30',
    },

    product: {
        label: translate({ message: 'Product' }),
        description: translate({
            message: 'Commercial projects',
            id: 'showcase.tag.product.description',
        }),
        color: '#dfd545',
    },

    personal: {
        label: translate({ message: 'Personal' }),
        description: translate({
            message:
                'Personal websites, blogs and digital gardens...',
            id: 'showcase.tag.personal.description',
        }),
        color: '#14cfc3',
    },

    courseproject: {
        label: translate({ message: 'Course Project' }),
        description: translate({
            message:
                'Course projects',
            id: 'showcase.tag.courseproject.description',
        }),
        color: '#e64a19',
    },
};

export const ProjectTagList = Object.keys(ProjectTags) as ProjectTagType[];
