import { Note } from 'tonal';

export type InstrumentKey = 'C' | 'Bb' | 'Eb';

const CONCERT_PITCH_INTERVALS: Record<InstrumentKey, string> = {
  C: '1P',
  Bb: '-2M',
  Eb: '-6M',
};

export function toConcertPitch(notes: string[], key: InstrumentKey): string[] {
  const interval = CONCERT_PITCH_INTERVALS[key];
  return notes.map((note) => Note.transpose(note, interval));
}

const storageKey = 'instrumentKey';

export function readInitialInstrumentKey(): InstrumentKey {
  const stored = localStorage.getItem(storageKey) as InstrumentKey | null;
  if (stored) {
    return stored;
  }
  return 'C';
}

export function persistInstrumentKey(key: InstrumentKey) {
  localStorage.setItem(storageKey, key);
}
