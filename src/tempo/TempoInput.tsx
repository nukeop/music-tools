import type { FocusEvent, KeyboardEvent } from 'react';
import { clampTempo, MAX_TEMPO, MIN_TEMPO, TEMPO_STEP } from './tempo';

type TempoInputProps = {
  tempo: number;
  onCommit: (tempo: number) => void;
};

function commit(input: HTMLInputElement, onCommit: (tempo: number) => void) {
  const parsed = input.valueAsNumber;
  if (Number.isNaN(parsed)) {
    return;
  }
  onCommit(clampTempo(parsed));
}

export function TempoInput({ tempo, onCommit }: TempoInputProps) {
  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    commit(event.target, onCommit);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      commit(event.currentTarget, onCommit);
    }
  }

  return (
    <input
      key={tempo}
      type="number"
      aria-label="Tempo"
      defaultValue={tempo}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      min={MIN_TEMPO}
      max={MAX_TEMPO}
      step={TEMPO_STEP}
      className="w-9 bg-transparent text-center text-sm font-semibold text-panel-fg outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
    />
  );
}
