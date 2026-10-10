import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import useBaseUrl from '@docusaurus/useBaseUrl';

const DEFAULT_IMAGE = '/img/copyright-tiennhm.webp';

/**
 * URL tuyệt đối của ảnh đại diện bài viết, dùng cho og:image và JSON-LD.
 *
 * Frontmatter `image` nhận ba dạng:
 *   - `./so-do.png`        file cạnh bài; Docusaurus đưa qua webpack và trả
 *                          đường dẫn đã băm ở `assets.image`, còn
 *                          `frontMatter.image` vẫn là chuỗi thô "./so-do.png"
 *   - `/img/...`           file trong static/
 *   - `https://...`        ảnh ngoài, giữ nguyên
 *
 * Trước đây chỉ đọc `frontMatter.image` nên dạng đầu ra URL hỏng, và các bài
 * phải ghi cứng `https://tiennhm.github.io/...`. Trang docs đã đọc
 * `assets.image` từ đầu (src/theme/DocItem/Metadata).
 */
export default function useBlogPostImage(): string {
  const { assets, frontMatter } = useBlogPost();
  const image = assets.image ?? frontMatter.image ?? DEFAULT_IMAGE;
  // URL có giao thức được useBaseUrl trả nguyên; URL đã có baseUrl (asset của
  // bản /en/) không bị ghép thêm lần nữa.
  return useBaseUrl(image, { absolute: true });
}
