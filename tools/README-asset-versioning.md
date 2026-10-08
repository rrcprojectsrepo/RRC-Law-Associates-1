# RRC Law Associates — frontend asset cache-busting.
#
# WHY THIS FILE EXISTS
# .htaccess caches static assets (CSS/JS/images/fonts) for up to 1 year with
# `immutable`, so after a deploy browsers keep using the OLD style.css/script.js
# unless the URL changes. HTML pages are never cached (no-cache/no-store), so
# stamping a new `?v=` query on every local CSS/JS URL forces browsers/CDNs to
# fetch the fresh files automatically — no Ctrl+Shift+R needed.
#
# HOW TO USE (beginner-friendly, works with the existing Git -> cPanel deploy)
# 1. Deploy normally: push to main; cPanel copies the repo to public_html.
# 2. AFTER cPanel finishes copying, run this ONE command from the repo root on
#    the server (or locally, then push the result):
#        node tools/bump-asset-version.js
#    It writes a new timestamped version into asset-version.txt and rewrites
#    every local style.css/style2.css/topbar.css/script.js/script2.js URL in
#    every *.html page to `?v=<new-version>`.
# 3. Push/deploy the rewritten HTML + asset-version.txt (the cPanel task copies
#    everything, so the stamped HTML reaches public_html on the next sync).
#    The chatbot Shadow DOM stylesheet reuses the page script's `?v=` value
#    automatically (see script.js aiStyleVersion), so no extra step is needed.
#
# WHAT GETS VERSIONED
# - Local first-party assets only: style.css, style2.css, topbar.css,
#   script.js, script2.js (including ./ prefixed variants).
# - Third-party CDN URLs (jsdelivr, cdnjs, unpkg, Google) are NEVER touched.
#
# ROLLBACK
# Re-run the script after restoring older assets; the new `?v=` becomes the
# fresh cache key again.
