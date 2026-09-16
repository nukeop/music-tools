export type ChoiceOption = {
  value: string;
  label: string;
};

export type Tone = 'neutral' | 'primary' | 'positive' | 'negative';

type ChoiceGroupProps = {
  groupLabel: string;
  options: ChoiceOption[];
  selected: string | null;
  onChange: (value: string) => void;
  className: string;
  tone: Tone;
};

type ToneClassNames = {
  idle: string;
  selected: string;
};

const TONE_CLASS_NAMES: Record<Tone, ToneClassNames> = {
  neutral: {
    idle: 'bg-overlay text-overlay-fg hover:bg-overlay/70',
    selected: 'bg-primary text-primary-fg',
  },
  primary: {
    idle: 'bg-primary/15 text-panel-fg hover:bg-primary/25',
    selected: 'bg-primary text-primary-fg',
  },
  positive: {
    idle: 'bg-positive/15 text-panel-fg hover:bg-positive/25',
    selected: 'bg-positive text-positive-fg',
  },
  negative: {
    idle: 'bg-negative/15 text-panel-fg hover:bg-negative/25',
    selected: 'bg-negative text-negative-fg',
  },
};

function optionClassName(tone: Tone, isSelected: boolean): string {
  const base =
    'flex h-9 items-center justify-center rounded-lg text-xs font-semibold transition-colors sm:text-sm';

  if (isSelected) {
    return `${base} ${TONE_CLASS_NAMES[tone].selected}`;
  }

  return `${base} ${TONE_CLASS_NAMES[tone].idle}`;
}

export function ChoiceGroup({
  groupLabel,
  options,
  selected,
  onChange,
  className,
  tone,
}: ChoiceGroupProps) {
  return (
    <fieldset
      aria-label={groupLabel}
      className={`m-0 border-0 p-0 ${className}`}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={option.value === selected}
          onClick={() => onChange(option.value)}
          className={optionClassName(tone, option.value === selected)}
        >
          {option.label}
        </button>
      ))}
    </fieldset>
  );
}
