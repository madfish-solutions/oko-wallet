import { types } from 'backend';
import { NextFunction, Request, Response, Router } from 'express';
import { ExpirationConfig } from 'express-redis-cache';

import { deBankCache, proxyDeBankRequest } from '../../utils';

const expire: ExpirationConfig = {
  200: 15, // OK loaded response
  304: 15, // Not Modified a.k.a cached, no need to reload
  xxx: 1
};

const getUserTokenList = (req: Request, res: Response, next: NextFunction) =>
  proxyDeBankRequest<types.TokenListResponse>('user/token_list', req.query)
    .then(data => res.status(200).send(data))
    .catch(next);

export const tokenListRoute = Router().get('/token_list', deBankCache.route({ expire }), getUserTokenList);

export default tokenListRoute;
