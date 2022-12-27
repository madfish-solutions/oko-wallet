import { isDefined, isNotEmptyString } from '@rnw-community/shared';
import debounce from 'lodash/debounce';
import { useEffect, useState } from 'react';

import { getHistoryList } from '../api/debank';
import { DEBOUNCE_TIME, GAS_TOKEN_ADDRESS } from '../constants/defaults';
import { TransactionStatusEnum } from '../enums/transactions.enum';
import {
  ActivityData,
  ActivityResponse,
  SectionListActivityData,
  TransactionLabelEnum,
  TransactionResponse,
  TransactionTypeEnum
} from '../interfaces/activity.interface';
import { checkIsDayLabelNeeded, transformTimestampToDate } from '../screens/activity/components/activity-item.utils';

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

  let sectionListItem: SectionListActivityData | undefined;

  const userTokensMetadata: ActivityResponse['token_dict'] = data.token_dict;
  const userProjectsMetadata: ActivityResponse['project_dict'] = data.project_dict;

  const getTokenSymbol = (address: string) =>
    userTokensMetadata[address].optimized_symbol ?? userTokensMetadata[address].name;

  const getProjectName = (projectId: string) => userProjectsMetadata[projectId].name;

  const getTransactionType = (txData: TransactionResponse, isGasToken: boolean, isGasTokenSended: boolean) => {
    if (txData.cate_id === TransactionTypeEnum.Send || (isGasToken && isGasTokenSended)) {
      return {
        type: TransactionTypeEnum.Send,
        label: TransactionLabelEnum.Send
      };
    }
    if (txData.cate_id === TransactionTypeEnum.Receive || (isGasToken && !isGasTokenSended)) {
      return {
        type: TransactionTypeEnum.Receive,
        label: TransactionLabelEnum.Received
      };
    }
    if (isNotEmptyString(txData.tx.name)) {
      return {
        type: TransactionTypeEnum.Interaction,
        label: txData.tx.name
      };
    }

    return {
      type: TransactionTypeEnum.ContractInteraction,
      label: TransactionLabelEnum.ContractInteraction
    };
  };

  data?.history_list.forEach(txData => {
    const activityData = {
      status: TransactionStatusEnum.applied,
      hash: txData.id,
      timestamp: txData.time_at
    } as ActivityData;

    if (txData.tx?.status === 0) {
      activityData.status = TransactionStatusEnum.failed;
    }

    const isGasToken =
      !(txData.sends.length > 0 && txData.receives.length > 0) &&
      isDefined(txData.tx) &&
      txData.tx.value > 0 &&
      txData.cate_id === null &&
      txData.token_approve === null;
    const isGasTokenSended = publicKeyHash.toLowerCase() === txData.tx?.from_addr?.toLowerCase();

    const { type, label } = getTransactionType(txData, isGasToken, isGasTokenSended);
    activityData.type = type;
    activityData.label = label;

    switch (type) {
      case TransactionTypeEnum.Send: {
        if (isGasToken) {
          activityData.symbol = chainName;
          activityData.amount = txData.tx?.value;
        } else {
          activityData.amount = txData.sends[0]?.amount;
          activityData.tokenId = txData.sends[0]?.token_id;
          activityData.symbol = getTokenSymbol(txData.sends[0]?.token_id);
          activityData.isCollectible = isDefined(userTokensMetadata[txData.sends[0]?.token_id].thumbnail_url);
        }
        break;
      }
      case TransactionTypeEnum.Receive: {
        if (isGasToken) {
          activityData.symbol = chainName;
          activityData.amount = txData.tx?.value;
        } else {
          activityData.tokenId = txData.receives[0]?.token_id;
          activityData.amount = txData.receives[0]?.amount;
          activityData.symbol = getTokenSymbol(txData.receives[0]?.token_id);
          activityData.isCollectible = isDefined(userTokensMetadata[txData.receives[0]?.token_id].thumbnail_url);
        }
        break;
      }
      case TransactionTypeEnum.Interaction:
      case TransactionTypeEnum.ContractInteraction: {
        activityData.projectName = isDefined(txData.project_id) ? getProjectName(txData.project_id) : '';
        activityData.transfer = {
          sends: [
            ...(txData.sends.map(item => ({
              amount: item.amount,
              symbol: getTokenSymbol(item.token_id)
            })) ?? [])
          ],
          receives: [
            ...(txData.receives.map(item => ({
              amount: item.amount,
              symbol: getTokenSymbol(item.token_id)
            })) ?? [])
          ]
        };
        break;
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
      } else {
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
            const result = Object.keys(groupingAllDataByDates).map(title => ({
              title,
              data: groupingAllDataByDates[title]
            }));

            return result;
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
