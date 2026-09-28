import { useState } from 'react';
import type { ChordSelection } from '../../theory/chords';
import type { ProgressionChord } from '../../theory/progressions';
import { DEFAULT_CHORDS } from './options';

export function useProgression() {
  const [chordCount, setChordCount] = useState(4);
  const [bars, setBars] = useState(4);
  const [chordsPerBar, setChordsPerBar] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(0);
  // Holds MAX_CHORDS entries so shrinking and regrowing the count keeps edits.
  const [allChords, setAllChords] = useState(DEFAULT_CHORDS);

  const chords = allChords.slice(0, chordCount);
  const editedIndex = Math.min(selectedIndex, chordCount - 1);

  function updateEditedChord(change: Partial<ProgressionChord>) {
    setAllChords((current) =>
      current.map((chord, index) => {
        if (index !== editedIndex) {
          return chord;
        }
        return { ...chord, ...change };
      }),
    );
  }

  function setTonic(tonic: string) {
    updateEditedChord({ tonic });
  }

  function setSelection(selection: ChordSelection) {
    updateEditedChord({ selection });
  }

  return {
    chords,
    chordCount,
    bars,
    chordsPerBar,
    editedIndex,
    editedChord: chords[editedIndex],
    setChordCount,
    setBars,
    setChordsPerBar,
    selectChord: setSelectedIndex,
    setTonic,
    setSelection,
  };
}
