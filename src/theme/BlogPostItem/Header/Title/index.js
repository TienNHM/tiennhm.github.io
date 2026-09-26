import React from 'react';
import clsx from 'clsx';
import Title from '@theme-original/BlogPostItem/Header/Title';

/**
 * Bọc chỉ để gắn class ổn định `blog-post-title`.
 *
 * theme-classic đóng cứng `.title { font-size: 3rem }` trong CSS module riêng,
 * không qua `--ifm-h1-font-size`. Trong HTML dựng ra, thẻ tiêu đề chỉ mang một
 * class băm (`title_f1Hy`, đổi theo từng build) và <article> bao ngoài thì
 * class rỗng — không có điểm neo nào bền để viết selector.
 *
 * Bọc chứ không eject: component gốc đã nhận sẵn prop `className`, nên thay
 * đổi sau này của Docusaurus vẫn có hiệu lực.
 *
 * Quy tắc cỡ chữ ở src/css/custom.css. Thẻ là h1 ở trang bài viết, h2 ở trang
 * danh sách.
 */
export default function TitleWrapper(props) {
  return <Title {...props} className={clsx(props.className, 'blog-post-title')} />;
}
