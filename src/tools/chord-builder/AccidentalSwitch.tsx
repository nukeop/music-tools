import type { Accidental } from '../../theory/chords';

type AccidentalSwitchProps = {
  selected: Accidental;
  onSelect: (accidental: Accidental) => void;
};

type Segment = {
  value: Accidental;
  glyph: string;
  ariaLabel: string;
};

const SEGMENTS: Segment[] = [
  { value: 'flat', glyph: '♭', ariaLabel: 'Flat' },
  { value: 'sharp', glyph: '♯', ariaLabel: 'Sharp' },
];

function segmentClassName(isSelected: boolean): string {
  const base = 'h-8 w-9 text-sm font-semibold transition-colors';

  if (isSelected) {
    return `${base} bg-primary text-primary-fg`;
  }

  return `${base} bg-overlay text-overlay-fg-muted hover:text-overlay-fg`;
}

export function AccidentalSwitch({
  selected,
  onSelect,
}: AccidentalSwitchProps) {
  return (
    <fieldset
      aria-label="Note spelling"
      className="m-0 flex overflow-hidden rounded-lg border-0 p-0"
    >
      {SEGMENTS.map((segment) => (
        <button
          key={segment.value}
          type="button"
          aria-label={segment.ariaLabel}
          aria-pressed={segment.value === selected}
          onClick={() => onSelect(segment.value)}
          className={segmentClassName(segment.value === selected)}
        >
          {segment.glyph}
        </button>
      ))}
    </fieldset>
  );
}
