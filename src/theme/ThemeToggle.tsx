import { Icon } from '@iconify/react/dist/offline';
import moon from '@iconify-icons/lucide/moon';
import sun from '@iconify-icons/lucide/sun';
import { Button } from '../components/Button';
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
    <Button
      variant="neutral"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="p-2"
    >
      <Icon icon={iconFor(theme)} className="size-5" />
    </Button>
  );
}
