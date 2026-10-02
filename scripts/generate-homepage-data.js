// Sinh dữ liệu cho trang chủ: recent-posts.json và topics.json.
//
// Docusaurus không đưa danh sách bài blog sang cho trang React thường, nên đọc
// thẳng frontmatter lúc build. Cách này cũng dễ kiểm hơn: chạy script là thấy
// ngay kết quả, không cần dựng cả site.
//
// Bỏ qua bài nháp và file template. Bài không khai `slug` cũng bỏ, vì suy
// đường dẫn từ tên file sẽ sai với cấu trúc thư mục theo năm ở đây.

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const root = path.join(__dirname, '..');
const POSTS_OUT = path.join(root, 'src', 'data', 'recent-posts.json');
const TOPICS_OUT = path.join(root, 'src', 'data', 'topics.json');
const TOPIC_COUNT = 12;
const COUNT = 5;

function walk(dir) {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) return walk(p);
        return /\.mdx?$/.test(e.name) ? [p] : [];
    });
}

// Ngày lấy từ tên thư mục hoặc tên file theo quy ước YYYY-MM-DD của Docusaurus.
function dateFrom(file) {
    const m = file.match(/(\d{4})-(\d{2})-(\d{2})/);
    return m ? `${m[1]}-${m[2]}-${m[3]}` : null;
}

const posts = [];
const tagUse = new Map();
for (const file of walk(path.join(root, 'blog'))) {
    if (path.basename(file).startsWith('_')) continue;

    const raw = fs.readFileSync(file, 'utf8');
    const m = /^---\n([\s\S]*?)\n---/.exec(raw);
    if (!m) continue;

    let fm;
    try { fm = yaml.load(m[1]); } catch { continue; }
    if (!fm || fm.draft === true || !fm.slug || !fm.title) continue;

    const date = dateFrom(file);
    if (!date) continue;

    for (const t of Array.isArray(fm.tags) ? fm.tags : []) {
        tagUse.set(t, (tagUse.get(t) ?? 0) + 1);
    }

    posts.push({
        title: fm.title,
        permalink: `/blog/${fm.slug}`,
        date,
        description: (fm.description ?? '').slice(0, 180),
        tags: Array.isArray(fm.tags) ? fm.tags.slice(0, 3) : [],
    });
}

posts.sort((a, b) => b.date.localeCompare(a.date));
const recent = posts.slice(0, COUNT);

if (recent.length === 0) {
    console.warn('⚠ không đọc được bài nào, giữ nguyên dữ liệu cũ');
    if (!fs.existsSync(POSTS_OUT)) fs.writeFileSync(POSTS_OUT, JSON.stringify({ posts: [] }, null, 2) + '\n');
    process.exit(0);
}

fs.writeFileSync(POSTS_OUT, JSON.stringify({ total: posts.length, posts: recent }, null, 2) + '\n');

// Chủ đề: lấy nhãn và đường dẫn từ blog/tags.yml — route sinh từ `permalink`
// chứ không phải key, nên đừng suy từ key ra.
const tags = yaml.load(fs.readFileSync(path.join(root, 'blog', 'tags.yml'), 'utf8'));
const topics = [...tagUse.entries()]
    .filter(([key]) => tags[key])
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, TOPIC_COUNT)
    .map(([key, count]) => ({
        label: tags[key].label ?? key,
        permalink: `/blog/tags${tags[key].permalink ?? `/${key}`}`,
        count,
    }));

fs.writeFileSync(TOPICS_OUT, JSON.stringify({ topics }, null, 2) + '\n');
console.log(`✓ ${recent.length} bài mới nhất (trên tổng ${posts.length}), ${topics.length} chủ đề`);
