import {
  alignRegister,
  type Direction,
  type Pitch,
  pitchName,
  voiceMelody,
} from './pitches';

export type Pattern =
  | 'ascending'
  | 'descending'
  | 'zigzag'
  | 'arch'
  | 'valley'
  | 'interleaved';

type PatternInfo = {
  pattern: Pattern;
  label: string;
};

export const PATTERNS: PatternInfo[] = [
  { pattern: 'ascending', label: 'Ascending' },
  { pattern: 'descending', label: 'Descending' },
  { pattern: 'zigzag', label: 'Zigzag' },
  { pattern: 'arch', label: 'Arch' },
  { pattern: 'valley', label: 'Valley' },
  { pattern: 'interleaved', label: 'Interleaved' },
];

type TriadOrder = readonly [number, number, number];

type TriadSegment = {
  order: TriadOrder;
  direction: Direction;
};

type CombineMode = 'sequence' | 'alternating';

type PatternDefinition = {
  triad1: TriadSegment;
  triad2: TriadSegment;
  combine: CombineMode;
};

const ROOT_UP: TriadSegment = { order: [0, 1, 2], direction: 'up' };
const FIFTH_DOWN: TriadSegment = { order: [2, 1, 0], direction: 'down' };
const THIRD_DOWN: TriadSegment = { order: [1, 0, 2], direction: 'down' };

const PATTERN_DEFINITIONS: Record<Pattern, PatternDefinition> = {
  ascending: { triad1: ROOT_UP, triad2: ROOT_UP, combine: 'sequence' },
  descending: { triad1: FIFTH_DOWN, triad2: FIFTH_DOWN, combine: 'sequence' },
  zigzag: { triad1: ROOT_UP, triad2: THIRD_DOWN, combine: 'sequence' },
  arch: { triad1: ROOT_UP, triad2: FIFTH_DOWN, combine: 'sequence' },
  valley: { triad1: FIFTH_DOWN, triad2: ROOT_UP, combine: 'sequence' },
  interleaved: { triad1: ROOT_UP, triad2: ROOT_UP, combine: 'alternating' },
};

export type LineEntry = {
  note: string;
  triad: 1 | 2;
};

function orderedNotes(notes: string[], order: TriadOrder): string[] {
  return order.map((index) => notes[index]);
}

function rotateLeft<T>(items: readonly T[], count: number): T[] {
  return [...items.slice(count), ...items.slice(0, count)];
}

function sequenceCombine(t1: string[], t2: string[]): LineEntry[] {
  return [
    ...t1.map((note): LineEntry => ({ note, triad: 1 })),
    ...t2.map((note): LineEntry => ({ note, triad: 2 })),
  ];
}

function alternatingCombine(t1: string[], t2: string[]): LineEntry[] {
  return t1.flatMap((note, index): LineEntry[] => [
    { note, triad: 1 },
    { note: t2[index], triad: 2 },
  ]);
}

const COMBINERS: Record<
  CombineMode,
  (t1: string[], t2: string[]) => LineEntry[]
> = {
  sequence: sequenceCombine,
  alternating: alternatingCombine,
};

export function patternLines(
  pattern: Pattern,
  triad1Notes: string[],
  triad2Notes: string[],
): LineEntry[][] {
  const definition = PATTERN_DEFINITIONS[pattern];
  const orderedTriad1 = orderedNotes(triad1Notes, definition.triad1.order);
  const orderedTriad2 = orderedNotes(triad2Notes, definition.triad2.order);
  const combine = COMBINERS[definition.combine];
  return [0, 1, 2].map((rotation) =>
    combine(
      rotateLeft(orderedTriad1, rotation),
      rotateLeft(orderedTriad2, rotation),
    ),
  );
}

const START_OCTAVE = 4;

function voiceTriad(notes: string[], segment: TriadSegment): Pitch[] {
  const directions = [segment.direction, segment.direction];
  return voiceMelody(notes, directions, START_OCTAVE);
}

function voiceSequence(
  definition: PatternDefinition,
  notes: string[],
): Pitch[] {
  const triad1 = voiceTriad(notes.slice(0, 3), definition.triad1);
  const triad2 = voiceTriad(notes.slice(3), definition.triad2);
  return [...triad1, ...alignRegister(triad1, triad2)];
}

function voiceAlternating(notes: string[]): Pitch[] {
  const directions = notes.slice(1).map((): Direction => 'up');
  return voiceMelody(notes, directions, START_OCTAVE);
}

function voiceLine(definition: PatternDefinition, notes: string[]): Pitch[] {
  if (definition.combine === 'sequence') {
    return voiceSequence(definition, notes);
  }
  return voiceAlternating(notes);
}

export function linePitches(pattern: Pattern, line: LineEntry[]): string[] {
  const definition = PATTERN_DEFINITIONS[pattern];
  const notes = line.map((entry) => entry.note);
  return voiceLine(definition, notes).map(pitchName);
}
