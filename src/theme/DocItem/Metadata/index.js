import React from 'react';
import Head from '@docusaurus/Head';
import {PageMetadata} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {markdownPath} from '@site/src/utils/markdownUrl';

export default function DocItemMetadata() {
  const {metadata, frontMatter, assets} = useDoc();
  const {siteConfig} = useDocusaurusContext();
  return (
    <>
      <PageMetadata
        title={metadata.title}
        description={metadata.description}
        keywords={frontMatter.keywords}
        image={assets.image ?? frontMatter.image}
      />
      <Head>
        {/* Cho AI agent biết trang này có bản Markdown sạch (xem plugins/page-markdown). */}
        <link
          rel="alternate"
          type="text/markdown"
          href={`${siteConfig.url}${markdownPath(metadata.permalink, siteConfig.baseUrl)}`}
        />
      </Head>
    </>
  );
}
