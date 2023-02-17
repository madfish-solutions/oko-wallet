import { RequestHandler } from 'express';
import { IRateLimiterRedisOptions, RateLimiterRedis, RateLimiterRes } from 'rate-limiter-flexible';
import { createClient } from 'redis';

import config from '../config';

const formStat = (key: string, lrRes: RateLimiterRes): string =>
  `${key} c.:${lrRes.consumedPoints} pts, l.: ${lrRes.remainingPoints} pts. Reset in ${lrRes.msBeforeNext / 1000}s`;

export const getRateLimiterMiddleware = (opts: Omit<IRateLimiterRedisOptions, 'storeClient'>): RequestHandler => {
  const rateLimiter = new RateLimiterRedis({
    ...opts,
    storeClient: createClient(config.REDIS_CONFIG)
  });

  return (req, res, next) =>
    rateLimiter
      .consume(req.ip)
      .then(rlRes => {
        console.debug('[Rate Limit]', formStat(req.ip, rlRes));

        return next();
      })
      .catch(() => res.status(429).send('Too Many Requests'));
};
