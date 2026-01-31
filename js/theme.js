// ============================================
// THEME TOGGLE FUNCTIONALITY
// Shared across all pages for consistent theme experience
// ============================================

/**
 * Initialize theme on page load
 * Light theme is default (no class needed), checks localStorage for dark preference
 */
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  // Light is default (no class), only apply dark if explicitly saved
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
  }
  // If no saved theme or saved as 'light', don't add any class (light is default)
}

/**
 * Toggle between light and dark themes
 * Saves preference to localStorage for persistence
 */
function toggleTheme() {
  const body = document.body;

  // Check current state
  const isDark = body.classList.contains('dark-theme');

  if (isDark) {
    // Switch to light - remove dark class
    body.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light');
  } else {
    // Switch to dark - add dark class
    body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
  }
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
