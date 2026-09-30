// Thẻ <head> tĩnh: xác minh sở hữu site, Open Graph, dữ liệu có cấu trúc.
const { siteUrl } = require('./site');

module.exports = [
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
];
