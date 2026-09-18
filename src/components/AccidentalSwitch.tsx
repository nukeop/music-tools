import type { Accidental } from '../theory/chords';
import type { Segment } from './SegmentedControl';
import { SegmentedControl } from './SegmentedControl';

type AccidentalSwitchProps = {
  selected: Accidental;
  onSelect: (accidental: Accidental) => void;
  className?: string;
};

const SEGMENTS: Segment<Accidental>[] = [
  { value: 'flat', label: '♭', ariaLabel: 'Flat' },
  { value: 'sharp', label: '♯', ariaLabel: 'Sharp' },
];

export function AccidentalSwitch({
  selected,
  onSelect,
  className,
}: AccidentalSwitchProps) {
  return (
    <SegmentedControl
      groupLabel="Note spelling"
      segments={SEGMENTS}
      selected={selected}
      onSelect={onSelect}
      className={className}
      segmentClassName="h-9 w-9 text-sm"
    />
  );
}
