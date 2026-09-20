import { AccidentalSwitch } from '../../components/AccidentalSwitch';
import { Button } from '../../components/Button';
import { RootPicker } from '../../components/RootPicker';
import { Select } from '../../components/Select';
import type { Accidental } from '../../theory/chords';
import type { ScaleType } from '../../theory/scales';
import { SCALE_OPTIONS } from './options';

type ScalePickerProps = {
  tonic: string;
  accidental: Accidental;
  selectedScale: ScaleType;
  onTonicChange: (tonic: string) => void;
  onAccidentalChange: (accidental: Accidental) => void;
  onScaleChange: (scale: ScaleType) => void;
  onAdd: () => void;
};

const SCALE_SELECT_OPTIONS = SCALE_OPTIONS.map((option) => ({
  value: option.scale,
  label: option.label,
}));

export function ScalePicker({
  tonic,
  accidental,
  selectedScale,
  onTonicChange,
  onAccidentalChange,
  onScaleChange,
  onAdd,
}: ScalePickerProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl bg-panel p-3 sm:p-4">
      <div className="flex gap-1.5">
        <RootPicker
          selected={tonic}
          accidental={accidental}
          onSelect={onTonicChange}
        />
        <AccidentalSwitch
          selected={accidental}
          onSelect={onAccidentalChange}
          className="flex-col sm:flex-row"
        />
      </div>

      <div className="flex gap-1.5">
        <Select
          label="Scale"
          options={SCALE_SELECT_OPTIONS}
          selected={selectedScale}
          onChange={onScaleChange}
          className="flex-1"
        />
        <Button
          variant="primary"
          pressed
          onClick={onAdd}
          className="h-9 px-4 text-sm"
        >
          Add
        </Button>
      </div>
    </div>
  );
}
