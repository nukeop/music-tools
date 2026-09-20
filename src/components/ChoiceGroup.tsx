import { Button, type ButtonVariant } from './Button';

export type ChoiceOption<T extends string> = {
  value: T;
  label: string;
};

type ChoiceGroupProps<T extends string> = {
  groupLabel: string;
  options: ChoiceOption<T>[];
  selected: T | null;
  onChange: (value: T) => void;
  className?: string;
  variant: ButtonVariant;
};

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
        <Button
          key={option.value}
          variant={variant}
          pressed={option.value === selected}
          onClick={() => onChange(option.value)}
          className="h-9 text-xs sm:text-sm"
        >
          {option.label}
        </Button>
      ))}
    </fieldset>
  );
}
