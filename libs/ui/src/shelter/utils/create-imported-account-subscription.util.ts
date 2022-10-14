import { Dispatch } from '@reduxjs/toolkit';
import { OnEventFn } from '@rnw-community/shared';
import { catchError, of, Subject, switchMap } from 'rxjs';

import { CreateImportedAccountParams } from '../../interfaces/create-hd-account.interface';
import { createHdAccountAction } from '../../store/wallet/wallet.actions';
import { Shelter } from '../shelter';

export const createImportAccountSubscription = (
  createImportedAccount$: Subject<CreateImportedAccountParams>,
  showErrorToast: OnEventFn<string>,
  dispatch: Dispatch,
  goBack: OnEventFn<void>
) =>
  createImportedAccount$
    .pipe(
      switchMap(({ name, hdAccount, networkType, accountIndex }) =>
        Shelter.createImportedAccount$(hdAccount, networkType, accountIndex, name)
      ),
      catchError(() => {
        showErrorToast('Failed to import account. This may happen because provided Key is invalid.');

        return of(undefined);
      })
    )
    .subscribe(account => {
      if (account !== undefined) {
        dispatch(createHdAccountAction(account));
        goBack();
      }
    });
