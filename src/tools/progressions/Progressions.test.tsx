import { beforeEach, describe, expect, it } from 'bun:test';
import { ProgressionsWrapper } from './Progressions.test-wrapper';

describe('Progressions', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts with a four-bar I-vi-ii-V turnaround in C', async () => {
    await ProgressionsWrapper.mount();

    expect(ProgressionsWrapper.chordNames()).toEqual([
      'CΔ7',
      'A-7',
      'D-7',
      'G7',
    ]);
    expect(ProgressionsWrapper.timeline()).toEqual([
      ['CΔ7'],
      ['A-7'],
      ['D-7'],
      ['G7'],
    ]);
  });

  it('cycles the chords to fill the bars', async () => {
    await ProgressionsWrapper.mount();
    await ProgressionsWrapper.setChordCount(2);
    await ProgressionsWrapper.setBars(3);
    await ProgressionsWrapper.setChordsPerBar(2);

    expect(ProgressionsWrapper.timeline()).toEqual([
      ['CΔ7', 'A-7'],
      ['CΔ7', 'A-7'],
      ['CΔ7', 'A-7'],
    ]);
  });

  it('adds chords as plain C major and keeps edits when the count shrinks and grows', async () => {
    await ProgressionsWrapper.mount();
    await ProgressionsWrapper.setChordCount(5);

    expect(ProgressionsWrapper.chordNames()).toEqual([
      'CΔ7',
      'A-7',
      'D-7',
      'G7',
      'C',
    ]);

    await ProgressionsWrapper.selectChord(2);
    await ProgressionsWrapper.rootPicker.select('E♭');
    await ProgressionsWrapper.triadPicker.select('Δ');
    await ProgressionsWrapper.extensionPicker.select('9');
    await ProgressionsWrapper.setChordCount(1);
    await ProgressionsWrapper.setChordCount(2);

    expect(ProgressionsWrapper.chordNames()).toEqual(['CΔ7', 'E♭7(9)']);
  });

  it('respells roots with sharps', async () => {
    await ProgressionsWrapper.mount();
    await ProgressionsWrapper.rootPicker.select('D♭');
    await ProgressionsWrapper.triadPicker.select('°');
    await ProgressionsWrapper.seventhPicker.select('7');
    await ProgressionsWrapper.accidentalSwitch.select('Sharp');

    expect(ProgressionsWrapper.chordNames()[0]).toBe('C♯ø7');
  });

  it('plays one chord per bar, keeping roots between F3 and E4', async () => {
    await ProgressionsWrapper.mount();

    await ProgressionsWrapper.play();

    expect(ProgressionsWrapper.playedProgressions()).toEqual([
      {
        chords: [
          ['C4', 'E4', 'G4', 'B4'],
          ['A3', 'C4', 'E4', 'G4'],
          ['D4', 'F4', 'A4', 'C5'],
          ['G3', 'B3', 'D4', 'F4'],
        ],
        secondsPerChord: 2.4,
      },
    ]);
  });

  it('splits each bar evenly between its chords at the set tempo', async () => {
    await ProgressionsWrapper.mount();
    await ProgressionsWrapper.setTempo(120);
    await ProgressionsWrapper.setChordCount(2);
    await ProgressionsWrapper.setBars(2);
    await ProgressionsWrapper.setChordsPerBar(4);

    await ProgressionsWrapper.play();

    const [played] = ProgressionsWrapper.playedProgressions();
    expect(played.secondsPerChord).toBe(0.5);
    expect(played.chords).toHaveLength(8);
    expect(played.chords[7]).toEqual(['A3', 'C4', 'E4', 'G4']);
  });

  it('transposes chords for a B♭ instrument', async () => {
    await ProgressionsWrapper.mount();
    await ProgressionsWrapper.instrumentKeySwitch.select('B flat instrument');
    await ProgressionsWrapper.setChordCount(1);
    await ProgressionsWrapper.setBars(1);

    await ProgressionsWrapper.play();

    expect(ProgressionsWrapper.playedProgressions()[0].chords).toEqual([
      ['Bb3', 'D4', 'F4', 'A4'],
    ]);
  });

  it('loads the clicked chord into the root and layer pickers', async () => {
    await ProgressionsWrapper.mount();
    await ProgressionsWrapper.selectChord(2);

    expect(ProgressionsWrapper.editedChord()).toBe('Chord 2');
    expect(ProgressionsWrapper.rootPicker.selected()).toBe('A');
    expect(ProgressionsWrapper.triadPicker.selected()).toBe('-');
    expect(ProgressionsWrapper.seventhPicker.selected()).toBe('7');
  });

  it('previews a chord when it is selected or edited', async () => {
    await ProgressionsWrapper.mount();
    await ProgressionsWrapper.selectChord(4);

    expect(ProgressionsWrapper.previewedChord()).toEqual([
      'G3',
      'B3',
      'D4',
      'F4',
    ]);

    await ProgressionsWrapper.extensionPicker.select('♭9');

    expect(ProgressionsWrapper.previewedChord()).toEqual([
      'G3',
      'B3',
      'D4',
      'F4',
      'Ab4',
    ]);
  });

  it('clears the extension when the seventh is deselected', async () => {
    await ProgressionsWrapper.mount();
    await ProgressionsWrapper.extensionPicker.select('9');
    await ProgressionsWrapper.seventhPicker.select('Δ7');

    expect(ProgressionsWrapper.chordNames()[0]).toBe('C');
  });

  it('edits the last chord when the count drops below the edited one', async () => {
    await ProgressionsWrapper.mount();
    await ProgressionsWrapper.selectChord(4);
    await ProgressionsWrapper.setChordCount(2);

    expect(ProgressionsWrapper.editedChord()).toBe('Chord 2');
  });
});
