import { Note } from 'tonal';
import { NoteSlot, type SlotColor } from '../../components/NoteSlot';
import {
  degreeLabel,
  formatNote,
  type Triad,
  triadIntervals,
} from '../../theory/chords';

type TriadSlotsProps = {
  tonic: string | null;
  triad: Triad | null;
};

type SlotTone = {
  note: string;
  degree: string;
};

const SLOT_COLORS: SlotColor[] = ['primary', 'accent', 'secondary'];
const ROOT_INTERVAL = '1P';

function toneAt(
  index: number,
  tonic: string | null,
  triad: Triad | null,
): SlotTone | undefined {
  if (tonic === null) {
    return undefined;
  }
  if (triad !== null) {
    const interval = triadIntervals(triad)[index];
    return {
      note: formatNote(Note.transpose(tonic, interval)),
      degree: degreeLabel(interval),
    };
  }
  if (index === 0) {
    return { note: formatNote(tonic), degree: degreeLabel(ROOT_INTERVAL) };
  }
  return undefined;
}

export function TriadSlots({ tonic, triad }: TriadSlotsProps) {
  return (
    <div className="grid flex-[3] grid-cols-3 overflow-hidden rounded-xl">
      {SLOT_COLORS.map((color, index) => {
        const tone = toneAt(index, tonic, triad);
        return (
          <NoteSlot
            key={color}
            testId={`chord-slot-${index + 1}`}
            color={color}
            rounded={false}
            note={tone?.note}
            degree={tone?.degree}
          />
        );
      })}
    </div>
  );
}
