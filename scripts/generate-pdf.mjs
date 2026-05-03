/**
 * Tạo PDF từ Markdown/MDX (md-to-pdf) và ghi static/pdf/pdf-manifest.json.
 * Chạy: npm run pdf:generate
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

/**
 * @param {string} raw
 */
function stripMdxForMarkdown(raw) {
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

/**
 * @param {string} relFromBlog posix path from blog root
 * @param {Record<string, unknown>} data frontmatter
 */
function blogSlugFromPath(relFromBlog, data) {
  if (typeof data.slug === 'string' && data.slug.trim()) {
    return data.slug.replace(/^\/+|\/+$/g, '');
  }
  let base = relFromBlog.replace(/\.mdx?$/i, '');
  if (/\/index$/i.test(base)) {
    base = path.posix.dirname(base);
  }
  return base;
}

/**
 * @param {string} absFile
 * @param {'docs'|'i18n-en-docs'} kind
 */
function docsPathname(absFile, kind, data) {
  const rootDir =
    kind === 'docs'
      ? path.join(ROOT, 'docs')
      : path.join(ROOT, 'i18n/en/docusaurus-plugin-content-docs/current');
  const rel = path.relative(rootDir, absFile).split(path.sep).join('/');
  const id = rel.replace(/\.mdx?$/i, '');
  const slug =
    typeof data.slug === 'string' && data.slug.trim()
      ? String(data.slug).replace(/^\/+|\/+$/g, '')
      : id;
  const prefix = kind === 'docs' ? '/docs/' : '/en/docs/';
  return `${prefix}${slug}`;
}

/** @param {string} pathname */
function pdfBasename(pathname) {
  return pathname.replace(/^\/+/, '').replace(/\//g, '__') + '.pdf';
}

/**
 * @param {string} absSource
 * @param {string} destAbs
 */
async function buildOne(absSource, destAbs) {
  const raw = await fs.readFile(absSource, 'utf8');
  const body =
    absSource.endsWith('.mdx') || absSource.endsWith('.MDX')
      ? stripMdxForMarkdown(raw)
      : raw;
  await mdToPdf(
    {content: body},
    getMdToPdfOptions(ROOT, {
      dest: destAbs,
      basedir: path.dirname(absSource),
    }),
  );
}

/**
 * @param {string} dir
 * @param {(abs: string) => void} onFile
 */
async function walkMarkdown(dir, onFile) {
  let entries = [];
  try {
    entries = await fs.readdir(dir, {withFileTypes: true});
  } catch {
    return;
  }
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      await walkMarkdown(full, onFile);
    } else if (/\.mdx?$/i.test(ent.name)) {
      onFile(full);
    }
  }
}

async function main() {
  const outDir = path.join(ROOT, 'static', 'pdf');
  await fs.mkdir(outDir, {recursive: true});

  /** @type {Record<string, string>} */
  const routes = {};
  const errors = [];

  /** @type {string[]} */
  const blogAbs = [];
  await walkMarkdown(path.join(ROOT, 'blog'), (abs) => {
    const rel = path.relative(ROOT, abs).split(path.sep).join('/');
    if (rel.includes('_TEMPLATE')) {
      return;
    }
    blogAbs.push(abs);
  });

  /** @type {string[]} */
  const docsAbs = [];
  await walkMarkdown(path.join(ROOT, 'docs'), (abs) => docsAbs.push(abs));

  /** @type {string[]} */
  const enDocsAbs = [];
  await walkMarkdown(
    path.join(ROOT, 'i18n/en/docusaurus-plugin-content-docs/current'),
    (abs) => enDocsAbs.push(abs),
  );

  for (const abs of blogAbs) {
    const relFromBlog = path.relative(path.join(ROOT, 'blog'), abs).split(path.sep).join('/');
    try {
      const raw = await fs.readFile(abs, 'utf8');
      const {data} = matter(raw);
      if (data.draft === true) {
        continue;
      }
      const slug = blogSlugFromPath(relFromBlog, data);
      const pathname = `/blog/${slug}`;
      const destAbs = path.join(outDir, pdfBasename(pathname));
      const pdfHref = `/pdf/${pdfBasename(pathname)}`;
      await buildOne(abs, destAbs);
      routes[pathname] = pdfHref;
    } catch (e) {
      errors.push({rel: relFromBlog, error: /** @type {Error} */ (e).message});
    }
  }

  for (const abs of docsAbs) {
    const rel = path.relative(path.join(ROOT, 'docs'), abs).split(path.sep).join('/');
    try {
      const raw = await fs.readFile(abs, 'utf8');
      const {data} = matter(raw);
      const pathname = docsPathname(abs, 'docs', data);
      const destAbs = path.join(outDir, pdfBasename(pathname));
      const pdfHref = `/pdf/${pdfBasename(pathname)}`;
      await buildOne(abs, destAbs);
      routes[pathname] = pdfHref;
    } catch (e) {
      errors.push({rel, error: /** @type {Error} */ (e).message});
    }
  }

  for (const abs of enDocsAbs) {
    const rel = path
      .relative(
        path.join(ROOT, 'i18n/en/docusaurus-plugin-content-docs/current'),
        abs,
      )
      .split(path.sep)
      .join('/');
    try {
      const raw = await fs.readFile(abs, 'utf8');
      const {data} = matter(raw);
      const pathname = docsPathname(abs, 'i18n-en-docs', data);
      const destAbs = path.join(outDir, pdfBasename(pathname));
      const pdfHref = `/pdf/${pdfBasename(pathname)}`;
      await buildOne(abs, destAbs);
      routes[pathname] = pdfHref;
    } catch (e) {
      errors.push({rel, error: /** @type {Error} */ (e).message});
    }
  }

  await fs.writeFile(
    path.join(outDir, 'pdf-manifest.json'),
    JSON.stringify({routes, generatedAt: new Date().toISOString()}, null, 2),
    'utf8',
  );

  console.log(
    `[pdf] Đã tạo ${Object.keys(routes).length} file; manifest → static/pdf/pdf-manifest.json`,
  );

  if (errors.length) {
    console.warn(`[pdf] ${errors.length} lỗi:`);
    for (const {rel, error} of errors) {
      console.warn(`  - ${rel}: ${error}`);
    }
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
