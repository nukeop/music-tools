import { Interval, Note } from 'tonal';
import type { ChoiceOption } from '../components/ChoiceGroup';

export type Accidental = 'flat' | 'sharp';

export const TONICS: string[] = [
  'C',
  'Db',
  'D',
  'Eb',
  'E',
  'F',
  'Gb',
  'G',
  'Ab',
  'A',
  'Bb',
  'B',
];

export const CHORD_TYPES: ChoiceOption[] = [
  { value: 'major', label: 'Δ' },
  { value: 'minor', label: '-' },
  { value: 'diminished', label: '°' },
  { value: 'augmented', label: '+' },
  { value: 'sus2', label: 'sus2' },
  { value: 'sus4', label: 'sus4' },
];

const DEGREE_LABELS: Record<number, string> = {
  1: 'root',
  2: '2nd',
  3: '3rd',
  4: '4th',
  5: '5th',
};

export function spellTonic(tonic: string, accidental: Accidental): string {
  if (accidental === 'sharp') {
    return Note.enharmonic(tonic);
  }
  return tonic;
}

export function degreeLabel(interval: string): string {
  return DEGREE_LABELS[Interval.num(interval)];
}

export function formatNote(ascii: string): string {
  return ascii.replace('##', '𝄪').replace('b', '♭').replace('#', '♯');
}
