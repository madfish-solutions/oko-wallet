import { map, switchMap, tap } from 'rxjs/operators';

import { CreateHdAccountType, CreateHdAccountForNewNetworkType } from '../../interfaces/create-hd-account.interface';
import { showLoaderAction, hideLoaderAction } from '../../store/settings/settings.actions';
import { createHdAccountAction, createHdAccountForNewNetworkTypeAction } from '../../store/wallet/wallet.actions';
import { Shelter } from '../shelter';

export const createHdAccountSubscription = ({ createHdAccount$, dispatch }: CreateHdAccountType) =>
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
      tap(() => dispatch(hideLoaderAction()))
    )
    .subscribe(({ account, successCallback }) => {
      if (account !== undefined) {
        dispatch(createHdAccountAction(account));
        successCallback?.();
      }
    });

export const createHdAccountForNewNetworkTypeSubscription = ({
  createHdAccountForNewNetworkType$,
  dispatch
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
      tap(() => dispatch(hideLoaderAction()))
    )
    .subscribe(({ updatedAccount, successCallback, switchToNewAccount = true }) => {
      if (updatedAccount !== undefined) {
        dispatch(createHdAccountForNewNetworkTypeAction({ account: updatedAccount, switchToNewAccount }));
        successCallback?.(updatedAccount);
      }
    });
