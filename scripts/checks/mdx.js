// Biên dịch thử file blog/docs bằng chính @mdx-js/mdx, không cần build cả site.
//
// Docusaurus v3 xử lý .md qua MDX, nên những thứ vô hại trong Markdown thuần
// lại làm đỏ build: dấu ngoặc nhọn bị hiểu là biểu thức JSX, thẻ `<` chưa đóng,
// fence ba backtick lồng nhau đóng sớm.
//
// Phải gỡ frontmatter, chú thích HTML và cú pháp {#id} trước khi biên dịch —
// Docusaurus tự xử lý chúng, MDX thuần thì không, và checker sẽ báo đỏ nhầm.

const fs = require('fs');
const path = require('path');
const { compile } = require('@mdx-js/mdx');
const gfm = require('remark-gfm').default || require('remark-gfm');
const directive = require('remark-directive').default || require('remark-directive');

const root = path.join(__dirname, '..', '..');

function walk(dir) {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) return walk(p);
        return /\.mdx?$/.test(e.name) ? [p] : [];
    });
}

module.exports = async function checkMdx(argv = []) {
    const files = argv.length
        ? argv.map((f) => path.resolve(f))
        : [path.join(root, 'blog'), path.join(root, 'docs'), path.join(root, 'notes')].flatMap(walk);

    const failures = [];
    for (const file of files) {
        // Chuẩn hoá CRLF trước: với core.autocrlf=true (mặc định của Git trên
        // Windows) file checkout ra là CRLF, regex frontmatter bên dưới không
        // khớp, và mọi `<` trong description bị báo lỗi MDX nhầm.
        const source = fs
            .readFileSync(file, 'utf8')
            .replace(/\r\n/g, '\n')
            .replace(/^---\n[\s\S]*?\n---\n/, '')
            .replace(/<!--[\s\S]*?-->/g, '')
            .replace(/^(#{1,6} .*?)\s*\{#[\w-]+\}\s*$/gm, '$1');
        try {
            await compile(source, { remarkPlugins: [gfm, directive] });
        } catch (err) {
            const where = err.line ? ` (dòng ${err.line}, cột ${err.column})` : '';
            failures.push(`${path.relative(root, file)}${where}\n    ${err.message}`);
        }
    }

    if (failures.length) {
        console.error(`✗ ${failures.length}/${files.length} file lỗi MDX:\n  ` + failures.join('\n  '));
        return false;
    }
    console.log(`✓ ${files.length} file biên dịch MDX được`);
    return true;
};
