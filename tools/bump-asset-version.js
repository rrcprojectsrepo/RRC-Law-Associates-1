// RRC Law Associates — bump frontend asset cache-busting version.
//
// Usage (from the repo root):
//   node tools/bump-asset-version.js            -> timestamp version (default)
//   node tools/bump-asset-version.js 20261008-2 -> explicit version
//
// What it does:
// 1. Writes the version into asset-version.txt (single source of truth).
// 2. Rewrites every local style.css / style2.css / topbar.css / script.js /
//    script2.js URL in every top-level *.html page to `?v=<version>`,
//    preserving each tag's other attributes (defer, data-rrc-ai-only, ...).
//    Third-party CDN URLs are never touched.
//
// The chatbot Shadow DOM stylesheet reuses the page script's `?v=` value
// automatically (script.js reads its own query string), so stamping the
// <script src="script.js?v=..."> tag keeps both in sync with zero extra work.
'use strict';

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const versionFile = path.join(repoRoot, 'asset-version.txt');

function resolveVersion() {
  const explicit = (process.argv[2] || '').trim();
  if (explicit) {
    if (!/^[A-Za-z0-9][A-Za-z0-9._-]{0,40}$/.test(explicit)) {
      console.error('Refusing to use unsafe version string: ' + explicit);
      process.exit(1);
    }
    return explicit;
  }
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const stamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`
    + `-${pad(now.getHours())}${pad(now.getMinutes())}`;
  return stamp;
}

// Local first-party assets only. Matches optional "./" prefix and any
// existing ?v= value; leaves CDN/absolute URLs alone because they never
// start with an optional "./" followed directly by the bare filename.
const assetPattern = /((?:href|src)=")(\.\/)?(style\.css|style2\.css|topbar\.css|script\.js|script2\.js)(\?v=[^"']*)?(")/g;

function stampHtml(html, version) {
  return html.replace(assetPattern, `$1$2$3?v=${version}$5`);
}

function main() {
  const version = resolveVersion();
  fs.writeFileSync(versionFile, version + '\n', 'utf8');

  const pages = fs.readdirSync(repoRoot).filter((name) => name.endsWith('.html'));
  if (pages.length === 0) {
    console.error('No *.html pages found in ' + repoRoot);
    process.exit(1);
  }

  let updated = 0;
  for (const page of pages) {
    const file = path.join(repoRoot, page);
    const before = fs.readFileSync(file, 'utf8');
    const after = stampHtml(before, version);
    if (after !== before) {
      fs.writeFileSync(file, after, 'utf8');
      updated += 1;
    }
  }

  console.log(`Asset version: ${version}`);
  console.log(`Stamped ${updated} of ${pages.length} HTML pages.`);
}

main();
