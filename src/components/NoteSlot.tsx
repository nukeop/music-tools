export type SlotColor = 'primary' | 'accent' | 'secondary';

type NoteSlotProps = {
  testId: string;
  color: SlotColor;
  note?: string;
  degree?: string;
};

const filledClassName: Record<SlotColor, string> = {
  primary: 'bg-primary text-primary-fg',
  accent: 'bg-accent text-accent-fg',
  secondary: 'bg-secondary text-secondary-fg',
};

function toneClassName(color: SlotColor, hasNote: boolean): string {
  if (hasNote) {
    return filledClassName[color];
  }
  return 'bg-panel text-panel-fg-muted';
}

function placeholderGlyph(hasNote: boolean) {
  if (hasNote) {
    return null;
  }
  return <span className="text-3xl opacity-30">–</span>;
}

export function NoteSlot({ testId, color, note, degree }: NoteSlotProps) {
  const hasNote = note !== undefined;

  return (
    <div
      data-testid={testId}
      className={`flex aspect-square w-full flex-col items-center justify-center gap-1 rounded-xl ${toneClassName(color, hasNote)}`}
    >
      {placeholderGlyph(hasNote)}
      <span
        data-testid={`${testId}-note`}
        className="text-2xl font-bold sm:text-3xl"
      >
        {note ?? ''}
      </span>
      <span
        data-testid={`${testId}-degree`}
        className="text-xs font-medium uppercase tracking-wide opacity-80"
      >
        {degree ?? ''}
      </span>
    </div>
  );
}
