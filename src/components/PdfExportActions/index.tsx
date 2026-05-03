import React, { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate, { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';

function withSiteBase(baseUrl: string, href: string): string {
  const b = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const p = href.startsWith('/') ? href : `/${href}`;
  return `${b}${p}`;
}

type Manifest = { routes?: Record<string, string> };

let manifestCache: Manifest | null = null;
let inflight: Promise<Manifest> | null = null;

async function fetchManifest(url: string): Promise<Manifest> {
  const res = await fetch(url);
  if (!res.ok) {
    return {};
  }
  try {
    return await res.json();
  } catch {
    return {};
  }
}

function getManifest(jsonUrl: string): Promise<Manifest> {
  if (manifestCache) {
    return Promise.resolve(manifestCache);
  }
  inflight ??= fetchManifest(jsonUrl).then((m) => {
    manifestCache = m;
    inflight = null;
    return m;
  });
  return inflight;
}

/** Chuẩn hóa permalinks Docusaurus (baseUrl đã không nằm trong permalink). */
function normalizePermalink(href: string): string {
  if (href.length > 1 && href.endsWith('/')) {
    return href.slice(0, -1);
  }
  return href;
}

export interface PdfExportActionsProps {
  permalink: string;
  className?: string;
}

/**
 * Hai hành động PDF: tải file build từ md-to-pdf (nếu có trong manifest),
 * và in / lưu PDF từ trang đã render (giữ được MDX, theme, syntax highlight).
 */
export default function PdfExportActions({
  permalink,
  className,
}: PdfExportActionsProps): React.ReactElement | null {
  const {
    siteConfig: { baseUrl },
  } = useDocusaurusContext();
  const manifestSrc = useBaseUrl('/pdf/pdf-manifest.json');
  const [routes, setRoutes] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;
    getManifest(manifestSrc).then((m) => {
      if (!cancelled) {
        setRoutes(m.routes ?? {});
      }
    });
    return () => {
      cancelled = true;
    };
  }, [manifestSrc]);

  const key = normalizePermalink(permalink);
  const prebuiltHref = routes[key];
  const markdownPdfUrl = prebuiltHref
    ? withSiteBase(baseUrl, prebuiltHref)
    : undefined;

  const onPrintPdf = useCallback(() => {
    window.print();
  }, []);

  return (
    <div
      className={clsx(styles.toolbar, 'pdf-export-toolbar', className)}
      role="group"
      aria-label={translate({
      message: 'Xuất PDF',
      description: 'Aria label for PDF export toolbar',
      id: 'pdfExport.aria.toolbar',
    })}>
      {markdownPdfUrl ? (
        <a
          className="button button--secondary button--sm"
          href={markdownPdfUrl}
          download
        >
          <Translate id="pdfExport.downloadMd" description="Link to prebuilt PDF from markdown">
            Tải PDF (Markdown)
          </Translate>
        </a>
      ) : null}
      <button
        type="button"
        className="button button--outline button--secondary button--sm"
        onClick={onPrintPdf}
      >
        <Translate id="pdfExport.printPage" description="Trigger browser print dialog for save as PDF">
          Lưu PDF từ trang
        </Translate>
      </button>
    </div>
  );
}
