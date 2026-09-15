import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { InstrumentProvider } from './audio/InstrumentProvider';
import { ToneInstrument } from './audio/ToneInstrument';

const instrument = new ToneInstrument();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InstrumentProvider instrument={instrument}>
      <App />
    </InstrumentProvider>
  </StrictMode>,
);
