import { Button } from './Button';

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
        <Button
          key={segment.value}
          variant="neutral"
          shape="square"
          pressed={segment.value === selected}
          aria-label={segment.ariaLabel}
          onClick={() => onSelect(segment.value)}
          className={segmentClassName}
        >
          {segment.label}
        </Button>
      ))}
    </fieldset>
  );
}
