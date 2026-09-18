import { ChoiceGroup } from '../../components/ChoiceGroup';
import type { Degree, TriadQuality } from '../../theory/triadPairs';
import { DegreeSelect } from './DegreeSelect';
import { QUALITY_OPTIONS } from './options';
import { TRIAD_COLORS, type TriadColorClasses } from './triadColors';

type TriadPickerProps = {
  index: 1 | 2;
  degree: Degree;
  quality: TriadQuality;
  auto: boolean;
  onDegreeChange: (degree: Degree) => void;
  onQualityChange: (quality: TriadQuality) => void;
  onAutoToggle: () => void;
};

const AUTO_BASE =
  'flex h-9 items-center justify-center rounded-lg px-2 text-xs font-semibold transition-colors sm:text-sm';
const AUTO_IDLE = `${AUTO_BASE} bg-overlay/50 text-overlay-fg-muted hover:text-overlay-fg`;

function autoClassName(colors: TriadColorClasses, isPressed: boolean): string {
  if (isPressed) {
    return `${AUTO_BASE} ${colors.autoPressed}`;
  }
  return AUTO_IDLE;
}

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
      <DegreeSelect
        label={`${label} degree`}
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
        <button
          type="button"
          aria-label={`${label} auto quality`}
          aria-pressed={auto}
          onClick={onAutoToggle}
          className={autoClassName(colors, auto)}
        >
          Auto
        </button>
      </div>
    </div>
  );
}
