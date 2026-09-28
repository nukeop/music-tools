import { useEffect, useState } from 'react';
import type { Instrument } from '../../audio/Instrument';

export function useProgressionPlayback(instrument: Instrument) {
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    return () => instrument.stop();
  }, [instrument]);

  async function play(chords: string[][], secondsPerChord: number) {
    setPlaying(true);
    await instrument.playProgression(chords, secondsPerChord, setActiveSlot);
    setPlaying(false);
    setActiveSlot(null);
  }

  function stop() {
    instrument.stop();
  }

  return { activeSlot, playing, play, stop };
}
