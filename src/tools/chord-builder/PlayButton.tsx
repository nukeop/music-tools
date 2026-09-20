import { Icon } from '@iconify/react/dist/offline';
import play from '@iconify-icons/lucide/play';
import { Button } from '../../components/Button';

type PlayButtonProps = {
  disabled: boolean;
  onClick: () => void;
};

export function PlayButton({ disabled, onClick }: PlayButtonProps) {
  return (
    <Button
      variant="primary"
      pressed
      aria-label="Play chord"
      disabled={disabled}
      onClick={onClick}
      className="size-9"
    >
      <Icon icon={play} className="size-5" />
    </Button>
  );
}
