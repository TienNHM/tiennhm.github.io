// Chạy toàn bộ kiểm tra tĩnh trước khi push. Không đụng tới build.
//
//   npm run check              -> chạy hết
//   npm run check -- mdx       -> chỉ một mục
//   npm run check -- mdx blog/2026/bai-viet/index.md
//
// Lý do tồn tại: build chạy trên CI mất vài phút, và lỗi hay gặp nhất — sai
// đường dẫn trong config, redirect trỏ vào route không có, cú pháp MDX hỏng —
// đều phát hiện được tại chỗ trong vài giây.

const CHECKS = {
    config: require('./checks/config'),
    'tag-redirects': require('./checks/tag-redirects'),
    mdx: require('./checks/mdx'),
    'css-modules': require('./checks/css-modules'),
};

(async () => {
    const [name, ...rest] = process.argv.slice(2);

    if (name && !CHECKS[name]) {
        console.error(`Không có mục kiểm tra "${name}". Có: ${Object.keys(CHECKS).join(', ')}`);
        process.exit(2);
    }

    const selected = name ? [[name, CHECKS[name]]] : Object.entries(CHECKS);
    let failed = 0;

    for (const [key, run] of selected) {
        let ok = false;
        try {
            ok = await run(key === name ? rest : []);
        } catch (err) {
            // Ví dụ require.resolve trỏ sai file: in gọn thay vì đổ stack trace.
            console.error(`✗ ${key}: ${err.message.split('\n')[0]}`);
        }
        if (!ok) failed++;
    }

    if (failed) {
        console.error(`\n✗ ${failed}/${selected.length} mục kiểm tra không đạt`);
        process.exit(1);
    }
})();
