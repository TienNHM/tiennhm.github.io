// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

require('dotenv').config({ path: `.env.local`, override: true });
// require('dotenv').config({});

const { organizationName, projectName, siteUrl, siteDescription } = require('./config/site');

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

    presets: require('./config/presets'),

    plugins: require('./config/plugins'),

    /** Chạy trước client module của plugin-google-gtag; tránh TypeError khi không có gtag */
    clientModules: [require.resolve('./src/client/gtag-shim.js')],

    themes: [
        '@docusaurus/theme-live-codeblock',
        'docusaurus-plugin-sass'
    ],

    themeConfig: require('./config/theme-config'),
};

module.exports = config;
