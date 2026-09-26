import React from 'react';
import Head from '@docusaurus/Head';

/**
 * DefaultSocialMeta — giá trị mặc định cho các thẻ Open Graph mà Docusaurus
 * không tự sinh.
 *
 * Docusaurus đã lo `og:title`, `og:description`, `og:image`, `og:url`,
 * `og:locale` và `og:locale:alternate` qua `PageMetadata`. Nhưng nó KHÔNG bao
 * giờ phát `og:type`, mà thiếu thẻ này thì Facebook/LinkedIn/Zalo mặc định coi
 * trang là `website` — đúng với trang chủ và các trang danh sách, nhưng sai với
 * mọi thứ khác, và quan trọng hơn là site mất quyền tự khai báo.
 *
 * ĐẶT Ở ĐÂU: render từ `src/theme/Root.js`, TRƯỚC `{children}`.
 *
 * Thứ tự đó là cố ý. react-helmet-async gộp các thẻ `<meta>` theo thuộc tính
 * `property`, và khai báo nào được xử lý SAU sẽ thắng. Root nằm ngoài cùng cây
 * React nên `<Head>` của nó chạy trước `<Head>` của từng trang — nhờ vậy
 * `src/theme/BlogPostPage/Metadata` vẫn ghi đè được thành `article` cho bài
 * viết, còn mọi trang khác nhận `website` từ đây.
 *
 * KHÔNG chuyển khối này sang `headTags` trong docusaurus.config.js. Thẻ khai ở
 * `headTags` được chèn thẳng vào HTML tĩnh, nằm ngoài tầm của helmet — trang
 * blog sẽ có ĐỒNG THỜI `og:type=website` và `og:type=article`, và crawler
 * không có cách nào biết thẻ nào mới đúng.
 */
export function DefaultSocialMeta(): JSX.Element {
  return (
    <Head>
      <meta property="og:type" content="website" />
    </Head>
  );
}

export default DefaultSocialMeta;
