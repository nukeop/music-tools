import { Button } from '../../components/Button';
import { ChoiceGroup } from '../../components/ChoiceGroup';
import { Select } from '../../components/Select';
import type { Degree, TriadQuality } from '../../theory/triadPairs';
import { DEGREE_OPTIONS, QUALITY_OPTIONS } from './options';
import { TRIAD_COLORS } from './triadColors';

type TriadPickerProps = {
  index: 1 | 2;
  degree: Degree;
  quality: TriadQuality;
  auto: boolean;
  onDegreeChange: (degree: Degree) => void;
  onQualityChange: (quality: TriadQuality) => void;
  onAutoToggle: () => void;
};

export function TriadPicker({
  index,
  degree,
  quality,
  auto,
  onDegreeChange,
  onQualityChange,
  onAutoToggle,
}: TriadPickerProps) {
  const colors = TRIAD_COLORS[index];
  const label = `Triad ${index}`;

  return (
    <div className={`flex flex-1 flex-col gap-3 rounded-xl p-3 ${colors.card}`}>
      <Select
        label={`${label} degree`}
        options={DEGREE_OPTIONS}
        selected={degree}
        onChange={onDegreeChange}
      />
      <div className="flex gap-1.5">
        <ChoiceGroup
          groupLabel={`${label} quality`}
          options={QUALITY_OPTIONS}
          selected={quality}
          onChange={onQualityChange}
          className="grid flex-1 grid-cols-4 gap-1.5"
          variant={colors.variant}
        />
        <Button
          variant={colors.variant}
          pressed={auto}
          aria-label={`${label} auto quality`}
          onClick={onAutoToggle}
          className="h-9 px-2 text-xs sm:text-sm"
        >
          Auto
        </Button>
      </div>
    </div>
  );
}
