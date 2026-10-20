// Theme Toggle and Navigation Helper
(function() {
  const root = document.documentElement;
  const storageKey = 'macstats_theme';

  function getPreferredTheme() {
    const saved = localStorage.getItem(storageKey);
    if (saved) return saved;
    return 'system';
  }

  function applyTheme(theme) {
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
      root.setAttribute('data-theme', theme);
    }
  }

  // Initial apply
  applyTheme(getPreferredTheme());

  // Listen for system changes if system
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (localStorage.getItem(storageKey) === 'system' || !localStorage.getItem(storageKey)) {
      root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });

  window.toggleTheme = function() {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(storageKey, next);
    applyTheme(next);
  };
})();
