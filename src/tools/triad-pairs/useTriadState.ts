import { useState } from 'react';
import {
  autoQuality,
  type Degree,
  type TriadQuality,
} from '../../theory/triadPairs';

export type TriadState = {
  degree: Degree;
  quality: TriadQuality;
  auto: boolean;
};

export function useTriadState(initialDegree: Degree) {
  const [state, setState] = useState<TriadState>(() => ({
    degree: initialDegree,
    quality: autoQuality(initialDegree),
    auto: true,
  }));

  function selectDegree(degree: Degree) {
    if (state.auto) {
      setState({ ...state, degree, quality: autoQuality(degree) });
    } else {
      setState({ ...state, degree });
    }
  }

  function selectQuality(quality: TriadQuality) {
    setState({ ...state, quality, auto: false });
  }

  function toggleAuto() {
    if (state.auto) {
      setState({ ...state, auto: false });
    } else {
      setState({ ...state, auto: true, quality: autoQuality(state.degree) });
    }
  }

  return { ...state, selectDegree, selectQuality, toggleAuto };
}
