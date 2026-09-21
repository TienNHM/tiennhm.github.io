#!/usr/bin/env node
/**
 * generate-llms-full.js
 *
 * Sinh file `static/llms-full.txt` — bản toàn văn đi kèm `static/llms.txt`
 * (chuẩn https://llmstxt.org/). Crawler AI đọc một lần là lấy được phần lớn
 * nội dung thực chất của site, thay vì phải fetch từng trang.
 *
 * Nguyên tắc:
 *  - Không phụ thuộc package ngoài (chỉ dùng module có sẵn của Node).
 *  - Không đọc build output. URL được suy ra từ frontmatter + đường dẫn file,
 *    theo đúng quy ước routing của Docusaurus (xem resolveDocUrl/resolveBlogUrl).
 *  - Có ngân sách dung lượng (SIZE_BUDGET_BYTES). Khi vượt ngân sách, script
 *    CẮT CÓ GHI NHẬN: mọi tài liệu bị rút gọn hoặc bị loại đều được liệt kê
 *    trong phần header của file, kèm URL để crawler tự fetch bản đầy đủ.
 *
 * Dùng:
 *   node scripts/generate-llms-full.js
 *   node scripts/generate-llms-full.js --check-sitemap build/sitemap.xml   (dev)
 */

const fs = require('fs');
const path = require('path');

// Domain chính thức (canonical). Đồng bộ với hằng `siteUrl` trong
// docusaurus.config.js — KHÔNG phải tiennhm.github.io.
const SITE_URL = 'https://tiennhm.io.vn';

const ROOT = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(ROOT, 'docs');
const BLOG_DIR = path.join(ROOT, 'blog');
const OUT_FILE = path.join(ROOT, 'static', 'llms-full.txt');

// Ngân sách tổng cho file đầu ra. ~460 file nội dung thô của site là >5 MB,
// quá lớn để một crawler nuốt trong một request, nên ta giới hạn ở 2 MB.
const SIZE_BUDGET_BYTES = Number(process.env.LLMS_FULL_BUDGET_KB || 2048) * 1024;
// Trần cho phần thân của MỘT tài liệu. Bài dài hơn sẽ bị rút gọn và ghi nhận.
// Giữ số này ở mức vừa phải: ưu tiên ĐỘ PHỦ (nhiều trang) hơn ĐỘ SÂU của một
// trang, vì mỗi mục đều kèm canonical URL để crawler tự lấy bản đầy đủ.
// 6 KB là giá trị cho phép nhét ĐỦ 458 trang hiện có vào ~1.8 MB, tức không
// trang nào bị loại hẳn, và vẫn còn ~200 KB dư cho nội dung mới.
const PER_DOC_BODY_LIMIT = Number(process.env.LLMS_FULL_DOC_KB || 6) * 1024;
// Phần ngân sách dành riêng cho blog. docs/ có 400+ file, nếu xếp docs trước
// một cách thuần tuý thì toàn bộ blog sẽ bị đẩy ra ngoài — trong khi blog mới
// là phần nội dung mới nhất và có giá trị GEO cao nhất.
const BLOG_RESERVE_RATIO = 0.3;
// Trần cho một khối code đơn lẻ — code dài chủ yếu là nhiễu với crawler.
const CODE_BLOCK_LIMIT = 2500;

// ---------------------------------------------------------------------------
// Tiện ích
// ---------------------------------------------------------------------------

function walk(dir, acc = []) {
    if (!fs.existsSync(dir)) return acc;
    const entries = fs
        .readdirSync(dir, { withFileTypes: true })
        .sort((a, b) => a.name.localeCompare(b.name));
    for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            walk(full, acc);
        } else if (/\.mdx?$/i.test(entry.name)) {
            acc.push(full);
        }
    }
    return acc;
}

/**
 * Parser frontmatter tối giản. Chỉ cần lấy ra vài khoá vô hướng + vài mảng
 * dạng inline hoặc dạng gạch đầu dòng. Không cần một YAML parser đầy đủ.
 */
function parseFrontmatter(raw) {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
    if (!match) return { data: {}, body: raw };

    const data = {};
    const lines = match[1].split(/\r?\n/);
    let currentKey = null;

    for (const line of lines) {
        if (/^\s*#/.test(line) || !line.trim()) continue;

        // Phần tử của mảng dạng nhiều dòng: "  - value"
        const listItem = line.match(/^\s+-\s+(.*)$/);
        if (listItem && currentKey) {
            if (!Array.isArray(data[currentKey])) data[currentKey] = [];
            data[currentKey].push(unquote(listItem[1]));
            continue;
        }

        const kv = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
        if (!kv) continue;
        currentKey = kv[1];
        const value = kv[2].trim();

        if (value === '') {
            data[currentKey] = [];
        } else if (value.startsWith('[') && value.endsWith(']')) {
            data[currentKey] = value
                .slice(1, -1)
                .split(',')
                .map((s) => unquote(s.trim()))
                .filter(Boolean);
        } else {
            data[currentKey] = unquote(stripTrailingComment(value));
        }
    }

    return { data, body: raw.slice(match[0].length) };
}

function unquote(value) {
    const v = String(value).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        return v.slice(1, -1);
    }
    return v;
}

// Bỏ comment cuối dòng kiểu `image: /img/x.jpg  # Optional`, nhưng chỉ khi
// giá trị không nằm trong dấu nháy (tránh cắt nhầm nội dung có dấu #).
function stripTrailingComment(value) {
    if (value.startsWith('"') || value.startsWith("'")) return value;
    const idx = value.indexOf(' #');
    return idx === -1 ? value : value.slice(0, idx).trim();
}

// Bản sao chính xác của DefaultNumberPrefixParser trong Docusaurus
// (@docusaurus/plugin-content-docs/lib/numberPrefix.js). Giữ nguyên hai
// pattern này để URL suy ra khớp với route thật:
//  - `01-foo`, `01_foo`, `01.foo`, `003 - foo` → `foo`
//  - nhưng `1.1-foo`, `2021-11-foo` (giống version/ngày tháng) thì GIỮ NGUYÊN.
const IGNORED_PREFIX_PATTERN = /^\d+[-_.]\d+/;
const NUMBER_PREFIX_PATTERN = /^(?<numberPrefix>\d+)\s*[-_.]+\s*(?<suffix>[^-_.\s].*)$/;

function stripNumberPrefix(segment) {
    if (IGNORED_PREFIX_PATTERN.test(segment)) return segment;
    const match = NUMBER_PREFIX_PATTERN.exec(segment);
    return match ? match.groups.suffix : segment;
}

function toPosix(p) {
    return p.split(path.sep).join('/');
}

function encodePath(p) {
    return p
        .split('/')
        .map((seg) => encodeURIComponent(seg))
        .join('/');
}

// ---------------------------------------------------------------------------
// Suy ra URL canonical
// ---------------------------------------------------------------------------

function resolveDocUrl(absFile, frontmatter) {
    const rel = toPosix(path.relative(DOCS_DIR, absFile)).replace(/\.mdx?$/i, '');
    const baseName = rel.split('/').pop();
    const isIndexFile = /^(index|readme)$/i.test(baseName);

    let segments = rel.split('/').map(stripNumberPrefix);

    // index / README là trang gốc của thư mục chứa nó.
    if (isIndexFile) segments = segments.slice(0, -1);

    const slug = frontmatter.slug;
    if (slug) {
        if (slug.startsWith('/')) {
            // slug tuyệt đối: tính từ routeBasePath của docs.
            const clean = slug.replace(/^\/+|\/+$/g, '');
            return clean ? `${SITE_URL}/docs/${encodePath(clean)}` : `${SITE_URL}/docs`;
        }
        // slug tương đối: thay thế segment cuối (tên file).
        const parent = isIndexFile ? segments : segments.slice(0, -1);
        segments = parent.concat(slug.replace(/^\/+|\/+$/g, ''));
    }

    const joined = segments.filter(Boolean).join('/');
    return joined ? `${SITE_URL}/docs/${encodePath(joined)}` : `${SITE_URL}/docs`;
}

function resolveBlogUrl(absFile, frontmatter) {
    if (frontmatter.slug) {
        const clean = frontmatter.slug.replace(/^\/+|\/+$/g, '');
        return `${SITE_URL}/blog/${encodePath(clean)}`;
    }
    // Blog của Docusaurus phẳng: permalink KHÔNG mang theo thư mục cha.
    // `index.md` lấy tên thư mục chứa nó, file khác lấy tên chính nó.
    const base = path.basename(absFile).replace(/\.mdx?$/i, '');
    const name = /^index$/i.test(base) ? path.basename(path.dirname(absFile)) : base;
    const withoutDate = name.replace(/^\d{4}-\d{2}-\d{2}-/, '');
    return `${SITE_URL}/blog/${encodePath(withoutDate)}`;
}

// Ngày của bài blog: frontmatter `date`, nếu không thì lấy từ tên file/thư mục.
function resolveBlogDate(absFile, frontmatter) {
    if (frontmatter.date) {
        const d = new Date(frontmatter.date);
        if (!Number.isNaN(d.getTime())) return d;
    }
    const m = toPosix(absFile).match(/(\d{4})-(\d{2})-(\d{2})/);
    if (m) {
        const d = new Date(`${m[1]}-${m[2]}-${m[3]}T00:00:00Z`);
        if (!Number.isNaN(d.getTime())) return d;
    }
    return new Date(0);
}

// ---------------------------------------------------------------------------
// MDX → plain text
// ---------------------------------------------------------------------------

function mdxToPlainText(body) {
    // Tách khối code ra trước để các bước strip bên dưới không phá nội dung code.
    const fences = [];
    let text = body.replace(
        /^([ \t]*)(`{3,}|~{3,})([^\n]*)\n([\s\S]*?)^\1\2[ \t]*$/gm,
        (_m, _indent, _fence, info, code) => {
            const lang = String(info).trim().split(/\s+/)[0] || '';
            let content = code.replace(/\s+$/, '');
            if (content.length > CODE_BLOCK_LIMIT) {
                content = `${content.slice(0, CODE_BLOCK_LIMIT)}\n… [code đã rút gọn]`;
            }
            fences.push(`[code${lang ? ' ' + lang : ''}]\n${content}\n[/code]`);
            return `\u0000FENCE${fences.length - 1}\u0000`;
        }
    );

    // import / export của MDX
    text = text.replace(/^\s*import\s+[^\n]*?(?:from\s+['"][^'"]+['"])?\s*;?\s*$/gm, '');
    text = text.replace(/^\s*export\s+(?:const|default|function)[^\n]*$/gm, '');

    // Comment: {/* ... */} và <!-- ... -->
    text = text.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
    text = text.replace(/<!--[\s\S]*?-->/g, '');

    // Thẻ JSX/HTML: bỏ thẻ, GIỮ phần chữ bên trong (SummaryBox, FAQSection…
    // mang nội dung thật và là thứ crawler cần nhất).
    text = text.replace(/<\/?[A-Za-z][A-Za-z0-9._-]*(?:\s[^<>]*?)?\/?>/g, ' ');

    // Admonition của Docusaurus: `:::tip Tiêu đề` → `Tip: Tiêu đề`
    text = text.replace(/^:::+\s*([A-Za-z]+)\s*(.*)$/gm, (_m, kind, title) => {
        const label = kind.charAt(0).toUpperCase() + kind.slice(1);
        return title.trim() ? `${label}: ${title.trim()}` : `${label}:`;
    });
    text = text.replace(/^:::+\s*$/gm, '');

    // Ảnh → bỏ hẳn (alt text hiếm khi có giá trị ở đây).
    text = text.replace(/!\[[^\]]*\]\([^)]*\)/g, '');
    // Link → giữ nhãn, kèm URL tuyệt đối trong ngoặc. Nếu nhãn CHÍNH LÀ URL
    // (`[https://x](https://x)`) thì chỉ giữ một lần, khỏi lặp.
    text = text.replace(/\[([^\]]*)\]\((https?:\/\/[^)\s]+)[^)]*\)/g, (_m, label, url) =>
        label.trim() === url.trim() || !label.trim() ? url : `${label} (${url})`
    );
    text = text.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1');

    // Nhấn mạnh (giữ nguyên chữ); inline code giữ backtick cho dễ đọc.
    text = text.replace(/(\*\*|__)(.*?)\1/g, '$2');
    text = text.replace(/(?<![*\w])\*(?!\s)([^*\n]+?)(?<!\s)\*(?![*\w])/g, '$1');

    // Anchor tuỳ biến của heading: `## Tiêu đề {#tldr}` → `## Tiêu đề`
    text = text.replace(/^(#{1,6}\s+.*?)\s*\{#[^}\n]*\}\s*$/gm, '$1');

    // Thuộc tính MDX còn sót lại dạng {…} đứng một mình trên dòng.
    text = text.replace(/^\s*\{[^{}\n]*\}\s*$/gm, '');

    // Đường kẻ ngang của markdown: bỏ đi, vì `---` được dùng làm dấu phân cách
    // giữa các tài liệu trong file này.
    text = text.replace(/^[ \t]*(?:-{3,}|\*{3,}|_{3,})[ \t]*$/gm, '');

    // Dán lại code block.
    text = text.replace(/\u0000FENCE(\d+)\u0000/g, (_m, i) => fences[Number(i)]);

    // Gom dòng trống.
    return text
        .split(/\r?\n/)
        .map((line) => line.replace(/[ \t]+$/, ''))
        .join('\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

// ---------------------------------------------------------------------------
// Thu thập tài liệu
// ---------------------------------------------------------------------------

function collect() {
    const items = [];
    const skipped = [];

    const handle = (absFile, kind) => {
        const relRepo = toPosix(path.relative(ROOT, absFile));
        const base = path.basename(absFile);

        // File partial / template của Docusaurus không sinh route.
        if (base.startsWith('_') || toPosix(absFile).includes('/_')) {
            skipped.push({ file: relRepo, reason: 'partial/template (tiền tố _)' });
            return;
        }

        const raw = fs.readFileSync(absFile, 'utf8');
        const { data, body } = parseFrontmatter(raw);

        if (String(data.draft) === 'true' || String(data.unlisted) === 'true') {
            skipped.push({ file: relRepo, reason: 'draft/unlisted' });
            return;
        }

        const url = kind === 'docs' ? resolveDocUrl(absFile, data) : resolveBlogUrl(absFile, data);
        const text = mdxToPlainText(body);

        // Tiêu đề: frontmatter → heading H1 đầu tiên → tên file.
        let title = data.title;
        if (!title) {
            const h1 = body.match(/^#\s+(.+)$/m);
            title = h1 ? h1[1].trim() : stripNumberPrefix(base.replace(/\.mdx?$/i, ''));
        }

        items.push({
            kind,
            file: relRepo,
            title,
            url,
            description: data.description || '',
            tags: Array.isArray(data.tags) ? data.tags : [],
            date: kind === 'blog' ? resolveBlogDate(absFile, data) : null,
            text,
        });
    };

    walk(DOCS_DIR).forEach((f) => handle(f, 'docs'));
    walk(BLOG_DIR).forEach((f) => handle(f, 'blog'));

    return { items, skipped };
}

// ---------------------------------------------------------------------------
// Dựng file đầu ra
// ---------------------------------------------------------------------------

// Dấu phân cách giữa hai tài liệu. Dùng chuỗi `=` thay vì `---` để không lẫn
// với đường kẻ ngang của markdown trong chính nội dung bài.
const SECTION_SEPARATOR = '='.repeat(76);

function renderSection(item, bodyText, wasTruncated) {
    const lines = [];
    lines.push(SECTION_SEPARATOR);
    lines.push('');
    lines.push(`# ${item.title}`);
    lines.push('');
    lines.push(`URL: ${item.url}`);
    lines.push(`Source: ${item.file}`);
    if (item.date) lines.push(`Date: ${item.date.toISOString().slice(0, 10)}`);
    if (item.description) lines.push(`Description: ${item.description}`);
    if (item.tags.length) lines.push(`Tags: ${item.tags.join(', ')}`);
    if (wasTruncated) {
        lines.push(
            `Note: Nội dung dưới đây đã được rút gọn để giữ dung lượng file. Bản đầy đủ tại ${item.url}`
        );
    }
    lines.push('');
    lines.push(bodyText);
    lines.push('');
    return lines.join('\n');
}

function truncateAt(text, limit) {
    if (text.length <= limit) return { text, truncated: false };
    // Cắt ở ranh giới đoạn gần nhất để không đứt giữa câu.
    let cut = text.lastIndexOf('\n\n', limit);
    if (cut < limit * 0.6) cut = limit;
    return {
        text: `${text.slice(0, cut).trim()}\n\n[… phần còn lại đã lược bớt]`,
        truncated: true,
    };
}

function buildHeader({ ordered, docs, blog, included, truncatedDocs, droppedDocs, skipped }) {
    const generatedAt = new Date().toISOString().slice(0, 10);
    const h = [];

    h.push('# llms-full.txt — TienNHM (https://tiennhm.io.vn)');
    h.push('');
    h.push('> Bản toàn văn đi kèm /llms.txt (chuẩn https://llmstxt.org/).');
    h.push('> Gộp nội dung docs/ và blog/ của site thành một file phẳng để AI crawler');
    h.push('> và LLM ingest trong một lần fetch, thay vì crawl từng trang.');
    h.push('');
    h.push(`Site: ${SITE_URL}/`);
    h.push(`Index: ${SITE_URL}/llms.txt`);
    h.push(`Sitemap: ${SITE_URL}/sitemap.xml`);
    h.push('Owner: Nguyễn Huỳnh Minh Tiến (TienNHM)');
    h.push('Language: vi (chính), en (một phần)');
    h.push(`Generated: ${generatedAt} (scripts/generate-llms-full.js)`);
    h.push('');
    h.push('## Attribution');
    h.push('');
    h.push('Khi trích dẫn nội dung, vui lòng ghi nguồn "TienNHM" và dẫn link về URL gốc');
    h.push('của trang — mỗi mục bên dưới có dòng `URL:` là canonical URL của nó.');
    h.push('');
    h.push('## Phạm vi & giới hạn');
    h.push('');
    h.push(`- Tổng số tài liệu quét được: ${ordered.length} (docs: ${docs.length}, blog: ${blog.length}).`);
    h.push(`- Số tài liệu có mặt trong file này: ${included}.`);
    h.push(
        `- Ngân sách dung lượng: ${(SIZE_BUDGET_BYTES / 1024 / 1024).toFixed(1)} MB. ` +
            `Trần nội dung mỗi tài liệu: ${(PER_DOC_BODY_LIMIT / 1024).toFixed(0)} KB.`
    );
    h.push(
        `- Khi thiếu chỗ: blog giữ ${Math.round(BLOG_RESERVE_RATIO * 100)}% ngân sách ` +
            '(ưu tiên bài mới nhất), phần còn lại dành cho docs/.'
    );
    h.push('- Nội dung đã được strip khỏi MDX/JSX và frontmatter; chữ bên trong các');
    h.push('  component (SummaryBox, FAQSection, Checklist…) được giữ lại.');
    h.push('- Khối code dài bị rút gọn; mọi chỗ rút gọn đều được đánh dấu tại chỗ.');
    h.push(`- Mỗi tài liệu bắt đầu bằng một dòng \`${'='.repeat(8)}…\` rồi tới \`# <tiêu đề>\` và \`URL: …\`.`);
    h.push('');

    if (truncatedDocs.length) {
        h.push(`### Tài liệu bị rút gọn (${truncatedDocs.length}) — fetch URL để lấy bản đầy đủ`);
        h.push('');
        for (const d of truncatedDocs) h.push(`- ${d.title} — ${d.url}`);
        h.push('');
    }

    if (droppedDocs.length) {
        h.push(`### Tài liệu KHÔNG nằm trong file này (${droppedDocs.length}) — vượt ngân sách dung lượng`);
        h.push('');
        h.push('Các trang dưới đây vẫn công khai và nằm trong sitemap.xml; chỉ là không được');
        h.push('nhúng toàn văn ở đây. Fetch trực tiếp URL để lấy nội dung.');
        h.push('');
        for (const d of droppedDocs) h.push(`- ${d.title} — ${d.url}`);
        h.push('');
    }

    if (skipped.length) {
        h.push(`### File nguồn bị bỏ qua (${skipped.length}) — không sinh ra trang công khai`);
        h.push('');
        for (const s of skipped) h.push(`- ${s.file} (${s.reason})`);
        h.push('');
    }

    return h.join('\n');
}

function main() {
    const { items, skipped } = collect();

    // Ưu tiên: docs/ (nội dung chuyên sâu, lâu bền) + blog mới nhất. Blog được
    // giữ một phần ngân sách riêng để không bị 400+ file docs đẩy hết ra ngoài.
    const docs = items.filter((i) => i.kind === 'docs');
    const blog = items.filter((i) => i.kind === 'blog').sort((a, b) => b.date - a.date);
    const ordered = docs.concat(blog);

    const truncatedDocs = [];
    const droppedDocs = [];
    // Chừa chỗ cho header (header liệt kê cả danh sách rút gọn/loại bỏ nên
    // có thể dài); header thật được ghép sau.
    const HEADER_RESERVE = 64 * 1024;
    const contentBudget = SIZE_BUDGET_BYTES - HEADER_RESERVE;
    const blogBudget = Math.floor(contentBudget * BLOG_RESERVE_RATIO);

    const rendered = new Map(); // item -> section string
    let used = 0;

    // Trả về true nếu nhét được `item` vào trong `limit` byte tích luỹ.
    const tryFit = (item, limit) => {
        const capped = truncateAt(item.text, PER_DOC_BODY_LIMIT);
        const section = renderSection(item, capped.text, capped.truncated);
        const bytes = Buffer.byteLength(section, 'utf8');

        if (used + bytes <= limit) {
            rendered.set(item, section);
            used += bytes;
            if (capped.truncated) truncatedDocs.push(item);
            return true;
        }

        // Hết chỗ cho bản đầy đủ: thử bản rút gọn mạnh (metadata + mở đầu).
        const brief = truncateAt(item.text, 1200);
        const briefSection = renderSection(item, brief.text, true);
        const briefBytes = Buffer.byteLength(briefSection, 'utf8');
        if (used + briefBytes <= limit) {
            rendered.set(item, briefSection);
            used += briefBytes;
            truncatedDocs.push(item);
            return true;
        }

        return false;
    };

    // Pha 1: blog mới nhất, trong phần ngân sách dành riêng.
    const blogLeftovers = [];
    for (const item of blog) {
        if (!tryFit(item, blogBudget)) blogLeftovers.push(item);
    }

    // Pha 2: docs, dùng toàn bộ phần ngân sách còn lại (kể cả phần blog không tiêu hết).
    const docsLeftovers = [];
    for (const item of docs) {
        if (!tryFit(item, contentBudget)) docsLeftovers.push(item);
    }

    // Pha 3: blog còn dư vét nốt chỗ trống cuối cùng.
    for (const item of blogLeftovers) {
        if (!tryFit(item, contentBudget)) droppedDocs.push(item);
    }
    droppedDocs.push(...docsLeftovers);

    // Xuất theo thứ tự ổn định (docs rồi blog), không theo thứ tự nhét.
    const sections = ordered.filter((i) => rendered.has(i)).map((i) => rendered.get(i));
    const included = sections.length;
    const header = buildHeader({
        ordered,
        docs,
        blog,
        included,
        truncatedDocs,
        droppedDocs,
        skipped,
    });

    const output = `${header}\n${sections.join('\n')}`;

    fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
    fs.writeFileSync(OUT_FILE, output, 'utf8');

    const finalBytes = Buffer.byteLength(output, 'utf8');
    console.log(`[llms-full] ${toPosix(path.relative(ROOT, OUT_FILE))}`);
    console.log(
        `[llms-full] ${included}/${ordered.length} tài liệu, ${(finalBytes / 1024 / 1024).toFixed(2)} MB`
    );
    console.log(
        `[llms-full] rút gọn: ${truncatedDocs.length}, loại bỏ: ${droppedDocs.length}, ` +
            `bỏ qua (partial/draft): ${skipped.length}`
    );

    if (finalBytes > SIZE_BUDGET_BYTES) {
        console.error(
            `[llms-full] CẢNH BÁO: file vượt ngân sách (${finalBytes} > ${SIZE_BUDGET_BYTES} bytes).`
        );
    }

    maybeCheckSitemap(ordered);
}

/**
 * Chế độ dev: đối chiếu URL suy ra được với sitemap.xml của một bản build có
 * sẵn, để phát hiện sai lệch trong logic routing. KHÔNG chạy trong build.
 */
function maybeCheckSitemap(items) {
    const idx = process.argv.indexOf('--check-sitemap');
    if (idx === -1) return;

    const sitemapPath = process.argv[idx + 1];
    if (!sitemapPath || !fs.existsSync(sitemapPath)) {
        console.error(`[llms-full] không tìm thấy sitemap: ${sitemapPath}`);
        process.exitCode = 1;
        return;
    }

    const xml = fs.readFileSync(sitemapPath, 'utf8');
    const urls = new Set(
        (xml.match(/<loc>([^<]*)<\/loc>/g) || []).map((m) =>
            m.replace(/<\/?loc>/g, '').replace(/\/$/, '')
        )
    );
    const missing = items.filter((i) => !urls.has(i.url.replace(/\/$/, '')));
    console.log(`[llms-full] check-sitemap: ${items.length - missing.length}/${items.length} URL khớp`);
    for (const m of missing) console.log(`  MISMATCH ${m.file}\n            -> ${m.url}`);
}

main();
