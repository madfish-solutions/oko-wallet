import { isNotEmptyString } from '@rnw-community/shared';

import { TEZOS_MAINNET_RPC_LIST } from '../constants/networks';

export const getTokenMetadataSlug = (networkRpcUrl: string, tokenAddress: string, tokenId?: string) => {
  let rpcUrl = '';

  if (TEZOS_MAINNET_RPC_LIST.includes(networkRpcUrl)) {
    rpcUrl = 'tezos_mainnet';
  } else {
    rpcUrl = networkRpcUrl;
  }

  return `${rpcUrl}_${tokenAddress}_${isNotEmptyString(tokenId) ? tokenId : '0'}`;
};
