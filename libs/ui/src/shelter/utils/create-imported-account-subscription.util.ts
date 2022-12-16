import { Dispatch } from '@reduxjs/toolkit';
import { OnEventFn } from '@rnw-community/shared';
import { catchError, of, Subject, switchMap } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CreateImportedAccountParams } from '../../interfaces/create-hd-account.interface';
import { hideLoaderAction, showLoaderAction } from '../../store/settings/settings.actions';
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
      tap(() => dispatch(showLoaderAction())),
      switchMap(({ name, hdAccount, networkType, accountId }) =>
        Shelter.createImportedAccount$(hdAccount, networkType, accountId, name)
      ),
      catchError(() => {
        showErrorToast('Failed to import account. This may happen because provided Key is invalid.');

        return of(undefined);
      }),
      tap(() => dispatch(hideLoaderAction()))
    )
    .subscribe(account => {
      if (account !== undefined) {
        dispatch(createHdAccountAction(account));
        goBack();
      }
    });
