import { types } from 'backend';
import { NextFunction, Request, Response, Router } from 'express';

import { deBankCache, proxyDeBankRequest } from '../../utils';

const getUserNFTList = (req: Request, res: Response, next: NextFunction) =>
  proxyDeBankRequest<types.NftListResponse>('user/nft_list', req.query, next).then(data => res.send(data));

export const nftListRoute = Router().get(
  '/nft_list',
  deBankCache.route({
    expire: {
      200: 15,
      '4xx': 3,
      403: 15,
      '5xx': 3,
      xxx: 1
    }
  }),
  getUserNFTList
);

export default nftListRoute;
