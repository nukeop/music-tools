export type Instrument = {
  playChord(notes: string[]): Promise<void>;
  playSequence(
    notes: string[],
    secondsPerNote: number,
    onNoteStart: (index: number) => void,
  ): Promise<void>;
};
