import { IconNameEnum } from '../components/icon/icon-name.enum';
import { NetworkTypeEnum } from '../enums/network-type.enum';
import { LoadableEntityState } from '../store/interfaces/loadable-entity-state.interface';

import { GasTokenMetadata } from './token.interface';

type AccountPublicKeyHash = string;

export interface NetworkInterface {
  chainId: string;
  rpcUrl: string;
  name: string;
  gasTokenMetadata: GasTokenMetadata;
  gasTokenBalance: Record<AccountPublicKeyHash, LoadableEntityState<string>>;
  explorerUrl?: string;
  networkType: NetworkTypeEnum;
  iconName?: IconNameEnum;
}

export type NetworkChainIdsByNetworkType = Record<NetworkTypeEnum, string[]>;
