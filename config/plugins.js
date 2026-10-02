// Plugin cài thêm ngoài preset-classic.
module.exports = [
    // Sinh file .md cho mỗi trang blog/docs, phục vụ nút "Copy Markdown
    // cho AI". Đọc permalink thật qua allContentLoaded thay vì tự suy route
    // từ đường dẫn file — xem plugins/page-markdown/index.js.
    require.resolve('../plugins/page-markdown'),
    // Mục Notes: ghi chép ngắn, tách hẳn khỏi /blog.
    //
    // Một instance blog thứ hai chứ không phải thư mục con của blog hiện tại:
    // nó cần route riêng, feed riêng và không gian tag riêng. Blog là bài dài
    // có mở đầu kết luận; note là một phát hiện viết trong 20 phút.
    //
    // onUntruncatedBlogPosts: 'ignore' vì note ngắn, không cần <!--truncate-->.
    [
        '@docusaurus/plugin-content-blog',
        /** @type {import('@docusaurus/plugin-content-blog').Options} */
        ({
            id: 'notes',
            path: './notes',
            routeBasePath: 'notes',
            blogTitle: 'Notes',
            blogDescription:
                'Ghi chép ngắn: phát hiện khi gỡ lỗi, mẹo công cụ, và những thứ không muốn quên.',
            blogSidebarTitle: 'Ghi chép gần đây',
            blogSidebarCount: 15,
            postsPerPage: 20,
            showReadingTime: false,
            onUntruncatedBlogPosts: 'ignore',
            feedOptions: {
                type: ['rss', 'atom'],
                title: 'TienNHM — Notes',
                copyright: `Copyright © ${new Date().getFullYear()} TienNHM.`,
            },
        }),
    ],

    // Chuyển hướng URL cũ: tag gom taxonomy (tag-redirects.js) và trang đã gỡ
    // khỏi site (page-redirects.js).
    [
        '@docusaurus/plugin-client-redirects',
        /** @type {import('@docusaurus/plugin-client-redirects').Options} */
        ({
            redirects: [
                ...require('./tag-redirects'),
                ...require('./page-redirects'),
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
];
