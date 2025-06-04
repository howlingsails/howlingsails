// blog/blog.js
// bring Mermaid aboard
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';

mermaid.initialize({
  startOnLoad: true,
  theme: 'base',
  themeVariables: {
    primaryColor:        '#40c000',
    primaryBorderColor:  '#36c2c2',
    secondaryColor:      '#a040c0',
    secondaryBorderColor:'#a040c0',
    tertiaryColor:       '#00c0c0',
    tertiaryBorderColor: '#00c0c0',
    lineColor:           '#00c0c0',
    primaryTextColor:    '#20252c',
    secondaryTextColor:  '#20252c',
    tertiaryTextColor:   '#20252c',
    textColor:           '#20252c',
    noteBkgColor:        '#00c0c0',
    noteBorderColor:     '#00c0c0',
    noteTextColor:       '#20252c'
  },
  themeCSS: `
    path, polyline, polygon, line {
      stroke-width: 3px !important;
    }
  `
});

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------
  // 1. Code Block Copy Functionality
  // -------------------------------
  const codeBlocks = document.querySelectorAll('pre');
  codeBlocks.forEach(block => {
    if (block.querySelector('.copy-button')) return; // prevent duplication

    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.innerText = 'Copy';
    block.appendChild(copyButton);

    copyButton.addEventListener('click', () => {
      const codeElement = block.querySelector('code');
      if (!codeElement) return console.warn('No code element found.');
      navigator.clipboard.writeText(codeElement.innerText)
        .then(() => {
          copyButton.innerText = 'Copied!';
          setTimeout(() => copyButton.innerText = 'Copy', 2000);
        })
        .catch(err => console.error('Copy failed', err));
    });
  });

  // -------------------------------
  // 2. Back to Table of Contents Links
  // -------------------------------
  const toc = document.querySelector('nav.table-of-contents');
  if (toc && !toc.id) toc.id = 'table-of-contents';

  document.querySelectorAll('section[id]').forEach(section => {
    if (!section.querySelector('.toc-link')) {
      const tocLink = document.createElement('a');
      tocLink.href = '#table-of-contents';
      tocLink.className = 'toc-link';
      tocLink.textContent = 'Table of Contents';
      section.insertBefore(tocLink, section.firstChild);
    }
  });

  // -------------------------------
  // 3. Load Blog Posts
  // -------------------------------
  const postsContainer = document.getElementById('posts-container');
  if (postsContainer) {
  fetch('assets/posts.json')
    .then(response => response.json())
    .then(posts => {
      const container = document.getElementById('posts-container')
      if (!container) return console.warn('posts-container not found.')
      posts.forEach(({ title, url, summary, callToAction, buttonTitle }) => {
        const card = document.createElement('article')
        card.className = 'post-card'
        card.innerHTML = `
          <h3><a href="${url}">${title}</a></h3>
          <p class="summary">${summary}</p>
          <a
            class="cta-button"
            href="${url}"
            title="${buttonTitle || callToAction}"
          >
            ${callToAction || 'Read More'}
          </a>
        `
        container.appendChild(card)
      })
    })
    .catch(err => console.error('Failed to load posts.json', err));
  }

  // -------------------------------
  // Hamburger Menu Functionality
  // -------------------------------
  const hamburgerToggle = document.getElementById('hamburger-toggle');
  const hamburgerMenu = document.getElementById('hamburger-menu');
  const hamburgerList = hamburgerMenu ? hamburgerMenu.querySelector('ul') : null;

  // Helper to build menu items from TOC
  function buildHamburgerMenu() {
    if (!hamburgerList) return;
    hamburgerList.innerHTML = '';

    // 1. Go back to cap10.tech home page
    const homeLi = document.createElement('li');
    const homeA = document.createElement('a');
    homeA.href = '/index.html';
    homeA.textContent = '← cap10.tech Home';
    homeLi.appendChild(homeA);
    hamburgerList.appendChild(homeLi);

    // 2. Go back to Cap10 Library
    const libLi = document.createElement('li');
    const libA = document.createElement('a');
    libA.href = '/blog/blog.html';
    libA.textContent = '← Cap10 Library';
    libLi.appendChild(libA);
    hamburgerList.appendChild(libLi);

    // 3. Scroll to top
    const topLi = document.createElement('li');
    const topA = document.createElement('a');
    topA.href = '#';
    topA.textContent = '↑ Scroll to Top';
    topA.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Optionally close menu after scroll
      hamburgerMenu.hidden = true;
      hamburgerToggle.setAttribute('aria-expanded', 'false');
    });
    topLi.appendChild(topA);
    hamburgerList.appendChild(topLi);

    // 4. TOC links
    const toc = document.querySelector('nav.table-of-contents');
    if (toc) {
      toc.querySelectorAll('a').forEach(a => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = a.getAttribute('href');
        link.textContent = a.textContent;
        li.appendChild(link);
        hamburgerList.appendChild(li);
      });
    }
  }

  if (hamburgerToggle && hamburgerMenu) {
    hamburgerToggle.addEventListener('click', () => {
      const expanded = hamburgerToggle.getAttribute('aria-expanded') === 'true';
      hamburgerToggle.setAttribute('aria-expanded', String(!expanded));
      hamburgerMenu.hidden = !hamburgerMenu.hidden;
      if (!hamburgerMenu.hidden) {
        buildHamburgerMenu();
      }
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (
        hamburgerMenu &&
        !hamburgerMenu.hidden &&
        !hamburgerMenu.contains(e.target) &&
        e.target !== hamburgerToggle
      ) {
        hamburgerMenu.hidden = true;
        hamburgerToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu on link click (delegated)
    hamburgerMenu.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        hamburgerMenu.hidden = true;
        hamburgerToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // --- Hamburger menu show/hide on scroll (mobile only) ---
    let lastScrollY = window.scrollY;
    let ticking = false;
    function handleScroll() {
      //if (window.innerWidth > 900) return; // Only on mobile/tablet
      if (!hamburgerMenu.hidden) return; // Don't auto-show if menu is open
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10 || currentScrollY > -10) {
        hamburgerToggle.style.display = '';
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        hamburgerToggle.style.display = '';
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        hamburgerToggle.style.display = 'none';
      }
      lastScrollY = currentScrollY;
      ticking = false;
    }
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    });
    // Ensure toggle is visible on resize
    window.addEventListener('resize', function() {
      if (window.innerWidth > 900) {
        hamburgerToggle.style.display = '';
      }
    });
  }
});
