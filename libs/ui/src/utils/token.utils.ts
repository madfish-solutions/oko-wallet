import { Observable } from 'rxjs';

import { NetworkTypeEnum } from '../enums/network-type.enum';
import { NetworkInterface } from '../interfaces/network.interface';
import { TokenMetadata } from '../interfaces/token-metadata.interface';

import { loadEvmGasTokenBalance$, loadEvmTokenBalance$ } from './by-network-types/token.utils.evm';
import { loadTezosGasTokenBalance$, loadTezosTokenBalance$ } from './by-network-types/token.utils.tezos';
import { getNetworkType } from './network.util';

export const getGasTokenBalance$ = (network: NetworkInterface, publicKeyHash: string): Observable<string> => {
  const networkType = getNetworkType(network);

  switch (networkType) {
    case NetworkTypeEnum.Tezos:
      return loadTezosGasTokenBalance$(network, publicKeyHash);

    default:
      return loadEvmGasTokenBalance$(network, publicKeyHash);
  }
};

export const getTokenBalance$ = (
  network: NetworkInterface,
  publicKeyHash: string,
  token: TokenMetadata
): Observable<string> => {
  const networkType = getNetworkType(network);

  switch (networkType) {
    case NetworkTypeEnum.Tezos:
      return loadTezosTokenBalance$(network, publicKeyHash, token);

    default:
      return loadEvmTokenBalance$(network, publicKeyHash, token);
  }
};

export const getTokenSlug = ({ tokenAddress, tokenId }: TokenMetadata) => `${tokenAddress}_${tokenId}`;
