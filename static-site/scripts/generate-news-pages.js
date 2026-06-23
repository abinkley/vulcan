#!/usr/bin/env node
/**
 * Fetches news from Firestore and generates static HTML pages with OG tags
 * baked into <head> so link crawlers (Slack, iMessage, etc.) see article previews.
 *
 * Run from static-site/: node scripts/generate-news-pages.js
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ID = 'vulcan-edfea';
const SITE_URL = 'https://vulcancycling.com';
const NEWS_DIR = path.join(__dirname, '..', 'news');
const DETAIL_TEMPLATE = path.join(NEWS_DIR, 'detail.html');
const SITEMAP_PATH = path.join(__dirname, '..', 'sitemap.xml');

const STATIC_PAGES = [
  `${SITE_URL}/`,
  `${SITE_URL}/news/index.html`,
  `${SITE_URL}/results/index.html`,
  `${SITE_URL}/races/index.html`,
  `${SITE_URL}/team.html`,
  `${SITE_URL}/about/index.html`,
  `${SITE_URL}/contact/index.html`,
  `${SITE_URL}/grasshopper.html`,
];

function escapeHtml(text) {
  if (text == null) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function parseFirestoreValue(value) {
  if (!value || typeof value !== 'object') return null;
  if ('stringValue' in value) return value.stringValue;
  if ('integerValue' in value) return Number(value.integerValue);
  if ('doubleValue' in value) return value.doubleValue;
  if ('booleanValue' in value) return value.booleanValue;
  if ('timestampValue' in value) return new Date(value.timestampValue);
  if ('nullValue' in value) return null;
  return null;
}

function parseDocument(doc) {
  const id = doc.name.split('/').pop();
  const data = { id };
  for (const [key, value] of Object.entries(doc.fields || {})) {
    data[key] = parseFirestoreValue(value);
  }
  return data;
}

function parseArticleDate(article) {
  if (!article.date) return new Date(0);
  if (article.date instanceof Date) return article.date;
  return new Date(article.date);
}

function formatDate(value) {
  if (!value) return 'N/A';
  let d;
  if (value instanceof Date) {
    d = value;
  } else if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    const [y, m, day] = value.split('T')[0].split('-').map(Number);
    d = new Date(Date.UTC(y, m - 1, day, 12, 0, 0));
  } else {
    d = new Date(value);
  }
  if (isNaN(d)) return 'N/A';
  return d.toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
  });
}

function formatContent(content) {
  if (!content) return '<p>No content available</p>';
  const escaped = escapeHtml(content);
  return escaped
    .split('\n\n')
    .map((p) => `<p>${p.replace(/\n/g, '<br>')}</p>`)
    .join('');
}

function absoluteImageUrl(imageUrl) {
  if (!imageUrl) return `${SITE_URL}/images/news-placeholder.jpg`;
  if (imageUrl.startsWith('http')) return imageUrl;
  return `${SITE_URL}/${imageUrl.replace(/^\//, '')}`;
}

function articleDescription(article) {
  if (article.excerpt) return article.excerpt;
  if (article.content) {
    return article.content.substring(0, 160).replace(/\s+/g, ' ').trim();
  }
  return 'News from Vulcan Cycling';
}

function buildMetaHead(article, id) {
  const title = article.title || 'News Article';
  const description = articleDescription(article);
  const image = absoluteImageUrl(article.imageUrl);
  const url = `${SITE_URL}/news/${id}.html`;

  return `  <meta name="description" content="${escapeHtml(description)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:image" content="${escapeHtml(image)}">
  <meta property="og:url" content="${escapeHtml(url)}">
  <meta property="og:type" content="article">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${escapeHtml(image)}">
  <title>${escapeHtml(title)} - Vulcan Cycling</title>`;
}

function buildArticleBody(article) {
  const title = escapeHtml(article.title || 'Untitled');
  const formattedDate = formatDate(parseArticleDate(article));
  const authorHtml = article.author
    ? `<span class="article-author">By ${escapeHtml(article.author)}</span>`
    : '';
  const imageHtml = article.imageUrl
    ? `<div class="article-featured-image">
            <img src="${escapeHtml(article.imageUrl)}" alt="${title}" class="article-image">
          </div>`
    : '';

  return `<article class="news-article">
          <header class="article-header">
            <div class="article-metadata">
              <span class="article-date">${formattedDate}</span>
              ${authorHtml}
            </div>
            <h1 class="article-title">${title}</h1>
          </header>
          ${imageHtml}
          <div class="article-content">
            ${formatContent(article.content)}
          </div>
          <div class="article-footer">
            <a href="index.html" class="back-button">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 8H1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8 15L1 8L8 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Back to News
            </a>
          </div>
        </article>`;
}

function buildPage(template, article, id) {
  let html = template;

  html = html.replace(
    /<meta name="description"[\s\S]*?<title>[^<]*<\/title>/,
    buildMetaHead(article, id)
  );

  html = html.replace(
    /<div class="news-detail-container">[\s\S]*?<\/div>\s*\n\s*<\/div>\s*\n\s*<\/section>/,
    `<div class="news-detail-container">\n          ${buildArticleBody(article)}\n        </div>\n      </div>\n    </section>`
  );

  html = html.replace(
    /<!-- Redirect legacy[\s\S]*?<\/script>\s*\n/,
    ''
  );

  html = html.replace(
    /<script src="https:\/\/www\.gstatic\.com\/firebasejs[^"]+" defer><\/script>\n/g,
    ''
  );

  html = html.replace(
    /<!-- Firebase Loader Script[\s\S]*?<\/body>/,
    '</body>'
  );

  return html;
}

function writeSitemap(articleIds) {
  const urls = [...STATIC_PAGES, ...articleIds.map((id) => `${SITE_URL}/news/${id}.html`)];
  const body = urls.map((loc) => `  <url><loc>${loc}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
  fs.writeFileSync(SITEMAP_PATH, xml);
}

async function fetchNewsArticles() {
  const response = await fetch(
    `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents:runQuery`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        structuredQuery: {
          from: [{ collectionId: 'content' }],
          where: {
            fieldFilter: {
              field: { fieldPath: 'type' },
              op: 'EQUAL',
              value: { stringValue: 'news' },
            },
          },
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Firestore query failed: ${response.status} ${await response.text()}`);
  }

  const rows = await response.json();
  return rows
    .filter((row) => row.document)
    .map((row) => parseDocument(row.document))
    .sort((a, b) => parseArticleDate(b) - parseArticleDate(a));
}

async function main() {
  const template = fs.readFileSync(DETAIL_TEMPLATE, 'utf8');
  const articles = await fetchNewsArticles();

  for (const file of fs.readdirSync(NEWS_DIR)) {
    if (file.endsWith('.html') && file !== 'index.html' && file !== 'detail.html') {
      fs.unlinkSync(path.join(NEWS_DIR, file));
    }
  }

  const ids = [];
  for (const article of articles) {
    const html = buildPage(template, article, article.id);
    fs.writeFileSync(path.join(NEWS_DIR, `${article.id}.html`), html);
    ids.push(article.id);
  }

  writeSitemap(ids);
  console.log(`Generated ${ids.length} static news pages and updated sitemap.xml`);
}

main().catch((error) => {
  console.error('Failed to generate news pages:', error.message);
  process.exit(1);
});
