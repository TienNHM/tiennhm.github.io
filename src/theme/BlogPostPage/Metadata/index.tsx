import React from 'react';
import Head from '@docusaurus/Head';
import { PageMetadata } from '@docusaurus/theme-common';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

/**
 * Blog post metadata - đảm bảo og:title, og:description, og:image
 * lấy từ frontmatter của từng bài viết thay vì site-wide defaults.
 */
export default function BlogPostPageMetadata(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const { metadata, frontMatter } = useBlogPost();

  const title = metadata.title;
  const description = metadata.description ?? frontMatter.description ?? '';
  const resolvedImagePath = useBaseUrl(frontMatter.image ?? '/img/copyright-tiennhm.webp');
  const image = frontMatter.image?.startsWith('http')
    ? frontMatter.image
    : `${siteConfig.url}${resolvedImagePath}`;
  const url = metadata.permalink
    ? `${siteConfig.url}${metadata.permalink}`
    : siteConfig.url;

  return (
    <>
      <PageMetadata
        title={title}
        description={description}
        keywords={frontMatter.keywords}
        image={image}
      />
      <Head>
        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Head>
    </>
  );
}
