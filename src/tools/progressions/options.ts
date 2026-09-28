import type { ChordSelection, Seventh, Triad } from '../../theory/chords';
import type { ProgressionChord } from '../../theory/progressions';

export const MAX_CHORDS = 8;
export const MAX_BARS = 16;
export const CHORDS_PER_BAR_CHOICES = [1, 2, 3, 4];

function chord(
  tonic: string,
  triad: Triad,
  seventh: Seventh | null,
): ProgressionChord {
  const selection: ChordSelection = { triad, seventh, extension: null };
  return { tonic, selection };
}

// A I-vi-ii-V turnaround in C, then plain C major for any extra chords.
const TURNAROUND: ProgressionChord[] = [
  chord('C', 'major', 'maj7'),
  chord('A', 'minor', '7'),
  chord('D', 'minor', '7'),
  chord('G', 'major', '7'),
];

export const DEFAULT_CHORDS: ProgressionChord[] = Array.from(
  { length: MAX_CHORDS },
  (_chord, index) => TURNAROUND[index] ?? chord('C', 'major', null),
);

export function countOptions(max: number) {
  return Array.from({ length: max }, (_option, index) => {
    const value = String(index + 1);
    return { value, label: value };
  });
}
