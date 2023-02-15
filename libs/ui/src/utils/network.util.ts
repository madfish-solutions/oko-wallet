import { NetworkTypeEnum } from 'shared/enums/network-type.enum';

import { NETWORK_CHAIN_IDS_BY_NETWORK_TYPE } from '../constants/networks';
import { NetworkInterface } from '../interfaces/network.interface';

export const getNetworkType = ({ chainId }: NetworkInterface): NetworkTypeEnum => {
  let networkTypeValue = NetworkTypeEnum.EVM;

  for (const [networkType, chainIds] of Object.entries(NETWORK_CHAIN_IDS_BY_NETWORK_TYPE)) {
    if (chainIds.includes(chainId)) {
      networkTypeValue = networkType as NetworkTypeEnum;
    }
  }

  return networkTypeValue;
};
