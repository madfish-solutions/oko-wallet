import { isDefined } from '@rnw-community/shared';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { getHistoryList } from '../api/debank';
import { TransactionStatusEnum } from '../enums/transactions.enum';
import { ActivityData, ActivityResponse, TransactionLabelEnum } from '../interfaces/activity.interface';
import { loadTokenMetadataAction } from '../store/wallet/wallet.actions';
import { useAllSavedTokensSelector } from '../store/wallet/wallet.selectors';
import { capitalize } from '../utils/string.util';

/*
transform data from API
(https://docs.open.debank.com/en/reference/api-pro-reference/user#get-user-histroy-list)
to ActivityData type, as we needed
*/

const transformApiData = (data: ActivityResponse, publicKeyHash: string, chainName: string): ActivityData[] =>
  data?.history_list.map(txData => {
    const activityData = {
      transactionStatus: TransactionStatusEnum.applied,
      hash: txData.id,
      timestamp: txData.time_at
    } as ActivityData;
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
      if (publicKeyHash.toLowerCase() === txData.tx?.from_addr?.toLowerCase()) {
        activityData.transactionLabel = TransactionLabelEnum.Send;
      } else {
        activityData.transactionLabel = TransactionLabelEnum.Receive;
      }
    }

    return activityData;
  });

export const useAllActivity = (publicKeyHash: string, chainName: string) => {
  const [lastTimestamp, setLastTimestamp] = useState(0);
  const [activity, setActivity] = useState<ActivityData[]>([]);
  const fetchActivity = async (startTime: number) => {
    if (chainName !== undefined) {
      const response = await getHistoryList(publicKeyHash, chainName, startTime);
      if (response !== undefined) {
        const activityData = transformApiData(response, publicKeyHash, chainName);
        setLastTimestamp(activityData[activityData.length - 1].timestamp);
        setActivity([...activity, ...activityData]);
      }
    }
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
      dispatch(loadTokenMetadataAction({ tokenId, chainName }));
    }
  };

  return { symbol, fetchTokenSymbol };
};
