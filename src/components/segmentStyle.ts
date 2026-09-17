export const SEGMENT_BASE_CLASSNAME = 'font-semibold transition-colors';

export function segmentVariantClassName(isSelected: boolean): string {
  if (isSelected) {
    return 'bg-primary text-primary-fg';
  }
  return 'bg-overlay text-overlay-fg-muted hover:text-overlay-fg';
}
