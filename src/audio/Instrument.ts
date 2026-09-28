export type Instrument = {
  playChord(notes: string[]): Promise<void>;
  playSequence(
    notes: string[],
    secondsPerNote: number,
    onNoteStart: (index: number) => void,
  ): Promise<void>;
  playProgression(
    chords: string[][],
    secondsPerChord: number,
    onChordStart: (index: number) => void,
  ): Promise<void>;
  stop(): void;
};
