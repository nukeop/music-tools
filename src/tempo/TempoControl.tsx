import { Icon } from '@iconify/react/dist/offline';
import minus from '@iconify-icons/lucide/minus';
import plus from '@iconify-icons/lucide/plus';
import { Button } from '../components/Button';
import { TempoInput } from './TempoInput';
import { useTempo } from './TempoProvider';
import { clampTempo, TEMPO_STEP } from './tempo';

export function TempoControl() {
  const { tempo, setTempo } = useTempo();

  function step(amount: number) {
    setTempo(clampTempo(tempo + amount));
  }

  return (
    <fieldset
      aria-label="Tempo control"
      className="m-0 flex h-8 items-center overflow-hidden rounded-lg border-0 p-0"
    >
      <Button
        variant="neutral"
        shape="square"
        aria-label="Decrease tempo"
        onClick={() => step(-TEMPO_STEP)}
        className="h-8 w-7"
      >
        <Icon icon={minus} className="size-3.5" />
      </Button>
      <div className="flex h-8 items-center gap-1 bg-panel px-1.5">
        <TempoInput tempo={tempo} onCommit={setTempo} />
        <span className="text-xs text-panel-fg-muted">bpm</span>
      </div>
      <Button
        variant="neutral"
        shape="square"
        aria-label="Increase tempo"
        onClick={() => step(TEMPO_STEP)}
        className="h-8 w-7"
      >
        <Icon icon={plus} className="size-3.5" />
      </Button>
    </fieldset>
  );
}
