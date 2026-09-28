import { Note } from 'tonal';
import { type ChordSelection, chordIntervals } from './chords';

export type ProgressionChord = {
  tonic: string;
  selection: ChordSelection;
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
  selection: ChordSelection,
): string[] {
  const root = rootPitch(spelledTonic);
  return chordIntervals(selection).map((interval) =>
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
