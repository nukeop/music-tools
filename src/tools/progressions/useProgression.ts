import { useState } from 'react';
import type { ChordQuality, ProgressionChord } from '../../theory/progressions';
import { DEFAULT_CHORDS } from './options';

export function useProgression() {
  const [chordCount, setChordCount] = useState(4);
  const [bars, setBars] = useState(4);
  const [chordsPerBar, setChordsPerBar] = useState(1);
  // Holds MAX_CHORDS entries so shrinking and regrowing the count keeps edits.
  const [allChords, setAllChords] = useState(DEFAULT_CHORDS);

  function updateChord(index: number, change: Partial<ProgressionChord>) {
    setAllChords((current) =>
      current.map((chord, chordIndex) => {
        if (chordIndex !== index) {
          return chord;
        }
        return { ...chord, ...change };
      }),
    );
  }

  function setTonic(index: number, tonic: string) {
    updateChord(index, { tonic });
  }

  function setQuality(index: number, quality: ChordQuality) {
    updateChord(index, { quality });
  }

  return {
    chords: allChords.slice(0, chordCount),
    chordCount,
    bars,
    chordsPerBar,
    setChordCount,
    setBars,
    setChordsPerBar,
    setTonic,
    setQuality,
  };
}
