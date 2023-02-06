import { ChainUserRequest, NftListResponse } from 'backend';
import { NextFunction, Request, Response, Router } from 'express';
import { ExpirationConfig } from 'express-redis-cache';
import { query } from 'express-validator';

import { validateRequestMiddleware, routeCache } from '../../../../utils';
import { proxyDeBankRequest } from '../../utils';

const validationHandlers = [query('chain_id').isString(), query('id').isEthereumAddress(), validateRequestMiddleware];

const expire: ExpirationConfig = {
  200: 15, // OK loaded response
  304: 15, // Not Modified a.k.a cached, no need to reload
  xxx: 1
};
const cacheHandlers = [routeCache.route({ expire })];

const getUserNFTList = (req: Request, res: Response, next: NextFunction) =>
  proxyDeBankRequest<ChainUserRequest, NftListResponse>('user/nft_list', req.query)
    .then(data => res.status(200).send(data))
    .catch(next);

export const nftListRoute = Router().get('/nft_list', ...validationHandlers, ...cacheHandlers, getUserNFTList);

export default nftListRoute;
