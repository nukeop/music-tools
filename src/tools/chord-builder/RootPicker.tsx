import { ChoiceGroup } from '../../components/ChoiceGroup';
import {
  type Accidental,
  formatNote,
  spellTonic,
  TONICS,
} from '../../theory/chords';

type RootPickerProps = {
  selected: string | null;
  accidental: Accidental;
  onSelect: (tonic: string) => void;
};

export function RootPicker({
  selected,
  accidental,
  onSelect,
}: RootPickerProps) {
  const options = TONICS.map((tonic) => ({
    value: tonic,
    label: formatNote(spellTonic(tonic, accidental)),
  }));

  return (
    <ChoiceGroup
      groupLabel="Root note"
      options={options}
      selected={selected}
      onChange={onSelect}
      className="grid flex-1 grid-cols-6 gap-1.5 sm:grid-cols-12"
      tone="neutral"
    />
  );
}
