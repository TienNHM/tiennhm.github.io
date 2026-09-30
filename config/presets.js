// preset-classic: docs, blog, sitemap, gtag. Đường dẫn editUrl dựng từ
// organizationName/projectName trong config/site.js.
const { organizationName, projectName } = require('./site');

module.exports = [
    [
        'classic',
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
            docs: {
                sidebarPath: require.resolve('../sidebars.js'),
                // Chèn hàng "Lưu PDF / Copy markdown / lượt xem" ngay sau H1
                // để trang docs khớp vị trí với trang blog.
                remarkPlugins: [require('../plugins/docs-page-actions/remark')],
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
                customCss: require.resolve('../src/css/custom.css'),
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
];
