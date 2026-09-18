import { formatNote } from '../../theory/chords';
import { TRIAD_COLORS, type TriadColorClasses } from './triadColors';

type ToneRowProps = {
  triad: 1 | 2;
  notes: string[];
  shared: string[];
  onPlay: (note: string) => void;
};

const TONE_BASE =
  'flex h-12 min-w-12 items-center justify-center rounded-lg px-1 text-3xl font-bold decoration-4 underline-offset-4 transition-colors hover:bg-overlay/40 sm:h-14 sm:min-w-14 sm:text-4xl';

function toneClassName(colors: TriadColorClasses, isShared: boolean): string {
  if (isShared) {
    return `${TONE_BASE} ${colors.toneShared}`;
  }
  return `${TONE_BASE} ${colors.tone}`;
}

export function ToneRow({ triad, notes, shared, onPlay }: ToneRowProps) {
  return (
    <div className="flex gap-1.5 sm:gap-2">
      {notes.map((note, index) => {
        const className = toneClassName(
          TRIAD_COLORS[triad],
          shared.includes(note),
        );

        return (
          <button
            key={note}
            type="button"
            data-testid={`tone-${triad}-${index + 1}`}
            aria-label={formatNote(note)}
            onClick={() => onPlay(note)}
            className={className}
          >
            {formatNote(note)}
          </button>
        );
      })}
    </div>
  );
}
