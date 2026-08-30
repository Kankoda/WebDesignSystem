

document.querySelectorAll('.faq-item').forEach(details => {
  const summary = details.querySelector('.faq-item-title');
  const body = details.querySelector('.faq-item-body');

  summary.addEventListener('click', e => {
    e.preventDefault();

    if (details.open) {
      const anim = body.animate(
        [{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-6px)' }],
        { duration: 200, easing: 'ease-in', fill: 'forwards' }
      );
      anim.onfinish = () => { details.open = false; body.style.animation = ''; };
    } else {
      details.open = true;
      body.animate(
        [{ opacity: 0, transform: 'translateY(-6px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 250, easing: 'ease-out', fill: 'forwards' }
      );
    }
  });
});

/**
 * Header Scroll Detection
 * Adds 'scrolled' class to header when page is scrolled down more than 50px
 */
(function() {
  const header = document.querySelector('header');
  if (!header) return;

  function updateHeaderState() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  // Initial check
  updateHeaderState();

  // Listen for scroll events
  window.addEventListener('scroll', updateHeaderState, { passive: true });
})();

/**
 * Mobile Menu Toggle
 * Handles hamburger menu toggle for mobile navigation
 */

(function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('header[role="banner"] nav');

  if (!menuToggle || !nav) return;

  menuToggle.addEventListener('click', function() {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('open');
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    const isClickInside = menuToggle.contains(event.target) || nav.contains(event.target);

    if (!isClickInside && nav.classList.contains('open')) {
      menuToggle.classList.remove('active');
      nav.classList.remove('open');
    }
  });

  // Close menu on window resize if it's above mobile breakpoint
  window.addEventListener('resize', function() {
    if (window.innerWidth > 700 && nav.classList.contains('open')) {
      menuToggle.classList.remove('active');
      nav.classList.remove('open');
    }
  });
})();

/**
 * Footer Toggle
 * Handles collapsible footer sections on mobile
 */

(function() {
  // Only enable toggle behavior on mobile
  function isMobile() {
    return window.innerWidth <= 700;
  }

  const footerToggles = document.querySelectorAll('footer .toggle');

  footerToggles.forEach(function(toggle) {
    toggle.addEventListener('click', function() {
      if (!isMobile()) return;

      const content = toggle.nextElementSibling;
      const isOpen = content.classList.contains('open');

      // Toggle the section
      toggle.classList.toggle('active');
      content.classList.toggle('open');
    });
  });

  // Reset footer state on resize
  window.addEventListener('resize', function() {
    if (!isMobile()) {
      // Remove all mobile classes when switching to desktop
      footerToggles.forEach(function(toggle) {
        toggle.classList.remove('active');
        const content = toggle.nextElementSibling;
        content.classList.remove('open');
      });
    }
  });
})();

/**
 * Code Box Labels
 * Reads Rouge language classes and turns them into title-bar labels.
 */

(function() {
  const blocks = document.querySelectorAll('div.highlighter-rouge, div.highlight, figure.highlight');
  if (!blocks.length) return;

  const aliases = {
    bash: 'Shell',
    console: 'Shell',
    css: 'CSS',
    html: 'HTML',
    javascript: 'JavaScript',
    js: 'JavaScript',
    json: 'JSON',
    markdown: 'Markdown',
    md: 'Markdown',
    plaintext: 'Code',
    ruby: 'Ruby',
    sass: 'Sass',
    scss: 'SCSS',
    shell: 'Shell',
    sh: 'Shell',
    swift: 'Swift',
    terminal: 'Shell',
    text: 'Code',
    ts: 'TypeScript',
    typescript: 'TypeScript',
    xml: 'XML',
    yaml: 'YAML',
    yml: 'YAML',
    zsh: 'Shell'
  };

  function findLanguageClass(element) {
    const own = Array.from(element.classList).find(function(name) {
      return name.startsWith('language-');
    });

    if (own) return own;

    const nested = element.querySelector('[class*="language-"]');
    if (!nested) return null;

    return Array.from(nested.classList).find(function(name) {
      return name.startsWith('language-');
    }) || null;
  }

  function formatLanguage(raw) {
    if (!raw) return 'Code';
    if (aliases[raw]) return aliases[raw];

    return raw
      .replace(/[-_]+/g, ' ')
      .replace(/\b\w/g, function(char) { return char.toUpperCase(); });
  }

  const clipboardIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="4" rx="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path></svg>';
  const checkIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';

  blocks.forEach(function(block) {
    if (block.dataset.language) return;

    const languageClass = findLanguageClass(block);
    const rawLanguage = languageClass
      ? languageClass.replace('language-', '').toLowerCase()
      : '';

    block.dataset.language = formatLanguage(rawLanguage);
  });

  blocks.forEach(function(block) {
    const btn = document.createElement('button');
    btn.className = 'code-copy-btn';
    btn.setAttribute('aria-label', 'Copy code');
    btn.innerHTML = clipboardIcon;

    btn.addEventListener('click', function() {
      const pre = block.querySelector('pre') || block.querySelector('code');
      if (!pre) return;
      const text = pre.innerText || pre.textContent;
      navigator.clipboard.writeText(text).then(function() {
        btn.innerHTML = checkIcon;
        btn.classList.add('copied');
        setTimeout(function() {
          btn.innerHTML = clipboardIcon;
          btn.classList.remove('copied');
        }, 2000);
      });
    });

    block.appendChild(btn);
  });
})();

/**
 * Slide-in Reveal
 * Reveals elements with the .slide-in class as they enter the viewport.
 */

(function() {
  const elements = document.querySelectorAll('.slide-in');
  if (!elements.length) return;

  document.documentElement.classList.add('motion-ready');

  function reveal(element) {
    element.classList.add('is-visible');
  }

  if (!('IntersectionObserver' in window)) {
    elements.forEach(reveal);
    return;
  }

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      reveal(entry.target);
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -5% 0px'
  });

  elements.forEach(function(element) {
    observer.observe(element);
  });
})();

(function() {
  const nav = document.querySelector('.side-menu');
  const content = document.querySelector('.side-menu-content');

  if (!nav || !content) return;

  const links = Array.from(nav.querySelectorAll('a[href^="#"]'));
  const topLink = nav.querySelector('[data-side-menu-top="true"]');
  const headingLinks = links.filter((link) => link !== topLink);
  const headings = headingLinks
    .map((link) => {
      const id = decodeURIComponent(link.getAttribute('href').slice(1));
      const heading = content.querySelector(`h2[id="${CSS.escape(id)}"]`);
      return heading ? { link, heading } : null;
    })
    .filter(Boolean);

  if (!topLink && !headings.length) return;

  let activeLink = null;

  function currentOffset() {
    const header = document.querySelector('header[role="banner"]');
    const headerHeight = header ? header.getBoundingClientRect().height : 0;
    return headerHeight + 32;
  }

  function setActiveLink(nextActiveLink) {
    if (!nextActiveLink || nextActiveLink === activeLink) return;
    activeLink = nextActiveLink;

    links.forEach((link) => {
      const isActive = link === nextActiveLink;
      link.classList.toggle('is-active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  function pageIsAtTop() {
    return window.scrollY <= 4;
  }

  function pageIsAtBottom() {
    return window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
  }

  function updateActiveLink() {
    const offset = currentOffset();
    if (pageIsAtTop()) {
      setActiveLink(topLink || headings[0].link);
      return;
    }

    if (!headings.length) {
      setActiveLink(topLink);
      return;
    }

    if (pageIsAtBottom()) {
      setActiveLink(headings[headings.length - 1].link);
      return;
    }

    const scrollPosition = window.scrollY + offset;
    let active = headings[0].link;

    for (let index = 0; index < headings.length; index += 1) {
      const current = headings[index];
      const next = headings[index + 1];
      const currentTop = current.heading.offsetTop;
      const nextTop = next ? next.heading.offsetTop : Number.POSITIVE_INFINITY;
      const sectionBoundary = next ? currentTop + ((nextTop - currentTop) / 2) : Number.POSITIVE_INFINITY;

      if (scrollPosition < sectionBoundary) {
        active = current.link;
        break;
      }

      active = current.link;
    }

    setActiveLink(active);
  }

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      if (link === topLink) {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      setActiveLink(link);
    });
  });

  nav.classList.add('no-transitions');
  updateActiveLink();
  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      nav.classList.remove('no-transitions');
    });
  });

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  window.addEventListener('resize', updateActiveLink);
  window.addEventListener('hashchange', updateActiveLink);
})();

(function() {
  const button = document.querySelector('.scroll-to-top');
  if (!button) return;

  function updateVisibility() {
    button.classList.toggle('is-visible', window.scrollY > 300);
  }

  button.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  updateVisibility();
  window.addEventListener('scroll', updateVisibility, { passive: true });
})();

(function () {
  window.Pagination = function (options) {
    var items = options.items;
    var perPage = options.perPage || 20;
    var containerEl = options.containerEl;
    var paginationEl = options.paginationEl;
    var onPageChange = options.onPageChange;
    var currentPage = 1;

    function totalPages(filteredItems) {
      return Math.max(1, Math.ceil(filteredItems.length / perPage));
    }

    function getPageItems(filteredItems) {
      var start = (currentPage - 1) * perPage;
      return filteredItems.slice(start, start + perPage);
    }

    function pageNumbers(total, current) {
      if (total <= 6) return Array.from({ length: total }, function (_, i) { return i + 1; });
      if (current <= 3) return [1, 2, 3, 4, "...", total];
      if (current >= total - 2) return [1, "...", total - 3, total - 2, total - 1, total];
      return [1, "...", current - 1, current, current + 1, "...", total];
    }

    function render(filteredItems) {
      var total = totalPages(filteredItems);
      if (currentPage > total) currentPage = 1;

      var pageItems = getPageItems(filteredItems);
      items.forEach(function (item) {
        item.style.display = pageItems.includes(item) ? "" : "none";
      });

      if (!paginationEl) return;
      if (total <= 1) {
        paginationEl.innerHTML = "";
        return;
      }

      var pages = pageNumbers(total, currentPage);
      var html = "<button class=\"pagination-prev\" data-page=\"" + (currentPage - 1) + "\"" + (currentPage === 1 ? " disabled" : "") + ">&#8592;</button>";
      pages.forEach(function (p) {
        if (p === "...") {
          html += "<span class=\"pagination-ellipsis\">&#8230;</span>";
        } else {
          html += "<button class=\"pagination-page" + (p === currentPage ? " active" : "") + "\" data-page=\"" + p + "\">" + p + "</button>";
        }
      });
      html += "<button class=\"pagination-next\" data-page=\"" + (currentPage + 1) + "\"" + (currentPage === total ? " disabled" : "") + ">&#8594;</button>";

      paginationEl.innerHTML = html;
      paginationEl.querySelectorAll("button[data-page]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          if (btn.disabled) return;
          currentPage = parseInt(btn.dataset.page);
          if (onPageChange) onPageChange();
          if (containerEl) containerEl.scrollIntoView({ behavior: "smooth" });
        });
      });
    }

    function reset() {
      currentPage = 1;
    }

    return { render: render, reset: reset };
  };
})();

(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const tagButtons = document.querySelectorAll(".blog .side-menu .tag[data-tag]");
    const searchInput = document.querySelector(".blog-search");
    const posts = Array.from(document.querySelectorAll(".blog-post"));
    const paginationEl = document.querySelector(".pagination");
    if (!posts.length) return;

    const pagination = window.Pagination({
      items: posts,
      perPage: 20,
      paginationEl: paginationEl,
      containerEl: document.querySelector(".blog-header"),
      onPageChange: applyFilters
    });

    let activeTag = null;
    let searchQuery = "";

    function getMatchingPosts() {
      return posts.filter(function (post) {
        const tags = post.dataset.tags ? post.dataset.tags.split(",") : [];
        const matchesTag = !activeTag || tags.includes(activeTag);
        const matchesSearch = !searchQuery ||
          post.dataset.title.includes(searchQuery) ||
          post.dataset.excerpt.includes(searchQuery) ||
          tags.some(function (t) { return t.includes(searchQuery); });
        return matchesTag && matchesSearch;
      });
    }

    function applyFilters() {
      tagButtons.forEach(function (b) {
        const isActive = b.dataset.tag === activeTag;
        b.classList.toggle("active", isActive);
        b.classList.toggle("inactive", !!activeTag && !isActive);
        b.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
      pagination.render(getMatchingPosts());
    }

    tagButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        activeTag = activeTag === btn.dataset.tag ? null : btn.dataset.tag;
        pagination.reset();
        applyFilters();
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", function () {
        searchQuery = searchInput.value.trim().toLowerCase();
        pagination.reset();
        applyFilters();
      });
    }

    applyFilters();
  });
})();

