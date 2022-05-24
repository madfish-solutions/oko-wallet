import { LoadableEntityState } from '../store/interfaces/loadable-entity-state.interface';

import { GasTokenMetadata } from './token.interface';
import { SpecificNetworksEnum } from '../enums/specific-networks.enum';

export interface NetworkInterface {
  chainId: string;
  rpcUrl: string;
  name: string;
  gasTokenMetadata: GasTokenMetadata;
  gasTokenBalance: LoadableEntityState<string>;
  explorerUrl?: string;
}

export interface SpecificNetworkInterface {
  id: SpecificNetworksEnum;
  rpcUrls: string[];
}
