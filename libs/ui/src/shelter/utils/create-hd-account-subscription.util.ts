import { switchMap } from 'rxjs';

import { CreateHdAccountType, CreateHdAccountWithOtherNewtorkType } from '../../interfaces/create-hd-account.interface';
import { createHdAccountWithOtherNetworkTypeAction, createHdAccountAction } from '../../store/wallet/wallet.actions';
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

export const createHdAccountWithOtherNetworkTypeSubscription = ({
  createHdAccount$,
  dispatch
}: CreateHdAccountWithOtherNewtorkType) =>
  createHdAccount$
    .pipe(switchMap(({ account, networkType }) => Shelter.createHdAccountWithOtherNetworkType$(networkType, account)))
    .subscribe(account => {
      if (account !== undefined) {
        dispatch(createHdAccountWithOtherNetworkTypeAction(account));
      }
    });
