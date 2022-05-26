import { NetworkTypeEnum } from '../enums/network-type.enum';
import { LoadableEntityState } from '../store/interfaces/loadable-entity-state.interface';

import { GasTokenMetadata } from './token.interface';

export interface NetworkInterface {
  chainId: string;
  rpcUrl: string;
  name: string;
  gasTokenMetadata: GasTokenMetadata;
  gasTokenBalance: LoadableEntityState<string>;
  explorerUrl?: string;
}

export type NetworkChainIdsByNetworkType = Partial<{
  [networkType in NetworkTypeEnum]: {
    [networkName: string]: string;
  };
}>;
