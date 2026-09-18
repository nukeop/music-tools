import { Icon } from '@iconify/react/dist/offline';
import minus from '@iconify-icons/lucide/minus';
import plus from '@iconify-icons/lucide/plus';
import { SEGMENT_BASE_CLASSNAME } from '../components/segmentStyle';
import { TempoInput } from './TempoInput';
import { useTempo } from './TempoProvider';
import { clampTempo, TEMPO_STEP } from './tempo';

const STEP_BUTTON_CLASSNAME = `${SEGMENT_BASE_CLASSNAME} flex h-8 w-7 items-center justify-center bg-overlay text-overlay-fg-muted hover:text-overlay-fg`;

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
      <button
        type="button"
        aria-label="Decrease tempo"
        onClick={() => step(-TEMPO_STEP)}
        className={STEP_BUTTON_CLASSNAME}
      >
        <Icon icon={minus} className="size-3.5" />
      </button>
      <div className="flex h-8 items-center gap-1 bg-panel px-1.5">
        <TempoInput tempo={tempo} onCommit={setTempo} />
        <span className="text-xs text-panel-fg-muted">bpm</span>
      </div>
      <button
        type="button"
        aria-label="Increase tempo"
        onClick={() => step(TEMPO_STEP)}
        className={STEP_BUTTON_CLASSNAME}
      >
        <Icon icon={plus} className="size-3.5" />
      </button>
    </fieldset>
  );
}
