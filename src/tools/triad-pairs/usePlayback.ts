import { useState } from 'react';
import type { Instrument } from '../../audio/Instrument';
import {
  type LineEntry,
  linePitches,
  type Pattern,
} from '../../theory/patterns';

export type ActiveNote = {
  line: number;
  index: number;
};

type Playback = {
  activeNote: ActiveNote | null;
  playLine: (lineIndex: number) => Promise<void>;
  playAll: () => Promise<void>;
};

export function usePlayback(
  instrument: Instrument,
  pattern: Pattern,
  lines: LineEntry[][],
  toConcert: (pitches: string[]) => string[],
  secondsPerNote: number,
): Playback {
  const [activeNote, setActiveNote] = useState<ActiveNote | null>(null);

  async function playLines(lineIndexes: number[]) {
    const positions = lineIndexes.flatMap((line) =>
      lines[line].map((_, index): ActiveNote => ({ line, index })),
    );
    const pitches = lineIndexes.flatMap((line) =>
      linePitches(pattern, lines[line]),
    );
    await instrument.playSequence(toConcert(pitches), secondsPerNote, (index) =>
      setActiveNote(positions[index]),
    );
    setActiveNote(null);
  }

  function playLine(lineIndex: number) {
    return playLines([lineIndex]);
  }

  function playAll() {
    return playLines(lines.map((_, index) => index));
  }

  return { activeNote, playLine, playAll };
}
