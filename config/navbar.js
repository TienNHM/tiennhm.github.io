// Thanh điều hướng. Nhãn ở đây là khoá i18n: đổi chuỗi label là mất bản dịch
// trong i18n/<locale>/docusaurus-theme-classic/navbar.json.
module.exports = {
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
            sidebarId: 'sqlSidebar',
            position: 'left',
            label: 'Khoá SQL',
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
                { to: '/notes', label: 'Ghi chép ngắn' },
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
};
