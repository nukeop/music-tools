import { act, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createFakeInstrument } from '../../../fake-instrument';
import { mountApp } from '../../../mount-app';
import { ariaLabelOf, group, textContentOf } from '../../../test-group';

const user = userEvent.setup();

let fakeInstrument: ReturnType<typeof createFakeInstrument>;

const ROW_HEIGHT = 40;

function getDragHandle(row: HTMLElement) {
  return within(row).getByRole('button', { name: 'Drag to reorder' });
}

function stubRowLayouts() {
  const rows = screen.getAllByTestId('scale-row');
  const originals = rows.map((row) => row.getBoundingClientRect);

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    row.getBoundingClientRect = () =>
      ({
        top: i * ROW_HEIGHT,
        bottom: (i + 1) * ROW_HEIGHT,
        left: 0,
        right: 300,
        width: 300,
        height: ROW_HEIGHT,
        x: 0,
        y: i * ROW_HEIGHT,
      }) as DOMRect;
  }

  return function restore() {
    for (let i = 0; i < rows.length; i++) {
      rows[i].getBoundingClientRect = originals[i];
    }
  };
}

function scaleRow(index: number) {
  function getRow() {
    const rows = screen.getAllByTestId('scale-row');
    return rows[index];
  }

  return {
    name() {
      const row = getRow();
      return textContentOf(within(row).getByTestId('scale-name'));
    },

    tones() {
      const row = getRow();
      return within(row).getAllByTestId('scale-tone').map(textContentOf);
    },

    get dragHandle() {
      const row = getRow();
      const handle = getDragHandle(row);

      return {
        async moveUp() {
          const restore = stubRowLayouts();
          handle.focus();
          await user.keyboard(' ');
          await user.keyboard('{ArrowUp}');
          await user.keyboard(' ');
          restore();
        },

        async moveDown() {
          const restore = stubRowLayouts();
          handle.focus();
          await user.keyboard(' ');
          await user.keyboard('{ArrowDown}');
          await user.keyboard(' ');
          restore();
        },
      };
    },

    async play() {
      const row = getRow();
      const button = within(row).getByRole('button', { name: 'Play' });
      await user.click(button);
    },

    async remove() {
      const row = getRow();
      const button = within(row).getByRole('button', { name: 'Remove' });
      await user.click(button);
    },
  };
}

/**
 * Drives a pointer drag by dispatching PointerEvents directly.
 * dnd-kit's PointerSensor listens for pointerdown on the activator,
 * then pointermove and pointerup on the window. The activation
 * constraint requires at least 4px of movement. happy-dom does not
 * support setPointerCapture or layout, so we stub getBoundingClientRect
 * on the row elements and dispatch pointer events manually.
 */
async function pointerDragRow(fromIndex: number, toIndex: number) {
  const restore = stubRowLayouts();

  const rows = screen.getAllByTestId('scale-row');
  const handle = getDragHandle(rows[fromIndex]);

  const startY = fromIndex * ROW_HEIGHT + ROW_HEIGHT / 2;
  const activateY = startY + 5;
  const endY = toIndex * ROW_HEIGHT + ROW_HEIGHT / 2;

  await act(async () => {
    handle.dispatchEvent(
      new PointerEvent('pointerdown', {
        clientX: 150,
        clientY: startY,
        pointerId: 1,
        isPrimary: true,
        button: 0,
        bubbles: true,
        cancelable: true,
      }),
    );
  });

  await act(async () => {
    document.dispatchEvent(
      new PointerEvent('pointermove', {
        clientX: 150,
        clientY: activateY,
        pointerId: 1,
        isPrimary: true,
        bubbles: true,
        cancelable: true,
      }),
    );
  });

  await act(async () => {
    document.dispatchEvent(
      new PointerEvent('pointermove', {
        clientX: 150,
        clientY: endY,
        pointerId: 1,
        isPrimary: true,
        bubbles: true,
        cancelable: true,
      }),
    );
  });

  await act(async () => {
    document.dispatchEvent(
      new PointerEvent('pointerup', {
        clientX: 150,
        clientY: endY,
        pointerId: 1,
        isPrimary: true,
        bubbles: true,
        cancelable: true,
      }),
    );
  });

  restore();
}

export const ScalesWrapper = {
  async mount() {
    fakeInstrument = createFakeInstrument();
    const result = await mountApp(fakeInstrument.instrument);
    await user.click(screen.getByRole('link', { name: 'Scales' }));
    await screen.findByRole('heading', { name: 'Scales' });
    return result;
  },

  get rootPicker() {
    return group('Root note', textContentOf);
  },

  get accidentalSwitch() {
    return group('Note spelling', ariaLabelOf);
  },

  async addScale(label: string) {
    const select = screen.getByRole('combobox', { name: 'Scale' });
    await user.selectOptions(select, label);
    await user.click(screen.getByRole('button', { name: 'Add' }));
  },

  row(index: number) {
    return scaleRow(index);
  },

  rowNames() {
    const rows = screen.getAllByTestId('scale-row');
    return rows.map((row) =>
      textContentOf(within(row).getByTestId('scale-name')),
    );
  },

  get instrumentKeySwitch() {
    return group('Instrument key', ariaLabelOf);
  },

  playedSequences() {
    return fakeInstrument.playedSequences;
  },

  pointerDragRow,
};
