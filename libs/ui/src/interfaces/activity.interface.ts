import { TransactionStatusEnum } from '../enums/transactions.enum';

export enum TransactionLabelEnum {
  Send = 'Send',
  Received = 'Received',
  Swap = 'Swap',
  ContractInteraction = 'Contract Interaction'
}

export enum TransactionTypeEnum {
  Send = 'send',
  Received = 'received',
  Swap = 'swap',
  ContractInteraction = 'contract_interaction'
}

interface TokenInfo {
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

interface ProjectInfo {
  chain: string;
  id: string;
  logo_url: string;
  name: string;
  site_url: string;
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

export interface TransactionResponse {
  id: string;
  time_at: number;
  cate_id: string | null;
  tx: TxInterface;
  project_id: string | null;
  token_approve?: {
    spender: string;
    token_id: string;
    value: number;
  } | null;
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
  project_dict: Record<string, ProjectInfo>;
  token_dict: Record<string, TokenInfo>;
}

export interface ActivityData {
  type: TransactionTypeEnum;
  hash: string;
  timestamp: number;
  transactionLabel: TransactionLabelEnum;
  transactionStatus: TransactionStatusEnum;
  symbol?: string;
  amount?: number;
  swapValues?: [
    {
      amountTokenSend: number;
      symbolTokenSend: string;
      amountTokenReceive: number;
      symbolTokenReceive: string;
    }
  ];
  projectName?: string;
  tokenId?: string;
}

export interface SectionListActivityData {
  title: string;
  data: ActivityData[];
}
