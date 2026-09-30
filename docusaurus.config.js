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
                label: 'Khoá .NET Backend',
                to: '/docs/dotnet-backend-zero-to-senior',
            },
            {
                label: 'Tài liệu tra cứu',
                to: '/docs',
            },
        ],
    },
    {
        title: 'Community',
        items: [
            {
                label: 'Cộng đồng',
                to: '/community',
            },
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
                href: '/img/tiennhm-avatar.jpg',
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
        // Chuyển hướng URL cũ sang URL mới khi đổi đường dẫn bài viết.
        //
        // Đợt gom 133 tag về 32 (commit d4ee124360) xoá 106 trang tag, trong
        // đó Google đã kịp lập chỉ mục một số — ví dụ /blog/tags/net-10 vẫn ra
        // trong kết quả tìm kiếm nhưng trả 404.
        //
        // Chỉ chuyển hướng những tag ĐỔI TÊN mà chủ đề vẫn còn (net10 -> dotnet,
        // efcore -> ef-core...). 21 tag rác còn lại (tag1, tag2, Kết luận,
        // Series, McKinsey...) CỐ Ý để 404: chúng không có trang tương đương,
        // và chuyển hướng sang một trang chung chỉ tổ bị coi là soft 404.
        //
        // Slug sinh bằng lodash.kebabCase, đúng hàm Docusaurus dùng trong
        // @docusaurus/utils/lib/tags.js — nên 'net10' thành 'net-10'.
        [
            '@docusaurus/plugin-client-redirects',
            /** @type {import('@docusaurus/plugin-client-redirects').Options} */
            ({
                redirects: [
                    { from: '/blog/tags/ai-dd', to: '/blog/tags/ai-driven-development' },
                    { from: '/blog/tags/ai-dlc', to: '/blog/tags/ai-driven-development' },
                    { from: '/blog/tags/alpine', to: '/blog/tags/docker' },
                    { from: '/blog/tags/angular-18', to: '/blog/tags/angular' },
                    { from: '/blog/tags/angular-cli', to: '/blog/tags/angular' },
                    { from: '/blog/tags/ant-design', to: '/blog/tags/frontend' },
                    { from: '/blog/tags/apache', to: '/blog/tags/devops' },
                    { from: '/blog/tags/async', to: '/blog/tags/concurrency' },
                    { from: '/blog/tags/autonomous-coding', to: '/blog/tags/ai-driven-development' },
                    { from: '/blog/tags/badges', to: '/blog/tags/git' },
                    { from: '/blog/tags/binary', to: '/blog/tags/computer-science' },
                    { from: '/blog/tags/bootstrap', to: '/blog/tags/frontend' },
                    { from: '/blog/tags/build-optimization', to: '/blog/tags/performance' },
                    { from: '/blog/tags/build-time', to: '/blog/tags/performance' },
                    { from: '/blog/tags/caal', to: '/blog/tags/ai-driven-development' },
                    { from: '/blog/tags/character-sets', to: '/blog/tags/database' },
                    { from: '/blog/tags/chat-gpt', to: '/blog/tags/ai-tools' },
                    { from: '/blog/tags/cloudflare', to: '/blog/tags/http' },
                    { from: '/blog/tags/collations', to: '/blog/tags/database' },
                    { from: '/blog/tags/cong-nghệ-phần-mềm', to: '/blog/tags/fundamentals' },
                    { from: '/blog/tags/cursor', to: '/blog/tags/ai-tools' },
                    { from: '/blog/tags/data-representation', to: '/blog/tags/computer-science' },
                    { from: '/blog/tags/dbml', to: '/blog/tags/database' },
                    { from: '/blog/tags/debugging', to: '/blog/tags/troubleshooting' },
                    { from: '/blog/tags/decimal', to: '/blog/tags/computer-science' },
                    { from: '/blog/tags/deep-learning', to: '/blog/tags/ai' },
                    { from: '/blog/tags/dependency-injection', to: '/blog/tags/aspnetcore' },
                    { from: '/blog/tags/documentation', to: '/blog/tags/tools' },
                    { from: '/blog/tags/efcore', to: '/blog/tags/ef-core' },
                    { from: '/blog/tags/encoding', to: '/blog/tags/computer-science' },
                    { from: '/blog/tags/esbuild', to: '/blog/tags/frontend' },
                    { from: '/blog/tags/extensions', to: '/blog/tags/tools' },
                    { from: '/blog/tags/free-course', to: '/blog/tags/learning' },
                    { from: '/blog/tags/garbage-collection', to: '/blog/tags/dotnet' },
                    { from: '/blog/tags/generative-ai', to: '/blog/tags/ai' },
                    { from: '/blog/tags/git-hub-copilot', to: '/blog/tags/ai-tools' },
                    { from: '/blog/tags/github', to: '/blog/tags/git' },
                    { from: '/blog/tags/hexadecimal', to: '/blog/tags/computer-science' },
                    { from: '/blog/tags/https', to: '/blog/tags/http' },
                    { from: '/blog/tags/identifier', to: '/blog/tags/computer-science' },
                    { from: '/blog/tags/lập-trinh-ai', to: '/blog/tags/ai-driven-development' },
                    { from: '/blog/tags/linux', to: '/blog/tags/devops' },
                    { from: '/blog/tags/machine-learning', to: '/blog/tags/ai' },
                    { from: '/blog/tags/markdown', to: '/blog/tags/tools' },
                    { from: '/blog/tags/material-design', to: '/blog/tags/frontend' },
                    { from: '/blog/tags/message-broker', to: '/blog/tags/microservices' },
                    { from: '/blog/tags/mysql', to: '/blog/tags/database' },
                    { from: '/blog/tags/natural-language-programming', to: '/blog/tags/ai-driven-development' },
                    { from: '/blog/tags/net-10', to: '/blog/tags/dotnet' },
                    { from: '/blog/tags/net-8', to: '/blog/tags/dotnet' },
                    { from: '/blog/tags/net-9', to: '/blog/tags/dotnet' },
                    { from: '/blog/tags/nodejs', to: '/blog/tags/javascript' },
                    { from: '/blog/tags/number-system', to: '/blog/tags/computer-science' },
                    { from: '/blog/tags/onnx', to: '/blog/tags/ai' },
                    { from: '/blog/tags/openapi', to: '/blog/tags/api' },
                    { from: '/blog/tags/owasp', to: '/blog/tags/security' },
                    { from: '/blog/tags/primeng', to: '/blog/tags/angular' },
                    { from: '/blog/tags/production', to: '/blog/tags/devops' },
                    { from: '/blog/tags/programming', to: '/blog/tags/fundamentals' },
                    { from: '/blog/tags/rabbitmq', to: '/blog/tags/microservices' },
                    { from: '/blog/tags/readme', to: '/blog/tags/tools' },
                    { from: '/blog/tags/resources', to: '/blog/tags/learning' },
                    { from: '/blog/tags/scalar', to: '/blog/tags/api' },
                    { from: '/blog/tags/schema', to: '/blog/tags/database' },
                    { from: '/blog/tags/service-lifetime', to: '/blog/tags/aspnetcore' },
                    { from: '/blog/tags/software-development', to: '/blog/tags/fundamentals' },
                    { from: '/blog/tags/swagger', to: '/blog/tags/api' },
                    { from: '/blog/tags/tailwind', to: '/blog/tags/frontend' },
                    { from: '/blog/tags/tls', to: '/blog/tags/security' },
                    { from: '/blog/tags/traefik', to: '/blog/tags/devops' },
                    { from: '/blog/tags/transaction', to: '/blog/tags/database' },
                    { from: '/blog/tags/tương-lai-ai', to: '/blog/tags/ai-driven-development' },
                    { from: '/blog/tags/tutorial', to: '/blog/tags/learning' },
                    { from: '/blog/tags/types', to: '/blog/tags/csharp' },
                    { from: '/blog/tags/ui-libraries', to: '/blog/tags/frontend' },
                    { from: '/blog/tags/unicode', to: '/blog/tags/computer-science' },
                    { from: '/blog/tags/unique-id', to: '/blog/tags/computer-science' },
                    { from: '/blog/tags/unsigned-integer', to: '/blog/tags/computer-science' },
                    { from: '/blog/tags/uuid', to: '/blog/tags/computer-science' },
                    { from: '/blog/tags/vite', to: '/blog/tags/frontend' },
                    { from: '/blog/tags/vps', to: '/blog/tags/devops' },
                    { from: '/blog/tags/vscode', to: '/blog/tags/tools' },
                    { from: '/blog/tags/webpack', to: '/blog/tags/frontend' },
                    { from: '/blog/tags/windows', to: '/blog/tags/devops' },
                    { from: '/blog/tags/zeppelin', to: '/blog/tags/devops' },
                ],
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
            navbar: {
                title: 'TienNHM',
                logo: {
                    alt: 'TienNHM',
                    src: 'img/tiennhm-avatar.jpg',
                    height: 40,
                    style: {
                        borderRadius: '50%',
                    }
                },
                items: [
                    {
                        type: 'docSidebar',
                        sidebarId: 'dotnetSidebar',
                        position: 'left',
                        label: 'Khoá .NET',
                    },
                    {
                        type: 'docSidebar',
                        sidebarId: 'tutorialSidebar',
                        position: 'left',
                        label: 'Tài liệu',
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
