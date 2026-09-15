import { createContext, type ReactNode, useContext } from 'react';
import type { Instrument } from './Instrument';

const InstrumentContext = createContext<Instrument | null>(null);

type InstrumentProviderProps = {
  instrument: Instrument;
  children?: ReactNode;
};

export function InstrumentProvider({
  instrument,
  children,
}: InstrumentProviderProps) {
  return (
    <InstrumentContext.Provider value={instrument}>
      {children}
    </InstrumentContext.Provider>
  );
}

export function useInstrument(): Instrument {
  return useContext(InstrumentContext)!;
}
