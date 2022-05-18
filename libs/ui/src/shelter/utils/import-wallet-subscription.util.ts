import { Dispatch } from '@reduxjs/toolkit';
import { forkJoin, Subject, switchMap } from 'rxjs';

import { addHdAccountAction, setSelectedAccountAction } from '../../store/wallet/wallet.actions';
import { getStoredValue } from '../../utils/store.util';
import { ImportWalletParams } from '../import-wallet-params.interface';
import { Shelter } from '../shelter';

export const importWalletSubscription = (importWallet$: Subject<ImportWalletParams>, dispatch: Dispatch) =>
  importWallet$
    .pipe(
      switchMap(({ seedPhrase, password, hdAccountsLength }) =>
        forkJoin([Shelter.importAccount$(seedPhrase, password, hdAccountsLength)])
      )
    )
    .subscribe(([importedAccounts]) => {
      if (importedAccounts !== undefined) {
        const firstAccount = importedAccounts[0];
        dispatch(setSelectedAccountAction(firstAccount.publicKeyHash));
        for (const account of importedAccounts) {
          getStoredValue(account.publicKey).then(key => {
            if (key === null) {
              dispatch(addHdAccountAction(account));
            }
          });
        }
      }
    });
