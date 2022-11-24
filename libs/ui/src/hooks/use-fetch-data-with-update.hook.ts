import { isDefined, OnEventFn } from '@rnw-community/shared';
import { DependencyList, useEffect } from 'react';

const UPDATE_DATA_VALUE = 10000;
const lastUpdateDataTimeCache: Record<string, number> = {};

export const useFetchDataWithUpdate = (
  callback: OnEventFn<void>,
  key: string,
  deps?: DependencyList,
  currentTime = new Date().getTime(),
  timer = UPDATE_DATA_VALUE
) => {
  const fetchDataAndSetLastUpdateTime = (timestamp: number, cache?: 'only-cache') => {
    lastUpdateDataTimeCache[key] = isDefined(cache) ? timestamp : new Date().getTime();
    callback();
  };

  const startInterval = () =>
    setInterval(() => {
      fetchDataAndSetLastUpdateTime(new Date().getTime());
    }, timer);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

    if ((lastUpdateDataTimeCache[key] ?? 0) === 0) {
      fetchDataAndSetLastUpdateTime(new Date().getTime());
      interval = startInterval();
    }

    const gapTime = currentTime - (lastUpdateDataTimeCache[key] ?? 0);
    const slippageTime = 300;

    if (gapTime > slippageTime) {
      fetchDataAndSetLastUpdateTime(lastUpdateDataTimeCache[key] ?? 0, 'only-cache');
      timeout = setTimeout(
        () => {
          fetchDataAndSetLastUpdateTime(new Date().getTime());
          interval = startInterval();
        },
        UPDATE_DATA_VALUE - gapTime > slippageTime ? UPDATE_DATA_VALUE - gapTime : 0
      );
    }

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [deps]);
};
