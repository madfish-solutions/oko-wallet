import { ActivityResponse, HistoryListRequest } from 'backend';
import { NextFunction, Request, Response, Router } from 'express';
import { ExpirationConfig } from 'express-redis-cache';
import { query } from 'express-validator';

import { validateRequestMiddleware, routeCache, minMaxValidator } from '../../../../utils';
import { proxyDeBankRequest } from '../../utils';

const validationHandlers = [
  query('id').notEmpty().exists().isEthereumAddress(),
  query('chain_id').notEmpty().exists().isString(),
  query('page_count').default(20).isInt().custom(minMaxValidator(0, 20)),
  query('start_time').optional().default(0).isInt(),
  query('token_id').optional().isEthereumAddress(),
  validateRequestMiddleware
];

const expire: ExpirationConfig = {
  200: routeCache.FOREVER,
  304: routeCache.FOREVER,
  xxx: 1
};
const noCacheZeroStartTime = (req: Request, res: Response, next: NextFunction) => {
  const start_time = Number(req.query.start_time);
  // Use only cache if start_time not 0
  res.use_express_redis_cache = start_time !== 0;

  return next();
};
const cacheHandlers = [noCacheZeroStartTime, routeCache.route({ expire })];

const getUserHistoryList = (req: Request, res: Response, next: NextFunction) =>
  proxyDeBankRequest<HistoryListRequest, ActivityResponse>('user/history_list', req.query)
    .then(data => res.status(200).send(data))
    .catch(next);

export const historyListRoute = Router().get(
  '/history_list',
  ...validationHandlers,
  ...cacheHandlers,
  getUserHistoryList
);

export default historyListRoute;
