import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mountApp } from '../../mount-app';
import type { Instrument } from '../audio/Instrument';

const user = userEvent.setup();

function createFakeInstrument(): Instrument {
  return {
    async playChord() {},
  };
}

export const ToolNavWrapper = {
  async mount() {
    await mountApp(createFakeInstrument());
  },

  async goTo(label: string) {
    await user.click(screen.getByRole('link', { name: label }));
  },

  chordBuilderVisible() {
    return screen.queryByTestId('chord-name') !== null;
  },

  triadPairsVisible() {
    return screen.queryByRole('heading', { name: 'Triad pairs' }) !== null;
  },
};
