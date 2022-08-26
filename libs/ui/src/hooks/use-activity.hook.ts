import { useCallback, useState } from 'react';

import { TransactionStatusEnum } from '../enums/transactions.enum';
import { ActivityData, ActivityResponse, TokenInfo, TransactionLabelEnum } from '../interfaces/activity.interface';
import { capitalize } from '../utils/string.util';

const BASE_DEBANK_URL = 'https://pro-openapi.debank.com/v1/user/history_list';
const TOKEN_INFO_URL = 'https://pro-openapi.debank.com/v1/token';
const MY_ACCESSKEY = 'd74c140f710733b43b228752dbedc0eff8091bc6';
const DEBANK_HEADERS = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    AccessKey: MY_ACCESSKEY
  }
};

const fetchTokenInfo = async (contractAddress: string, chainName: string): Promise<TokenInfo | undefined> => {
  try {
    const response = await fetch(`${TOKEN_INFO_URL}?id=${contractAddress}&chain_id=${chainName}`, DEBANK_HEADERS);
    const tokenInfo = response.json();

    return tokenInfo;
  } catch (e) {
    console.log(e);
  }
};

/*
transform data from API
(https://docs.open.debank.com/en/reference/api-pro-reference/user#get-user-histroy-list)
to ActivityData type, as we needed
*/

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

  return result;
};

export const useAllActivity = (publicKey: string, chainName: string) => {
  const [lastTimestamp, setLastTimestamp] = useState(Date.now());
  const fetchActivity = useCallback(async (startTime: number) => {
    try {
      const response = await fetch(
        `${BASE_DEBANK_URL}?id=${publicKey}&chain_id=${chainName}&page_count=5&start_time=${startTime}`,
        DEBANK_HEADERS
      );
      const result = await response.json();
      const activityData = await transformApiData(result, publicKey, chainName);
      setLastTimestamp(activityData?.[activityData.length - 1]?.timestamp);

      return activityData;
    } catch (e) {
      console.log(e);
    }
  }, []);

  return { lastTimestamp, fetchActivity };
};
