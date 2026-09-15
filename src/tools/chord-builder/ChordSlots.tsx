import type { Chord } from 'tonal';
import { NoteSlot, type SlotColor } from '../../components/NoteSlot';
import { degreeLabel, formatNote } from '../../theory/chords';

type ChordSlotsProps = {
  tonic: string | null;
  chord: Chord.Chord | null;
};

type SlotTone = {
  note: string;
  degree: string;
};

const SLOT_COLORS: SlotColor[] = ['primary', 'accent', 'secondary'];

function toneAt(
  index: number,
  tonic: string | null,
  chord: Chord.Chord | null,
): SlotTone | undefined {
  if (chord !== null) {
    return {
      note: chord.notes[index],
      degree: degreeLabel(chord.intervals[index]),
    };
  }
  if (index === 0 && tonic !== null) {
    return { note: tonic, degree: 'root' };
  }
  return undefined;
}

function displayNote(tone: SlotTone | undefined): string | undefined {
  if (tone === undefined) {
    return undefined;
  }
  return formatNote(tone.note);
}

export function ChordSlots({ tonic, chord }: ChordSlotsProps) {
  return (
    <div className="mx-auto grid w-full max-w-[26rem] grid-cols-3 gap-2 sm:gap-3">
      {SLOT_COLORS.map((color, index) => {
        const tone = toneAt(index, tonic, chord);
        return (
          <NoteSlot
            key={color}
            testId={`chord-slot-${index + 1}`}
            color={color}
            note={displayNote(tone)}
            degree={tone?.degree}
          />
        );
      })}
    </div>
  );
}
