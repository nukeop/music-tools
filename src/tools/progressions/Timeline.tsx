import { Button } from '../../components/Button';
import type { ChordLabel } from './chordLabel';
import type { SlotPosition } from './useProgression';

type TimelineProps = {
  bars: ChordLabel[][];
  edited: SlotPosition;
  activeSlot: number | null;
  onSelect: (position: SlotPosition) => void;
};

// Busier bars get wider columns so every chord name stays readable.
function gridClassName(chordsPerBar: number): string {
  if (chordsPerBar >= 3) {
    return 'grid-cols-1 sm:grid-cols-2';
  }
  return 'grid-cols-2 sm:grid-cols-4';
}

const SLOT_CLASS_NAME = 'h-14 min-w-0 flex-1 flex-col gap-0.5 px-1';
const PLAYING_CLASS_NAME = 'ring-3 ring-positive';

function slotClassName(isPlaying: boolean): string {
  if (isPlaying) {
    return `${SLOT_CLASS_NAME} ${PLAYING_CLASS_NAME}`;
  }
  return SLOT_CLASS_NAME;
}

export function Timeline({
  bars,
  edited,
  activeSlot,
  onSelect,
}: TimelineProps) {
  return (
    <fieldset
      aria-label="Progression chords"
      className={`m-0 grid gap-2 border-0 p-0 ${gridClassName(bars[0].length)}`}
    >
      {bars.map((bar, barIndex) => (
        <div
          // Bars are positional and never reorder.
          // biome-ignore lint/suspicious/noArrayIndexKey: see above
          key={barIndex}
          data-testid="timeline-bar"
          className="flex flex-col gap-1"
        >
          <span className="text-xs font-semibold text-panel-fg-muted">
            {barIndex + 1}
          </span>
          <div className="flex gap-1">
            {bar.map(({ numeral, name }, chordIndex) => {
              const slot = barIndex * bar.length + chordIndex;
              const isPlaying = slot === activeSlot;
              return (
                <Button
                  // Slots are positional and never reorder.
                  // biome-ignore lint/suspicious/noArrayIndexKey: see above
                  key={chordIndex}
                  variant="accent"
                  pressed={
                    barIndex === edited.bar && chordIndex === edited.chord
                  }
                  aria-label={`Bar ${barIndex + 1} chord ${chordIndex + 1}`}
                  aria-current={isPlaying ? 'true' : undefined}
                  onClick={() => onSelect({ bar: barIndex, chord: chordIndex })}
                  className={slotClassName(isPlaying)}
                >
                  <span
                    data-testid="timeline-numeral"
                    className="max-w-full truncate text-sm leading-none sm:text-base"
                  >
                    {numeral}
                  </span>
                  <span
                    data-testid="timeline-name"
                    className="max-w-full truncate text-[0.65rem] font-medium opacity-70"
                  >
                    {name}
                  </span>
                </Button>
              );
            })}
          </div>
        </div>
      ))}
    </fieldset>
  );
}
