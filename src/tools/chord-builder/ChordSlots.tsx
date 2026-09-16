import {
  type ChordSelection,
  extensionInterval,
  seventhInterval,
} from '../../theory/chords';
import { LayerSlot } from './LayerSlot';
import { TriadSlots } from './TriadSlots';

type ChordSlotsProps = {
  tonic: string | null;
  selection: ChordSelection;
};

export function ChordSlots({ tonic, selection }: ChordSlotsProps) {
  return (
    <div className="mx-auto flex w-full max-w-[26rem] gap-2 sm:gap-3">
      <TriadSlots tonic={tonic} triad={selection.triad} />
      {selection.seventh !== null && (
        <LayerSlot
          testId="chord-slot-4"
          tonic={tonic}
          interval={seventhInterval(selection.seventh)}
          color="positive"
        />
      )}
      {selection.extension !== null && (
        <LayerSlot
          testId="chord-slot-5"
          tonic={tonic}
          interval={extensionInterval(selection.extension)}
          color="negative"
        />
      )}
    </div>
  );
}
