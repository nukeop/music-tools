import { formatNote } from '../../theory/chords';

type ScaleToneProps = {
  note: string;
  isRoot: boolean;
  isActive: boolean;
};

const TONE_BASE =
  'flex h-10 flex-1 select-none items-center justify-center rounded-md text-xl font-bold sm:h-12 sm:text-3xl';

function toneClassName(isRoot: boolean, isActive: boolean): string {
  if (isActive) {
    return `${TONE_BASE} bg-accent text-accent-fg ring-3 ring-accent/50`;
  }
  if (isRoot) {
    return `${TONE_BASE} bg-overlay/40 text-accent`;
  }
  return `${TONE_BASE} bg-overlay/40 text-panel-fg`;
}

export function ScaleTone({ note, isRoot, isActive }: ScaleToneProps) {
  const letter = note.charAt(0);
  const accidental = formatNote(note.slice(1));

  return (
    <span data-testid="scale-tone" className={toneClassName(isRoot, isActive)}>
      {letter}
      <sup className="text-[0.6em] font-medium">{accidental}</sup>
    </span>
  );
}
