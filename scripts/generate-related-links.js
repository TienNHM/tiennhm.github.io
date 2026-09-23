#!/usr/bin/env node
/**
 * Sinh khối "Bài liên quan" ở cuối mỗi trang blog và docs.
 *
 * VÌ SAO LÀ SCRIPT SINH MARKDOWN, KHÔNG PHẢI COMPONENT REACT:
 * Component muốn biết trang nào liên quan trang nào thì phải có chỉ mục của cả
 * site. Cách duy nhất đưa chỉ mục đó tới runtime là `setGlobalData`, mà global
 * data của Docusaurus nằm trong MỘT file được nạp cho MỌI trang — với 474 trang
 * thì đó là hơn 100 KB cộng vào mọi lượt tải, đúng thứ vừa bị cắt đi ở loạt
 * commit hiệu suất. Sinh thẳng ra markdown thì link nằm sẵn trong HTML tĩnh,
 * tốn 0 byte JS, và crawler đọc được mà không cần chạy script.
 *
 * DẤU MỐC LÀ HEADING, KHÔNG PHẢI HTML COMMENT:
 * Site không đặt `markdown.format`, nên Docusaurus 3 xử lý cả .md lẫn .mdx bằng
 * MDX — ở đó `<!-- -->` không phải comment mà là lỗi cú pháp. Khối luôn nằm
 * cuối file và được nhận diện bằng heading, nên chạy lại script là ghi đè đúng
 * khối cũ chứ không chồng thêm.
 *
 * Chạy: node scripts/generate-related-links.js [--dry] [--min=N] [--top=N]
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const HEADING = '## Bài liên quan';
const args = process.argv.slice(2);
const DRY = args.includes('--dry');
const MIN_SCORE = Number((args.find((a) => a.startsWith('--min=')) || '--min=80').split('=')[1]);
/** --show=<chuỗi> : in ra khối sẽ sinh cho các route khớp, không ghi file. */
const SHOW = (args.find((a) => a.startsWith('--show=')) || '').split('=')[1];
const TOP_N = Number((args.find((a) => a.startsWith('--top=')) || '--top=3').split('=')[1]);

// ---------------------------------------------------------------- chỉ mục

const numberPrefix = /^(?<n>\d+)\s*[-_.]+\s*(?<rest>[^-_.\s].*)$/;
// `1.10-foo` giữ nguyên tiền tố, `09-foo` thì bỏ — Docusaurus cố tình bỏ qua
// dạng số.số để không nhầm với số phiên bản.
const versionLike = /^\d+[-_.]\d/;
const stripNumber = (s) => (versionLike.test(s) ? s : s.match(numberPrefix)?.groups.rest ?? s);

const frontmatter = (t) => (t.match(/^---\r?\n([\s\S]*?)\r?\n---/) || [, ''])[1];
const scalar = (f, k) => {
    const m = f.match(new RegExp(`^${k}:\\s*(.+)$`, 'm'));
    return m ? m[1].trim().replace(/^["']|["']$/g, '') : null;
};
function sequence(f, k) {
    const inline = f.match(new RegExp(`^${k}:\\s*\\[(.*?)\\]`, 'ms'));
    if (inline) return inline[1].split(',').map((s) => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
    const block = f.match(new RegExp(`^${k}:\\s*\\n((?:\\s*-\\s*.+\\n?)+)`, 'm'));
    if (block) return block[1].split('\n').map((s) => s.replace(/^\s*-\s*/, '').trim().replace(/^["']|["']$/g, '')).filter(Boolean);
    return [];
}
function walk(dir, acc = []) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) {
            // So theo TÊN thư mục, không so theo cả đường dẫn: repo nằm trong
            // ./tiennhm.github.io, mà chuỗi ".github.io" có chứa ".git" — dò
            // bằng đường dẫn thì loại sạch mọi thư mục con.
            if (e.name !== 'node_modules' && e.name !== '.git') walk(p, acc);
        } else if (/\.mdx?$/.test(e.name)) acc.push(p);
    }
    return acc;
}

function buildIndex() {
    const items = [];
    for (const file of walk(path.join(ROOT, 'docs'))) {
        const raw = fs.readFileSync(file, 'utf8');
        const f = frontmatter(raw);
        const slug = scalar(f, 'slug');
        const parts = path.relative(path.join(ROOT, 'docs'), file).replace(/\.mdx?$/, '').split(path.sep).map(stripNumber);
        const base = parts[parts.length - 1];
        // `slug` trong frontmatter thắng mọi thứ khác. Phải xét nó TRƯỚC khi xét
        // trang category index: file `15. Index.md` sau khi bỏ tiền tố số còn
        // lại "Index", trùng luật category index, nên nếu xét ngược thứ tự thì
        // nó bị gán vào route của cả thư mục — mà route đó cũng có thật, nên
        // kiểu kiểm tra "route có trong sitemap không" hoàn toàn không thấy.
        const isCategoryIndex = /^(index|readme)$/i.test(base) || base === parts[parts.length - 2];
        let route;
        if (slug && slug.startsWith('/')) route = `/docs${slug}`;
        else if (slug) route = `/docs/${parts.slice(0, -1).concat(slug).join('/')}`;
        else if (isCategoryIndex) route = `/docs/${parts.slice(0, -1).join('/')}`;
        else route = `/docs/${parts.join('/')}`;
        items.push(mkItem('docs', file, route, raw, f, parts.slice(0, -1)));
    }
    for (const file of walk(path.join(ROOT, 'blog'))) {
        const raw = fs.readFileSync(file, 'utf8');
        const f = frontmatter(raw);
        if (!f || scalar(f, 'draft') === 'true') continue;
        let slug = scalar(f, 'slug');
        if (!slug) {
            const b = path.basename(file, path.extname(file));
            const dir = path.basename(path.dirname(file));
            slug = (b === 'index' ? dir : b).replace(/^\d{4}-\d{2}-\d{2}-/, '');
        }
        items.push(mkItem('blog', file, `/blog/${slug}`, raw, f, []));
    }
    return items;
}

function mkItem(type, file, route, raw, f, folderParts) {
    const body = raw.slice(raw.indexOf('---', 3) + 3);
    return {
        type,
        file,
        route: route.replace(/\/$/, ''),
        title: scalar(f, 'title') || path.basename(file),
        description: scalar(f, 'description') || '',
        tags: sequence(f, 'tags'),
        keywords: sequence(f, 'keywords'),
        folder: path.dirname(file),
        folderParts,
        // Trang nào bài này đang trỏ tới — dùng làm tín hiệu liên quan mạnh nhất.
        outbound: new Set([...body.matchAll(/\]\((\/(?:docs|blog)\/[^)\s#]*)/g)].map((m) => m[1].replace(/\/$/, ''))),
    };
}

// ------------------------------------------------------------- chấm điểm

const STOP = new Set(
    ('va la cua cho mot cac nhung duoc voi tren trong khi nay do khong co the bi tu den ve ra vao ' +
     'the and for the with from that this what why how when your you are not but all can has have ' +
     'module stage bai phan gioi thieu huong dan tong quan orientation overview intro').split(/\s+/),
);
const deaccent = (s) =>
    s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
const tokenize = (s) =>
    deaccent(String(s).toLowerCase())
        .split(/[^a-z0-9]+/)
        .filter((w) => w.length >= 3 && !STOP.has(w));

function signals(item) {
    const strong = new Map();
    const weak = new Map();
    const bump = (m, w) => m.set(w, (m.get(w) || 0) + 1);
    for (const t of [...item.tags, ...item.keywords]) for (const w of tokenize(t)) bump(strong, w);
    for (const w of tokenize(item.title)) bump(weak, w);
    for (const w of tokenize(item.description)) bump(weak, w);
    // Tên thư mục là tín hiệu chủ đề duy nhất của 250 trang docs không có
    // tags/keywords/description nào (toàn bộ khoá .NET backend).
    for (const p of item.folderParts) for (const w of tokenize(p)) bump(weak, w);
    return { strong: new Set(strong.keys()), weak: new Set(weak.keys()) };
}

/**
 * Trọng số IDF cho từng từ khoá.
 *
 * Đếm từ trùng nhau thuần tuý không dùng được: `dotnet`, `backend`,
 * `aspnet-core` có mặt ở hàng trăm trang nên hai trang chẳng liên quan gì vẫn
 * đạt điểm rất cao — bản đầu cho `module-4-summary` và `module-1-summary` của
 * khoá AWS tới 90 điểm chỉ vì chung tag. IDF kéo những từ phổ biến đó về gần 0
 * và đẩy những từ thật sự đặc trưng (`sargable`, `deadlock`, `isolation`,
 * `n+1`) lên, nên điểm số phản ánh đúng mức đặc thù của chủ đề.
 */
function buildIdf(items, sig) {
    const df = new Map();
    for (const i of items) {
        const seen = new Set([...sig.get(i.route).strong, ...sig.get(i.route).weak]);
        for (const w of seen) df.set(w, (df.get(w) || 0) + 1);
    }
    const N = items.length;
    const idf = new Map();
    for (const [w, n] of df) idf.set(w, Math.log(N / n));
    return idf;
}

function score(a, b, sa, sb, idf) {
    if (a.route === b.route) return 0;
    // Chỉ bắc cầu blog <-> docs. Hai trang docs cùng khoá đã nằm cạnh nhau
    // trong sidebar và ở prev/next rồi; nối thêm chỉ đẻ ra khối lặp mà không
    // tạo đường đi mới nào — đúng loại link Google chiết khấu.
    if (a.type === b.type) return 0;

    const w = (t) => idf.get(t) || 0;
    let s = 0;
    for (const t of sa.strong) if (sb.strong.has(t)) s += 5 * w(t);
    for (const t of sa.strong) if (sb.weak.has(t)) s += 2 * w(t);
    for (const t of sa.weak) if (sb.strong.has(t)) s += 2 * w(t);
    for (const t of sa.weak) if (sb.weak.has(t)) s += 1 * w(t);

    // Tín hiệu mạnh nhất và đáng tin nhất: chính tác giả đã dẫn link giữa hai
    // trang này, tức đã tự tay xác nhận chúng liên quan.
    if (a.outbound.has(b.route)) s += 40;
    if (b.outbound.has(a.route)) s += 40;
    return s;
}

/**
 * Trang quá chung chung để làm đích của một link "bài liên quan": ôn tập, tổng
 * kết, bài kiểm tra, trang mở đầu module, và trang gốc /docs. Chúng có tiêu đề
 * và tag giống hệt cả module nên điểm rất cao, nhưng dẫn người đọc tới đó thì
 * không giải thích thêm được gì.
 */
const GENERIC_TARGET =
    /(review-and-assessment|module-\d+-(summary|assessment)|mini-case-study|module-orientation|quick-real-world-example|advanced-notes)$/;
const isGenericTarget = (item) => item.route === '/docs' || GENERIC_TARGET.test(item.route);

// --------------------------------------------------------------- ghi file

function stripBlock(raw) {
    const i = raw.indexOf(`\n${HEADING}`);
    // Luôn chuẩn hoá phần đuôi về đúng một newline, kể cả khi chưa có khối nào:
    // nhiều file docs không có newline cuối file, ghép thẳng vào sẽ ra
    // `...đoạn văn## Bài liên quan` dính liền, không có dòng trống ngăn cách.
    return (i === -1 ? raw : raw.slice(0, i)).replace(/\s+$/, '') + '\n';
}

function renderBlock(related) {
    const lines = [`\n${HEADING}\n`];
    for (const r of related) {
        const note = r.item.description ? ` — ${trimNote(r.item.description)}` : '';
        lines.push(`- [${escapeTitle(r.item.title)}](${r.item.route})${note}`);
    }
    return lines.join('\n') + '\n';
}
const escapeTitle = (t) => t.replace(/[[\]]/g, '');
function trimNote(d) {
    const first = d.split(/(?<=[.!?])\s/)[0].trim().replace(/\s+/g, ' ');
    if (first.length <= 150) return first;
    // Cắt ở ranh giới từ, đừng chặt ngang giữa chữ.
    const cut = first.slice(0, 150);
    return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:]$/, '')}…`;
}

function main() {
    const items = buildIndex();
    const known = new Set(items.map((i) => i.route));
    const sig = new Map(items.map((i) => [i.route, signals(i)]));
    const idf = buildIdf(items, sig);

    let written = 0;
    let skipped = 0;
    const perType = { docs: 0, blog: 0 };
    const linkCount = [];

    // Bảng xếp hạng thô của từng trang, để xét điều kiện "chọn nhau".
    const ranking = new Map();
    for (const a of items) {
        const sa = sig.get(a.route);
        ranking.set(
            a.route,
            items
                .filter((b) => !isGenericTarget(b))
                .map((b) => ({ item: b, s: score(a, b, sa, sig.get(b.route), idf) }))
                .filter((r) => r.s > 0)
                .sort((x, y) => y.s - x.s || x.item.route.localeCompare(y.item.route))
                .slice(0, TOP_N),
        );
    }
    const inTop = (from, to) => (ranking.get(from) || []).some((r) => r.item.route === to);

    for (const a of items) {
        // Chỉ giữ cặp mà HAI BÊN cùng xếp nhau vào top — ngưỡng điểm một chiều
        // không lọc được rác, vì điểm cao và điểm thấp lẫn vào nhau ở mọi mức.
        // Riêng cặp đã có link qua lại thì luôn giữ: chính tác giả đã xác nhận.
        const scored = (ranking.get(a.route) || []).filter((r) => {
            const authorLinked = a.outbound.has(r.item.route) || r.item.outbound.has(a.route);
            return authorLinked || (r.s >= MIN_SCORE && inTop(r.item.route, a.route));
        });

        // onBrokenLinks: 'throw' — mọi link sinh ra phải là route có thật.
        for (const r of scored) if (!known.has(r.item.route)) throw new Error(`route lạ: ${r.item.route}`);

        if (SHOW) {
            if (a.route.includes(SHOW)) {
                console.log(`\n${a.route}   [${a.type}]`);
                if (!scored.length) console.log('   (không đủ điểm — để trống)');
                for (const r of scored) console.log(`   ${String(r.s).padStart(3)}  ${r.item.route}`);
            }
            continue;
        }

        const raw = fs.readFileSync(a.file, 'utf8');
        const hadBlock = raw.includes(`\n${HEADING}`);
        // Trang không đủ điểm thì để yên hoàn toàn. stripBlock có chuẩn hoá ký
        // tự trắng cuối file, nếu áp cho cả những file này thì diff phình ra
        // hàng chục file chỉ vì một newline.
        const next = scored.length
            ? stripBlock(raw) + renderBlock(scored)
            : hadBlock
              ? stripBlock(raw)
              : raw;
        if (next !== raw) {
            if (!DRY) fs.writeFileSync(a.file, next, 'utf8');
            written++;
        }
        if (scored.length) {
            perType[a.type]++;
            linkCount.push(scored.length);
        } else skipped++;
    }

    const total = linkCount.reduce((s, n) => s + n, 0);
    console.log(`${DRY ? '[thử] ' : ''}file thay đổi: ${written}`);
    console.log(`có khối liên quan: blog ${perType.blog} | docs ${perType.docs}`);
    console.log(`không đủ điểm (bỏ trống): ${skipped}`);
    console.log(`tổng link sinh ra: ${total}  (ngưỡng ${MIN_SCORE}, tối đa ${TOP_N}/trang)`);
}

// Chạy trực tiếp thì sinh file; `require` thì chỉ lấy hàm ra để kiểm tra.
if (require.main === module) main();

module.exports = { buildIndex, signals, score, buildIdf };
