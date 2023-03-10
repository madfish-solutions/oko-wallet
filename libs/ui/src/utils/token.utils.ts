import { isNotEmptyString } from '@rnw-community/shared';
import { Observable } from 'rxjs';
import { NetworkTypeEnum, AccountInterface } from 'shared';

import { NetworkInterface } from '../interfaces/network.interface';
import { Token } from '../interfaces/token.interface';
import { getString } from '../utils/get-string.utils';

import { loadEvmGasTokenBalance$, loadEvmTokenBalance$ } from './by-network-types/token.utils.evm';
import { loadTezosGasTokenBalance$, loadTezosTokenBalance$ } from './by-network-types/token.utils.tezos';
import { getNetworkType } from './network.util';

export const getGasTokenBalance$ = (network: NetworkInterface, account: AccountInterface): Observable<string> => {
  const networkType = getNetworkType(network);

  switch (networkType) {
    case NetworkTypeEnum.Tezos:
      return loadTezosGasTokenBalance$(network, account);

    default:
      return loadEvmGasTokenBalance$(network, getString(account.networksKeys[network.networkType]?.publicKeyHash));
  }
};

export const getTokenBalance$ = (
  network: NetworkInterface,
  account: AccountInterface,
  token: Token
): Observable<string> => {
  const networkType = getNetworkType(network);

  switch (networkType) {
    case NetworkTypeEnum.Tezos:
      return loadTezosTokenBalance$(network, account, token);

    default:
      return loadEvmTokenBalance$(network, getString(account.networksKeys[network.networkType]?.publicKeyHash), token);
  }
};

export const getTokenSlug = (tokenAddress: string, tokenId?: string | undefined) =>
  `${tokenAddress}_${isNotEmptyString(tokenId) ? tokenId : '0'}`;

export const isCollectible = (asset: Token) => asset.artifactUri !== undefined && asset.artifactUri !== null;
