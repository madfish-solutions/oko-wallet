import { isDefined } from '@rnw-community/shared';

interface CacheItem<T> {
  createdAt: number;
  data: T;
}

type AnyType = any;

const cache: Record<string, CacheItem<AnyType>> = {};

export const memoize =
  <ArgumentsType extends AnyType[], ReturnType>(
    fetchFn: (...args: ArgumentsType) => Promise<ReturnType>,
    keyFn: (...args: ArgumentsType) => string,
    experationTime: number
  ): ((...args: ArgumentsType) => Promise<ReturnType>) =>
  (...args) => {
    const key = keyFn(...args);
    const cacheValue = cache[key];

    if (isDefined(cacheValue) && cacheValue.createdAt + experationTime > new Date().getTime()) {
      return cacheValue.data;
    }

    const newValue = fetchFn(...args);
    cache[key] = {
      createdAt: new Date().getTime(),
      data: newValue
    };

    return newValue;
  };
