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
      tocLink.textContent = 'Back to Table of Contents';
      section.insertBefore(tocLink, section.firstChild);
    }
  });

  // -------------------------------
  // 3. Dynamic Blog Summary Rendering
  // -------------------------------
  fetch('assets/posts.json')
    .then(response => response.json())
    .then(posts => {
      const container = document.getElementById('posts-container');
      if (!container) return console.warn('posts-container not found.');
      posts.forEach(({ title, url, summary }) => {
        const card = document.createElement('article');
        card.className = 'post-card';
        card.innerHTML = `
          <h3><a href="${url}">${title}</a></h3>
          <p class="summary">${summary}</p>
          <a class="cta-button" href="${url}">Read More</a>
        `;
        container.appendChild(card);
      });
    })
    .catch(err => console.error('Failed to load posts.json', err));
});
