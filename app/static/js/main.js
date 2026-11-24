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

// ============================================================================
// Theme Management
// ============================================================================
function initTheme() {
    const saved = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    updateThemeIcon(saved);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    updateThemeIcon(nextTheme);
}

function updateThemeIcon(theme) {
    const icon = document.getElementById('theme-icon');
    if (icon) {
        icon.textContent = theme === 'dark' ? '◐' : '◑';
    }
}

// ============================================================================
// Accessibility Preferences Management
// ============================================================================
function initA11y() {
    const textScale = localStorage.getItem('a11y_text') || 'normal';
    const contrast = localStorage.getItem('a11y_contrast') || 'normal';
    const motion = localStorage.getItem('a11y_motion') || 'normal';
    const font = localStorage.getItem('a11y_font') || 'normal';

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
    localStorage.setItem('a11y_text', size);

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
    localStorage.setItem('a11y_contrast', mode);

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
    const current = localStorage.getItem('a11y_contrast') || 'normal';
    const next = current === 'high' ? 'normal' : 'high';
    applyA11yContrast(next);
}

function applyA11yMotion(mode) {
    if (mode === 'reduced') {
        document.documentElement.setAttribute('data-a11y-motion', 'reduced');
    } else {
        document.documentElement.removeAttribute('data-a11y-motion');
    }
    localStorage.setItem('a11y_motion', mode);

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
    const current = localStorage.getItem('a11y_motion') || 'normal';
    const next = current === 'reduced' ? 'normal' : 'reduced';
    applyA11yMotion(next);
}

function applyA11yFont(mode) {
    if (mode === 'readable') {
        document.documentElement.setAttribute('data-a11y-font', 'readable');
    } else {
        document.documentElement.removeAttribute('data-a11y-font');
    }
    localStorage.setItem('a11y_font', mode);

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
    const current = localStorage.getItem('a11y_font') || 'normal';
    const next = current === 'readable' ? 'normal' : 'readable';
    applyA11yFont(next);
}

function resetA11y() {
    applyA11yText('normal');
    applyA11yContrast('normal');
    applyA11yMotion('normal');
    applyA11yFont('normal');
}

function openA11yModal() {
    const modal = document.getElementById('a11y-modal');
    if (modal) {
        modal.style.display = 'flex';
        // Refresh toggle button states
        initA11y();
    }
}

function closeA11yModal() {
    const modal = document.getElementById('a11y-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function handleA11yBackdropClick(event) {
    if (event.target.id === 'a11y-modal') {
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
    // Strip query string and hash
    let path = raw.split('?')[0].split('#')[0];
    if (path.length > 1 && path.endsWith('/')) {
        path = path.slice(0, -1);
    }
    if (!path) path = '/';

    let activeTab = 'about';
    if (path === '/' || path === '') {
        activeTab = 'about';
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
        let href = link.getAttribute('href') || link.getAttribute('hx-get') || '';
        href = href.split('?')[0].split('#')[0];
        if (href.length > 1 && href.endsWith('/')) {
            href = href.slice(0, -1);
        }
        if (!href) href = '/';

        let linkTab = 'about';
        if (href.startsWith('/experience')) linkTab = 'experience';
        else if (href.startsWith('/projects')) linkTab = 'projects';
        else if (href.startsWith('/education')) linkTab = 'education';
        else if (href.startsWith('/skills')) linkTab = 'skills';
        else if (href.startsWith('/contact')) linkTab = 'contact';
        else if (href === '/') linkTab = 'about';

        if (linkTab === activeTab) {
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
        // If it targets a modal or isn't a page navigation, don't change navbar
        const target = el.getAttribute('hx-target');
        if (target && target !== '#main-content') {
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
    navigator.clipboard.writeText(email).then(() => {
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
    }).catch(err => {
        console.error('Failed to copy email:', err);
    });
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
    if (activeTag === 'input' || activeTag === 'textarea') {
        if (e.key === 'Escape') {
            closeModal();
            closeA11yModal();
        }
        return;
    }

    if (e.key === 'Escape') {
        closeModal();
        closeA11yModal();
        return;
    }

    // Toggle theme with 't' or 'T'
    if (e.key === 't' || e.key === 'T') {
        toggleTheme();
        return;
    }

    // Toggle accessibility modal with 'a' or 'A' or '?'
    if (e.key === 'a' || e.key === 'A' || e.key === '?') {
        const modal = document.getElementById('a11y-modal');
        if (modal && modal.style.display === 'flex') {
            closeA11yModal();
        } else {
            openA11yModal();
        }
        return;
    }

    // Quick navigation via numeric keys 1-6
    const keyMap = {
        '1': '/',
        '2': '/experience',
        '3': '/projects',
        '4': '/education',
        '5': '/skills',
        '6': '/contact'
    };

    if (keyMap[e.key]) {
        const targetUrl = keyMap[e.key];
        syncActiveNav(targetUrl);
        if (typeof htmx !== 'undefined') {
            htmx.ajax('GET', targetUrl, { target: '#main-content', pushUrl: targetUrl });
        } else {
            window.location.href = targetUrl;
        }
    }
});

// ============================================================================
// Lifecycle Hooks & History Listeners
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initA11y();
    syncActiveNav();
});

document.addEventListener('htmx:afterSwap', (e) => {
    if (e.detail?.target?.id === 'main-content') {
        const path = e.detail?.pathInfo?.requestPath || window.location.pathname;
        syncActiveNav(path);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

document.addEventListener('htmx:afterSettle', () => {
    setTimeout(() => syncActiveNav(window.location.pathname), 10);
});

document.addEventListener('htmx:pushedIntoHistory', (e) => {
    const path = e.detail?.path || window.location.pathname;
    syncActiveNav(path);
});

window.addEventListener('popstate', () => {
    syncActiveNav(window.location.pathname);
});
