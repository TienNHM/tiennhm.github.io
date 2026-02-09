import React, { useMemo } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export interface HowToStep {
  name: string;
  text: string;
  image?: string;
  url?: string;
}

export interface HowToStructuredDataProps {
  name: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string; // ISO 8601 duration format, e.g., "PT30M" for 30 minutes
  image?: string;
  url?: string;
}

/**
 * HowToStructuredData component - Tạo JSON-LD structured data cho hướng dẫn step-by-step
 * Giúp AI Agents và search engines hiểu rõ cấu trúc hướng dẫn
 * 
 * Usage in MDX:
 * ```mdx
 * <HowToStructuredData
 *   name="Cách tối ưu SEO cho Docusaurus"
 *   description="Hướng dẫn chi tiết từng bước..."
 *   totalTime="PT45M"
 *   steps={[
 *     {
 *       name: "Bước 1: Cài đặt plugin",
 *       text: "Cài đặt plugin SEO..."
 *     },
 *     {
 *       name: "Bước 2: Cấu hình",
 *       text: "Cấu hình trong docusaurus.config.js..."
 *     }
 *   ]}
 * />
 * ```
 */
export function HowToStructuredData({
  name,
  description,
  steps,
  totalTime,
  image,
  url,
}: HowToStructuredDataProps) {
  const { siteConfig } = useDocusaurusContext();
  const baseUrl = siteConfig.url || 'https://tiennhm.github.io';

  const structuredData = useMemo(() => {
    const howToUrl = url || (typeof window !== 'undefined' ? window.location.href : baseUrl);
    const howToImage = image || `${baseUrl}/img/copyright-tiennhm.webp`;

    const schema: any = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: name,
      description: description,
      image: howToImage,
      ...(totalTime && { totalTime: totalTime }),
      step: steps.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.name,
        text: step.text,
        ...(step.image && { image: step.image }),
        ...(step.url && { url: step.url }),
      })),
    };

    return schema;
  }, [name, description, steps, totalTime, image, url, baseUrl]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData, null, 2) }}
    />
  );
}
