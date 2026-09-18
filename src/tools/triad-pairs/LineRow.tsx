import { Icon } from '@iconify/react/dist/offline';
import play from '@iconify-icons/lucide/play';
import { formatNote } from '../../theory/chords';
import type { LineEntry } from '../../theory/patterns';
import { TRIAD_COLORS, type TriadColorClasses } from './triadColors';
import type { ActiveNote } from './usePlayback';

type LineRowProps = {
  lineIndex: number;
  label: string;
  entries: LineEntry[];
  activeNote: ActiveNote | null;
  onPlay: () => void;
};

const CHIP_BASE =
  'flex h-9 flex-1 items-center justify-center rounded-lg text-xs font-semibold transition-colors sm:text-sm';
const PLAY_BUTTON =
  'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-overlay text-overlay-fg-muted transition-colors hover:text-overlay-fg';

function chipClassName(colors: TriadColorClasses, isActive: boolean): string {
  if (isActive) {
    return `${CHIP_BASE} ${colors.chipActive}`;
  }
  return `${CHIP_BASE} ${colors.chip}`;
}

export function LineRow({
  lineIndex,
  label,
  entries,
  activeNote,
  onPlay,
}: LineRowProps) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs font-semibold text-background-fg-muted">
        {label}
      </span>
      <div className="flex gap-3">
        <div className="flex flex-1 gap-1.5">
          {entries.map((entry, noteIndex) => {
            const isActive =
              activeNote?.line === lineIndex && activeNote.index === noteIndex;
            const className = chipClassName(
              TRIAD_COLORS[entry.triad],
              isActive,
            );

            return (
              <span
                key={`${entry.triad}-${entry.note}`}
                data-testid={`line-${lineIndex + 1}-note-${noteIndex + 1}`}
                className={className}
              >
                {formatNote(entry.note)}
              </span>
            );
          })}
        </div>
        <button
          type="button"
          aria-label={`Play ${label.toLowerCase()}`}
          onClick={onPlay}
          className={PLAY_BUTTON}
        >
          <Icon icon={play} className="size-4" />
        </button>
      </div>
    </div>
  );
}
