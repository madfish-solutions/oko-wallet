import { isDefined } from '@rnw-community/shared';
import debounce from 'lodash/debounce';
import { useEffect, useState } from 'react';

import { getHistoryList } from '../api/debank';
import { DEBOUNCE_TIME, GAS_TOKEN_ADDRESS } from '../constants/defaults';
import { TransactionStatusEnum } from '../enums/transactions.enum';
import {
  ActivityData,
  ActivityResponse,
  SectionListActivityData,
  TokenInfo,
  TransactionLabelEnum
} from '../interfaces/activity.interface';
import { checkIsDayLabelNeeded, transformTimestampToDate } from '../screens/activity/components/activity-list.utils';
import { capitalize } from '../utils/string.util';

const filterGasTokenTransaction = (data: ActivityResponse) => ({
  ...data,
  history_list: data?.history_list.filter(txData => txData.cate_id === null)
});

/*
transform data from API
(https://docs.open.debank.com/en/reference/api-pro-reference/user#get-user-histroy-list)
to ActivityData type, as we needed
*/

const transformApiData = (
  data: ActivityResponse,
  publicKeyHash: string,
  chainName: string
): SectionListActivityData[] => {
  let response: SectionListActivityData[] = [];
  const filteredTransactions = data?.history_list.filter(
    txData => !(txData.receives.length > 0 && txData.sends.length > 0) && txData.cate_id !== 'approve'
  );

  let sectionListItem: SectionListActivityData | undefined;

  const userTokensMetadata = data.token_dict as Record<string, TokenInfo>;

  filteredTransactions.forEach(txData => {
    const activityData = {
      transactionStatus: TransactionStatusEnum.applied,
      hash: txData.id,
      timestamp: txData.time_at
    } as ActivityData;

    if (txData.tx?.status === 0) {
      activityData.transactionStatus = TransactionStatusEnum.failed;
    } else {
      activityData.transactionStatus = TransactionStatusEnum.applied;
    }

    const getTokenSymbol = (address: string) => {
      if (userTokensMetadata[address].hasOwnProperty('optimized_symbol')) {
        return userTokensMetadata[address].optimized_symbol;
      }

      return userTokensMetadata[address].name;
    };

    if (txData.cate_id !== null) {
      activityData.transactionLabel = capitalize(txData.cate_id) as TransactionLabelEnum;

      if (activityData.transactionLabel === TransactionLabelEnum.Send) {
        activityData.amount = txData.sends[0]?.amount;
        activityData.tokenId = txData.sends[0]?.token_id;
        activityData.symbol = getTokenSymbol(txData.sends[0]?.token_id);
      } else {
        activityData.tokenId = txData.receives[0]?.token_id;
        activityData.amount = txData.receives[0]?.amount;
        activityData.symbol = getTokenSymbol(txData.receives[0]?.token_id);
        activityData.transactionLabel = TransactionLabelEnum.Received;
      }
    } else {
      activityData.symbol = chainName;
      activityData.amount = txData.tx?.value;
      if (publicKeyHash.toLowerCase() === txData.tx?.from_addr?.toLowerCase()) {
        activityData.transactionLabel = TransactionLabelEnum.Send;
      } else {
        activityData.transactionLabel = TransactionLabelEnum.Received;
      }
    }

    if (checkIsDayLabelNeeded(txData.time_at) && sectionListItem !== undefined) {
      response = [...response, sectionListItem];
      sectionListItem = { title: transformTimestampToDate(txData.time_at), data: [activityData] };
    } else {
      const data = sectionListItem?.data ?? [];
      sectionListItem = { title: transformTimestampToDate(txData.time_at), data: [...data, activityData] };
    }
  });

  if (sectionListItem !== undefined) {
    response = [...response, sectionListItem];
  }

  return response;
};

export const useAllActivity = (publicKeyHash: string, chainName: string, tokenAddress?: string) => {
  const [lastTimestamp, setLastTimestamp] = useState<Record<string, number>>({});
  const [activity, setActivity] = useState<SectionListActivityData[]>([]);

  useEffect(() => {
    setActivity([]);
    setLastTimestamp({ [publicKeyHash]: 0 });
  }, [publicKeyHash, chainName]);

  const fetchActivity = async (startTime: number) => {
    const response = await getHistoryList(publicKeyHash, chainName, startTime, tokenAddress);

    if (response !== undefined) {
      const activityData =
        tokenAddress === GAS_TOKEN_ADDRESS
          ? transformApiData(filterGasTokenTransaction(response), publicKeyHash, chainName)
          : transformApiData(response, publicKeyHash, chainName);

      if (startTime === 0) {
        setActivity(activityData);
      } else {
        setActivity(prev => [...prev, ...activityData]);
      }

      if (response.history_list.length > 0) {
        setLastTimestamp(prev => ({
          ...prev,
          [publicKeyHash]: response.history_list[response.history_list.length - 1].time_at
        }));
      }
    }
  };

  const fetchData = debounce((startTime?: number) => {
    fetchActivity(isDefined(startTime) ? startTime : lastTimestamp[publicKeyHash] ?? 0);
  }, DEBOUNCE_TIME);

  return { activity, fetchData };
};
