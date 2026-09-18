import type { Instrument } from './src/audio/Instrument';

type PlayedSequence = {
  notes: string[];
  secondsPerNote: number;
};

type FakeInstrument = {
  instrument: Instrument;
  playedChords: string[][];
  playedSequences: PlayedSequence[];
};

export function createFakeInstrument(): FakeInstrument {
  const playedChords: string[][] = [];
  const playedSequences: PlayedSequence[] = [];

  const instrument: Instrument = {
    async playChord(notes: string[]) {
      playedChords.push(notes);
    },
    async playSequence(notes, secondsPerNote, onNoteStart) {
      playedSequences.push({ notes, secondsPerNote });
      notes.forEach((_note, index) => {
        onNoteStart(index);
      });
    },
  };

  return { instrument, playedChords, playedSequences };
}
