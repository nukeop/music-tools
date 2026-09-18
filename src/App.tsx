import { RouterProvider } from '@tanstack/react-router';
import { InstrumentKeyProvider } from './instrument-key/InstrumentKeyProvider';
import { router as defaultRouter } from './router';
import { TempoProvider } from './tempo/TempoProvider';

type AppProps = {
  router?: typeof defaultRouter;
};

export function App({ router }: AppProps) {
  return (
    <InstrumentKeyProvider>
      <TempoProvider>
        <RouterProvider router={router ?? defaultRouter} />
      </TempoProvider>
    </InstrumentKeyProvider>
  );
}
