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

type SlotPosition = 1 | 2 | 3;

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

function accidentalSwitch() {
  return {
    selected() {
      const group = screen.getByRole('group', { name: 'Note spelling' });
      const pressedButtons = within(group).getAllByRole('button', {
        pressed: true,
      });
      if (pressedButtons.length === 0) {
        return null;
      }
      return pressedButtons[0].getAttribute('aria-label')!;
    },

    async select(ariaLabel: string) {
      const group = screen.getByRole('group', { name: 'Note spelling' });
      await user.click(within(group).getByRole('button', { name: ariaLabel }));
    },
  };
}

function slot(position: SlotPosition) {
  return {
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

  get qualityPicker() {
    return choiceGroup('Chord quality');
  },

  get accidentalSwitch() {
    return accidentalSwitch();
  },

  slot(position: SlotPosition) {
    return slot(position);
  },

  playedNotes(): string[] | undefined {
    return fakeInstrument.played.at(-1);
  },
};
