import { Icon } from '@iconify/react/dist/offline';
import chevronDown from '@iconify-icons/lucide/chevron-down';
import type { ChangeEvent } from 'react';
import type { Degree } from '../../theory/triadPairs';
import { DEGREE_OPTIONS } from './options';

type DegreeSelectProps = {
  label: string;
  selected: Degree;
  onChange: (degree: Degree) => void;
};

const DEGREE_BY_VALUE: Record<string, Degree> = Object.fromEntries(
  DEGREE_OPTIONS.map((option) => [option.value, option.value] as const),
);

export function DegreeSelect({ label, selected, onChange }: DegreeSelectProps) {
  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    onChange(DEGREE_BY_VALUE[event.target.value]);
  }

  return (
    <div className="relative">
      <select
        aria-label={label}
        value={selected}
        onChange={handleChange}
        className="h-9 w-full appearance-none rounded-lg bg-overlay pr-8 pl-3 text-sm font-semibold text-overlay-fg outline-none"
      >
        {DEGREE_OPTIONS.map((option) => (
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
