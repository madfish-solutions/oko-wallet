import { NetworkTypeEnum } from '../enums/network-type.enum';
import { LoadableEntityState } from '../store/interfaces/loadable-entity-state.interface';

import { GasTokenMetadataInterface } from './token.interface';

export interface NetworkInterface {
  chainId: string;
  rpcUrl: string;
  name: string;
  gasTokenMetadata: GasTokenMetadataInterface;
  gasTokenBalance: LoadableEntityState<string>;
  explorerUrl?: string;
  networkType: NetworkTypeEnum;
}
