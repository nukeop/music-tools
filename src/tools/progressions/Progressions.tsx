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
  type ProgressionChord,
  progressionChordPitches,
  progressionSlots,
} from '../../theory/progressions';
import { ChordChips } from './ChordChips';
import { ProgressionSettings } from './ProgressionSettings';
import { Timeline } from './Timeline';
import { useProgression } from './useProgression';
import { useProgressionPlayback } from './useProgressionPlayback';

export function Progressions() {
  const instrument = useInstrument();
  const { instrumentKey } = useInstrumentKey();
  const { tempo } = useTempo();
  const [accidental, setAccidental] = useState<Accidental>('flat');
  const progression = useProgression();
  const { activeSlot, playing, play, stop } =
    useProgressionPlayback(instrument);

  const { chords, chordCount, bars, chordsPerBar, editedIndex, editedChord } =
    progression;
  const spelled = chords.map((chord) => ({
    tonic: spellTonic(chord.tonic, accidental),
    selection: chord.selection,
  }));
  const names = spelled.map(({ tonic, selection }) =>
    chordName(tonic, selection),
  );
  const slots = progressionSlots(chordCount, bars, chordsPerBar);

  function voice(chord: ProgressionChord): string[] {
    const tonic = spellTonic(chord.tonic, accidental);
    return toConcertPitch(
      progressionChordPitches(tonic, chord.selection),
      instrumentKey,
    );
  }

  function preview(chord: ProgressionChord) {
    if (playing) {
      return;
    }
    void instrument.playChord(voice(chord));
  }

  function selectChord(index: number) {
    progression.selectChord(index);
    preview(chords[index]);
  }

  function selectTonic(tonic: string) {
    progression.setTonic(tonic);
    preview({ ...editedChord, tonic });
  }

  function selectLayers(selection: ChordSelection) {
    progression.setSelection(selection);
    preview({ ...editedChord, selection });
  }

  function playProgression() {
    const voiced = chords.map(voice);
    const slotChords = slots.map((chordIndex) => voiced[chordIndex]);
    void play(slotChords, barSeconds(tempo) / chordsPerBar);
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 p-4 sm:p-6">
      <h1 className="sr-only">Chord progressions</h1>

      <div className="rounded-xl bg-panel p-3 sm:p-4">
        <ProgressionSettings
          chordCount={chordCount}
          bars={bars}
          chordsPerBar={chordsPerBar}
          playing={playing}
          onChordCountChange={progression.setChordCount}
          onBarsChange={progression.setBars}
          onChordsPerBarChange={progression.setChordsPerBar}
          onPlay={playProgression}
          onStop={stop}
        />
      </div>

      <div className="flex flex-col gap-3 rounded-xl bg-panel p-3 sm:p-4">
        <ChordChips
          names={names}
          selectedIndex={editedIndex}
          onSelect={selectChord}
        />

        <div className="flex gap-1.5">
          <RootPicker
            selected={editedChord.tonic}
            accidental={accidental}
            onSelect={selectTonic}
          />
          <AccidentalSwitch
            selected={accidental}
            onSelect={setAccidental}
            className="flex-col sm:flex-row"
          />
        </div>

        <ChordLayerPicker
          selection={editedChord.selection}
          onChange={selectLayers}
        />
      </div>

      <Timeline
        slotNames={slots.map((chordIndex) => names[chordIndex])}
        chordsPerBar={chordsPerBar}
        activeSlot={activeSlot}
      />
    </div>
  );
}
