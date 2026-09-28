import { Note } from 'tonal';
import { type ChordSelection, chordIntervals } from './chords';

export type ChordQuality =
  | 'major'
  | 'minor'
  | 'diminished'
  | 'augmented'
  | 'sus2'
  | 'sus4'
  | '6'
  | 'minor6'
  | '7'
  | 'maj7'
  | 'minor7'
  | 'minorMaj7'
  | 'halfDiminished7'
  | 'dim7'
  | '7sus4'
  | '6/9'
  | '9'
  | 'maj9'
  | 'minor9'
  | '7b9'
  | '7#9'
  | '13';

export type ProgressionChord = {
  tonic: string;
  quality: ChordQuality;
};

export const QUALITIES: Record<ChordQuality, ChordSelection> = {
  major: { triad: 'major', seventh: null, extension: null },
  minor: { triad: 'minor', seventh: null, extension: null },
  diminished: { triad: 'diminished', seventh: null, extension: null },
  augmented: { triad: 'augmented', seventh: null, extension: null },
  sus2: { triad: 'sus2', seventh: null, extension: null },
  sus4: { triad: 'sus4', seventh: null, extension: null },
  '6': { triad: 'major', seventh: '6', extension: null },
  minor6: { triad: 'minor', seventh: '6', extension: null },
  '7': { triad: 'major', seventh: '7', extension: null },
  maj7: { triad: 'major', seventh: 'maj7', extension: null },
  minor7: { triad: 'minor', seventh: '7', extension: null },
  minorMaj7: { triad: 'minor', seventh: 'maj7', extension: null },
  halfDiminished7: { triad: 'diminished', seventh: '7', extension: null },
  dim7: { triad: 'diminished', seventh: 'dim7', extension: null },
  '7sus4': { triad: 'sus4', seventh: '7', extension: null },
  '6/9': { triad: 'major', seventh: '6', extension: '9' },
  '9': { triad: 'major', seventh: '7', extension: '9' },
  maj9: { triad: 'major', seventh: 'maj7', extension: '9' },
  minor9: { triad: 'minor', seventh: '7', extension: '9' },
  '7b9': { triad: 'major', seventh: '7', extension: 'b9' },
  '7#9': { triad: 'major', seventh: '7', extension: '#9' },
  '13': { triad: 'major', seventh: '7', extension: '13' },
};

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
  quality: ChordQuality,
): string[] {
  const root = rootPitch(spelledTonic);
  return chordIntervals(QUALITIES[quality]).map((interval) =>
    Note.transpose(root, interval),
  );
}

// Fills bars × chordsPerBar slots by cycling through the chords in order.
export function progressionSlots(
  chordCount: number,
  bars: number,
  chordsPerBar: number,
): number[] {
  return Array.from(
    { length: bars * chordsPerBar },
    (_slot, index) => index % chordCount,
  );
}
