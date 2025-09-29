// Mobile News Performance Optimizer
// This script optimizes news loading for mobile devices

(function() {
  'use strict';
  
  // Performance monitoring
  const performanceMonitor = {
    startTime: null,
    endTime: null,
    
    start: function() {
      this.startTime = performance.now();
    },
    
    end: function() {
      this.endTime = performance.now();
      const loadTime = this.endTime - this.startTime;
      console.log(`News loading took ${loadTime.toFixed(2)}ms`);
      
      // Log slow loading on mobile
      if (loadTime > 2000 && window.innerWidth <= 768) {
        console.warn('Slow news loading detected on mobile device');
      }
    }
  };
  
  // Mobile detection
  const isMobile = () => {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };
  
  // Image lazy loading with intersection observer
  const setupLazyLoading = () => {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
              observer.unobserve(img);
            }
          }
        });
      });
      
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  };
  
  // Optimize Firebase queries for mobile
  const optimizeFirebaseQuery = (query) => {
    if (isMobile()) {
      // Reduce data transfer on mobile
      return query.limit(6);
    }
    return query;
  };
  
  // Debounce function for scroll events
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };
  
  // Mobile-optimized news loading
  const loadNewsOptimized = () => {
    performanceMonitor.start();
    
    const newsGrid = document.querySelector('.news-grid');
    if (!newsGrid) return;
    
    // Clear existing content
    newsGrid.innerHTML = '';
    
    // Show loading indicator
    newsGrid.innerHTML = '<div class="loading-mobile">Loading news...</div>';
    
    // Use optimized query
    const query = db.collection('content')
      .where('type', '==', 'news');
    
    const optimizedQuery = optimizeFirebaseQuery(query);
    
    optimizedQuery.get().then((querySnapshot) => {
      if (querySnapshot.empty) {
        newsGrid.innerHTML = '<p>No news articles available.</p>';
        return;
      }
      
      // Process articles with mobile optimization
      const articles = [];
      querySnapshot.forEach((doc) => {
        const article = doc.data();
        articles.push({
          id: doc.id,
          ...article
        });
      });
      
      // Sort by date (newest first)
      articles.sort((a, b) => {
        const dateA = a.date ? new Date(a.date) : new Date();
        const dateB = b.date ? new Date(b.date) : new Date();
        return dateB - dateA;
      });
      
      // Limit articles on mobile
      const maxArticles = isMobile() ? 3 : 6;
      const displayArticles = articles.slice(0, maxArticles);
      
      // Render articles with mobile optimization
      displayArticles.forEach((article, index) => {
        const newsCard = createMobileOptimizedCard(article, index);
        newsGrid.appendChild(newsCard);
      });
      
      performanceMonitor.end();
    }).catch((error) => {
      console.error('Error loading news:', error);
      newsGrid.innerHTML = '<p>Error loading news. Please try again.</p>';
    });
  };
  
  // Create mobile-optimized news card
  const createMobileOptimizedCard = (article, index) => {
    const card = document.createElement('div');
    card.className = 'news-card mobile-optimized';
    
    const formattedDate = article.date ? 
      new Date(article.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }) : 'Recent';
    
    const excerpt = article.content ? 
      article.content.substring(0, isMobile() ? 80 : 120) + '...' : 
      'No content available';
    
    card.innerHTML = `
      <div class="news-image ${article.imageUrl ? 'has-image' : 'no-image'}" 
           style="background-image: url('${article.imageUrl || 'images/news-placeholder.jpg'}')">
      </div>
      <div class="news-info">
        <div class="news-date">${formattedDate}</div>
        <h3 class="news-title">${article.title || 'Untitled'}</h3>
        <p class="news-excerpt">${excerpt}</p>
        <a href="news/detail.html?id=${article.id}" class="read-more">
          Read More →
        </a>
      </div>
    `;
    
    return card;
  };
  
  // Initialize mobile optimizations
  const initMobileOptimizations = () => {
    // Add mobile-specific CSS
    const style = document.createElement('style');
    style.textContent = `
      .loading-mobile {
        text-align: center;
        padding: 2rem;
        color: #ccc;
        font-size: 0.9rem;
      }
      
      .news-card.mobile-optimized {
        transition: transform 0.2s ease;
      }
      
      .news-card.mobile-optimized:active {
        transform: scale(0.98);
      }
      
      @media (max-width: 768px) {
        .news-card.mobile-optimized {
          margin-bottom: 1rem;
        }
        
        .news-card.mobile-optimized .news-image {
          height: 120px;
        }
        
        .news-card.mobile-optimized .news-info {
          padding: 0.75rem;
        }
        
        .news-card.mobile-optimized .news-title {
          font-size: 1rem;
          line-height: 1.3;
        }
        
        .news-card.mobile-optimized .news-excerpt {
          font-size: 0.85rem;
          line-height: 1.4;
        }
      }
    `;
    document.head.appendChild(style);
    
    // Setup lazy loading
    setupLazyLoading();
    
    // Optimize scroll performance
    const optimizedScroll = debounce(() => {
      // Handle scroll optimizations if needed
    }, 100);
    
    window.addEventListener('scroll', optimizedScroll, { passive: true });
  };
  
  // Export functions for use in other scripts
  window.mobileNewsOptimizer = {
    loadNewsOptimized,
    isMobile,
    performanceMonitor
  };
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileOptimizations);
  } else {
    initMobileOptimizations();
  }
  
})();
