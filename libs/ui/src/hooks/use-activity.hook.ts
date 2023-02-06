import { isDefined } from '@rnw-community/shared';
import { ActivityResponse } from 'backend-types';
import debounce from 'lodash/debounce';
import { useEffect, useState } from 'react';

import { getHistoryList } from '../api/debank';
import { DEBOUNCE_TIME, GAS_TOKEN_ADDRESS } from '../constants/defaults';
import { TransactionStatusEnum } from '../enums/transactions.enum';
import { ActivityData, SectionListActivityData } from '../interfaces/activity-data.interface';
import { TransactionTypeEnum } from '../interfaces/activity.enum';
import { checkIsDayLabelNeeded, transformTimestampToDate } from '../screens/activity/components/activity-item.utils';
import {
  getTokenSymbol,
  getTransactionProjectName,
  getTransactionType,
  isGasTokenTransaction
} from '../utils/activity.utils';

const filterGasTokenTransaction = (data: ActivityResponse) => ({
  ...data,
  history_list: data?.history_list.filter(transaction => transaction.cate_id === null)
});

/*
transform data from API
(https://docs.open.debank.com/en/reference/api-pro-reference/user#get-user-histroy-list)
to ActivityData type, as we needed
*/

const transformApiData = (
  response: ActivityResponse,
  publicKeyHash: string,
  chainName: string
): SectionListActivityData[] => {
  let result: SectionListActivityData[] = [];

  let sectionListItem: SectionListActivityData | undefined;

  const userTokensMetadata = response.token_dict;
  const userProjectsMetadata = response.project_dict;

  response?.history_list.forEach(transaction => {
    const activityData = {
      status: TransactionStatusEnum.applied,
      hash: transaction.id,
      timestamp: transaction.time_at
    } as ActivityData;

    if (transaction.tx?.status === 0) {
      activityData.status = TransactionStatusEnum.failed;
    }

    const isGasToken = isGasTokenTransaction(transaction);

    const { type, label } = getTransactionType(transaction, isGasToken, publicKeyHash);
    activityData.type = type;
    activityData.label = label;
    activityData.projectName = getTransactionProjectName(userProjectsMetadata, transaction);

    switch (type) {
      case TransactionTypeEnum.Send: {
        if (isGasToken) {
          activityData.symbol = chainName;
          activityData.amount = transaction.tx?.value;
        } else {
          activityData.amount = transaction.sends[0]?.amount;
          activityData.tokenId = transaction.sends[0]?.token_id;
          activityData.symbol = getTokenSymbol(userTokensMetadata, transaction.sends[0]?.token_id);
          activityData.isCollectible = isDefined(userTokensMetadata[transaction.sends[0]?.token_id].thumbnail_url);
        }
        break;
      }
      case TransactionTypeEnum.Receive: {
        if (isGasToken) {
          activityData.symbol = chainName;
          activityData.amount = transaction.tx?.value;
        } else {
          activityData.tokenId = transaction.receives[0]?.token_id;
          activityData.amount = transaction.receives[0]?.amount;
          activityData.symbol = getTokenSymbol(userTokensMetadata, transaction.receives[0]?.token_id);
          activityData.isCollectible = isDefined(userTokensMetadata[transaction.receives[0]?.token_id].thumbnail_url);
        }
        break;
      }
      case TransactionTypeEnum.ContractCalls: {
        activityData.transfer = {
          sends: [
            ...transaction.sends.map(item => ({
              amount: item.amount,
              symbol: getTokenSymbol(userTokensMetadata, item.token_id)
            }))
          ],
          receives: [
            ...transaction.receives.map(item => ({
              amount: item.amount,
              symbol: getTokenSymbol(userTokensMetadata, item.token_id)
            }))
          ]
        };
        break;
      }
    }

    if (checkIsDayLabelNeeded(transaction.time_at) && sectionListItem !== undefined) {
      result = [...result, sectionListItem];
      sectionListItem = { title: transformTimestampToDate(transaction.time_at), data: [activityData] };
    } else {
      const data = sectionListItem?.data ?? [];
      sectionListItem = { title: transformTimestampToDate(transaction.time_at), data: [...data, activityData] };
    }
  });

  if (sectionListItem !== undefined) {
    result = [...result, sectionListItem];
  }

  return result;
};

export const useAllActivity = (publicKeyHash: string, chainName: string, tokenAddress?: string) => {
  const [lastTimestamp, setLastTimestamp] = useState<Record<string, number>>({});
  const [activity, setActivity] = useState<SectionListActivityData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setActivity([]);
    setLastTimestamp({ [publicKeyHash]: 0 });
  }, [publicKeyHash, chainName]);

  const fetchActivity = async (startTime: number) => {
    setIsLoading(true);

    const response = await getHistoryList(publicKeyHash, chainName, startTime, tokenAddress);

    if (response !== undefined) {
      const activityData =
        tokenAddress === GAS_TOKEN_ADDRESS
          ? transformApiData(filterGasTokenTransaction(response), publicKeyHash, chainName)
          : transformApiData(response, publicKeyHash, chainName);

      if (startTime === 0) {
        setActivity(activityData);
      } else if (activityData.length > 0) {
        setActivity(prev => {
          if (
            activityData.length &&
            prev.slice(-1)[0].data.slice(-1)[0].timestamp !== activityData.slice(-1)[0].data.slice(-1)[0].timestamp
          ) {
            const groupingAllDataByDates = [...prev, ...activityData].reduce(
              (acc: Record<string, ActivityData[]>, currentItem) => {
                if (!acc.hasOwnProperty(currentItem.title)) {
                  return {
                    ...acc,
                    [currentItem.title]: currentItem.data
                  };
                }

                return {
                  ...acc,
                  [currentItem.title]: [...acc[currentItem.title], ...currentItem.data]
                };
              },
              {}
            );

            return Object.keys(groupingAllDataByDates).map(title => ({
              title,
              data: groupingAllDataByDates[title]
            }));
          }

          return prev;
        });
      }

      if (activityData.length > 0) {
        setLastTimestamp(prev => ({
          ...prev,
          [publicKeyHash]: activityData[activityData.length - 1].data.slice(-1)[0].timestamp
        }));
      }
    }

    setIsLoading(false);
  };

  const fetch = debounce((startTime?: number) => {
    fetchActivity(isDefined(startTime) ? startTime : lastTimestamp[publicKeyHash] ?? 0);
  }, DEBOUNCE_TIME);

  return { activity, fetch, isLoading };
};
