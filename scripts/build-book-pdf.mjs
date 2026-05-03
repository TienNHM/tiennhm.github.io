/**
 * Gộp book/chapters/*.md (sắp xếp theo tên file) thành một PDF (production-style handbook).
 * Cấu hình: book/meta.json { "title", "outputFile" } (tùy chọn).
 * Chạy: npm run pdf:book
 */
import {createRequire} from 'node:module';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const require = createRequire(import.meta.url);
const mdToPdf = require('md-to-pdf').default;
const matter = require('gray-matter');
const {getMdToPdfOptions} = require('./get-pdf-md-to-pdf-options.cjs');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const chaptersDir = path.join(ROOT, 'book', 'chapters');
const pdfOutDir = path.join(ROOT, 'pdf');
const metaPath = path.join(ROOT, 'book', 'meta.json');

async function readMeta() {
  try {
    const raw = await fs.readFile(metaPath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return {title: 'Handbook', outputFile: 'handbook.pdf'};
  }
}

async function listChapterFiles() {
  let names = [];
  try {
    names = await fs.readdir(chaptersDir);
  } catch {
    return [];
  }
  return names
    .filter((n) => /\.md$/i.test(n))
    .sort((a, b) => a.localeCompare(b, undefined, {numeric: true}))
    .map((n) => path.join(chaptersDir, n));
}

(async () => {
  const files = await listChapterFiles();
  if (files.length === 0) {
    console.warn(
      '[pdf:book] Chưa có file .md trong book/chapters/. Thêm chương rồi chạy lại.',
    );
    process.exit(0);
  }

  const meta = await readMeta();
  const title = typeof meta.title === 'string' ? meta.title : 'Handbook';
  const outputFile =
    typeof meta.outputFile === 'string' ? meta.outputFile : 'handbook.pdf';

  const parts = [`# ${title}\n\n`];
  for (let i = 0; i < files.length; i++) {
    const abs = files[i];
    const raw = await fs.readFile(abs, 'utf8');
    const {data, content} = matter(raw);
    const heading =
      typeof data.title === 'string' && data.title.trim()
        ? data.title.trim()
        : path.basename(abs, path.extname(abs));
    const breakBefore = i > 0 ? `<div class="pdf-chapter-break"></div>\n\n` : '';
    parts.push(`${breakBefore}## ${heading}\n\n`);
    parts.push(content.trim());
    parts.push('\n\n');
  }

  const combined = parts.join('');
  await fs.mkdir(pdfOutDir, {recursive: true});
  const destAbs = path.join(pdfOutDir, outputFile.replace(/[/\\]/g, '_'));

  await mdToPdf(
    {content: combined},
    getMdToPdfOptions(ROOT, {
      dest: destAbs,
      basedir: chaptersDir,
      document_title: title,
    }),
  );

  console.log(`[pdf:book] Đã tạo: ${path.relative(ROOT, destAbs)}`);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
