import { TokenType } from './token.type';

export type NetworkType = {
  chainId: number | string;
  rpc: string;
  name: string;
  gasToken: TokenType;
  explorer?: string;
};

export type NetworksType = Record<string, NetworkType>;
