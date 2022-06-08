import { Dispatch } from '@reduxjs/toolkit';
import { Subject, switchMap } from 'rxjs';

import { addHdAccountAction, setSelectedAccountAction } from '../../store/wallet/wallet.actions';
import { ImportWalletParams } from '../interfaces/import-wallet-params.interface';
import { Shelter } from '../shelter';

export const importWalletSubscription = (importWallet$: Subject<ImportWalletParams>, dispatch: Dispatch) =>
  importWallet$
    .pipe(
      switchMap(({ seedPhrase, password, hdAccountsLength }) =>
        Shelter.importAccount$(seedPhrase, password, hdAccountsLength)
      )
    )
    .subscribe(importedAccounts => {
      if (importedAccounts !== undefined) {
        const firstAccount = importedAccounts[0];
        dispatch(setSelectedAccountAction(firstAccount.publicKeyHash));

        for (const account of importedAccounts) {
          dispatch(addHdAccountAction(account));
        }
      }
    });
