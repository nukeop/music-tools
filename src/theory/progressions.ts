import { Interval, Note } from 'tonal';
import { type ChordSelection, chordIntervals, chordSuffix } from './chords';
import { withoutDoubleAccidental } from './scales';

export type ProgressionChord = {
  degree: string;
  selection: ChordSelection;
};

// Scale degrees as intervals above the key's tonic. Enharmonic pairs such as
// ♯IV and ♭V are both listed because they spell the root differently.
export const DEGREES: string[] = [
  '1P',
  '1A',
  '2m',
  '2M',
  '2A',
  '3m',
  '3M',
  '4P',
  '4A',
  '5d',
  '5P',
  '5A',
  '6m',
  '6M',
  '7m',
  '7M',
];

const NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

function accidentalPrefix(alt: number): string {
  if (alt < 0) {
    return '♭'.repeat(-alt);
  }
  return '♯'.repeat(alt);
}

export function degreeNumeral(degree: string): string {
  const { num, alt } = Interval.get(degree);
  return `${accidentalPrefix(alt)}${NUMERALS[num! - 1]}`;
}

function isLowerCase(selection: ChordSelection): boolean {
  return selection.triad === 'minor' || selection.triad === 'diminished';
}

// Minor and diminished chords get a lowercase numeral, which already says
// "minor", so the minor sign is dropped from the suffix: ii7, not ii-7.
export function romanChordName(
  degree: string,
  selection: ChordSelection,
): string {
  const numeral = degreeNumeral(degree);
  const suffix = chordSuffix(selection);
  if (!isLowerCase(selection)) {
    return `${numeral}${suffix}`;
  }
  return `${numeral.toLowerCase()}${suffix.replace(/^-/, '')}`;
}

export function degreeRoot(spelledKey: string, degree: string): string {
  return withoutDoubleAccidental(Note.transpose(spelledKey, degree));
}

// Roots above E4 drop an octave so every chord starts between F3 and E4.
const HIGHEST_ROOT_MIDI = 64;

function rootPitch(spelledTonic: string): string {
  if (Note.midi(`${spelledTonic}4`)! > HIGHEST_ROOT_MIDI) {
    return `${spelledTonic}3`;
  }
  return `${spelledTonic}4`;
}

export function progressionChordPitches(
  spelledTonic: string,
  selection: ChordSelection,
): string[] {
  const root = rootPitch(spelledTonic);
  return chordIntervals(selection).map((interval) =>
    Note.transpose(root, interval),
  );
}
