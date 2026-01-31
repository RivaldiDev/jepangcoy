// ============================================
// THEME TOGGLE FUNCTIONALITY
// Shared across all pages for consistent theme experience
// ============================================

/**
 * Initialize theme on page load
 * Checks localStorage for saved theme preference and applies it
 */
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
}

/**
 * Toggle between light and dark themes
 * Saves preference to localStorage for persistence
 */
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('light-theme');

    // Save preference to localStorage
    const theme = body.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
}

// Initialize theme immediately when script loads
initTheme();

// Add event listener when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
});
