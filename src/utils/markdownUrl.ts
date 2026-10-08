/**
 * Đường dẫn tới bản Markdown của một trang, do plugins/page-markdown sinh ra
 * lúc build ở `<baseUrl>md/<route>.md`.
 *
 * Phải khớp đúng luật đặt tên của plugin đó: bỏ baseUrl ở đầu (permalink đã
 * gồm tiền tố locale), bỏ `/` ở cuối (trang category index), route rỗng thành
 * `index`. Dùng chung cho nút Copy markdown và thẻ <link rel="alternate">.
 *
 * @param path permalink hoặc location.pathname, đều đã gồm baseUrl
 * @param baseUrl siteConfig.baseUrl của locale đang build, ví dụ "/" hoặc "/en/"
 */
export function markdownPath(path: string, baseUrl: string): string {
  const routePath = (
    path.startsWith(baseUrl) ? path.slice(baseUrl.length) : path.replace(/^\//, '')
  ).replace(/\/$/, '');
  return `${baseUrl}md/${routePath || 'index'}.md`;
}
