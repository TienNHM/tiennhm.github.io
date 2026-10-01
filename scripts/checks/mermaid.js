// Kiểm cú pháp sơ đồ Mermaid trong docs và blog.
//
// Mermaid render ở phía trình duyệt, nên sơ đồ sai cú pháp KHÔNG làm đỏ build:
// trang vẫn deploy, chỉ là chỗ đó hiện một hộp báo lỗi đỏ. Không ai biết cho
// tới khi có người mở đúng trang đó.
//
// mermaid.parse() cần DOM (nó gọi DOMPurify), nhưng lỗi ngữ pháp được ném ra
// TRƯỚC bước đó. Nên: lỗi có chữ "Parse error"/"Syntax error" là cú pháp hỏng
// thật, mọi lỗi khác là do thiếu DOM và bỏ qua.

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const SYNTAX = /parse error|syntax error|expecting/i;

function walk(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) return walk(p);
        return /\.mdx?$/.test(e.name) ? [p] : [];
    });
}

module.exports = async function checkMermaid(argv = []) {
    const mermaid = (await import('mermaid')).default;

    const files = argv.length
        ? argv.map((f) => path.resolve(f))
        : [path.join(root, 'docs'), path.join(root, 'blog')].flatMap(walk);

    const errors = [];
    let total = 0;

    for (const file of files) {
        const src = fs.readFileSync(file, 'utf8');
        const blocks = [...src.matchAll(/```+mermaid\n([\s\S]*?)```+/g)].map((m) => m[1]);
        for (const [i, code] of blocks.entries()) {
            total++;
            try {
                await mermaid.parse(code);
            } catch (err) {
                const message = String(err?.message ?? err).split('\n')[0];
                if (SYNTAX.test(message)) {
                    errors.push(`${path.relative(root, file)} (sơ đồ ${i + 1}): ${message}`);
                }
            }
        }
    }

    if (errors.length) {
        console.error(`✗ ${errors.length} sơ đồ Mermaid sai cú pháp:\n  ` + errors.join('\n  '));
        return false;
    }
    console.log(`✓ ${total} sơ đồ Mermaid đúng cú pháp`);
    return true;
};
