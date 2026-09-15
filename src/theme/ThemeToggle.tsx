import { Icon } from '@iconify/react/dist/offline';
import moon from '@iconify-icons/lucide/moon';
import sun from '@iconify-icons/lucide/sun';
import type { Theme } from './theme';
import { useTheme } from './useTheme';

function iconFor(theme: Theme) {
  if (theme === 'dark') {
    return sun;
  }
  return moon;
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="rounded-lg p-2 text-panel-fg-muted hover:bg-overlay hover:text-overlay-fg"
    >
      <Icon icon={iconFor(theme)} className="size-5" />
    </button>
  );
}
