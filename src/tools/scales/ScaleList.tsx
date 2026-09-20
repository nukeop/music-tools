import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { ScaleRow } from './ScaleRow';
import type { ScaleItem } from './useScaleList';

type ActiveTone = {
  id: number;
  index: number;
};

type ScaleListProps = {
  items: ScaleItem[];
  activeTone: ActiveTone | null;
  onPlay: (item: ScaleItem) => void;
  onMove: (from: number, to: number) => void;
  onRemove: (id: number) => void;
};

function activeToneForItem(
  activeTone: ActiveTone | null,
  itemId: number,
): number | null {
  if (activeTone?.id === itemId) {
    return activeTone.index;
  }
  return null;
}

export function ScaleList({
  items,
  activeTone,
  onPlay,
  onMove,
  onRemove,
}: ScaleListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 4 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  if (items.length === 0) {
    return null;
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) {
      return;
    }
    if (active.id === over.id) {
      return;
    }
    const from = items.findIndex((item) => item.id === active.id);
    const to = items.findIndex((item) => item.id === over.id);
    onMove(from, to);
  }

  const itemIds = items.map((item) => item.id);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-2 rounded-xl bg-panel p-2 sm:p-3">
          {items.map((item) => (
            <ScaleRow
              key={item.id}
              id={item.id}
              root={item.root}
              scale={item.scale}
              activeToneIndex={activeToneForItem(activeTone, item.id)}
              onPlay={() => onPlay(item)}
              onRemove={() => onRemove(item.id)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
