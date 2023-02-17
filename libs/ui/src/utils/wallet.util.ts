import { Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { AccountInterface } from 'shared';

import { NETWORKS_DEFAULT_LIST } from '../constants/networks';
import { NetworkInterface } from '../interfaces/network.interface';
import { initialAccount } from '../mocks/account.interface.mock';
import { WalletRootState } from '../store/wallet/wallet.state';
import { getSelectedNetworkType } from '../store/wallet/wallet.utils';

export const withSelectedAccount =
  <T>(state$: Observable<WalletRootState>) =>
  (observable$: Observable<T>) =>
    observable$.pipe(
      withLatestFrom(state$, (value, { wallet }): [T, AccountInterface] => {
        const { accounts, selectedAccountPublicKeyHash } = wallet;

        const selectedNetworkType = getSelectedNetworkType(wallet);
        const selectedAccount =
          accounts.find(({ networksKeys }) =>
            networksKeys.hasOwnProperty(selectedNetworkType)
              ? networksKeys[selectedNetworkType]?.publicKeyHash === selectedAccountPublicKeyHash
              : null
          ) ?? initialAccount;

        return [value, selectedAccount];
      })
    );

export const withSelectedNetwork =
  <T>(state$: Observable<WalletRootState>) =>
  (observable$: Observable<T>) =>
    observable$.pipe(
      withLatestFrom(state$, (value, { wallet }): [T, NetworkInterface] => {
        const selectedNetwork =
          wallet.networks.find(({ rpcUrl }) => rpcUrl === wallet.selectedNetworkRpcUrl) ?? NETWORKS_DEFAULT_LIST[0];

        return [value, selectedNetwork];
      })
    );
