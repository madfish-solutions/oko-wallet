import { ActivityResponse, HistoryListRequest } from 'backend';
import { NextFunction, Request, Response, Router } from 'express';
import { query } from 'express-validator';

import { validateRequestMiddleware, routeCache } from '../../../../utils';
import { proxyDeBankRequest } from '../../utils';

const validationHandlers = [
  query('chain_id').isString().exists(),
  query('id').isEthereumAddress().exists(),
  query('page_count').default(20).isInt(),
  query('start_time').isInt().exists(),
  query('token_id').isEthereumAddress().optional(),
  validateRequestMiddleware
];

const expire = {
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
