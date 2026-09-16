import type { ChoiceOption } from '../../components/ChoiceGroup';
import {
  type ChordLayer,
  EXTENSIONS,
  type Extension,
  SEVENTHS,
  type Seventh,
  TRIADS,
  type Triad,
} from '../../theory/chords';

function optionsFrom<T extends string>(
  table: Record<T, ChordLayer>,
): ChoiceOption<T>[] {
  const keys = Object.keys(table) as T[];
  return keys.map((value) => ({ value, label: table[value].label }));
}

export const TRIAD_OPTIONS: ChoiceOption<Triad>[] = optionsFrom(TRIADS);
export const SEVENTH_OPTIONS: ChoiceOption<Seventh>[] = optionsFrom(SEVENTHS);
export const EXTENSION_OPTIONS: ChoiceOption<Extension>[] =
  optionsFrom(EXTENSIONS);
