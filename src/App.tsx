import { RouterProvider } from '@tanstack/react-router';
import { InstrumentKeyProvider } from './instrument-key/InstrumentKeyProvider';
import { router as defaultRouter } from './router';

type AppProps = {
  router?: typeof defaultRouter;
};

export function App({ router }: AppProps) {
  return (
    <InstrumentKeyProvider>
      <RouterProvider router={router ?? defaultRouter} />
    </InstrumentKeyProvider>
  );
}
