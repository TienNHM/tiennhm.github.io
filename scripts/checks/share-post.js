// Kiểm nội dung chia sẻ mạng xã hội sinh từ src/utils/sharePost.ts.
//
// Vì sao cần: giới hạn 280 ký tự của X rất dễ vỡ khi ai đó sửa khuôn chữ, mà
// hỏng thì không lộ ra lúc build — chỉ lộ khi người dùng dán vào và bị cắt cụt.
//
// Chạy trên BÀI VIẾT THẬT trong repo chứ không trên dữ liệu bịa: tiêu đề dài
// nhất và mô tả dài nhất mới là thứ làm vỡ ngân sách ký tự.

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const babel = require('@babel/core');

const root = path.join(__dirname, '..', '..');

/** Nạp module TypeScript thuần (không JSX) để dùng trong Node. */
function loadTs(relPath) {
    const file = path.join(root, relPath);
    const { code } = babel.transformSync(fs.readFileSync(file, 'utf8'), {
        filename: file,
        presets: [
            [require.resolve('@babel/preset-typescript'), { allExtensions: true }],
            [require.resolve('@babel/preset-env'), { targets: { node: 'current' } }],
        ],
        babelrc: false,
        configFile: false,
    });
    const mod = { exports: {} };
    new Function('module', 'exports', 'require', code)(mod, mod.exports, require);
    return mod.exports;
}

function walk(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) return walk(p);
        return /\.mdx?$/.test(e.name) ? [p] : [];
    });
}

const LIMITS = { x: 280, linkedin: 1300, facebook: 2000 };

module.exports = function checkSharePost() {
    const { buildSharePost, xLength } = loadTs('src/utils/sharePost.ts');
    const tagDefs = yaml.load(fs.readFileSync(path.join(root, 'blog', 'tags.yml'), 'utf8'));

    const errors = [];
    let checked = 0;

    for (const file of [...walk(path.join(root, 'blog')), ...walk(path.join(root, 'notes'))]) {
        if (path.basename(file).startsWith('_')) continue;
        const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(fs.readFileSync(file, 'utf8'));
        if (!m) continue;

        let fm;
        try { fm = yaml.load(m[1]); } catch { continue; }
        if (!fm?.title || !fm.slug) continue;

        const input = {
            title: fm.title,
            description: fm.description,
            url: `https://tiennhm.io.vn/blog/${fm.slug}`,
            tags: (fm.tags ?? [])
                .filter((t) => tagDefs[t])
                .map((t) => ({ label: tagDefs[t].label ?? t, permalink: `/blog/tags${tagDefs[t].permalink ?? `/${t}`}` })),
        };

        for (const [platform, limit] of Object.entries(LIMITS)) {
            const { text } = buildSharePost(platform, input);
            const len = platform === 'x' ? xLength(text) : text.length;
            const where = `${path.relative(root, file)} [${platform}]`;

            if (len > limit) errors.push(`${where}: ${len} ký tự, vượt ${limit}`);
            if (/undefined|NaN|\[object/.test(text)) errors.push(`${where}: lọt giá trị rác vào nội dung`);
            if (!text.includes(input.url.split('://')[1].split('/')[0])) {
                errors.push(`${where}: thiếu link về bài`);
            }
            checked++;
        }
    }

    if (errors.length) {
        console.error(`✗ ${errors.length} lỗi nội dung chia sẻ:\n  ` + errors.join('\n  '));
        return false;
    }
    console.log(`✓ ${checked} nội dung chia sẻ hợp lệ (${checked / 3} bài × 3 nền tảng)`);
    return true;
};
