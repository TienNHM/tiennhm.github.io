const fs = require('fs');
const path = require('path');
const { mdxToMarkdown, SITE_URL } = require('./mdx-to-markdown');

/**
 * page-markdown — sinh một file .md sạch cho MỖI trang blog/docs, đặt cạnh
 * trang đó trong output build, để nút "Copy Markdown cho AI" fetch về.
 *
 * VÌ SAO LÀ PLUGIN CHỨ KHÔNG PHẢI SCRIPT PREBUILD:
 * Nút bấm cần biết file .md của trang hiện tại nằm ở đâu, tức là cần map
 * route -> file nguồn. Tự suy route từ đường dẫn file đồng nghĩa với việc
 * chép lại luật sinh slug của Docusaurus — số thứ tự, category index, slug
 * trong frontmatter, tiền tố locale — và luật đó có những ca biên rất dễ sai
 * (ví dụ `1.10-foo` được giữ nguyên còn `09-foo` thì bị bỏ tiền tố, vì
 * Docusaurus cố tình bỏ qua dạng `số.số` để không nhầm với số phiên bản).
 *
 * Lifecycle `allContentLoaded` cho phép đọc nội dung đã nạp của MỌI plugin
 * khác, trong đó mỗi tài liệu đã có sẵn `permalink` THẬT và đường dẫn file
 * nguồn. Không còn gì phải đoán, và nó tự đúng cho cả locale phụ vì mỗi
 * locale là một lần build riêng với permalink riêng.
 *
 * VÌ SAO KHÔNG NHÚNG THẲNG MARKDOWN VÀO TRANG:
 * Nhúng vào HTML sẽ cộng vài KB cho mọi lượt tải trang, kể cả người không bao
 * giờ bấm nút. Sinh file rời thì chỉ tải khi có người bấm, và bản thân URL .md
 * cũng dùng trực tiếp được cho crawler hay agent.
 */
module.exports = function pluginPageMarkdown(context) {
    /** @type {{permalink: string, source: string}[]} */
    let entries = [];

    return {
        name: 'page-markdown',

        allContentLoaded({ allContent }) {
            entries = [];

            const docsPlugin = allContent['docusaurus-plugin-content-docs'] || {};
            for (const instance of Object.values(docsPlugin)) {
                for (const version of instance?.loadedVersions ?? []) {
                    for (const doc of version.docs ?? []) {
                        if (doc.permalink && doc.source) {
                            entries.push({ permalink: doc.permalink, source: doc.source });
                        }
                    }
                }
            }

            const blogPlugin = allContent['docusaurus-plugin-content-blog'] || {};
            for (const instance of Object.values(blogPlugin)) {
                for (const post of instance?.blogPosts ?? []) {
                    const md = post?.metadata;
                    if (md?.permalink && md?.source) {
                        entries.push({ permalink: md.permalink, source: md.source });
                    }
                }
            }
        },

        async postBuild({ outDir, baseUrl }) {
            const { siteDir } = context;
            let written = 0;

            for (const { permalink, source } of entries) {
                // `source` ở dạng alias của Docusaurus: `@site/blog/....md`
                const absFile = source.startsWith('@site/')
                    ? path.join(siteDir, source.slice('@site/'.length))
                    : source;
                if (!fs.existsSync(absFile)) continue;

                // permalink đã bao gồm baseUrl (ví dụ `/en/blog/foo` khi build
                // locale en). outDir cũng đã là thư mục của locale đó, nên phải
                // bỏ baseUrl ra để không lồng thêm một cấp.
                // Permalink của trang category index kết thúc bằng `/` (ví dụ
                // `/docs/.../module-01-programming-logic/`) trong khi route thật
                // không có. Không cắt thì sinh ra file tên `.md` nằm trong thư
                // mục đó thay vì `<tên>.md` bên cạnh.
                const routePath = (
                    permalink.startsWith(baseUrl)
                        ? permalink.slice(baseUrl.length)
                        : permalink.replace(/^\//, '')
                ).replace(/\/$/, '');

                const raw = fs.readFileSync(absFile, 'utf8');
                const { data, body } = splitFrontmatter(raw);

                const header = [
                    `# ${data.title || routePath}`,
                    '',
                    `> Nguồn: ${SITE_URL}${permalink}`,
                    data.description ? `> ${data.description}` : null,
                    '',
                ]
                    .filter((line) => line !== null)
                    .join('\n');

                // Phần thân thường mở đầu bằng chính H1 của bài, trong khi
                // header ở trên đã có H1 lấy từ frontmatter. Giữ cả hai thì file
                // có hai H1 — vừa sai cấu trúc markdown vừa làm agent tưởng là
                // hai tài liệu ghép lại.
                const bodyMarkdown = mdxToMarkdown(body).replace(/^#\s+[^\n]*\n+/, '');

                const outFile = path.join(outDir, 'md', `${routePath || 'index'}.md`);
                fs.mkdirSync(path.dirname(outFile), { recursive: true });
                fs.writeFileSync(outFile, `${header}\n${bodyMarkdown}\n`, 'utf8');
                written++;
            }

            console.log(`[page-markdown] đã sinh ${written} file .md trong ${path.basename(outDir)}/md/`);
        },
    };
};

/** Tách frontmatter tối giản — chỉ cần title và description cho phần header. */
function splitFrontmatter(raw) {
    const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
    if (!m) return { data: {}, body: raw };
    const data = {};
    for (const line of m[1].split(/\r?\n/)) {
        const kv = line.match(/^([A-Za-z_][\w.-]*)\s*:\s*(.*)$/);
        if (!kv) continue;
        let value = kv[2].replace(/\s+#.*$/, '').trim();
        if (
            (value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))
        ) {
            value = value.slice(1, -1);
        }
        if (value) data[kv[1]] = value;
    }
    return { data, body: raw.slice(m[0].length) };
}
