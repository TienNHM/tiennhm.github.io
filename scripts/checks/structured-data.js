// JSON-LD phải nằm trong <Head>, không render thẳng vào thân bài.
//
// Render inline thì khối JSON lọt vào content:encoded của RSS. Nơi nhập bài từ
// feed (dev.to và tương tự) lọc bỏ thẻ <script> nhưng GIỮ phần chữ bên trong,
// nên cuối bài hiện ra một mảng JSON thô. Đã xảy ra thật khi nhập sang dev.to.
//
// Build vẫn xanh, trang vẫn đúng, Google vẫn đọc được — chỉ feed là bẩn. Không
// có phép kiểm thì không ai phát hiện cho tới khi nhìn thấy bài bên kia.

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const LD = 'application/ld+json';

function walk(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) return walk(p);
        return /\.(tsx?|jsx?)$/.test(e.name) ? [p] : [];
    });
}

module.exports = function checkStructuredData() {
    const errors = [];
    let found = 0;

    for (const file of walk(path.join(root, 'src'))) {
        // Gỡ comment trước khi quét: chính phần ghi chú trong các component
        // này có nhắc chữ <Head>, để nguyên thì checker tưởng đã đặt đúng chỗ.
        const source = fs
            .readFileSync(file, 'utf8')
            .replace(/\/\*[\s\S]*?\*\//g, '')
            .replace(/^\s*\/\/.*$/gm, '');
        if (!source.includes(LD)) continue;
        found++;

        // Mỗi lần khai ld+json phải có <Head> mở ra trước đó trong cùng file.
        // Đủ chặt cho mã ở đây: các component này đều trả về một khối JSX duy
        // nhất, không có nhánh nào vừa dùng Head vừa không.
        const ldIndex = source.indexOf(LD);
        const headIndex = source.indexOf('<Head>');

        if (headIndex === -1 || headIndex > ldIndex) {
            errors.push(
                `${path.relative(root, file)}: JSON-LD render ngoài <Head>, sẽ lọt vào RSS`,
            );
        }
    }

    if (errors.length) {
        console.error(`✗ ${errors.length} chỗ đặt JSON-LD sai:\n  ` + errors.join('\n  '));
        return false;
    }
    console.log(`✓ ${found} component JSON-LD đều render trong <Head>`);
    return true;
};
