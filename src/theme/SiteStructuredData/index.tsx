import React from "react";
import Head from "@docusaurus/Head";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { authorProfile } from "@site/src/data/authorProfile";
import { getSiteDescription } from "@site/src/utils/siteDescription";

/**
 * SiteStructuredData - JSON-LD `@graph` (Person + WebSite) cho toàn site.
 *
 * Trước đây khối này nằm trong `headTags` của docusaurus.config.js. Vấn đề là
 * config được đánh giá TRƯỚC khi Docusaurus tính baseUrl của locale, nên mọi
 * URL trong đó đều bị đóng cứng về gốc tiếng Việt: bản en vẫn khai báo
 * `url: https://tiennhm.io.vn/` dù nó thực sự được phục vụ ở `/en/`.
 *
 * Render từ theme component thì `siteConfig.baseUrl` đã là baseUrl thật của
 * locale đang build, nên đúng cho cả `build` đầy đủ lẫn `build --locale`.
 */
export default function SiteStructuredData(): JSX.Element {
  const { siteConfig, i18n } = useDocusaurusContext();

  // siteConfig.url không có dấu `/` cuối, baseUrl luôn có cả hai đầu ("/", "/en/").
  const siteUrl = siteConfig.url.replace(/\/$/, "");
  const baseUrl = siteConfig.baseUrl;
  const localeRoot = `${siteUrl}${baseUrl}`;

  // Person mô tả một con người, không phụ thuộc locale, nên `@id` giữ nguyên ở
  // gốc site để hai bản ngôn ngữ cùng trỏ về một thực thể duy nhất.
  const personId = `${siteUrl}/#person`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: "Nguyễn Huỳnh Minh Tiến",
        alternateName: "TienNHM",
        jobTitle: "Fullstack Developer",
        url: `${siteUrl}/`,
        image: "https://avatars.githubusercontent.com/u/33385777?v=4",
        sameAs: authorProfile.sameAs,
        // Các chủ đề chuyên môn — chỉ liệt kê thứ THỰC SỰ có nội dung
        // trên docs/ hoặc blog/. Nguồn: src/data/authorProfile.js
        knowsAbout: authorProfile.knowsAbout,
      },
      {
        "@type": "WebSite",
        // Mỗi locale là một WebSite riêng vì chúng khác nhau cả URL lẫn ngôn
        // ngữ. Dùng chung một `@id` cho hai mô tả khác nhau là dữ liệu mâu thuẫn.
        "@id": `${localeRoot}#website`,
        url: localeRoot,
        name: siteConfig.title,
        description: getSiteDescription(),
        inLanguage: i18n.currentLocale,
        publisher: {
          "@id": personId,
        },
        potentialAction: [
          {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${localeRoot}search?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        ],
      },
    ],
  };

  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(graph)}</script>
    </Head>
  );
}
