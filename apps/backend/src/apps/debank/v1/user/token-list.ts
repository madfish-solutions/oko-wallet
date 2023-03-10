import { ChainUserRequest, TokenResponse } from 'backend';
import { NextFunction, Request, Response, Router } from 'express';
import { ExpirationConfig } from 'express-redis-cache';
import { query } from 'express-validator';

import { validateRequestMiddleware, routeCache } from '../../../../utils';
import { proxyDeBankRequest } from '../../utils';

const validationHandlers = [
  query('id').notEmpty().exists().isEthereumAddress(),
  query('chain_id').notEmpty().exists().isString(),
  query('is_all').optional().isBoolean().default(true),
  validateRequestMiddleware
];

const expire: ExpirationConfig = {
  200: 15, // OK loaded response
  304: 15, // Not Modified a.k.a cached, no need to reload
  xxx: 1
};
const cacheHandlers = [routeCache.route({ expire })];

const getUserTokenList = (req: Request, res: Response, next: NextFunction) =>
  proxyDeBankRequest<ChainUserRequest, TokenResponse[]>('user/token_list', req.query)
    .then(data => res.status(200).send(data))
    .catch(next);

export const tokenListRoute = Router().get('/token_list', ...validationHandlers, ...cacheHandlers, getUserTokenList);

export default tokenListRoute;
