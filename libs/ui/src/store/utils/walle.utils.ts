import { Observable, withLatestFrom } from 'rxjs';

import { getActualAccountIndex } from '../../utils/get-last-account-index.utils';
import { WalletRootState } from '../wallet/wallet.state';

export const withActualAccountIndex =
  <T>(state$: Observable<WalletRootState>) =>
  (observable$: Observable<T>) =>
    observable$.pipe(
      withLatestFrom(state$, (value, { wallet }): [T, number] => {
        const { accountsByBlockchain, selectedBlockchain } = wallet;
        const isExist = accountsByBlockchain.hasOwnProperty(selectedBlockchain);
        const accounts = accountsByBlockchain[selectedBlockchain];
        const accountIndex = isExist && accounts.length ? getActualAccountIndex(accounts) : 0;

        return [value, accountIndex];
      })
    );
