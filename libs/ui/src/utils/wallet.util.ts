import { Observable, withLatestFrom } from 'rxjs';

import { NETWORKS } from '../constants/networks';
import { initialAccount } from '../mocks/account.interface.mock';
import { AccountInterface } from '../store/interfaces/account.interface';
import { WalletRootState } from '../store/wallet/wallet.state';
import { NetworkInrerface } from '../types/networks.type';

export const withSelectedAccount =
  <T>(state$: Observable<WalletRootState>) =>
  (observable$: Observable<T>) =>
    observable$.pipe(
      withLatestFrom(state$, (value, { wallet }): [T, AccountInterface] => {
        const { selectedAccountPublicKeyHash, accounts } = wallet;
        const selectedAccount =
          accounts.find(account => account.publicKeyHash === selectedAccountPublicKeyHash) ?? initialAccount;

        return [value, selectedAccount];
      })
    );

export const withSelectedNetwork =
  <T>(state$: Observable<WalletRootState>) =>
  (observable$: Observable<T>) =>
    observable$.pipe(
      withLatestFrom(state$, (value, { wallet }): [T, NetworkInrerface] => {
        const selectedNetwork =
          wallet.networks.find(network => network.rpcUrl === wallet.selectedNetwork) ?? NETWORKS[0];

        return [value, selectedNetwork];
      })
    );
