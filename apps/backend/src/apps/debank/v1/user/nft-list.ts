import { types } from 'backend';
import { NextFunction, Request, Response, Router } from 'express';

import { deBankCache, proxyDeBankRequest, rateLimiterMiddleware } from '../../utils';

const getUserNFTList = (req: Request, res: Response, next: NextFunction) =>
  proxyDeBankRequest<types.NftListResponse>('user/nft_list', req.query, next).then(data => res.status(200).send(data));

export const nftListRoute = Router().get(
  '/nft_list',
  deBankCache.route({
    expire: {
      200: 15,
      304: 15,
      xxx: 1
    }
  }),
  rateLimiterMiddleware,
  getUserNFTList
);

export default nftListRoute;
