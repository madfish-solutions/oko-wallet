import { TokenType } from './token.type';

export interface NetworkInrerface {
  chainId: string;
  rpcUrl: string;
  name: string;
  gasToken: TokenType;
  explorerUrl?: string;
}
