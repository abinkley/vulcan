/**
 * Hydrates prerendered static news article pages from Firestore on load.
 * Static <head> OG tags are left unchanged for crawlers; body content stays current.
 */
(function () {
  function escapeHtml(text) {
    if (text == null) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatDate(value) {
    if (!value) return 'N/A';
    let d;
    if (value && typeof value.toDate === 'function') {
      d = value.toDate();
    } else if (value && typeof value.seconds === 'number') {
      d = new Date(value.seconds * 1000);
    } else if (value instanceof Date) {
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

  function waitForFirebase(callback, attempts) {
    if (typeof firebase !== 'undefined' && firebase.apps.length) {
      callback();
      return;
    }
    if (attempts <= 0) return;
    setTimeout(function () { waitForFirebase(callback, attempts - 1); }, 100);
  }

  function getFirestore() {
    if (typeof db !== 'undefined') return db;
    if (typeof firebase !== 'undefined' && firebase.apps.length) return firebase.firestore();
    return null;
  }

  function hydrateArticle(articleEl, articleId) {
    const firestore = getFirestore();
    if (!firestore) return;

    firestore.collection('content').doc(articleId).get().then(function (doc) {
      if (!doc.exists) return;
      const data = doc.data();
      if (data.type !== 'news') return;

      const titleEl = articleEl.querySelector('.article-title');
      if (titleEl && data.title) {
        titleEl.textContent = data.title;
        document.title = data.title + ' - Vulcan Cycling';
      }

      const dateEl = articleEl.querySelector('.article-date');
      if (dateEl && data.date) dateEl.textContent = formatDate(data.date);

      let authorEl = articleEl.querySelector('.article-author');
      if (data.author) {
        if (!authorEl) {
          authorEl = document.createElement('span');
          authorEl.className = 'article-author';
          const meta = articleEl.querySelector('.article-metadata');
          if (meta) meta.appendChild(authorEl);
        }
        authorEl.textContent = 'By ' + data.author;
      } else if (authorEl) {
        authorEl.remove();
      }

      let imgEl = articleEl.querySelector('img.article-featured-image');
      if (data.imageUrl) {
        if (!imgEl) {
          imgEl = document.createElement('img');
          imgEl.className = 'article-featured-image';
          imgEl.loading = 'lazy';
          const header = articleEl.querySelector('.article-header');
          const content = articleEl.querySelector('.article-content');
          if (header && content) header.insertAdjacentElement('afterend', imgEl);
        }
        imgEl.src = data.imageUrl;
        imgEl.alt = data.title || '';
      } else if (imgEl) {
        imgEl.remove();
      }

      const contentEl = articleEl.querySelector('.article-content');
      if (contentEl && data.content) contentEl.innerHTML = formatContent(data.content);
    }).catch(function () { /* static fallback remains */ });
  }

  document.addEventListener('DOMContentLoaded', function () {
    const articleEl = document.querySelector('.news-article[data-article-id]');
    if (!articleEl) return;
    const articleId = articleEl.getAttribute('data-article-id');
    if (!articleId) return;
    waitForFirebase(function () { hydrateArticle(articleEl, articleId); }, 50);
  });
})();
