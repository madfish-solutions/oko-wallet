import { isDefined } from '@rnw-community/shared';

type AnyType = any;

interface CacheItem<T> {
  createdAt: number;
  data: T;
  prevArgs: AnyType[];
}

const cache: Record<string, CacheItem<AnyType>> = {};

export const memoize =
  <ArgumentsType extends AnyType[], ReturnType>(
    fetchFn: (...args: ArgumentsType) => Promise<ReturnType>,
    keyFn: (...args: ArgumentsType) => string,
    expirationTime: number
  ): ((...args: ArgumentsType) => Promise<ReturnType>) =>
  (...args) => {
    const key = keyFn(...args);
    const cacheValue = cache[key];

    if (
      isDefined(cacheValue) &&
      cacheValue.createdAt + expirationTime > new Date().getTime() &&
      isDefined(cacheValue.prevArgs) &&
      JSON.stringify(cacheValue.prevArgs) === JSON.stringify([...args])
    ) {
      return cacheValue.data;
    }

    const newValue = fetchFn(...args);
    cache[key] = {
      createdAt: new Date().getTime(),
      data: newValue,
      prevArgs: [...args]
    };

    return newValue;
  };
