import { Icon } from '@iconify/react/dist/offline';
import play from '@iconify-icons/lucide/play';
import square from '@iconify-icons/lucide/square';
import { Button } from '../../components/Button';
import { Select } from '../../components/Select';
import {
  CHORDS_PER_BAR_CHOICES,
  countOptions,
  MAX_BARS,
  MAX_CHORDS,
} from './options';

type ProgressionSettingsProps = {
  chordCount: number;
  bars: number;
  chordsPerBar: number;
  playing: boolean;
  onChordCountChange: (count: number) => void;
  onBarsChange: (bars: number) => void;
  onChordsPerBarChange: (chordsPerBar: number) => void;
  onPlay: () => void;
  onStop: () => void;
};

const CHORD_COUNT_OPTIONS = countOptions(MAX_CHORDS);
const BAR_OPTIONS = countOptions(MAX_BARS);
const CHORDS_PER_BAR_OPTIONS = CHORDS_PER_BAR_CHOICES.map((choice) => ({
  value: String(choice),
  label: String(choice),
}));

type LabeledSelectProps = {
  label: string;
  options: { value: string; label: string }[];
  selected: number;
  onChange: (value: number) => void;
};

function LabeledSelect({
  label,
  options,
  selected,
  onChange,
}: LabeledSelectProps) {
  return (
    <div className="flex flex-1 flex-col gap-1">
      <span className="text-xs font-semibold text-panel-fg-muted">{label}</span>
      <Select
        label={label}
        options={options}
        selected={String(selected)}
        onChange={(value) => onChange(Number(value))}
      />
    </div>
  );
}

function PlayStopButton({
  playing,
  onPlay,
  onStop,
}: Pick<ProgressionSettingsProps, 'playing' | 'onPlay' | 'onStop'>) {
  if (playing) {
    return (
      <Button
        variant="negative"
        pressed
        aria-label="Stop progression"
        onClick={onStop}
        className="size-9"
      >
        <Icon icon={square} className="size-4" />
      </Button>
    );
  }
  return (
    <Button
      variant="primary"
      pressed
      aria-label="Play progression"
      onClick={onPlay}
      className="size-9"
    >
      <Icon icon={play} className="size-5" />
    </Button>
  );
}

export function ProgressionSettings({
  chordCount,
  bars,
  chordsPerBar,
  playing,
  onChordCountChange,
  onBarsChange,
  onChordsPerBarChange,
  onPlay,
  onStop,
}: ProgressionSettingsProps) {
  return (
    <div className="flex items-end gap-1.5 sm:gap-3">
      <div className="flex flex-1 gap-1.5">
        <LabeledSelect
          label="Chords"
          options={CHORD_COUNT_OPTIONS}
          selected={chordCount}
          onChange={onChordCountChange}
        />
        <LabeledSelect
          label="Bars"
          options={BAR_OPTIONS}
          selected={bars}
          onChange={onBarsChange}
        />
        <LabeledSelect
          label="Chords per bar"
          options={CHORDS_PER_BAR_OPTIONS}
          selected={chordsPerBar}
          onChange={onChordsPerBarChange}
        />
      </div>
      <div className="flex justify-end">
        <PlayStopButton playing={playing} onPlay={onPlay} onStop={onStop} />
      </div>
    </div>
  );
}
