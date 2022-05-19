const urlCompare = require('url-compare');
import {SPECIFIC_NETWORKS} from '../constants/networks';

export const getSpecificNetworkId = (networkRpcUrl: string): string | undefined => {
    const specificNetwork = SPECIFIC_NETWORKS.find(networkData => !!networkData.rpcUrls.find(
        specificNetworkRpcUrl => urlCompare(specificNetworkRpcUrl, networkRpcUrl)
    ));

    return specificNetwork && specificNetwork.id;
}
