/**
 * Chuyển MDX của site thành Markdown sạch, giữ nguyên cấu trúc.
 *
 * Dùng bởi plugins/page-markdown — sinh file .md cho nút "Copy Markdown cho AI".
 *
 * KHÁC mdxToPlainText() trong scripts/generate-llms-full.js: hàm kia làm phẳng
 * thành text thuần cho crawler (bỏ đậm, biến code fence thành [code], bỏ link),
 * còn hàm này GIỮ heading, bảng, code fence và link — thứ AI agent cần để hiểu
 * cấu trúc tài liệu.
 *
 * Quan trọng nhất: nội dung <FAQSection items={[...]} /> nằm trong THUỘC TÍNH
 * JSX chứ không phải children, nên mọi cách strip thẻ đơn giản đều xoá sạch nó.
 * Cặp hỏi-đáp lại đúng là dạng nội dung AI dùng tốt nhất, nên phải parse riêng.
 */

const SITE_URL = 'https://tiennhm.io.vn';

/** Gỡ escape của chuỗi JS để lấy lại nội dung thật. */
function unescapeJsString(s) {
    return s
        .replace(/\\n/g, '\n')
        .replace(/\\"/g, '"')
        .replace(/\\'/g, "'")
        .replace(/\\\\/g, '\\');
}

/**
 * `<FAQSection items={[{question, answer}, ...]} />` -> heading + đoạn văn.
 *
 * Đây là phần QUAN TRỌNG NHẤT của transform: nội dung FAQ nằm trong THUỘC TÍNH
 * JSX chứ không phải children, nên mọi cách strip thẻ đơn giản đều xoá sạch nó.
 * Với AI agent thì cặp hỏi-đáp lại là dạng nội dung giá trị nhất, nên phải
 * parse riêng.
 */
function expandFaqSection(text) {
    return text.replace(
        /<FAQSection\b([\s\S]*?)\/>/g,
        (_m, attrs) => {
            const titleMatch = attrs.match(/title\s*=\s*"((?:[^"\\]|\\.)*)"/);
            const out = [];
            if (titleMatch) out.push(`## ${unescapeJsString(titleMatch[1])}`, '');

            const re =
                /question\s*:\s*"((?:[^"\\]|\\.)*)"[\s\S]*?answer\s*:\s*"((?:[^"\\]|\\.)*)"/g;
            let hit;
            while ((hit = re.exec(attrs)) !== null) {
                out.push(`### ${unescapeJsString(hit[1])}`, '');
                out.push(unescapeJsString(hit[2]), '');
            }
            return out.join('\n');
        }
    );
}

/** `<Checklist items={[{text, checked}]} />` -> danh sách task của markdown. */
function expandChecklist(text) {
    return text.replace(/<Checklist\b([\s\S]*?)\/>/g, (_m, attrs) => {
        const titleMatch = attrs.match(/title\s*=\s*"((?:[^"\\]|\\.)*)"/);
        const out = [];
        if (titleMatch) out.push(`**${unescapeJsString(titleMatch[1])}**`, '');

        const re = /\{\s*text\s*:\s*"((?:[^"\\]|\\.)*)"([^}]*)\}/g;
        let hit;
        while ((hit = re.exec(attrs)) !== null) {
            const checked = /checked\s*:\s*true/.test(hit[2]);
            out.push(`- [${checked ? 'x' : ' '}] ${unescapeJsString(hit[1])}`);
        }
        out.push('');
        return out.join('\n');
    });
}

/** `<SummaryBox>...</SummaryBox>` -> blockquote, giữ nguyên markdown bên trong. */
function expandSummaryBox(text) {
    return text.replace(
        /<SummaryBox>([\s\S]*?)<\/SummaryBox>/g,
        (_m, inner) =>
            inner
                .trim()
                .split(/\r?\n/)
                .map((l) => (l.trim() ? `> ${l}` : '>'))
                .join('\n')
    );
}

/** Admonition `:::tip Tiêu đề ... :::` -> blockquote có nhãn. */
function expandAdmonitions(text) {
    return text.replace(
        /^:::+\s*(\w+)\s*(.*)$([\s\S]*?)^:::+\s*$/gm,
        (_m, kind, title, body) => {
            const label = kind.charAt(0).toUpperCase() + kind.slice(1);
            const head = title.trim() ? `**${label}: ${title.trim()}**` : `**${label}**`;
            const lines = body.trim().split(/\r?\n/);
            return [`> ${head}`, '>', ...lines.map((l) => (l.trim() ? `> ${l}` : '>'))].join('\n');
        }
    );
}

function mdxToMarkdown(body) {
    // Tách code fence ra trước để mọi bước strip bên dưới không phá nội dung code.
    const fences = [];
    let text = body.replace(
        /^([ \t]*)(`{3,}|~{3,})([^\n]*)\n([\s\S]*?)^\1\2[ \t]*$/gm,
        (m) => {
            fences.push(m);
            return `\u0000FENCE${fences.length - 1}\u0000`;
        }
    );

    text = text.replace(/^\s*import\s+[^\n]*$/gm, '');
    text = text.replace(/^\s*export\s+(?:const|default|function)[^\n]*$/gm, '');
    text = text.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
    text = text.replace(/<!--[\s\S]*?-->/g, '');

    // Component riêng của site — phải xử lý TRƯỚC bước strip thẻ chung.
    text = expandSummaryBox(text);
    text = expandFaqSection(text);
    text = expandChecklist(text);
    text = expandAdmonitions(text);

    // Thẻ JSX/HTML còn lại: bỏ thẻ, giữ chữ bên trong.
    text = text.replace(/<\/?[A-Za-z][A-Za-z0-9._-]*(?:\s[^<>]*?)?\/?>/g, '');

    // Anchor tuỳ biến của heading: `## Tiêu đề {#tldr}` -> `## Tiêu đề`.
    text = text.replace(/^(#{1,6}\s+.*?)\s*\{#[^}\n]*\}\s*$/gm, '$1');

    // Link nội bộ -> tuyệt đối, để agent đọc file .md này còn đi tiếp được.
    text = text.replace(/\]\((\/(?!\/)[^)\s]*)\)/g, `](${SITE_URL}$1)`);

    text = text.replace(/\u0000FENCE(\d+)\u0000/g, (_m, i) => fences[Number(i)]);

    return text
        .split(/\r?\n/)
        .map((l) => l.replace(/[ \t]+$/, ''))
        .join('\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

module.exports = { mdxToMarkdown, SITE_URL };
