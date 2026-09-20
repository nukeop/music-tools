import { useState } from 'react';
import type { Instrument } from '../../audio/Instrument';
import { type Direction, pitchName, voiceMelody } from '../../theory/pitches';
import { scaleNotes } from '../../theory/scales';
import type { ScaleItem } from './useScaleList';

type ActiveTone = {
  id: number;
  index: number;
};

export function useScalePlayback(
  instrument: Instrument,
  toConcert: (pitches: string[]) => string[],
  secondsPerNote: number,
) {
  const [activeTone, setActiveTone] = useState<ActiveTone | null>(null);

  async function play(item: ScaleItem) {
    const notes = scaleNotes(item.root, item.scale);
    const directions = notes.slice(1).map((): Direction => 'up');
    const pitched = voiceMelody(notes, directions, 4);
    const pitches = toConcert(pitched.map(pitchName));

    await instrument.playSequence(pitches, secondsPerNote, (index) =>
      setActiveTone({ id: item.id, index }),
    );
    setActiveTone(null);
  }

  return { activeTone, play };
}
