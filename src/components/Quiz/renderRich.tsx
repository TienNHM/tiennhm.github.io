import React from 'react';

/**
 * Markdown tối giản cho phần giải thích: **đậm**, `code`.
 * Dữ liệu quiz là chuỗi thuần để dán đề nhanh, không dựng MDX.
 */
function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }
    const token = match[0];
    const key = `${keyPrefix}-i${i++}`;
    if (token.startsWith('**')) {
      nodes.push(<strong key={key}>{token.slice(2, -2)}</strong>);
    } else {
      nodes.push(<code key={key}>{token.slice(1, -1)}</code>);
    }
    last = match.index + token.length;
  }
  if (last < text.length) {
    nodes.push(text.slice(last));
  }
  return nodes;
}

/** Mỗi dòng "- " thành <li>, khối ``` thành <pre>, còn lại gộp thành <p>. */
export function renderRich(text: string, keyPrefix = 'r'): React.ReactNode {
  const blocks: React.ReactNode[] = [];
  const lines = text.split('\n');
  let paragraph: string[] = [];
  let bullets: string[] = [];
  let fence: string[] | null = null;
  let b = 0;

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    const key = `${keyPrefix}-p${b++}`;
    blocks.push(<p key={key}>{renderInline(paragraph.join(' '), key)}</p>);
    paragraph = [];
  };

  const flushBullets = () => {
    if (bullets.length === 0) return;
    const key = `${keyPrefix}-u${b++}`;
    blocks.push(
      <ul key={key}>
        {bullets.map((item, idx) => (
          <li key={`${key}-${idx}`}>{renderInline(item, `${key}-${idx}`)}</li>
        ))}
      </ul>,
    );
    bullets = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (line.startsWith('```')) {
      if (fence === null) {
        flushBullets();
        flushParagraph();
        fence = [];
      } else {
        blocks.push(<pre key={`${keyPrefix}-c${b++}`}>{fence.join('\n')}</pre>);
        fence = null;
      }
    } else if (fence !== null) {
      fence.push(rawLine);
    } else if (line === '') {
      flushBullets();
      flushParagraph();
    } else if (line.startsWith('- ')) {
      flushParagraph();
      bullets.push(line.slice(2));
    } else {
      flushBullets();
      paragraph.push(line);
    }
  }
  if (fence !== null) {
    blocks.push(<pre key={`${keyPrefix}-c${b++}`}>{fence.join('\n')}</pre>);
  }
  flushBullets();
  flushParagraph();

  return blocks;
}
