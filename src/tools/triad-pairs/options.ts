import type { ChoiceOption } from '../../components/ChoiceGroup';
import { TRIADS } from '../../theory/chords';
import { PATTERNS, type Pattern } from '../../theory/patterns';
import {
  DEGREES,
  type Degree,
  formatDegree,
  type TriadQuality,
} from '../../theory/triadPairs';

export const DEGREE_OPTIONS: ChoiceOption<Degree>[] = DEGREES.map((degree) => ({
  value: degree,
  label: formatDegree(degree),
}));

const TRIAD_QUALITY_KEYS: TriadQuality[] = [
  'major',
  'minor',
  'diminished',
  'augmented',
];

export const QUALITY_OPTIONS: ChoiceOption<TriadQuality>[] =
  TRIAD_QUALITY_KEYS.map((quality) => ({
    value: quality,
    label: TRIADS[quality].label,
  }));

export const PATTERN_OPTIONS: ChoiceOption<Pattern>[] = PATTERNS.map(
  ({ pattern, label }) => ({
    value: pattern,
    label,
  }),
);
