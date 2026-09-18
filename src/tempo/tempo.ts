export const MIN_TEMPO = 40;
export const MAX_TEMPO = 240;
export const TEMPO_STEP = 5;

const DEFAULT_TEMPO = 100;
const storageKey = 'tempo';

function isValidTempo(value: number): boolean {
  return Number.isInteger(value) && value >= MIN_TEMPO && value <= MAX_TEMPO;
}

export function clampTempo(value: number): number {
  return Math.min(MAX_TEMPO, Math.max(MIN_TEMPO, value));
}

export function eighthNoteSeconds(tempo: number): number {
  const beatSeconds = 60 / tempo;
  return beatSeconds / 2;
}

export function readInitialTempo(): number {
  const stored = Number(localStorage.getItem(storageKey));
  if (isValidTempo(stored)) {
    return stored;
  }
  return DEFAULT_TEMPO;
}

export function persistTempo(tempo: number) {
  localStorage.setItem(storageKey, String(tempo));
}
