type TimelineProps = {
  slotNames: string[];
  chordsPerBar: number;
  activeSlot: number | null;
};

const SLOT_BASE =
  'flex h-12 flex-1 items-center justify-center rounded-md px-1 text-sm font-bold sm:text-base';

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
  slotNames,
  chordsPerBar,
  activeSlot,
}: TimelineProps) {
  const bars = chunk(
    slotNames.map((name, slot) => ({ name, slot })),
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
            {bar.map(({ name, slot }) => (
              <span
                key={slot}
                data-testid="timeline-slot"
                aria-current={slot === activeSlot ? 'true' : undefined}
                className={slotClassName(slot === activeSlot)}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
