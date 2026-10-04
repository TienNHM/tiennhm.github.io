import React from 'react';
import Header from '@theme-original/BlogPostItem/Header';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import PageActions from '@site/src/components/PageActions';

/**
 * Bọc để đặt hàng hành động ngay dưới khối đầu bài (tiêu đề, ngày, tác giả),
 * sát trên nội dung.
 *
 * `isBlogPostPage` là bắt buộc: Header này còn được dùng cho từng mục ở trang
 * danh sách, không chặn thì mỗi mục trong danh sách đều mọc ra một hàng nút.
 */
export default function HeaderWrapper(props) {
  const { metadata, isBlogPostPage } = useBlogPost();
  return (
    <>
      <Header {...props} />
      {isBlogPostPage && (
        <PageActions
          permalink={metadata.permalink}
          title={metadata.title}
          description={metadata.description}
          tags={metadata.tags}
        />
      )}
    </>
  );
}
