#!/usr/bin/env node
/**
 * Điền `description` vào frontmatter cho những trang docs còn thiếu.
 *
 * VÌ SAO CẦN: 255/431 trang docs không có description, nên Docusaurus không
 * phát ra thẻ <meta name="description"> lẫn og:description. Google tự cắt một
 * đoạn bất kỳ trong trang làm snippet, và đoạn đó thường là mục lục hoặc phần
 * "Mục tiêu bài học" viết sẵn — giống hệt nhau ở mọi bài.
 *
 * NGUỒN LẤY MÔ TẢ: đoạn văn thật đầu tiên trong phần nội dung. Không lấy:
 *   - khối "Mục tiêu bài học": ba gạch đầu dòng y hệt nhau ở cả 250 trang,
 *   - mục tài liệu tham khảo / liên kết điều phối: nói về nguồn trích dẫn chứ
 *     không nói trang này dạy gì,
 *   - danh sách, bảng, code, JSX, admonition.
 *
 * CHỐNG TRÙNG: nhiều bài trong cùng series mở đầu bằng đúng một đoạn (k6
 * part-01 và part-02). Mô tả trùng nhau thì Google gộp lại và bỏ bớt trang khỏi
 * kết quả, nên mỗi trang giữ một danh sách ứng viên và lấy ứng viên đầu tiên
 * chưa ai dùng.
 *
 * Chạy: node scripts/generate-doc-descriptions.js [--dry]
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DRY = process.argv.includes('--dry');
/**
 * --dedupe : viết lại mô tả cho những trang đang dùng CHUNG một mô tả với trang
 * khác. Mô tả trùng nhau thì Google gộp các trang lại và chỉ hiện một, nên 13
 * bài XXE dùng đúng một câu là 12 bài mất cơ hội xuất hiện riêng.
 */
const DEDUPE = process.argv.includes('--dedupe');
const MAX_LEN = 158;

const SKIP_SECTION =
    /^#{2,6}\s*(.*(mục tiêu bài học|tài liệu tham khảo|tham khảo|liên kết điều phối|nguồn tham khảo|checklist|tags|từ khoá|điều hướng).*)$/i;
// Những câu viết sẵn dùng lại ở hàng trăm trang, hoặc nói về chính frontmatter
// của trang chứ không nói trang dạy gì.
const BOILERPLATE =
    /^(Nắm được ý chính|Áp dụng được kiến thức|Sẵn sàng chuyển sang|Danh sách sau ưu tiên|Các thẻ tags|Hoàn thành bài này|Trang này|Bài này thuộc|Mục tiêu của bài)/i;
// Câu mở đầu bằng từ nối thì tách ra khỏi ngữ cảnh sẽ vô nghĩa: người đọc thấy
// snippet "Tương tự, để xem hồ sơ của người khác..." mà không biết tương tự với
// cái gì.
// Không dùng \b ở đây: ranh giới từ trong regex JS chỉ tính ký tự ASCII, nên
// sau "Tương tự" (kết thúc bằng "ự") nó không khớp và cả luật thành vô dụng.
const CONNECTIVE =
    /^(Tương tự|Ngoài ra|Ví dụ|Lưu ý|Tuy nhiên|Vì vậy|Do đó|Như vậy|Sau đó|Tiếp theo|Cụ thể|Trong đó|Ở đây|Mặt khác|Bên cạnh đó)[\s,:;.]/i;

function walk(dir, acc = []) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) {
            if (e.name !== 'node_modules' && e.name !== '.git') walk(p, acc);
        } else if (/\.mdx?$/.test(e.name)) acc.push(p);
    }
    return acc;
}

/** Mọi đoạn văn dùng được của một trang, theo thứ tự xuất hiện. */
function candidates(raw) {
    let body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
    body = body
        .replace(/^import .*$/gm, '')
        .replace(/```[\s\S]*?```/g, '')
        .replace(/<[A-Z][\s\S]*?\/>/g, '');

    const out = [];
    let para = [];
    let skipping = false;
    const flush = () => {
        if (para.length) {
            out.push(para.join(' '));
            para = [];
        }
    };
    for (const line of body.split('\n')) {
        const t = line.trim();
        if (!t) {
            flush();
            continue;
        }
        if (/^#{1,6}\s/.test(t)) {
            flush();
            skipping = SKIP_SECTION.test(t);
            continue;
        }
        if (skipping) continue;
        // Danh sách, bảng, trích dẫn, admonition, JSX: không phải văn xuôi.
        if (/^([-*+]\s|\d+\.\s|[|>]|:::|<)/.test(t)) {
            flush();
            continue;
        }
        para.push(t);
    }
    flush();

    const usable = out
        .map(clean)
        .filter(
            (s) =>
                s.length >= 60 &&
                !BOILERPLATE.test(s) &&
                !CONNECTIVE.test(s) &&
                // Thực thể HTML lọt vào meta description sẽ bị trình duyệt giải mã.
                !/&[a-z]+;/i.test(s) &&
                /^[\p{Lu}"'`(]/u.test(s),
        );
    // Câu kết thúc bằng ":" chỉ là lời dẫn cho danh sách ngay bên dưới — đứng
    // một mình làm snippet thì cụt lủn. Vẫn giữ ở cuối danh sách ứng viên,
    // phòng khi cả trang không còn gì khác.
    return [...usable.filter((s) => !s.endsWith(':')), ...usable.filter((s) => s.endsWith(':'))];
}

function clean(p) {
    return p
        .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
        // Bỏ emoji/ký hiệu dẫn ở đầu dòng ("💡 Mô tả:", "📌 Định nghĩa:", "✅").
        .replace(/^[\p{Extended_Pictographic}\p{Emoji_Presentation}\u2600-\u27bf\ufe0f\u20e3\s]+/gu, '')
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        .replace(/\\([<>|])/g, '$1')
        .replace(/[`*_]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

function truncate(s) {
    if (s.length <= MAX_LEN) return s;
    const cut = s.slice(0, MAX_LEN);
    const at = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf(', '), cut.lastIndexOf(' '));
    return cut.slice(0, at).replace(/[,;:.]$/, '') + '.';
}

/**
 * Nhiều bài chỉ gồm heading và khối code, không có câu văn xuôi nào (ví dụ
 * 1.4-loops: bốn tiểu mục, mỗi mục một đoạn C#). Với chúng, chính tên các tiểu
 * mục mới là thứ mô tả đúng nội dung — sát hơn hẳn một câu mẫu dùng chung.
 */
function fromHeadings(raw, title) {
    const body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').replace(/```[\s\S]*?```/g, '');
    const collect = (re) => {
        const acc = [];
        for (const line of body.split('\n')) {
            const m = line.match(re);
            if (!m) continue;
            const h = clean(m[1])
                .replace(/^[\d.]+\s*[—-]\s*/, '')
                .replace(/^[\d.]+\s+/, '')
                .replace(/^[—-]\s*/, '')
                .trim();
            if (h && !SKIP_SECTION.test(`### ${h}`) && !acc.includes(h)) acc.push(h);
        }
        return acc;
    };
    // Ưu tiên tiểu mục; trang nào chỉ chia bằng ## thì lấy luôn cấp đó.
    let heads = collect(/^#{3,4}\s+(.+)$/);
    if (heads.length < 2) heads = collect(/^#{2,4}\s+(.+)$/);
    if (heads.length < 2) return null;

    const t = title.replace(/^[\d.]+\s*—\s*/, '').replace(/^\d+\.\s*/, '').trim();
    return truncate(`${t}: ${heads.join('; ')}.`);
}

/**
 * Phương án cuối: trang không có câu văn xuôi nào mà tiêu đề tiểu mục cũng chỉ
 * là khung chung ("Nội dung bài học", "Kết luận").
 *
 * Những trang rơi vào đây gần như toàn bộ là các loại lặp lại ở cả 19 module:
 * định hướng, ôn tập, tình huống nhỏ, ghi chú nâng cao. Một câu mẫu duy nhất
 * dùng cho cả 72 trang thì chính nó thành boilerplate, nên mỗi LOẠI trang có
 * câu riêng, ghép thêm tên và số thứ tự module để không trang nào trùng trang nào.
 */
const PAGE_KIND = [
    [/module-orientation$/, (m) => `Định hướng ${m}: mục tiêu, thứ tự bài học và liên kết tới chương trước — chương sau trong lộ trình .NET backend.`],
    [/review-and-assessment$/, (m) => `Ôn tập và tự kiểm tra ${m}: rà soát kiến thức đã học trước khi chuyển sang module kế tiếp của lộ trình .NET backend.`],
    [/mini-case-study$/, (m) => `Bài tập tình huống ngắn cho ${m}: đề bài, ràng buộc đầu vào — đầu ra và đáp án gợi ý, đặt trong bối cảnh CRM/.NET backend.`],
    [/quick-real-world-example$/, (m) => `Ví dụ thực tế ngắn cho ${m}: áp dụng kiến thức vừa học vào một tình huống CRM/.NET backend cụ thể.`],
    [/advanced-notes$/, (m) => `Ghi chú nâng cao cho ${m}: những điểm cần đào sâu nằm ngoài phạm vi các bài học chính.`],
    [/common-pitfalls$/, (m) => `Những lỗi thường gặp trong ${m}: dấu hiệu nhận biết, nguyên nhân và cách tránh khi làm .NET backend thực tế.`],
];

const upperFirst = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s);

function fromPath(file, title) {
    const parts = path.relative(path.join(ROOT, 'docs'), file).split(path.sep);
    const base = parts[parts.length - 1].replace(/\.mdx?$/, '');
    const dir = parts[parts.length - 2] || '';
    const moduleName = dir.match(/^module-(\d+)-(.+)$/);
    const label = moduleName
        ? `Module ${Number(moduleName[1])} — ${upperFirst(moduleName[2].replace(/-/g, ' '))}`
        : dir.replace(/^(stage|module)-\d+-/, '').replace(/-/g, ' ') || 'lộ trình';

    for (const [re, build] of PAGE_KIND) if (re.test(base)) return truncate(build(label));

    const t = title.replace(/^[\d.]+\s*—\s*/, '').replace(/^\d+\.\s*/, '').trim();
    return truncate(`${t} — bài học thuộc ${label} trong lộ trình .NET backend từ zero đến senior.`);
}

function hasDescription(raw) {
    const fm = (raw.match(/^---\r?\n([\s\S]*?)\r?\n---/) || [, ''])[1];
    return /^description:/m.test(fm);
}
function titleOf(raw) {
    const fm = (raw.match(/^---\r?\n([\s\S]*?)\r?\n---/) || [, ''])[1];
    const m = fm.match(/^title:\s*(.+)$/m);
    return m ? m[1].trim().replace(/^["']|["']$/g, '') : '';
}

function insertDescription(raw, description) {
    const value = (d) => `"${d.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
    const m = raw.match(/^(---\r?\n)([\s\S]*?)(\r?\n---\r?\n)/);
    // Ba trang project không có frontmatter. Tạo block mới chỉ với description:
    // thêm `title` vào đây sẽ ghi đè nhãn sidebar mà Docusaurus đang suy ra từ
    // thẻ H1, tức là đổi thứ không ai yêu cầu đổi.
    if (!m) return `---\ndescription: ${value(description)}\n---\n\n${raw.replace(/^\s+/, '')}`;
    // YAML: chuỗi bọc nháy kép, nên escape nháy kép và gạch chéo ngược bên trong.
    const fm = m[2];
    const titleLine = fm.match(/^title:.*$/m);
    const newFm = titleLine
        ? fm.replace(titleLine[0], `${titleLine[0]}\ndescription: ${value(description)}`)
        : `description: ${value(description)}\n${fm}`;
    return raw.replace(m[0], `${m[1]}${newFm}${m[3]}`);
}

/** Viết lại mô tả cho các trang đang trùng mô tả với nhau, giữ lại trang đầu. */
function dedupe(files) {
    const groups = new Map();
    for (const f of files) {
        const raw = fs.readFileSync(f, 'utf8');
        const fm = (raw.match(/^---\r?\n([\s\S]*?)\r?\n---/) || [, ''])[1];
        const m = fm.match(/^description:\s*(.+)$/m);
        if (!m) continue;
        const key = clean(m[1].replace(/^["']|["']$/g, '')).toLowerCase();
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(f);
    }
    const taken = new Set(groups.keys());
    let fixed = 0;
    for (const [, list] of groups) {
        if (list.length < 2) continue;
        for (const file of list.slice(1)) {
            const raw = fs.readFileSync(file, 'utf8');
            const title = titleOf(raw);
            let next = candidates(raw).find((c) => !taken.has(truncate(c).toLowerCase()));
            next = next ? truncate(next) : fromHeadings(raw, title) || fromPath(file, title);
            if (taken.has(next.toLowerCase())) continue;
            taken.add(next.toLowerCase());
            const out = raw.replace(/^description:\s*.+$/m, `description: "${next.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`);
            if (out !== raw) {
                if (!DRY) fs.writeFileSync(file, out, 'utf8');
                fixed++;
                console.log(`  ↻ ${path.relative(ROOT, file)}\n      ${next}`);
            }
        }
    }
    console.log(`${DRY ? '[thử] ' : ''}viết lại mô tả trùng: ${fixed}`);
}

function main() {
    const files = walk(path.join(ROOT, 'docs'));
    const todo = files.filter((f) => !hasDescription(fs.readFileSync(f, 'utf8')));

    // Giữ cả mô tả sẵn có để không đụng hàng với trang đã viết tay.
    const used = new Set();
    for (const f of files) {
        const raw = fs.readFileSync(f, 'utf8');
        const fm = (raw.match(/^---\r?\n([\s\S]*?)\r?\n---/) || [, ''])[1];
        const m = fm.match(/^description:\s*(.+)$/m);
        if (m) used.add(truncate(clean(m[1].replace(/^["']|["']$/g, ''))).toLowerCase());
    }

    let written = 0;
    let fallback = 0;
    let fromHeads = 0;
    const preview = [];
    for (const file of todo) {
        const raw = fs.readFileSync(file, 'utf8');
        const title = titleOf(raw);
        let chosen = null;
        let source = 'đoạn văn';
        for (const c of candidates(raw)) {
            const t = truncate(c);
            if (!used.has(t.toLowerCase())) {
                chosen = t;
                break;
            }
        }
        if (!chosen) {
            chosen = fromHeadings(raw, title);
            // Tiểu mục toàn tên khung chung ("Tình huống; Đáp án gợi ý") thì ra
            // câu quá ngắn, chẳng nói được trang dạy gì — thà dùng mẫu theo loại
            // trang, ít ra còn nêu đúng module.
            if (chosen && chosen.length < 80) chosen = null;
            if (chosen && used.has(chosen.toLowerCase())) chosen = null;
            if (chosen) {
                fromHeads++;
                source = 'tiểu mục';
            }
        }
        if (!chosen) {
            chosen = fromPath(file, title);
            fallback++;
            source = 'đường dẫn';
        }
        used.add(chosen.toLowerCase());

        const next = insertDescription(raw, chosen);
        if (!next) continue;
        if (!DRY) fs.writeFileSync(file, next, 'utf8');
        written++;
        preview.push([path.relative(ROOT, file), chosen, source]);
    }

    if (DEDUPE) dedupe(files);

    console.log(`${DRY ? '[thử] ' : ''}trang được điền description: ${written}/${todo.length}`);
    console.log(`  dựng từ tiêu đề các tiểu mục (trang chỉ có heading + code): ${fromHeads}`);
    console.log(`  dựng từ đường dẫn (không còn gì để bám): ${fallback}`);
    console.log();
    const want = (process.argv.find((a) => a.startsWith('--sample=')) || '').split('=')[1];
    const rows = want ? preview.filter((r) => r[2] === want) : preview.slice(0, 12);
    for (const [f, d, src] of rows.slice(0, 14)) console.log(`· [${src}] ${f}\n    ${d}\n`);
}

if (require.main === module) main();
module.exports = { candidates, truncate, clean };
