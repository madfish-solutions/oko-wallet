import { TokenStandardEnum } from 'shared';

export interface Asset {
  decimals: number;
  tokenAddress: string;
  tokenId: string;
  symbol: string;
  standard?: TokenStandardEnum;
  data?: string;
}
