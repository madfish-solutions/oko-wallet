import { RateLimiterRedis } from 'rate-limiter-flexible';
import { createClient } from 'redis';

import { getRedisConfig } from '../../config/redis';

export function createNewRedisRateLimitter(name: string, opts: { points: number; duration: number }) {
  return new RateLimiterRedis({
    storeClient: createClient(getRedisConfig()),
    keyPrefix: `${name}-rate-limit`,
    points: opts.points,
    duration: opts.duration
  });
}
