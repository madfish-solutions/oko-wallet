import { Observable } from 'rxjs';

import { NetworkTypeEnum } from '../enums/network-type.enum';
import { NetworkInterface } from '../interfaces/network.interface';
import { TokenMetadata } from '../interfaces/token-metadata.interface';

import { loadEvmGasTokenBalance$, loadEvmTokenBalance$ } from './by-network-types/token.utils.evm';
import { loadTezosGasTokenBalance$, loadTezosTokenBalance$ } from './by-network-types/token.utils.tezos';
import { getNetworkType } from './network.util';

export const getGasTokenBalance$ = (network: NetworkInterface, pkh: string): Observable<string> => {
  const networkType = getNetworkType(network);

  switch (networkType) {
    case NetworkTypeEnum.Tezos:
      return loadTezosGasTokenBalance$(network);

    default:
      return loadEvmGasTokenBalance$(network, pkh);
  }
};

export const getTokenBalance$ = (network: NetworkInterface, pkh: string, token: TokenMetadata): Observable<string> => {
  const networkType = getNetworkType(network);

  switch (networkType) {
    case NetworkTypeEnum.Tezos:
      return loadTezosTokenBalance$(network, pkh, token);

    default:
      return loadEvmTokenBalance$(network, pkh, token);
  }
};
