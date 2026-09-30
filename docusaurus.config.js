// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

require('dotenv').config({ path: `.env.local`, override: true });
// require('dotenv').config({});

const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;

const { organizationName, projectName, siteUrl, siteDescription } = require('./config/site');
const algoliaConfig = require('./config/algolia');
const footerLinks = require('./config/footer-links');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'TienNHM - Fullstack Developer Blog',
    tagline: siteDescription,
    favicon: 'img/tiennhm-avatar.jpg',

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
    headTags: require('./config/head-tags'),

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
                    // Chèn hàng "Lưu PDF / Copy markdown / lượt xem" ngay sau H1
                    // để trang docs khớp vị trí với trang blog.
                    remarkPlugins: [require('./plugins/docs-page-actions/remark')],
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
                    // Tag của blog khai báo tập trung ở blog/tags.yml.
                    // 'throw' khiến build đỏ khi bài viết dùng tag chưa khai báo,
                    // nhờ đó danh mục không phình ra theo thời gian như trước
                    // (từng có 133 tag cho 43 bài, 90 tag chỉ dùng đúng một lần).
                    onInlineTags: 'throw',
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
                        // Bài lặp lại ở cả 19 module của khoá .NET backend —
                        // xem phần giải thích trong src/theme/Robots.js.
                        '/**/*-mini-case-study',
                        '/**/*-quick-real-world-example',
                        '/**/*-advanced-notes',
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
        // Chuyển hướng tag đã xoá khi gom taxonomy — xem config/tag-redirects.js.
        [
            '@docusaurus/plugin-client-redirects',
            /** @type {import('@docusaurus/plugin-client-redirects').Options} */
            ({
                redirects: require('./config/tag-redirects'),
            }),
        ],
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
                        href: '/img/tiennhm-avatar.jpg', // your PWA icon
                    },
                    {
                        tagName: 'link',
                        rel: 'manifest',
                        href: '/manifest.json', // your PWA manifest
                    },
                    /*
                     * theme-color: màu thanh địa chỉ Chrome Android / vùng an
                     * toàn Safari iOS. Lấy đúng --ifm-background-surface-color
                     * của từng chế độ để liền mạch với trang.
                     *
                     * THỨ TỰ CÓ Ý NGHĨA: trình duyệt lấy thẻ ĐẦU TIÊN có
                     * `media` khớp, nên thẻ không `media` phải đứng CUỐI làm
                     * dự phòng. Đảo lại là hai thẻ kia vô tác dụng.
                     */
                    {
                        tagName: 'meta',
                        name: 'theme-color',
                        media: '(prefers-color-scheme: light)',
                        content: '#ffffff',
                    },
                    {
                        tagName: 'meta',
                        name: 'theme-color',
                        media: '(prefers-color-scheme: dark)',
                        content: '#242526',
                    },
                    {
                        tagName: 'meta',
                        name: 'theme-color',
                        content: '#ffffff',
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
            navbar: require('./config/navbar'),
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
