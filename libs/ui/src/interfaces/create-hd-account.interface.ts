import { Dispatch } from '@reduxjs/toolkit';
import { OnEventFn } from '@rnw-community/shared';
import { Subject } from 'rxjs';

import { NetworkTypeEnum } from '../enums/network-type.enum';

import { AccountInterface } from './account.interface';

export interface CreateHdAccountParams {
  accountIndex: number;
  networkType: NetworkTypeEnum;
  accountName: string;
  successCallback?: OnEventFn<void>;
}

export type CreateHdAccountType = {
  createHdAccount$: Subject<CreateHdAccountParams>;
  dispatch: Dispatch;
};

export interface CreateHdAccountForNewNetworkParams {
  account: AccountInterface;
  networkType: NetworkTypeEnum;
  switchToNewAccount?: boolean;
  successCallback?: OnEventFn<AccountInterface>;
}

export type CreateHdAccountForNewNetworkType = {
  createHdAccountForNewNetworkType$: Subject<CreateHdAccountForNewNetworkParams>;
  dispatch: Dispatch;
};
