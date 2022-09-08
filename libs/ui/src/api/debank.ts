import { isDefined } from '@rnw-community/shared';
import axios from 'axios';
import memoize from 'fast-memoize';

import { BASE_DEBANK_URL, DEBANK_HEADERS } from '../constants/defaults';
import { ActivityResponse, TokenInfo } from '../interfaces/activity.interface';

import { TokenListResponse } from './types';

export const debankApiRequest = axios.create({
  baseURL: BASE_DEBANK_URL,
  headers: DEBANK_HEADERS
});

export const getHistoryList = memoize(
  async (
    publicKey: string,
    chainName: string,
    startTime: number,
    tokenId?: string
  ): Promise<ActivityResponse | void> => {
    const tokenIdqueryParam = isDefined(tokenId) ? `&token_id=${tokenId}` : '';

    return debankApiRequest
      .get<ActivityResponse>(
        `v1/user/history_list?id=${publicKey}&chain_id=${chainName}&page_count=20&start_time=${startTime}${tokenIdqueryParam}`
      )
      .then(result => result.data)
      .catch(e => console.log(e));
  }
);
export const getTokenInfo = async (contractAddress: string, chainName: string): Promise<TokenInfo> =>
  debankApiRequest
    .get(`v1/token?id=${contractAddress}&chain_id=${chainName}`)
    .then(result => result.data)
    .catch(() => ({} as TokenInfo));

export const getTokenList = (publicKeyHash: string, chainName: string | undefined) =>
  isDefined(chainName)
    ? debankApiRequest
        .get<TokenListResponse>(`v1/user/token_list?id=${publicKeyHash}&chain_id=${chainName}`)
        .then(({ data }) => data)
        .catch(() => [])
    : [];
