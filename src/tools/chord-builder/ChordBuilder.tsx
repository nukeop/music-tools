import { useState } from 'react';
import { Note } from 'tonal';
import { useInstrument } from '../../audio/InstrumentProvider';
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
import { AccidentalSwitch } from './AccidentalSwitch';
import { ChordName } from './ChordName';
import { ChordSlots } from './ChordSlots';
import { ExtensionPicker } from './ExtensionPicker';
import { PlayButton } from './PlayButton';
import { RootPicker } from './RootPicker';
import { SeventhPicker } from './SeventhPicker';
import { TriadPicker } from './TriadPicker';

function toggle<T>(current: T | null, next: T): T | null {
  if (current === next) {
    return null;
  }
  return next;
}

function deriveSpelledTonic(
  tonic: string | null,
  accidental: Accidental,
): string | null {
  if (tonic === null) {
    return null;
  }
  return spellTonic(tonic, accidental);
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

  const spelledTonic = deriveSpelledTonic(tonic, accidental);
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

  function selectTonic(nextTonic: string) {
    setTonic(nextTonic);
    if (selection.triad !== null) {
      play(spellTonic(nextTonic, accidental), selection);
    }
  }

  function selectTriad(value: string) {
    const next = { ...selection, triad: value as Triad };
    setSelection(next);
    play(spelledTonic, next);
  }

  function selectSeventh(value: string) {
    const nextSeventh = toggle(selection.seventh, value as Seventh);
    let nextExtension = selection.extension;
    if (nextSeventh === null) {
      nextExtension = null;
    }
    const next: ChordSelection = {
      ...selection,
      seventh: nextSeventh,
      extension: nextExtension,
    };
    setSelection(next);
    play(spelledTonic, next);
  }

  function selectExtension(value: string) {
    const next = {
      ...selection,
      extension: toggle(selection.extension, value as Extension),
    };
    setSelection(next);
    play(spelledTonic, next);
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
            <AccidentalSwitch selected={accidental} onSelect={setAccidental} />
            <PlayButton
              disabled={playDisabled}
              onClick={() => play(spelledTonic, selection)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 sm:flex-row sm:gap-3">
          <TriadPicker selected={selection.triad} onSelect={selectTriad} />
          <SeventhPicker
            selected={selection.seventh}
            onSelect={selectSeventh}
          />
        </div>

        <ExtensionPicker
          selected={selection.extension}
          onSelect={selectExtension}
        />
      </div>

      <ChordName name={chordName(spelledTonic, selection)} />
      <ChordSlots tonic={spelledTonic} selection={selection} />
    </div>
  );
}
