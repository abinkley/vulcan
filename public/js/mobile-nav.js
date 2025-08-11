// Mobile Navigation Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Add mobile menu button to the header if it doesn't exist
  const headerContainer = document.querySelector('.header-container');
  const nav = document.querySelector('nav');
  
  if (headerContainer && nav) {
    // Add main-nav class to the navigation for targeting in CSS
    nav.classList.add('main-nav');
    
    // Create mobile menu button if it doesn't exist
    if (!document.querySelector('.mobile-menu-button')) {
      const menuButton = document.createElement('button');
      menuButton.className = 'mobile-menu-button';
      menuButton.setAttribute('aria-label', 'Toggle navigation menu');
      menuButton.innerHTML = '☰';  // Hamburger icon
      
      // Insert the button after the logo but before the nav
      const logo = document.querySelector('.logo');
      if (logo) {
        logo.parentNode.insertBefore(menuButton, logo.nextSibling);
      } else {
        headerContainer.insertBefore(menuButton, nav);
      }
      
      // Add event listener to toggle menu
      menuButton.addEventListener('click', function() {
        nav.classList.toggle('active');
        
        // Change icon based on state
        if (nav.classList.contains('active')) {
          menuButton.innerHTML = '✕';  // Close icon
        } else {
          menuButton.innerHTML = '☰';  // Hamburger icon
        }
      });
      
      // Close mobile menu when a link is clicked
      const navLinks = nav.querySelectorAll('a');
      navLinks.forEach(link => {
        link.addEventListener('click', function() {
          if (window.innerWidth <= 768) {
            nav.classList.remove('active');
            menuButton.innerHTML = '☰';
          }
        });
      });
      
      // Close mobile menu when clicking outside
      document.addEventListener('click', function(e) {
        const isClickInsideNav = nav.contains(e.target);
        const isClickOnButton = menuButton.contains(e.target);
        
        if (!isClickInsideNav && !isClickOnButton && nav.classList.contains('active')) {
          nav.classList.remove('active');
          menuButton.innerHTML = '☰';
        }
      });
    }
  }
  
  // Handle window resize
  window.addEventListener('resize', function() {
    const nav = document.querySelector('.main-nav');
    const menuButton = document.querySelector('.mobile-menu-button');
    
    if (nav && window.innerWidth > 768 && nav.classList.contains('active')) {
      nav.classList.remove('active');
      if (menuButton) {
        menuButton.innerHTML = '☰';
      }
    }
  });
}); 