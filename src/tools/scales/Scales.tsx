import { useState } from 'react';
import { useInstrument } from '../../audio/InstrumentProvider';
import { useInstrumentKey } from '../../instrument-key/InstrumentKeyProvider';
import { toConcertPitch } from '../../instrument-key/instrumentKey';
import { useTempo } from '../../tempo/TempoProvider';
import { eighthNoteSeconds } from '../../tempo/tempo';
import { type Accidental, spellTonic } from '../../theory/chords';
import type { ScaleType } from '../../theory/scales';
import { ScaleList } from './ScaleList';
import { ScalePicker } from './ScalePicker';
import { useScaleList } from './useScaleList';
import { useScalePlayback } from './useScalePlayback';

export function Scales() {
  const instrument = useInstrument();
  const { instrumentKey } = useInstrumentKey();
  const { tempo } = useTempo();

  const [tonic, setTonic] = useState('C');
  const [accidental, setAccidental] = useState<Accidental>('flat');
  const [selectedScale, setSelectedScale] =
    useState<ScaleType>('major-pentatonic');
  const { items, add, remove, move } = useScaleList();
  const secondsPerNote = eighthNoteSeconds(tempo);

  function transpose(pitches: string[]) {
    return toConcertPitch(pitches, instrumentKey);
  }

  const { activeTone, play } = useScalePlayback(
    instrument,
    transpose,
    secondsPerNote,
  );

  function addScale() {
    const spelledRoot = spellTonic(tonic, accidental);
    add(spelledRoot, selectedScale);
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 p-4 sm:p-6">
      <h1 className="sr-only">Scales</h1>

      <ScalePicker
        tonic={tonic}
        accidental={accidental}
        selectedScale={selectedScale}
        onTonicChange={setTonic}
        onAccidentalChange={setAccidental}
        onScaleChange={setSelectedScale}
        onAdd={addScale}
      />

      <ScaleList
        items={items}
        activeTone={activeTone}
        onPlay={(item) => void play(item)}
        onMove={move}
        onRemove={remove}
      />
    </div>
  );
}
