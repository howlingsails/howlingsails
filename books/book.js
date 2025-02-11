/* ./books/book.js
   ============================
   Simple chapter pagination
   ============================
*/

document.addEventListener('DOMContentLoaded', () => {
    const chapters = document.querySelectorAll('.chapter');
    let currentChapter = 0;

    // Show the first chapter by default
    if (chapters.length > 0) {
        chapters[0].classList.add('active');
    }

    const nextBtn = document.getElementById('nextChapter');
    const prevBtn = document.getElementById('prevChapter');

    // Next Chapter
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            chapters[currentChapter].classList.remove('active');
            currentChapter = (currentChapter + 1) % chapters.length;
            chapters[currentChapter].classList.add('active');
        });
    }

    // Previous Chapter
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            chapters[currentChapter].classList.remove('active');
            currentChapter = (currentChapter - 1 + chapters.length) % chapters.length;
            chapters[currentChapter].classList.add('active');
        });
    }
});
