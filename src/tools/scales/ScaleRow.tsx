import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Icon } from '@iconify/react/dist/offline';
import play from '@iconify-icons/lucide/play';
import x from '@iconify-icons/lucide/x';
import { Button } from '../../components/Button';
import { type ScaleType, scaleDegrees, scaleName } from '../../theory/scales';
import { DragHandle } from './DragHandle';
import { ScaleTone } from './ScaleTone';

type ScaleRowProps = {
  id: number;
  root: string;
  scale: ScaleType;
  activeToneIndex: number | null;
  onPlay: () => void;
  onRemove: () => void;
};

const ROW_BASE = 'relative flex items-center gap-2 rounded-lg';

function rowClassName(isDragging: boolean): string {
  if (isDragging) {
    return `${ROW_BASE} z-10 shadow-lg opacity-90`;
  }
  return ROW_BASE;
}

export function ScaleRow({
  id,
  root,
  scale,
  activeToneIndex,
  onPlay,
  onRemove,
}: ScaleRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const degrees = scaleDegrees(root, scale);
  const name = scaleName(root, scale);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition ?? undefined,
  };

  return (
    <div
      ref={setNodeRef}
      data-testid="scale-row"
      className={rowClassName(isDragging)}
      style={style}
    >
      <DragHandle
        ref={setActivatorNodeRef}
        attributes={attributes}
        listeners={listeners}
      />
      <span
        data-testid="scale-name"
        className="w-16 shrink-0 text-xs font-semibold leading-tight text-panel-fg-muted sm:w-40 sm:text-sm"
      >
        {name}
      </span>
      <div className="flex flex-1 gap-1">
        {degrees.map((degree, index) => (
          <ScaleTone
            key={degree.interval}
            note={degree.note}
            isRoot={degree.note === root}
            isActive={activeToneIndex === index}
          />
        ))}
      </div>
      <Button
        variant="neutral"
        aria-label="Play"
        onClick={onPlay}
        className="size-8 shrink-0"
      >
        <Icon icon={play} className="size-4" />
      </Button>
      <Button
        variant="neutral"
        aria-label="Remove"
        onClick={onRemove}
        className="size-8 shrink-0"
      >
        <Icon icon={x} className="size-4" />
      </Button>
    </div>
  );
}
