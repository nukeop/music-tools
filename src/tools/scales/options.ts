import type { ScaleType } from '../../theory/scales';

export type ScaleOption = {
  scale: ScaleType;
  label: string;
};

export const SCALE_OPTIONS: ScaleOption[] = [
  { scale: 'major-pentatonic', label: 'Major pentatonic' },
  { scale: 'minor-pentatonic', label: 'Minor pentatonic' },
  { scale: 'major-blues', label: 'Major blues' },
  { scale: 'minor-blues', label: 'Minor blues' },
  { scale: 'altered', label: 'Altered' },
  { scale: 'harmonic-minor', label: 'Harmonic minor' },
  { scale: 'superphrygian', label: 'Superphrygian' },
  { scale: 'lydian-dominant', label: 'Lydian dominant' },
  { scale: 'half-whole-diminished', label: 'Half-whole diminished' },
  { scale: 'whole-half-diminished', label: 'Whole-half diminished' },
];
