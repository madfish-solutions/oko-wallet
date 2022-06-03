import { switchMap } from 'rxjs';

import { CreateHdAccountType, CreateHdAccountWithOtherNewtorkType } from '../../interfaces/create-hd-account.interface';
import { createHdAccountForNewNetworkTypeAction, createHdAccountAction } from '../../store/wallet/wallet.actions';
import { Shelter } from '../shelter';

export const createHdAccountSubscription = ({
  createHdAccount$,
  networkType,
  accountsLength,
  dispatch
}: CreateHdAccountType) =>
  createHdAccount$.pipe(switchMap(() => Shelter.createHdAccount$(networkType, accountsLength))).subscribe(account => {
    if (account !== undefined) {
      dispatch(createHdAccountAction(account));
    }
  });

export const createHdAccountForNewNetworkTypeSubscription = ({
  createHdAccount$,
  dispatch
}: CreateHdAccountWithOtherNewtorkType) =>
  createHdAccount$
    .pipe(switchMap(({ account, networkType }) => Shelter.createHdAccountForNewNetworkType$(networkType, account)))
    .subscribe(account => {
      if (account !== undefined) {
        dispatch(createHdAccountForNewNetworkTypeAction(account));
      }
    });
