import { useState } from 'react';
import { useInstrument } from '../../audio/InstrumentProvider';
import { AccidentalSwitch } from '../../components/AccidentalSwitch';
import { ChoiceGroup } from '../../components/ChoiceGroup';
import { RootPicker } from '../../components/RootPicker';
import { useInstrumentKey } from '../../instrument-key/InstrumentKeyProvider';
import { toConcertPitch } from '../../instrument-key/instrumentKey';
import { useTempo } from '../../tempo/TempoProvider';
import { eighthNoteSeconds } from '../../tempo/tempo';
import { type Accidental, spellTonic } from '../../theory/chords';
import { type Pattern, patternLines } from '../../theory/patterns';
import { sharedNotes, triadNotes } from '../../theory/triadPairs';
import { Lines } from './Lines';
import { PATTERN_OPTIONS } from './options';
import { Tones } from './Tones';
import { TriadPicker } from './TriadPicker';
import { usePlayback } from './usePlayback';
import { useTriadState } from './useTriadState';

export function TriadPairs() {
  const instrument = useInstrument();
  const { instrumentKey } = useInstrumentKey();
  const { tempo } = useTempo();

  const [tonic, setTonic] = useState('C');
  const [accidental, setAccidental] = useState<Accidental>('flat');
  const triad1 = useTriadState('II');
  const triad2 = useTriadState('III');
  const [pattern, setPattern] = useState<Pattern>('ascending');

  const key = spellTonic(tonic, accidental);
  const notes1 = triadNotes(key, triad1.degree, triad1.quality);
  const notes2 = triadNotes(key, triad2.degree, triad2.quality);
  const shared = sharedNotes(notes1, notes2);
  const lines = patternLines(pattern, notes1, notes2);
  const secondsPerNote = eighthNoteSeconds(tempo);

  function transpose(pitches: string[]) {
    return toConcertPitch(pitches, instrumentKey);
  }

  const { activeNote, playLine, playAll } = usePlayback(
    instrument,
    pattern,
    lines,
    transpose,
    secondsPerNote,
  );

  function playTone(note: string) {
    void instrument.playChord(transpose([`${note}4`]));
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 p-4 sm:p-6">
      <h1 className="sr-only">Triad pairs</h1>

      <div className="flex gap-1.5 rounded-xl bg-panel p-3 sm:p-4">
        <RootPicker
          selected={tonic}
          accidental={accidental}
          onSelect={setTonic}
        />
        <AccidentalSwitch selected={accidental} onSelect={setAccidental} />
      </div>

      <div className="flex gap-4">
        <TriadPicker
          index={1}
          degree={triad1.degree}
          quality={triad1.quality}
          auto={triad1.auto}
          onDegreeChange={triad1.selectDegree}
          onQualityChange={triad1.selectQuality}
          onAutoToggle={triad1.toggleAuto}
        />
        <TriadPicker
          index={2}
          degree={triad2.degree}
          quality={triad2.quality}
          auto={triad2.auto}
          onDegreeChange={triad2.selectDegree}
          onQualityChange={triad2.selectQuality}
          onAutoToggle={triad2.toggleAuto}
        />
      </div>

      <div className="rounded-xl bg-panel p-3 sm:p-4">
        <ChoiceGroup
          groupLabel="Pattern"
          options={PATTERN_OPTIONS}
          selected={pattern}
          onChange={setPattern}
          className="grid grid-cols-3 gap-1.5 sm:grid-cols-6"
          variant="neutral"
        />
      </div>

      <Tones
        notes1={notes1}
        notes2={notes2}
        quality1={triad1.quality}
        quality2={triad2.quality}
        shared={shared}
        onPlay={playTone}
      />

      <Lines
        lines={lines}
        activeNote={activeNote}
        onPlayLine={(i) => void playLine(i)}
        onPlayAll={() => void playAll()}
      />
    </div>
  );
}
