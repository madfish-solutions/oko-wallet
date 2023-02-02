import { createNewRedisRateLimitter } from '../../utils/rate-limit';

const rateLimiter = createNewRedisRateLimitter('deBank', {
  points: 20, // 20 requests
  duration: 3 // per 3 seconds by IP
});

export const rateLimiterMiddleware = (req, res, next) => {
  rateLimiter
    .consume(req.ip)
    .then(consumed => {
      console.debug(
        `[${rateLimiter.keyPrefix}] ${req.ip} cons pts:${consumed.consumedPoints}, left pts: ${
          consumed.remainingPoints
        } reset in ${consumed.msBeforeNext / 1000}s`
      );

      return next();
    })
    .catch(() => res.status(429).send('Too Many Requests'));
};
