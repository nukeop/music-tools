import { Button } from '../../components/Button';
import { formatNote } from '../../theory/chords';
import { TRIAD_COLORS, type TriadColorClasses } from './triadColors';

type ToneRowProps = {
  triad: 1 | 2;
  notes: string[];
  shared: string[];
  onPlay: (note: string) => void;
};

const TONE_SIZING =
  'h-12 min-w-12 px-1 text-3xl font-bold decoration-4 underline-offset-4 sm:h-14 sm:min-w-14 sm:text-4xl';

function toneClassName(colors: TriadColorClasses, isShared: boolean): string {
  if (isShared) {
    return `${TONE_SIZING} ${colors.toneShared}`;
  }
  return `${TONE_SIZING} ${colors.tone}`;
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
          <Button
            key={note}
            variant="ghost"
            data-testid={`tone-${triad}-${index + 1}`}
            aria-label={formatNote(note)}
            onClick={() => onPlay(note)}
            className={className}
          >
            {formatNote(note)}
          </Button>
        );
      })}
    </div>
  );
}
