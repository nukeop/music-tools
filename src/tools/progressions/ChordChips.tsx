import { Button } from '../../components/Button';
import type { ChordLabel } from './chordLabel';

type ChordChipsProps = {
  labels: ChordLabel[];
  selectedIndex: number;
  onSelect: (index: number) => void;
};

export function ChordChips({
  labels,
  selectedIndex,
  onSelect,
}: ChordChipsProps) {
  return (
    <fieldset
      aria-label="Progression chords"
      className="m-0 grid grid-cols-4 gap-1.5 border-0 p-0 sm:grid-cols-8"
    >
      {labels.map(({ numeral, name }, index) => (
        <Button
          // Chords are positional slots, not reorderable items.
          // biome-ignore lint/suspicious/noArrayIndexKey: see above
          key={index}
          variant="accent"
          pressed={index === selectedIndex}
          aria-label={`Chord ${index + 1}`}
          onClick={() => onSelect(index)}
          className="h-12 flex-col gap-0.5 px-1"
        >
          <span
            data-testid="progression-chord-numeral"
            className="text-sm leading-none sm:text-base"
          >
            {numeral}
          </span>
          <span
            data-testid="progression-chord-name"
            className="text-[0.65rem] font-medium opacity-70"
          >
            {name}
          </span>
        </Button>
      ))}
    </fieldset>
  );
}
