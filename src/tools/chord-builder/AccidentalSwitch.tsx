import type { Segment } from '../../components/SegmentedControl';
import { SegmentedControl } from '../../components/SegmentedControl';
import type { Accidental } from '../../theory/chords';

type AccidentalSwitchProps = {
  selected: Accidental;
  onSelect: (accidental: Accidental) => void;
};

const SEGMENTS: Segment<Accidental>[] = [
  { value: 'flat', label: '♭', ariaLabel: 'Flat' },
  { value: 'sharp', label: '♯', ariaLabel: 'Sharp' },
];

export function AccidentalSwitch({
  selected,
  onSelect,
}: AccidentalSwitchProps) {
  return (
    <SegmentedControl
      groupLabel="Note spelling"
      segments={SEGMENTS}
      selected={selected}
      onSelect={onSelect}
      className="flex-1 flex-col sm:flex-none sm:flex-row"
      segmentClassName="w-9 flex-1 text-sm sm:h-9 sm:flex-none"
    />
  );
}
