// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0hp0wbDPAG2Cbs_K1pi1jBDWtW4PMUuk",
  authDomain: "vulcan-edfea.firebaseapp.com",
  projectId: "vulcan-edfea",
  storageBucket: "vulcan-edfea.firebasestorage.app",
  messagingSenderId: "906189775089",
  appId: "1:906189775089:web:7ce445936dfbc556778950",
  measurementId: "G-5GZYY5YKTB"
};

// Global variables for Firebase services
let db;
let storage;

// Initialize Firebase for all pages
function initFirebase() {
  console.log('Initializing Firebase...');
  
  // Check if Firebase is already initialized
  if (firebase.apps.length === 0) {
    try {
      firebase.initializeApp(firebaseConfig);
      console.log('Firebase initialized successfully');
    } catch (error) {
      console.error('Error initializing Firebase:', error);
      return false;
    }
  } else {
    console.log('Firebase already initialized');
  }
  
  // Initialize Firestore
  try {
    db = firebase.firestore();
    console.log('Firestore initialized successfully');
  } catch (error) {
    console.error('Error initializing Firestore:', error);
    return false;
  }
  
  // Initialize Storage if available
  try {
    if (firebase.storage) {
      storage = firebase.storage();
      console.log('Firebase Storage initialized successfully');
    }
  } catch (error) {
    console.log('Firebase Storage not initialized (might not be needed):', error);
    // Not critical, so continue
  }
  
  return true;
}

// Initialize Firebase immediately when the script loads
console.log('Initializing Firebase on script load...');
initFirebase();

// Load featured riders for the homepage
async function loadFeaturedRiders() {
  console.log('=== Starting loadFeaturedRiders function ===');
  
  // Get the riders container first to ensure we can log errors properly
  const ridersGrid = document.querySelector('.riders-grid');
  if (!ridersGrid) {
    console.error('ERROR: Riders grid element not found, selector ".riders-grid" did not match any elements');
    return;
  }
  
  // Make sure Firebase is initialized
  if (!db) {
    console.log('Firestore not initialized yet, initializing Firebase...');
    if (!initFirebase()) {
      ridersGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: red;">Error initializing Firebase. Please check the console for details.</p>';
      return;
    }
  }
  
  try {
    console.log('Querying Firestore for riders with type="rider"...');
    
    // Get all riders - only filter by type, ignore status for now to see if we get any results
    const snapshot = await db.collection('content')
      .where('type', '==', 'rider')
      .get();
    
    // Debug output the query results
    console.log(`Query completed. Found ${snapshot.size} total documents`);
    
    // If there are no riders, return
    if (snapshot.empty) {
      console.warn('No riders found in database with type="rider"');
      ridersGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center;">No riders found in the database. Please add some riders in the admin interface.</p>';
      return;
    }
    
    // Log the first few documents to see what we're getting
    let debugCount = 0;
    snapshot.forEach(doc => {
      if (debugCount < 2) { // Just show the first 2 for debugging
        console.log(`Document ${doc.id}:`, doc.data());
        debugCount++;
      }
    });
    
    // Convert snapshot to array
    const allRiders = [];
    snapshot.forEach(doc => {
      // Add debug logging to see what we're working with
      const data = doc.data();
      
      // Check if this actually looks like a rider
      if (!data.firstName && !data.lastName && !data.fullName) {
        console.warn(`Document ${doc.id} appears to be missing rider name fields:`, data);
      }
      
      allRiders.push({
        id: doc.id,
        ...data
      });
    });
    
    console.log(`Extracted ${allRiders.length} total riders from Firestore`);
    
    // If we actually have riders, continue with the random selection
    if (allRiders.length > 0) {
      // Shuffle the array using Fisher-Yates algorithm
      for (let i = allRiders.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allRiders[i], allRiders[j]] = [allRiders[j], allRiders[i]];
      }
      
      // Select the first 3 (or fewer if less than 3 are available)
      const featuredRiders = allRiders.slice(0, Math.min(3, allRiders.length));
      console.log(`Selected ${featuredRiders.length} random riders to feature:`);
      featuredRiders.forEach((rider, index) => {
        console.log(`Featured rider ${index + 1}:`, rider.firstName, rider.lastName, rider.fullName);
      });
      
      // Clear the existing content
      ridersGrid.innerHTML = '';
      
      // Add each rider to the grid
      featuredRiders.forEach(data => {
        // Create rider card
        const riderCard = document.createElement('div');
        riderCard.className = 'rider-card';
        
        // Create rider image
        const riderImage = document.createElement('div');
        riderImage.className = 'rider-image';
        
        // If there's an image, set it as background, otherwise use placeholder
        if (data.imageUrl) {
          console.log('Using rider image URL:', data.imageUrl);
          riderImage.style.backgroundImage = `url('${data.imageUrl}')`;
        } else {
          console.log('No image for rider, using placeholder');
          // Check if we're in the homepage context
          const isHomepage = window.location.pathname.endsWith('/') || 
                            window.location.pathname.endsWith('/index.html') ||
                            window.location.pathname.endsWith('/vulcan/');
          
          // Use relative path based on current page
          const placeholderPath = isHomepage ? 'images/rider-placeholder.jpg' : '../images/rider-placeholder.jpg';
          console.log(`Using placeholder image: ${placeholderPath}`);
          riderImage.style.backgroundImage = `url('${placeholderPath}')`;
        }
        
        riderImage.style.backgroundSize = 'cover';
        riderImage.style.backgroundPosition = 'center';
        
        // Create rider info
        const riderInfo = document.createElement('div');
        riderInfo.className = 'rider-info';
        
        // Add rider name
        const riderName = document.createElement('h3');
        const displayName = data.fullName || `${data.firstName || ''} ${data.lastName || ''}`.trim();
        riderName.textContent = displayName || 'Unknown Rider';
        
        // Add rider bio (with fallback)
        const riderBio = document.createElement('p');
        riderBio.textContent = data.bio || 'No biography available.';
        
        // Add rider category (with fallback)
        const riderCategory = document.createElement('span');
        riderCategory.className = 'category';
        // Format category to be capitalized
        const categoryText = data.category ? 
          data.category.charAt(0).toUpperCase() + data.category.slice(1) : 
          'Junior';
        riderCategory.textContent = categoryText;
        
        // Assemble the card
        riderInfo.appendChild(riderName);
        riderInfo.appendChild(riderBio);
        riderInfo.appendChild(riderCategory);
        
        riderCard.appendChild(riderImage);
        riderCard.appendChild(riderInfo);
        
        // Add the card to the grid
        ridersGrid.appendChild(riderCard);
        console.log(`Added rider card for ${displayName} to the grid`);
      });
    } else {
      console.warn('Found documents but no valid riders to display');
      ridersGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center;">No valid riders found. Please check the database.</p>';
    }
  } catch (error) {
    console.error('Error loading featured riders:', error);
    ridersGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: red;">Error loading featured riders. Please check the console for details.</p>';
  }
  
  console.log('=== Completed loadFeaturedRiders function ===');
}

// Load news articles for the news page
async function loadNewsArticles() {
  try {
    // Get the news container
    const newsContainer = document.querySelector('.news-container');
    if (!newsContainer) {
      console.log('News container not found');
      return;
    }
    
    // Get published news articles
    const snapshot = await db.collection('content')
      .where('type', '==', 'news')
      .where('status', '==', 'published')
      .orderBy('date', 'desc')
      .get();
    
    // If there are no articles, show a message
    if (snapshot.empty) {
      newsContainer.innerHTML = '<p class="no-content">No news articles found.</p>';
      return;
    }
    
    // Clear the existing content
    newsContainer.innerHTML = '';
    
    // Add each article to the container
    snapshot.forEach(doc => {
      const data = doc.data();
      
      // Create article card
      const articleCard = document.createElement('div');
      articleCard.className = 'news-card';
      
      // Create article image
      const articleImage = document.createElement('div');
      articleImage.className = 'news-image';
      
      // If there's an image, set it as background
      if (data.imageUrl) {
        articleImage.style.backgroundImage = `url('${data.imageUrl}')`;
        articleImage.style.backgroundSize = 'cover';
        articleImage.style.backgroundPosition = 'center';
      }
      
      // Create article info
      const articleInfo = document.createElement('div');
      articleInfo.className = 'news-info';
      
      // Add article title
      const articleTitle = document.createElement('h3');
      articleTitle.textContent = data.title;
      
      // Add article date
      const articleDate = document.createElement('p');
      articleDate.className = 'news-date';
      articleDate.textContent = formatDate(data.date);
      
      // Add article excerpt
      const articleExcerpt = document.createElement('p');
      articleExcerpt.textContent = data.excerpt;
      
      // Add read more link
      const readMoreLink = document.createElement('a');
      readMoreLink.href = `article.html?id=${doc.id}`;
      readMoreLink.className = 'read-more';
      readMoreLink.textContent = 'Read More';
      
      // Assemble the card
      articleInfo.appendChild(articleTitle);
      articleInfo.appendChild(articleDate);
      articleInfo.appendChild(articleExcerpt);
      articleInfo.appendChild(readMoreLink);
      
      articleCard.appendChild(articleImage);
      articleCard.appendChild(articleInfo);
      
      // Add the card to the container
      newsContainer.appendChild(articleCard);
    });
  } catch (error) {
    console.error('Error loading news articles:', error);
  }
}

// Load race results for the results page
async function loadRaceResults() {
  try {
    // Get the results container
    const resultsContainer = document.querySelector('.results-container');
    if (!resultsContainer) {
      console.log('Results container not found');
      return;
    }
    
    // Get race results
    const snapshot = await db.collection('content')
      .where('type', '==', 'result')
      .orderBy('createdAt', 'desc')
      .get();
    
    // If there are no results, show a message
    if (snapshot.empty) {
      resultsContainer.innerHTML = '<p class="no-content">No race results found.</p>';
      return;
    }
    
    // Group results by race
    const resultsByRace = {};
    
    // Process each result
    for (const doc of snapshot.docs) {
      const data = doc.data();
      
      // Get the race and rider details
      const raceDoc = await db.collection('content').doc(data.raceId).get();
      const riderDoc = await db.collection('content').doc(data.riderId).get();
      
      if (!raceDoc.exists || !riderDoc.exists) {
        continue;
      }
      
      const race = raceDoc.data();
      const rider = riderDoc.data();
      
      // Add the race to the results object if it doesn't exist
      if (!resultsByRace[data.raceId]) {
        resultsByRace[data.raceId] = {
          title: race.title,
          date: race.date,
          location: race.location,
          results: []
        };
      }
      
      // Add the result to the race
      resultsByRace[data.raceId].results.push({
        position: data.position,
        rider: rider.fullName,
        time: data.time,
        notes: data.notes
      });
    }
    
    // Clear the existing content
    resultsContainer.innerHTML = '';
    
    // Add each race to the container
    Object.values(resultsByRace).forEach(race => {
      // Create race card
      const raceCard = document.createElement('div');
      raceCard.className = 'race-card';
      
      // Add race title
      const raceTitle = document.createElement('h3');
      raceTitle.textContent = race.title;
      
      // Add race details
      const raceDetails = document.createElement('p');
      raceDetails.className = 'race-details';
      raceDetails.textContent = `${formatDate(race.date)} | ${race.location}`;
      
      // Create results table
      const resultsTable = document.createElement('table');
      resultsTable.className = 'results-table';
      
      // Add table header
      const tableHeader = document.createElement('thead');
      tableHeader.innerHTML = `
        <tr>
          <th>Position</th>
          <th>Rider</th>
          <th>Time</th>
          <th>Notes</th>
        </tr>
      `;
      
      // Add table body
      const tableBody = document.createElement('tbody');
      
      // Sort results by position
      race.results.sort((a, b) => a.position - b.position);
      
      // Add each result to the table
      race.results.forEach(result => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${result.position}</td>
          <td>${result.rider}</td>
          <td>${result.time || 'N/A'}</td>
          <td>${result.notes || ''}</td>
        `;
        tableBody.appendChild(row);
      });
      
      // Assemble the table
      resultsTable.appendChild(tableHeader);
      resultsTable.appendChild(tableBody);
      
      // Assemble the card
      raceCard.appendChild(raceTitle);
      raceCard.appendChild(raceDetails);
      raceCard.appendChild(resultsTable);
      
      // Add the card to the container
      resultsContainer.appendChild(raceCard);
    });
  } catch (error) {
    console.error('Error loading race results:', error);
    resultsContainer.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: red;">Error loading race results. Please check the console for details.</p>';
  }
}

// Load a single news article for the article page
async function loadNewsArticle() {
  try {
    // Get the article ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    
    if (!articleId) {
      console.log('No article ID provided');
      return;
    }
    
    // Get the article container
    const articleContainer = document.querySelector('.article-container');
    if (!articleContainer) {
      console.log('Article container not found');
      return;
    }
    
    // Get the article
    const doc = await db.collection('content').doc(articleId).get();
    
    if (!doc.exists) {
      articleContainer.innerHTML = '<p class="no-content">Article not found.</p>';
      return;
    }
    
    const data = doc.data();
    
    // Create article header
    const articleHeader = document.createElement('div');
    articleHeader.className = 'article-header';
    
    // Add article title
    const articleTitle = document.createElement('h2');
    articleTitle.textContent = data.title;
    
    // Add article date
    const articleDate = document.createElement('p');
    articleDate.className = 'article-date';
    articleDate.textContent = formatDate(data.date);
    
    // Create article content
    const articleContent = document.createElement('div');
    articleContent.className = 'article-content';
    
    // If there's an image, add it
    if (data.imageUrl) {
      const articleImage = document.createElement('img');
      articleImage.src = data.imageUrl;
      articleImage.alt = data.title;
      articleImage.className = 'article-image';
      articleContent.appendChild(articleImage);
    }
    
    // Add article content
    const articleText = document.createElement('div');
    articleText.className = 'article-text';
    articleText.innerHTML = formatContent(data.content);
    articleContent.appendChild(articleText);
    
    // Assemble the article
    articleHeader.appendChild(articleTitle);
    articleHeader.appendChild(articleDate);
    
    // Clear the existing content
    articleContainer.innerHTML = '';
    
    // Add the article to the container
    articleContainer.appendChild(articleHeader);
    articleContainer.appendChild(articleContent);
  } catch (error) {
    console.error('Error loading news article:', error);
    articleContainer.innerHTML = '<p style="text-align: center; color: red;">Error loading news article. Please check the console for details.</p>';
  }
}

// Format date for display
function formatDate(dateString) {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Format content for display (convert newlines to paragraphs)
function formatContent(content) {
  if (!content) return '';
  
  // Split content by newlines
  const paragraphs = content.split('\n\n');
  
  // Convert each paragraph to a <p> tag
  return paragraphs.map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');
}

// Function to load latest news for homepage
function loadLatestNews() {
  console.log('Loading latest news for homepage');
  const newsGrid = document.querySelector('.news-grid');
  
  if (!newsGrid) {
    console.error('News grid not found');
    return;
  }
  
  // Clear loading message
  newsGrid.innerHTML = '';
  
  // Always create 3 grid columns
  for (let i = 0; i < 3; i++) {
    const gridCell = document.createElement('div');
    gridCell.className = 'news-grid-cell';
    gridCell.dataset.position = i;
    newsGrid.appendChild(gridCell);
  }
  
  // Use limit to reduce data transfer on mobile
  const isMobile = window.innerWidth <= 768;
  const limit = isMobile ? 3 : 6; // Load fewer items on mobile
  
  // Query Firestore with limit for better mobile performance
  db.collection('content')
    .where('type', '==', 'news')
    .limit(limit)
    .get()
    .then((querySnapshot) => {
      console.log(`Found ${querySnapshot.size} news items`);
      console.log('Query snapshot details:', querySnapshot);
      
      if (querySnapshot.empty) {
        console.log('No news articles found in database');
        newsGrid.innerHTML = `
          <div style="text-align: center; padding: 2rem; grid-column: 1 / -1;">
            <p>No news articles available yet.</p>
            <p style="font-size: 0.8rem; color: #999;">Check if articles exist in the database.</p>
          </div>
        `;
        return;
      }
      
      // Convert to array for sorting
      const articles = [];
      querySnapshot.forEach((doc) => {
        const article = doc.data();
        let articleDate;
        
        // Parse the date properly
        if (article.date) {
          if (article.date.toDate) {
            // Firestore timestamp
            articleDate = article.date.toDate();
          } else if (typeof article.date === 'string') {
            // ISO string or other string format
            articleDate = new Date(article.date);
          } else if (article.date.seconds) {
            // Firestore timestamp in serialized form
            articleDate = new Date(article.date.seconds * 1000);
          } else {
            // Default to now
            articleDate = new Date();
          }
        } else {
          // If no date, use a recent date
          articleDate = new Date();
        }
        
        articles.push({
          id: doc.id,
          ...article,
          parsedDate: articleDate
        });
      });
      
      // Sort by date descending (newest first)
      articles.sort((a, b) => b.parsedDate - a.parsedDate);
      
      // Take only the first 3
      const latestArticles = articles.slice(0, 3);
      
      console.log(`Displaying ${latestArticles.length} latest news articles`);
      
      // Display each article in its grid cell
      latestArticles.forEach((article, index) => {
        const formattedDate = formatDate(article.parsedDate);
        
        // Create excerpt from content (shorter on mobile)
        const excerptLength = isMobile ? 80 : 120;
        const excerpt = article.content 
          ? article.content.substring(0, excerptLength) + (article.content.length > excerptLength ? '...' : '') 
          : 'No content available';
        
        // Get the grid cell for this position
        const gridCell = document.querySelector(`.news-grid-cell[data-position="${index}"]`);
        if (!gridCell) return;
        
        // Create news card
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';
        
        // Add image section (top of card)
        const imageSection = document.createElement('div');
        imageSection.className = 'news-image';
        
        // If there's an image, set it as background with lazy loading
        if (article.imageUrl) {
          // Use lazy loading for images
          const img = new Image();
          img.onload = () => {
            imageSection.style.backgroundImage = `url('${article.imageUrl}')`;
            imageSection.style.opacity = '1';
          };
          img.src = article.imageUrl;
          imageSection.style.opacity = '0.5';
          imageSection.style.transition = 'opacity 0.3s ease';
        } else {
          // Use placeholder image if no image is available
          imageSection.style.backgroundImage = "url('images/news-placeholder.jpg')";
        }
        
        // Add content section (bottom of card)
        const contentSection = document.createElement('div');
        contentSection.className = 'news-info';
        
        // Add date
        const dateElement = document.createElement('div');
        dateElement.className = 'news-date';
        dateElement.textContent = formattedDate;
        
        // Add title
        const titleElement = document.createElement('h3');
        titleElement.textContent = article.title || 'Untitled';
        
        // Add excerpt
        const excerptElement = document.createElement('p');
        excerptElement.textContent = excerpt;
        
        // Add read more link
        const readMoreLink = document.createElement('a');
        readMoreLink.href = `news/detail.html?id=${article.id}`;
        readMoreLink.className = 'read-more';
        readMoreLink.textContent = 'Read More';
        
        // Assemble the card
        contentSection.appendChild(dateElement);
        contentSection.appendChild(titleElement);
        contentSection.appendChild(excerptElement);
        contentSection.appendChild(readMoreLink);
        
        newsCard.appendChild(imageSection);
        newsCard.appendChild(contentSection);
        
        // Add the card to the grid cell
        gridCell.appendChild(newsCard);
      });
    })
    .catch((error) => {
      console.error('Error loading news:', error);
      
      // Check if it's a CORS/security rules error
      if (error.message && error.message.includes('access control checks')) {
        newsGrid.innerHTML = `
          <div style="text-align: center; padding: 2rem; grid-column: 1 / -1;">
            <p>Database access temporarily unavailable. Please check back later.</p>
            <p style="font-size: 0.8rem; color: #999;">Error: ${error.message}</p>
          </div>
        `;
      } else {
        newsGrid.innerHTML = `
          <div style="text-align: center; padding: 2rem; grid-column: 1 / -1;">
            <p>Error loading news. Please try again later.</p>
          </div>
        `;
      }
    });
}

// Function to load upcoming races for homepage
function loadUpcomingRaces() {
  console.log('Loading upcoming races for homepage');
  const racesList = document.querySelector('.races-list');
  
  if (!racesList) {
    console.error('Races list not found');
    return;
  }
  
  // Clear loading message
  racesList.innerHTML = '';
  
  // Get current date
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  console.log('Current date for comparison:', today);
  
  // Query Firestore for all races - no complex queries that require indexes
  db.collection('content')
    .where('type', '==', 'race')
    .get()
    .then((querySnapshot) => {
      console.log(`Found ${querySnapshot.size} total races, filtering for upcoming ones`);
      
      // Filter races client-side to handle date format variations
      const allRaces = [];
      querySnapshot.forEach(doc => {
        const race = doc.data();
        console.log(`Race "${race.title}" date type:`, race.date ? typeof race.date : 'undefined');
        
        let raceDate;
        // Handle different possible date formats
        if (race.date) {
          if (race.date.toDate) {
            // Firestore timestamp - create date without timezone conversion
            const timestamp = race.date.toDate();
            // Create date in UTC to avoid timezone issues
            raceDate = new Date(Date.UTC(
              timestamp.getFullYear(),
              timestamp.getMonth(),
              timestamp.getDate(),
              12, 0, 0 // noon UTC to avoid date shifting
            ));
          } else if (typeof race.date === 'string') {
            // ISO string or other string format - parse without timezone conversion
            if (race.date.includes('T')) {
              // ISO format with time part - parse directly
              raceDate = new Date(race.date);
            } else {
              // Simple date string like "2025-03-22" - parse in UTC
              const [year, month, day] = race.date.split('-').map(Number);
              raceDate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
            }
          } else if (race.date.seconds) {
            // Firestore timestamp in serialized form - create date without timezone conversion
            const timestamp = new Date(race.date.seconds * 1000);
            raceDate = new Date(Date.UTC(
              timestamp.getFullYear(),
              timestamp.getMonth(),
              timestamp.getDate(),
              12, 0, 0 // noon UTC to avoid date shifting
            ));
          } else {
            // Fall back to today (shouldn't happen)
            raceDate = new Date();
          }
          
          console.log(`Race "${race.title}" parsed date:`, raceDate);
          
          allRaces.push({
            id: doc.id,
            ...race,
            parsedDate: raceDate
          });
        } else {
          console.warn(`Race "${race.title || 'Untitled'}" has no date property`);
        }
      });
      
      // Filter for upcoming races only
      const upcomingRaces = allRaces.filter(race => race.parsedDate >= today);
      
      // Sort races by date (ascending)
      upcomingRaces.sort((a, b) => a.parsedDate - b.parsedDate);
      
      // Take only the first 3
      const racesToShow = upcomingRaces.slice(0, 3);
      
      console.log(`Showing ${racesToShow.length} upcoming races`);
      
      if (racesToShow.length === 0) {
        racesList.innerHTML = `
          <div style="text-align: center; padding: 2rem;">
            <p>No upcoming races scheduled.</p>
          </div>
        `;
        return;
      }
      
      // Create a card for each race
      racesToShow.forEach((race) => {
        // Format date preserving the original date without timezone shifting
        let formattedDate;
        if (race.parsedDate) {
          // Format in UTC to avoid timezone shifting
          formattedDate = race.parsedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC' // This prevents date shifts due to timezone
          });
        } else {
          formattedDate = "Date TBD";
        }
        
        // Create race card
        const raceCard = document.createElement('div');
        raceCard.className = 'race-card';
        
        // Build card HTML
        raceCard.innerHTML = `
          <div class="race-info">
            <div class="race-date">${formattedDate}</div>
            <h3 class="race-title">${race.title || 'Untitled Race'}</h3>
            <p class="race-location">${race.location || 'Location TBD'}</p>
          </div>
          <a href="races/detail.html?id=${race.id}" class="race-details-button">Details</a>
        `;
        
        racesList.appendChild(raceCard);
      });
    })
    .catch((error) => {
      console.error('Error loading races:', error);
      racesList.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
          <p>Error loading races. Please try again later.</p>
        </div>
      `;
    });
}

// Load all races for the races page
async function loadAllRaces() {
  console.log('=== Starting loadAllRaces function ===');
  
  // Debug flag to enable extra logging
  const DEBUG = true;
  
  try {
    // Get the races container
    const racesContainer = document.querySelector('.races-container');
    if (!racesContainer) {
      console.error('ERROR: Races container not found on races page. Selector ".races-container" did not match any elements.');
      // Add a global error message
      document.body.innerHTML += '<div style="background: red; color: white; padding: 10px; position: fixed; top: 0; left: 0; right: 0; z-index: 9999;">Error: Races container element not found</div>';
      return;
    }
    
    if (DEBUG) console.log('Found races container:', racesContainer);
    
    // Show loading indicator
    racesContainer.innerHTML = '<div style="text-align: center; padding: 2rem;"><p>Loading races from Firestore...</p></div>';
    
    // Get today's date at midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    console.log('Current date for race filtering:', today);
    
    // Make sure Firebase is initialized
    if (!db) {
      console.log('Firestore not initialized yet, initializing Firebase...');
      if (!initFirebase()) {
        racesContainer.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: red;">Error initializing Firebase. Please check the console for details.</p>';
        return;
      }
    }
    
    // Get all races - no complex queries that require indexes
    if (DEBUG) console.log('Querying Firestore for races with type="race"...');
    
    const snapshot = await db.collection('content')
      .where('type', '==', 'race')
      .get();
    
    console.log(`Found ${snapshot.size} total races`);
    
    // Separate races into upcoming and past
    const upcomingRaces = [];
    const pastRaces = [];
    
    snapshot.forEach(doc => {
      const race = doc.data();
      let raceDate;
      
      // Handle different possible date formats
      if (race.date) {
        if (race.date.toDate) {
          // Firestore timestamp - create date without timezone conversion
          const timestamp = race.date.toDate();
          raceDate = new Date(Date.UTC(
            timestamp.getFullYear(),
            timestamp.getMonth(),
            timestamp.getDate(),
            12, 0, 0 // noon UTC to avoid date shifting
          ));
        } else if (typeof race.date === 'string') {
          // ISO string or other string format - parse without timezone conversion
          if (race.date.includes('T')) {
            // ISO format with time part - parse directly
            raceDate = new Date(race.date);
          } else {
            // Simple date string like "2025-03-22" - parse in UTC
            const [year, month, day] = race.date.split('-').map(Number);
            raceDate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
          }
        } else if (race.date.seconds) {
          // Firestore timestamp in serialized form - create date without timezone conversion
          const timestamp = new Date(race.date.seconds * 1000);
          raceDate = new Date(Date.UTC(
            timestamp.getFullYear(),
            timestamp.getMonth(),
            timestamp.getDate(),
            12, 0, 0 // noon UTC to avoid date shifting
          ));
        } else {
          // Fall back to today (shouldn't happen)
          raceDate = new Date();
        }
        
        if (DEBUG) console.log(`Race "${race.title}" (${doc.id}) - date type:`, typeof race.date);
        if (DEBUG) console.log(`Race "${race.title}" (${doc.id}) - parsed date:`, raceDate);
        
        if (raceDate >= today) {
          upcomingRaces.push({
            id: doc.id,
            ...race,
            parsedDate: raceDate
          });
        } else {
          pastRaces.push({
            id: doc.id,
            ...race,
            parsedDate: raceDate
          });
        }
      } else {
        console.warn(`Race ${doc.id} has no date property:`, race);
      }
    });
    
    // Sort races by date
    upcomingRaces.sort((a, b) => a.parsedDate - b.parsedDate);
    pastRaces.sort((a, b) => b.parsedDate - a.parsedDate); // Reverse order for past races
    
    console.log(`Found ${upcomingRaces.length} upcoming races and ${pastRaces.length} past races`);
    
    // Clear the existing content
    racesContainer.innerHTML = '';
    
    // Add upcoming races section
    const upcomingSection = document.createElement('section');
    upcomingSection.className = 'races-section';
    
    const upcomingTitle = document.createElement('h2');
    upcomingTitle.className = 'section-title';
    upcomingTitle.textContent = 'Upcoming Races';
    upcomingSection.appendChild(upcomingTitle);
    
    const upcomingList = document.createElement('div');
    upcomingList.className = 'races-list';
    
    // If there are no upcoming races, show a message
    if (upcomingRaces.length === 0) {
      upcomingList.innerHTML = '<p style="text-align: center;">No upcoming races found.</p>';
    } else {
      // Add each upcoming race to the list
      upcomingRaces.forEach(race => {
        // Create race card
        const raceCard = document.createElement('div');
        raceCard.className = 'race-card';
        
        // Format date preserving the original date without timezone shifting
        let dateString;
        if (race.parsedDate) {
          // Format in UTC to avoid timezone shifting
          dateString = race.parsedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC' // Use UTC to avoid timezone shifts
          });
        } else {
          dateString = "Date TBD";
        }
        
        // Create race info section
        const raceInfo = document.createElement('div');
        raceInfo.className = 'race-info';
        
        raceInfo.innerHTML = `
          <p class="race-date">${dateString}</p>
          <h3 class="race-title">${race.title}</h3>
          <p class="race-location">${race.location || 'Location TBA'}</p>
        `;
        
        // Create race details button
        const detailsButton = document.createElement('a');
        detailsButton.href = `detail.html?id=${race.id}`;
        detailsButton.className = 'race-details-button';
        detailsButton.textContent = 'Race Details';
        
        // Assemble the card
        raceCard.appendChild(raceInfo);
        raceCard.appendChild(detailsButton);
        
        // Add the card to the list
        upcomingList.appendChild(raceCard);
      });
    }
    
    upcomingSection.appendChild(upcomingList);
    racesContainer.appendChild(upcomingSection);
    
    // Add past races section
    const pastSection = document.createElement('section');
    pastSection.className = 'races-section';
    
    const pastTitle = document.createElement('h2');
    pastTitle.className = 'section-title';
    pastTitle.textContent = 'Past Races';
    pastSection.appendChild(pastTitle);
    
    const pastList = document.createElement('div');
    pastList.className = 'races-list';
    
    // If there are no past races, show a message
    if (pastRaces.length === 0) {
      pastList.innerHTML = '<p style="text-align: center;">No past races found.</p>';
    } else {
      // Add each past race to the list
      pastRaces.forEach(race => {
        // Create race card
        const raceCard = document.createElement('div');
        raceCard.className = 'race-card';
        
        // Format date preserving the original date without timezone shifting
        let dateString;
        if (race.parsedDate) {
          // Format in UTC to avoid timezone shifting
          dateString = race.parsedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC' // Use UTC to avoid timezone shifts
          });
        } else {
          dateString = "Date TBD";
        }
        
        // Create race info section
        const raceInfo = document.createElement('div');
        raceInfo.className = 'race-info';
        
        raceInfo.innerHTML = `
          <p class="race-date">${dateString}</p>
          <h3 class="race-title">${race.title}</h3>
          <p class="race-location">${race.location || 'Location TBA'}</p>
        `;
        
        // Create race details button
        const detailsButton = document.createElement('a');
        detailsButton.href = `detail.html?id=${race.id}`;
        detailsButton.className = 'race-details-button';
        detailsButton.textContent = 'View Results';
        
        // Assemble the card
        raceCard.appendChild(raceInfo);
        raceCard.appendChild(detailsButton);
        
        // Add the card to the list
        pastList.appendChild(raceCard);
      });
    }
    
    pastSection.appendChild(pastList);
    racesContainer.appendChild(pastSection);
    
    console.log('=== Completed loadAllRaces function ===');
    
  } catch (error) {
    console.error('Error loading races:', error);
    const racesContainer = document.querySelector('.races-container');
    if (racesContainer) {
      racesContainer.innerHTML = '<p style="text-align: center; color: red;">Error loading races. Please try again later.</p>';
    }
  }
}

// Load single race details
async function loadRaceDetails() {
  console.log('Loading race details...');
  try {
    // Get the race ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const raceId = urlParams.get('id');
    
    if (!raceId) {
      console.error('No race ID provided in URL');
      document.querySelector('.race-detail-container').innerHTML = 
        '<div class="error-message">' +
        '<h3>Missing Race ID</h3>' +
        '<p>No race ID was provided in the URL. Please go back to the races page and select a race.</p>' +
        '</div>';
      return;
    }
    
    console.log('Loading race with ID:', raceId);
    
    // Get the race container - use the correct container selector from the HTML
    const raceContainer = document.querySelector('.race-detail-container');
    if (!raceContainer) {
      console.error('Race container not found on detail page, selector: .race-detail-container');
      return;
    }
    
    // Show loading message
    raceContainer.innerHTML = '<div style="text-align: center; padding: 2rem;"><p>Loading race details...</p></div>';
    
    // Get the race
    const doc = await db.collection('content').doc(raceId).get();
    
    if (!doc.exists) {
      console.error('Race document not found in Firestore');
      raceContainer.innerHTML = '<p class="no-content">Race not found. The race may have been deleted or the ID is incorrect.</p>';
      return;
    }
    
    const data = doc.data();
    console.log('Race data loaded:', data);
    
    // Parse the date
    let raceDate;
    if (data.date) {
      if (data.date.toDate) {
        // Firestore timestamp
        raceDate = data.date.toDate();
      } else if (typeof data.date === 'string') {
        // ISO string or other string format
        raceDate = new Date(data.date);
      } else if (data.date.seconds) {
        // Firestore timestamp in serialized form
        raceDate = new Date(data.date.seconds * 1000);
      } else {
        // Fall back to today
        raceDate = new Date();
      }
    } else {
      // No date provided
      raceDate = new Date();
    }
    
    // Format date
    const dateString = formatDate(raceDate);
    console.log('Formatted race date:', dateString);
    
    // Create race header
    const raceHeader = document.createElement('div');
    raceHeader.className = 'race-header';
    
    // Add race title and info
    raceHeader.innerHTML = `
      <h2>${data.title || 'Untitled Race'}</h2>
      <p class="race-date">${dateString}</p>
      <p class="race-location">${data.location || 'Location TBA'}</p>
    `;
    
    // Create race details
    const raceDetails = document.createElement('div');
    raceDetails.className = 'race-details';
    
    // Add race description and details
    raceDetails.innerHTML = `
      <h3>Description</h3>
      <p>${data.description || 'No description available.'}</p>
      <h3>Details</h3>
      <div class="details-content">${formatContent(data.details) || 'No details available.'}</div>
    `;
    
    // Get race results if available
    const resultsSection = document.createElement('div');
    resultsSection.className = 'race-results';
    
    const today = new Date();
    
    // Only show results if the race date has passed
    if (raceDate < today) {
      console.log('Race date has passed, checking for results');
      resultsSection.innerHTML = '<h3>Results</h3>';
      
      try {
        // Get results for this race
        const resultsSnapshot = await db.collection('content')
          .where('type', '==', 'result')
          .where('raceId', '==', raceId)
          .orderBy('position', 'asc')
          .get();
        
        console.log(`Found ${resultsSnapshot.size} results for this race`);
        
        if (resultsSnapshot.empty) {
          resultsSection.innerHTML += '<p>No results available yet.</p>';
        } else {
          // Create results table
          const resultsTable = document.createElement('table');
          resultsTable.className = 'results-table';
          
          // Add table header
          const tableHeader = document.createElement('thead');
          tableHeader.innerHTML = `
            <tr>
              <th>Position</th>
              <th>Rider</th>
              <th>Time</th>
              <th>Notes</th>
            </tr>
          `;
          
          // Add table body
          const tableBody = document.createElement('tbody');
          
          // Process each result and look up rider information
          for (const resultDoc of resultsSnapshot.docs) {
            const result = resultDoc.data();
            console.log('Processing result:', result);
            
            let riderName = 'Unknown Rider';
            
            // Try to get rider info if rider ID is available
            if (result.riderId) {
              try {
                const riderDoc = await db.collection('content').doc(result.riderId).get();
                if (riderDoc.exists) {
                  const rider = riderDoc.data();
                  if (rider.fullName) {
                    riderName = rider.fullName;
                  } else if (rider.firstName || rider.lastName) {
                    riderName = `${rider.firstName || ''} ${rider.lastName || ''}`.trim();
                  }
                }
              } catch (error) {
                console.error('Error loading rider info:', error);
              }
            } else if (result.riderName) {
              // If rider name is directly stored in the result
              riderName = result.riderName;
            }
            
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${result.position || 'N/A'}</td>
              <td>${riderName}</td>
              <td>${result.time || 'N/A'}</td>
              <td>${result.notes || ''}</td>
            `;
            
            tableBody.appendChild(row);
          }
          
          resultsTable.appendChild(tableHeader);
          resultsTable.appendChild(tableBody);
          resultsSection.appendChild(resultsTable);
        }
      } catch (error) {
        console.error('Error loading results:', error);
        resultsSection.innerHTML += '<p>Error loading results. Please try again later.</p>';
      }
    } else {
      console.log('Race is in the future, no results to show');
      resultsSection.innerHTML = '<h3>Results</h3><p>Results will be available after the race.</p>';
    }
    
    // Clear the existing content
    raceContainer.innerHTML = '';
    
    // Add the race details to the container
    raceContainer.appendChild(raceHeader);
    raceContainer.appendChild(raceDetails);
    raceContainer.appendChild(resultsSection);
    
    console.log('Race details displayed successfully');
  } catch (error) {
    console.error('Error loading race details:', error);
    const raceContainer = document.querySelector('.race-detail-container');
    if (raceContainer) {
      raceContainer.innerHTML = '<p style="text-align: center; color: red;">Error loading race details. Please try again later.</p>';
    }
  }
}

// Function to load all news articles for the news page (without requiring index)
function loadAllNewsNonIndexed() {
  console.log('Loading all news articles (non-indexed version)...');
  const newsContainer = document.querySelector('.news-container');
  
  if (!newsContainer) {
    console.error('News container not found');
    return;
  }
  
  // Clear loading message
  newsContainer.innerHTML = '';
  
  // Use pagination for mobile performance
  const isMobile = window.innerWidth <= 768;
  const pageSize = isMobile ? 6 : 12; // Load fewer items on mobile
  
  // Query Firestore for news articles with pagination
  db.collection('content')
    .where('type', '==', 'news')
    .limit(pageSize)
    .get()
    .then((querySnapshot) => {
      console.log(`Found ${querySnapshot.size} news articles`);
      
      if (querySnapshot.empty) {
        newsContainer.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
            <h3>No News Articles Found</h3>
            <p>Check back soon for the latest updates from Vulcan Cycling.</p>
          </div>
        `;
        return;
      }
      
      // Convert to array for sorting
      const articles = [];
      querySnapshot.forEach((doc) => {
        const article = doc.data();
        let articleDate;
        
        // Parse the date properly
        if (article.date) {
          if (article.date.toDate) {
            // Firestore timestamp
            articleDate = article.date.toDate();
          } else if (typeof article.date === 'string') {
            // ISO string or other string format
            articleDate = new Date(article.date);
          } else if (article.date.seconds) {
            // Firestore timestamp in serialized form
            articleDate = new Date(article.date.seconds * 1000);
          } else {
            // Default to now
            articleDate = new Date();
          }
        } else {
          // If no date, use a recent date
          articleDate = new Date();
        }
        
        articles.push({
          id: doc.id,
          ...article,
          parsedDate: articleDate
        });
      });
      
      // Sort by date descending (newest first)
      articles.sort((a, b) => b.parsedDate - a.parsedDate);
      
      console.log(`Displaying ${articles.length} sorted news articles`);
      
      // Create a card for each news article
      articles.forEach((article) => {
        const formattedDate = formatDate(article.parsedDate);
        
        // Create excerpt from content
        const excerpt = article.content 
          ? article.content.substring(0, 120) + (article.content.length > 120 ? '...' : '') 
          : 'No content available';
        
        // Create card element
        const articleCard = document.createElement('div');
        articleCard.className = 'news-card';
        
        // Build card HTML
        articleCard.innerHTML = `
          ${article.imageUrl ? `<img src="${article.imageUrl}" alt="${article.title}" class="news-image">` : ''}
          <div class="news-content">
            <div class="news-date">${formattedDate}</div>
            <h3 class="news-title">${article.title || 'Untitled'}</h3>
            <p class="news-excerpt">${excerpt}</p>
            <a href="detail.html?id=${article.id}" class="read-more">Read More</a>
          </div>
        `;
        
        newsContainer.appendChild(articleCard);
      });
    })
    .catch((error) => {
      console.error('Error loading news articles:', error);
      newsContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
          <h3>Error Loading News</h3>
          <p>There was a problem loading the news articles. Please try again later.</p>
          <p style="color: red; font-size: 0.8rem;">Error: ${error.message}</p>
        </div>
      `;
    });
}

// Function to load and display a single news article with mobile optimization
function loadNewsDetails() {
  console.log('Loading news article details');
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get('id');
  
  if (!articleId) {
    document.querySelector('.news-detail-container').innerHTML = `
      <div class="error-message">
        <h3>Article Not Found</h3>
        <p>The news article you're looking for could not be found.</p>
      </div>
      <a href="index.html" class="back-button">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 8H1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8 15L1 8L8 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Back to News
      </a>
    `;
    return;
  }
  
  // Check for cached article data
  const cachedArticle = localStorage.getItem(`article_${articleId}`);
  if (cachedArticle) {
    try {
      const article = JSON.parse(cachedArticle);
      displayArticle(article);
      return;
    } catch (e) {
      console.log('Invalid cached data, fetching fresh');
    }
  }
  
  // Query Firestore for the specific news article
  db.collection('content').doc(articleId).get()
    .then((doc) => {
      // Remove loading message
      const newsDetailContainer = document.querySelector('.news-detail-container');
      
      if (!doc.exists) {
        newsDetailContainer.innerHTML = `
          <div class="error-message">
            <h3>Article Not Found</h3>
            <p>The news article you're looking for could not be found.</p>
          </div>
          <a href="index.html" class="back-button">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 8H1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8 15L1 8L8 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Back to News
          </a>
        `;
        return;
      }
      
      const article = doc.data();
      
      // Cache the article data for faster loading
      localStorage.setItem(`article_${articleId}`, JSON.stringify(article));
      
      // Parse the date properly
      let articleDate;
      if (article.date) {
        if (article.date.toDate) {
          // Firestore timestamp
          articleDate = article.date.toDate();
        } else if (typeof article.date === 'string') {
          // ISO string or other string format
          articleDate = new Date(article.date);
        } else if (article.date.seconds) {
          // Firestore timestamp in serialized form
          articleDate = new Date(article.date.seconds * 1000);
        } else {
          // Default to now
          articleDate = new Date();
        }
      } else {
        // If no date, use current date
        articleDate = new Date();
      }
      
      const formattedDate = formatDate(articleDate);
      
      // Update page title
      document.title = `${article.title || 'News Article'} - Vulcan Cycling`;
      
      // Format content with paragraphs if needed
      const formattedContent = article.content ? article.content.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>') : 'No content available';
      
      // Build the article HTML
      newsDetailContainer.innerHTML = `
        <article class="news-article">
          <header class="article-header">
            <div class="article-metadata">
              <span class="article-date">${formattedDate}</span>
              ${article.author ? `<span class="article-author">By ${article.author}</span>` : ''}
            </div>
            <h1 class="article-title">${article.title || 'Untitled'}</h1>
          </header>
          
          ${article.imageUrl ? `
            <div class="article-featured-image">
              <img src="${article.imageUrl}" alt="${article.title || 'News image'}" class="article-image" loading="lazy">
            </div>
          ` : ''}
          
          <div class="article-content">
            <p>${formattedContent}</p>
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
        </article>
      `;
    })
    .catch((error) => {
      console.error('Error loading news article:', error);
      document.querySelector('.news-detail-container').innerHTML = `
        <div class="error-message">
          <h3>Error Loading Article</h3>
          <p>There was a problem loading the article. Please try again later.</p>
          <small>Error: ${error.message}</small>
        </div>
        <a href="index.html" class="back-button">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 8H1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 15L1 8L8 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Back to News
        </a>
      `;
    });
}

// Helper function to display cached article
function displayArticle(article) {
  const newsDetailContainer = document.querySelector('.news-detail-container');
  
  // Parse the date properly
  let articleDate;
  if (article.date) {
    if (article.date.toDate) {
      // Firestore timestamp
      articleDate = article.date.toDate();
    } else if (typeof article.date === 'string') {
      // ISO string or other string format
      articleDate = new Date(article.date);
    } else if (article.date.seconds) {
      // Firestore timestamp in serialized form
      articleDate = new Date(article.date.seconds * 1000);
    } else {
      // Default to now
      articleDate = new Date();
    }
  } else {
    // If no date, use current date
    articleDate = new Date();
  }
  
  const formattedDate = formatDate(articleDate);
  
  // Update page title
  document.title = `${article.title || 'News Article'} - Vulcan Cycling`;
  
  // Format content with paragraphs if needed
  const formattedContent = article.content ? article.content.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>') : 'No content available';
  
  // Build the article HTML
  newsDetailContainer.innerHTML = `
    <article class="news-article">
      <header class="article-header">
        <div class="article-metadata">
          <span class="article-date">${formattedDate}</span>
          ${article.author ? `<span class="article-author">By ${article.author}</span>` : ''}
        </div>
        <h1 class="article-title">${article.title || 'Untitled'}</h1>
      </header>
      
      ${article.imageUrl ? `
        <div class="article-featured-image">
          <img src="${article.imageUrl}" alt="${article.title || 'News image'}" class="article-image" loading="lazy">
        </div>
      ` : ''}
      
      <div class="article-content">
        <p>${formattedContent}</p>
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
    </article>
  `;
}

// Function to load all race results from Firestore
function loadAllResults() {
  console.log('Loading all results...');
  const resultsContainer = document.querySelector('.results-container');
  
  if (!resultsContainer) {
    console.error('Results container not found');
    return;
  }
  
  // Clear loading message
  resultsContainer.innerHTML = '';
  
  // First, fetch all races to get their dates
  db.collection('content')
    .where('type', '==', 'race')
    .get()
    .then(raceSnapshot => {
      // Create map of race IDs to race data (including dates)
      const racesMap = {};
      raceSnapshot.forEach(doc => {
        const raceData = doc.data();
        racesMap[doc.id] = {
          title: raceData.title,
          date: raceData.date,
          ...raceData
        };
      });
      
      console.log('Loaded races map:', racesMap);
      
      // Now query for results
      return db.collection('content')
        .where('type', '==', 'result')
        .get()
        .then(resultsSnapshot => {
          console.log(`Found ${resultsSnapshot.size} results`);
          
          if (resultsSnapshot.empty) {
            resultsContainer.innerHTML = `
              <div style="text-align: center; padding: 3rem;">
                <h3>No Results Found</h3>
                <p>Check back soon for race results from Vulcan Cycling team members.</p>
              </div>
            `;
            return;
          }
          
          // Convert to array for sorting
          const results = [];
          resultsSnapshot.forEach((doc) => {
            const result = doc.data();
            console.log('Processing result:', result);
            
            // Get race date from the race map
            let resultDate;
            if (result.raceId && racesMap[result.raceId] && racesMap[result.raceId].date) {
              // Use race date
              const raceDate = racesMap[result.raceId].date;
              
              if (typeof raceDate === 'string') {
                // For string dates like "2025-03-22", parse in UTC to avoid timezone issues
                if (raceDate.includes('T')) {
                  // ISO format with time part - parse directly
                  resultDate = new Date(raceDate);
                } else {
                  // Simple date string like "2025-03-22" - parse in UTC
                  const [year, month, day] = raceDate.split('-').map(Number);
                  resultDate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
                }
              } else if (raceDate.toDate) {
                // For Firestore timestamps, create date without timezone conversion
                const timestamp = raceDate.toDate();
                resultDate = new Date(Date.UTC(
                  timestamp.getFullYear(),
                  timestamp.getMonth(),
                  timestamp.getDate(),
                  12, 0, 0 // noon UTC to avoid date shifting
                ));
              } else if (raceDate.seconds) {
                // For serialized timestamps, create date without timezone conversion
                const timestamp = new Date(raceDate.seconds * 1000);
                resultDate = new Date(Date.UTC(
                  timestamp.getFullYear(),
                  timestamp.getMonth(), 
                  timestamp.getDate(),
                  12, 0, 0 // noon UTC to avoid date shifting
                ));
              } else {
                resultDate = new Date();
              }
              
              console.log(`Using race date for result: ${resultDate}`);
            } else {
              // Fallback to creation date
              if (result.createdAt) {
                if (result.createdAt.toDate) {
                  resultDate = result.createdAt.toDate();
                } else if (result.createdAt.seconds) {
                  resultDate = new Date(result.createdAt.seconds * 1000);
                } else {
                  resultDate = new Date();
                }
              } else {
                resultDate = new Date();
              }
              console.log(`Using fallback date for result: ${resultDate}`);
            }
            
            results.push({
              id: doc.id,
              date: resultDate,
              ...result
            });
          });
          
          // Sort by date (newest first)
          results.sort((a, b) => b.date - a.date);
          
          // Group results by race
          const resultsByRace = {};
          results.forEach(result => {
            if (!resultsByRace[result.raceTitle]) {
              resultsByRace[result.raceTitle] = {
                title: result.raceTitle,
                date: result.date,
                results: []
              };
            }
            resultsByRace[result.raceTitle].results.push(result);
          });
          
          // Get unique years from results
          const years = [...new Set(results.map(result => result.date.getFullYear()))];
          years.sort((a, b) => b - a); // Sort years descending
          
          // Create year toggle
          const yearToggleContainer = document.createElement('div');
          yearToggleContainer.style.textAlign = 'center';
          
          const yearToggle = document.createElement('div');
          yearToggle.className = 'year-toggle';
          years.forEach(year => {
            const button = document.createElement('button');
            button.textContent = `${year} Season`;
            button.dataset.year = year;
            // Set the current year (or first year) as active
            if (year === new Date().getFullYear() || (years.length > 0 && year === years[0])) {
              button.classList.add('active');
            }
            button.addEventListener('click', (e) => {
              // Update active button
              yearToggle.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
              e.target.classList.add('active');
              
              // Show/hide results sections based on year
              document.querySelectorAll('.race-results-section').forEach(section => {
                const sectionYear = new Date(section.dataset.date).getFullYear();
                section.style.display = sectionYear === parseInt(e.target.dataset.year) ? 'block' : 'none';
              });
            });
            yearToggle.appendChild(button);
          });
          
          // Add year toggle to container
          yearToggleContainer.appendChild(yearToggle);
          resultsContainer.appendChild(yearToggleContainer);
          
          // Create results HTML
          Object.values(resultsByRace).forEach(race => {
            const raceSection = document.createElement('div');
            raceSection.className = 'race-results-section';
            raceSection.dataset.date = race.date instanceof Date ? race.date.toISOString() : race.date;
            
            // Only show current year initially
            const currentYear = new Date().getFullYear();
            const raceYear = race.date instanceof Date ? race.date.getFullYear() : new Date(race.date).getFullYear();
            if (raceYear !== (years.length > 0 ? years[0] : currentYear)) {
              raceSection.style.display = 'none';
            }
            
            // Format the date without timezone conversion
            let formattedDate = "Unknown Date";
            
            if (race.date) {
              if (typeof race.date === 'string') {
                // If it's a string (YYYY-MM-DD format like "2025-03-22")
                const dateParts = race.date.split('-');
                if (dateParts.length === 3) {
                  const year = dateParts[0];
                  const month = parseInt(dateParts[1]) - 1; // JS months are 0-indexed
                  const day = parseInt(dateParts[2]);
                  
                  // Create a date in UTC to avoid timezone shifting, then format it
                  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                                     'July', 'August', 'September', 'October', 'November', 'December'];
                  
                  formattedDate = `${monthNames[month]} ${day}, ${year}`;
                } else {
                  formattedDate = race.date; // Use as-is if not in expected format
                }
              } else if (race.date instanceof Date) {
                // If it's a Date object, format with UTC
                formattedDate = race.date.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  timeZone: 'UTC' // Use UTC to avoid timezone shifts
                });
              }
            }
            
            // Add race header
            const raceHeader = document.createElement('div');
            raceHeader.className = 'race-header';
            raceHeader.textContent = `${race.title} - ${formattedDate}`;
            
            // Create results table
            const table = document.createElement('table');
            table.className = 'results-table';
            
            // Add table header
            const thead = document.createElement('thead');
            thead.innerHTML = `
              <tr>
                <th>RIDER</th>
                <th>CATEGORY</th>
                <th>POSITION</th>
                <th>TIME</th>
              </tr>
            `;
            table.appendChild(thead);
            
            // Add table body
            const tbody = document.createElement('tbody');
            race.results.forEach(result => {
              // Debug log to see what rider field we have
              console.log('Processing result rider:', result.rider, 'riderName:', result.riderName, 'name:', result.name);
              
              const row = document.createElement('tr');
              row.innerHTML = `
                <td>${result.rider || result.riderName || 'Unknown Rider'}</td>
                <td>${result.category || 'N/A'}</td>
                <td>${result.position || result.placement || 'N/A'}</td>
                <td>${result.time || 'N/A'}</td>
              `;
              tbody.appendChild(row);
            });
            
            table.appendChild(tbody);
            raceSection.appendChild(raceHeader);
            raceSection.appendChild(table);
            resultsContainer.appendChild(raceSection);
          });
          
          console.log('Results displayed successfully');
        });
    })
    .catch((error) => {
      console.error('Error loading results:', error);
      resultsContainer.innerHTML = `
        <div style="text-align: center; padding: 3rem;">
          <h3>Error Loading Results</h3>
          <p>There was an error loading the race results. Please try again later.</p>
        </div>
      `;
    });
}

// Helper function to format dates consistently
function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}