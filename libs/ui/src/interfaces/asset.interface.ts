import { TokenStandardEnum } from '../enums/token-standard.enum';

export interface Asset {
  decimals: number;
  tokenAddress: string;
  tokenId: string;
  symbol: string;
  standard?: TokenStandardEnum;
  data?: string;
}
