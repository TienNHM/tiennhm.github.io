import React, { type ReactNode } from 'react';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import PageActions from '@site/src/components/PageActions';

/**
 * Cầu nối cho remark plugin: thẻ chèn vào mdast không truyền được prop, nên
 * permalink phải lấy từ context của trang docs.
 */
export default function DocsPageActions(): ReactNode {
  const { metadata, frontMatter } = useDoc();
  return (
    <PageActions
      permalink={metadata.permalink}
      skillName={frontMatter.skill_name as string | undefined}
      skillDescription={
        (frontMatter.skill_description as string | undefined) ?? metadata.description
      }
    />
  );
}
