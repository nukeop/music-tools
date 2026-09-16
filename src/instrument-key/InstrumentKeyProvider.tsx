import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  type InstrumentKey,
  persistInstrumentKey,
  readInitialInstrumentKey,
} from './instrumentKey';

type InstrumentKeyContextValue = {
  instrumentKey: InstrumentKey;
  setInstrumentKey: Dispatch<SetStateAction<InstrumentKey>>;
};

const InstrumentKeyContext = createContext<InstrumentKeyContextValue | null>(
  null,
);

type InstrumentKeyProviderProps = {
  children?: ReactNode;
};

export function InstrumentKeyProvider({
  children,
}: InstrumentKeyProviderProps) {
  const [instrumentKey, setInstrumentKey] = useState<InstrumentKey>(
    readInitialInstrumentKey,
  );

  useEffect(() => {
    persistInstrumentKey(instrumentKey);
  }, [instrumentKey]);

  return (
    <InstrumentKeyContext.Provider value={{ instrumentKey, setInstrumentKey }}>
      {children}
    </InstrumentKeyContext.Provider>
  );
}

export function useInstrumentKey(): InstrumentKeyContextValue {
  return useContext(InstrumentKeyContext)!;
}
