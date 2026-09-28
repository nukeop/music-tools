import type { ChordLabel } from './chordLabel';

type TimelineProps = {
  slotLabels: ChordLabel[];
  chordsPerBar: number;
  activeSlot: number | null;
};

const SLOT_BASE =
  'flex h-12 flex-1 flex-col items-center justify-center gap-0.5 rounded-md px-1';

function slotClassName(isActive: boolean): string {
  if (isActive) {
    return `${SLOT_BASE} bg-accent text-accent-fg ring-3 ring-accent/50`;
  }
  return `${SLOT_BASE} bg-overlay/40 text-panel-fg`;
}

function chunk<T>(items: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(items.length / size) }, (_c, index) =>
    items.slice(index * size, (index + 1) * size),
  );
}

export function Timeline({
  slotLabels,
  chordsPerBar,
  activeSlot,
}: TimelineProps) {
  const bars = chunk(
    slotLabels.map((label, slot) => ({ ...label, slot })),
    chordsPerBar,
  );

  return (
    <div className="grid grid-cols-2 gap-2 rounded-xl bg-panel p-2 sm:grid-cols-4 sm:p-3">
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
            {bar.map(({ numeral, name, slot }) => (
              <span
                key={slot}
                data-testid="timeline-slot"
                aria-current={slot === activeSlot ? 'true' : undefined}
                className={slotClassName(slot === activeSlot)}
              >
                <span
                  data-testid="timeline-numeral"
                  className="text-sm leading-none font-bold sm:text-base"
                >
                  {numeral}
                </span>
                <span className="text-[0.65rem] font-medium opacity-70">
                  {name}
                </span>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
