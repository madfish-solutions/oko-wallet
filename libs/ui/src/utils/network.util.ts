import { NETWORK_CHAIN_IDS_BY_NETWORK_GROUP, DEFAULT_NETWORK_TYPE } from '../constants/networks';
import { NetworkGroupEnum } from '../enums/network-group.enum';
import { NetworkTypeEnum } from '../enums/network-type.enum';
import { NetworkInterface } from '../interfaces/network.interface';

export const getNetworkGroup = ({ chainId }: NetworkInterface): NetworkGroupEnum | undefined =>
  Object.entries(NETWORK_CHAIN_IDS_BY_NETWORK_GROUP).find(([_, chainIds]) =>
    chainIds.includes(chainId)
  )?.[0] as NetworkGroupEnum;

export const getNetworkType = (network: NetworkInterface): NetworkTypeEnum => {
  const networkGroup = getNetworkGroup(network);

  switch (networkGroup) {
    case NetworkGroupEnum.Tezos:
      return NetworkTypeEnum.Tezos;

    default:
      return DEFAULT_NETWORK_TYPE;
  }
};
