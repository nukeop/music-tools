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

function textContentOf(button: HTMLElement): string {
  return button.textContent!;
}

function ariaLabelOf(button: HTMLElement): string {
  return button.getAttribute('aria-label')!;
}

function group(
  groupLabel: string,
  readSelected: (button: HTMLElement) => string,
) {
  return {
    selected() {
      const groupElement = screen.getByRole('group', { name: groupLabel });
      const pressedButtons = within(groupElement).getAllByRole('button', {
        pressed: true,
      });
      return readSelected(pressedButtons[0]);
    },

    async select(name: string) {
      const groupElement = screen.getByRole('group', { name: groupLabel });
      await user.click(within(groupElement).getByRole('button', { name }));
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
    return fakeInstrument.played.at(-1);
  },
};
