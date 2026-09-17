import { createMemoryHistory } from '@tanstack/react-router';
import { type RenderResult, render, screen } from '@testing-library/react';
import { App } from './src/App';
import type { Instrument } from './src/audio/Instrument';
import { InstrumentProvider } from './src/audio/InstrumentProvider';
import { createAppRouter } from './src/router';

export async function mountApp(instrument: Instrument): Promise<RenderResult> {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  const router = createAppRouter(history);
  const result = render(
    <InstrumentProvider instrument={instrument}>
      <App router={router} />
    </InstrumentProvider>,
  );
  await screen.findByRole('navigation', { name: 'Tools' });
  return result;
}
