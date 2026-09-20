import type {
  DraggableAttributes,
  DraggableSyntheticListeners,
} from '@dnd-kit/core';
import { Icon } from '@iconify/react/dist/offline';
import gripVertical from '@iconify-icons/lucide/grip-vertical';

type DragHandleProps = {
  attributes: DraggableAttributes;
  listeners: DraggableSyntheticListeners;
  ref: (element: HTMLElement | null) => void;
};

export function DragHandle({ attributes, listeners, ref }: DragHandleProps) {
  return (
    <button
      ref={ref}
      type="button"
      aria-label="Drag to reorder"
      className="inline-flex size-8 shrink-0 cursor-grab touch-none items-center justify-center rounded-lg text-panel-fg-muted transition-colors hover:bg-overlay/40 active:cursor-grabbing"
      {...attributes}
      {...listeners}
    >
      <Icon icon={gripVertical} className="size-4" />
    </button>
  );
}
