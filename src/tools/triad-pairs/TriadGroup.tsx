import { chordName } from '../../theory/chords';
import type { TriadQuality } from '../../theory/triadPairs';
import { ToneRow } from './ToneRow';
import { TRIAD_COLORS } from './triadColors';

type TriadGroupProps = {
  triad: 1 | 2;
  notes: string[];
  quality: TriadQuality;
  shared: string[];
  onPlay: (note: string) => void;
};

export function TriadGroup({
  triad,
  notes,
  quality,
  shared,
  onPlay,
}: TriadGroupProps) {
  return (
    <div className="flex flex-col items-center gap-1.5 sm:gap-2">
      <span
        className={`text-sm font-semibold tracking-wide ${TRIAD_COLORS[triad].caption}`}
      >
        {chordName(notes[0], {
          triad: quality,
          seventh: null,
          extension: null,
        })}
      </span>
      <ToneRow triad={triad} notes={notes} shared={shared} onPlay={onPlay} />
    </div>
  );
}
