/**
 * Performance optimizations for Japanese Course website
 * Includes: lazy loading images, debounced handlers, intersection observer utilities
 */

// ============================================
// LAZY LOADING IMAGES
// ============================================

/**
 * Initialize lazy loading for images
 * Uses native lazy loading with Intersection Observer fallback
 */
function initLazyLoading() {
    // Check if native lazy loading is supported
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        // Just ensure all images below the fold have loading="lazy"
        document.querySelectorAll('img:not([loading])').forEach(img => {
            // Skip images in viewport or critical images
            const rect = img.getBoundingClientRect();
            if (rect.top > window.innerHeight) {
                img.loading = 'lazy';
            }
        });
    } else {
        // Fallback for browsers without native support
        initIntersectionObserverLazyLoad();
    }
}

/**
 * Intersection Observer based lazy loading fallback
 */
function initIntersectionObserverLazyLoad() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01
    });

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// DEBOUNCED SCROLL HANDLER
// ============================================

/**
 * Debounce function to limit how often a function can fire
 * @param {Function} func - Function to debounce
 * @param {number} wait - Milliseconds to wait
 * @returns {Function} Debounced function
 */
function debounce(func, wait = 100) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// ANIMATION PERFORMANCE
// ============================================

/**
 * Use Intersection Observer to trigger animations only when elements are visible
 * This improves performance by not running animations on off-screen elements
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    if (animatedElements.length === 0) return;

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => animationObserver.observe(el));
}

// ============================================
// FONT LOADING OPTIMIZATION
// ============================================

/**
 * Preload critical fonts to improve First Contentful Paint
 */
function preloadFonts() {
    const fonts = [
        { family: 'Noto Sans JP', weight: '400' },
        { family: 'Noto Sans JP', weight: '700' },
        { family: 'Zen Maru Gothic', weight: '400' }
    ];

    if ('fonts' in document) {
        fonts.forEach(font => {
            const fontFace = new FontFace(font.family, `local(${font.family})`, {
                weight: font.weight
            });
            fontFace.load().then(loadedFace => {
                document.fonts.add(loadedFace);
            }).catch(err => {
                console.warn('Font loading failed:', err);
            });
        });
    }
}

// ============================================
// RESOURCE HINTS
// ============================================

/**
 * Add DNS prefetch and preconnect hints for external resources
 */
function addResourceHints() {
    const domains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com'
    ];

    domains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    });
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize all performance optimizations
 */
function initPerformanceOptimizations() {
    // Don't run on server-side
    if (typeof window === 'undefined') return;

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runOptimizations);
    } else {
        runOptimizations();
    }
}

function runOptimizations() {
    initLazyLoading();
    initScrollAnimations();
    preloadFonts();
    addResourceHints();
}

// Auto-initialize
initPerformanceOptimizations();

// Export functions for manual use if needed
window.PerformanceUtils = {
    debounce,
    initLazyLoading,
    initScrollAnimations,
    preloadFonts
};
