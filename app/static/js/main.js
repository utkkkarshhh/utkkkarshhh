/**
 * Utkarsh Bhardwaj — Clean Client Scripts
 * Handles HTMX navigation state, theme switching, and modal management.
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

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// HTMX Lifecycle Hooks
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
