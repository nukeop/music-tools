import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const user = userEvent.setup();

export function textContentOf(button: HTMLElement): string {
  return button.textContent!;
}

export function ariaLabelOf(button: HTMLElement): string {
  return button.getAttribute('aria-label')!;
}

export function group(
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
