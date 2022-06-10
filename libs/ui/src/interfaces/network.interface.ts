import { NetworkGroupEnum } from '../enums/network-group.enum';
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

export type NetworkChainIdsByNetworkGroup = Partial<{
  [networkType in NetworkGroupEnum]: string[];
}>;
