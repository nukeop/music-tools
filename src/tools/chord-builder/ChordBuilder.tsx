import { useState } from 'react';
import { Note } from 'tonal';
import { useInstrument } from '../../audio/InstrumentProvider';
import { AccidentalSwitch } from '../../components/AccidentalSwitch';
import { ChoiceGroup } from '../../components/ChoiceGroup';
import { RootPicker } from '../../components/RootPicker';
import { useInstrumentKey } from '../../instrument-key/InstrumentKeyProvider';
import { toConcertPitch } from '../../instrument-key/instrumentKey';
import {
  type Accidental,
  type ChordSelection,
  chordIntervals,
  chordName,
  type Extension,
  type Seventh,
  spellTonic,
  type Triad,
} from '../../theory/chords';
import { ChordName } from './ChordName';
import { ChordSlots } from './ChordSlots';
import {
  EXTENSION_OPTIONS,
  SEVENTH_OPTIONS,
  TRIAD_OPTIONS,
} from './layerOptions';
import { PlayButton } from './PlayButton';

function toggle<T>(current: T | null, next: T): T | null {
  if (current === next) {
    return null;
  }
  return next;
}

export function ChordBuilder() {
  const instrument = useInstrument();
  const { instrumentKey } = useInstrumentKey();
  const [tonic, setTonic] = useState<string | null>(null);
  const [accidental, setAccidental] = useState<Accidental>('flat');
  const [selection, setSelection] = useState<ChordSelection>({
    triad: null,
    seventh: null,
    extension: null,
  });

  const spelledTonic = spellTonic(tonic, accidental);
  const playDisabled = tonic === null || selection.triad === null;

  function play(nextTonic: string | null, nextSelection: ChordSelection) {
    if (nextTonic === null) {
      return;
    }
    const notes = chordIntervals(nextSelection).map((interval) =>
      Note.transpose(`${nextTonic}4`, interval),
    );
    void instrument.playChord(toConcertPitch(notes, instrumentKey));
  }

  function updateSelection(next: ChordSelection) {
    setSelection(next);
    play(spelledTonic, next);
  }

  function selectTonic(nextTonic: string) {
    setTonic(nextTonic);
    if (selection.triad !== null) {
      play(spellTonic(nextTonic, accidental), selection);
    }
  }

  function selectTriad(triad: Triad) {
    updateSelection({ ...selection, triad });
  }

  function selectSeventh(seventh: Seventh) {
    const nextSeventh = toggle(selection.seventh, seventh);
    let nextExtension = selection.extension;
    if (nextSeventh === null) {
      nextExtension = null;
    }
    updateSelection({
      ...selection,
      seventh: nextSeventh,
      extension: nextExtension,
    });
  }

  function selectExtension(extension: Extension) {
    updateSelection({
      ...selection,
      extension: toggle(selection.extension, extension),
    });
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 p-4 sm:p-6">
      <div className="flex flex-col gap-3 rounded-xl bg-panel p-3 sm:p-4">
        <div className="flex gap-1.5">
          <RootPicker
            selected={tonic}
            accidental={accidental}
            onSelect={selectTonic}
          />
          <div className="flex flex-col gap-1.5 sm:flex-row">
            <AccidentalSwitch
              selected={accidental}
              onSelect={setAccidental}
              className="flex-1 flex-col sm:flex-none sm:flex-row"
            />
            <PlayButton
              disabled={playDisabled}
              onClick={() => play(spelledTonic, selection)}
            />
          </div>
        </div>

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

      <ChordName name={chordName(spelledTonic, selection)} />
      <ChordSlots tonic={spelledTonic} selection={selection} />
    </div>
  );
}
