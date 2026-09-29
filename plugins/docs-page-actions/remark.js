/**
 * Chèn <DocsPageActions /> ngay sau H1 của mỗi trang docs.
 *
 * Lý do phải động tới mdast: tiêu đề blog do theme dựng nên nằm ngoài nội
 * dung, chèn gì vào giữa cũng được. Tiêu đề docs thì do chính file Markdown
 * viết ra (361/422 file), nằm lẫn trong thân bài — không có khe nào cho React
 * chèn vào. Tạo khe đó ở bước build là cách duy nhất giữ hai khu vực đồng bộ.
 *
 * Tên thẻ phân giải qua @theme/MDXComponents (xem src/theme/MDXComponents).
 */
const MARKER = 'DocsPageActions';

/**
 * Nhận diện node tiêu đề ở CẢ HAI dạng.
 *
 * Plugin `contentTitle` của Docusaurus chạy trước plugin này và, khi không xoá
 * tiêu đề, nó thay node heading bằng một mdxJsxFlowElement tên `header` bọc
 * heading vào trong. Chỉ kiểm `type === 'heading'` là trượt toàn bộ trang docs
 * có H1 viết trong nội dung.
 */
function isContentTitle(node) {
    if (!node) {
        return false;
    }
    if (node.type === 'heading') {
        return node.depth === 1;
    }
    if (node.type === 'mdxJsxFlowElement' && node.name === 'header') {
        const inner = Array.isArray(node.children) ? node.children[0] : undefined;
        return Boolean(inner) && inner.type === 'heading' && inner.depth === 1;
    }
    return false;
}

// Frontmatter và các câu import/export đứng trước H1 nhưng không phải nội dung.
const LEADING = new Set(['yaml', 'toml', 'mdxjsEsm']);

module.exports = function remarkDocsPageActions() {
    return (tree) => {
        const children = tree.children;
        if (!Array.isArray(children)) {
            return;
        }

        let i = 0;
        while (i < children.length && LEADING.has(children[i].type)) {
            i += 1;
        }

        // Chỉ chèn khi H1 là node nội dung ĐẦU TIÊN — đúng điều kiện Docusaurus
        // dùng để xác định contentTitle. Nếu H1 nằm giữa bài thì theme đã tự
        // dựng tiêu đề tổng hợp rồi, chèn thêm ở đây sẽ ra hai hàng.
        if (!isContentTitle(children[i])) {
            return;
        }

        if (children.some((n) => n.type === 'mdxJsxFlowElement' && n.name === MARKER)) {
            return;
        }

        children.splice(i + 1, 0, {
            type: 'mdxJsxFlowElement',
            name: MARKER,
            attributes: [],
            children: [],
        });
    };
};
