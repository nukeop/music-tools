import { useState } from 'react';
import { Chord } from 'tonal';
import { useInstrument } from '../../audio/InstrumentProvider';
import { type Accidental, spellTonic } from '../../theory/chords';
import { AccidentalSwitch } from './AccidentalSwitch';
import { ChordSlots } from './ChordSlots';
import { QualityPicker } from './QualityPicker';
import { RootPicker } from './RootPicker';
import { SectionHeader } from './SectionHeader';

function deriveSpelledTonic(
  tonic: string | null,
  accidental: Accidental,
): string | null {
  if (tonic === null) {
    return null;
  }
  return spellTonic(tonic, accidental);
}

function deriveChord(
  spelledTonic: string | null,
  chordType: string | null,
): Chord.Chord | null {
  if (spelledTonic === null || chordType === null) {
    return null;
  }
  return Chord.getChord(chordType, spelledTonic);
}

export function ChordBuilder() {
  const instrument = useInstrument();
  const [tonic, setTonic] = useState<string | null>(null);
  const [chordType, setChordType] = useState<string | null>(null);
  const [accidental, setAccidental] = useState<Accidental>('flat');

  const spelledTonic = deriveSpelledTonic(tonic, accidental);
  const chord = deriveChord(spelledTonic, chordType);

  function play(nextTonic: string | null, nextChordType: string | null) {
    if (nextTonic === null || nextChordType === null) {
      return;
    }
    void instrument.playChord(Chord.notes(nextChordType, `${nextTonic}4`));
  }

  function selectTonic(nextTonic: string) {
    setTonic(nextTonic);
    play(spellTonic(nextTonic, accidental), chordType);
  }

  function selectChordType(nextChordType: string) {
    setChordType(nextChordType);
    play(spelledTonic, nextChordType);
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 p-4 sm:p-6">
      <div className="flex flex-col gap-5 rounded-xl bg-panel p-4 sm:p-5">
        <section className="flex flex-col gap-2">
          <SectionHeader label="Root" surface="panel">
            <AccidentalSwitch selected={accidental} onSelect={setAccidental} />
          </SectionHeader>
          <RootPicker
            selected={tonic}
            accidental={accidental}
            onSelect={selectTonic}
          />
        </section>

        <section className="flex flex-col gap-2">
          <SectionHeader label="Quality" surface="panel" />
          <QualityPicker selected={chordType} onSelect={selectChordType} />
        </section>
      </div>

      <section className="flex flex-col gap-2">
        <SectionHeader label="Chord tones" surface="background" />
        <ChordSlots tonic={spelledTonic} chord={chord} />
      </section>
    </div>
  );
}
