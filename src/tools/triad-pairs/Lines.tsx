import { Icon } from '@iconify/react/dist/offline';
import play from '@iconify-icons/lucide/play';
import type { LineEntry } from '../../theory/patterns';
import { LineRow } from './LineRow';
import type { ActiveNote } from './usePlayback';

type LinesProps = {
  lines: LineEntry[][];
  activeNote: ActiveNote | null;
  onPlayLine: (lineIndex: number) => void;
  onPlayAll: () => void;
};

const LINE_LABELS = ['Root position', '1st inversion', '2nd inversion'];

const PLAY_ALL =
  'flex h-9 items-center gap-1.5 self-end rounded-lg bg-primary px-3 text-sm font-semibold text-primary-fg transition-colors hover:bg-primary/80';

export function Lines({
  lines,
  activeNote,
  onPlayLine,
  onPlayAll,
}: LinesProps) {
  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        aria-label="Play all"
        onClick={onPlayAll}
        className={PLAY_ALL}
      >
        <Icon icon={play} className="size-4" />
        Play all
      </button>
      {lines.map((entries, lineIndex) => (
        <LineRow
          key={LINE_LABELS[lineIndex]}
          lineIndex={lineIndex}
          label={LINE_LABELS[lineIndex]}
          entries={entries}
          activeNote={activeNote}
          onPlay={() => onPlayLine(lineIndex)}
        />
      ))}
    </div>
  );
}
