'use strict';

const path = require('path');

const CI =
  process.env.CI === 'true' ||
  process.env.GITHUB_ACTIONS === 'true' ||
  process.env.GITLAB_CI === 'true';

/**
 * Nối markdown.css mặc định của md-to-pdf + styles/pdf.css (không ghi đè stylesheet).
 * @param {string} repoRoot absolute path project root
 * @param {Record<string, unknown>} [overrides] merge vào config md-to-pdf
 */
function getMdToPdfOptions(repoRoot, overrides = {}) {
  const mdToPdfRoot = path.dirname(require.resolve('md-to-pdf/package.json'));
  const markdownCss = path.join(mdToPdfRoot, 'markdown.css');
  const customCss = path.join(repoRoot, 'styles', 'pdf.css');

  const launch_options = CI
    ? {
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      }
    : {};

  return Object.assign(
    {
      basedir: repoRoot,
      launch_options,
      stylesheet: [markdownCss, customCss],
      pdf_options: {
        format: 'A4',
        printBackground: true,
        margin: {top: '18mm', right: '14mm', bottom: '18mm', left: '14mm'},
      },
    },
    overrides,
  );
}

module.exports = {getMdToPdfOptions};
