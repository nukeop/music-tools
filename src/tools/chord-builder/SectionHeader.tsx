import type { ReactNode } from 'react';

type Surface = 'panel' | 'background';

const LABEL_COLOR: Record<Surface, string> = {
  panel: 'text-panel-fg-muted',
  background: 'text-background-fg-muted',
};

type SectionHeaderProps = {
  label: string;
  surface: Surface;
  children?: ReactNode;
};

export function SectionHeader({
  label,
  surface,
  children,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <span
        className={`text-xs font-semibold uppercase tracking-wide ${LABEL_COLOR[surface]}`}
      >
        {label}
      </span>
      {children}
    </div>
  );
}
