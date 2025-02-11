document.addEventListener('DOMContentLoaded', () => {
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
            const codeText = block.querySelector('code').innerText;

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
});
