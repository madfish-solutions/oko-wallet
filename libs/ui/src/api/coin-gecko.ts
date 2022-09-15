import { isDefined } from '@rnw-community/shared';
import axios from 'axios';

import { coinGeckoGasTokenId, coinGeckoId } from './constants/coin-gecko-id';
import { TokenPriceInfoResponse } from './types';

const coinGeckoApiRequest = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/'
});

export const getTokensPriceInfo = async (chainId: string, tokenAddressesList: string[]) => {
  const coinGeckoChainId = coinGeckoId[chainId];

  return isDefined(coinGeckoChainId)
    ? coinGeckoApiRequest
        .get<TokenPriceInfoResponse>(`simple/token_price/${coinGeckoChainId}`, {
          params: {
            contract_addresses: tokenAddressesList.join(','),
            include_24hr_change: true,
            vs_currencies: 'usd'
          }
        })
        .then(({ data }) => data)
        .catch(() => ({}))
    : {};
};

export const getGasTokenPriceInfo = async (chainId: string) => {
  const coinGeckoGasTokenChainId = coinGeckoGasTokenId[chainId];

  return isDefined(coinGeckoGasTokenChainId)
    ? coinGeckoApiRequest
        .get<TokenPriceInfoResponse>('simple/price', {
          params: {
            ids: coinGeckoGasTokenChainId,
            include_24hr_change: true,
            vs_currencies: 'usd'
          }
        })
        .then(({ data }) => data)
        .catch(() => ({}))
    : {};
};
