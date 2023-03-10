import { isNotEmptyString } from '@rnw-community/shared';
import axios from 'axios';
import { ActivityResponse, NftListResponse, TokenResponse } from 'backend-types';

import { GAS_TOKEN_ADDRESS } from '../../constants/defaults';
import { DATA_UPDATE_TIME } from '../../constants/update-time';
import { BACKEND_URL } from '../../utils/env.utils';
import { getSlug } from '../../utils/getSlug.uitl';
import { memoize } from '../../utils/memoize.util';

const debankApiRequest = axios.create({
  baseURL: `${BACKEND_URL}/debank/`
});

export const getTokenInfo = memoize(
  (tokenAddress: string, chainId: string) =>
    debankApiRequest
      .get<TokenResponse>('v1/token', { params: { id: tokenAddress, chain_id: chainId } })
      .then(({ data }) => data)
      .catch(() => null),
  (tokenAddress, chainId) => getSlug(tokenAddress, chainId, 'token-info'),
  DATA_UPDATE_TIME
);

export const getHistoryList = memoize(
  async (
    publicKeyHash: string,
    chainName: string,
    startTime: number,
    tokenAddress?: string
  ): Promise<ActivityResponse | void> =>
    debankApiRequest
      .get<ActivityResponse>('v1/user/history_list', {
        params: {
          chain_id: chainName,
          id: publicKeyHash,
          page_count: 20,
          start_time: startTime,
          token_id: tokenAddress === GAS_TOKEN_ADDRESS ? undefined : tokenAddress
        }
      })
      .then(result => result.data)
      .catch(e => console.log(e)),
  (publicKeyHash, chainName, startTime, tokenAddress) =>
    getSlug(
      publicKeyHash,
      chainName,
      startTime.toString(),
      isNotEmptyString(tokenAddress) ? tokenAddress : '',
      isNotEmptyString(tokenAddress) ? 'history-list' : 'all_history_list'
    ),
  DATA_UPDATE_TIME
);

export const getTokenList = memoize(
  (publicKeyHash: string, chainId: string) =>
    debankApiRequest
      .get<TokenResponse[]>('v1/user/token_list', {
        params: {
          id: publicKeyHash,
          chain_id: chainId
        }
      })
      .then(({ data }) => data)
      .catch(() => []),
  (publicKeyHash, chainId) => getSlug(publicKeyHash, chainId, 'token-list'),
  DATA_UPDATE_TIME
);

export const getAllUserNftList = memoize(
  (publicKeyHash: string, chainId: string) =>
    debankApiRequest
      .get<NftListResponse[]>('v1/user/nft_list', { params: { id: publicKeyHash, chain_id: chainId } })
      .then(({ data }) => data)
      .catch(() => []),
  (publicKeyHash, chainId) => getSlug(publicKeyHash, chainId, 'nft-list'),
  DATA_UPDATE_TIME
);
