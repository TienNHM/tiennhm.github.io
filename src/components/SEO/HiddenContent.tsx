import React from 'react';
import styles from './HiddenContent.module.css';

export interface HiddenContentProps {
  children: React.ReactNode;
}

/**
 * Wraps children in a non-visual container (e.g. supplementary links/metadata in MDX).
 * Hidden from layout; still present in the rendered HTML tree.
 */
export function HiddenContent({ children }: HiddenContentProps) {
  return (
    <div className={styles.root} aria-hidden="true" data-layout-hidden="true">
      {children}
    </div>
  );
}
