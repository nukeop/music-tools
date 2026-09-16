import { InstrumentKeyProvider } from './instrument-key/InstrumentKeyProvider';
import { AppLayout } from './layout/AppLayout';
import { ChordBuilder } from './tools/chord-builder/ChordBuilder';

export function App() {
  return (
    <InstrumentKeyProvider>
      <AppLayout>
        <ChordBuilder />
      </AppLayout>
    </InstrumentKeyProvider>
  );
}
