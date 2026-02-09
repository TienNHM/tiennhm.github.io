import React, { useMemo } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useBlogPost } from '@docusaurus/theme-common/internal';
import { ArticleStructuredData } from '@site/src/components/SEO';

/**
 * BlogPostStructuredData component - Tự động tạo structured data cho blog posts
 * Component này được sử dụng trong BlogPostPage để tự động inject JSON-LD
 */
export function BlogPostStructuredData() {
  const { siteConfig } = useDocusaurusContext();
  const { metadata, frontMatter } = useBlogPost();

  // Lấy thông tin author từ metadata hoặc frontMatter
  const authorName = metadata.authors?.[0]?.name || frontMatter.author || 'Nguyễn Huỳnh Minh Tiến';
  const authorUrl = metadata.authors?.[0]?.url || 'https://github.com/TienNHM';
  const authorImage = metadata.authors?.[0]?.imageURL || 'https://github.com/TienNHM.png';

  // Format dates
  const datePublished = metadata.date ? new Date(metadata.date).toISOString().split('T')[0] : '';
  const dateModified = metadata.lastUpdatedAt 
    ? new Date(metadata.lastUpdatedAt).toISOString().split('T')[0] 
    : datePublished;

  return (
    <ArticleStructuredData
      title={metadata.title}
      description={metadata.description || frontMatter.description || ''}
      author={{
        name: authorName,
        url: authorUrl,
        image: authorImage,
      }}
      datePublished={datePublished}
      dateModified={dateModified}
      image={metadata.image || frontMatter.image || `${siteConfig.url}/img/copyright-tiennhm.webp`}
      url={metadata.permalink ? `${siteConfig.url}${metadata.permalink}` : undefined}
      keywords={frontMatter.keywords || metadata.tags?.map(tag => tag.label) || []}
      articleType="BlogPosting"
    />
  );
}
