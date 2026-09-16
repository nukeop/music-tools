import type { Segment } from '../components/SegmentedControl';
import { SegmentedControl } from '../components/SegmentedControl';
import { useInstrumentKey } from './InstrumentKeyProvider';
import type { InstrumentKey } from './instrumentKey';

const SEGMENTS: Segment<InstrumentKey>[] = [
  { value: 'C', label: 'C', ariaLabel: 'C instrument' },
  { value: 'Bb', label: 'B♭', ariaLabel: 'B flat instrument' },
  { value: 'Eb', label: 'E♭', ariaLabel: 'E flat instrument' },
];

export function InstrumentKeySwitch() {
  const { instrumentKey, setInstrumentKey } = useInstrumentKey();

  return (
    <SegmentedControl
      groupLabel="Instrument key"
      segments={SEGMENTS}
      selected={instrumentKey}
      onSelect={setInstrumentKey}
      className=""
      segmentClassName="h-8 w-9 text-sm"
    />
  );
}
