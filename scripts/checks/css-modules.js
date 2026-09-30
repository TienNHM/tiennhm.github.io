// Đối chiếu `styles.X` trong component với class thật trong CSS Module.
//
// Dùng sai tên thì className nhận undefined: không cảnh báo, không đỏ build,
// chỉ là phần tử mất sạch style. Đã dính đúng lỗi này với nút "Xem tất cả trên
// GitHub" — `styles.more` có trong TSX nhưng `.more` chưa bao giờ được viết.

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');

function walk(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) return walk(p);
        return /\.(tsx?|jsx?)$/.test(e.name) ? [p] : [];
    });
}

// Tên class khai báo trong file CSS, gồm cả dạng .a.b và .a:hover.
function declaredClasses(css) {
    const names = new Set();
    // Bỏ nội dung chuỗi và comment để không bắt nhầm.
    const cleaned = css.replace(/\/\*[\s\S]*?\*\//g, '');
    for (const m of cleaned.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)) names.add(m[1]);
    return names;
}

module.exports = function checkCssModules() {
    const errors = [];

    for (const file of walk(path.join(root, 'src'))) {
        const source = fs.readFileSync(file, 'utf8');
        const imp = source.match(/import\s+(\w+)\s+from\s+['"]([^'"]*\.module\.css)['"]/);
        if (!imp) continue;

        const [, binding, rel] = imp;
        const cssPath = path.resolve(path.dirname(file), rel);
        if (!fs.existsSync(cssPath)) {
            errors.push(`${path.relative(root, file)}: không có ${rel}`);
            continue;
        }

        const declared = declaredClasses(fs.readFileSync(cssPath, 'utf8'));
        // Bỏ dòng import ('./styles.module.css' khớp với styles.module) và
        // comment (hay nhắc tên file .css của thư viện).
        const body = source
            .replace(/^\s*import[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, '')
            .replace(/\/\*[\s\S]*?\*\//g, '')
            .replace(/^\s*\/\/.*$/gm, '');
        const used = new Set(
            [...body.matchAll(new RegExp(`\\b${binding}\\.([a-zA-Z_][\\w]*)`, 'g'))].map((m) => m[1]),
        );

        for (const name of used) {
            if (!declared.has(name)) {
                errors.push(
                    `${path.relative(root, file)}: dùng ${binding}.${name} nhưng .${name} không có trong ${rel}`,
                );
            }
        }
    }

    if (errors.length) {
        console.error(`✗ ${errors.length} class CSS Module không tồn tại:\n  ` + errors.join('\n  '));
        return false;
    }
    console.log('✓ mọi class CSS Module được dùng đều có khai báo');
    return true;
};
