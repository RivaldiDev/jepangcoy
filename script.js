// ============================================
// THEME TOGGLE FUNCTIONALITY
// ============================================
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
  }
}

function toggleTheme() {
  const body = document.body;
  body.classList.toggle('light-theme');

  // Save preference to localStorage
  const theme = body.classList.contains('light-theme') ? 'light' : 'dark';
  localStorage.setItem('theme', theme);
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  loadProgress();
  updateProgressDisplay();

  // Add click event to theme toggle button
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
});

// Load and display progress

function loadProgress() {
  const saved = localStorage.getItem('n5_progress');
  return saved ? JSON.parse(saved) : {};
}

function updateProgressDisplay() {
  const progress = loadProgress();
  const lessonCards = document.querySelectorAll('.lesson-card');
  let completedCount = 0;
  let totalScore = 0;
  let totalCharacters = 0;

  lessonCards.forEach(card => {
    const lessonId = card.dataset.lesson;
    const lessonProgress = progress[lessonId];

    if (lessonProgress && lessonProgress.completed) {
      completedCount++;
      totalScore += lessonProgress.score || 0;

      // Add completed badge
      const badge = document.createElement('div');
      badge.style.cssText =
        'position: absolute; top: 1rem; right: 1rem; background: #22c55e; color: white; padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.75rem; font-weight: 600;';
      badge.textContent = '✓ Selesai';
      card.style.position = 'relative';
      card.appendChild(badge);

      // Update progress bar
      const progressFill = card.querySelector('.progress-fill');
      const progressText = card.querySelector('.progress-text');
      if (progressFill && progressText) {
        progressFill.style.width = lessonProgress.score + '%';
        progressText.textContent = lessonProgress.score + '%';
      }
    }
  });

  // Update overall progress
  document.getElementById('completedLessons').textContent = `${completedCount} / 9`;

  const avgScore = completedCount > 0 ? Math.round(totalScore / completedCount) : 0;
  document.getElementById('totalTime').textContent = `${completedCount * 5} menit`;

  // Calculate total characters mastered (Hiragana + Katakana)
  if (progress.hiragana && progress.hiragana.completed) totalCharacters += 46;
  if (progress.katakana && progress.katakana.completed) totalCharacters += 46;
  document.getElementById('masteredChars').textContent = totalCharacters;
}

// ============================================
// MOBILE MENU FUNCTIONALITY
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('active');

      // Change icon
      const icon = mobileMenuBtn.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.textContent = isExpanded ? 'menu' : 'close';
      }
    });

    // Close menu when clicking a link
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        const icon = mobileMenuBtn.querySelector('.material-symbols-outlined');
        if (icon) {
          icon.textContent = 'menu';
        }
      });
    });
  }
});

// ============================================
// TOUCH-FRIENDLY ENHANCEMENTS FOR MOBILE
// ============================================
if ('ontouchstart' in window) {
  document.body.classList.add('touch-device');

  // Add active states for touch feedback
  document.querySelectorAll('.character-item, .option-btn, .filter-btn, .btn, .tab').forEach(el => {
    el.addEventListener(
      'touchstart',
      function () {
        this.classList.add('touch-active');
      },
      { passive: true }
    );

    el.addEventListener(
      'touchend',
      function () {
        this.classList.remove('touch-active');
      },
      { passive: true }
    );
  });
}

// Prevent zoom on double-tap for buttons (iOS)
let lastTouchEnd = 0;
document.addEventListener(
  'touchend',
  e => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      e.preventDefault();
    }
    lastTouchEnd = now;
  },
  { passive: false }
);

// Smooth scroll for anchor links with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerOffset = window.innerWidth <= 768 ? 100 : 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  });
});
