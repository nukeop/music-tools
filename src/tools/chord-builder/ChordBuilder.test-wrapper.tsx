import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../../App';
import type { Instrument } from '../../audio/Instrument';
import { InstrumentProvider } from '../../audio/InstrumentProvider';

const user = userEvent.setup();

function createFakeInstrument(): {
  instrument: Instrument;
  played: string[][];
} {
  const played: string[][] = [];
  const instrument: Instrument = {
    async playChord(notes: string[]) {
      played.push(notes);
    },
  };
  return { instrument, played };
}

let fakeInstrument: ReturnType<typeof createFakeInstrument>;

type SlotPosition = 1 | 2 | 3 | 4 | 5;

function choiceGroup(groupLabel: string) {
  return {
    selected() {
      const group = screen.getByRole('group', { name: groupLabel });
      const pressedButtons = within(group).getAllByRole('button', {
        pressed: true,
      });
      if (pressedButtons.length === 0) {
        return null;
      }
      return pressedButtons[0].textContent!;
    },

    async select(label: string) {
      const group = screen.getByRole('group', { name: groupLabel });
      await user.click(within(group).getByRole('button', { name: label }));
    },
  };
}

function segmentedControl(groupLabel: string) {
  return {
    selected() {
      const group = screen.getByRole('group', { name: groupLabel });
      const pressedButtons = within(group).getAllByRole('button', {
        pressed: true,
      });
      if (pressedButtons.length === 0) {
        return null;
      }
      return pressedButtons[0].getAttribute('aria-label')!;
    },

    async select(ariaLabel: string) {
      const group = screen.getByRole('group', { name: groupLabel });
      await user.click(within(group).getByRole('button', { name: ariaLabel }));
    },
  };
}

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
  mount() {
    fakeInstrument = createFakeInstrument();
    return render(
      <InstrumentProvider instrument={fakeInstrument.instrument}>
        <App />
      </InstrumentProvider>,
    );
  },

  get rootPicker() {
    return choiceGroup('Root note');
  },

  get triadPicker() {
    return choiceGroup('Triad');
  },

  get seventhPicker() {
    return choiceGroup('Seventh');
  },

  get extensionPicker() {
    return choiceGroup('Extension');
  },

  get accidentalSwitch() {
    return segmentedControl('Note spelling');
  },

  get instrumentKeySwitch() {
    return segmentedControl('Instrument key');
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
    return fakeInstrument.played.at(-1);
  },
};
