import { map, switchMap } from 'rxjs/operators';

import { CreateHdAccountType, CreateHdAccountForNewNetworkType } from '../../interfaces/create-hd-account.interface';
import { createHdAccountAction, createHdAccountForNewNetworkTypeAction } from '../../store/wallet/wallet.actions';
import { Shelter } from '../shelter';

export const createHdAccountSubscription = ({ createHdAccount$, dispatch }: CreateHdAccountType) =>
  createHdAccount$
    .pipe(switchMap(({ accountIndex, networkType }) => Shelter.createHdAccount$(networkType, accountIndex)))
    .subscribe(account => {
      if (account !== undefined) {
        dispatch(createHdAccountAction(account));
      }
    });

export const createHdAccountForNewNetworkTypeSubscription = ({
  createHdAccountForNewNetworkType$,
  dispatch
}: CreateHdAccountForNewNetworkType) =>
  createHdAccountForNewNetworkType$
    .pipe(
      switchMap(({ account, networkType, successCallback }) =>
        Shelter.createHdAccount$(networkType, account.accountIndex).pipe(
          map(newAccount => ({
            updatedAccount: {
              ...newAccount,
              ...account,
              networksKeys: {
                ...account.networksKeys,
                ...newAccount?.networksKeys
              }
            },
            successCallback
          }))
        )
      )
    )
    .subscribe(({ updatedAccount, successCallback }) => {
      if (updatedAccount !== undefined) {
        dispatch(createHdAccountForNewNetworkTypeAction(updatedAccount));
        successCallback?.();
      }
    });
