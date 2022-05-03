import { BlockExplorerEnum, NetworksNameEnum, NetworksValueEnum, RpcEnum } from '../enums/network.enum';

export type NetworksType = {
  [key in NetworksValueEnum]: {
    chainId: number | string;
    rpc: RpcEnum;
    name: NetworksNameEnum;
    tokenSymbol: string;
    explorer?: BlockExplorerEnum;
  };
};
