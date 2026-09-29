import MDXComponents from '@theme-original/MDXComponents';
import DocsPageActions from '@site/src/components/DocsPageActions';

/**
 * Đăng ký DocsPageActions để thẻ do remark plugin chèn vào phân giải được.
 * MDX tra tên viết hoa trong `components` mà MDXContent truyền xuống.
 */
export default {
  ...MDXComponents,
  DocsPageActions,
};
