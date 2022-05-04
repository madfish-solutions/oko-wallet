import { BlockExplorerEnum, NetworksNameEnum, NetworksValueEnum, RpcEnum } from '../enums/network.enum';

import { TokenType } from './token.type';

export type NetworksType = {
  [key in NetworksValueEnum]: {
    chainId: number | string;
    rpc: RpcEnum;
    name: NetworksNameEnum;
    gasToken: TokenType;
    explorer?: BlockExplorerEnum;
  };
};
