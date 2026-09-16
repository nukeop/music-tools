import { ChoiceGroup } from '../../components/ChoiceGroup';
import { TRIAD_OPTIONS } from '../../theory/chords';

type TriadPickerProps = {
  selected: string | null;
  onSelect: (triad: string) => void;
};

export function TriadPicker({ selected, onSelect }: TriadPickerProps) {
  return (
    <ChoiceGroup
      groupLabel="Triad"
      options={TRIAD_OPTIONS}
      selected={selected}
      onChange={onSelect}
      className="grid grid-cols-6 gap-1.5 sm:flex-[6]"
      tone="primary"
    />
  );
}
