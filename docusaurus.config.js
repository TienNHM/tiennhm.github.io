// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const organizationName = "TienNHM";
const projectName = "tiennhm.github.io";
const footerLinks = [
    {
        title: 'Docs',
        items: [
            {
                label: 'Tutorial',
                to: '/docs/intro',
            },
        ],
    },
    {
        title: 'Community',
        items: [
            {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/tien-nhm',
            },
            {
                label: 'Facebook',
                href: 'https://www.facebook.com/01.tien',
            },
            {
                label: 'Youtube',
                href: 'https://www.youtube.com/TienNguyen09',
            },
        ],
    },
    {
        title: 'More',
        items: [
            {
                label: 'Blog',
                to: '/blog',
            },
            {
                label: 'GitHub',
                href: 'https://github.com/TienNHM',
            },
            {
                label: 'Google for Developers',
                href: 'https://g.dev/TienNHM',
            },
            {
                label: 'Email',
                href: 'mailto:tiennhm.it@gmail.com',
            },
        ],
    },
]

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'TienNHM',
    tagline: 'Middle Fullstack Developer',
    favicon: 'img/favicon.ico',

    // Set the production url of your site here
    url: `https://${organizationName}.github.io`,
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: `${organizationName}`, // Usually your GitHub org/user name.
    projectName: `${projectName}`, // Usually your repo name.
    trailingSlash: false,
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    headTags: [
        {
            tagName: 'meta',
            attributes: {
                name: 'google-site-verification',
                content: 'KahpusCmJyTWNzsOBu_IjSN9SlluR7BH6lq4SnfsFsQ'
            }
        }
    ],

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'vi',
        locales: ['vi', 'en'],
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl: `https://github.com/${organizationName}/${projectName}/tree/master`,
                    editLocalizedFiles: true,
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl: `https://github.com/${organizationName}/${projectName}/tree/master`,
                    postsPerPage: 5,
                    blogSidebarCount: 'ALL',
                    blogSidebarTitle: 'All our posts',
                    blogTitle: 'Blog',
                    blogDescription: 'Blog của TienNHM',
                    blogListComponent: '@theme/BlogListPage',
                    blogPostComponent: '@theme/BlogPostPage',
                    blogTagsListComponent: '@theme/BlogTagsListPage',
                    blogTagsPostsComponent: '@theme/BlogTagsPostsPage',
                    editLocalizedFiles: true,
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
                sitemap: {
                    changefreq: 'daily',
                    priority: 0.5,
                    filename: 'sitemap.xml',
                },
            }),
        ],
    ],

    plugins: [
        [
            'ideal-image',
            /** @type {import('@docusaurus/plugin-ideal-image').PluginOptions} */
            ({
                quality: 70,
                max: 1030,
                min: 640,
                steps: 2,
                // Use false to debug, but it incurs huge perf costs
                disableInDev: true,
            }),
        ],
        '@docusaurus/theme-mermaid',
    ],

    themes: ['@docusaurus/theme-live-codeblock'],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            // Replace with your project's social card
            image: 'img/TienNHM-project.webp',
            navbar: {
                title: 'TienNHM',
                logo: {
                    alt: 'TienNHM',
                    src: 'img/TienNHM-min.webp',
                    height: 40,
                },
                items: [
                    {
                        type: 'docSidebar',
                        sidebarId: 'tutorialSidebar',
                        position: 'left',
                        label: '✨Tutorial',
                    },
                    { to: '/blog', label: '🗒️Blog', position: 'left' },
                    { to: '/showcase', label: '📦Showcase', position: 'left' },
                    // { to: '/cv', label: '🪪CV', position: 'left' },
                    { to: '/community', label: '❤️‍🔥Community', position: 'left' },
                    { to: '/contact', label: '📧Contact', position: 'left' },
                    {
                        href: 'https://github.com/TienNHM',
                        // label: 'GitHub',
                        position: 'right',
                        className: "header-github-link",
                    },
                    {
                        type: 'localeDropdown',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'light',
                // links: footerLinks,
                copyright: `Copyright © ${new Date().getFullYear()} TienNHM.`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
            metadata: [
                { name: 'keywords', content: 'TienNHM, Nguyễn Huỳnh Minh Tiến, blog, coding, tools' },
            ],
            algolia: {
                // The application ID provided by Algolia
                appId: 'GR7L3OTLFL',
                // Public API key: it is safe to commit it
                apiKey: '5fad78c0e4480e043d83f2d424afd040',
                indexName: 'tiennhmio',
                contextualSearch: false, // fix bug Docusaurus V2 integate with Algolia
            },
        }),
};

module.exports = config;
