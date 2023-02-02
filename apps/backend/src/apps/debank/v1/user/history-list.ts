import { interfaces } from 'backend';
import { NextFunction, Request, Response, Router } from 'express';

import { deBankCache, proxyDeBankRequest, rateLimiterMiddleware } from '../../utils';

const getUserHistoryList = (req: Request, res: Response, next: NextFunction) =>
  proxyDeBankRequest<interfaces.ActivityResponse>('user/history_list', req.query, next).then(data => res.status(200).send(data));

export const historyListRoute = Router().get(
  '/history_list',
  (req, res, next) => {
    // Use only cache if start_time not 0
    res.use_express_redis_cache = Number(req.query.start_time) !== 0;
    next();
  },
  deBankCache.route({
    expire: {
      200: deBankCache.FOREVER,
      304: deBankCache.FOREVER,
      xxx: 1
    }
  }),
  rateLimiterMiddleware,
  getUserHistoryList
);

export default historyListRoute;
