import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { persistTempo, readInitialTempo } from './tempo';

type TempoContextValue = {
  tempo: number;
  setTempo: Dispatch<SetStateAction<number>>;
};

const TempoContext = createContext<TempoContextValue | null>(null);

type TempoProviderProps = {
  children?: ReactNode;
};

export function TempoProvider({ children }: TempoProviderProps) {
  const [tempo, setTempo] = useState<number>(readInitialTempo);

  useEffect(() => {
    persistTempo(tempo);
  }, [tempo]);

  return (
    <TempoContext.Provider value={{ tempo, setTempo }}>
      {children}
    </TempoContext.Provider>
  );
}

export function useTempo(): TempoContextValue {
  return useContext(TempoContext)!;
}
