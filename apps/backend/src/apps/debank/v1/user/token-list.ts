import { types } from 'backend';
import { NextFunction, Request, Response, Router } from 'express';

import { deBankCache, proxyDeBankRequest } from '../../utils';

const getUserTokenList = (req: Request, res: Response, next: NextFunction) =>
  proxyDeBankRequest<types.TokenListResponse>('user/token_list', req.query, next).then(data => res.send(data));

export const tokenListRoute = Router().get(
  '/token_list',
  deBankCache.route({
    expire: {
      200: 15,
      '4xx': 3,
      403: 15,
      '5xx': 3,
      xxx: 1
    }
  }),
  getUserTokenList
);

export default tokenListRoute;
