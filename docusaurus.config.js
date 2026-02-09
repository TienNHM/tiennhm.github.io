// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

require('dotenv').config({ path: `.env.local`, override: true });
// require('dotenv').config({});

const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;

const organizationName = "TienNHM";
const projectName = "tiennhm.github.io";
const footerLinks = [
    {
        title: 'Docs',
        items: [
            {
                label: 'Tutorial',
                to: '/docs',
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
                href: 'https://www.facebook.com/tiennhm.vn',
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
    title: 'TienNHM - Fullstack Developer Blog',
    tagline: 'Fullstack Developer từ Việt Nam - Chia sẻ kiến thức về lập trình, công nghệ và phát triển phần mềm',
    favicon: 'https://github.com/TienNHM.png',

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
                content: process.env.GOOGLE_SITE_VERIFICATION || 'your-google-site-verification-code',
            }
        },
        {
            tagName: 'meta',
            attributes: {
                name: 'description',
                content: 'Blog cá nhân của Nguyễn Huỳnh Minh Tiến (TienNHM) về lập trình, kiến trúc hệ thống, AI, DevOps và kinh nghiệm thực chiến trong các dự án sản phẩm.',
            }
        },
        {
            tagName: 'meta',
            attributes: {
                name: 'author',
                content: 'Nguyễn Huỳnh Minh Tiến (TienNHM)',
            }
        },
        {
            tagName: 'meta',
            attributes: {
                property: 'og:type',
                content: 'website',
            }
        },
        {
            tagName: 'meta',
            attributes: {
                property: 'og:site_name',
                content: 'TienNHM',
            }
        },
        {
            tagName: 'meta',
            attributes: {
                property: 'og:title',
                content: 'TienNHM - Fullstack Developer Blog',
            }
        },
        {
            tagName: 'meta',
            attributes: {
                property: 'og:description',
                content: 'Chia sẻ kiến thức chuyên sâu về lập trình, hệ thống phân tán, tối ưu hiệu năng, AI và kinh nghiệm triển khai thực tế từ Fullstack Developer tại Việt Nam.',
            }
        },
        {
            tagName: 'meta',
            attributes: {
                property: 'og:image',
                content: `https://${organizationName}.github.io/img/copyright-tiennhm.webp`,
            }
        },
        {
            tagName: 'meta',
            attributes: {
                name: 'twitter:card',
                content: 'summary_large_image',
            }
        },
        {
            tagName: 'meta',
            attributes: {
                name: 'twitter:image',
                content: `https://${organizationName}.github.io/img/copyright-tiennhm.webp`,
            }
        },
        {
            tagName: 'meta',
            attributes: {
                name: 'twitter:creator',
                content: '@TienNHM',
            }
        },
        {
            tagName: 'link',
            attributes: {
                rel: 'preload',
                as: 'image',
                href: '/img/background/cat-sunset-city-min.webp',
                fetchpriority: 'high',
            }
        },
        {
            tagName: 'link',
            attributes: {
                rel: 'preload',
                as: 'image',
                href: 'https://github.com/TienNHM.png',
                fetchpriority: 'high',
            }
        },
        {
            tagName: 'link',
            attributes: {
                rel: 'preconnect',
                href: 'https://api.github.com',
            }
        },
        {
            tagName: 'link',
            attributes: {
                rel: 'preconnect',
                href: 'https://avatars.githubusercontent.com',
            }
        },
        {
            tagName: 'link',
            attributes: {
                rel: 'preconnect',
                href: 'https://slorber-api-screenshot.netlify.app',
            }
        },
        {
            tagName: 'script',
            attributes: {
                type: 'application/ld+json',
            },
            innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@graph': [
                    {
                        '@type': 'Person',
                        '@id': `https://${organizationName}.github.io/#person`,
                        name: 'Nguyễn Huỳnh Minh Tiến',
                        alternateName: 'TienNHM',
                        jobTitle: 'Fullstack Developer',
                        url: `https://${organizationName}.github.io/`,
                        image: 'https://github.com/TienNHM.png',
                        sameAs: [
                            'https://github.com/TienNHM',
                            'https://www.linkedin.com/in/tien-nhm',
                            'https://www.youtube.com/TienNguyen09',
                            'https://g.dev/TienNHM',
                        ],
                    },
                    {
                        '@type': 'WebSite',
                        '@id': `https://${organizationName}.github.io/#website`,
                        url: `https://${organizationName}.github.io/`,
                        name: 'TienNHM - Fullstack Developer Blog',
                        description: 'Blog cá nhân chia sẻ kiến thức chuyên sâu về lập trình, kiến trúc hệ thống, AI và kinh nghiệm triển khai sản phẩm thực tế.',
                        inLanguage: ['vi', 'en'],
                        publisher: {
                            '@id': `https://${organizationName}.github.io/#person`,
                        },
                        potentialAction: [
                            {
                                '@type': 'SearchAction',
                                target: {
                                    '@type': 'EntryPoint',
                                    urlTemplate: `https://${organizationName}.github.io/search?q={search_term_string}`,
                                },
                                'query-input': 'required name=search_term_string',
                            },
                        ],
                    },
                ],
            }),
        },
    ],

    markdown: {
        mermaid: true,
    },

    // process the env variables
    customFields: {
        // Put your custom environment here
        CANNY_BOARD_TOKEN: process.env.CANNY_BOARD_TOKEN || 'your-canny-board-token',
        REPO_GITHUB_ID: process.env.REPO_GITHUB_ID || 'your-github-repo-id',
        REPO_GITHUB: process.env.REPO_GITHUB || 'your-github-repo',
        REPO_GITHUB_CATEGORY_ID: process.env.REPO_GITHUB_CATEGORY_ID || 'your-github-category-id',
    },

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
                    sidebarCollapsible: true,
                    sidebarCollapsed: true,
                    showLastUpdateTime: true,
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
                    // blogSidebarCount: 'ALL',
                    blogSidebarTitle: 'Bài viết gần đây',
                    blogTitle: 'Blog',
                    blogDescription: 'Blog của TienNHM',
                    // blogListComponent: '@theme/BlogListPage',
                    // blogAuthorsPostsComponent: '@theme/BlogAuthorsPostsPage',
                    // blogPostComponent: '@theme/BlogPostPage',
                    // blogTagsListComponent: '@theme/BlogTagsListPage',
                    // blogTagsPostsComponent: '@theme/BlogTagsPostsPage',
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
                googleTagManager: {
                    containerId: process.env.GOOGLE_TAG_MANAGER_ID || 'GTM-XXXXXXX',
                },
                gtag: {
                    trackingID: process.env.GTAG_TRACKING_ID || 'G-XXXXXXXXXX',
                    anonymizeIP: true,
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
        [
            '@docusaurus/plugin-pwa',
            {
                debug: true,
                offlineModeActivationStrategies: [
                    'appInstalled',
                    'standalone',
                    'queryString',
                ],
                pwaHead: [
                    {
                        tagName: 'link',
                        rel: 'icon',
                        href: 'https://github.com/TienNHM.png', // your PWA icon
                    },
                    {
                        tagName: 'link',
                        rel: 'manifest',
                        href: '/manifest.json', // your PWA manifest
                    },
                    {
                        tagName: 'meta',
                        name: 'theme-color',
                        content: 'rgb(37, 194, 160)',
                    },
                ],
            },
        ],
        [
            "docusaurus-plugin-dotenv",
            {
                path: "./.env.local",
                systemvars: true,
            },
        ],
        '@docusaurus/theme-mermaid',
    ],

    themes: [
        '@docusaurus/theme-live-codeblock',
        'docusaurus-plugin-sass'
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            // Replace with your project's social card
            image: 'img/copyright-tiennhm.webp',
            navbar: {
                title: 'TienNHM',
                logo: {
                    alt: 'TienNHM',
                    src: 'https://github.com/TienNHM.png',
                    height: 40,
                    style: {
                        borderRadius: '50%',
                    }
                },
                items: [
                    {
                        type: 'docSidebar',
                        sidebarId: 'tutorialSidebar',
                        position: 'left',
                        label: 'Tutorial',
                    },
                    { to: '/blog', label: 'Blog', position: 'left' },
                    { to: '/showcase', label: 'Showcase', position: 'left' },
                    // { to: '/cv', label: 'CV', position: 'left' },
                    { to: '/about', label: 'About', position: 'left' },
                    { to: '/community', label: 'Community', position: 'left' },
                    // { to: '/contact', label: 'Contact', position: 'left' },
                    {
                        href: 'https://github.com/TienNHM',
                        // label: 'GitHub',
                        position: 'left',
                        className: "header-github-link",
                    },
                    {
                        type: 'localeDropdown',
                        position: 'left',
                    },
                ],
            },
            docs: {
                sidebar: {
                    hideable: true,
                },
            },
            footer: {
                style: 'light',
                links: footerLinks,
                copyright: `Copyright © ${new Date().getFullYear()} TienNHM.`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
                additionalLanguages: ['powershell', 'bash', 'csharp', 'java', 'sql', 'python', 'json', 'git', 'csv', 'sass', 'scss', 'log', 'http', 'diff', 'prolog'],
            },
            metadata: [
                { name: 'keywords', content: 'TienNHM, Nguyễn Huỳnh Minh Tiến, blog, coding, tools' },
            ],
            algolia: {
                // The application ID provided by Algolia
                appId: process.env.ALGOLIA_APP_ID || 'your-algolia-app-id',
                // Public API key: it is safe to commit it
                apiKey: process.env.ALGOLIA_API_KEY || 'your-algolia-api-key',
                indexName: process.env.ALGOLIA_INDEX_NAME || 'your-algolia-index-name',
                contextualSearch: true,
                insights: true,

            },
            mermaid: {
                theme: { light: 'neutral', dark: 'dark' },
            },
        }),
};

module.exports = config;
