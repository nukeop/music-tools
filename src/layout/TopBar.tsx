import { InstrumentKeySwitch } from '../instrument-key/InstrumentKeySwitch';
import { ThemeToggle } from '../theme/ThemeToggle';

export function TopBar() {
  return (
    <header className="flex h-14 items-center justify-end gap-2 px-4 sm:col-start-3 sm:row-start-1">
      <InstrumentKeySwitch />
      <ThemeToggle />
    </header>
  );
}
