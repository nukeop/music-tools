import { ChoiceGroup } from '../../components/ChoiceGroup';
import { DEGREES, degreeNumeral } from '../../theory/progressions';

type DegreePickerProps = {
  selected: string;
  onSelect: (degree: string) => void;
};

const DEGREE_OPTIONS = DEGREES.map((degree) => ({
  value: degree,
  label: degreeNumeral(degree),
}));

export function DegreePicker({ selected, onSelect }: DegreePickerProps) {
  return (
    <ChoiceGroup
      groupLabel="Degree"
      options={DEGREE_OPTIONS}
      selected={selected}
      onChange={onSelect}
      className="grid grid-cols-8 gap-1.5"
      variant="neutral"
    />
  );
}
