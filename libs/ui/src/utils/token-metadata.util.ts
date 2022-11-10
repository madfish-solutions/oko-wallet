import { isNotEmptyString } from '@rnw-community/shared';

import { TEZOS_NETWORKS_LIST } from '../constants/networks';

export const getTokenMetadataSlug = (networkRpcUrl: string, tokenAddress: string, tokenId?: string) => {
  let rpcUrl = '';

  if (TEZOS_NETWORKS_LIST.includes(networkRpcUrl)) {
    rpcUrl = 'tezos_mainnet';
  } else {
    rpcUrl = networkRpcUrl;
  }

  return `${rpcUrl}_${tokenAddress}_${isNotEmptyString(tokenId) ? tokenId : '0'}`;
};
