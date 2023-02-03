import * as console from 'console';
import expressRedisCache, { ExpressRedisCache } from 'express-redis-cache';
import { createClient } from 'redis';

import { getRedisConfig } from '../../../config/redis';

export const deBankCache: ExpressRedisCache = expressRedisCache({
  client: createClient(getRedisConfig()),
  prefix: 'deBank-requests'
});

deBankCache.on('message', function (message) {
  console.debug('[deBank Cache]', message);
});
deBankCache.on('error', function (error) {
  console.error('[deBank Cache]', error);
});
