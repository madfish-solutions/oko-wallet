import { Dispatch } from '@reduxjs/toolkit';
import { OnEventFn } from '@rnw-community/shared';
import { catchError, of, Subject, switchMap } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ScreensEnum } from '../../enums/sreens.enum';
import { Toast } from '../../hooks/use-toast.hook';
import { CreateImportedAccountParams } from '../../interfaces/create-hd-account.interface';
import { hideLoaderAction, showLoaderAction } from '../../store/settings/settings.actions';
import { createHdAccountAction } from '../../store/wallet/wallet.actions';
import { Shelter } from '../shelter';

export const createImportAccountSubscription = (
  createImportedAccount$: Subject<CreateImportedAccountParams>,
  showErrorToast: OnEventFn<Toast>,
  showSuccessToast: OnEventFn<Toast>,
  dispatch: Dispatch,
  navigate: OnEventFn<ScreensEnum>
) =>
  createImportedAccount$
    .pipe(
      tap(() => dispatch(showLoaderAction())),
      switchMap(({ name, hdAccount, networkType, accountId }) =>
        Shelter.createImportedAccount$(hdAccount, networkType, accountId, name)
      ),
      catchError(() => {
        showErrorToast({
          message: 'Failed to import account.',
          data: { description: 'This may happen because provided Key is invalid.' }
        });

        return of(undefined);
      }),
      tap(() => dispatch(hideLoaderAction()))
    )
    .subscribe(account => {
      if (account !== undefined) {
        dispatch(createHdAccountAction(account));
        navigate(ScreensEnum.Wallet);
        showSuccessToast({ message: 'Success!', data: { description: 'The new account was successfully imported!' } });
      }
    });
