import { Dispatch } from '@reduxjs/toolkit';
import { Subject } from 'rxjs';

import { NetworkTypeEnum } from '../enums/network-type.enum';

import { AccountInterface } from './account.interface';

export type CreateHdAccountType = {
  createHdAccount$: Subject<unknown>;
  networkType: NetworkTypeEnum;
  accountsLength: number;
  dispatch: Dispatch;
};

export type CreateHdAccountWithOtherNewtorkType = {
  createHdAccount$: Subject<{ account: AccountInterface; networkType: NetworkTypeEnum }>;
  dispatch: Dispatch;
};
