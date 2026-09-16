import { InstrumentKeySwitch } from '../instrument-key/InstrumentKeySwitch';
import { ThemeToggle } from '../theme/ThemeToggle';

export function TopBar() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-end gap-2 bg-panel px-4 text-panel-fg">
      <InstrumentKeySwitch />
      <ThemeToggle />
    </header>
  );
}
