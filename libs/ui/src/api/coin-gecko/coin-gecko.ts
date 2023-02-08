import { isDefined } from '@rnw-community/shared';
import axios from 'axios';

import { DATA_UPDATE_TIME } from '../../constants/update-time';
import { getSlug } from '../../utils/getSlug.uitl';
import { memoize } from '../../utils/memoize.util';

import { coinGeckoGasTokenId, coinGeckoId } from './constants';
import { TokensPriceInfoResponse } from './types';

const coinGeckoApiRequest = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/'
});

export const getTokensPriceInfo = memoize(
  async (chainId: string, tokenAddressesList: string[]) => {
    const coinGeckoChainId = coinGeckoId[chainId];

    return isDefined(coinGeckoChainId)
      ? coinGeckoApiRequest
          .get<TokensPriceInfoResponse>(`simple/token_price/${coinGeckoChainId}`, {
            params: {
              contract_addresses: tokenAddressesList.join(','),
              include_24hr_change: true,
              vs_currencies: 'usd'
            }
          })
          .then(({ data }) => data)
          .catch(() => ({}))
      : {};
  },
  (chainId, tokenAddressesList) => getSlug(chainId, tokenAddressesList.length.toString(), 'token-price-info'),
  DATA_UPDATE_TIME
);

export const getGasTokenPriceInfo = memoize(
  async (chainId: string) => {
    const coinGeckoGasTokenChainId = coinGeckoGasTokenId[chainId];

    return isDefined(coinGeckoGasTokenChainId)
      ? coinGeckoApiRequest
          .get<TokensPriceInfoResponse>('simple/price', {
            params: {
              ids: coinGeckoGasTokenChainId,
              include_24hr_change: true,
              vs_currencies: 'usd'
            }
          })
          .then(({ data }) => data)
          .catch(() => ({}))
      : {};
  },
  chainId => getSlug(chainId, 'gas-token-price-info'),
  DATA_UPDATE_TIME
);
