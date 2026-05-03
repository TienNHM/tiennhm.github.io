/**
 * Xuất từng PDF cho mọi file .md/.mdx trong docs/ → thư mục pdf/ (gốc repo).
 * Dùng: npm run pdf:all
 */
const {mdToPdf} = require('md-to-pdf');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const {getMdToPdfOptions} = require('./get-pdf-md-to-pdf-options.cjs');

const ROOT = path.join(__dirname, '..');
const docsPath = path.join(ROOT, 'docs');
const outputPath = path.join(ROOT, 'pdf');

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

function getAllMarkdownFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) {
    return results;
  }
  const list = fs.readdirSync(dir, {withFileTypes: true});
  for (const ent of list) {
    const fullPath = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      results.push(...getAllMarkdownFiles(fullPath));
    } else if (/\.mdx?$/i.test(ent.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

async function generatePdf(filePath) {
  const rel = path.relative(docsPath, filePath);
  const safeName = rel.replace(/[/\\]/g, '__').replace(/\.mdx?$/i, '') + '.pdf';
  const raw = fs.readFileSync(filePath, 'utf8');
  const body =
    filePath.endsWith('.mdx') || filePath.endsWith('.MDX')
      ? stripMdx(raw)
      : raw;

  await mdToPdf(
    {content: body},
    getMdToPdfOptions(ROOT, {
      dest: path.join(outputPath, safeName),
      basedir: path.dirname(filePath),
    }),
  );

  console.log(`Generated: ${safeName}`);
}

(async () => {
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, {recursive: true});
  }

  const files = getAllMarkdownFiles(docsPath);
  for (const file of files) {
    try {
      await generatePdf(file);
    } catch (e) {
      console.error(`Lỗi ${file}:`, e.message);
      process.exitCode = 1;
    }
  }

  console.log(`Done. ${files.length} file(s) → ${outputPath}`);
})();
