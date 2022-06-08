import { Observable } from 'rxjs';

import { NetworkTypeEnum } from '../enums/network-type.enum';
import { AccountToken } from '../interfaces/account-token.interface';
import { AccountInterface } from '../interfaces/account.interface';
import { NetworkInterface } from '../interfaces/network.interface';
import { Token } from '../interfaces/token.interface';

import { loadEvmGasTokenBalance$, loadEvmTokenBalance$ } from './by-network-types/token.utils.evm';
import { loadTezosGasTokenBalance$, loadTezosTokenBalance$ } from './by-network-types/token.utils.tezos';
import { getNetworkType } from './network.util';

export const getGasTokenBalance$ = (network: NetworkInterface, account: AccountInterface): Observable<string> => {
  const networkType = getNetworkType(network);

  switch (networkType) {
    case NetworkTypeEnum.Tezos:
      return loadTezosGasTokenBalance$(network, account);

    default:
      return loadEvmGasTokenBalance$(network, account.publicKeyHash);
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
      return loadEvmTokenBalance$(network, account.publicKeyHash, token);
  }
};

export const getTokenSlug = ({ tokenAddress, tokenId }: AccountToken) => `${tokenAddress}_${tokenId ?? '0'}`;
