import { useState } from 'react';
import { useInstrument } from '../../audio/InstrumentProvider';
import { useInstrumentKey } from '../../instrument-key/InstrumentKeyProvider';
import { toConcertPitch } from '../../instrument-key/instrumentKey';
import { useTempo } from '../../tempo/TempoProvider';
import { barSeconds } from '../../tempo/tempo';
import { type Accidental, chordName, spellTonic } from '../../theory/chords';
import {
  progressionChordPitches,
  progressionSlots,
  QUALITIES,
} from '../../theory/progressions';
import { ChordRow } from './ChordRow';
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

  const { chords, chordCount, bars, chordsPerBar } = progression;
  const spelled = chords.map((chord) => ({
    tonic: spellTonic(chord.tonic, accidental),
    quality: chord.quality,
  }));
  const slots = progressionSlots(chordCount, bars, chordsPerBar);
  const slotNames = slots.map((chordIndex) => {
    const { tonic, quality } = spelled[chordIndex];
    return chordName(tonic, QUALITIES[quality]);
  });

  function playProgression() {
    const voiced = spelled.map(({ tonic, quality }) =>
      toConcertPitch(progressionChordPitches(tonic, quality), instrumentKey),
    );
    const slotChords = slots.map((chordIndex) => voiced[chordIndex]);
    void play(slotChords, barSeconds(tempo) / chordsPerBar);
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 p-4 sm:p-6">
      <h1 className="sr-only">Chord progressions</h1>

      <div className="flex flex-col gap-3 rounded-xl bg-panel p-3 sm:p-4">
        <ProgressionSettings
          chordCount={chordCount}
          bars={bars}
          chordsPerBar={chordsPerBar}
          accidental={accidental}
          playing={playing}
          onChordCountChange={progression.setChordCount}
          onBarsChange={progression.setBars}
          onChordsPerBarChange={progression.setChordsPerBar}
          onAccidentalChange={setAccidental}
          onPlay={playProgression}
          onStop={stop}
        />

        <div className="flex flex-col gap-1.5">
          {chords.map((chord, index) => (
            <ChordRow
              // Chord rows are positional slots, not reorderable items.
              // biome-ignore lint/suspicious/noArrayIndexKey: see above
              key={index}
              index={index}
              chord={chord}
              accidental={accidental}
              onTonicChange={(tonic) => progression.setTonic(index, tonic)}
              onQualityChange={(quality) =>
                progression.setQuality(index, quality)
              }
            />
          ))}
        </div>
      </div>

      <Timeline
        slotNames={slotNames}
        chordsPerBar={chordsPerBar}
        activeSlot={activeSlot}
      />
    </div>
  );
}
