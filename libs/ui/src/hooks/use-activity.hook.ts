import { useState } from 'react';

import { TransactionStatusEnum } from '../enums/transactions.enum';
import { ActivityData, ActivityResponse, TransactionLabelEnum } from '../interfaces/activity.interface';
import { capitalize } from '../utils/string.util';

const BASE_DEBANK_URL = 'https://pro-openapi.debank.com/v1/user/history_list';
const TOKEN_INFO_URL = 'https://pro-openapi.debank.com/v1/token';
const MY_ACCESSKEY = 'd74c140f710733b43b228752dbedc0eff8091bc6';
const TIME_LIMIT = 30 * 1000;

const fetchTokenInfo = async (contractAddress: string, chainName: string) => {
  try {
    const tokenInfo = fetch(`${TOKEN_INFO_URL}?id=${contractAddress}&chain_id=${chainName}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        AccessKey: MY_ACCESSKEY
      }
    })
      .then(response => response.json())
      .then(result => result?.symbol)
      .catch(e => console.log(e));

    return tokenInfo;
  } catch (e) {
    console.log(e);
  }
};

function transformApiData(data: ActivityResponse, publicKey: string, chainName: string): ActivityData[] {
  const result = data?.history_list.map(txData => {
    const activityData: ActivityData = {} as ActivityData;
    activityData.transactionStatus = TransactionStatusEnum.applied;
    activityData.hash = txData.id;
    activityData.timestamp = txData.time_at;
    if (txData.cate_id !== null) {
      activityData.transactionLabel = capitalize(txData.cate_id) as TransactionLabelEnum;

      if (activityData.transactionLabel === TransactionLabelEnum.Send) {
        activityData.amount = txData.sends[0]?.amount;
        fetchTokenInfo(txData.sends[0].token_id, chainName).then(symbol => (activityData.symbol = symbol));
      } else {
        fetchTokenInfo(txData.receives[0].token_id, chainName).then(symbol => (activityData.symbol = symbol));
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

  return result;
}

export const useAllActivity = (publicKey: string, chainName: string) => {
  let response;
  const [activity, setActivity] = useState<ActivityResponse>();
  const [timestamp, setTimestamp] = useState(0);
  const fetchActivity = async () => {
    if (timestamp === 0 || Date.now() - (timestamp + TIME_LIMIT) > 0) {
      try {
        fetch(`${BASE_DEBANK_URL}?id=${publicKey}&chain_id=${chainName}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            AccessKey: MY_ACCESSKEY
          }
        })
          .then(response => response.json())
          .then(result => setActivity(result))
          .catch(e => console.log(e));
        setTimestamp(Date.now());
      } catch (e) {
        console.log(e);
      }
    }
  };

  fetchActivity();
  if (activity !== undefined) {
    response = transformApiData(activity, publicKey, chainName);
  }

  return { response, fetchActivity };
};
