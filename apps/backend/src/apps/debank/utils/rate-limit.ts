import { NextFunction, Request, Response } from 'express';
import { RateLimiterRedis, RateLimiterRes } from 'rate-limiter-flexible';
import { createClient } from 'redis';

import config from '../../../config';

const rateLimiter = new RateLimiterRedis({
  storeClient: createClient(config.REDIS_CONFIG),
  keyPrefix: 'deBank-rate-limit',
  points: 20, // 20 requests
  duration: 3 // per 3 seconds by IP
});

const formStat = (key: string, lrRes: RateLimiterRes): string =>
  `${key} c.:${lrRes.consumedPoints} pts, l.: ${lrRes.remainingPoints} pts. Reset in ${lrRes.msBeforeNext / 1000}s`;

export const rateLimiterMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const key = req.ip;

  return rateLimiter
    .consume(key)
    .then(rlRes => {
      console.debug('[deBank Rate Limiter]', formStat(key, rlRes));

      return next();
    })
    .catch(() => res.status(429).send('Too Many Requests'));
};
