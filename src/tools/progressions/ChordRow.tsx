import { Select } from '../../components/Select';
import {
  type Accidental,
  chordName,
  formatNote,
  spellTonic,
  TONICS,
} from '../../theory/chords';
import {
  type ChordQuality,
  type ProgressionChord,
  QUALITIES,
} from '../../theory/progressions';
import { QUALITY_OPTIONS } from './options';

type ChordRowProps = {
  index: number;
  chord: ProgressionChord;
  accidental: Accidental;
  onTonicChange: (tonic: string) => void;
  onQualityChange: (quality: ChordQuality) => void;
};

const QUALITY_SELECT_OPTIONS = QUALITY_OPTIONS.map((option) => ({
  value: option.quality,
  label: option.label,
}));

export function ChordRow({
  index,
  chord,
  accidental,
  onTonicChange,
  onQualityChange,
}: ChordRowProps) {
  const number = index + 1;
  const rootOptions = TONICS.map((tonic) => ({
    value: tonic,
    label: formatNote(spellTonic(tonic, accidental)),
  }));
  const name = chordName(
    spellTonic(chord.tonic, accidental),
    QUALITIES[chord.quality],
  );

  return (
    <div data-testid="progression-chord" className="flex items-center gap-2">
      <span className="w-5 shrink-0 text-center text-xs font-semibold text-panel-fg-muted">
        {number}
      </span>
      <Select
        label={`Chord ${number} root`}
        options={rootOptions}
        selected={chord.tonic}
        onChange={onTonicChange}
        className="w-20 shrink-0"
      />
      <Select
        label={`Chord ${number} quality`}
        options={QUALITY_SELECT_OPTIONS}
        selected={chord.quality}
        onChange={onQualityChange}
        className="flex-1"
      />
      <span
        data-testid="progression-chord-name"
        className="w-20 shrink-0 text-right text-lg font-bold text-panel-fg sm:w-28"
      >
        {name}
      </span>
    </div>
  );
}
