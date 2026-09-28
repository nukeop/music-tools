import type { Instrument } from './src/audio/Instrument';

type PlayedSequence = {
  notes: string[];
  secondsPerNote: number;
};

type PlayedProgression = {
  chords: string[][];
  secondsPerChord: number;
};

type FakeInstrument = {
  instrument: Instrument;
  playedChords: string[][];
  playedSequences: PlayedSequence[];
  playedProgressions: PlayedProgression[];
};

export function createFakeInstrument(): FakeInstrument {
  const playedChords: string[][] = [];
  const playedSequences: PlayedSequence[] = [];
  const playedProgressions: PlayedProgression[] = [];

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
    async playProgression(chords, secondsPerChord, onChordStart) {
      playedProgressions.push({ chords, secondsPerChord });
      chords.forEach((_chord, index) => {
        onChordStart(index);
      });
    },
    stop() {},
  };

  return { instrument, playedChords, playedSequences, playedProgressions };
}
