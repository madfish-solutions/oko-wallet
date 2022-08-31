import { isDefined } from '@rnw-community/shared';
import axios from 'axios';
import memoize from 'fast-memoize';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { BASE_DEBANK_URL, DEBANK_HEADERS } from '../constants/defaults';
import { TransactionStatusEnum } from '../enums/transactions.enum';
import { ActivityData, ActivityResponse, TokenInfo, TransactionLabelEnum } from '../interfaces/activity.interface';
import { addNewTokenAction } from '../store/wallet/wallet.actions';
import { useAllSavedTokensSelector } from '../store/wallet/wallet.selectors';
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

const transformApiData = (data: ActivityResponse, publicKey: string, chainName: string): ActivityData[] =>
  data?.history_list.map(txData => {
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
        activityData.tokenId = txData.sends[0].token_id;
      } else {
        activityData.tokenId = txData.receives[0].token_id;
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
  });

const getHistoryList = memoize(
  async (publicKey: string, chainName: string, startTime: number): Promise<ActivityResponse> =>
    debankApiRequest
      .get<ActivityResponse>(
        `v1/user/history_list?id=${publicKey}&chain_id=${chainName}&page_count=5&start_time=${startTime}`
      )
      .then(result => result.data)
      .catch(() => undefined as unknown as ActivityResponse)
);

export const useAllActivity = (publicKey: string, chainName: string) => {
  const [lastTimestamp, setLastTimestamp] = useState(0);
  const [activity, setActivity] = useState<ActivityData[]>([]);
  const fetchActivity = async (startTime: number) => {
    const response = await getHistoryList(publicKey, chainName, startTime);
    const activityData = transformApiData(response, publicKey, chainName);
    setLastTimestamp(activityData[activityData.length - 1].timestamp);
    setActivity([...activity, ...activityData]);
  };

  const fetchMoreData = async () => {
    fetchActivity(lastTimestamp);
  };

  return { activity, fetchMoreData };
};

export const useTokenInfo = (tokenId: string | undefined, chainName: string) => {
  const [symbol, setSymbol] = useState('???');
  const tokenMetadata = useAllSavedTokensSelector();
  const dispatch = useDispatch();

  const fetchTokenSymbol = async () => {
    const token = tokenMetadata.find(([address]) => address.toLowerCase() === tokenId?.toLowerCase());
    if (isDefined(token)) {
      setSymbol(token[1].symbol);
    } else if (isDefined(tokenId)) {
      fetchTokenInfo(tokenId, chainName).then(result => {
        if (isDefined(result)) {
          setSymbol(result.symbol);
          dispatch(addNewTokenAction({ ...result, tokenAddress: result.id }));
        }
      });
    }
  };

  return { symbol, fetchTokenSymbol };
};
