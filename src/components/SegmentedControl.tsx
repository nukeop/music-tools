export type Segment<T extends string> = {
  value: T;
  label: string;
  ariaLabel: string;
};

type SegmentedControlProps<T extends string> = {
  groupLabel: string;
  segments: Segment<T>[];
  selected: T;
  onSelect: (value: T) => void;
  className?: string;
  segmentClassName: string;
};

function variantClassName(isSelected: boolean): string {
  if (isSelected) {
    return 'bg-primary text-primary-fg';
  }
  return 'bg-overlay text-overlay-fg-muted hover:text-overlay-fg';
}

export function SegmentedControl<T extends string>({
  groupLabel,
  segments,
  selected,
  onSelect,
  className,
  segmentClassName,
}: SegmentedControlProps<T>) {
  return (
    <fieldset
      aria-label={groupLabel}
      className={`m-0 flex overflow-hidden rounded-lg border-0 p-0 ${className ?? ''}`}
    >
      {segments.map((segment) => (
        <button
          key={segment.value}
          type="button"
          aria-label={segment.ariaLabel}
          aria-pressed={segment.value === selected}
          onClick={() => onSelect(segment.value)}
          className={`${segmentClassName} font-semibold transition-colors ${variantClassName(segment.value === selected)}`}
        >
          {segment.label}
        </button>
      ))}
    </fieldset>
  );
}
