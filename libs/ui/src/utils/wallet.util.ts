import { Observable, withLatestFrom } from 'rxjs';

import { initialAccount } from '../mocks/account.interface.mock';
import { AccountInterface } from '../store/interfaces/account.interface';
import { WalletRootState } from '../store/wallet/wallet.state';

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
