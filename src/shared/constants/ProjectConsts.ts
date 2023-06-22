import { translate } from '@docusaurus/Translate';
import { Tag } from '@site/src/shared/dto/Tag';

export type ProjectTagType =
    | 'favorite'
    // For open-source sites, a link to the source code is required.
    // The source should be the *website's* source, not the project's source!
    | 'opensource'
    | 'product'
    // Feel free to add the 'design' tag as long as there's _some_ level of
    // CSS/swizzling.
    | 'design'
    // Site must have more than one locale.
    | 'i18n'
    | 'versioning'
    // Large sites are defined as those with > 200 pages, excluding versions.
    | 'large'
    | 'meta'
    | 'personal'
    | 'courseproject'
    // Right-to-left direction.
    | 'rtl';

export const ProjectTags: { [type in ProjectTagType]: Tag } = {
    favorite: {
        label: translate({ message: 'Favorite' }),
        description: translate({
            message:
                'Our favorite Docusaurus sites that you must absolutely check out!',
            id: 'showcase.tag.favorite.description',
        }),
        color: '#e9669e',
    },

    opensource: {
        label: translate({ message: 'Open-Source' }),
        description: translate({
            message: 'Open-Source Docusaurus sites can be useful for inspiration!',
            id: 'showcase.tag.opensource.description',
        }),
        color: '#39ca30',
    },

    product: {
        label: translate({ message: 'Product' }),
        description: translate({
            message: 'Docusaurus sites associated to a commercial product!',
            id: 'showcase.tag.product.description',
        }),
        color: '#dfd545',
    },

    design: {
        label: translate({ message: 'Design' }),
        description: translate({
            message:
                'Beautiful Docusaurus sites, polished and standing out from the initial template!',
            id: 'showcase.tag.design.description',
        }),
        color: '#a44fb7',
    },

    i18n: {
        label: translate({ message: 'I18n' }),
        description: translate({
            message:
                'Translated Docusaurus sites using the internationalization support with more than 1 locale.',
            id: 'showcase.tag.i18n.description',
        }),
        color: '#127f82',
    },

    versioning: {
        label: translate({ message: 'Versioning' }),
        description: translate({
            message:
                'Docusaurus sites using the versioning feature of the docs plugin to manage multiple versions.',
            id: 'showcase.tag.versioning.description',
        }),
        color: '#fe6829',
    },

    large: {
        label: translate({ message: 'Large' }),
        description: translate({
            message:
                'Very large Docusaurus sites, including many more pages than the average!',
            id: 'showcase.tag.large.description',
        }),
        color: '#8c2f00',
    },

    meta: {
        label: translate({ message: 'Meta' }),
        description: translate({
            message: 'Docusaurus sites of Meta (formerly Facebook) projects',
            id: 'showcase.tag.meta.description',
        }),
        color: '#4267b2', // Facebook blue
    },

    personal: {
        label: translate({ message: 'Personal' }),
        description: translate({
            message:
                'Personal websites, blogs and digital gardens built with Docusaurus',
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

    rtl: {
        label: translate({ message: 'RTL Direction' }),
        description: translate({
            message:
                'Docusaurus sites using the right-to-left reading direction support.',
            id: 'showcase.tag.rtl.description',
        }),
        color: '#ffcfc3',
    },
};

export const ProjectTagList = Object.keys(ProjectTags) as ProjectTagType[];
