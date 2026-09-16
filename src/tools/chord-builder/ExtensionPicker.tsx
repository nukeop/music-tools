import { ChoiceGroup } from '../../components/ChoiceGroup';
import { EXTENSION_OPTIONS } from '../../theory/chords';

type ExtensionPickerProps = {
  selected: string | null;
  onSelect: (extension: string) => void;
};

export function ExtensionPicker({ selected, onSelect }: ExtensionPickerProps) {
  return (
    <ChoiceGroup
      groupLabel="Extension"
      options={EXTENSION_OPTIONS}
      selected={selected}
      onChange={onSelect}
      className="grid grid-cols-7 gap-1.5"
      tone="negative"
    />
  );
}
