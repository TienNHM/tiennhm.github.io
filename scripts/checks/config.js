// Kiểm tra docusaurus.config.js resolve được, không cần build.
//
// Sau khi tách config ra thư mục config/, mọi require.resolve('./...') trong
// các khối đã chuyển đều lùi đi một cấp. Sai đường dẫn kiểu đó chỉ lộ ra lúc
// build, nên kiểm ngay tại đây: nạp config rồi soi mọi đường dẫn tuyệt đối.

const fs = require('fs');
const path = require('path');

module.exports = function checkConfig() {
    const root = path.join(__dirname, '..', '..');
    const config = require(path.join(root, 'docusaurus.config.js'));

    const found = new Set();
    (function walk(value) {
        if (typeof value === 'string') {
            // path.isAbsolute thay vì startsWith('/'): trên Windows đường dẫn là D:\..., kiểm
            // kiểu cũ không bắt được gì và mục này xanh mà không soi đường dẫn nào.
            if (path.isAbsolute(value) && /\.(jsx?|tsx?|css|scss|mjs|cjs)$/.test(value)) found.add(value);
        } else if (Array.isArray(value)) {
            value.forEach(walk);
        } else if (value && typeof value === 'object') {
            Object.values(value).forEach(walk);
        }
    })(config);

    const missing = [...found].filter((p) => !fs.existsSync(p));
    if (missing.length) {
        console.error('✗ đường dẫn không tồn tại:\n  ' + missing.join('\n  '));
        return false;
    }

    for (const key of ['presets', 'plugins', 'themes', 'themeConfig', 'headTags', 'i18n']) {
        if (!config[key]) {
            console.error(`✗ thiếu khoá config: ${key}`);
            return false;
        }
    }

    console.log(
        `✓ config nạp được, ${found.size} đường dẫn hợp lệ, ` +
        `${config.presets.length} preset, ${config.plugins.length} plugin, ${config.themes.length} theme`,
    );

    return true;

};
