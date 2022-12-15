import { REACT_APP_BACKEND_URL } from '@env';
import { isDefined } from '@rnw-community/shared';
import axios from 'axios';
import memoize from 'fast-memoize';

import { ActivityResponse, TokenInfo } from '../interfaces/activity.interface';

import { NftListResponse, TokenListResponse } from './types';

const debankApiRequest = axios.create({
  baseURL: `${REACT_APP_BACKEND_URL}/debank/`
});

export const getHistoryList = memoize(
  async (publicKey: string, chainName: string, startTime: number, tokenId?: string): Promise<ActivityResponse | void> =>
    debankApiRequest
      .get<ActivityResponse>('v1/user/history_list', {
        params: { chain_id: chainName, id: publicKey, page_count: 20, start_time: startTime, token_id: tokenId }
      })
      .then(result => result.data)
      .catch(e => console.log(e))
);

export const getTokenInfo = async (contractAddress: string, chainName: string): Promise<TokenInfo> =>
  debankApiRequest
    .get('v1/token', { params: { id: contractAddress, chain_id: chainName } })
    .then(result => result.data)
    .catch(() => ({} as TokenInfo));

export const getTokenList = (publicKeyHash: string, chainName: string) =>
  debankApiRequest
    .get<TokenListResponse>('v1/user/token_list', {
      params: {
        id: publicKeyHash,
        chain_id: chainName
      }
    })
    .then(({ data }) => data)
    .catch(() => []);

export const getAllUserNftList = (publicKeyHash: string, chainId: string | undefined) =>
  isDefined(chainId)
    ? debankApiRequest
        .get<NftListResponse[]>('v1/user/nft_list', { params: { id: publicKeyHash, chain_id: chainId } })
        .then(({ data }) => data)
        .catch(() => [])
    : [];
