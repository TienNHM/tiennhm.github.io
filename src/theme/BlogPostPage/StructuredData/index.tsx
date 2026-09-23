import React from "react";
import Head from "@docusaurus/Head";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { translate } from "@docusaurus/Translate";
import { useBlogPost } from "@docusaurus/plugin-content-blog/client";
import { ArticleStructuredData } from "@site/src/components/SEO";

/**
 * Chuyển timestamp/date về dạng `YYYY-MM-DD`, trả về chuỗi rỗng nếu không parse được.
 */
function toIsoDate(value: string | number | Date | undefined | null): string {
  if (!value) {
    return "";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return date.toISOString().split("T")[0];
}

/**
 * BlogPostBreadcrumbs - JSON-LD `BreadcrumbList` cho trang bài viết.
 *
 * Docs page đã được Docusaurus tự phát BreadcrumbList, còn blog post thì không.
 * Component này bù đúng phần thiếu đó: Trang chủ > Blog > <tên bài viết>.
 */
function BlogPostBreadcrumbs() {
  const { siteConfig } = useDocusaurusContext();
  const { metadata } = useBlogPost();
  const siteUrl = siteConfig.url.replace(/\/$/, "");

  if (!metadata.permalink) {
    return null;
  }

  // baseUrl là gốc của locale đang build ("/" cho vi, "/en/" cho en) và luôn có
  // dấu `/` ở hai đầu. `metadata.permalink` đã bao gồm baseUrl sẵn, nên chỉ hai
  // mắt breadcrumb tự dựng ở dưới mới cần ghép tay — trước đây chúng bỏ qua
  // baseUrl nên bản tiếng Anh trỏ ngược về trang chủ tiếng Việt.
  const localeRoot = `${siteUrl}${siteConfig.baseUrl}`;

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${siteUrl}${metadata.permalink}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: translate({
          id: "structuredData.breadcrumb.home",
          message: "Trang chủ",
          description: "Nhãn mắt đầu tiên trong JSON-LD BreadcrumbList của blog post",
        }),
        item: localeRoot,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${localeRoot}blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: metadata.title,
        item: `${siteUrl}${metadata.permalink}`,
      },
    ],
  };

  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(breadcrumbs)}</script>
    </Head>
  );
}

/**
 * BlogPostStructuredData component - Tự động tạo structured data cho blog posts
 * Component này được sử dụng trong BlogPostPage để tự động inject JSON-LD
 */
export function BlogPostStructuredData() {
  const { siteConfig } = useDocusaurusContext();
  const { metadata, frontMatter } = useBlogPost();

  // Lấy thông tin author từ metadata hoặc frontMatter
  const authorName = metadata.authors?.[0]?.name || frontMatter.author || "Nguyễn Huỳnh Minh Tiến";
  const authorUrl = metadata.authors?.[0]?.url || "https://github.com/TienNHM";
  const authorImage = metadata.authors?.[0]?.imageURL || "https://avatars.githubusercontent.com/u/33385777?v=4&s=400";

  // Format dates
  const datePublished = toIsoDate(metadata.date);

  // `lastUpdatedAt` chỉ có giá trị khi blog plugin bật `showLastUpdateTime`
  // (xem docusaurus.config.js). Nguồn dữ liệu là frontmatter `last_update`
  // nếu có, nếu không thì là commit git cuối cùng chạm vào file bài viết.
  const lastUpdatedAt = toIsoDate(metadata.lastUpdatedAt);

  // Không bao giờ để dateModified đứng TRƯỚC datePublished — dữ liệu như vậy
  // là sai về mặt logic (thường do clone nông/thiếu lịch sử git). Khi đó bỏ qua
  // và để ArticleStructuredData fallback về datePublished.
  const dateModified =
    lastUpdatedAt && (!datePublished || lastUpdatedAt >= datePublished)
      ? lastUpdatedAt
      : undefined;

  return (
    <>
      <BlogPostBreadcrumbs />
      <ArticleStructuredData
        title={metadata.title}
        description={metadata.description || frontMatter.description || ""}
        author={{
          name: authorName,
          url: authorUrl,
          image: authorImage,
        }}
        datePublished={datePublished}
        dateModified={dateModified}
        image={frontMatter.image || `${siteConfig.url}/img/copyright-tiennhm.webp`}
        url={metadata.permalink ? `${siteConfig.url}${metadata.permalink}` : undefined}
        keywords={frontMatter.keywords || metadata.tags?.map((tag) => tag.label) || []}
        articleType="BlogPosting"
      />
    </>
  );
}

export default BlogPostStructuredData;
