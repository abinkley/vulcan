#!/bin/bash
set -euo pipefail

echo "Deploying Vulcan Cycling static site to GitHub Pages..."

# Generate static news pages with OG tags for link crawlers
if command -v node >/dev/null 2>&1; then
  echo "Generating static news article pages..."
  node scripts/generate-news-pages.js || echo "Warning: news page generation failed; continuing deploy"
else
  echo "Warning: node not found; skipping news page generation"
fi

# Clean up previous deploy (including hidden .git from prior runs)
rm -rf deploy
mkdir -p deploy

# Create necessary subdirectories
mkdir -p deploy/css
mkdir -p deploy/js
mkdir -p deploy/images
mkdir -p deploy/admin
mkdir -p deploy/news
mkdir -p deploy/races
mkdir -p deploy/results
mkdir -p deploy/about
mkdir -p deploy/contact

# Copy standalone HTML files
cp index.html deploy/
cp team.html deploy/
cp grasshopper.html deploy/
cp 404.html deploy/
cp robots.txt deploy/
cp sitemap.xml deploy/
cp site.webmanifest deploy/
cp news/index.html deploy/news/
cp news/detail.html deploy/news/
for article_page in news/*.html; do
  base=$(basename "$article_page")
  if [ "$base" != "index.html" ] && [ "$base" != "detail.html" ]; then
    cp "$article_page" deploy/news/
  fi
done
cp races/index.html deploy/races/
cp races/detail.html deploy/races/
cp results/index.html deploy/results/
cp about/index.html deploy/about/
cp contact/index.html deploy/contact/

# Copy CSS
cp css/*.css deploy/css/ 2>/dev/null || true

# Copy JS
cp js/*.js deploy/js/ 2>/dev/null || true

# Copy images (if they exist)
if [ -d "images" ]; then
  cp -r images/* deploy/images/ 2>/dev/null || true
fi

# Copy admin files
cp admin/*.html deploy/admin/ 2>/dev/null || true

# Copy admin JS and CSS if they exist
if [ -d "admin/js" ]; then
  mkdir -p deploy/admin/js
  cp admin/js/*.js deploy/admin/js/ 2>/dev/null || true
fi

if [ -d "admin/css" ]; then
  mkdir -p deploy/admin/css
  cp admin/css/*.css deploy/admin/css/ 2>/dev/null || true
fi

# GitHub Pages essentials — CNAME must be present BEFORE push or custom domain breaks
touch deploy/.nojekyll
echo "vulcancycling.com" > deploy/CNAME

echo "Site prepared in deploy/ ($(du -sh deploy | cut -f1))"

# Push deploy/ contents to gh-pages (single push, always includes CNAME)
cd deploy
git init -q
git add .
git commit -q -m "Deploy site update"
git branch -M gh-pages
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/abinkley/vulcan.git
git push -f origin gh-pages
cd ..

echo "Deployment complete."
echo "  https://abinkley.github.io/vulcan/"
echo "  https://vulcancycling.com/ (custom domain may take a few minutes to reconnect)"
echo "If vulcancycling.com still 404s, re-save the custom domain in GitHub repo Settings → Pages."
