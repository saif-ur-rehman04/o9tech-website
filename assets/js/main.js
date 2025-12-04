/**
* Template Name: Arsha
* Template URL: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/
* Updated: Feb 22 2025 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Service Pages Back Button Handler
   * Prevents service pages from stacking in browser history
   * When user presses back from any service page, it goes directly to the page before services
   */
  (function() {
    const servicePages = ['service-mobile', 'service-web', 'service-blockchain', 'service-cloud', 'service-details'];
    
    function isServicePage(url) {
      if (!url) return false;
      try {
        const urlObj = url.startsWith('http') ? new URL(url) : new URL(url, window.location.origin);
        const page = urlObj.pathname.split('/').pop() || '';
        return servicePages.some(sp => page.includes(sp));
      } catch {
        const page = url.split('/').pop() || url;
        return servicePages.some(sp => page.includes(sp));
      }
    }

    const currentPath = window.location.pathname;
    const isCurrentServicePage = isServicePage(currentPath);

    if (isCurrentServicePage) {
      // Store entry point when first entering service pages
      const referrer = document.referrer;
      if (!sessionStorage.getItem('serviceEntryPoint')) {
        if (referrer && !isServicePage(referrer)) {
          sessionStorage.setItem('serviceEntryPoint', referrer);
        } else {
          sessionStorage.setItem('serviceEntryPoint', window.location.origin + '/index.html');
        }
      }

      // Mark that we're in service navigation mode
      sessionStorage.setItem('inServiceNavigation', 'true');

      // Immediate check: if we detect we might have navigated back to a service page, redirect
      // This handles cases where popstate doesn't fire
      if (referrer && isServicePage(referrer) && window.history.length > 1) {
        // We came from another service page - check if back button was used
        // by checking if history has multiple service pages
        const entryPoint = sessionStorage.getItem('serviceEntryPoint') || window.location.origin + '/index.html';
        // Use a small delay to ensure this doesn't interfere with normal navigation
        setTimeout(function() {
          // Only redirect if we're still on a service page and still in service navigation mode
          if (sessionStorage.getItem('inServiceNavigation') === 'true' && isServicePage(window.location.pathname)) {
            // Check if this looks like a back navigation (history length suggests it)
            // For now, we'll rely on popstate, but this is a safety net
          }
        }, 100);
      }

      // If we came from another service page, replace history to remove it
      if (referrer && isServicePage(referrer)) {
        // Replace current history entry to remove the previous service page
        const entryPoint = sessionStorage.getItem('serviceEntryPoint') || window.location.origin + '/index.html';
        window.history.replaceState({ servicePage: true, entryPoint: entryPoint }, '', window.location.href);
      } else {
        // First service page - store entry point in state
        const entryPoint = sessionStorage.getItem('serviceEntryPoint') || window.location.origin + '/index.html';
        window.history.replaceState({ servicePage: true, entryPoint: entryPoint }, '', window.location.href);
      }

      // Intercept clicks on service page links - use replace instead of push
      document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href*="service-"]');
        if (link) {
          let href = link.getAttribute('href');
          if (!href) return;
          
          // Handle relative URLs
          try {
            const fullUrl = new URL(href, window.location.origin).href;
            if (isServicePage(fullUrl)) {
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
              // Use location.replace to replace current history entry
              window.location.replace(fullUrl);
            }
          } catch (err) {
            // If URL parsing fails, check if it's a relative path
            if (isServicePage(href)) {
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
              const fullUrl = new URL(href, window.location.href).href;
              window.location.replace(fullUrl);
            }
          }
        }
      }, true);

      // Handle back button - intercept and redirect to entry point
      window.addEventListener('popstate', function(e) {
        // Always redirect to entry point when back button is pressed on service pages
        const entryPoint = sessionStorage.getItem('serviceEntryPoint') || window.location.origin + '/index.html';
        
        // Clear flags immediately
        sessionStorage.removeItem('inServiceNavigation');
        sessionStorage.removeItem('serviceEntryPoint');
        
        // Navigate immediately - use replace to avoid adding to history
        window.location.replace(entryPoint);
      });

      // Fallback: Check on page visibility change (when user might navigate back)
      document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
          // Page became visible again - check if we're still on a service page
          // and if referrer suggests we came from another service page
          const referrer = document.referrer;
          if (referrer && isServicePage(referrer) && sessionStorage.getItem('inServiceNavigation') === 'true') {
            // We might have navigated back to a service page, redirect to entry point
            const entryPoint = sessionStorage.getItem('serviceEntryPoint') || window.location.origin + '/index.html';
            sessionStorage.removeItem('inServiceNavigation');
            sessionStorage.removeItem('serviceEntryPoint');
            window.location.replace(entryPoint);
          }
        }
      });
    } else {
      // Clear service navigation flags when not on a service page
      sessionStorage.removeItem('serviceEntryPoint');
      sessionStorage.removeItem('inServiceNavigation');
    }
  })();

})();