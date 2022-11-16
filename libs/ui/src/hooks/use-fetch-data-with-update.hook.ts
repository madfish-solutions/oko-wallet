import { isDefined, isNotEmptyString } from '@rnw-community/shared';
import { useEffect } from 'react';

const UPDATE_DATA_VALUE = 10000;
const lastUpdateDataTimeCache: Record<string, number> = {};

export const useFetchDataWithUpdate = (
  callback: (startTime?: number) => void,
  tokenAddress = '',
  currentTime = new Date().getTime(),
  timer = UPDATE_DATA_VALUE
) => {
  const currentTokenAddress = isNotEmptyString(tokenAddress) ? tokenAddress : 'all_activity';

  const fetchDataAndSetLastUpdateTime = (timestamp: number, cache?: 'only-cache') => {
    lastUpdateDataTimeCache[currentTokenAddress] = isDefined(cache) ? timestamp : new Date().getTime();
    callback(timestamp);
  };

  const startInterval = () =>
    setInterval(() => {
      fetchDataAndSetLastUpdateTime(new Date().getTime());
    }, timer);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

    // if current time more then last update plus UPDATE_DATA_VALUE then get new fetch request
    // ex: 16:14:00 > 16:13:44 + 00:00:10 (16:13:54)
    if ((lastUpdateDataTimeCache[currentTokenAddress] ?? 0) === 0) {
      fetchDataAndSetLastUpdateTime(new Date().getTime());
      interval = startInterval();
    }

    // gap between current time and last update time
    // ex: 16:14:00 - 16:13:52 = 00:00:08 => gapTime = 8000ms
    const gapTime = currentTime - (lastUpdateDataTimeCache[currentTokenAddress] ?? 0);
    const slippageTime = 300;

    // request data from the cache
    // and make a calculation when there will be a new request
    if (gapTime > slippageTime) {
      // request only for get data from cache
      fetchDataAndSetLastUpdateTime(lastUpdateDataTimeCache[currentTokenAddress] ?? 0, 'only-cache');

      // if gap time between requests more than 0 and less than UPDATE_DATA_VALUE,
      // then get request through this gap time, else get request at once
      // ex: UPDATE_DATA_VALUE = 10000ms; gapTime = 8000ms => the next request will be in 2000ms
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
  }, []);
};
