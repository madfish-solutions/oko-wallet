import * as console from 'console';
import expressRedisCache, { ExpressRedisCache } from 'express-redis-cache';
import { createClient } from 'redis';

import config from '../../../config';

export const deBankCache: ExpressRedisCache = expressRedisCache({
  client: createClient(config.REDIS_CONFIG.port, config.REDIS_CONFIG.host, config.REDIS_CONFIG),
  prefix: 'deBank-requests'
});

deBankCache.on('message', function (message) {
  console.debug('[deBank Cache]', message);
});
