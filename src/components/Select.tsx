import { Icon } from '@iconify/react/dist/offline';
import chevronDown from '@iconify-icons/lucide/chevron-down';
import type { ChangeEvent } from 'react';

type SelectOption<T extends string> = {
  value: T;
  label: string;
};

type SelectProps<T extends string> = {
  label: string;
  options: SelectOption<T>[];
  selected: T;
  onChange: (value: T) => void;
  className?: string;
};

export function Select<T extends string>({
  label,
  options,
  selected,
  onChange,
  className,
}: SelectProps<T>) {
  const valueMap: Record<string, T> = Object.fromEntries(
    options.map((option) => [option.value, option.value]),
  );

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const typed = valueMap[event.target.value];
    onChange(typed);
  }

  return (
    <div className={`relative ${className ?? ''}`}>
      <select
        aria-label={label}
        value={selected}
        onChange={handleChange}
        className="h-9 w-full appearance-none rounded-lg bg-overlay pr-8 pl-3 text-sm font-semibold text-overlay-fg outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Icon
        icon={chevronDown}
        className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-overlay-fg-muted"
      />
    </div>
  );
}
