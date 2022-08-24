import { useState } from 'react';

import { TransactionStatusEnum } from '../enums/transactions.enum';

const BASE_DEBANK_URL = 'https://pro-openapi.debank.com/v1/user/history_list';
const MY_ACCESSKEY = 'd74c140f710733b43b228752dbedc0eff8091bc6';
const TIME_LIMIT = 30 * 1000;

enum TransactionLabelEnum {
  Send = 'send',
  Receive = 'receive'
}

export interface TxInterface {
  eth_gas_fee: number;
  from_addr: string;
  name: string;
  params: string;
  status: number;
  to_addr: string;
  usd_gas_fee: number;
  value: number;
}

export interface TransactionResponse {
  id: string;
  time_at: number;
  cate_id: string;
  tx: TxInterface;
  sends: [
    {
      amount: number;
      to_addr: string;
      token_id: string;
    }
  ];
  receives: [
    {
      amount: number;
      to_addr: string;
      token_id: string;
    }
  ];
}

interface ActivityResponse {
  cate_dict: unknown;
  history_list: TransactionResponse[];
  project_dict: unknown;
  token_dict: unknown;
}

export interface ActivityData {
  hash: string;
  timestamp: number;
  transactionLabel: TransactionLabelEnum;
  transactionStatus: TransactionStatusEnum;
  amount: number;
  symbol: string;
}

function transformApiData(data: ActivityResponse, publicKey: string, chainName: string): ActivityData[] {
  const result = data?.history_list.map(txData => {
    const activityData: ActivityData = {} as ActivityData;
    activityData.transactionStatus = TransactionStatusEnum.applied;
    activityData.hash = txData.id;
    activityData.timestamp = txData.time_at;
    if (txData.cate_id !== null) {
      activityData.transactionLabel = txData.cate_id as TransactionLabelEnum;
      if (activityData.transactionLabel === TransactionLabelEnum.Send) {
        activityData.amount = txData.sends[0]?.amount;
      } else {
        activityData.amount = txData.receives[0]?.amount;
      }
    } else {
      activityData.symbol = chainName;
      if (publicKey.toLowerCase() === txData.tx.from_addr) {
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
  console.log(response);

  return { response, fetchActivity };
};
