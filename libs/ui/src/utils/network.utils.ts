import { NETWORK_CHAIN_IDS_BY_NETWORK_TYPE, DEFAULT_NETWORK_TYPE } from '../constants/networks';
import { NetworkTypeEnum } from '../enums/network-type.enum';
import { NetworkInterface } from '../interfaces/network.interface';

export const getNetworkType = ({ chainId }: NetworkInterface): NetworkTypeEnum =>
  (Object.entries(NETWORK_CHAIN_IDS_BY_NETWORK_TYPE).find(([_, chainIds]) =>
    chainIds.includes(chainId)
  )?.[0] as NetworkTypeEnum) || DEFAULT_NETWORK_TYPE;
