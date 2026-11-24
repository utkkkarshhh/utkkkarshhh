/**
 * Utkarsh Bhardwaj — Interactive Client Scripts
 * Features:
 * - HTMX navigation state sync & smooth transitions
 * - Dynamic light/dark theme toggle with persistent storage
 * - Keyboard shortcuts (1-6 navigation, T for theme, Esc for modal)
 * - Copy-to-clipboard with animated tooltip feedback
 * - Client-side interactive project filtering
 */

// Theme Management
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

// Modal Management
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

// Active Nav State Sync
function syncActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('#nav-container .nav-item');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '/' && href === '/') || (currentPath !== '/' && href !== '/' && currentPath.startsWith(href))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Copy to Clipboard with Feedback
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

// Interactive Project Filter
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

// Global Keyboard Navigation
document.addEventListener('keydown', (e) => {
    // If typing in an input or textarea, ignore shortcuts
    const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
    if (activeTag === 'input' || activeTag === 'textarea') {
        if (e.key === 'Escape') closeModal();
        return;
    }

    if (e.key === 'Escape') {
        closeModal();
        return;
    }

    // Toggle theme with 't' or 'T'
    if (e.key === 't' || e.key === 'T') {
        toggleTheme();
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
        const targetLink = document.querySelector(`#nav-container .nav-item[href="${targetUrl}"]`);
        if (targetLink && typeof htmx !== 'undefined') {
            htmx.ajax('GET', targetUrl, { target: '#main-content', pushUrl: targetUrl });
        } else if (targetLink) {
            window.location.href = targetUrl;
        }
    }
});

// Lifecycle Hooks
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    syncActiveNav();
});

document.addEventListener('htmx:afterSwap', () => {
    syncActiveNav();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.addEventListener('htmx:historyRestore', () => {
    syncActiveNav();
});
