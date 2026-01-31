// ============================================
// THEME TOGGLE FUNCTIONALITY
// Shared across all pages for consistent theme experience
// ============================================

/**
 * Initialize theme on page load
 * Light theme is default, checks localStorage for dark preference
 */
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  // Light is default, only apply dark if explicitly saved
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
  } else {
    // Default to light - ensure light-theme class is present
    document.body.classList.add('light-theme');
  }
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
    // Switch to light
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    localStorage.setItem('theme', 'light');
  } else {
    // Switch to dark
    body.classList.remove('light-theme');
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
