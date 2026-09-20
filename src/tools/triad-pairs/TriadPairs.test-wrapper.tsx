import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createFakeInstrument } from '../../../fake-instrument';
import { mountApp } from '../../../mount-app';
import { ariaLabelOf, group, textContentOf } from '../../../test-group';

const user = userEvent.setup();

let fakeInstrument: ReturnType<typeof createFakeInstrument>;

function degreeSelect(label: string) {
  function getSelect() {
    return screen.getByRole('combobox', { name: label });
  }

  return {
    async select(optionLabel: string) {
      await user.selectOptions(getSelect(), optionLabel);
    },
  };
}

function autoToggle(label: string) {
  return {
    isPressed() {
      const button = screen.getByRole('button', { name: label });
      return button.getAttribute('aria-pressed') === 'true';
    },

    async toggle() {
      await user.click(screen.getByRole('button', { name: label }));
    },
  };
}

function tones(triad: 1 | 2) {
  return {
    notes() {
      return [1, 2, 3].map(
        (index) => screen.getByTestId(`tone-${triad}-${index}`).textContent!,
      );
    },

    async clickNote(name: string) {
      const buttons = [1, 2, 3].map((index) =>
        screen.getByTestId(`tone-${triad}-${index}`),
      );
      const target = buttons.find((b) => b.textContent === name)!;
      await user.click(target);
    },
  };
}

function line(n: 1 | 2 | 3) {
  const labels = {
    1: 'Play root position',
    2: 'Play 1st inversion',
    3: 'Play 2nd inversion',
  };

  return {
    notes() {
      return [1, 2, 3, 4, 5, 6].map(
        (index) => screen.getByTestId(`line-${n}-note-${index}`).textContent!,
      );
    },

    async play() {
      await user.click(screen.getByRole('button', { name: labels[n] }));
    },
  };
}

export const TriadPairsWrapper = {
  async mount() {
    fakeInstrument = createFakeInstrument();
    const result = await mountApp(fakeInstrument.instrument);
    await user.click(screen.getByRole('link', { name: 'Triad pairs' }));
    await screen.findByRole('heading', { name: 'Triad pairs' });
    return result;
  },

  get rootPicker() {
    return group('Root note', textContentOf);
  },

  get accidentalSwitch() {
    return group('Note spelling', ariaLabelOf);
  },

  get triad1Degree() {
    return degreeSelect('Triad 1 degree');
  },

  get triad1Quality() {
    return group('Triad 1 quality', textContentOf);
  },

  get triad1Auto() {
    return autoToggle('Triad 1 auto quality');
  },

  get triad2Degree() {
    return degreeSelect('Triad 2 degree');
  },

  get patternPicker() {
    return group('Pattern', textContentOf);
  },

  get instrumentKeySwitch() {
    return group('Instrument key', ariaLabelOf);
  },

  tones(triad: 1 | 2) {
    return tones(triad);
  },

  line(n: 1 | 2 | 3) {
    return line(n);
  },

  sharedNotes() {
    const element = screen.queryByTestId('shared-notes');
    if (element === null) {
      return null;
    }
    return element.textContent!;
  },

  async playAll() {
    await user.click(screen.getByRole('button', { name: 'Play all' }));
  },

  async setTempo(value: number) {
    const input = screen.getByRole('spinbutton', { name: 'Tempo' });
    await user.clear(input);
    await user.type(input, String(value));
    await user.tab();
  },

  playedSequences() {
    return fakeInstrument.playedSequences;
  },

  playedNotes() {
    return fakeInstrument.playedChords;
  },
};
