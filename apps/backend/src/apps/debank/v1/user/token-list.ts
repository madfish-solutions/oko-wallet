import { types } from 'backend';
import { NextFunction, Request, Response, Router } from 'express';

import { deBankCache, proxyDeBankRequest } from '../../utils';

const getUserTokenList = (req: Request, res: Response, next: NextFunction) =>
  proxyDeBankRequest<types.TokenListResponse>('user/token_list', req.query, next).then(data =>
    res.status(200).send(data)
  );

export const tokenListRoute = Router().get(
  '/token_list',
  deBankCache.route({
    expire: {
      200: 15,
      304: 15,
      xxx: 1
    }
  }),
  getUserTokenList
);

export default tokenListRoute;
