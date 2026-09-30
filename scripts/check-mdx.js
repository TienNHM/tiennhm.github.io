// Biên dịch thử file blog/docs bằng chính @mdx-js/mdx, không cần build cả site.
//
// Docusaurus v3 xử lý .md qua MDX, nên những thứ vô hại trong Markdown thuần
// lại làm đỏ build: dấu ngoặc nhọn bị hiểu là biểu thức JSX, thẻ `<` chưa đóng,
// fence ba backtick lồng nhau đóng sớm.
//
//   npm run check:mdx                 -> toàn bộ blog/ và docs/
//   npm run check:mdx -- <file...>    -> chỉ vài file
//
// Lưu ý: bỏ frontmatter và chú thích HTML trước khi biên dịch, vì Docusaurus
// tự cắt chúng ra (<!--truncate--> là cú pháp của Docusaurus, không phải MDX).

const fs = require('fs');
const path = require('path');
const { compile } = require('@mdx-js/mdx');
const gfm = require('remark-gfm').default || require('remark-gfm');
const directive = require('remark-directive').default || require('remark-directive');

const root = path.join(__dirname, '..');

function walk(dir) {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) return walk(p);
        return /\.mdx?$/.test(e.name) ? [p] : [];
    });
}

const args = process.argv.slice(2);
const files = args.length
    ? args.map((f) => path.resolve(f))
    : [path.join(root, 'blog'), path.join(root, 'docs')].flatMap(walk);

(async () => {
    const failures = [];
    for (const file of files) {
        const source = fs
            .readFileSync(file, 'utf8')
            .replace(/^---\n[\s\S]*?\n---\n/, '')
            .replace(/<!--[\s\S]*?-->/g, '')
            // {#anchor} cuối heading là cú pháp đặt id của Docusaurus, MDX
            // thuần lại đọc cặp ngoặc nhọn thành biểu thức JSX.
            .replace(/^(#{1,6} .*?)\s*\{#[\w-]+\}\s*$/gm, '$1');
        try {
            await compile(source, { remarkPlugins: [gfm, directive] });
        } catch (err) {
            const where = err.line ? ` (dòng ${err.line}, cột ${err.column})` : '';
            failures.push(`${path.relative(root, file)}${where}\n    ${err.message}`);
        }
    }
    if (failures.length) {
        console.error(`✗ ${failures.length}/${files.length} file lỗi:\n  ` + failures.join('\n  '));
        process.exit(1);
    }
    console.log(`✓ ${files.length} file biên dịch MDX được`);
})();
