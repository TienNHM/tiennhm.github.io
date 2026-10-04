// Chỉnh nội dung RSS/Atom trước khi ghi ra file.
//
// Hai thứ phải sửa, đều phát hiện khi nhập bài thật sang dev.to:
//
// 1. KHỐI MÃ MẤT XUỐNG DÒNG. Docusaurus tô màu bằng Prism, mỗi dòng là một
//    <span class="token-line"> kết thúc bằng <br>. Trong cả bài KHÔNG có ký tự
//    \n thật nào bên trong <pre>. Nơi nhập bài lọc bỏ <br> và <span> bên trong
//    <pre> rồi nối phần chữ lại — toàn bộ khối mã dính thành một dòng.
//
// 2. THẺ PHÂN LOẠI DÙNG NHÃN TIẾNG VIỆT. Mặc định feed phát `tag.label`, nên
//    "Công cụ AI" sang dev.to thành #côngcụai — thẻ rác không ai theo dõi.
//
// Chỉ đụng tới feed. Trang web giữ nguyên tô màu cú pháp như cũ.

/**
 * Thẻ của site ánh xạ sang thẻ có cộng đồng thật trên dev.to.
 *
 * Không khai ở đây thì rơi về slug trong `permalink` — vẫn ASCII, vẫn đọc
 * được, chỉ là không trúng cộng đồng sẵn có.
 */
const TAG_ALIASES = {
    dotnet: 'dotnet',
    csharp: 'csharp',
    'aspnet-core': 'dotnet',
    'ef-core': 'dotnet',
    database: 'database',
    sql: 'sql',
    postgresql: 'postgres',
    api: 'api',
    http: 'webdev',
    'bao-mat': 'security',
    devops: 'devops',
    docker: 'docker',
    'hieu-nang': 'performance',
    'go-roi': 'debugging',
    angular: 'angular',
    frontend: 'webdev',
    javascript: 'javascript',
    ai: 'ai',
    'ai-driven-development': 'ai',
    'cong-cu-ai': 'ai',
    'khoa-hoc-may-tinh': 'computerscience',
    'kien-thuc-nen': 'programming',
    git: 'git',
    'cong-cu': 'productivity',
    'kiem-thu': 'testing',
    'hoc-tap': 'learning',
    'nghe-nghiep': 'career',
    architecture: 'architecture',
    backend: 'backend',
    microservices: 'microservices',
    concurrency: 'programming',
    abp: 'dotnet',
};

/** Lấy slug cuối của permalink: /blog/tags/cong-cu-ai -> cong-cu-ai */
function slugOf(tag) {
    return String(tag.permalink ?? '').replace(/\/+$/, '').split('/').pop() ?? '';
}

function toFeedTag(tag) {
    const slug = slugOf(tag);
    return TAG_ALIASES[slug] ?? slug.replace(/-/g, '');
}

/**
 * Thay khối mã đã tô màu bằng <pre><code> trơn, có xuống dòng THẬT.
 *
 * Phần chữ bên trong các span vốn đã được escape HTML, nên bóc thẻ mà giữ
 * nguyên phần chữ là vẫn đúng — không được escape lại lần nữa.
 */
function plainifyCodeBlocks(html) {
    if (!html) return html;
    return html.replace(/<pre\b[^>]*>([\s\S]*?)<\/pre>/gi, (_match, inner) => {
        const text = inner
            .replace(/<br\s*\/?>/gi, '\n')
            .replace(/<[^>]+>/g, '')
            .replace(/&nbsp;/g, ' ')
            .replace(/[ \t]+$/gm, '')
            .replace(/\n+$/, '');
        return `<pre><code>${text}</code></pre>`;
    });
}

/**
 * Dựng feed item: gọi bản mặc định rồi chỉnh lại.
 *
 * Dựa vào việc bản mặc định map 1:1 theo thứ tự `blogPosts` (nó dùng
 * `Promise.all(blogPosts.map(...))`), nên ghép theo chỉ số là an toàn.
 */
async function createFeedItems({ blogPosts, defaultCreateFeedItems, ...rest }) {
    const items = await defaultCreateFeedItems({ blogPosts, ...rest });

    return items.map((item, index) => {
        const tags = blogPosts[index]?.metadata?.tags ?? [];
        const feedTags = [...new Set(tags.map(toFeedTag).filter(Boolean))];

        return {
            ...item,
            content: plainifyCodeBlocks(item.content),
            category: feedTags.map((name) => ({ name, term: name })),
        };
    });
}

module.exports = { createFeedItems, plainifyCodeBlocks, toFeedTag, TAG_ALIASES };
