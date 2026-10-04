import React, { useMemo } from 'react';
import Head from '@docusaurus/Head';
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
    image: '/img/tiennhm-avatar.jpg',
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
    // Ảnh tác giả có thể là đường dẫn gốc; JSON-LD cần URL tuyệt đối.
    const authorImage = author.image?.startsWith('/') ? `${baseUrl}${author.image}` : author.image;

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
        ...(authorImage && { image: authorImage }),
      },
      publisher: {
        '@type': 'Person',
        name: author.name,
        ...(authorImage && { image: authorImage }),
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

  /*
   * JSON-LD đặt trong <Head> chứ không render thẳng vào thân bài.
   *
   * Render inline thì khối JSON lọt vào content:encoded của RSS. dev.to (và mọi
   * nơi nhập bài từ feed) lọc bỏ thẻ <script> nhưng GIỮ phần chữ bên trong, nên
   * cuối bài hiện ra một mảng JSON thô. Đã gặp thật khi nhập bài sang dev.to.
   *
   * Đặt trong <Head> thì Google vẫn đọc được như thường — đây mới là chỗ quy ước
   * cho dữ liệu có cấu trúc — còn thân bài sạch.
   */
  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Head>
  );
}
