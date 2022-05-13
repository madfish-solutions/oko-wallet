import { DependencyList, EffectCallback, useEffect } from 'react';

const DEFAULT_TIME_VALUE = 3000;

export const useDelayedEffect = (effect: EffectCallback, deps?: DependencyList, ms = DEFAULT_TIME_VALUE) => {
  useEffect(() => {
    const timeoutId = setTimeout(effect, ms);

    return () => clearTimeout(timeoutId);
  }, deps);
};
