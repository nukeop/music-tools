import { beforeEach, describe, expect, it } from 'bun:test';
import { ScalesWrapper } from './Scales.test-wrapper';

describe('Scales', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('adds C major pentatonic and displays its name and spelled tones', async () => {
    await ScalesWrapper.mount();
    await ScalesWrapper.addScale('Major pentatonic');

    expect(ScalesWrapper.row(0).name()).toBe('C major pentatonic');
    expect(ScalesWrapper.row(0).tones()).toEqual(['C', 'D', 'E', 'G', 'A']);
  });

  it('adds Eb minor blues with flat spelling and no double flats', async () => {
    await ScalesWrapper.mount();
    await ScalesWrapper.rootPicker.select('E♭');
    await ScalesWrapper.addScale('Minor blues');

    expect(ScalesWrapper.row(0).name()).toBe('E♭ minor blues');
    expect(ScalesWrapper.row(0).tones()).toEqual([
      'E♭',
      'G♭',
      'A♭',
      'A',
      'B♭',
      'D♭',
    ]);
  });

  it('spells A harmonic minor', async () => {
    await ScalesWrapper.mount();
    await ScalesWrapper.rootPicker.select('A');
    await ScalesWrapper.addScale('Harmonic minor');

    expect(ScalesWrapper.row(0).name()).toBe('A harmonic minor');
    expect(ScalesWrapper.row(0).tones()).toEqual([
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G♯',
    ]);
  });

  it('spells E superphrygian', async () => {
    await ScalesWrapper.mount();
    await ScalesWrapper.rootPicker.select('E');
    await ScalesWrapper.addScale('Superphrygian');

    expect(ScalesWrapper.row(0).tones()).toEqual([
      'E',
      'F',
      'G♯',
      'A',
      'B',
      'C',
      'D',
    ]);
  });

  it('spells F lydian dominant', async () => {
    await ScalesWrapper.mount();
    await ScalesWrapper.rootPicker.select('F');
    await ScalesWrapper.addScale('Lydian dominant');

    expect(ScalesWrapper.row(0).tones()).toEqual([
      'F',
      'G',
      'A',
      'B',
      'C',
      'D',
      'E♭',
    ]);
  });

  it('spells C half-whole diminished', async () => {
    await ScalesWrapper.mount();
    await ScalesWrapper.addScale('Half-whole diminished');

    expect(ScalesWrapper.row(0).tones()).toEqual([
      'C',
      'D♭',
      'E♭',
      'E',
      'F♯',
      'G',
      'A',
      'B♭',
    ]);
  });

  it('spells Db whole-half diminished without double flats', async () => {
    await ScalesWrapper.mount();
    await ScalesWrapper.rootPicker.select('D♭');
    await ScalesWrapper.addScale('Whole-half diminished');

    expect(ScalesWrapper.row(0).tones()).toEqual([
      'D♭',
      'E♭',
      'F♭',
      'G♭',
      'G',
      'A',
      'B♭',
      'C',
    ]);
  });

  it('spells Gb minor pentatonic without double flats', async () => {
    await ScalesWrapper.mount();
    await ScalesWrapper.rootPicker.select('G♭');
    await ScalesWrapper.addScale('Minor pentatonic');

    expect(ScalesWrapper.row(0).tones()).toEqual(['G♭', 'A', 'C♭', 'D♭', 'F♭']);
  });

  it('adds F# altered with sharps spelling', async () => {
    await ScalesWrapper.mount();
    await ScalesWrapper.accidentalSwitch.select('Sharp');
    await ScalesWrapper.rootPicker.select('F♯');
    await ScalesWrapper.addScale('Altered');

    expect(ScalesWrapper.row(0).name()).toBe('F♯ altered');
    expect(ScalesWrapper.row(0).tones()).toEqual([
      'F♯',
      'G',
      'A',
      'A♯',
      'C',
      'D',
      'E',
    ]);
  });

  it('adds a scale with the accidental switch set to sharp', async () => {
    await ScalesWrapper.mount();
    await ScalesWrapper.accidentalSwitch.select('Sharp');
    await ScalesWrapper.rootPicker.select('C♯');
    await ScalesWrapper.addScale('Major pentatonic');

    expect(ScalesWrapper.row(0).name()).toBe('C♯ major pentatonic');
    expect(ScalesWrapper.row(0).tones()).toEqual([
      'C♯',
      'D♯',
      'E♯',
      'G♯',
      'A♯',
    ]);
  });

  it('stacks multiple rows in insertion order', async () => {
    await ScalesWrapper.mount();
    await ScalesWrapper.addScale('Major pentatonic');
    await ScalesWrapper.rootPicker.select('E♭');
    await ScalesWrapper.addScale('Minor blues');

    expect(ScalesWrapper.rowNames()).toEqual([
      'C major pentatonic',
      'E♭ minor blues',
    ]);
  });

  it('removes the selected row from the list', async () => {
    await ScalesWrapper.mount();
    await ScalesWrapper.addScale('Major pentatonic');
    await ScalesWrapper.rootPicker.select('E♭');
    await ScalesWrapper.addScale('Minor blues');
    await ScalesWrapper.accidentalSwitch.select('Sharp');
    await ScalesWrapper.rootPicker.select('F♯');
    await ScalesWrapper.addScale('Altered');

    await ScalesWrapper.row(1).remove();

    expect(ScalesWrapper.rowNames()).toEqual([
      'C major pentatonic',
      'F♯ altered',
    ]);
  });

  it('plays C major pentatonic as ascending pitches from octave 4', async () => {
    await ScalesWrapper.mount();
    await ScalesWrapper.addScale('Major pentatonic');

    await ScalesWrapper.row(0).play();

    expect(ScalesWrapper.playedSequences()).toEqual([
      { notes: ['C4', 'D4', 'E4', 'G4', 'A4'], secondsPerNote: 0.3 },
    ]);
  });

  it('plays A minor pentatonic with correct octave rollover', async () => {
    await ScalesWrapper.mount();
    await ScalesWrapper.rootPicker.select('A');
    await ScalesWrapper.addScale('Minor pentatonic');

    await ScalesWrapper.row(0).play();

    expect(ScalesWrapper.playedSequences()).toEqual([
      { notes: ['A4', 'C5', 'D5', 'E5', 'G5'], secondsPerNote: 0.3 },
    ]);
  });

  it('transposes pitches for a B♭ instrument', async () => {
    await ScalesWrapper.mount();
    await ScalesWrapper.instrumentKeySwitch.select('B flat instrument');
    await ScalesWrapper.addScale('Major pentatonic');

    await ScalesWrapper.row(0).play();

    expect(ScalesWrapper.playedSequences()).toEqual([
      { notes: ['Bb3', 'C4', 'D4', 'F4', 'G4'], secondsPerNote: 0.3 },
    ]);
  });

  it('plays the second of two stacked scales', async () => {
    await ScalesWrapper.mount();
    await ScalesWrapper.addScale('Major pentatonic');
    await ScalesWrapper.rootPicker.select('A');
    await ScalesWrapper.addScale('Minor pentatonic');

    await ScalesWrapper.row(1).play();

    expect(ScalesWrapper.playedSequences()).toEqual([
      { notes: ['A4', 'C5', 'D5', 'E5', 'G5'], secondsPerNote: 0.3 },
    ]);
  });

  it('moves a row up via keyboard on the drag handle', async () => {
    await ScalesWrapper.mount();
    await ScalesWrapper.addScale('Major pentatonic');
    await ScalesWrapper.rootPicker.select('E♭');
    await ScalesWrapper.addScale('Minor blues');
    await ScalesWrapper.accidentalSwitch.select('Sharp');
    await ScalesWrapper.rootPicker.select('F♯');
    await ScalesWrapper.addScale('Altered');

    await ScalesWrapper.row(1).dragHandle.moveUp();

    expect(ScalesWrapper.rowNames()).toEqual([
      'E♭ minor blues',
      'C major pentatonic',
      'F♯ altered',
    ]);
  });

  it('moves a row down via keyboard on the drag handle', async () => {
    await ScalesWrapper.mount();
    await ScalesWrapper.addScale('Major pentatonic');
    await ScalesWrapper.rootPicker.select('E♭');
    await ScalesWrapper.addScale('Minor blues');
    await ScalesWrapper.accidentalSwitch.select('Sharp');
    await ScalesWrapper.rootPicker.select('F♯');
    await ScalesWrapper.addScale('Altered');

    await ScalesWrapper.row(1).dragHandle.moveDown();

    expect(ScalesWrapper.rowNames()).toEqual([
      'C major pentatonic',
      'F♯ altered',
      'E♭ minor blues',
    ]);
  });

  it('does nothing when pressing ArrowUp on the first row', async () => {
    await ScalesWrapper.mount();
    await ScalesWrapper.addScale('Major pentatonic');
    await ScalesWrapper.rootPicker.select('E♭');
    await ScalesWrapper.addScale('Minor blues');

    await ScalesWrapper.row(0).dragHandle.moveUp();

    expect(ScalesWrapper.rowNames()).toEqual([
      'C major pentatonic',
      'E♭ minor blues',
    ]);
  });

  it('does nothing when pressing ArrowDown on the last row', async () => {
    await ScalesWrapper.mount();
    await ScalesWrapper.addScale('Major pentatonic');
    await ScalesWrapper.rootPicker.select('E♭');
    await ScalesWrapper.addScale('Minor blues');

    await ScalesWrapper.row(1).dragHandle.moveDown();

    expect(ScalesWrapper.rowNames()).toEqual([
      'C major pentatonic',
      'E♭ minor blues',
    ]);
  });

  it('reorders rows via pointer drag', async () => {
    await ScalesWrapper.mount();
    await ScalesWrapper.addScale('Major pentatonic');
    await ScalesWrapper.rootPicker.select('E♭');
    await ScalesWrapper.addScale('Minor blues');
    await ScalesWrapper.accidentalSwitch.select('Sharp');
    await ScalesWrapper.rootPicker.select('F♯');
    await ScalesWrapper.addScale('Altered');

    await ScalesWrapper.pointerDragRow(0, 2);

    expect(ScalesWrapper.rowNames()).toEqual([
      'E♭ minor blues',
      'F♯ altered',
      'C major pentatonic',
    ]);
  });
});
