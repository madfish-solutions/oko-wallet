import { TransactionResponse } from './transaction-response.interface';

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
  thumbnail_url?: string;
  time_at: number;
}

interface ProjectInfo {
  chain: string;
  id: string;
  logo_url: string;
  name: string;
  site_url: string;
}

export interface ActivityResponse {
  cate_dict: unknown;
  history_list: TransactionResponse[];
  project_dict: Record<string, ProjectInfo>;
  token_dict: Record<string, TokenInfo>;
}
