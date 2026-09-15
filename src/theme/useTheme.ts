import { useLayoutEffect, useState } from 'react';
import {
  applyTheme,
  oppositeTheme,
  readInitialTheme,
  type Theme,
} from './theme';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);

  useLayoutEffect(() => {
    applyTheme(theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(oppositeTheme);
  }

  return { theme, toggleTheme };
}
