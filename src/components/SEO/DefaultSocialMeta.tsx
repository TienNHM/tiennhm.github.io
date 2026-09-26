import React from 'react';
import Head from '@docusaurus/Head';

/**
 * og:type mặc định cho toàn site — Docusaurus không bao giờ tự phát thẻ này.
 *
 * Render từ src/theme/Root.js, TRƯỚC {children}: helmet gộp theo `property` và
 * khai báo xử lý sau thắng, nên BlogPostPage/Metadata vẫn ghi đè được thành
 * "article".
 *
 * KHÔNG chuyển sang `headTags` trong docusaurus.config.js — thẻ ở đó chèn thẳng
 * vào HTML tĩnh, ngoài tầm helmet, nên trang blog sẽ có đồng thời hai og:type.
 */
export function DefaultSocialMeta(): JSX.Element {
  return (
    <Head>
      <meta property="og:type" content="website" />
    </Head>
  );
}

export default DefaultSocialMeta;
