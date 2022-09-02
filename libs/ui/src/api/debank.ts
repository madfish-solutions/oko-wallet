import axios from 'axios';
import memoize from 'fast-memoize';

import { BASE_DEBANK_URL, DEBANK_HEADERS } from '../constants/defaults';
import { ActivityResponse, TokenInfo } from '../interfaces/activity.interface';

export const debankApiRequest = axios.create({
  baseURL: BASE_DEBANK_URL,
  headers: DEBANK_HEADERS
});

export const fetchTokenInfo = async (contractAddress: string, chainName: string): Promise<TokenInfo | undefined> =>
  debankApiRequest
    .get(`v1/token?id=${contractAddress}&chain_id=${chainName}`)
    .then(result => result.data)
    .catch(e => console.log(e));

export const getHistoryList = memoize(
  async (publicKey: string, chainName: string, startTime: number): Promise<ActivityResponse | void> =>
    debankApiRequest
      .get<ActivityResponse>(
        `v1/user/history_list?id=${publicKey}&chain_id=${chainName}&page_count=20&start_time=${startTime}`
      )
      .then(result => result.data)
      .catch(e => console.log(e))
);
