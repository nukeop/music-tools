import { arrayMove } from '@dnd-kit/sortable';
import { useRef, useState } from 'react';
import type { ScaleType } from '../../theory/scales';

export type ScaleItem = {
  id: number;
  root: string;
  scale: ScaleType;
};

export function useScaleList() {
  const [items, setItems] = useState<ScaleItem[]>([]);
  const nextId = useRef(1);

  function add(root: string, scale: ScaleType) {
    const id = nextId.current;
    nextId.current += 1;
    setItems((current) => [...current, { id, root, scale }]);
  }

  function remove(id: number) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  function move(from: number, to: number) {
    setItems((current) => arrayMove(current, from, to));
  }

  return { items, add, remove, move };
}
