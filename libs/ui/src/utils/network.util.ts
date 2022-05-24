// @ts-ignore
import urlCompare from 'url-compare';

import { SPECIFIC_NETWORKS } from '../constants/networks';
import { SpecificNetworksEnum } from '../enums/specific-networks.enum';

export const getSpecificNetworkId = (networkRpcUrl: string): SpecificNetworksEnum | undefined => {
  const specificNetwork = SPECIFIC_NETWORKS.find(networkData =>
    networkData.rpcUrls.find(specificNetworkRpcUrl => urlCompare(specificNetworkRpcUrl, networkRpcUrl))
  );

  return specificNetwork?.id;
};
