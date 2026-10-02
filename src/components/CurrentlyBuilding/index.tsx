import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import {
  BUILDING,
  BUILDING_UPDATED_AT,
  isBuildingStale,
  type BuildStatus,
  type BuildingItem,
} from '@site/src/data/building';
import styles from './styles.module.css';

const STATUS_LABEL: Record<BuildStatus, string> = {
  building: 'đang dựng',
  live: 'đang chạy',
  maintaining: 'đang bảo trì',
  experimenting: 'đang thử nghiệm',
};

function Item({ item }: { item: BuildingItem }): JSX.Element {
  return (
    <li className={styles.card}>
      <div className={styles.head}>
        {item.href ? (
          <Link href={item.href} className={styles.name}>
            {item.name}
          </Link>
        ) : (
          <span className={styles.name}>{item.name}</span>
        )}
        <span className={clsx(styles.status, styles[`status_${item.status}`])}>
          {STATUS_LABEL[item.status]}
        </span>
      </div>

      <p className={styles.summary}>{item.summary}</p>

      {item.tech && item.tech.length > 0 && (
        <ul className={styles.tech}>
          {item.tech.map((t) => (
            <li key={t} className={styles.techItem}>
              {t}
            </li>
          ))}
        </ul>
      )}

      {item.repo && (
        <Link href={item.repo} className={styles.repo}>
          <Translate id="building.repo" description="Link tới repo của mục đang dựng">
            Mã nguồn
          </Translate>
        </Link>
      )}
    </li>
  );
}

/**
 * Khối "Đang dựng" ở trang chủ.
 *
 * Tự ẩn khi dữ liệu quá cũ — xem BUILDING_STALE_AFTER_DAYS trong
 * src/data/building.ts. Một danh sách "đang làm" đứng yên nửa năm nói điều
 * ngược hẳn với thứ nó định nói.
 */
export default function CurrentlyBuilding(): JSX.Element | null {
  if (BUILDING.length === 0 || isBuildingStale()) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 id="dang-dung" className={styles.title}>
            <Translate id="building.title" description="Tiêu đề khối đang dựng ở trang chủ">
              Đang dựng
            </Translate>
          </h2>
          <Link to="/now" className={styles.nowLink}>
            <Translate id="building.now" description="Link từ khối đang dựng sang trang /now">
              Tôi đang làm gì
            </Translate>
            &nbsp;→
          </Link>
        </div>

        <ul className={styles.grid}>
          {BUILDING.map((item) => (
            <Item key={item.name} item={item} />
          ))}
        </ul>

        <p className={styles.updated}>
          {translate(
            {
              id: 'building.updated',
              message: 'Cập nhật {date}',
              description: 'Dòng ngày cập nhật dưới khối đang dựng',
            },
            { date: BUILDING_UPDATED_AT },
          )}
        </p>
      </div>
    </section>
  );
}
