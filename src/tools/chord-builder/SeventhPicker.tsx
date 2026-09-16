import { ChoiceGroup } from '../../components/ChoiceGroup';
import { SEVENTH_OPTIONS } from '../../theory/chords';

type SeventhPickerProps = {
  selected: string | null;
  onSelect: (seventh: string) => void;
};

export function SeventhPicker({ selected, onSelect }: SeventhPickerProps) {
  return (
    <ChoiceGroup
      groupLabel="Seventh"
      options={SEVENTH_OPTIONS}
      selected={selected}
      onChange={onSelect}
      className="grid grid-cols-4 gap-1.5 sm:flex-[4]"
      tone="positive"
    />
  );
}
