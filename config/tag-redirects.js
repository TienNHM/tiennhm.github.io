// Chuyển hướng các trang tag đã bị xoá khi gom taxonomy.
//
// Đợt gom 133 tag về 32 (commit d4ee124360) xoá 106 trang tag, trong đó Google
// đã kịp lập chỉ mục một số — ví dụ /blog/tags/net-10 vẫn ra trong kết quả tìm
// kiếm nhưng trả 404.
//
// Chỉ chuyển hướng những tag ĐỔI TÊN mà chủ đề vẫn còn. 21 tag rác còn lại
// (tag1, tag2, Kết luận, Series, McKinsey...) CỐ Ý để 404: chúng không có trang
// tương đương, chuyển hướng sang một trang chung chỉ tổ bị coi là soft 404.
//
// Khoá của map là ĐÍCH ĐẾN, và phải là `permalink` trong blog/tags.yml chứ
// không phải key của tag — route sinh từ permalink. 11 tag có permalink tiếng
// Việt lệch key (security -> /bao-mat, performance -> /hieu-nang...), viết
// nhầm là build đỏ ngay ở plugin-client-redirects.
//
// Slug của `from` sinh bằng lodash.kebabCase, đúng hàm Docusaurus dùng trong
// @docusaurus/utils/lib/tags.js — nên tag 'net10' thành '/blog/tags/net-10'.
//
// Kiểm tra lại bằng: npm run check:tag-redirects
const TAG_REDIRECTS = {
    '/blog/tags/khoa-hoc-may-tinh': [
        'binary', 'data-representation', 'decimal', 'encoding',
        'hexadecimal', 'identifier', 'number-system', 'unicode',
        'unique-id', 'unsigned-integer', 'uuid',
    ],
    '/blog/tags/frontend': [
        'ant-design', 'bootstrap', 'esbuild', 'material-design', 'tailwind',
        'ui-libraries', 'vite', 'webpack',
    ],
    '/blog/tags/ai-driven-development': [
        'ai-dd', 'ai-dlc', 'autonomous-coding', 'caal', 'lập-trinh-ai',
        'natural-language-programming', 'tương-lai-ai',
    ],
    '/blog/tags/devops': [
        'apache', 'linux', 'production', 'traefik', 'vps', 'windows',
        'zeppelin',
    ],
    '/blog/tags/database': [
        'character-sets', 'collations', 'dbml', 'mysql', 'schema',
        'transaction',
    ],
    '/blog/tags/cong-cu': [
        'documentation', 'extensions', 'markdown', 'readme', 'vscode',
    ],
    '/blog/tags/ai': [
        'deep-learning', 'generative-ai', 'machine-learning', 'onnx',
    ],
    '/blog/tags/dotnet': [
        'garbage-collection', 'net-10', 'net-8', 'net-9',
    ],
    '/blog/tags/angular': [
        'angular-18', 'angular-cli', 'primeng',
    ],
    '/blog/tags/api': [
        'openapi', 'scalar', 'swagger',
    ],
    '/blog/tags/cong-cu-ai': [
        'chat-gpt', 'cursor', 'git-hub-copilot',
    ],
    '/blog/tags/hoc-tap': [
        'free-course', 'resources', 'tutorial',
    ],
    '/blog/tags/kien-thuc-nen': [
        'cong-nghệ-phần-mềm', 'programming', 'software-development',
    ],
    '/blog/tags/aspnet-core': [
        'dependency-injection', 'service-lifetime',
    ],
    '/blog/tags/bao-mat': [
        'owasp', 'tls',
    ],
    '/blog/tags/git': [
        'badges', 'github',
    ],
    '/blog/tags/hieu-nang': [
        'build-optimization', 'build-time',
    ],
    '/blog/tags/http': [
        'cloudflare', 'https',
    ],
    '/blog/tags/microservices': [
        'message-broker', 'rabbitmq',
    ],
    '/blog/tags/concurrency': [
        'async',
    ],
    '/blog/tags/csharp': [
        'types',
    ],
    '/blog/tags/docker': [
        'alpine',
    ],
    '/blog/tags/ef-core': [
        'efcore',
    ],
    '/blog/tags/go-roi': [
        'debugging',
    ],
    '/blog/tags/javascript': [
        'nodejs',
    ],
};

module.exports = Object.entries(TAG_REDIRECTS).flatMap(([to, froms]) =>
    froms.map((tag) => ({ from: `/blog/tags/${tag}`, to })),
);
