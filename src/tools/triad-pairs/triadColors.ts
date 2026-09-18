export type TriadColorClasses = {
  card: string;
  caption: string;
  chip: string;
  chipActive: string;
  tone: string;
  toneShared: string;
  autoPressed: string;
  variant: 'primary' | 'accent';
};

export const TRIAD_COLORS: Record<1 | 2, TriadColorClasses> = {
  1: {
    card: 'bg-primary/10',
    caption: 'text-primary',
    chip: 'bg-primary/80 text-primary-fg',
    chipActive: 'bg-primary text-primary-fg ring-3 ring-primary/50',
    tone: 'text-primary',
    toneShared: 'text-primary underline decoration-accent',
    autoPressed: 'bg-primary/25 text-panel-fg',
    variant: 'primary',
  },
  2: {
    card: 'bg-accent/10',
    caption: 'text-accent',
    chip: 'bg-accent/80 text-accent-fg',
    chipActive: 'bg-accent text-accent-fg ring-3 ring-accent/50',
    tone: 'text-accent',
    toneShared: 'text-accent underline decoration-primary',
    autoPressed: 'bg-accent/25 text-panel-fg',
    variant: 'accent',
  },
};
