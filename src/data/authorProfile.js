/**
 * Hồ sơ tác giả dùng chung cho toàn bộ JSON-LD của site.
 *
 * File này là NGUỒN SỰ THẬT DUY NHẤT cho entity Person:
 *  - `docusaurus.config.js` require nó để dựng node Person trong @graph site-wide.
 *  - `src/components/SEO/ProfilePageStructuredData.tsx` import nó để dựng
 *    ProfilePage trên trang /about.
 *
 * Cả hai nơi dùng CÙNG một `@id` (`${siteUrl}/#person`) nên các node sẽ hợp nhất
 * thành một entity duy nhất thay vì tạo ra hai Person trùng lặp.
 *
 * QUY TẮC: chỉ thêm vào `knowsAbout` những chủ đề THỰC SỰ có nội dung trên site
 * (docs/ hoặc blog/). Không khai khống chuyên môn — Google và các AI agent đối
 * chiếu entity với nội dung thật, khai khống chỉ làm loãng độ tin cậy.
 *
 * Viết ở dạng CommonJS vì `docusaurus.config.js` chạy trực tiếp trên Node.
 */

/**
 * Danh sách chủ đề chuyên môn, mỗi mục đều truy vết được về nội dung có thật:
 *
 * - .NET / C# / ASP.NET Core / EF Core  -> docs/09-dotnet-backend-zero-to-senior
 * - ABP Framework / Microservices /
 *   Multi-tenancy / Software architecture -> blog 2026-09-15 (nền tảng CRM multi-tenant)
 * - Angular                              -> blog 2025-08-23, 2025-11-01, 2026-09-15
 * - JavaScript                           -> blog 2023-06-13, 2023-06-15
 * - RabbitMQ                             -> blog 2025-08-23
 * - Redis / PostgreSQL / MySQL / SQL /
 *   Database design                      -> docs/06-database, blog 2024-06-22, 2025-10-11
 * - Docker / Kubernetes                  -> blog 2026-09-12 (Server GC trong container), 2026-09-15
 * - AWS / Cloud computing                -> docs/07-aws-cloud-practitioner-essentials
 * - Load testing / k6                    -> docs/05-k6
 * - Web security / OWASP Top 10          -> docs/02-web-security (WebGoat)
 * - Operating systems                    -> docs/01-operating-system
 * - Algorithms and data structures       -> docs/04-leetcode
 * - AI-driven development / Generative AI-> blog 2025-08-24 (series AI-DD), 2023-08-10
 * - AI agent skills                      -> docs/08-agent-skills
 * - OpenAPI                              -> blog 2026-08-19 (Scalar API Reference)
 * - SEO / GEO                            -> docs/seo-geo-guide.mdx, src/components/SEO
 * - Performance optimization             -> blog 2025-11-01, 2026-09-12
 *
 * @type {string[]}
 */
const knowsAbout = [
    '.NET',
    'C#',
    'ASP.NET Core',
    'Entity Framework Core',
    'ABP Framework',
    'Microservices',
    'Multi-tenancy',
    'Software architecture',
    'Angular',
    'JavaScript',
    'RabbitMQ',
    'Redis',
    'PostgreSQL',
    'MySQL',
    'SQL',
    'Database design',
    'Docker',
    'Kubernetes',
    'Amazon Web Services',
    'Cloud computing',
    'Load testing',
    'k6',
    'Performance optimization',
    'Web security',
    'OWASP Top 10',
    'Operating systems',
    'Algorithms and data structures',
    'AI-driven development',
    'Generative AI',
    'AI agent skills',
    'OpenAPI',
    'Search engine optimization',
    'Generative Engine Optimization',
];

/** @type {string[]} */
const sameAs = [
    'https://github.com/TienNHM',
    'https://www.linkedin.com/in/tien-nhm',
    'https://www.youtube.com/TienNguyen09',
    'https://g.dev/TienNHM',
];

const authorProfile = {
    name: 'Nguyễn Huỳnh Minh Tiến',
    alternateName: 'TienNHM',
    jobTitle: 'Fullstack Developer',
    image: 'https://avatars.githubusercontent.com/u/33385777?v=4',
    email: 'tiennhm.it@gmail.com',
    description:
        'Fullstack Developer tại Việt Nam, làm sản phẩm với .NET/ASP.NET Core, ABP Framework và Angular; viết về kiến trúc microservices, database, hiệu năng và AI-driven development.',
    sameAs,
    knowsAbout,
};

module.exports = { authorProfile, knowsAbout, sameAs };
