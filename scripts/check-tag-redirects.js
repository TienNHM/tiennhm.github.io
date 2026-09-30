// Kiểm tra config/tag-redirects.js mà không cần build.
//
// plugin-client-redirects đối chiếu `to` với danh sách route THẬT rồi ném lỗi
// nếu lệch, nên sai một chữ là build đỏ sau ~6 phút CI. Script này dựng lại
// đúng tập route đó từ blog/tags.yml + frontmatter bài viết và kiểm tại chỗ.
//
// Bẫy đã dính một lần: route sinh từ `permalink`, không phải key của tag.

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const root = path.join(__dirname, '..');
const redirects = require(path.join(root, 'config/tag-redirects.js'));
const tags = yaml.load(fs.readFileSync(path.join(root, 'blog/tags.yml'), 'utf8'));

function walk(dir) {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) return walk(p);
        return /\.mdx?$/.test(e.name) ? [p] : [];
    });
}

// Tag được bài viết dùng thật; tag khai trong tags.yml mà không bài nào dùng
// thì Docusaurus không sinh route.
const used = new Set();
for (const file of walk(path.join(root, 'blog'))) {
    const m = /^---\n([\s\S]*?)\n---/.exec(fs.readFileSync(file, 'utf8'));
    if (!m) continue;
    let fm;
    try { fm = yaml.load(m[1]); } catch { continue; }
    for (const t of fm?.tags ?? []) used.add(t);
}

const routes = new Set(
    [...used]
        .filter((t) => tags[t])
        .map((t) => `/blog/tags${tags[t].permalink ?? `/${t}`}`),
);

const errors = [];
const seen = new Map();
for (const { from, to } of redirects) {
    if (!routes.has(to)) errors.push(`đích không có route: ${from} -> ${to}`);
    if (routes.has(from)) errors.push(`from đụng route đang có: ${from}`);
    if (seen.has(from)) errors.push(`from trùng: ${from}`);
    seen.set(from, to);
}
for (const t of used) {
    if (!tags[t]) errors.push(`bài viết dùng tag chưa khai trong tags.yml: ${t}`);
}

if (errors.length) {
    console.error(`✗ ${errors.length} lỗi:\n  ` + errors.join('\n  '));
    process.exit(1);
}
console.log(`✓ ${redirects.length} redirect, ${routes.size} trang tag, không lỗi`);
