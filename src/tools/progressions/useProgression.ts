import { useState } from 'react';
import type { ChordSelection } from '../../theory/chords';
import type { ProgressionChord } from '../../theory/progressions';
import { DEFAULT_BARS } from './options';

export type SlotPosition = {
  bar: number;
  chord: number;
};

export function useProgression() {
  const [keyTonic, setKeyTonic] = useState('C');
  const [barCount, setBarCount] = useState(4);
  const [chordsPerBar, setChordsPerBar] = useState(1);
  const [selected, setSelected] = useState<SlotPosition>({ bar: 0, chord: 0 });
  // Holds MAX_BARS × MAX_CHORDS_PER_BAR chords so shrinking and regrowing
  // either count keeps edits.
  const [allBars, setAllBars] = useState(DEFAULT_BARS);

  const bars = allBars
    .slice(0, barCount)
    .map((bar) => bar.slice(0, chordsPerBar));
  const edited: SlotPosition = {
    bar: Math.min(selected.bar, barCount - 1),
    chord: Math.min(selected.chord, chordsPerBar - 1),
  };

  function updateEditedChord(change: Partial<ProgressionChord>) {
    setAllBars((current) =>
      current.map((bar, barIndex) =>
        bar.map((chord, chordIndex) => {
          if (barIndex !== edited.bar || chordIndex !== edited.chord) {
            return chord;
          }
          return { ...chord, ...change };
        }),
      ),
    );
  }

  function setDegree(degree: string) {
    updateEditedChord({ degree });
  }

  function setSelection(selection: ChordSelection) {
    updateEditedChord({ selection });
  }

  return {
    bars,
    keyTonic,
    barCount,
    chordsPerBar,
    edited,
    editedChord: bars[edited.bar][edited.chord],
    setKeyTonic,
    setBarCount,
    setChordsPerBar,
    selectSlot: setSelected,
    setDegree,
    setSelection,
  };
}
