import React from 'react';
import { PageMetadata } from '@docusaurus/theme-common';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';

/**
 * Blog post metadata - đảm bảo og:title, og:description, og:image
 * lấy từ frontmatter của từng bài viết thay vì site-wide defaults.
 */
export default function BlogPostPageMetadata(): JSX.Element {
  const { metadata, frontMatter } = useBlogPost();

  return (
    <PageMetadata
      title={metadata.title}
      description={metadata.description ?? frontMatter.description}
      keywords={frontMatter.keywords}
      image={frontMatter.image}
    />
  );
}
