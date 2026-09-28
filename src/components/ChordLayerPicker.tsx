import type {
  ChordSelection,
  Extension,
  Seventh,
  Triad,
} from '../theory/chords';
import { ChoiceGroup } from './ChoiceGroup';
import {
  EXTENSION_OPTIONS,
  SEVENTH_OPTIONS,
  TRIAD_OPTIONS,
} from './chordLayerOptions';

type ChordLayerPickerProps = {
  selection: ChordSelection;
  onChange: (selection: ChordSelection) => void;
};

function toggle<T>(current: T | null, next: T): T | null {
  if (current === next) {
    return null;
  }
  return next;
}

export function ChordLayerPicker({
  selection,
  onChange,
}: ChordLayerPickerProps) {
  function selectTriad(triad: Triad) {
    onChange({ ...selection, triad });
  }

  function selectSeventh(seventh: Seventh) {
    const nextSeventh = toggle(selection.seventh, seventh);
    let nextExtension = selection.extension;
    if (nextSeventh === null) {
      nextExtension = null;
    }
    onChange({
      ...selection,
      seventh: nextSeventh,
      extension: nextExtension,
    });
  }

  function selectExtension(extension: Extension) {
    onChange({
      ...selection,
      extension: toggle(selection.extension, extension),
    });
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5 sm:flex-row sm:gap-3">
        <ChoiceGroup
          groupLabel="Triad"
          options={TRIAD_OPTIONS}
          selected={selection.triad}
          onChange={selectTriad}
          className="grid grid-cols-6 gap-1.5 sm:flex-[6]"
          variant="primary"
        />
        <ChoiceGroup
          groupLabel="Seventh"
          options={SEVENTH_OPTIONS}
          selected={selection.seventh}
          onChange={selectSeventh}
          className="grid grid-cols-4 gap-1.5 sm:flex-[4]"
          variant="positive"
        />
      </div>

      <ChoiceGroup
        groupLabel="Extension"
        options={EXTENSION_OPTIONS}
        selected={selection.extension}
        onChange={selectExtension}
        className="grid grid-cols-7 gap-1.5"
        variant="negative"
      />
    </div>
  );
}
