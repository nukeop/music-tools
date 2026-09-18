import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createFakeInstrument } from '../../../fake-instrument';
import { mountApp } from '../../../mount-app';
import { ariaLabelOf, group, textContentOf } from '../../../test-group';

const user = userEvent.setup();

let fakeInstrument: ReturnType<typeof createFakeInstrument>;

type SlotPosition = 1 | 2 | 3 | 4 | 5;

function playButton() {
  return {
    isDisabled() {
      const button = screen.getByRole('button', { name: 'Play chord' });
      return button.hasAttribute('disabled');
    },

    async click() {
      await user.click(screen.getByRole('button', { name: 'Play chord' }));
    },
  };
}

function slot(position: SlotPosition) {
  return {
    exists() {
      return screen.queryByTestId(`chord-slot-${position}`) !== null;
    },

    note() {
      return screen.getByTestId(`chord-slot-${position}-note`).textContent!;
    },

    degree() {
      return screen.getByTestId(`chord-slot-${position}-degree`).textContent!;
    },
  };
}

export const ChordBuilderWrapper = {
  async mount() {
    fakeInstrument = createFakeInstrument();
    return mountApp(fakeInstrument.instrument);
  },

  get rootPicker() {
    return group('Root note', textContentOf);
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

  get accidentalSwitch() {
    return group('Note spelling', ariaLabelOf);
  },

  get instrumentKeySwitch() {
    return group('Instrument key', ariaLabelOf);
  },

  get playButton() {
    return playButton();
  },

  slot(position: SlotPosition) {
    return slot(position);
  },

  chordName(): string {
    return screen.getByTestId('chord-name').textContent!;
  },

  playedNotes(): string[] | undefined {
    return fakeInstrument.playedChords.at(-1);
  },
};
