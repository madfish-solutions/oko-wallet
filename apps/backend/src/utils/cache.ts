import console from 'console';
import expressRedisCache, { ExpressRedisCache } from 'express-redis-cache';
import { createClient } from 'redis';

import config from '../config';

export const routeCache: ExpressRedisCache = expressRedisCache({
  client: createClient(config.REDIS_CONFIG),
  prefix: 'requests-cache'
});

routeCache.on('message', function (message) {
  console.debug('[Route Cache]', message);
});
routeCache.on('error', function (error) {
  console.error('[Route Cache]', error);
});
