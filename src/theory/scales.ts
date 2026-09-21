import { Note } from 'tonal';
import { formatNote } from './chords';

export type ScaleType =
  | 'major-pentatonic'
  | 'minor-pentatonic'
  | 'major-blues'
  | 'minor-blues'
  | 'dorian'
  | 'aeolian'
  | 'altered'
  | 'harmonic-minor'
  | 'byzantine'
  | 'superphrygian'
  | 'lydian-dominant'
  | 'half-whole-diminished'
  | 'whole-half-diminished';

export type ScaleDefinition = {
  label: string;
  intervals: string[];
};

export const SCALES: Record<ScaleType, ScaleDefinition> = {
  'major-pentatonic': {
    label: 'major pentatonic',
    intervals: ['1P', '2M', '3M', '5P', '6M'],
  },
  'minor-pentatonic': {
    label: 'minor pentatonic',
    intervals: ['1P', '3m', '4P', '5P', '7m'],
  },
  'major-blues': {
    label: 'major blues',
    intervals: ['1P', '2M', '3m', '3M', '5P', '6M'],
  },
  'minor-blues': {
    label: 'minor blues',
    intervals: ['1P', '3m', '4P', '5d', '5P', '7m'],
  },
  dorian: {
    label: 'dorian',
    intervals: ['1P', '2M', '3m', '4P', '5P', '6M', '7m'],
  },
  aeolian: {
    label: 'aeolian',
    intervals: ['1P', '2M', '3m', '4P', '5P', '6m', '7m'],
  },
  altered: {
    label: 'altered',
    intervals: ['1P', '2m', '3m', '3M', '5d', '6m', '7m'],
  },
  'harmonic-minor': {
    label: 'harmonic minor',
    intervals: ['1P', '2M', '3m', '4P', '5P', '6m', '7M'],
  },
  byzantine: {
    label: 'byzantine',
    intervals: ['1P', '2m', '3M', '4P', '5P', '6m', '7M'],
  },
  superphrygian: {
    label: 'superphrygian',
    intervals: ['1P', '2m', '3M', '4P', '5P', '6m', '7m'],
  },
  'lydian-dominant': {
    label: 'lydian dominant',
    intervals: ['1P', '2M', '3M', '4A', '5P', '6M', '7m'],
  },
  'half-whole-diminished': {
    label: 'half-whole diminished',
    intervals: ['1P', '2m', '3m', '3M', '4A', '5P', '6M', '7m'],
  },
  'whole-half-diminished': {
    label: 'whole-half diminished',
    intervals: ['1P', '2M', '3m', '4P', '5d', '6m', '6M', '7M'],
  },
};

function withoutDoubleAccidental(note: string): string {
  if (Math.abs(Note.get(note).alt) < 2) {
    return note;
  }
  return Note.simplify(note);
}

export function scaleNotes(
  spelledRoot: string,
  scaleType: ScaleType,
): string[] {
  const definition = SCALES[scaleType];
  return definition.intervals.map((interval) =>
    withoutDoubleAccidental(Note.transpose(spelledRoot, interval)),
  );
}

export function scaleName(root: string, scale: ScaleType): string {
  return `${formatNote(root)} ${SCALES[scale].label}`;
}
