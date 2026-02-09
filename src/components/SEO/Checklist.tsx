import React from 'react';
import styles from './Checklist.module.css';

export interface ChecklistItem {
  text: string | React.ReactNode;
  checked?: boolean;
}

export interface ChecklistProps {
  items: ChecklistItem[];
  title?: string;
  ordered?: boolean;
}

/**
 * Checklist component - Tạo danh sách checklist có cấu trúc
 * Giúp AI Agents dễ dàng trích xuất các điểm chính dạng bullet points
 * 
 * Usage in MDX:
 * ```mdx
 * <Checklist 
 *   title="Các bước cần làm"
 *   items={[
 *     { text: "Bước 1: Làm điều này" },
 *     { text: "Bước 2: Làm điều kia", checked: true },
 *     { text: "Bước 3: Kiểm tra lại" }
 *   ]}
 * />
 * ```
 */
export function Checklist({ items, title, ordered = false }: ChecklistProps) {
  const ListComponent = ordered ? 'ol' : 'ul';
  const listClassName = ordered ? styles.checklist__ordered : styles.checklist__unordered;

  return (
    <div className={styles.checklist}>
      {title && <h3 className={styles.checklist__title}>{title}</h3>}
      <ListComponent className={listClassName}>
        {items.map((item, index) => (
          <li key={index} className={styles.checklistItem}>
            <span className={styles.checklistItem__marker}>
              {item.checked !== undefined ? (
                <input
                  type="checkbox"
                  checked={item.checked}
                  readOnly
                  className={styles.checklistItem__checkbox}
                  aria-label={typeof item.text === 'string' ? item.text : `Item ${index + 1}`}
                />
              ) : ordered ? (
                `${index + 1}.`
              ) : (
                '•'
              )}
            </span>
            <span className={styles.checklistItem__text}>
              {item.text}
            </span>
          </li>
        ))}
      </ListComponent>
    </div>
  );
}
