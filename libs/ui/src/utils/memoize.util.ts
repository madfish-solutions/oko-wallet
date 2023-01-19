/* eslint-disable @typescript-eslint/no-explicit-any */
import { isDefined } from '@rnw-community/shared';

interface CacheItem<T> {
  createdAt: number;
  data: T;
}

const cache: Record<string, CacheItem<any>> = {};

export const memoize =
  <ArgumentsType extends any[], ReturnType>(
    fetchFn: (...args: ArgumentsType) => Promise<ReturnType>,
    keyFn: (...args: ArgumentsType) => string,
    expirationTime: number
  ): ((...args: ArgumentsType) => Promise<ReturnType>) =>
  (...args) => {
    const key = keyFn(...args);
    const cacheValue = cache[key];

    if (isDefined(cacheValue) && cacheValue.createdAt + expirationTime > new Date().getTime()) {
      return cacheValue.data;
    }

    const newValue = fetchFn(...args);
    cache[key] = {
      createdAt: new Date().getTime(),
      data: newValue
    };

    return newValue;
  };
