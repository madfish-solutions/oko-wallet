import { Dispatch } from '@reduxjs/toolkit';
import { catchError, of, Subject, switchMap } from 'rxjs';

import { AccountInterface } from '../../interfaces/account.interface';
import { CreateImportedAccountParams } from '../../interfaces/create-hd-account.interface';
import { createHdAccountAction } from '../../store/wallet/wallet.actions';
import { Shelter } from '../shelter';

export const createImportAccountSubscription = (
  createImportedAccount$: Subject<CreateImportedAccountParams>,
  accounts: AccountInterface[],
  dispatch: Dispatch,
  goBack: () => void
) =>
  createImportedAccount$
    .pipe(
      switchMap(({ name, hdAccount, networkType, accountIndex }) => {
        for (const account of accounts) {
          if (account.networksKeys[networkType]?.publicKey === hdAccount.publicKey) {
            // TOTO: add toast or add this error to input
            console.error('This account already imported!');

            return of(undefined);
          }
        }

        return Shelter.createImportedAccount$(hdAccount, networkType, accountIndex, name);
      }),
      catchError(() => {
        // TODO: add toast or add this error to input
        console.error('Failed to import account. This may happen because provided Key is invalid.');

        return of(undefined);
      })
    )
    .subscribe(account => {
      if (account !== undefined) {
        dispatch(createHdAccountAction(account));
        goBack();
      }
    });
