import { describe, expect, it } from 'bun:test';
import { ChordBuilderWrapper } from './ChordBuilder.test-wrapper';

describe('ChordBuilder', () => {
  it('shows three empty slots when nothing is selected', () => {
    ChordBuilderWrapper.mount();

    expect(ChordBuilderWrapper.slot(1).note()).toBe('');
    expect(ChordBuilderWrapper.slot(1).degree()).toBe('');
    expect(ChordBuilderWrapper.slot(2).note()).toBe('');
    expect(ChordBuilderWrapper.slot(2).degree()).toBe('');
    expect(ChordBuilderWrapper.slot(3).note()).toBe('');
    expect(ChordBuilderWrapper.slot(3).degree()).toBe('');
  });

  it('fills only the first slot when a root is selected', async () => {
    ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.rootPicker.select('C');

    expect(ChordBuilderWrapper.slot(1).note()).toBe('C');
    expect(ChordBuilderWrapper.slot(1).degree()).toBe('root');
    expect(ChordBuilderWrapper.slot(2).note()).toBe('');
    expect(ChordBuilderWrapper.slot(3).note()).toBe('');
  });

  it('builds a major triad from root and quality', async () => {
    ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.rootPicker.select('C');
    await ChordBuilderWrapper.qualityPicker.select('Δ');

    expect(ChordBuilderWrapper.slot(1).note()).toBe('C');
    expect(ChordBuilderWrapper.slot(1).degree()).toBe('root');
    expect(ChordBuilderWrapper.slot(2).note()).toBe('E');
    expect(ChordBuilderWrapper.slot(2).degree()).toBe('3rd');
    expect(ChordBuilderWrapper.slot(3).note()).toBe('G');
    expect(ChordBuilderWrapper.slot(3).degree()).toBe('5th');
  });

  it('builds a minor triad from root and quality', async () => {
    ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.rootPicker.select('C');
    await ChordBuilderWrapper.qualityPicker.select('-');

    expect(ChordBuilderWrapper.slot(1).note()).toBe('C');
    expect(ChordBuilderWrapper.slot(1).degree()).toBe('root');
    expect(ChordBuilderWrapper.slot(2).note()).toBe('E♭');
    expect(ChordBuilderWrapper.slot(2).degree()).toBe('3rd');
    expect(ChordBuilderWrapper.slot(3).note()).toBe('G');
    expect(ChordBuilderWrapper.slot(3).degree()).toBe('5th');
  });

  it('builds a diminished triad from root and quality', async () => {
    ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.rootPicker.select('C');
    await ChordBuilderWrapper.qualityPicker.select('°');

    expect(ChordBuilderWrapper.slot(1).note()).toBe('C');
    expect(ChordBuilderWrapper.slot(1).degree()).toBe('root');
    expect(ChordBuilderWrapper.slot(2).note()).toBe('E♭');
    expect(ChordBuilderWrapper.slot(2).degree()).toBe('3rd');
    expect(ChordBuilderWrapper.slot(3).note()).toBe('G♭');
    expect(ChordBuilderWrapper.slot(3).degree()).toBe('5th');
  });

  it('builds an augmented triad from root and quality', async () => {
    ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.rootPicker.select('C');
    await ChordBuilderWrapper.qualityPicker.select('+');

    expect(ChordBuilderWrapper.slot(1).note()).toBe('C');
    expect(ChordBuilderWrapper.slot(1).degree()).toBe('root');
    expect(ChordBuilderWrapper.slot(2).note()).toBe('E');
    expect(ChordBuilderWrapper.slot(2).degree()).toBe('3rd');
    expect(ChordBuilderWrapper.slot(3).note()).toBe('G♯');
    expect(ChordBuilderWrapper.slot(3).degree()).toBe('5th');
  });

  it('builds a sus2 chord with root, 2nd, 5th degrees', async () => {
    ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.rootPicker.select('C');
    await ChordBuilderWrapper.qualityPicker.select('sus2');

    expect(ChordBuilderWrapper.slot(1).note()).toBe('C');
    expect(ChordBuilderWrapper.slot(1).degree()).toBe('root');
    expect(ChordBuilderWrapper.slot(2).note()).toBe('D');
    expect(ChordBuilderWrapper.slot(2).degree()).toBe('2nd');
    expect(ChordBuilderWrapper.slot(3).note()).toBe('G');
    expect(ChordBuilderWrapper.slot(3).degree()).toBe('5th');
  });

  it('builds a sus4 chord with root, 4th, 5th degrees', async () => {
    ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.rootPicker.select('C');
    await ChordBuilderWrapper.qualityPicker.select('sus4');

    expect(ChordBuilderWrapper.slot(1).note()).toBe('C');
    expect(ChordBuilderWrapper.slot(1).degree()).toBe('root');
    expect(ChordBuilderWrapper.slot(2).note()).toBe('F');
    expect(ChordBuilderWrapper.slot(2).degree()).toBe('4th');
    expect(ChordBuilderWrapper.slot(3).note()).toBe('G');
    expect(ChordBuilderWrapper.slot(3).degree()).toBe('5th');
  });

  it('respells the root and chord tones when the accidental switch changes', async () => {
    ChordBuilderWrapper.mount();

    expect(ChordBuilderWrapper.accidentalSwitch.selected()).toBe('Flat');

    await ChordBuilderWrapper.rootPicker.select('D♭');
    await ChordBuilderWrapper.qualityPicker.select('Δ');

    expect(ChordBuilderWrapper.slot(1).note()).toBe('D♭');
    expect(ChordBuilderWrapper.slot(2).note()).toBe('F');
    expect(ChordBuilderWrapper.slot(3).note()).toBe('A♭');

    await ChordBuilderWrapper.accidentalSwitch.select('Sharp');

    expect(ChordBuilderWrapper.slot(1).note()).toBe('C♯');
    expect(ChordBuilderWrapper.slot(2).note()).toBe('E♯');
    expect(ChordBuilderWrapper.slot(3).note()).toBe('G♯');
  });

  it('recomputes all three slots when the root changes after a quality is already selected', async () => {
    ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.rootPicker.select('C');
    await ChordBuilderWrapper.qualityPicker.select('Δ');
    await ChordBuilderWrapper.rootPicker.select('G');

    expect(ChordBuilderWrapper.slot(1).note()).toBe('G');
    expect(ChordBuilderWrapper.slot(1).degree()).toBe('root');
    expect(ChordBuilderWrapper.slot(2).note()).toBe('B');
    expect(ChordBuilderWrapper.slot(2).degree()).toBe('3rd');
    expect(ChordBuilderWrapper.slot(3).note()).toBe('D');
    expect(ChordBuilderWrapper.slot(3).degree()).toBe('5th');
  });

  it('plays the new chord when the root changes after a quality is already selected', async () => {
    ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.rootPicker.select('C');
    await ChordBuilderWrapper.qualityPicker.select('-');
    await ChordBuilderWrapper.rootPicker.select('G');

    expect(ChordBuilderWrapper.playedNotes()).toEqual(['G4', 'Bb4', 'D5']);
  });

  it('plays nothing when only a root is selected', async () => {
    ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.rootPicker.select('C');

    expect(ChordBuilderWrapper.playedNotes()).toBeUndefined();
  });

  it('plays the spelled chord tones with octaves when a quality is selected', async () => {
    ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.rootPicker.select('D♭');
    await ChordBuilderWrapper.qualityPicker.select('Δ');

    expect(ChordBuilderWrapper.playedNotes()).toEqual(['Db4', 'F4', 'Ab4']);
  });

  it('plays sharp-spelled chord tones when the accidental switch is set to sharp', async () => {
    ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.accidentalSwitch.select('Sharp');
    await ChordBuilderWrapper.rootPicker.select('C♯');
    await ChordBuilderWrapper.qualityPicker.select('Δ');

    expect(ChordBuilderWrapper.playedNotes()).toEqual(['C#4', 'E#4', 'G#4']);
  });
});
