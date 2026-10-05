// Theo dõi tiến độ dịch blog và bắt lệch frontmatter giữa hai ngôn ngữ.
//
// Bản dịch là một FILE RIÊNG thay thế hoàn toàn bản gốc. Nếu nó khai `slug`
// khác, Docusaurus sinh ra route khác — bản tiếng Anh nằm ở một URL không ai
// trỏ tới, còn URL cũ rơi về nội dung tiếng Việt. Build vẫn xanh.
//
// `date` lệch thì thứ tự bài giữa hai ngôn ngữ khác nhau. `tags` lệch thì sinh
// trang tag chỉ tồn tại ở một ngôn ngữ.

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const root = path.join(__dirname, '..', '..');
const EN_DIR = path.join(root, 'i18n', 'en', 'docusaurus-plugin-content-blog');

function walk(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) return walk(p);
        return /\.mdx?$/.test(e.name) && !e.name.startsWith('_') ? [p] : [];
    });
}

function frontMatter(file) {
    const m = /^---\n([\s\S]*?)\n---/.exec(fs.readFileSync(file, 'utf8'));
    if (!m) return null;
    try { return yaml.load(m[1]); } catch { return null; }
}

/** Chữ cái tiếng Việt có dấu — đủ để nhận ra câu tiếng Việt sót lại. */
const VIETNAMESE = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;

/**
 * Comment trong khối mã của bản dịch mà còn tiếng Việt.
 *
 * Quy ước rút ra từ 19 bản dịch có sẵn: ĐỊNH DANH giữ nguyên (tên bảng, tên
 * cột — chúng là dữ liệu), còn COMMENT là văn xuôi nên phải dịch. 51 comment
 * trong các bản đó không còn chữ tiếng Việt nào.
 */
function vietnameseCodeComments(source) {
    const out = [];
    for (const [, code] of source.matchAll(/```\w*\n([\s\S]*?)```/g)) {
        for (const line of code.split('\n')) {
            if (/^\s*(--|\/\/|#)\s*\S/.test(line) && VIETNAMESE.test(line)) {
                out.push(line.trim().slice(0, 60));
            }
        }
    }
    return out;
}

/** Khoá phải trùng nhau giữa hai ngôn ngữ, kèm cách so sánh. */
const MUST_MATCH = {
    slug: (a, b) => a === b,
    date: (a, b) => String(a).slice(0, 10) === String(b).slice(0, 10),
    tags: (a, b) => JSON.stringify(a ?? []) === JSON.stringify(b ?? []),
};

module.exports = function checkTranslations() {
    const errors = [];
    let translated = 0;
    let total = 0;

    for (const file of walk(path.join(root, 'blog'))) {
        const fm = frontMatter(file);
        if (!fm?.slug) continue;
        total++;

        const rel = path.relative(path.join(root, 'blog'), file);
        const enFile = path.join(EN_DIR, rel);
        if (!fs.existsSync(enFile)) continue;
        translated++;

        const enFm = frontMatter(enFile);
        if (!enFm) {
            errors.push(`${rel}: bản EN không đọc được frontmatter`);
            continue;
        }

        for (const [key, equal] of Object.entries(MUST_MATCH)) {
            if (!equal(fm[key], enFm[key])) {
                errors.push(
                    `${rel}: ${key} lệch — vi=${JSON.stringify(fm[key])} en=${JSON.stringify(enFm[key])}`,
                );
            }
        }

        // Dịch mà quên đổi tiêu đề thì bản EN vẫn là tiếng Việt.
        if (fm.title === enFm.title) {
            errors.push(`${rel}: title bản EN giống hệt bản VI, chưa dịch`);
        }

        for (const line of vietnameseCodeComments(fs.readFileSync(enFile, 'utf8'))) {
            errors.push(`${rel}: comment trong khối mã còn tiếng Việt — ${line}`);
        }
    }

    if (errors.length) {
        console.error(`✗ ${errors.length} lỗi bản dịch:\n  ` + errors.join('\n  '));
        return false;
    }
    console.log(`✓ ${translated}/${total} bài đã dịch, frontmatter khớp giữa hai ngôn ngữ`);
    return true;
};
