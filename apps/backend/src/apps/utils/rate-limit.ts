import { RateLimiterRedis } from 'rate-limiter-flexible';
import { createClient } from 'redis';

import config from '../../config';

const rateLimiterStore = createClient(config.REDIS_CONFIG.port, config.REDIS_CONFIG.host, config.REDIS_CONFIG);

export function createNewRedisRateLimitter(name: string, opts: { points: number; duration: number }) {
  return new RateLimiterRedis({
    storeClient: rateLimiterStore,
    keyPrefix: `${name}-rate-limit`,
    points: opts.points,
    duration: opts.duration
  });
}
