// ./blog/blog.js
document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------
    // 1. Code Block Copy Functionality
    // -------------------------------
    // Select all <pre> elements that contain code blocks
    const codeBlocks = document.querySelectorAll('pre');

    codeBlocks.forEach(block => {
        // Create a copy button element
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerText = 'Copy';

        // Append the button to the pre element
        block.appendChild(copyButton);

        // Add click event listener to copy the code text
        copyButton.addEventListener('click', () => {
            // Get the code content inside the <code> tag
            const codeElement = block.querySelector('code');
            if (!codeElement) {
                console.warn('No code element found within the pre block.');
                return;
            }
            const codeText = codeElement.innerText;

            // Use the Clipboard API to write text
            navigator.clipboard.writeText(codeText).then(() => {
                copyButton.innerText = 'Copied!';
                setTimeout(() => {
                    copyButton.innerText = 'Copy';
                }, 2000);
            }).catch(err => {
                console.error('Error copying text: ', err);
            });
        });
    });

    // -------------------------------
    // 2. Back to Table of Contents Links
    // -------------------------------
    // First, ensure the Table of Contents nav has an id
    const toc = document.querySelector('nav.table-of-contents');
    if (toc) {
        // If it doesn't have an id, assign one (e.g., "table-of-contents")
        if (!toc.id) {
            toc.id = 'table-of-contents';
        }
    }

    // For each section with an id, prepend a "Back to Table of Contents" link
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        const tocLink = document.createElement('a');
        tocLink.href = '#table-of-contents';
        tocLink.className = 'toc-link';
        tocLink.textContent = 'Back to Table of Contents';

        // Insert the link at the top of the section
        section.insertBefore(tocLink, section.firstChild);
    });
});
