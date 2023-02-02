import { interfaces } from 'backend';
import { NextFunction, Request, Response, Router } from 'express';

import { deBankCache, proxyDeBankRequest } from '../../utils';

const getUserHistoryList = (req: Request, res: Response, next: NextFunction) =>  proxyDeBankRequest<interfaces.ActivityResponse>('user/history_list', req.query, next).then(data => res.send(data));

export const historyListRoute = Router().get(
  '/history_list',
  (req, res, next) => {
    if (Number(req.query.start_time) !== 0) {
      return deBankCache.route({
        expire: {
          200: deBankCache.FOREVER,
          '4xx': 1,
          '5xx': 1,
          xxx: 1
        }
      })(req, res, next);
    }
    next();
  },
  getUserHistoryList
);

export default historyListRoute;
