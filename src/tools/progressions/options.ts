import type { ChordQuality, ProgressionChord } from '../../theory/progressions';

export const MAX_CHORDS = 8;
export const MAX_BARS = 16;
export const CHORDS_PER_BAR_CHOICES = [1, 2, 3, 4];

export type QualityOption = {
  quality: ChordQuality;
  label: string;
};

export const QUALITY_OPTIONS: QualityOption[] = [
  { quality: 'major', label: 'Major' },
  { quality: 'minor', label: 'Minor' },
  { quality: 'diminished', label: 'Diminished' },
  { quality: 'augmented', label: 'Augmented' },
  { quality: 'sus2', label: 'Sus2' },
  { quality: 'sus4', label: 'Sus4' },
  { quality: '6', label: 'Major 6' },
  { quality: 'minor6', label: 'Minor 6' },
  { quality: '7', label: 'Dominant 7' },
  { quality: 'maj7', label: 'Major 7' },
  { quality: 'minor7', label: 'Minor 7' },
  { quality: 'minorMaj7', label: 'Minor-major 7' },
  { quality: 'halfDiminished7', label: 'Half-diminished 7' },
  { quality: 'dim7', label: 'Diminished 7' },
  { quality: '7sus4', label: '7sus4' },
  { quality: '6/9', label: '6/9' },
  { quality: '9', label: 'Dominant 9' },
  { quality: 'maj9', label: 'Major 9' },
  { quality: 'minor9', label: 'Minor 9' },
  { quality: '7b9', label: '7♭9' },
  { quality: '7#9', label: '7♯9' },
  { quality: '13', label: 'Dominant 13' },
];

// A ii-V-I turnaround in C, then plain C major for any extra chords.
export const DEFAULT_CHORDS: ProgressionChord[] = Array.from(
  { length: MAX_CHORDS },
  (_chord, index): ProgressionChord => {
    const turnaround: ProgressionChord[] = [
      { tonic: 'C', quality: 'maj7' },
      { tonic: 'A', quality: 'minor7' },
      { tonic: 'D', quality: 'minor7' },
      { tonic: 'G', quality: '7' },
    ];
    return turnaround[index] ?? { tonic: 'C', quality: 'major' };
  },
);

export function countOptions(max: number) {
  return Array.from({ length: max }, (_option, index) => {
    const value = String(index + 1);
    return { value, label: value };
  });
}
