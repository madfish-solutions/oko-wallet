import { NetworkTypeEnum } from 'shared';

import { IconNameEnum } from '../components/icon/icon-name.enum';

import { GasTokenMetadata } from './token.interface';

export interface NetworkInterface {
  chainId: string;
  rpcUrl: string;
  name: string;
  gasTokenMetadata: GasTokenMetadata;
  explorerUrl?: string;
  networkType: NetworkTypeEnum;
  iconName?: IconNameEnum;
}

export type NetworkChainIdsByNetworkType = Record<NetworkTypeEnum, string[]>;
