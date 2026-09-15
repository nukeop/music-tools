import { ChoiceGroup } from '../../components/ChoiceGroup';
import { CHORD_TYPES } from '../../theory/chords';

type QualityPickerProps = {
  selected: string | null;
  onSelect: (chordType: string) => void;
};

export function QualityPicker({ selected, onSelect }: QualityPickerProps) {
  return (
    <ChoiceGroup
      groupLabel="Chord quality"
      options={CHORD_TYPES}
      selected={selected}
      onChange={onSelect}
      className="grid grid-cols-3 gap-2 sm:grid-cols-6"
    />
  );
}
