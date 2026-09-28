import type { ChordSelection, Seventh, Triad } from '../../theory/chords';
import type { ProgressionChord } from '../../theory/progressions';

export const MAX_BARS = 16;
export const MAX_CHORDS_PER_BAR = 4;

function chord(
  degree: string,
  triad: Triad,
  seventh: Seventh | null,
): ProgressionChord {
  const selection: ChordSelection = { triad, seventh, extension: null };
  return { degree, selection };
}

// A I-vi-ii-V turnaround, one chord per bar, repeating every four bars.
const TURNAROUND: ProgressionChord[] = [
  chord('1P', 'major', 'maj7'),
  chord('6M', 'minor', '7'),
  chord('2M', 'minor', '7'),
  chord('5P', 'major', '7'),
];

// Every slot of every bar starts as that bar's turnaround chord.
export const DEFAULT_BARS: ProgressionChord[][] = Array.from(
  { length: MAX_BARS },
  (_bar, barIndex) =>
    Array.from(
      { length: MAX_CHORDS_PER_BAR },
      () => TURNAROUND[barIndex % TURNAROUND.length],
    ),
);

export function countOptions(max: number) {
  return Array.from({ length: max }, (_option, index) => {
    const value = String(index + 1);
    return { value, label: value };
  });
}
