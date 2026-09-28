import { beforeEach, describe, expect, it } from 'bun:test';
import { ProgressionsWrapper } from './Progressions.test-wrapper';

describe('Progressions', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts with a four-bar I-vi-ii-V turnaround in C', async () => {
    await ProgressionsWrapper.mount();

    expect(ProgressionsWrapper.timeline()).toEqual([
      ['IΔ7'],
      ['vi7'],
      ['ii7'],
      ['V7'],
    ]);
    expect(ProgressionsWrapper.chordNames()).toEqual([
      'CΔ7',
      'A-7',
      'D-7',
      'G7',
    ]);
  });

  it('gives every slot of every bar its own chord', async () => {
    await ProgressionsWrapper.mount();
    await ProgressionsWrapper.setBars(2);
    await ProgressionsWrapper.setChordsPerBar(3);

    expect(ProgressionsWrapper.timeline()).toEqual([
      ['IΔ7', 'IΔ7', 'IΔ7'],
      ['vi7', 'vi7', 'vi7'],
    ]);

    await ProgressionsWrapper.selectSlot(1, 2);
    await ProgressionsWrapper.degreePicker.select('IV');
    await ProgressionsWrapper.selectSlot(1, 3);
    await ProgressionsWrapper.degreePicker.select('V');
    await ProgressionsWrapper.seventhPicker.select('7');
    await ProgressionsWrapper.selectSlot(2, 1);
    await ProgressionsWrapper.degreePicker.select('♭VII');
    await ProgressionsWrapper.triadPicker.select('Δ');
    await ProgressionsWrapper.seventhPicker.select('7');

    expect(ProgressionsWrapper.timeline()).toEqual([
      ['IΔ7', 'IVΔ7', 'V7'],
      ['♭VII', 'vi7', 'vi7'],
    ]);
  });

  it('extends the progression with new bars that can be edited', async () => {
    await ProgressionsWrapper.mount();
    await ProgressionsWrapper.setBars(6);

    expect(ProgressionsWrapper.timeline()).toEqual([
      ['IΔ7'],
      ['vi7'],
      ['ii7'],
      ['V7'],
      ['IΔ7'],
      ['vi7'],
    ]);

    await ProgressionsWrapper.selectSlot(6, 1);
    await ProgressionsWrapper.degreePicker.select('♭VI');

    expect(ProgressionsWrapper.numerals()[5]).toBe('♭vi7');
    expect(ProgressionsWrapper.numerals()[1]).toBe('vi7');
  });

  it('keeps edits when the bar and chord counts shrink and grow', async () => {
    await ProgressionsWrapper.mount();
    await ProgressionsWrapper.setChordsPerBar(2);
    await ProgressionsWrapper.selectSlot(4, 2);
    await ProgressionsWrapper.degreePicker.select('♭II');

    await ProgressionsWrapper.setChordsPerBar(1);
    await ProgressionsWrapper.setBars(2);
    await ProgressionsWrapper.setBars(4);
    await ProgressionsWrapper.setChordsPerBar(2);

    expect(ProgressionsWrapper.timeline()[3]).toEqual(['V7', '♭II7']);
  });

  it('edits the last remaining slot when the edited one is removed', async () => {
    await ProgressionsWrapper.mount();
    await ProgressionsWrapper.setChordsPerBar(4);
    await ProgressionsWrapper.selectSlot(4, 4);
    await ProgressionsWrapper.setBars(2);
    await ProgressionsWrapper.setChordsPerBar(2);

    expect(ProgressionsWrapper.editedSlot()).toBe('Bar 2 chord 2');
  });

  it('moves every chord when the key changes', async () => {
    await ProgressionsWrapper.mount();
    await ProgressionsWrapper.keyPicker.select('E♭');

    expect(ProgressionsWrapper.numerals()).toEqual(['IΔ7', 'vi7', 'ii7', 'V7']);
    expect(ProgressionsWrapper.chordNames()).toEqual([
      'E♭Δ7',
      'C-7',
      'F-7',
      'B♭7',
    ]);
  });

  it('spells chromatic degrees from the key', async () => {
    await ProgressionsWrapper.mount();
    await ProgressionsWrapper.selectSlot(1, 1);
    await ProgressionsWrapper.degreePicker.select('♭II');
    await ProgressionsWrapper.seventhPicker.select('7');
    await ProgressionsWrapper.selectSlot(2, 1);
    await ProgressionsWrapper.degreePicker.select('♯IV');
    await ProgressionsWrapper.triadPicker.select('°');
    await ProgressionsWrapper.selectSlot(3, 1);
    await ProgressionsWrapper.degreePicker.select('♭V');
    await ProgressionsWrapper.triadPicker.select('Δ');
    await ProgressionsWrapper.seventhPicker.select('7');

    expect(ProgressionsWrapper.numerals()).toEqual([
      '♭II7',
      '♯ivø7',
      '♭V',
      'V7',
    ]);
    expect(ProgressionsWrapper.chordNames()).toEqual([
      'D♭7',
      'F♯ø7',
      'G♭',
      'G7',
    ]);
  });

  it('writes minor and diminished triads as lowercase numerals', async () => {
    await ProgressionsWrapper.mount();
    await ProgressionsWrapper.seventhPicker.select('Δ7');
    await ProgressionsWrapper.triadPicker.select('-');

    expect(ProgressionsWrapper.numerals()[0]).toBe('i');

    await ProgressionsWrapper.degreePicker.select('VII');
    await ProgressionsWrapper.triadPicker.select('°');

    expect(ProgressionsWrapper.numerals()[0]).toBe('vii°');

    await ProgressionsWrapper.triadPicker.select('+');

    expect(ProgressionsWrapper.numerals()[0]).toBe('VII+');
  });

  it('spells the key with sharps', async () => {
    await ProgressionsWrapper.mount();
    await ProgressionsWrapper.keyPicker.select('D♭');
    await ProgressionsWrapper.accidentalSwitch.select('Sharp');

    expect(ProgressionsWrapper.chordNames()[0]).toBe('C♯Δ7');
    expect(ProgressionsWrapper.chordNames()[3]).toBe('G♯7');
  });

  it('loads the clicked slot into the degree and layer pickers', async () => {
    await ProgressionsWrapper.mount();
    await ProgressionsWrapper.selectSlot(2, 1);

    expect(ProgressionsWrapper.editedSlot()).toBe('Bar 2 chord 1');
    expect(ProgressionsWrapper.degreePicker.selected()).toBe('VI');
    expect(ProgressionsWrapper.triadPicker.selected()).toBe('-');
    expect(ProgressionsWrapper.seventhPicker.selected()).toBe('7');
  });

  it('previews a chord when it is selected or edited', async () => {
    await ProgressionsWrapper.mount();
    await ProgressionsWrapper.selectSlot(4, 1);

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

    expect(ProgressionsWrapper.numerals()[0]).toBe('I');
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

  it('plays every slot in bar order, splitting bars evenly at the set tempo', async () => {
    await ProgressionsWrapper.mount();
    await ProgressionsWrapper.setTempo(120);
    await ProgressionsWrapper.setBars(2);
    await ProgressionsWrapper.setChordsPerBar(2);
    await ProgressionsWrapper.selectSlot(1, 2);
    await ProgressionsWrapper.degreePicker.select('IV');

    await ProgressionsWrapper.play();

    expect(ProgressionsWrapper.playedProgressions()).toEqual([
      {
        chords: [
          ['C4', 'E4', 'G4', 'B4'],
          ['F3', 'A3', 'C4', 'E4'],
          ['A3', 'C4', 'E4', 'G4'],
          ['A3', 'C4', 'E4', 'G4'],
        ],
        secondsPerChord: 1,
      },
    ]);
  });

  it('plays the progression in the chosen key', async () => {
    await ProgressionsWrapper.mount();
    await ProgressionsWrapper.keyPicker.select('F');
    await ProgressionsWrapper.setBars(1);

    await ProgressionsWrapper.play();

    expect(ProgressionsWrapper.playedProgressions()[0].chords).toEqual([
      ['F3', 'A3', 'C4', 'E4'],
    ]);
  });

  it('transposes chords for a B♭ instrument', async () => {
    await ProgressionsWrapper.mount();
    await ProgressionsWrapper.instrumentKeySwitch.select('B flat instrument');
    await ProgressionsWrapper.setBars(1);

    await ProgressionsWrapper.play();

    expect(ProgressionsWrapper.playedProgressions()[0].chords).toEqual([
      ['Bb3', 'D4', 'F4', 'A4'],
    ]);
  });
});
