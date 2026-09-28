import {
  type Accidental,
  formatNote,
  spellTonic,
  TONICS,
} from '../theory/chords';
import { ChoiceGroup } from './ChoiceGroup';

type RootPickerProps = {
  selected: string | null;
  accidental: Accidental;
  onSelect: (tonic: string) => void;
  groupLabel?: string;
};

export function RootPicker({
  selected,
  accidental,
  onSelect,
  groupLabel = 'Root note',
}: RootPickerProps) {
  const options = TONICS.map((tonic) => ({
    value: tonic,
    label: formatNote(spellTonic(tonic, accidental)),
  }));

  return (
    <ChoiceGroup
      groupLabel={groupLabel}
      options={options}
      selected={selected}
      onChange={onSelect}
      className="grid flex-1 grid-cols-6 gap-1.5 sm:grid-cols-12"
      variant="neutral"
    />
  );
}
