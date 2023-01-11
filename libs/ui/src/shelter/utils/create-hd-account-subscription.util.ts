import { isDefined } from '@rnw-community/shared';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { CreateHdAccountType, CreateHdAccountForNewNetworkType } from '../../interfaces/create-hd-account.interface';
import { showLoaderAction, hideLoaderAction } from '../../store/settings/settings.actions';
import { createHdAccountAction, createHdAccountForNewNetworkTypeAction } from '../../store/wallet/wallet.actions';
import { Shelter } from '../shelter';

export const createHdAccountSubscription = ({
  createHdAccount$,
  dispatch,
  showErrorToast,
  showSuccessToast
}: CreateHdAccountType) =>
  createHdAccount$
    .pipe(
      tap(() => dispatch(showLoaderAction())),
      switchMap(({ accountId, accountIndex, networkType, accountName, successCallback }) =>
        Shelter.createHdAccount$(networkType, accountId, accountIndex, accountName).pipe(
          map(account => ({
            account,
            successCallback
          }))
        )
      ),
      catchError(() => {
        showErrorToast({
          message: 'Failed to import account.',
          description: 'This may happen because provided Key is invalid.'
        });

        return of(undefined);
      }),
      tap(() => dispatch(hideLoaderAction()))
    )
    .subscribe(value => {
      if (isDefined(value) && isDefined(value.account)) {
        const { account, successCallback } = value;

        dispatch(createHdAccountAction(account));
        successCallback?.();
        showSuccessToast({ message: 'Success!', description: 'The new account was successfully added!' });
      }
    });

export const createHdAccountForNewNetworkTypeSubscription = ({
  createHdAccountForNewNetworkType$,
  dispatch,
  showErrorToast,
  showSuccessToast
}: CreateHdAccountForNewNetworkType) =>
  createHdAccountForNewNetworkType$
    .pipe(
      tap(() => dispatch(showLoaderAction())),
      switchMap(({ account, accountIndex, networkType, successCallback, switchToNewAccount }) =>
        Shelter.createHdAccount$(networkType, account.accountId, accountIndex, account.name).pipe(
          map(newAccount => ({
            updatedAccount: {
              ...account,
              ...newAccount,
              networksKeys: {
                ...account.networksKeys,
                ...newAccount?.networksKeys
              }
            },
            successCallback,
            switchToNewAccount
          }))
        )
      ),
      catchError(() => {
        showErrorToast({
          message: 'Failed to import account.',
          description: 'This may happen because provided Key is invalid.'
        });

        return of(undefined);
      }),
      tap(() => dispatch(hideLoaderAction()))
    )
    .subscribe(value => {
      if (value !== undefined) {
        const { updatedAccount, successCallback, switchToNewAccount = true } = value;

        dispatch(createHdAccountForNewNetworkTypeAction({ account: updatedAccount, switchToNewAccount }));
        successCallback?.(updatedAccount);
        showSuccessToast({ message: 'Success!', description: 'The new account was successfully added!' });
      }
    });
