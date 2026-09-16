import { Note } from 'tonal';
import { NoteSlot, type SlotColor } from '../../components/NoteSlot';
import { degreeLabel, formatNote } from '../../theory/chords';

type LayerSlotProps = {
  testId: string;
  tonic: string | null;
  interval: string;
  color: SlotColor;
};

function noteFor(tonic: string | null, interval: string): string | undefined {
  if (tonic === null) {
    return undefined;
  }
  return formatNote(Note.transpose(tonic, interval));
}

export function LayerSlot({ testId, tonic, interval, color }: LayerSlotProps) {
  const note = noteFor(tonic, interval);

  return (
    <div className="flex-1">
      <NoteSlot
        testId={testId}
        color={color}
        note={note}
        degree={degreeLabel(interval)}
      />
    </div>
  );
}
