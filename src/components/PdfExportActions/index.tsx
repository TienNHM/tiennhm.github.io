import React, { useCallback, type ReactNode } from 'react';
import clsx from 'clsx';
import Translate, { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';

export interface PdfExportActionsProps {
  /** Giữ prop để nơi gọi không phải sửa; hiện không dùng tới. */
  permalink?: string;
  className?: string;
}

/**
 * Nút lưu trang thành PDF bằng hộp thoại in của trình duyệt.
 *
 * Trước đây component còn tải `pdf-manifest.json` để hiện thêm nút tải file
 * PDF dựng sẵn. Nhưng manifest khai 169 route trong khi KHÔNG có file PDF nào
 * từng được sinh ra — nút đó tải về trang 404 trên cả 169 trang, và vì nó
 * render sau khi hydrate nên không lộ ra ở HTML từ server.
 *
 * Đã bỏ hẳn cùng toàn bộ pipeline sinh PDF. In từ trình duyệt vẫn cho ra bản
 * PDF dùng được, nhờ các quy tắc @media print trong custom.css.
 */
export default function PdfExportActions({ className }: PdfExportActionsProps): ReactNode {
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
      })}
    >
      <button
        type="button"
        className="button button--outline button--secondary button--sm"
        onClick={onPrintPdf}
      >
        <Translate id="pdfExport.printPage" description="Trigger browser print dialog for save as PDF">
          Lưu PDF
        </Translate>
      </button>
    </div>
  );
}
