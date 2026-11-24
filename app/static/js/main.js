/**
 * Utkarsh Bhardwaj — Interactive Client Scripts
 * Features:
 * - Real-time HTMX active navigation tracking across all links & history
 * - Dynamic light/dark theme toggle with persistent storage
 * - Accessibility manager (contrast, motion, text scaling, readable spacing)
 * - Keyboard shortcuts (1-6 navigation, T theme, A accessibility, Esc close)
 * - Copy-to-clipboard with animated tooltip feedback
 * - Client-side interactive project filtering
 */

// Safe localStorage wrapper to prevent private-mode or strict-context crashes
function safeGetItem(key, fallback) {
    try {
        const val = localStorage.getItem(key);
        return val !== null ? val : fallback;
    } catch (e) {
        return fallback;
    }
}

function safeSetItem(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        // Storage restricted or quota exceeded
    }
}

// ============================================================================
// Theme Management
// ============================================================================
function initTheme() {
    const saved = safeGetItem('theme', 'dark');
    document.documentElement.setAttribute('data-theme', saved);
    updateThemeIcon(saved);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    safeSetItem('theme', nextTheme);
    updateThemeIcon(nextTheme);
}

function updateThemeIcon(theme) {
    const icon = document.getElementById('theme-icon');
    if (icon) {
        icon.textContent = theme === 'dark' ? '◐' : '◑';
    }
    const label = document.getElementById('theme-toggle-text');
    if (label) {
        label.textContent = theme;
    }
}

// ============================================================================
// Accessibility Preferences Management
// ============================================================================
function initA11y() {
    const textScale = safeGetItem('a11y_text', 'normal');
    const contrast = safeGetItem('a11y_contrast', 'normal');
    const motion = safeGetItem('a11y_motion', 'normal');
    const font = safeGetItem('a11y_font', 'normal');

    applyA11yText(textScale);
    applyA11yContrast(contrast);
    applyA11yMotion(motion);
    applyA11yFont(font);
}

function applyA11yText(size) {
    if (size === 'normal') {
        document.documentElement.removeAttribute('data-a11y-text');
    } else {
        document.documentElement.setAttribute('data-a11y-text', size);
    }
    safeSetItem('a11y_text', size);

    const segBtns = document.querySelectorAll('#a11y-text-segmented .seg-btn');
    segBtns.forEach(btn => {
        if (btn.getAttribute('data-text-size') === size) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function setA11yText(size) {
    applyA11yText(size);
}

function applyA11yContrast(mode) {
    if (mode === 'high') {
        document.documentElement.setAttribute('data-a11y-contrast', 'high');
    } else {
        document.documentElement.removeAttribute('data-a11y-contrast');
    }
    safeSetItem('a11y_contrast', mode);

    const btn = document.getElementById('a11y-contrast-btn');
    const label = document.getElementById('contrast-status-text');
    if (btn && label) {
        if (mode === 'high') {
            btn.classList.add('active');
            label.textContent = 'Enabled ✓';
        } else {
            btn.classList.remove('active');
            label.textContent = 'Disabled';
        }
    }
}

function toggleA11yContrast() {
    const current = safeGetItem('a11y_contrast', 'normal');
    const next = current === 'high' ? 'normal' : 'high';
    applyA11yContrast(next);
}

function applyA11yMotion(mode) {
    if (mode === 'reduced') {
        document.documentElement.setAttribute('data-a11y-motion', 'reduced');
    } else {
        document.documentElement.removeAttribute('data-a11y-motion');
    }
    safeSetItem('a11y_motion', mode);

    const btn = document.getElementById('a11y-motion-btn');
    const label = document.getElementById('motion-status-text');
    if (btn && label) {
        if (mode === 'reduced') {
            btn.classList.add('active');
            label.textContent = 'Reduced ✓';
        } else {
            btn.classList.remove('active');
            label.textContent = 'Disabled';
        }
    }
}

function toggleA11yMotion() {
    const current = safeGetItem('a11y_motion', 'normal');
    const next = current === 'reduced' ? 'normal' : 'reduced';
    applyA11yMotion(next);
}

function applyA11yFont(mode) {
    if (mode === 'readable') {
        document.documentElement.setAttribute('data-a11y-font', 'readable');
    } else {
        document.documentElement.removeAttribute('data-a11y-font');
    }
    safeSetItem('a11y_font', mode);

    const btn = document.getElementById('a11y-font-btn');
    const label = document.getElementById('font-status-text');
    if (btn && label) {
        if (mode === 'readable') {
            btn.classList.add('active');
            label.textContent = 'Enabled ✓';
        } else {
            btn.classList.remove('active');
            label.textContent = 'Disabled';
        }
    }
}

function toggleA11yFont() {
    const current = safeGetItem('a11y_font', 'normal');
    const next = current === 'readable' ? 'normal' : 'readable';
    applyA11yFont(next);
}

function resetA11y() {
    applyA11yText('normal');
    applyA11yContrast('normal');
    applyA11yMotion('normal');
    applyA11yFont('normal');
}

// Modal Toggle Functions
function openA11yModal() {
    const modal = document.getElementById('a11y-modal');
    if (modal) {
        modal.classList.add('open');
        modal.style.display = 'flex';
        initA11y();
    }
}

function closeA11yModal() {
    const modal = document.getElementById('a11y-modal');
    if (modal) {
        modal.classList.remove('open');
        modal.style.display = 'none';
    }
}

function handleA11yBackdropClick(event) {
    if (event.target === event.currentTarget || event.target.id === 'a11y-modal') {
        closeA11yModal();
    }
}

// ============================================================================
// Modal Management (Project Overview & Reports)
// ============================================================================
function closeModal() {
    const container = document.getElementById('modal-container');
    if (container) {
        container.innerHTML = '';
    }
}

function handleBackdropClick(event) {
    if (event.target.classList.contains('modal-backdrop')) {
        closeModal();
    }
}

// ============================================================================
// Robust Active Navigation Synchronization
// ============================================================================
function syncActiveNav(targetPath) {
    let raw = targetPath || window.location.pathname;
    let path = raw.split('?')[0].split('#')[0];
    if (path.length > 1 && path.endsWith('/')) {
        path = path.slice(0, -1);
    }
    if (!path) path = '/';

    let activeTab = 'about';
    if (path === '/' || path === '') {
        activeTab = 'about';
    } else if (path.startsWith('/myself')) {
        activeTab = 'myself';
    } else if (path.startsWith('/experience')) {
        activeTab = 'experience';
    } else if (path.startsWith('/projects')) {
        activeTab = 'projects';
    } else if (path.startsWith('/education')) {
        activeTab = 'education';
    } else if (path.startsWith('/skills')) {
        activeTab = 'skills';
    } else if (path.startsWith('/contact')) {
        activeTab = 'contact';
    } else {
        return;
    }

    const navLinks = document.querySelectorAll('#nav-container .nav-item');
    navLinks.forEach(link => {
        const tab = link.getAttribute('data-nav') ||
            (link.getAttribute('href') === '/' ? 'about' : link.getAttribute('href')?.replace('/', ''));

        if (tab === activeTab) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Intercept clicks on internal links to update navbar immediately
document.addEventListener('click', (e) => {
    const el = e.target.closest('a[hx-get], button[hx-get], a[href]');
    if (el) {
        const target = el.getAttribute('hx-target');
        if (target && target !== '#main-content' && target !== 'main-content') {
            return;
        }
        const dest = el.getAttribute('hx-get') || el.getAttribute('href');
        if (dest && !dest.startsWith('http') && !dest.startsWith('#') && !dest.startsWith('mailto:')) {
            syncActiveNav(dest);
        }
    }
});

// ============================================================================
// Copy to Clipboard
// ============================================================================
function copyEmail(email) {
    if (!email) email = 'utkarshbhardwajmail@gmail.com';
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
            showCopiedFeedback();
        }).catch(() => {
            fallbackCopyText(email);
        });
    } else {
        fallbackCopyText(email);
    }
}

function showCopiedFeedback() {
    const btn = document.getElementById('copy-email-btn');
    if (btn) {
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<span>Copied! ✓</span>';
        btn.classList.add('btn-copied');
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.classList.remove('btn-copied');
        }, 2000);
    }
}

function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        showCopiedFeedback();
    } catch (err) {
        console.error('Fallback copy failed', err);
    }
    document.body.removeChild(textArea);
}

// ============================================================================
// Interactive Project Filtering
// ============================================================================
function filterProjects(category) {
    const filterBtns = document.querySelectorAll('.filter-pill');
    filterBtns.forEach(btn => {
        if (btn.getAttribute('data-filter') === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category') || '';
        if (category === 'all' || cardCategory.includes(category)) {
            card.style.display = 'flex';
            card.style.animation = 'fadeIn 0.25s ease-out';
        } else {
            card.style.display = 'none';
        }
    });
}

// ============================================================================
// Keyboard Navigation & Shortcuts
// ============================================================================
document.addEventListener('keydown', (e) => {
    const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
    if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select' || document.activeElement?.isContentEditable) {
        if (e.key === 'Escape') {
            closeModal();
            closeA11yModal();
        }
        return;
    }

    // Ignore if holding modifier keys (Cmd, Ctrl, Alt) so browser shortcuts aren't hijacked
    if (e.metaKey || e.ctrlKey || e.altKey) {
        return;
    }

    const key = e.key ? e.key.toLowerCase() : '';

    if (key === 'escape') {
        closeModal();
        closeA11yModal();
        return;
    }

    // Toggle theme with 't'
    if (key === 't') {
        toggleTheme();
        return;
    }

    // Toggle accessibility modal with 'a' or '?'
    if (key === 'a' || key === '?') {
        const modal = document.getElementById('a11y-modal');
        if (modal && (modal.classList.contains('open') || modal.style.display === 'flex')) {
            closeA11yModal();
        } else {
            openA11yModal();
        }
        return;
    }

    // Quick navigation via numeric keys 1-7
    const numNavMap = {
        '1': 'about',
        '2': 'myself',
        '3': 'experience',
        '4': 'projects',
        '5': 'education',
        '6': 'skills',
        '7': 'contact'
    };

    let targetTab = numNavMap[e.key];
    if (!targetTab && e.code) {
        if (e.code.startsWith('Digit')) {
            targetTab = numNavMap[e.code.replace('Digit', '')];
        } else if (e.code.startsWith('Numpad')) {
            targetTab = numNavMap[e.code.replace('Numpad', '')];
        }
    }

    if (targetTab) {
        e.preventDefault();
        const targetLink = document.querySelector(`#nav-container [data-nav="${targetTab}"]`);
        if (targetLink) {
            targetLink.click();
        }
    }
});

// ============================================================================
// Lifecycle Hooks & History Listeners
// ============================================================================
function initApp() {
    initTheme();
    initA11y();
    syncActiveNav();

    // Attach direct listeners to utility triggers for robust execution
    const a11yBtn = document.getElementById('a11y-toggle-btn');
    if (a11yBtn) {
        a11yBtn.onclick = function (e) {
            e.preventDefault();
            e.stopPropagation();
            openA11yModal();
        };
    }

    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
        themeBtn.onclick = function (e) {
            e.preventDefault();
            toggleTheme();
        };
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

document.addEventListener('htmx:afterSwap', (e) => {
    if (e.detail?.target?.id === 'main-content') {
        const path = e.detail?.pathInfo?.requestPath || window.location.pathname;
        syncActiveNav(path);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

document.addEventListener('htmx:pushedIntoHistory', (e) => {
    const path = e.detail?.path || window.location.pathname;
    syncActiveNav(path);
});

window.addEventListener('popstate', () => {
    syncActiveNav(window.location.pathname);
});

// Global Window Exports
window.initTheme = initTheme;
window.toggleTheme = toggleTheme;
window.initA11y = initA11y;
window.openA11yModal = openA11yModal;
window.closeA11yModal = closeA11yModal;
window.setA11yText = setA11yText;
window.toggleA11yContrast = toggleA11yContrast;
window.toggleA11yMotion = toggleA11yMotion;
window.toggleA11yFont = toggleA11yFont;
window.resetA11y = resetA11y;
window.handleA11yBackdropClick = handleA11yBackdropClick;
window.closeModal = closeModal;
window.handleBackdropClick = handleBackdropClick;
window.copyEmail = copyEmail;
window.filterProjects = filterProjects;
window.syncActiveNav = syncActiveNav;
