import { EmptyFn } from '@rnw-community/shared';
import { DependencyList, useEffect } from 'react';

export const useTimerEffect = (callback: EmptyFn, refreshInterval: number, deps: DependencyList = []) =>
  useEffect(() => {
    callback();

    const interval = setInterval(callback, refreshInterval);

    return () => clearInterval(interval);
  }, [...deps]);
