import { Router } from 'express';

import { historyListRoute } from './history-list';
import { nftListRoute } from './nft-list';
import { tokenListRoute } from './token-list';

export const deBankUser = Router().use(historyListRoute).use(tokenListRoute).use(nftListRoute);

export default deBankUser;
