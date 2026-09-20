import { Icon } from '@iconify/react/dist/offline';
import play from '@iconify-icons/lucide/play';
import { Button } from '../../components/Button';
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

export function Lines({
  lines,
  activeNote,
  onPlayLine,
  onPlayAll,
}: LinesProps) {
  return (
    <div className="flex flex-col gap-4">
      <Button
        variant="primary"
        pressed
        aria-label="Play all"
        onClick={onPlayAll}
        className="h-9 gap-1.5 self-end px-3 text-sm"
      >
        <Icon icon={play} className="size-4" />
        Play all
      </Button>
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
