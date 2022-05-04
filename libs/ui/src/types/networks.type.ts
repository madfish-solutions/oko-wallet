import { TokenType } from './token.type';

export type NetworksType = {
  [key: string]: {
    chainId: number | string;
    rpc: string;
    name: string;
    gasToken: TokenType;
    explorer?: string;
  };
};
