import React, { useMemo } from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// @ts-ignore - module CommonJS dùng chung với docusaurus.config.js
import { authorProfile } from '@site/src/data/authorProfile';

export interface ProfilePageStructuredDataProps {
  /** Đường dẫn tương đối của trang hồ sơ, mặc định là `/about`. */
  path?: string;
  /** Tên hiển thị của trang (thẻ `name` của ProfilePage). */
  name?: string;
  /** Mô tả ngắn của trang hồ sơ. */
  description?: string;
  /**
   * Ngày cập nhật nội dung trang, định dạng `YYYY-MM-DD`.
   * Chỉ truyền khi thực sự biết ngày đó — không bịa.
   */
  dateModified?: string;
}

/**
 * ProfilePageStructuredData - JSON-LD `ProfilePage` cho trang giới thiệu tác giả.
 *
 * `mainEntity` trỏ tới CHÍNH entity Person của site (`${siteUrl}/#person`,
 * khai báo trong @graph ở docusaurus.config.js). Vì dùng lại đúng `@id` nên
 * search engine hợp nhất hai node thành một entity duy nhất, không sinh ra
 * Person trùng lặp.
 *
 * Dữ liệu Person lấy từ `src/data/authorProfile.js` để không lệch với site-wide graph.
 */
export function ProfilePageStructuredData({
  path = '/about',
  name,
  description,
  dateModified,
}: ProfilePageStructuredDataProps) {
  const { siteConfig } = useDocusaurusContext();
  const siteUrl = siteConfig.url;

  const structuredData = useMemo(() => {
    const pageUrl = `${siteUrl}${path}`;

    return {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      '@id': `${pageUrl}#profilepage`,
      url: pageUrl,
      name: name ?? `${authorProfile.name} (${authorProfile.alternateName})`,
      ...(description && { description }),
      inLanguage: 'vi',
      isPartOf: { '@id': `${siteUrl}/#website` },
      ...(dateModified && { dateModified }),
      mainEntity: {
        '@type': 'Person',
        // Cùng @id với Person trong @graph site-wide => hợp nhất entity.
        '@id': `${siteUrl}/#person`,
        name: authorProfile.name,
        alternateName: authorProfile.alternateName,
        jobTitle: authorProfile.jobTitle,
        description: authorProfile.description,
        url: `${siteUrl}/`,
        image: authorProfile.image,
        email: `mailto:${authorProfile.email}`,
        sameAs: authorProfile.sameAs,
        knowsAbout: authorProfile.knowsAbout,
        mainEntityOfPage: { '@id': `${pageUrl}#profilepage` },
      },
    };
  }, [siteUrl, path, name, description, dateModified]);

  return (
    <Head>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Head>
  );
}

export default ProfilePageStructuredData;
