// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

require('dotenv').config({ path: `.env.local`, override: true });
// require('dotenv').config({});

const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;

const organizationName = "TienNHM";
const projectName = "tiennhm.github.io"; // tên repo GitHub, không phải domain
const siteUrl = "https://tiennhm.io.vn"; // domain chính thức (canonical)

// Câu branding chung của site.
//
// ĐỪNG đổi chỗ này thành đọc `process.env.DOCUSAURUS_CURRENT_LOCALE` để chọn
// chuỗi theo locale. Cách đó KHÔNG chạy với `docusaurus build` đa locale:
// Docusaurus nạp config qua `loadFreshModule`, hàm này dùng jiti và giữ lại
// module đã đánh giá dù khai `requireCache: false`. Locale mặc định build
// trước, các locale sau dùng lại đúng object config đó, nên trang tiếng Anh
// nhận chuỗi tiếng Việt. Đã kiểm chứng: gọi loadFreshModule hai lần với hai
// giá trị env khác nhau cho ra kết quả giống hệt.
//
// Bản dịch theo locale nằm ở src/utils/siteDescription.ts (qua translate() và
// i18n/<locale>/code.json). Chuỗi dưới đây chỉ là giá trị mặc định mà
// Docusaurus dùng khi một trang không tự khai description.
const siteDescription =
    'Fullstack Developer — chia sẻ kiến thức chuyên sâu về lập trình, kiến trúc hệ thống, AI và kinh nghiệm triển khai sản phẩm thực tế.';

// Search chỉ bật khi có đủ credential thật từ biến môi trường.
const algoliaConfig =
    process.env.ALGOLIA_APP_ID && process.env.ALGOLIA_API_KEY
        ? {
              appId: process.env.ALGOLIA_APP_ID,
              apiKey: process.env.ALGOLIA_API_KEY,
              indexName: process.env.ALGOLIA_INDEX_NAME || 'tiennhmio',
              contextualSearch: true,
              insights: true,
          }
        : undefined;
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
                label: 'Lưu trữ bài viết',
                to: '/blog/archive',
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
    tagline: siteDescription,
    favicon: 'https://github.com/TienNHM.png',

    // Set the production url of your site here
    // url: `https://${organizationName}.github.io`,
    url: siteUrl,
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: `${organizationName}`, // Usually your GitHub org/user name.
    projectName: `${projectName}`, // Usually your repo name.
    trailingSlash: false,
    onBrokenLinks: 'throw',
    headTags: [
        {
            tagName: 'meta',
            attributes: {
                name: 'google-site-verification',
                content: process.env.GOOGLE_SITE_VERIFICATION || 'KahpusCmJyTWNzsOBu_IjSN9SlluR7BH6lq4SnfsFsQ',
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
                property: 'og:site_name',
                content: 'TienNHM',
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
                name: 'twitter:creator',
                content: '@TienNHM',
            }
        },
        /*
         * Site-wide OG/Twitter tags — COMMENTED OUT
         * Các tag này ghi đè metadata của từng trang (blog, docs),
         * khiến Facebook luôn hiện title/description của homepage.
         * Dùng PageMetadata per-page thay thế (BlogPostPage/Metadata, Layout props).
         * Giữ lại để tham khảo hoặc bật lại cho homepage-only nếu cần.
         *
        {
            tagName: 'link',
            attributes: {
                rel: 'canonical',
                href: `${siteUrl}/`,
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
                property: 'og:type',
                content: 'website',
            }
        },
        {
            tagName: 'meta',
            attributes: {
                property: 'og:url',
                content: `${siteUrl}/`,
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
                content: `${siteUrl}/img/copyright-tiennhm.webp`,
            }
        },
        {
            tagName: 'meta',
            attributes: {
                name: 'twitter:title',
                content: 'TienNHM - Fullstack Developer Blog',
            }
        },
        {
            tagName: 'meta',
            attributes: {
                name: 'twitter:description',
                content: 'Chia sẻ kiến thức chuyên sâu về lập trình, hệ thống phân tán, tối ưu hiệu năng, AI và kinh nghiệm triển khai thực tế từ Fullstack Developer tại Việt Nam.',
            }
        },
        {
            tagName: 'meta',
            attributes: {
                name: 'twitter:image',
                content: `${siteUrl}/img/copyright-tiennhm.webp`,
            }
        },
        */
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
        /*
         * JSON-LD site-wide (@graph: Person + WebSite) ĐÃ CHUYỂN sang
         * src/theme/SiteStructuredData, được render từ src/theme/Root.
         *
         * Lý do: node WebSite cần `url`/`@id` trỏ đúng gốc của locale đang
         * build (/ cho vi, /en/ cho en). baseUrl của locale chỉ được tính sau
         * khi config đã load — và còn phụ thuộc cách chạy build: `build` đầy đủ
         * cho en baseUrl `/en/`, còn `build --locale en` lại cho `/`
         * (xem isAutomaticBaseUrlLocalizationDisabled trong @docusaurus/core).
         * Hardcode ở đây sẽ sai ở một trong hai trường hợp, nên phải đọc
         * siteConfig.baseUrl từ context lúc render.
         */
    ],

    markdown: {
        mermaid: true,
        hooks: {
            onBrokenMarkdownLinks: 'warn',
        },
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
                    // Bật để metadata.lastUpdatedAt của blog post có dữ liệu thật,
                    // nhờ đó `dateModified` trong JSON-LD BlogPosting phản ánh đúng
                    // lần sửa gần nhất thay vì luôn copy lại datePublished.
                    // Nguồn dữ liệu: frontmatter `last_update` nếu bài viết khai báo,
                    // nếu không thì commit git cuối cùng chạm vào file.
                    // LƯU Ý: cần checkout đủ lịch sử git (fetch-depth: 0) trong CI,
                    // xem .github/workflows/deploy.yml.
                    showLastUpdateTime: true,
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl: `https://github.com/${organizationName}/${projectName}/tree/master`,
                    postsPerPage: 5,
                    // Sidebar liệt kê đủ mọi bài, không dừng ở 5 bài mặc định.
                    blogSidebarCount: 'ALL',
                    blogSidebarTitle: 'Tất cả bài viết',
                    blogTitle: 'Blog',
                    blogDescription: 'Blog của TienNHM',
                    // Trang /blog/archive gom toàn bộ bài theo năm.
                    archiveBasePath: 'archive',
                    // blogListComponent: '@theme/BlogListPage',
                    // blogAuthorsPostsComponent: '@theme/BlogAuthorsPostsPage',
                    // blogPostComponent: '@theme/BlogPostPage',
                    // blogTagsListComponent: '@theme/BlogTagsListPage',
                    // blogTagsPostsComponent: '@theme/BlogTagsPostsPage',
                    editLocalizedFiles: true,
                    feedOptions: {
                        type: ['rss', 'atom'],
                        xslt: true,
                    },
                    onInlineTags: 'warn',
                    onInlineAuthors: 'warn',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
                sitemap: {
                    changefreq: 'weekly',
                    priority: 0.5,
                    filename: 'sitemap.xml',
                    // Loại các trang điều hướng/tổng hợp khỏi sitemap: chúng mỏng,
                    // trùng lặp và chiếm crawl budget của nội dung thật.
                    // Đồng bộ với THIN_ROUTES trong src/theme/Robots.js.
                    ignorePatterns: [
                        '/**/tags/**',
                        '/search',
                        '/**/search',
                        '/blog/archive',
                        '/blog/authors',
                        '/blog/authors/**',
                        '/**/page/*',
                    ],
                },
                googleTagManager: {
                    containerId: process.env.GOOGLE_TAG_MANAGER_ID || 'GTM-N3QR867G',
                },
                gtag: {
                    trackingID: process.env.GTAG_TRACKING_ID || 'G-DMFKNJS6CG',
                    anonymizeIP: true,
                },
            }),
        ],
    ],

    plugins: [
        // Sinh file .md cho mỗi trang blog/docs, phục vụ nút "Copy Markdown
        // cho AI". Đọc permalink thật qua allContentLoaded thay vì tự suy route
        // từ đường dẫn file — xem plugins/page-markdown/index.js.
        require.resolve('./plugins/page-markdown'),
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
                // Bật log chỉ khi chạy dev. Để true ở production thì mọi khách
                // truy cập đều thấy một loạt log [Docusaurus-PWA] trong console.
                debug: process.env.NODE_ENV !== 'production',
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

    /** Chạy trước client module của plugin-google-gtag; tránh TypeError khi không có gtag */
    clientModules: [require.resolve('./src/client/gtag-shim.js')],

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
                    {
                        label: 'Blog',
                        position: 'left',
                        items: [
                            { to: '/blog', label: 'Bài viết mới nhất' },
                            { to: '/blog/archive', label: 'Lưu trữ theo năm' },
                            { to: '/blog/tags', label: 'Thẻ' },
                        ],
                    },
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
                /*
                 * KIỂM CHỨNG: thẻ này KHÔNG ghi đè keywords của từng trang.
                 * theme-classic render `themeConfig.metadata` trong SiteMetadata,
                 * còn mỗi trang render PageMetadata riêng; react-helmet gộp theo
                 * `name` và ưu tiên khai báo của trang. Đã đối chiếu HTML build:
                 *   /about, /docs/**, /blog/** đều hiện keywords từ frontmatter,
                 *   chỉ trang chủ và các trang list (không có frontmatter keywords)
                 *   mới rơi về giá trị dưới đây.
                 * => Giữ lại làm fallback, nhưng thay chuỗi vô nghĩa
                 *    ("blog, coding, tools") bằng các chủ đề thật sự có nội dung.
                 */
                {
                    name: 'keywords',
                    content:
                        'TienNHM, Nguyễn Huỳnh Minh Tiến, fullstack developer, .NET, ASP.NET Core, ABP Framework, Angular, microservices, database, AI-driven development',
                },
            ],
            // Chỉ khai báo Algolia khi có đủ credential thật.
            //
            // Trước đây apiKey fallback về 'Kahpus...FsQ' — đúng là chuỗi token
            // google-site-verification ở headTags phía trên, bị copy nhầm sang.
            // CI không truyền biến môi trường nào nên production luôn dùng giá
            // trị fallback đó, khiến mọi request search trả 403 Invalid
            // Application-ID or API key. Thà không có ô search còn hơn có một ô
            // search hỏng: bỏ hẳn fallback thay vì đoán một key khác.
            //
            // Đặt ALGOLIA_APP_ID / ALGOLIA_API_KEY / ALGOLIA_INDEX_NAME trong
            // GitHub Actions secrets (xem .github/workflows/deploy.yml) để bật lại.
            ...(algoliaConfig ? { algolia: algoliaConfig } : {}),
            mermaid: {
                theme: { light: 'neutral', dark: 'dark' },
            },
        }),
};

module.exports = config;
