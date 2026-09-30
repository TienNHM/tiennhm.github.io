const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;
const algoliaConfig = require('./algolia');
const footerLinks = require('./footer-links');

/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
module.exports = {
    // Replace with your project's social card
    image: 'img/copyright-tiennhm.webp',
    navbar: require('./navbar'),
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
};
