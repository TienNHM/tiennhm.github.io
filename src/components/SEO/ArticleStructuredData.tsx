import React, { useMemo } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export interface ArticleStructuredDataProps {
  title: string;
  description: string;
  author?: {
    name: string;
    url?: string;
    image?: string;
  };
  datePublished: string;
  dateModified?: string;
  image?: string;
  url?: string;
  keywords?: string[];
  articleType?: 'Article' | 'BlogPosting' | 'TechArticle' | 'ScholarlyArticle';
}

/**
 * ArticleStructuredData component - Tự động tạo JSON-LD structured data cho bài viết
 * Giúp AI Agents và search engines hiểu rõ metadata của bài viết
 * 
 * Usage in MDX frontmatter hoặc trong component BlogPostPage:
 * ```mdx
 * <ArticleStructuredData
 *   title="Tiêu đề bài viết"
 *   description="Mô tả bài viết"
 *   author={{ name: "Nguyễn Huỳnh Minh Tiến", url: "https://github.com/TienNHM" }}
 *   datePublished="2025-02-09"
 *   dateModified="2025-02-10"
 *   image="https://example.com/image.jpg"
 *   keywords={["SEO", "GEO", "AI"]}
 * />
 * ```
 */
export function ArticleStructuredData({
  title,
  description,
  author = {
    name: 'Nguyễn Huỳnh Minh Tiến',
    url: 'https://github.com/TienNHM',
    image: 'https://github.com/TienNHM.png',
  },
  datePublished,
  dateModified,
  image,
  url,
  keywords,
  articleType = 'BlogPosting',
}: ArticleStructuredDataProps) {
  const { siteConfig } = useDocusaurusContext();
  const baseUrl = siteConfig.url || 'https://tiennhm.github.io';

  const structuredData = useMemo(() => {
    const articleUrl = url || (typeof window !== 'undefined' ? window.location.href : baseUrl);
    const articleImage = image || `${baseUrl}/img/copyright-tiennhm.webp`;

    const schema: any = {
      '@context': 'https://schema.org',
      '@type': articleType,
      headline: title,
      description: description,
      image: articleImage,
      datePublished: datePublished,
      dateModified: dateModified || datePublished,
      author: {
        '@type': 'Person',
        name: author.name,
        ...(author.url && { url: author.url }),
        ...(author.image && { image: author.image }),
      },
      publisher: {
        '@type': 'Person',
        name: author.name,
        ...(author.image && { image: author.image }),
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': articleUrl,
      },
      ...(keywords && keywords.length > 0 && { keywords: keywords.join(', ') }),
    };

    return schema;
  }, [
    title,
    description,
    author,
    datePublished,
    dateModified,
    image,
    url,
    keywords,
    articleType,
    baseUrl,
  ]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData, null, 2) }}
    />
  );
}
