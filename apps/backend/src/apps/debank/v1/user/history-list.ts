import { interfaces } from 'backend';
import { NextFunction, Request, Response, Router } from 'express';

import { deBankCache, proxyDeBankRequest } from '../../utils';

const expire = {
  200: deBankCache.FOREVER,
  304: deBankCache.FOREVER,
  xxx: 1
};

const noCacheZeroStartTime = (req: Request, res: Response, next: NextFunction) => {
  // Use only cache if start_time not 0
  res.use_express_redis_cache = Number(req.query.start_time) !== 0;

  return next();
};

const getUserHistoryList = (req: Request, res: Response, next: NextFunction) =>
  proxyDeBankRequest<interfaces.ActivityResponse>('user/history_list', req.query)
    .then(data => res.status(200).send(data))
    .catch(next);

export const historyListRoute = Router().get(
  '/history_list',
  noCacheZeroStartTime,
  deBankCache.route({ expire }),
  getUserHistoryList
);

export default historyListRoute;
