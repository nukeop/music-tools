import { beforeEach, describe, expect, it } from 'bun:test';
import { ChordBuilderWrapper } from './ChordBuilder.test-wrapper';

describe('ChordBuilder', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('shows three empty slots when nothing is selected', async () => {
    await ChordBuilderWrapper.mount();

    expect(ChordBuilderWrapper.slot(1).note()).toBe('');
    expect(ChordBuilderWrapper.slot(1).degree()).toBe('');
    expect(ChordBuilderWrapper.slot(2).note()).toBe('');
    expect(ChordBuilderWrapper.slot(2).degree()).toBe('');
    expect(ChordBuilderWrapper.slot(3).note()).toBe('');
    expect(ChordBuilderWrapper.slot(3).degree()).toBe('');
    expect(ChordBuilderWrapper.chordName()).toBe('');
  });

  it('fills only the first slot when a root is selected', async () => {
    await ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.rootPicker.select('C');

    expect(ChordBuilderWrapper.slot(1).note()).toBe('C');
    expect(ChordBuilderWrapper.slot(1).degree()).toBe('1');
    expect(ChordBuilderWrapper.slot(2).note()).toBe('');
    expect(ChordBuilderWrapper.slot(3).note()).toBe('');
    expect(ChordBuilderWrapper.chordName()).toBe('C');
  });

  it('builds a major triad from root and triad', async () => {
    await ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.rootPicker.select('C');
    await ChordBuilderWrapper.triadPicker.select('Δ');

    expect(ChordBuilderWrapper.slot(1).note()).toBe('C');
    expect(ChordBuilderWrapper.slot(1).degree()).toBe('1');
    expect(ChordBuilderWrapper.slot(2).note()).toBe('E');
    expect(ChordBuilderWrapper.slot(2).degree()).toBe('3');
    expect(ChordBuilderWrapper.slot(3).note()).toBe('G');
    expect(ChordBuilderWrapper.slot(3).degree()).toBe('5');
    expect(ChordBuilderWrapper.chordName()).toBe('C');
  });

  it('builds a minor triad from root and triad', async () => {
    await ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.rootPicker.select('C');
    await ChordBuilderWrapper.triadPicker.select('-');

    expect(ChordBuilderWrapper.slot(1).note()).toBe('C');
    expect(ChordBuilderWrapper.slot(1).degree()).toBe('1');
    expect(ChordBuilderWrapper.slot(2).note()).toBe('E♭');
    expect(ChordBuilderWrapper.slot(2).degree()).toBe('♭3');
    expect(ChordBuilderWrapper.slot(3).note()).toBe('G');
    expect(ChordBuilderWrapper.slot(3).degree()).toBe('5');
    expect(ChordBuilderWrapper.chordName()).toBe('C-');
  });

  it('builds a diminished triad from root and triad', async () => {
    await ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.rootPicker.select('C');
    await ChordBuilderWrapper.triadPicker.select('°');

    expect(ChordBuilderWrapper.slot(1).note()).toBe('C');
    expect(ChordBuilderWrapper.slot(1).degree()).toBe('1');
    expect(ChordBuilderWrapper.slot(2).note()).toBe('E♭');
    expect(ChordBuilderWrapper.slot(2).degree()).toBe('♭3');
    expect(ChordBuilderWrapper.slot(3).note()).toBe('G♭');
    expect(ChordBuilderWrapper.slot(3).degree()).toBe('♭5');
    expect(ChordBuilderWrapper.chordName()).toBe('C°');
  });

  it('builds an augmented triad from root and triad', async () => {
    await ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.rootPicker.select('C');
    await ChordBuilderWrapper.triadPicker.select('+');

    expect(ChordBuilderWrapper.slot(1).note()).toBe('C');
    expect(ChordBuilderWrapper.slot(1).degree()).toBe('1');
    expect(ChordBuilderWrapper.slot(2).note()).toBe('E');
    expect(ChordBuilderWrapper.slot(2).degree()).toBe('3');
    expect(ChordBuilderWrapper.slot(3).note()).toBe('G♯');
    expect(ChordBuilderWrapper.slot(3).degree()).toBe('♯5');
    expect(ChordBuilderWrapper.chordName()).toBe('C+');
  });

  it('builds a sus2 chord with root, 2nd, 5th degrees', async () => {
    await ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.rootPicker.select('C');
    await ChordBuilderWrapper.triadPicker.select('sus2');

    expect(ChordBuilderWrapper.slot(1).note()).toBe('C');
    expect(ChordBuilderWrapper.slot(1).degree()).toBe('1');
    expect(ChordBuilderWrapper.slot(2).note()).toBe('D');
    expect(ChordBuilderWrapper.slot(2).degree()).toBe('2');
    expect(ChordBuilderWrapper.slot(3).note()).toBe('G');
    expect(ChordBuilderWrapper.slot(3).degree()).toBe('5');
    expect(ChordBuilderWrapper.chordName()).toBe('Csus2');
  });

  it('builds a sus4 chord with root, 4th, 5th degrees', async () => {
    await ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.rootPicker.select('C');
    await ChordBuilderWrapper.triadPicker.select('sus4');

    expect(ChordBuilderWrapper.slot(1).note()).toBe('C');
    expect(ChordBuilderWrapper.slot(1).degree()).toBe('1');
    expect(ChordBuilderWrapper.slot(2).note()).toBe('F');
    expect(ChordBuilderWrapper.slot(2).degree()).toBe('4');
    expect(ChordBuilderWrapper.slot(3).note()).toBe('G');
    expect(ChordBuilderWrapper.slot(3).degree()).toBe('5');
    expect(ChordBuilderWrapper.chordName()).toBe('Csus4');
  });

  it('builds a dominant 7 chord with a flat seventh slot', async () => {
    await ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.rootPicker.select('C');
    await ChordBuilderWrapper.triadPicker.select('Δ');
    await ChordBuilderWrapper.seventhPicker.select('7');

    expect(ChordBuilderWrapper.slot(1).note()).toBe('C');
    expect(ChordBuilderWrapper.slot(1).degree()).toBe('1');
    expect(ChordBuilderWrapper.slot(2).note()).toBe('E');
    expect(ChordBuilderWrapper.slot(2).degree()).toBe('3');
    expect(ChordBuilderWrapper.slot(3).note()).toBe('G');
    expect(ChordBuilderWrapper.slot(3).degree()).toBe('5');
    expect(ChordBuilderWrapper.slot(4).note()).toBe('B♭');
    expect(ChordBuilderWrapper.slot(4).degree()).toBe('♭7');
    expect(ChordBuilderWrapper.chordName()).toBe('C7');
  });

  it('builds a minor sixth chord via the seventh picker', async () => {
    await ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.rootPicker.select('C');
    await ChordBuilderWrapper.triadPicker.select('-');
    await ChordBuilderWrapper.seventhPicker.select('6');

    expect(ChordBuilderWrapper.slot(4).note()).toBe('A');
    expect(ChordBuilderWrapper.slot(4).degree()).toBe('6');
    expect(ChordBuilderWrapper.chordName()).toBe('C-6');
  });

  it('builds a full diminished seventh chord with a double-flat seventh', async () => {
    await ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.rootPicker.select('C');
    await ChordBuilderWrapper.triadPicker.select('°');
    await ChordBuilderWrapper.seventhPicker.select('°7');

    expect(ChordBuilderWrapper.slot(4).note()).toBe('B𝄫');
    expect(ChordBuilderWrapper.slot(4).degree()).toBe('♭♭7');
    expect(ChordBuilderWrapper.chordName()).toBe('C°7');
  });

  it('names a major triad with a diminished seventh in parentheses', async () => {
    await ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.rootPicker.select('C');
    await ChordBuilderWrapper.triadPicker.select('Δ');
    await ChordBuilderWrapper.seventhPicker.select('°7');

    expect(ChordBuilderWrapper.chordName()).toBe('C(♭♭7)');
  });

  it('names a diminished triad with a dominant seventh as half-diminished', async () => {
    await ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.rootPicker.select('C');
    await ChordBuilderWrapper.triadPicker.select('°');
    await ChordBuilderWrapper.seventhPicker.select('7');

    expect(ChordBuilderWrapper.chordName()).toBe('Cø7');
  });

  it('names a sus4 dominant seventh chord', async () => {
    await ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.rootPicker.select('C');
    await ChordBuilderWrapper.triadPicker.select('sus4');
    await ChordBuilderWrapper.seventhPicker.select('7');

    expect(ChordBuilderWrapper.chordName()).toBe('C7sus4');
  });

  it('names a sus4 dominant seventh chord with a flat nine extension', async () => {
    await ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.rootPicker.select('C');
    await ChordBuilderWrapper.triadPicker.select('sus4');
    await ChordBuilderWrapper.seventhPicker.select('7');
    await ChordBuilderWrapper.extensionPicker.select('♭9');

    expect(ChordBuilderWrapper.chordName()).toBe('C7sus4(♭9)');
  });

  it('names a sixth chord with a ninth extension as six-nine', async () => {
    await ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.rootPicker.select('C');
    await ChordBuilderWrapper.triadPicker.select('Δ');
    await ChordBuilderWrapper.seventhPicker.select('6');
    await ChordBuilderWrapper.extensionPicker.select('9');

    expect(ChordBuilderWrapper.chordName()).toBe('C6/9');
  });

  it('adds a fifth slot when an extension is selected', async () => {
    await ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.rootPicker.select('C');
    await ChordBuilderWrapper.triadPicker.select('-');
    await ChordBuilderWrapper.seventhPicker.select('7');
    await ChordBuilderWrapper.extensionPicker.select('♭9');

    expect(ChordBuilderWrapper.slot(5).note()).toBe('D♭');
    expect(ChordBuilderWrapper.slot(5).degree()).toBe('♭9');
    expect(ChordBuilderWrapper.chordName()).toBe('C-7(♭9)');
  });

  it('removes the fourth and fifth slots when the seventh is deselected', async () => {
    await ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.rootPicker.select('C');
    await ChordBuilderWrapper.triadPicker.select('-');
    await ChordBuilderWrapper.seventhPicker.select('7');
    await ChordBuilderWrapper.extensionPicker.select('♭9');

    expect(ChordBuilderWrapper.slot(4).exists()).toBe(true);
    expect(ChordBuilderWrapper.slot(5).exists()).toBe(true);

    await ChordBuilderWrapper.seventhPicker.select('7');

    expect(ChordBuilderWrapper.slot(4).exists()).toBe(false);
    expect(ChordBuilderWrapper.slot(5).exists()).toBe(false);
  });

  it('respells the root and chord tones when the accidental switch changes', async () => {
    await ChordBuilderWrapper.mount();

    expect(ChordBuilderWrapper.accidentalSwitch.selected()).toBe('Flat');

    await ChordBuilderWrapper.rootPicker.select('D♭');
    await ChordBuilderWrapper.triadPicker.select('Δ');

    expect(ChordBuilderWrapper.slot(1).note()).toBe('D♭');
    expect(ChordBuilderWrapper.slot(2).note()).toBe('F');
    expect(ChordBuilderWrapper.slot(3).note()).toBe('A♭');
    expect(ChordBuilderWrapper.chordName()).toBe('D♭');

    await ChordBuilderWrapper.accidentalSwitch.select('Sharp');

    expect(ChordBuilderWrapper.slot(1).note()).toBe('C♯');
    expect(ChordBuilderWrapper.slot(2).note()).toBe('E♯');
    expect(ChordBuilderWrapper.slot(3).note()).toBe('G♯');
    expect(ChordBuilderWrapper.chordName()).toBe('C♯');
  });

  it('recomputes all three slots when the root changes after a triad is already selected', async () => {
    await ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.rootPicker.select('C');
    await ChordBuilderWrapper.triadPicker.select('Δ');
    await ChordBuilderWrapper.rootPicker.select('G');

    expect(ChordBuilderWrapper.slot(1).note()).toBe('G');
    expect(ChordBuilderWrapper.slot(1).degree()).toBe('1');
    expect(ChordBuilderWrapper.slot(2).note()).toBe('B');
    expect(ChordBuilderWrapper.slot(2).degree()).toBe('3');
    expect(ChordBuilderWrapper.slot(3).note()).toBe('D');
    expect(ChordBuilderWrapper.slot(3).degree()).toBe('5');
  });

  it('plays the new chord when the root changes after a triad is already selected', async () => {
    await ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.rootPicker.select('C');
    await ChordBuilderWrapper.triadPicker.select('-');
    await ChordBuilderWrapper.rootPicker.select('G');

    expect(ChordBuilderWrapper.playedNotes()).toEqual(['G4', 'Bb4', 'D5']);
  });

  it('plays nothing when only a root is selected', async () => {
    await ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.rootPicker.select('C');

    expect(ChordBuilderWrapper.playedNotes()).toBeUndefined();
  });

  it('plays the spelled chord tones with octaves when a triad is selected', async () => {
    await ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.rootPicker.select('D♭');
    await ChordBuilderWrapper.triadPicker.select('Δ');

    expect(ChordBuilderWrapper.playedNotes()).toEqual(['Db4', 'F4', 'Ab4']);
  });

  it('plays sharp-spelled chord tones when the accidental switch is set to sharp', async () => {
    await ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.accidentalSwitch.select('Sharp');
    await ChordBuilderWrapper.rootPicker.select('C♯');
    await ChordBuilderWrapper.triadPicker.select('Δ');

    expect(ChordBuilderWrapper.playedNotes()).toEqual(['C#4', 'E#4', 'G#4']);
  });

  it('plays a five-note chord with the extension an octave above the triad', async () => {
    await ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.rootPicker.select('C');
    await ChordBuilderWrapper.triadPicker.select('-');
    await ChordBuilderWrapper.seventhPicker.select('7');
    await ChordBuilderWrapper.extensionPicker.select('♭9');

    expect(ChordBuilderWrapper.playedNotes()).toEqual([
      'C4',
      'Eb4',
      'G4',
      'Bb4',
      'Db5',
    ]);
  });

  it('disables the play button when no root is selected', async () => {
    await ChordBuilderWrapper.mount();

    expect(ChordBuilderWrapper.playButton.isDisabled()).toBe(true);
  });

  it('disables the play button when only a root is selected', async () => {
    await ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.rootPicker.select('C');

    expect(ChordBuilderWrapper.playButton.isDisabled()).toBe(true);
  });

  it('enables the play button once a root and triad are selected', async () => {
    await ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.rootPicker.select('C');
    await ChordBuilderWrapper.triadPicker.select('Δ');

    expect(ChordBuilderWrapper.playButton.isDisabled()).toBe(false);
  });

  it('plays the current chord again when the play button is clicked', async () => {
    await ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.rootPicker.select('C');
    await ChordBuilderWrapper.triadPicker.select('Δ');
    await ChordBuilderWrapper.playButton.click();

    expect(ChordBuilderWrapper.playedNotes()).toEqual(['C4', 'E4', 'G4']);
  });

  it('defaults the instrument key to C', async () => {
    await ChordBuilderWrapper.mount();

    expect(ChordBuilderWrapper.instrumentKeySwitch.selected()).toBe(
      'C instrument',
    );
  });

  it('transposes playback down a major second in B flat mode', async () => {
    await ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.instrumentKeySwitch.select('B flat instrument');
    await ChordBuilderWrapper.rootPicker.select('C');
    await ChordBuilderWrapper.triadPicker.select('Δ');

    expect(ChordBuilderWrapper.playedNotes()).toEqual(['Bb3', 'D4', 'F4']);
  });

  it('transposes playback down a major sixth in E flat mode', async () => {
    await ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.instrumentKeySwitch.select('E flat instrument');
    await ChordBuilderWrapper.rootPicker.select('C');
    await ChordBuilderWrapper.triadPicker.select('Δ');
    await ChordBuilderWrapper.seventhPicker.select('Δ7');

    expect(ChordBuilderWrapper.playedNotes()).toEqual([
      'Eb3',
      'G3',
      'Bb3',
      'D4',
    ]);
  });

  it('keeps showing the written chord in B flat mode', async () => {
    await ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.instrumentKeySwitch.select('B flat instrument');
    await ChordBuilderWrapper.rootPicker.select('C');
    await ChordBuilderWrapper.triadPicker.select('Δ');
    await ChordBuilderWrapper.seventhPicker.select('Δ7');

    expect(ChordBuilderWrapper.chordName()).toBe('CΔ7');
    expect(ChordBuilderWrapper.slot(1).note()).toBe('C');
  });

  it('persists the instrument key across a remount', async () => {
    const first = await ChordBuilderWrapper.mount();

    await ChordBuilderWrapper.instrumentKeySwitch.select('B flat instrument');
    first.unmount();

    await ChordBuilderWrapper.mount();

    expect(ChordBuilderWrapper.instrumentKeySwitch.selected()).toBe(
      'B flat instrument',
    );
  });
});
