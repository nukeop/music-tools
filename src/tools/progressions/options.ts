import type { ChordSelection, Seventh, Triad } from '../../theory/chords';
import type { ProgressionChord } from '../../theory/progressions';

export const MAX_CHORDS = 8;
export const MAX_BARS = 16;
export const CHORDS_PER_BAR_CHOICES = [1, 2, 3, 4];

function chord(
  degree: string,
  triad: Triad,
  seventh: Seventh | null,
): ProgressionChord {
  const selection: ChordSelection = { triad, seventh, extension: null };
  return { degree, selection };
}

// A I-vi-ii-V turnaround, then plain I chords for any extra slots.
const TURNAROUND: ProgressionChord[] = [
  chord('1P', 'major', 'maj7'),
  chord('6M', 'minor', '7'),
  chord('2M', 'minor', '7'),
  chord('5P', 'major', '7'),
];

export const DEFAULT_CHORDS: ProgressionChord[] = Array.from(
  { length: MAX_CHORDS },
  (_chord, index) => TURNAROUND[index] ?? chord('1P', 'major', null),
);

export function countOptions(max: number) {
  return Array.from({ length: max }, (_option, index) => {
    const value = String(index + 1);
    return { value, label: value };
  });
}
