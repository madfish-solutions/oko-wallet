import { TransactionStatusEnum } from '../enums/transactions.enum';

export enum TransactionLabelEnum {
  Send = 'Send',
  Received = 'Received'
}

export interface TokenInfo {
  id: string;
  chain: string;
  name: string;
  symbol: string;
  optimized_symbol: string;
  decimals: number;
  logo_url: string;
  protocol_id: string;
  price: number;
  is_verified: boolean;
  is_core: boolean;
  is_wallet: boolean;
  time_at: number;
}

interface TxInterface {
  eth_gas_fee: number;
  from_addr: string;
  name: string;
  params: string;
  status: number;
  to_addr: string;
  usd_gas_fee: number;
  value: number;
}

interface TransactionResponse {
  id: string;
  time_at: number;
  cate_id: string | null;
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
  tokenId?: string;
}

export interface SectionListActivityData {
  title: string;
  data: ActivityData[];
}
