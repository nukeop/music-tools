import { Note } from 'tonal';

export type Pitch = {
  pitchClass: string;
  octave: number;
};

export type Direction = 'up' | 'down';

const SEMITONES_PER_OCTAVE = 12;

function pitchClassMidi(pitchClass: string): number {
  return Note.midi(`${pitchClass}0`)!;
}

function midiOf(pitch: Pitch): number {
  return pitchClassMidi(pitch.pitchClass) + SEMITONES_PER_OCTAVE * pitch.octave;
}

export function pitchName(pitch: Pitch): string {
  return `${pitch.pitchClass}${pitch.octave}`;
}

function pitchAbove(pitchClass: string, reference: Pitch): Pitch {
  const distance = midiOf(reference) - pitchClassMidi(pitchClass);
  return {
    pitchClass,
    octave: Math.floor(distance / SEMITONES_PER_OCTAVE) + 1,
  };
}

function pitchBelow(pitchClass: string, reference: Pitch): Pitch {
  const distance = midiOf(reference) - pitchClassMidi(pitchClass);
  return {
    pitchClass,
    octave: Math.ceil(distance / SEMITONES_PER_OCTAVE) - 1,
  };
}

const STEPPERS: Record<
  Direction,
  (pitchClass: string, reference: Pitch) => Pitch
> = {
  up: pitchAbove,
  down: pitchBelow,
};

export function voiceMelody(
  pitchClasses: string[],
  directions: Direction[],
  startOctave: number,
): Pitch[] {
  const pitches = [{ pitchClass: pitchClasses[0], octave: startOctave }];
  for (const [index, direction] of directions.entries()) {
    const step = STEPPERS[direction];
    pitches.push(step(pitchClasses[index + 1], pitches[index]));
  }
  return pitches;
}

function center(pitches: Pitch[]): number {
  const total = pitches.reduce((sum, pitch) => sum + midiOf(pitch), 0);
  return total / pitches.length;
}

export function alignRegister(reference: Pitch[], pitches: Pitch[]): Pitch[] {
  const distance = center(reference) - center(pitches);
  const shift = Math.round(distance / SEMITONES_PER_OCTAVE);
  return pitches.map((pitch) => ({
    ...pitch,
    octave: pitch.octave + shift,
  }));
}
