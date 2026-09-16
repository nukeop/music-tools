import { Icon } from '@iconify/react/dist/offline';
import play from '@iconify-icons/lucide/play';

type PlayButtonProps = {
  disabled: boolean;
  onClick: () => void;
};

function variantClassName(disabled: boolean): string {
  if (disabled) {
    return 'bg-overlay text-overlay-fg-muted';
  }
  return 'bg-primary text-primary-fg hover:bg-primary/80';
}

export function PlayButton({ disabled, onClick }: PlayButtonProps) {
  return (
    <button
      type="button"
      aria-label="Play chord"
      disabled={disabled}
      onClick={onClick}
      className={`flex h-9 w-9 items-center justify-center rounded-lg ${variantClassName(disabled)}`}
    >
      <Icon icon={play} className="size-5" />
    </button>
  );
}
