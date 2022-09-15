import axios from 'axios';

import { BASE_DEBANK_URL, DEBANK_HEADERS } from '../constants/defaults';

import { TokenListResponse } from './types';

export const debankApiRequest = axios.create({
  baseURL: BASE_DEBANK_URL,
  headers: DEBANK_HEADERS
});

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
