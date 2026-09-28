import { useState } from 'react';
import { useInstrument } from '../../audio/InstrumentProvider';
import { AccidentalSwitch } from '../../components/AccidentalSwitch';
import { ChordLayerPicker } from '../../components/ChordLayerPicker';
import { RootPicker } from '../../components/RootPicker';
import { useInstrumentKey } from '../../instrument-key/InstrumentKeyProvider';
import { toConcertPitch } from '../../instrument-key/instrumentKey';
import { useTempo } from '../../tempo/TempoProvider';
import { barSeconds } from '../../tempo/tempo';
import {
  type Accidental,
  type ChordSelection,
  chordName,
  spellTonic,
} from '../../theory/chords';
import {
  degreeRoot,
  type ProgressionChord,
  progressionChordPitches,
  romanChordName,
} from '../../theory/progressions';
import type { ChordLabel } from './chordLabel';
import { DegreePicker } from './DegreePicker';
import { ProgressionSettings } from './ProgressionSettings';
import { Timeline } from './Timeline';
import { type SlotPosition, useProgression } from './useProgression';
import { useProgressionPlayback } from './useProgressionPlayback';

export function Progressions() {
  const instrument = useInstrument();
  const { instrumentKey } = useInstrumentKey();
  const { tempo } = useTempo();
  const [accidental, setAccidental] = useState<Accidental>('flat');
  const progression = useProgression();
  const { activeSlot, playing, play, stop } =
    useProgressionPlayback(instrument);

  const { bars, chordsPerBar, edited, editedChord } = progression;
  const spelledKey = spellTonic(progression.keyTonic, accidental);

  function label(chord: ProgressionChord): ChordLabel {
    return {
      numeral: romanChordName(chord.degree, chord.selection),
      name: chordName(degreeRoot(spelledKey, chord.degree), chord.selection),
    };
  }

  function voice(chord: ProgressionChord): string[] {
    const root = degreeRoot(spelledKey, chord.degree);
    return toConcertPitch(
      progressionChordPitches(root, chord.selection),
      instrumentKey,
    );
  }

  function preview(chord: ProgressionChord) {
    if (playing) {
      return;
    }
    void instrument.playChord(voice(chord));
  }

  function selectSlot(position: SlotPosition) {
    progression.selectSlot(position);
    preview(bars[position.bar][position.chord]);
  }

  function selectDegree(degree: string) {
    progression.setDegree(degree);
    preview({ ...editedChord, degree });
  }

  function selectLayers(selection: ChordSelection) {
    progression.setSelection(selection);
    preview({ ...editedChord, selection });
  }

  function playProgression() {
    const slotChords = bars.flat().map(voice);
    void play(slotChords, barSeconds(tempo) / chordsPerBar);
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 p-4 sm:p-6">
      <h1 className="sr-only">Chord progressions</h1>

      <div className="flex flex-col gap-3 rounded-xl bg-panel p-3 sm:p-4">
        <ProgressionSettings
          bars={progression.barCount}
          chordsPerBar={chordsPerBar}
          playing={playing}
          onBarsChange={progression.setBarCount}
          onChordsPerBarChange={progression.setChordsPerBar}
          onPlay={playProgression}
          onStop={stop}
        />

        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-panel-fg-muted">Key</span>
          <div className="flex gap-1.5">
            <RootPicker
              groupLabel="Key"
              selected={progression.keyTonic}
              accidental={accidental}
              onSelect={progression.setKeyTonic}
            />
            <AccidentalSwitch
              selected={accidental}
              onSelect={setAccidental}
              className="flex-col sm:flex-row"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-xl bg-panel p-3 sm:p-4">
        <Timeline
          bars={bars.map((bar) => bar.map(label))}
          edited={edited}
          activeSlot={activeSlot}
          onSelect={selectSlot}
        />

        <DegreePicker selected={editedChord.degree} onSelect={selectDegree} />

        <ChordLayerPicker
          selection={editedChord.selection}
          onChange={selectLayers}
        />
      </div>
    </div>
  );
}
