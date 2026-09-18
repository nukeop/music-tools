import { formatNote } from '../../theory/chords';
import type { TriadQuality } from '../../theory/triadPairs';
import { TriadGroup } from './TriadGroup';

type TonesProps = {
  notes1: string[];
  notes2: string[];
  quality1: TriadQuality;
  quality2: TriadQuality;
  shared: string[];
  onPlay: (note: string) => void;
};

export function Tones({
  notes1,
  notes2,
  quality1,
  quality2,
  shared,
  onPlay,
}: TonesProps) {
  return (
    <div className="mt-2 flex flex-col items-center gap-4 sm:mt-4">
      <div className="flex justify-center gap-4 sm:gap-6">
        <TriadGroup
          triad={1}
          notes={notes1}
          quality={quality1}
          shared={shared}
          onPlay={onPlay}
        />
        <TriadGroup
          triad={2}
          notes={notes2}
          quality={quality2}
          shared={shared}
          onPlay={onPlay}
        />
      </div>
      {shared.length > 0 && (
        <p
          data-testid="shared-notes"
          className="text-sm text-background-fg-muted"
        >
          Shared: {shared.map(formatNote).join(', ')}
        </p>
      )}
    </div>
  );
}
