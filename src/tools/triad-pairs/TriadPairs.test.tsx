import { beforeEach, describe, expect, it } from 'bun:test';
import { TriadPairsWrapper } from './TriadPairs.test-wrapper';

describe('TriadPairs', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('shows the canonical ascending lines for II-minor / III-minor in C', async () => {
    await TriadPairsWrapper.mount();

    expect(TriadPairsWrapper.line(1).notes()).toEqual([
      'D',
      'F',
      'A',
      'E',
      'G',
      'B',
    ]);
    expect(TriadPairsWrapper.line(2).notes()).toEqual([
      'F',
      'A',
      'D',
      'G',
      'B',
      'E',
    ]);
    expect(TriadPairsWrapper.line(3).notes()).toEqual([
      'A',
      'D',
      'F',
      'B',
      'E',
      'G',
    ]);
    expect(TriadPairsWrapper.tones(1).notes()).toEqual(['D', 'F', 'A']);
    expect(TriadPairsWrapper.tones(2).notes()).toEqual(['E', 'G', 'B']);
  });

  it('shows descending lines', async () => {
    await TriadPairsWrapper.mount();
    await TriadPairsWrapper.patternPicker.select('Descending');

    expect(TriadPairsWrapper.line(1).notes()).toEqual([
      'A',
      'F',
      'D',
      'B',
      'G',
      'E',
    ]);
    expect(TriadPairsWrapper.line(2).notes()).toEqual([
      'F',
      'D',
      'A',
      'G',
      'E',
      'B',
    ]);
    expect(TriadPairsWrapper.line(3).notes()).toEqual([
      'D',
      'A',
      'F',
      'E',
      'B',
      'G',
    ]);
  });

  it('shows zigzag lines', async () => {
    await TriadPairsWrapper.mount();
    await TriadPairsWrapper.patternPicker.select('Zigzag');

    expect(TriadPairsWrapper.line(1).notes()).toEqual([
      'D',
      'F',
      'A',
      'G',
      'E',
      'B',
    ]);
    expect(TriadPairsWrapper.line(2).notes()).toEqual([
      'F',
      'A',
      'D',
      'E',
      'B',
      'G',
    ]);
    expect(TriadPairsWrapper.line(3).notes()).toEqual([
      'A',
      'D',
      'F',
      'B',
      'G',
      'E',
    ]);
  });

  it('shows interleaved lines', async () => {
    await TriadPairsWrapper.mount();
    await TriadPairsWrapper.patternPicker.select('Interleaved');

    expect(TriadPairsWrapper.line(1).notes()).toEqual([
      'D',
      'E',
      'F',
      'G',
      'A',
      'B',
    ]);
    expect(TriadPairsWrapper.line(2).notes()).toEqual([
      'F',
      'G',
      'A',
      'B',
      'D',
      'E',
    ]);
    expect(TriadPairsWrapper.line(3).notes()).toEqual([
      'A',
      'B',
      'D',
      'E',
      'F',
      'G',
    ]);
  });

  it('spells tones correctly in the key of G', async () => {
    await TriadPairsWrapper.mount();
    await TriadPairsWrapper.rootPicker.select('G');

    expect(TriadPairsWrapper.tones(1).notes()).toEqual(['A', 'C', 'E']);
    expect(TriadPairsWrapper.tones(2).notes()).toEqual(['B', 'D', 'F♯']);
  });

  it('spells Db with flats and switches to sharps via the accidental switch', async () => {
    await TriadPairsWrapper.mount();
    await TriadPairsWrapper.rootPicker.select('D♭');

    expect(TriadPairsWrapper.tones(1).notes()).toEqual(['E♭', 'G♭', 'B♭']);

    await TriadPairsWrapper.accidentalSwitch.select('Sharp');

    expect(TriadPairsWrapper.tones(1).notes()).toEqual(['D♯', 'F♯', 'A♯']);
  });

  it('shows shared notes when triads overlap and none for the default pair', async () => {
    await TriadPairsWrapper.mount();

    expect(TriadPairsWrapper.sharedNotes()).toBeNull();

    await TriadPairsWrapper.triad1Degree.select('I');
    await TriadPairsWrapper.triad2Degree.select('VI');

    expect(TriadPairsWrapper.sharedNotes()).toBe('Shared: C, E');
  });

  it('auto-selects major for V and diminished for VII', async () => {
    await TriadPairsWrapper.mount();
    await TriadPairsWrapper.triad1Degree.select('V');

    expect(TriadPairsWrapper.triad1Quality.selected()).toBe('Δ');

    await TriadPairsWrapper.triad1Degree.select('VII');

    expect(TriadPairsWrapper.triad1Quality.selected()).toBe('°');
  });

  it('turns auto off when a quality is hand-picked and keeps it for later degree changes', async () => {
    await TriadPairsWrapper.mount();
    await TriadPairsWrapper.triad1Quality.select('Δ');

    expect(TriadPairsWrapper.triad1Auto.isPressed()).toBe(false);

    await TriadPairsWrapper.triad1Degree.select('V');

    expect(TriadPairsWrapper.triad1Quality.selected()).toBe('Δ');
  });

  it('resets quality to the diatonic one when auto is turned back on', async () => {
    await TriadPairsWrapper.mount();
    await TriadPairsWrapper.triad1Quality.select('Δ');

    expect(TriadPairsWrapper.triad1Quality.selected()).toBe('Δ');

    await TriadPairsWrapper.triad1Auto.toggle();

    expect(TriadPairsWrapper.triad1Auto.isPressed()).toBe(true);
    expect(TriadPairsWrapper.triad1Quality.selected()).toBe('-');
  });

  it('plays the root position line in concert pitch at 100 bpm', async () => {
    await TriadPairsWrapper.mount();
    await TriadPairsWrapper.line(1).play();

    expect(TriadPairsWrapper.playedSequences()).toEqual([
      { notes: ['D4', 'F4', 'A4', 'E4', 'G4', 'B4'], secondsPerNote: 0.3 },
    ]);
  });

  it('transposes to concert pitch when instrument key is Bb', async () => {
    await TriadPairsWrapper.mount();
    await TriadPairsWrapper.instrumentKeySwitch.select('B flat instrument');
    await TriadPairsWrapper.line(1).play();

    expect(TriadPairsWrapper.playedSequences()).toEqual([
      { notes: ['C4', 'Eb4', 'G4', 'D4', 'F4', 'A4'], secondsPerNote: 0.3 },
    ]);
    expect(TriadPairsWrapper.line(1).notes()).toEqual([
      'D',
      'F',
      'A',
      'E',
      'G',
      'B',
    ]);
  });

  it('plays descending root position with correct octave assignments', async () => {
    await TriadPairsWrapper.mount();
    await TriadPairsWrapper.patternPicker.select('Descending');
    await TriadPairsWrapper.line(1).play();

    expect(TriadPairsWrapper.playedSequences()).toEqual([
      { notes: ['A4', 'F4', 'D4', 'B4', 'G4', 'E4'], secondsPerNote: 0.3 },
    ]);
  });

  it('plays all three lines as one continuous sequence', async () => {
    await TriadPairsWrapper.mount();
    await TriadPairsWrapper.playAll();

    expect(TriadPairsWrapper.playedSequences()).toEqual([
      {
        notes: [
          'D4',
          'F4',
          'A4',
          'E4',
          'G4',
          'B4',
          'F4',
          'A4',
          'D5',
          'G4',
          'B4',
          'E5',
          'A4',
          'D5',
          'F5',
          'B4',
          'E5',
          'G5',
        ],
        secondsPerNote: 0.3,
      },
    ]);
  });

  it('plays a single tone on click', async () => {
    await TriadPairsWrapper.mount();
    await TriadPairsWrapper.tones(1).clickNote('D');

    expect(TriadPairsWrapper.playedNotes()).toEqual([['D4']]);
  });

  it('plays zigzag root position with the second triad descending', async () => {
    await TriadPairsWrapper.mount();
    await TriadPairsWrapper.patternPicker.select('Zigzag');
    await TriadPairsWrapper.line(1).play();

    expect(TriadPairsWrapper.playedSequences()).toEqual([
      { notes: ['D4', 'F4', 'A4', 'G4', 'E4', 'B3'], secondsPerNote: 0.3 },
    ]);
  });

  it('plays eighth notes of 0.25 seconds at 120 bpm', async () => {
    await TriadPairsWrapper.mount();
    await TriadPairsWrapper.setTempo(120);
    await TriadPairsWrapper.line(1).play();

    expect(TriadPairsWrapper.playedSequences()).toEqual([
      { notes: ['D4', 'F4', 'A4', 'E4', 'G4', 'B4'], secondsPerNote: 0.25 },
    ]);
  });
});
