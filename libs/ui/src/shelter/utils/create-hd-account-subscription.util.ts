import { Dispatch } from '@reduxjs/toolkit';
import { Subject, switchMap } from 'rxjs';

import { NetworkTypeEnum } from '../../enums/network-type.enum';
import { AccountInterface } from '../../interfaces/account.interface';
import { createHdAccountWithOtherNetworkTypeAction, createHdAccountAction } from '../../store/wallet/wallet.actions';
import { Shelter } from '../shelter';

type CreateHdAccountType<T> = {
  createHdAccount$: Subject<T>;
  networkType: NetworkTypeEnum;
  dispatch: Dispatch;
};

type CreateHdAccountWithAccountLength = {
  accountsLength: number;
} & CreateHdAccountType<unknown>;

export const createHdAccountSubscription = ({
  createHdAccount$,
  networkType,
  accountsLength,
  dispatch
}: CreateHdAccountWithAccountLength) =>
  createHdAccount$.pipe(switchMap(() => Shelter.createHdAccount$(networkType, accountsLength))).subscribe(account => {
    if (account !== undefined) {
      dispatch(createHdAccountAction(account));
    }
  });

export const createHdAccountWithOtherNetworkTypeSubscription = ({
  createHdAccount$,
  networkType,
  dispatch
}: CreateHdAccountType<AccountInterface>) =>
  createHdAccount$
    .pipe(switchMap(account => Shelter.createHdAccountWithOtherNetworkType$(networkType, account)))
    .subscribe(account => {
      if (account !== undefined) {
        dispatch(createHdAccountWithOtherNetworkTypeAction(account));
      }
    });
