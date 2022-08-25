import { TransactionStatusEnum } from '../enums/transactions.enum';

export enum TransactionLabelEnum {
  Send = 'Send',
  Receive = 'Receive'
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

export interface ActivityResponse {
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
