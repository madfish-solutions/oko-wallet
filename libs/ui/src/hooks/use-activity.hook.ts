import axios from 'axios';
import memoize from 'fast-memoize';
import { useState } from 'react';

import { BASE_DEBANK_URL, DEBANK_HEADERS } from '../constants/defaults';
import { TransactionStatusEnum } from '../enums/transactions.enum';
import { ActivityData, ActivityResponse, TokenInfo, TransactionLabelEnum } from '../interfaces/activity.interface';
import { capitalize } from '../utils/string.util';

const debankApiRequest = axios.create({
  baseURL: BASE_DEBANK_URL,
  headers: DEBANK_HEADERS.headers
});

const fetchTokenInfo = async (contractAddress: string, chainName: string): Promise<TokenInfo | undefined> =>
  debankApiRequest
    .get(`v1/token?id=${contractAddress}&chain_id=${chainName}`)
    .then(result => result.data)
    .catch(e => console.log(e));

/*
transform data from API
(https://docs.open.debank.com/en/reference/api-pro-reference/user#get-user-histroy-list)
to ActivityData type, as we needed
*/

const transformApiData = async (
  data: ActivityResponse,
  publicKey: string,
  chainName: string
): Promise<ActivityData[]> =>
  Promise.all(
    data?.history_list.map(async txData => {
      const activityData = {
        transactionStatus: TransactionStatusEnum.applied,
        hash: txData.id,
        timestamp: txData.time_at
      } as ActivityData;
      activityData.transactionStatus = TransactionStatusEnum.applied;
      activityData.hash = txData.id;
      activityData.timestamp = txData.time_at;
      if (txData.cate_id !== null) {
        activityData.transactionLabel = capitalize(txData.cate_id) as TransactionLabelEnum;

        if (activityData.transactionLabel === TransactionLabelEnum.Send) {
          activityData.amount = txData.sends[0]?.amount;
          const data = await fetchTokenInfo(txData.sends[0].token_id, chainName);
          activityData.symbol = data?.symbol !== undefined ? data.symbol : '';
        } else {
          const data = await fetchTokenInfo(txData.receives[0].token_id, chainName);
          activityData.symbol = data?.symbol !== undefined ? data.symbol : '';
          activityData.amount = txData.receives[0]?.amount;
        }
      } else {
        activityData.symbol = chainName;
        activityData.amount = txData.tx?.value;
        if (publicKey.toLowerCase() === txData.tx.from_addr.toLowerCase()) {
          activityData.transactionLabel = TransactionLabelEnum.Send;
        } else {
          activityData.transactionLabel = TransactionLabelEnum.Receive;
        }
      }

      return activityData;
    })
  );

export const useAllActivity = (publicKey: string, chainName: string) => {
  const [lastTimestamp, setLastTimestamp] = useState(0);
  console.log(lastTimestamp, 'last timestamp');
  const [activity, setActivity] = useState<ActivityData[]>([]);
  const fetchActivity = memoize(async (startTime: number) => {
    console.log(lastTimestamp, 'TIMESTAMP MEMOIZED');
    try {
      const response = await debankApiRequest.get(
        `v1/user/history_list?id=${publicKey}&chain_id=${chainName}&page_count=5${
          startTime !== 0 ? `&start_time=${startTime}` : ''
        }`
      );

      const activityData = await transformApiData(response.data, publicKey, chainName);
      setLastTimestamp(activityData[activityData.length - 1].timestamp);
      setActivity([...activity, ...activityData]);
    } catch (e) {
      console.log(e);
    }
  });

  const fetchMoreData = async () => {
    fetchActivity(lastTimestamp);
  };

  return { activity, fetchMoreData };
};
