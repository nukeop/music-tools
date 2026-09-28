import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createFakeInstrument } from '../../../fake-instrument';
import { mountApp } from '../../../mount-app';
import { ariaLabelOf, group, textContentOf } from '../../../test-group';

const user = userEvent.setup();

let fakeInstrument: ReturnType<typeof createFakeInstrument>;

async function selectOption(label: string, option: string) {
  const select = screen.getByRole('combobox', { name: label });
  await user.selectOptions(select, option);
}

export const ProgressionsWrapper = {
  async mount() {
    fakeInstrument = createFakeInstrument();
    const result = await mountApp(fakeInstrument.instrument);
    await user.click(screen.getByRole('link', { name: 'Progressions' }));
    await screen.findByRole('heading', { name: 'Chord progressions' });
    return result;
  },

  get accidentalSwitch() {
    return group('Note spelling', ariaLabelOf);
  },

  get instrumentKeySwitch() {
    return group('Instrument key', ariaLabelOf);
  },

  async setChordCount(count: number) {
    await selectOption('Chords', String(count));
  },

  async setBars(bars: number) {
    await selectOption('Bars', String(bars));
  },

  async setChordsPerBar(chordsPerBar: number) {
    await selectOption('Chords per bar', String(chordsPerBar));
  },

  async selectChord(number: number) {
    await user.click(screen.getByRole('button', { name: `Chord ${number}` }));
  },

  editedChord() {
    const chips = screen.getByRole('group', { name: 'Progression chords' });
    const pressed = within(chips).getByRole('button', { pressed: true });
    return ariaLabelOf(pressed);
  },

  get keyPicker() {
    return group('Key', textContentOf);
  },

  get degreePicker() {
    return group('Degree', textContentOf);
  },

  get triadPicker() {
    return group('Triad', textContentOf);
  },

  get seventhPicker() {
    return group('Seventh', textContentOf);
  },

  get extensionPicker() {
    return group('Extension', textContentOf);
  },

  numerals() {
    return screen
      .getAllByTestId('progression-chord-numeral')
      .map(textContentOf);
  },

  chordNames() {
    return screen.getAllByTestId('progression-chord-name').map(textContentOf);
  },

  timeline() {
    return screen
      .getAllByTestId('timeline-bar')
      .map((bar) =>
        within(bar).getAllByTestId('timeline-numeral').map(textContentOf),
      );
  },

  async play() {
    await user.click(screen.getByRole('button', { name: 'Play progression' }));
  },

  async setTempo(tempo: number) {
    const input = screen.getByRole('spinbutton', { name: 'Tempo' });
    await user.clear(input);
    await user.type(input, `${tempo}{Enter}`);
  },

  previewedChord() {
    return fakeInstrument.playedChords.at(-1);
  },

  playedProgressions() {
    return fakeInstrument.playedProgressions;
  },
};
