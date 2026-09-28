import { useState } from 'react';
import { Note } from 'tonal';
import { useInstrument } from '../../audio/InstrumentProvider';
import { AccidentalSwitch } from '../../components/AccidentalSwitch';
import { ChordLayerPicker } from '../../components/ChordLayerPicker';
import { RootPicker } from '../../components/RootPicker';
import { useInstrumentKey } from '../../instrument-key/InstrumentKeyProvider';
import { toConcertPitch } from '../../instrument-key/instrumentKey';
import {
  type Accidental,
  type ChordSelection,
  chordIntervals,
  chordName,
  spellTonic,
} from '../../theory/chords';
import { ChordName } from './ChordName';
import { ChordSlots } from './ChordSlots';
import { PlayButton } from './PlayButton';

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

        <ChordLayerPicker selection={selection} onChange={updateSelection} />
      </div>

      <ChordName name={chordName(spelledTonic, selection)} />
      <ChordSlots tonic={spelledTonic} selection={selection} />
    </div>
  );
}
