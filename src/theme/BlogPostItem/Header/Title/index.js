import React from 'react';
import clsx from 'clsx';
import Title from '@theme-original/BlogPostItem/Header/Title';

/**
 * Bọc tiêu đề bài blog chỉ để gắn thêm một class ỔN ĐỊNH.
 *
 * VÌ SAO CẦN: theme-classic đóng cứng cỡ tiêu đề bài blog trong CSS module
 * của riêng nó, không đi qua biến `--ifm-h1-font-size`:
 *
 *     .title            { font-size: 3rem }
 *     @media (max-width: 576px) { .title { font-size: 2rem } }
 *
 * Nên thang token trong src/css/custom.css hoàn toàn không với tới được nó.
 * Khi cỡ chữ gốc đổi 85% -> 100%, tiêu đề bài blog lặng lẽ nhảy từ 40,8px
 * lên 48px trong khi mọi tiêu đề khác đã được chỉnh lại.
 *
 * VÌ SAO PHẢI BỌC: trong HTML dựng ra, thẻ tiêu đề chỉ mang đúng một class
 * là `title_f1Hy` — tên băm, đổi theo từng lần build — và thẻ <article> bao
 * ngoài thì `class=""`. Không có điểm neo nào bền để viết selector, nên
 * `[class*='title_']` vừa mong manh vừa dễ quơ nhầm component khác.
 *
 * VÌ SAO KHÔNG EJECT: `swizzle --eject` sẽ chép nguyên component vào repo và
 * từ đó phải tự bảo trì qua mỗi lần nâng cấp Docusaurus. Ở đây chỉ cần thêm
 * một class, mà component gốc đã nhận sẵn prop `className` — bọc lại là đủ,
 * và mọi thay đổi sau này của Docusaurus vẫn tự động có hiệu lực.
 *
 * Component gốc dùng thẻ h1 ở trang bài viết và h2 ở trang danh sách, cả hai
 * đều nhận class này. Quy tắc cỡ chữ nằm ở src/css/custom.css.
 */
export default function TitleWrapper(props) {
  return <Title {...props} className={clsx(props.className, 'blog-post-title')} />;
}
