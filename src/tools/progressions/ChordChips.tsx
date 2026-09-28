import { Button } from '../../components/Button';

type ChordChipsProps = {
  names: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
};

export function ChordChips({
  names,
  selectedIndex,
  onSelect,
}: ChordChipsProps) {
  return (
    <fieldset
      aria-label="Progression chords"
      className="m-0 grid grid-cols-4 gap-1.5 border-0 p-0 sm:grid-cols-8"
    >
      {names.map((name, index) => (
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
          <span className="text-[0.65rem] font-medium opacity-70">
            {index + 1}
          </span>
          <span
            data-testid="progression-chord-name"
            className="text-sm leading-none sm:text-base"
          >
            {name}
          </span>
        </Button>
      ))}
    </fieldset>
  );
}
