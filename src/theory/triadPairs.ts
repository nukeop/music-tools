import { Note } from 'tonal';
import { TRIADS, type Triad } from './chords';

export type Degree =
  | 'I'
  | 'bII'
  | 'II'
  | 'bIII'
  | 'III'
  | 'IV'
  | '#IV'
  | 'bV'
  | 'V'
  | 'bVI'
  | 'VI'
  | 'bVII'
  | 'VII';

const DEGREE_INTERVALS: Record<Degree, string> = {
  I: '1P',
  bII: '2m',
  II: '2M',
  bIII: '3m',
  III: '3M',
  IV: '4P',
  '#IV': '4A',
  bV: '5d',
  V: '5P',
  bVI: '6m',
  VI: '6M',
  bVII: '7m',
  VII: '7M',
};

export const DEGREES: Degree[] = Object.keys(DEGREE_INTERVALS) as Degree[];

function degreeInterval(degree: Degree): string {
  return DEGREE_INTERVALS[degree];
}

export function formatDegree(degree: Degree): string {
  return degree.replace('b', '♭').replace('#', '♯');
}

export type TriadQuality = Extract<
  Triad,
  'major' | 'minor' | 'augmented' | 'diminished'
>;

const AUTO_QUALITY: Record<Degree, TriadQuality> = {
  I: 'major',
  bII: 'major',
  II: 'minor',
  bIII: 'major',
  III: 'minor',
  IV: 'major',
  '#IV': 'diminished',
  bV: 'diminished',
  V: 'major',
  bVI: 'major',
  VI: 'minor',
  bVII: 'major',
  VII: 'diminished',
};

export function autoQuality(degree: Degree): TriadQuality {
  return AUTO_QUALITY[degree];
}

export function triadNotes(
  key: string,
  degree: Degree,
  quality: TriadQuality,
): string[] {
  const root = Note.transpose(key, degreeInterval(degree));
  return TRIADS[quality].intervals.map((interval) =>
    Note.transpose(root, interval),
  );
}

export function sharedNotes(a: string[], b: string[]): string[] {
  return a.filter((note) => b.includes(note));
}
