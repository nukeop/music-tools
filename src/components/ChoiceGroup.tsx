export type ChoiceOption<T extends string> = {
  value: T;
  label: string;
};

type Variant = 'neutral' | 'primary' | 'accent' | 'positive' | 'negative';

type ChoiceGroupProps<T extends string> = {
  groupLabel: string;
  options: ChoiceOption<T>[];
  selected: T | null;
  onChange: (value: T) => void;
  className?: string;
  variant: Variant;
};

type VariantClassNames = {
  idle: string;
  selected: string;
};

const VARIANT_CLASS_NAMES: Record<Variant, VariantClassNames> = {
  neutral: {
    idle: 'bg-overlay text-overlay-fg hover:bg-overlay/70',
    selected: 'bg-primary text-primary-fg',
  },
  primary: {
    idle: 'bg-primary/15 text-panel-fg hover:bg-primary/25',
    selected: 'bg-primary text-primary-fg',
  },
  accent: {
    idle: 'bg-accent/15 text-panel-fg hover:bg-accent/25',
    selected: 'bg-accent text-accent-fg',
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

function variantClassName(variant: Variant, isSelected: boolean): string {
  const base =
    'flex h-9 items-center justify-center rounded-lg text-xs font-semibold transition-colors sm:text-sm';

  if (isSelected) {
    return `${base} ${VARIANT_CLASS_NAMES[variant].selected}`;
  }

  return `${base} ${VARIANT_CLASS_NAMES[variant].idle}`;
}

export function ChoiceGroup<T extends string>({
  groupLabel,
  options,
  selected,
  onChange,
  className,
  variant,
}: ChoiceGroupProps<T>) {
  return (
    <fieldset
      aria-label={groupLabel}
      className={`m-0 border-0 p-0 ${className ?? ''}`}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={option.value === selected}
          onClick={() => onChange(option.value)}
          className={variantClassName(variant, option.value === selected)}
        >
          {option.label}
        </button>
      ))}
    </fieldset>
  );
}
