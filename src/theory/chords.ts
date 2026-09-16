import { Interval, Note } from 'tonal';

export type Accidental = 'flat' | 'sharp';

export type Triad =
  | 'major'
  | 'minor'
  | 'diminished'
  | 'augmented'
  | 'sus2'
  | 'sus4';

export type Seventh = '6' | '7' | 'maj7' | 'dim7';

export type Extension = 'b9' | '9' | '#9' | '11' | '#11' | 'b13' | '13';

export type ChordSelection = {
  triad: Triad | null;
  seventh: Seventh | null;
  extension: Extension | null;
};

export type ChordLayer = {
  label: string;
  intervals: string[];
};

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

export const TRIADS: Record<Triad, ChordLayer> = {
  major: { label: 'Δ', intervals: ['1P', '3M', '5P'] },
  minor: { label: '-', intervals: ['1P', '3m', '5P'] },
  diminished: { label: '°', intervals: ['1P', '3m', '5d'] },
  augmented: { label: '+', intervals: ['1P', '3M', '5A'] },
  sus2: { label: 'sus2', intervals: ['1P', '2M', '5P'] },
  sus4: { label: 'sus4', intervals: ['1P', '4P', '5P'] },
};

export const SEVENTHS: Record<Seventh, ChordLayer> = {
  '6': { label: '6', intervals: ['6M'] },
  '7': { label: '7', intervals: ['7m'] },
  maj7: { label: 'Δ7', intervals: ['7M'] },
  dim7: { label: '°7', intervals: ['7d'] },
};

export const EXTENSIONS: Record<Extension, ChordLayer> = {
  b9: { label: '♭9', intervals: ['9m'] },
  '9': { label: '9', intervals: ['9M'] },
  '#9': { label: '♯9', intervals: ['9A'] },
  '11': { label: '11', intervals: ['11P'] },
  '#11': { label: '♯11', intervals: ['11A'] },
  b13: { label: '♭13', intervals: ['13m'] },
  '13': { label: '13', intervals: ['13M'] },
};

const BASE_SYMBOLS: Record<Triad, Record<Seventh | 'none', string>> = {
  major: { none: '', '6': '6', '7': '7', maj7: 'Δ7', dim7: '(♭♭7)' },
  minor: { none: '-', '6': '-6', '7': '-7', maj7: '-Δ7', dim7: '-(♭♭7)' },
  diminished: { none: '°', '6': '°6', '7': 'ø7', maj7: '°Δ7', dim7: '°7' },
  augmented: { none: '+', '6': '+6', '7': '+7', maj7: '+Δ7', dim7: '+(♭♭7)' },
  sus2: {
    none: 'sus2',
    '6': '6sus2',
    '7': '7sus2',
    maj7: 'Δ7sus2',
    dim7: '(♭♭7)sus2',
  },
  sus4: {
    none: 'sus4',
    '6': '6sus4',
    '7': '7sus4',
    maj7: 'Δ7sus4',
    dim7: '(♭♭7)sus4',
  },
};

export function triadIntervals(triad: Triad): string[] {
  return TRIADS[triad].intervals;
}

export function seventhInterval(seventh: Seventh): string {
  return SEVENTHS[seventh].intervals[0];
}

export function extensionInterval(extension: Extension): string {
  return EXTENSIONS[extension].intervals[0];
}

function layerOf<K extends string>(
  table: Record<K, ChordLayer>,
  key: K | null,
): ChordLayer[] {
  if (key === null) {
    return [];
  }
  return [table[key]];
}

function selectedLayers(selection: ChordSelection): ChordLayer[] {
  return [
    ...layerOf(TRIADS, selection.triad),
    ...layerOf(SEVENTHS, selection.seventh),
    ...layerOf(EXTENSIONS, selection.extension),
  ];
}

export function chordIntervals(selection: ChordSelection): string[] {
  return selectedLayers(selection).flatMap((layer) => layer.intervals);
}

function extensionPart(
  seventh: Seventh | null,
  extension: Extension | null,
): string {
  if (extension === null) {
    return '';
  }
  if (seventh === '6' && extension === '9') {
    return '/9';
  }
  return `(${EXTENSIONS[extension].label})`;
}

export function chordName(
  spelledTonic: string | null,
  selection: ChordSelection,
): string {
  if (spelledTonic === null) {
    return '';
  }
  const root = formatNote(spelledTonic);
  const base =
    BASE_SYMBOLS[selection.triad ?? 'major'][selection.seventh ?? 'none'];
  const extension = extensionPart(selection.seventh, selection.extension);
  return `${root}${base}${extension}`;
}

export function spellTonic(tonic: string, accidental: Accidental): string;
export function spellTonic(tonic: null, accidental: Accidental): null;
export function spellTonic(
  tonic: string | null,
  accidental: Accidental,
): string | null;
export function spellTonic(
  tonic: string | null,
  accidental: Accidental,
): string | null {
  if (tonic === null) {
    return null;
  }
  if (accidental === 'sharp') {
    return Note.enharmonic(tonic);
  }
  return tonic;
}

export function degreeLabel(interval: string): string {
  const { num, alt } = Interval.get(interval);
  if (alt < 0) {
    return `${'♭'.repeat(-alt)}${num}`;
  }
  if (alt > 0) {
    return `${'♯'.repeat(alt)}${num}`;
  }
  return `${num}`;
}

export function formatNote(ascii: string): string {
  return ascii
    .replace('bb', '𝄫')
    .replace('##', '𝄪')
    .replace('b', '♭')
    .replace('#', '♯');
}
