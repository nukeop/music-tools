export type ChoiceOption = {
  value: string;
  label: string;
};

type ChoiceGroupProps = {
  groupLabel: string;
  options: ChoiceOption[];
  selected: string | null;
  onChange: (value: string) => void;
  className: string;
};

function optionClassName(isSelected: boolean): string {
  const base =
    'flex h-10 items-center justify-center rounded-lg text-sm font-semibold transition-colors';

  if (isSelected) {
    return `${base} bg-primary text-primary-fg`;
  }

  return `${base} bg-overlay text-overlay-fg hover:bg-panel hover:text-panel-fg`;
}

export function ChoiceGroup({
  groupLabel,
  options,
  selected,
  onChange,
  className,
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
          className={optionClassName(option.value === selected)}
        >
          {option.label}
        </button>
      ))}
    </fieldset>
  );
}
