import { useState } from 'react';

import { TransactionStatusEnum } from '../enums/transactions.enum';
import { ActivityData, ActivityResponse, TokenInfo, TransactionLabelEnum } from '../interfaces/activity.interface';
import { capitalize } from '../utils/string.util';

const BASE_DEBANK_URL = 'https://pro-openapi.debank.com/v1/user/history_list';
const TOKEN_INFO_URL = 'https://pro-openapi.debank.com/v1/token';
const MY_ACCESSKEY = 'd74c140f710733b43b228752dbedc0eff8091bc6';
const TIME_LIMIT = 30 * 1000;

const fetchTokenInfo = async (contractAddress: string, chainName: string): Promise<TokenInfo | undefined> => {
  try {
    const response = await fetch(`${TOKEN_INFO_URL}?id=${contractAddress}&chain_id=${chainName}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        AccessKey: MY_ACCESSKEY
      }
    });
    const tokenInfo = response.json();

    return tokenInfo;
  } catch (e) {
    console.log(e);
  }
};

const transformApiData = async (
  data: ActivityResponse,
  publicKey: string,
  chainName: string
): Promise<ActivityData[]> => {
  const result = await Promise.all(
    data?.history_list.map(async txData => {
      const activityData: ActivityData = {} as ActivityData;
      activityData.transactionStatus = TransactionStatusEnum.applied;
      activityData.hash = txData.id;
      activityData.timestamp = txData.time_at;
      if (txData.cate_id !== null) {
        activityData.transactionLabel = capitalize(txData.cate_id) as TransactionLabelEnum;

        if (activityData.transactionLabel === TransactionLabelEnum.Send) {
          activityData.amount = txData.sends[0]?.amount;
          const data = await fetchTokenInfo(txData.sends[0].token_id, chainName);
          activityData.symbol = data?.symbol || '';
        } else {
          const data = await fetchTokenInfo(txData.receives[0].token_id, chainName);
          activityData.symbol = data?.symbol || '';
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

  return result;
};

export const useAllActivity = (publicKey: string, chainName: string) => {
  const [activity, setActivity] = useState<ActivityData[]>();
  const [timestamp, setTimestamp] = useState(0);
  const fetchActivity = async () => {
    if (timestamp === 0 || Date.now() - (timestamp + TIME_LIMIT) > 0) {
      try {
        const response = await fetch(`${BASE_DEBANK_URL}?id=${publicKey}&chain_id=${chainName}&page_count=5`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            AccessKey: MY_ACCESSKEY
          }
        });
        const result = await response.json();
        const activityData = await transformApiData(result, publicKey, chainName);
        setActivity(activityData);
        setTimestamp(Date.now());
      } catch (e) {
        console.log(e);
      }
    }
  };

  fetchActivity();

  return { activity, fetchActivity };
};
