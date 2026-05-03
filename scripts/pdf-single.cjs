'use strict';

/**
 * Một file Markdown/MDX → pdf/<tên>.pdf
 * npm run pdf:single -- docs/some/file.md
 */
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const {mdToPdf} = require('md-to-pdf');
const {getMdToPdfOptions} = require('./get-pdf-md-to-pdf-options.cjs');

const ROOT = path.join(__dirname, '..');
const inputArg = process.argv[2];

if (!inputArg) {
  console.error('Usage: npm run pdf:single -- <path-to-file.md|mdx>');
  process.exit(1);
}

const abs = path.isAbsolute(inputArg)
  ? inputArg
  : path.join(process.cwd(), inputArg);

if (!fs.existsSync(abs)) {
  console.error('Không tìm thấy file:', abs);
  process.exit(1);
}

function stripMdx(raw) {
  return raw
    .split(/\r?\n/)
    .filter((line) => {
      if (/^\s*import\s[\s\S]*$/.test(line)) {
        return false;
      }
      if (/^\s*export\s(default|const|let|var|function|class|\{)/.test(line)) {
        return false;
      }
      return true;
    })
    .join('\n');
}

(async () => {
  const raw = fs.readFileSync(abs, 'utf8');
  const body =
    abs.endsWith('.mdx') || abs.endsWith('.MDX') ? stripMdx(raw) : raw;
  const base = path.basename(abs, path.extname(abs));
  const outDir = path.join(ROOT, 'pdf');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, {recursive: true});
  }
  const dest = path.join(outDir, `${base}.pdf`);

  await mdToPdf(
    {content: body},
    getMdToPdfOptions(ROOT, {
      dest,
      basedir: path.dirname(abs),
    }),
  );

  console.log('Created:', dest);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
