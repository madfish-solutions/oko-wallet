import { EmptyFn, isDefined } from '@rnw-community/shared';
import { DependencyList, useEffect } from 'react';

export const useTimerEffect = (
  callback: EmptyFn,
  refreshInterval: number,
  deps: DependencyList = [],
  scrollOffsetY?: number
) =>
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isDefined(scrollOffsetY) && scrollOffsetY === 0) {
      callback();

      interval = setInterval(callback, refreshInterval);
    } else if (!isDefined(scrollOffsetY)) {
      callback();

      interval = setInterval(callback, refreshInterval);
    } else {
      return () => {
        clearInterval(interval);
      };
    }

    return () => clearInterval(interval);
  }, [...deps]);
