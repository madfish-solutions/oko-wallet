import { map, switchMap } from 'rxjs';

import { CreateHdAccountType, CreateHdAccountWithOtherNewtorkType } from '../../interfaces/create-hd-account.interface';
import { createHdAccountAction, createHdAccountForNewNetworkTypeAction } from '../../store/wallet/wallet.actions';
import { Shelter } from '../shelter';

export const createHdAccountSubscription = ({
  createHdAccount$,
  networkType,
  accountIndex,
  dispatch
}: CreateHdAccountType) =>
  createHdAccount$.pipe(switchMap(() => Shelter.createHdAccount$(networkType, accountIndex))).subscribe(account => {
    if (account !== undefined) {
      dispatch(createHdAccountAction(account));
    }
  });

export const createHdAccountForNewNetworkTypeSubscription = ({
  createHdAccount$,
  dispatch
}: CreateHdAccountWithOtherNewtorkType) =>
  createHdAccount$
    .pipe(
      switchMap(({ account, networkType }) =>
        Shelter.createHdAccount$(networkType, account.accountIndex).pipe(
          map(newAccount => ({
            ...newAccount,
            ...account,
            networksKeys: {
              ...account.networksKeys,
              ...newAccount?.networksKeys
            }
          }))
        )
      )
    )
    .subscribe(account => {
      if (account !== undefined) {
        dispatch(createHdAccountForNewNetworkTypeAction(account));
      }
    });
