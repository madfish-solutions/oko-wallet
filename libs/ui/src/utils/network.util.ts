// @ts-ignore
import urlCompare from 'url-compare';

import { SpecificNetworksEnum } from '../enums/specific-networks.enum';

import { SPECIFIC_NETWORKS } from '../constants/networks';

export const getSpecificNetworkId = (networkRpcUrl: string): SpecificNetworksEnum | undefined => {
  const specificNetwork = SPECIFIC_NETWORKS.find(networkData =>
    networkData.rpcUrls.find(specificNetworkRpcUrl => urlCompare(specificNetworkRpcUrl, networkRpcUrl))
  );

  return specificNetwork?.id;
};
