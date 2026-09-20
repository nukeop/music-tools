import { formatNote } from '../../theory/chords';

type ScaleToneProps = {
  note: string;
  isRoot: boolean;
};

const TONE_BASE =
  'flex h-10 flex-1 select-none items-center justify-center rounded-md bg-overlay/40 text-xl font-bold sm:h-12 sm:text-3xl';

function toneClassName(isRoot: boolean): string {
  if (isRoot) {
    return `${TONE_BASE} text-accent`;
  }
  return `${TONE_BASE} text-panel-fg`;
}

export function ScaleTone({ note, isRoot }: ScaleToneProps) {
  const letter = note.charAt(0);
  const accidental = formatNote(note.slice(1));

  return (
    <span data-testid="scale-tone" className={toneClassName(isRoot)}>
      {letter}
      <sup className="text-[0.6em] font-medium">{accidental}</sup>
    </span>
  );
}
