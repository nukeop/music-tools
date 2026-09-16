export type Theme = 'light' | 'dark';

const storageKey = 'theme';

export function readInitialTheme(): Theme {
  const stored = localStorage.getItem(storageKey);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  if (matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  localStorage.setItem(storageKey, theme);
}

export function oppositeTheme(theme: Theme): Theme {
  if (theme === 'dark') {
    return 'light';
  }
  return 'dark';
}
